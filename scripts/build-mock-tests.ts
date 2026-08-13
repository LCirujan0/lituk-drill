/**
 * Generate `src/data/mock-tests.ts` — the twenty fixed mock tests (C7, D-036).
 *
 * **Run once. Re-running it is a decision, not a refresh.**
 *
 * The twenty tests are pinned data for two reasons that compound. The first is D-036's own
 * case for them: comparability, the same 24 questions in August and September measuring you
 * rather than the draw. The second is that mock history is derived from the log by matching
 * served forms against these tests (`domain/mock/attempts.ts`), so a different draw would
 * silently re-label every attempt already sat.
 *
 * So a regeneration is a migration of the score history, and it needs a DECISIONS entry
 * saying what happens to the attempts already recorded. The byte-identity test in
 * `tests/mock.test.ts` is what makes that a decision rather than an accident.
 *
 *     npx tsx scripts/build-mock-tests.ts
 */

import { writeFileSync } from 'node:fs';

import { ACTIVE } from '../src/domain/deck';
import { CHAPTER_SHORT } from '../src/domain/deck/types';
import { buildFixedTests, FIXED_TEST_COUNT, MOCK_LENGTH } from '../src/domain/mock/build';
import { mulberry32 } from '../src/domain/scheduler/rng';

/**
 * Fixed seed, written down rather than derived from a clock. The draw has to be
 * reproducible from this file alone, or "regenerate and diff" is not a check anyone can run.
 */
const SEED = 20_260_813;

const { tests, perChapter } = buildFixedTests(ACTIVE, mulberry32(SEED), FIXED_TEST_COUNT, MOCK_LENGTH);

const seats = [...perChapter.entries()]
  .sort(([a], [b]) => a - b)
  .map(([chapter, n]) => `${CHAPTER_SHORT[chapter]} ${n}`)
  .join(' · ');

const body = tests
  .map((test) => {
    const rows = test.questions
      .map((q) => `    { factId: '${q.factId}', formIndex: ${q.formIndex} },`)
      .join('\n');
    return `  {\n    id: ${test.id},\n    questions: [\n${rows}\n    ],\n  },`;
  })
  .join('\n');

const file = `/**
 * GENERATED — DO NOT REGENERATE without a DECISIONS entry.
 *
 * The twenty fixed mock tests (C7, D-036), built by \`scripts/build-mock-tests.ts\` from the
 * active deck with seed ${SEED}.
 *
 * **Editing or regenerating this file rewrites history.** Mock attempts are identified in the
 * review-event log by the forms they served (\`domain/mock/attempts.ts\`), which works only
 * because these twenty are disjoint. A different draw re-labels every attempt already sat, so
 * changing this file is a migration of the score history and needs to say what becomes of it.
 * \`tests/mock.test.ts\` asserts this file byte for byte against a rebuild, which is what makes
 * that a decision rather than a surprise.
 *
 * Composition: ${MOCK_LENGTH} questions per test, chapter-proportional by largest remainder —
 * ${seats}. ${FIXED_TEST_COUNT} × ${MOCK_LENGTH} = ${FIXED_TEST_COUNT * MOCK_LENGTH} forms, all distinct, at most one form per fact
 * per test.
 */

import type { FixedTest } from '@/domain/mock/build';

export const FIXED_TESTS: readonly FixedTest[] = [
${body}
];
`;

writeFileSync(new URL('../src/data/mock-tests.ts', import.meta.url), file, 'utf8');

console.log(`wrote ${tests.length} tests × ${MOCK_LENGTH} questions`);
console.log(`seats per test: ${seats}`);
console.log(`distinct forms: ${new Set(tests.flatMap((t) => t.questions.map((q) => `${q.factId}:${q.formIndex}`))).size}`);
