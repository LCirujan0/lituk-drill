'use client';

/**
 * The home screen: what is due, and the four other ways in.
 *
 * Due-today is the front door by the owner's decision. The scheduler still decides what he
 * sees most, which is what makes the breadth gate and the readiness number mean anything —
 * the self-directed sections sit alongside it rather than replacing it.
 *
 * The headline number is **phrasings proven**, not facts started. A fact proven one way is
 * a memorised sentence; proven every way, it is knowledge. That distinction is the reason
 * the deck is built as it is, so it gets the largest type on the screen.
 */

import { CHAPTER_NAMES, type Chapter } from '@/domain/deck/types';
import type { SectionCounts } from '@/domain/drill/sections';
import type { DeckProgress } from '@/domain/drill/stats';
import styles from './Home.module.css';

interface Props {
  readonly counts: SectionCounts;
  readonly progress: DeckProgress;
  readonly streak: number;
  readonly persistent: boolean;
  readonly onOpen: (section: 'due' | 'new' | 'mistakes' | 'random') => void;
  readonly onChapter: (chapter: Chapter) => void;
  readonly onProgress: () => void;
  readonly onTimeline: () => void;
}

export function Home({
  counts, progress, streak, persistent, onOpen, onChapter, onProgress, onTimeline,
}: Props) {
  const provenPct = progress.forms ? Math.round((progress.provenForms / progress.forms) * 100) : 0;

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1>Life in the UK</h1>
          <p className={styles.sub}>
            {progress.facts} facts · {progress.forms} phrasings
          </p>
        </div>
        {streak > 0 && <span className={styles.streak}>{streak}-day streak</span>}
      </header>

      {!persistent && (
        <p className={styles.warning} role="alert">
          This browser is refusing to store data, so nothing from this session will be kept.
          Private browsing is the usual cause.
        </p>
      )}

      <section className={styles.headline} aria-labelledby="proven-heading">
        <p className={styles.big}>
          {progress.provenForms}
          <span className={styles.of}>of {progress.forms}</span>
        </p>
        <h2 id="proven-heading" className={styles.headlineLabel}>
          phrasings proven · {provenPct}%
        </h2>
        <p className={styles.headlineNote}>
          This is the number that matters. It counts ways of asking, not facts — you can only
          move it by knowing the fact underneath the sentence.
        </p>
      </section>

      <div className={styles.sections}>
        <button type="button" className={styles.primary} onClick={() => onOpen('due')}>
          <span className={styles.sectionName}>Due today</span>
          <span className={styles.sectionCount}>{counts.due}</span>
          <span className={styles.sectionNote}>
            {counts.due > 0
              ? 'A mix of mistakes, new material and facts you have got right — each fact once'
              : 'Done for today. Thirty facts is the day'}
          </span>
        </button>

        <button type="button" className={styles.section} onClick={() => onOpen('new')}>
          <span className={styles.sectionName}>Not tried yet</span>
          <span className={styles.sectionCount}>{counts.newForms}</span>
          <span className={styles.sectionNote}>Phrasings you have never seen, including new ways of asking familiar facts</span>
        </button>

        <button
          type="button"
          className={counts.mistakes > 0 ? styles.sectionAlert : styles.section}
          onClick={() => onOpen('mistakes')}
        >
          <span className={styles.sectionName}>Your mistakes</span>
          <span className={styles.sectionCount}>{counts.mistakes}</span>
          <span className={styles.sectionNote}>
            {counts.mistakes > 0
              ? 'Three correct answers on three different phrasings clears one'
              : 'Nothing outstanding'}
          </span>
        </button>
      </div>

      <section className={styles.block} aria-labelledby="chapters-heading">
        <h2 id="chapters-heading" className={styles.blockTitle}>By chapter</h2>
        <div className={styles.chapters}>
          {([1, 2, 3, 4, 5] as Chapter[]).map((chapter) => {
            const entry = counts.byChapter.get(chapter) ?? { total: 0, proven: 0 };
            const pct = entry.total ? Math.round((entry.proven / entry.total) * 100) : 0;
            return (
              <button key={chapter} type="button" className={styles.chapter} onClick={() => onChapter(chapter)}>
                <span className={styles.chapterName}>{CHAPTER_NAMES[chapter]}</span>
                <span className={styles.chapterMeta}>
                  {entry.proven}/{entry.total} known every way
                </span>
                <span className={styles.bar} aria-hidden="true">
                  <span className={styles.barFill} style={{ width: `${pct}%` }} />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.block} aria-labelledby="random-heading">
        <h2 id="random-heading" className={styles.blockTitle}>Random</h2>
        <button type="button" className={styles.chapter} onClick={() => onOpen('random')}>
          <span className={styles.chapterName}>One at random</span>
          <span className={styles.chapterMeta}>
            Any of the {counts.totalForms.toLocaleString('en-GB')} phrasings, with no memory
            and no order — the honest sample the other sections are designed not to be
          </span>
        </button>
      </section>

      <div className={styles.links}>
        <button type="button" className={styles.link} onClick={onProgress}>Progress</button>
        <button type="button" className={styles.link} onClick={onTimeline}>Timeline</button>
      </div>
    </>
  );
}
