'use client';

/**
 * The home screen: what is due, and the other ways in.
 *
 * Due-today is the front door by the owner's decision. The scheduler still decides what he
 * sees most, which is what makes the breadth gate and the readiness number mean anything —
 * the self-directed sections sit alongside it rather than replacing it.
 *
 * The headline is **facts known every way**, out of 528 (D-028). The phrasings are the
 * mechanism, not the goal: asking a fact several ways is how the app checks you know the fact
 * rather than the sentence, but what you are trying to learn is 528 facts, and a count out of
 * 1,582 questions measures the apparatus instead of the material. A fact counts as known when
 * every one of its phrasings has been answered correctly, so the rigour is unchanged; it is
 * just reported against the thing that matters.
 *
 * ## Everything fits 393×852, and that is a constraint on the design rather than on the type
 *
 * This screen used to run to 1,460px and the page scrolled. Once the frame stopped scrolling
 * (§F — from the Home Screen this is an app, not a page) that became clipping, which is worse:
 * the chapters were simply unreachable.
 *
 * The fix is structural rather than cosmetic. Chapter names are one word each and sit in a
 * two-column grid with Random as its sixth cell; the section notes are one line; the sync
 * status is a line rather than a row. Nothing was made smaller than a 44px target, because
 * shrinking the things a thumb has to hit is how "it fits" turns into "it does not work".
 */

import { CHAPTER_SHORT, type Chapter } from '@/domain/deck/types';
import type { SyncPhase } from '@/adapters/sync';
import type { SectionCounts } from '@/domain/drill/sections';
import type { DeckProgress } from '@/domain/drill/stats';
import styles from './Home.module.css';

interface Props {
  readonly counts: SectionCounts;
  readonly progress: DeckProgress;
  readonly streak: number;
  readonly persistent: boolean;
  readonly syncPhase: SyncPhase;
  readonly syncedAt: number | null;
  readonly onSync: () => void;
  readonly onOpen: (section: 'due' | 'new' | 'mistakes' | 'random') => void;
  readonly onChapter: (chapter: Chapter) => void;
  readonly onProgress: () => void;
  readonly onTimeline: () => void;
}

/**
 * What the sync line says.
 *
 * It reports where the last attempt got to and nothing more. There is deliberately no
 * "everything is up to date" claim: the local log is authoritative and complete whatever the
 * server says, so the only honest thing to report is whether the last round reached it.
 */
function syncLabel(phase: SyncPhase, syncedAt: number | null): string {
  if (phase === 'syncing') return 'Syncing…';
  if (phase === 'offline') return 'Offline — this device still has everything you have done.';
  if (phase === 'error') {
    return syncedAt
      ? `Could not reach the server. Last synced ${clockTime(syncedAt)}.`
      : 'Could not reach the server. Nothing is lost — it will try again.';
  }
  if (syncedAt) return `Synced ${clockTime(syncedAt)} · both devices share one history.`;
  return 'Both devices share one history.';
}

const clockTime = (at: number): string =>
  new Date(at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

export function Home({
  counts, progress, streak, persistent, syncPhase, syncedAt,
  onSync, onOpen, onChapter, onProgress, onTimeline,
}: Props) {
  const knownPct = progress.facts ? Math.round((progress.provenAllForms / progress.facts) * 100) : 0;
  const partPct = progress.facts ? Math.round((progress.started / progress.facts) * 100) : 0;

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1>Life in the UK</h1>
          <p className={styles.sub}>
            {progress.facts} facts · {progress.forms.toLocaleString('en-GB')} phrasings
          </p>
        </div>
        {streak > 0 && <span className={styles.streak}>{streak}-day streak</span>}
      </header>

      {!persistent && (
        <p className={styles.warning} role="alert">
          This browser is refusing to store data — nothing from this session will be kept.
        </p>
      )}

      <section className={styles.headline} aria-labelledby="proven-heading">
        <p className={styles.big}>
          {progress.provenAllForms}
          <span className={styles.of}>of {progress.facts}</span>
        </p>
        <h2 id="proven-heading" className={styles.headlineLabel}>
          facts known every way · {knownPct}%
        </h2>
        <p className={styles.headlineNote}>
          Counted only once every phrasing of a fact has been answered correctly.
          {progress.started > progress.provenAllForms && (
            <> {progress.started} ({partPct}%) met at least once.</>
          )}
        </p>
      </section>

      <div className={styles.sections}>
        <button type="button" className={styles.primary} onClick={() => onOpen('due')}>
          <span className={styles.sectionName}>Due today</span>
          <span className={styles.sectionCount}>{counts.due}</span>
          <span className={styles.sectionNote}>
            {counts.due > 0 ? 'Mistakes, new material and facts you know — each fact once' : 'Done for today. Thirty facts is the day'}
          </span>
        </button>

        <button type="button" className={styles.section} onClick={() => onOpen('new')}>
          <span className={styles.sectionName}>Not tried yet</span>
          <span className={styles.sectionCount}>{counts.newForms.toLocaleString('en-GB')}</span>
          <span className={styles.sectionNote}>Phrasings you have never seen</span>
        </button>

        <button
          type="button"
          className={counts.mistakes > 0 ? styles.sectionAlert : styles.section}
          onClick={() => onOpen('mistakes')}
        >
          <span className={styles.sectionName}>Your mistakes</span>
          <span className={styles.sectionCount}>{counts.mistakes}</span>
          <span className={styles.sectionNote}>
            {counts.mistakes > 0 ? 'Three right answers on three phrasings clears one' : 'Nothing outstanding'}
          </span>
        </button>
      </div>

      <section aria-labelledby="chapters-heading" className={styles.grid}>
        <h2 id="chapters-heading" className={styles.gridTitle}>By chapter</h2>
        {([1, 2, 3, 4, 5] as Chapter[]).map((chapter) => {
          const entry = counts.byChapter.get(chapter) ?? { total: 0, proven: 0 };
          const pct = entry.total ? Math.round((entry.proven / entry.total) * 100) : 0;
          return (
            <button key={chapter} type="button" className={styles.cell} onClick={() => onChapter(chapter)}>
              <span className={styles.cellName}>{CHAPTER_SHORT[chapter]}</span>
              <span className={styles.cellMeta}>{entry.proven}/{entry.total}</span>
              <span className={styles.bar} aria-hidden="true">
                <span className={styles.barFill} style={{ width: `${pct}%` }} />
              </span>
            </button>
          );
        })}

        {/* The sixth cell, because it belongs to the same choice: which slice do I want? */}
        <button type="button" className={styles.cell} onClick={() => onOpen('random')}>
          <span className={styles.cellName}>Random</span>
          <span className={styles.cellMeta}>any of {counts.totalForms.toLocaleString('en-GB')}</span>
          <span className={styles.bar} aria-hidden="true" />
        </button>
      </section>

      <p className={styles.sync} aria-live="polite">{syncLabel(syncPhase, syncedAt)}</p>

      <div className={styles.links}>
        <button type="button" className={styles.link} onClick={onProgress}>Progress</button>
        <button type="button" className={styles.link} onClick={onTimeline}>Timeline</button>
        <button
          type="button"
          className={styles.link}
          onClick={onSync}
          disabled={syncPhase === 'syncing'}
        >
          Sync now
        </button>
      </div>
    </>
  );
}
