/**
 * The deck's shape. Pure types — no framework, no vendor, no I/O.
 *
 * Two things live here that v0's positional arrays had nowhere to put:
 *   · `source`   — R3. Which handbook edition and page a fact came from.
 *   · `answers`  — D-014. A numeric form carries a *rule*, not a fixed option list,
 *                  so its four options are generated fresh on every presentation.
 *
 * Ordering is a contract, not a convenience. `Fact.id` and the position of each
 * form inside `Fact.forms` both reproduce v0's array indices, because v0 keys its
 * saved scheduler state by exactly those indices (`S.f[i]`, `c.ok[formIndex]`).
 * Reordering either would silently mis-assign six weeks of accumulated schedule on
 * import — see S6. `deck.test.ts` holds that contract to the fire.
 */

/** 1 Values · 2 What is the UK · 3 History · 4 Society · 5 Government */
export type Chapter = 1 | 2 | 3 | 4 | 5;

export const CHAPTER_NAMES: Record<Chapter, string> = {
  1: 'The values and principles of the UK',
  2: 'What is the UK?',
  3: 'A long and illustrious history',
  4: 'A modern, thriving society',
  5: 'The UK government, the law and your role',
};

/**
 * A fixed set of four options, hand-written. The correct one is named rather than
 * indexed: an index is invisible in a diff, which is how the 205/206 defect survived.
 * The option order presented to the reader is decided at presentation time, so the
 * order stored here carries no meaning beyond reproducing v0 on round-trip.
 */
export interface FixedAnswers {
  readonly kind: 'fixed';
  readonly correct: string;
  readonly distractors: readonly [string, string, string];
}

/**
 * A numeric answer plus the material to generate wrong ones (D-014).
 *
 * **This is derived, never stored.** It is computed from a form's hand-written options at
 * load time (`presentation.ts`), which buys three things over writing it into the data:
 * the rule can never drift out of step with the options it came from; editing an option
 * updates the rule for free; and the round-trip proof against v0's `facts.js` keeps
 * covering the entire deck, because nothing in the deck changed shape.
 *
 * Measured in v0: the correct answer was a middle value among four numeric options in
 * 91.4% of 373 all-numeric forms, against 50% by chance — because plausible distractors get
 * written by bracketing the true value. Generating at presentation time with the correct
 * answer's rank chosen uniformly removes the tell at its root and, incidentally, means
 * numeric forms almost never repeat an option set (R2).
 *
 * `template` renders a value into option text; `{v}` is the substitution point.
 * `candidates` are wrong values to draw from, and must never contain `value`.
 */
export interface NumericRule {
  readonly kind: 'numeric';
  readonly value: number;
  readonly template: string;
  readonly candidates: readonly number[];
  /** How to render the number itself — thousands separators, currency, and so on. */
  readonly format?: 'plain' | 'comma' | 'gbp';
}

export interface QuestionForm {
  readonly question: string;
  /**
   * Unusable as a free-recall prompt. Negative framings ("which of these was NOT…")
   * and bare "which of these is correct" stems are meaningless without options on
   * screen. 53 of 1,228 forms in v0.
   */
  readonly mcqOnly: boolean;
  /** Always the author's four options. Generation is layered on top, not stored here. */
  readonly answers: FixedAnswers;
}

export interface Fact {
  /** `f000`–`f409`, reproducing the v0 array index. See the ordering note above. */
  readonly id: string;
  readonly tag: string;
  readonly chapter: Chapter;
  /**
   * A figure that may have moved since the 2013 handbook. The examinable answer is
   * always the book's, *even where the book is now factually wrong* — so resolving
   * one of these can mean confirming something untrue. R3.
   */
  readonly verify: boolean;
  /** Handbook edition and page. Populated as the verify flags are resolved. R3. */
  readonly source?: string;
  /** The canonical statement of the fact, independent of any question form. */
  readonly question: string;
  readonly answer: string;
  readonly forms: readonly QuestionForm[];
}

export type Deck = readonly Fact[];

/** The id for a given v0 array index. The S6 import contract in one function. */
export const factId = (v0Index: number): string => `f${String(v0Index).padStart(3, '0')}`;

/** Forms that can be served as free-recall prompts. */
export const recallForms = (fact: Fact): readonly QuestionForm[] =>
  fact.forms.filter((f) => !f.mcqOnly);

/** Every option text a fixed form can present. Order here is storage order, not display order. */
export const fixedOptions = (a: FixedAnswers): readonly string[] => [a.correct, ...a.distractors];
