/**
 * The five drill sections.
 *
 * The mistakes rule gets the most attention because it is the one the owner specified
 * precisely — wrong once, then three correct answers on three different phrasings, with a
 * fresh miss resetting the count — and because it is entirely derived from the event log,
 * which means the tests here are also the proof that no separate counter is needed.
 */

import { describe, expect, it } from 'vitest';

import { DECK } from '@/domain/deck';
import { mistakesFrom, nextFormForMistake, CLEAR_STREAK } from '@/domain/drill/mistakes';
import {
  chapterQueue,

  newQueue,
  sectionCounts,
  unseenForms,
  type SectionContext,
} from '@/domain/drill/sections';
import { deckProgress, problemFacts, recentActivity, streak, upcomingLoad } from '@/domain/drill/stats';
import { MS_PER_DAY, replay, type ReviewEvent } from '@/domain/scheduler/events';
import { mulberry32 } from '@/domain/scheduler/rng';
import type { Grade, ReviewMode } from '@/domain/scheduler/types';

const FORM_COUNTS = new Map(DECK.map((f) => [f.id, f.forms.length]));
const DAY0 = 1_700_000_000_000;

let seq = 0;
const ev = (factId: string, formIndex: number, grade: Grade, day = 0, mode: ReviewMode = 'scheduled'): ReviewEvent => ({
  id: `e${seq++}`,
  factId,
  formIndex,
  grade,
  mode,
  at: DAY0 + day * MS_PER_DAY,
});

function context(events: ReviewEvent[], today = 0): SectionContext {
  return {
    deck: DECK,
    events,
    states: replay(events, FORM_COUNTS).states,
    today: Math.floor(DAY0 / MS_PER_DAY) + today,
    rng: mulberry32(1),
  };
}

describe('mistakes — wrong once, three right on three phrasings to clear', () => {
  it('does not list a fact that has never been missed', () => {
    const events = [ev('f000', 0, 4), ev('f000', 1, 5), ev('f000', 2, 4)];
    expect(mistakesFrom(events, FORM_COUNTS)).toEqual([]);
  });

  it('lists a fact as soon as it is missed', () => {
    const standings = mistakesFrom([ev('f000', 0, 0)], FORM_COUNTS);
    expect(standings).toHaveLength(1);
    expect(standings[0]).toMatchObject({ factId: 'f000', proven: 0, needed: 3, misses: 1 });
  });

  it('clears only after three DIFFERENT phrasings are answered correctly', () => {
    const base = [ev('f000', 0, 0)];
    // Three correct answers, but all on the same phrasing: three correct answers to one
    // memorised sentence must not clear a fact. This is the whole deck design in one test.
    const sameForm = [...base, ev('f000', 1, 4, 1), ev('f000', 1, 4, 2), ev('f000', 1, 4, 3)];
    expect(mistakesFrom(sameForm, FORM_COUNTS)).toHaveLength(1);
    expect(mistakesFrom(sameForm, FORM_COUNTS)[0].proven).toBe(1);

    const threeForms = [...base, ev('f000', 0, 4, 1), ev('f000', 1, 4, 2), ev('f000', 2, 4, 3)];
    expect(mistakesFrom(threeForms, FORM_COUNTS)).toEqual([]);
  });

  it('resets the count to zero on a fresh miss', () => {
    const events = [
      ev('f000', 0, 0),
      ev('f000', 0, 4, 1),
      ev('f000', 1, 4, 2), // two of three proven
      ev('f000', 2, 0, 3), // missed again — back to nothing
    ];
    const standings = mistakesFrom(events, FORM_COUNTS);
    expect(standings[0].proven).toBe(0);
    expect(standings[0].misses).toBe(2);
  });

  it('counts progress only since the most recent miss', () => {
    const events = [
      ev('f000', 0, 0),
      ev('f000', 0, 4, 1),
      ev('f000', 1, 0, 2), // reset
      ev('f000', 1, 4, 3),
      ev('f000', 2, 4, 4),
    ];
    expect(mistakesFrom(events, FORM_COUNTS)[0].proven).toBe(2);
  });

  it('treats a Hard grade as correct and Again as a miss', () => {
    const hard = [ev('f000', 0, 0), ev('f000', 0, 3, 1), ev('f000', 1, 3, 2), ev('f000', 2, 3, 3)];
    expect(mistakesFrom(hard, FORM_COUNTS)).toEqual([]);
  });

  it('needs only as many phrasings as a fact actually has', () => {
    // Two facts in the deck carry two phrasings. A flat three would strand them for ever.
    const twoFormFact = DECK.find((f) => f.forms.length === 2)!;
    const events = [
      ev(twoFormFact.id, 0, 0),
      ev(twoFormFact.id, 0, 4, 1),
      ev(twoFormFact.id, 1, 4, 2),
    ];
    expect(mistakesFrom(events, FORM_COUNTS)[0]?.needed ?? 2).toBe(2);
    expect(mistakesFrom(events, FORM_COUNTS)).toEqual([]);
  });

  it('counts practice and mock failures too', () => {
    // A miss is real evidence of not knowing, wherever it happened (D-003).
    expect(mistakesFrom([ev('f000', 0, 0, 0, 'practice')], FORM_COUNTS)).toHaveLength(1);
    expect(mistakesFrom([ev('f000', 0, 0, 0, 'mock')], FORM_COUNTS)).toHaveLength(1);
  });

  it('orders the list worst first', () => {
    const events = [
      ev('f000', 0, 0), ev('f000', 1, 0, 1), ev('f000', 2, 0, 2), // 3 misses
      ev('f001', 0, 0, 3),                                          // 1 miss
      ev('f002', 0, 0, 4), ev('f002', 1, 0, 5),                     // 2 misses
    ];
    expect(mistakesFrom(events, FORM_COUNTS).map((s) => s.factId)).toEqual(['f000', 'f002', 'f001']);
  });

  it('serves a phrasing that has not yet been proven since the miss', () => {
    const events = [ev('f000', 0, 0), ev('f000', 1, 4, 1)];
    const standing = mistakesFrom(events, FORM_COUNTS)[0];
    expect(standing.provenForms).toEqual([1]);
    for (let s = 0; s < 20; s++) {
      expect(nextFormForMistake(standing, 3, mulberry32(s))).not.toBe(1);
    }
  });

  it('exposes the clear threshold rather than hiding it in a literal', () => {
    expect(CLEAR_STREAK).toBe(3);
  });
});

describe('not tried yet — counts phrasings, not facts', () => {
  it('starts at the full form count', () => {
    const total = DECK.reduce((n, f) => n + f.forms.length, 0);
    expect(unseenForms(DECK, []).length).toBe(total);
  });

  it('removes only the phrasing actually served', () => {
    // The owner's choice: meeting a fact once leaves its other ways of being asked unseen,
    // which is exactly what the breadth gate cares about.
    const unseen = unseenForms(DECK, [ev('f000', 1, 4)]);
    expect(unseen.filter((i) => i.factId === 'f000')).toEqual([
      { factId: 'f000', formIndex: 0 },
      { factId: 'f000', formIndex: 2 },
    ]);
  });

  it('puts unseen phrasings of started facts before untouched facts', () => {
    const events = [ev('f000', 0, 4)];
    const queue = newQueue(context(events), 10);
    expect(queue[0].factId).toBe('f000');
  });

  it('serves only one phrasing per untouched fact in a pass', () => {
    // Meeting a fact three ways in ninety seconds teaches the wording, not the fact.
    const queue = newQueue(context([]), 40);
    const perFact = new Map<string, number>();
    for (const item of queue) perFact.set(item.factId, (perFact.get(item.factId) ?? 0) + 1);
    expect([...perFact.values()].every((n) => n === 1)).toBe(true);
  });

  it('never serves a phrasing already in the log', () => {
    const events = DECK.slice(0, 5).flatMap((f) => f.forms.map((_, j) => ev(f.id, j, 4)));
    const queue = newQueue(context(events), 100);
    const served = new Set(events.map((e) => `${e.factId}:${e.formIndex}`));
    expect(queue.every((i) => !served.has(`${i.factId}:${i.formIndex}`))).toBe(true);
  });
});

describe('by chapter', () => {
  it('serves only facts from the chapter asked for', () => {
    for (const chapter of [1, 2, 3, 4, 5]) {
      const queue = chapterQueue(context([]), chapter, 25);
      const ids = new Set(queue.map((i) => i.factId));
      expect([...ids].every((id) => DECK.find((f) => f.id === id)!.chapter === chapter)).toBe(true);
      expect(queue.length).toBeGreaterThan(0);
    }
  });

  it('puts the most-missed facts first', () => {
    const chapter3 = DECK.filter((f) => f.chapter === 3);
    const target = chapter3[40];
    const events = [ev(target.id, 0, 0), ev(target.id, 1, 0, 1)];
    expect(chapterQueue(context(events), 3, 5)[0].factId).toBe(target.id);
  });

  it('prefers a recall-usable phrasing', () => {
    const queue = chapterQueue(context([]), 5, 40);
    for (const item of queue) {
      const fact = DECK.find((f) => f.id === item.factId)!;
      const hasRecall = fact.forms.some((f) => !f.mcqOnly);
      if (hasRecall) expect(fact.forms[item.formIndex].mcqOnly).toBe(false);
    }
  });
});

describe('section counts', () => {
  it('reports an empty log honestly', () => {
    const counts = sectionCounts(context([]));
    expect(counts.due).toBe(0);
    expect(counts.mistakes).toBe(0);
    expect(counts.newForms).toBe(DECK.reduce((n, f) => n + f.forms.length, 0));
    expect([...counts.byChapter.values()].reduce((n, c) => n + c.total, 0)).toBe(DECK.length);
  });

  it('counts a missed fact into the mistakes badge', () => {
    expect(sectionCounts(context([ev('f000', 0, 0)])).mistakes).toBe(1);
  });
});

describe('progress', () => {
  it('counts phrasings proven, not just facts started', () => {
    const events = [ev('f000', 0, 4), ev('f000', 1, 4, 1)];
    const ctx = context(events);
    const progress = deckProgress(DECK, ctx.states, events, 0);

    expect(progress.started).toBe(1);
    expect(progress.provenForms).toBe(2);
    expect(progress.provenAllForms).toBe(0); // f000 has three phrasings
    expect(progress.facts).toBe(DECK.length);
  });

  it('counts a fact proven on every phrasing', () => {
    const events = [ev('f000', 0, 4), ev('f000', 1, 4, 1), ev('f000', 2, 4, 2)];
    const ctx = context(events);
    expect(deckProgress(DECK, ctx.states, events, 0).provenAllForms).toBe(1);
  });

  it('counts a streak only while today has a review', () => {
    const events = [ev('f000', 0, 4, 0), ev('f000', 1, 4, 1), ev('f000', 2, 4, 2)];
    const today = Math.floor(DAY0 / MS_PER_DAY);
    expect(streak(events, today + 2)).toBe(3);
    expect(streak(events, today + 3)).toBe(0); // nothing today — a stored streak would lie here
  });

  it('reports upcoming load per day', () => {
    const events = [ev('f000', 0, 4)];
    const ctx = context(events);
    const load = upcomingLoad(DECK, ctx.states, ctx.today, 7);
    expect(load).toHaveLength(7);
    expect(load.reduce((a, b) => a + b, 0)).toBeGreaterThan(0);
  });

  it('reports recent activity ending today', () => {
    const today = Math.floor(DAY0 / MS_PER_DAY);
    const events = [ev('f000', 0, 4, 0), ev('f001', 0, 4, 1), ev('f002', 0, 4, 1)];
    const activity = recentActivity(events, today + 1, 3);
    expect(activity[activity.length - 1]).toBe(2); // two reviews "today"
  });

  it('lists problem facts worst first', () => {
    const events = [
      ev('f000', 0, 0), ev('f000', 1, 0, 1),
      ev('f001', 0, 0, 2),
    ];
    const ctx = context(events);
    const problems = problemFacts(DECK, ctx.states, 5);
    expect(problems[0].factId).toBe('f000');
    expect(problems[0].lapses).toBe(2);
    expect(problems.every((p) => p.lapses > 0)).toBe(true);
  });
});

describe('everything is derived — no stored section state', () => {
  it('gives identical sections for the same event set in any order', () => {
    const events = [
      ev('f000', 0, 0), ev('f001', 1, 4, 1), ev('f000', 1, 4, 2),
      ev('f002', 0, 0, 3), ev('f000', 2, 4, 4),
    ];
    const forward = mistakesFrom(events, FORM_COUNTS);
    const reversed = mistakesFrom([...events].reverse(), FORM_COUNTS);
    expect(reversed).toEqual(forward);

    expect(unseenForms(DECK, [...events].reverse())).toEqual(unseenForms(DECK, events));
  });

  it('recomputes correctly when history is added retrospectively', () => {
    // A late-arriving event from another device must change the sections, not be ignored.
    const base = [ev('f000', 0, 0), ev('f000', 1, 4, 5), ev('f000', 2, 4, 6)];
    expect(mistakesFrom(base, FORM_COUNTS)[0].proven).toBe(2);

    const late = [...base, ev('f000', 0, 4, 4)];
    expect(mistakesFrom(late, FORM_COUNTS)).toEqual([]); // three phrasings now proven
  });
});
