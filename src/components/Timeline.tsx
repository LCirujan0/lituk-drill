'use client';

/**
 * The chronology — S9 (D-016), restructured under C3.
 *
 * Not scheduled and not scored. Its value is being read end to end: knowing roughly where in
 * the story something sits answers most history questions on its own, which is a different
 * cognitive tool from the same material broken into individually scheduled cards.
 *
 * ## Why there are now two levels
 *
 * The harvest took the chronology from 80 events to roughly three hundred, all of it drawn
 * from the handbook. At that size one flat list per era is unusable: an era is either shut or
 * it dumps forty entries, so reaching one part of it costs you the whole thing. A second level
 * — era, then a named group inside it — means the twentieth century can be opened to four
 * headings rather than to eighty-four events, and a reader who wants the wars can take the
 * wars.
 *
 * The collapsed view is still the important one. Every era name, span and one-line summary on
 * a single screen is what teaches the SEQUENCE, and the sequence is the point of having a
 * timeline rather than a pile of cards.
 *
 * ## Why people look different from dates
 *
 * They are used differently. An event is a point on a line and reads as one — a spine, a dot,
 * a year set in accent. A person is not on the line; the handbook usually gives no date for
 * them at all, and what matters is the one thing they did. So a figure is a card with an
 * initial disc, has no spine and no dot, and sits in its own group. The shape tells you which
 * kind of thing you are looking at before you have read a word, which is the whole reason the
 * `when` field is optional and frequently absent.
 *
 * ## Why `<details>` and not React state
 *
 * Open and closed live in the DOM, so keyboard support, screen-reader semantics and
 * find-in-page come for free and there is no state to lose. A remount key drives expand-all
 * rather than a flag per node, which would make React the owner of something the DOM already
 * owns — the two then disagree the moment anybody clicks a row directly.
 */

import { useCallback, useMemo, useState } from 'react';

import { TIMELINE } from '@/data/timeline';
import styles from './Timeline.module.css';

/** "Alfred the Great" -> "A". Enough to read as a person, cheap enough to need no asset. */
const monogram = (name: string): string => name.trim().charAt(0).toUpperCase();

export function Timeline() {
  /**
   * Bumping this remounts every `<details>`, which is what lets one button set them all.
   * See the note above on why the DOM stays the owner.
   */
  const [generation, setGeneration] = useState(0);
  const [allOpen, setAllOpen] = useState(false);

  const toggleAll = useCallback(() => {
    setAllOpen((open) => !open);
    setGeneration((n) => n + 1);
  }, []);

  const totals = useMemo(() => {
    let sections = 0;
    let events = 0;
    let figures = 0;
    for (const era of TIMELINE) {
      sections += era.sections.length;
      for (const section of era.sections) events += section.events.length;
      figures += era.figures?.length ?? 0;
    }
    return { sections, events, figures };
  }, []);

  return (
    <>
      <header className={styles.bar}>
        <div>
          <h1 className={styles.title}>The spine</h1>
          <p className={styles.count}>
            {TIMELINE.length} eras · {totals.events} events · {totals.figures} people
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

          <div className={styles.groups}>
            {era.sections.map((section, s) => (
              <details
                key={section.name}
                className={styles.section}
                /* The first group of an open era starts open, so it is obvious the inner rows
                   also do something — the same reasoning as the first era being open. */
                open={allOpen || (generation === 0 && i === 0 && s === 0)}
              >
                <summary className={styles.sectionSummary}>
                  <span className={styles.sectionName}>{section.name}</span>
                  <span className={styles.sectionCount}>{section.events.length}</span>
                  <span className={styles.sectionWhy}>{section.why}</span>
                </summary>

                <ol className={styles.events}>
                  {section.events.map((event) => (
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
              </details>
            ))}

            {/* The cast, as its own group at the same level as the sections — every drill card
                naming one of these is testing the same distinction, who did what and who they
                get confused with, and that is far easier to hold as an era's cast list than
                card by card. */}
            {era.figures && era.figures.length > 0 && (
              <details className={styles.section} open={allOpen}>
                <summary className={styles.sectionSummary}>
                  <span className={styles.sectionName}>Who to know</span>
                  <span className={styles.sectionCount}>{era.figures.length}</span>
                  <span className={styles.sectionWhy}>
                    The people the handbook names here, and the one thing it remembers each for.
                  </span>
                </summary>

                <ul className={styles.figureList}>
                  {era.figures.map((figure) => (
                    <li key={figure.name} className={styles.figure}>
                      <span className={styles.monogram} aria-hidden="true">
                        {monogram(figure.name)}
                      </span>
                      <span className={styles.figureBody}>
                        <span className={styles.figureName}>
                          {figure.name}
                          {figure.when && <span className={styles.figureWhen}>{figure.when}</span>}
                        </span>
                        <span className={styles.figureKnown}>{figure.known}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        </details>
      ))}
    </>
  );
}
