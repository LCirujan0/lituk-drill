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
 *
 * ## Nothing above the question but a cross
 *
 * The title, the "N to go" counter, the mode toggle, the chapter and tag chips and the
 * phrasings-proven dots are all gone. On a 402×874 iPhone 16 Pro they cost about 100px that the
 * explanation panel then had to be scrolled to recover, and none of them was ever acted on
 * mid-card. The mode switch lives in Settings on the Progress tab; it is a preference, set once,
 * not a per-card decision.
 */

import { useCallback, useMemo, useState } from 'react';

import { factById } from '@/domain/deck';
import { presentForm } from '@/domain/deck/presentation';
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
  readonly item: DrillItem | null;
  /** Set in Settings, not here. A card being re-read keeps the mode it was answered in. */
  readonly mode: DrillMode;
  readonly onGrade: (factId: string, formIndex: number, grade: Grade) => void;
  readonly onAnswer: (answer: CardAnswer) => void;
  readonly onNext: () => void;
  readonly onExit: () => void;
  readonly stateFor: (factId: string) => FactState | undefined;
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
  item, mode, onGrade, onAnswer, onNext, onExit, stateFor,
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
  const answer = fact.forms[formIndex].answers.correct;
  const answered = mode === 'quiz' ? chosen !== null : graded !== null;

  return (
    <div className={styles.wrap}>
      {/*
        One cross, and nothing else above the question.

        The section title, the "N to go" counter, the mode toggle, the chapter and tag chips and
        the phrasings-proven dots all used to live up here — about 100px of chrome on a 874px
        screen, every pixel of which was competing with the explanation panel for the part of the
        card the reader actually has to read. None of it was ever acted on mid-card. The mode
        switch moved to Settings; the dots were a phrasing count on screen and had no business
        being there at all (R-12).
      */}
      <header className={styles.bar}>
        {/* A cross, not a back arrow. `‹` means "the previous card" in the action bar, and one
            glyph cannot mean two things on the same screen. Leaving a drill is closing it. */}
        <button type="button" className={styles.back} onClick={onExit} aria-label="Close">✕</button>
      </header>

      <div className={styles.body}>
      <div className={styles.card}>
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

            The panel is as long as it needs to be. What is bounded is the SCROLLING BODY
            around it: a long cluster scrolls the card, and the action bar stays on the bottom
            edge because it is a sibling of that body rather than inside it. So reading the
            explanation is a scroll, and acting on the card never is. */}
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

        {/* The "check the book" flag was a chip above the question and went with the rest of
            them — but it is a caveat about the answer, not a tag, so it belongs beside the
            answer. Two facts carry it (L-016, L-028) and both are unresolved against the 2026
            edition, so this is the one thing up there that could not simply be deleted. */}
        {answered && fact.verify && (
          <p className={styles.caution}>Check this one in the book — the handbook does not settle it.</p>
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
          {/*
            No "Correct." / "Not quite." line. The option turns green or red and the others dim,
            which says it faster than a sentence does and costs no vertical space.

            The announcement survives for anyone not reading the colour: WCAG 1.4.1 is that
            colour is never the ONLY carrier of information, and a live region satisfies it
            without putting a line back on the screen.
          */}
          {chosen !== null && (
            <p className={styles.srOnly} role="status">
              {chosen === presented.correctIndex ? 'Correct.' : 'Not quite.'}
            </p>
          )}
          {/* This one stays visible: nothing about the colours says a right answer has just
              been recorded as a miss, so removing it would leave the reader guessing whether
              "Got lucky" did anything. */}
          {downgraded && <p className={styles.downgraded}>Recorded as a miss.</p>}
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
          {/* The interval preview is a decision aid, so it belongs BEFORE the decision. It is
              absent on a card being re-read: the schedule has moved on since, so showing it
              would be a prediction of something that has already happened, and a wrong one. */}
          {!readOnly && graded === null && (
            <p className={styles.intervals}>
              Hard {describe(previewInterval(state, formIndex, 3, CONFIG))}
              {' · '}Good {describe(previewInterval(state, formIndex, 4, CONFIG))}
              {' · '}Easy {describe(previewInterval(state, formIndex, 5, CONFIG))}
            </p>
          )}
        </>
      )}

      </div>

      {/*
        The action bar, pinned to the bottom of the screen and OUTSIDE the scrolling body.

        Everything you can do with a card is on one row, always in the same place, and always
        reachable — so answering, going back and moving on never require scrolling past an
        explanation to find a button. If you want to read the panel you scroll it; if you do
        not, you never touch it. That is the whole point of bounding the panel rather than
        shortening the content.

        Read-only by construction: `commit` refuses while `readOnly` is set, so there is no
        path from re-reading a card to recording a second review of it.
      */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.act}
          onClick={onPrevious}
          disabled={!canPrevious}
          aria-label="Previous card"
        >
          <span aria-hidden="true">‹</span>
        </button>

        {position && (
          <span className={styles.position}>{position.index}/{position.total}</span>
        )}

        {/*
          Guessing right is the one thing multiple choice cannot tell from knowing. One in
          four is chance, and a fact you guessed is otherwise treated as proved and pushed out
          to a long interval — so the schedule quietly fills with things you never knew. This
          is the only way the app can find out, and it has to come from the reader.
        */}
        {!readOnly && mode === 'quiz' && chosen === presented.correctIndex && !downgraded && (
          <button
            type="button"
            className={styles.lucky}
            onClick={() => {
              setDowngraded(true);
              commit(0, chosen, true);
            }}
          >
            Got lucky
          </button>
        )}

        {readOnly ? (
          <button
            type="button"
            className={styles.next}
            onClick={onForward}
            disabled={!canForward}
          >
            Next ›
          </button>
        ) : (
          <button
            type="button"
            className={styles.next}
            onClick={onNext}
            disabled={mode === 'quiz' ? chosen === null : graded === null}
          >
            Next ›
          </button>
        )}
      </div>
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

