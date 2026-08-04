# Life in the UK drill app — project anchor

Single-user spaced-repetition app for the UK citizenship test. One user, one subject, forever.
Read order: `docs/BRIEF.md` (intent) → `docs/HANDOFF.md` (state) → `docs/DECISIONS.md` (why) →
`docs/RULES.md` (invariants) → `docs/LEDGER.md` (findings). The BRIEF wins on scope; DECISIONS wins
on technology; HANDOFF owns every live number.

## Landmines — the four things that will actually go wrong

1. **v0 is untouchable.** `index.html`, `facts.js`, `README.md` at the root are the deployed app, in
   daily use, and the fallback the whole schedule rests on. Never edit them. Never deploy over them.
   v1 lives in `v1/` with its own Vercel project.
2. **Fact ids reproduce v0's array indices.** Six weeks of accumulated schedule is keyed by array
   position. Deleting or reordering a fact is a migration with an index remap, never an edit.
3. **The deck's multiple-choice options leak the answer.** The correct answer is a middle value in
   91.4% of numeric forms (chance 50%). No readiness figure may be computed from multiple-choice data
   while L-002 is open.
4. **The scheduler cannot be verified by reading it.** Any change to `src/domain/scheduler` is
   verified by the 60-day simulation and its invariant assertions, never by inspection or by clicking
   through a few cards.

## Scope

**In v1:** drill new material on a phone · scheduled review that returns mistakes · practise on
demand · a defensible readiness number · same schedule on both devices with no sign-in · import v0's
progress · question forms that resist memorisation · mechanical content checks · the chronology as a
static reference.

**Not in v1** (each needs a superseding DECISIONS entry first): other subjects or decks · other users
or sharing · in-app card authoring · LLM-generated questions · a native app · anything from the
citizenship application, including the exam date · analytics of any kind.

## Session rules

- **Scoping gate is law.** Every feature gets a mini-spec in the BRIEF — Problem / Appetite / Solution
  sketch / Rabbit holes / No-gos / Acceptance criteria + verification method — approved before code.
  Exemption: a one-sentence change touching about one file.
- **One feature in flight.** Small commits, each landing green.
- **Every bug fix ships with a regression test in the same commit.**
- Terminal commands in **PowerShell**. The owner is non-technical and analytical: say what and why
  before how, and never hand over steps to paste blindly.
- `npm run verify` in `v1/` is the gate — typecheck, eslint, token lint, tests. It also runs pre-push.

## Definition of done

Works + verified by the stated method + CI green + committed and pushed + deployed + migrations
applied deliberately + docs reconciled in the same step + ledger updated + scope boundary intact.
Anything short of that returns to open. It is never demoed or reported as done.
