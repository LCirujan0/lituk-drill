'use client';

/**
 * The drill tab: what is due, and every other way in.
 *
 * ## Written for one reader who already knows what this is
 *
 * There is one user, he built it, and he opens it every day. Copy explaining what a section
 * does is read once and then costs a line of screen for ever. Everything here has been cut
 * back to a name, an icon and a count — the section titles carry their own meaning, and where
 * they do not, that is a naming problem rather than a case for a caption.
 *
 * The headline is **facts known every way**, out of 528 (D-028). The phrasings are the
 * mechanism, not the goal: asking a fact several ways is how the app checks you know the fact
 * rather than the sentence, but a count out of 1,582 questions measures the apparatus instead
 * of the material.
 *
 * ## Everything fits 393×852
 *
 * Once the frame stopped scrolling (§F — from the Home Screen this is an app, not a page) an
 * over-long screen became clipping rather than scrolling, which is worse: content simply
 * unreachable. So this fits, and it fits by layout rather than by shrinking anything a thumb
 * has to hit. Every target here is at least `--target-min`.
 */

import { CHAPTER_SHORT, type Chapter } from '@/domain/deck/types';
import type { SyncPhase } from '@/adapters/sync';
import type { SectionCounts } from '@/domain/drill/sections';
import type { DeckProgress } from '@/domain/drill/stats';
import styles from './Home.module.css';

export type OpenableSection = 'due' | 'new' | 'mistakes' | 'random' | 'mastered';

interface Props {
  readonly counts: SectionCounts;
  readonly progress: DeckProgress;
  readonly streak: number;
  readonly persistent: boolean;
  readonly syncPhase: SyncPhase;
  readonly syncedAt: number | null;
  readonly onSync: () => void;
  readonly onOpen: (section: OpenableSection) => void;
  readonly onChapter: (chapter: Chapter) => void;
}

/**
 * The sync line, and it claims nothing it cannot back.
 *
 * There is deliberately no "up to date": the local log is authoritative and complete whatever
 * the server says, so the only honest report is whether the last round reached it.
 */
function syncLabel(phase: SyncPhase, syncedAt: number | null): string {
  if (phase === 'syncing') return 'Syncing…';
  if (phase === 'offline') return 'Offline';
  if (phase === 'error') return syncedAt ? `Last synced ${clockTime(syncedAt)}` : 'Sync unreachable';
  return syncedAt ? `Synced ${clockTime(syncedAt)}` : 'Not synced yet';
}

const clockTime = (at: number): string =>
  new Date(at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

export function Home({
  counts, progress, streak, persistent, syncPhase, syncedAt, onSync, onOpen, onChapter,
}: Props) {
  const knownPct = progress.facts ? Math.round((progress.provenAllForms / progress.facts) * 100) : 0;

  return (
    <>
      <header className={styles.header}>
        <p className={styles.big}>
          {progress.provenAllForms}
          <span className={styles.of}>/{progress.facts} known · {knownPct}%</span>
        </p>
        <div className={styles.headerRight}>
          {streak > 0 && <span className={styles.streak}>{streak}d</span>}
          <button
            type="button"
            className={styles.syncButton}
            onClick={onSync}
            disabled={syncPhase === 'syncing'}
            aria-label={`Sync now. ${syncLabel(syncPhase, syncedAt)}`}
            title={syncLabel(syncPhase, syncedAt)}
          >
            <span aria-hidden="true">{syncPhase === 'error' || syncPhase === 'offline' ? '⚠' : '⟳'}</span>
          </button>
        </div>
      </header>

      {!persistent && (
        <p className={styles.warning} role="alert">
          This browser is refusing to store data. Nothing will be kept.
        </p>
      )}

      <button type="button" className={styles.primary} onClick={() => onOpen('due')}>
        <span className={styles.primaryIcon} aria-hidden="true">◎</span>
        <span className={styles.primaryName}>Due today</span>
        <span className={styles.primaryCount}>{counts.due}</span>
      </button>

      <div className={styles.grid}>
        <Tile icon="✦" name="New" count={counts.newForms} onClick={() => onOpen('new')} />
        <Tile
          icon="✕"
          name="Mistakes"
          count={counts.mistakes}
          alert={counts.mistakes > 0}
          onClick={() => onOpen('mistakes')}
        />
        {/* The only count on this screen that can fall. A fact arrives here once answered
            and stays until it is missed, so this is current form rather than coverage — and
            it is retested with a different phrasing every time it comes round. */}
        <Tile icon="✓" name="Mastered" count={counts.mastered} onClick={() => onOpen('mastered')} />
        <Tile icon="⤨" name="Random" onClick={() => onOpen('random')} />
      </div>

      <div className={styles.chapters}>
        {([1, 2, 3, 4, 5] as Chapter[]).map((chapter) => {
          const entry = counts.byChapter.get(chapter) ?? { total: 0, proven: 0 };
          const pct = entry.total ? Math.round((entry.proven / entry.total) * 100) : 0;
          return (
            <button
              key={chapter}
              type="button"
              className={styles.chapter}
              onClick={() => onChapter(chapter)}
            >
              <span className={styles.chapterName}>{CHAPTER_SHORT[chapter]}</span>
              <span className={styles.bar} aria-hidden="true">
                <span className={styles.barFill} style={{ width: `${pct}%` }} />
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function Tile({
  icon, name, count, alert, onClick,
}: {
  icon: string;
  name: string;
  count?: number;
  alert?: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" className={alert ? styles.tileAlert : styles.tile} onClick={onClick}>
      <span className={styles.tileIcon} aria-hidden="true">{icon}</span>
      <span className={styles.tileName}>{name}</span>
      {count !== undefined && <span className={styles.tileCount}>{count.toLocaleString('en-GB')}</span>}
    </button>
  );
}
