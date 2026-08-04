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
 *   3. **It is the shape cross-device sync needs.** Sync is wired in below and needed no
 *      change above this line: every screen is already a projection of this snapshot, so a
 *      pull that merges events in updates all of them by emitting once.
 *
 * `today` lives here too. Reading the clock during render is impure — the same render could
 * produce different output — so the day number is captured here and refreshed when the tab
 * becomes visible again, which is when a phone left overnight actually needs it.
 */

import { dayNumber, mergeEvents, type ReviewEvent } from '@/domain/scheduler/events';
import { syncOnce, type SyncPhase } from './sync';
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
  /** Where the last sync attempt got to. Display only — nothing waits on it. */
  readonly sync: SyncPhase;
  /** Epoch ms of the last sync that reached the server, or null if none has. */
  readonly syncedAt: number | null;
}

const EMPTY: Snapshot = {
  events: [],
  settings: DEFAULT_SETTINGS,
  today: 0,
  persistent: true,
  loaded: false,
  sync: 'idle',
  syncedAt: null,
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
    sync: 'idle',
    syncedAt: null,
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

/**
 * One sync round: pull, push, union. Never awaited by anything on the answering path.
 *
 * Two module-level flags rather than one, and the second is load-bearing. `syncing` drops a
 * call that arrives while a round is in flight, so two rounds never race — but dropping it
 * outright would strand whatever caused it. The last grade of a session is the case that
 * matters: it fires a sync while the previous one is still running, gets dropped, and then
 * nothing else happens until the app is next opened — study on the phone, put it down, open
 * the laptop, and the final card is missing. `queued` makes the dropped call a trailing one
 * instead, so a round always follows the last event that asked for it.
 *
 * **The merge is against `snapshot.events` as it stands when the round finishes, not as it
 * was when the round started.** A grade recorded mid-flight is already in `localStorage`;
 * writing the round's own view of the log over it would delete that grade — the exact
 * last-write-wins loss D-002 exists to make impossible, reintroduced from the inside.
 */
let syncing = false;
let queued = false;

export async function sync(): Promise<void> {
  ensureLoaded();
  if (!backing) return;
  if (syncing) {
    queued = true;
    return;
  }

  syncing = true;
  set({ sync: 'syncing' });
  try {
    const outcome = await syncOnce(snapshot.events);

    if (outcome.phase === 'ok') {
      const merged = mergeEvents([...snapshot.events], [...outcome.merged]);
      if (merged.length !== snapshot.events.length) {
        set({ events: backing.replaceAll(merged) });
      }
      set({ sync: 'ok', syncedAt: Date.now() });
    } else {
      set({ sync: outcome.phase });
    }
  } finally {
    syncing = false;
  }

  if (queued) {
    queued = false;
    await sync();
  }
}

export function subscribe(listener: () => void): () => void {
  ensureLoaded();
  // Whatever the other device did while this one was closed arrives before the first card.
  void sync();
  listeners.add(listener);

  // A phone left on the drill screen overnight must not keep yesterday's due list — and it
  // is also the moment the other device's work is most likely to be waiting.
  const onVisible = () => {
    if (document.visibilityState !== 'visible') return;
    const now = dayNumber(Date.now());
    if (now !== snapshot.today) set({ today: now });
    void sync();
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
  // Fire and forget. The grade is already durable locally; the network is never on the path
  // between pressing an option and seeing the verdict.
  void sync();
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
