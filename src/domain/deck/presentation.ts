/**
 * Turning a stored form into four options on a screen.
 *
 * Everything the reader actually sees passes through here, and two things happen that the
 * stored data does not do on its own:
 *
 *   · **Order is always randomised.** v0 presented options in stored order, where the
 *     correct answer sat at position 0 in 29.6% of forms against 25% by chance. Small, but
 *     free to remove — and it means the stored order carries no meaning at all, which is
 *     one less thing to keep honest.
 *   · **Numeric forms are regenerated.** Where a generation rule can be derived, the four
 *     values are drawn fresh with the true value at a uniformly-chosen rank (D-014), which
 *     is what closes L-002. Where one cannot, the author's options are used as written.
 *
 * The generator is seeded by the caller. Presentation must be reproducible from replayed
 * state, or the event log stops describing what was on the screen at the time (D-002).
 */

import { deriveNumericAnswers, generateOptions } from './numeric';
import { fixedOptions, type Fact, type NumericRule, type QuestionForm } from './types';

/** Declared locally rather than imported: the deck must not depend on the scheduler (R-2). */
type Rng = () => number;

/**
 * Rules are derived once per form and cached. Deriving is cheap, but it runs for every
 * presentation otherwise, and the deck is fixed for the life of the process.
 */
const RULE_CACHE = new WeakMap<QuestionForm, NumericRule | null>();

export function numericRuleFor(form: QuestionForm): NumericRule | null {
  const cached = RULE_CACHE.get(form);
  if (cached !== undefined) return cached;

  // `fixedOptions` puts the correct answer first, so index 0 is the correct one.
  const rule = deriveNumericAnswers(fixedOptions(form.answers), 0);
  RULE_CACHE.set(form, rule);
  return rule;
}

export interface PresentedOptions {
  readonly options: readonly string[];
  readonly correctIndex: number;
  /** True when the four values were generated rather than taken as written. */
  readonly generated: boolean;
}

/** Fisher–Yates over (option, isCorrect) pairs, so the correct index follows its option. */
function shuffleOptions(options: readonly string[], correctIndex: number, rng: Rng): PresentedOptions {
  const pairs = options.map((option, i) => ({ option, correct: i === correctIndex }));
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return {
    options: pairs.map((p) => p.option),
    correctIndex: pairs.findIndex((p) => p.correct),
    generated: false,
  };
}

export function presentForm(form: QuestionForm, rng: Rng): PresentedOptions {
  const rule = numericRuleFor(form);

  if (rule) {
    // Already positioned by rank; shuffling again would undo the uniform placement, since
    // rank is defined by sorted value and the display order is what carries it.
    const { options, correctIndex } = generateOptions(rule, rng);
    return { options, correctIndex, generated: true };
  }

  return shuffleOptions(fixedOptions(form.answers), 0, rng);
}

export const presentFact = (fact: Fact, formIndex: number, rng: Rng): PresentedOptions =>
  presentForm(fact.forms[formIndex], rng);

/** The canonical answer text for a form, independent of how it is presented. */
export const correctAnswerFor = (form: QuestionForm): string => form.answers.correct;
