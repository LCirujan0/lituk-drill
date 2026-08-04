/**
 * The five drill sections, plus the due-today queue they sit alongside.
 *
 * Every one of them is **derived from the review-event log**. There is no per-section
 * stored state to keep in sync, nothing to increment, and no way for a section to disagree
 * with the history it claims to describe. Change a rule and every section recomputes
 * correctly, including retrospectively. That is D-002's local-first event log paying for
 * itself three features later.
 *
 * The owner's shape, settled 4 August 2026:
 *   · **Due today** is the front door. The scheduler still decides what he sees most, which
 *     is what makes the breadth gate and the readiness number mean anything.
 *   · **Not tried yet** counts PHRASINGS, not facts — all 1,327 forms. A fact he has met
 *     once still has two unseen ways of being asked, and those are exactly what the breadth
 *     gate cares about.
 *   · **Mistakes** clears at three correct answers on three different phrasings; see
 *     `mistakes.ts`.
 *   · **By chapter** is five buttons, matching the handbook.
 *   · **Progress** is counting, and lives in `stats.ts`.
 */

import type { Deck, Fact } from '../deck/types';

import type { ReviewEvent } from '../scheduler/events';
import { shuffle, type Rng } from '../scheduler/rng';
import type { FactState } from '../scheduler/types';
import { mistakesFrom, nextFormForMistake, type MistakeStanding } from './mistakes';

export type SectionId = 'due' | 'new' | 'mistakes' | 'chapter' | 'mock';

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

/** Every (fact, form) pair the log has never seen. The "not tried yet" section. */
export function unseenForms(deck: Deck, events: readonly ReviewEvent[]): DrillItem[] {
  const seen = new Set<string>();
  for (const event of events) seen.add(`${event.factId}:${event.formIndex}`);

  const out: DrillItem[] = [];
  for (const fact of deck) {
    fact.forms.forEach((_, formIndex) => {
      if (!seen.has(`${fact.id}:${formIndex}`)) out.push({ factId: fact.id, formIndex });
    });
  }
  return out;
}

/**
 * The "not tried yet" queue.
 *
 * Ordered so a session meets whole facts rather than skipping across the deck: unseen
 * phrasings of facts already started come first — they are what lifts the breadth gate —
 * then entirely new facts, shuffled so the order is not a walk through the deck in
 * chapter order, which is its own kind of cue.
 */
export function newQueue(ctx: SectionContext, limit = 40): DrillItem[] {
  const unseen = unseenForms(ctx.deck, ctx.events);
  const started = new Set(ctx.events.map((e) => e.factId));

  const continuing = unseen.filter((i) => started.has(i.factId));
  const untouched = unseen.filter((i) => !started.has(i.factId));

  // Only one phrasing per fact per pass through the untouched pile: meeting a fact three
  // ways in ninety seconds teaches the wording, not the fact.
  const firstPerFact = new Map<string, DrillItem>();
  for (const item of shuffle(untouched, ctx.rng)) {
    if (!firstPerFact.has(item.factId)) firstPerFact.set(item.factId, item);
  }

  return [...shuffle(continuing, ctx.rng), ...firstPerFact.values()].slice(0, limit);
}

/** The mistakes drill, worst first. */
export function mistakesQueue(ctx: SectionContext, limit = 40): DrillItem[] {
  const formCounts = new Map(ctx.deck.map((f) => [f.id, f.forms.length]));
  const standings = mistakesFrom(ctx.events, formCounts);

  return standings.slice(0, limit).map((standing) => ({
    factId: standing.factId,
    formIndex: nextFormForMistake(standing, formCounts.get(standing.factId)!, ctx.rng),
  }));
}

/** Standing detail for the mistakes screen — "2 of 3" per fact. */
export function mistakeStandings(ctx: SectionContext): MistakeStanding[] {
  return mistakesFrom(ctx.events, new Map(ctx.deck.map((f) => [f.id, f.forms.length])));
}

/**
 * A chapter drill. Serves the least-proven phrasing of each fact in the chapter, weakest
 * facts first, so a chapter session works on what is actually shaky rather than reciting
 * what is already solid.
 */
export function chapterQueue(ctx: SectionContext, chapter: number, limit = 40): DrillItem[] {
  const facts = ctx.deck.filter((f) => f.chapter === chapter);

  const scored = facts.map((fact) => {
    const state = ctx.states.get(fact.id);
    const proven = state ? state.ok.filter((v) => v > 0).length : 0;
    const lapses = state?.lapses ?? 0;
    return { fact, proven, lapses, seen: state?.seen ?? 0 };
  });

  scored.sort((a, b) => b.lapses - a.lapses || a.proven - b.proven || a.seen - b.seen);

  return scored.slice(0, limit).map(({ fact }) => ({
    factId: fact.id,
    formIndex: leastProvenForm(fact, ctx.states.get(fact.id)),
  }));
}

/**
 * The phrasing of a fact with the least credit, preferring ones usable for free recall.
 * Six facts have only one recall-usable form, so the fallback to the full set is reached
 * in practice, not just in theory.
 */
function leastProvenForm(fact: Fact, state: FactState | undefined): number {
  const indices = fact.forms.map((_, i) => i);
  const recallable = indices.filter((i) => !fact.forms[i].mcqOnly);
  const usable = recallable.length ? recallable : indices;

  if (!state) return usable[0];
  return usable.reduce((best, i) => ((state.ok[i] ?? 0) < (state.ok[best] ?? 0) ? i : best), usable[0]);
}

/** How many items each section currently holds, for the badges on the home screen. */
export interface SectionCounts {
  readonly due: number;
  readonly newForms: number;
  readonly mistakes: number;
  readonly byChapter: ReadonlyMap<number, { total: number; proven: number }>;
}

export function sectionCounts(ctx: SectionContext): SectionCounts {
  let due = 0;
  for (const fact of ctx.deck) {
    const state = ctx.states.get(fact.id);
    if (state && state.seen > 0 && (state.relearn || state.due <= ctx.today)) due++;
  }

  const byChapter = new Map<number, { total: number; proven: number }>();
  for (const fact of ctx.deck) {
    const entry = byChapter.get(fact.chapter) ?? { total: 0, proven: 0 };
    entry.total++;
    const state = ctx.states.get(fact.id);
    if (state && state.ok.length > 0 && state.ok.every((v) => v > 0)) entry.proven++;
    byChapter.set(fact.chapter, entry);
  }

  return {
    due,
    newForms: unseenForms(ctx.deck, ctx.events).length,
    mistakes: mistakeStandings(ctx).length,
    byChapter,
  };
}
