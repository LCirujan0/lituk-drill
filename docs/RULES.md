# RULES

Numbered invariants. **Changing one requires a DECISIONS entry first**, not a commit message.
Every rule here either is a machine check or names the one that enforces it — a rule that is only
written down will decay.

### R-1 · ~~v0 is never modified and never deployed over~~ — RETIRED 4 Aug 2026 (D-025)
There is one version of this app. The rule protected a fallback that turned out never to have
existed (L-014), and the CI job enforcing it was deleted with it. Kept here rather than erased,
because a numbered rule vanishing without trace is how a rule set stops being trustworthy.

### R-2 · The domain layer holds no framework or vendor types
`src/domain/**` is pure functions over plain data — no React, no Next, no database client, no clock,
no `Math.random`. This is what makes the scheduler simulable, and the simulation is the only thing
standing between us and R4.
**Enforced by:** review, plus the fact that the tests import the domain directly with no environment.

### R-3 · Scheduler randomness is seeded from the event that caused it
Never `Math.random()`, never a clock, never a log position. Two devices replaying the same events must
derive the same schedule, or sync silently disagrees.
**Enforced by:** `scheduler.test.ts` — replay in shuffled order, assert identical state.

### R-4 · Fact ids are stable, unique and contiguous
Ids are the handle the review-event log points at. A gap, a duplicate or a renumber means events
pointing at the wrong fact — or at nothing. Adding a fact appends; removing one is a migration that
must rewrite the log, never a deletion.
**Enforced by:** `deck.test.ts` — `DECK[i].id === factId(i)` and a uniqueness check.

### R-5 · A practice or mock session can never push a fact further out
Failures always write; successes write only when scheduled. Practice may pull a due date forward or
leave it alone, never delay it.
**Enforced by:** `scheduler.test.ts` — exhaustively over every mode, grade, form and state.

### R-6 · An interval never exceeds its breadth cap
Not "usually", not "before fuzz". `interval <= cap` holds after every review.
**Enforced by:** `scheduler.test.ts` at fuzz extremes, and per-review in the 60-day simulation.

### R-7 · Readiness is never computed from data with a known tell
While L-002 and L-003 are open, multiple-choice performance does not feed any readiness figure.
**Enforced by:** the deck ratchet in `baseline.ts`; the exam-format number ships only when the
numeric-rank measurement reaches its target.

### R-8 · No personal data, ever
No email, name, date of birth, nationality, immigration case detail, exam booking reference, URN,
exam date or time, IP address, device identifier, analytics or third-party tracker. Enforced in the
schema, not the interface.
**Enforced by:** the BRIEF data inventory, diffed against the live schema by the docs-consistency test
once a schema exists.

### R-9 · Raw colours and sizes appear only in `tokens.css`
Components reference semantic tokens. A token system without its check is decoration.
**Enforced by:** `stylelint-declaration-strict-value` in `npm run lint:css`, in CI and pre-push.

### R-10 · Every bug fix ships with a regression test in the same commit
The fix without the test is half a fix. The same bug twice is a postmortem trigger.
**Enforced by:** review. *(The one rule here with no machine check — which is itself worth noticing.)*
