'use client';

/**
 * The app's external store — one subscribable source of truth for the whole UI.
 *
 * React reads this through `useSyncExternalStore` rather than loading into state inside an
 * effect. Three reasons, in ascending order of importance:
 *
 *   1. It is what the API is for. Browser storage is external mutable state, and an effect
 *      that copies it into component state is a cache that can go stale.
 *   2. It renders correctly on the server. `getServerSnapshot` returns an empty log, so the
 *      first paint is deterministic instead of reaching for `localStorage` that is not there.
 *   3. **It is the shape cross-device sync needs.** When the Postgres adapter (D-002) lands,
 *      a pull merges remote events into this store and calls `emit()`. Every screen updates,
 *      because every screen is already a projection of this snapshot. Nothing above this
 *      line has to know that sync exists.
 *
 * `today` lives here too. Reading the clock during render is impure — the same render could
 * produce different output — so the day number is captured here and refreshed when the tab
 * becomes visible again, which is when a phone left overnight actually needs it.
 */

import { dayNumber, mergeEvents, type ReviewEvent } from '@/domain/scheduler/events';
import {
  DEFAULT_SETTINGS,
  localEventStore,
  storageAvailable,
  type EventStore,
  type Settings,
} from './local-store';

export interface Snapshot {
  readonly events: readonly ReviewEvent[];
  readonly settings: Settings;
  readonly today: number;
  readonly persistent: boolean;
  readonly loaded: boolean;
}

const EMPTY: Snapshot = {
  events: [],
  settings: DEFAULT_SETTINGS,
  today: 0,
  persistent: true,
  loaded: false,
};

let backing: EventStore | null = null;
let snapshot: Snapshot = EMPTY;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

/** Snapshots are replaced, never mutated, so `useSyncExternalStore` can compare by identity. */
function set(patch: Partial<Snapshot>) {
  snapshot = { ...snapshot, ...patch };
  emit();
}

function ensureLoaded() {
  if (backing || typeof window === 'undefined') return;
  backing = localEventStore();
  snapshot = {
    events: backing.load(),
    settings: backing.loadSettings(),
    today: dayNumber(Date.now()),
    persistent: storageAvailable(),
    loaded: true,
  };
}

/**
 * Re-read everything from storage and notify.
 *
 * Needed whenever the underlying store changed without going through `appendEvent` — a
 * restore, another tab writing, and eventually a sync pull. Tests use it to reset the
 * module-level state between cases, which is the honest way to handle a singleton rather
 * than adding a test-only back door.
 */
export function reloadFromStorage() {
  backing = null;
  snapshot = EMPTY;
  ensureLoaded();
  emit();
}

export function subscribe(listener: () => void): () => void {
  ensureLoaded();
  listeners.add(listener);

  // A phone left on the drill screen overnight must not keep yesterday's due list.
  const onVisible = () => {
    if (document.visibilityState !== 'visible') return;
    const now = dayNumber(Date.now());
    if (now !== snapshot.today) set({ today: now });
  };
  document.addEventListener('visibilitychange', onVisible);

  return () => {
    listeners.delete(listener);
    document.removeEventListener('visibilitychange', onVisible);
  };
}

export const getSnapshot = (): Snapshot => snapshot;

/** The server has no storage and no clock the client shares. Render the empty state. */
export const getServerSnapshot = (): Snapshot => EMPTY;

export function appendEvent(event: ReviewEvent) {
  ensureLoaded();
  if (!backing) return;
  set({ events: backing.append(event) });
}

/** Merge a batch in — used by the v0 import today, and by sync when it lands. */
export function mergeIn(events: readonly ReviewEvent[]) {
  ensureLoaded();
  if (!backing) return;
  set({ events: backing.replaceAll(mergeEvents([...snapshot.events], [...events])) });
}

export function saveSettings(settings: Settings) {
  ensureLoaded();
  backing?.saveSettings(settings);
  set({ settings });
}

export function eraseAll() {
  ensureLoaded();
  backing?.clear();
  set({ events: [] });
}
