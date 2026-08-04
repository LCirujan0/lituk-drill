# LEDGER

Findings live and die here, nowhere else. Reports are snapshots; this is the state.
**No row is ever deleted.** A closed finding stays closed in place.

**Status:** `open` · `in-progress` · `fixed-unverified` · `verified-fixed` · `risk-accepted`
**`verified-fixed` requires a fresh session re-running the original reproduction.** The fixer never
closes their own finding. **`risk-accepted` is the owner's alone**, written by him, with rationale and
an expiry date — never set on his behalf.

Severity → due date: Critical 3 days · High 2 weeks · Medium 6 weeks · Low next milestone.

| ID | Sev | Class | Finding | Found | Due | Status |
|---|---|---|---|---|---|---|
| L-001 | Low | correctness | **v0 applies interval fuzz after the breadth cap**, so a capped 30-day interval can reach 32 — the gate is ~5% leakier than v0's README states. v1 fuzzes first and caps second, making `interval <= cap` an actual invariant. Divergence from v0 is deliberate and is inside the simulation's tolerance. | 2026-08-04 | — | `verified-fixed` — asserted in `scheduler.test.ts` ("never exceeds its cap even at the extremes of fuzz") across seven fuzz draws, and by the 60-day simulation's per-review invariant check |
| L-002 | High | content | **Numeric distractors bracket the true value.** The correct answer is a middle value in 91.4% of 373 all-numeric forms (chance 50%). "Pick a middle number" scores ~91% with no knowledge. This is R1 and it is upstream of the whole readiness model. | 2026-08-04 | 2026-08-18 | `open` — ratcheted at 0.915 in `baseline.ts` so it cannot worsen; closed by D-014's generated distractors. Target 0.55 |
| L-003 | Medium | content | **Correct answer is the longest option in 40.2%** of the 749 forms with a unique longest (chance 25%). Survives option shuffling, because it is a property of the option set rather than its order. | 2026-08-04 | 2026-09-15 | `open` — ratcheted at 0.403. Target 0.30 |
| L-004 | Medium | a11y | **v0's palette is inherited unaudited.** The amber "check the book" pairing (`--ref-amber-ink` #8a5a00 on a 20%-amber fill) is the most likely WCAG 2.2 AA contrast failure. "Keep v0's palette" (D-018) means keep it *and fix it*. | 2026-08-04 | 2026-09-15 | `open` — no component uses it yet; must be resolved before the first UI milestone |
| L-005 | Medium | content | **12 facts still flagged for checking against the printed handbook.** The examinable answer is the book's even where the book is now wrong, so both drift and over-correction are failure modes. Blocks the launch gate. | 2026-08-04 | 2026-09-15 | `open` — ratcheted at 12; needs the physical book, so only the owner can close it |
| L-006 | Low | content | **f193 and f352 serve an identical question form.** Form 1 of each is verbatim "The Scottish Parliament and the Welsh Assembly first met in which year?" with the same answer, 1999. The facts themselves differ — f193 is "In which year did the Scottish Parliament and Welsh Assembly first meet?" (ch. 3), f352 is "In which year did the devolved administrations first receive their powers?" (ch. 5) — so this is a shared sentence, not a duplicated fact. It matters because one memorised sentence earns breadth credit on two separate facts, which is the specific thing the breadth gate exists to prevent. *(Corrected 2026-08-04: first logged as "the same fact, identical canonical question". The measurement said otherwise and the measurement was right.)* | 2026-08-04 | 2026-09-15 | `open` — fix is to reword one of the two forms, which needs no index remap. Caught by neither original check; `sharedFormsAcrossFacts` added and ratcheted at 1 |
| L-007 | Medium | content | **f205 and f206 share the stem "Which of these is one of the fundamental principles of British life"** with different correct answers, and both are served as free recall (`mcqOnly = false`). Several answers are legitimately correct, so an honest answer gets marked wrong. | 2026-08-04 | 2026-09-15 | `open` — cheapest fix is to mark both `mcqOnly`, which costs two recall forms |
| L-008 | Low | content | **Six facts have only one recall-usable form** (f017, f218, f222, f223, f357, f367), so in Cards-only use their breadth can never exceed 1 and they stay pinned at the 6-day cap for ever. 43 more have only two and are pinned at 30 days. From the inside this reads as "I keep failing these". | 2026-08-04 | 2026-09-15 | `open` — reproduced exactly by the recall-only simulation, which asserts the pinned set is precisely those six |
| L-009 | Low | ops | **The v0-deploy fence is partly conventional.** CI and the pre-push hook both refuse any *modification* to v0's files, but neither can prevent a `vercel --prod` aimed at v0's project. Mitigated by v1 living in its own directory with its own Vercel project (D-020) and by deny-rules on raw `vercel --prod`. | 2026-08-04 | 2026-09-15 | `open` — residual risk stated rather than solved; revisit when the v1 Vercel project is created |
| L-010 | Low | tooling | **The simulation's learner model conflated credit with exposure.** Recall probability keyed off `state.ok[form] === 0`, which a lapse resets — so every lapse silently returned the modelled learner to never-seen, and `pickForm` then served that form preferentially. Produced ~1,200 phantom lapses and a review curve that never settled, on a correct scheduler. | 2026-08-04 | — | `verified-fixed` — exposure now tracked by the harness independently of scheduler state; week-6 load fell from 68/day to 41/day and proven-all-forms rose from 395 to 397, both consistent with v0's documented run |

## Notes

**L-002 and L-003 are the reason the readiness model excludes multiple-choice data until they close
(D-004/D-013).** They are ratcheted rather than fixed because fixing them is a content programme, not
a bug fix, and a red build on day one teaches everyone to ignore red builds.

**L-006 and L-007 are both cheap to fix and neither needs an index remap** — one is a reworded form,
the other is two `mcqOnly` flags. What they cost is recall-usable forms, which are already scarce
(L-008), so they should be resolved in the same pass that adds forms rather than on their own.

**A note on how L-006 was found and mis-stated.** It surfaced from a duplicate-question scan during
Phase 0 and was written up as "the same fact, twice". The first run of `npm run deck:report`
contradicted it — zero duplicate canonical questions — and the facts turned out to be genuinely
different with one shared sentence between them. Two things follow. The check that would have caught
it existed in neither direction, so `sharedFormsAcrossFacts` now exists. And a finding written from a
scan but never re-derived from the code is a finding that can be wrong for weeks; the report script is
the cheap way to keep re-deriving them.
