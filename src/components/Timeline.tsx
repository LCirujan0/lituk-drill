'use client';

/**
 * The chronology — S9, ported from v0 (D-016).
 *
 * Deliberately not scheduled and not scored. Its value is being read end to end: knowing
 * roughly where in the story something sits answers most history questions on its own, and
 * that is a different cognitive tool from the same material broken into 208 individually
 * scheduled cards.
 */

import { TIMELINE } from '@/data/timeline';
import styles from './Timeline.module.css';

export function Timeline() {
  return (
    <>
      <header className={styles.bar}>
        <h1 className={styles.title}>The spine</h1>
      </header>

      <section className={styles.intro}>
        <p>
          Do not memorise dates — memorise the <b>sequence</b>, then hang dates on it. Nearly
          every history question is answerable if you know roughly where in the story something
          sits. The marked entries are the ones worth knowing cold.
        </p>
        <p className={styles.drill}>
          <b>Drill:</b> cover the screen and say the ten eras aloud in under two minutes. Once a
          day for a week and it is permanent.
        </p>
      </section>

      {TIMELINE.map((era) => (
        <section key={era.name} className={styles.era} aria-labelledby={`era-${era.name}`}>
          <h2 id={`era-${era.name}`} className={styles.eraName}>{era.name}</h2>
          <ol className={styles.events}>
            {era.events.map((event) => (
              <li key={`${event.year}-${event.title}`} className={event.major ? styles.eventMajor : styles.event}>
                <span className={styles.year}>{event.year}</span>
                <span className={styles.eventTitle}>{event.title}</span>
                {event.detail && <span className={styles.detail}>{event.detail}</span>}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </>
  );
}
