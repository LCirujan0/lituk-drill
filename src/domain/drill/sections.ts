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
 *   · **Random** serves any fact at all: no memory, no order.
 *
 * **Everything counted here is a fact** (D-032). The phrasings are the mechanism that lets the
 * app tell knowing a fact from knowing one sentence; rotation still gives a different question
 * every time a fact comes round, and it is invisible. New, Mastered and Mistakes partition the
 * deck, which `standing.ts` guarantees by construction.
 */

import type { Deck, Fact } from '../deck/types';
import type { ReviewEvent } from '../scheduler/events';
import { shuffle, type Rng } from '../scheduler/rng';
import type { FactState } from '../scheduler/types';
import { mistakesFrom, nextFormForMistake, type MistakeStanding } from './mistakes';
import { factStandings, partition, type FactStanding } from './standing';
import {
  factsWithUnseenForms,
  leastSeenForm,
  rotate,
  servedCounts,
  servedToday,
  type ServedCounts,
} from './rotation';

/** Re-exported so callers reach one definition of the window, wherever they came in. */
export { MASTERY_WINDOW, type FactStanding, type Standing } from './standing';

export type SectionId = 'due' | 'new' | 'mistakes' | 'chapter' | 'random' | 'mastered';

/**
 * Facts served in a day through Due today. The daily obligation, and its ceiling.
 *
 * **30 → 50 on 10 August 2026, and it is a scheduling decision rather than a preference.**
 * The deck is 533 facts and D-035 opens it to about 700. At 30 a day a 700-fact deck takes 24
 * days just to *show* every fact once, before any review — and the breadth gate needs a second
 * phrasing proven before an interval can grow past six days. So a larger deck at an unchanged
 * daily rate makes readiness worse while making coverage better, which is the trade D-035 left
 * open and this closes.
 *
 * The 60-day simulation was run at 40/day and peaked at 187 reviews on day 9. At 50 the peak
 * will be higher; that is the cost, and it is paid in the two weeks after a push rather than
 * spread. Re-run the simulation before treating any of its published numbers as current.
 */
export const DAILY_TARGET = 50;

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

const factIds = (ctx: SectionContext): string[] => ctx.deck.map((f) => f.id);

/** Every fact's standing, from the one classification. */
export const standingsFor = (ctx: SectionContext): Map<string, FactStanding> =>
  factStandings(factIds(ctx), ctx.events);

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

/**
 * Split the deck into the three buckets a day is built from, skipping anything excluded.
 *
 * **`fresh` here is deliberately not the New section.** New means never answered (D-032); this
 * bucket means "has a phrasing not yet served", so a fact met once still supplies new material
 * to the day. That is a scheduling decision rather than a displayed number — nothing on screen
 * counts this bucket — and narrowing it would change the shape of the daily load, which the
 * 60-day simulation is the only thing qualified to judge. Due today was to be left alone.
 *
 * The `mistakes` bucket does move with the new rule, because it reads the one mistakes list.
 */
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
// New — facts never answered
// ===========================================================================

/** Facts with no review event of any kind. The section, and the count, are the same set. */
export const newFacts = (ctx: SectionContext): string[] => partition(factIds(ctx), ctx.events).fresh;

/**
 * Facts never answered, one card each, shuffled.
 *
 * **This used to serve facts with an unseen PHRASING**, which is why the New tile read 1,575 on
 * a deck of 537 facts: a fact answered once was still New, and stayed New until every one of its
 * questions had been served. The count measured the apparatus and the section agreed with it, so
 * neither looked wrong. New now means what it says — never answered — and a fact leaves it the
 * moment it is answered once, which is the same moment it becomes Mastered (D-032). Its other
 * phrasings still come round, through Due today, Mastered and the chapter drills, where rotation
 * serves the one seen least.
 *
 * Every candidate has zero events, so `rotate` is a shuffle here and `leastSeenForm` picks
 * uniformly among all of the fact's phrasings. Both are still used rather than inlined, so this
 * stays correct if the definition of the pool ever widens again.
 */
export function newQueue(ctx: SectionContext, limit = 40): DrillItem[] {
  const counts = countsFor(ctx);
  const order = rotate(newFacts(ctx), counts, ctx.rng);

  return order.slice(0, limit).map((factId) => ({
    factId,
    formIndex: leastSeenForm(factById(ctx.deck, factId), counts, ctx.rng),
  }));
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
 * Clearing a fact needs three correct answers, so this section must be able to return to a fact
 * — but not before its peers have had a turn.
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
 * Any fact at all, in any order, wearing any of its phrasings.
 *
 * Deliberately not rotated and not weighted: no least-seen preference, no bucket, no memory.
 * It is the only section that can hand you the same card twice running, and that is the
 * point — it is the honest sample of the deck, which the others are all designed not to be.
 *
 * The draw is over facts and then over that fact's phrasings, rather than over the flat list of
 * every phrasing. Flat, a three-phrasing fact was 50% likelier to appear than a two-phrasing
 * one, which made "random" a sample weighted by how many ways a fact happens to be written —
 * and the fact is the unit here, so that was a quiet bias rather than a choice.
 */
export function randomQueue(ctx: SectionContext, limit = 40): DrillItem[] {
  return shuffle(
    ctx.deck.map((f) => f.id),
    ctx.rng,
  )
    .slice(0, limit)
    .map((factId) => {
      const fact = factById(ctx.deck, factId);
      return { factId, formIndex: shuffle(fact.forms.map((_, i) => i), ctx.rng)[0] };
    });
}

/**
 * Facts currently being got right: **answered at least once, with no wrong answer in the last
 * three attempts.**
 *
 * The owner's definition, and now the headline as well as the section (D-032). It is a measure
 * of current form rather than of coverage: one correct answer puts a fact here, and it leaves
 * the moment it is missed. It is the only number on the home screen that can fall, which is what
 * makes it worth looking at — everything else there only ever rises.
 */
export const masteredFacts = (ctx: SectionContext): string[] =>
  partition(factIds(ctx), ctx.events).mastered;

/**
 * Drill what is currently being got right, to find out whether it still is.
 *
 * Nothing else on the home screen can fall on its own. "I know this" is a claim that decays
 * silently, and without a section that retests it the only way to discover otherwise is the
 * exam. A miss here removes the fact from the count immediately, which is what makes the
 * number worth looking at.
 *
 * **A different phrasing every time.** Rotation by served count, then the least-seen form —
 * the same machinery the other self-directed sections use. Serving the phrasing you have
 * already answered would test the sentence rather than the fact, which is the failure this
 * whole app is built against.
 *
 * Practice, not scheduled (D-003): a success changes no interval, a miss lapses the fact.
 */
export function masteredQueue(ctx: SectionContext, limit = 40): DrillItem[] {
  const counts = countsFor(ctx);
  const mastered = rotate(masteredFacts(ctx), counts, ctx.rng).slice(0, limit);
  return mastered.map((factId) => ({
    factId,
    formIndex: leastSeenForm(factById(ctx.deck, factId), counts, ctx.rng),
  }));
}

// ===========================================================================
// Counts for the home screen
// ===========================================================================

/**
 * Every number the home screen shows. All of them are facts (D-032).
 *
 * `newFacts + mastered + mistakes === totalFacts`, always — the three come from one walk of the
 * deck in `standing.ts`, so they cannot drift apart. `due` is the one that is not part of that
 * partition, and it is not a coverage figure: it is cards left in today's thirty, each of them a
 * distinct fact, and it falls to zero every evening rather than describing the deck.
 */
export interface SectionCounts {
  /** Cards left in today's 30. Each is a distinct fact; a fact appears at most once a day. */
  readonly due: number;
  /** Facts never answered. */
  readonly newFacts: number;
  /** Facts with a wrong answer inside their last three attempts. */
  readonly mistakes: number;
  /** Facts with no wrong answer in their last three attempts. Falls on a miss. */
  readonly mastered: number;
  /** Facts drilled, i.e. `ACTIVE.length`. The denominator on every screen. */
  readonly totalFacts: number;
  readonly byChapter: ReadonlyMap<number, { total: number; mastered: number }>;
}

export function sectionCounts(ctx: SectionContext): SectionCounts {
  const { fresh, mastered, mistakes } = partition(factIds(ctx), ctx.events);
  const isMastered = new Set(mastered);

  const byChapter = new Map<number, { total: number; mastered: number }>();
  for (const fact of ctx.deck) {
    const entry = byChapter.get(fact.chapter) ?? { total: 0, mastered: 0 };
    entry.total++;
    if (isMastered.has(fact.id)) entry.mastered++;
    byChapter.set(fact.chapter, entry);
  }

  return {
    due: dueRemaining(ctx),
    newFacts: fresh.length,
    mistakes: mistakes.length,
    mastered: mastered.length,
    totalFacts: ctx.deck.length,
    byChapter,
  };
}
