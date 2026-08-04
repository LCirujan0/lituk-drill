'use client';

/**
 * The chronology — S9 (D-016).
 *
 * Not scheduled and not scored. Its value is being read end to end: knowing roughly where in
 * the story something sits answers most history questions on its own, which is a different
 * cognitive tool from the same material broken into individually scheduled cards.
 *
 * ## Why it collapses
 *
 * Eleven eras and a hundred-odd entries is a lot of screen, and an eleven-screen scroll gets
 * read once and then avoided. Collapsed, the whole arc fits on one screen — and that view is
 * the one that teaches the sequence, which is the point of having a timeline at all. Opening
 * an era is for when you want the detail.
 *
 * Built on `<details>` rather than React state, deliberately. Open and closed then live in the
 * DOM, so keyboard support, screen-reader semantics and find-in-page come for free and there
 * is no state to lose. The first era starts open so it is obvious the rows do something.
 */

import { useCallback, useState } from 'react';

import { TIMELINE } from '@/data/timeline';
import styles from './Timeline.module.css';

export function Timeline() {
  /**
   * Bumping this remounts every `<details>`, which is what lets one button set them all.
   *
   * The alternative — an open/closed flag per era in React state — makes React the owner of
   * something the DOM already owns, and the two then disagree the moment anybody clicks a row
   * directly. A remount key leaves `<details>` in charge and still allows expand-all.
   */
  const [generation, setGeneration] = useState(0);
  const [allOpen, setAllOpen] = useState(false);

  const toggleAll = useCallback(() => {
    setAllOpen((open) => !open);
    setGeneration((n) => n + 1);
  }, []);

  const totalEvents = TIMELINE.reduce((n, era) => n + era.events.length, 0);
  const totalFigures = TIMELINE.reduce((n, era) => n + (era.figures?.length ?? 0), 0);

  return (
    <>
      <header className={styles.bar}>
        <div>
          <h1 className={styles.title}>The spine</h1>
          <p className={styles.count}>
            {TIMELINE.length} eras · {totalEvents} events · {totalFigures} people
          </p>
        </div>
        <button type="button" className={styles.toggleAll} onClick={toggleAll}>
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </header>

      <p className={styles.intro}>
        Learn the <b>sequence</b>, then hang the dates on it. Marked entries are worth knowing
        cold. Where the handbook gives no date, this says so rather than inventing one.
      </p>

      {TIMELINE.map((era, i) => (
        <details
          key={`${era.name}:${generation}`}
          className={styles.era}
          open={allOpen || (generation === 0 && i === 0)}
        >
          <summary className={styles.summary}>
            <span className={styles.eraName}>{era.name}</span>
            <span className={styles.span}>{era.span}</span>
            <span className={styles.blurb}>{era.summary}</span>
          </summary>

          <ol className={styles.events}>
            {era.events.map((event) => (
              <li
                key={`${event.year}-${event.title}`}
                className={event.major ? styles.eventMajor : styles.event}
              >
                <span className={styles.year}>{event.year}</span>
                <span className={styles.eventTitle}>{event.title}</span>
                {event.detail && <span className={styles.detail}>{event.detail}</span>}
              </li>
            ))}
          </ol>

          {/* The cast, gathered. Every drill card naming one of these is testing the same
              distinction — who did what, and who they get confused with — and that is far
              easier to hold as an era's cast list than card by card. */}
          {era.figures && era.figures.length > 0 && (
            <div className={styles.figures}>
              <h3 className={styles.figuresTitle}>Who to know</h3>
              <dl className={styles.figureList}>
                {era.figures.map((figure) => (
                  <div key={figure.name} className={styles.figure}>
                    <dt className={styles.figureName}>
                      {figure.name}
                      {figure.when && <span className={styles.figureWhen}>{figure.when}</span>}
                    </dt>
                    <dd className={styles.figureKnown}>{figure.known}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </details>
      ))}
    </>
  );
}
