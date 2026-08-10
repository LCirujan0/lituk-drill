# HANDOFF

**The Status block below owns every volatile number in this project.** No other document
restates one. A hand-copied live number drifts within a session.

## Status — 10 August 2026

| | |
|---|---|
| Phase | **Content quality programme**: option-and-form audit, then the explanation rewrite, with the timeline restructure in parallel |
| Repo | [LCirujan0/lituk-drill](https://github.com/LCirujan0/lituk-drill) — public, `main` protected. **One version, at the root** (D-025) |
| Tests | **271 passing across 11 files** — 209 domain (`counts` 38), 55 in jsdom (`app` 44, `store-sync` 11), 7 over CSS source (`layout`) |
| **Target screen** | **iPhone 16 Pro — 402×874**, safe-area-inset-bottom ≈34px. Older notes saying "fits 393×852" were measured against a device nobody uses (D-033) |
| Deck | **533 drilled · 1,597 forms**. 559 ids in use; 26 retired, ids kept (R-4) |
| Deck sourcing | **Every drilled fact carries a `source`.** 346 corroborated mechanically — 6 of those since retired, because the pass matched on topic rather than on the answer (L-031) — 37 confirmed by the owner, 22 retired |
| Migration frontier | `review_events` — created lazily by `migrate()`, live on production, verified |
| Next decision id | D-034 (D-026 never issued, D-029 never written — L-022) |
| Next ledger id | L-034 (L-019 and L-020 never written — L-022) |
| Open ledger rows | 12 open · 11 fixed-unverified · 5 verified-fixed |
| Open Critical | 0. **One open High — L-033**, the unmeasured option-content defects |
| Ratchet source | **`ACTIVE`, not `DECK`** — quality measurements exclude retired facts (L-032). Id-space contracts stay on `DECK` |
| On-screen numeric tell | 52.5% (was 91.4%; chance 50%) · ceiling 0.527 |
| Longest-option tell | 30.9% (chance 25%) · ceiling **0.315**, was a slack 0.39 (L-032) |
| Amber facts | **0** — f213 and f006 both retired, 10 Aug 2026 |
| CI | Green — 2 required checks |
| Deployed | https://lituk-drill.vercel.app |
| Appetite expires | ~18 September 2026 · exam 25 September |

## What exists

- `src/domain/deck` — types, the assembled deck, `analysis.ts` (pure measurements),
  `baseline.ts` (the defect ratchet), `presentation.ts` (generated numeric distractors).
  Deck content in `src/data/chapter-{1..5}.ts` plus `additions.ts` and `explanations.ts`.
- `src/domain/scheduler` — SM-2 with v0's five additions, seeded RNG, queue building, and
  the append-only event log with replay/merge.
- `src/domain/drill` — `standing.ts` classifies every fact as New, Mastered or Mistakes in one
  walk (D-032, R-12) and everything else projects it: the five sections, the mistakes queue,
  rotation, and the stats the home and progress screens show.
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
behaviour is unverified. `tests/layout.test.ts` is not that — it asserts over CSS *source*,
which pins the invariant a browser measurement established but cannot re-measure it.

## Next, in order

1. **Owner: drill daily.** Not a build task and still the highest-value item here. The deck
   moves under him during the content programme — appending a form makes
   `proven < ok.length` true again, so mastered facts drop back under the 30-day cap. Harmless
   six weeks out, damaging one week out. **This is the last window in which this work is safe.**
2. **The option-and-form audit** (L-033, and folding in L-003, L-006, L-007, L-008, L-011).
   Nothing in the build has ever read what a distractor *says*.
3. Extend the year check over `fact.answer` and every `answers.correct`, ratcheted like
   `explanationYearsOffSource`. It has only ever read explanations, which is how six facts with
   unanswerable years survived a whole sourcing pass (L-031) and how f194 kept 1924 in its own
   canonical stem until 10 August.
4. **The explanation rewrite** — all 533 panels, after the audit, because a discriminator cannot
   be written before the thing it discriminates against is known.
5. **Baird has no card** since f194 was retired: he survives only as a distractor in f196 and
   f199. An S10 coverage gap, to be closed with a phrasing that does not turn on a year.
4. Mini-spec then build S4, the readiness model. **R-7 is doing more work than it was:** Mastered
   is now a much softer claim than "known every way", and L-002's option-shape tell sits directly
   under it (D-032).
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
