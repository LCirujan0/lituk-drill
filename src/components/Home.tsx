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
 * ## Every number on this screen is a count of facts (D-032)
 *
 * The headline is **mastered out of the deck**: facts with no wrong answer in their last three
 * attempts. New, Mistakes and Mastered partition the deck exactly, and the chapter bars are
 * mastered-in-chapter over facts-in-chapter, so the whole screen adds up.
 *
 * Not one of them is a phrasing. Asking a fact several ways is how the app checks you know the
 * fact rather than the sentence — it is the mechanism, and the reader never has to think about
 * it. This screen used to mix the two: the headline required every phrasing proven, so it read
 * 0 after a fortnight of correct answers, and New counted 1,575 unseen questions against a deck
 * of 537 facts. Both were honest measurements of the wrong thing.
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
import styles from './Home.module.css';

export type OpenableSection = 'due' | 'new' | 'mistakes' | 'random' | 'mastered';

interface Props {
  /** The only source of numbers on this screen. Two sources is how they came to disagree. */
  readonly counts: SectionCounts;
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
  counts, streak, persistent, syncPhase, syncedAt, onSync, onOpen, onChapter,
}: Props) {
  const masteredPct = counts.totalFacts
    ? Math.round((counts.mastered / counts.totalFacts) * 100)
    : 0;

  return (
    <>
      <header className={styles.header}>
        <p className={styles.big}>
          {counts.mastered}
          <span className={styles.of}>/{counts.totalFacts} mastered · {masteredPct}%</span>
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

      {/* These three partition the deck: New + Mistakes + Mastered is every fact, always. */}
      <div className={styles.grid}>
        <Tile icon="✦" name="New" count={counts.newFacts} onClick={() => onOpen('new')} />
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
          const entry = counts.byChapter.get(chapter) ?? { total: 0, mastered: 0 };
          const pct = entry.total ? Math.round((entry.mastered / entry.total) * 100) : 0;
          return (
            <button
              key={chapter}
              type="button"
              className={styles.chapter}
              onClick={() => onChapter(chapter)}
              aria-label={`${CHAPTER_SHORT[chapter]} — ${entry.mastered} of ${entry.total} mastered`}
            >
              <span className={styles.chapterName}>{CHAPTER_SHORT[chapter]}</span>
              <span className={styles.bar} aria-hidden="true">
                <span className={styles.barFill} style={{ width: `${pct}%` }} />
              </span>
              {/* The bar alone reads as empty at 3%, which is where every chapter starts. The
                  number says what the bar cannot at that width. */}
              <span className={styles.chapterCount} aria-hidden="true">
                {entry.mastered}<span className={styles.chapterOf}>/{entry.total}</span>
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
