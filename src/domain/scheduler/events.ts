/**
 * The review-event log, and deriving the schedule from it.
 *
 * The log is the source of truth; scheduler state is a projection of it (D-002). That
 * choice buys three things at once:
 *
 *   · **Sync cannot lose a grade.** Merging two devices is a set union over event ids,
 *     which is commutative and idempotent. The obvious alternative — overwriting a state
 *     blob — silently discards whichever device synced second, with no error and no
 *     symptom. That failure would have made the database worse than no database.
 *   · **Scheduler bugs are recoverable.** Fix the algorithm, replay, and the schedule is
 *     correct. With stored state, a bug's damage is permanent.
 *   · **The readiness model gets its history for free.** It needs the sequence of grades
 *     per fact, which is exactly what the log is.
 *
 * The cost is that fuzz must be deterministic (see rng.ts) and that a late-arriving event
 * genuinely rewrites subsequent history — which is correct, since the schedule should
 * reflect all known evidence, but is worth knowing when a due date changes after a sync.
 */

import { rngForReview } from './rng';
import { applyReview, type Review } from './sm2';
import {
  DEFAULT_CONFIG,
  initialState,
  type FactState,
  type Grade,
  type ReviewMode,
  type SchedulerConfig,
} from './types';

export const MS_PER_DAY = 86_400_000;
export const dayNumber = (epochMs: number): number => Math.floor(epochMs / MS_PER_DAY);

export interface ReviewEvent {
  /** Stable and unique. The merge key — two devices must never mint the same id. */
  readonly id: string;
  readonly factId: string;
  readonly formIndex: number;
  readonly grade: Grade;
  readonly mode: ReviewMode;
  /** Client clock, epoch milliseconds. */
  readonly at: number;
}

/** Deterministic total order. Ties broken by id so two devices always agree. */
export const compareEvents = (a: ReviewEvent, b: ReviewEvent): number =>
  a.at - b.at || a.id.localeCompare(b.id);

/** Set union by event id. Commutative, idempotent — the whole point of the design. */
export function mergeEvents(...logs: readonly ReviewEvent[][]): ReviewEvent[] {
  const byId = new Map<string, ReviewEvent>();
  for (const log of logs) for (const event of log) byId.set(event.id, event);
  return [...byId.values()].sort(compareEvents);
}

export interface ScheduleProjection {
  readonly states: ReadonlyMap<string, FactState>;
  /** Steps consumed, i.e. events applied. */
  readonly steps: number;
}

/**
 * Replay a log into scheduler state.
 *
 * `formCounts` supplies each fact's number of phrasings; a fact absent from it is skipped,
 * so a log referring to facts no longer in the deck degrades rather than throwing.
 *
 * Deterministic: the same SET of events yields identical state regardless of the order it
 * arrives in, because events are sorted before replay and each review's jitter is seeded
 * from its own id rather than from its position.
 */
export function replay(
  events: readonly ReviewEvent[],
  formCounts: ReadonlyMap<string, number>,
  config: SchedulerConfig = DEFAULT_CONFIG,
): ScheduleProjection {
  const ordered = [...events].sort(compareEvents);
  const states = new Map<string, FactState>();

  ordered.forEach((event, step) => {
    const formCount = formCounts.get(event.factId);
    if (formCount === undefined) return;

    const current = states.get(event.factId) ?? initialState(formCount);
    const review: Review = {
      formIndex: event.formIndex,
      grade: event.grade,
      mode: event.mode,
      day: dayNumber(event.at),
      step,
    };

    states.set(
      event.factId,
      applyReview(current, review, config, rngForReview(event.factId, event.id)),
    );
  });

  return { states, steps: ordered.length };
}

/**
 * Import v0's saved progress (S6).
 *
 * v0 stored derived state under `localStorage['lituk.v2']` and kept no event history, so
 * there is nothing to replay. The import therefore arrives as state directly, and the
 * event log begins empty alongside it. That is a genuine seam in the design: facts
 * imported this way carry no reviewable history, so the readiness model has to treat them
 * as evidence-light until they are reviewed in v1.
 *
 * v0 keys its state by ARRAY INDEX. `factId(i)` reproduces those indices, which is why the
 * deck's ordering is a tested contract rather than an incidental property.
 */
export interface V0SavedState {
  f: Record<string, {
    ef: number; ivl: number; reps: number; due: number; lapses: number; seen: number;
    ok: number[]; ls: number[]; lf: number; rl: number; rlAt: number; pl: number;
    intro: number | null;
  }>;
}

export function importV0State(
  saved: V0SavedState,
  factIdFor: (index: number) => string,
  formCounts: ReadonlyMap<string, number>,
): Map<string, FactState> {
  const states = new Map<string, FactState>();

  for (const [key, c] of Object.entries(saved.f ?? {})) {
    const index = Number.parseInt(key, 10);
    if (!Number.isInteger(index)) continue;

    const id = factIdFor(index);
    const formCount = formCounts.get(id);
    if (formCount === undefined) continue;

    const pad = (arr: number[] | undefined) => {
      const out = new Array(formCount).fill(0);
      (arr ?? []).slice(0, formCount).forEach((v, i) => (out[i] = v));
      return out;
    };

    states.set(id, {
      ef: c.ef ?? 2.5,
      ivl: c.ivl ?? 0,
      reps: c.reps ?? 0,
      due: c.due ?? 0,
      lapses: c.lapses ?? 0,
      seen: c.seen ?? 0,
      ok: pad(c.ok),
      lastShown: pad(c.ls),
      lastForm: c.lf ?? -1,
      relearn: Boolean(c.rl),
      relearnAt: c.rlAt ?? 0,
      preLapseIvl: c.pl ?? 0,
      introducedOn: c.intro ?? null,
    });
  }

  return states;
}
