/**
 * The deck's known defects, as numbers, on the day v1 started. A ratchet.
 *
 * Every value here is a *ceiling*. The test asserts the deck is no worse than this and
 * fails if any figure rises, so a newly-added question cannot quietly reintroduce a
 * problem — but CI is green today, on a deck that genuinely has these defects. The
 * alternative (assert the ideal, start red) trains everyone to ignore a red build,
 * which is worse than the defects.
 *
 * **Tightening these numbers is the work.** Each line names the finding that closes it.
 * A value reaching its target gets its ceiling lowered in the same commit, or the
 * ratchet is decoration.
 *
 * Measured 4 August 2026 against v0's facts.js — 410 facts, 1,228 forms.
 */

export interface DeckBaseline {
  /** Facts sharing an identical canonical question. Today: f193/f352, both "…first met in which year" -> 1999. */
  readonly duplicateCanonicalQuestions: number;
  /** A stem shared across facts with different correct answers, served as free recall. Today: f205/f206. */
  readonly ambiguousSharedStems: number;
  /**
   * Identical form text serving two different facts with the same answer. Today: f193/f352,
   * "The Scottish Parliament and the Welsh Assembly first met in which year?". Caught by
   * neither of the checks above — one wants identical canonical questions, the other wants
   * differing answers — which is exactly why it needed its own.
   */
  readonly sharedFormsAcrossFacts: number;
  /** Facts with fewer than two recall-usable forms — pinned below the breadth gate in Cards-only use. */
  readonly factsBelowRecallBreadth: number;
  /** Facts with no recall-usable form at all. Already zero; must stay zero. */
  readonly factsWithNoRecallForm: number;
  /**
   * Rate at which the correct answer is a middle value among four numeric options.
   * Chance is 0.50. Today 341/373 = 0.9142 — the single worst measurement in the deck,
   * and the reason a readiness number built on multiple choice would have been fiction.
   * Closed by D-014's generated distractors; target 0.55.
   */
  readonly numericMiddleRankRate: number;
  /**
   * The number that matters after D-014: how often the correct answer would be a middle
   * value **on screen**, across every all-numeric form, using whichever path the reader
   * actually gets — generated for the 317 forms that carry a derivable rule, as written for
   * the 56 that cannot. Chance is 0.50.
   */
  readonly effectiveNumericMiddleRankRate: number;
  /**
   * Forms whose candidate pool cannot place the answer at all four ranks. Each is a small
   * residual tell of its own — the answer is never the largest option, say — so this is
   * tracked separately rather than hiding inside the aggregate.
   */
  readonly restrictedRankForms: number;
  /**
   * Rate at which the correct answer is the longest option, among forms with a unique
   * longest. Chance is 0.25. Today 301/749 = 0.4019. Target 0.30.
   */
  readonly longestOptionCorrectRate: number;
  /** Facts still carrying an unresolved verify flag. R3. Must reach 0 before the launch gate. */
  readonly unresolvedVerifyFlags: number;
  /**
   * Distinct four-digit years named in an explanation that appear nowhere in the handbook.
   *
   * Ratcheted, where the companion name check is only a report, because a year has almost no
   * false-positive room: it is in the book or it is not. Every one of today's was checked by
   * hand against the text before this ceiling was set — see `vocabulary.ts` for why the check
   * exists at all, and L-023 for what the first run found.
   */
  readonly explanationYearsOffSource: number;
}

export const DECK_BASELINE: DeckBaseline = {
  duplicateCanonicalQuestions: 0,
  ambiguousSharedStems: 1,
  // f193/f352 and f205/f206. The second is also counted by ambiguousSharedStems — the two
  // measure different properties of the same pair (shared text, versus a shared stem with
  // conflicting answers) and the overlap is deliberate.
  sharedFormsAcrossFacts: 2,
  factsBelowRecallBreadth: 6,
  factsWithNoRecallForm: 0,
  // DIAGNOSTIC ONLY — no longer a build gate, and deliberately not driven down.
  //
  // It measures the STORED options, which for 332 of 390 numeric forms are never presented:
  // generation builds four fresh values at display time. Worse, driving it down would be
  // actively harmful. `buildCandidates` infers its step from the spread of the authored
  // distractors, so distractors that bracket the true value are what give the candidate pool
  // depth on both sides — the thing that makes uniform rank achievable. High stored
  // bracketing is now a feature. `effectiveNumericMiddleRankRate` is the gate.
  numericMiddleRankRate: 0.92,
  // What a reader now actually meets: 0.914 -> 0.527, against a chance floor of 0.50. The
  // remaining 2.7 points are entirely the 56 as-written forms, whose own middle rate is
  // about 68% — lower than the deck's, because differently-worded options were never
  // bracketing a value in the first place. Closing the rest means rewriting those by hand.
  effectiveNumericMiddleRankRate: 0.53,
  restrictedRankForms: 1,
  // Re-derived 4 Aug 2026 when the metric changed definition, NOT loosened to pass a build.
  // It now counts only forms presented as written; the 15 all-numeric forms that carry a
  // generation rule are excluded, because their stored text never reaches a screen. That
  // moved the denominator 749 -> 734 and the rate 0.4032 -> 0.4074. None of the three
  // corrected facts contributes: all of their forms are generated, so all are excluded.
  // Tightened 0.408 -> 0.390 after the D-024 additions: their option sets were deliberately
  // length-balanced (one distractor per form extended so the answer is never uniquely
  // longest), which pulled the deck-wide figure down from 40.7% to 38.8%.
  longestOptionCorrectRate: 0.39,
  // Was 12. Eleven resolved against the handbook on 4 August 2026 — eight confirmed correct,
  // three corrected (see divergences.ts). Only f213 remains: the KoLL age exemption is a Home
  // Office rule and does not appear in the handbook, so this source cannot settle it.
  unresolvedVerifyFlags: 1,
  // 1337, 1290, 1653, 1919, 1985, 1971, AD 122, AD 597 — eight distinct years, each grepped
  // against the handbook text by hand. SIX of them are worse than an explanation defect: the
  // ANSWER is off-source too (L-023).
  //
  // Was 6. The two era years appeared when the check learned to read `AD 122` and `55 BC`; a
  // rule written for four digits had been walking straight past three. This is a ceiling
  // raised because DETECTION improved, not because the deck got worse — the defects were
  // always there. Target 0, in the sourcing pass.
  explanationYearsOffSource: 8,
};

/** Where each ceiling is headed. Not asserted — a target that fails the build is just a ceiling. */
export const DECK_TARGETS: Partial<DeckBaseline> = {
  duplicateCanonicalQuestions: 0,
  ambiguousSharedStems: 0,
  sharedFormsAcrossFacts: 0,
  factsBelowRecallBreadth: 0,
  // The stored options are deliberately never "fixed" — generation happens on top of them,
  // so this one has no target. `effectiveNumericMiddleRankRate` is the one to drive down.
  effectiveNumericMiddleRankRate: 0.52,
  restrictedRankForms: 0,
  longestOptionCorrectRate: 0.3,
  unresolvedVerifyFlags: 0,
  explanationYearsOffSource: 0,
};
