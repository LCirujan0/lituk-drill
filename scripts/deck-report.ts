/**
 * Print everything measurable about the deck.
 *
 * The same functions the build gate asserts on, run for a human instead. R1 existed for
 * as long as it did because nobody had looked; `npm run deck:report` is how looking stays
 * cheap. Read-only.
 */

import { ACTIVE, DECK, TOTAL_FACTS, TOTAL_FORMS } from '@/domain/deck';
import { analyseDeck } from '@/domain/deck/analysis';
import { DECK_BASELINE, DECK_TARGETS } from '@/domain/deck/baseline';
import { CHAPTER_NAMES, type Chapter } from '@/domain/deck/types';
import { EXPLANATIONS } from '@/data/explanations';

const a = analyseDeck(ACTIVE);
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
const row = (label: string, value: string, note = '') =>
  console.log(`  ${label.padEnd(34)}${value.padStart(12)}  ${note}`);

console.log(`\nDECK — ${TOTAL_FACTS} facts, ${TOTAL_FORMS} question forms\n`);

console.log('Chapters');
const byChapter = new Map<number, number>();
for (const fact of DECK) byChapter.set(fact.chapter, (byChapter.get(fact.chapter) ?? 0) + 1);
for (const [chapter, count] of [...byChapter].sort((x, y) => y[1] - x[1])) {
  row(CHAPTER_NAMES[chapter as Chapter], String(count));
}

console.log('\nExplanations — context shown after each answer');
for (const chapter of [1, 2, 3, 4, 5] as Chapter[]) {
  const facts = DECK.filter((f) => f.chapter === chapter);
  const done = facts.filter((f) => EXPLANATIONS[f.id]).length;
  row(CHAPTER_NAMES[chapter], `${done}/${facts.length}`, done === facts.length ? 'complete' : '');
}
{
  const done = DECK.filter((f) => EXPLANATIONS[f.id]).length;
  row('TOTAL', `${done}/${DECK.length}`, `${((done / DECK.length) * 100).toFixed(0)}%`);
}

console.log('\nStructure');
row('structural faults', String(a.structuralFaults.length), a.structuralFaults.length ? 'MUST BE ZERO' : 'ok');
row('facts with no recall form', String(a.factsWithNoRecallForm.length), 'must be 0');
row(
  'facts with <2 recall forms',
  `${a.factsBelowRecallBreadth.length}/${DECK_BASELINE.factsBelowRecallBreadth}`,
  a.factsBelowRecallBreadth.join(' ') || '',
);
row(
  'duplicate canonical questions',
  `${a.duplicateCanonicalQuestions.length}/${DECK_BASELINE.duplicateCanonicalQuestions}`,
  a.duplicateCanonicalQuestions.map((g) => g.join('=')).join(' '),
);
row(
  'ambiguous shared stems',
  `${a.ambiguousSharedStems.length}/${DECK_BASELINE.ambiguousSharedStems}`,
  a.ambiguousSharedStems.map((s) => s.factIds.join('=')).join(' '),
);
row(
  'identical forms across facts',
  `${a.sharedFormsAcrossFacts.length}/${DECK_BASELINE.sharedFormsAcrossFacts}`,
  a.sharedFormsAcrossFacts.map((s) => s.factIds.join('=')).join(' '),
);
row(
  'unresolved verify flags',
  `${a.unresolvedVerifyFlags.length}/${DECK_BASELINE.unresolvedVerifyFlags}`,
  'R3 — must reach 0 before the launch gate',
);

console.log('\nOption content — what a distractor SAYS (L-033)');
row(
  'self-contradicting forms',
  `${a.selfContradictingForms.length}/${DECK_BASELINE.selfContradictingForms}`,
  'a distractor another form of the same fact marks CORRECT · target 0',
);
row(
  "distractor is the fact's own answer",
  `${a.distractorsContradictingCanonical.length}/${DECK_BASELINE.distractorsContradictingCanonical}`,
  'target 0',
);
row(
  'identical option sets in one fact',
  `${a.identicalOptionSetsWithinFact.length}/${DECK_BASELINE.identicalOptionSetsWithinFact}`,
  'two forms, same four options — only the stem moved',
);
row(
  'repeated distractors in one fact',
  `${a.repeatedDistractorsWithinFact.length}/${DECK_BASELINE.repeatedDistractorsWithinFact}`,
  `target ${DECK_TARGETS.repeatedDistractorsWithinFact ?? 0} · smallest of the four defects`,
);

console.log('\nAnswer leakage — the measurements that produced R1');
row(
  'ON SCREEN: answer is a middle value',
  pct(a.effectiveNumericMiddleRank.rate),
  `chance 50% · ceiling ${pct(DECK_BASELINE.effectiveNumericMiddleRankRate)} · target ${pct(DECK_TARGETS.effectiveNumericMiddleRankRate ?? 0.5)}`,
);
row(
  '  of which generated / as written',
  `${a.effectiveNumericMiddleRank.generatedForms} / ${a.effectiveNumericMiddleRank.writtenForms}`,
  'the residual is entirely the as-written forms',
);
row(
  '  forms not reaching every rank',
  `${a.restrictedRankForms.length}/${DECK_BASELINE.restrictedRankForms}`,
  a.restrictedRankForms.join(' '),
);
row(
  'stored: numeric answer is a middle value',
  pct(a.numericMiddleRank.rate),
  `${a.numericMiddleRank.middle}/${a.numericMiddleRank.total} · left as authored on purpose (D-014)`,
);
row(
  'correct answer is longest option',
  pct(a.longestOptionCorrect.rate),
  `${a.longestOptionCorrect.longest}/${a.longestOptionCorrect.total} · chance 25% · target ${pct(DECK_TARGETS.longestOptionCorrectRate ?? 0.25)}`,
);

const failing = [
  a.structuralFaults.length > 0 && 'structural faults',
  a.factsWithNoRecallForm.length > 0 && 'facts with no recall form',
  a.effectiveNumericMiddleRank.rate > DECK_BASELINE.effectiveNumericMiddleRankRate && 'on-screen numeric tell worsened',
  a.restrictedRankForms.length > DECK_BASELINE.restrictedRankForms && 'more forms cannot reach every rank',
  a.longestOptionCorrect.rate > DECK_BASELINE.longestOptionCorrectRate && 'length tell worsened',
].filter(Boolean);

console.log(
  failing.length
    ? `\nAGAINST BASELINE: WORSE — ${failing.join(', ')}\n`
    : '\nAgainst baseline: no regression.\n',
);
