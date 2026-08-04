/**
 * The deck's build gate.
 *
 * Two jobs now that there is only one version of this app:
 *
 *   1. **Structure** — faults that are never acceptable at any baseline.
 *   2. **Statistics** — the ratchet. The option-shape tell was invisible until it was
 *      measured; these assertions make it impossible for it to become invisible again.
 *
 * A round-trip proof against the original `facts.js` used to live here. It did its job —
 * it proved the import was lossless, and it caught two duplicate facts and a batch of
 * badly-balanced option sets while the deck was being extended. It was removed with v0,
 * because pinning the deck to a file that no longer exists enforces sameness with a ghost.
 * What replaced it is `source` on every corrected fact: an audit trail of *why* an answer
 * is what it is, which is the part that was actually load-bearing.
 */

import { describe, expect, it } from 'vitest';

import { DECK, TOTAL_FACTS, TOTAL_FORMS } from '@/domain/deck';
import { factId, fixedOptions, recallForms } from '@/domain/deck/types';
import { DECK_BASELINE } from '@/domain/deck/baseline';
import {
  ambiguousSharedStems,
  duplicateCanonicalQuestions,
  effectiveNumericMiddleRankRate,
  factsBelowRecallBreadth,
  factsWithNoRecallForm,
  longestOptionCorrectRate,
  sharedFormsAcrossFacts,
  structuralFaults,
  unresolvedVerifyFlags,
} from '@/domain/deck/analysis';

describe('shape', () => {
  it('is the size it should be', () => {
    expect(TOTAL_FACTS).toBe(443);
    expect(TOTAL_FORMS).toBe(1327);
  });

  it('keeps ids unique and contiguous', () => {
    // Ids are the stable handle for a fact in the event log. A gap or a duplicate would
    // mean a review event pointing at the wrong fact, or at nothing.
    DECK.forEach((fact, i) => expect(fact.id).toBe(factId(i)));
    expect(new Set(DECK.map((f) => f.id)).size).toBe(DECK.length);
  });

  it('covers all five chapters', () => {
    const counts = DECK.reduce<Record<number, number>>((acc, f) => {
      acc[f.chapter] = (acc[f.chapter] ?? 0) + 1;
      return acc;
    }, {});
    expect(Object.keys(counts).sort()).toEqual(['1', '2', '3', '4', '5']);
    expect(Object.values(counts).reduce((a, b) => a + b, 0)).toBe(TOTAL_FACTS);
  });
});

describe('structure — never acceptable at any baseline', () => {
  it('has no structural faults', () => {
    expect(structuralFaults(DECK)).toEqual([]);
  });

  it('gives every fact at least one recall-usable form', () => {
    // Zero recall forms means the fact is unreachable outside multiple choice.
    expect(factsWithNoRecallForm(DECK)).toEqual([]);
  });

  it('never lets the correct answer appear among its own distractors', () => {
    for (const fact of DECK) {
      for (const form of fact.forms) {
        expect(form.answers.distractors).not.toContain(form.answers.correct);
      }
    }
  });

  it('keeps four distinct options on every form', () => {
    for (const fact of DECK) {
      for (const form of fact.forms) {
        expect(new Set(fixedOptions(form.answers)).size).toBe(4);
      }
    }
  });

  it('marks every form mcqOnly or leaves it recall-usable, never undefined', () => {
    for (const fact of DECK) {
      for (const form of fact.forms) expect(typeof form.mcqOnly).toBe('boolean');
    }
  });

  it('gives every fact a canonical question and answer', () => {
    for (const fact of DECK) {
      expect(fact.question.trim().length).toBeGreaterThan(0);
      expect(fact.answer.trim().length).toBeGreaterThan(0);
      expect(recallForms(fact).length).toBeGreaterThan(0);
    }
  });
});

describe('sourcing — R3', () => {
  it('cites a source for every fact whose answer was corrected or confirmed', () => {
    // Facts checked against the handbook carry a citation. A corrected fact without one is
    // an assertion, not a correction — and this deck has already shipped one wrong answer.
    const sourced = DECK.filter((f) => f.source);
    expect(sourced.length).toBeGreaterThanOrEqual(44);
    for (const fact of sourced) expect(fact.source!.trim().length).toBeGreaterThan(10);
  });

  it('does not add unresolved verify flags', () => {
    const unresolved = unresolvedVerifyFlags(DECK);
    expect(unresolved.length, `unresolved: ${unresolved.join(', ')}`).toBeLessThanOrEqual(
      DECK_BASELINE.unresolvedVerifyFlags,
    );
  });
});

describe('statistics — the ratchet (see baseline.ts)', () => {
  it('does not add duplicate canonical questions', () => {
    const dupes = duplicateCanonicalQuestions(DECK);
    expect(dupes.length, `duplicates: ${JSON.stringify(dupes)}`).toBeLessThanOrEqual(
      DECK_BASELINE.duplicateCanonicalQuestions,
    );
  });

  it('does not add ambiguous shared stems served as free recall', () => {
    const ambiguous = ambiguousSharedStems(DECK);
    expect(ambiguous.length, `ambiguous: ${JSON.stringify(ambiguous)}`).toBeLessThanOrEqual(
      DECK_BASELINE.ambiguousSharedStems,
    );
  });

  it('does not add identical forms shared across facts', () => {
    // One memorised sentence must not earn breadth credit on two different facts.
    const shared = sharedFormsAcrossFacts(DECK);
    expect(
      shared.length,
      `shared: ${shared.map((s) => s.factIds.join('=')).join(', ')}`,
    ).toBeLessThanOrEqual(DECK_BASELINE.sharedFormsAcrossFacts);
  });

  it('does not add facts pinned below the recall breadth gate', () => {
    const pinned = factsBelowRecallBreadth(DECK);
    expect(pinned.length, `facts with <2 recall forms: ${pinned.join(', ')}`).toBeLessThanOrEqual(
      DECK_BASELINE.factsBelowRecallBreadth,
    );
  });

  it('keeps the ON-SCREEN numeric tell near chance', () => {
    // The worst measurement this deck ever had: the correct answer was a middle value in
    // 91.4% of numeric forms against 50% by chance, so "pick a middle number" scored ~91%
    // knowing nothing. Generated distractors brought what a reader meets down to ~53%.
    const { rate, generatedForms, writtenForms } = effectiveNumericMiddleRankRate(DECK);
    expect(
      rate,
      `middle-value ${(rate * 100).toFixed(1)}% (${generatedForms} generated, ${writtenForms} as written)`,
    ).toBeLessThanOrEqual(DECK_BASELINE.effectiveNumericMiddleRankRate);
    expect(rate, 'below chance would be a tell in the other direction').toBeGreaterThan(0.45);
  });

  it('does not worsen the longest-option tell', () => {
    const { rate, longest, total } = longestOptionCorrectRate(DECK);
    expect(rate, `longest option correct in ${longest}/${total} forms`).toBeLessThanOrEqual(
      DECK_BASELINE.longestOptionCorrectRate,
    );
  });
});
