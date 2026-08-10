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

import { stale, undeclared } from '@/domain/deck/contradictions';
import { recallPromptsNeedingOptions } from '@/domain/deck/analysis';
import { ACTIVE, ALL_FACTS, DECK, RETIRED, TOTAL_FACTS, TOTAL_FORMS } from '@/domain/deck';
import { factId, fixedOptions, recallForms } from '@/domain/deck/types';
import { DECK_BASELINE } from '@/domain/deck/baseline';
import { explanationText, strayYears, vocabularyReport, vocabularyTotals } from '@/domain/deck/vocabulary';
import { EXPLANATIONS } from '@/data/explanations';
import {
  ambiguousSharedStems,
  distractorsContradictingCanonical,
  duplicateCanonicalQuestions,
  effectiveNumericMiddleRankRate,
  factsBelowRecallBreadth,
  factsWithNoRecallForm,
  identicalOptionSetsWithinFact,
  longestOptionCorrectRate,
  repeatedDistractorsWithinFact,
  selfContradictingForms,
  sharedFormsAcrossFacts,
  structuralFaults,
  unresolvedVerifyFlags,
} from '@/domain/deck/analysis';

describe('shape', () => {
  it('is the size it should be', () => {
    // Hardcoded on purpose: changing the deck's size should fail here and make someone
    // confirm it was deliberate, rather than sliding past unnoticed.
    //
    // Two numbers, because there are now two. ACTIVE is what is drilled; DECK is the id
    // space and keeps the retired facts, so that every historical review event still points
    // at the question it was answering (R-4).
    expect(TOTAL_FACTS, 'facts drilled').toBe(530);
    expect(TOTAL_FORMS, 'phrasings drilled').toBe(1588);
    expect(ALL_FACTS, 'ids in use, retired included').toBe(559);
    expect(RETIRED).toHaveLength(29);
  });

  it('gives every retired fact a reason, and keeps it out of the deck that is drilled', () => {
    // A fact pulled without a written reason is indistinguishable from one deleted by
    // accident, and the reason is the only record of a decision taken against the handbook.
    for (const fact of RETIRED) {
      expect(fact.retired!.length, `${fact.id} retired with no reason`).toBeGreaterThan(30);
      expect(ACTIVE.some((f) => f.id === fact.id), `${fact.id} is still being drilled`).toBe(false);
    }
  });

  it('keeps ids unique and contiguous', () => {
    // Ids are the stable handle for a fact in the event log. A gap or a duplicate would
    // mean a review event pointing at the wrong fact, or at nothing.
    DECK.forEach((fact, i) => expect(fact.id).toBe(factId(i)));
    expect(new Set(DECK.map((f) => f.id)).size).toBe(DECK.length);
  });

  it('covers all five chapters', () => {
    const counts = ACTIVE.reduce<Record<number, number>>((acc, f) => {
      acc[f.chapter] = (acc[f.chapter] ?? 0) + 1;
      return acc;
    }, {});
    expect(Object.keys(counts).sort()).toEqual(['1', '2', '3', '4', '5']);
    expect(Object.values(counts).reduce((a, b) => a + b, 0)).toBe(TOTAL_FACTS);
  });
});

describe('structure — never acceptable at any baseline', () => {
  it('has no structural faults', () => {
    expect(structuralFaults(ACTIVE)).toEqual([]);
  });

  it('gives every fact at least one recall-usable form', () => {
    // Zero recall forms means the fact is unreachable outside multiple choice.
    expect(factsWithNoRecallForm(ACTIVE)).toEqual([]);
  });

  it('never lets the correct answer appear among its own distractors', () => {
    for (const fact of ACTIVE) {
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
    //
    // 129 -> 486 when the 399 inherited facts were checked mechanically against the handbook
    // text rather than by eye: 346 of them corroborated. The 53 that did not are with the
    // owner. This is a floor, so it ratchets — sourcing can only go up.
    const sourced = DECK.filter((f) => f.source);
    expect(sourced.length).toBeGreaterThanOrEqual(486);
    for (const fact of sourced) expect(fact.source!.trim().length).toBeGreaterThan(10);
  });

  it('does not add unresolved verify flags', () => {
    const unresolved = unresolvedVerifyFlags(ACTIVE);
    expect(unresolved.length, `unresolved: ${unresolved.join(', ')}`).toBeLessThanOrEqual(
      DECK_BASELINE.unresolvedVerifyFlags,
    );
  });
});

/**
 * Every measurement below runs over ACTIVE, never DECK.
 *
 * A ratchet exists to describe what a reader meets. Twenty-six retired facts are never
 * served, so measuring them reports a deck nobody is drilling — and they skew the numbers in
 * the flattering direction, because most were retired for being bad. Switching the source
 * moved the longest-option tell 0.3124 -> 0.3092 and the on-screen numeric tell
 * 0.5277 -> 0.5249: small, but in the direction that says the old figures were wrong.
 *
 * The id-space contracts (contiguity, uniqueness, orphaned explanations) stay on DECK,
 * because those are properties of the id space itself.
 */
describe('statistics — the ratchet (see baseline.ts)', () => {
  it('does not add duplicate canonical questions', () => {
    const dupes = duplicateCanonicalQuestions(ACTIVE);
    expect(dupes.length, `duplicates: ${JSON.stringify(dupes)}`).toBeLessThanOrEqual(
      DECK_BASELINE.duplicateCanonicalQuestions,
    );
  });

  it('does not add ambiguous shared stems served as free recall', () => {
    const ambiguous = ambiguousSharedStems(ACTIVE);
    expect(ambiguous.length, `ambiguous: ${JSON.stringify(ambiguous)}`).toBeLessThanOrEqual(
      DECK_BASELINE.ambiguousSharedStems,
    );
  });

  it('does not add identical forms shared across facts', () => {
    // One memorised sentence must not earn breadth credit on two different facts.
    const shared = sharedFormsAcrossFacts(ACTIVE);
    expect(
      shared.length,
      `shared: ${shared.map((s) => s.factIds.join('=')).join(', ')}`,
    ).toBeLessThanOrEqual(DECK_BASELINE.sharedFormsAcrossFacts);
  });

  it('does not add facts pinned below the recall breadth gate', () => {
    const pinned = factsBelowRecallBreadth(ACTIVE);
    expect(pinned.length, `facts with <2 recall forms: ${pinned.join(', ')}`).toBeLessThanOrEqual(
      DECK_BASELINE.factsBelowRecallBreadth,
    );
  });

  it('keeps the ON-SCREEN numeric tell near chance', () => {
    // The worst measurement this deck ever had: the correct answer was a middle value in
    // 91.4% of numeric forms against 50% by chance, so "pick a middle number" scored ~91%
    // knowing nothing. Generated distractors brought what a reader meets down to ~53%.
    const { rate, generatedForms, writtenForms } = effectiveNumericMiddleRankRate(ACTIVE);
    expect(
      rate,
      `middle-value ${(rate * 100).toFixed(1)}% (${generatedForms} generated, ${writtenForms} as written)`,
    ).toBeLessThanOrEqual(DECK_BASELINE.effectiveNumericMiddleRankRate);
    expect(rate, 'below chance would be a tell in the other direction').toBeGreaterThan(0.45);
  });

  // ── option CONTENT (L-033) ────────────────────────────────────────────────────────────
  // Everything above measures option shape. For a week the deck was green on all of it while
  // eight facts offered, as a wrong answer, something another phrasing of the same fact marked
  // correct. Nothing had ever read what a distractor says.

  it('never offers as wrong an answer another form of the same fact marks right', () => {
    // The worst defect available: the card asserts a true thing is false, and the schedule
    // then installs that as faithfully as it installs the answer.
    //
    // **Asserted at zero rather than ratcheted**, and the zero is over the UNDECLARED hits.
    // Reading all twelve of the original flags found eleven that were correct design — two
    // forms of a fact usually ask different questions, and a negative stem has true statements
    // as its distractors by construction. A ceiling of eleven would let the twelfth real defect
    // arrive as "no regression". So each legitimate pair is declared with its reason in
    // `contradictions.ts`, and anything not on that list fails here.
    const bad = undeclared(selfContradictingForms(ACTIVE));
    expect(bad.length, `undeclared self-contradiction: ${bad.join(', ')}`).toBe(0);
  });

  it('carries no exemption for a contradiction the deck no longer produces', () => {
    // The half that makes the list a control rather than a suppression. A form edited so its
    // contradiction disappears leaves a declaration behind, and the next real defect on that
    // fact could then land under a key that reads as already reviewed.
    const dead = stale(selfContradictingForms(ACTIVE));
    expect(dead.length, `stale declaration: ${dead.join(', ')}`).toBe(0);
  });

  it('never serves a stem that needs options on screen as a free-recall prompt', () => {
    // `mcqOnly` exists for exactly this, and 37 forms carried a dangling referent — "which of
    // these", "which statement", "which set is correct" — while being served as recall. In
    // recall mode the reader sees the stem alone, reveals, and self-grades; recall is the ONLY
    // evidence D-013's recall figure accepts, so these fed noise into the one number designed
    // to be clean. 30 were flipped at no cost to recall breadth.
    //
    // The EXACT SET is asserted, not a count. A count of seven would pass if one were fixed and
    // a new one introduced the same day — the failure a bare ratchet always has.
    expect(recallPromptsNeedingOptions(ACTIVE)).toEqual([
      ...DECK_BASELINE.recallPromptsNeedingOptions,
    ]);
  });

  it("never offers the fact's own canonical answer as a distractor", () => {
    const bad = distractorsContradictingCanonical(ACTIVE);
    expect(bad.length, `contradicts canonical: ${bad.join(', ')}`).toBeLessThanOrEqual(
      DECK_BASELINE.distractorsContradictingCanonical,
    );
  });

  it('does not add facts whose forms present identical option sets', () => {
    // Only the stem moved, so "proven on two phrasings" is a weaker claim than it reads.
    const bad = identicalOptionSetsWithinFact(ACTIVE);
    expect(bad.length, `identical option sets: ${bad.slice(0, 20).join(', ')}`).toBeLessThanOrEqual(
      DECK_BASELINE.identicalOptionSetsWithinFact,
    );
  });

  it('does not add repeated distractors across the forms of one fact', () => {
    const bad = repeatedDistractorsWithinFact(ACTIVE);
    expect(bad.length, `repeated distractors: ${bad.length}`).toBeLessThanOrEqual(
      DECK_BASELINE.repeatedDistractorsWithinFact,
    );
  });

  it('does not worsen the longest-option tell', () => {
    const { rate, longest, total } = longestOptionCorrectRate(ACTIVE);
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
    // ACTIVE, not DECK: a retired fact is never served, so it needs no panel. Asserting over
    // the id space would demand explanations for questions nobody will ever be asked.
    const missing = ACTIVE.filter((f) => !f.explanation).map((f) => f.id);
    expect(missing, `facts with no explanation: ${missing.join(', ')}`).toEqual([]);
  });

  it('writes context rather than restating the answer', () => {
    // An explanation that just repeats the answer teaches nothing that the card did not
    // already show, and would make the extra reading feel pointless.
    for (const fact of ACTIVE) {
      if (!fact.explanation) continue;
      const text = explanationText(fact.explanation);
      expect(text.length, `${fact.id} explanation is too short to be context`).toBeGreaterThan(60);
      expect(text.trim().toLowerCase()).not.toBe(fact.answer.trim().toLowerCase());
    }
  });

  it('follows the skeleton — a lead on every panel, and no half-written cluster line', () => {
    // `docs/EXPLANATIONS.md`: the slots are always in the same order, and a cluster entry
    // ALWAYS carries its distinguishing detail. A label on its own is the failure mode the
    // whole cluster idea turns on — "Caesar 55 BC, Claudius AD 43" attaches a second
    // competing date to one cue, which is interference. The detail is what makes it
    // discrimination instead, so a missing one is a defect, not an omission.
    for (const fact of DECK) {
      if (!fact.explanation) continue;
      expect(fact.explanation.lead.trim().length, `${fact.id} has no lead`).toBeGreaterThan(0);
      for (const entry of fact.explanation.cluster ?? []) {
        expect(entry.label.trim().length, `${fact.id} cluster entry has no label`).toBeGreaterThan(0);
        expect(
          entry.detail.trim().length,
          `${fact.id} cluster names "${entry.label}" without saying what tells it apart`,
        ).toBeGreaterThan(0);
      }
      expect(
        (fact.explanation.cluster ?? []).length,
        `${fact.id} cluster is long enough to be a list rather than a story`,
      ).toBeLessThanOrEqual(5);
    }
  });

  it('names no year the handbook does not contain', () => {
    // The defect this exists for: an explanation asserted Baird demonstrated television in
    // 1924. The handbook says only "in the 1920s" and 1924 is nowhere in it. It was caught by
    // someone thinking to look, which is not a mechanism.
    //
    // A drill app installs whatever is put in front of it. An off-source date is not merely
    // wasted — it is learned as reliably as the answer, and then competes with it.
    //
    // Ratcheted, unlike the companion NAME check, because a four-digit year is in the book or
    // it is not. `npm run deck:vocab` prints both halves.
    const years = strayYears(vocabularyReport(DECK));
    expect(
      years.length,
      `years named in explanations but absent from the handbook: ${years.join(', ')}`,
    ).toBeLessThanOrEqual(DECK_BASELINE.explanationYearsOffSource);
  });

  it('reports capitalised names the handbook does not contain, without gating on them', () => {
    // Deliberately NOT a ratchet. The name half over-flags — plurals and adjectives of real
    // handbook words ("Romans" for "Roman") land in it — so a ceiling here would encode
    // today's noise and then have to be raised, which is how a ratchet stops meaning
    // anything. It is a report a human reads, and this test exists to keep it runnable and
    // to put the number in front of anyone watching CI.
    const totals = vocabularyTotals(vocabularyReport(DECK));
    expect(totals.names).toBeTypeOf('number');
    console.log(
      `[vocabulary] ${totals.names} capitalised names in explanations are absent from the ` +
        `handbook, across ${totals.facts} facts. Read them: npm run deck:vocab`,
    );
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
