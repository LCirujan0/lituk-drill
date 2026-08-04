/**
 * Generated numeric distractors — D-014, closing L-002.
 *
 * The central assertion is rank uniformity. Everything else here protects it: a generator
 * that produces absurd options gets ignored, and a generator that cannot reach every rank
 * has merely swapped one tell for a narrower one.
 */

import { describe, expect, it } from 'vitest';

import { DECK } from '@/domain/deck';
import { fixedOptions } from '@/domain/deck/types';
import {
  achievableRanks,
  buildCandidates,
  deriveNumericAnswers,
  formatValue,
  generateOptions,
  parseOption,
  renderOption,
} from '@/domain/deck/numeric';
import { numericRuleFor, presentForm } from '@/domain/deck/presentation';
import { effectiveNumericMiddleRankRate, formsWithRestrictedRanks } from '@/domain/deck/analysis';
import { DECK_BASELINE } from '@/domain/deck/baseline';
import { mulberry32 } from '@/domain/scheduler/rng';

describe('reading a number out of an option', () => {
  it('keeps the surrounding words as a template', () => {
    expect(parseOption('About 10,000 years ago')).toEqual({
      value: 10000,
      template: 'About {v} years ago',
      format: 'comma',
    });
  });

  it('recognises currency and plain integers', () => {
    expect(parseOption('£10,000')?.format).toBe('gbp');
    expect(parseOption('84%')).toEqual({ value: 84, template: '{v}%', format: 'plain' });
    expect(parseOption('AD 43')).toEqual({ value: 43, template: 'AD {v}', format: 'plain' });
  });

  it('returns null when there is no number', () => {
    expect(parseOption('Tolerance of those with different faiths')).toBeNull();
  });

  it('round-trips a value back into its option text', () => {
    const parsed = parseOption('About 10,000 years ago')!;
    expect(renderOption({ kind: 'numeric', value: 10000, template: parsed.template, candidates: [], format: parsed.format }, 4000))
      .toBe('About 4,000 years ago');
    expect(formatValue(62, 'plain')).toBe('62');
    expect(formatValue(1_000_000, 'comma')).toBe('1,000,000');
  });
});

describe('deriving a rule', () => {
  const options = ['About 10,000 years ago', 'About 4,000 years ago', 'About 2,000 years ago', 'About 25,000 years ago'];

  it('takes its scale from the author’s own distractors', () => {
    const rule = deriveNumericAnswers(options, 0)!;
    expect(rule.value).toBe(10000);
    expect(rule.template).toBe('About {v} years ago');
    expect(rule.candidates).not.toContain(10000);
    // The originals are kept — they are the most plausible wrong answers available.
    expect(rule.candidates).toEqual(expect.arrayContaining([4000, 2000, 25000]));
  });

  it('refuses when the options are differently worded sentences', () => {
    // The number is incidental to the answer, so substituting into one template would
    // change what is being asked.
    expect(
      deriveNumericAnswers(
        ['It lasted 116 years', 'It lasted exactly 100 years', 'It lasted 130 years', 'It lasted 90 years'],
        0,
      ),
    ).toBeNull();
  });

  it('refuses when an option carries no number', () => {
    expect(deriveNumericAnswers(['1999', 'Devolution', '2001', '1997'], 0)).toBeNull();
  });

  it('never proposes a non-positive value where every original was positive', () => {
    // "About 0 years ago" is not a distractor, it is a bug on screen.
    const rule = deriveNumericAnswers(['About 6,000 years', 'About 2,000 years', 'About 4,000 years', 'About 12,000 years'], 0)!;
    expect(rule.candidates.every((c) => c > 0)).toBe(true);
  });

  it('keeps three candidates below the value even when the author’s distractors sit above it', () => {
    // AD 43 against 61, 122 and 410. Deriving the step from that spread alone gives 122,
    // nothing below survives, and the answer becomes the smallest option every single time
    // — a narrower tell than the one being removed, wearing the disguise of a fix.
    const rule = deriveNumericAnswers(['AD 43', 'AD 61', 'AD 122', 'AD 410'], 0)!;
    expect(rule.candidates.filter((c) => c < 43).length).toBeGreaterThanOrEqual(3);
    expect(achievableRanks(rule)).toEqual([0, 1, 2, 3]);
  });

  it('builds candidates on both sides of the value', () => {
    const candidates = buildCandidates(1215, [1264, 1295, 1189]);
    expect(candidates.filter((c) => c < 1215).length).toBeGreaterThanOrEqual(3);
    expect(candidates.filter((c) => c > 1215).length).toBeGreaterThanOrEqual(3);
    expect(candidates).not.toContain(1215);
  });
});

describe('generating options — the assertion this feature exists for', () => {
  const rule = deriveNumericAnswers(['1215', '1264', '1295', '1189'], 0)!;

  it('places the correct answer at every rank about equally often', () => {
    const counts = [0, 0, 0, 0];
    for (let i = 0; i < 8000; i++) counts[generateOptions(rule, mulberry32(i)).rank]++;

    for (const [rank, count] of counts.entries()) {
      const share = count / 8000;
      expect(share, `rank ${rank} share ${(share * 100).toFixed(1)}%`).toBeGreaterThan(0.2);
      expect(share, `rank ${rank} share ${(share * 100).toFixed(1)}%`).toBeLessThan(0.3);
    }
  });

  it('always includes the correct answer exactly once', () => {
    for (let i = 0; i < 500; i++) {
      const { options, correctIndex } = generateOptions(rule, mulberry32(i));
      expect(options).toHaveLength(4);
      expect(new Set(options).size).toBe(4);
      expect(options[correctIndex]).toBe(renderOption(rule, rule.value));
      expect(options.filter((o) => o === renderOption(rule, rule.value))).toHaveLength(1);
    }
  });

  it('reports a rank that matches where the value actually sits', () => {
    for (let i = 0; i < 200; i++) {
      const { options, correctIndex, rank } = generateOptions(rule, mulberry32(i + 999));
      expect(correctIndex).toBe(rank); // options are presented in ascending value order
      expect(options[rank]).toBe(renderOption(rule, rule.value));
    }
  });

  it('is deterministic for a given seed', () => {
    expect(generateOptions(rule, mulberry32(7))).toEqual(generateOptions(rule, mulberry32(7)));
    expect(generateOptions(rule, mulberry32(7)).options).not.toEqual(
      generateOptions(rule, mulberry32(8)).options,
    );
  });

  it('varies the option set, so there is no stable surface to memorise — R2', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 200; i++) seen.add(generateOptions(rule, mulberry32(i)).options.join('|'));
    expect(seen.size).toBeGreaterThan(20);
  });
});

describe('presentation', () => {
  it('randomises order for forms that cannot be generated', () => {
    // v0 presented stored order, where the answer sat at position 0 in 29.6% of forms.
    const form = DECK.find((f) => f.forms.some((x) => !numericRuleFor(x)))!.forms.find((x) => !numericRuleFor(x))!;
    const positions = new Set<number>();
    for (let i = 0; i < 60; i++) positions.add(presentForm(form, mulberry32(i)).correctIndex);
    expect(positions.size).toBeGreaterThan(1);
  });

  it('never loses or duplicates an author-written option when shuffling', () => {
    const form = DECK.find((f) => f.forms.some((x) => !numericRuleFor(x)))!.forms.find((x) => !numericRuleFor(x))!;
    const expected = [...fixedOptions(form.answers)].sort();
    for (let i = 0; i < 50; i++) {
      const { options, correctIndex } = presentForm(form, mulberry32(i));
      expect([...options].sort()).toEqual(expected);
      expect(options[correctIndex]).toBe(form.answers.correct);
    }
  });

  it('marks generated forms as generated', () => {
    const fact = DECK.find((f) => f.forms.some((x) => numericRuleFor(x)))!;
    const form = fact.forms.find((x) => numericRuleFor(x))!;
    expect(presentForm(form, mulberry32(1)).generated).toBe(true);
  });
});

describe('deck-wide effect — the ratchet', () => {
  const effective = effectiveNumericMiddleRankRate(DECK);

  it('reports what it did', () => {
    console.log(
      `  generated forms ${effective.generatedForms} · as-written ${effective.writtenForms}\n` +
        `  correct answer is a middle value on screen: ${(effective.rate * 100).toFixed(1)}%  (was 91.4%, chance 50%)`,
    );
    expect(effective.generatedForms).toBeGreaterThan(300);
  });

  it('brings the on-screen tell down to near chance', () => {
    expect(effective.rate).toBeLessThanOrEqual(DECK_BASELINE.effectiveNumericMiddleRankRate);
    expect(effective.rate).toBeGreaterThan(0.45); // below chance would be its own tell
  });

  it('leaves almost no form unable to reach every rank', () => {
    const restricted = formsWithRestrictedRanks(DECK);
    expect(restricted.length, `restricted: ${restricted.join(', ')}`).toBeLessThanOrEqual(
      DECK_BASELINE.restrictedRankForms,
    );
  });

  it('generates a rule for the great majority of all-numeric forms', () => {
    expect(effective.generatedForms / (effective.generatedForms + effective.writtenForms)).toBeGreaterThan(0.8);
  });
});
