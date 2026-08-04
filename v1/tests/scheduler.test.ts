/**
 * Scheduler unit tests and the invariants that must hold on every review.
 *
 * The simulation (simulation.test.ts) proves behaviour over time. This file proves the
 * individual rules, including the two that exist to make catastrophic failures structurally
 * impossible rather than merely unlikely:
 *
 *   · a practice or mock session can never increase a fact's due date (D-003)
 *   · an interval never exceeds its breadth gate (L-001)
 */

import { describe, expect, it } from 'vitest';

import { applyReview, mayAdvanceSchedule, pickForm, previewInterval, type Review } from '@/domain/scheduler/sm2';
import { mulberry32, rngForReview } from '@/domain/scheduler/rng';
import { compareEvents, mergeEvents, replay, importV0State, type ReviewEvent } from '@/domain/scheduler/events';
import {
  DEFAULT_CONFIG,
  breadth,
  initialState,
  type FactState,
  type Grade,
  type ReviewMode,
} from '@/domain/scheduler/types';

const cfg = DEFAULT_CONFIG;
const rng = () => 0.5; // mid-fuzz: no jitter either way
const review = (over: Partial<Review> = {}): Review => ({
  formIndex: 0,
  grade: 4,
  mode: 'scheduled',
  day: 100,
  step: 1,
  ...over,
});

/** Drive a fact through n successful scheduled reviews, rotating forms. */
function graduate(formCount: number, steps: number, grade: Grade = 4): FactState {
  let state = initialState(formCount);
  for (let i = 0; i < steps; i++) {
    state = applyReview(
      state,
      review({ formIndex: i % formCount, grade, day: 100 + i, step: i }),
      cfg,
      rng,
    );
  }
  return state;
}

describe('SM-2 core', () => {
  it('graduates at 1 day, then 6, then multiplies by ease', () => {
    let state = applyReview(initialState(3), review({ formIndex: 0, step: 0 }), cfg, rng);
    expect(state.ivl).toBe(1);

    state = applyReview(state, review({ formIndex: 1, day: 101, step: 1 }), cfg, rng);
    expect(state.ivl).toBe(6);

    // Third review: 6 × ease. Two forms proven of three, so the 30-day cap applies.
    const before = state.ef;
    state = applyReview(state, review({ formIndex: 2, day: 107, step: 2 }), cfg, rng);
    expect(state.ivl).toBe(Math.min(30, Math.round(6 * before)));
  });

  it('raises ease on Easy and lowers it on Hard', () => {
    const easy = applyReview(initialState(3), review({ grade: 5 }), cfg, rng);
    const hard = applyReview(initialState(3), review({ grade: 3 }), cfg, rng);
    expect(easy.ef).toBeGreaterThan(2.5);
    expect(hard.ef).toBeLessThan(2.5);
  });

  it('floors ease at 1.3 however many times it is missed', () => {
    let state = initialState(3);
    for (let i = 0; i < 40; i++) {
      state = applyReview(state, review({ grade: 0, day: 100 + i, step: i }), cfg, rng);
    }
    expect(state.ef).toBe(1.3);
  });
});

describe('addition 1 — the breadth gate', () => {
  it('caps at 6 days until a second phrasing is proven', () => {
    // Same form over and over: breadth never exceeds 1.
    let state = initialState(3);
    for (let i = 0; i < 12; i++) {
      state = applyReview(state, review({ formIndex: 0, day: 100 + i * 10, step: i }), cfg, rng);
      expect(breadth(state)).toBe(1);
      expect(state.ivl).toBeLessThanOrEqual(cfg.breadthCap2);
    }
  });

  it('caps at 30 days until every phrasing is proven', () => {
    let state = initialState(3);
    for (let i = 0; i < 20; i++) {
      // Alternate two of the three forms — breadth reaches 2 and stops there.
      state = applyReview(state, review({ formIndex: i % 2, day: 100 + i * 40, step: i }), cfg, rng);
    }
    expect(breadth(state)).toBe(2);
    expect(state.ivl).toBeLessThanOrEqual(cfg.breadthCapAll);
  });

  it('lifts past 30 days once all phrasings are proven', () => {
    const state = graduate(3, 14);
    expect(breadth(state)).toBe(3);
    expect(state.ivl).toBeGreaterThan(cfg.breadthCapAll);
  });

  it('never exceeds its cap even at the extremes of fuzz — ledger L-001', () => {
    // v0 fuzzed AFTER capping, so a 30-day cap could reach 32. v1 caps last.
    for (const draw of [0, 0.001, 0.25, 0.5, 0.75, 0.999, 1]) {
      const jitter = () => draw;
      let two = initialState(3);
      for (let i = 0; i < 20; i++) {
        two = applyReview(two, review({ formIndex: i % 2, day: 100 + i * 40, step: i }), cfg, jitter);
        expect(two.ivl).toBeLessThanOrEqual(cfg.breadthCapAll);
      }
      let one = initialState(3);
      for (let i = 0; i < 20; i++) {
        one = applyReview(one, review({ formIndex: 0, day: 100 + i * 10, step: i }), cfg, jitter);
        expect(one.ivl).toBeLessThanOrEqual(cfg.breadthCap2);
      }
    }
  });
});

describe('addition 2 — the lapse resets the fact, not just the form', () => {
  it('clears only the missed form’s credit but resets the whole fact', () => {
    const state = graduate(3, 6);
    expect(breadth(state)).toBe(3);

    const lapsed = applyReview(state, review({ formIndex: 1, grade: 0, day: 200, step: 99 }), cfg, rng);
    expect(lapsed.ok[1]).toBe(0);
    expect(lapsed.ok[0]).toBeGreaterThan(0);
    expect(lapsed.reps).toBe(0);
    expect(lapsed.ivl).toBe(0);
    expect(lapsed.lapses).toBe(state.lapses + 1);
    expect(lapsed.ef).toBeCloseTo(state.ef - cfg.lapsePenalty, 10);
  });
});

describe('addition 3 — relearning is spaced, not instant', () => {
  it('returns the fact about three steps later in the same session', () => {
    const lapsed = applyReview(initialState(3), review({ grade: 0, step: 10 }), cfg, rng);
    expect(lapsed.relearn).toBe(true);
    expect(lapsed.relearnAt).toBe(10 + cfg.relearnGap);
  });
});

describe('addition 4 — post-lapse resume', () => {
  it('re-graduates at 35% of the pre-lapse interval, not from scratch', () => {
    const mature = graduate(3, 10);
    const before = mature.ivl;
    expect(before).toBeGreaterThan(20);

    const lapsed = applyReview(mature, review({ formIndex: 0, grade: 0, day: 300, step: 50 }), cfg, rng);
    expect(lapsed.preLapseIvl).toBe(before);

    const resumed = applyReview(lapsed, review({ formIndex: 0, grade: 4, day: 300, step: 54 }), cfg, rng);
    // Breadth dropped to 2 of 3 when form 0's credit was cleared, so the 30-day cap applies.
    expect(resumed.ivl).toBe(Math.min(cfg.breadthCapAll, Math.round(before * cfg.postLapseResume)));
    expect(resumed.ivl).toBeGreaterThan(1);
  });
});

describe('addition 5 — leech taper and fuzz', () => {
  it('permanently shortens intervals after three lapses', () => {
    let leech = initialState(3);
    for (let i = 0; i < 3; i++) {
      leech = applyReview(leech, review({ grade: 0, day: 100 + i, step: i }), cfg, rng);
    }
    expect(leech.lapses).toBeGreaterThanOrEqual(cfg.leechThreshold);

    const healthy = graduate(3, 8);
    let tapered: FactState = {
      ...leech,
      ok: [...healthy.ok],
      reps: healthy.reps,
      ivl: healthy.ivl,
      ef: healthy.ef,
    };
    tapered = applyReview(tapered, review({ formIndex: 0, day: 400, step: 80 }), cfg, rng);
    const untapered = applyReview(healthy, review({ formIndex: 0, day: 400, step: 80 }), cfg, rng);
    expect(tapered.ivl).toBeLessThan(untapered.ivl);
  });

  it('keeps fuzz within ±5%', () => {
    const state = graduate(3, 10);
    const low = applyReview(state, review({ day: 400, step: 80 }), cfg, () => 0).ivl;
    const high = applyReview(state, review({ day: 400, step: 80 }), cfg, () => 1).ivl;
    expect(high / low).toBeLessThanOrEqual(1.11); // 1.05 / 0.95, plus rounding
    expect(high).toBeGreaterThanOrEqual(low);
  });
});

describe('D-003 — practice may shorten a schedule, never lengthen it', () => {
  const modes: ReviewMode[] = ['practice', 'mock'];

  it('classifies reviews correctly', () => {
    expect(mayAdvanceSchedule('scheduled', 4)).toBe(true);
    expect(mayAdvanceSchedule('scheduled', 0)).toBe(true);
    for (const mode of modes) {
      expect(mayAdvanceSchedule(mode, 0)).toBe(true); // failures always count
      expect(mayAdvanceSchedule(mode, 3)).toBe(false);
      expect(mayAdvanceSchedule(mode, 4)).toBe(false);
      expect(mayAdvanceSchedule(mode, 5)).toBe(false);
    }
  });

  it('never schedules a fact further out than where it already was, or today', () => {
    // The invariant that makes the worst version of free practice impossible.
    //
    // Stated carefully, because the naive form ("due never increases") is false for a
    // reason that doesn't matter: an unseen fact carries due = 0 as a sentinel, so a
    // practice failure moving it to today is technically an increase while being
    // obviously not the thing we care about. What must hold universally is that practice
    // can never push a fact PAST where it was already scheduled — it may only pull it
    // forward, or leave it alone.
    const day = 500;
    const states = [initialState(3), graduate(3, 2), graduate(3, 6), graduate(3, 12)];
    const grades: Grade[] = [0, 3, 4, 5];

    for (const mode of modes) {
      for (const state of states) {
        for (const grade of grades) {
          for (const formIndex of [0, 1, 2]) {
            const after = applyReview(
              state,
              review({ formIndex, grade, mode, day, step: 200 }),
              cfg,
              mulberry32(1),
            );
            expect(after.due).toBeLessThanOrEqual(Math.max(state.due, day));
            expect(after.ivl).toBeLessThanOrEqual(state.ivl);
          }
        }
      }
    }
  });

  it('leaves an already-scheduled fact’s due date strictly untouched on success', () => {
    const mature = graduate(3, 12);
    for (const mode of modes) {
      for (const grade of [3, 4, 5] as Grade[]) {
        const after = applyReview(mature, review({ grade, mode, day: 500, step: 200 }), cfg, mulberry32(1));
        expect(after.due).toBe(mature.due);
        expect(after.ivl).toBe(mature.ivl);
        expect(after.ef).toBe(mature.ef);
        expect(after.reps).toBe(mature.reps);
      }
    }
  });

  it('leaves breadth untouched on a practice success, so the gate cannot be lifted by practice', () => {
    const state = initialState(3);
    const after = applyReview(state, review({ grade: 5, mode: 'practice' }), cfg, rng);
    expect(breadth(after)).toBe(0);
    expect(after.ok).toEqual(state.ok);
  });

  it('still rotates forms during practice, so a session does not repeat one phrasing', () => {
    const after = applyReview(initialState(3), review({ formIndex: 2, grade: 4, mode: 'practice' }), cfg, rng);
    expect(after.lastForm).toBe(2);
    expect(after.seen).toBe(1);
  });

  it('applies a practice failure in full', () => {
    const mature = graduate(3, 8);
    const after = applyReview(mature, review({ formIndex: 0, grade: 0, mode: 'practice', day: 500, step: 200 }), cfg, rng);
    expect(after.lapses).toBe(mature.lapses + 1);
    expect(after.relearn).toBe(true);
    expect(after.ivl).toBe(0);
  });
});

describe('form rotation', () => {
  const isMcqOnly = (i: number) => i === 2;

  it('serves the least-proven form first', () => {
    const state: FactState = { ...initialState(3), ok: [3, 0, 1], lastForm: -1 };
    expect(pickForm(state, 3, () => false, false, mulberry32(1))).toBe(1);
  });

  it('never serves the same form twice running when an alternative exists', () => {
    const state: FactState = { ...initialState(3), ok: [0, 0, 0], lastForm: 0 };
    expect(pickForm(state, 3, () => false, false, mulberry32(7))).not.toBe(0);
  });

  it('excludes mcqOnly forms in recall mode', () => {
    const state: FactState = { ...initialState(3), ok: [5, 5, 0], lastForm: -1 };
    // Form 2 is least-proven but is mcqOnly, so recall mode must not pick it.
    expect(pickForm(state, 3, isMcqOnly, true, mulberry32(3))).not.toBe(2);
  });

  it('falls back to an mcqOnly form rather than serving nothing', () => {
    const state = initialState(1);
    expect(pickForm(state, 1, () => true, true, mulberry32(3))).toBe(0);
  });
});

describe('interval preview', () => {
  it('matches what a grade would actually produce, before fuzz', () => {
    const state = graduate(3, 4);
    for (const grade of [3, 4, 5] as Grade[]) {
      const predicted = previewInterval(state, 0, grade, cfg);
      const actual = applyReview(state, review({ formIndex: 0, grade, day: 400, step: 90 }), cfg, () => 0.5).ivl;
      expect(Math.abs(predicted - actual)).toBeLessThanOrEqual(1); // fuzz rounding only
    }
  });
});

describe('event log — D-002', () => {
  const formCounts = new Map([['f000', 3], ['f001', 3]]);
  const event = (id: string, factId: string, at: number, grade: Grade, formIndex = 0): ReviewEvent => ({
    id, factId, formIndex, grade, mode: 'scheduled', at,
  });

  const log: ReviewEvent[] = [
    event('e1', 'f000', 1_700_000_000_000, 4, 0),
    event('e2', 'f000', 1_700_086_400_000, 4, 1),
    event('e3', 'f001', 1_700_086_400_000, 0, 0),
    event('e4', 'f000', 1_700_604_800_000, 5, 2),
    event('e5', 'f001', 1_700_691_200_000, 4, 1),
  ];

  it('derives identical state regardless of arrival order', () => {
    const forward = replay(log, formCounts);
    const backward = replay([...log].reverse(), formCounts);
    const jumbled = replay([log[3], log[0], log[4], log[2], log[1]], formCounts);

    expect([...backward.states]).toEqual([...forward.states]);
    expect([...jumbled.states]).toEqual([...forward.states]);
  });

  it('merges two devices without losing a grade', () => {
    const phone = [log[0], log[1], log[3]];
    const laptop = [log[0], log[2], log[4]]; // e1 seen by both
    const merged = mergeEvents(phone, laptop);

    expect(merged).toHaveLength(5);
    expect(new Set(merged.map((e) => e.id)).size).toBe(5);
    expect([...replay(merged, formCounts).states]).toEqual([...replay(log, formCounts).states]);
  });

  it('is idempotent — syncing twice changes nothing', () => {
    expect(mergeEvents(log, log)).toEqual(mergeEvents(log));
  });

  it('orders deterministically when timestamps tie', () => {
    const a = event('bbb', 'f000', 1000, 4);
    const b = event('aaa', 'f000', 1000, 4);
    expect(compareEvents(a, b)).toBeGreaterThan(0);
    expect(compareEvents(b, a)).toBeLessThan(0);
  });

  it('skips events for facts no longer in the deck rather than throwing', () => {
    const stale = [...log, event('e9', 'f999', 1_700_700_000_000, 4)];
    expect(() => replay(stale, formCounts)).not.toThrow();
    expect(replay(stale, formCounts).states.has('f999')).toBe(false);
  });

  it('seeds jitter from the event id, so a late arrival does not re-roll its neighbours', () => {
    // Insert an event dated BEFORE everything else — the sync case that would be most
    // damaging if jitter were seeded from log position.
    const late = event('e0', 'f000', 1_699_000_000_000, 4, 0);
    const before = replay(log, formCounts).states.get('f001')!;
    const after = replay([...log, late], formCounts).states.get('f001')!;

    // Every schedule-bearing field is untouched: f001 saw no new evidence.
    const schedule = (s: FactState) => ({
      ef: s.ef, ivl: s.ivl, reps: s.reps, due: s.due,
      lapses: s.lapses, ok: s.ok, preLapseIvl: s.preLapseIvl, introducedOn: s.introducedOn,
    });
    expect(schedule(after)).toEqual(schedule(before));
  });

  it('shifts step bookkeeping uniformly when an earlier event is inserted', () => {
    // `step` is a position in the sorted log, so inserting an earlier event shifts every
    // subsequent step by one. Only RELATIVE step order is ever read — rotation compares
    // lastShown between forms, and relearnAt is compared against the same counter — so a
    // uniform shift changes no behaviour. Asserted explicitly so the day someone reads an
    // absolute step value, this test explains why they must not.
    const late = event('e0', 'f000', 1_699_000_000_000, 4, 0);
    const before = replay(log, formCounts).states.get('f001')!;
    const after = replay([...log, late], formCounts).states.get('f001')!;

    const shifts = after.lastShown.map((v, i) => v - before.lastShown[i]).filter((_, i) => before.lastShown[i] > 0);
    expect(new Set(shifts).size).toBe(1);
    expect(shifts[0]).toBe(1);
  });
});

describe('S6 — importing v0 progress', () => {
  const factIdFor = (i: number) => `f${String(i).padStart(3, '0')}`;
  const formCounts = new Map([['f000', 3], ['f193', 3]]);

  it('maps v0 array indices onto fact ids', () => {
    const imported = importV0State(
      {
        f: {
          '0': { ef: 2.36, ivl: 12, reps: 4, due: 20_400, lapses: 1, seen: 9, ok: [2, 1, 1], ls: [7, 8, 9], lf: 2, rl: 0, rlAt: 0, pl: 34, intro: 20_380 },
          '193': { ef: 2.5, ivl: 1, reps: 1, due: 20_390, lapses: 0, seen: 1, ok: [1, 0, 0], ls: [1, 0, 0], lf: 0, rl: 0, rlAt: 0, pl: 0, intro: 20_389 },
        },
      },
      factIdFor,
      formCounts,
    );

    expect(imported.get('f000')?.ivl).toBe(12);
    expect(imported.get('f000')?.ok).toEqual([2, 1, 1]);
    expect(imported.get('f000')?.preLapseIvl).toBe(34);
    expect(imported.get('f193')?.reps).toBe(1);
  });

  it('pads per-form arrays when a fact gained a phrasing since v0', () => {
    const counts = new Map([['f000', 5]]);
    const imported = importV0State(
      { f: { '0': { ef: 2.5, ivl: 6, reps: 2, due: 1, lapses: 0, seen: 3, ok: [1, 1, 0], ls: [1, 2, 0], lf: 1, rl: 0, rlAt: 0, pl: 0, intro: 0 } } },
      factIdFor,
      counts,
    );
    expect(imported.get('f000')?.ok).toEqual([1, 1, 0, 0, 0]);
  });

  it('ignores state for facts that no longer exist', () => {
    const imported = importV0State(
      { f: { '9999': { ef: 2.5, ivl: 1, reps: 1, due: 1, lapses: 0, seen: 1, ok: [1], ls: [1], lf: 0, rl: 0, rlAt: 0, pl: 0, intro: 0 } } },
      factIdFor,
      formCounts,
    );
    expect(imported.size).toBe(0);
  });
});

describe('determinism', () => {
  it('produces the same sequence for the same seed', () => {
    const a = Array.from({ length: 8 }, mulberry32(42));
    const b = Array.from({ length: 8 }, mulberry32(42));
    expect(a).toEqual(b);
    expect(a).not.toEqual(Array.from({ length: 8 }, mulberry32(43)));
  });

  it('derives the same generator for the same event on any device', () => {
    expect(rngForReview('f042', 'evt-7')()).toBe(rngForReview('f042', 'evt-7')());
    expect(rngForReview('f042', 'evt-7')()).not.toBe(rngForReview('f042', 'evt-8')());
  });
});
