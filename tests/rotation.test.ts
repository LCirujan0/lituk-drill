/**
 * Sequencing: what gets served next, and how often.
 *
 * These exist because of a measurement, not a theory. Drilling "Not tried yet" for 20 cards
 * served **8 distinct facts** — `f143, f382, f291, f222, f143, f382, f291, f222, f143…` —
 * because the queue put unseen phrasings of already-started facts ahead of untouched ones,
 * so four facts cycled through all three of their forms before anything new appeared. Chapter
 * drills were worse: byte-identical order every session, always form 0.
 *
 * The rule these lock in: a fact does not come round again until every other fact in the same
 * pool has had its turn, and when it does it wears a different phrasing.
 */

import { describe, expect, it } from 'vitest';

import { DECK } from '@/domain/deck';
import {
  BUCKET_FLOOR,
  DAILY_TARGET,
  chapterQueue,
  dueBuckets,
  dueQueue,
  dueRemaining,
  MASTERY_WINDOW,
  masteredFacts,
  masteredQueue,
  mistakesQueue,
  newQueue,
  randomQueue,
  type DrillItem,
  type SectionContext,
} from '@/domain/drill/sections';
import { leastSeenForm, rotate, servedCounts, servedToday } from '@/domain/drill/rotation';
import { MS_PER_DAY, replay, type ReviewEvent } from '@/domain/scheduler/events';
import { mulberry32 } from '@/domain/scheduler/rng';
import type { Grade } from '@/domain/scheduler/types';

const FORM_COUNTS = new Map(DECK.map((f) => [f.id, f.forms.length]));
const DAY0 = 1_700_000_000_000;
const TODAY = Math.floor(DAY0 / MS_PER_DAY);

let seq = 0;
const ev = (factId: string, formIndex: number, grade: Grade, day = 0): ReviewEvent => ({
  id: `e${seq++}`,
  factId,
  formIndex,
  grade,
  mode: 'scheduled',
  at: DAY0 + day * MS_PER_DAY + seq * 1000,
});

const context = (events: ReviewEvent[], day = 0): SectionContext => ({
  deck: DECK,
  events,
  states: replay(events, FORM_COUNTS).states,
  today: TODAY + day,
  rng: mulberry32(events.length + 1),
});

/** Drill a section the way the app does: take the head, record it, rebuild. */
function drill(
  queue: (ctx: SectionContext) => DrillItem[],
  cards: number,
  day = 0,
  grade: Grade = 4,
  seed: ReviewEvent[] = [],
): { served: DrillItem[]; events: ReviewEvent[] } {
  const events: ReviewEvent[] = [...seed];
  const served: DrillItem[] = [];
  for (let i = 0; i < cards; i++) {
    const q = queue(context(events, day));
    if (!q.length) break;
    served.push(q[0]);
    events.push(ev(q[0].factId, q[0].formIndex, grade, day));
  }
  return { served, events };
}

const factsOf = (items: DrillItem[]) => items.map((i) => i.factId);

describe('not tried yet — one fact at a time until they are all done', () => {
  it('serves 20 distinct facts in 20 cards', () => {
    // The regression. This was 8.
    const { served } = drill((c) => newQueue(c, 60), 20);
    expect(served).toHaveLength(20);
    expect(new Set(factsOf(served)).size).toBe(20);
  });

  it('never repeats a fact while any fact still has an unseen phrasing', () => {
    const { served } = drill((c) => newQueue(c, 60), 60);
    expect(new Set(factsOf(served)).size).toBe(served.length);
  });

  it('only ever offers a phrasing that has never been served', () => {
    const { served } = drill((c) => newQueue(c, 60), 40);
    const seen = new Set<string>();
    for (const item of served) {
      const key = `${item.factId}:${item.formIndex}`;
      expect(seen.has(key), `${key} served twice`).toBe(false);
      seen.add(key);
    }
  });

  it('goes empty once every fact has been answered once, rather than starting a second pass', () => {
    // It used to come back for each fact's remaining phrasings, which is why the New count
    // read 1,575 on a deck of 537 facts. New means never answered now (D-032), so the section
    // and its count empty together. The other phrasings still come round — through Due today,
    // Mastered and the chapter drills, where rotation serves the one seen least.
    const events: ReviewEvent[] = DECK.map((f) => ev(f.id, 0, 4));
    expect(newQueue(context(events), 5)).toEqual([]);

    // And one unanswered fact left behind is the only thing it offers.
    const allButOne = DECK.slice(1).map((f) => ev(f.id, 0, 4));
    expect(newQueue(context(allButOne), 5).map((i) => i.factId)).toEqual([DECK[0].id]);
  });
});

describe('by chapter — rotates, and is no longer the same every time', () => {
  const CHAPTER_1_SIZE = DECK.filter((f) => f.chapter === 1).length;

  it('exhausts the chapter before repeating any fact', () => {
    const { served } = drill((c) => chapterQueue(c, 1, 60), CHAPTER_1_SIZE);
    expect(new Set(factsOf(served)).size).toBe(CHAPTER_1_SIZE);
  });

  it('starts a second pass only after the first is complete', () => {
    const { served } = drill((c) => chapterQueue(c, 1, 60), CHAPTER_1_SIZE + 4);
    const firstPass = factsOf(served).slice(0, CHAPTER_1_SIZE);
    expect(new Set(firstPass).size).toBe(CHAPTER_1_SIZE);
  });

  it('does not serve the same order on different histories', () => {
    // Was byte-identical every session: f201, f202, f203… always, always form 0.
    const a = factsOf(chapterQueue(context([]), 1, 6));
    const b = factsOf(chapterQueue(context([ev('f000', 0, 4)]), 1, 6));
    expect(a).not.toEqual(b);
  });

  it('serves only facts from the chapter asked for', () => {
    for (const chapter of [1, 2, 3, 4, 5]) {
      const ids = new Set(factsOf(chapterQueue(context([]), chapter, 30)));
      expect([...ids].every((id) => DECK.find((f) => f.id === id)!.chapter === chapter)).toBe(true);
    }
  });
});

describe('a fact always comes back wearing a different phrasing', () => {
  it('picks the phrasing served least often', () => {
    const fact = DECK.find((f) => f.forms.length === 3 && f.forms.every((x) => !x.mcqOnly))!;
    const events = [ev(fact.id, 0, 4), ev(fact.id, 0, 4), ev(fact.id, 1, 4)];
    const counts = servedCounts(events);
    // form 0 twice, form 1 once, form 2 never — so form 2.
    expect(leastSeenForm(fact, counts, mulberry32(3))).toBe(2);
  });

  it('counts events, not scheduler credit — so a lapse does not re-serve what was just missed', () => {
    // `state.ok` is cleared for the missed phrasing, which is exactly the wording most
    // recently on screen. Using it here would hand it straight back.
    const fact = DECK.find((f) => f.forms.length === 3 && f.forms.every((x) => !x.mcqOnly))!;
    // Form 2 has been shown three times and was just missed; forms 0 and 1 once each.
    // Scheduler credit says form 2 (ok = 0, the lowest). Event counts say anything but
    // form 2 (three showings against one). They disagree, which is the point.
    const events = [
      ev(fact.id, 0, 4),
      ev(fact.id, 1, 4),
      ev(fact.id, 2, 4),
      ev(fact.id, 2, 4),
      ev(fact.id, 2, 0),
    ];
    const state = replay(events, FORM_COUNTS).states.get(fact.id)!;

    expect(state.ok[2], 'credit cleared by the lapse').toBe(0);
    expect(Math.min(...state.ok), 'credit would pick the just-missed form').toBe(state.ok[2]);
    expect(leastSeenForm(fact, servedCounts(events), mulberry32(1))).not.toBe(2);
  });

  it('rotates phrasings across a long chapter drill', () => {
    const size = DECK.filter((f) => f.chapter === 1).length;
    const { served } = drill((c) => chapterQueue(c, 1, 60), size * 2);
    const perFact = new Map<string, Set<number>>();
    for (const i of served) {
      perFact.set(i.factId, (perFact.get(i.factId) ?? new Set()).add(i.formIndex));
    }
    // Every fact seen twice must have been asked two different ways.
    const twice = [...perFact.entries()].filter(([id]) => factsOf(served).filter((f) => f === id).length === 2);
    expect(twice.length).toBeGreaterThan(0);
    for (const [id, forms] of twice) expect(forms.size, `${id} repeated its phrasing`).toBe(2);
  });
});

describe('due today — 30 a day, each fact once', () => {
  it('stops at 30 and then goes empty', () => {
    const { served } = drill((c) => dueQueue(c), DAILY_TARGET + 5);
    expect(served).toHaveLength(DAILY_TARGET);
    expect(dueQueue(context(served.map((i) => ev(i.factId, i.formIndex, 4))))).toEqual([]);
  });

  it('never serves the same fact twice in a day', () => {
    const { served } = drill((c) => dueQueue(c), DAILY_TARGET);
    expect(new Set(factsOf(served)).size).toBe(served.length);
  });

  it('refills the next day', () => {
    const day0 = drill((c) => dueQueue(c), DAILY_TARGET, 0);
    expect(dueRemaining(context(day0.events, 0))).toBe(0);
    expect(dueRemaining(context(day0.events, 1))).toBe(DAILY_TARGET);
    expect(dueQueue(context(day0.events, 1)).length).toBeGreaterThan(0);
  });

  it('counts a fact seen in ANY section against the day', () => {
    // Drilling a chapter uses up part of the daily 30 — the cap is about how much you
    // met today, not which button you pressed.
    const events = DECK.slice(0, 10).map((f) => ev(f.id, 0, 4));
    expect(dueRemaining(context(events))).toBe(DAILY_TARGET - 10);
  });
});

describe('due today — the mix, and what happens when a bucket is empty', () => {
  /** A history that leaves all three buckets populated. */
  function mixedHistory(): ReviewEvent[] {
    const events: ReviewEvent[] = [];
    // 8 facts missed and not cleared -> mistakes bucket
    for (const f of DECK.slice(0, 8)) events.push(ev(f.id, 0, 0, -3));
    // 12 facts fully served and correct -> correct bucket
    for (const f of DECK.slice(20, 32)) {
      f.forms.forEach((_, i) => events.push(ev(f.id, i, 4, -3)));
    }
    return events;
  }

  it('guarantees a floor from every bucket that has anything to give', () => {
    const events = mixedHistory();
    const ctx = context(events);
    const buckets = dueBuckets(ctx, new Set());
    expect(buckets.mistakes.length).toBeGreaterThanOrEqual(BUCKET_FLOOR);
    expect(buckets.correct.length).toBeGreaterThanOrEqual(BUCKET_FLOOR);
    expect(buckets.fresh.length).toBeGreaterThanOrEqual(BUCKET_FLOOR);

    const queue = dueQueue(ctx);
    const inBucket = (b: string[]) => queue.filter((i) => b.includes(i.factId)).length;
    expect(inBucket(buckets.mistakes), 'mistakes floor').toBeGreaterThanOrEqual(BUCKET_FLOOR);
    expect(inBucket(buckets.correct), 'correct floor').toBeGreaterThanOrEqual(BUCKET_FLOOR);
    expect(inBucket(buckets.fresh), 'fresh floor').toBeGreaterThanOrEqual(BUCKET_FLOOR);
  });

  it('fills the day from new material when there are no mistakes and nothing answered yet', () => {
    // The empty-day case: a brand-new install has only one bucket.
    const queue = dueQueue(context([]));
    expect(queue).toHaveLength(DAILY_TARGET);
    expect(new Set(factsOf(queue)).size).toBe(DAILY_TARGET);
  });

  it('still fills a full day when the mistakes bucket is empty', () => {
    const events = DECK.slice(0, 12).flatMap((f) => f.forms.map((_, i) => ev(f.id, i, 4, -3)));
    const ctx = context(events);
    expect(dueBuckets(ctx, new Set()).mistakes).toEqual([]);
    expect(dueQueue(ctx)).toHaveLength(DAILY_TARGET);
  });

  it('still fills a full day when there is no unseen material left', () => {
    // Every phrasing served, so `fresh` is empty and the day comes from the other two.
    const events = DECK.flatMap((f) => f.forms.map((_, i) => ev(f.id, i, 4, -3)));
    const ctx = context(events);
    expect(dueBuckets(ctx, new Set()).fresh).toEqual([]);
    expect(dueQueue(ctx)).toHaveLength(DAILY_TARGET);
  });

  it('puts each fact in exactly one bucket', () => {
    const buckets = dueBuckets(context(mixedHistory()), new Set());
    const all = [...buckets.mistakes, ...buckets.fresh, ...buckets.correct];
    expect(new Set(all).size).toBe(all.length);
  });

  it('excludes facts already seen today from every bucket', () => {
    const seen = new Set(['f000', 'f001', 'f002']);
    const buckets = dueBuckets(context([]), seen);
    const all = [...buckets.mistakes, ...buckets.fresh, ...buckets.correct];
    expect(all.some((id) => seen.has(id))).toBe(false);
  });
});

describe('random — no memory, no order', () => {
  it('draws from every fact in the deck, and varies the phrasing', () => {
    const seen = new Set<string>();
    const facts = new Set<string>();
    for (let s = 0; s < 40; s++) {
      const ctx: SectionContext = { ...context([]), rng: mulberry32(s) };
      for (const i of randomQueue(ctx, 40)) {
        seen.add(`${i.factId}:${i.formIndex}`);
        facts.add(i.factId);
      }
    }
    // Not exhaustive, but wide enough to prove it is not drawing from a fixed slice — and
    // that a fact met twice was not asked the same way both times.
    expect(facts.size).toBeGreaterThan(DECK.length / 4);
    expect(seen.size).toBeGreaterThan(facts.size);
  });

  it('draws one card per fact, not one per phrasing', () => {
    // It used to shuffle the flat list of every (fact, phrasing) pair, which made a
    // three-phrasing fact 50% likelier to come up than a two-phrasing one — "random" weighted
    // by how many ways a fact happens to be written. The unit here is the fact (D-032).
    const pool = randomQueue(context([]), DECK.length + 50);
    expect(pool).toHaveLength(DECK.length);
    expect(new Set(pool.map((i) => i.factId)).size).toBe(DECK.length);
  });

  it('is the one section that may repeat, because it has no memory', () => {
    const drilled = DECK.slice(0, 5);
    const events = drilled.flatMap((f) => f.forms.map((_, i) => ev(f.id, i, 4)));

    // Asserted over the WHOLE pool, not a 40-card draw.
    //
    // This used to take 40 cards and expect one of the five drilled facts among them. That is
    // a lottery dressed as a test: it passed at 1,228 forms, and adding facts quietly pushed
    // the odds under the line until it failed on a change that had nothing to do with it.
    // The property is "drilled facts stay eligible", so ask the pool that question directly.
    const pool = randomQueue(context(events), DECK.length);
    const ids = new Set(pool.map((i) => i.factId));
    for (const fact of drilled) {
      expect(ids.has(fact.id), `${fact.id} was drilled and then dropped from random`).toBe(true);
    }
    expect(pool).toHaveLength(DECK.length);
  });

  it('varies between draws', () => {
    const a = factsOf(randomQueue({ ...context([]), rng: mulberry32(1) }, 12));
    const b = factsOf(randomQueue({ ...context([]), rng: mulberry32(2) }, 12));
    expect(a).not.toEqual(b);
  });
});

describe('mistakes — rotates, but may return to a fact', () => {
  it('gives every outstanding fact a turn before repeating one', () => {
    const seed = DECK.slice(0, 6).map((f) => ev(f.id, 0, 0));
    const { served } = drill((c) => mistakesQueue(c, 40), 6, 0, 4, seed);
    expect(served).toHaveLength(6);
    expect(new Set(factsOf(served)).size).toBe(6);
  });

  it('can return to a fact once its peers have had a turn — clearing needs three', () => {
    const seed = [ev('f000', 0, 0), ev('f001', 0, 0)];
    const { served } = drill((c) => mistakesQueue(c, 40), 4, 0, 4, seed);
    // Two outstanding facts, four cards: each has to come round twice.
    expect(served.length).toBeGreaterThan(2);
    expect(new Set(factsOf(served))).toEqual(new Set(['f000', 'f001']));
  });
});

describe('rotation primitives', () => {
  it('orders unseen before seen, and seen-once before seen-twice', () => {
    const counts = servedCounts([ev('f001', 0, 4), ev('f002', 0, 4), ev('f002', 1, 4)]);
    const order = rotate(['f000', 'f001', 'f002'], counts, mulberry32(1));
    expect(order).toEqual(['f000', 'f001', 'f002']);
  });

  it('shuffles within a tier rather than using deck order', () => {
    const ids = DECK.slice(0, 20).map((f) => f.id);
    const a = rotate(ids, servedCounts([]), mulberry32(1));
    const b = rotate(ids, servedCounts([]), mulberry32(2));
    expect(a).not.toEqual(b);
    expect([...a].sort()).toEqual([...ids].sort());
  });

  it('counts a day by fact, not by review', () => {
    const events = [ev('f000', 0, 4), ev('f000', 1, 4), ev('f001', 0, 4)];
    expect(servedToday(events, TODAY)).toEqual(new Set(['f000', 'f001']));
  });
});

describe('mastered — current form, not coverage', () => {
  const A = DECK[0].id;
  const B = DECK[1].id;

  it('counts a fact after a single correct answer', () => {
    // The owner's rule, and it is deliberately not the headline's: you do not have to prove
    // every phrasing for a fact to appear here. One right answer is enough to say "I am
    // currently getting this right", which is what this section is asking.
    expect(masteredFacts(context([ev(A, 0, 4)]))).toContain(A);
  });

  it('never counts a fact that has not been tried', () => {
    expect(masteredFacts(context([ev(A, 0, 4)]))).not.toContain(B);
  });

  it('drops a fact the moment it is missed, and does not wait for a review', () => {
    const events = [ev(A, 0, 4), ev(A, 1, 5), ev(A, 2, 0)];
    expect(masteredFacts(context(events))).not.toContain(A);
  });

  it('lets a fact back in once the miss falls out of the window', () => {
    // Three attempts, not for ever. A bad day should not disqualify a fact permanently, and
    // the window rolling forward is what makes that true.
    const missed = [ev(A, 0, 0)];
    expect(masteredFacts(context(missed))).not.toContain(A);

    const recovering = [...missed, ev(A, 1, 4), ev(A, 2, 4)];
    expect(
      masteredFacts(context(recovering)),
      'the miss is still inside the last three attempts',
    ).not.toContain(A);

    const recovered = [...recovering, ev(A, 0, 4)];
    expect(masteredFacts(context(recovered))).toContain(A);
  });

  it('looks only at the last three attempts, however long the history', () => {
    const old = Array.from({ length: 10 }, (_, i) => ev(A, i % 3, 0));
    const recent = [ev(A, 0, 4), ev(A, 1, 4), ev(A, 2, 5)];
    expect(MASTERY_WINDOW).toBe(3);
    expect(masteredFacts(context([...old, ...recent]))).toContain(A);
  });

  it('serves a different phrasing each time a fact comes round', () => {
    // Serving the phrasing already answered would test the sentence rather than the fact,
    // which is the failure this whole app is built against.
    const fact = DECK.find((f) => f.forms.length >= 3)!;
    let events = [ev(fact.id, 0, 4)];
    const served: number[] = [];

    for (let i = 0; i < 2; i++) {
      const item = masteredQueue(context(events), 40).find((x) => x.factId === fact.id);
      expect(item, 'a mastered fact should still be offered').toBeTruthy();
      served.push(item!.formIndex);
      events = [...events, ev(fact.id, item!.formIndex, 4)];
    }

    expect(served).not.toContain(0);
    expect(new Set(served).size).toBe(served.length);
  });
});
