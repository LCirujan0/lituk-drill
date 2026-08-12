/**
 * The explainer's prompt, built as pure text from plain data.
 *
 * Lives in the domain layer on purpose (R-2): no SDK types, no `fetch`, no environment. The
 * route hands it a struct and gets a string back, which is what lets the single thing that
 * can actually kill this feature be asserted in a unit test rather than argued about.
 *
 * ## The handbook wins, and that is the whole design
 *
 * D-034 names it as the most likely way C8(a) fails: the Council of Europe has 46 members,
 * the handbook says 47, and the deck says 47 because the exam marks against the book
 * (D-023). A model that "corrects" 47 to 46 is worse than no explainer at all — it teaches
 * the reader to fail the question they just got right.
 *
 * So the deck's own answer is handed over as **the** authority and the model is told, in the
 * system prompt and again beside the answer, that its own knowledge loses. The handbook
 * passage is supplied where one is available, and is treated the same way: as text that
 * outranks whatever the model believes.
 *
 * ## Nothing leaves that identifies anything
 *
 * The screening in the BRIEF is conditional on five things, and two of them are properties
 * of this string: **no review history** and **no identifier**. There is no fact id, no form
 * index, no timestamp, no grade, no schedule, and nothing about any other card. What goes is
 * one question, its options, which was chosen, the correct answer, and the source text.
 * `explain.test.ts` asserts that over the whole deck rather than trusting this paragraph.
 */

/** Everything the explainer is allowed to know. Text only — no ids, by construction. */
export interface ExplainInput {
  readonly question: string;
  readonly options: readonly string[];
  /** The option the reader picked. */
  readonly chosen: string;
  /** The deck's answer, which is authoritative over the model's own knowledge. */
  readonly correct: string;
  /** The fact stated plainly, independent of this phrasing. */
  readonly statement: string;
  /** The deck's explanation panel, flattened. Our text, so always safe to send. */
  readonly explanation?: string;
  /** The handbook's own words, where the deployment supplies them. */
  readonly passage?: string;
}

export const EXPLAIN_SYSTEM = [
  'You explain multiple-choice questions from the UK "Life in the United Kingdom" citizenship test',
  'to someone revising for it.',
  '',
  'THE SOURCE MATERIAL IS THE ONLY AUTHORITY. The exam is marked against the official handbook,',
  'not against the world. The handbook is in places out of date, and where it is, the out-of-date',
  'answer is still the correct answer for this exam. If the material you are given contradicts what',
  'you believe to be true, the material is right and you are wrong. Never correct it, never hedge it,',
  'never add "although in fact" or "as of today". Explain the answer the material gives.',
  '',
  'Write two or three sentences, plain and direct, addressed to the reader as "you":',
  'first why the option they picked is not the answer, then what makes the correct one the answer.',
  'No preamble, no heading, no restating the question, no encouragement.',
  '',
  'If the material does not settle why the chosen option is wrong, say exactly that in one sentence',
  'and stop. Do not reason from outside it to fill the gap.',
].join('\n');

/** Order matters: source first, then the question, then the instruction. */
export function buildExplainPrompt(input: ExplainInput): string {
  const parts: string[] = [];

  parts.push('<source>');
  parts.push(`The fact: ${input.statement}`);
  if (input.explanation) parts.push(`Notes: ${input.explanation}`);
  if (input.passage) parts.push(`Handbook passage: ${input.passage}`);
  parts.push('</source>');
  parts.push('');
  parts.push(`Question: ${input.question}`);
  parts.push('Options:');
  for (const option of input.options) parts.push(`- ${option}`);
  parts.push('');
  parts.push(`The reader chose: ${input.chosen}`);
  parts.push(
    `The correct answer, which the source establishes and which you must treat as true: ${input.correct}`,
  );
  parts.push('');
  parts.push('Explain why the chosen option is wrong.');

  return parts.join('\n');
}
