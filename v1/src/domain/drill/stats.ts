/**
 * The progress section — S4's honest half, before any readiness model exists.
 *
 * These are counts, not predictions. Everything here is a fact about what has happened,
 * derived from the event log; nothing forecasts what would happen in an exam. That
 * separation is deliberate: the readiness number is the thing most likely to flatter
 * (R6), and keeping the counting apart from the modelling means the counting stays
 * trustworthy whatever happens to the model.
 *
 * The one number the BRIEF actually cares about is **phrasings proven** — not facts
 * started, not questions answered. A fact proven on one phrasing is a memorised sentence;
 * proven on all of them, it is knowledge. That distinction is the entire reason the deck
 * is built the way it is, so it gets top billing.
 */

import type { Deck } from '../deck/types';
import type { ReviewEvent } from '../scheduler/events';
import { dayNumber } from '../scheduler/events';
import type { FactState } from '../scheduler/types';

export interface DeckProgress {
  readonly facts: number;
  readonly forms: number;
  /** Facts with at least one review of any kind. */
  readonly started: number;
  /** Facts where every phrasing has been answered correctly. The number that matters. */
  readonly provenAllForms: number;
  /** Individual phrasings answered correctly at least once, out of `forms`. */
  readonly provenForms: number;
  /** Facts with an interval of three weeks or more. */
  readonly mature: number;
  /** Facts missed at least once and not yet cleared. */
  readonly inMistakes: number;
  readonly totalReviews: number;
  readonly totalLapses: number;
}

export function deckProgress(
  deck: Deck,
  states: ReadonlyMap<string, FactState>,
  events: readonly ReviewEvent[],
  mistakeCount: number,
): DeckProgress {
  let started = 0;
  let provenAllForms = 0;
  let provenForms = 0;
  let mature = 0;
  let totalLapses = 0;
  let forms = 0;

  for (const fact of deck) {
    forms += fact.forms.length;
    const state = states.get(fact.id);
    if (!state || state.seen === 0) continue;

    started++;
    totalLapses += state.lapses;
    const proven = state.ok.filter((v) => v > 0).length;
    provenForms += proven;
    if (proven === fact.forms.length) provenAllForms++;
    if (state.ivl >= 21) mature++;
  }

  return {
    facts: deck.length,
    forms,
    started,
    provenAllForms,
    provenForms,
    mature,
    inMistakes: mistakeCount,
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

/** Facts missed most often, worst first — the "problem facts" list. */
export function problemFacts(
  deck: Deck,
  states: ReadonlyMap<string, FactState>,
  limit = 10,
): { factId: string; lapses: number; proven: number; forms: number }[] {
  return deck
    .map((fact) => {
      const state = states.get(fact.id);
      return {
        factId: fact.id,
        lapses: state?.lapses ?? 0,
        proven: state ? state.ok.filter((v) => v > 0).length : 0,
        forms: fact.forms.length,
      };
    })
    .filter((f) => f.lapses > 0)
    .sort((a, b) => b.lapses - a.lapses || a.proven - b.proven)
    .slice(0, limit);
}
