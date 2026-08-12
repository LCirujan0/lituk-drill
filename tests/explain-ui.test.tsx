// @vitest-environment jsdom

/**
 * The explain button on a real card (C8(a), D-034).
 *
 * The screening's fifth condition — *the app works with no network and no key, and the
 * button is absent rather than broken* — is a claim about what is on screen, so it is
 * asserted here rather than in the route. The default in this suite is the offline case:
 * `tests/setup.ts` stubs `fetch` to reject, which is the same path a phone with no signal
 * takes, so "no button" is what every other test in the repo already sees.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from '@/app/page';
import { DECK } from '@/domain/deck';
import { reloadFromStorage } from '@/adapters/store';

beforeEach(() => {
  window.localStorage.clear();
  reloadFromStorage();
});

/**
 * Put the rejecting fetch back after every test — the convention `app.test.tsx` already uses.
 *
 * Without it `vi.stubGlobal` is never undone (there is no `unstubGlobals` in the config), so a
 * `stubExplain()` leaks into every later test in the file and the "no key" assertions pass
 * only because they happen to be declared first. Reproduced with
 * `--sequence.shuffle.suites --sequence.seed=3`, which runs them last and fails the one that
 * carries screening condition 5. It can only flip green to red, never the reverse, but an
 * assertion whose result depends on declaration order is not an assertion.
 */
afterEach(() => {
  vi.stubGlobal('fetch', () => Promise.reject(new Error('network disabled in tests')));
});

const CHROME = [
  'Quiz', 'Recall', 'Show answer', 'Again', 'Hard', 'Good', 'Easy',
  'Next ›', '‹', '✕', 'Got lucky', 'Drill', 'Progress', 'Timeline', '⟳', '⚠',
  'Why?',
];

function currentOptions() {
  const heading = screen.getByRole('heading', { level: 1 }).textContent;
  const fact = DECK.find((f) => f.forms.some((x) => x.question === heading))!;
  const form = fact.forms.find((x) => x.question === heading)!;
  const chrome = new Set(CHROME);
  const shown = screen
    .getAllByRole('button')
    .map((b) => b.textContent ?? '')
    .filter((t) => t && !chrome.has(t) && !/^(Correct|Not quite)/.test(t));
  return { fact, correct: form.answers.correct, wrong: shown.find((t) => t !== form.answers.correct)! };
}

/**
 * Answer the first card of the Values chapter, and say whether to get it right or wrong.
 * Returns after the verdict is on screen.
 */
async function answerFirstCard(user: ReturnType<typeof userEvent.setup>, how: 'right' | 'wrong') {
  await screen.findByRole('button', { name: /Due today/ });
  await user.click(screen.getByRole('button', { name: /^Values/ }));
  await screen.findByRole('heading', { level: 1 });
  const { correct, wrong } = currentOptions();
  await user.click(screen.getByRole('button', { name: how === 'right' ? correct : wrong }));
}

/**
 * Answer `/api/explain` as a configured server would, and hand back the POST bodies so a
 * test can assert on what actually left the browser.
 */
function stubExplain(text = 'Because the handbook says otherwise.') {
  const posts: unknown[] = [];
  vi.stubGlobal('fetch', (url: string, init?: RequestInit) => {
    if (typeof url === 'string' && url.startsWith('/api/explain')) {
      if (init?.method === 'POST') {
        posts.push(JSON.parse(String(init.body)));
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ text }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ available: true }) });
    }
    return Promise.reject(new Error('network disabled in tests'));
  });
  return posts;
}

describe('with no key and no network', () => {
  it('shows no explain button on a wrong answer', async () => {
    const user = userEvent.setup();
    render(<App />);
    await answerFirstCard(user, 'wrong');

    expect(screen.queryByRole('button', { name: 'Why?' })).toBeNull();
  });

  /**
   * The point of the condition, and the reason it is worded "absent, not broken": a control
   * that is present and disabled is a promise the app cannot keep. Verified by rendering the
   * button unconditionally, which failed this.
   */
  it('leaves the rest of the card working', async () => {
    const user = userEvent.setup();
    render(<App />);
    await answerFirstCard(user, 'wrong');

    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Next ›' })).toBeTruthy();
  });
});

describe('with a key configured', () => {
  it('offers the button on a wrong answer only', async () => {
    stubExplain();
    const user = userEvent.setup();
    render(<App />);
    await answerFirstCard(user, 'right');

    // A right answer has nothing to explain — the feature is "why is the option you picked
    // wrong", and offering it here would invite the model to argue with a correct answer.
    await waitFor(() => expect(screen.getByRole('button', { name: 'Next ›' })).toBeTruthy());
    expect(screen.queryByRole('button', { name: 'Why?' })).toBeNull();
  });

  it('asks, and shows the answer under a line saying where it came from', async () => {
    stubExplain('You picked 46, which is the present figure rather than the book’s.');
    const user = userEvent.setup();
    render(<App />);
    await answerFirstCard(user, 'wrong');

    const ask = await screen.findByRole('button', { name: 'Why?' });
    await user.click(ask);

    await screen.findByText(/present figure rather than the book/);
    // Nothing generated is ever served as an answer without a source (D-034).
    expect(screen.getByText(/The answer above wins/)).toBeTruthy();
  });

  /**
   * Screening conditions 1 and 2, at the only place a browser could break them. The body is
   * three fields; everything else the model sees is resolved server-side from the deck.
   */
  it('sends three fields and no review history', async () => {
    const posts = stubExplain();
    const user = userEvent.setup();
    render(<App />);
    await answerFirstCard(user, 'wrong');
    await user.click(await screen.findByRole('button', { name: 'Why?' }));
    await screen.findByText(/The answer above wins/);

    expect(posts).toHaveLength(1);
    const body = posts[0] as Record<string, unknown>;
    expect(Object.keys(body).sort()).toEqual(['chosen', 'factId', 'formIndex']);
    expect(typeof body.chosen).toBe('string');
    expect(String(body.factId)).toMatch(/^f\d{3}$/);
  });

  /**
   * Condition 3, nothing generated is stored. Leaving the card must discard the text, and
   * the card must not carry it back — `CardAnswer` deliberately has no field for it.
   */
  it('forgets the explanation when the card is left', async () => {
    stubExplain('EXPLANATION_UNDER_TEST');
    const user = userEvent.setup();
    render(<App />);
    await answerFirstCard(user, 'wrong');
    await user.click(await screen.findByRole('button', { name: 'Why?' }));
    await screen.findByText('EXPLANATION_UNDER_TEST');

    await user.click(screen.getByRole('button', { name: 'Next ›' }));
    await waitFor(() => expect(screen.queryByText('EXPLANATION_UNDER_TEST')).toBeNull());

    // And stepping back to it does not bring it back.
    await user.click(screen.getByRole('button', { name: 'Previous card' }));
    await waitFor(() => expect(screen.queryByText('EXPLANATION_UNDER_TEST')).toBeNull());
  });

  /**
   * Regression, and the reason the button is where it is.
   *
   * It first shipped below the options, inside the scrolling body. Measured in a real browser
   * at 402×874 that cost **48px** on a card whose body was already exactly full — 725px of
   * content in 725px of space — so the first answered card went from fitting with no scroll
   * at all to overflowing, and the button itself landed at y=809–853 behind an action bar
   * pinned at 817. An action you have to scroll to find is what D-033 pinned that bar to
   * prevent.
   *
   * jsdom does no layout, so this cannot re-measure the 48px. What it can hold is the
   * structural fact the measurement produced: the control is a child of the action bar, not
   * of the scrolling body. That is the tripwire — moving it back fails here.
   */
  it('keeps the button in the pinned action bar, not the scrolling body', async () => {
    stubExplain();
    const user = userEvent.setup();
    render(<App />);
    await answerFirstCard(user, 'wrong');

    const why = await screen.findByRole('button', { name: 'Why?' });
    const next = screen.getByRole('button', { name: 'Next ›' });

    // "The action bar" is defined as whatever contains Next ›, which is pinned by D-033 and
    // asserted by layout.test.ts. Naming it that way avoids pinning a CSS class name here.
    expect(next.parentElement).not.toBeNull();
    expect(why.parentElement).toBe(next.parentElement);
  });

  it('says so plainly when the explainer cannot be reached', async () => {
    vi.stubGlobal('fetch', (url: string, init?: RequestInit) => {
      if (typeof url === 'string' && url.startsWith('/api/explain')) {
        if (init?.method === 'POST') return Promise.reject(new Error('offline'));
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ available: true }) });
      }
      return Promise.reject(new Error('network disabled in tests'));
    });

    const user = userEvent.setup();
    render(<App />);
    await answerFirstCard(user, 'wrong');
    await user.click(await screen.findByRole('button', { name: 'Why?' }));

    await screen.findByText(/Could not reach the explainer/);
    // The card is untouched by the failure.
    expect(screen.getByRole('button', { name: 'Next ›' })).toBeTruthy();
  });
});
