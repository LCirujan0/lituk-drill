/**
 * Scheduler types and configuration. Pure — no framework, no storage, no clock.
 *
 * The scheduling unit is the FACT, not the question. One state per fact; its ~3
 * interchangeable phrasings are served in rotation. Three phrasings as three independent
 * cards would triple the review load for no extra learning and would let fluency in one
 * phrasing coexist with failure in another — which is precisely how people pass the
 * practice sites and fail the real thing.
 */

/** 0 Again · 3 Hard · 4 Good · 5 Easy. v0's scale, unchanged (D-015). */
export type Grade = 0 | 3 | 4 | 5;

/**
 * Where a review happened. Determines whether it may touch the schedule (D-003).
 *
 * The rule across every mode is one sentence: **failures always write, successes write
 * only when scheduled.** A failure is real evidence of not knowing, wherever it happens.
 * A success outside the schedule is contaminated — the card was self-selected, it was
 * seen moments ago, and it measures recency rather than retention.
 */
export type ReviewMode = 'scheduled' | 'practice' | 'mock';

export interface FactState {
  /** SM-2 ease factor. Starts at 2.5, floors at 1.3. */
  readonly ef: number;
  /** Current interval in whole days. 0 while learning or lapsed. */
  readonly ivl: number;
  /** Successful reviews since the last lapse. Drives the 1 → 6 → ×ease ladder. */
  readonly reps: number;
  /** Day number (days since epoch) this fact is next due. */
  readonly due: number;
  readonly lapses: number;
  /** Total reviews of this fact, all modes. */
  readonly seen: number;
  /** Correct count per form index. A form with >0 counts toward breadth. */
  readonly ok: readonly number[];
  /** Step index when each form was last shown. Drives rotation, never intervals. */
  readonly lastShown: readonly number[];
  /** Form index served last, or -1. Never served twice running if an alternative exists. */
  readonly lastForm: number;
  /** In the relearning queue — comes back later this session, not immediately. */
  readonly relearn: boolean;
  /** Step index at which a relearning fact becomes eligible again. */
  readonly relearnAt: number;
  /** Interval held before the most recent lapse, for post-lapse resume. 0 if none. */
  readonly preLapseIvl: number;
  /** Day this fact was first introduced, or null if never seen. */
  readonly introducedOn: number | null;
}

export interface SchedulerConfig {
  /** Interval ceiling until a SECOND phrasing is proven. The lock that makes variants matter. */
  readonly breadthCap2: number;
  /** Interval ceiling until EVERY phrasing is proven. */
  readonly breadthCapAll: number;
  /** Ease lost per lapse. */
  readonly lapsePenalty: number;
  /** Ease floor. */
  readonly minEase: number;
  /** Interval after the first success. */
  readonly firstInterval: number;
  /** Interval after the second success. */
  readonly secondInterval: number;
  /** Multiplier for a Hard grade, in place of ease. */
  readonly hardMultiplier: number;
  /** Added to ease for an Easy grade. */
  readonly easyBonus: number;
  /** Fraction of the pre-lapse interval resumed at, after re-graduating. */
  readonly postLapseResume: number;
  /** Lapses at or above which every future interval is permanently cut. */
  readonly leechThreshold: number;
  /** Multiplier applied once a fact is a leech. */
  readonly leechMultiplier: number;
  /** Interval jitter, ±this fraction, so heavy days don't return as spikes. */
  readonly fuzz: number;
  /** How many other facts pass before a missed fact returns in the same session. */
  readonly relearnGap: number;
}

/** v0's constants. Changing any of these invalidates the golden baseline in simulation.test.ts. */
export const DEFAULT_CONFIG: SchedulerConfig = {
  breadthCap2: 6,
  breadthCapAll: 30,
  lapsePenalty: 0.2,
  minEase: 1.3,
  firstInterval: 1,
  secondInterval: 6,
  hardMultiplier: 1.2,
  easyBonus: 0.15,
  postLapseResume: 0.35,
  leechThreshold: 3,
  leechMultiplier: 0.6,
  fuzz: 0.05,
  relearnGap: 3,
};

export const initialState = (formCount: number): FactState => ({
  ef: 2.5,
  ivl: 0,
  reps: 0,
  due: 0,
  lapses: 0,
  seen: 0,
  ok: new Array(formCount).fill(0),
  lastShown: new Array(formCount).fill(0),
  lastForm: -1,
  relearn: false,
  relearnAt: 0,
  preLapseIvl: 0,
  introducedOn: null,
});

/** Number of distinct forms answered correctly at least once. */
export const breadth = (state: FactState): number => state.ok.reduce((n, v) => n + (v > 0 ? 1 : 0), 0);

/** A fact is mature once its interval reaches three weeks. Used for reporting only. */
export const isMature = (state: FactState): boolean => state.ivl >= 21;
