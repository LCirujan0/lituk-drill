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
import { EXPLANATIONS } from '@/data/explanations';
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
    // Hardcoded on purpose: growing the deck should fail here and make someone confirm it
    // was deliberate, rather than sliding past unnoticed.
    expect(TOTAL_FACTS).toBe(528);
    expect(TOTAL_FORMS).toBe(1582);
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
    expect(sourced.length).toBeGreaterThanOrEqual(129);
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

describe('explanations', () => {
  it('attaches every authored explanation to a real fact', () => {
    // A typo in a fact id would silently write an explanation nobody ever sees.
    const orphans = Object.keys(EXPLANATIONS).filter((id) => !DECK.some((f) => f.id === id));
    expect(orphans, `explanations for facts that do not exist: ${orphans.join(', ')}`).toEqual([]);
  });

  it('attaches every entry in the map to its fact', () => {
    // Explanations arrive two ways now: the older facts take theirs from EXPLANATIONS at
    // assembly, the newer ones carry it inline. Both must end up on the fact — so assert
    // the map lands rather than comparing two counts that legitimately differ.
    for (const [id, text] of Object.entries(EXPLANATIONS)) {
      expect(DECK.find((f) => f.id === id)?.explanation, `${id} did not reach the deck`).toBe(text);
    }
  });

  it('covers every fact — no card answers into silence', () => {
    // Now at 528/528. The whole point of the feature is that answering teaches something,
    // so a fact without context is a card that says "Not quite." and nothing else. Adding a
    // fact without an explanation should fail the build rather than quietly leave a hole.
    const missing = DECK.filter((f) => !f.explanation).map((f) => f.id);
    expect(missing, `facts with no explanation: ${missing.join(', ')}`).toEqual([]);
  });

  it('writes context rather than restating the answer', () => {
    // An explanation that just repeats the answer teaches nothing that the card did not
    // already show, and would make the extra reading feel pointless.
    for (const fact of DECK) {
      if (!fact.explanation) continue;
      expect(fact.explanation.length, `${fact.id} explanation is too short to be context`).toBeGreaterThan(60);
      expect(fact.explanation.trim().toLowerCase()).not.toBe(fact.answer.trim().toLowerCase());
    }
  });

  // A check for "opens by repeating the answer verbatim" was written here and removed.
  //
  // It flagged 26 explanations, and every one inspected was good: "A constituency is a place,
  // not a group of supporters", "First past the post means whoever gets the most votes in a
  // constituency wins it, even without a majority". For a definitional fact, naming the term
  // and then defining it is the correct construction — you cannot explain what first past the
  // post means without saying it. The heuristic mistook the subject of a sentence for a
  // restatement.
  //
  // Setting the threshold to 26 would have encoded today's count and asserted nothing. The
  // test above — not equal to the answer, and long enough to be context — is the real check.
});
