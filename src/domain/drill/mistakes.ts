/**
 * The mistakes drill — S3.
 *
 * THE RULE, as the owner specified it: get a fact wrong once and it lands here; answer it
 * correctly **three times in a row, on a different phrasing each time**, and it leaves. A
 * fresh miss resets the count to zero.
 *
 * WHY IT IS DERIVED, NOT STORED. Every part of this comes out of the review-event log by
 * replay (D-002). There is no "mistakes list" to keep in sync, no counter to increment, and
 * therefore no way for the list to disagree with the history it claims to describe. Change
 * the rule and the whole list recomputes correctly, including retrospectively.
 *
 * THE "IN A ROW" PART IS FREE. Any miss resets the count — so by construction, every review
 * after a fact's most recent miss is a correct one. Counting distinct phrasings since that
 * miss *is* counting an unbroken streak; there is no separate streak to track. This is worth
 * stating because the obvious implementation (a stored counter, incremented on success and
 * zeroed on failure) is both more code and less correct.
 *
 * THE DISTINCT-PHRASING PART IS THE POINT. Three correct answers to one memorised sentence
 * would clear a fact while proving nothing — precisely the failure the whole deck design
 * exists to prevent. Two facts in the deck carry only two phrasings, so the requirement is
 * `min(3, phrasings)` rather than a flat three; otherwise those two could never clear and
 * would sit in the list for ever.
 *
 * SEPARATE FROM THE SM-2 SCHEDULE, DELIBERATELY. Clearing a fact here does not lengthen its
 * interval or undo its lapse. D-003 holds that a success during self-directed practice is
 * contaminated evidence — you chose the card and you had just seen it — so it may inform
 * this list without touching the schedule. The two can legitimately disagree: a fact can be
 * cleared here and still be due tomorrow.
 */

import type { ReviewEvent } from '../scheduler/events';
import { compareEvents } from '../scheduler/events';

/** Correct answers on distinct phrasings needed to clear, capped by how many exist. */
export const CLEAR_STREAK = 3;

export interface MistakeStanding {
  readonly factId: string;
  /** Distinct phrasings answered correctly since the most recent miss. */
  readonly proven: number;
  /** How many are needed — `min(3, phrasings on this fact)`. */
  readonly needed: number;
  /** Phrasings already proven since the miss; the drill should serve something else. */
  readonly provenForms: readonly number[];
  /** Total times this fact has ever been missed. Orders the list; worst first. */
  readonly misses: number;
  /** Timestamp of the most recent miss. */
  readonly lastMissedAt: number;
}

/**
 * Facts currently in the mistakes drill, worst first.
 *
 * `formCounts` supplies each fact's number of phrasings; a fact absent from it is skipped,
 * so a log referring to facts no longer in the deck degrades rather than throwing.
 */
export function mistakesFrom(
  events: readonly ReviewEvent[],
  formCounts: ReadonlyMap<string, number>,
): MistakeStanding[] {
  const byFact = new Map<string, ReviewEvent[]>();
  for (const event of events) {
    if (!formCounts.has(event.factId)) continue;
    byFact.set(event.factId, [...(byFact.get(event.factId) ?? []), event]);
  }

  const standings: MistakeStanding[] = [];

  for (const [factId, factEvents] of byFact) {
    const ordered = [...factEvents].sort(compareEvents);

    let lastMissIndex = -1;
    let misses = 0;
    ordered.forEach((event, i) => {
      if (event.grade < 3) {
        lastMissIndex = i;
        misses++;
      }
    });

    if (lastMissIndex === -1) continue; // never missed — not a mistake

    // Everything after the most recent miss is necessarily correct, so distinct phrasings
    // here IS the unbroken streak. See the note above.
    const sinceMiss = ordered.slice(lastMissIndex + 1);
    const provenForms = [...new Set(sinceMiss.map((e) => e.formIndex))].sort((a, b) => a - b);
    const needed = Math.min(CLEAR_STREAK, formCounts.get(factId)!);

    if (provenForms.length >= needed) continue; // cleared

    standings.push({
      factId,
      proven: provenForms.length,
      needed,
      provenForms,
      misses,
      lastMissedAt: ordered[lastMissIndex].at,
    });
  }

  // Worst first: most-missed, then least progress out, then longest outstanding.
  return standings.sort(
    (a, b) =>
      b.misses - a.misses ||
      a.proven - b.proven ||
      a.lastMissedAt - b.lastMissedAt,
  );
}

/**
 * Which phrasing to serve next for a fact in this drill.
 *
 * Anything already proven since the miss is excluded, because repeating it cannot advance
 * the count and would waste the review. When every phrasing has somehow been proven and the
 * fact still has not cleared — only possible if the deck's phrasing count changed under an
 * existing log — fall back to the whole set rather than serving nothing.
 */
export function nextFormForMistake(
  standing: MistakeStanding,
  formCount: number,
  rng: () => number,
): number {
  const candidates = Array.from({ length: formCount }, (_, i) => i).filter(
    (i) => !standing.provenForms.includes(i),
  );
  const pool = candidates.length ? candidates : Array.from({ length: formCount }, (_, i) => i);
  return pool[Math.floor(rng() * pool.length)];
}

/** Facts that have been missed at least once and have not yet cleared. */
export const mistakeCount = (
  events: readonly ReviewEvent[],
  formCounts: ReadonlyMap<string, number>,
): number => mistakesFrom(events, formCounts).length;
