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
import { divergedFactIds, divergenceFor } from '@/domain/deck/divergences';
import {
  ambiguousSharedStems,
  duplicateCanonicalQuestions,
  factsBelowRecallBreadth,
  factsWithNoRecallForm,
  longestOptionCorrectRate,
  maxAnswerPositionRate,
  effectiveNumericMiddleRankRate,
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

  it('reproduces v0 exactly, except where a divergence is declared', () => {
    // The guarantee is that no content changes by accident. A fact may differ from v0 only
    // if it is listed in divergences.ts with a reason and a source; anything else that
    // differs fails here, which is the whole point of keeping this test after the deck
    // started being corrected.
    const rebuilt = toV0Shape();
    const declared = divergedFactIds();

    const undeclared: string[] = [];
    rebuilt.forEach((fact, i) => {
      const id = factId(i);
      if (declared.has(id)) return;
      if (JSON.stringify(fact) !== JSON.stringify(v0[i])) undeclared.push(id);
    });

    expect(
      undeclared,
      `these facts differ from v0 but are not declared in divergences.ts: ${undeclared.join(', ')}`,
    ).toEqual([]);
  });

  it('has no stale divergence declarations', () => {
    // A declaration for a fact that no longer differs is worse than none: it implies a
    // correction was made when it was not, and it silently exempts that fact from the check.
    const rebuilt = toV0Shape();
    const stale = [...divergedFactIds()].filter((id) => {
      const i = Number.parseInt(id.slice(1), 10);
      return JSON.stringify(rebuilt[i]) === JSON.stringify(v0[i]);
    });

    expect(stale, `declared as diverged but identical to v0: ${stale.join(', ')}`).toEqual([]);
  });

  it('gives every diverged fact a source citation', () => {
    // R3: a corrected fact without a citation is an assertion, not a correction.
    for (const id of divergedFactIds()) {
      const fact = DECK.find((f) => f.id === id)!;
      expect(fact.source, `${id} diverges from v0 but carries no source`).toBeTruthy();
      expect(divergenceFor(id)?.change, `${id} has no stated reason`).toBeTruthy();
    }
  });

  it('carries every migrated fact and form across', () => {
    expect(MIGRATED_DECK.length).toBe(410);
    expect(MIGRATED_DECK.reduce((n, f) => n + f.forms.length, 0)).toBe(1228);
    expect(MIGRATED_DECK.length).toBe(v0.length);
  });

  it('keeps additions out of the migrated set', () => {
    // Facts added after the migration have no v0 counterpart. Letting them into
    // MIGRATED_DECK would make the round-trip proof compare against nothing and quietly
    // stop meaning anything.
    expect(TOTAL_FACTS).toBeGreaterThan(MIGRATED_DECK.length);
    expect(MIGRATED_DECK.every((f) => Number.parseInt(f.id.slice(1), 10) < 410)).toBe(true);
  });

  it('preserves v0 ordering and keeps ids contiguous — the S6 import contract', () => {
    // v0 keys its saved schedule by array index (S.f[i]). If DECK[i] is not the fact
    // that sat at v0 index i, six weeks of accumulated schedule lands on the wrong facts
    // on import, and nothing about the result would look wrong. Additions continue the
    // sequence, so a gap would break the same contract.
    DECK.forEach((fact, i) => expect(fact.id).toBe(factId(i)));
    expect(TOTAL_FORMS).toBe(DECK.reduce((n, f) => n + f.forms.length, 0));
  });

  it('preserves form order within each fact — the ok[]/ls[] contract', () => {
    // v0 tracks per-form progress in parallel arrays indexed by form position, so the COUNT
    // and ORDER of forms is the contract even where a fact's wording has been corrected.
    const declared = divergedFactIds();
    MIGRATED_DECK.forEach((fact, i) => {
      expect(fact.forms.length, `${fact.id} changed its number of forms`).toBe(v0[i][5].length);
      if (declared.has(fact.id)) return; // wording may legitimately differ; see divergences.ts
      fact.forms.forEach((form, j) => expect(form.question).toBe(v0[i][5][j][0]));
    });
  });

  it('matches the chapter counts documented in v0 README', () => {
    const counts = MIGRATED_DECK.reduce<Record<number, number>>((acc, f) => {
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

  it('keeps the ON-SCREEN numeric tell near chance', () => {
    // This replaced a ratchet on the STORED options (v0 shipped 0.914 against 0.50 by
    // chance). That measure is no longer a gate, for a reason that only became clear once
    // generation existed: `buildCandidates` derives its step from the spread of the authored
    // distractors, so distractors that bracket the true value are what give the candidate
    // pool depth on both sides — which is precisely what makes uniform rank achievable.
    // Driving the stored number down would now DEGRADE generation while improving nothing a
    // reader ever sees. It stays in `deck:report` as a diagnostic; the gate is what reaches
    // the screen.
    const { rate, generatedForms, writtenForms } = effectiveNumericMiddleRankRate(DECK);
    expect(
      rate,
      `on screen the answer is a middle value ${(rate * 100).toFixed(1)}% of the time ` +
        `(${generatedForms} generated, ${writtenForms} as written)`,
    ).toBeLessThanOrEqual(DECK_BASELINE.effectiveNumericMiddleRankRate);
    expect(rate, 'below chance would be a tell in the other direction').toBeGreaterThan(0.45);
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
