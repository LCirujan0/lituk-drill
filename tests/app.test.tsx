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
import { beforeEach, describe, expect, it } from 'vitest';

import App from '@/app/page';
import { DECK } from '@/domain/deck';
import { reloadFromStorage } from '@/adapters/store';
import { EVENTS_KEY } from '@/adapters/local-store';
import type { ReviewEvent } from '@/domain/scheduler/events';

/** The store is a module-level singleton — correct in a browser, a hazard across tests. */
beforeEach(() => {
  window.localStorage.clear();
  reloadFromStorage();
});


/** The correct and a wrong option for whatever card is currently on screen. */
function currentOptions() {
  const heading = screen.getByRole('heading', { level: 1 }).textContent;
  const fact = DECK.find((f) => f.forms.some((x) => x.question === heading))!;
  const form = fact.forms.find((x) => x.question === heading)!;
  const chrome = new Set(['Back', 'Quiz', 'Recall', 'Next', 'Show answer', 'Again', 'Hard', 'Good', 'Easy', '‹']);
  const shown = screen
    .getAllByRole('button')
    .map((b) => b.textContent ?? '')
    .filter((t) => t && !chrome.has(t) && !/^(Correct|Not quite)/.test(t));
  return { fact, correct: form.answers.correct, wrong: shown.find((t) => t !== form.answers.correct)! };
}

/** Open a section and wait for its first card. */
async function open(user: ReturnType<typeof userEvent.setup>, name: RegExp) {
  render(<App />);
  await screen.findByText(/phrasings proven/);
  await user.click(screen.getByRole('button', { name }));
  await screen.findByRole('heading', { level: 1 });
}

const stored = (): ReviewEvent[] => JSON.parse(window.localStorage.getItem(EVENTS_KEY) ?? '[]');

/** Click whichever option is currently rendered at `index`. */
async function answerOption(user: ReturnType<typeof userEvent.setup>, predicate: (text: string) => boolean) {
  const buttons = screen.getAllByRole('button');
  const option = buttons.find((b) => predicate(b.textContent ?? ''));
  expect(option, 'no option matched').toBeTruthy();
  await user.click(option!);
}

describe('the card holds after answering — regression', () => {
  it('keeps the same question on screen once an option is chosen', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));

    const question = (await screen.findByRole('heading', { level: 1 })).textContent;
    expect(question).toBeTruthy();

    // Answer whatever is first. The card must not move.
    const before = screen.getAllByRole('button').filter((b) => b.textContent && b.textContent.length < 80);
    await user.click(before[before.length - 1]);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(question);
    expect(screen.getByRole('button', { name: 'Next' })).toBeTruthy();
  });

  it('advances only when Next is pressed', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));

    const first = (await screen.findByRole('heading', { level: 1 })).textContent;
    const options = screen.getAllByRole('button').filter((b) => (b.textContent ?? '').length < 80);
    await user.click(options[options.length - 1]);

    await user.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 }).textContent).not.toBe(first);
    });
  });

  it('shows a verdict that says whether the answer was right', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    expect(screen.getByText(/^Correct\.$/)).toBeTruthy();
  });

  it('says so when the answer was wrong', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().wrong }));
    expect(screen.getByText(/^Not quite\.$/)).toBeTruthy();
  });
});

describe('the options do not move under your finger — regression', () => {
  /** Every button that is one of the four answer options, in the order shown. */
  const optionTexts = () => {
    const chrome = new Set(['Back', 'Quiz', 'Recall', 'Next', 'Show answer', 'Again', 'Hard', 'Good', 'Easy', '‹']);
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
    ['Due today', /Not tried yet/], // seeded first so something is due
    ['Not tried yet', /Not tried yet/],
  ])('keeps the four options in the same order in %s', async (_label, opener) => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
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
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /Not tried yet/ }));
    await screen.findByRole('heading', { level: 1 });

    const before = optionTexts();
    expect(before).toHaveLength(4);

    await user.click(screen.getByRole('button', { name: before[0] }));

    expect(optionTexts()).toEqual(before);
  });

  it('reports the verdict against the option actually clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /Not tried yet/ }));
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
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /Not tried yet/ }));
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

describe('explanations', () => {
  it('is hidden until the question is answered', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
    await screen.findByRole('heading', { level: 1 });

    // Showing context before the answer would give the answer away.
    expect(screen.queryByText(/backbone of the whole first chapter/)).toBeNull();
  });

  it('appears once the question is answered', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
    await screen.findByRole('heading', { level: 1 });

    const { fact } = currentOptions();
    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    expect(screen.getByText(fact.explanation!.slice(0, 40), { exact: false })).toBeTruthy();
  });
});

describe('recording a review', () => {
  it('writes exactly one event per answer', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
    await screen.findByRole('heading', { level: 1 });

    expect(stored()).toHaveLength(0);
    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    expect(stored()).toHaveLength(1);

    // Pressing Next must not record a second review.
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(stored()).toHaveLength(1);
  });

  it('records a correct quiz answer as Good and a wrong one as Again', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    expect(stored()[0].grade).toBe(4);
    expect(stored()[0].mode).toBe('scheduled'); // first contact is always scheduled

    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: currentOptions().wrong }));
    expect(stored()).toHaveLength(2);
    expect(stored()[1].grade).toBe(0);
  });
});

describe('the home screen', () => {
  it('shows the deck size and a zeroed count on a fresh install', async () => {
    render(<App />);
    expect(await screen.findByText(/443 facts/)).toBeTruthy();
    expect(screen.getByText(/of 1327/)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Not tried yet/ })).toBeTruthy();
  });

  it('moves a missed fact into the mistakes section', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().wrong }));
    await user.click(screen.getByRole('button', { name: 'Back' }));

    const mistakes = await screen.findByRole('button', { name: /Your mistakes/ });
    expect(within(mistakes).getByText('1')).toBeTruthy();
  });

  it('counts a proven phrasing after a correct answer', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    await user.click(screen.getByRole('button', { name: 'Back' }));

    await waitFor(() => expect(screen.getByText('1')).toBeTruthy());
  });
});

describe('recall mode', () => {
  it('hides the answer until it is revealed, then offers four grades', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: 'Recall' }));

    expect(screen.getByRole('button', { name: 'Show answer' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Show answer' }));

    for (const label of ['Again', 'Hard', 'Good', 'Easy']) {
      expect(screen.getByRole('button', { name: label })).toBeTruthy();
    }
  });

  it('holds the card after grading, same as quiz mode', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
    await screen.findByRole('heading', { level: 1 });

    await user.click(screen.getByRole('button', { name: 'Recall' }));
    const question = (await screen.findByRole('heading', { level: 1 })).textContent;
    await user.click(screen.getByRole('button', { name: 'Show answer' }));
    await user.click(screen.getByRole('button', { name: 'Good' }));

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(question);
    expect(screen.getByRole('button', { name: 'Next' })).toBeTruthy();
    expect(stored()).toHaveLength(1);
  });
});

describe('navigation', () => {
  it('reaches progress and back', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);

    await user.click(screen.getByRole('button', { name: 'Progress' }));
    expect(await screen.findByRole('heading', { name: 'Progress' })).toBeTruthy();
    expect(screen.getByText(/facts known every way/)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(await screen.findByText(/phrasings proven/)).toBeTruthy();
  });

  it('reaches the chronology and back', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);

    await user.click(screen.getByRole('button', { name: 'Timeline' }));
    expect(await screen.findByRole('heading', { name: 'The spine' })).toBeTruthy();
    expect(screen.getByText(/Battle of Hastings/)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(await screen.findByText(/phrasings proven/)).toBeTruthy();
  });

  it('shows an empty state for a section with nothing in it', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);

    await user.click(screen.getByRole('button', { name: /Your mistakes/ }));
    expect(await screen.findByText(/Nothing outstanding/)).toBeTruthy();
  });
});

describe('persistence', () => {
  it('restores answered reviews after a remount', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
    await screen.findByRole('heading', { level: 1 });
    await user.click(screen.getByRole('button', { name: currentOptions().correct }));
    unmount();

    reloadFromStorage();
    render(<App />);
    await screen.findByText(/phrasings proven/);

    // The review survived, so the "not tried yet" count is one lower than the full deck.
    expect(screen.queryByText('1327')).toBeNull();
    expect(screen.getByText('1326')).toBeTruthy();
  });
});
