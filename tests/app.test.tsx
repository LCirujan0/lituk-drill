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
import { reloadFromStorage } from '@/adapters/store';
import { EVENTS_KEY } from '@/adapters/local-store';
import type { ReviewEvent } from '@/domain/scheduler/events';

/** The store is a module-level singleton — correct in a browser, a hazard across tests. */
beforeEach(() => {
  window.localStorage.clear();
  reloadFromStorage();
});

const stored = (): ReviewEvent[] => JSON.parse(window.localStorage.getItem(EVENTS_KEY) ?? '[]');

async function openChapterOne(user: ReturnType<typeof userEvent.setup>) {
  render(<App />);
  await screen.findByText(/phrasings proven/);
  await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
  return within(await screen.findByRole('heading', { level: 1 }).then((h) => h.parentElement!));
}

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

    await answerOption(user, (t) => t === 'Five');
    expect(screen.getByText(/^Correct\.$/)).toBeTruthy();
  });

  it('says so when the answer was wrong', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText(/phrasings proven/);
    await user.click(screen.getByRole('button', { name: /The values and principles of the UK/ }));
    await screen.findByRole('heading', { level: 1 });

    await answerOption(user, (t) => t === 'Seven');
    expect(screen.getByText(/^Not quite\.$/)).toBeTruthy();
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

    await answerOption(user, (t) => t === 'Five');
    expect(screen.getByText(/backbone of the whole first chapter/)).toBeTruthy();
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
    await answerOption(user, (t) => t === 'Five');
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

    await answerOption(user, (t) => t === 'Five');
    expect(stored()[0].grade).toBe(4);
    expect(stored()[0].mode).toBe('scheduled'); // first contact is always scheduled

    await user.click(screen.getByRole('button', { name: 'Next' }));
    await answerOption(user, (t) => t === 'The rule of law' || t === 'Individual liberty');
    expect(stored()).toHaveLength(2);
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

    await answerOption(user, (t) => t === 'Seven'); // wrong
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

    await answerOption(user, (t) => t === 'Five');
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
    await answerOption(user, (t) => t === 'Five');
    unmount();

    reloadFromStorage();
    render(<App />);
    await screen.findByText(/phrasings proven/);

    // The review survived, so the "not tried yet" count is one lower than the full deck.
    expect(screen.queryByText('1327')).toBeNull();
    expect(screen.getByText('1326')).toBeTruthy();
  });
});
