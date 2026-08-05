/**
 * The five drill sections.
 *
 * The mistakes rule gets the most attention because it is the one the owner specified
 * precisely — wrong once, and out again when three attempts have passed with no miss among
 * them — and because it is entirely derived from the event log, which means the tests here are
 * also the proof that no separate counter is needed. That the rule is the exact complement of
 * Mastered is asserted in `counts.test.ts`, over the partition.
 */

import { describe, expect, it } from 'vitest';

import { DECK } from '@/domain/deck';
import { mistakesFrom, nextFormForMistake, CLEAR_STREAK } from '@/domain/drill/mistakes';
import {
  chapterQueue,
  newFacts,
  newQueue,
  sectionCounts,
  type SectionContext,
} from '@/domain/drill/sections';
import { factStandings } from '@/domain/drill/standing';
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

describe('mistakes — a wrong answer inside the last three attempts', () => {
  it('does not list a fact that has never been missed', () => {
    const events = [ev('f000', 0, 4), ev('f000', 1, 5), ev('f000', 2, 4)];
    expect(mistakesFrom(events, FORM_COUNTS)).toEqual([]);
  });

  it('lists a fact as soon as it is missed', () => {
    const standings = mistakesFrom([ev('f000', 0, 0)], FORM_COUNTS);
    expect(standings).toHaveLength(1);
    expect(standings[0]).toMatchObject({ factId: 'f000', sinceMiss: 0, needed: 3, misses: 1 });
  });

  it('clears once three attempts have passed with no miss among them', () => {
    const base = [ev('f000', 0, 0)];

    // Two correct answers still leave the miss inside the window of three.
    const two = [...base, ev('f000', 0, 4, 1), ev('f000', 1, 4, 2)];
    expect(mistakesFrom(two, FORM_COUNTS)).toHaveLength(1);
    expect(mistakesFrom(two, FORM_COUNTS)[0].sinceMiss).toBe(2);

    const three = [...two, ev('f000', 2, 4, 3)];
    expect(mistakesFrom(three, FORM_COUNTS)).toEqual([]);
  });

  it('clears on three correct answers even if they repeat one phrasing', () => {
    // This is the cost of the rule, asserted rather than left implicit. The old rule needed
    // three DIFFERENT phrasings and could not be the complement of Mastered, which uses the
    // last three attempts (D-032). Rotation still serves the least-seen phrasing, and the
    // mistakes drill still skips one already answered since the miss — so this is what the
    // rule permits, not what the app does.
    const sameForm = [
      ev('f000', 0, 0),
      ev('f000', 1, 4, 1),
      ev('f000', 1, 4, 2),
      ev('f000', 1, 4, 3),
    ];
    expect(mistakesFrom(sameForm, FORM_COUNTS)).toEqual([]);
  });

  it('resets to zero on a fresh miss', () => {
    const events = [
      ev('f000', 0, 0),
      ev('f000', 0, 4, 1),
      ev('f000', 1, 4, 2), // two of three
      ev('f000', 2, 0, 3), // missed again — back to nothing
    ];
    const standings = mistakesFrom(events, FORM_COUNTS);
    expect(standings[0].sinceMiss).toBe(0);
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
    expect(mistakesFrom(events, FORM_COUNTS)[0].sinceMiss).toBe(2);
  });

  it('treats a Hard grade as correct and Again as a miss', () => {
    const hard = [ev('f000', 0, 0), ev('f000', 0, 3, 1), ev('f000', 1, 3, 2), ev('f000', 2, 3, 3)];
    expect(mistakesFrom(hard, FORM_COUNTS)).toEqual([]);
  });

  it('needs three attempts whatever the phrasing count', () => {
    // Two facts in the deck carry two phrasings. Under the old rule they needed only two
    // correct answers, capped by what they had; counting attempts retires the special case
    // without stranding them, because attempts are always available.
    const twoFormFact = DECK.find((f) => f.forms.length === 2)!;
    const twoCorrect = [
      ev(twoFormFact.id, 0, 0),
      ev(twoFormFact.id, 0, 4, 1),
      ev(twoFormFact.id, 1, 4, 2),
    ];
    expect(mistakesFrom(twoCorrect, FORM_COUNTS)[0].needed).toBe(3);
    expect(mistakesFrom(twoCorrect, FORM_COUNTS)).toHaveLength(1);

    expect(mistakesFrom([...twoCorrect, ev(twoFormFact.id, 0, 4, 3)], FORM_COUNTS)).toEqual([]);
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

  it('keeps a fact whose miss is four attempts back out of the list', () => {
    // The window rolls: a fact missed long ago and answered since is not a mistake, however
    // many times it was missed before that.
    const events = [
      ev('f000', 0, 0), ev('f000', 1, 0, 1),
      ev('f000', 0, 4, 2), ev('f000', 1, 4, 3), ev('f000', 2, 4, 4), ev('f000', 0, 4, 5),
    ];
    expect(mistakesFrom(events, FORM_COUNTS)).toEqual([]);
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

describe('new — facts never answered, not phrasings never served', () => {
  it('starts at the full fact count, which is not the form count', () => {
    // The bug this replaces: New reported unseen PHRASINGS, so it read 1,575 on a deck of 537
    // facts. The second assertion is what gives the first one teeth.
    expect(newFacts(context([])).length).toBe(DECK.length);
    expect(DECK.reduce((n, f) => n + f.forms.length, 0)).toBeGreaterThan(DECK.length);
  });

  it('drops a fact from New the moment it is answered once', () => {
    // Even though two of its three phrasings have never been served. Those come back through
    // the other sections, where rotation serves the one seen least.
    const fresh = newFacts(context([ev('f000', 1, 4)]));
    expect(fresh).not.toContain('f000');
    expect(fresh).toHaveLength(DECK.length - 1);
  });

  it('drops a fact answered WRONGLY too — it is answered either way', () => {
    expect(newFacts(context([ev('f000', 0, 0)]))).not.toContain('f000');
  });

  it('never serves a fact that has been answered', () => {
    const events = DECK.slice(0, 5).map((f) => ev(f.id, 0, 4));
    const queue = newQueue(context(events), 100);
    const answered = new Set(events.map((e) => e.factId));
    expect(queue.every((i) => !answered.has(i.factId))).toBe(true);
  });

  it('serves one card per fact in a pass', () => {
    // Meeting a fact three ways in ninety seconds teaches the wording, not the fact.
    const queue = newQueue(context([]), 40);
    const perFact = new Map<string, number>();
    for (const item of queue) perFact.set(item.factId, (perFact.get(item.factId) ?? 0) + 1);
    expect([...perFact.values()].every((n) => n === 1)).toBe(true);
  });

  it('offers a valid phrasing for every fact it serves', () => {
    for (const item of newQueue(context([]), 40)) {
      const fact = DECK.find((f) => f.id === item.factId)!;
      expect(item.formIndex).toBeGreaterThanOrEqual(0);
      expect(item.formIndex).toBeLessThan(fact.forms.length);
    }
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

  it('puts the least-drilled facts first, not the most-missed', () => {
    // Chapter drills now rotate: a fact you have already met sits behind every fact you
    // have not. Ordering by lapses would have kept handing back the same few facts.
    const chapter3 = DECK.filter((f) => f.chapter === 3);
    const drilled = chapter3.slice(0, 3).map((f) => ev(f.id, 0, 0));
    const queue = chapterQueue(context(drilled), 3, 10);
    expect(queue.map((i) => i.factId)).not.toContain(chapter3[0].id);
  });

  it('offers a valid phrasing for every fact it serves', () => {
    // Form choice is no longer recall-biased here: the drill screen re-resolves it when in
    // recall mode, because whether an mcqOnly form is usable depends on the mode, which the
    // queue does not know.
    const queue = chapterQueue(context([]), 5, 40);
    for (const item of queue) {
      const fact = DECK.find((f) => f.id === item.factId)!;
      expect(item.formIndex).toBeGreaterThanOrEqual(0);
      expect(item.formIndex).toBeLessThan(fact.forms.length);
    }
  });
});

describe('section counts', () => {
  it('reports an empty log honestly', () => {
    const counts = sectionCounts(context([]));
    // Due today is a daily budget of 30, not "what SM-2 says is overdue" — on a fresh
    // install the whole day is still ahead of you.
    expect(counts.due).toBe(30);
    expect(counts.mistakes).toBe(0);
    expect(counts.mastered).toBe(0);
    expect(counts.newFacts).toBe(DECK.length);
    expect(counts.totalFacts).toBe(DECK.length);
    expect([...counts.byChapter.values()].reduce((n, c) => n + c.total, 0)).toBe(DECK.length);
    expect([...counts.byChapter.values()].reduce((n, c) => n + c.mastered, 0)).toBe(0);
  });

  it('counts a missed fact into the mistakes badge', () => {
    expect(sectionCounts(context([ev('f000', 0, 0)])).mistakes).toBe(1);
  });
});

describe('progress', () => {
  it('counts facts, and its three standings add up to the deck', () => {
    const events = [ev('f000', 0, 4), ev('f000', 1, 4, 1), ev('f001', 0, 0, 2)];
    const ctx = context(events);
    const progress = deckProgress(DECK, ctx.states, events);

    expect(progress.facts).toBe(DECK.length);
    expect(progress.started).toBe(2);
    expect(progress.mastered).toBe(1); // f000, answered twice, no miss
    expect(progress.inMistakes).toBe(1); // f001
    expect(progress.notTried).toBe(DECK.length - 2);
    expect(progress.mastered + progress.inMistakes + progress.notTried).toBe(progress.facts);
  });

  it('masters a fact on one correct answer, without needing its other phrasings', () => {
    const events = [ev('f000', 0, 4)];
    const ctx = context(events);
    expect(deckProgress(DECK, ctx.states, events).mastered).toBe(1);
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

  it('lists problem facts worst first, and says where each one stands now', () => {
    const events = [
      ev('f000', 0, 0), ev('f000', 1, 0, 1),
      ev('f001', 0, 0, 2),
      // f002 was missed once and has since been answered three times: still a problem fact by
      // history, but not in the mistakes list any more.
      ev('f002', 0, 0, 3), ev('f002', 1, 4, 4), ev('f002', 2, 4, 5), ev('f002', 0, 4, 6),
    ];
    const ctx = context(events);
    const standings = factStandings(DECK.map((f) => f.id), events);
    const problems = problemFacts(DECK, ctx.states, standings, 5);

    expect(problems[0].factId).toBe('f000');
    expect(problems[0].lapses).toBe(2);
    expect(problems.every((p) => p.lapses > 0)).toBe(true);
    expect(problems.find((p) => p.factId === 'f002')?.recovered).toBe(true);
    expect(problems.find((p) => p.factId === 'f001')?.recovered).toBe(false);
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

    expect(newFacts(context([...events].reverse()))).toEqual(newFacts(context(events)));
  });

  it('recomputes correctly when history is added retrospectively', () => {
    // A late-arriving event from another device must change the sections, not be ignored.
    const base = [ev('f000', 0, 0), ev('f000', 1, 4, 5), ev('f000', 2, 4, 6)];
    expect(mistakesFrom(base, FORM_COUNTS)[0].sinceMiss).toBe(2);

    const late = [...base, ev('f000', 0, 4, 4)];
    expect(mistakesFrom(late, FORM_COUNTS)).toEqual([]); // three attempts have now passed
  });
});
