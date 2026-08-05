/**
 * The progress section — S4's honest half, before any readiness model exists.
 *
 * These are counts, not predictions. Everything here is a fact about what has happened,
 * derived from the event log; nothing forecasts what would happen in an exam. That
 * separation is deliberate: the readiness number is the thing most likely to flatter
 * (R6), and keeping the counting apart from the modelling means the counting stays
 * trustworthy whatever happens to the model.
 *
 * **Every figure here counts facts** (D-032). "Phrasings proven, X of 1,609" used to have top
 * billing on this screen; it measured the apparatus rather than the material, and it sat beside
 * fact counts with nothing marking which was which. The phrasings still do their job — the app
 * asks a fact several ways so it can tell knowing the fact from knowing one sentence — and they
 * are not a number the reader is asked to look at.
 *
 * `mastered + inMistakes + notTried === facts`, taken straight from the one classification, so
 * this screen and the home screen cannot disagree.
 */

import type { Deck } from '../deck/types';
import type { ReviewEvent } from '../scheduler/events';
import { dayNumber } from '../scheduler/events';
import type { FactState } from '../scheduler/types';
import { partition, type FactStanding } from './standing';

export interface DeckProgress {
  /** Facts drilled. The denominator. */
  readonly facts: number;
  /** Facts with at least one review of any kind. `mastered + inMistakes`. */
  readonly started: number;
  /** Facts never answered. */
  readonly notTried: number;
  /** Facts with no wrong answer in their last three attempts. */
  readonly mastered: number;
  /** Facts with a wrong answer inside their last three attempts. */
  readonly inMistakes: number;
  /** Facts with an interval of three weeks or more. */
  readonly mature: number;
  readonly totalReviews: number;
  readonly totalLapses: number;
}

export function deckProgress(
  deck: Deck,
  states: ReadonlyMap<string, FactState>,
  events: readonly ReviewEvent[],
): DeckProgress {
  const { fresh, mastered, mistakes } = partition(
    deck.map((f) => f.id),
    events,
  );

  let mature = 0;
  let totalLapses = 0;
  for (const fact of deck) {
    const state = states.get(fact.id);
    if (!state || state.seen === 0) continue;
    totalLapses += state.lapses;
    if (state.ivl >= 21) mature++;
  }

  return {
    facts: deck.length,
    started: mastered.length + mistakes.length,
    notTried: fresh.length,
    mastered: mastered.length,
    inMistakes: mistakes.length,
    mature,
    totalReviews: events.length,
    totalLapses,
  };
}

/** Reviews due on each of the next `days` days, for the "coming up" strip. */
export function upcomingLoad(
  deck: Deck,
  states: ReadonlyMap<string, FactState>,
  today: number,
  days = 7,
): number[] {
  const counts = new Array<number>(days).fill(0);
  for (const fact of deck) {
    const state = states.get(fact.id);
    if (!state || state.seen === 0) continue;
    const offset = state.due - today;
    if (offset >= 0 && offset < days) counts[offset]++;
  }
  return counts;
}

/** Reviews answered on each of the last `days` days, most recent last. */
export function recentActivity(events: readonly ReviewEvent[], today: number, days = 14): number[] {
  const counts = new Array<number>(days).fill(0);
  for (const event of events) {
    const offset = today - dayNumber(event.at);
    if (offset >= 0 && offset < days) counts[days - 1 - offset]++;
  }
  return counts;
}

/**
 * Consecutive days up to and including today on which at least one review happened.
 *
 * Counted from the log rather than stored, so it cannot drift — and so it is honest: a
 * stored streak that survives a missed day because nobody opened the app is a lie the
 * app tells itself.
 */
export function streak(events: readonly ReviewEvent[], today: number): number {
  const active = new Set(events.map((e) => dayNumber(e.at)));
  if (!active.has(today)) return 0;

  let n = 0;
  while (active.has(today - n)) n++;
  return n;
}

export interface ProblemFact {
  readonly factId: string;
  readonly lapses: number;
  /** Where it stands now — a fact can be missed six times and still be Mastered today. */
  readonly recovered: boolean;
}

/**
 * Facts missed most often, worst first — the "problem facts" list.
 *
 * It used to report "2/3 phrasings proven" beside each one, which is a phrasing count on screen
 * and told the reader nothing they could act on. What replaces it is the fact's standing today,
 * which is the question actually being asked of this list: is it still going wrong, or has it
 * come back? Ordered by lapses, then by the ones still outstanding.
 */
export function problemFacts(
  deck: Deck,
  states: ReadonlyMap<string, FactState>,
  standings: ReadonlyMap<string, FactStanding>,
  limit = 10,
): ProblemFact[] {
  return deck
    .map((fact) => ({
      factId: fact.id,
      lapses: states.get(fact.id)?.lapses ?? 0,
      recovered: standings.get(fact.id)?.standing !== 'mistakes',
    }))
    .filter((f) => f.lapses > 0)
    .sort((a, b) => b.lapses - a.lapses || Number(a.recovered) - Number(b.recovered))
    .slice(0, limit);
}
