# CHANGELOG

An entry for every working day that has commits.

## 2026-08-04 — later

**Infrastructure landed, and immediately produced a finding.** Vercel project created from the GitHub
import, Neon Postgres linked (`DATABASE_URL` and friends on Production and Preview).

- **L-013, High.** The project's Root Directory is `.`, so `lituk-drill.vercel.app` is serving the
  repo-root `index.html` — **a second live copy of v0 at a new origin**. Browser storage is per-origin,
  so it looks identical and has an empty schedule. Attempted to fix it in git with a `vercel.json`
  pointing the build at `v1/`; the deploy failed with "No Next.js version detected… check your Root
  Directory setting", which is Vercel stating plainly that this is not something `vercel.json` can
  override. File removed rather than left misleading. Needs one project setting; owner action.
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
