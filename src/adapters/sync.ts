'use client';

/**
 * Cross-device sync, client side.
 *
 * The protocol is deliberately the dullest one that works: **push everything local, pull
 * everything remote, union the two.** No cursors, no deltas, no conflict resolution.
 *
 * It works because of D-002's shape. Events are immutable and identified, so a union is
 * exact and repeating a push is free. There is nothing to reconcile because nothing is ever
 * updated — the schedule is *derived* from the union, so two devices that both drilled
 * offline simply end up with a longer history and identical derived state. Replay is seeded
 * per event rather than by position (rng.ts), which is what makes that last part true.
 *
 * The failure this avoids is worth naming, because it is what most sync implementations do:
 * uploading a serialised scheduler state and letting the newer timestamp win. Study on the
 * phone on a train, open the laptop later, and the day's grades vanish with no error and no
 * symptom. That is the outcome D-002 was written to make impossible, and it is why the log
 * is the unit of sync rather than the state.
 */

import { mergeEvents, type ReviewEvent } from '@/domain/scheduler/events';

export const SYNC_ENDPOINT = '/api/events';

export type SyncPhase = 'idle' | 'syncing' | 'ok' | 'offline' | 'error';

export interface SyncOutcome {
  readonly phase: SyncPhase;
  /** Events that were on the server and not here. */
  readonly pulled: number;
  /** Events that were here and new to the server. */
  readonly pushed: number;
  readonly merged: readonly ReviewEvent[];
  readonly message?: string;
}

/** Injected so the merge logic can be tested without a network. */
export interface Transport {
  get(): Promise<{ events: ReviewEvent[] }>;
  post(events: readonly ReviewEvent[]): Promise<{ inserted: number }>;
}

const httpTransport: Transport = {
  async get() {
    const res = await fetch(SYNC_ENDPOINT, { cache: 'no-store' });
    if (!res.ok) throw new Error(`pull failed: ${res.status}`);
    return (await res.json()) as { events: ReviewEvent[] };
  },
  async post(events) {
    const res = await fetch(SYNC_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ events }),
    });
    if (!res.ok) throw new Error(`push failed: ${res.status}`);
    return (await res.json()) as { inserted: number };
  },
};

/**
 * One sync round: pull, push, union.
 *
 * Pull happens first so that a push failure still leaves the device better informed than it
 * started. Nothing local is ever discarded, so an interrupted sync is never destructive —
 * the worst outcome is that it has to run again.
 */
export async function syncOnce(
  local: readonly ReviewEvent[],
  transport: Transport = httpTransport,
): Promise<SyncOutcome> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return { phase: 'offline', pulled: 0, pushed: 0, merged: local };
  }

  try {
    const { events: remote } = await transport.get();

    const localIds = new Set(local.map((e) => e.id));
    const remoteIds = new Set(remote.map((e) => e.id));

    const pulled = remote.filter((e) => !localIds.has(e.id)).length;
    const toPush = local.filter((e) => !remoteIds.has(e.id));

    const merged = mergeEvents([...local], [...remote]);

    let pushed = 0;
    if (toPush.length) {
      const result = await transport.post(toPush);
      pushed = result.inserted;
    }

    return { phase: 'ok', pulled, pushed, merged };
  } catch (error) {
    // Sync failing must never cost a review. The local log is returned untouched and the
    // app carries on offline — which is the normal state on a train, not an exception.
    return {
      phase: 'error',
      pulled: 0,
      pushed: 0,
      merged: local,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
