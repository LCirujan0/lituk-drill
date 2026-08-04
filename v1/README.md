# v1

The rebuild. v0 — the version in daily use — is the `index.html` and `facts.js` at the repository
root and is never modified from here.

Start with [`../docs/BRIEF.md`](../docs/BRIEF.md) for what this is and why, then
[`../docs/HANDOFF.md`](../docs/HANDOFF.md) for where it currently stands.

## Run it

```powershell
cd v1
npm install
npm run dev
```

## The gate

```powershell
npm run verify
```

Typecheck, ESLint, CSS token enforcement, and the tests. The same command runs in CI and in
`.githooks/pre-push`. Install the hook once:

```powershell
npm run hooks:install
```

## What the tests actually prove

| Test | What it establishes |
|---|---|
| `deck.test.ts` — round-trip | The migration from v0's `facts.js` lost nothing. The emitted deck is reconstructed into v0's exact positional shape and compared against the original file, because 1,228 forms cannot be reviewed by eye |
| `deck.test.ts` — ratchet | The deck's known defects cannot get worse. Ceilings live in `src/domain/deck/baseline.ts`; lowering one is the work |
| `scheduler.test.ts` | Each of v0's five scheduling additions in isolation, plus the two invariants that make catastrophe structurally impossible: practice can never push a fact further out, and an interval never exceeds its breadth cap |
| `simulation.test.ts` | 60 simulated days with invariant assertions after every single review. A scheduler cannot be verified by reading it — v0's own bugs were only ever found this way |

## Layout

```
src/domain/     pure functions — no framework, no vendor, no clock, no Math.random
  deck/         types, analysis, the defect baseline
  scheduler/    SM-2 + v0's five additions, seeded RNG, queue, event log, v0 import
src/data/       the deck, generated per chapter — do not reformat by hand
src/styles/     design tokens, the only place a raw colour or size may appear
scripts/        one-shot migration, and the deck report
tests/          the gate
```

`src/domain` holds no framework or vendor types by rule ([`../docs/RULES.md`](../docs/RULES.md) R-2).
That is what makes the scheduler simulable, and the simulation is the only defence against a silent
scheduling regression.

## Useful

```powershell
npm run deck:report     # every deck measurement, without running the suite
npm run deck:migrate    # re-run the v0 migration; the round-trip test proves the result
```
