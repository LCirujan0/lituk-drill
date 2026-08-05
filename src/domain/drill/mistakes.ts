/**
 * The mistakes drill — S3.
 *
 * THE RULE: **a fact is here while a wrong answer sits inside its last three attempts.** Get it
 * wrong and it lands here; answer it correctly three times and the miss falls out of the window
 * and the fact is Mastered again. A fresh miss puts it back at the start.
 *
 * WHY THIS RULE AND NOT THE OLD ONE. It used to be "three correct answers on three *different*
 * phrasings", which is a defensible rule on its own and a broken one next to Mastered. Mastered
 * has always used the last-three-attempts window, so the two disagreed: a fact could be counted
 * as mastered on the home screen while still sitting in the mistakes list, and the three
 * sections did not add up to the deck. They are now exact complements of one rule, computed in
 * one place (`standing.ts`), which is what makes the partition assertable (D-032).
 *
 * WHAT THAT COSTS, PLAINLY. Under the old rule, three correct answers to one memorised sentence
 * could not clear a fact. Under this one they can. Rotation makes it unlikely rather than
 * impossible — this section serves the phrasing seen least, and skips any already answered since
 * the miss — but the guarantee is gone, and that is a real loss written down rather than
 * discovered later. What is bought is that every number on screen means the same thing.
 *
 * WHY IT IS DERIVED, NOT STORED. Every part of this comes out of the review-event log by replay
 * (D-002). There is no "mistakes list" to keep in sync, no counter to increment, and therefore
 * no way for the list to disagree with the history it claims to describe. Change the rule and
 * the whole list recomputes correctly, including retrospectively.
 *
 * SEPARATE FROM THE SM-2 SCHEDULE, DELIBERATELY. Clearing a fact here does not lengthen its
 * interval or undo its lapse. D-003 holds that a success during self-directed practice is
 * contaminated evidence — you chose the card and you had just seen it — so it may inform this
 * list without touching the schedule. The two can legitimately disagree: a fact can be cleared
 * here and still be due tomorrow.
 */

import type { ReviewEvent } from '../scheduler/events';
import { factStandings, MASTERY_WINDOW, type FactStanding } from './standing';

/** Correct answers needed to push the miss out of the window. The same window Mastered uses. */
export const CLEAR_STREAK = MASTERY_WINDOW;

export interface MistakeStanding {
  readonly factId: string;
  /** Correct answers since the most recent miss: 0, 1 or 2. Three would have cleared it. */
  readonly sinceMiss: number;
  /** How many are needed. Always `CLEAR_STREAK` — no longer capped by phrasings. */
  readonly needed: number;
  /** Phrasings already answered correctly since the miss; the drill should serve something else. */
  readonly provenForms: readonly number[];
  /** Total times this fact has ever been missed. Orders the list; worst first. */
  readonly misses: number;
  /** Timestamp of the most recent miss. */
  readonly lastMissedAt: number;
}

/**
 * Facts currently in the mistakes drill, worst first.
 *
 * `formCounts` supplies the fact universe — a fact absent from it is skipped, so a log referring
 * to facts no longer drilled degrades rather than throwing. It no longer supplies the clearing
 * threshold: that is three attempts whatever the fact's phrasing count, which also retires the
 * special case for the two facts carrying only two phrasings.
 */
export function mistakesFrom(
  events: readonly ReviewEvent[],
  formCounts: ReadonlyMap<string, number>,
): MistakeStanding[] {
  const standings = [...factStandings(formCounts.keys(), events).values()].filter(
    (s): s is FactStanding & { lastMissedAt: number } =>
      s.standing === 'mistakes' && s.lastMissedAt !== null,
  );

  return standings
    .map((s) => ({
      factId: s.factId,
      sinceMiss: s.sinceMiss,
      needed: CLEAR_STREAK,
      provenForms: s.provenForms,
      misses: s.misses,
      lastMissedAt: s.lastMissedAt,
    }))
    // Worst first: most-missed, then least progress out, then longest outstanding.
    .sort(
      (a, b) =>
        b.misses - a.misses || a.sinceMiss - b.sinceMiss || a.lastMissedAt - b.lastMissedAt,
    );
}

/**
 * Which phrasing to serve next for a fact in this drill.
 *
 * Anything already answered correctly since the miss is excluded. It cannot be wrong to serve it
 * — three attempts clear the fact however they are phrased — but re-asking a sentence you have
 * just got right tests the sentence, which is the failure the whole deck design exists to
 * prevent. When every phrasing has been answered since the miss and the fact still has not
 * cleared, fall back to the whole set rather than serving nothing.
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

/** Facts with a wrong answer inside their last three attempts. */
export const mistakeCount = (
  events: readonly ReviewEvent[],
  formCounts: ReadonlyMap<string, number>,
): number => mistakesFrom(events, formCounts).length;
