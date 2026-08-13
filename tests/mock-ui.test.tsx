// @vitest-environment jsdom

/**
 * Sitting a fixed mock test, through the real app (C7, D-036).
 *
 * The assertion that matters most here is not about the screen. `modeFor` returns
 * `'scheduled'` for **first contact** with any phrasing — correct for a drill (D-003), and
 * catastrophic for a mock, because the twenty fixed tests draw from the whole deck rather
 * than from unseen forms, so a mock routinely serves a form the reader has never met.
 *
 * Recorded as `scheduled`, such an answer would advance the schedule — breaking R-5, which
 * says a mock can never push a fact further out — *and* fall out of its own attempt, which
 * `mockAttempts` builds from `mode === 'mock'`, so a 24-question test would score out of 23.
 * One mislabelled mode, two silent failures. Both are asserted below.
 */

import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from '@/app/page';
import { factById } from '@/domain/deck';
import { FIXED_TESTS } from '@/data/mock-tests';
import { MOCK_LENGTH, mockAttempts } from '@/domain/mock';
import { modeFor } from '@/app/_lib/use-drill';
import { reloadFromStorage } from '@/adapters/store';
import { EVENTS_KEY } from '@/adapters/local-store';
import { replay, type ReviewEvent } from '@/domain/scheduler/events';

beforeEach(() => {
  window.localStorage.clear();
  reloadFromStorage();
});

afterEach(() => {
  vi.stubGlobal('fetch', () => Promise.reject(new Error('network disabled in tests')));
});

const stored = (): ReviewEvent[] => JSON.parse(window.localStorage.getItem(EVENTS_KEY) ?? '[]');

/** Open the mock list from the home screen. */
async function openMocks(user: ReturnType<typeof userEvent.setup>) {
  await screen.findByRole('button', { name: /Due today/ });
  await user.click(screen.getByRole('button', { name: /^Mocks/ }));
  return screen.findByRole('heading', { name: 'Mock tests' });
}

/** Every button on a drill screen that is not one of the four answer options. */
const CHROME = new Set([
  'Quiz', 'Recall', 'Show answer', 'Again', 'Hard', 'Good', 'Easy',
  'Next ›', '‹', '✕', 'Got lucky', 'Why?', 'Drill', 'Progress', 'Timeline', '⟳', '⚠',
]);

/**
 * Answer the card on screen; `how` decides right or wrong. Returns the question text.
 *
 * The wrong option is read off the SCREEN rather than taken from `answers.distractors`.
 * Numeric forms regenerate their four values at presentation time (D-014, D-021), so an
 * authored distractor is frequently not among the options actually rendered — the first
 * version of this helper used the authored list and failed on the first numeric question of
 * a test, which is a fact about the deck rather than about the mock.
 */
async function answerCard(user: ReturnType<typeof userEvent.setup>, how: 'right' | 'wrong') {
  const heading = screen.getByRole('heading', { level: 1 }).textContent!;
  const form = FIXED_TESTS.flatMap((t) => t.questions)
    .map((q) => factById(q.factId)!.forms[q.formIndex])
    .find((f) => f.question === heading)!;

  const onScreen = screen
    .getAllByRole('button')
    .map((b) => b.textContent ?? '')
    .filter((t) => t && !CHROME.has(t) && !/^\d+\/\d+$/.test(t));

  const correct = form.answers.correct;
  const target = how === 'right' ? correct : onScreen.find((t) => t !== correct)!;
  expect(target).toBeDefined();
  await user.click(screen.getByRole('button', { name: target }));
  return heading;
}

describe('modeFor', () => {
  /**
   * The unit statement of the hazard. Verified by moving the mock branch below the
   * first-contact check, which fails this and the two end-to-end assertions below.
   */
  it('records a mock as a mock even on first contact with the phrasing', () => {
    expect(modeFor('mock', false)).toBe('mock');
    expect(modeFor('mock', true)).toBe('mock');
    // The rule it must not fall through to.
    expect(modeFor('due', false)).toBe('scheduled');
    expect(modeFor('mistakes', false)).toBe('scheduled');
    expect(modeFor('mistakes', true)).toBe('practice');
  });
});

describe('the mock list', () => {
  it('offers all twenty, none sat', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openMocks(user);

    for (const id of [1, 7, 20]) {
      expect(screen.getByRole('button', { name: new RegExp(`^Test ${id}\\. Not sat yet`) })).toBeTruthy();
    }
    expect(screen.getAllByRole('button', { name: /^Test \d+\./ }).length).toBe(20);
  });

  /**
   * R-7: a mock score may be shown as a score and never as readiness or a probability of
   * passing, while L-002 and L-003 are `fixed-unverified`.
   *
   * The first version of this banned the word "readiness" outright and failed on the
   * screen's own disclaimer — *"A score here is a score, not a readiness figure"* — which is
   * the one sentence most worth keeping. Banning the word was the wrong check. So the
   * **exact set** of occurrences is declared instead, with its reason, and anything else
   * fails: the same pattern `deck/contradictions.ts` uses, for the same reason.
   */
  const DECLARED_READINESS_MENTIONS = ['A score here is a score, not a readiness figure.'];

  it('claims a score and never a readiness or a probability', async () => {
    const user = userEvent.setup();
    render(<App />);
    const heading = await openMocks(user);
    const text = heading.closest('div')!.textContent ?? '';

    // Nothing may read as a likelihood, in any wording, anywhere on the screen.
    expect(text).not.toMatch(/likely to pass|chance of passing|probability|odds of|% likely|ready to sit/i);

    // And "readiness" appears only where it is denied. Strip the declared mentions and
    // require nothing to be left — `textContent` runs adjacent elements together with no
    // separator, so splitting into sentences is not reliable here and removal is.
    let residue = text;
    for (const declared of DECLARED_READINESS_MENTIONS) {
      expect(residue).toContain(declared); // never vacuous
      residue = residue.replace(declared, '');
    }
    expect(residue).not.toMatch(/readiness/i);
  });
});

describe('sitting a test', () => {
  it('serves the test’s own questions, in its own order', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openMocks(user);
    await user.click(screen.getByRole('button', { name: /^Test 1\./ }));

    const test = FIXED_TESTS[0];
    for (let i = 0; i < 4; i++) {
      const expected = factById(test.questions[i].factId)!.forms[test.questions[i].formIndex].question;
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(expected);
      await answerCard(user, 'right');
      await user.click(screen.getByRole('button', { name: 'Next ›' }));
    }
  });

  /**
   * R-5, end to end through the real UI rather than at the unit level: a mock may pull a due
   * date forward or leave it alone, never push it out.
   */
  it('never pushes a fact further out, and records every answer as a mock', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openMocks(user);
    await user.click(screen.getByRole('button', { name: /^Test 2\./ }));

    const formCounts = new Map(FIXED_TESTS.flatMap((t) => t.questions)
      .map((q) => [q.factId, factById(q.factId)!.forms.length]));

    for (let i = 0; i < 6; i++) {
      const before = replay(stored(), formCounts).states;
      await answerCard(user, i % 2 === 0 ? 'right' : 'wrong');
      const after = replay(stored(), formCounts).states;

      for (const [factId, state] of after) {
        const was = before.get(factId);
        if (!was) continue;
        expect({ factId, due: state.due <= Math.max(was.due, 0) || state.due === was.due }).toEqual(
          { factId, due: true },
        );
        expect(state.ivl).toBeLessThanOrEqual(Math.max(was.ivl, 0));
      }
      await user.click(screen.getByRole('button', { name: 'Next ›' }));
    }

    const events = stored();
    expect(events.length).toBe(6);
    expect([...new Set(events.map((e) => e.mode))]).toEqual(['mock']);
  });

  /** Leaving mid-sitting is not abandonment: the log holds the place. */
  it('resumes a half-finished sitting where it stopped', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openMocks(user);
    await user.click(screen.getByRole('button', { name: /^Test 3\./ }));

    for (let i = 0; i < 3; i++) {
      await answerCard(user, 'right');
      await user.click(screen.getByRole('button', { name: 'Next ›' }));
    }
    await user.click(screen.getByRole('button', { name: 'Close' }));

    // Back on the list, and it says where the sitting got to.
    const row = await screen.findByRole('button', { name: /^Test 3\. Resume, 3 of 24 answered/ });
    await user.click(row);

    const test = FIXED_TESTS.find((t) => t.id === 3)!;
    const fourth = factById(test.questions[3].factId)!.forms[test.questions[3].formIndex].question;
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(fourth);
  });

  it('scores a completed sitting and shows it in the trend', async () => {
    const user = userEvent.setup();
    render(<App />);
    await openMocks(user);
    await user.click(screen.getByRole('button', { name: /^Test 4\./ }));

    // 20 right, 4 wrong.
    for (let i = 0; i < MOCK_LENGTH; i++) {
      await answerCard(user, i < 20 ? 'right' : 'wrong');
      await user.click(screen.getByRole('button', { name: 'Next ›' }));
    }

    const attempts = mockAttempts(stored(), FIXED_TESTS);
    expect(attempts.length).toBe(1);
    expect(attempts[0]).toMatchObject({ testId: 4, answered: 24, correct: 20, complete: true });

    await user.click(screen.getByRole('button', { name: 'Close' }));
    const heading = await screen.findByRole('heading', { name: 'Mock tests' });
    expect(within(heading.closest('div')!).getByRole('button', { name: /^Test 4\. Best 20 out of 24/ })).toBeTruthy();
    await waitFor(() => expect(screen.getByLabelText(/Completed mock scores/)).toBeTruthy());
  });
});
