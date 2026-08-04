/**
 * The deck's build gate. Three jobs:
 *
 *   1. Round-trip — prove the migration from v0's facts.js lost nothing, by
 *      reconstructing v0's exact positional representation and comparing it to the
 *      original file. Nobody can review 1,228 migrated forms by eye; this is what
 *      stands in for that review, so it is deliberately unforgiving.
 *
 *   2. Structure — faults that are never acceptable at any baseline.
 *
 *   3. Statistics — the ratchet. R1 was invisible until it was measured; these
 *      assertions make it impossible for it to become invisible again.
 *
 * The v0 file is read, never written. It stays deployed and in daily use (D-001).
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { DECK, MIGRATED_DECK, TOTAL_FACTS, TOTAL_FORMS } from '@/domain/deck';
import { factId, fixedOptions, recallForms } from '@/domain/deck/types';
import { DECK_BASELINE } from '@/domain/deck/baseline';
import {
  ambiguousSharedStems,
  duplicateCanonicalQuestions,
  factsBelowRecallBreadth,
  factsWithNoRecallForm,
  longestOptionCorrectRate,
  maxAnswerPositionRate,
  numericMiddleRankRate,
  sharedFormsAcrossFacts,
  structuralFaults,
  unresolvedVerifyFlags,
} from '@/domain/deck/analysis';

type V0Form = [string, string[], number, number];
type V0Fact = [string, number, number, string, string, V0Form[]];

const V0_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'facts.js');

function readV0Deck(): V0Fact[] {
  const src = readFileSync(V0_PATH, 'utf8').replace(/^const FACTS\s*=/m, 'globalThis.__V0__=');
  return new Function(`${src}; return globalThis.__V0__;`)() as V0Fact[];
}

/** Rebuild v0's positional representation from the migrated deck. */
function toV0Shape(): V0Fact[] {
  return MIGRATED_DECK.map((fact) => {
    const forms: V0Form[] = fact.forms.map((form) => {
      const options = [...form.answers.distractors];
      options.splice(form.v0CorrectIndex, 0, form.answers.correct);
      return [form.question, options, form.v0CorrectIndex, form.mcqOnly ? 1 : 0];
    });
    return [fact.tag, fact.chapter, fact.verify ? 1 : 0, fact.question, fact.answer, forms];
  });
}

describe('migration round-trip', () => {
  const v0 = readV0Deck();

  it('reproduces v0 exactly, fact for fact and form for form', () => {
    expect(toV0Shape()).toEqual(v0);
  });

  it('carries every fact and form across', () => {
    expect(TOTAL_FACTS).toBe(410);
    expect(TOTAL_FORMS).toBe(1228);
    expect(TOTAL_FACTS).toBe(v0.length);
    expect(TOTAL_FORMS).toBe(v0.reduce((n, f) => n + f[5].length, 0));
  });

  it('preserves v0 ordering — the S6 import contract', () => {
    // v0 keys its saved schedule by array index (S.f[i]). If DECK[i] is not the fact
    // that sat at v0 index i, six weeks of accumulated schedule lands on the wrong facts
    // on import, and nothing about the result would look wrong.
    DECK.forEach((fact, i) => expect(fact.id).toBe(factId(i)));
  });

  it('preserves form order within each fact — the ok[]/ls[] contract', () => {
    // v0 tracks per-form progress in parallel arrays indexed by form position.
    DECK.forEach((fact, i) => {
      fact.forms.forEach((form, j) => expect(form.question).toBe(v0[i][5][j][0]));
    });
  });

  it('matches the chapter counts documented in v0 README', () => {
    const counts = DECK.reduce<Record<number, number>>((acc, f) => {
      acc[f.chapter] = (acc[f.chapter] ?? 0) + 1;
      return acc;
    }, {});
    expect(counts).toEqual({ 1: 19, 2: 34, 3: 201, 4: 77, 5: 79 });
  });
});

describe('structure — never acceptable at any baseline', () => {
  it('has no structural faults', () => {
    expect(structuralFaults(DECK)).toEqual([]);
  });

  it('gives every fact at least one recall-usable form', () => {
    // Zero recall forms means the fact is unreachable in Cards mode entirely.
    expect(factsWithNoRecallForm(DECK)).toEqual([]);
  });

  it('never lets the correct answer appear among its own distractors', () => {
    for (const fact of DECK) {
      for (const form of fact.forms) {
        if (form.answers.kind !== 'fixed') continue;
        expect(form.answers.distractors).not.toContain(form.answers.correct);
      }
    }
  });

  it('marks every form mcqOnly or leaves it recall-usable, never undefined', () => {
    for (const fact of DECK) {
      for (const form of fact.forms) expect(typeof form.mcqOnly).toBe('boolean');
    }
  });
});

describe('statistics — the ratchet (see baseline.ts)', () => {
  it('does not add duplicate canonical questions', () => {
    const dupes = duplicateCanonicalQuestions(DECK);
    expect(
      dupes.length,
      `duplicate canonical questions: ${JSON.stringify(dupes)}`,
    ).toBeLessThanOrEqual(DECK_BASELINE.duplicateCanonicalQuestions);
  });

  it('does not add ambiguous shared stems served as free recall', () => {
    const ambiguous = ambiguousSharedStems(DECK);
    expect(
      ambiguous.length,
      `ambiguous shared stems: ${JSON.stringify(ambiguous)}`,
    ).toBeLessThanOrEqual(DECK_BASELINE.ambiguousSharedStems);
  });

  it('does not add identical forms shared across facts', () => {
    // One memorised sentence must not earn breadth credit on two different facts — that is
    // the specific thing the breadth gate exists to prevent. f193/f352 is the live instance.
    const shared = sharedFormsAcrossFacts(DECK);
    expect(
      shared.length,
      `forms shared across facts: ${shared.map((s) => s.factIds.join('=')).join(', ')}`,
    ).toBeLessThanOrEqual(DECK_BASELINE.sharedFormsAcrossFacts);
  });

  it('does not add facts pinned below the recall breadth gate', () => {
    const pinned = factsBelowRecallBreadth(DECK);
    expect(pinned.length, `facts with <2 recall forms: ${pinned.join(', ')}`).toBeLessThanOrEqual(
      DECK_BASELINE.factsBelowRecallBreadth,
    );
  });

  it('does not add unresolved verify flags', () => {
    const unresolved = unresolvedVerifyFlags(DECK);
    expect(unresolved.length, `unresolved: ${unresolved.join(', ')}`).toBeLessThanOrEqual(
      DECK_BASELINE.unresolvedVerifyFlags,
    );
  });

  it('does not worsen the numeric bracketing tell', () => {
    // The worst measurement in the deck. Chance is 0.50; v0 shipped 0.914.
    // "Pick a middle number" scores 91% on 373 forms while knowing nothing.
    const { rate, middle, total } = numericMiddleRankRate(DECK);
    expect(rate, `correct answer is a middle value in ${middle}/${total} numeric forms`).toBeLessThanOrEqual(
      DECK_BASELINE.numericMiddleRankRate,
    );
  });

  it('does not worsen the longest-option tell', () => {
    const { rate, longest, total } = longestOptionCorrectRate(DECK);
    expect(rate, `longest option correct in ${longest}/${total} forms`).toBeLessThanOrEqual(
      DECK_BASELINE.longestOptionCorrectRate,
    );
  });

  it('does not worsen stored answer-position skew', () => {
    const { rate, counts } = maxAnswerPositionRate(MIGRATED_DECK);
    expect(rate, `answer positions: ${counts.join(' / ')}`).toBeLessThanOrEqual(
      DECK_BASELINE.maxAnswerPositionRate,
    );
  });
});

describe('recall-mode reachability', () => {
  it('serves at least one non-mcqOnly form for every fact', () => {
    for (const fact of DECK) expect(recallForms(fact).length).toBeGreaterThan(0);
  });

  it('keeps four distinct options on every fixed form', () => {
    for (const fact of DECK) {
      for (const form of fact.forms) {
        if (form.answers.kind !== 'fixed') continue;
        expect(new Set(fixedOptions(form.answers)).size).toBe(4);
      }
    }
  });
});
