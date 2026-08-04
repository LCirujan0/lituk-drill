# DECISIONS

ADR-style. Monotonic ids, never renumbered. One entry = **Context** (the forces) / **Decision**
("we will…") / **Consequences** (positive **and** negative).

**A decision is reversed by writing a NEW superseding entry that names the one it replaces.** The old
entry gets a banner and stays. Nothing here is ever deleted — the reasoning is the asset.

> Opened at Phase 0, 4 August 2026, ahead of the normal Phase 2 schedule. The BRIEF firewall forbids
> technology choices in `BRIEF.md`, and four architecture decisions were settled during the Phase 0
> interrogation. Without this file they would have existed only in chat, which is the failure the
> firewall and the BRIEF are jointly designed to prevent.

---

## D-001 — Build v1 as a new application; v0 is reference, not a base

**Date:** 4 August 2026 · **Status:** accepted

**Context.** v0 is a single 28 KB HTML file with an inline scheduler, in daily use and deployed. It
works. The temptation is to extend it, because every marginal feature is cheap in a file that already
runs. Against that: v1's three thesis capabilities (practice on demand, a readiness model, forms that
resist memorisation) each need state and structure v0 has no room for, and the deck needs mechanical
validation that a file with no build step cannot have. The counter-risk is R5 — that a rewrite spends
the entire appetite re-achieving what already works.

**Decision.** v1 is written fresh. v0's `index.html` is read as the reference for scheduler behaviour
and is never edited, extended, or deployed over. `facts.js` is the crown jewel: its **data** is
preserved exactly, its **format** may be re-modelled where there is a stated reason.

**Consequences.**
- *Positive.* The scheduler can be extracted as pure functions and tested independently, which is the
  only way R4 gets caught. The deck gains validation it structurally cannot have today. v0 stays a
  known-good fallback throughout, which is what makes the exam deadline neutral.
- *Negative.* Everything v0 already does must be rebuilt before v1 is usable at all — the single
  largest contributor to R5. Two implementations of the scheduler exist during the build, and they
  will disagree in small ways; deciding which is right will cost time. The 60-day simulation must be
  written against v0 first, purely to establish a baseline, which is work that ships no feature.

---

## D-002 — Local-first, with cross-device sync over an append-only review-event log

**Date:** 4 August 2026 · **Status:** accepted · **Supersedes nothing; refines the owner's day-one intent**

**Context.** The owner's default was Postgres from day one. The honest case is mixed and was put to
him plainly. *For:* study happens on an iPhone and a Windows laptop and the schedule must match on
both; browser storage does not sync and Safari can evict it, so losing the schedule three weeks before
the exam is a real and bad outcome; and learning this stack properly is a stated goal of the project,
which makes the build value rather than overhead. *Against:* one user, one subject, ~230 KB of static
content — everything except sync works with no infrastructure at all, and a database brings identity,
migrations, a live service, cold starts, and the whole of the data-protection section.

Two further forces narrowed the options before he chose. First, the quality bar rules out a database
as the primary store outright: a grade button that waits on a network round-trip before showing the
next card will not be used, so any answer had to be local-first. Second, the obvious sync
implementation — last-write-wins over a serialised state blob, which v0's state object invites — loses
data silently: study on the phone on a train, open the laptop later, and the day's grades are
overwritten with no error and no symptom. That would make the database *worse* than none, since it is
the only thing the database was bought for.

**Decision.** State lives locally and the interface never waits on the network. The **source of truth
is an append-only log of review events** (fact reference, form reference, grade, client timestamp,
mode); scheduler state is **derived by replaying that log**, never stored as the authority.
Synchronising is therefore uploading and merging events, which is commutative and cannot lose a grade.
Postgres is the durable store behind it. Identity sits behind an adapter seam with no public
registration.

**Consequences.**
- *Positive.* Merges cannot lose a grade — the property the database was bought for actually holds.
  Derived state is rebuildable from history, so a scheduler bug can be fixed and the corrected schedule
  recomputed from the same events rather than being permanently corrupt. The event log doubles as the
  data the readiness model (D-004) needs and as the mistakes history the practice mode (D-003) needs;
  three features share one substrate. Offline is the default rather than a feature. The stack-learning
  goal is served genuinely.
- *Negative.* This is materially more work than storing scheduler state directly, and it is work with
  no visible output — the single largest concrete contributor to R5. Replay must be deterministic,
  which constrains the scheduler's use of randomness: v0's ±5% fuzz and its shuffles must become
  seeded and reproducible, or the same events will derive different schedules on two devices. Clock
  skew between phone and laptop becomes a real concern that a state blob would not have had. The event
  log grows without bound, and while it will stay trivially small at this scale, "small enough not to
  matter" is an assumption that goes unexamined until it isn't. And the whole data-protection section
  of the BRIEF exists only because of this decision.
- **Tripwire (from R5).** If practice-on-demand and the readiness number are not working by the end of
  week 3, **this decision is cut and the app ships local-only.** The event log is designed so that
  removing sync removes infrastructure, not architecture.

---

## D-003 — Practice writes failures to the schedule and discards successes

**Date:** 4 August 2026 · **Status:** accepted

**Context.** Strict spaced repetition says stop when nothing is due; the owner wants to sit down and
work his mistakes on demand, as often as he likes. The question — flagged in the project input as one
that "gets the app quietly stopping working while appearing fine" if answered wrongly — is whether
that practice writes to the scheduler. Full writes are simplest and are the trap: one long evening
pushes hundreds of facts out to long intervals on the back of soft self-grading, the queue empties, and
"nothing due" becomes indistinguishable from "done". No writes at all is safe but throws away the most
valuable signal the owner produces, and lets the app keep drilling a leech he has genuinely just fixed.

**Decision.** Practice grades are **asymmetric**. A failure during practice is written to the schedule
and lapses the fact exactly as a scheduled failure would. A success during practice is recorded in the
event log for statistics and for the mistakes queue, but does **not** advance the schedule. Enforced as
an invariant with a test: **a practice session can never increase any fact's due date.**

**Consequences.**
- *Positive.* This is not a compromise between the two options but the correct epistemics of the
  situation. A miss is real evidence of not knowing, regardless of context. A success is contaminated
  evidence: the card was self-selected, it was seen moments ago in the same session, and it measures
  recency rather than retention. Writing the failures and discarding the successes is what the
  information is actually worth. The invariant makes the catastrophic version structurally impossible
  rather than merely unlikely, so it can never be reintroduced by a later refactor without failing a
  test. Practice can only ever make the schedule more conservative.
- *Negative.* Grinding a difficult fact until it is right never clears it from the schedule, which will
  at some point feel unfair and arbitrary — the app appears to punish effort. That is the intended
  behaviour and it will still be irritating. It also means practice cannot substitute for scheduled
  review even when it genuinely should, so real learning during practice is under-credited and the
  review load stays slightly higher than a perfect model would require. Two grade paths must be
  maintained and tested rather than one.

---

## D-004 — "Ready" means P(score ≥ 18/24 if sat today), modelled and calibrated against measured mocks

**Date:** 4 August 2026 · **Status:** accepted

**Context.** SM-2 has no concept of done, and the absence of an honest answer to "would I pass?" is the
single biggest gap in every competing app. The meaning had to be settled before anything was designed,
because the easy implementations are all dishonest: a percentage of facts at a long interval only ever
rises, reads in the nineties while unverified facts are still wrong, and is unfalsifiable. The only
external anchor available is the exam itself — 24 questions, pass mark 18.

R1 constrains the answer severely. Multiple-choice performance in the current deck is inflated by a
measurable tell (the correct answer is a middle value in 91.4% of all-numeric forms against 50% by
chance), so any readiness number computed from quiz data would substantially be measuring a heuristic.

**Decision.** The daily number is the **probability of scoring at least 18 out of 24 if the test were
sat today**, computed from per-fact recall probability that decays with time since last review and is
adjusted by lapse history and breadth. It is computed from **free-recall grades only** — multiple-choice
answers never feed it. Ground truth comes from periodic in-app **mocks drawn from forms not yet seen**,
scored honestly; the model is the dial and the mock is the check. Both numbers are stored. Where they
diverge, the model is wrong and changes.

**No exam date is stored anywhere**, which the "if sat today" framing makes unnecessary.

**Consequences.**
- *Positive.* The number means one specific thing, and that thing is the question actually being asked.
  It falls with time, which a progress bar cannot. It is falsifiable, which is the entire difference
  between a readiness model and a motivational graphic — and the mock/model divergence is already a
  declared postmortem trigger at 15 points. Excluding multiple-choice data severs R1 from the metric
  even before the deck is fixed. Refusing a target date keeps the app clear of the citizenship
  application entirely (D-007) and avoids modelling study that has not happened.
- *Negative.* This is the most work of the four options and depends on a recall-probability model that
  is a guess until calibrated — early readings will be wrong, and possibly confidently wrong. Mocks are
  expensive in a way that compounds: each one consumes unseen forms, which are a finite and already
  scarce resource (six facts have only one recall-usable form today), and it directly aggravates R2 by
  spending exactly the material that resists memorisation. A 24-question mock is also a small sample —
  ±10 point swings are noise, and reading them as signal would be its own failure. Because the number
  can fall, it will sometimes fall the week before the exam, which is honest and will not feel good.

---

## D-005 — Public repository on GitHub Free

**Date:** 4 August 2026 · **Status:** accepted

**Context.** The account is on the Free plan, where private repositories get neither branch protection
nor push protection. The kit requires this be logged either way. The alternatives were a private repo
compensated by a local pre-push hook, or ~$4/month for Pro on an app whose declared end of life is
September.

**Decision.** The repository is public. Content is publishable — facts are not copyrightable and no
handbook text is reproduced, as v0's README already argues — and no personal data lives in the repo:
review history is in the database, and the exam date is stored nowhere (D-007).

**Consequences.**
- *Positive.* Branch protection and push protection at no cost, so the build gate is a real gate rather
  than an honour system on one machine. Secret scanning is on by default. No monthly cost on a project
  with a declared end of life.
- *Negative.* The code, the deck and every commit message are world-readable, including work in
  progress and any mistakes made along the way. A secret committed by accident is immediately public
  rather than merely exposed — push protection reduces this but does not eliminate it, which is why
  `gitleaks` runs in the build regardless. The deck represents the single hardest-to-reproduce asset in
  the project and is now freely copyable.

---

## D-006 — Unattended sessions have full autonomy, fenced away from v0

**Date:** 4 August 2026 · **Status:** accepted

**Context.** The owner chose full autonomy for unattended sessions, including production deploys. The
specific hazard is not abstract: v0 is deployed and in daily use on the same Vercel account, seven
weeks before the exam, and the entire "the deadline is neutralised" arrangement in the BRIEF depends on
v0 remaining alive. One plausible-looking `vercel --prod` in the wrong directory removes the fallback.
The hazard compounds at the browser: v0 keeps the whole schedule in `localStorage` under `lituk.v2`, so
anything v1 deploys to v0's origin inherits and can overwrite that state.

**Decision.** Full autonomy stands as the owner's decision, bounded by a hard fence rather than a
convention. **v1 is a separate Vercel project at a separate address, and v0's project is never a deploy
target for any session.** Enforced as permission deny-rules in `.claude/settings.json` — a machine
check, not a line in a document.

**Consequences.**
- *Positive.* Unattended work runs at full speed on the thing that matters while the fallback is
  structurally unreachable. A separate origin also means separate browser storage, so v1 cannot corrupt
  v0's schedule even by accident. The rule is enforced where rules survive, rather than written where
  they decay.
- *Negative.* An unattended session can still ship a broken v1 to its own production, and with a public
  repository that breakage is visible. Deny-rules constrain this project's known commands and are not a
  general guarantee. Two deployments must be kept straight, and the risk of opening the wrong URL on a
  phone at 11pm and drawing conclusions from the wrong app is real and not addressed by any deny-rule.

---

## D-007 — No citizenship-application data, and no exam date, ever

**Date:** 4 August 2026 · **Status:** accepted · **One-way door — deliberately**

**Context.** The app shares a subject with an active citizenship application but is a study tool, not a
record of that application, which is tracked in a separate private repository. Confirmed flatly. The
boundary was then extended during the interrogation: the exam date and time are also excluded, since
the readiness definition chosen in D-004 does not need them and the repository is public (D-005).

**Decision.** Never stored, enforced in the schema and checked by the consistency test rather than by
the interface: name, date of birth, nationality, anything concerning the immigration case, exam booking
reference, URN, case number, exam date or time, IP addresses, device identifiers, analytics of any
kind, third-party trackers. The only personal data is one email address used solely to link two
devices, plus the practice history the scheduler is derived from.

**Consequences.**
- *Positive.* The data-protection surface stays at one email address and a list of grades, which is
  what makes the DPIA screening in the BRIEF straightforward and honest rather than strained. A public
  repository stays safe to be public. Enforcement in the schema means the rule cannot decay into a
  convention.
- *Negative.* Genuinely useful features are excluded by this: no countdown, no "you have N study days
  left", no readiness projected forward to exam day, no scheduling of revision against the actual date.
  Some of those would have been good. This is a one-way door and is being closed knowingly — reopening
  it requires a superseding entry, not a convenient exception.

---

## D-008 — Next.js on Vercel, confirmed rather than defaulted

**Date:** 4 August 2026 · **Status:** accepted

**Context.** The owner's global default stack. It was tested against the alternative during Phase 0
rather than assumed: for an offline-first, single-user, ~230 KB static-content app, a plain client-side
application with no framework would also work, and v0 proves it. The deciding forces were that D-002
requires a server for sync and identity, that Vercel is already the deployment target and already
authenticated, and that learning this stack properly is an explicit goal of the project rather than an
incidental.

**Decision.** Next.js deployed on Vercel. Scheduler and readiness logic are written as pure functions
in a domain layer with no framework or vendor types, so they can be tested and simulated in isolation
— the requirement R4's mitigation actually depends on. Identity and the data store sit behind adapter
seams.

**Consequences.**
- *Positive.* One deployment target, already authenticated, with preview deployments per push. The
  server needed for D-002 comes with the framework rather than as a separate service. The pure-function
  domain layer makes the simulation test possible at all, and keeps the option of cutting sync (D-002's
  tripwire) cheap.
- *Negative.* Considerably more machinery than this app needs — a build step, a framework, and a
  hydration model, where v0 needed none of it. Framework and platform upgrades become ongoing
  maintenance on a product with a declared eight-week life. Vendor lock-in to Vercel is real, though
  mild at this size. Preview deployments are public URLs and need deployment protection configured
  deliberately.

---

## D-009 — The process kit is scaled to the project, in writing

**Date:** 4 August 2026 · **Status:** accepted

**Context.** The kit prescribes roughly ten living documents, a findings ledger, a docs-consistency
test, CI with gitleaks, pre-push hooks, Dependabot, branch protection, design tokens with lint
enforcement, four audit skills and a launch gate. This is a single-user study app with an eight-week
useful life, no third-party data and no public launch. Applied without judgement it consumes the
appetite as ceremony (R5); applied by quietly skipping parts it makes `/jorge-drift-check` report drift
on every run until the signal is worthless.

**Decision.** Scale deliberately and record it. **In:** BRIEF, DECISIONS, HANDOFF, CHANGELOG, LEDGER,
RULES, the project CLAUDE.md, CI with typecheck/lint/tests/gitleaks, the pre-push hook, branch
protection, design tokens with lint enforcement, Dependabot, and the docs-consistency test — because
every one of these is either a machine check or the anchor a machine check reads. **Consciously waived
for this project:** ARCHITECTURE.md and CONVENTIONS.md as separate documents (folded into HANDOFF and
the project CLAUDE.md at this size), performance targets at p75 (no public traffic exists), and the
error-reporting seam beyond an inert stub (one user who can report bugs by speaking).

**Consequences.**
- *Positive.* Everything retained is enforced by a machine rather than by memory, which is the kit's own
  stated hierarchy. Waived items are waived on the record, so drift-check has an accurate baseline and
  its findings mean something.
- *Negative.* Folding architecture notes into HANDOFF puts pressure on its 60-line cap, and the first
  thing to be squeezed out will be reasoning. If this project unexpectedly outlives September, the
  waived documents will have to be written retrospectively, which is more expensive than writing them
  now and always produces worse reasoning than writing them at the time.

---

## D-010 — The deck is stored as named TypeScript objects, split by chapter

**Date:** 4 August 2026 · **Status:** accepted

**Context.** v0 stores 410 facts as positional arrays — `[tag, chapter, verifyFlag, canonicalQ,
canonicalA, forms]`, with each form as `[question, [4 options], correctIndex, mcqOnly]`. Compact, and
the entire deck fits in 230 KB. But R3 ranks content errors as the most expensive bug class in the
project, and a positional array makes a content error invisible in a diff: reviewing a change means
counting commas. The 193/352 duplicate and the 205/206 ambiguity both survived in exactly that blind
spot. R2's fix also needs somewhere to put a distractor-generation rule, and R3's needs somewhere to
put a source citation — neither has a home without renumbering every position.

**Decision.** Named TypeScript objects, one module per chapter, with the deck's types defined once and
enforced by the compiler. The migration from `facts.js` is mechanical and scripted. It is verified by
round-tripping the new representation back into v0's positional format and asserting byte-for-byte
equality against the original file — not by reading the output.

**Consequences.**
- *Positive.* A wrong answer becomes visible in a pull request instead of being buried in a bracket.
  The compiler catches malformed facts before any test runs. `source` (R3) and generation rules (R2)
  both have a natural home. Five chapter files are individually reviewable where one 230 KB file is not.
- *Negative.* Roughly 2.5× larger on disk, and one enormous migration commit that no human will read —
  which is why the round-trip proof exists, and why trusting that proof is now load-bearing. Any
  future change to the deck's shape means touching five files and a codemod rather than one array. The
  v0 format must still be understood indefinitely, because the S6 import reads it.

---

## D-011 — No identity, no sign-in; sync is unauthenticated and single-tenant

**Date:** 4 August 2026 · **Status:** accepted
**Supersedes** the identity clause of D-002 and narrows D-007

**Context.** D-002 assumed an identity mechanism so two devices could be linked, and the original data
inventory carried an email address as the system's only personal data — which is what made the whole
data-protection section of the BRIEF necessary. Asked directly, the owner's answer was that nothing
should sit behind a login and that there are no security concerns here. Taken at face value: for a
one-person study app whose entire content is which citizenship-test facts were missed, that is a
defensible reading of the actual risk rather than a shortcut.

**Decision.** No accounts, no sign-in, no identity of any kind. The database is single-tenant by
construction — one event log, no owner column, nothing to authenticate against. Sync endpoints are
unauthenticated. The endpoint path is generated at deploy time and injected as an environment variable
rather than committed, which prevents drive-by discovery from the public repository; this is described
honestly as obscurity, not as security, because the path is visible in the client bundle to anyone who
looks.

**Consequences.**
- *Positive.* The system now holds **zero personal data**. UK GDPR does not engage, the DPIA question
  stops being interesting, and the public repository (D-005) is unambiguously safe. The single point of
  failure identified in the sealed pre-mortem as C11 is deleted rather than mitigated — there is no
  provider to break, no email to land in spam, no lockout possible three weeks before the exam. It also
  removes an entire vendor integration from the appetite, which is a direct reduction in R5.
- *Negative.* Anyone who finds the endpoint can read the review history and append junk to it. The
  first is accepted as uninteresting. The second is survivable rather than prevented: the log is
  append-only, each device holds an authoritative local copy, and a poisoned remote log is discarded
  and re-seeded from the phone — but that is a manual recovery the owner would have to notice he needs.
  Should this app ever gain a second user, this decision has to be reversed before that happens, not
  after, and reversing it means adding an owner column to a table that never had one.

---

## D-012 — Vercel Postgres · **amends D-008**

**Date:** 4 August 2026 · **Status:** accepted

**Context.** Supabase was recommended on the strength of an already-authenticated connection in this
session plus bundled identity. D-011 then deleted the identity requirement entirely, which removed most
of that advantage. The owner chose Vercel Postgres.

**Decision.** Vercel Postgres, on the same platform as the deployment.

**Consequences.**
- *Positive.* One platform, one dashboard, one bill, and connection strings wired into the deployment
  automatically with no secret to copy anywhere. With identity gone, a database is all that is needed,
  and this is the shortest path to one. No free-tier pause to worry about mid-revision.
- *Negative.* It is Neon underneath with a Vercel margin, so this is paying for integration rather than
  technology, and it deepens exactly the platform lock-in §D flags as a dead-end risk. Provisioning has
  to happen through the Vercel dashboard or CLI rather than from this session, so it is a step the owner
  must take. Migrating away later means moving deployment and database together.

---

## D-013 — Readiness reports two numbers: recall and exam-format · **supersedes part of D-004**

**Date:** 4 August 2026 · **Status:** accepted

**Context.** D-004 specified that readiness be computed from free-recall grades only, to keep the
measured multiple-choice tell (R1) out of the metric. Putting the question again exposed a flaw in that:
the real exam *is* multiple choice, so once distractors are tell-free, performance on a fresh option set
is a closer simulation of the exam than free recall — which is strictly harder than the test and would
systematically understate readiness. A number that reads 60% when the true figure is 85% is ignored for
the same reason a flattering one is.

**Decision.** Two numbers, both shown. **Recall** — P(pass) modelled from free-recall grades only.
**Exam format** — P(pass) modelled from multiple-choice performance on option sets not previously seen.
Mocks remain the ground truth for both. The gap between them is treated as signal, not noise: a wide gap
means the material is recognised rather than known, which is precisely the failure §A was founded to
detect.

**Consequences.**
- *Positive.* The pair is more informative than either alone and turns the project's founding thesis into
  something visible on a screen. It hedges R1 structurally — if the statistical check on the deck ever
  regresses, the recall number stays clean and the two diverge, which surfaces the regression rather than
  absorbing it. Neither number can be gamed without the other contradicting it.
- *Negative.* Two numbers is more to interpret than one, and on the morning of 25 September a divergence
  forces a judgement call under pressure — the exact condition in which a single number would have been
  kinder. It also doubles the modelling work and means two calibration curves against a mock sample of
  24 questions that is already too small to calibrate one well.

---

## D-014 — Numeric distractors are rule-generated; text distractors stay hand-written

**Date:** 4 August 2026 · **Status:** accepted

**Context.** R2 — the deck is a fixed bank of 1,228 forms and can be memorised as forms, which is the
failure this project exists to prevent. R1 — measurement shows the leak is overwhelmingly numeric: the
correct answer is a middle value in 91.4% of 373 all-numeric forms against 50% by chance, while answer
position is clean. Generating everything would fix both completely and does not fit the appetite;
generating nothing leaves both.

**Decision.** Numeric forms carry a generation rule; their four options are produced at presentation time
with the correct answer's rank randomised, so no numeric option set repeats. Text distractors stay as
hand-written pools. The statistical check in the build covers both and fails on a skew either way.

**Consequences.**
- *Positive.* Attacks precisely where the leak was measured, at a fraction of the cost of full generation,
  and most rules are derivable automatically from the existing distractors. Numeric mocks stop consuming
  scarce unseen material, which makes D-017 affordable. R1 is closed at the root rather than patched.
- *Negative.* Two mechanisms where one would be simpler, and generated options must be checked for being
  accidentally correct or obviously absurd — a generator that offers "about 3 years ago" for a
  prehistory question teaches nothing and looks broken. The ~855 text forms remain a fixed, finite,
  memorisable surface, so R2 is reduced rather than resolved and must stay on the risk register.

---

## D-015 — The grading scale is unchanged from v0

**Date:** 4 August 2026 · **Status:** accepted

**Context.** v0 uses Again / Hard / Good / Easy. "Hard" versus "Good" is genuinely ill-defined and will
be applied inconsistently, which is noise entering the readiness model. Against changing it: SM-2's ease
arithmetic is calibrated on this scale, S6 requires importing v0's accumulated history exactly, and R4's
golden baseline is only meaningful if the input space is identical.

**Decision.** Four buttons, same labels, same arithmetic.

**Consequences.**
- *Positive.* The v0 import is exact rather than mapped, and the simulation baseline stays valid — the
  two things R4's mitigation depends on. No relearning of a habit already formed over weeks of daily use.
- *Negative.* The Hard/Good ambiguity is carried forward knowingly, and its inconsistency propagates
  straight into the recall-probability model. The better data that answer latency would have provided is
  forgone; if the readiness model later proves poorly calibrated, this decision is a prime suspect and
  reversing it will cost the baseline.

---

## D-016 — The chronology is ported as a static reference · **adds scope line S9**

**Date:** 4 August 2026 · **Status:** accepted

**Context.** v0's Timeline tab — ten eras, twelve dates marked as worth knowing cold — was omitted from
the BRIEF's original eight scope lines. That was an oversight rather than a decision, caught while
scoping Phase 1. It is a static array, it is used, and v0's README calls it the thing to read first.

**Decision.** Ported as-is: a static reference screen, not scheduled and not scored. Added to the BRIEF
as S9.

**Consequences.**
- *Positive.* Cheap — a data file and one screen — and it preserves something already relied on. Keeping
  it unscheduled means it adds no surface to the scheduler, where R4 lives.
- *Negative.* It is dead weight in a spaced-repetition app: unmeasured, contributing nothing to either
  readiness number, and duplicating material already covered by the 201 history facts. It will look like
  an obvious candidate for enrichment later, and enriching it means a second scheduling concept.

---

## D-017 — Mocks draw 24 questions from unseen forms and record which were spent

**Date:** 4 August 2026 · **Status:** accepted

**Context.** D-013 makes mocks the ground truth for both readiness numbers, so they must be uncontaminated
— a mock drawn from forms already drilled twenty times measures memory of those forms, which is the
circular reasoning the whole readiness model exists to break. But unseen forms are scarce: six facts have
only one recall-usable form today.

**Decision.** A mock is 24 questions on the exam's format, drawn from forms not previously served, with
each spent form recorded so no later mock reuses it. Available on demand. The score is stored alongside
the model's prediction at that moment, which is what makes the 15-point divergence postmortem trigger
enforceable.

**Consequences.**
- *Positive.* Mirrors the real exam exactly, and stays honest ground truth. D-014 makes numeric forms
  effectively unlimited, so the scarcity problem is largely confined to text forms. Storing prediction and
  outcome together makes R6's mitigation a matter of record rather than of memory.
- *Negative.* It still spends the scarcest material in the deck, and spends it fastest on exactly the
  facts R2 says are most at risk. Twenty-four questions is a small sample where a ±10 point swing is
  noise, so early mocks may mislead the calibration they exist to serve. And the exhaustion is silent:
  without a warning, a later mock quietly becomes less unseen than it claims.

---

## D-018 — Design tokens are extracted from v0's palette into two tiers

**Date:** 4 August 2026 · **Status:** accepted

**Context.** §F treats v0's palette as a reasonable starting point but not a constraint, and requires
tokens before any component with the lint check wired the same day. v0's colours were written inline and
quickly, and some pairs are unlikely to survive a WCAG 2.2 AA audit.

**Decision.** v0's palette becomes the reference tier; a semantic tier sits on top and is the only thing
components may reference. The system font stack is retained. Every token pair is contrast-checked as it
is defined, and the lint rule that fails the build on a raw colour or size value ships in the same
commit as the tokens.

**Consequences.**
- *Positive.* The app still looks like the one already in daily use, so no habit is disturbed. No font
  licence to verify and no webfont round-trip on the screen that must feel instant. The enforcement check
  arriving with the tokens is what stops the rule decaying into a preference.
- *Negative.* Inherited compromises come with the inheritance — the amber "check the book" tag is the
  first suspect for failing AA, and "keep v0's palette" therefore means "keep it and fix it", which is
  not what it sounds like. Two tiers is more indirection than a five-screen app strictly needs.

---

## D-019 — Milestone 1 is the deck pipeline, the scheduler and the simulation

**Date:** 4 August 2026 · **Status:** accepted

**Context.** R5 says features before infrastructure; the kit's Phase 2 says scaffold first. Both are
right about different things, and the tie is broken by observing that R1, R3 and R4 — the three
highest-ranked risks — are all mitigated by checks that cannot exist until there is somewhere to run them.

**Decision.** Milestone 1: minimal scaffold, the deck migration and its structural and statistical checks,
the scheduler ported as pure functions, and the 60-day simulation with invariant assertions — all running
in CI. No interface beyond what proves the thing builds and deploys.

**Consequences.**
- *Positive.* Goes straight at the three worst risks with machine checks rather than intentions, and
  establishes the golden baseline before the rewrite can drift from it. The pure-function domain layer
  this forces is also what keeps D-002's week-3 cut cheap.
- *Negative.* The least visible progress of any option — a week or more with nothing openable on a phone,
  which is a real morale cost and, more dangerously, hides slippage behind work that looks the same on
  every day of it. The week-3 tripwire in R5 is the only thing standing between this and R5 itself.

---

## D-020 — v1 lives in `v1/`; v0 stays at the repository root, untouched

**Date:** 4 August 2026 · **Status:** accepted

**Context.** v0 is deployed and in daily use, and is redeployed by dragging its folder onto Vercel. Adding
a `package.json` and a framework at the repository root would break that path and risk a build stepping on
the fallback the entire appetite arrangement depends on (D-006).

**Decision.** v1 is a subdirectory. v0's `index.html`, `facts.js` and `README.md` stay exactly where they
are and are never modified. The v1 Vercel project sets its root directory to `v1/`.

**Consequences.**
- *Positive.* v0 remains drag-deployable and byte-identical throughout, which is what makes "if v1 isn't
  ready, sit the test on v0" a real option rather than a stated intention. Separate projects mean separate
  origins, so v1 cannot reach v0's browser storage even accidentally.
- *Negative.* The repository root README describes v0 rather than the repository, which is what a visitor
  to a public repo sees first and will be confusing until it is revisited. Tooling paths are one level
  deeper than default throughout, and a mis-set root directory in Vercel is a failure mode that does not
  exist in a single-app repo. **This last consequence materialised within hours** — see L-013.

---

## D-021 — Generation rules are derived at load time, never stored in the deck

**Date:** 4 August 2026 · **Status:** accepted · **Refines D-014**

**Context.** D-014 settled that numeric distractors would be generated rather than fixed, and the
obvious implementation was to write a rule into each numeric form during migration: value, template,
candidate pool. Building it exposed three problems with that. The generated rule would become a second
copy of information already present in the authored options, free to drift from them. Editing an option
would silently leave a stale rule behind. And — the decisive one — a form carrying a rule instead of
four options can no longer be reconstructed into v0's positional shape, so the round-trip proof that
the migration lost nothing would stop covering the converted forms. That proof is what stands in for
human review of 1,228 forms; shrinking it to buy a feature is a poor trade.

**Decision.** The deck stores exactly what the author wrote: four options, unchanged. The generation
rule is **derived from those options at load time** and memoised. `presentation.ts` is the single place
a stored form becomes four options on a screen, and it also randomises display order for forms that
cannot be generated.

**Consequences.**
- *Positive.* The rule cannot drift from its source, because it has no independent existence. Editing an
  option updates the rule for free. The round-trip proof still covers all 410 facts and all 1,228 forms.
  The data files gained no churn at all — this feature is a net-zero diff in `src/data`. And the deck
  layer stays free of scheduler dependencies (R-2), which matters because presentation now needs
  randomness.
- *Negative.* A rule cannot be hand-tuned for a fact that derives badly; the only lever is rewriting the
  options, which is a blunter instrument. Derivation runs at load rather than build, so a change to the
  algorithm silently changes every existing form's option pool — invisible in a data diff, which is why
  the statistical ratchet and the rank-uniformity test are the only defence. And the stored deck now
  permanently shows a 91.4% middle-value rate that no reader ever meets, so anyone reading
  `numericMiddleRankRate` without reading `effectiveNumericMiddleRankRate` will draw the wrong
  conclusion.

---

## D-022 — v0 is deployed at the repository project; v1 gets its own

**Date:** 4 August 2026 · **Status:** accepted
**Supersedes** the deployment arrangement in D-020 · **Amends BRIEF §Appetite and §Outcome**

**Context.** The kickoff input stated as settled fact that "a working v0 is already deployed and in
daily use", and that it "carries him to 25 September on its own", so that "if v1 is not ready by 20
September he sits the test on v0 and loses nothing". The entire appetite arrangement — six weeks,
fixed time, and an explicit instruction not to let the exam date pull scope or quality — was built on
that sentence. It was never checked, by me or by anyone.

It was not true. There was no v0 deployment and no accumulated schedule; the owner had been using
commercial apps. Everything resting on the premise was resting on nothing, and had v1 slipped, the
fallback would simply not have existed.

Separately, importing the repository into Vercel created a project whose Root Directory is the
repository root. With the framework preset at "Other", it serves the root `index.html` — which is v0.
Raised as a High finding on the assumption that it was a *second* copy competing with a real one
(L-013). With no real one, it is not a collision. It is the missing deployment.

**Decision.** Keep it. The `lituk-drill` Vercel project stays rooted at the repository root and **is
the v0 deployment**. v1 gets a **separate** Vercel project rooted at `v1/` when there is something
worth deploying — which is not yet, since v1 has no interface.

The premise is corrected rather than quietly dropped. The deadline is neutralised **from today, and
only if daily use actually begins** — the arrangement is now conditional on an action rather than
describing an existing state.

**Consequences.**
- *Positive.* The owner has a working drill tool today, at a stable origin, which is the single most
  valuable thing available in the remaining seven weeks — and it is the tool §A argues is better than
  the commercial apps he has been using. The origin is stable by construction rather than by promise:
  R-1 and the `v0 is untouched` CI job forbid any change to the three files it serves, so a push can
  never alter it. No deploy step, no drag-and-drop, no second account. D-020's *fence* survives intact
  — v0 and v1 remain separate projects at separate origins — only the assignment is swapped.
- *Negative.* A project named `lituk-drill`, connected to the v1 repository, serves v0; that will read
  as a mistake to anyone who finds it without this entry, including a future me. v1's eventual project
  needs creating and naming carefully. And the appetite is now genuinely at risk in a way the BRIEF
  said it was not: if daily use does not start, there is no fallback on 20 September, and the
  instruction to ignore the exam date stops being safe. **That is the owner's call to make, not
  mine** — it is flagged, not decided.
- *Process consequence.* A premise handed over as settled was carried into the anchor document and
  into a pre-mortem without verification, and it took an unrelated infrastructure change to expose it.
  Recorded as L-014 with a tripwire: `/jorge-drift-check` treats §B's premise as a claim to re-verify,
  not a given.

---

## D-023 — The maintained handbook edition is the source of truth, not the frozen 2013 text

**Date:** 4 August 2026 · **Status:** accepted · **Supersedes** the sourcing rule in v0's README

**Context.** v0's README states the rule plainly: *"The examinable answer is always the book's, even
where it's now out of date."* Twelve facts were flagged amber against it. The owner then supplied a
full 3rd-edition text (Britizen PDF edition, Crown copyright), and it turns out that rule no longer
describes reality — the edition is **maintained, not frozen**. It carries the Brexit update (the UK
left at 23:00 GMT on 31 January 2020; 27 member states; no general principle of EU law in UK law from
2024) while keeping other original figures, such as the Council of Europe's 47 members.

So "the book" is no longer a single fixed artifact, and three of the twelve amber facts turned out to
differ from it. One — the small claims limit for Scotland and Northern Ireland — was simply wrong.

**Decision.** Where the maintained edition differs from the frozen 2013 text, **the maintained edition
wins**, applied as one rule with no exceptions. Every fact corrected or confirmed against it records a
`source` citation and is declared in `divergences.ts`.

**Consequences.**
- *Positive.* One rule, uniformly applied, which is far easier to hold than a per-fact judgement about
  which vintage of the book to follow. It closed eleven of the twelve amber facts in a single pass —
  eight confirmed correct, three corrected — taking a launch-gate blocker from twelve to one. It also
  caught a genuinely wrong answer that spaced repetition would otherwise have drilled to permanence,
  which is R3 exactly.
- *Negative.* The maintained edition is a **third-party** rendering. Its Brexit update may be editorial
  rather than a reflection of what the official test now asks, and the deck has no EU facts yet, so
  that judgement is about to be load-bearing for material with zero existing coverage. It also
  contradicts itself in at least one place — 54 members of the Commonwealth in prose, 56 above its own
  member list — so "the guide wins" does not always identify a single answer, and the tie was broken by
  reasoning about which part was maintained rather than by the rule itself. One fact (f213, the KoLL
  age exemption) is not in the handbook at all and remains unresolvable from this source.
- *Consequence for the deck.* Correcting content breaks the round-trip proof against v0's `facts.js`.
  Rather than weaken that test, divergence is now **declared**: a fact may differ from v0 only if it is
  listed in `divergences.ts` with a reason and a source, and the build fails on anything that differs
  and is not listed, on any stale declaration, and on any diverged fact lacking a citation. The
  migration script now refuses to run while divergences exist, because re-running it would restore
  every original answer and the round-trip test would then pass — a failure that looks exactly like
  success.

---

## D-024 — The deck expands to fill measured coverage gaps · **amends BRIEF §What v1 must do**

**Date:** 4 August 2026 · **Status:** accepted

**Context.** The BRIEF states plainly: *"More question forms per fact is good; more **facts** is not —
410 is the material."* That was written on the assumption that the 410 covered the handbook. Measuring
them against the full text showed they do not, evenly: one fact on the EU against a full handbook
section, two on the modern constitutional monarchy while thirty mention medieval kings, four on the
Industrial Revolution all filed under *Inventors*, and one each on local government, the civil service
and the civil/criminal law distinction.

The owner asked for expansion. The distinction that makes this legitimate rather than drift is that it
is a **coverage** defect, not volume for its own sake: a fact never drilled cannot be recalled, and the
BRIEF's outcome measure is the proportion of the material answerable.

**Decision.** Add facts to fill measured gaps only, sourced against the handbook per D-023, each
carrying a `source` citation. 33 added, taking the deck from 410 facts / 1,228 forms to **443 / 1,327**.
They live in `src/data/additions.ts` typed as plain `Fact`, keeping them out of `MIGRATED_DECK` so the
round-trip proof still compares only what actually came from v0.

**Consequences.**
- *Positive.* Coverage now roughly tracks the handbook's own weighting. The additions were
  length-balanced on purpose, which pulled the deck-wide longest-option tell **down** from 40.7% to
  38.8% — expansion improved a measured property rather than diluting it. Ids continue from f410, so
  the v0 import contract is untouched.
- *Negative.* Review load rises about 8%; at 20 new facts a day the deck now takes ~22 days rather than
  ~21 to see once, which is affordable but not free. More facts is more surface for a content error,
  and these are the only facts in the deck not written by the owner. And the BRIEF's non-goal was there
  for a reason — the line between "filling a measured gap" and "adding facts because we can" is a
  judgement, and this decision moves it.
- *Process consequence.* The first gap analysis **over-claimed**, reporting zero EU facts when there was
  one, because it searched canonical questions and answers but not form text. Two of the drafted facts
  duplicated existing ones and were caught by the deck's own duplicate check rather than by review.
  Corrected in L-017; the lesson is that a probe over a subset of the data reads exactly like a probe
  over all of it.

---

## D-025 — One version. v0 is deleted and v1 becomes the repository

**Date:** 4 August 2026 · **Status:** accepted
**Supersedes D-001, D-020 and D-022** · **Retires BRIEF S6 and RULES R-1**

**Context.** The owner asked why there were two versions at all, and the honest answer is that
there was no longer a reason.

The split came from one line in the kickoff document: *"v0 stays deployed and in daily use while
you build. Do not modify it."* Everything followed from it — R-1, a CI job enforcing it, v1 in a
subdirectory, fact ids reproducing v0's array positions, a round-trip proof pinning the deck to
`facts.js`, `divergences.ts` to permit deliberate differences, a guard on the migration script,
and scope line S6 to import the accumulated schedule.

**That premise was false and we knew it.** D-022 and L-014 recorded, hours earlier, that there
was no deployment and no accumulated schedule. The apparatus was left standing anyway, and worse:
when an accidental Vercel import began serving v0, it was *preserved* and a decision written to
justify keeping it. The result was a fallback protecting nothing, an import migrating nothing, and
a proof enforcing sameness with a file that had stopped being a live artifact.

Meanwhile v1's deck had become strictly better than v0's: three corrected answers including one
that was simply wrong, 33 added facts, generated distractors that took the numeric tell from 91.4%
to ~53%, and a source citation on every checked fact.

**Decision.** One version. `index.html`, `facts.js` and the old README are deleted; v1 moves to the
repository root; the `lituk-drill` Vercel project serves it. Deleted with them: the round-trip test,
`divergences.ts`, `migrated.ts`, the migration script and its guard, the `v0 is untouched` CI job,
the `v0CorrectIndex` field on all 1,228 original forms, and `maxAnswerPositionRate` (which measured
stored option order that presentation randomises anyway).

**Kept:** `source` on every corrected or confirmed fact. That was the load-bearing part — the record
of *why* the deck says £5,000 where the printed book says £3,000 — and it survives independently of
anything to compare against.

**Consequences.**
- *Positive.* One app, one URL, one place to look. Roughly 900 lines of scaffolding removed along
  with a field repeated 1,228 times. The repository root README now describes the repository rather
  than a superseded version, which matters on a public repo. Tooling paths are at their defaults.
- *Negative.* The fallback is genuinely gone, and it goes at a moment when the interface has no
  automated tests — the domain has 117, the UI has a hand smoke-check. If v1 breaks badly there is
  nothing to fall back to but a previous deployment. The round-trip proof also went, and it had real
  value while it lasted: it caught two duplicate facts and a batch of badly-balanced option sets
  during the deck expansion. Nothing now guards against an accidental mass edit of the deck beyond
  the structural and statistical checks.
- *Process consequence.* The failure worth naming is not that the premise was wrong — it came from
  the handover and was reasonable to accept. It is that **the machinery was not dismantled when the
  premise was falsified.** D-022 corrected the premise and then explicitly preserved the structure
  built on it. Sunk structure is harder to see than a sunk cost, because it keeps passing its own
  tests. It took the owner asking to surface it.
