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

import { stale, undeclared } from './contradictions';
import type { Deck, Fact } from './types';
import { fixedOptions, recallForms } from './types';
import { achievableRanks, deriveNumericAnswers, generateOptions } from './numeric';

/** Extract a leading number from option text, or null. */
const readNumber = (text: string): number | null => {
  const m = text.replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
  return m ? Number.parseFloat(m[0]) : null;
};

const MONTH = /^\s*\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\b/i;

/**
 * A form whose four options are calendar dates has no magnitude to rank, and measuring one
 * reports a tell that cannot exist.
 *
 * `readNumber` takes the first integer in the option text. For "8 May 1945" that is **8** — the
 * day of the month. So a set like `8 May | 15 August | 11 November | 6 June` was being ranked
 * 8/15/11/6 and scored as "the correct answer is a middle value", when the thing ranked is a
 * day number that no reader perceives as a size and that has nothing to do with the answer.
 *
 * Found on 10 August 2026 while the numeric ratchet was failing, which is the worst possible
 * moment to discover a measurement is wrong — a fix that unblocks one's own build deserves more
 * scrutiny than one that does not. Stated plainly so it can be checked: this **removes** forms
 * from the denominator and therefore moves the headline rate. Both figures are in the ledger
 * under L-036, and the finding is `fixed-unverified` until someone else re-derives it.
 *
 * Date RANGES are deliberately not excluded. "1853-1856" reads as 1853, which genuinely is the
 * magnitude being compared, and those forms keep their place in the measurement (L-011).
 */
const isCalendarDateSet = (options: readonly string[]): boolean => options.every((o) => MONTH.test(o));

/**
 * A small deterministic generator, so measurements are reproducible without dragging the
 * scheduler's RNG into the deck layer (R-2). mulberry32, same algorithm, local copy.
 */
const defaultSeed = (n: number) => {
  let a = (n * 0x9e3779b1) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

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
      const correct = form.answers.correct;
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

/* ────────────────────────────────────────────────────────────────────────────────────────
 * Option CONTENT.
 *
 * Everything above this line measures option *shape* — how long an option is, where the
 * true value sits among four numbers, which position the answer takes. None of it has ever
 * read what a distractor actually SAYS, and for a week the deck was green on every check
 * while offering, on eight facts, a wrong answer that another phrasing of the same fact
 * marked correct (L-033).
 *
 * Two checks from the census earned promotion and two did not, which is worth recording so
 * nobody re-derives the rejected pair. `cross-fact-collision` — a distractor that is some
 * other fact's answer — flagged 210 forms and was almost entirely correct design: the six
 * wives of Henry VIII are each the answer to one question and the right distractor for the
 * others, and that IS the discrimination the deck teaches. `nested-option` was mostly regnal
 * numbering, "Edward I" inside "Edward III". Both need judgement, so both stay out of the
 * build; a check that cries wolf on good design is a check that gets ignored.
 * ──────────────────────────────────────────────────────────────────────────────────────── */

/**
 * A distractor on one form that another form of the SAME fact marks correct.
 *
 * The worst defect the deck can carry. The card asserts a true thing is false, and spaced
 * repetition installs that as faithfully as it installs the answer — so the mechanism meant
 * to teach the fact teaches its negation instead, on a schedule.
 */
/**
 * The raw flag. **Eleven of its twelve original hits were correct design, not defects** — two
 * forms of one fact routinely ask different questions, and a negative stem ("which is NOT…")
 * has true statements as its distractors by construction. See `contradictions.ts`, which holds
 * the read-and-signed-off list and is what makes `undeclaredSelfContradictions` assertable at
 * zero. This function stays raw on purpose: the exemptions belong where they can be read.
 */
export function selfContradictingForms(deck: Deck): string[] {
  const out: string[] = [];
  for (const fact of deck) {
    const corrects = new Map<string, number[]>();
    fact.forms.forEach((f, i) => {
      const k = normalise(f.answers.correct);
      corrects.set(k, [...(corrects.get(k) ?? []), i]);
    });
    fact.forms.forEach((f, i) => {
      for (const d of f.answers.distractors) {
        const where = corrects.get(normalise(d));
        if (where?.some((j) => j !== i)) out.push(`${fact.id}[${i}] "${d}"`);
      }
    });
  }
  return out;
}

/**
 * Stems that presuppose options on screen, served as free-recall prompts.
 *
 * `mcqOnly` exists for exactly this — "negative framings and bare 'which of these' stems are
 * meaningless without options on screen" is `QuestionForm`'s own doc comment. **37 forms matched
 * one of these constructions while carrying `mcqOnly: false`**, and nothing had ever checked.
 *
 * This is not cosmetic. In recall mode the reader is shown the stem alone, reveals the answer and
 * self-grades — so "Which of these took place in 1215?" with nothing on screen is graded on
 * whatever the reader happened to think of. **Recall is the only evidence D-013's recall
 * readiness figure accepts**, so an unanswerable recall prompt does not merely annoy: it feeds
 * noise straight into the one number that was designed to be clean.
 *
 * The patterns are deliberately narrow. Each is a construction with a **dangling referent** —
 * "these", "which statement", "which set is correct" — that cannot resolve without a list in
 * front of the reader. A stem that is merely hard is not caught, and should not be.
 */
export function recallPromptsNeedingOptions(deck: Deck): string[] {
  const PATTERNS = [
    /^which of (these|the following)\b/i,
    /^which statement\b/i,
    /\bis correct\?$/i,
  ];
  const out: string[] = [];
  for (const fact of deck)
    fact.forms.forEach((f, i) => {
      if (!f.mcqOnly && PATTERNS.some((re) => re.test(f.question))) out.push(`${fact.id}[${i}]`);
    });
  return out;
}

/** A distractor that is the fact's own canonical answer. The same defect, one step blunter. */
export function distractorsContradictingCanonical(deck: Deck): string[] {
  const out: string[] = [];
  for (const fact of deck)
    fact.forms.forEach((f, i) => {
      for (const d of f.answers.distractors)
        if (normalise(d) === normalise(fact.answer)) out.push(`${fact.id}[${i}] "${d}"`);
    });
  return out;
}

/**
 * Facts where two forms present the identical set of four options.
 *
 * Only the stem moved. The breadth gate exists so a long interval cannot be banked on one
 * memorised sentence (R-6), and it counts these as two proven phrasings — but a reader who
 * recognises the option set does not need to read the stem at all. So "proven on two
 * phrasings" is a materially weaker claim on these facts than the number suggests, and the
 * gate is measuring something closer to one phrasing seen twice.
 */
export function identicalOptionSetsWithinFact(deck: Deck): string[] {
  const out: string[] = [];
  for (const fact of deck) {
    const sets = new Map<string, number[]>();
    fact.forms.forEach((f, i) => {
      const key = fixedOptions(f.answers).map(normalise).sort().join('|');
      sets.set(key, [...(sets.get(key) ?? []), i]);
    });
    for (const idx of sets.values()) if (idx.length > 1) out.push(`${fact.id}[${idx.join('/')}]`);
  }
  return out;
}

/**
 * Distractor strings appearing on more than one form of the same fact.
 *
 * Not wrong, but it shrinks the pool of wrong answers a reader ever meets, so the same three
 * lures come round again and again. That is R2 — a memorisable surface — sitting inside the
 * several-phrasings mechanism built to defeat it. Counted per repeated string, not per form.
 */
export function repeatedDistractorsWithinFact(deck: Deck): string[] {
  const out: string[] = [];
  for (const fact of deck) {
    const seen = new Map<string, number>();
    for (const f of fact.forms)
      for (const d of f.answers.distractors) seen.set(normalise(d), (seen.get(normalise(d)) ?? 0) + 1);
    for (const [d, n] of seen) if (n > 1) out.push(`${fact.id} "${d}" ×${n}`);
  }
  return out;
}

/** Forms whose four options are all distinct numbers — where the bracketing tell lives. */
function numericSets(deck: Deck): { correct: number; all: number[] }[] {
  const out: { correct: number; all: number[] }[] = [];
  for (const fact of deck) {
    for (const form of fact.forms) {
      const options = fixedOptions(form.answers);
      if (isCalendarDateSet(options)) continue; // ranks the day of the month — see the note above
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
 *
 * Only forms presented **as written** are counted. A form carrying a generation rule has its
 * four options built fresh at presentation, so its stored text is never on a screen and
 * measuring it says nothing about what a reader meets — the same mistake
 * `numericMiddleRankRate` makes deliberately and `effectiveNumericMiddleRankRate` exists to
 * correct. Generated numeric options do vary in length, but length there tracks magnitude,
 * and magnitude rank is uniform by construction, so the tell does not survive generation.
 */
export function longestOptionCorrectRate(deck: Deck): { rate: number; longest: number; total: number } {
  let longest = 0;
  let total = 0;
  for (const fact of deck) {
    for (const form of fact.forms) {
      const options = fixedOptions(form.answers);
      if (deriveNumericAnswers(options, 0)) continue; // generated, not presented as written
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
 * The measurement that actually matters after D-014: how often the correct answer would be
 * a middle value **on screen**, across the whole deck.
 *
 * `numericMiddleRankRate` above measures the stored options, which is the right number for
 * material a reader will see as written. It is the wrong number once generation exists,
 * because it would keep reporting 91% for forms that no longer present those options — and
 * it would report an improvement if a form simply became underivable. This walks every
 * all-numeric form and uses whichever path the reader would actually get.
 *
 * Sampling rather than solving: the rank is drawn from an achievable set whose size varies
 * per form, so the honest way to ask "what does this deck do" is to run it.
 */
export function effectiveNumericMiddleRankRate(
  deck: Deck,
  samplesPerForm = 40,
  seed: (n: number) => () => number = defaultSeed,
): { rate: number; generatedForms: number; writtenForms: number } {
  let middle = 0;
  let total = 0;
  let generatedForms = 0;
  let writtenForms = 0;
  let n = 0;

  for (const fact of deck) {
    for (const form of fact.forms) {
      const options = fixedOptions(form.answers);
      if (isCalendarDateSet(options)) continue; // ranks the day of the month — see the note above
      const values = options.map(readNumber);
      if (values.some((v) => v === null)) continue;
      const nums = values as number[];
      if (new Set(nums).size !== nums.length) continue;

      const rule = deriveNumericAnswers(options, 0);
      if (!rule) {
        writtenForms++;
        const rank = [...nums].sort((a, b) => a - b).indexOf(nums[0]);
        if (rank === 1 || rank === 2) middle += samplesPerForm;
        total += samplesPerForm;
        continue;
      }

      generatedForms++;
      for (let i = 0; i < samplesPerForm; i++) {
        const { rank } = generateOptions(rule, seed(n++));
        if (rank === 1 || rank === 2) middle++;
        total++;
      }
    }
  }

  return { rate: total ? middle / total : 0, generatedForms, writtenForms };
}

/** Forms whose candidate pool cannot place the answer at all four ranks — a residual tell. */
export function formsWithRestrictedRanks(deck: Deck): string[] {
  const out: string[] = [];
  for (const fact of deck) {
    fact.forms.forEach((form, j) => {
      const rule = deriveNumericAnswers(fixedOptions(form.answers), 0);
      if (rule && achievableRanks(rule).length < 4) out.push(`${fact.id}[${j}]`);
    });
  }
  return out;
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

      const options = fixedOptions(form.answers);
      if (options.length !== 4) faults.push(`${where}: ${options.length} options, expected 4`);
      if (new Set(options.map(normalise)).size !== options.length)
        faults.push(`${where}: duplicate options`);
      if (options.some((o) => !o.trim())) faults.push(`${where}: blank option`);
    });
  }

  return faults;
}

/**
 * Everything, for a report or a failing-test message.
 *
 * **Pass `ACTIVE`, not `DECK`.** The comment here used to say the opposite — that excluding
 * any of the deck would describe a deck nobody is drilling — and it was written before facts
 * started being retired. It is now exactly backwards: a retired fact is never served, so
 * measuring one reports on material no reader meets, and because facts get retired for being
 * bad the retired set skews every rate in the flattering direction. Measured 10 Aug 2026 over
 * 26 retired facts: longest-option 0.3124 -> 0.3092, on-screen numeric 0.5277 -> 0.5249.
 *
 * The id-space contracts — contiguity, uniqueness, orphaned explanations — are the exception
 * and still run over `DECK`, because those are properties of the id space rather than of the
 * study material.
 */
export function analyseDeck(deck: Deck) {
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
    selfContradictingForms: selfContradictingForms(deck),
    // The two that are asserted rather than ratcheted. The raw count above stays visible so
    // the declarations can be argued with; these are what the build actually holds to zero.
    undeclaredSelfContradictions: undeclared(selfContradictingForms(deck)),
    staleContradictionDeclarations: stale(selfContradictingForms(deck)),
    distractorsContradictingCanonical: distractorsContradictingCanonical(deck),
    recallPromptsNeedingOptions: recallPromptsNeedingOptions(deck),
    identicalOptionSetsWithinFact: identicalOptionSetsWithinFact(deck),
    repeatedDistractorsWithinFact: repeatedDistractorsWithinFact(deck),
    numericMiddleRank: numericMiddleRankRate(deck),
    effectiveNumericMiddleRank: effectiveNumericMiddleRankRate(deck),
    restrictedRankForms: formsWithRestrictedRanks(deck),
    longestOptionCorrect: longestOptionCorrectRate(deck),
  };
}

export type DeckAnalysis = ReturnType<typeof analyseDeck>;
export type { Fact };
