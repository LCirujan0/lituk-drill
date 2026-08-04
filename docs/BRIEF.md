# BRIEF — Life in the UK drill app (v1)

> **The intent anchor.** Written at Phase 0 on 4 August 2026, then amended ONLY via a superseding
> DECISIONS entry that names the section it changes. `/jorge-drift-check` diffs the project against
> this file every run.
> **Firewall rule: this file contains NO technology choices.** What and why live here; how (stack,
> libraries, infrastructure) lives in `ARCHITECTURE.md` and `DECISIONS.md`. Reversing a tech decision
> must never reopen this file.

---

## Press release (written as if v1 just shipped)

For one person sitting the Life in the UK test, this is a drill app that makes it impossible to pass
by memorising questions instead of learning the material. Every fact is asked several different ways,
one schedule per fact, and a fact cannot bank a long interval until it has been answered correctly on
more than one phrasing. Today, people with this problem use the official TSO app (£5.99, a fixed
question bank), lifeintheuktestweb.co.uk (free, crowd-sourced, sometimes wrong), or Anki (the
scheduling is right, everything else about it is wrong for this, and £25 on iOS). All three share the
same defect: they tell you how many questions you have answered, never whether you know the material,
and you cannot tell the difference from inside. This one answers a different question — *would I pass
today?* — with a number that can go down, and that has been checked against a real mock rather than
merely asserted.

## Users and jobs

| User type | The job they hire this to do | First-value moment |
|---|---|---|
| The owner. One user, forever. | "Keep putting my mistakes back in front of me until they stop being mistakes, and tell me honestly when I'm ready." | Ten minutes on an iPhone, on a sofa, that visibly moved a number. |

There is no second user type. No signup, no sharing, no multi-tenancy. Identity exists only to
recognise the same person across two devices.

## Outcome

**The one measurable outcome v1 exists to move: the proportion of the 410 facts that can be answered
correctly when the question is phrased in a way that has not been seen before.**

Not questions answered. Not hours logged. Not streak length. If a metric can be moved by grinding the
same question, it is the wrong metric and does not belong on a screen.

This wording is load-bearing and has already invalidated one measurement: see R1.

## v1 scope

Every build task must trace back to a line here. A task with no parent line is drift by definition.

- **S1 — Drill new material on a phone.** One-handed, full screen from the Home Screen, working
  offline once loaded. The phone is the primary device; the laptop is a wide phone.
- **S2 — Scheduled review that returns mistakes.** Spaced repetition where the unit is the fact, not
  the question, with a breadth requirement that stops a long interval being banked on one memorised
  sentence.
- **S3 — Practise on demand.** Sit down and work only the things gone wrong, outside the schedule, as
  often as wanted, without corrupting the schedule.
- **S4 — A defensible readiness answer.** A number that means something specific, that can go down,
  and that is checked against measurement rather than only modelled.
- **S5 — The same schedule on both devices.** Studying on the phone and later opening the laptop must
  never lose a grade. No sign-in, no account, nothing to remember.
- **S6 — Carry forward existing progress.** The schedule accumulated in v0 transfers into v1 intact.
  Shipping a reset in mid-September would be worse than shipping nothing. *(4 August 2026: there was no
  accumulated progress when this was written — see D-022. The line stands and becomes load-bearing the
  moment daily use of the deployed v0 begins, since by mid-September that is six weeks of schedule.)*
- **S7 — Question forms that resist being memorised as forms.** More ways to ask each fact, weighted
  toward the facts that keep being missed. See R2 — this is the hardest open problem in the project.
- **S8 — Content correctness enforced mechanically.** The deck's structural integrity is a build
  gate, not an act of vigilance.
- **S9 — The chronology stays.** The ten-era timeline ported as a static reference. Not scheduled,
  not scored — it is the thing to read first, and it earns its place by being read. *(Added 4 August
  2026: a gap in the original eight lines, caught during the Phase 1 questions.)*

## Non-goals (v1 will NOT…)

Shipping any of these requires a superseding DECISIONS entry first.

| Not in v1 | Why it is tempting | Why not |
|---|---|---|
| Other subjects or decks | The obvious next step | Deliberately rejected. One app, one subject. No deck abstraction, no deck picker, no `deck_id` "just in case" — that is precisely the generalisation this project chose against |
| Other users, sharing, accounts for friends | Cheap once identity exists | One user, forever |
| In-app card authoring | Feels necessary | Content is data in the repo, edited in an editor, validated by the build |
| LLM-generated questions | Powerful, and would help R2 | Not in v1. If it ever changes, KICKOFF-APP §G applies in full |
| A native iOS app | The primary device is an iPhone | Add to Home Screen is indistinguishable for this use case |
| Anything about the citizenship application | Same subject, shared context | A one-way door, closed. See Data inventory |
| Storing the exam date or booking details | Would let readiness count down | Excluded by the line above. Readiness answers "if you sat it today", which needs no date and is more honest |
| Analytics of any kind | Free, standard, feels harmless | One user who is also the operator. There is nothing to learn that cannot be asked directly |

## Appetite

**Big batch — up to 6 weeks. Fixed time, variable scope.** The clock starts at Phase 2 scaffold and
therefore expires around **18 September 2026**. When the budget runs out, unfinished scope is cut, not
extended.

**The exam deadline is neutralised only while a fallback actually exists.** *(Corrected 4 August 2026
by D-022. This section previously asserted that a working v0 was already deployed and in daily use,
and that it carried the test on its own. That was taken from the kickoff input, never verified, and
was false — there was no deployment and no accumulated schedule. Everything built on it was resting on
nothing.)*

v0 is now genuinely deployed, at **https://lituk-drill.vercel.app**, verified serving byte-identical
copies of `index.html` and `facts.js`. So the arrangement holds again — **from today, and only if
daily use actually starts.** If it does, then if v1 is not ready by **20 September 2026** the test is
sat on v0 and nothing is lost, and a shortcut justified with "the test is in September" is the failure
this arrangement exists to prevent. If daily use does not start, there is no fallback, the deadline is
not neutral, and the appetite needs re-deciding as a superseding DECISIONS entry rather than
absorbed silently.

**End of life is declared, not discovered.** The exam is 25 September 2026. On **26 September 2026**
this project is archived unless a new stated purpose is logged as a DECISIONS entry on or before that
date. It is explicitly fine for this to be a product that stops being needed.

## Risks & rabbit holes (pre-mortem)

Two independent passes, 4 August 2026. The owner's list was written first; Claude's was written and
sealed to `docs/premortem-claude-sealed.md` *before* the owner was asked, so independence is checkable
from the file timestamp rather than asserted. Merged below.

| # | Failure mode | Mitigation / tripwire |
|---|---|---|
| **R1** | **The readiness number measures option-shape recognition, not knowledge.** Measured in the current deck: the correct answer is a middle value among four numeric options in **91.4%** of 373 all-numeric forms (chance: 50%), and the longest option in **40.2%** of 749 forms (chance: 25%). Answer position is clean. So "pick a middle number" scores ~91% while knowing nothing, and any readiness score built on multiple-choice data reads high and means little. | A statistical test over the deck runs in the build: answer position, length-rank and numeric-rank distributions must sit within tolerance of chance, and a newly-added form that skews them fails the build. Separately, the readiness number is computed from free-recall grades only, so the tell cannot reach it. |
| **R2** | **The question bank gets memorised.** 1,228 fixed forms drilled for eight weeks is a bigger bank, not a different kind of thing — the exact failure this project was founded to prevent. It fails worst where it matters most: the facts missed most often are drilled most often, so their surface is the most likely to be learned in place of the fact. | Option sets that are never identical twice, so there is no stable surface to memorise — which also removes R1 at the root. Additional phrasings targeted at repeatedly-missed facts rather than spread evenly. **This is the hardest open design problem in the project and gets its own mini-spec before any code.** |
| **R3** | **A wrong fact ships and is drilled to permanence.** 12 facts are flagged unverified today. The trap is sharper than staleness: the examinable answer is the handbook's *even where the handbook is now factually wrong*, so correcting a figure to present-day truth introduces an error while looking like a fix. Spaced repetition then does its job perfectly on the wrong fact. | Every fact carries its source (handbook edition and page). The build fails while any verify flag remains unresolved past its stated due date. The 12 are resolved against the printed book as a gated task before v1 is used in anger, and each resolution is logged with which way it went and why. |
| **R4** | **The scheduler regresses silently in the rewrite.** Five interacting extensions (breadth gate, fact-level lapse, spaced relearning, post-lapse resume, leech taper and fuzz) under changed ordering and rounding. An interval that quietly clamps to 1 day has no symptom and no stack trace; v0's equivalent bug was found only by simulation. | A simulation over simulated time is part of the test suite from before the rewrite starts, with v0's behaviour as the golden baseline. Invariants asserted on every run: no interval ever violates the breadth requirement; the queue always drains; every fact is reachable in the modes actually used; no due date moves backwards without a lapse. Not a one-off script — a build gate. |
| **R5** | **Six weeks go on scaffolding and the three features that matter land last or get cut.** v0 already does the basics well. The infrastructure, identity, design tokens, accessibility and build gates can consume the entire appetite, leaving a beautifully engineered app that does what a single file did, minus the readiness answer. | The three thesis capabilities (S3, S4, S7) are built first, behind a seam, before any infrastructure. **Hard tripwire: if practice-on-demand and the readiness number are not working by the end of week 3, cross-device sync is cut — not the features.** |
| **R6** | **The readiness number is built to reassure, and therefore lies.** A percentage that only rises reads 94% while unverified facts are still wrong and negatively-framed material has never been tested. It is the single output capable of sending someone into the exam confident and wrong. | Defined before it is designed (done — see S4 and DECISIONS D-003). Required by construction to be able to fall. Calibrated at least twice against a measured mock, with the model's prediction and the mock's score both written down. A readiness model never checked against reality is decoration and will be treated as a finding. |

**Below the line — converted into build assertions rather than carried as risks:**

- Practice can never lengthen an interval, only shorten it. *(Makes the worst version of the free-practice failure structurally impossible.)*
- Every fact has at least two recall-usable question forms. **Six facts fail this today** (17, 218, 222, 223, 357, 367), which pins them below the breadth requirement forever in recall-only use; 43 more have only two.
- No question form is served verbatim by two different facts. **Facts f193 and f352 fail this today** — both serve "The Scottish Parliament and the Welsh Assembly first met in which year?", so one memorised sentence earns breadth credit on two separate facts, which is the specific thing the breadth requirement exists to prevent.
- A question stem shared across facts with different correct answers must be multiple-choice only. **Facts f205 and f206 fail this today** — both served as free recall, where several answers are legitimately correct and the honest answer is marked wrong.

**Governance declarations, from the pre-mortem's second pass:**

- **The process is scaled to the project, in writing.** The full kit prescribes ~10 living documents, a
  ledger, four audit skills and a launch gate for a single-user app with an eight-week useful life.
  Which parts are in and which are consciously waived is recorded as a decision. Waived-by-decision is
  clean; skipped-in-silence is drift.
- **Identity must never be a single point of failure.** The app remains fully usable — read and write,
  offline, from the Home Screen — with no network and no sign-in. Verified by an airplane-mode cold
  load that completes a session and syncs afterwards.
- **v0 is untouchable.** It stays deployed and in daily use throughout. No session modifies it and no
  session deploys over it.

**Rabbit holes — decisions likely to be reversed mid-build, settled now or explicitly fenced:**

| Rabbit hole | Status |
|---|---|
| Whether cross-device sync justifies its cost | **Settled** — DECISIONS D-002 |
| Whether practice writes to the schedule | **Settled** — DECISIONS D-003 |
| What "ready" means numerically | **Settled** — DECISIONS D-004 |
| How question forms stop being memorisable (R2) | **Fenced** — needs a mini-spec before any code. Do not start it as a side quest inside another feature |
| How the recall-probability model is calibrated | **Fenced** — a first version may be crude, but the calibration mechanism ships with it, not after |

## Data inventory

**The app stores no personal data of any kind.** There is no sign-in, no account and no identity, so
there is nothing in the system that identifies a person. *(Revised 4 August 2026 — D-011 removed the
email address that the original inventory carried.)*

| Field group | Personal data? | Purpose | Retention | Deletion mechanism |
|---|---|---|---|---|
| Review events — fact reference, form reference, grade, timestamp, mode (scheduled / practice / mock) | **No** — not linked to any identifier | The schedule cannot be derived without them | Life of the app | "Erase all progress" wipes local and remote |
| Derived schedule state — interval, ease, lapses, breadth, due date | No | Serving the right card at the right time | Life of the app; rebuildable from review events | As above |
| Readiness history — date, modelled prediction, measured mock score | No | Calibration. Without the history, R6's mitigation cannot function | Life of the app | As above |
| Deck content — facts, question forms, sources | No | The questions | Lives in the repository | n/a |

**Deliberately never stored — enforced in the schema and checked by the build, not by the interface:**
email address, name, date of birth, nationality, anything concerning the citizenship application, exam
booking reference, URN, case number, exam date or time, IP addresses, device identifiers, analytics of
any kind, third-party trackers.

**A schema column with no row in this table is a finding.** The consistency check enforces it.

### Lawful basis and DPIA screening

**Conclusion: no personal data is processed, so UK GDPR does not engage and no DPIA arises.**

The reasoning, because a screening that only states its answer is not a screening. UK GDPR applies to
personal data — information relating to an identified or identifiable natural person. What this system
holds is a list of which Life in the UK facts were answered correctly and when, with no identifier of
any kind attached: no account, no email, no name, no IP address retained, no device fingerprint, no
analytics. There is nothing to single anyone out by. Two independent grounds would each be sufficient
on their own even if that analysis were wrong: the domestic-purposes exemption covers processing by a
natural person in the course of a purely personal activity, and the sole data subject is also the sole
controller and the only beneficiary.

None of the ICO's high-risk criteria are met: no special-category data, no systematic monitoring, no
large-scale processing, no vulnerable data subjects, and no automated decision producing legal or
similarly significant effects — the readiness score is advice to its own author, who remains free to
ignore it and sit the exam anyway.

**Exposure assessment, since the sync endpoint is unauthenticated by decision (D-011).** The realistic
worst case is that someone finds the endpoint and reads a list of citizenship-test facts that were
answered wrongly, or writes junk events into it. The first is disclosed here as accepted and
uninteresting. The second cannot destroy anything: the event log is append-only, each device holds its
own authoritative copy, and a corrupted remote log can be discarded and re-seeded from the phone. If it
happens, it is a ledger row and a rotation of the endpoint path — not a breach notification, because
there is no personal data to notify anyone about.

**Migration rule, agreed now:** schema changes are additive and idempotent, applied to production as a
deliberate step. A change that alters the shape of existing data decides that data's fate in the same
step — never later, never implicitly.

## Definition of done (per milestone)

Works + verified by the stated method + build gate green + committed and pushed + deployed +
migrations applied as a deliberate step + documentation reconciled in the same step + ledger updated +
scope boundary intact + a "what changed / why / what's next" summary.

**Anything short of that returns to open. It is never demoed, logged, or reported as done.**

For this project specifically, "verified" has three named methods:
- **Scheduling logic** → simulation over simulated time with invariant assertions. Never by reading the
  code, never by clicking through a few cards.
- **The readiness number** → independent recomputation, plus at least one measured mock compared
  against the model's prediction, both written down as numbers.
- **Deck content** → structural and statistical checks in the build, plus resolution against the
  printed handbook for anything flagged.

## Launch gate

There is no public launch and no third-party data, so the gate is narrow but binary. Before this app
is relied on for real study in place of v0:

1. `/jorge-launch-gate` passes. An open Critical anywhere is a NO-GO.
2. All 12 unverified facts resolved against the printed handbook, each resolution logged.
3. The scheduler simulation and its invariant assertions are green in the build.
4. The deck's statistical checks are green — no answer-position, length or numeric-rank tell.
5. The readiness model has been calibrated against at least one measured mock, with both numbers
   recorded.
6. v0 still deployed and untouched at its own address, and the existing schedule verified as imported
   intact.

## Postmortem triggers (pre-declared)

A five-line blameless retro plus a machine tripwire is mandatory when:

- a regression is caught manually rather than by the suite;
- the same bug is fixed twice;
- a logged decision is reversed;
- **a factual error is found in the deck after it shipped** *(project-specific)*;
- **the readiness number is found to disagree with a measured mock by more than 15 points**
  *(project-specific — the model was wrong, and a wrong readiness model is the most dangerous defect
  this app can carry)*.

A postmortem without an action item is no postmortem.

## Clarifications log

**4 August 2026 — Phase 0 interrogation.**

- Cross-device sync is worth the cost. Local-first with a synchronising store behind it; a grade must
  never wait on the network. → D-002.
- Practice outside the schedule writes failures and discards successes. A miss during practice is real
  evidence; a success is contaminated by having chosen and just seen the card. Practice may shorten an
  interval, never lengthen one. → D-003.
- "Ready" means the probability of scoring at least 18 of 24 if the test were sat today, modelled from
  per-fact recall probability and calibrated against measured mocks on unseen forms. → D-004.
- Repository is public. Branch protection on the free plan is only available that way, and the content
  is publishable — facts are not copyrightable and no handbook text is reproduced. → D-005.
- Unattended sessions have full autonomy including production deploys, fenced so that v0 can never be
  a deploy target. → D-006.
- Nothing from the citizenship application belongs in this app. Confirmed flat no. Extended by
  agreement to exclude the exam date and time as well, which the chosen readiness definition does not
  need. → D-007.
- Existing v0 progress transfers into v1. A mid-September reset would be actively harmful. → S6.
- Deck measurements taken during Phase 0 and recorded above as R1 and the four below-the-line
  assertions: the numeric-distractor tell (91.4% vs 50%), the length tell (40.2% vs 25%), six facts
  with one recall-usable form, and the 193/352 and 205/206 content defects.

## Feature mini-specs

Practice on demand (S3) and the readiness signal (S4) still need theirs before any code is written.

### S7 — question forms that resist memorisation · *approved 4 Aug 2026, built*

**Problem.** Two failures share one cause. R1: the correct answer is a middle value in 91.4% of 373
all-numeric forms against 50% by chance, so "pick a middle number" scores ~91% knowing nothing, and
any readiness figure built on multiple-choice data inherits it. R2: 1,228 fixed forms drilled for
eight weeks is a memorisable bank — the same failure this project exists to prevent — and it bites
hardest on repeatedly-missed facts, which are drilled most. Both come from option sets being fixed
and bracketing the truth.

**Appetite.** Days, not weeks. It sits in front of S4, which is untrustworthy until it lands.

**Solution sketch.** Numeric forms carry a *derived* generation rule: the true value, a template, and
a candidate pool with depth on both sides, with the scale inferred from the spread of the author's own
distractors. At presentation, a target rank is drawn uniformly from those achievable and distractors
chosen to place the true value there. Non-numeric forms keep their authored options, with display
order randomised.

**Rabbit holes.** Generating *text* distractors — rejected as out of appetite and prone to producing
accidentally-correct options. Rewriting the 56 forms whose options are differently-worded sentences —
that is authoring, not engineering. Storing the rules in the deck files — rejected; see D-021.

**No-gos.** Never changes what a question asks. Never alters the stored options, so the round-trip
proof against v0 keeps covering the whole deck. Never introduces a *narrower* tell in place of a
broader one.

**Acceptance criteria + verification.**
- On-screen middle-value rate at or below 53%, from 91.4%. **Met: 52.7%**, measured across every
  all-numeric form using whichever path a reader actually gets.
- Rank distribution within 20–30% at every rank over 8,000 draws. **Met: 25.0 / 25.0 / 24.9 / 25.1.**
- At most one form unable to reach all four ranks. **Met: one** (`f387[2]`, the £3,000 small-claims
  limit — its answer is never the largest option).
- The correct answer appears exactly once, options never duplicate, order is reproducible from a
  seed. All asserted.
- Ratcheted in `baseline.ts`, so none of the above can regress unnoticed.
