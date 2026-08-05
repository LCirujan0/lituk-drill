'use client';

/**
 * The progress screen.
 *
 * Counting, not forecasting. Every number here is a fact about what has happened; none of
 * them predicts an exam result. That separation is deliberate — the readiness model (S4) is
 * the output most likely to flatter, and keeping the counting apart from the modelling
 * means the counting stays trustworthy whatever the model turns out to be worth.
 *
 * **Every figure here is a count of facts** (D-032). The top three partition the deck — mastered
 * plus in-your-mistakes plus not-tried is the whole of it — so this screen and the home screen
 * cannot tell different stories. "Phrasings proven, X of 1,609" used to lead this list; it
 * measured how many ways the app can ask things, which is machinery rather than knowledge.
 *
 * There is no percentage here that only ever rises. Mastered falls the moment a fact is missed.
 */

import { factById } from '@/domain/deck';
import type { DeckProgress, ProblemFact } from '@/domain/drill/stats';
import type { Settings } from '@/adapters/local-store';
import styles from './Progress.module.css';

interface Props {
  readonly progress: DeckProgress;
  readonly upcoming: number[];
  readonly activity: number[];
  readonly problems: readonly ProblemFact[];
  readonly settings: Settings;
  readonly onSettings: (settings: Settings) => void;
  readonly onErase: () => void;
  readonly onExit: () => void;
}

export function Progress({
  progress, upcoming, activity, problems, settings, onSettings, onErase, onExit,
}: Props) {
  const peak = Math.max(1, ...activity);

  return (
    <>
      <header className={styles.bar}>
        <h1 className={styles.title}>Progress</h1>
      </header>

      {/* The first three add up to the deck, and are the same three the home screen shows. */}
      <div className={styles.tiles}>
        <Tile value={progress.mastered} of={progress.facts} label="facts mastered" accent />
        <Tile value={progress.inMistakes} label="in your mistakes" />
        <Tile value={progress.notTried} label="facts not tried yet" />
        <Tile value={progress.started} of={progress.facts} label="facts met at least once" />
        <Tile value={progress.mature} label="solid (3 weeks+)" />
        <Tile value={progress.totalReviews} label="reviews answered" />
      </div>

      <section className={styles.block} aria-labelledby="activity-heading">
        <h2 id="activity-heading" className={styles.blockTitle}>Last 14 days</h2>
        <div className={styles.spark}>
          {activity.map((n, i) => (
            <span
              key={i}
              className={styles.sparkBar}
              style={{ height: `${Math.max(2, (n / peak) * 100)}%` }}
              title={`${n} reviews`}
            />
          ))}
        </div>
        <p className={styles.note}>
          {progress.totalReviews === 0
            ? 'Nothing yet. The first ten minutes is the hardest part of this.'
            : `${activity[activity.length - 1]} today, ${activity.reduce((a, b) => a + b, 0)} in the last fortnight.`}
        </p>
      </section>

      <section className={styles.block} aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading" className={styles.blockTitle}>Coming up</h2>
        <div className={styles.upcoming}>
          {upcoming.map((n, i) => (
            <div key={i} className={styles.day}>
              <b>{n}</b>
              <span>{i === 0 ? 'today' : i === 1 ? 'tomorrow' : `+${i}d`}</span>
            </div>
          ))}
        </div>
      </section>

      {problems.length > 0 && (
        <section className={styles.block} aria-labelledby="problems-heading">
          <h2 id="problems-heading" className={styles.blockTitle}>Your problem facts</h2>
          <ul className={styles.problems}>
            {problems.map((p) => {
              const fact = factById(p.factId);
              return (
                <li key={p.factId} className={styles.problem}>
                  <span className={styles.problemQ}>{fact?.question ?? p.factId}</span>
                  <span className={styles.problemA}>{fact?.answer}</span>
                  <span className={styles.problemMeta}>
                    missed {p.lapses}× · {p.recovered ? 'back on track' : 'still in your mistakes'}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className={styles.note}>
            If one is still here after a week, go and read that page of the book. Drilling will
            not fix a fact you never understood.
          </p>
        </section>
      )}

      <section className={styles.block} aria-labelledby="settings-heading">
        <h2 id="settings-heading" className={styles.blockTitle}>Settings</h2>

        <label className={styles.label} htmlFor="newPerDay">
          New facts per day — {settings.newPerDay}
        </label>
        <input
          id="newPerDay"
          type="range"
          min={5}
          max={60}
          step={5}
          value={settings.newPerDay}
          className={styles.range}
          onChange={(e) => onSettings({ ...settings, newPerDay: Number(e.target.value) })}
        />
        <p className={styles.note}>
          20 a day covers the whole deck in about three weeks with the review load staying
          manageable. 40 gets there in ten days and roughly doubles the daily minutes.
        </p>

        <label className={styles.label} htmlFor="maxReviews">
          Review ceiling — {settings.maxReviews} a day
        </label>
        <input
          id="maxReviews"
          type="range"
          min={40}
          max={300}
          step={20}
          value={settings.maxReviews}
          className={styles.range}
          onChange={(e) => onSettings({ ...settings, maxReviews: Number(e.target.value) })}
        />
      </section>

      <section className={styles.block} aria-labelledby="erase-heading">
        <h2 id="erase-heading" className={styles.blockTitle}>Erase</h2>
        <button
          type="button"
          className={styles.danger}
          onClick={() => {
            if (confirm('Erase every review you have ever answered? This cannot be undone.')) onErase();
          }}
        >
          Erase all progress
        </button>
      </section>
    </>
  );
}

function Tile({ value, of, label, accent }: { value: number; of?: number; label: string; accent?: boolean }) {
  return (
    <div className={styles.tile}>
      <span className={accent ? styles.tileValueAccent : styles.tileValue}>
        {value}
        {of !== undefined && <span className={styles.tileOf}>/{of}</span>}
      </span>
      <span className={styles.tileLabel}>{label}</span>
    </div>
  );
}
