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
import { Drill, type CardAnswer, type DrillMode } from '@/components/Drill';
import { Progress } from '@/components/Progress';
import { TabBar, type Tab } from '@/components/TabBar';
import { Timeline } from '@/components/Timeline';
import { CHAPTER_NAMES, type Chapter } from '@/domain/deck/types';
import type { Grade } from '@/domain/scheduler/types';
import type { DrillItem } from '@/domain/drill/sections';

/**
 * Where you are.
 *
 * Three tabs, plus a drill that opens over the top of whichever tab you were on. The drill is
 * not a tab of its own: it is a thing you are doing, it ends, and the tab bar is hidden while
 * it is on screen — a stray tap mid-question costs you your place, and the bottom of that
 * screen belongs to the card's own actions.
 */
type View =
  | { kind: 'tab'; tab: Tab }
  | { kind: 'drill'; section: SectionKey; chapter?: Chapter };

/** A card as it was served: which phrasing, which option order, and what was done with it. */
interface Served {
  readonly item: DrillItem;
  readonly nonce: number;
  readonly answer: CardAnswer | null;
}

const EMPTY_MESSAGE: Record<SectionKey, string> = {
  due: 'That is your thirty for today.',
  new: 'Every phrasing in the deck has been served at least once.',
  mistakes: 'Nothing outstanding.',
  chapter: 'Nothing left in this chapter right now.',
  random: 'Nothing to draw from, which should be impossible.',
  mastered: 'Nothing here yet. A fact arrives once you have answered it, and stays until you miss it.',
};

export default function App() {
  const drill = useDrill();
  const [view, setView] = useState<View>({ kind: 'tab', tab: 'drill' });
  const [mode, setMode] = useState<DrillMode>('quiz');

  /**
   * The card currently being answered, held deliberately.
   *
   * It used to be derived straight from the event log, which meant grading swapped the card
   * instantly — you never saw whether you were right, and the explanation flashed past
   * unread. The card now stays put until you ask for the next one. Feedback you cannot read
   * is not feedback.
   */
  const [current, setCurrent] = useState<DrillItem | null>(null);

  /** How the live card was answered, or null while it is still open. */
  const [answer, setAnswer] = useState<CardAnswer | null>(null);

  /**
   * The cards already left behind in this session, oldest first.
   *
   * Pressing Next used to destroy the card outright: the answer and the explanation were
   * gone, and the only way off the screen was Back, which returns to the home screen. The
   * whole point of the explanation is that it is worth re-reading, so it has to be
   * reachable.
   *
   * Every entry here has been answered — the only route out of a card is the Next button,
   * and that appears only once the card has been answered.
   *
   * `nonce` is stored with each one because it is what seeds the option shuffle. The order
   * the four options were in is therefore reproduced rather than recorded, which is the
   * difference between showing what was on screen and showing a second copy of it that is
   * free to drift (D-021).
   */
  const [past, setPast] = useState<Served[]>([]);

  /**
   * Which card is on screen: `null` for the live one, otherwise an index into `past`.
   *
   * Browsing is pure navigation over state that already exists. **Nothing here consults the
   * review log and nothing here calls `nextItem`**, so stepping back cannot change what the
   * live card is, and cannot change what the next one will be — that is decided when Next
   * is pressed and not before (R-11).
   */
  const [cursor, setCursor] = useState<number | null>(null);

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
      // The card being left is only kept once it has been answered — which it always has
      // been, since Next is the only way here and it appears only after an answer.
      if (current && answer) setPast((p) => [...p, { item: current, nonce: cardNonce, answer }]);
      setCurrent(drill.nextItem(v.section, v.chapter));
      setCardNonce((n) => n + 1);
      setAnswer(null);
      setCursor(null);
    },
    [drill, view, current, answer, cardNonce],
  );

  const openDrill = useCallback(
    (section: SectionKey, chapter?: Chapter) => {
      const next: View = { kind: 'drill', section, chapter };
      setView(next);
      setCurrent(drill.nextItem(section, chapter));
      setCardNonce((n) => n + 1);
      setAnswer(null);
      setPast([]);
      setCursor(null);
    },
    [drill],
  );

  /** Leave the drill and go back to the tab it was opened from. */
  const home = useCallback(() => {
    setView({ kind: 'tab', tab: 'drill' });
    setCurrent(null);
    setAnswer(null);
    setPast([]);
    setCursor(null);
  }, []);

  /** The live card, plus everything needed to put it back exactly as it was. */
  const live: Served | null = current ? { item: current, nonce: cardNonce, answer } : null;
  const shown = cursor === null ? live : (past[cursor] ?? null);
  const readOnly = cursor !== null;

  const total = past.length + (current ? 1 : 0);
  const index = cursor === null ? total : cursor + 1;

  const canPrevious = cursor === null ? past.length > 0 : cursor > 0;
  const canForward = cursor !== null;

  /**
   * A card being re-read is shown in the mode it was answered in, not the mode the toggle
   * happens to be in now. Switching mode re-resolves which phrasing is served and re-seeds
   * the option order, so honouring the toggle here would show a card that was never on
   * screen and label it as what happened.
   */
  const shownMode: DrillMode = readOnly ? (shown?.answer?.mode ?? mode) : mode;

  const goPrevious = useCallback(() => {
    setCursor((c) => (c === null ? past.length - 1 : Math.max(0, c - 1)));
  }, [past.length]);

  /** Forward off the last past card returns to the live one, which is still sitting there. */
  const goForward = useCallback(() => {
    setCursor((c) => (c === null || c >= past.length - 1 ? null : c + 1));
  }, [past.length]);

  const item = view.kind === 'drill' ? (shown?.item ?? null) : null;

  const remaining = useMemo(() => {
    if (view.kind !== 'drill') return 0;
    if (view.section === 'due') return drill.counts.due;
    if (view.section === 'new') return drill.counts.newForms;
    if (view.section === 'mistakes') return drill.counts.mistakes;
    if (view.section === 'random') return drill.counts.totalForms;
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
      <div className="tabBody">
      {view.kind === 'tab' && view.tab === 'drill' && (
        <Home
          counts={drill.counts}
          progress={drill.progress}
          streak={drill.streak()}
          persistent={drill.persistent}
          syncPhase={drill.syncPhase}
          syncedAt={drill.syncedAt}
          onSync={() => void drill.syncNow()}
          onOpen={(section) => openDrill(section)}
          onChapter={(chapter) => openDrill('chapter', chapter)}
        />
      )}

      {view.kind === 'drill' && (
        <Drill
          // Identity of the card, not of the screen. A different card remounts, which
          // discards the revealed/chosen state — so an answer can never be on screen before
          // its question has been read. The nonce is in here as well as in the seed, so
          // that holds even when the same fact is dealt twice running, and it is what makes
          // stepping between cards restore each one's own answer rather than inherit the
          // last one's.
          key={`${item?.factId ?? 'none'}:${item?.formIndex ?? -1}:${shownMode}:${shown?.nonce ?? cardNonce}`}
          title={titleFor(view)}
          item={item}
          mode={shownMode}
          onModeChange={setMode}
          onGrade={onGrade}
          onAnswer={setAnswer}
          onNext={() => advance()}
          onExit={home}
          stateFor={(factId) => drill.states.get(factId)}
          remaining={remaining}
          nonce={shown?.nonce ?? cardNonce}
          emptyMessage={EMPTY_MESSAGE[view.section]}
          restore={shown?.answer ?? null}
          readOnly={readOnly}
          onPrevious={goPrevious}
          onForward={goForward}
          canPrevious={canPrevious}
          canForward={canForward}
          position={total > 1 ? { index, total } : null}
        />
      )}

      {view.kind === 'tab' && view.tab === 'progress' && (
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

      {view.kind === 'tab' && view.tab === 'timeline' && <Timeline />}
      </div>

      {/* Hidden during a drill: the bottom of that screen is the card's action bar, and a
          stray tap here would cost you your place mid-question. */}
      {view.kind === 'tab' && (
        <TabBar current={view.tab} onChange={(tab) => setView({ kind: 'tab', tab })} />
      )}
    </div>
  );
}

function titleFor(view: Extract<View, { kind: 'drill' }>): string {
  if (view.section === 'due') return 'Due today';
  if (view.section === 'new') return 'Not tried yet';
  if (view.section === 'mistakes') return 'Your mistakes';
  if (view.section === 'random') return 'Random';
  return CHAPTER_NAMES[view.chapter ?? 1];
}
