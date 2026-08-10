/**
 * The scheduler simulation. R4's mitigation, and a build gate rather than a script.
 *
 * A scheduler cannot be verified by reading it or by clicking through a few cards. v0's
 * was verified by running 60 simulated days in a headless browser, and that is the only
 * reason anyone knew its load curve. This does the same thing over simulated time, in CI,
 * with assertions on invariants rather than eyeballed output.
 *
 * Two things are checked, and the distinction matters:
 *
 *   · **Invariants** — logical properties that must hold after every single review, at any
 *     configuration, for ever. Asserted exactly. A violation is a bug.
 *   · **Load characteristics** — the aggregate shape of the review curve, against what v0
 *     documented. Asserted in bands. These describe a *learner model*, not the scheduler,
 *     so pinning them exactly would make the test brittle about the wrong thing. The bands
 *     are wide enough to survive a refactor and narrow enough to catch a clamped interval.
 *
 * Everything is seeded, so a failure here reproduces exactly.
 */

import { describe, expect, it } from 'vitest';

import { DECK } from '@/domain/deck';
import { mulberry32, rngForReview, type Rng } from '@/domain/scheduler/rng';
import { applyReview, pickForm, type Review } from '@/domain/scheduler/sm2';
import { buildQueue, countDeck } from '@/domain/scheduler/queue';
import {
  DEFAULT_CONFIG,
  breadth,
  initialState,
  type FactState,
  type Grade,
} from '@/domain/scheduler/types';
import { DECK_BASELINE } from '@/domain/deck/baseline';
import { DAILY_TARGET } from '@/domain/drill/sections';

const config = DEFAULT_CONFIG;
const FACT_IDS = DECK.map((f) => f.id);
const FORM_COUNT = new Map(DECK.map((f) => [f.id, f.forms.length]));
const IS_MCQ_ONLY = new Map(DECK.map((f) => [f.id, f.forms.map((form) => form.mcqOnly)]));

interface SimOptions {
  readonly days: number;
  readonly newPerDay: number;
  readonly maxReviews: number;
  /** Probability of recalling a phrasing never yet answered correctly. */
  readonly firstTimeRecall: number;
  /** 'recall' restricts to non-mcqOnly forms — the Cards-only case. 'mixed' uses everything. */
  readonly mode: 'recall' | 'mixed';
  readonly seed: number;
}

interface SimResult {
  readonly states: Map<string, FactState>;
  readonly reviewsPerDay: number[];
  readonly violations: string[];
  readonly totalReviews: number;
  readonly daysQueueDidNotDrain: number[];
}

/**
 * A learner. Deliberately simple and deliberately fallible: recall improves with each
 * EXPOSURE to a given phrasing, and leeches stay harder. The point is not to model a human
 * accurately — it is to exercise every path through the scheduler under load.
 *
 * Exposure is tracked by the harness, not read from `state.ok`, and the distinction is not
 * cosmetic. A lapse clears that phrasing's credit (`ok[i] = 0`) but obviously does not
 * erase the learner's memory of ever having seen it. An earlier version of this file keyed
 * recall probability off `ok[i] === 0`, so every lapse silently reset the learner to
 * never-seen — and because `pickForm` deliberately serves the least-proven phrasing first,
 * the scheduler then kept serving exactly the form the model had just made hardest. The
 * result was a self-sustaining churn of ~1,200 lapses that persisted even with a learner
 * who never failed after two proofs, and a review curve that never settled.
 *
 * That was a defect in the harness, not the scheduler — but it is worth keeping written
 * down, because a simulation that models the learner wrongly will confidently report that
 * a correct scheduler is broken, and R4 depends on trusting what this file says.
 */
function answerFor(exposures: number, lapses: number, opts: SimOptions, rng: Rng): Grade {
  let p = exposures === 0 ? opts.firstTimeRecall : exposures === 1 ? 0.88 : 0.95;
  if (lapses >= config.leechThreshold) p -= 0.1;

  if (rng() > p) return 0;
  const roll = rng();
  return roll < 0.15 ? 3 : roll < 0.85 ? 4 : 5;
}

function simulate(opts: SimOptions): SimResult {
  const states = new Map<string, FactState>();
  /** How many times the learner has actually SEEN each phrasing. Never reset by a lapse. */
  const exposures = new Map<string, number[]>();
  const reviewsPerDay: number[] = [];
  const violations: string[] = [];
  const daysQueueDidNotDrain: number[] = [];
  const rng = mulberry32(opts.seed);

  let step = 0;
  let totalReviews = 0;

  for (let day = 0; day < opts.days; day++) {
    let newToday = 0;
    let reviewsToday = 0;
    // A runaway guard. If this ever trips, the queue is not draining and the assertion
    // below reports the day rather than the suite hanging.
    const ceiling = opts.maxReviews + opts.newPerDay + FACT_IDS.length * 4;

    for (;;) {
      const { queue } = buildQueue(
        { factIds: FACT_IDS, states, today: day, step, newPerDay: opts.newPerDay, newToday, maxReviews: opts.maxReviews },
        rng,
      );
      if (queue.length === 0) break;
      if (reviewsToday >= ceiling) {
        daysQueueDidNotDrain.push(day);
        break;
      }

      const factId = queue[0];
      const formCount = FORM_COUNT.get(factId)!;
      const mcqOnly = IS_MCQ_ONLY.get(factId)!;
      const state = states.get(factId) ?? initialState(formCount);
      const wasUnseen = state.seen === 0;

      const formIndex = pickForm(
        state,
        formCount,
        (i) => mcqOnly[i],
        opts.mode === 'recall',
        mulberry32(step + 1),
      );
      const seenForms = exposures.get(factId) ?? new Array<number>(formCount).fill(0);
      const grade = answerFor(seenForms[formIndex], state.lapses, opts, rng);
      seenForms[formIndex] += 1;
      exposures.set(factId, seenForms);

      const review: Review = { formIndex, grade, mode: 'scheduled', day, step };
      const next = applyReview(state, review, config, rngForReview(factId, `sim-${step}`));

      // ---- invariants, checked after every single review ----------------------
      const proven = breadth(next);
      const forms = next.ok.length;
      if (proven < 2 && next.ivl > config.breadthCap2) {
        violations.push(`day ${day} ${factId}: breadth ${proven} but interval ${next.ivl} > ${config.breadthCap2}`);
      }
      if (proven < forms && next.ivl > config.breadthCapAll) {
        violations.push(`day ${day} ${factId}: breadth ${proven}/${forms} but interval ${next.ivl} > ${config.breadthCapAll}`);
      }
      if (next.ivl < 0) violations.push(`day ${day} ${factId}: negative interval ${next.ivl}`);
      if (grade >= 3 && next.ivl < 1) violations.push(`day ${day} ${factId}: success produced interval ${next.ivl}`);
      if (next.due < day) violations.push(`day ${day} ${factId}: due ${next.due} in the past`);
      if (next.ef < config.minEase) violations.push(`day ${day} ${factId}: ease ${next.ef} below floor`);
      if (opts.mode === 'recall' && mcqOnly[formIndex] && mcqOnly.some((m) => !m)) {
        violations.push(`day ${day} ${factId}: served mcqOnly form ${formIndex} in recall mode`);
      }

      states.set(factId, next);
      step++;
      reviewsToday++;
      totalReviews++;
      if (wasUnseen) newToday++;
    }

    reviewsPerDay.push(reviewsToday);
  }

  return { states, reviewsPerDay, violations, totalReviews, daysQueueDidNotDrain };
}

/**
 * The headline run tracks `DAILY_TARGET` rather than restating it.
 *
 * It was hard-coded at 40. `DAILY_TARGET` moved 30 → 50 on 10 August (D-035, so a ~700-fact deck
 * can still be seen), and the published curve — peak 187 on day 9 — silently stopped describing
 * the app while every assertion here kept passing. HANDOFF had to carry a note saying the numbers
 * were stale, which is a documentation patch over a test that had stopped measuring the product.
 *
 * Reading the constant is the fix. The next time the daily target moves, this run moves with it
 * and its numbers are re-measured by the suite rather than by someone remembering to.
 */
describe(`60-day simulation — ${DAILY_TARGET} new facts/day, 72% first-time recall`, () => {
  const result = simulate({
    days: 60,
    newPerDay: DAILY_TARGET,
    maxReviews: 300,
    firstTimeRecall: 0.72,
    mode: 'mixed',
    seed: 20260804,
  });

  const counts = countDeck(FACT_IDS, result.states, 59);
  const peak = Math.max(...result.reviewsPerDay);
  const peakDay = result.reviewsPerDay.indexOf(peak);

  it('reports its curve', () => {
    // Not an assertion — the numbers are the artifact. A scheduler whose load curve
    // nobody has seen is a scheduler nobody has verified.
    const window = (from: number, to: number) =>
      Math.round(result.reviewsPerDay.slice(from, to).reduce((a, b) => a + b, 0) / (to - from));
    console.log(
      [
        `  total reviews      ${result.totalReviews}`,
        `  peak               ${peak} on day ${peakDay}`,
        `  mean days  0–9     ${window(0, 10)}`,
        `  mean days 10–19    ${window(10, 20)}`,
        `  mean days 20–41    ${window(20, 42)}`,
        `  mean days 42–59    ${window(42, 60)}`,
        `  facts started      ${FACT_IDS.length - counts.unseen}/${FACT_IDS.length}`,
        `  proven all forms   ${counts.provenAllForms}`,
        `  mature (ivl >= 21) ${counts.mature}`,
      ].join('\n'),
    );
    expect(result.totalReviews).toBeGreaterThan(0);
  });

  it('violates no invariant, on any review, on any day', () => {
    expect(result.violations.slice(0, 20)).toEqual([]);
    expect(result.violations).toHaveLength(0);
  });

  it('drains the queue every single day', () => {
    expect(result.daysQueueDidNotDrain).toEqual([]);
  });

  it('reaches every fact in the deck', () => {
    expect(counts.unseen).toBe(0);
  });

  it('proves nearly every fact on every one of its phrasings', () => {
    // v0's documented result was 403–407 of 410. Anything far below means the breadth
    // gate is not clearing, which would show as facts resurfacing for ever.
    expect(counts.provenAllForms).toBeGreaterThanOrEqual(395);
  });

  it('peaks early and settles, matching v0’s documented shape', () => {
    // v0: "peaks around 170 reviews on day 8–10, drops below 40/day by day 20, and
    // settles under 15/day by week six." Bands, not points — the learner model drives
    // these as much as the scheduler does.
    expect(peak).toBeGreaterThan(100);
    expect(peak).toBeLessThan(320);
    expect(peakDay).toBeGreaterThanOrEqual(5);
    expect(peakDay).toBeLessThanOrEqual(16);

    const mean = (from: number, to: number) =>
      result.reviewsPerDay.slice(from, to).reduce((a, b) => a + b, 0) / (to - from);
    expect(mean(20, 42)).toBeLessThan(mean(0, 10));
    expect(mean(42, 60)).toBeLessThan(mean(20, 42));
  });

  it('never lets a fact become unreachable', () => {
    for (const [id, state] of result.states) {
      expect(state.due, `${id} scheduled beyond the simulation`).toBeLessThan(60 + 400);
      expect(state.ivl, `${id} has a null interval while seen`).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('recall-only simulation — the Cards-mode case', () => {
  // Six facts have a single recall-usable phrasing, so in recall-only use their breadth
  // can never exceed 1 and they stay pinned at the 6-day cap for ever. That is a content
  // shape problem, not a scheduler bug, and from the inside it reads as "I keep failing
  // these". Pinned to the deck baseline so it cannot quietly get worse.
  const result = simulate({
    days: 60,
    newPerDay: 40,
    maxReviews: 300,
    firstTimeRecall: 0.72,
    mode: 'recall',
    seed: 20260804,
  });

  it('violates no invariant', () => {
    expect(result.violations).toHaveLength(0);
  });

  it('pins exactly the facts the deck baseline predicts, and no others', () => {
    const pinned = [...result.states]
      .filter(([id, state]) => {
        const forms = DECK.find((f) => f.id === id)!.forms;
        const recallable = forms.filter((f) => !f.mcqOnly).length;
        return recallable < 2 && state.ivl <= DEFAULT_CONFIG.breadthCap2;
      })
      .map(([id]) => id);

    expect(pinned.length).toBeLessThanOrEqual(DECK_BASELINE.factsBelowRecallBreadth);
    expect(pinned.sort()).toEqual(['f017', 'f218', 'f222', 'f223', 'f357', 'f367']);
  });

  it('still reaches every fact', () => {
    expect(countDeck(FACT_IDS, result.states, 59).unseen).toBe(0);
  });
});

describe('determinism over a full run', () => {
  it('produces byte-identical results from the same seed', () => {
    const opts: SimOptions = {
      days: 20, newPerDay: 40, maxReviews: 300, firstTimeRecall: 0.72, mode: 'mixed', seed: 7,
    };
    const a = simulate(opts);
    const b = simulate(opts);
    expect(a.reviewsPerDay).toEqual(b.reviewsPerDay);
    expect([...a.states]).toEqual([...b.states]);
  });

  it('produces different results from a different seed', () => {
    const base: SimOptions = {
      days: 20, newPerDay: 40, maxReviews: 300, firstTimeRecall: 0.72, mode: 'mixed', seed: 7,
    };
    expect(simulate(base).reviewsPerDay).not.toEqual(simulate({ ...base, seed: 8 }).reviewsPerDay);
  });
});

describe('load under the default 20 new facts per day', () => {
  const result = simulate({
    days: 60, newPerDay: 20, maxReviews: 120, firstTimeRecall: 0.72, mode: 'mixed', seed: 20260804,
  });

  it('stays roughly half the load of the 40/day run, as v0 documented', () => {
    expect(Math.max(...result.reviewsPerDay)).toBeLessThan(200);
    expect(result.violations).toHaveLength(0);
    expect(result.daysQueueDidNotDrain).toEqual([]);
  });

  it('still starts every fact within 60 days', () => {
    expect(countDeck(FACT_IDS, result.states, 59).unseen).toBe(0);
  });
});
