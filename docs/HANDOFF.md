# HANDOFF

**The Status block below owns every volatile number in this project.** No other document
restates one. A hand-copied live number drifts within a session.

## Status — 4 August 2026

| | |
|---|---|
| Phase | Milestone 1 (D-019) — deck pipeline, scheduler, simulation. Core complete |
| Tests | 67 passing across 3 files |
| Deck | 410 facts · 1,228 forms · 5 chapters · 82 tags |
| Migration frontier | none — no database provisioned yet |
| Next decision id | D-021 |
| Next ledger id | L-011 |
| Open ledger rows | 8 (L-002…L-009); 2 verified-fixed |
| Open Critical | 0 |
| Deployed | v0 only. v1 not yet deployed |
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

No UI beyond a skeleton page. No database, no sync endpoint, no readiness model, no
practice mode, no mocks, no generated distractors, no timeline screen. No Vercel project
for v1, no GitHub remote, no branch protection.

## Next, in order

1. Create the GitHub repo (public, per D-005) and push. Turn on branch protection
   requiring the CI check.
2. Create a **separate** Vercel project rooted at `v1/` (D-020). v0's project is never a
   deploy target.
3. Mini-specs through the scoping gate for the three thesis features, S3/S4/S7. **S7
   first** — generated numeric distractors close L-002, and the readiness model in S4 is
   not trustworthy until they do.

## Gotchas

- `vitest.config.mts` must keep the `.mts` extension; as `.ts` it loads as CommonJS and warns.
- The generated chapter files are large. Never reformat them by hand — re-run
  `npm run deck:migrate` and let the round-trip test prove the result.
- `npm run deck:report` prints every deck measurement without running the suite.
