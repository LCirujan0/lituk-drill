'use client';

/**
 * The twenty fixed mock tests, and what they have scored (C7, D-036).
 *
 * ## What this screen may and may not say
 *
 * **R-7 binds every number here.** These are multiple-choice results, and while L-002 and
 * L-003 are `fixed-unverified` a mock score may be shown **as a score** — "18 of 24", a trend
 * — and never as readiness or as a probability of passing. The owner confirmed that reading
 * when D-036 was written. So there is no percentage-likely-to-pass anywhere on this screen,
 * and the pass mark is drawn as a *line on a chart*, which is a mark, not a verdict.
 *
 * The distinction between the two kinds of test is on screen rather than implied, because an
 * app that explains this badly lets a contaminated score read as readiness — D-036 names that
 * as the cost of having both kinds.
 *
 * ## Why a retake is offered rather than warned about
 *
 * A retaken fixed test is contaminated by definition: the second sitting partly measures
 * memory of those 24 questions. That is not a defect to be discouraged — it is the entire
 * point of the twenty being fixed. The same 24 questions in August and in September measure
 * *you* rather than the draw. What must never happen is a fixed-test score calibrating the
 * readiness model, and that is enforced where the model reads its data, not here.
 */

import { useMemo } from 'react';

import { FIXED_TESTS } from '@/data/mock-tests';
import { historyByTest, trend, MOCK_LENGTH, PASS_MARK, type MockAttempt } from '@/domain/mock';
import type { ReviewEvent } from '@/domain/scheduler/events';

import styles from './Mocks.module.css';

interface Props {
  readonly events: readonly ReviewEvent[];
  readonly onSit: (testId: number) => void;
  readonly onExit: () => void;
}

const dayLabel = (at: number): string =>
  new Date(at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });

export function Mocks({ events, onSit, onExit }: Props) {
  const history = useMemo(() => historyByTest(events, FIXED_TESTS), [events]);
  const line = useMemo(() => trend(events, FIXED_TESTS), [events]);

  return (
    <div className={styles.wrap}>
      <header className={styles.bar}>
        <button type="button" className={styles.back} onClick={onExit} aria-label="Close">✕</button>
        <h1 className={styles.title}>Mock tests</h1>
      </header>

      <p className={styles.note}>
        Twenty fixed tests of {MOCK_LENGTH} questions, in the exam&rsquo;s format and its chapter
        spread. They never change, so sitting the same one twice measures you rather than the
        draw. <b>A score here is a score, not a readiness figure.</b>
      </p>

      {line.length > 0 ? (
        <Trend attempts={line} />
      ) : (
        <p className={styles.empty}>No completed test yet. The trend appears once you finish one.</p>
      )}

      <ol className={styles.list}>
        {FIXED_TESTS.map((test) => {
          const h = history.get(test.id)!;
          const resumable = h.latest && !h.latest.complete ? h.latest : null;
          const sat = h.attempts.filter((a) => a.complete).length;

          return (
            <li key={test.id}>
              <button
                type="button"
                className={styles.row}
                onClick={() => onSit(test.id)}
                aria-label={
                  `Test ${test.id}. ` +
                  (resumable
                    ? `Resume, ${resumable.answered} of ${MOCK_LENGTH} answered.`
                    : h.best
                      ? `Best ${h.best.correct} out of ${MOCK_LENGTH}, sat ${sat} ${sat === 1 ? 'time' : 'times'}.`
                      : 'Not sat yet.')
                }
              >
                <span className={styles.rowName}>Test {test.id}</span>
                <span className={styles.rowState}>
                  {resumable
                    ? `${resumable.answered}/${MOCK_LENGTH} — resume`
                    : h.best
                      ? `best ${h.best.correct}/${MOCK_LENGTH}`
                      : 'not sat'}
                </span>
                {sat > 1 && <span className={styles.rowTimes}>×{sat}</span>}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * Complete attempts, oldest first, as a score out of 24 with the pass mark drawn across.
 *
 * A bar per attempt rather than a line joining them: the sittings are of *different* tests,
 * so joining them would assert a continuity the data does not have. The pass mark is a
 * reference line, and the accessible name says the score — never a likelihood.
 */
function Trend({ attempts }: { readonly attempts: readonly MockAttempt[] }) {
  const shown = attempts.slice(-12);

  return (
    <section className={styles.trend} aria-label="Completed mock scores, oldest first">
      <div className={styles.chart}>
        {/* `.plot` is the shared coordinate box: the bars and the pass line are both
            percentages of ITS height, so an 18/24 bar meets the 18 line exactly. */}
        <div className={styles.plot} style={{ '--pass': `${(PASS_MARK / MOCK_LENGTH) * 100}%` } as React.CSSProperties}>
        <div className={styles.passLine} aria-hidden="true" />
        {shown.map((a) => (
          <div
            key={`${a.testId}-${a.startedAt}`}
            className={`${styles.chartBar} ${a.correct >= PASS_MARK ? styles.chartBarPass : ''}`}
            style={{ '--h': `${(a.correct / MOCK_LENGTH) * 100}%` } as React.CSSProperties}
            title={`Test ${a.testId}: ${a.correct}/${MOCK_LENGTH}`}
          >
            <span className={styles.srOnly}>
              Test {a.testId}, {dayLabel(a.startedAt)}: {a.correct} of {MOCK_LENGTH}
            </span>
          </div>
        ))}
        </div>
      </div>
      <p className={styles.legend}>
        {shown.length} completed · latest <b>{shown[shown.length - 1].correct}/{MOCK_LENGTH}</b>
        {' · '}the line is {PASS_MARK}/{MOCK_LENGTH}, the exam&rsquo;s pass mark
      </p>
    </section>
  );
}
