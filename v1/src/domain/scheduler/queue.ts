/**
 * Building the day's queue. Pure — takes state and a clock reading, returns an order.
 *
 * Priority, in v0's order and for v0's reasons:
 *
 *   1. **Relearning, ready.** Facts missed earlier this session whose spacing gap has
 *      elapsed. First, because the whole point of the gap is that it has now passed.
 *   2. **Due reviews**, shuffled, capped by the daily review ceiling. Shuffled so the
 *      order isn't correlated with when facts were introduced — otherwise a session
 *      becomes a walk through the deck in learning order, which is its own kind of cue.
 *   3. **New facts**, shuffled, capped by whatever remains of the daily new allowance.
 *   4. **Relearning, still waiting.** Their gap hasn't elapsed, but if nothing else is
 *      left they are drilled anyway rather than ending the session early — the difference
 *      between "nothing is due" and "you have unfinished mistakes".
 */

import { shuffle, type Rng } from './rng';
import type { FactState } from './types';

export interface QueueInput {
  /** Every fact in the deck, in deck order. */
  readonly factIds: readonly string[];
  readonly states: ReadonlyMap<string, FactState>;
  /** Day number for "today". */
  readonly today: number;
  /** Monotonic step counter — the same one review events carry. */
  readonly step: number;
  readonly newPerDay: number;
  readonly newToday: number;
  readonly maxReviews: number;
}

export interface QueueBreakdown {
  readonly queue: readonly string[];
  readonly relearningReady: readonly string[];
  readonly due: readonly string[];
  readonly fresh: readonly string[];
  readonly relearningWaiting: readonly string[];
}

export function buildQueue(input: QueueInput, rng: Rng): QueueBreakdown {
  const { factIds, states, today, step, newPerDay, newToday, maxReviews } = input;

  const fresh: string[] = [];
  const due: string[] = [];
  const relearning: string[] = [];

  for (const id of factIds) {
    const state = states.get(id);
    if (!state || state.seen === 0) fresh.push(id);
    else if (state.relearn) relearning.push(id);
    else if (state.due <= today) due.push(id);
  }

  relearning.sort((a, b) => (states.get(a)!.relearnAt ?? 0) - (states.get(b)!.relearnAt ?? 0));
  const relearningReady = relearning.filter((id) => states.get(id)!.relearnAt <= step);
  const relearningWaiting = relearning.filter((id) => states.get(id)!.relearnAt > step);

  const newSlots = Math.max(0, newPerDay - newToday);
  const selectedDue = shuffle(due, rng).slice(0, maxReviews);
  const selectedFresh = shuffle(fresh, rng).slice(0, newSlots);

  return {
    queue: [...relearningReady, ...selectedDue, ...selectedFresh, ...relearningWaiting],
    relearningReady,
    due: selectedDue,
    fresh: selectedFresh,
    relearningWaiting,
  };
}

export interface DeckCounts {
  readonly unseen: number;
  readonly relearning: number;
  readonly due: number;
  readonly scheduled: number;
  readonly mature: number;
  /** Facts proven on every one of their phrasings — the number that actually matters. */
  readonly provenAllForms: number;
}

export function countDeck(
  factIds: readonly string[],
  states: ReadonlyMap<string, FactState>,
  today: number,
): DeckCounts {
  let unseen = 0;
  let relearning = 0;
  let due = 0;
  let scheduled = 0;
  let mature = 0;
  let provenAllForms = 0;

  for (const id of factIds) {
    const state = states.get(id);
    if (!state || state.seen === 0) {
      unseen++;
      continue;
    }
    if (state.relearn) relearning++;
    else if (state.due <= today) due++;
    else scheduled++;

    if (state.ivl >= 21) mature++;
    if (state.ok.length > 0 && state.ok.every((v) => v > 0)) provenAllForms++;
  }

  return { unseen, relearning, due, scheduled, mature, provenAllForms };
}
