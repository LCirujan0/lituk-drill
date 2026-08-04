/**
 * One-shot migration: v0's `facts.js` positional arrays -> typed TypeScript modules.
 *
 *   v0:  [tag, chapter, verifyFlag, canonicalQ, canonicalA, forms]
 *        form = [question, [o0,o1,o2,o3], correctIndex, mcqOnly]
 *
 * Run:  npm run deck:migrate
 *
 * This script is deliberately dumb. It does not clean, dedupe, reword or fix anything —
 * every known content defect (the 193/352 duplicate, the 205/206 ambiguity, the six
 * single-recall-form facts, the numeric-rank tell) is carried across untouched and is
 * recorded in the deck baseline instead. Two reasons: a migration that also fixes things
 * cannot be verified by round-trip, and removing a fact would shift every subsequent
 * index and silently mis-assign v0's saved schedule on import (S6).
 *
 * Correctness is not established by reading the output. `deck.test.ts` reconstructs v0's
 * exact positional form from the emitted modules and asserts it byte-for-byte against the
 * original file. That test is the actual deliverable here; this script is scaffolding.
 *
 * It reads ../../facts.js and never writes to it. v0 is untouchable (D-001, D-020).
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const V0_FACTS = join(HERE, '..', '..', 'facts.js');
const OUT_DIR = join(HERE, '..', 'src', 'data');

type V0Form = [string, string[], number, number];
type V0Fact = [string, number, number, string, string, V0Form[]];

function readV0(): V0Fact[] {
  const src = readFileSync(V0_FACTS, 'utf8');
  // facts.js is `const FACTS=[...]` with no exports. Rebind and evaluate.
  const rebound = src.replace(/^const FACTS\s*=/m, 'globalThis.__DECK__=');
  const evaluate = new Function(`${rebound}; return globalThis.__DECK__;`);
  const deck = evaluate() as V0Fact[];
  if (!Array.isArray(deck) || deck.length === 0) throw new Error('facts.js parsed to nothing');
  return deck;
}

const s = (v: string) => JSON.stringify(v);
const id = (i: number) => `f${String(i).padStart(3, '0')}`;

function emitForm(form: V0Form): string {
  const [question, options, correctIndex, mcqOnly] = form;

  if (!Array.isArray(options) || options.length !== 4) {
    throw new Error(`form has ${options?.length} options, expected 4: ${question}`);
  }
  if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex > 3) {
    throw new Error(`correctIndex ${correctIndex} out of range: ${question}`);
  }

  const correct = options[correctIndex];
  const distractors = options.filter((_, i) => i !== correctIndex);

  // Storage order must be recoverable, so record where the correct option sat.
  // Round-trip needs it; nothing at runtime should ever read it, because the
  // display order is decided at presentation time.
  return [
    '    {',
    `      question: ${s(question)},`,
    `      mcqOnly: ${mcqOnly ? 'true' : 'false'},`,
    '      answers: {',
    "        kind: 'fixed',",
    `        correct: ${s(correct)},`,
    `        distractors: [${distractors.map(s).join(', ')}],`,
    '      },',
    `      v0CorrectIndex: ${correctIndex},`,
    '    },',
  ].join('\n');
}

function emitFact(fact: V0Fact, index: number): string {
  const [tag, chapter, verifyFlag, question, answer, forms] = fact;
  if (chapter < 1 || chapter > 5) throw new Error(`chapter ${chapter} out of range at ${index}`);

  return [
    '  {',
    `    id: ${s(id(index))},`,
    `    tag: ${s(tag)},`,
    `    chapter: ${chapter},`,
    `    verify: ${verifyFlag ? 'true' : 'false'},`,
    `    question: ${s(question)},`,
    `    answer: ${s(answer)},`,
    '    forms: [',
    forms.map(emitForm).join('\n'),
    '    ],',
    '  },',
  ].join('\n');
}

function main() {
  // ONE-SHOT. Once the deck has been corrected away from v0, re-running this would silently
  // overwrite every correction with the original — including known-wrong answers — and the
  // round-trip test would then pass, because the deck really would match v0 again. The
  // failure would look exactly like success.
  const declared = readFileSync(join(HERE, '..', 'src', 'domain', 'deck', 'divergences.ts'), 'utf8');
  const count = (declared.match(/factId:/g) ?? []).length;
  if (count > 0 && !process.argv.includes('--i-know-this-discards-corrections')) {
    console.error(
      `refusing to run: ${count} deliberate divergences from v0 are declared in divergences.ts.\n` +
        'Re-running this migration would discard every one of them, including corrected facts.\n' +
        'If you genuinely mean to regenerate from v0, pass --i-know-this-discards-corrections.',
    );
    process.exit(1);
  }

  const v0 = readV0();
  console.log(`read ${v0.length} facts, ${v0.reduce((n, f) => n + f[5].length, 0)} forms`);

  mkdirSync(OUT_DIR, { recursive: true });

  const byChapter = new Map<number, string[]>();
  v0.forEach((fact, i) => {
    const chapter = fact[1];
    if (!byChapter.has(chapter)) byChapter.set(chapter, []);
    byChapter.get(chapter)!.push(emitFact(fact, i));
  });

  for (const [chapter, entries] of [...byChapter].sort((a, b) => a[0] - b[0])) {
    const file = join(OUT_DIR, `chapter-${chapter}.ts`);
    const body = [
      '// GENERATED by scripts/migrate-v0-deck.ts from v0 facts.js. Do not reformat by hand;',
      '// edit the content freely, but keep `id` values and form order untouched — v0 keys its',
      '// saved schedule by these positions (S6). deck.test.ts enforces it.',
      '',
      "import type { MigratedFact } from '@/domain/deck/migrated';",
      '',
      `export const CHAPTER_${chapter}: readonly MigratedFact[] = [`,
      entries.join('\n'),
      '];',
      '',
    ].join('\n');
    writeFileSync(file, body, 'utf8');
    console.log(`  chapter ${chapter}: ${entries.length} facts -> ${file}`);
  }

  console.log('done. run `npm test` to verify the round-trip.');
}

main();
