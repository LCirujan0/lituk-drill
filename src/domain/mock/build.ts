/**
 * Building the twenty fixed mock tests (C7, D-036).
 *
 * **This runs once, and its output is committed as data.** `scripts/build-mock-tests.ts`
 * writes `src/data/mock-tests.ts` and nothing at runtime ever calls this. That is not
 * squeamishness about cost — it is the only way the tests can be what they are for.
 *
 * D-036's whole case for twenty *fixed* tests is comparability: the same 24 questions in
 * August and in September measures you rather than the draw. A test that derives its own
 * questions at runtime is not the same test twice, because the deck moves underneath it —
 * C6 is about to add up to 170 facts, and chapter-proportional shares are computed from
 * chapter sizes. Pinning is therefore not an optimisation; a recomputed test silently stops
 * being a measurement and nothing on screen would say so.
 *
 * ## What the twenty are
 *
 * - **24 questions each**, the exam's own length, and 20 × 24 = **480 forms committed for
 *   ever** (D-036 accepts this explicitly).
 * - **Chapter-proportional**, by largest remainder over the active deck. The owner chose this
 *   over a uniform draw so a sitting resembles the exam's spread and the twenty resemble each
 *   other.
 * - **Disjoint.** No form appears in two tests, which is what lets an attempt be identified
 *   from the log by the forms it served — no test id has to be stored anywhere (`attempts.ts`).
 * - **One fact at most once per test.** The real exam does not ask the same fact twice, and a
 *   test that did would score a fact's knowledge twice out of 24.
 * - **`mcqOnly` forms are eligible and welcome.** They are unusable as free recall and
 *   perfectly usable here: a mock is the exam's format, which is multiple choice.
 */

import type { Chapter, Deck } from '../deck/types';
import type { Rng } from '../scheduler/rng';

/** One question in a fixed test: a fact and which of its phrasings. */
export interface MockQuestion {
  readonly factId: string;
  readonly formIndex: number;
}

export interface FixedTest {
  /** 1-based and stable for ever. It is how an attempt is reported and trended. */
  readonly id: number;
  readonly questions: readonly MockQuestion[];
}

/** The exam's length, and therefore a mock's. */
export const MOCK_LENGTH = 24;

/** D-036. Twenty numbered tests, retakeable by design. */
export const FIXED_TEST_COUNT = 20;

export const CHAPTERS: readonly Chapter[] = [1, 2, 3, 4, 5];

/**
 * Apportion `total` seats across chapters in proportion to their size, by **largest
 * remainder**.
 *
 * Largest remainder rather than rounding each share independently, because independent
 * rounding does not sum to 24 — on the live deck it gives 23. Getting that wrong would make
 * a "24-question" test 23 questions long, which is the kind of defect that looks like a
 * rounding detail and is actually a different exam.
 *
 * Ties on the remainder are broken by the larger chapter, then by chapter number, so the
 * apportionment is a pure function of the sizes and never of iteration order.
 */
export function apportion(
  sizes: ReadonlyMap<Chapter, number>,
  total: number,
): Map<Chapter, number> {
  const population = [...sizes.values()].reduce((a, b) => a + b, 0);
  const out = new Map<Chapter, number>();
  if (population === 0 || total <= 0) {
    for (const chapter of sizes.keys()) out.set(chapter, 0);
    return out;
  }

  const exact = [...sizes.entries()].map(([chapter, size]) => {
    const share = (size * total) / population;
    return { chapter, size, floor: Math.floor(share), remainder: share - Math.floor(share) };
  });

  for (const e of exact) out.set(e.chapter, e.floor);
  let assigned = exact.reduce((n, e) => n + e.floor, 0);

  const byRemainder = [...exact].sort(
    (a, b) => b.remainder - a.remainder || b.size - a.size || a.chapter - b.chapter,
  );
  for (let i = 0; assigned < total; i++, assigned++) {
    const e = byRemainder[i % byRemainder.length];
    out.set(e.chapter, (out.get(e.chapter) ?? 0) + 1);
  }

  return out;
}

/** Every (fact, form) pair a mock may draw, grouped by chapter. */
function poolsByChapter(deck: Deck): Map<Chapter, MockQuestion[]> {
  const pools = new Map<Chapter, MockQuestion[]>();
  for (const chapter of CHAPTERS) pools.set(chapter, []);

  for (const fact of deck) {
    if (fact.retired) continue;
    const pool = pools.get(fact.chapter);
    if (!pool) continue;
    fact.forms.forEach((_form, formIndex) => pool.push({ factId: fact.id, formIndex }));
  }
  return pools;
}

export interface BuildResult {
  readonly tests: readonly FixedTest[];
  /** Seats per chapter in every test. Reported so the apportionment is visible, not implied. */
  readonly perChapter: ReadonlyMap<Chapter, number>;
}

/**
 * Build all twenty, deterministically from `rng`.
 *
 * Throws rather than returning a short test. A silently 23-question mock, or two tests
 * sharing a form, would break the properties every downstream assertion depends on — and
 * the failure would surface months later as a score that cannot be compared. Better to
 * refuse to generate.
 */
export function buildFixedTests(
  deck: Deck,
  rng: Rng,
  count = FIXED_TEST_COUNT,
  length = MOCK_LENGTH,
): BuildResult {
  const sizes = new Map<Chapter, number>();
  for (const chapter of CHAPTERS) {
    sizes.set(chapter, deck.filter((f) => !f.retired && f.chapter === chapter).length);
  }
  const perChapter = apportion(sizes, length);

  // Shuffled once per chapter, then drained. Taking a form REMOVES it from the queue, so
  // disjointness across all twenty tests is structural rather than something to check for
  // and retry. A form skipped over (because its fact is already in this test) stays in the
  // queue and is available to every later test — skipping must not consume.
  const pools = poolsByChapter(deck);
  const queues = new Map<Chapter, MockQuestion[]>();
  for (const chapter of CHAPTERS) queues.set(chapter, shuffleInPlace([...pools.get(chapter)!], rng));

  const tests: FixedTest[] = [];

  for (let id = 1; id <= count; id++) {
    const questions: MockQuestion[] = [];
    const factsUsed = new Set<string>();

    for (const chapter of CHAPTERS) {
      const seats = perChapter.get(chapter) ?? 0;
      const queue = queues.get(chapter)!;

      for (let taken = 0; taken < seats; taken++) {
        const at = queue.findIndex((q) => !factsUsed.has(q.factId));
        if (at < 0) {
          throw new Error(
            `chapter ${chapter} ran out of forms building test ${id}: ` +
              `needed ${seats} seats, ${queue.length} forms left, none on an unused fact`,
          );
        }
        const [question] = queue.splice(at, 1);
        questions.push(question);
        factsUsed.add(question.factId);
      }
    }

    if (questions.length !== length) {
      throw new Error(`test ${id} came out ${questions.length} long, expected ${length}`);
    }
    tests.push({ id, questions });
  }

  return { tests, perChapter };
}

/** Fisher–Yates, in place. Declared here so the deck layer keeps no scheduler dependency. */
function shuffleInPlace<T>(items: T[], rng: Rng): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
