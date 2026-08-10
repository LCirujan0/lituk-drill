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
  /**
   * Forms offering as a distractor something another form of the same fact marks correct.
   * The deck asserting that a true thing is false. Target 0 and nothing else is defensible.
   */
  readonly selfContradictingForms: number;
  /** Distractors that are the fact's own canonical answer. Same defect, blunter. Target 0. */
  readonly distractorsContradictingCanonical: number;
  /** Facts where two forms present the identical four options — only the stem moved. */
  readonly identicalOptionSetsWithinFact: number;
  /** Distractor strings repeated across forms of one fact. R2's surface, inside the mechanism. */
  readonly repeatedDistractorsWithinFact: number;
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
  //
  // Tightened 0.53 -> 0.527 on 10 Aug 2026, when the measurement moved from DECK to ACTIVE.
  // That is not a content improvement: the retired forms were simply worse than average and
  // were flattering the figure. Re-derived, not loosened, and the direction is the honest one.
  effectiveNumericMiddleRankRate: 0.527,
  // Was 1 — L-012, the £3,000 small-claims form whose answer could never be the largest
  // option. It is 0 today over both DECK and ACTIVE. At zero this stops being a ratchet and
  // becomes an assertion: any form that cannot place its answer at all four ranks now fails.
  restrictedRankForms: 0,
  // Re-derived 4 Aug 2026 when the metric changed definition, NOT loosened to pass a build.
  // It now counts only forms presented as written; the 15 all-numeric forms that carry a
  // generation rule are excluded, because their stored text never reaches a screen. That
  // moved the denominator 749 -> 734 and the rate 0.4032 -> 0.4074. None of the three
  // corrected facts contributes: all of their forms are generated, so all are excluded.
  // Tightened 0.408 -> 0.390 after the D-024 additions: their option sets were deliberately
  // length-balanced (one distractor per form extended so the answer is never uniquely
  // longest), which pulled the deck-wide figure down from 40.7% to 38.8%.
  // Tightened 0.39 -> 0.315 on 10 Aug 2026. The ceiling had been left eight points above the
  // actual figure (0.312), which is a ratchet that cannot catch anything: two hundred forms
  // could have regressed without failing a build. Found by reading the report against the
  // baseline rather than by any check — the ratchet had no ratchet.
  // Tightened 0.315 -> 0.30 on 10 Aug 2026: the chapter-3 audit brought the deck to 0.299 and
  // it has therefore REACHED ITS TARGET, so the ceiling comes down in the same commit or the
  // ratchet is decoration. This is L-003 closed. Chance is 0.25 and the remaining four points
  // are the honest cost of writing a precise answer next to three shorter wrong ones.
  longestOptionCorrectRate: 0.3,
  // Was 12, then 1. Eleven resolved against the handbook on 4 August 2026 — eight confirmed
  // correct, three corrected (see divergences.ts). The last, f213, was the KoLL age exemption:
  // a Home Office rule that does not appear in the handbook at all, so this source could never
  // settle it either way. Retired on 10 August 2026 rather than left amber indefinitely, which
  // takes this to zero and clears launch-gate item 2.
  unresolvedVerifyFlags: 0,
  // ZERO. Was 8, and the drop is real rather than definitional in all but one respect.
  //
  // Four of the eight went when the facts that carried them were retired — the handbook could
  // not answer those questions at all. The rest went in the rewrite. The one definitional
  // change: a year the fact's OWN ANSWER asserts is now exempt, because the handbook this
  // project can read is a proxy for the owner's 2026 edition and is known-wrong in named
  // places (D-031). Flagging an explanation for repeating its own card's answer reported a
  // fact-level question as an explanation defect and buried the real ones.
  //
  // At zero this stops being a ratchet and becomes an assertion, which is the point: from
  // here, ANY invented year fails the build.
  explanationYearsOffSource: 0,
  // The option-content ceilings, measured 10 Aug 2026 on the first pass that ever read what a
  // distractor SAYS (L-033). All four start at their measured value rather than at zero: a red
  // build on day one teaches everyone to ignore red builds, and driving these down is the work.
  //
  // The first two are the ones that matter. A form offering as wrong an answer that another
  // phrasing of the same fact marks right is the deck teaching its own negation, on a schedule.
  selfContradictingForms: 12,
  distractorsContradictingCanonical: 2,
  // 90 facts whose two forms present the identical four options. The breadth gate counts those
  // as two proven phrasings; a reader who recognises the option set never reads the stem.
  // 90 -> 63 in the chapter-3 audit. Every one closed was a second phrasing that presented the
  // identical four options, so the breadth gate was counting it as a proven phrasing while a
  // reader who recognised the option set never had to read the stem.
  identicalOptionSetsWithinFact: 63,
  // 614 repeated distractor strings across 288 facts. The largest number here and the smallest
  // defect — nothing is wrong, the pool of lures a reader ever meets is just smaller than it looks.
  repeatedDistractorsWithinFact: 575,
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
  selfContradictingForms: 0,
  distractorsContradictingCanonical: 0,
  identicalOptionSetsWithinFact: 0,
  // Not zero. Some repetition is unavoidable where a fact has few plausible wrong answers,
  // and chasing it to nothing would consume the appetite for the least of the four defects.
  repeatedDistractorsWithinFact: 300,
};
