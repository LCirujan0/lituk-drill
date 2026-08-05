/**
 * Where every fact stands, in one place.
 *
 * ## The definitions, and why they live in a single function
 *
 * Three standings, all per-FACT, and they **partition the deck**:
 *
 *   · **NEW** — never answered. No review event for it, ever.
 *   · **MASTERED** — answered, with no wrong answer in its last three attempts. One correct
 *     answer is enough to put a fact here; it stays until it is missed.
 *   · **MISTAKES** — a wrong answer inside its last three attempts.
 *
 * `new + mastered + mistakes === every fact in the deck`, always, with no overlap. That is
 * asserted over generated logs in `tests/counts.test.ts`, and it is the cheapest possible
 * proof that the three sections on the home screen agree with each other.
 *
 * It holds here **by construction** rather than by three functions happening to agree: this
 * walks the deck once and gives each fact exactly one standing, and Mastered, Mistakes and New
 * are all projections of that walk. The version this replaced had Mastered on a last-three
 * rule, Mistakes on a distinct-phrasings rule and New counting phrasings rather than facts, so
 * the three could and did disagree — the home screen showed a New count larger than the deck.
 *
 * ## Why the phrasings are not in any of this
 *
 * The several phrasings per fact are the mechanism, not the measure (D-032). They exist so the
 * app can tell knowing a fact from knowing one sentence, and rotation still serves a different
 * one every time a fact comes round — but a phrasing is never counted, never a denominator and
 * never a section. What is counted is facts.
 *
 * ## Derived, never stored
 *
 * Everything here comes out of the review-event log by replay (D-002). There is no list to keep
 * in sync and no counter to increment, so a standing cannot disagree with the history it claims
 * to describe, and it recomputes correctly when an event arrives late from the other device.
 */

import { compareEvents, type ReviewEvent } from '../scheduler/events';

/**
 * How many recent attempts decide the standing.
 *
 * Three rather than one, so a single lucky answer does not master a fact and a single bad day
 * does not condemn one for ever — the window rolls forward, so a fact returns to Mastered as
 * soon as three clean attempts have pushed the miss out of it.
 */
export const MASTERY_WINDOW = 3;

/**
 * A wrong answer, and the ONE definition of one.
 *
 * `Grade` is `0 | 3 | 4 | 5` — 0 Again, 3 Hard, 4 Good, 5 Easy (D-015) — so `< 3` is exactly
 * "Again" and Hard counts as correct. Mastered and Mistakes must use the same predicate or they
 * are not complements; before this existed one read `grade < 3` and the other `grade > 0`.
 * Identical over that type, but only by luck, and only until someone adds a grade.
 */
export const isMiss = (event: ReviewEvent): boolean => event.grade < 3;

export type Standing = 'new' | 'mastered' | 'mistakes';

export interface FactStanding {
  readonly factId: string;
  readonly standing: Standing;
  /** Reviews of this fact, all modes. Zero exactly when the standing is `new`. */
  readonly attempts: number;
  /** Wrong answers over the whole history. Orders the mistakes list; worst first. */
  readonly misses: number;
  /** When it was last missed, or null if it never has been. */
  readonly lastMissedAt: number | null;
  /**
   * Correct answers since the most recent miss. Reaching `MASTERY_WINDOW` is what pushes the
   * miss out of the window, so this is the progress bar out of Mistakes.
   */
  readonly sinceMiss: number;
  /**
   * Distinct phrasings answered correctly since the most recent miss.
   *
   * Not a clearing rule — clearing counts attempts, not phrasings. This is only used to pick
   * what to serve next, so the drill does not hand back a phrasing already answered since the
   * miss. Rotation would mostly avoid it anyway; this makes it certain.
   */
  readonly provenForms: readonly number[];
}

const NEVER_ANSWERED = {
  standing: 'new',
  attempts: 0,
  misses: 0,
  lastMissedAt: null,
  sinceMiss: 0,
  provenForms: [] as readonly number[],
} as const;

/**
 * Every fact in `factIds`, with its standing. One pass, one standing each.
 *
 * `factIds` bounds the universe, so events for facts no longer drilled — retired ones (R-4) —
 * fall out rather than throwing or inventing a row. Pass `ACTIVE`'s ids: `DECK` is the id space
 * and includes retirements, and nothing counting what is left to learn should read it.
 */
export function factStandings(
  factIds: Iterable<string>,
  events: readonly ReviewEvent[],
): Map<string, FactStanding> {
  const byFact = new Map<string, ReviewEvent[]>();
  for (const id of factIds) byFact.set(id, []);
  for (const event of events) byFact.get(event.factId)?.push(event);

  const out = new Map<string, FactStanding>();

  for (const [factId, attempts] of byFact) {
    if (attempts.length === 0) {
      out.set(factId, { factId, ...NEVER_ANSWERED });
      continue;
    }

    const ordered = [...attempts].sort(compareEvents);

    let lastMissIndex = -1;
    let misses = 0;
    ordered.forEach((event, i) => {
      if (isMiss(event)) {
        lastMissIndex = i;
        misses++;
      }
    });

    // The owner's rule, written the way he stated it. Equivalent to
    // `misses > 0 && sinceMiss < MASTERY_WINDOW`, and this reads like the definition.
    const recent = ordered.slice(-MASTERY_WINDOW);
    const standing: Standing = recent.some(isMiss) ? 'mistakes' : 'mastered';

    // Everything after the most recent miss is necessarily correct — any miss would itself be
    // the most recent — so these need no separate "in a row" check.
    const sinceMiss = lastMissIndex === -1 ? 0 : ordered.length - 1 - lastMissIndex;
    const provenForms =
      lastMissIndex === -1
        ? []
        : [...new Set(ordered.slice(lastMissIndex + 1).map((e) => e.formIndex))].sort(
            (a, b) => a - b,
          );

    out.set(factId, {
      factId,
      standing,
      attempts: ordered.length,
      misses,
      lastMissedAt: lastMissIndex === -1 ? null : ordered[lastMissIndex].at,
      sinceMiss,
      provenForms,
    });
  }

  return out;
}

export interface Partition {
  /** Facts never answered. */
  readonly fresh: string[];
  /** Facts with no wrong answer in their last three attempts. */
  readonly mastered: string[];
  /** Facts with a wrong answer inside their last three attempts. */
  readonly mistakes: string[];
}

/**
 * The three sections, from one walk of the deck.
 *
 * Deck order is preserved inside each list, so this is stable and the caller does its own
 * ordering — the mistakes drill wants worst-first, the sections want rotation.
 */
export function partition(
  factIds: Iterable<string>,
  events: readonly ReviewEvent[],
): Partition {
  const fresh: string[] = [];
  const mastered: string[] = [];
  const mistakes: string[] = [];

  for (const standing of factStandings(factIds, events).values()) {
    if (standing.standing === 'new') fresh.push(standing.factId);
    else if (standing.standing === 'mastered') mastered.push(standing.factId);
    else mistakes.push(standing.factId);
  }

  return { fresh, mastered, mistakes };
}
