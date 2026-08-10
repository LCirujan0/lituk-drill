# HANDOFF

**The Status block below owns every volatile number in this project.** No other document
restates one. A hand-copied live number drifts within a session.

## Status — 10 August 2026

| | |
|---|---|
| Phase | **Content quality programme**: option-and-form audit, then the explanation rewrite, with the timeline restructure in parallel |
| Repo | [LCirujan0/lituk-drill](https://github.com/LCirujan0/lituk-drill) — public, `main` protected. **One version, at the root** (D-025) |
| Tests | **310 passing across 13 files** — adds `bands` (the band partition, the tag vocabulary in both directions, the 55 ceiling), both cuts through `counts`, and 3 in `app` over the split rows |
| **Target screen** | **iPhone 16 Pro — 402×874**, safe-area-inset-bottom ≈34px. Older notes saying "fits 393×852" were measured against a device nobody uses (D-033) |
| Deck cuts | **5 chapters and 12 bands, each drillable and each showing its own three-way split.** Both partition the 530 independently (C4/C5). Bands run 30–54 facts, ceiling 55 — two are within two facts of it, so C6 must split a band |
| Deck | **530 drilled · 1,588 forms**. 559 ids in use; 29 retired, ids kept (R-4). **All five chapters audited** — 218 distractors rewritten; 36 answers referred, 3 retired, 33 still to read |
| Deck sourcing | **Every drilled fact carries a `source`.** 346 corroborated mechanically — 6 of those since retired, because the pass matched on topic rather than on the answer (L-031) — 37 confirmed by the owner, 22 retired |
| Migration frontier | `review_events` — created lazily by `migrate()`, live on production, verified |
| Next decision id | D-034 (D-026 never issued, D-029 never written — L-022) |
| Next ledger id | L-038 (L-019 and L-020 never written — L-022) |
| Open ledger rows | 13 open · 15 fixed-unverified · 5 verified-fixed |
| Open Critical | 0. **One open High — L-036** (the numeric metric, needs independent re-derivation). L-033 is `fixed-unverified`: 11 of its 12 hits were correct design, 1 was real |
| Self-contradiction | **0 undeclared, 0 stale — asserted, not ratcheted.** The 11 legitimate hits are declared with reasons in `deck/contradictions.ts`; anything else fails the build |
| Ratchet source | **`ACTIVE`, not `DECK`** — quality measurements exclude retired facts (L-032). Id-space contracts stay on `DECK` |
| On-screen numeric tell | **52.1%** over 381 forms (was 91.4%; chance 50%) · ceiling 0.526. **Calendar-date sets excluded — they ranked the day of the month (L-036)** |
| Longest-option tell | **27.8%** — past its target, ceiling 0.285 (was a slack 0.39). L-003 closed |
| Amber facts | **0** — f213 and f006 both retired, 10 Aug 2026 |
| CI | Green — 2 required checks |
| Deployed | https://lituk-drill.vercel.app |
| Daily target | **50 facts/day**, raised from 30 on 10 Aug so a ~700-fact deck (D-035) can still be seen. **The 60-day simulation was run at 40 and is now stale** |
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
2. **40 answers the audit believes are wrong**, waiting on the owner under D-031 — including
   f215, f216 and f219, whose answers (a ceremony deadline, the local authority, a certificate)
   appear nowhere in the handbook. Same class as the four retired on 10 August.
   **31 question-level defects deferred**: rewording a stem in place falsifies breadth credit, so
   each needs an appended replacement or an `mcqOnly` flag.
3. **Independently re-derive L-036.** The numeric-tell measurement was excluding nothing and
   ranking days of the month; it now excludes calendar-date sets. That change was made while
   the ratchet was failing and is what turned the build green, so it wants a check by someone
   who did not make it. Both figures are in the row.
4. **The explanation rewrite (C2)** — all 533 panels, after the audit, because a discriminator
   cannot be written before the thing it discriminates against is known.
5. Extend the year check over `fact.answer` and every `answers.correct`. It has only ever read
   explanations, which is how six facts with unanswerable years survived a whole sourcing pass
   (L-031) and how f194 kept 1924 in its own canonical stem until 10 August. The chronology is
   now covered (`scanCorpus`); answers are not.
6. **Baird has no card** since f194 was retired: he survives only as a distractor in f196 and
   f199. An S10 coverage gap, to be closed with a phrasing that does not turn on a year.
7. Mini-spec then build S4, the readiness model. **R-7 is doing more work than it was:** Mastered
   is now a much softer claim than "known every way", and L-002's option-shape tell sits directly
   under it (D-032).
8. L-004 (the inherited amber contrast pairing), and L-034 — `--c-text-muted` on surface
   measures 3.50:1 in light mode, below AA for body text, and is live on every era blurb.

## Roadmap — asked for 10 August 2026, specced in the BRIEF, not started

Five requests from the owner. Full mini-specs are in `docs/BRIEF.md`; this is the order and the
one-line reason.

| | Item | Size | Status |
|---|---|---|---|
| **C4** | **12 bands you can drill on their own**, over the 87 tags. Both cuts stay drillable and both carry progress; a band draws from more than one chapter, so neither nests inside the other. | Days | **Built 10 Aug** |
| **C5** | **The progress bar says which kind.** Every chapter row and every band row shows mastered / mistakes / untouched as a segmented bar, with all three figures in the accessible name. | A day | **Built 10 Aug** |
| **C7** | **Mock tests and their history.** Mostly already decided by **D-017** — 24 questions from unseen forms, spent forms recorded, score stored beside the model's prediction. The ask for *20 fixed pre-built tests* conflicts with "unseen", and **R-7 forbids showing a mock score as readiness** while L-002/L-003 are only `fixed-unverified`. | ~1 week | Needs one decision |
| **C6** | **Full extraction sweep of the handbook** — every name, date and location. **D-035 accepted**, amending the non-goal. Blocked on one real question: 533 facts at 30/day already exceeds the appetite, so doubling the deck can make readiness *worse* while making coverage better. | Weeks | Blocked on volume |
| **C8** | **An AI layer.** **D-034 is `proposed`, and no code may be written against it.** Crosses the LLM non-goal, R-8 (no third party) and R3. "A useful AI layer" is four features with four risk profiles — (a) explain-on-demand is cheap and safe, (d) choosing what to drill replaces a simulation-verified scheduler with one that cannot be verified. | Unknown | Blocked on shape |

**C4 and C5 shipped together on 10 August**, which is what the roadmap ordering intended — the
band cut in the BRIEF was re-derived against the live 530 first, because the draft double-assigned
`Devolution` and `Europe` and so summed to 533 without partitioning anything.

**C2, the explanation rewrite, is still the largest unstarted item from this session** and sits
ahead of all of these: it needs the full distractor census, which chapters 1, 2, 4 and 5 complete.

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
