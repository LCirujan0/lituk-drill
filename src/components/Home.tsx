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

import { useState } from 'react';

import { BAND_IDS, BAND_NAMES, type BandId } from '@/domain/deck/bands';
import { CHAPTER_SHORT, type Chapter } from '@/domain/deck/types';
import type { SyncPhase } from '@/adapters/sync';
import type { GroupCounts, SectionCounts } from '@/domain/drill/sections';
import styles from './Home.module.css';

const EMPTY_GROUP: GroupCounts = { total: 0, mastered: 0, mistakes: 0, fresh: 0 };

/** Which cut of the deck the list is showing. Both are drillable; neither replaces the other. */
type Cut = 'chapters' | 'bands';

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
  readonly onBand: (band: BandId) => void;
  readonly onMocks: () => void;
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
  counts, streak, persistent, syncPhase, syncedAt, onSync, onOpen, onChapter, onBand, onMocks,
}: Props) {
  /**
   * Chapters or bands, and the choice is not persisted.
   *
   * Both cuts are drillable and both carry progress (C4), but seventeen rows do not fit a phone
   * and shrinking them below `--target-min` would trade an accessibility rule for a navigation
   * one. A toggle keeps every row a full touch target. It resets to chapters on reload because it
   * is a view state, not a preference — and a preference here would be a third thing to sync.
   */
  const [cut, setCut] = useState<Cut>('chapters');

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
        {/* Mock tests sit with the sections rather than in the tab bar: they are a thing you
            go and do, like a drill, not a place you live. A fourth tab would also cost the
            bottom row width on a 402px screen for something used weekly, not daily. */}
        <Tile icon="▣" name="Mocks" onClick={onMocks} />
      </div>

      {/* Two cuts of one deck, each drillable and each with its own progress (C4). Not a
          hierarchy: a band draws from more than one chapter, so neither nests inside the other. */}
      <div className={styles.cuts} role="tablist" aria-label="Group the deck by">
        <button
          type="button"
          role="tab"
          aria-selected={cut === 'chapters'}
          className={cut === 'chapters' ? styles.cutOn : styles.cut}
          onClick={() => setCut('chapters')}
        >
          Chapters
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={cut === 'bands'}
          className={cut === 'bands' ? styles.cutOn : styles.cut}
          onClick={() => setCut('bands')}
        >
          Bands
        </button>
      </div>

      <div className={styles.rows}>
        {cut === 'chapters'
          ? ([1, 2, 3, 4, 5] as Chapter[]).map((chapter) => (
              <GroupRow
                key={chapter}
                name={CHAPTER_SHORT[chapter]}
                counts={counts.byChapter.get(chapter) ?? EMPTY_GROUP}
                onClick={() => onChapter(chapter)}
              />
            ))
          : BAND_IDS.map((band) => (
              <GroupRow
                key={band}
                name={BAND_NAMES[band]}
                counts={counts.byBand.get(band) ?? EMPTY_GROUP}
                onClick={() => onBand(band)}
              />
            ))}
      </div>
    </>
  );
}

/**
 * One drillable group: its name, its three-way split, and its mastered count.
 *
 * ## Three segments, because one number was three states pretending to be one
 *
 * A chapter half mastered and a chapter half attempted-and-failing drew the same bar. The
 * segments are mastered, then mistakes, and the untouched remainder is the track showing through
 * — two painted widths rather than three, so the three shares sum to exactly 100% of the bar with
 * no rounding gap at the join. They are the same partition every other number on this screen
 * comes from (R-12). Nothing here counts a phrasing.
 *
 * ## Colour is not the only carrier
 *
 * WCAG 1.4.1, and the two open contrast findings (L-004, L-034) make it more than a formality.
 * The accessible name spells out all three figures as words, the mastered count is printed beside
 * the bar, and the mistakes segment is hatched as well as coloured — so the row still reads
 * correctly in greyscale and to a screen reader.
 */
function GroupRow({
  name, counts, onClick,
}: {
  name: string;
  counts: GroupCounts;
  onClick: () => void;
}) {
  const pct = (n: number) => (counts.total ? (n / counts.total) * 100 : 0);

  return (
    <button
      type="button"
      className={styles.row}
      onClick={onClick}
      aria-label={
        `${name} — ${counts.total} facts: ` +
        `${counts.mastered} mastered, ${counts.mistakes} mistakes, ${counts.fresh} not yet tried`
      }
    >
      <span className={styles.rowName}>{name}</span>
      <span className={styles.bar} aria-hidden="true">
        <span className={styles.segMastered} style={{ width: `${pct(counts.mastered)}%` }} />
        <span className={styles.segMistakes} style={{ width: `${pct(counts.mistakes)}%` }} />
      </span>
      {/* The bar alone reads as empty at 3%, which is where every group starts, so the number
          carries the early weeks and the bar carries the shape. */}
      <span className={styles.rowCount} aria-hidden="true">
        {counts.mastered}<span className={styles.rowOf}>/{counts.total}</span>
      </span>
    </button>
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
