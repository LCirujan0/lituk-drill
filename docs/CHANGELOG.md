# CHANGELOG

An entry for every working day that has commits.

## 2026-08-04 — deck expansion

**D-024: 33 facts added to fill measured coverage gaps.** Deck 410 → **443** facts, 1,228 → **1,327**
forms. Amends the BRIEF's non-goal ("more facts is not [good] — 410 is the material"), which was
written assuming the 410 covered the handbook; measuring showed otherwise. Added: the EU and
international institutions, the modern constitutional monarchy, the civil service, local government,
the civil/criminal law distinction, the Industrial Revolution, and architecture. Every one carries a
handbook `source`.

- **The additions were length-balanced deliberately**, and it worked: the deck-wide longest-option tell
  fell from **40.7% to 38.8%**, so expansion improved a measured property rather than diluting it.
  Ceiling tightened to match. On-screen numeric tell holds at 52.8%, and no form now fails to reach
  every rank.
- **My first draft was rejected by the deck's own checks, twice over (L-018).** The gap probe searched
  canonical questions and answers but not form text, so it reported *zero* EU facts when f188 already
  covers the UK joining the EEC. Two drafted facts duplicated f188 and f331 and were caught by the
  duplicate-canonical-question and shared-form checks on the first run, not by review. A probe over a
  subset of the data reads exactly like a probe over all of it.
- **Then it rejected my option sets.** 30 of the new as-written forms had the correct answer as the
  uniquely longest option — the exact tell the file's own header warns about. Fixed by extending one
  distractor per form rather than by moving the ceiling.
- **The stored numeric-bracketing ratchet was retired as a gate**, and this one is worth recording
  because it inverts an earlier position. `buildCandidates` derives its step from the spread of the
  authored distractors, so distractors that bracket the true value are what give the candidate pool
  depth on both sides — the thing that makes uniform rank achievable. Driving that number down would
  now *degrade* generation while improving nothing a reader sees. It stays in `deck:report` as a
  diagnostic; `effectiveNumericMiddleRankRate` is the gate.

93 tests green.

## 2026-08-04 — deck corrections

**The owner supplied a full 3rd-edition handbook text**, which changed the sourcing rule and closed
most of a launch-gate blocker.

- **D-023.** The supplied edition is *maintained, not frozen*: it carries the Brexit update (UK left
  23:00 GMT 31 January 2020; 27 member states) while keeping other original figures. v0's README rule —
  "the examinable answer is always the book's, even where it's now out of date" — no longer describes a
  single artifact. Owner's decision: the maintained edition wins, one rule, no exceptions.
- **L-005: 11 of 12 amber facts resolved.** Eight confirmed correct (B1 CEFR, 84% in England, Wiggins,
  Olympics 1908/1948/2012, 60 Welsh AMs, 90 MLAs, Council of Europe 47, small claims £10,000 E&W).
- **L-015: three were wrong.** Small claims for Scotland and NI was **£3,000**, should be **£5,000** —
  a plainly wrong answer that spaced repetition would have drilled to permanence, which is R3's whole
  argument. Commonwealth 54 → 56. UK population 62m → 67.6m.
- **Divergence is now declared, not tolerated.** Correcting content breaks the round-trip proof against
  v0's `facts.js`. Rather than weaken that test, `divergences.ts` lists every deliberate difference with
  a reason and a source; the build fails on anything that differs and is not declared, on any stale
  declaration, and on any diverged fact missing a citation. The migration script refuses to run while
  divergences exist — re-running it would restore every original answer *and the round-trip test would
  then pass*, a failure indistinguishable from success.
- **The ratchet caught a metric that had quietly stopped measuring reality.** `longestOptionCorrectRate`
  was counting stored option text for forms that carry a generation rule and are never presented as
  written — the same flaw `effectiveNumericMiddleRankRate` exists to correct. Now restricted to
  as-written forms; denominator 749 → 734, rate 0.4032 → 0.4074, ceiling **re-derived rather than
  loosened**, with both figures recorded in `baseline.ts`.
- **L-017 logged:** measured coverage gaps. Zero facts on the EU despite a full handbook section; the
  modern monarchy, Industrial Revolution, local government, civil vs criminal law and the civil service
  are all thin. Filling them conflicts with BRIEF §What-v1-must-do and needs a superseding decision.

92 tests green.

## 2026-08-04 — later

**Infrastructure landed, and immediately produced a finding.** Vercel project created from the GitHub
import, Neon Postgres linked (`DATABASE_URL` and friends on Production and Preview).

- **L-014, High — the BRIEF rested on a premise that was never true.** §B stated that a working v0 was
  "already deployed and in daily use" and "carries him to 25 September on its own". Taken verbatim from
  the kickoff input and never checked. There was no deployment and no accumulated schedule; the owner
  had been using commercial apps. The neutralised deadline, the 6-week appetite, the instruction to
  ignore the exam date, and scope line S6 were all resting on it. Corrected in the BRIEF by D-022, with
  a drift-check tripwire so §B's premise is treated as a claim to verify rather than a given.
- **L-013 raised as High, then resolved by inverting it.** The Vercel project's Root Directory is `.`,
  so `lituk-drill.vercel.app` serves the repo-root `index.html` — v0. Flagged as dangerous on the
  assumption that a *real* v0 already held the owner's schedule, which would have made this a second
  copy at a new origin with empty storage. With no real one, it is not a collision: **it is the missing
  deployment.** Verified live — `index.html` 28,439 bytes, `facts.js` 232,747 bytes, both exact matches
  for the local files. Kept as-is; v1 will get its own project (D-022). Stable by construction, since
  R-1 and the `v0 is untouched` CI job forbid changing the files it serves.
  - Along the way, tried to fix it in git with a `vercel.json` pointing the build at `v1/`. The deploy
    failed with "No Next.js version detected… check your Root Directory setting" — Vercel stating
    plainly that this is not something `vercel.json` can override. File removed rather than left
    misleading.
- D-012 recorded Vercel Postgres; what was provisioned is Neon, which is the same thing — Vercel's
  Postgres offering is a Neon integration. No amendment needed.

**S7 built — generated numeric distractors (D-014), closing L-002.**

- Rules are **derived at load time from the authored options, never stored** (D-021). Decided during
  the build: storing them would have created a second copy free to drift, and would have shrunk the
  round-trip proof so it no longer covered converted forms. Net effect — this feature is a zero-line
  diff in `src/data`.
- Scale is inferred from the spread of each form's own hand-written distractors, then snapped to the
  granularity the author worked at. Guessing the step produces absurd options, and absurd options are
  their own tell.
- **Caught a self-inflicted regression in the dry run before it shipped.** The first version derived
  the step from distractor spread alone. For AD 43 against 61, 122 and 410 that gives a step of 122,
  nothing survives below zero, and the true value becomes the smallest option on screen *every time* —
  a narrower tell than the one being removed, wearing the disguise of a fix. 13 forms were affected.
  Capping the step so three candidates still fit below the value took it to one.
- **Result: the on-screen middle-value rate is 52.7%, down from 91.4%, against a chance floor of 50%.**
  Rank distribution 25.0 / 25.0 / 24.9 / 25.1 over 8,000 draws. 317 of 373 all-numeric forms carry a
  rule; the 56 that cannot are the entire residual (L-011).
- Added `effectiveNumericMiddleRankRate` — the stored-options measure would have kept reporting 91%
  for forms no reader meets, and would have reported an *improvement* if a form merely became
  underivable. Both numbers are now in `deck:report`, labelled.
- Presentation order is randomised for non-generated forms too, removing v0's 29.6% position skew.
- L-012 logged: `f387[2]` (£3,000 small-claims limit) still cannot place its answer at every rank.

**Ledger:** L-002 → `fixed-unverified`. Not closed here — the fixer never closes their own finding, and
`verified-fixed` needs a fresh session re-running the original measurement.

## 2026-08-04

**Phase 0 — interrogation and the BRIEF.**

- Read v0 in full (`README.md`, `index.html`, `facts.js`) read-only. v0 untouched throughout.
- Pre-flight tooling check: process kit skills, `auditor` agent, Node 24.16, git 2.54, `gh` (authed
  as LCirujan0), Vercel CLI (authed) all present. GitHub plan had to be asked — the token lacks
  `read:user`.
- **Measured the deck before asking anything.** Found R1: the correct answer is a middle value in
  91.4% of 373 all-numeric forms against 50% by chance, and the longest option in 40.2% of 749 forms
  against 25%. Answer position was clean. Also found six facts with a single recall-usable form, the
  f193/f352 duplicate, and the f205/f206 ambiguous stem.
- Pre-mortem run properly: Claude's 12 items written and sealed to
  `docs/premortem-claude-sealed.md` *before* the owner was asked, so independence is checkable from
  the timestamp. Owner's three merged in. His "not enough questions" caught what Claude missed — a
  fixed bank of 1,228 forms is the same failure the project was founded to prevent, and it bites
  hardest on leeches, which are drilled most. Six risks survived into BRIEF §Risks.
- Wrote `docs/BRIEF.md` and opened `docs/DECISIONS.md` early (D-001…D-009), because four architecture
  decisions were settled and the BRIEF firewall forbids technology in it.

**Phase 1 — ten questions, then build.**

- D-010…D-020 logged. Two answers changed the project's shape: no sign-in at all (so the system now
  holds **zero personal data**, and §E collapses), and Vercel Postgres over Supabase.
- Readiness redefined as **two** numbers, recall and exam-format, partly superseding D-004 — the real
  exam is multiple choice, so free recall alone would systematically understate.

**Milestone 1 — deck pipeline, scheduler, simulation (D-019).**

- Scaffolded Next.js 16.3 / React 19.2 in `v1/`, no Tailwind, `src/` layout.
- Migrated 410 facts / 1,228 forms from v0's positional arrays into typed per-chapter modules.
  **Verified by round-trip** — the emitted deck is reconstructed into v0's exact positional shape and
  compared against `facts.js`, rather than reviewed by eye.
- Deck analysis as pure functions plus a defect ratchet (`baseline.ts`) so CI is green on a deck that
  genuinely has known defects, while none of them can worsen.
- Ported the scheduler as pure functions: SM-2 with all five of v0's additions, seeded deterministic
  RNG, queue building, append-only event log with commutative merge and replay, and the v0 state
  import for S6.
- **Deliberate divergence from v0 (L-001):** v0 fuzzed *after* capping, so a 30-day interval could
  reach 32 and the breadth gate was ~5% leakier than its README claimed. v1 fuzzes first and caps
  second, making `interval <= cap` a real invariant.
- 60-day simulation in CI with per-review invariant assertions. Peak 187 on day 9, 410/410 facts
  started, 397 proven on every phrasing, queue drains every day, zero invariant violations.
- **Fixed a defect in the simulation harness (L-010)** found by investigating why the tail did not
  settle: the learner model keyed recall probability off `state.ok[form]`, which a lapse resets — so
  every lapse silently returned the modelled learner to never-seen, and `pickForm` then preferentially
  served that form. ~1,200 phantom lapses on a correct scheduler. Exposure is now tracked separately.
- Design tokens (reference + semantic) extracted from v0's palette, with
  `stylelint-declaration-strict-value` failing the build on raw values **on the same day** — it caught
  a raw `1ms` immediately, which is the point.
- CI: typecheck, eslint, token lint, tests, build, gitleaks, and a job that fails on any change to v0.
  Same gate in `.githooks/pre-push`. Actions pinned to commit SHAs, workflow permissions read-only.

**Repo live.** [LCirujan0/lituk-drill](https://github.com/LCirujan0/lituk-drill), public per D-005.
All three CI checks green on the first push; the pre-push hook fired and ran the full gate before the
push left the machine. `main` protected — required status checks, linear history, no force pushes, no
deletions, no review required. Consequence worth stating: **direct pushes to `main` are now rejected**,
so work lands via PRs. That is the trade D-005 bought and it is the right one under D-006's full
autonomy — a local hook can be bypassed with `--no-verify`, a required check cannot.

**Deferred, deliberately:** generated numeric distractors (D-014, closes L-002) · the readiness model ·
practice mode · mocks · the timeline screen · any real UI · database provisioning. All of milestone 2+.

**Discovered:** v0's `pickForm` serves the least-proven phrasing first, which interacts with the
fact-level lapse in a way worth remembering — after a lapse clears one phrasing's credit, that
phrasing is what gets served next. Correct by design (drill the weakness), and the reason L-010 was so
costly.
