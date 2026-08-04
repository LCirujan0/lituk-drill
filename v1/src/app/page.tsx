/**
 * The skeleton page. Milestone 1 has no interface by design (D-019) — this exists to
 * prove the thing builds, deploys, and renders real data from the migrated deck rather
 * than a placeholder. The drill screens come with the thesis features.
 */

import { DECK, TOTAL_FACTS, TOTAL_FORMS } from '@/domain/deck';
import { analyseDeck } from '@/domain/deck/analysis';
import { CHAPTER_NAMES, type Chapter } from '@/domain/deck/types';
import { MIGRATED_DECK } from '@/domain/deck';
import styles from './page.module.css';

export default function Home() {
  const analysis = analyseDeck(DECK, MIGRATED_DECK);
  const chapters = new Map<Chapter, number>();
  for (const fact of DECK) chapters.set(fact.chapter, (chapters.get(fact.chapter) ?? 0) + 1);

  return (
    <div className="wrap">
      <header className={styles.header}>
        <h1>Life in the UK</h1>
        <p className={styles.sub}>
          {TOTAL_FACTS} facts · {TOTAL_FORMS} question forms
        </p>
      </header>

      <section className={styles.card} aria-labelledby="deck-heading">
        <h2 id="deck-heading" className={styles.heading}>
          The deck
        </h2>
        <dl className={styles.list}>
          {[...chapters]
            .sort((a, b) => b[1] - a[1])
            .map(([chapter, count]) => (
              <div key={chapter} className={styles.row}>
                <dt>{CHAPTER_NAMES[chapter]}</dt>
                <dd>{count}</dd>
              </div>
            ))}
        </dl>
      </section>

      <section className={styles.card} aria-labelledby="integrity-heading">
        <h2 id="integrity-heading" className={styles.heading}>
          Content integrity
        </h2>
        <dl className={styles.list}>
          <div className={styles.row}>
            <dt>Structural faults</dt>
            <dd>{analysis.structuralFaults.length}</dd>
          </div>
          <div className={styles.row}>
            <dt>Facts awaiting a check against the book</dt>
            <dd>{analysis.unresolvedVerifyFlags.length}</dd>
          </div>
          <div className={styles.row}>
            <dt>Numeric answer is a middle value</dt>
            <dd>{(analysis.numericMiddleRank.rate * 100).toFixed(1)}%</dd>
          </div>
        </dl>
        <p className={styles.note}>
          Chance would be 50%. Until that figure comes down, a multiple-choice score is
          measuring the shape of the options rather than the material.
        </p>
      </section>
    </div>
  );
}
