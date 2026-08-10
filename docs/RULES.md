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

*The cap is keyed to phrasings proven, and R-12's counts are keyed to facts answered — so the
scheduler and the screen use two different notions of "known", deliberately. A fact can be
Mastered on screen and still be held at six days here. Stated in full in D-032 rather than left
to be discovered when a number and a due date seem to disagree.*

### R-7 · Readiness is never computed from data with a known tell
While L-002 and L-003 are open, multiple-choice performance does not feed any readiness figure.
**Enforced by:** the deck ratchet in `baseline.ts`; the exam-format number ships only when the
numeric-rank measurement reaches its target.

### R-8 · No personal data, ever · **narrowed by D-034, 11 Aug 2026**
No email, name, date of birth, nationality, immigration case detail, exam booking reference, URN,
exam date or time, IP address, device identifier, analytics or third-party tracker. Enforced in the
schema, not the interface.
**Enforced by:** the BRIEF data inventory, diffed against the live schema by the docs-consistency test
once a schema exists.

*This rule also read "and no third party", flatly. D-034 accepted explain-on-demand, so that clause
is narrowed rather than quietly ignored — which is the whole reason a rule change needs a decision
first. **One third party is permitted: a model API, for explanation only**, under the five
conditions the re-run screening in the BRIEF names. It sends one card and the handbook passage; it
sends no review history and no identifier; nothing it returns is stored into the deck, the schedule
or the readiness model; and the app works with no network and no key. Any other third party, or any
of those conditions failing, is still forbidden and needs its own entry. The disclosure this leaves
— that the account holder is studying the citizenship test — is L-040, and only the owner can
accept it.*

### R-9 · Raw colours and sizes appear only in `tokens.css`
Components reference semantic tokens. A token system without its check is decoration.
**Enforced by:** `stylelint-declaration-strict-value` in `npm run lint:css`, in CI and pre-push.

### R-10 · Every bug fix ships with a regression test in the same commit
The fix without the test is half a fix. The same bug twice is a postmortem trigger.
**Enforced by:** review. *(The one rule here with no machine check — which is itself worth noticing.)*

### R-11 · Nothing derived from the review log may drive what is on screen mid-card
The card, its phrasing, its option order and its verdict are fixed when the card is dealt and
do not move until the reader asks for the next one. Answering appends to the log, so anything
computed from the log changes underfoot at the exact moment it is being acted on. This has
caused two separate bugs (L-019, L-021).
**Enforced by:** `app.test.tsx` — option order and card identity asserted stable across
answering, enumerated over every section, and both assertions verified by reverting the fix.

### R-12 · Every number on screen counts facts, and New + Mastered + Mistakes is the deck
No count, headline, section label or progress bar is a count of phrasings. The several phrasings
per fact are the mechanism that lets the app tell knowing a fact from knowing one sentence, and
they are never the measure (D-032). The three standings partition the deck exactly — that is what
stops four numbers on one screen from each being right and jointly meaningless, which is what they
were. It holds by construction: one function classifies each fact once and everything else is a
projection of it.
**Enforced by:** `counts.test.ts` — the partition over generated logs, the transitions on a single
answer, and an assertion that no coverage figure exceeds the fact total. Both halves of the
original defect were reintroduced and watched to fail it.
