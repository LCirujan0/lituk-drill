# HANDOFF

**The Status block below owns every volatile number in this project.** No other document
restates one. A hand-copied live number drifts within a session.

## Status — 4 August 2026

| | |
|---|---|
| Phase | App usable end to end. Explanations complete (443/443) |
| Repo | [LCirujan0/lituk-drill](https://github.com/LCirujan0/lituk-drill) — public, `main` protected. **One version, at the root** (D-025) |
| Tests | 143 passing across 6 files (121 domain, 22 component) |
| Deck | **528 facts · 1,582 forms** · 5 chapters · every fact carries an explanation |
| Migration frontier | none — Neon provisioned, no schema yet |
| Next decision id | D-026 |
| Next ledger id | L-019 |
| Open ledger rows | 10; 3 verified-fixed; L-002, L-005, L-014, L-015 fixed-unverified |
| Open Critical | 0. No open High |
| On-screen numeric tell | 52.7% (was 91.4%; chance 50%) |
| Amber facts | 1 unresolved (was 12) |
| CI | Green — 2 required checks |
| Deployed | https://lituk-drill.vercel.app |
| Appetite expires | ~18 September 2026 · go/no-go on v0 vs v1: 20 September |

## What exists

- `v1/src/domain/deck` — types, the assembled deck, `analysis.ts` (pure measurements),
  `baseline.ts` (the defect ratchet). Deck content in `v1/src/data/chapter-{1..5}.ts`.
- `v1/src/domain/scheduler` — SM-2 with v0's five additions, seeded RNG, queue building,
  the append-only event log with replay/merge, and the v0 state import.
- `v1/tests` — deck round-trip against `facts.js`, structural + statistical ratchet,
  scheduler invariants, and the 60-day simulation.
- Design tokens (two tiers) with stylelint enforcement live in CI from day one.
- CI: typecheck, eslint, token lint, tests, build, gitleaks, and a job that fails on any
  change to v0. Same gate in `.githooks/pre-push`.

## Simulated load — 40 new/day, 72% first-time recall, 60 days

Peak 187 on day 9 · means 133 / 79 / 47 / 41 across days 0–9, 10–19, 20–41, 42–59 ·
410/410 facts started · 397 proven on every phrasing · 322 mature.
v0 documented a peak of ~170 on days 8–10 and 403–407 proven. Same shape; this learner
model is harsher in the tail, which is stated rather than tuned away.

## What does not exist yet

No database and no sync endpoint — the app is local-only, so the two devices do not yet
share a schedule. No readiness model (S4) and no mocks (D-017). **No docs-consistency
test** — deferred, not skipped; it needs a schema and an `.env.example` to check against.
No end-to-end tests against a real browser — component tests run in jsdom, so anything that
depends on real layout, touch targets or Safari behaviour is still unverified.

## Next, in order

0. **Owner: start drilling daily.** Not a build task, and still the highest-value item here.
   v1 is now usable and is the better tool — corrected facts, generated distractors, the
   mistakes drill. v0 remains the fallback. Whichever you pick, pick one and use it: that
   is what makes the deadline neutral (D-022).
1. **Promote v1 to its production URL** — `cd v1 && vercel --prod` replaces the preview hash
   with `lituk-v1.vercel.app`. Owner action: production deploys are deny-ruled for
   unattended sessions under D-006's fence.
2. UI tests. The domain has 122 and the interface has a hand smoke-check; that gap is the
   weakest thing in the repo right now.
3. Persistence: schema for the review-event log, and sync endpoints. The Neon database is
   provisioned and `DATABASE_URL` is present on Production and Preview. The store already
   has the shape sync needs — a pull merges events in and calls `emit()`.
4. Mini-spec then build S4, the readiness model. S7 landed, so L-002 no longer poisons it.
5. L-004 (the inherited amber contrast pairing) — now live in the grading buttons, so this
   has stopped being theoretical.

## Gotchas

- **`main` is protected and rejects direct pushes.** All three CI checks are required, so
  work lands via a branch and a PR. No review is required, so an unattended session can
  merge its own PR once CI is green — the gate is the machine, not a person.
- `vitest.config.mts` must keep the `.mts` extension; as `.ts` it loads as CommonJS and warns.
- The generated chapter files are large. Never reformat them by hand — re-run
  `npm run deck:migrate` and let the round-trip test prove the result.
- `npm run deck:report` prints every deck measurement without running the suite.
- The repository root `README.md` is v0's, not the project's — v0 is untouchable (R-1), and
  that is the first thing a visitor to a public repo sees. Known consequence of D-020.
