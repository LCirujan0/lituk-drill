/**
 * Mock attempts, derived from the review-event log (C7, D-036).
 *
 * ## Why nothing new is stored
 *
 * D-036 asks for every attempt recorded: which test, when, score, and which forms were
 * served. The obvious implementation adds a `testId` to `ReviewEvent` and a column to the
 * table — a schema change, a migration, and a second thing sync has to agree about.
 *
 * None of that is needed, because **the twenty fixed tests are disjoint** (`build.ts`). No
 * form appears in two of them, so *any* form served identifies the test uniquely. The test
 * id is therefore recoverable from the log as it already exists, which means mock history
 * syncs across devices for free, on the merge algebra already proven in D-030, with no
 * migration frontier to advance and nothing for the two devices to disagree about.
 *
 * The cost of that choice, stated plainly: **the pinned tests become load-bearing for
 * history, not just for comparability.** Regenerating `mock-tests.ts` with a different draw
 * would silently re-label every past attempt. That is a second reason the file says
 * GENERATED — DO NOT REGENERATE at the top, and it is asserted by the byte-identity test.
 *
 * ## Where one attempt ends and the next begins
 *
 * Grouping is per test, in log order, and a new attempt starts when the current one is full
 * (24 answers) or when a form it already contains comes round again. Both are exactly what a
 * re-sitting looks like, and neither depends on a clock gap — which matters because the
 * clock is the client's and two devices' clocks disagree (D-002).
 *
 * An abandoned sitting stays in the history as an **incomplete** attempt rather than being
 * discarded or silently completed. Discarding it would let a bad start be erased by walking
 * away, which is the one thing a self-administered mock must not permit.
 */

import type { ReviewEvent } from '../scheduler/events';
import { MOCK_LENGTH, type FixedTest, type MockQuestion } from './build';

export interface MockAttempt {
  readonly testId: number;
  /** Client clock of the first answer, epoch ms. */
  readonly startedAt: number;
  readonly finishedAt: number;
  /** How many of the 24 were answered. */
  readonly answered: number;
  readonly correct: number;
  /** True only at the full length. A trend is drawn from complete attempts alone. */
  readonly complete: boolean;
  /** Exactly what was served, in the order it was served. */
  readonly questions: readonly MockQuestion[];
}

const key = (factId: string, formIndex: number): string => `${factId}:${formIndex}`;

/** form → test id. Built once; disjointness is what makes it a function at all. */
export function formToTest(tests: readonly FixedTest[]): Map<string, number> {
  const index = new Map<string, number>();
  for (const test of tests) {
    for (const q of test.questions) {
      const k = key(q.factId, q.formIndex);
      const existing = index.get(k);
      if (existing !== undefined && existing !== test.id) {
        // Not defensive noise: if this ever fires, every historical attempt has been
        // mis-labelled and the score history is wrong rather than merely incomplete.
        throw new Error(`form ${k} is in tests ${existing} and ${test.id}; tests must be disjoint`);
      }
      index.set(k, test.id);
    }
  }
  return index;
}

/**
 * A grade of 3 or better is a correct answer.
 *
 * Mocks are sat in the exam's format, where `Drill` commits 4 for a right option and 0 for a
 * wrong one, so in practice this reads 4-or-0. It is written as a threshold rather than
 * `=== 4` so that a mock sat in recall mode — which grades 0/3/4/5 — scores sensibly instead
 * of marking every "Hard" wrong.
 */
const isCorrect = (grade: number): boolean => grade >= 3;

export function mockAttempts(
  events: readonly ReviewEvent[],
  tests: readonly FixedTest[],
): MockAttempt[] {
  const index = formToTest(tests);

  // Sorted the same way `replay` sorts, so an attempt's question order is the order the
  // scheduler saw and two devices agree after a merge.
  const mock = events
    .filter((e) => e.mode === 'mock')
    .filter((e) => index.has(key(e.factId, e.formIndex)))
    .sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));

  interface Open {
    testId: number;
    startedAt: number;
    finishedAt: number;
    correct: number;
    questions: MockQuestion[];
    seen: Set<string>;
  }

  const open = new Map<number, Open>();
  const done: MockAttempt[] = [];

  const close = (a: Open) => {
    done.push({
      testId: a.testId,
      startedAt: a.startedAt,
      finishedAt: a.finishedAt,
      answered: a.questions.length,
      correct: a.correct,
      complete: a.questions.length === MOCK_LENGTH,
      questions: a.questions,
    });
  };

  for (const event of mock) {
    const testId = index.get(key(event.factId, event.formIndex))!;
    const k = key(event.factId, event.formIndex);
    let current = open.get(testId);

    // A repeat of a form already in this sitting means the sitting restarted.
    if (current && current.seen.has(k)) {
      close(current);
      current = undefined;
    }
    if (!current) {
      current = {
        testId,
        startedAt: event.at,
        finishedAt: event.at,
        correct: 0,
        questions: [],
        seen: new Set(),
      };
      open.set(testId, current);
    }

    current.questions.push({ factId: event.factId, formIndex: event.formIndex });
    current.seen.add(k);
    current.finishedAt = event.at;
    if (isCorrect(event.grade)) current.correct++;

    if (current.questions.length === MOCK_LENGTH) {
      close(current);
      open.delete(testId);
    }
  }

  for (const a of open.values()) close(a);

  return done.sort((a, b) => a.startedAt - b.startedAt || a.testId - b.testId);
}

export interface TestHistory {
  readonly testId: number;
  readonly attempts: readonly MockAttempt[];
  /** The most recent complete attempt, if there is one. */
  readonly best: MockAttempt | null;
  readonly latest: MockAttempt | null;
}

export function historyByTest(
  events: readonly ReviewEvent[],
  tests: readonly FixedTest[],
): Map<number, TestHistory> {
  const all = mockAttempts(events, tests);
  const out = new Map<number, TestHistory>();

  for (const test of tests) {
    const attempts = all.filter((a) => a.testId === test.id);
    const complete = attempts.filter((a) => a.complete);
    out.set(test.id, {
      testId: test.id,
      attempts,
      best: complete.reduce<MockAttempt | null>(
        (b, a) => (b === null || a.correct > b.correct ? a : b),
        null,
      ),
      latest: attempts.length ? attempts[attempts.length - 1] : null,
    });
  }
  return out;
}

/**
 * The trend, oldest first: **complete attempts only**, as a score out of 24.
 *
 * **R-7 lives here.** This is multiple-choice data, and while L-002 and L-003 are
 * `fixed-unverified` a mock score may be shown as a score and never as readiness or as a
 * probability of passing (D-036, and the owner confirmed the reading). Nothing in this module
 * returns a probability, and nothing that consumes it may present one — the pass mark is
 * carried as a *mark*, for drawing a line on a chart, not as a verdict.
 */
export const PASS_MARK = 18;

export function trend(events: readonly ReviewEvent[], tests: readonly FixedTest[]): MockAttempt[] {
  return mockAttempts(events, tests).filter((a) => a.complete);
}
