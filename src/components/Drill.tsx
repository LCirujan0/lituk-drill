'use client';

/**
 * The drill screen. Every section serves cards through this one component, so the grading
 * path is identical wherever a review happens — which is what lets the event log be a
 * single honest history rather than four subtly different ones.
 *
 * Two modes:
 *   · **Quiz** — four options, choose one. The exam's format, and what the owner asked for.
 *     Options are generated fresh for numeric forms and shuffled for the rest (D-014), so
 *     the option set is not something you can learn.
 *   · **Recall** — question, then reveal, then grade yourself. Harder than the exam, and the
 *     only evidence the recall readiness number will accept (D-013). Negatively-framed forms
 *     are excluded here; they are meaningless without options on screen.
 *
 * Grading buttons are ≥44px and reachable one-handed at the bottom of the screen, because
 * the phone is the primary device and this is the screen used most (§F, §G).
 */

import { useCallback, useMemo, useState } from 'react';

import { factById } from '@/domain/deck';
import { presentForm } from '@/domain/deck/presentation';
import { CHAPTER_NAMES } from '@/domain/deck/types';
import { previewInterval } from '@/domain/scheduler/sm2';
import { mulberry32 } from '@/domain/scheduler/rng';
import { DEFAULT_CONFIG as CONFIG, initialState, type FactState, type Grade } from '@/domain/scheduler/types';

import type { DrillItem } from '@/domain/drill/sections';
import styles from './Drill.module.css';

export type DrillMode = 'quiz' | 'recall';

/**
 * What happened on a card, in enough detail to put it back on screen exactly as it was.
 *
 * The option ORDER is not in here and does not need to be: it is a pure function of the
 * card's nonce (see `presented` below), and the nonce is stored alongside this. Recording
 * the order as well would be a second copy of the same thing, free to drift — the mistake
 * D-021 already named once.
 */
export interface CardAnswer {
  readonly mode: DrillMode;
  /** Index into the options as presented. Quiz only; null in recall. */
  readonly chosen: number | null;
  readonly grade: Grade;
  readonly downgraded: boolean;
}

interface Props {

  readonly title: string;
  readonly item: DrillItem | null;
  readonly mode: DrillMode;
  readonly onModeChange: (mode: DrillMode) => void;
  readonly onGrade: (factId: string, formIndex: number, grade: Grade) => void;
  readonly onAnswer: (answer: CardAnswer) => void;
  readonly onNext: () => void;
  readonly onExit: () => void;
  readonly stateFor: (factId: string) => FactState | undefined;
  readonly remaining: number;
  /** Changes only when a new card is dealt. Seeds the shuffle. See page.tsx. */
  readonly nonce: number;
  readonly emptyMessage: string;
  /**
   * How this card was answered, if it was. Read once, on mount — the caller changes the
   * `key` whenever the displayed card changes, so this is an initial value rather than
   * something to keep in step.
   */
  readonly restore: CardAnswer | null;
  /** A card already left behind. Nothing here may record a second review of it. */
  readonly readOnly: boolean;
  readonly onPrevious: () => void;
  readonly onForward: () => void;
  readonly canPrevious: boolean;
  readonly canForward: boolean;
  /** 1-based position in this session's cards, or null when there is only one. */
  readonly position: { readonly index: number; readonly total: number } | null;
}

/** Pick the phrasing to show. `formIndex: -1` means the section left the choice to us. */
function resolveForm(item: DrillItem, mode: DrillMode, seed: number): number {
  const fact = factById(item.factId)!;
  if (item.formIndex >= 0 && item.formIndex < fact.forms.length) {
    // A recall session must never be handed a form that only works with options on screen.
    if (mode === 'recall' && fact.forms[item.formIndex].mcqOnly) {
      const usable = fact.forms.findIndex((f) => !f.mcqOnly);
      return usable >= 0 ? usable : item.formIndex;
    }
    return item.formIndex;
  }
  const candidates = fact.forms
    .map((f, i) => ({ f, i }))
    .filter(({ f }) => mode !== 'recall' || !f.mcqOnly);
  const pool = candidates.length ? candidates : fact.forms.map((f, i) => ({ f, i }));
  return pool[seed % pool.length].i;
}

export function Drill({
  title, item, mode, onModeChange, onGrade, onAnswer, onNext, onExit, stateFor, remaining,
  nonce, emptyMessage, restore, readOnly, onPrevious, onForward, canPrevious, canForward, position,
}: Props) {
  // Reset on a new card is handled by the caller giving this component a `key` tied to the
  // card's identity, so React discards this state rather than an effect clearing it. A new
  // card must never inherit the previous one's revealed state — that would show an answer
  // before the question had been read — and a remount makes that structurally impossible
  // rather than dependent on an effect's dependency list staying correct.
  //
  // A card being stepped back to arrives with its answer instead of a blank slate. Only if
  // the mode still matches: switching between quiz and recall re-mounts this component with
  // a different question shape, and a quiz answer means nothing on a recall card.
  const prior = restore && restore.mode === mode ? restore : null;
  const [revealed, setRevealed] = useState(prior?.mode === 'recall');
  const [chosen, setChosen] = useState<number | null>(prior?.mode === 'quiz' ? prior.chosen : null);
  /** Set once "Got lucky" has been pressed, so it cannot be pressed twice. */
  const [downgraded, setDowngraded] = useState(prior?.downgraded ?? false);
  const [graded, setGraded] = useState<Grade | null>(prior?.mode === 'recall' ? prior.grade : null);

  const fact = item ? factById(item.factId) : undefined;
  const formIndex = useMemo(
    () => (item && fact ? resolveForm(item, mode, item.factId.length + nonce) : 0),
    [item, fact, mode, nonce],
  );

  const presented = useMemo(() => {
    if (!fact) return null;
    // Seeded ONLY from things that change when the card changes. `remaining` used to be in
    // here, and it is derived from the event log — so answering re-shuffled the options
    // mid-click and the verdict was computed against an arrangement that no longer existed.
    // Nothing log-derived may enter this seed.
    return presentForm(fact.forms[formIndex], mulberry32(hash(`${fact.id}:${formIndex}:${nonce}`)));
  }, [fact, formIndex, nonce]);

  /**
   * Record a review, and tell the caller what the card now looks like.
   *
   * Both halves matter and they are different things. `onGrade` appends to the review log
   * and is what the scheduler sees. `onAnswer` is only so this card can be put back on
   * screen unchanged when it is stepped back to — it never reaches the log.
   *
   * The `readOnly` check here is defence in depth, not the mechanism — and that was
   * measured rather than assumed. What actually makes a re-read card inert is that its
   * controls arrive already disabled: `chosen` and `graded` are restored non-null, and the
   * Next and "Got lucky" buttons are not rendered at all. Removing this guard fails no
   * test, which is exactly what a second lock should do. It stays because it states the
   * invariant where someone changing the disabled logic will read it.
   */
  const commit = useCallback(
    (grade: Grade, chosenIndex: number | null, wasDowngrade: boolean) => {
      if (!item || !fact || readOnly) return;
      onGrade(fact.id, formIndex, grade);
      onAnswer({ mode, chosen: chosenIndex, grade, downgraded: wasDowngrade });
    },
    [item, fact, formIndex, mode, readOnly, onGrade, onAnswer],
  );

  if (!item || !fact || !presented) {
    return (
      <div className={styles.done}>
        <div className={styles.doneMark} aria-hidden="true">✓</div>
        <h2 className={styles.doneTitle}>Nothing here right now</h2>
        <p className={styles.doneNote}>{emptyMessage}</p>
        <button type="button" className={styles.exit} onClick={onExit}>Back</button>
        {/* Running a section dry must not lock away what was answered getting there. */}
        {canPrevious && (
          <nav className={styles.pager} aria-label="Cards this session">
            <button type="button" className={styles.page} onClick={onPrevious}>
              ‹ Look back over this session
            </button>
          </nav>
        )}
      </div>
    );
  }

  const state = stateFor(fact.id) ?? initialState(fact.forms.length);
  const proven = state.ok.filter((v) => v > 0).length;
  const answer = fact.forms[formIndex].answers.correct;
  const answered = mode === 'quiz' ? chosen !== null : graded !== null;

  return (
    <div className={styles.wrap}>
      <header className={styles.bar}>
        <button type="button" className={styles.back} onClick={onExit} aria-label="Back">‹</button>
        <div className={styles.barTitle}>
          {title}
          <span className={styles.remaining}>
            {readOnly ? 'Already answered' : `${remaining} to go`}
          </span>
        </div>
        {readOnly ? (
          // Switching mode would re-resolve the phrasing and re-shuffle the options, which
          // for a card being re-read means showing something that was never on screen.
          <span className={styles.modeLocked}>{mode === 'quiz' ? 'Quiz' : 'Recall'}</span>
        ) : (
          <div className={styles.modes} role="group" aria-label="Drill mode">
            <button
              type="button"
              className={mode === 'quiz' ? styles.modeOn : styles.mode}
              onClick={() => onModeChange('quiz')}
              aria-pressed={mode === 'quiz'}
            >
              Quiz
            </button>
            <button
              type="button"
              className={mode === 'recall' ? styles.modeOn : styles.mode}
              onClick={() => onModeChange('recall')}
              aria-pressed={mode === 'recall'}
            >
              Recall
            </button>
          </div>
        )}
      </header>

      <div className={styles.card}>
        <div className={styles.chips}>
          <span className={styles.chip}>{CHAPTER_NAMES[fact.chapter]}</span>
          <span className={styles.chip}>{fact.tag}</span>
          {fact.verify && <span className={styles.chipWarn}>check the book</span>}
          <span className={styles.dots} title={`${proven} of ${fact.forms.length} phrasings proven`}>
            {fact.forms.map((_, i) => (
              <i key={i} className={state.ok[i] > 0 ? styles.dotOn : styles.dot} />
            ))}
          </span>
        </div>

        <h1 className={styles.question}>{fact.forms[formIndex].question}</h1>

        {mode === 'recall' && revealed && <p className={styles.answer}>{answer}</p>}

        {answered && fact.answer.trim().toLowerCase() !== answer.trim().toLowerCase() && (
          <p className={styles.fact}>
            <span>The fact:</span> {fact.question} — <b>{fact.answer}</b>
          </p>
        )}

        {/* Context, shown only after answering. Before, it would give the answer away;
            after, it is the difference between memorising a date and being able to place
            it — which is what makes a fact survive to September.

            Bounded and scrollable rather than shortened. The whole card must fit 393×852
            without the page moving, and a cluster is several lines; the panel takes the
            overflow so the question, the four options and the grading controls keep their
            fixed positions. `overscroll-behavior: contain` stops a scroll that runs out of
            panel from turning into a page bounce. */}
        {answered && fact.explanation && (
          <div className={styles.explanation}>
            <p className={styles.explLead}>{fact.explanation.lead}</p>

            {fact.explanation.versus && (
              <p className={styles.explVersus}>{fact.explanation.versus}</p>
            )}

            {fact.explanation.why && <p className={styles.explWhy}>{fact.explanation.why}</p>}

            {fact.explanation.cluster && fact.explanation.cluster.length > 0 && (
              <ul className={styles.cluster}>
                {fact.explanation.cluster.map((entry) => (
                  <li key={entry.label} className={styles.clusterItem}>
                    <b className={styles.clusterLabel}>{entry.label}</b>
                    {' — '}
                    {entry.detail}
                  </li>
                ))}
              </ul>
            )}

            {/* Always last, always this shape: the handbook is what the exam marks against,
                so a correction must never be mistaken for the answer (D-023). */}
            {fact.explanation.note && <p className={styles.explNote}>{fact.explanation.note}</p>}
          </div>
        )}

        {answered && state.lapses >= 3 && (
          <p className={styles.note}>Missed {state.lapses}× — intervals on this one are permanently cut by 40%.</p>
        )}
      </div>

      {mode === 'quiz' ? (
        <div className={styles.options}>
          {presented.options.map((option, i) => {
            const status =
              chosen === null ? '' : i === presented.correctIndex ? styles.right : i === chosen ? styles.wrong : styles.dim;
            return (
              <button
                key={`${option}-${i}`}
                type="button"
                className={`${styles.option} ${status}`}
                disabled={chosen !== null}
                onClick={() => {
                  setChosen(i);
                  // A quiz answer is binary: right is Good, wrong is Again. There is no
                  // honest way to ask "how hard was that?" of a multiple-choice answer.
                  commit(i === presented.correctIndex ? 4 : 0, i, false);
                }}
              >
                {option}
              </button>
            );
          })}
          {chosen !== null && (
            <>
              <p className={chosen === presented.correctIndex ? styles.verdictRight : styles.verdictWrong}>
                {downgraded
                  ? 'Recorded as a miss.'
                  : chosen === presented.correctIndex
                    ? 'Correct.'
                    : 'Not quite.'}
              </p>

              {/*
                Guessing right is the one thing multiple choice cannot tell from knowing. One
                in four is chance, and a fact you guessed will otherwise be treated as proved
                and pushed out to a long interval — so the schedule quietly fills with things
                you never knew. This is the only way the app can find out, and it has to come
                from the reader.
              */}
              {!readOnly && chosen === presented.correctIndex && !downgraded && (
                <button
                  type="button"
                  className={styles.lucky}
                  onClick={() => {
                    setDowngraded(true);
                    commit(0, chosen, true);
                  }}
                >
                  Got lucky — I guessed
                </button>
              )}

              {!readOnly && (
                <button type="button" className={styles.next} onClick={onNext}>Next</button>
              )}
            </>
          )}
        </div>
      ) : !revealed ? (
        <button type="button" className={styles.reveal} onClick={() => setRevealed(true)}>
          Show answer
        </button>
      ) : (
        <>
          <div className={styles.grades}>
            {([[0, 'Again'], [3, 'Hard'], [4, 'Good'], [5, 'Easy']] as const).map(([g, label]) => (
              <button
                key={g}
                type="button"
                className={`${styles.grade} ${styles[`g${g}`]} ${graded === g ? styles.gradeChosen : ''}`}
                disabled={graded !== null}
                onClick={() => {
                  setGraded(g);
                  commit(g as Grade, null, false);
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {!readOnly && graded !== null && (
            <button type="button" className={styles.next} onClick={onNext}>Next</button>
          )}
          {/* The interval preview is about a decision that has already been taken, and the
              schedule has moved on since — showing it on a card being re-read would be a
              prediction of something that already happened, and a wrong one. */}
          {!readOnly && (
            <>
              <p className={styles.intervals}>
                Again → later this session. Hard → {describe(previewInterval(state, formIndex, 3, CONFIG))}.
                {' '}Good → {describe(previewInterval(state, formIndex, 4, CONFIG))}.
                {' '}Easy → {describe(previewInterval(state, formIndex, 5, CONFIG))}.
              </p>
              <p className={styles.honesty}>
                Good means you knew it. Marking Good when you nearly got there is the one way to break this.
              </p>
            </>
          )}
        </>
      )}

      {/*
        Stepping back through the session. Read-only by construction: `commit` refuses while
        `readOnly` is set, so there is no path from re-reading a card to a second review of
        it. Forward is deliberately absent on the live card — going forward from there is
        dealing a new card, which is what the Next button above already is.
      */}
      {position && (
        <nav className={styles.pager} aria-label="Cards this session">
          <button
            type="button"
            className={styles.page}
            onClick={onPrevious}
            disabled={!canPrevious}
          >
            ‹ Previous
          </button>
          <span className={styles.pagePosition}>
            {position.index} of {position.total}
          </span>
          <button
            type="button"
            className={styles.page}
            onClick={onForward}
            disabled={!canForward}
          >
            Next ›
          </button>
        </nav>
      )}
    </div>
  );
}

function describe(days: number): string {
  if (days <= 1) return 'tomorrow';
  if (days < 60) return `in ${days} days`;
  return `in ${Math.round(days / 30)} months`;
}

function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

