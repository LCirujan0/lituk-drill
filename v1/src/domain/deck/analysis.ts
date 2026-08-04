/**
 * Measurements over the deck. Pure functions, no I/O, no test framework.
 *
 * These exist as their own module rather than inside a test because R1 was found by
 * measuring, not by reading, and the same measurement needs to be runnable on demand —
 * against a candidate deck, in a report, from a script — not only as a pass/fail.
 *
 * Every finder returns the offending ids, not a count. A build that says "3 duplicates"
 * and won't say which is a build you learn to ignore.
 *
 * On what shuffling does and does not fix: v1 randomises option order at presentation,
 * so *positional* bias in stored data is neutralised for free. Bias in the option set
 * itself — one option far longer than the rest, or the true value always bracketed by
 * its distractors — survives any amount of shuffling, because it is a property of the
 * four options rather than of their order. That is why the numeric measurement is the
 * dangerous one and the position measurement is mostly a historical check.
 */

import type { MigratedFact } from './migrated';
import type { Deck, Fact } from './types';
import { fixedOptions, recallForms } from './types';

export const normalise = (s: string): string =>
  s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.?!"'’“”]/g, '');

/** Groups of fact ids that share an identical canonical question. */
export function duplicateCanonicalQuestions(deck: Deck): string[][] {
  const seen = new Map<string, string[]>();
  for (const fact of deck) {
    const key = normalise(fact.question);
    seen.set(key, [...(seen.get(key) ?? []), fact.id]);
  }
  return [...seen.values()].filter((ids) => ids.length > 1);
}

/**
 * A question stem used by more than one fact, where the correct answers differ AND at
 * least one of them is served as free recall. In multiple choice a shared stem is fine —
 * the options disambiguate. As a recall prompt it is unanswerable, and the reader marks
 * a correct answer wrong. f205/f206 ("…one of the fundamental principles of British
 * life") is the live instance.
 */
export function ambiguousSharedStems(deck: Deck): { stem: string; factIds: string[] }[] {
  const byStem = new Map<string, { factId: string; correct: string; mcqOnly: boolean }[]>();

  for (const fact of deck) {
    for (const form of fact.forms) {
      const correct = form.answers.kind === 'fixed' ? form.answers.correct : String(form.answers.value);
      const key = normalise(form.question);
      byStem.set(key, [...(byStem.get(key) ?? []), { factId: fact.id, correct, mcqOnly: form.mcqOnly }]);
    }
  }

  const out: { stem: string; factIds: string[] }[] = [];
  for (const [stem, uses] of byStem) {
    const facts = new Set(uses.map((u) => u.factId));
    if (facts.size < 2) continue;
    const answers = new Set(uses.map((u) => normalise(u.correct)));
    if (answers.size < 2) continue;
    if (uses.every((u) => u.mcqOnly)) continue; // quiz-only shared stems are legitimate
    out.push({ stem, factIds: [...facts] });
  }
  return out;
}

/**
 * A question form whose exact text is served by more than one fact, with the SAME correct
 * answer. Not contradictory — and for that reason it slips past both of the checks above,
 * which is how it survived until someone compared their output.
 *
 * It matters because of what the breadth gate is for. One memorised sentence earns credit
 * on two separate facts at once, which is the specific thing the gate exists to prevent.
 * f193 and f352 both serve "The Scottish Parliament and the Welsh Assembly first met in
 * which year?" verbatim.
 */
export function sharedFormsAcrossFacts(deck: Deck): { form: string; factIds: string[] }[] {
  const byForm = new Map<string, { factIds: Set<string>; allMcqOnly: boolean }>();

  for (const fact of deck) {
    for (const form of fact.forms) {
      const key = normalise(form.question);
      const entry = byForm.get(key) ?? { factIds: new Set<string>(), allMcqOnly: true };
      entry.factIds.add(fact.id);
      entry.allMcqOnly = entry.allMcqOnly && form.mcqOnly;
      byForm.set(key, entry);
    }
  }

  return (
    [...byForm]
      .filter(([, e]) => e.factIds.size > 1)
      // A generic stem used across several facts is legitimate when it is quiz-only: the
      // options disambiguate it, and each fact brings its own. "Which of these statements
      // is correct?" is shared by f038/f158/f278/f366 exactly this way and is not a defect.
      // The problem is only a shared sentence that gets served as a free-recall prompt.
      .filter(([, e]) => !e.allMcqOnly)
      .map(([form, e]) => ({ form, factIds: [...e.factIds].sort() }))
  );
}

/** Facts that cannot reach a breadth of 2 through recall alone — pinned at the 6-day cap. */
export const factsBelowRecallBreadth = (deck: Deck): string[] =>
  deck.filter((f) => recallForms(f).length < 2).map((f) => f.id);

/** Facts unreachable in recall mode entirely. */
export const factsWithNoRecallForm = (deck: Deck): string[] =>
  deck.filter((f) => recallForms(f).length === 0).map((f) => f.id);

export const unresolvedVerifyFlags = (deck: Deck): string[] =>
  deck.filter((f) => f.verify && !f.source).map((f) => f.id);

/** Forms whose four options are all distinct numbers — where the bracketing tell lives. */
function numericSets(deck: Deck): { correct: number; all: number[] }[] {
  const out: { correct: number; all: number[] }[] = [];
  for (const fact of deck) {
    for (const form of fact.forms) {
      if (form.answers.kind !== 'fixed') continue;
      const options = fixedOptions(form.answers);
      const values = options.map((o) => {
        const m = o.replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
        return m ? Number.parseFloat(m[0]) : null;
      });
      if (values.some((v) => v === null)) continue;
      const nums = values as number[];
      if (new Set(nums).size !== nums.length) continue;
      out.push({ correct: nums[0], all: nums }); // fixedOptions puts `correct` first
    }
  }
  return out;
}

/**
 * How often the correct value sits in the middle two of four sorted numeric options.
 * Chance is 0.50. High values mean distractors were written by bracketing the truth,
 * which lets "pick a middle number" score without any knowledge.
 */
export function numericMiddleRankRate(deck: Deck): { rate: number; middle: number; total: number } {
  const sets = numericSets(deck);
  const middle = sets.filter(({ correct, all }) => {
    const rank = [...all].sort((a, b) => a - b).indexOf(correct);
    return rank === 1 || rank === 2;
  }).length;
  return { rate: sets.length ? middle / sets.length : 0, middle, total: sets.length };
}

/**
 * How often the correct answer is the single longest option. Chance is 0.25.
 * Forms with a tie for longest are excluded — there is no tell to measure.
 */
export function longestOptionCorrectRate(deck: Deck): { rate: number; longest: number; total: number } {
  let longest = 0;
  let total = 0;
  for (const fact of deck) {
    for (const form of fact.forms) {
      if (form.answers.kind !== 'fixed') continue;
      const options = fixedOptions(form.answers);
      const lengths = options.map((o) => o.length);
      const max = Math.max(...lengths);
      if (lengths.filter((l) => l === max).length !== 1) continue;
      total++;
      if (options[0].length === max) longest++;
    }
  }
  return { rate: total ? longest / total : 0, longest, total };
}

/**
 * The largest share held by any one stored answer position. Neutralised at runtime by
 * shuffling on presentation; tracked because it documents what v0 shipped and would
 * catch a regression if presentation order ever stopped being randomised.
 */
export function maxAnswerPositionRate(deck: readonly MigratedFact[]): { rate: number; counts: number[] } {
  const counts = [0, 0, 0, 0];
  let total = 0;
  for (const fact of deck) {
    for (const form of fact.forms) {
      if (typeof form.v0CorrectIndex !== 'number') continue;
      counts[form.v0CorrectIndex]++;
      total++;
    }
  }
  return { rate: total ? Math.max(...counts) / total : 0, counts };
}

/** Structural faults that are never acceptable, at any baseline. */
export function structuralFaults(deck: Deck): string[] {
  const faults: string[] = [];
  const ids = new Set<string>();

  for (const fact of deck) {
    if (ids.has(fact.id)) faults.push(`${fact.id}: duplicate id`);
    ids.add(fact.id);
    if (fact.forms.length === 0) faults.push(`${fact.id}: no forms`);
    if (!fact.question.trim()) faults.push(`${fact.id}: empty canonical question`);
    if (!fact.answer.trim()) faults.push(`${fact.id}: empty canonical answer`);

    fact.forms.forEach((form, i) => {
      const where = `${fact.id}[${i}]`;
      if (!form.question.trim()) faults.push(`${where}: empty question`);
      if (form.answers.kind !== 'fixed') return;

      const options = fixedOptions(form.answers);
      if (options.length !== 4) faults.push(`${where}: ${options.length} options, expected 4`);
      if (new Set(options.map(normalise)).size !== options.length)
        faults.push(`${where}: duplicate options`);
      if (options.some((o) => !o.trim())) faults.push(`${where}: blank option`);
    });
  }

  return faults;
}

/** Everything, for a report or a failing-test message. */
export function analyseDeck(deck: readonly MigratedFact[]) {
  return {
    facts: deck.length,
    forms: deck.reduce((n, f) => n + f.forms.length, 0),
    structuralFaults: structuralFaults(deck),
    duplicateCanonicalQuestions: duplicateCanonicalQuestions(deck),
    ambiguousSharedStems: ambiguousSharedStems(deck),
    sharedFormsAcrossFacts: sharedFormsAcrossFacts(deck),
    factsBelowRecallBreadth: factsBelowRecallBreadth(deck),
    factsWithNoRecallForm: factsWithNoRecallForm(deck),
    unresolvedVerifyFlags: unresolvedVerifyFlags(deck),
    numericMiddleRank: numericMiddleRankRate(deck),
    longestOptionCorrect: longestOptionCorrectRate(deck),
    answerPosition: maxAnswerPositionRate(deck),
  };
}

export type DeckAnalysis = ReturnType<typeof analyseDeck>;
export type { Fact };
