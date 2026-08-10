/**
 * Every number in the app is a count of facts (D-032).
 *
 * This file exists because the home screen was showing four numbers that did not agree with each
 * other and could not be made to: the headline required every phrasing of a fact proven, "New"
 * counted unseen phrasings, Mastered counted facts on a last-three-attempts rule and Mistakes
 * counted facts on a distinct-phrasings rule. Each was internally correct. Together they were
 * incoherent — New read 1,575 against a deck of 537 — and nothing in the suite could say so,
 * because nothing asserted a relationship *between* them.
 *
 * So the assertions here are about relationships:
 *
 *   1. **The partition.** New + Mastered + Mistakes is every fact, always, with no overlap.
 *      Asserted over generated logs, which is the cheapest proof that the three sections agree.
 *   2. **The transitions.** One correct answer moves a fact out of New and into Mastered and
 *      takes the headline up by exactly one. One wrong answer takes it down by exactly one.
 *   3. **No count is a phrasing count.** The deck has three times as many phrasings as facts, so
 *      any figure describing deck coverage that exceeds the fact total is measuring the
 *      apparatus. That single assertion would have caught the original bug.
 */

import { describe, expect, it } from 'vitest';

import { ACTIVE, TOTAL_FACTS, TOTAL_FORMS } from '@/domain/deck';
import { factStandings, partition, MASTERY_WINDOW } from '@/domain/drill/standing';
import { mistakesFrom } from '@/domain/drill/mistakes';
import { masteredFacts, newFacts, sectionCounts, type SectionContext } from '@/domain/drill/sections';
import { deckProgress } from '@/domain/drill/stats';
import { MS_PER_DAY, replay, type ReviewEvent } from '@/domain/scheduler/events';
import { mulberry32 } from '@/domain/scheduler/rng';
import type { Grade } from '@/domain/scheduler/types';

const FACT_IDS = ACTIVE.map((f) => f.id);
const FORM_COUNTS = new Map(ACTIVE.map((f) => [f.id, f.forms.length]));
const DAY0 = 1_700_000_000_000;

let seq = 0;
const ev = (factId: string, formIndex: number, grade: Grade, day = 0): ReviewEvent => ({
  id: `c${seq++}`,
  factId,
  formIndex,
  grade,
  mode: 'scheduled',
  at: DAY0 + day * MS_PER_DAY,
});

function context(events: ReviewEvent[]): SectionContext {
  return {
    deck: ACTIVE,
    events,
    states: replay(events, FORM_COUNTS).states,
    today: Math.floor(DAY0 / MS_PER_DAY),
    rng: mulberry32(1),
  };
}

/**
 * A plausible history: a slice of the deck, drilled a random number of times each, with a
 * realistic proportion of misses. Seeded, so a failure is reproducible.
 */
function generateLog(seed: number, facts = 120): ReviewEvent[] {
  const rng = mulberry32(seed);
  const events: ReviewEvent[] = [];
  for (const fact of ACTIVE.slice(0, facts)) {
    const attempts = Math.floor(rng() * 6); // 0 to 5 — zero is a fact left untouched
    for (let i = 0; i < attempts; i++) {
      const form = Math.floor(rng() * fact.forms.length);
      const grade: Grade = rng() < 0.3 ? 0 : ([3, 4, 5] as const)[Math.floor(rng() * 3)];
      events.push(ev(fact.id, form, grade, i));
    }
  }
  return events;
}

const SEEDS = [1, 2, 3, 7, 11, 42];

describe('the partition — New + Mastered + Mistakes is the whole deck', () => {
  it('holds on an empty log', () => {
    const { fresh, mastered, mistakes } = partition(FACT_IDS, []);
    expect(fresh).toHaveLength(TOTAL_FACTS);
    expect(mastered).toHaveLength(0);
    expect(mistakes).toHaveLength(0);
  });

  it.each(SEEDS)('holds over a generated log (seed %i)', (seed) => {
    const events = generateLog(seed);
    const { fresh, mastered, mistakes } = partition(FACT_IDS, events);

    // Adds up.
    expect(fresh.length + mastered.length + mistakes.length).toBe(TOTAL_FACTS);

    // And does not double-count: three disjoint sets whose union is the deck.
    const union = new Set([...fresh, ...mastered, ...mistakes]);
    expect(union.size).toBe(TOTAL_FACTS);
    expect(new Set(FACT_IDS)).toEqual(union);

    // Not vacuous — the generated log must actually populate all three.
    expect(fresh.length).toBeGreaterThan(0);
    expect(mastered.length).toBeGreaterThan(0);
    expect(mistakes.length).toBeGreaterThan(0);
  });

  it.each(SEEDS)('is what the sections and both screens report (seed %i)', (seed) => {
    const events = generateLog(seed);
    const ctx = context(events);
    const counts = sectionCounts(ctx);
    const progress = deckProgress(ACTIVE, ctx.states, events);

    // The three section helpers, the home-screen counts and the progress-screen counts are
    // five routes to the same classification. They must not be able to disagree.
    expect(newFacts(ctx)).toHaveLength(counts.newFacts);
    expect(masteredFacts(ctx)).toHaveLength(counts.mastered);
    expect(mistakesFrom(events, FORM_COUNTS)).toHaveLength(counts.mistakes);

    expect(counts.newFacts + counts.mastered + counts.mistakes).toBe(counts.totalFacts);
    expect(progress.notTried).toBe(counts.newFacts);
    expect(progress.mastered).toBe(counts.mastered);
    expect(progress.inMistakes).toBe(counts.mistakes);
    expect(progress.started).toBe(TOTAL_FACTS - counts.newFacts);
  });

  /**
   * Both cuts, and the same assertions on each.
   *
   * Chapters and bands are two independent partitions of one deck (C4), and each row now shows
   * the three-way split rather than one number (C5). So R-12 has to hold **per row**, not just
   * deck-wide: a row whose three figures do not sum to its own total is a row that is right in
   * aggregate and wrong where it is read.
   *
   * `it.each` over the two cuts rather than one test naming chapters and a copy naming bands —
   * the copy is what would get updated on one side only.
   */
  const CUTS = [
    ['chapter', (c: ReturnType<typeof sectionCounts>) => [...c.byChapter.values()]],
    ['band', (c: ReturnType<typeof sectionCounts>) => [...c.byBand.values()]],
  ] as const;

  it.each(
    SEEDS.flatMap((seed) => CUTS.map(([name, rows]) => [name, seed, rows] as const)),
  )('partitions every %s as well as the whole deck (seed %i)', (_name, seed, rows) => {
    const counts = sectionCounts(context(generateLog(seed)));
    const groups = rows(counts);

    // Every fact is in exactly one group of this cut, and every group's split adds up.
    expect(groups.reduce((n, c) => n + c.total, 0)).toBe(counts.totalFacts);
    expect(groups.reduce((n, c) => n + c.mastered, 0)).toBe(counts.mastered);
    expect(groups.reduce((n, c) => n + c.mistakes, 0)).toBe(counts.mistakes);
    expect(groups.reduce((n, c) => n + c.fresh, 0)).toBe(counts.newFacts);

    for (const g of groups) {
      expect(g.mastered + g.mistakes + g.fresh).toBe(g.total);
      // The bar renders these as percentages of the row's own total, so this is the assertion
      // that the three segments cannot overflow or leave a gap.
      expect(g.total).toBeGreaterThan(0);
    }

    // Not vacuous: the generated log must actually put some rows in more than one state.
    expect(groups.some((g) => g.mastered > 0)).toBe(true);
    expect(groups.some((g) => g.mistakes > 0)).toBe(true);
  });

  it.each(SEEDS)('never puts a fact in both Mastered and Mistakes (seed %i)', (seed) => {
    // The specific incoherence this replaces: the two rules were different, so a fact could be
    // counted as mastered on the home screen while still sitting in the mistakes drill.
    const events = generateLog(seed);
    const ctx = context(events);
    const mastered = new Set(masteredFacts(ctx));
    const inMistakes = mistakesFrom(events, FORM_COUNTS).map((s) => s.factId);
    for (const id of inMistakes) expect(mastered.has(id), `${id} is in both`).toBe(false);
  });
});

describe('the transitions — one answer moves one fact', () => {
  const first = ACTIVE[0].id;

  it('moves a fact out of New and into Mastered on ONE correct answer, headline +1', () => {
    const before = sectionCounts(context([]));
    const after = sectionCounts(context([ev(first, 0, 4)]));

    expect(before.mastered).toBe(0);
    expect(after.mastered).toBe(before.mastered + 1);
    expect(after.newFacts).toBe(before.newFacts - 1);
    expect(after.mistakes).toBe(before.mistakes);
    expect(masteredFacts(context([ev(first, 0, 4)]))).toContain(first);
  });

  it('takes the headline DOWN by one when the fact is then missed', () => {
    const mastered = [ev(first, 0, 4)];
    const missed = [...mastered, ev(first, 1, 0, 1)];

    const before = sectionCounts(context(mastered));
    const after = sectionCounts(context(missed));

    expect(after.mastered).toBe(before.mastered - 1);
    expect(after.mistakes).toBe(before.mistakes + 1);
    // Still not New: it has been answered, and New means never answered.
    expect(after.newFacts).toBe(before.newFacts);
  });

  it('brings it back to Mastered once three attempts push the miss out of the window', () => {
    const events = [ev(first, 0, 4), ev(first, 1, 0, 1)];
    for (let i = 0; i < MASTERY_WINDOW; i++) {
      events.push(ev(first, i % 3, 4, 2 + i));
      const counts = sectionCounts(context(events));
      const cleared = i === MASTERY_WINDOW - 1;
      expect(counts.mastered, `after ${i + 1} correct`).toBe(cleared ? 1 : 0);
      expect(counts.mistakes, `after ${i + 1} correct`).toBe(cleared ? 0 : 1);
    }
  });

  it('never moves a fact back into New', () => {
    // New is "never answered", which is monotone: once a fact has an event it can never return.
    const events: ReviewEvent[] = [];
    let previous = TOTAL_FACTS;
    for (const grade of [4, 0, 0, 5, 3] as Grade[]) {
      events.push(ev(first, 0, grade, events.length));
      const now = sectionCounts(context(events)).newFacts;
      expect(now).toBeLessThanOrEqual(previous);
      previous = now;
    }
    expect(previous).toBe(TOTAL_FACTS - 1);
  });
});

describe('no count anywhere is a phrasing count', () => {
  it('has a deck where the two are far enough apart for this to mean something', () => {
    // Without this, every assertion below could pass on a deck with one phrasing per fact.
    expect(TOTAL_FORMS).toBeGreaterThan(TOTAL_FACTS * 2);
  });

  it.each([[[] as ReviewEvent[]], [generateLog(5)], [generateLog(9, 400)]])(
    'keeps every coverage figure inside the fact total',
    (events) => {
      const ctx = context(events);
      const counts = sectionCounts(ctx);
      const progress = deckProgress(ACTIVE, ctx.states, events);

      // The assertion that would have caught the original bug on its own: "New" reported
      // unseen phrasings, so on an empty log it was 1,575 against 537 facts.
      const coverage: Record<string, number> = {
        newFacts: counts.newFacts,
        mastered: counts.mastered,
        mistakes: counts.mistakes,
        totalFacts: counts.totalFacts,
        due: counts.due,
        'progress.notTried': progress.notTried,
        'progress.mastered': progress.mastered,
        'progress.inMistakes': progress.inMistakes,
        'progress.started': progress.started,
        'progress.mature': progress.mature,
        'progress.facts': progress.facts,
      };

      for (const [name, value] of Object.entries(coverage)) {
        expect(value, `${name} is larger than the deck — it is counting phrasings`).
          toBeLessThanOrEqual(TOTAL_FACTS);
        expect(value, `${name} is negative`).toBeGreaterThanOrEqual(0);
        expect(value, `${name} equals the phrasing total`).not.toBe(TOTAL_FORMS);
      }
    },
  );

  it('exposes no phrasing-shaped field at all on the two count objects', () => {
    // Names are the other half of it: a field called `forms` or `newForms` is an invitation to
    // put a phrasing count back on a screen, and that is exactly how this happened.
    const ctx = context(generateLog(3));
    const fields = [
      ...Object.keys(sectionCounts(ctx)),
      ...Object.keys(deckProgress(ACTIVE, ctx.states, ctx.events)),
    ];
    for (const field of fields) {
      expect(field.toLowerCase(), `${field} names a phrasing`).not.toMatch(/form|phrasing|proven/);
    }
  });

  it('counts reviews answered, which is deliberately not bounded by the deck', () => {
    // The one number that legitimately exceeds the fact total, named here so its absence from
    // the list above is a decision rather than an oversight. It is activity, not coverage.
    const events = generateLog(4);
    const ctx = context(events);
    expect(deckProgress(ACTIVE, ctx.states, events).totalReviews).toBe(events.length);
  });
});

describe('the standings themselves', () => {
  it('gives every fact in the universe exactly one standing', () => {
    const standings = factStandings(FACT_IDS, generateLog(6));
    expect(standings.size).toBe(TOTAL_FACTS);
    for (const id of FACT_IDS) expect(standings.get(id)!.factId).toBe(id);
  });

  it('drops events for facts outside the universe rather than inventing a row', () => {
    // Retired facts keep their ids and their history (R-4); nothing counting what is left to
    // learn should see them.
    const standings = factStandings(FACT_IDS, [ev('f999-not-in-the-deck', 0, 4)]);
    expect(standings.size).toBe(TOTAL_FACTS);
    expect(standings.has('f999-not-in-the-deck')).toBe(false);
  });

  it('has zero attempts exactly when the standing is new', () => {
    for (const s of factStandings(FACT_IDS, generateLog(8)).values()) {
      expect(s.attempts === 0).toBe(s.standing === 'new');
    }
  });
});
