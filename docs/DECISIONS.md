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

---

## D-027 — Sync is built but not switched on

> **Superseded by D-030, 4 August 2026**, which switched it on. The pairing half of this entry
> — one shared store, no owner column, no authentication — still stands and was not reopened.

**Date:** 4 August 2026 · **Status:** superseded by D-030

**Context.** The owner opened the app on his phone and found none of his desktop progress.
Sync had never been built — the database was provisioned in the morning and nothing was ever
written against it. The status was recorded in HANDOFF but buried in a list, so "keep sync"
read as a decision that had been actioned rather than one still outstanding.

It was built in this session: schema, endpoint, client merge, nine tests. Then the owner
asked to ship everything *except* sync and to handle sync in its own session.

**Decision.** The pieces land unwired: `adapters/db.ts`, `app/api/events/route.ts`,
`adapters/sync.ts` and `tests/sync.test.ts` are in the repo and pass the gate, but nothing
calls them. `store.ts` does not import them and the UI shows nothing. Turning it on is
three lines in `store.ts`.

**Pairing was settled at the same time and stands: one shared store, no pairing.** No owner
column, no authentication, one history that every visitor sees. The endpoint is therefore
public — anyone who finds it can read which citizenship facts were answered wrongly and can
append junk. Append-only semantics plus each device keeping its own authoritative copy make
that recoverable rather than destructive.

**Consequences.**
- *Positive.* The randomisation and metrics work ships immediately, which is what the owner
  is blocked on. The hard part of sync — the merge design — is done and tested against the
  cases that actually break it: both devices offline, a half-failed push, a repeated push.
- *Negative.* Dead code in the tree, which is exactly the sort of thing D-025 was written
  about. If sync is not switched on within a week or two it should be deleted rather than
  left to rot as scaffolding nobody is using.
- *Negative.* The devices remain separate until it is switched on, so progress made on one
  is invisible on the other, and the owner has already lost a session's worth of context by
  assuming otherwise.

---

## D-028 — Completion is measured in facts, not questions

**Date:** 4 August 2026 · **Status:** **superseded by D-032, 5 August 2026** ·
**Amended the BRIEF's outcome wording**

> D-032 keeps this entry's principle — completion is measured in facts — and replaces its
> definition. "Known every way" required every phrasing of a fact proven, which put a phrasing
> count inside a fact count and left the headline reading 0 after weeks of correct answers. The
> reasoning below is kept rather than edited, because the *negative* it predicted is exactly what
> happened: *"it moves more slowly, especially early, and a number that barely moves in week one
> is discouraging exactly when encouragement matters."*

**Context.** The headline read "phrasings proven, X of 1,327". The owner's correction: the
questions are the mechanism, not the goal — several phrasings per fact exist so the app can
tell knowing the fact from knowing one sentence. Counting out of 1,327 measures the apparatus
rather than the material.

**Decision.** The headline is **facts known every way, out of 443**. A fact counts only once
every one of its phrasings has been answered correctly, so the rigour is unchanged; it is
reported against the thing being learned. Phrasings proven drops to a secondary tile.

**Consequences.**
- *Positive.* The number now answers "how much of the material do I know", which is the
  question actually being asked. It is also harsher and more honest: one correct answer moves
  the phrasing count but not the headline, because one phrasing is not a known fact.
- *Negative.* It moves more slowly, especially early, and a number that barely moves in week
  one is discouraging exactly when encouragement matters. Mitigated by showing facts met at
  least once alongside it.

---

## D-030 — Sync is switched on, and a round always follows the last grade

**Date:** 4 August 2026 · **Status:** accepted
**Supersedes** D-027's "the pieces land unwired"

**Context.** D-027 shipped the schema, the endpoint, the client merge and nine tests, and
deliberately called none of it, so the two devices stayed separate. It named its own expiry
condition: *"if sync is not switched on within a week or two it should be deleted rather than
left to rot as scaffolding nobody is using."* The owner opened the app on his phone and found
none of his desktop progress — the cost D-027 accepted, being paid.

Wiring it up exposed two hazards a merge-only design never has to think about. Both live in
the store rather than in the merge, which is why nine passing tests on the merge said nothing
about either.

The first is a **write-back race**. The obvious shape captures the log at the start of a round
and writes the round's own merge back at the end. Answer a card while the round is in the air
and that write deletes the answer — the log it merged never contained it. That is
last-write-wins data loss, in the one architecture (D-002) chosen specifically to make it
impossible, reintroduced from the inside where the merge algebra cannot see it. No error, no
symptom.

The second is **the last grade of a session**. Dropping a sync request that arrives while a
round is already running is right — two rounds must never race — but dropping it and doing
nothing else strands whatever asked for it. The final card of a session is exactly that case:
put the phone down, open the laptop, and it is missing.

**Decision.** Sync runs automatically at three points — on subscribe, on the tab becoming
visible, and after every appended event — plus a **Sync now** button on the home screen for
the moment the question being asked is "did it actually go across?". The status line reports
where the last attempt got to and claims nothing more.

Two guarantees are written into the store rather than left to the merge:

1. **The write-back merges against the log as it stands when the round finishes**, never as it
   was when the round started.
2. **A dropped concurrent call becomes a trailing round**, so a round always follows the last
   event that asked for one.

**Pairing stays settled as D-027 left it:** one shared store, no owner column, no
authentication, one history every visitor sees. The endpoint is public by decision (D-011).

**Consequences.**
- *Positive.* The two devices share one schedule, which is BRIEF scope line S5 and the thing
  the database was bought for. Nothing above `store.ts` changed: every screen was already a
  projection of one snapshot, so a pull updates all of them by emitting once. D-027's dead
  code stops being dead, which removes the reason it was on borrowed time. Both hazards above
  are regression tests that were run against the broken code before being trusted.
- *Negative.* Every grade now starts a round that pulls the **entire** remote log, not a
  delta. At this size that is a few hundred kilobytes at worst and the answering path never
  waits on it — but it is real mobile data spent per card, and "small enough not to matter" is
  precisely the assumption D-002 already flagged as the one that goes unexamined until it
  isn't. Past roughly 50k events the endpoint's own note applies and this needs cursors.
- *Negative.* A pull genuinely rewrites subsequent schedule history, so a due date can move
  after a sync with no action by the reader. That is correct — the schedule should reflect all
  known evidence — and it is still surprising the first time it happens.
- *Negative.* R-11's class of bug gains a second way in. Until today the log changed only
  because the reader answered something; it can now change while they sit looking at a card.
  The card, its phrasing and its option order are held in component state and none is derived
  from the log, so the property holds — but it holds by construction rather than by luck, and
  it needed its own tests to say so.

---

## D-031 — The owner's 2026 printed edition is the handbook; the PDF is its stand-in

**Date:** 4 August 2026 · **Status:** accepted · **Narrows D-023**

**Context.** D-023 settled that the maintained handbook beats present-day reality: the book
says the Council of Europe has 47 members, it has 46, and the deck says 47 because the exam
marks against the book. What that entry never had to answer is *which* maintained edition,
because there was only one text in play.

Two arrived. The project works from a PDF rendering extracted to `.work/handbook.txt`; the
owner sits the exam on a **2026 printed edition**. Building the religion facts surfaced a
material disagreement — the PDF reports the 2009 Citizenship Survey (70% Christian, 21% no
religion), his edition the 2011 census (59%, 25%) — and a population table ending at a
different year.

He then established the useful part: **the two texts are identical apart from a handful of
deltas he has listed.** Religion proportions, the census population, and the pages he
photographed. Everything else matches.

**Decision.** The **2026 printed edition is the handbook.** Where the two disagree, his
figures win and the PDF is corrected to match. The PDF remains the working reference for
everything else, and remains the corpus the vocabulary check greps — which is sound precisely
because the deltas are enumerated rather than unknown.

**Consequences.**
- *Positive.* The deck now matches the book the exam is actually drawn from, which is the only
  thing that matters on 25 September. The religion figures lose their `verify` flags because
  the doubt is gone rather than deferred. And because the deltas are a list rather than a
  guess, the vocabulary check keeps its authority — a year absent from the PDF is still a real
  finding unless it falls inside a known delta.
- *Negative.* The authority is now a book this project cannot read. Every future check against
  the handbook is a check against a proxy, and the proxy is known-wrong in named places. That
  is manageable while the list of deltas is short and honest; it stops being manageable the
  moment an unlisted difference exists, and nothing here can detect one.
- *Negative.* It puts the owner on the critical path for content questions in a way D-023 did
  not. The sixteen retirements went through him, and so will the next ambiguity.
- *Process consequence.* The first check ran against the PDF and reported six facts as
  unanswerable that his edition may well answer. Confirming each with him before pulling
  anything was what stopped that becoming sixteen wrong deletions — and confirming, rather
  than asking him to re-derive, is what made it cheap enough to actually happen.

---

## D-032 — Every number in the app is a count of facts

**Date:** 5 August 2026 · **Status:** accepted
**Supersedes D-028**, which set the headline as "facts known every way, out of 443"

**Context.** D-028 was right that the goal is facts and wrong about what counts as knowing one.
It kept the rigour by requiring **every phrasing** of a fact to have been answered correctly,
which is a coverage measure and only ever rises. Beside it the screen carried numbers built on
three other rules: "New" counted unseen **phrasings** (1,575 of them, on a deck of 537 facts),
Mastered counted facts on a last-three-attempts window, and Mistakes counted facts on a
three-distinct-phrasings rule. Each figure was internally correct. Together they were
incoherent, and the incoherence was visible from the sofa: the headline read **0** after weeks
of correct answers, and the New tile was three times the size of the deck.

The owner's correction, and it is the whole of this entry: *"the several phrasings per fact are
a hidden mechanism, not a measure of knowledge."* They exist so the app can tell knowing a fact
from knowing one sentence. That is a reason to **ask** several ways. It is not a reason to
**count** them.

**Decision.** Five definitions, all per fact, and the first three partition the deck:

| | |
|---|---|
| **New** | never answered — no review event for it, ever |
| **Mastered** | answered, with no wrong answer in its last three attempts |
| **Mistakes** | a wrong answer inside its last three attempts |
| **Random** | any fact at all; no memory, no order |
| **Due today** | unchanged — thirty facts a day, each fact at most once |

`New + Mastered + Mistakes = every fact, always, with no overlap.` The **headline is Mastered
over the deck.** One correct answer masters a fact; one wrong answer un-masters it. Chapter bars
are mastered-in-chapter over facts-in-chapter, and carry the numbers as well as the bar.

Rotation is untouched: every time a fact comes round it wears a phrasing it has seen least. That
is now entirely invisible, which is what it was always for.

**The partition holds by construction, not by agreement.** One function (`domain/drill/standing.ts`)
walks the deck once and gives each fact exactly one standing; Mastered, Mistakes, New, both
screens and the chapter bars are all projections of that walk. Three functions that happen to
agree is what the last version had.

**Two consequences that are losses, stated rather than discovered later.**

1. **The mistakes rule gives up its distinct-phrasing guarantee.** It used to need three correct
   answers on three *different* phrasings; it now needs three attempts. Under the old rule three
   correct answers to one memorised sentence could not clear a fact, and under this one they can.
   Rotation makes it unlikely rather than impossible — the section serves the least-seen phrasing
   and skips one already answered since the miss. That guarantee was bought at the price of
   Mistakes and Mastered being different rules, which is exactly what made the screen incoherent.
   It is a real loss and it is the price of the partition.

2. **The displayed numbers and the scheduler now use different notions of "known", deliberately.**
   The breadth gate (R-6) still caps an interval at 6 days until a *second phrasing* is proven and
   at 30 until *every* phrasing is, and it was not asked to change. So a fact can be Mastered on
   screen — answered once, correctly — while the scheduler still refuses to push it past six days
   because it has only ever been asked one way. Both are right for their own job: the screen
   reports current form, the scheduler withholds long intervals until it has evidence of breadth.
   But they are two meanings of one English word living in one app, and this is written down here
   rather than left to be found the first time a number and a due date seem to disagree.

**Also settled here, and smaller.**

- **Random draws over facts, not over the flat list of phrasings.** Flat, a three-phrasing fact
  was 50% likelier to come up than a two-phrasing one — "random" weighted by how many ways a fact
  happens to be written. Nearly uniform on this deck, and a quiet bias rather than a choice.
- **The progress screen loses "facts known every way" and "phrasings proven"** and leads with the
  same partition the home screen shows. Its problem-facts list reports each fact's standing today
  instead of "2/3 phrasings proven".
- **`newQueue` serves only facts never answered**, so the section and its count empty together.
  It used to return for each fact's remaining phrasings, which is what made New larger than the
  deck.

**Consequences.**
- *Positive.* The number answers the question actually being asked — *how much of this do I know
  right now* — and it moves on the first day. It can also fall, which nothing on that screen
  could do before except Mastered, and a number that only rises is not a measure of knowledge.
- *Positive.* The three sections cannot disagree, and that is asserted over generated logs rather
  than argued. Both halves of the old bug were reintroduced deliberately and watched to fail.
- *Negative.* Mastered is a much softer claim than "known every way". One correct multiple-choice
  answer masters a fact, and L-002's option-shape tell means some of those answers are worth less
  than they look. This number must never become the readiness figure (S4) without that being
  reckoned with — R-7 still stands, and it is doing more work now than it was.
- *Negative.* The headline jumped from 0 to 10 with no learning taking place. Any figure like this
  is a definition, and a definition that flatters is the failure mode R6 named.

---

## D-033 — The drill card carries nothing above the question but a cross

**Date:** 5 August 2026 · **Status:** accepted · **Narrows D-013's placement, not its substance**

**Context.** The owner, on his phone: *"remove everything on top of the question and just leave a
little cross to be able to leave, trying to save vertical space as it's a bit annoying."* And
separately, twice: there is still black space at the bottom of the screen.

The second one had been mis-diagnosed, by me, because **every layout claim in this project was
measured at 393×852 and he uses an iPhone 16 Pro, which is 402×874.** Re-measured at his size, an
unanswered card's content ended at **445** while the action bar sat pinned at **817** — 360px of
page colour between them, near-black in dark mode. The safe-area inset fixed the day before was
16px of a 360px problem. The frame was never the issue; the card was too short for the screen.

**Decision.** Above the question there is a cross, and nothing else.

- **Gone:** the section title, the "N to go" counter, the chapter chip, the tag chip, and the
  phrasings-proven dots. About 100px, none of it ever acted on mid-card.
- **The dots should not have survived D-032 at all.** They were a phrasing count rendered as a
  progress bar, which R-12 forbids in the same words. Removing them closes that.
- **The mode toggle moves to Settings** on the Progress tab. Which mode you drill in is a
  preference set once, not a decision taken per question — and recall is the harder mode and the
  only evidence a recall readiness number may accept (D-013), so it keeps a home rather than
  being deleted with the chrome around it.
- **"Correct." / "Not quite." is no longer printed.** The chosen option turns green or red and
  the rest dim, which says it faster and costs no height. The sentence stays in the accessibility
  tree as a visually-hidden live region, because WCAG 1.4.1 is that colour must not be the *only*
  carrier — removing it outright would have been an accessibility regression dressed as tidying.
- **"Recorded as a miss." stays visible.** Nothing about the colours says a right answer has just
  been downgraded, so removing that one would leave "Got lucky" looking like it did nothing.
- **The "check the book" flag moves below the answer**, where it is a caveat about the answer
  rather than a label on the card. Two facts carry it (L-016, L-028) and both are live.
- **The options are anchored to the bottom of the free space** (`margin-block-start: auto`). The
  action bar is pinned by decision, so slack has to go somewhere; above the options it reads as
  breathing room under the question, below them it read as a black band.

**Measured at 402×874, after.** Gap between the options and the action bar: **12px**, from 360.
Gap below the action bar: **0**, and with a 34px home-indicator inset simulated the bar's box
still reaches 874 while its buttons stop at 840. Seven of eight consecutive answered cards now
fit with **no scrolling at all**; the eighth, a long cluster, needs 203px and the action bar stays
put throughout.

**Consequences.**
- *Positive.* The screen that gets used every day is now almost entirely question, options and
  actions. The explanation panel — the thing D-020 added because it is what makes a fact survive
  to September — usually fits without a scroll.
- *Negative.* Which section you are in is no longer on screen. Leaving is one tap, so the cost is
  small, but "how many left" is genuinely gone rather than moved.
- *Negative.* Recall mode is now two taps and a tab away instead of one tap. If it turns out never
  to be used from there, that is evidence about the mode, not about the placement, and it should
  be faced rather than solved by putting the toggle back.
- *Process consequence.* **Every "fits 393×852" claim in this repo was checked against the wrong
  screen.** They are conservative rather than wrong — his is bigger in both directions — but the
  numbers in the CHANGELOG and in several code comments describe a device nobody uses. The size is
  now recorded in HANDOFF; the stale comments are a follow-up, not a silent correction.

---

## D-034 — An AI layer is admitted to the roadmap, and nothing about its shape is decided yet

**Date:** 10 August 2026 · **Status:** **accepted for (a) only, 10 August 2026.** (b), (c) and (d)
remain refused. The owner picked after reading the four options: *"Think just a). And maybe the
ability to test me in free form vs just test drilling, but let's not do that."* — so free-form
testing is named and rejected, not merely unbuilt.

**Context.** The owner asked for "a useful AI learning layer" and offered an API key. That is a
scope change and it collides with three things written as absolutes, so it gets an entry before it
gets a line of code — which is the rule, not caution.

1. **A BRIEF non-goal, verbatim:** *"LLM-generated questions — Powerful, and would help R2 — Not in
   v1. If it ever changes, KICKOFF-APP §G applies in full."*
2. **R-8, no personal data, ever, and no third party.** The DPIA screening concluded UK GDPR does
   not engage *because nothing leaves the device and nothing identifies anyone.* Sending review
   history to an API invalidates the premise of that conclusion. It very likely still comes out the
   same way — a list of which citizenship facts were missed, with no identifier attached, processed
   for a purely personal activity — but it has to be re-run, not assumed.
3. **R3, the risk this project fears most.** A model produces fluent, plausible, off-source
   content. This deck has already measured that at scale: L-029, fourteen agents inventing seven
   years against an explicit instruction not to, caught only by a check that ran on the way in. A
   generated card is the most efficient way ever devised to drill a wrong fact to permanence.

**What is decided.** Only that it is on the roadmap and that it is blocked. **"A useful AI learning
layer" is at least four features with four different risk profiles**, and specifying it requires
picking:

- **(a) Explain on demand** — a "why is this wrong?" button on a card just answered. Cheapest,
  safest, nothing stored, nothing generated into the deck, and the handbook can be given as
  context. Fails safe: if the key is missing the button is absent.
- **(b) Generate new phrasings** of an existing fact, to attack R2. Directly against the non-goal.
  Every output would need the same gates as hand-written content plus a human read.
- **(c) A tutor** answering free questions about the material. Leaves the handbook entirely, which
  makes it the option most likely to teach something the exam will mark wrong.
- **(d) Choose what to drill next.** Replaces a scheduler that is verified by simulation with one
  that cannot be. R4 exists because an interval that quietly clamps has no symptom.

### Resolution — 10 August 2026

**Only (a), explain-on-demand.** A button on a card just answered that asks a model why the chosen
option is wrong, given the handbook passage as context. It writes nothing to the deck, nothing to
the schedule and nothing to the readiness model; if the key is absent the button is not there.

**The DPIA screening still has to be re-run before it ships**, because its conclusion rests on
nothing leaving the device. The likely outcome is unchanged — a single fact id and an option
string, no identifier, purely personal activity — but "likely unchanged" is a prediction, not a
screening, and the BRIEF's data inventory needs the third party added either way.

**One design constraint that is not obvious.** The model must be given the handbook passage and
told the handbook wins, because the exam marks against the book and not against the world. The
Council of Europe has 46 members; the handbook says 47; the deck says 47. An explainer that
"corrects" that is worse than no explainer, and it is the single most likely way this feature
fails.

**Consequences.**
- *Positive.* (a) is genuinely useful and could ship behind a key without touching the deck, the
  scheduler or the readiness model.
- *Negative.* (b) and (d) touch the two things this project has verified hardest — the deck's
  sourcing and the scheduler — and would put both back into "unverified".
- *Deliberate.* The app must keep working with no network and no key, whatever is chosen. That is
  not negotiable and is already a governance declaration in the BRIEF.

---

## D-035 — Facts may be added by systematic extraction, not only to fill a measured gap

**Date:** 10 August 2026 · **Status:** accepted · **Amends:** the BRIEF non-goal "More facts for
their own sake", previously amended by D-024

**Context.** D-024 opened the door narrowly: facts may be added to fill a *measured* coverage gap
against the handbook, with a source citation. The owner now wants the door wider — *"any name
mentioned, any date, any location could be subject of a question and is worth adding."*

**Decision.** Accepted. The reasoning is sound and it is his call: a fact the handbook asserts and
the deck never asks is a question that can appear on the exam and has never once been drilled. The
original non-goal was guarding against *volume as a proxy for progress*; extraction from the source
is not that, because the source is finite and the exam is drawn from it.

**What does not change.** Every gate stays exactly as it is. Nothing enters that the handbook does
not contain; the year check and `deck:vocab` apply unchanged; every fact carries a `source`; ids
append only (R-4); no duplicate canonical question and no shared form; and the option-content
ratchets (L-033) apply to every new option.

**Consequences.**
- *Positive.* Closes the class of failure where the exam asks something the deck never mentioned.
### Resolution — 10 August 2026

**Ceiling: about 700 facts. Daily target: 50, raised from 30 in the same breath.** The owner's
reasoning was quality-first rather than volume-first — *"in order to keep a high standard of
questions (not dumb ones or something that repeats)"* — so 700 is a cap on the sweep, not a
target to reach. About 170 facts of headroom from today's 530.

50/day is what makes 700 answerable at all: at 30 a day a 700-fact deck needs 24 days just to show
every fact once. `DAILY_TARGET` moved on 10 August. **The 60-day simulation was run at 40/day and
its published numbers — peak 187 reviews on day 9 — are now stale in the wrong direction.** Re-run
it before quoting any of them.

- *Negative, and now bounded rather than unresolved.* **Deck size is a scheduling problem.** 533 facts at 30 new a day
  already exceeds what six weeks has room for. Doubling the deck without raising daily volume means
  every fact is seen half as often, and the breadth gate needs two proven phrasings before an
  interval can grow. More facts can therefore make readiness *worse* while making coverage better.
  That trade is not decided here and must be settled before the sweep runs at scale.
- *Negative.* Mechanical extraction of every proper noun produces cards for "Wednesday" and for
  every county named in passing. Examinability is a judgement, and it is what makes this expensive.


---

## D-036 — Mocks: twenty fixed tests, plus custom ones, with every result kept

**Date:** 10 August 2026 · **Status:** accepted · **Extends:** D-017

**Context.** D-017 specified mocks as drawn from *unseen* forms, so a mock could not measure memory
of a form already drilled twenty times. The owner asked instead for **20 fixed tests plus the
ability to create a custom one**, with every result recorded and percentage-correct tracked over
time.

**Decision.** Both, and the difference between them is the point.

- **Twenty fixed tests**, stable and numbered. Their value is comparability: the same 24 questions
  in March and in September is a measurement of you, not of the draw. Retakeable deliberately.
- **Custom tests**, generated on demand, drawn from unseen forms per D-017 — which keeps one
  uncontaminated instrument for the readiness model to calibrate against.
- **Every attempt recorded**: which test, when, score, and which forms were served. Percentage
  correct over time is the headline.

**The tension this creates, stated rather than smoothed over.** A retaken fixed test is
contaminated by definition — the second sitting measures memory of those 24 questions. So:
**fixed-test scores may be shown and trended, and may never calibrate the readiness model.** Only
custom tests drawn from unseen forms may do that, and D-017's spent-form ledger applies to them
alone.

**R-7 still binds, and the owner confirmed the reading.** While L-002 and L-003 are
`fixed-unverified` rather than `verified-fixed`, a mock score may be displayed **as a score**
— "18 of 24", a trend line — and must never be presented as readiness or as a probability of
passing. Those are different claims and only one of them is currently supportable.

**Consequences.**
- *Positive.* A trend over repeated fixed tests is the most legible progress signal the app can
  offer, and it can go down.
- *Negative.* Two kinds of test with two different meanings is a thing to explain on screen, and
  an app that explains itself badly here would let a contaminated score read as readiness.
- *Deliberate.* 20 × 24 = 480 forms committed in advance, out of 1,588. They are spent for
  calibration purposes for ever.

---

## D-037 — The handbook passages are injected at deploy, never committed

**Date:** 12 August 2026 · **Status:** accepted · **Implements** D-034's grounding requirement ·
**Narrows** D-031's "the PDF is the working reference"

**Context.** D-034 settled that the explainer must be given the handbook passage and told the
handbook wins. It did not settle *where that text lives at runtime*, and by the time C8(a) was
built that was the last thing blocking it. The handbook is in `.work/`, gitignored, Crown
copyright, and a server route needs it while running.

Licensing was put to the owner and he settled it: he owns the PDF and this is personal use, so the
text may be used as grounding. **That settles using it and does not settle publishing it.** This
repository is public (D-005). Committing `handbook.txt` would not be personal use — it would be
redistribution of Crown-copyright material to the world, which is a different act with a different
answer, and the distinction was put back to him rather than glossed.

Three options were offered: a private companion repo, injection at deploy, or committing it here
with the licensing consequence stated. He chose injection.

**Decision.** `.work/handbook.txt` stays gitignored and uncommitted. The passages the route needs
are supplied as the environment variable **`HANDBOOK_PASSAGES`**, a JSON object keyed by fact id,
read server-side only by `src/adapters/handbook.ts`.

**Absent is a supported state.** With no variable set, every lookup returns nothing and the
explainer grounds on **the deck's own answer and explanation panel** — our text, which says the
same thing, because the deck records 47 Council of Europe members precisely because the book does
(D-023). So a deploy that forgets the variable degrades to a *thinner* explainer, never to an
ungrounded one.

**Consequences.**
- *Positive.* No Crown-copyright text in a public repository, and the question does not have to be
  re-litigated every time someone reads the tree. The route has one server-only import, matching
  the fence already around `db.ts`. The fallback is not a fallback in substance: "the handbook
  wins" is carried by the deck's own answer being handed over as authoritative, which is asserted
  over all 1,588 forms rather than assumed.
- *Negative.* **The grounding can silently go missing.** An environment variable is exactly the
  kind of thing that is present on Production and absent on Preview — the same class of mistake
  `DATABASE_URL` already made in this project — and nothing in the interface will say so, because
  the degraded explainer looks fine. The only symptom is thinner answers.
- *Negative.* The passages are now a second copy of handbook text, maintained by hand, with no
  mechanical link to `.work/handbook.txt` and no check that any given passage is the right one for
  its fact. That is the same drift D-021 refused to accept in the deck, accepted here because the
  alternative is publishing the book.
- *Negative.* Populating the variable is manual and is not done. C8(a) ships grounded on the deck
  alone until it is, which is the supported state above but is not the intended end state.


---

## D-038 — Seven off-source stems are reworded in place · **amends the BRIEF's C1 no-go**

**Date:** 13 August 2026 · **Status:** accepted
**Amends:** BRIEF §C1 *No-gos*, verbatim — *"**No form is reworded in place** — breadth credit is
keyed by form position (`ok[formIndex]`), so editing form N keeps credit earned on a sentence that
no longer exists. Replacements are appended."*

**Written before the first edit, which is the point of it.** The no-go it amends is not a
preference; it is a statement about what the scheduler will silently believe afterwards.

**Context.** The chapter audits left nine stems that assert something the handbook does not
contain, or ask a distinction the exam cannot ask. Every route to fixing them crosses a rule, which
is why nothing was applied and the question went to the owner.

**There were exactly two legitimate routes and appending was not a third.** The deck has no way to
retire a *form* — only facts carry `retired` — so appending a corrected phrasing beside a false one
leaves the false one in service, and the reader meets both. That structural gap is why this is a
decision rather than a task.

**Decision.** **Reword in place**, for seven of the nine. The **exact set**, named rather than
counted, because a count is what lets an eighth slip in later:

| | The defect |
|---|---|
| `f284` | says Wiggins was the first *person* to win the Tour de France; the book and the deck's own explanation both say first *Briton* |
| `f316` | a 1940 move to Hollywood and *Psycho* — neither is in the book |
| `f312` | *A Christmas Carol*, 0 hits in the handbook |
| `f296` | *Enigma Variations*, 0 hits in the handbook |
| `f554` | asks Human Rights Act *versus* Equality Act; the book never names the Equality Act |
| `f405` | all three forms omit the EU/Iceland/Liechtenstein/Norway qualifier |
| `f206[2]` | still asks a five-answer question, `mcqOnly` or not |

**The two deliberately excluded, and they stay open.** `f222[1]` duplicates f223's stem *and* its
four options, and `f507[1]` is ambiguous with or without options (16-year-olds may drink with a
meal). Neither is off-source; both are defects of a different kind, and neither is fixed by this
entry. They are not quietly folded in.

**Consequences.**
- *Positive.* An off-source stem is R3, the risk this project ranks highest, and it is permanent —
  spaced repetition drills it to permanence by design. This closes seven of them for the price of a
  bounded, one-directional accounting error.
- *Negative, permanent, and the reason this needed a decision.* `ok[formIndex]` is keyed by
  position, so each of these seven facts keeps breadth credit earned on a sentence that no longer
  exists, and **never re-earns it, because it is never lost.** The breadth gate (R-6) will therefore
  lift an interval cap on evidence that has been falsified. It is bounded to one form each, it is
  silent, and it cannot make a fact look *worse* than it is — which is the only reason it is the
  better trade.
- *Negative.* It sets a precedent that the C1 no-go is amendable, and the no-go was written because
  in-place editing is invisible in exactly the way that matters. The defence is that this entry
  names an exact set of seven rather than a policy: a tenth stem needs its own entry.
- *Not chosen: retiring the facts.* The f194/f015 precedent from 10 August. It over-corrects here —
  Wiggins, Elgar, Dickens and Hitchcock are all genuine handbook material and the deck would simply
  lose them.
- *Not chosen: form-level retirement.* The structural fix, and the largest: `retired` on a form is a
  migration with an index remap, not an edit. Still the right answer eventually, and still not this
  week's work.

