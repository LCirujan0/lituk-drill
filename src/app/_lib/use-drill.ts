'use client';

/**
 * The seam between the pure domain and React.
 *
 * The whole app is a projection of one array of review events. Grading appends one event;
 * everything else — the schedule, the mistakes list, the unseen-phrasing count, every
 * progress number — is recomputed from it. One thing to persist, one thing to sync, and no
 * derived state that can fall out of step.
 *
 * The event log is read through `useSyncExternalStore` (see `adapters/store.ts`), not copied
 * into component state, so a future sync push updates every screen without this file
 * changing. Replay is memoised on the event array, so it runs once per grade rather than
 * once per render.
 */

import { useCallback, useMemo, useSyncExternalStore } from 'react';

// ACTIVE, never DECK. `DECK` is the id space and still holds the retired facts, which exist
// only so that historical review events keep pointing at the question they were actually
// answering (R-4). Anything deciding what to serve, or counting what is left to learn, reads
// ACTIVE. A retired fact's past events simply fall out of the replay, which is correct — its
// schedule is no longer anybody's business.
import { ACTIVE, TOTAL_FACTS } from '@/domain/deck';
import { replay, type ReviewEvent } from '@/domain/scheduler/events';
import { mulberry32 } from '@/domain/scheduler/rng';
import { DEFAULT_CONFIG, type Grade, type ReviewMode } from '@/domain/scheduler/types';
import { type BandId } from '@/domain/deck/bands';
import { FIXED_TESTS } from '@/data/mock-tests';
import { historyByTest } from '@/domain/mock/attempts';
import {
  bandQueue,
  chapterQueue,
  dueQueue,
  mistakeStandings,
  masteredQueue,
  mistakesQueue,
  newQueue,
  randomQueue,
  sectionCounts,
  standingsFor,
  type DrillItem,
  type SectionContext,
} from '@/domain/drill/sections';
import { deckProgress, problemFacts, recentActivity, streak, upcomingLoad } from '@/domain/drill/stats';
import { newEventId, type Settings } from '@/adapters/local-store';
import {
  appendEvent,
  eraseAll,
  getServerSnapshot,
  getSnapshot,
  saveSettings,
  subscribe,
  sync,
} from '@/adapters/store';

export type SectionKey = 'due' | 'new' | 'mistakes' | 'chapter' | 'band' | 'random' | 'mastered' | 'mock';

/**
 * What a drill was opened on, where the section needs one.
 *
 * A chapter drill carries a chapter and a band drill carries a band; the other five carry
 * nothing. One optional parameter rather than two, so a caller cannot pass both and leave the
 * queue to decide which it meant.
 */
export type DrillScope =
  | { kind: 'chapter'; chapter: number }
  | { kind: 'band'; band: BandId }
  | { kind: 'mock'; testId: number };

const FORM_COUNTS = new Map(ACTIVE.map((f) => [f.id, f.forms.length]));

/**
 * Whether a review counts toward the spaced-repetition schedule.
 *
 * First contact with a phrasing is always `scheduled`, whichever section it happened in.
 * D-003 discounts self-directed successes because the card was chosen and had just been
 * seen — neither is true the first time a phrasing appears, and treating first contact as
 * practice would leave newly-met facts with no schedule at all.
 *
 * After that, the section decides: the due queue and new material are scheduled; mistakes
 * and chapter drills are practice, so their successes inform those sections without
 * advancing an interval.
 */
export function modeFor(section: SectionKey, seenBefore: boolean): ReviewMode {
  // A mock is a mock whatever else is true of the form, and this branch must come FIRST.
  //
  // Not a tidiness point — falling through to the first-contact rule below would break two
  // things at once, silently. R-5 says a mock can never push a fact further out, and it is
  // enforced on the event's MODE: an answer recorded as `scheduled` advances the schedule, so
  // a mock question the reader had never met would quietly graduate the fact on a test. And
  // the score would be wrong too, because `mockAttempts` reads `mode === 'mock'` — a
  // mislabelled answer drops out of its own attempt, which then scores out of 23.
  //
  // The fixed tests draw from the whole deck (D-036), not from unseen forms, so "first contact
  // during a mock" is an ordinary occurrence rather than an edge case.
  if (section === 'mock') return 'mock';
  if (!seenBefore) return 'scheduled';
  return section === 'due' || section === 'new' ? 'scheduled' : 'practice';
}

export function useDrill() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { events, settings, today, persistent, loaded, sync: syncPhase, syncedAt } = snapshot;

  const states = useMemo(() => replay(events, FORM_COUNTS).states, [events]);

  const seenForms = useMemo(() => {
    const set = new Set<string>();
    for (const e of events) set.add(`${e.factId}:${e.formIndex}`);
    return set;
  }, [events]);

  const ctx: SectionContext = useMemo(
    () => ({ deck: ACTIVE, events, states, today, rng: mulberry32(events.length + 1) }),
    [events, states, today],
  );

  const counts = useMemo(() => sectionCounts(ctx), [ctx]);

  // Not given `counts` to copy from: it derives the same partition from the same log, so the
  // two screens agree because they compute the same thing, not because one was handed the
  // other's answer (D-032).
  const progress = useMemo(() => deckProgress(ACTIVE, states, events), [states, events]);

  /**
   * Facts served in the last few cards, so a self-directed drill does not hand back the
   * same fact twice running. Derived from the tail of the log rather than held in state:
   * one less thing to reset, and it survives a reload mid-session.
   */
  const recent = useMemo(() => events.slice(-3).map((e) => e.factId), [events]);

  const nextItem = useCallback(
    (section: SectionKey, scope?: DrillScope): DrillItem | null => {
      let queue: DrillItem[] = [];

      if (section === 'due') {
        queue = dueQueue(ctx);
      } else if (section === 'random') {
        queue = randomQueue(ctx, 40);
      } else if (section === 'new') {
        queue = newQueue(ctx, 60);
      } else if (section === 'mistakes') {
        queue = mistakesQueue(ctx, 60);
      } else if (section === 'mastered') {
        queue = masteredQueue(ctx, 60);
      } else if (section === 'mock') {
        queue = scope?.kind === 'mock' ? mockRemaining(scope.testId, events) : [];
      } else if (section === 'band') {
        queue = scope?.kind === 'band' ? bandQueue(ctx, scope.band, 60) : [];
      } else {
        queue = chapterQueue(ctx, scope?.kind === 'chapter' ? scope.chapter : 1, 60);
      }

      if (queue.length === 0) return null;
      // A mock is served in the test's own order, always. The recency skip below exists so a
      // self-directed drill does not hand back the same fact twice running; applied here it
      // would reorder a fixed test, which is the one thing these twenty must never do.
      if (section === 'mock') return queue[0];
      return queue.find((i) => !recent.includes(i.factId)) ?? queue[0];
    },
    [ctx, recent, events],
  );

  const grade = useCallback(
    (factId: string, formIndex: number, value: Grade, section: SectionKey) => {
      const event: ReviewEvent = {
        id: newEventId(),
        factId,
        formIndex,
        grade: value,
        mode: modeFor(section, seenForms.has(`${factId}:${formIndex}`)),
        at: Date.now(),
      };
      appendEvent(event);
    },
    [seenForms],
  );

  const updateSettings = useCallback((next: Settings) => saveSettings(next), []);

  return {
    loaded,
    persistent,
    events,
    states,
    today,
    settings,
    counts,
    progress,
    config: DEFAULT_CONFIG,
    totals: { facts: TOTAL_FACTS },
    standings: () => mistakeStandings(ctx),
    upcoming: () => upcomingLoad(ACTIVE, states, today, 7),
    activity: () => recentActivity(events, today, 14),
    streak: () => streak(events, today),
    problems: () => problemFacts(ACTIVE, states, standingsFor(ctx), 8),
    nextItem,
    grade,
    updateSettings,
    eraseEverything: eraseAll,
    // Sync is automatic — on mount, on returning to the tab, and after every grade. This is
    // here so the home screen can say where it got to, and so there is a button for the
    // moment when "did it actually go across?" is the question being asked.
    syncPhase,
    syncedAt,
    syncNow: sync,
  };
}

/**
 * What is left of a sitting of fixed test `testId`, in the test's own order.
 *
 * Derived from the log rather than held in state, like everything else here — so a sitting
 * survives a reload, resumes on the other device after a sync, and cannot fall out of step
 * with the score that is computed from the same events.
 *
 * **An incomplete attempt resumes; a complete one starts again.** Re-sitting is deliberate
 * (D-036: their value is comparability, the same 24 questions now and in September), so
 * reopening a finished test offers all 24 rather than nothing.
 */
export function mockRemaining(testId: number, events: readonly ReviewEvent[]): DrillItem[] {
  const test = FIXED_TESTS.find((t) => t.id === testId);
  if (!test) return [];

  const latest = historyByTest(events, FIXED_TESTS).get(testId)?.latest ?? null;
  const answered =
    latest && !latest.complete
      ? new Set(latest.questions.map((q) => `${q.factId}:${q.formIndex}`))
      : new Set<string>();

  return test.questions
    .filter((q) => !answered.has(`${q.factId}:${q.formIndex}`))
    .map((q) => ({ factId: q.factId, formIndex: q.formIndex }));
}
