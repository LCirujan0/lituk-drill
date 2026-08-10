# HANDOFF

**The Status block below owns every volatile number in this project.** No other document
restates one. A hand-copied live number drifts within a session.

## Status — 10 August 2026

| | |
|---|---|
| Phase | **Content quality programme**: option-and-form audit, then the explanation rewrite, with the timeline restructure in parallel |
| Repo | [LCirujan0/lituk-drill](https://github.com/LCirujan0/lituk-drill) — public, `main` protected. **One version, at the root** (D-025) |
| Tests | **281 passing across 12 files** — adds 4 option-content ratchets and 6 over the chronology (`timeline`) |
| **Target screen** | **iPhone 16 Pro — 402×874**, safe-area-inset-bottom ≈34px. Older notes saying "fits 393×852" were measured against a device nobody uses (D-033) |
| Deck | **533 drilled · 1,597 forms**. 559 ids in use; 26 retired, ids kept (R-4). **All five chapters audited** — 533 facts, 218 distractors rewritten, 40 answers referred to the owner |
| Deck sourcing | **Every drilled fact carries a `source`.** 346 corroborated mechanically — 6 of those since retired, because the pass matched on topic rather than on the answer (L-031) — 37 confirmed by the owner, 22 retired |
| Migration frontier | `review_events` — created lazily by `migrate()`, live on production, verified |
| Next decision id | D-034 (D-026 never issued, D-029 never written — L-022) |
| Next ledger id | L-037 (L-019 and L-020 never written — L-022) |
| Open ledger rows | 13 open · 14 fixed-unverified · 5 verified-fixed |
| Open Critical | 0. **Two open High — L-033** (12 self-contradicting forms remain) and **L-036** (the numeric metric, needs independent re-derivation) |
| Ratchet source | **`ACTIVE`, not `DECK`** — quality measurements exclude retired facts (L-032). Id-space contracts stay on `DECK` |
| On-screen numeric tell | **52.4%** over 381 forms (was 91.4%; chance 50%) · ceiling 0.526. **Calendar-date sets excluded — they ranked the day of the month (L-036)** |
| Longest-option tell | **28.0%** — past its 0.30 target, ceiling now 0.285 (was a slack 0.39). L-003 closed |
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
| **C4** | **~12 bands you can drill on their own.** The deck already carries 87 tags, none over 50 facts — but 87 is a picker, not a study aid, so they group into about a dozen bands of 30–55. A first cut summing to 533 exactly is in the BRIEF. | Days | Ready to build |
| **C5** | **The progress bar says which kind.** Each row shows % mastered / % mistakes / % new instead of one number. The partition already exists and is already asserted (R-12), so this is rendering. Ships with C4. | A day | Ready to build |
| **C7** | **Mock tests and their history.** Mostly already decided by **D-017** — 24 questions from unseen forms, spent forms recorded, score stored beside the model's prediction. The ask for *20 fixed pre-built tests* conflicts with "unseen", and **R-7 forbids showing a mock score as readiness** while L-002/L-003 are only `fixed-unverified`. | ~1 week | Needs one decision |
| **C6** | **Full extraction sweep of the handbook** — every name, date and location. **D-035 accepted**, amending the non-goal. Blocked on one real question: 533 facts at 30/day already exceeds the appetite, so doubling the deck can make readiness *worse* while making coverage better. | Weeks | Blocked on volume |
| **C8** | **An AI layer.** **D-034 is `proposed`, and no code may be written against it.** Crosses the LLM non-goal, R-8 (no third party) and R3. "A useful AI layer" is four features with four risk profiles — (a) explain-on-demand is cheap and safe, (d) choosing what to drill replaces a simulation-verified scheduler with one that cannot be verified. | Unknown | Blocked on shape |

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
