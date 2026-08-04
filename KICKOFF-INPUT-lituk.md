# PROJECT INPUT — "Life in the UK drill app"

### Attach this alongside `KICKOFF-APP.md`. Read both in full before doing anything.

This file pre-populates Phase 0. It exists so you do not spend the first hour asking the owner
things he has already decided.

**How to use it:**

- Sections marked **SETTLED** are decided. Do not re-open them unless you have a specific,
  evidenced reason — in which case say so explicitly and let the owner rule.
- Sections marked **OPEN** are genuinely undecided. Interrogate these properly. This is where
  Phase 0 earns its keep.
- Everything settled here still goes into `docs/BRIEF.md` in your own words. A Phase 0 that leaves
  no artifact never happened.
- **Section C (pre-mortem) has NOT been done.** Run it in session, two independent passes, owner
  first. Do not skip it because this document looks thorough.

The owner is non-technical and analytical. Explain the *what* and the *why* before the *how*, define
jargon on first use, and challenge anything here that looks wrong. Terminal commands in **PowerShell**
— he is on Windows.

---

## A. Product and users — **SETTLED**

**One sentence:** a spaced-repetition drill app for the UK "Life in the UK" citizenship test, built
for one person, so he can practise until he is confident he knows every fact — not until he has
memorised a fixed set of questions.

**User:** one. The owner. No other users, ever. No signup, no sharing, no multi-tenancy.

**The job he hires it for:** existing Life in the UK apps drill a fixed bank of questions. You learn
the questions, not the material, and you cannot tell the difference from inside. He wants a tool that
makes that failure mode impossible, and that keeps putting his mistakes back in front of him until
they stop being mistakes.

**First-value moment:** opening it on his phone on the sofa and doing ten minutes that visibly moved
a number.

**Hard external deadline: the test is Friday 25 September 2026, 10:00, Hammersmith.** See §B — this
deadline deliberately does **not** constrain this build.

**v1 is done when** he can, on an iPhone: drill new material, be re-asked the things he got wrong,
choose to practise on demand rather than only when something is due, and see a defensible answer to
"am I ready?".

**Explicitly NOT in v1** — the owner was pushed to name these and did:

| Not in v1 | Why it is tempting | Why not |
|---|---|---|
| Other subjects / decks | Obvious next step | Deliberately rejected. This is one app for one subject. Do not build a deck abstraction, a deck picker, or a `deck_id` column "just in case" — that is the generalisation this project chose against |
| Other users, sharing, accounts-for-friends | Cheap once auth exists | One user, forever. Auth exists only to identify *him* across devices |
| In-app card authoring | Feels necessary | Content is JSON in the repo, edited in an editor, validated in CI |
| LLM-generated questions | Powerful | Not in v1. If it ever happens, §G of the kickoff applies in full |
| Native iOS app | He is on iPhone | A PWA added to the Home Screen is indistinguishable for this use case |

**Comparators:** the official TSO app (£5.99), lifeintheuktestweb.co.uk (free, crowd-sourced),
Anki (the scheduling gold standard, £25 on iOS — the price he refused, which is why this exists).
Anki is the one to study. It gets scheduling right and everything else wrong for this use case.

---

## B. Outcome and appetite — **SETTLED**

**The one measurable outcome v1 exists to move:** the proportion of the 410 facts he can answer
correctly *when asked in a phrasing he has not seen before*. Not questions answered, not hours
logged, not streak length. If a metric can be moved by grinding the same question, it is the
wrong metric.

**Appetite: big batch, up to 6 weeks. Fixed time, variable scope.** When the six weeks are up,
unfinished scope is cut, not extended.

**The deadline is deliberately neutralised.** A working v0 is already deployed and in daily use
(see §Assets). It carries him to 25 September on its own. If v1 is not ready by 20 September he
sits the test on v0 and loses nothing. **Do not let the exam date pull scope or quality.** If you
catch yourself justifying a shortcut with "the test is in September", stop — that is the failure
mode this arrangement was designed to prevent.

---

## C. Pre-mortem — **NOT DONE. RUN IT.**

Two independent passes per the kickoff. Owner writes his list first, without seeing yours. You go
second and must not anchor on his.

**Empirical input you may use — these are not predictions, they are things that actually happened
while building v0:**

1. **Content errors are silent.** A wrong answer in the deck teaches the wrong fact and nothing
   surfaces it. 12 facts are already flagged as needing a check against the printed handbook
   (figures that may have moved since 2013). Whatever else v1 does, wrong content is the most
   expensive bug class here and it has no stack trace.
2. **A duplicated question across two facts with different correct answers is silently
   contradictory.** This occurred and was caught only by an explicit cross-check.
3. **Negatively-framed questions ("which of these was NOT…") are meaningless as recall prompts**
   and have to be excluded from that mode. Any content model has to carry that distinction.
4. **Scheduler bugs are invisible without simulation.** v0's scheduler was verified by running
   60 simulated days in a headless browser. Reading the code would not have caught an interval
   that quietly clamps to 1 day.

Merge with the owner's list, keep ~6 with a mitigation or tripwire each, into BRIEF §Risks.

---

## D. Stack and architecture — **DECIDED, BUT ARGUE WITH IT**

**Owner's decision: Next.js + Vercel + PostgreSQL from day one.** His default stack. Record it in
`DECISIONS.md` with consequences on both sides.

**You are expected to challenge this in Phase 0, because the honest case is mixed:**

*For:* he studies on an iPhone and a Windows laptop and wants the same schedule on both. Browser
storage does not sync and Safari can clear it — losing his schedule three weeks before the exam
would be genuinely bad. And learning this stack properly is one of his actual goals for the project.

*Against:* one user, one subject, ~250 KB of static content. Everything except cross-device sync
works with zero infrastructure. Postgres brings auth, migrations, a live service to keep up, a
cold-start on first load, and — because it stores personal data — the whole of kickoff §E, which
would otherwise be a paragraph.

**Put the actual question to him plainly: is cross-device sync worth a database?** If yes, Postgres
is right and the rest follows. If he would accept "phone is the source of truth, laptop is
read-only", say so — the simpler build is available. **Do not silently take either path.** Log
whichever he picks as a DECISIONS entry naming the negative consequences too.

**Realistic v2/v3 shape** so you do not architect into a corner: v2 is a better readiness model and
richer stats. v3 is probably nothing — this app has a natural end of life. **It is explicitly fine
for this to be a product that stops being needed.** Do not build for a future it does not have.

**Auth:** single user. No public registration — a signup form that only one person may ever use is
a liability, not a feature. Simplest thing that works (magic link to his address, or a single-user
provider config), behind an adapter seam.

---

## E. Data and privacy — **MOSTLY SETTLED, ONE PIECE OPEN**

If §D lands on Postgres, build the inventory table properly. Starting point:

| Field group | Personal data? | Purpose | Retention | Deletion |
|---|---|---|---|---|
| Email address (auth identity) | Yes | Identify him across devices | Life of the app | Account delete wipes it |
| Review history (fact id, grade, timestamp) | Pseudonymous, linked to the above | The scheduler cannot work without it | Life of the app | Cascades on account delete |
| Scheduler state (interval, ease, lapses) | Same | Same | Same | Same |
| Deck content | No | The questions | In the repo | n/a |

**Deliberately never stored — enforce in the schema, not the UI:** name, date of birth, nationality,
anything about his immigration case, IP addresses, analytics of any kind, third-party trackers.

**This app must contain nothing about his citizenship application.** It is a study tool that happens
to share a subject. The application itself is tracked in a separate, private repository and the two
never touch. **OPEN:** confirm with him that no exam booking references, no URNs, and no personal
identifiers belong in here — I believe the answer is a flat no, but get it on the record because it
is a one-way door in the schema.

DPIA screening: almost certainly "not required" — one data subject, who is the controller, no
special-category data, no automated decisions with legal effect. Record the reasoning, do not just
assert the conclusion.

---

## F. Design and brand — **SETTLED**

**Mobile-first, hard.** The primary device is an iPhone, used one-handed, often on a sofa or a train.
The laptop is secondary. Design for the phone and let the desktop be a wide phone.

**PWA:** must survive Add to Home Screen — full screen, no address bar, correct safe-area insets,
works offline once loaded.

**Aesthetic:** calm, typographic, dense with information but not busy. Light and dark both
first-class, following the system setting. v0's palette is a reasonable starting point and is in
the reference files — treat it as a starting point, not a constraint.

**Imagery:** none. This is a text product. Do not add illustration for warmth.

**Design tokens before any component**, reference + semantic tiers, with the lint enforcement wired
into CI on the same day. A token rule without its check is decoration.

---

## G. Quality bar — **SETTLED**

**Accessibility: WCAG 2.2 AA, designed in from the first component.** Contrast, keyboard navigation,
visible focus, ≥24 px targets, every state designed, `prefers-reduced-motion` honoured. This is a
one-user app and he does not need assistive technology — do it anyway. It is the bar, and it is
cheap when designed in and expensive when retrofitted.

**Performance:** the review loop must feel instant. A grade button that waits on a network round
trip before showing the next card will not be used. Optimistic local state, sync behind it.

**No LLM feature in v1**, so kickoff §G's LLM block does not apply. If that changes, it applies in
full.

**Content correctness is a first-class quality concern, not a content chore.** See §C. Whatever
CI you build should be able to fail on a malformed or self-contradictory deck.

---

## H. Working agreement — **PARTLY OPEN**

- Repo on his GitHub, CI from day one. **OPEN: ask which GitHub plan he is on** — private repos on
  Free get no branch protection and no push protection, and the kickoff wants that logged as a
  decision.
- **OPEN: what may run unattended, and may it deploy to production?** Ask. Do not assume.
- Postmortem triggers: the kickoff defaults (regression caught manually; same bug fixed twice;
  a logged decision reversed) plus one specific to this project: **a factual error found in the
  deck after it shipped**.
- Launch gate: `/jorge-launch-gate` pass. Nothing beyond it — there is no public launch and no
  third-party data.

---

## What v1 must do that v0 does not

The owner's words, when asked what "practise endlessly" means:

> *"Lots of questions basically — get to practise again the ones I make mistakes on, til I feel I
> get them all right."*

Three things fall out of that. Treat them as the v1 thesis and spec them properly through the
scoping gate:

**1. A mistakes drill.** Strict spaced repetition tells you to stop when nothing is due. He wants to
be able to sit down and work only the things he has got wrong, on demand, as many times as he likes.
The design problem: **doing this must not corrupt the real schedule.** Practice outside the schedule
that silently marks cards as reviewed will wreck the intervals. Decide deliberately whether free
practice writes to the scheduler, writes to a separate log, or writes only on a first attempt — and
write the reasoning into DECISIONS.

**2. "Til I feel I get them all right" — a readiness signal.** SM-2 has no concept of done, and this
is the single biggest gap in every competing app. Something has to answer "would I pass today?" in a
way that is honest rather than motivational. A percentage that only ever goes up is worse than
nothing. Think about what the number actually means before designing how it looks.

**3. Volume, without volume for its own sake.** More question forms per fact is good; more *facts* is
not — 410 is the material. Understand v0's variant model (below) before changing it.

---

## Assets — what already exists

Everything is in the project folder. **Read `README.md` in there first: it documents v0's scheduler
design and the reasoning behind it, and that reasoning is the most valuable thing being handed over.**

| File | What it is | How to treat it |
|---|---|---|
| `facts.js` | **410 facts, 1,228 question forms.** ~3 differently-worded questions per fact with distinct distractors. Structure: `[tag, chapter, verifyFlag, canonicalQuestion, canonicalAnswer, forms]`, where `form = [question, [4 options], correctIndex, mcqOnly]` | **The crown jewel. Preserve the data; re-model the format if you have a reason.** This took the most work and is the hardest thing to reproduce |
| `index.html` | v0 — the whole app. Single file: SM-2 scheduler, flashcard mode, quiz mode, a chronology, a stats screen | **Reference, not a base to build on.** Read the scheduler carefully, then write v1 properly |
| `README.md` | v0's documentation — the design reasoning and the load simulation results | Read in full before Phase 0 |
| `cards.js.OLD-v1-unused` | Superseded. Dead | Ignore. Owner will delete |

### v0's scheduler — the part worth carrying forward

The design decision that matters, and the reason the app exists at all:

> **The fact is the scheduling unit, not the question.** One SM-2 schedule per fact, with ~3
> interchangeable phrasings served in rotation — least-proven first, never the same one twice
> running. Three phrasings as three independent cards would triple the review load for no extra
> learning and allow fluency in one phrasing alongside failure in another.

Five additions to textbook SM-2, all deliberate. Understand each before changing any:

| Addition | Behaviour |
|---|---|
| **Breadth gate** | Interval capped at 6 days until a *second* phrasing is answered correctly; 30 days until all are. This is the lock that stops a long interval being banked on one memorised sentence. Without it the variant model is decoration |
| **Fact-level lapse** | Missing any phrasing resets the whole fact and clears that phrasing's credit |
| **Spaced relearning** | A missed fact returns ~3 facts later in the same session, not immediately |
| **Post-lapse resume** | Re-graduates at 35% of the pre-lapse interval rather than starting over |
| **Leech taper + fuzz** | 3+ lapses permanently cut intervals by 40%; all intervals get ±5% jitter |

### How v0 was verified — carry this method forward

A 60-day headless-browser simulation at 40 new facts/day with a 72% first-time recall rate.
Result: zero errors, zero breadth-gate violations, all 410 facts started, 403–407 proven on every
phrasing, review load peaking ~170/day on days 8–10 and under 15/day by week six.

**A scheduler cannot be verified by reading it or by clicking through a few cards.** Whatever v1's
scheduler is, it needs an automated simulation over simulated time as part of the test suite, with
assertions on invariants (no interval violates the breadth gate; no fact is ever unreachable; the
queue always drains). Make this a CI test, not a one-off script.

---

## Open questions Phase 0 must settle

Ranked. The first three are the ones that change the architecture.

1. **Is cross-device sync worth a database?** (§D) The whole shape of the project turns on this.
2. **Does practising outside the schedule write to the scheduler?** (§What v1 must do, item 1)
   Get this wrong and the app quietly stops working while appearing fine.
3. **What does "ready" actually mean, numerically?** (item 2) Design the meaning before the widget.
4. Does the variant model survive contact with a real schema, or does the fact/form structure want
   re-modelling for a relational store?
5. GitHub plan, and what unattended sessions may do. (§H)
6. Confirm nothing from the citizenship application belongs in this app's data. (§E)

---

### START: run the Pre-flight tooling check, report it, then begin Phase 0 — sections C, D, E and H
### are where the real interrogation is. Write `docs/BRIEF.md`, then STOP for sign-off.
