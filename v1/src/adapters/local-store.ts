/**
 * Local persistence for the review-event log.
 *
 * The only adapter the app currently has. It sits behind a plain interface so that adding
 * the Postgres sync (D-002) means writing a second implementation and merging the two logs
 * — not rewriting anything above this line. Merging is a set union over event ids, which is
 * commutative and idempotent, so a sync can never lose a grade.
 *
 * Everything here is browser-only and must degrade rather than throw: Safari can refuse
 * `localStorage` in private mode, and quota errors are real. Losing the ability to record a
 * review is bad; crashing the drill screen mid-session is worse.
 */

import type { ReviewEvent } from '@/domain/scheduler/events';
import { mergeEvents } from '@/domain/scheduler/events';

/** v1's own key. v0 keeps its schedule under `lituk.v2`, and must not be touched. */
export const EVENTS_KEY = 'lituk.v1.events';
export const SETTINGS_KEY = 'lituk.v1.settings';

export interface Settings {
  readonly newPerDay: number;
  readonly maxReviews: number;
}

export const DEFAULT_SETTINGS: Settings = { newPerDay: 20, maxReviews: 120 };

export interface EventStore {
  load(): ReviewEvent[];
  append(event: ReviewEvent): ReviewEvent[];
  replaceAll(events: readonly ReviewEvent[]): ReviewEvent[];
  clear(): void;
  loadSettings(): Settings;
  saveSettings(settings: Settings): void;
}

/** Generate an id unique across devices, so two logs can merge without collision. */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  // Only reached on very old engines. Random enough for a single user's two devices.
  return `e-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function isEvent(value: unknown): value is ReviewEvent {
  if (typeof value !== 'object' || value === null) return false;
  const e = value as Record<string, unknown>;
  return (
    typeof e.id === 'string' &&
    typeof e.factId === 'string' &&
    typeof e.formIndex === 'number' &&
    typeof e.grade === 'number' &&
    typeof e.at === 'number' &&
    (e.mode === 'scheduled' || e.mode === 'practice' || e.mode === 'mock')
  );
}

/**
 * A store backed by `localStorage`, or by nothing at all when it is unavailable.
 *
 * The in-memory fallback keeps the app usable in private mode for the length of a session
 * rather than showing an error screen. It loses everything on reload, which is bad — but a
 * session that works and warns beats a session that refuses to start.
 */
export function localEventStore(storage?: Storage): EventStore {
  const backing =
    storage ?? (typeof window !== 'undefined' ? safeStorage() : undefined);

  let memory: ReviewEvent[] = [];
  let memorySettings: Settings = DEFAULT_SETTINGS;

  const read = (): ReviewEvent[] => {
    if (!backing) return memory;
    try {
      const raw = backing.getItem(EVENTS_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      // Filter rather than reject: one malformed entry must not cost the whole history.
      return Array.isArray(parsed) ? parsed.filter(isEvent) : [];
    } catch {
      return [];
    }
  };

  const write = (events: readonly ReviewEvent[]): ReviewEvent[] => {
    const next = [...events];
    if (!backing) {
      memory = next;
      return next;
    }
    try {
      backing.setItem(EVENTS_KEY, JSON.stringify(next));
    } catch {
      // Quota exceeded or storage refused. Keep going in memory for this session.
      memory = next;
    }
    return next;
  };

  return {
    load: read,
    append: (event) => write([...read(), event]),
    replaceAll: (events) => write(mergeEvents([...events])),
    clear: () => {
      memory = [];
      try {
        backing?.removeItem(EVENTS_KEY);
      } catch {
        /* nothing useful to do */
      }
    },
    loadSettings: () => {
      if (!backing) return memorySettings;
      try {
        const raw = backing.getItem(SETTINGS_KEY);
        if (!raw) return DEFAULT_SETTINGS;
        const parsed = JSON.parse(raw) as Partial<Settings>;
        return {
          newPerDay: typeof parsed.newPerDay === 'number' ? parsed.newPerDay : DEFAULT_SETTINGS.newPerDay,
          maxReviews: typeof parsed.maxReviews === 'number' ? parsed.maxReviews : DEFAULT_SETTINGS.maxReviews,
        };
      } catch {
        return DEFAULT_SETTINGS;
      }
    },
    saveSettings: (settings) => {
      memorySettings = settings;
      try {
        backing?.setItem(SETTINGS_KEY, JSON.stringify(settings));
      } catch {
        /* nothing useful to do */
      }
    },
  };
}

function safeStorage(): Storage | undefined {
  try {
    const probe = '__lituk_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return undefined;
  }
}

/** True when persistence is genuinely unavailable, so the UI can say so honestly. */
export function storageAvailable(): boolean {
  return typeof window !== 'undefined' && safeStorage() !== undefined;
}
