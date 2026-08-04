'use client';

/**
 * The app shell.
 *
 * One client component holding view state, rather than routes. For an offline-first PWA
 * launched from the Home Screen, a single view is simpler and more robust: no route
 * transitions to lose state across, nothing to re-hydrate mid-session, and the back
 * affordance is an explicit button rather than browser history the user cannot see.
 *
 * All state above this lives in `useDrill`, which is a projection of one array of review
 * events. Grading appends one event and everything on screen recomputes.
 */

import { useCallback, useMemo, useState } from 'react';

import { useDrill, type SectionKey } from './_lib/use-drill';
import { Home } from '@/components/Home';
import { Drill, type DrillMode } from '@/components/Drill';
import { Progress } from '@/components/Progress';
import { Timeline } from '@/components/Timeline';
import { CHAPTER_NAMES, type Chapter } from '@/domain/deck/types';
import type { Grade } from '@/domain/scheduler/types';
import type { DrillItem } from '@/domain/drill/sections';

type View =
  | { kind: 'home' }
  | { kind: 'drill'; section: SectionKey; chapter?: Chapter }
  | { kind: 'progress' }
  | { kind: 'timeline' };

const EMPTY_MESSAGE: Record<SectionKey, string> = {
  due: 'Nothing is due. That is the schedule working, not a gap — come back tomorrow, or meet some new material.',
  new: 'You have now seen every phrasing in the deck at least once. Which is the whole 1,327 of them.',
  mistakes: 'Nothing outstanding. Every fact you have missed has since been answered correctly on three different phrasings.',
  chapter: 'Nothing left to drill in this chapter right now.',
};

export default function App() {
  const drill = useDrill();
  const [view, setView] = useState<View>({ kind: 'home' });
  const [mode, setMode] = useState<DrillMode>('quiz');

  /**
   * The card currently on screen, held deliberately.
   *
   * It used to be derived straight from the event log, which meant grading swapped the card
   * instantly — you never saw whether you were right, and the explanation flashed past
   * unread. The card now stays put until you ask for the next one. Feedback you cannot read
   * is not feedback.
   */
  const [current, setCurrent] = useState<DrillItem | null>(null);

  /**
   * Changes once per card, and only when a new card is dealt.
   *
   * This is what seeds the option shuffle. It exists because the seed used to include a
   * live count taken from the event log: answering appended an event, the count moved, and
   * the four options re-shuffled under your finger — so the index you clicked pointed into
   * one arrangement while the correct index came from another, and the verdict was reported
   * against a layout that had already gone.
   *
   * Nothing derived from the review log may ever seed presentation. A counter that advances
   * with the card is the whole fix.
   */
  const [cardNonce, setCardNonce] = useState(0);

  const advance = useCallback(
    (v: View = view) => {
      if (v.kind !== 'drill') return;
      setCurrent(drill.nextItem(v.section, v.chapter));
      setCardNonce((n) => n + 1);
    },
    [drill, view],
  );

  const openDrill = useCallback(
    (section: SectionKey, chapter?: Chapter) => {
      const next: View = { kind: 'drill', section, chapter };
      setView(next);
      setCurrent(drill.nextItem(section, chapter));
      setCardNonce((n) => n + 1);
    },
    [drill],
  );

  const home = useCallback(() => {
    setView({ kind: 'home' });
    setCurrent(null);
  }, []);

  const item = view.kind === 'drill' ? current : null;

  const remaining = useMemo(() => {
    if (view.kind !== 'drill') return 0;
    if (view.section === 'due') return drill.counts.due;
    if (view.section === 'new') return drill.counts.newForms;
    if (view.section === 'mistakes') return drill.counts.mistakes;
    return drill.counts.byChapter.get(view.chapter ?? 1)?.total ?? 0;
  }, [view, drill.counts]);

  const onGrade = useCallback(
    (factId: string, formIndex: number, grade: Grade) => {
      if (view.kind !== 'drill') return;
      drill.grade(factId, formIndex, grade, view.section);
    },
    [drill, view],
  );

  // Hold the first paint until the log has loaded, so the counts never flash zero and then
  // jump — which on a phone reads as "it lost my progress".
  if (!drill.loaded) {
    return (
      <div className="wrap">
        <p style={{ color: 'var(--c-text-muted)' }}>Loading…</p>
      </div>
    );
  }

  return (
    <div className="wrap">
      {view.kind === 'home' && (
        <Home
          counts={drill.counts}
          progress={drill.progress}
          streak={drill.streak()}
          persistent={drill.persistent}
          onOpen={(section) => openDrill(section)}
          onChapter={(chapter) => openDrill('chapter', chapter)}
          onProgress={() => setView({ kind: 'progress' })}
          onTimeline={() => setView({ kind: 'timeline' })}
        />
      )}

      {view.kind === 'drill' && (
        <Drill
          // Identity of the card, not of the screen. A new card remounts, which discards
          // the revealed/chosen state — so an answer can never be on screen before its
          // question has been read. The nonce is in here as well as in the seed, so that
          // holds even when the same fact is dealt twice running.
          key={`${item?.factId ?? 'none'}:${item?.formIndex ?? -1}:${mode}:${cardNonce}`}
          title={titleFor(view)}
          item={item}
          mode={mode}
          onModeChange={setMode}
          onGrade={onGrade}
          onNext={() => advance()}
          onExit={home}
          stateFor={(factId) => drill.states.get(factId)}
          remaining={remaining}
          nonce={cardNonce}
          emptyMessage={EMPTY_MESSAGE[view.section]}
        />
      )}

      {view.kind === 'progress' && (
        <Progress
          progress={drill.progress}
          upcoming={drill.upcoming()}
          activity={drill.activity()}
          problems={drill.problems()}
          settings={drill.settings}
          onSettings={drill.updateSettings}
          onErase={() => {
            drill.eraseEverything();
            home();
          }}
          onExit={home}
        />
      )}

      {view.kind === 'timeline' && <Timeline onExit={home} />}
    </div>
  );
}

function titleFor(view: Extract<View, { kind: 'drill' }>): string {
  if (view.section === 'due') return 'Due today';
  if (view.section === 'new') return 'Not tried yet';
  if (view.section === 'mistakes') return 'Your mistakes';
  return CHAPTER_NAMES[view.chapter ?? 1];
}
