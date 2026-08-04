# HANDOFF

**The Status block below owns every volatile number in this project.** No other document
restates one. A hand-copied live number drifts within a session.

## Status — 4 August 2026

| | |
|---|---|
| Phase | App usable end to end. Sync live (D-030); cards can be stepped back through |
| Repo | [LCirujan0/lituk-drill](https://github.com/LCirujan0/lituk-drill) — public, `main` protected. **One version, at the root** (D-025) |
| Tests | **207 passing across 9 files** — 162 domain, 45 in jsdom (`app` 34, `store-sync` 11) |
| Deck | **528 facts · 1,582 forms** · 5 chapters · every fact carries an explanation |
| Deck sourcing | **129 of 528 facts carry a `source`. 399 do not** — ch1 18 · ch2 33 · ch3 201 · ch4 74 · ch5 73, covering 1,195 forms |
| Migration frontier | `review_events` — created lazily by `migrate()`, live on production, verified |
| Next decision id | D-031 (D-026 never issued, D-029 never written — L-022) |
| Next ledger id | L-025 (L-019 and L-020 never written — L-022) |
| Open ledger rows | 12 open · 6 fixed-unverified · 4 verified-fixed |
| Open Critical | 0. **One open High — L-023**, six facts the handbook cannot answer |
| On-screen numeric tell | 52.7% (was 91.4%; chance 50%) |
| Amber facts | 1 unresolved (f213 — L-016) |
| CI | Green — 2 required checks |
| Deployed | https://lituk-drill.vercel.app |
| Appetite expires | ~18 September 2026 · exam 25 September |

## What exists

- `src/domain/deck` — types, the assembled deck, `analysis.ts` (pure measurements),
  `baseline.ts` (the defect ratchet), `presentation.ts` (generated numeric distractors).
  Deck content in `src/data/chapter-{1..5}.ts` plus `additions.ts` and `explanations.ts`.
- `src/domain/scheduler` — SM-2 with v0's five additions, seeded RNG, queue building, and
  the append-only event log with replay/merge.
- `src/domain/drill` — the five sections, the mistakes queue, rotation and the stats the
  home and progress screens project.
- `src/adapters` — `local-store` (localStorage, degrades rather than throws), `db` (Neon,
  server-only), `sync` (pull/push/union), `store` (the one subscribable snapshot; **owns
  the two sync guarantees in D-030**).
- `tests` — structural + statistical deck ratchet, scheduler invariants, the 60-day
  simulation, the merge algebra, the store's sync wiring, and 28 component tests.
- Design tokens (two tiers) with stylelint enforcement, live in CI from day one.
- CI: typecheck, eslint, token lint, tests, build, gitleaks. Same gate in
  `.githooks/pre-push`.

## Simulated load — 40 new/day, 72% first-time recall, 60 days

Peak 187 on day 9 · means 133 / 79 / 47 / 41 across days 0–9, 10–19, 20–41, 42–59 ·
410/410 facts started · 397 proven on every phrasing · 322 mature. Measured before the
deck grew to 528; the shape holds, the absolute numbers are now optimistic.

## What does not exist yet

No readiness model (S4) and no mocks (D-017). **No docs-consistency test** — deferred, not
skipped, and L-022 is what its absence costs. No end-to-end tests against a real browser:
component tests run in jsdom, so anything depending on real layout, touch targets or Safari
behaviour is unverified. The nav is still one screen with a Back button rather than tabs.

## Next, in order

1. **Owner: drill daily.** Not a build task and still the highest-value item here.
2. Verify the 399 unsourced facts against the handbook and rebuild the explanations as
   memorisation clusters — one pass, fact by fact, because both need the same passage.
   `docs/EXPLANATIONS.md` is the standard; L-023's four unanswerable facts are resolved here.
3. PWA polish: fit 393×852, safe areas, icons, manifest, offline.
4. Mini-spec then build S4, the readiness model. S7 landed, so L-002 no longer poisons it.
5. L-004 (the inherited amber contrast pairing) — live in the grading buttons, so this has
   stopped being theoretical.

## Gotchas

- **`main` is protected and rejects direct pushes.** All required CI checks must pass, so
  work lands via a branch and a PR. No review is required, so an unattended session can
  merge its own PR once CI is green — the gate is the machine, not a person.
- **`DATABASE_URL` is on Production and Preview, not Development.** `vercel env pull`
  defaults to development and returns nothing useful; pass
  `--environment=production`. The cheap check is against the deployment instead:
  `npx tsx scripts/db-check.mts https://lituk-drill.vercel.app` — `inserted: 0` on the
  second push and `rejected: 1` for the malformed probe, or sync is not working.
- **`src/adapters/db.ts` must never be imported from a client component.** The connection
  string would land in the browser bundle.
- **`tests/setup.ts` stubs `fetch` to reject, deliberately.** The store syncs on mount;
  without the stub the component tests spend twenty seconds reaching for a server that is
  not there. A test that wants a working sync stubs its own.
- `vitest.config.mts` must keep the `.mts` extension; as `.ts` it loads as CommonJS and warns.
- The chapter files are large. Never reformat them by hand.
- `npm run deck:report` prints every deck measurement without running the suite.
- `npm run deck:vocab` reports explanations naming years or people the handbook does not.
  Rebuild its vocabulary with `npm run deck:vocab:build` after re-extracting the handbook.
- The handbook text lives in `.work/` — gitignored, Crown copyright, never committed.
  Re-download from
  `https://storage.googleapis.com/britizen-public/static/study-guide/document.pdf`
  and extract with `pdf-parse`; poppler is not installed.
