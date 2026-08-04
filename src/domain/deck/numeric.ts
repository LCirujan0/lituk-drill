/**
 * Generated numeric distractors — D-014, closing L-002.
 *
 * THE PROBLEM, measured. Across 373 forms whose four options are all distinct numbers,
 * the correct answer is one of the middle two values 91.4% of the time. Chance is 50%.
 * Nobody did anything careless: it is what happens when you write plausible numeric
 * distractors, because the natural way is to bracket the true value above and below.
 * The consequence is that "pick a middle number" scores ~91% on those forms while knowing
 * nothing, and any readiness figure built on multiple-choice data inherits that.
 *
 * Shuffling does not help. Option ORDER is already close to uniform in v0 and is
 * randomised at presentation anyway. The tell is a property of the option SET — which four
 * numbers are on offer — and survives any permutation of them.
 *
 * THE FIX. A numeric form stores the true value plus a pool of candidate wrong values with
 * depth on both sides. At presentation, a target rank is drawn uniformly from those that
 * are achievable, and distractors are then chosen to place the true value at that rank.
 * The answer is as likely to be the smallest number on screen as the largest, so rank
 * carries no information. Two things follow for free: the option set is different almost
 * every time, so there is no stable surface to memorise (R2), and mocks stop consuming
 * scarce unseen material (D-017).
 *
 * SCALE COMES FROM THE HUMAN. Candidate values are generated around the true value using a
 * step derived from the spread of the ORIGINAL hand-written distractors, snapped to the
 * granularity those options shared. The author already decided what "plausibly wrong" looks
 * like for each fact — a year wants neighbours a few years out, a population figure wants
 * millions. Inferring the step rather than guessing it is what keeps generated options from
 * being absurd, and absurd options are their own tell.
 */

import type { NumericRule } from './types';

const NUMBER_PATTERN = /-?\d[\d,]*(?:\.\d+)?/;

export interface ParsedOption {
  readonly value: number;
  /** The option text with its number replaced by `{v}`. */
  readonly template: string;
  readonly format: NonNullable<NumericRule['format']>;
}

/** Pull the number out of an option, and remember how to put one back. */
export function parseOption(text: string): ParsedOption | null {
  const match = text.match(NUMBER_PATTERN);
  if (!match) return null;

  const raw = match[0];
  const value = Number.parseFloat(raw.replace(/,/g, ''));
  if (!Number.isFinite(value)) return null;

  const at = match.index ?? 0;
  const template = `${text.slice(0, at)}{v}${text.slice(at + raw.length)}`;
  const format = text[at - 1] === '£' ? 'gbp' : raw.includes(',') ? 'comma' : 'plain';

  return { value, template, format };
}

export function formatValue(value: number, format: NonNullable<NumericRule['format']>): string {
  const rounded = Number.isInteger(value) ? value : Math.round(value * 100) / 100;
  if (format === 'plain') return String(rounded);
  // 'comma' and 'gbp' both group thousands; the £ itself lives in the template.
  return rounded.toLocaleString('en-GB');
}

export const renderOption = (answers: NumericRule, value: number): string =>
  answers.template.replace('{v}', formatValue(value, answers.format ?? 'plain'));

/** The largest power of ten dividing every value — the granularity the author worked at. */
function sharedGranularity(values: readonly number[]): number {
  if (!values.every(Number.isInteger)) return 1;
  let g = 1;
  for (let power = 10; power <= 1_000_000; power *= 10) {
    if (values.every((v) => v % power === 0)) g = power;
    else break;
  }
  return g;
}

/**
 * Build the candidate pool for a value, using the original distractors to set the scale.
 *
 * Depth on both sides is what makes uniform rank achievable: to place the true value last,
 * three candidates below it are needed. Values near zero cannot have that, which is why
 * `achievableRanks` exists rather than being assumed away.
 */
export function buildCandidates(value: number, originalDistractors: readonly number[]): number[] {
  const all = [value, ...originalDistractors];
  const granularity = sharedGranularity(all);

  const spread = Math.max(...originalDistractors.map((d) => Math.abs(d - value)), granularity);
  const fromSpread = Math.max(spread / 3, granularity);

  // Cap the step so three candidates still fit BELOW the value. Without this, a small value
  // whose hand-written distractors happen to sit far above it — AD 43 against 61, 122 and
  // 410 — produces a step of 122, nothing below zero survives the filter, and the true value
  // becomes the smallest option on screen every single time. That is not a smaller tell than
  // the one being removed; it is a bigger one, and it would have shipped looking like a fix.
  const positiveOnly = all.every((v) => v > 0);
  const floor = positiveOnly ? granularity : value - 3 * fromSpread;
  const maxForDepth = Math.max(granularity, (value - floor) / 3);

  const rawStep = Math.min(fromSpread, maxForDepth);
  const step = Math.max(granularity, Math.floor(rawStep / granularity) * granularity);

  const candidates = new Set<number>();

  // Keep the author's originals — they are the most plausible wrong answers available.
  for (const d of originalDistractors) candidates.add(d);

  for (let k = 1; k <= 5; k++) {
    for (const side of [-1, 1]) {
      const candidate = value + side * k * step;
      // Nothing negative, and nothing at zero where the original values were all positive:
      // "About 0 years ago" is not a distractor, it is a bug on screen.
      if (candidate <= 0 && all.every((v) => v > 0)) continue;
      if (candidate === value) continue;
      candidates.add(Number.isInteger(value) ? Math.round(candidate) : candidate);
    }
  }

  candidates.delete(value);
  return [...candidates].sort((a, b) => a - b);
}

/** Derive a generation rule from a hand-written form, or refuse. */
export function deriveNumericAnswers(
  options: readonly string[],
  correctIndex: number,
): NumericRule | null {
  if (options.length !== 4) return null;

  const parsed = options.map(parseOption);
  if (parsed.some((p) => p === null)) return null;
  const values = (parsed as ParsedOption[]).map((p) => p.value);
  if (new Set(values).size !== values.length) return null;

  // Every option must share one template. Where the four options are worded differently,
  // the number is incidental to the answer rather than being the answer, and substituting
  // values into one template would change what the question is asking.
  const templates = new Set((parsed as ParsedOption[]).map((p) => p.template));
  if (templates.size !== 1) return null;

  // A template that is nothing but the number is fine; one with no `{v}` is not.
  const template = [...templates][0];
  if (!template.includes('{v}')) return null;

  const value = values[correctIndex];
  const distractors = values.filter((_, i) => i !== correctIndex);
  const candidates = buildCandidates(value, distractors);

  // Below three, a form cannot even be rendered without reusing a value.
  if (candidates.length < 3) return null;

  return {
    kind: 'numeric',
    value,
    template,
    candidates,
    format: (parsed as ParsedOption[])[correctIndex].format,
  };
}

/** Ranks (0 = smallest on screen, 3 = largest) this pool can actually place the answer at. */
export function achievableRanks(answers: NumericRule): number[] {
  const below = answers.candidates.filter((c) => c < answers.value).length;
  const above = answers.candidates.filter((c) => c > answers.value).length;
  const ranks: number[] = [];
  for (let rank = 0; rank <= 3; rank++) {
    // rank = how many distractors sit below the true value.
    if (rank <= below && 3 - rank <= above) ranks.push(rank);
  }
  return ranks;
}

export interface GeneratedOptions {
  readonly options: readonly string[];
  readonly correctIndex: number;
  /** Position of the true value among the four sorted by size. Uniform by construction. */
  readonly rank: number;
}

/**
 * Produce four options with the true value at a uniformly-chosen rank.
 *
 * `rng` must be seeded from the presentation, not from a clock — the same card shown twice
 * from the same replayed state has to look the same, or the event log stops describing what
 * was actually on screen (D-002).
 */
export function generateOptions(answers: NumericRule, rng: () => number): GeneratedOptions {
  const ranks = achievableRanks(answers);
  const rank = ranks[Math.floor(rng() * ranks.length)] ?? 0;

  const below = answers.candidates.filter((c) => c < answers.value);
  const above = answers.candidates.filter((c) => c > answers.value);

  const take = (pool: readonly number[], n: number): number[] => {
    const remaining = [...pool];
    const picked: number[] = [];
    for (let i = 0; i < n && remaining.length; i++) {
      picked.push(...remaining.splice(Math.floor(rng() * remaining.length), 1));
    }
    return picked;
  };

  // Nearest candidates are the most plausible, so bias selection toward them: draw from the
  // half of each pool closest to the true value where it is big enough to allow it.
  const near = (pool: number[], ascending: boolean) => {
    const sorted = [...pool].sort((a, b) =>
      ascending ? a - b : b - a,
    );
    return sorted.slice(0, Math.max(3, Math.ceil(sorted.length * 0.6)));
  };

  const chosen = [
    ...take(near(below, false), rank),
    ...take(near(above, true), 3 - rank),
  ];

  const values = [...chosen, answers.value].sort((a, b) => a - b);
  const options = values.map((v) => renderOption(answers, v));

  return { options, correctIndex: values.indexOf(answers.value), rank };
}
