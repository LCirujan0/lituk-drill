// @vitest-environment jsdom

/**
 * Component tests for the app.
 *
 * These exist because of a specific failure. Grading used to swap the card instantly — the
 * current card was derived straight from the event log, and the log changes on every grade —
 * so you never saw whether you were right and the explanation flashed past unread. Every
 * domain test passed. It was only found by opening the app.
 *
 * The first block below is that regression, written the way it should have existed first.
 */

import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from '@/app/page';
import { ACTIVE, DECK } from '@/domain/deck';
import { CHAPTER_NAMES } from '@/domain/deck/types';
import { BAND_IDS, bandOf } from '@/domain/deck/bands';
import { reloadFromStorage } from '@/adapters/store';
import { EVENTS_KEY } from '@/adapters/local-store';
import type { ReviewEvent } from '@/domain/scheduler/events';

/** The store is a module-level singleton — correct in a browser, a hazard across tests. */
beforeEach(() => {
  window.localStorage.clear();
  reloadFromStorage();
});


/** Every button on a drill screen that is not one of the four answer options. */
const CHROME = [
  'Quiz', 'Recall', 'Show answer', 'Again', 'Hard', 'Good', 'Easy',
  'Next ›', '‹', '✕', 'Got lucky', 'Drill', 'Progress', 'Timeline', '⟳', '⚠',
];

/** The correct and a wrong option for whatever card is currently on screen. */
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

const stored = (): ReviewEvent[] => JSON.parse(window.localStorage.getItem(EVENTS_KEY) ?? '[]');

describe('the card holds after answering — regression', () => {
  it('keeps the same question on screen once an option is chosen', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));

    const question = (await screen.findByRole('heading', { level: 1 })).textContent;
    expect(question).toBeTruthy();

    // Answer whatever is first. The card must not move.
    await user.click(screen.getByRole('button', { name: currentOptions().wrong }));

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(question);
    expect(screen.getByRole('button', { name: 'Next ›' })).toBeTruthy();
  });

  it('advances only when Next is pressed', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));

    const first = (await screen.findByRole('heading', { level: 1 })).textContent;
    await user.click(screen.getByRole('button', { name: currentOptions().wrong }));

    await user.click(screen.getByRole('button', { name: 'Next ›' }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 }).textContent).not.toBe(first);
    });
  });

  it('shows a verdict that says whether the answer was right', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    expect(screen.getByText(/^Correct\.$/)).toBeTruthy();
  });

  it('says so when the answer was wrong', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().wrong }));
    expect(screen.getByText(/^Not quite\.$/)).toBeTruthy();
  });
});

describe('the card carries nothing it does not need', () => {
  const openCard = async (user: ReturnType<typeof userEvent.setup>) => {
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    return screen.findByRole('heading', { level: 1 });
  };

  it('shows only a cross above the question', async () => {
    const user = userEvent.setup();
    const heading = await openCard(user);

    // The section title, the "N to go" counter and the mode toggle are gone. Everything still
    // on screen above the question is the one button that leaves.
    const above = [...document.querySelectorAll('button')].filter(
      (b) => heading.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING,
    );
    expect(above.map((b) => b.getAttribute('aria-label'))).toEqual(['Close']);
  });

  it('shows no chapter or tag chip on the card', async () => {
    const user = userEvent.setup();
    const heading = await openCard(user);
    const fact = DECK.find((f) => f.forms.some((x) => x.question === heading.textContent))!;

    // The chips said the chapter and the tag, and neither is anything the reader acts on
    // mid-card. The phrasings-proven dots went with them: that was a phrasing count rendered
    // as a progress bar, which R-12 forbids outright.
    expect(screen.queryByText(CHAPTER_NAMES[fact.chapter])).toBeNull();
    expect(screen.queryByText(fact.tag)).toBeNull();
  });

  it('does not print a verdict — the option colour carries it, and the live region does', async () => {
    const user = userEvent.setup();
    await openCard(user);
    await user.click(screen.getByRole('button', { name: currentOptions().correct }));

    // The text is still in the accessibility tree (WCAG 1.4.1: colour must not be the only
    // carrier) and is not laid out. `role="status"` is what a screen reader announces.
    const verdict = screen.getByText(/^Correct\.$/);
    expect(verdict.getAttribute('role')).toBe('status');
    expect(verdict.className).toMatch(/srOnly/);
  });
});

describe('the options do not move under your finger — regression', () => {
  /** Every button that is one of the four answer options, in the order shown. */
  const optionTexts = () => {
    const chrome = new Set(CHROME);
    return screen
      .getAllByRole('button')
      .map((b) => b.textContent ?? '')
      .filter((t) => t && !chrome.has(t) && !/^(Correct|Not quite)/.test(t));
  };

  // Every section, not just one. The bug lived in the seed, and the seed took a per-section
  // count: `due`, `new` and `mistakes` all move when you answer, but a chapter's total does
  // not. The first version of this test happened to pick a chapter and passed against
  // broken code — so the sections are enumerated rather than sampled.
  it.each([
    ['Due today', /^New/], // seeded first so something is due
    ['New', /^New/],
  ])('keeps the four options in the same order in %s', async (_label, opener) => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: opener }));
    await screen.findByRole('heading', { level: 1 });

    const before = optionTexts();
    expect(before).toHaveLength(4);
    await user.click(screen.getByRole('button', { name: before[0] }));
    expect(optionTexts()).toEqual(before);
  });

  it('keeps the four options in the same order after answering', async () => {
    // The seed for the option shuffle used to include a live count derived from the event
    // log. Answering appended an event, the count changed, and the options re-shuffled
    // mid-click — so `chosen` indexed the old arrangement while `correctIndex` came from
    // the new one, and the verdict was reported against a layout that no longer existed.
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^New/ }));
    await screen.findByRole('heading', { level: 1 });

    const before = optionTexts();
    expect(before).toHaveLength(4);

    await user.click(screen.getByRole('button', { name: before[0] }));

    expect(optionTexts()).toEqual(before);
  });

  it('reports the verdict against the option actually clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^New/ }));
    const heading = await screen.findByRole('heading', { level: 1 });

    // Find the fact on screen so we know its real answer independently of the UI.
    const fact = DECK.find((f) => f.forms.some((x) => x.question === heading.textContent))!;
    const correct = fact.forms.find((x) => x.question === heading.textContent)!.answers.correct;

    const options = optionTexts();
    const wrong = options.find((t) => t !== correct)!;
    await user.click(screen.getByRole('button', { name: wrong }));

    expect(screen.getByText(/^Not quite/)).toBeTruthy();
    expect(screen.queryByText(/^Correct/)).toBeNull();
  });

  it('records the grade that matches the verdict shown', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^New/ }));
    const heading = await screen.findByRole('heading', { level: 1 });

    const fact = DECK.find((f) => f.forms.some((x) => x.question === heading.textContent))!;
    const correct = fact.forms.find((x) => x.question === heading.textContent)!.answers.correct;

    await user.click(screen.getByRole('button', { name: correct }));

    // Screen and schedule must agree. A wrong verdict with a right grade is still a bug:
    // it teaches the wrong thing even while the scheduler stays intact.
    expect(screen.getByText(/^Correct/)).toBeTruthy();
    expect(stored()).toHaveLength(1);
    expect(stored()[0].grade).toBe(4);
  });
});

describe('got lucky — a guess is not knowledge', () => {
  it('offers the downgrade only after a CORRECT answer', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^New/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().wrong }));
    // Nothing to downgrade — it was already wrong.
    expect(screen.queryByRole('button', { name: /Got lucky/ })).toBeNull();
  });

  it('records a second event as a miss, so the fact lapses', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^New/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    expect(stored()).toHaveLength(1);
    expect(stored()[0].grade).toBe(4);

    await user.click(screen.getByRole('button', { name: /Got lucky/ }));

    expect(stored()).toHaveLength(2);
    expect(stored()[1].grade).toBe(0);
    expect(stored()[1].factId).toBe(stored()[0].factId);
    expect(screen.getByText(/Recorded as a miss/)).toBeTruthy();
  });

  it('cannot be pressed twice', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^New/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    await user.click(screen.getByRole('button', { name: /Got lucky/ }));

    expect(screen.queryByRole('button', { name: /Got lucky/ })).toBeNull();
    expect(stored()).toHaveLength(2);
  });

  it('puts the fact into the mistakes section', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^New/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    await user.click(screen.getByRole('button', { name: /Got lucky/ }));
    await user.click(screen.getByRole('button', { name: 'Close' }));

    const mistakes = await screen.findByRole('button', { name: /^Mistakes/ });
    expect(within(mistakes).getByText('1')).toBeTruthy();
  });
});

describe('explanations', () => {
  it('is hidden until the question is answered', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });

    // Showing context before the answer would give the answer away.
    expect(screen.queryByText(/backbone of the whole first chapter/)).toBeNull();
  });

  it('appears once the question is answered', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });

    const { fact } = currentOptions();
    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    // The WHOLE lead, exactly, as one element. A 40-character prefix used to be enough and is
    // not: the standard requires line 1 to state the answer as a complete sentence, so a lead
    // routinely opens with the answer's own words and collides with the option button and the
    // bolded answer. Matching the full sentence is both unambiguous and a stronger assertion —
    // it proves the panel rendered, not merely that the phrase appears somewhere.
    expect(screen.getByText(fact.explanation!.lead)).toBeTruthy();
  });
});

describe('recording a review', () => {
  it('writes exactly one event per answer', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });

    expect(stored()).toHaveLength(0);
    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    expect(stored()).toHaveLength(1);

    // Pressing Next must not record a second review.
    await user.click(screen.getByRole('button', { name: 'Next ›' }));
    expect(stored()).toHaveLength(1);
  });

  it('records a correct quiz answer as Good and a wrong one as Again', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    expect(stored()[0].grade).toBe(4);
    expect(stored()[0].mode).toBe('scheduled'); // first contact is always scheduled

    await user.click(screen.getByRole('button', { name: 'Next ›' }));
    await user.click(screen.getByRole('button', { name: currentOptions().wrong }));
    expect(stored()).toHaveLength(2);
    expect(stored()[1].grade).toBe(0);
  });
});

describe('the home screen', () => {
  /**
   * The headline, as `mastered` and `total`. Every number on this screen counts facts (D-032).
   *
   * Read off the whole `<p>` rather than the matched element: the "/537 mastered · 0%" span is
   * a child, and matching it alone loses the count in front of it.
   */
  const headline = () => {
    const suffix = screen.getByText(/mastered · \d+%$/);
    const text = (suffix.closest('p') ?? suffix).textContent ?? '';
    const [, mastered, total] = text.match(/^(\d[\d,]*)\/(\d[\d,]*) mastered/) ?? [];
    const n = (v?: string) => Number((v ?? '').replace(/,/g, ''));
    return { mastered: n(mastered), total: n(total) };
  };

  /** A tile's count. The icon is `aria-hidden`, so the name starts at the tile's own label. */
  const tile = (name: RegExp) =>
    Number(
      (screen.getByRole('button', { name }).textContent ?? '').replace(/[^\d]/g, '') || '0',
    );

  it('counts facts everywhere, and none of the numbers is a phrasing count', async () => {
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });

    const forms = ACTIVE.reduce((n, f) => n + f.forms.length, 0);
    expect(forms, 'this test is vacuous unless the two totals differ').toBeGreaterThan(ACTIVE.length);

    // On a fresh install: nothing mastered, nothing missed, and every fact is New.
    expect(headline()).toEqual({ mastered: 0, total: ACTIVE.length });
    expect(tile(/^New/)).toBe(ACTIVE.length);
    expect(tile(/^Mistakes/)).toBe(0);
    expect(tile(/^Mastered/)).toBe(0);

    // The bug this replaces: New showed the unseen PHRASING count, 1,575 against 537 facts.
    expect(screen.queryByText(forms.toLocaleString('en-GB'))).toBeNull();
  });

  it('adds up: New + Mistakes + Mastered is the deck, before and after answering', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    expect(tile(/^New/) + tile(/^Mistakes/) + tile(/^Mastered/)).toBe(ACTIVE.length);

    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });
    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    await user.click(screen.getByRole('button', { name: 'Close' }));

    await screen.findByRole('button', { name: /Due today/ });
    expect(tile(/^New/) + tile(/^Mistakes/) + tile(/^Mastered/)).toBe(ACTIVE.length);
  });

  it('takes the headline UP by exactly one on a single correct answer', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    await user.click(screen.getByRole('button', { name: 'Close' }));

    // One correct answer masters a fact. It used to require every phrasing proven, so the
    // headline read 0 after a fortnight of correct answers (D-032 supersedes D-028).
    await waitFor(() => expect(headline().mastered).toBe(1));
    expect(tile(/^New/)).toBe(ACTIVE.length - 1);
    expect(tile(/^Mastered/)).toBe(1);
    expect(stored()).toHaveLength(1);
  });

  it('takes the headline DOWN by one when a mastered fact is then missed', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });

    // Correct first, so the headline has somewhere to fall from.
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });
    const { fact } = currentOptions();
    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    await user.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(headline().mastered).toBe(1));

    // Then miss it. Opening Mastered is what makes this deterministic: that section serves
    // exactly the mastered facts, and there is exactly one.
    await user.click(screen.getByRole('button', { name: /^Mastered/ }));
    await screen.findByRole('heading', { level: 1 });
    expect(currentOptions().fact.id).toBe(fact.id);
    await user.click(screen.getByRole('button', { name: currentOptions().wrong }));
    await user.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() => expect(headline().mastered).toBe(0));
    expect(tile(/^Mistakes/)).toBeGreaterThan(0);
    // Answered, so never New again however it went.
    expect(tile(/^New/)).toBeLessThan(ACTIVE.length);
  });

  it('moves a missed fact into the mistakes section', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().wrong }));
    await user.click(screen.getByRole('button', { name: 'Close' }));

    const mistakes = await screen.findByRole('button', { name: /^Mistakes/ });
    expect(within(mistakes).getByText('1')).toBeTruthy();
  });
});

describe('recall mode', () => {
  /**
   * Turn recall on. The toggle used to sit above every card and now lives in Settings on the
   * Progress tab — a preference set once rather than a per-card decision, and 40px reclaimed
   * from the one screen with none to spare.
   */
  const chooseRecall = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(screen.getByRole('button', { name: /Progress/ }));
    await user.click(screen.getByRole('button', { name: 'Recall' }));
    await user.click(screen.getByRole('button', { name: /Drill/ }));
  };

  it('is reachable from Settings, not from the card', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });

    // Nothing above the question but the cross.
    expect(screen.queryByRole('button', { name: 'Recall' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Quiz' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
  });

  it('hides the answer until it is revealed, then offers four grades', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await chooseRecall(user);
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });

    expect(screen.getByRole('button', { name: 'Show answer' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Show answer' }));

    for (const label of ['Again', 'Hard', 'Good', 'Easy']) {
      expect(screen.getByRole('button', { name: label })).toBeTruthy();
    }
  });

  it('holds the card after grading, same as quiz mode', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await chooseRecall(user);
    await user.click(screen.getByRole('button', { name: /^Values/ }));

    const question = (await screen.findByRole('heading', { level: 1 })).textContent;
    await user.click(screen.getByRole('button', { name: 'Show answer' }));
    await user.click(screen.getByRole('button', { name: 'Good' }));

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(question);
    expect(screen.getByRole('button', { name: 'Next ›' })).toBeTruthy();
    expect(stored()).toHaveLength(1);
  });
});

describe('navigation', () => {
  it('moves between the three tabs without a back button', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });

    await user.click(screen.getByRole('button', { name: /Progress/ }));
    expect(await screen.findByRole('heading', { name: 'Progress' })).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /Timeline/ }));
    expect(await screen.findByRole('heading', { name: 'The spine' })).toBeTruthy();
    // getAllBy, not getBy: Hastings is named four times across the expanded chronology — the
    // event, the section it anchors, and both of the figures it turns on. This assertion is
    // only here to prove the tab rendered the chronology at all.
    expect(screen.getAllByText(/Battle of Hastings/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: /Drill/ }));
    expect(await screen.findByRole('button', { name: /Due today/ })).toBeTruthy();
  });

  it('hides the tab bar while a card is on screen', async () => {
    // A stray tap on the tab bar mid-question costs you your place, and the bottom of that
    // screen belongs to the card's own actions.
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    expect(screen.getByRole('navigation', { name: 'Sections' })).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /^New/ }));
    await screen.findByRole('heading', { level: 1 });
    expect(screen.queryByRole('navigation', { name: 'Sections' })).toBeNull();
  });

  it('collapses the chronology, and can open all of it at once', async () => {
    // Eleven eras is an eleven-screen scroll if everything is open, and a screen that long
    // gets read once and then avoided. Collapsed, the whole arc fits — and the arc is the
    // thing a timeline is for.
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /Timeline/ }));
    await screen.findByRole('heading', { name: 'The spine' });

    // Eras plus their sections, so this is now well over eleven.
    expect(document.querySelectorAll('details').length).toBeGreaterThan(8);
    // Two open, and it is deliberately two: the first ERA, and the first SECTION inside it.
    // One of each level, because a reader who sees only the era open has no way of knowing the
    // inner rows also do something — the same reasoning that opens the first era at all.
    const open = [...document.querySelectorAll('details')].filter((e) => (e as HTMLDetailsElement).open);
    expect(open).toHaveLength(2);

    await user.click(screen.getByRole('button', { name: 'Expand all' }));
    const opened = document.querySelectorAll('details');
    expect([...opened].every((e) => (e as HTMLDetailsElement).open)).toBe(true);

    await user.click(screen.getByRole('button', { name: 'Collapse all' }));
    expect([...document.querySelectorAll('details')].some((e) => (e as HTMLDetailsElement).open)).toBe(false);
  });

  it('names the people an era turns on, and what each is remembered for', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /Timeline/ }));
    await screen.findByRole('heading', { name: 'The spine' });

    // Caesar and Claudius are the discrimination the drill cards keep testing. Gathered here,
    // side by side, with the thing that tells them apart — one invasion failed and one stuck,
    // and the cast list is where that contrast is easiest to hold.
    expect(screen.getByText('Julius Caesar')).toBeTruthy();
    expect(screen.getByText(/invasion that was unsuccessful/)).toBeTruthy();
    expect(screen.getByText('Emperor Claudius')).toBeTruthy();
    expect(screen.getByText(/successful in occupying almost all of Britain/)).toBeTruthy();

    // "Who to know" is a group heading at the same level as the sections, not an <h3> inside
    // the era — people and events are siblings now, which is what lets the cast be reached
    // without opening the chronology.
    expect(screen.getAllByText('Who to know').length).toBeGreaterThan(4);
  });

  it('shows an empty state for a section with nothing in it', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });

    await user.click(screen.getByRole('button', { name: /^Mistakes/ }));
    expect(await screen.findByText(/Nothing outstanding/)).toBeTruthy();
  });
});

describe('stepping back through the session — regression', () => {
  /**
   * The reported bug: "Back returns to Home, so once I press Next the card is gone." The
   * answer and the explanation were destroyed by the only control that moved you on, which
   * makes the explanation unreadable in practice — you get one glance at it, while still
   * thinking about the question.
   */
  const optionButtons = () => {
    const chrome = new Set(CHROME);
    return screen
      .getAllByRole('button')
      .map((b) => b.textContent ?? '')
      .filter((t) => t && !chrome.has(t) && !/^(Correct|Not quite|Recorded|‹)/.test(t));
  };

  /** Answer the card on screen and move on, returning what was asked and what was pressed. */
  async function answerAndAdvance(user: ReturnType<typeof userEvent.setup>) {
    const question = screen.getByRole('heading', { level: 1 }).textContent!;
    const options = optionButtons();
    const pressed = options[0];
    await user.click(screen.getByRole('button', { name: pressed }));
    await user.click(screen.getByRole('button', { name: 'Next ›' }));
    return { question, pressed, options };
  }

  async function openDrill(user: ReturnType<typeof userEvent.setup>) {
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^New/ }));
    await screen.findByRole('heading', { level: 1 });
  }

  it('brings back the question, the option pressed and the explanation', async () => {
    const user = userEvent.setup();
    await openDrill(user);

    const first = await answerAndAdvance(user);
    // A second card is now on screen and the first is gone.
    expect(screen.getByRole('heading', { level: 1 }).textContent).not.toBe(first.question);

    await user.click(screen.getByRole('button', { name: 'Previous card' }));

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(first.question);
    // The option pressed is still marked, and the explanation is on screen to be re-read.
    const fact = DECK.find((f) => f.forms.some((x) => x.question === first.question))!;
    expect(screen.getByText(fact.explanation!.lead.slice(0, 40), { exact: false })).toBeTruthy();
    expect(screen.getByRole('button', { name: first.pressed })).toBeTruthy();
  });

  it('shows the same four options in the same order it showed them', async () => {
    const user = userEvent.setup();
    await openDrill(user);

    const first = await answerAndAdvance(user);
    await user.click(screen.getByRole('button', { name: 'Previous card' }));

    // Reproduced from the card's own nonce, not re-shuffled. A different order would be a
    // record of something that never happened.
    expect(optionButtons()).toEqual(first.options);
  });

  it('records no second review for a card being re-read', async () => {
    const user = userEvent.setup();
    await openDrill(user);

    await answerAndAdvance(user);
    const after = stored().length;
    expect(after).toBe(1);

    await user.click(screen.getByRole('button', { name: 'Previous card' }));
    // Every option is inert. Pressing one must not grade anything a second time.
    await user.click(screen.getByRole('button', { name: optionButtons()[1] }));

    expect(stored()).toHaveLength(after);
    expect(screen.queryByRole('button', { name: 'Got lucky — I guessed' })).toBeNull();
  });

  it('returns to the live card without re-dealing it — R-11', async () => {
    const user = userEvent.setup();
    await openDrill(user);

    await answerAndAdvance(user);
    const liveQuestion = screen.getByRole('heading', { level: 1 }).textContent;
    const liveOptions = optionButtons();

    await user.click(screen.getByRole('button', { name: 'Previous card' }));
    await user.click(screen.getByRole('button', { name: 'Next ›' }));

    // The same card, not another one drawn from the queue, and the same option order.
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(liveQuestion);
    expect(optionButtons()).toEqual(liveOptions);
    // Still answerable — it was never answered.
    expect(stored()).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: liveOptions[0] }));
    expect(stored()).toHaveLength(2);
  });

  it('keeps an answered live card answered when you come back to it', async () => {
    const user = userEvent.setup();
    await openDrill(user);

    await answerAndAdvance(user);
    await user.click(screen.getByRole('button', { name: optionButtons()[0] }));
    expect(screen.getByRole('button', { name: 'Next ›' })).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Previous card' }));
    await user.click(screen.getByRole('button', { name: 'Next ›' }));

    // Its verdict and its Next button survive the round trip; nothing was regraded.
    expect(screen.getByRole('button', { name: 'Next ›' })).toBeTruthy();
    expect(stored()).toHaveLength(2);
  });

  it('counts the position through the session', async () => {
    const user = userEvent.setup();
    await openDrill(user);

    // Previous exists from the first card, disabled — the action bar does not change shape
    // under your thumb as the session grows.
    expect((screen.getByRole('button', { name: 'Previous card' }) as HTMLButtonElement).disabled).toBe(true);

    await answerAndAdvance(user);
    expect(screen.getByText('2/2')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Previous card' }));
    expect(screen.getByText('1/2')).toBeTruthy();
    // Nowhere further back to go.
    expect((screen.getByRole('button', { name: 'Previous card' }) as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('a sync landing mid-card does not move it — R-11', () => {
  /**
   * The rule R-11 exists for: nothing derived from the review log may drive what is on
   * screen mid-card. Sync makes the log change on its own schedule rather than only when
   * you answer, so the class of bug it names now has a second way in — the other device.
   */
  const chrome = new Set(CHROME);
  const optionTexts = () =>
    screen
      .getAllByRole('button')
      .map((b) => b.textContent ?? '')
      .filter((t) => t && !chrome.has(t) && !/^(Correct|Not quite|Recorded)/.test(t));

  /** A server holding reviews this device has never seen, so a pull genuinely changes the log. */
  function serverWith(count: number) {
    const events: ReviewEvent[] = Array.from({ length: count }, (_, i) => ({
      id: `remote-${i}`,
      factId: DECK[i + 40].id,
      formIndex: 0,
      grade: 4 as const,
      mode: 'scheduled' as const,
      at: 1_700_000_000_000 + i * 1000,
    }));
    vi.stubGlobal('fetch', async (_url: unknown, init?: RequestInit) =>
      ({
        ok: true,
        status: 200,
        json: async () => (init?.method === 'POST' ? { inserted: 0 } : { events }),
      }) as unknown as Response,
    );
    return events;
  }

  afterEach(() => {
    vi.stubGlobal('fetch', () => Promise.reject(new Error('network disabled in tests')));
  });

  it('keeps the question and the option order when a pull arrives after answering', async () => {
    const remote = serverWith(6);
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^New/ }));
    await screen.findByRole('heading', { level: 1 });

    const question = screen.getByRole('heading', { level: 1 }).textContent;
    const before = optionTexts();
    expect(before).toHaveLength(4);

    // Answering fires a sync. The pull lands while this card is still on screen.
    await user.click(screen.getByRole('button', { name: before[0] }));

    // Prove the sync actually landed — otherwise this test asserts nothing at all.
    await waitFor(() => expect(stored().length).toBe(remote.length + 1));

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(question);
    expect(optionTexts()).toEqual(before);
  });

  it('keeps the verdict it showed', async () => {
    serverWith(6);
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^New/ }));
    const heading = await screen.findByRole('heading', { level: 1 });

    const fact = DECK.find((f) => f.forms.some((x) => x.question === heading.textContent))!;
    const correct = fact.forms.find((x) => x.question === heading.textContent)!.answers.correct;

    await user.click(screen.getByRole('button', { name: correct }));
    await waitFor(() => expect(stored().length).toBeGreaterThan(1));

    expect(screen.getByText(/^Correct/)).toBeTruthy();
    expect(screen.queryByText(/^Not quite/)).toBeNull();
  });
});

describe('persistence', () => {
  it('restores answered reviews after a remount', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await screen.findByRole('button', { name: /Due today/ });
    await user.click(screen.getByRole('button', { name: /^Values/ }));
    await screen.findByRole('heading', { level: 1 });
    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    unmount();

    reloadFromStorage();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });

    // The review survived, so New is one lower than the full deck — facts, not phrasings
    // (D-032). Derived rather than hardcoded: the deck changes, and a literal here would need
    // changing every time without asserting anything more.
    // Formatted, because the home screen groups thousands — asserting the raw digits would
    // pass today and break the first time a count crosses 1,000.
    const shown = (n: number) => n.toLocaleString('en-GB');
    expect(screen.queryByText(shown(ACTIVE.length))).toBeNull();
    expect(screen.getByText(shown(ACTIVE.length - 1))).toBeTruthy();
  });
});

describe('chapters and bands — both drillable, both showing progress (C4/C5)', () => {
  /**
   * The owner's requirement, 10 August 2026: *"ideally chapters can be expanded into multiple
   * bands, but I can still practise either chapters or bands and measure progress for each."*
   *
   * So the assertions here are that neither cut replaces the other. Chapters still drill; bands
   * drill too; both carry their own three-way split; and the split shown for a band is the band's
   * own denominator rather than the deck's — which is the failure a shared component invites.
   */
  const rowNamed = (name: RegExp) => screen.getByRole('button', { name });

  it('opens a band drill, and serves a fact from that band', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });

    await user.click(screen.getByRole('tab', { name: 'Bands' }));
    await user.click(rowNamed(/^Early Britain, to 1485 — /));

    const heading = await screen.findByRole('heading', { level: 1 });
    // The card served must belong to the band, not merely to the deck. Matched on the question
    // text because the card carries no id — which is also what makes this a real check.
    const inBand = new Set(
      ACTIVE.filter((f) => bandOf(f) === 'early').flatMap((f) => f.forms.map((q) => q.question)),
    );
    expect(inBand.has(heading.textContent ?? '')).toBe(true);
  });

  it('still opens a chapter drill after the band cut has been shown', async () => {
    // The toggle is view state, and a cut left on Bands must not strand the chapters.
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });

    await user.click(screen.getByRole('tab', { name: 'Bands' }));
    await user.click(screen.getByRole('tab', { name: 'Chapters' }));
    await user.click(rowNamed(/^Values — /));

    const heading = await screen.findByRole('heading', { level: 1 });
    const inChapter = new Set(
      ACTIVE.filter((f) => f.chapter === 1).flatMap((f) => f.forms.map((q) => q.question)),
    );
    expect(inChapter.has(heading.textContent ?? '')).toBe(true);
  });

  it('gives every row its own three figures, summing to that row alone', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('button', { name: /Due today/ });

    // The accessible name carries all three figures as words, so colour is not the only carrier
    // of which segment is which (WCAG 1.4.1, and L-004/L-034 are both open).
    const read = (label: string) => {
      const m = label.match(/— (\d+) facts: (\d+) mastered, (\d+) mistakes, (\d+) not yet tried$/);
      expect(m, `row label does not carry its three figures: ${label}`).toBeTruthy();
      return m!.slice(1).map(Number);
    };

    for (const cut of ['Chapters', 'Bands'] as const) {
      await user.click(screen.getByRole('tab', { name: cut }));
      const rows = screen.getAllByRole('button', { name: / — \d+ facts: / });
      expect(rows.length).toBe(cut === 'Chapters' ? 5 : BAND_IDS.length);

      let total = 0;
      for (const row of rows) {
        const [n, mastered, mistakes, fresh] = read(row.getAttribute('aria-label') ?? '');
        expect(mastered + mistakes + fresh, 'the row does not partition itself').toBe(n);
        // The denominator is the row's own, never the deck's — the bug a shared row invites.
        expect(n).toBeLessThan(ACTIVE.length);
        total += n;
      }
      expect(total, `${cut} do not partition the deck`).toBe(ACTIVE.length);
    }
  });
});
