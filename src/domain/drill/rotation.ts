/**
 * Exhaustive rotation — how the app decides what to serve next.
 *
 * The rule the owner asked for, in one sentence: **a fact does not come round again until
 * every other fact in the same pool has had its turn, and when it does come round it wears a
 * different phrasing.**
 *
 * WHY THE OLD BEHAVIOUR FAILED. Measured over 20 cards in "Not tried yet", the app served
 * only 8 distinct facts — `f143, f382, f291, f222, f143, f382, f291, f222, f143…` — because
 * the queue put unseen *phrasings of facts already started* ahead of untouched facts. Four
 * facts cycled through all three of their forms before anything new appeared. Chapter drills
 * were worse: fully deterministic, the same ids in the same order every session, always
 * form 0.
 *
 * HOW ROTATION IS DERIVED, NOT STORED. Everything here counts events. A fact served twice
 * has two events; a fact never served has none. Ordering by that count and shuffling within
 * each count gives exhaustive rotation for free: everything at zero goes before anything at
 * one, so the pool drains completely before it repeats. No cycle counter to keep, nothing to
 * reset, and it stays correct when history arrives late from another device (D-002).
 *
 * WHY EVENT COUNTS AND NOT `state.ok`. The scheduler's per-form credit is cleared when a
 * fact lapses — that is the point of it. Using it to pick phrasings would re-serve the form
 * you just missed, which is precisely the wording you have most recently been shown. Event
 * counts never reset, so "least-seen phrasing" means what it says.
 */

import type { Deck, Fact } from '../deck/types';
import type { ReviewEvent } from '../scheduler/events';
import { dayNumber } from '../scheduler/events';
import { shuffle, type Rng } from '../scheduler/rng';

export interface ServedCounts {
  /** How many times each fact has been served, in any mode. */
  readonly byFact: ReadonlyMap<string, number>;
  /** How many times each `factId:formIndex` has been served. */
  readonly byForm: ReadonlyMap<string, number>;
}

export function servedCounts(events: readonly ReviewEvent[]): ServedCounts {
  const byFact = new Map<string, number>();
  const byForm = new Map<string, number>();
  for (const e of events) {
    byFact.set(e.factId, (byFact.get(e.factId) ?? 0) + 1);
    const key = `${e.factId}:${e.formIndex}`;
    byForm.set(key, (byForm.get(key) ?? 0) + 1);
  }
  return { byFact, byForm };
}

/** Fact ids served at all today — the basis for "not twice in one day". */
export function servedToday(events: readonly ReviewEvent[], today: number): Set<string> {
  const out = new Set<string>();
  for (const e of events) if (dayNumber(e.at) === today) out.add(e.factId);
  return out;
}

/**
 * Order facts so the pool drains before it repeats.
 *
 * Facts are grouped by how many times they have been served and the groups are walked from
 * least to most, shuffled inside each group. Everything unseen therefore comes before
 * anything seen once, which is exactly "one turn each, then round again".
 */
export function rotate(factIds: readonly string[], counts: ServedCounts, rng: Rng): string[] {
  const tiers = new Map<number, string[]>();
  for (const id of factIds) {
    const n = counts.byFact.get(id) ?? 0;
    tiers.set(n, [...(tiers.get(n) ?? []), id]);
  }
  return [...tiers.keys()]
    .sort((a, b) => a - b)
    .flatMap((n) => shuffle(tiers.get(n)!, rng));
}

/**
 * The phrasing of a fact seen least often, shuffled among ties.
 *
 * `recallOnly` restricts to forms that work without options on screen. Six facts have only
 * one such form, so the fallback to the full set is reached in practice.
 */
export function leastSeenForm(
  fact: Fact,
  counts: ServedCounts,
  rng: Rng,
  recallOnly = false,
): number {
  const all = fact.forms.map((_, i) => i);
  const recallable = all.filter((i) => !fact.forms[i].mcqOnly);
  const pool = recallOnly && recallable.length ? recallable : all;

  const min = Math.min(...pool.map((i) => counts.byForm.get(`${fact.id}:${i}`) ?? 0));
  const leastSeen = pool.filter((i) => (counts.byForm.get(`${fact.id}:${i}`) ?? 0) === min);
  return shuffle(leastSeen, rng)[0];
}

/** Facts with at least one phrasing never served. Drives "Not tried yet". */
export function factsWithUnseenForms(deck: Deck, counts: ServedCounts): Fact[] {
  return deck.filter((fact) =>
    fact.forms.some((_, i) => (counts.byForm.get(`${fact.id}:${i}`) ?? 0) === 0),
  );
}

/** An unseen phrasing of a fact, or null if every phrasing has been served. */
export function unseenForm(fact: Fact, counts: ServedCounts, rng: Rng): number | null {
  const unseen = fact.forms
    .map((_, i) => i)
    .filter((i) => (counts.byForm.get(`${fact.id}:${i}`) ?? 0) === 0);
  return unseen.length ? shuffle(unseen, rng)[0] : null;
}
