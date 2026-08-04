/**
 * SM-2 with v0's five deliberate additions. A pure function of (state, review) -> state.
 *
 *   1. Breadth gate      — interval capped at 6 days until a SECOND phrasing is answered
 *                          correctly, and at 30 days until every phrasing is. This is the
 *                          lock that stops a long interval being banked on one memorised
 *                          sentence. Without it the whole variant model is decoration.
 *   2. Fact-level lapse  — missing any phrasing resets the whole fact and clears that
 *                          phrasing's credit. Knowing two of three ways is not knowing it.
 *   3. Spaced relearning — a missed fact returns ~3 facts later in the same session, not
 *                          immediately. Re-answering something still echoing in short-term
 *                          memory teaches nothing.
 *   4. Post-lapse resume — re-graduates at 35% of the pre-lapse interval rather than from
 *                          scratch. You slipped on something you half-knew.
 *   5. Leech taper+fuzz  — 3+ lapses permanently cut intervals 40%; all intervals get ±5%
 *                          jitter so a heavy day doesn't return as one spike.
 *
 * Understand each before changing any. They interact, and R4 is the risk that a rewrite
 * changes one of those interactions without any symptom.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────
 * ONE DELIBERATE DIVERGENCE FROM v0 — ledger L-001.
 *
 * v0 applies the breadth cap and then applies fuzz:
 *     if (b < 2) ivl = min(ivl, 6); else if (b < n) ivl = min(ivl, 30);
 *     ivl = round(ivl * (0.95 + random() * 0.10));
 * so a 30-day capped interval can fuzz up to round(31.5) = 32 and exceed its own gate by
 * up to 5%. v0's README states intervals "cannot go past 30 days"; for ~half of capped
 * reviews that is not quite true. It is a small effect and it was invisible — exactly the
 * class of defect §C4 of the project input predicted a rewrite would inherit silently.
 *
 * v1 fuzzes first and caps second, so the gate is an actual ceiling and the invariant
 * `interval <= cap` can be asserted without an excuse. The aggregate effect on review load
 * is well inside the simulation's tolerance.
 * ─────────────────────────────────────────────────────────────────────────────────────
 */

import type { Rng } from './rng';
import { breadth, type FactState, type Grade, type ReviewMode, type SchedulerConfig } from './types';

export interface Review {
  readonly formIndex: number;
  readonly grade: Grade;
  readonly mode: ReviewMode;
  /** Day number (days since epoch) the review happened. */
  readonly day: number;
  /** Monotonic position in the replayed log. Drives relearn spacing and form rotation. */
  readonly step: number;
}

/**
 * Whether a review may advance the schedule (D-003).
 *
 * Failures always write — a miss is real evidence of not knowing, wherever it happened.
 * Successes write only when scheduled — a success during self-directed practice is
 * contaminated by having chosen the card and just seen it.
 *
 * The invariant this exists to guarantee: **a practice or mock session can never increase
 * any fact's due date.** Asserted in scheduler.test.ts.
 */
export const mayAdvanceSchedule = (mode: ReviewMode, grade: Grade): boolean =>
  grade < 3 || mode === 'scheduled';

export function applyReview(
  state: FactState,
  review: Review,
  config: SchedulerConfig,
  rng: Rng,
): FactState {
  const { formIndex, grade, mode, day, step } = review;

  // Rotation bookkeeping happens for every review in every mode. It affects which
  // phrasing is served next and nothing else — never an interval, never a due date.
  const lastShown = [...state.lastShown];
  lastShown[formIndex] = step;

  const base: FactState = {
    ...state,
    seen: state.seen + 1,
    lastShown,
    lastForm: formIndex,
    introducedOn: state.introducedOn ?? day,
  };

  if (!mayAdvanceSchedule(mode, grade)) return base;

  // ---- missed ------------------------------------------------------------------
  if (grade < 3) {
    const ok = [...state.ok];
    ok[formIndex] = 0; // this phrasing's credit must be re-earned

    return {
      ...base,
      ok,
      // Remember where we were, so re-graduation can resume rather than restart.
      preLapseIvl: state.ivl > 0 ? state.ivl : state.preLapseIvl,
      lapses: state.lapses + 1,
      reps: 0,
      ivl: 0,
      ef: Math.max(config.minEase, state.ef - config.lapsePenalty),
      relearn: true,
      relearnAt: step + config.relearnGap,
      due: day,
    };
  }

  // ---- recalled ----------------------------------------------------------------
  const ok = [...state.ok];
  ok[formIndex] = (ok[formIndex] ?? 0) + 1;

  // The interval ladder, computed with the ease held BEFORE this review — v0's order,
  // and standard SM-2. Updating ease first would compound the change into this interval.
  let interval: number;
  if (state.reps === 0) {
    interval = state.preLapseIvl
      ? Math.max(1, Math.min(config.breadthCapAll, Math.round(state.preLapseIvl * config.postLapseResume)))
      : config.firstInterval;
  } else if (state.reps === 1) {
    interval = config.secondInterval;
  } else {
    const multiplier =
      grade === 5 ? state.ef + config.easyBonus : grade === 3 ? config.hardMultiplier : state.ef;
    interval = state.ivl * multiplier;
  }

  const ef = Math.max(config.minEase, state.ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)));
  const lapses = state.lapses;

  // Leech taper — stubborn facts keep surfacing.
  if (lapses >= config.leechThreshold) interval *= config.leechMultiplier;

  // Fuzz BEFORE the gate, so the gate is a real ceiling. See L-001 above.
  interval *= 1 - config.fuzz + rng() * config.fuzz * 2;

  // The breadth gate. `ok` already includes this review, so proving a second phrasing
  // lifts the cap on the same review that proves it — v0's behaviour.
  const proven = breadth({ ...state, ok });
  if (proven < 2) interval = Math.min(interval, config.breadthCap2);
  else if (proven < state.ok.length) interval = Math.min(interval, config.breadthCapAll);

  const days = Math.max(1, Math.round(interval));

  return {
    ...base,
    ok,
    ef,
    reps: state.reps + 1,
    ivl: days,
    due: day + days,
    relearn: false,
    relearnAt: 0,
    preLapseIvl: state.reps === 0 ? 0 : state.preLapseIvl,
  };
}

/**
 * The interval a given grade would produce, for the "Good → in 12 days" hints under the
 * grading buttons. Deterministic and fuzz-free: a preview that jittered would be a lie.
 */
export function previewInterval(
  state: FactState,
  formIndex: number,
  grade: Grade,
  config: SchedulerConfig,
): number {
  if (grade < 3) return 0;

  let interval: number;
  if (state.reps === 0) {
    interval = state.preLapseIvl
      ? Math.max(1, Math.min(config.breadthCapAll, Math.round(state.preLapseIvl * config.postLapseResume)))
      : config.firstInterval;
  } else if (state.reps === 1) {
    interval = config.secondInterval;
  } else {
    const multiplier =
      grade === 5 ? state.ef + config.easyBonus : grade === 3 ? config.hardMultiplier : state.ef;
    interval = state.ivl * multiplier;
  }

  if (state.lapses >= config.leechThreshold) interval *= config.leechMultiplier;

  const ok = [...state.ok];
  ok[formIndex] = (ok[formIndex] ?? 0) + 1;
  const proven = breadth({ ...state, ok });
  if (proven < 2) interval = Math.min(interval, config.breadthCap2);
  else if (proven < state.ok.length) interval = Math.min(interval, config.breadthCapAll);

  return Math.max(1, Math.round(interval));
}

/**
 * Which phrasing to serve: least-proven first, then least-recently-seen, then a seeded
 * coin toss — and never the same one twice running when an alternative exists.
 *
 * `recallOnly` restricts to phrasings that work without options on screen. Note that six
 * facts have only one such form today, so for those the rotation has nothing to rotate and
 * the breadth gate cannot clear through recall alone. Tracked as a deck baseline, not
 * papered over here.
 */
export function pickForm(
  state: FactState,
  formCount: number,
  isMcqOnly: (index: number) => boolean,
  recallOnly: boolean,
  rng: Rng,
): number {
  let candidates = Array.from({ length: formCount }, (_, i) => i);

  if (recallOnly) {
    const recall = candidates.filter((i) => !isMcqOnly(i));
    if (recall.length) candidates = recall;
  }

  const jitter = candidates.map(() => rng());
  candidates.sort(
    (a, b) =>
      (state.ok[a] ?? 0) - (state.ok[b] ?? 0) ||
      (state.lastShown[a] ?? 0) - (state.lastShown[b] ?? 0) ||
      jitter[a] - jitter[b],
  );

  if (candidates.length > 1 && candidates[0] === state.lastForm) {
    [candidates[0], candidates[1]] = [candidates[1], candidates[0]];
  }

  return candidates[0];
}
