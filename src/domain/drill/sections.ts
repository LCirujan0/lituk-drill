/**
 * The drill sections, and what each one serves next.
 *
 * Everything here is derived from the review-event log. There is no per-section stored
 * state, nothing to keep in sync, and no way for a section to disagree with the history it
 * claims to describe (D-002).
 *
 * The shape, as the owner settled it:
 *
 *   · **Due today** is the front door and is capped at 30 facts a day. A fact appears at
 *     most once in it per day. The day is a mix of mistakes, unseen material and facts
 *     previously answered correctly, with a floor from each bucket so it never becomes all
 *     one thing.
 *   · **The other sections are unlimited**, and use exhaustive rotation: a fact does not
 *     come round again until every other fact in that pool has had its turn.
 *   · **Every reappearance wears a different phrasing** — the least-seen form, counted from
 *     the log rather than from scheduler credit, which resets on a lapse.
 *   · **Random** serves one uniformly-chosen phrasing out of all 1,327.
 */

import type { Deck, Fact } from '../deck/types';
import type { ReviewEvent } from '../scheduler/events';
import { shuffle, type Rng } from '../scheduler/rng';
import type { FactState } from '../scheduler/types';
import { mistakesFrom, nextFormForMistake, type MistakeStanding } from './mistakes';
import {
  factsWithUnseenForms,
  leastSeenForm,
  rotate,
  servedCounts,
  servedToday,
  unseenForm,
  type ServedCounts,
} from './rotation';

export type SectionId = 'due' | 'new' | 'mistakes' | 'chapter' | 'random' | 'mastered';

/** Facts served in a day through Due today. The daily obligation, and its ceiling. */
export const DAILY_TARGET = 30;

/**
 * Cards guaranteed from each bucket in a day, where that bucket has anything to give.
 *
 * "The scheduler decides, but guarantee some of each." Without a floor one bucket swallows
 * the day: early on everything is new, and later a bad week of lapses would crowd new
 * material out entirely. Three fives leave half the day for the scheduler's own ordering,
 * which is the part that should adapt.
 */
export const BUCKET_FLOOR = 5;

/** One card to serve: which fact, and which of its phrasings. */
export interface DrillItem {
  readonly factId: string;
  readonly formIndex: number;
}

export interface SectionContext {
  readonly deck: Deck;
  readonly events: readonly ReviewEvent[];
  readonly states: ReadonlyMap<string, FactState>;
  readonly today: number;
  readonly rng: Rng;
}

const countsFor = (ctx: SectionContext): ServedCounts => servedCounts(ctx.events);

function factById(deck: Deck, id: string): Fact {
  const fact = deck.find((f) => f.id === id);
  if (!fact) throw new Error(`unknown fact ${id}`);
  return fact;
}

// ===========================================================================
// Due today — the daily mix
// ===========================================================================

export interface DueBuckets {
  /** Facts missed and not yet cleared. */
  readonly mistakes: string[];
  /** Facts with at least one phrasing never served. */
  readonly fresh: string[];
  /** Facts previously answered correctly. Chosen at random, not by due date — see D-026. */
  readonly correct: string[];
}

/** Split the deck into the three buckets a day is built from, skipping anything excluded. */
export function dueBuckets(ctx: SectionContext, exclude: ReadonlySet<string>): DueBuckets {
  const counts = countsFor(ctx);
  const formCounts = new Map(ctx.deck.map((f) => [f.id, f.forms.length]));
  const outstanding = new Set(mistakesFrom(ctx.events, formCounts).map((s) => s.factId));

  const everCorrect = new Set<string>();
  for (const e of ctx.events) if (e.grade >= 3) everCorrect.add(e.factId);

  const unseen = new Set(factsWithUnseenForms(ctx.deck, counts).map((f) => f.id));

  const mistakes: string[] = [];
  const fresh: string[] = [];
  const correct: string[] = [];

  for (const fact of ctx.deck) {
    if (exclude.has(fact.id)) continue;
    // A fact belongs to exactly one bucket, most-urgent first, so the floors mean something.
    if (outstanding.has(fact.id)) mistakes.push(fact.id);
    else if (unseen.has(fact.id)) fresh.push(fact.id);
    else if (everCorrect.has(fact.id)) correct.push(fact.id);
  }

  return { mistakes, fresh, correct };
}

/**
 * The day's queue: up to 30 facts, none of them already seen today.
 *
 * Buckets are filled to their floor first, then the remainder goes by urgency — outstanding
 * mistakes, then facts the scheduler considers overdue, then new material. The result is
 * shuffled so the day does not arrive in three visible blocks.
 */
export function dueQueue(ctx: SectionContext): DrillItem[] {
  const done = servedToday(ctx.events, ctx.today);
  const slots = DAILY_TARGET - done.size;
  if (slots <= 0) return [];

  const counts = countsFor(ctx);
  const buckets = dueBuckets(ctx, done);

  const pools: Record<'mistakes' | 'fresh' | 'correct', string[]> = {
    mistakes: rotate(buckets.mistakes, counts, ctx.rng),
    fresh: rotate(buckets.fresh, counts, ctx.rng),
    // "Any previously-correct fact, at random" — the owner's decision (D-026). Not ordered
    // by due date, so SM-2 no longer decides what appears here.
    correct: shuffle(buckets.correct, ctx.rng),
  };

  const chosen: string[] = [];
  const taken = { mistakes: 0, fresh: 0, correct: 0 };

  const take = (bucket: keyof typeof pools, n: number) => {
    for (let i = 0; i < n && taken[bucket] < pools[bucket].length && chosen.length < slots; i++) {
      chosen.push(pools[bucket][taken[bucket]++]);
    }
  };

  // Floors first, so no bucket is crowded out of the day.
  take('mistakes', BUCKET_FLOOR);
  take('fresh', BUCKET_FLOOR);
  take('correct', BUCKET_FLOOR);

  // Then fill by urgency. Overdue reviews are promoted ahead of new material, which is the
  // one place the scheduler still gets to shape the day.
  const anyOverdue = pools.correct.some((id) => {
    const s = ctx.states.get(id);
    return s && s.seen > 0 && s.due <= ctx.today;
  });
  const order: (keyof typeof pools)[] = anyOverdue
    ? ['mistakes', 'correct', 'fresh']
    : ['mistakes', 'fresh', 'correct'];
  for (const bucket of order) take(bucket, slots);

  return shuffle(chosen, ctx.rng).map((factId) => ({
    factId,
    formIndex: leastSeenForm(factById(ctx.deck, factId), counts, ctx.rng),
  }));
}

/** How many of today's 30 are left. */
export const dueRemaining = (ctx: SectionContext): number =>
  Math.max(0, DAILY_TARGET - servedToday(ctx.events, ctx.today).size);

// ===========================================================================
// Not tried yet
// ===========================================================================

/** Every (fact, form) pair the log has never seen. */
export function unseenForms(deck: Deck, events: readonly ReviewEvent[]): DrillItem[] {
  const counts = servedCounts(events);
  const out: DrillItem[] = [];
  for (const fact of deck) {
    fact.forms.forEach((_, formIndex) => {
      if ((counts.byForm.get(`${fact.id}:${formIndex}`) ?? 0) === 0) {
        out.push({ factId: fact.id, formIndex });
      }
    });
  }
  return out;
}

/**
 * One unseen phrasing per fact, rotated so every fact gets a turn before any repeats.
 *
 * The previous version put unseen phrasings of *already-started* facts first, which meant a
 * fact was served, then served again with its second phrasing, then its third — 20 cards
 * yielded 8 distinct facts. Rotation by served-count fixes it at the root: a fact seen once
 * sits behind every fact seen zero times.
 */
export function newQueue(ctx: SectionContext, limit = 40): DrillItem[] {
  const counts = countsFor(ctx);
  const candidates = factsWithUnseenForms(ctx.deck, counts);
  const order = rotate(
    candidates.map((f) => f.id),
    counts,
    ctx.rng,
  );

  const out: DrillItem[] = [];
  for (const factId of order) {
    if (out.length >= limit) break;
    const form = unseenForm(factById(ctx.deck, factId), counts, ctx.rng);
    if (form !== null) out.push({ factId, formIndex: form });
  }
  return out;
}

// ===========================================================================
// Mistakes
// ===========================================================================

export function mistakeStandings(ctx: SectionContext): MistakeStanding[] {
  return mistakesFrom(ctx.events, new Map(ctx.deck.map((f) => [f.id, f.forms.length])));
}

/**
 * The mistakes drill, rotated within equal standing.
 *
 * Clearing a fact needs three correct answers on three different phrasings, so this section
 * must be able to return to a fact — but not before its peers have had a turn.
 */
export function mistakesQueue(ctx: SectionContext, limit = 40): DrillItem[] {
  const formCounts = new Map(ctx.deck.map((f) => [f.id, f.forms.length]));
  const counts = countsFor(ctx);
  const standings = mistakeStandings(ctx);
  if (!standings.length) return [];

  const byId = new Map(standings.map((s) => [s.factId, s]));
  const order = rotate(
    standings.map((s) => s.factId),
    counts,
    ctx.rng,
  );

  return order.slice(0, limit).map((factId) => ({
    factId,
    formIndex: nextFormForMistake(byId.get(factId)!, formCounts.get(factId)!, ctx.rng),
  }));
}

// ===========================================================================
// By chapter
// ===========================================================================

/**
 * A chapter drill, rotated.
 *
 * Was fully deterministic: the same ids in the same order every session, always form 0.
 * Now every fact in the chapter gets a turn before any repeats, and each turn uses the
 * phrasing seen least.
 */
export function chapterQueue(ctx: SectionContext, chapter: number, limit = 40): DrillItem[] {
  const counts = countsFor(ctx);
  const facts = ctx.deck.filter((f) => f.chapter === chapter);
  const order = rotate(
    facts.map((f) => f.id),
    counts,
    ctx.rng,
  );

  return order.slice(0, limit).map((factId) => ({
    factId,
    formIndex: leastSeenForm(factById(ctx.deck, factId), counts, ctx.rng),
  }));
}

// ===========================================================================
// Random
// ===========================================================================

/**
 * One phrasing, chosen uniformly from all of them.
 *
 * Deliberately not rotated and not weighted: no least-seen preference, no bucket, no memory.
 * It is the only section that can hand you the same card twice running, and that is the
 * point — it is the honest sample of the deck, which the others are all designed not to be.
 */
export function randomQueue(ctx: SectionContext, limit = 40): DrillItem[] {
  const all: DrillItem[] = [];
  for (const fact of ctx.deck) {
    fact.forms.forEach((_, formIndex) => all.push({ factId: fact.id, formIndex }));
  }
  return shuffle(all, ctx.rng).slice(0, limit);
}

/** Facts answered correctly on every one of their phrasings. */
export function masteredFacts(ctx: SectionContext): string[] {
  const out: string[] = [];
  for (const fact of ctx.deck) {
    const state = ctx.states.get(fact.id);
    if (state && state.ok.length > 0 && state.ok.every((v) => v > 0)) out.push(fact.id);
  }
  return out;
}

/**
 * Drill only what is already known every way.
 *
 * The point is not to learn anything — it is to find out whether "known" is still true. The
 * headline counts a fact as mastered the moment every phrasing has been right once, and that
 * claim decays silently: nothing on the home screen ever goes down on its own. This is the
 * section that can take it down, which is what makes the number worth reading.
 *
 * It is a practice section (D-003), so a success here changes nothing and a miss lapses the
 * fact and drops it out of the count. Exactly the asymmetry the decision asks for.
 */
export function masteredQueue(ctx: SectionContext, limit = 40): DrillItem[] {
  const mastered = new Set(masteredFacts(ctx));
  const all: DrillItem[] = [];
  for (const fact of ctx.deck) {
    if (!mastered.has(fact.id)) continue;
    fact.forms.forEach((_, formIndex) => all.push({ factId: fact.id, formIndex }));
  }
  return shuffle(all, ctx.rng).slice(0, limit);
}

// ===========================================================================
// Counts for the home screen
// ===========================================================================

export interface SectionCounts {
  /** Cards left in today's 30. */
  readonly due: number;
  /** Phrasings never served, across the whole deck. */
  readonly newForms: number;
  readonly mistakes: number;
  /** Facts right on every phrasing — the headline number, and what `mastered` drills. */
  readonly mastered: number;
  readonly totalForms: number;
  readonly byChapter: ReadonlyMap<number, { total: number; proven: number }>;
}

export function sectionCounts(ctx: SectionContext): SectionCounts {
  const byChapter = new Map<number, { total: number; proven: number }>();
  let totalForms = 0;

  for (const fact of ctx.deck) {
    totalForms += fact.forms.length;
    const entry = byChapter.get(fact.chapter) ?? { total: 0, proven: 0 };
    entry.total++;
    const state = ctx.states.get(fact.id);
    if (state && state.ok.length > 0 && state.ok.every((v) => v > 0)) entry.proven++;
    byChapter.set(fact.chapter, entry);
  }

  return {
    due: dueRemaining(ctx),
    newForms: unseenForms(ctx.deck, ctx.events).length,
    mistakes: mistakeStandings(ctx).length,
    mastered: masteredFacts(ctx).length,
    totalForms,
    byChapter,
  };
}
