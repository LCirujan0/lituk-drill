/**
 * The explainer's guarantees, asserted over the whole deck.
 *
 * Two of the five screening conditions in the BRIEF are properties of the string that leaves
 * this machine, and a paragraph in a route file does not hold them. These do:
 *
 *   · **no identifier** — no fact id, no form index, no timestamp, in any prompt for any card
 *   · **the handbook wins** — the deck's answer is always present and always named as
 *     authoritative, which is D-034's single most likely failure mode
 *
 * Every assertion here was run against deliberately broken code before being trusted; the
 * breakages are named beside each one.
 */

import { describe, expect, it } from 'vitest';

import { ACTIVE, DECK } from '@/domain/deck';
import { fixedOptions } from '@/domain/deck/types';
import { buildExplainPrompt, EXPLAIN_SYSTEM, flattenExplanation } from '@/domain/explain';

/** The prompt for the first wrong option of every form of every drilled fact. */
function everyPrompt(): { factId: string; formIndex: number; prompt: string }[] {
  const out: { factId: string; formIndex: number; prompt: string }[] = [];
  for (const fact of ACTIVE) {
    fact.forms.forEach((form, formIndex) => {
      const options = fixedOptions(form.answers);
      out.push({
        factId: fact.id,
        formIndex,
        prompt: buildExplainPrompt({
          question: form.question,
          options,
          chosen: form.answers.distractors[0],
          correct: form.answers.correct,
          statement: `${fact.question} — ${fact.answer}`,
          explanation: flattenExplanation(fact.explanation),
          passage: undefined,
        }),
      });
    });
  }
  return out;
}

describe('what leaves the device', () => {
  const prompts = everyPrompt();

  it('covers the whole active deck', () => {
    expect(ACTIVE.length).toBeGreaterThan(500);
    expect(prompts.length).toBeGreaterThan(1_000);
  });

  /**
   * Condition 2, no identifier. Broken deliberately by adding `Fact ${fact.id}` to the
   * `<source>` block, which failed on 1,588 prompts.
   *
   * The pattern is the id shape itself rather than a list of known ids: a future field that
   * happens to carry one is caught by the same assertion.
   */
  it('never carries a fact id', () => {
    const offenders = prompts.filter((p) => /\bf\d{3,6}\b/.test(p.prompt));
    expect(offenders.map((o) => `${o.factId}[${o.formIndex}]`)).toEqual([]);
  });

  /**
   * Condition 1, no review history — asserted structurally rather than by banned words.
   *
   * The first version of this test banned a vocabulary, and three facts failed it on the
   * word "interval": *"the maximum interval allowed between UK general elections"*. All
   * three hits were legitimate deck content, which makes the vocabulary the wrong check —
   * it cannot tell a question about elections from leaked scheduler state, and ratcheting
   * it to three would have hidden the fourth.
   *
   * So this asserts the **exact set** instead: render every field as a unique sentinel,
   * strip the sentinels, and require what remains to be the template, byte for byte. A new
   * field cannot be added to the prompt without changing this string — whether it carries a
   * grade, a lapse count, a due date or anything else. Verified by adding a
   * `Missed ${lapses} times` line, which failed.
   */
  const TEMPLATE = [
    '<source>',
    'The fact: ',
    'Notes: ',
    'Handbook passage: ',
    '</source>',
    '',
    'Question: ',
    'Options:',
    '- ',
    '- ',
    '',
    'The reader chose: ',
    'The correct answer, which the source establishes and which you must treat as true: ',
    '',
    'Explain why the chosen option is wrong.',
  ].join('\n');

  it('renders nothing but the template and the seven declared fields', () => {
    const prompt = buildExplainPrompt({
      question: 'QUESTION_SENTINEL',
      options: ['OPTIONA_SENTINEL', 'OPTIONB_SENTINEL'],
      chosen: 'CHOSEN_SENTINEL',
      correct: 'CORRECT_SENTINEL',
      statement: 'STATEMENT_SENTINEL',
      explanation: 'EXPLANATION_SENTINEL',
      passage: 'PASSAGE_SENTINEL',
    });

    // Every sentinel must actually appear, or the strip below would pass vacuously.
    for (const field of ['QUESTION', 'OPTIONA', 'OPTIONB', 'CHOSEN', 'CORRECT', 'STATEMENT', 'EXPLANATION', 'PASSAGE']) {
      expect(prompt).toContain(`${field}_SENTINEL`);
    }

    expect(prompt.replace(/[A-Z]+_SENTINEL/g, '')).toBe(TEMPLATE);
  });

  /**
   * The vocabulary check survives, narrowed to terms with no ordinary-English reading. These
   * have zero legitimate hits on this deck and would each be a real finding.
   */
  it('never carries scheduler-only vocabulary', () => {
    const banned = /\b(ease factor|due date|event log|lapse count|review event|SM-2)\b/i;
    const offenders = prompts.filter((p) => banned.test(p.prompt));
    expect(offenders.map((o) => `${o.factId}[${o.formIndex}]`)).toEqual([]);
  });

  it('never carries a timestamp', () => {
    // Epoch milliseconds and ISO dates. Neither has any business in a card explanation.
    const offenders = prompts.filter((p) => /\b1[6-9]\d{11}\b|\d{4}-\d{2}-\d{2}T/.test(p.prompt));
    expect(offenders.map((o) => `${o.factId}[${o.formIndex}]`)).toEqual([]);
  });
});

describe('the handbook wins', () => {
  const prompts = everyPrompt();

  /**
   * The load-bearing assertion of the whole feature. Broken deliberately by dropping the
   * "which you must treat as true" clause from `buildExplainPrompt`, which failed on all
   * 1,588 prompts.
   */
  it('names the deck answer as authoritative in every prompt', () => {
    const offenders = prompts.filter((p) => !/which you must treat as true/.test(p.prompt));
    expect(offenders.map((o) => `${o.factId}[${o.formIndex}]`)).toEqual([]);
  });

  it('carries the deck answer itself in every prompt', () => {
    const offenders: string[] = [];
    for (const fact of ACTIVE) {
      fact.forms.forEach((form, formIndex) => {
        const prompt = buildExplainPrompt({
          question: form.question,
          options: fixedOptions(form.answers),
          chosen: form.answers.distractors[0],
          correct: form.answers.correct,
          statement: `${fact.question} — ${fact.answer}`,
        });
        if (!prompt.includes(form.answers.correct)) offenders.push(`${fact.id}[${formIndex}]`);
      });
    }
    expect(offenders).toEqual([]);
  });

  it('forbids correcting the source, in the system prompt', () => {
    expect(EXPLAIN_SYSTEM).toMatch(/the material is right and you are wrong/);
    expect(EXPLAIN_SYSTEM).toMatch(/Never correct it/);
  });

  /**
   * The concrete case D-034 names: the Council of Europe has 46 members, the handbook says
   * 47, and the deck says 47. Whatever else changes, the prompt for that card must hand the
   * model 47 as the answer and tell it 47 is true.
   */
  it('hands over 47 Council of Europe members as true', () => {
    const council = DECK.filter((f) =>
      /council of europe/i.test(`${f.question} ${f.answer}`),
    );
    expect(council.length).toBeGreaterThan(0);

    for (const fact of council) {
      for (const form of fact.forms) {
        const prompt = buildExplainPrompt({
          question: form.question,
          options: fixedOptions(form.answers),
          chosen: form.answers.distractors[0],
          correct: form.answers.correct,
          statement: `${fact.question} — ${fact.answer}`,
          explanation: flattenExplanation(fact.explanation),
        });
        expect(prompt).toContain(form.answers.correct);
        expect(prompt).toMatch(/which you must treat as true/);
      }
    }
  });
});

describe('flattenExplanation', () => {
  it('returns undefined for a fact with no panel', () => {
    expect(flattenExplanation(undefined)).toBeUndefined();
  });

  /**
   * `note` is where a fact records that the handbook disagrees with the present day. It is
   * the single most important field to pass through, because it is the thing the model would
   * otherwise "correct".
   */
  it('keeps the divergence note', () => {
    const text = flattenExplanation({
      lead: 'The Council of Europe has 47 member states.',
      note: 'The handbook says 47; the present figure is 46.',
    });
    expect(text).toContain('47');
    expect(text).toContain('the present figure is 46');
  });

  it('keeps every cluster member', () => {
    const text = flattenExplanation({
      lead: 'Lead.',
      cluster: [
        { label: 'Caesar, 55 BC', detail: 'raided and left' },
        { label: 'Claudius, AD 43', detail: 'conquered and stayed' },
      ],
    });
    expect(text).toContain('Caesar, 55 BC — raided and left');
    expect(text).toContain('Claudius, AD 43 — conquered and stayed');
  });
});

describe('the prompt keeps the reader s own option', () => {
  it('states the chosen option separately from the list', () => {
    const prompt = buildExplainPrompt({
      question: 'How many members does the Council of Europe have?',
      options: ['47', '27', '12', '46'],
      chosen: '46',
      correct: '47',
      statement: 'Council of Europe members — 47',
    });
    expect(prompt).toContain('The reader chose: 46');
    expect(prompt).toContain('you must treat as true: 47');
  });
});
