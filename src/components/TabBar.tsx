'use client';

/**
 * The bottom tab bar.
 *
 * Three tabs rather than one screen with a Back button, because Progress and the chronology
 * are places you go *to*, not detours off the drill. Putting them behind Back made every
 * visit a round trip through the home screen and made the home screen carry two links it did
 * not need.
 *
 * It is hidden while a card is on screen. A drill is the one place where a stray tap costs
 * something — losing your place mid-question — and where the bottom of the screen is spoken
 * for by the card's own actions.
 */

import styles from './TabBar.module.css';

export type Tab = 'drill' | 'progress' | 'timeline';

const TABS: readonly { id: Tab; icon: string; label: string }[] = [
  { id: 'drill', icon: '◎', label: 'Drill' },
  { id: 'progress', icon: '▤', label: 'Progress' },
  { id: 'timeline', icon: '⌛', label: 'Timeline' },
];

export function TabBar({ current, onChange }: { current: Tab; onChange: (tab: Tab) => void }) {
  return (
    <nav className={styles.bar} aria-label="Sections">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={current === tab.id ? styles.tabOn : styles.tab}
          onClick={() => onChange(tab.id)}
          aria-current={current === tab.id ? 'page' : undefined}
        >
          <span className={styles.icon} aria-hidden="true">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
