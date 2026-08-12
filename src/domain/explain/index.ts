import type { Explanation } from '@/domain/deck/types';

export { buildExplainPrompt, EXPLAIN_SYSTEM, type ExplainInput } from './prompt';

/**
 * The explanation panel as one line of prose.
 *
 * The panel is our own text (D-020, and C2 will rewrite all 530 of them), so it is the one
 * piece of grounding that needs no licensing decision and is always available. `note` is
 * included deliberately: it is where a fact records that the handbook disagrees with the
 * present day, which is precisely what the model must be told not to "fix".
 */
export function flattenExplanation(explanation: Explanation | undefined): string | undefined {
  if (!explanation) return undefined;

  const parts = [explanation.lead, explanation.versus, explanation.why];
  if (explanation.cluster?.length) {
    parts.push(explanation.cluster.map((c) => `${c.label} — ${c.detail}`).join('; '));
  }
  parts.push(explanation.note);

  const text = parts.filter(Boolean).join(' ').trim();
  return text.length ? text : undefined;
}
