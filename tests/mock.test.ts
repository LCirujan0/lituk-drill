/**
 * The twenty fixed mock tests, and the history derived from them (C7, D-036).
 *
 * Two things are load-bearing here and neither is obvious from reading the code.
 *
 * **The pinned file must not drift.** `src/data/mock-tests.ts` is generated, and a
 * regenerated draw would silently re-label every attempt already sat — because an attempt is
 * identified in the log by the forms it served, not by a stored test id. So the file is
 * asserted byte for byte against a rebuild from the same seed. That is what makes
 * regenerating it a decision rather than a surprise.
 *
 * **Disjointness is not a nicety.** It is the premise that makes `formToTest` a function at
 * all. If two tests ever shared a form the history would be wrong rather than merely
 * incomplete, so it is asserted as an exact set, in both directions.
 *
 * Every assertion below was run against deliberately broken code before being trusted; the
 * breakages are named where they are not obvious.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { ACTIVE, factById } from '@/domain/deck';
import type { Chapter } from '@/domain/deck/types';
import { FIXED_TESTS } from '@/data/mock-tests';
import {
  apportion,
  buildFixedTests,
  CHAPTERS,
  FIXED_TEST_COUNT,
  MOCK_LENGTH,
} from '@/domain/mock/build';
import {
  formToTest,
  historyByTest,
  mockAttempts,
  PASS_MARK,
  trend,
} from '@/domain/mock/attempts';
import { mulberry32 } from '@/domain/scheduler/rng';
import type { ReviewEvent } from '@/domain/scheduler/events';
import type { Grade, ReviewMode } from '@/domain/scheduler/types';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Must match `scripts/build-mock-tests.ts`. Duplicated deliberately — see the drift test. */
const SEED = 20_260_813;

const key = (factId: string, formIndex: number) => `${factId}:${formIndex}`;
const allQuestions = FIXED_TESTS.flatMap((t) => t.questions);

describe('the pinned file', () => {
  /**
   * The drift check. Broken deliberately by swapping two questions inside test 7, which
   * failed — and by changing the seed, which also failed.
   */
  it('is exactly what the generator produces from the recorded seed', () => {
    const rebuilt = buildFixedTests(ACTIVE, mulberry32(SEED), FIXED_TEST_COUNT, MOCK_LENGTH).tests;

    expect(rebuilt.length).toBe(FIXED_TESTS.length);
    for (let i = 0; i < rebuilt.length; i++) {
      expect(FIXED_TESTS[i].id).toBe(rebuilt[i].id);
      expect(FIXED_TESTS[i].questions.map((q) => key(q.factId, q.formIndex))).toEqual(
        rebuilt[i].questions.map((q) => key(q.factId, q.formIndex)),
      );
    }
  });

  /**
   * The generator's seed and the test's must be the same number, and nothing but this
   * catches them diverging — with two different seeds the check above would compare a stale
   * file against a stale expectation and pass.
   */
  it('records the same seed in the script that this test uses', () => {
    const script = readFileSync(join(root, 'scripts/build-mock-tests.ts'), 'utf8');
    const declared = /const SEED = ([\d_]+);/.exec(script)?.[1].replace(/_/g, '');
    expect(declared).toBe(String(SEED));
  });

  it('says it is generated and must not be regenerated casually', () => {
    const data = readFileSync(join(root, 'src/data/mock-tests.ts'), 'utf8');
    expect(data).toMatch(/GENERATED — DO NOT REGENERATE without a DECISIONS entry/);
  });
});

describe('shape', () => {
  it('is twenty tests of twenty-four, numbered 1..20', () => {
    expect(FIXED_TESTS.length).toBe(20);
    expect(FIXED_TESTS.map((t) => t.id)).toEqual([...Array(20)].map((_, i) => i + 1));
    for (const test of FIXED_TESTS) expect(test.questions.length).toBe(24);
  });

  /** The premise `formToTest` rests on. Exact set, in both directions, not a count. */
  it('never serves the same form in two tests', () => {
    const seen = new Map<string, number[]>();
    for (const test of FIXED_TESTS) {
      for (const q of test.questions) {
        const k = key(q.factId, q.formIndex);
        seen.set(k, [...(seen.get(k) ?? []), test.id]);
      }
    }
    const shared = [...seen.entries()].filter(([, ids]) => ids.length > 1);
    expect(shared).toEqual([]);
    expect(seen.size).toBe(FIXED_TEST_COUNT * MOCK_LENGTH);
  });

  it('never asks the same fact twice inside one test', () => {
    const offenders: string[] = [];
    for (const test of FIXED_TESTS) {
      const ids = test.questions.map((q) => q.factId);
      if (new Set(ids).size !== ids.length) offenders.push(`test ${test.id}`);
    }
    expect(offenders).toEqual([]);
  });

  it('only references active facts and real forms', () => {
    const offenders: string[] = [];
    for (const q of allQuestions) {
      const fact = factById(q.factId);
      if (!fact) offenders.push(`${q.factId} missing`);
      else if (fact.retired) offenders.push(`${q.factId} retired`);
      else if (!fact.forms[q.formIndex]) offenders.push(`${key(q.factId, q.formIndex)} no such form`);
    }
    expect(offenders).toEqual([]);
  });
});

describe('chapter proportions', () => {
  /** Largest remainder, and the reason it is not independent rounding. */
  it('apportions to exactly the total, where naive rounding does not', () => {
    const sizes = new Map<Chapter, number>([[1, 16], [2, 32], [3, 220], [4, 141], [5, 121]]);
    const seats = apportion(sizes, 24);

    expect([...seats.values()].reduce((a, b) => a + b, 0)).toBe(24);
    // The naive alternative, kept as the contrast that justifies the algorithm.
    const naive = [...sizes.values()].reduce((n, size) => n + Math.round((size * 24) / 530), 0);
    expect(naive).toBe(23);
  });

  it('is a pure function of the sizes, not of insertion order', () => {
    const a = new Map<Chapter, number>([[1, 16], [2, 32], [3, 220], [4, 141], [5, 121]]);
    const b = new Map<Chapter, number>([[5, 121], [3, 220], [1, 16], [4, 141], [2, 32]]);
    expect([...apportion(a, 24).entries()].sort()).toEqual([...apportion(b, 24).entries()].sort());
  });

  it('gives every test the same, correct seats per chapter — the exact set', () => {
    const sizes = new Map<Chapter, number>(
      CHAPTERS.map((c) => [c, ACTIVE.filter((f) => f.chapter === c).length]),
    );
    const expected = apportion(sizes, MOCK_LENGTH);

    for (const test of FIXED_TESTS) {
      const actual = new Map<Chapter, number>(CHAPTERS.map((c) => [c, 0]));
      for (const q of test.questions) {
        const chapter = factById(q.factId)!.chapter;
        actual.set(chapter, actual.get(chapter)! + 1);
      }
      expect({ test: test.id, seats: [...actual.entries()] })
        .toEqual({ test: test.id, seats: [...expected.entries()] });
    }
  });

  it('handles a degenerate deck without dividing by zero', () => {
    expect([...apportion(new Map(), 24).values()]).toEqual([]);
    expect([...apportion(new Map<Chapter, number>([[1, 0]]), 24).values()]).toEqual([0]);
    expect([...apportion(new Map<Chapter, number>([[1, 10]]), 0).values()]).toEqual([0]);
  });
});

// ---- attempt derivation ------------------------------------------------

let seq = 0;
function ev(factId: string, formIndex: number, grade: Grade, at: number, mode: ReviewMode = 'mock'): ReviewEvent {
  return { id: `e${++seq}`, factId, formIndex, grade, mode, at };
}

/** Answer the first `n` questions of a test, `right` of them correctly. */
function sit(testId: number, right: number, from: number, n = MOCK_LENGTH): ReviewEvent[] {
  const test = FIXED_TESTS.find((t) => t.id === testId)!;
  return test.questions.slice(0, n).map((q, i) => ev(q.factId, q.formIndex, i < right ? 4 : 0, from + i));
}

describe('attempts derived from the log', () => {
  it('finds nothing in an empty log', () => {
    expect(mockAttempts([], FIXED_TESTS)).toEqual([]);
  });

  it('scores one complete sitting', () => {
    const attempts = mockAttempts(sit(3, 18, 1_000), FIXED_TESTS);
    expect(attempts.length).toBe(1);
    expect(attempts[0]).toMatchObject({ testId: 3, answered: 24, correct: 18, complete: true });
  });

  /**
   * The one thing a self-administered mock must not permit is erasing a bad start by walking
   * away. Broken deliberately by dropping incomplete attempts, which failed this.
   */
  it('keeps an abandoned sitting, marked incomplete', () => {
    const attempts = mockAttempts(sit(4, 2, 1_000, 9), FIXED_TESTS);
    expect(attempts.length).toBe(1);
    expect(attempts[0]).toMatchObject({ testId: 4, answered: 9, correct: 2, complete: false });
    expect(trend(sit(4, 2, 1_000, 9), FIXED_TESTS)).toEqual([]);
  });

  it('separates a re-sitting of the same test', () => {
    const log = [...sit(5, 12, 1_000), ...sit(5, 20, 9_000)];
    const attempts = mockAttempts(log, FIXED_TESTS);
    expect(attempts.map((a) => ({ id: a.testId, correct: a.correct, complete: a.complete })))
      .toEqual([
        { id: 5, correct: 12, complete: true },
        { id: 5, correct: 20, complete: true },
      ]);
  });

  /** A restart after abandoning — the boundary is a repeated form, not a clock gap. */
  it('separates a restart of an abandoned sitting', () => {
    const log = [...sit(6, 1, 1_000, 5), ...sit(6, 24, 2_000)];
    const attempts = mockAttempts(log, FIXED_TESTS);
    expect(attempts.map((a) => [a.answered, a.correct, a.complete])).toEqual([
      [5, 1, false],
      [24, 24, true],
    ]);
  });

  it('keeps two tests apart when their answers interleave', () => {
    const a = sit(7, 24, 1_000);
    const b = sit(8, 0, 1_000);
    const interleaved = a.flatMap((x, i) => [x, b[i]]);
    const attempts = mockAttempts(interleaved, FIXED_TESTS);
    expect(attempts.map((x) => ({ id: x.testId, correct: x.correct }))).toEqual(
      expect.arrayContaining([{ id: 7, correct: 24 }, { id: 8, correct: 0 }]),
    );
    expect(attempts.length).toBe(2);
  });

  /**
   * Sync delivers events in whatever order two devices merged them, so the derivation must
   * sort by client time rather than trust array order.
   *
   * **The first version of this test was vacuous and passed with the sort removed.** It
   * compared `[testId, answered, correct, complete]`, every one of which is order-insensitive
   * — reversing 24 distinct forms still yields one 24-long attempt with the same score. What
   * actually moves is where the attempt boundaries fall and which sitting is which, so this
   * compares the **whole** attempt including `startedAt`, `finishedAt` and question order, on
   * a log containing two sittings of one test. Re-broken by removing the sort, which now
   * fails.
   */
  it('is identical however the log arrives', () => {
    const log = [...sit(9, 15, 1_000), ...sit(9, 3, 5_000), ...sit(10, 7, 9_000)];
    const expected = mockAttempts(log, FIXED_TESTS);

    // Two orderings that array-order-dependent code cannot survive: fully reversed, and a
    // deterministic interleave that puts the later sitting's answers before the earlier's.
    const reversed = [...log].reverse();
    const rotated = [...log.slice(30), ...log.slice(0, 30)];

    expect(mockAttempts(reversed, FIXED_TESTS)).toEqual(expected);
    expect(mockAttempts(rotated, FIXED_TESTS)).toEqual(expected);

    // And the expectation itself is not trivially satisfiable: the two sittings differ.
    expect(expected.map((a) => [a.testId, a.correct, a.startedAt])).toEqual([
      [9, 15, 1_000],
      [9, 3, 5_000],
      [10, 7, 9_000],
    ]);
  });

  it('ignores scheduled and practice reviews of the same forms', () => {
    const test = FIXED_TESTS[0];
    const noise = test.questions.map((q, i) =>
      ev(q.factId, q.formIndex, 4, 500 + i, i % 2 ? 'scheduled' : 'practice'),
    );
    expect(mockAttempts(noise, FIXED_TESTS)).toEqual([]);
  });

  it('ignores mock events for forms in no fixed test', () => {
    const inAnyTest = new Set(allQuestions.map((q) => key(q.factId, q.formIndex)));
    const outsider = ACTIVE.flatMap((f) => f.forms.map((_x, i) => ({ factId: f.id, formIndex: i })))
      .find((q) => !inAnyTest.has(key(q.factId, q.formIndex)))!;
    expect(outsider).toBeDefined();
    expect(mockAttempts([ev(outsider.factId, outsider.formIndex, 4, 1_000)], FIXED_TESTS)).toEqual([]);
  });

  it('counts Hard as correct so a recall-mode sitting scores sensibly', () => {
    const test = FIXED_TESTS.find((t) => t.id === 11)!;
    const log = test.questions.map((q, i) => ev(q.factId, q.formIndex, (i < 6 ? 3 : 0) as Grade, 1_000 + i));
    expect(mockAttempts(log, FIXED_TESTS)[0].correct).toBe(6);
  });
});

describe('history and trend', () => {
  it('reports best and latest per test, and best ignores incomplete attempts', () => {
    const log = [...sit(12, 20, 1_000), ...sit(12, 5, 9_000), ...sit(12, 24, 20_000, 3)];
    const history = historyByTest(log, FIXED_TESTS).get(12)!;

    expect(history.attempts.length).toBe(3);
    expect(history.best?.correct).toBe(20);
    expect(history.latest?.complete).toBe(false);
    expect(history.latest?.answered).toBe(3);
  });

  it('covers every test, including ones never sat', () => {
    const history = historyByTest(sit(1, 24, 1_000), FIXED_TESTS);
    expect(history.size).toBe(20);
    expect(history.get(20)).toMatchObject({ attempts: [], best: null, latest: null });
  });

  it('orders the trend oldest first and includes complete attempts only', () => {
    const log = [...sit(13, 10, 1_000), ...sit(14, 4, 2_000, 8), ...sit(15, 22, 3_000)];
    expect(trend(log, FIXED_TESTS).map((a) => [a.testId, a.correct])).toEqual([[13, 10], [15, 22]]);
  });

  /**
   * R-7. The pass mark exists to draw a line on a chart, and nothing in this module turns a
   * score into a probability while L-002 and L-003 are `fixed-unverified`.
   */
  it('exposes a mark out of 24 and never a probability', () => {
    expect(PASS_MARK).toBe(18);
    const attempt = mockAttempts(sit(16, 18, 1_000), FIXED_TESTS)[0];
    expect(Object.keys(attempt).sort()).toEqual(
      ['answered', 'complete', 'correct', 'finishedAt', 'questions', 'startedAt', 'testId'],
    );
  });
});

describe('formToTest', () => {
  it('maps all 480 forms', () => {
    expect(formToTest(FIXED_TESTS).size).toBe(480);
  });

  /** Refuses rather than mis-labelling history. Overlap means past scores are wrong. */
  it('throws if two tests share a form', () => {
    const clash = [FIXED_TESTS[0], { ...FIXED_TESTS[1], questions: FIXED_TESTS[0].questions }];
    expect(() => formToTest(clash)).toThrow(/disjoint/);
  });
});
