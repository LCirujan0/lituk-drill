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
 * One word each, for the home screen.
 *
 * The full titles are the handbook's and are kept as the drill screen's heading, where there
 * is room and where knowing which chapter you are in matters. On a 393px home screen every
 * one of them wraps to two lines, and five two-line rows is most of the screen — so the grid
 * uses these and the chapter's own screen says the rest.
 */
export const CHAPTER_SHORT: Record<Chapter, string> = {
  1: 'Values',
  2: 'The UK',
  3: 'History',
  4: 'Society',
  5: 'Government',
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

/**
 * One examinable item held alongside the answer, because the two are one story.
 *
 * `label` is the thing — "Caesar, 55 BC". `detail` is what tells it apart from the others —
 * "tried twice, failed, went home". **The detail is not decoration and is not optional.**
 * Listing "Caesar 55 BC, Claudius AD 43" attaches a second competing date to a single cue and
 * is the interference case; saying one raided and left while the other conquered and stayed
 * supplies the feature that separates them, and is the discrimination case. That distinction
 * is the whole difference between this helping and hurting — see `docs/EXPLANATIONS.md`.
 */
export interface ClusterItem {
  readonly label: string;
  readonly detail: string;
}

/**
 * The panel under a card, in the fixed skeleton every explanation uses.
 *
 * The order never varies and the wording never changes once written. Both are deliberate.
 * A structurally distinctive panel is a *shape*, and shapes get pattern-matched; and a reader
 * who has met this card twenty times needs to find one line and skip the rest, which they can
 * only do if the slots are always in the same place.
 *
 * Fields drop from the bottom, never the top. Two good lines beat five padded ones — material
 * that is interesting rather than load-bearing measures *negative* for retention, so a panel
 * whose story is more memorable than its fact has failed.
 */
export interface Explanation {
  /** The answer as a complete sentence, readable without the question. Always present. */
  readonly lead: string;
  /** What separates it from the thing it gets confused with. Directional, never a pair-list. */
  readonly versus?: string;
  /** One precise reason, comparison or link. Omitted rather than padded when none exists. */
  readonly why?: string;
  /** The rest of the same story. Every member must have its own card in the deck. */
  readonly cluster?: readonly ClusterItem[];
  /**
   * Where the handbook differs from present-day reality. Always last, always the same shape,
   * and always framed as the book's claim rather than as truth — the handbook is what the
   * exam marks against (D-023). A second competing fact on a card that exists to install the
   * first, so it is carried only where its absence would make a reader distrust the card.
   */
  readonly note?: string;
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
  /**
   * Why this fact is no longer drilled. Present means retired; the string is the reason.
   *
   * **Retired, not deleted, and that is not squeamishness.** Ids are the handle the review-event
   * log points at, and they are contiguous by contract (R-4) — `DECK[i].id === factId(i)`.
   * Deleting a fact renumbers every fact after it, which silently re-points every historical
   * event at the wrong question. A retired fact keeps its id and its place in `DECK`, and is
   * filtered out of `ACTIVE`, which is what every queue and count actually reads.
   *
   * The cost is a handful of rows that exist only to hold a number, each carrying the sentence
   * explaining why. That is the right trade against rewriting history.
   */
  readonly retired?: string;
  /** The canonical statement of the fact, independent of any question form. */
  readonly question: string;
  readonly answer: string;
  /**
   * The panel shown after the answer. Every fact has one; `docs/EXPLANATIONS.md` is how it
   * is written and why each rule is there.
   */
  readonly explanation?: Explanation;
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
