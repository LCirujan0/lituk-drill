# Life in the UK — drill

**443 facts. 1,327 question forms.** A spaced-repetition drill for the UK citizenship test,
built for one person.

## The one design decision that matters

Every fact is asked **several different ways** — a direct question, a reversed one, a cloze,
a scenario. But **the fact is the scheduling unit, not the question.** There is one schedule
per fact, and each time it comes round the app serves whichever phrasing you have proven
least, never the same one twice running.

That is the difference between knowing the material and knowing the quiz. Three phrasings as
three independent cards would triple the review load for no extra learning, and would let you
become fluent in one wording while failing another — which is exactly what happens to people
who grind the practice sites and then fail the real thing.

A fact **cannot** bank a long interval until it has been answered correctly on more than one
phrasing. That lock is the reason the deck is built this way at all.

## The other thing worth knowing

Multiple-choice options are not fixed. For numeric questions the four values are **generated
fresh each time**, with the correct answer placed at a uniformly random rank.

This exists because of a measurement. In the original deck the correct answer was one of the
middle two values in **91.4%** of numeric questions, against 50% by chance — so "pick a middle
number" scored about 91% while knowing nothing at all. That is not carelessness; it is what
happens when you write plausible distractors by bracketing the true value. It also meant any
readiness score built on quiz results was substantially measuring option shape.

On screen it is now ~53%, against a chance floor of 50%.

## Run it

```powershell
npm install
npm run dev
```

## The gate

```powershell
npm run verify
```

Typecheck, ESLint, CSS token enforcement, tests. The same command runs in CI and in
`.githooks/pre-push`. Install the hook once with `npm run hooks:install`.

## What the tests actually prove

| Test | What it establishes |
|---|---|
| `deck.test.ts` | Structural faults are impossible, and the deck's known defects cannot get worse. Ceilings live in `src/domain/deck/baseline.ts`; lowering one is the work |
| `numeric.test.ts` | Generated option sets place the correct answer at every rank about equally often, so rank carries no information |
| `scheduler.test.ts` | Each scheduling rule in isolation, plus two invariants that make catastrophe structurally impossible: practice can never push a fact further out, and an interval never exceeds its breadth cap |
| `simulation.test.ts` | 60 simulated days with invariant assertions after **every single review**. A scheduler cannot be verified by reading it |

## Layout

```
src/domain/     pure functions — no framework, no vendor, no clock, no Math.random
  deck/         types, analysis, presentation, the defect baseline
  scheduler/    SM-2 with five extensions, seeded RNG, queue, event log
  drill/        the five sections, all derived from the event log
src/adapters/   local storage, and the external store React subscribes to
src/app/        the app shell
src/components/ screens
src/data/       the deck and the chronology
```

`src/domain` holds no framework or vendor types by rule ([`docs/RULES.md`](docs/RULES.md)).
That is what makes the scheduler simulable, and the simulation is the only real defence
against a silent scheduling regression.

## Documentation

[`docs/BRIEF.md`](docs/BRIEF.md) is the intent anchor — what this is and why.
[`docs/HANDOFF.md`](docs/HANDOFF.md) is the current state.
[`docs/DECISIONS.md`](docs/DECISIONS.md) records every decision with its negative
consequences, including the ones later reversed.

---

*Questions written from scratch to test factual knowledge. Facts are not copyrightable and
nothing here reproduces the handbook's text. The handbook remains the only examinable source —
this is a drilling tool, not a substitute for reading it.*
