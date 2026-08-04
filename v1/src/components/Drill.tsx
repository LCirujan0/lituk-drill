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

interface Props {

  readonly title: string;
  readonly item: DrillItem | null;
  readonly mode: DrillMode;
  readonly onModeChange: (mode: DrillMode) => void;
  readonly onGrade: (factId: string, formIndex: number, grade: Grade) => void;
  readonly onExit: () => void;
  readonly stateFor: (factId: string) => FactState | undefined;
  readonly remaining: number;
  readonly emptyMessage: string;
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
  title, item, mode, onModeChange, onGrade, onExit, stateFor, remaining, emptyMessage,
}: Props) {
  // Reset on a new card is handled by the caller giving this component a `key` tied to the
  // card's identity, so React discards this state rather than an effect clearing it. A new
  // card must never inherit the previous one's revealed state — that would show an answer
  // before the question had been read — and a remount makes that structurally impossible
  // rather than dependent on an effect's dependency list staying correct.
  const [revealed, setRevealed] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);

  const fact = item ? factById(item.factId) : undefined;
  const formIndex = useMemo(
    () => (item && fact ? resolveForm(item, mode, item.factId.length + remaining) : 0),
    [item, fact, mode, remaining],
  );

  const presented = useMemo(() => {
    if (!fact) return null;
    // Seeded from the card's identity so the same card looks the same if re-rendered,
    // and different the next time it comes round.
    return presentForm(fact.forms[formIndex], mulberry32(hash(`${fact.id}:${formIndex}:${remaining}`)));
  }, [fact, formIndex, remaining]);

  const commit = useCallback(
    (grade: Grade) => {
      if (!item || !fact) return;
      onGrade(fact.id, formIndex, grade);
    },
    [item, fact, formIndex, onGrade],
  );

  if (!item || !fact || !presented) {
    return (
      <div className={styles.done}>
        <div className={styles.doneMark} aria-hidden="true">✓</div>
        <h2 className={styles.doneTitle}>Nothing here right now</h2>
        <p className={styles.doneNote}>{emptyMessage}</p>
        <button type="button" className={styles.exit} onClick={onExit}>Back</button>
      </div>
    );
  }

  const state = stateFor(fact.id) ?? initialState(fact.forms.length);
  const proven = state.ok.filter((v) => v > 0).length;
  const answer = fact.forms[formIndex].answers.correct;
  const answered = mode === 'quiz' ? chosen !== null : revealed;

  return (
    <div className={styles.wrap}>
      <header className={styles.bar}>
        <button type="button" className={styles.back} onClick={onExit} aria-label="Back">‹</button>
        <div className={styles.barTitle}>
          {title}
          <span className={styles.remaining}>{remaining} to go</span>
        </div>
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
                  commit(i === presented.correctIndex ? 4 : 0);
                }}
              >
                {option}
              </button>
            );
          })}
          {chosen !== null && (
            <p className={styles.verdict}>
              {chosen === presented.correctIndex ? 'Correct.' : 'Not quite.'} Next card is loading.
            </p>
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
                className={`${styles.grade} ${styles[`g${g}`]}`}
                onClick={() => commit(g as Grade)}
              >
                {label}
              </button>
            ))}
          </div>
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

