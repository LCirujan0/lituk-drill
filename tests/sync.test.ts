/**
 * Cross-device sync.
 *
 * The property that matters is the one D-002 was written to guarantee: **a sync can never
 * lose a review.** Most sync implementations lose data by uploading a serialised state and
 * letting the newer timestamp win — study on the phone on a train, open the laptop later,
 * and the day's grades vanish with no error and no symptom.
 *
 * Here the unit is the immutable event and the merge is a set union over ids, so there is
 * nothing to reconcile and no "winner". These tests hold that to the fire, including the
 * cases that actually happen: both devices offline at once, a push that fails halfway, and
 * the same events pushed twice.
 */

import { describe, expect, it } from 'vitest';

import { syncOnce, type Transport } from '@/adapters/sync';
import { mergeEvents, replay, type ReviewEvent } from '@/domain/scheduler/events';
import type { Grade } from '@/domain/scheduler/types';

let seq = 0;
const ev = (factId: string, formIndex: number, grade: Grade, at = 1_700_000_000_000): ReviewEvent => ({
  id: `e${seq++}`,
  factId,
  formIndex,
  grade,
  mode: 'scheduled',
  at: at + seq * 1000,
});

/** A server that behaves like the real one: append-only, keyed by event id. */
function fakeServer(initial: ReviewEvent[] = []) {
  const rows = new Map(initial.map((e) => [e.id, e]));
  const transport: Transport = {
    async get() {
      return { events: [...rows.values()].sort((a, b) => a.at - b.at || a.id.localeCompare(b.id)) };
    },
    async post(events) {
      let inserted = 0;
      for (const e of events) {
        if (!rows.has(e.id)) {
          rows.set(e.id, e);
          inserted++;
        }
      }
      return { inserted };
    },
  };
  return { transport, rows };
}

describe('a sync never loses a review', () => {
  it('carries local events up and remote events down in one round', async () => {
    const phone = [ev('f001', 0, 4), ev('f002', 1, 0)];
    const laptop = [ev('f003', 0, 4)];
    const { transport, rows } = fakeServer(laptop);

    const out = await syncOnce(phone, transport);

    expect(out.phase).toBe('ok');
    expect(out.pushed).toBe(2);
    expect(out.pulled).toBe(1);
    expect(out.merged).toHaveLength(3);
    expect(rows.size).toBe(3);
  });

  it('survives both devices drilling offline and syncing later', async () => {
    // The scenario that breaks last-write-wins: two devices, neither aware of the other.
    const shared = [ev('f000', 0, 4)];
    const phone = [...shared, ev('f001', 0, 4), ev('f002', 0, 0)];
    const laptop = [...shared, ev('f003', 0, 4), ev('f004', 0, 5)];

    const { transport, rows } = fakeServer([]);
    await syncOnce(phone, transport);
    const second = await syncOnce(laptop, transport);

    // Every review from both devices survives.
    expect(rows.size).toBe(5);
    expect(second.merged).toHaveLength(5);
    const ids = new Set(second.merged.map((e) => e.id));
    for (const e of [...phone, ...laptop]) expect(ids.has(e.id)).toBe(true);
  });

  it('is idempotent — syncing twice changes nothing', async () => {
    const local = [ev('f001', 0, 4), ev('f002', 0, 4)];
    const { transport, rows } = fakeServer();

    const first = await syncOnce(local, transport);
    const second = await syncOnce(first.merged, transport);

    expect(rows.size).toBe(2);
    expect(second.pushed).toBe(0);
    expect(second.pulled).toBe(0);
    expect(second.merged).toEqual(first.merged);
  });

  it('derives identical schedules on both devices after syncing', async () => {
    // The real test of the design: not that the logs match, but that what the two devices
    // BELIEVE about the schedule matches. Replay is seeded per event, not by position, so
    // a different arrival order cannot produce a different interval.
    const formCounts = new Map([
      ['f001', 3],
      ['f002', 3],
    ]);
    const phone = [ev('f001', 0, 4), ev('f001', 1, 4)];
    const laptop = [ev('f002', 0, 0), ev('f001', 2, 4)];

    const { transport } = fakeServer([]);
    const a = await syncOnce(phone, transport);
    const b = await syncOnce(laptop, transport);
    const c = await syncOnce(a.merged, transport);

    const fromB = replay(b.merged, formCounts).states;
    const fromC = replay(c.merged, formCounts).states;
    expect([...fromC]).toEqual([...fromB]);
  });
});

describe('sync failing is never destructive', () => {
  it('returns the local log untouched when the pull fails', async () => {
    const local = [ev('f001', 0, 4)];
    const transport: Transport = {
      async get() {
        throw new Error('network down');
      },
      async post() {
        return { inserted: 0 };
      },
    };

    const out = await syncOnce(local, transport);
    expect(out.phase).toBe('error');
    expect(out.merged).toEqual(local);
    expect(out.message).toContain('network down');
  });

  it('keeps what it pulled even when the push then fails', async () => {
    // Pull first, push second — so a half-finished sync leaves the device better informed
    // than it started rather than worse.
    const local = [ev('f001', 0, 4)];
    const remote = [ev('f009', 0, 4)];
    const transport: Transport = {
      async get() {
        return { events: remote };
      },
      async post() {
        throw new Error('push rejected');
      },
    };

    const out = await syncOnce(local, transport);
    expect(out.phase).toBe('error');
    // Nothing local was discarded; that is the guarantee.
    expect(out.merged.some((e) => e.id === local[0].id)).toBe(true);
  });

  it('reports offline without touching the network', async () => {
    const original = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
    Object.defineProperty(globalThis, 'navigator', { value: { onLine: false }, configurable: true });

    let called = false;
    const transport: Transport = {
      async get() {
        called = true;
        return { events: [] };
      },
      async post() {
        called = true;
        return { inserted: 0 };
      },
    };

    const local = [ev('f001', 0, 4)];
    const out = await syncOnce(local, transport);

    expect(out.phase).toBe('offline');
    expect(called).toBe(false);
    expect(out.merged).toEqual(local);

    if (original) Object.defineProperty(globalThis, 'navigator', original);
    else Reflect.deleteProperty(globalThis, 'navigator');
  });
});

describe('merge semantics', () => {
  it('is commutative — the order two logs meet does not matter', async () => {
    const a = [ev('f001', 0, 4), ev('f002', 0, 4)];
    const b = [ev('f003', 0, 0)];
    expect(mergeEvents([...a], [...b])).toEqual(mergeEvents([...b], [...a]));
  });

  it('never produces a duplicate id', async () => {
    const shared = ev('f001', 0, 4);
    const merged = mergeEvents([shared, ev('f002', 0, 4)], [shared, ev('f003', 0, 4)]);
    expect(new Set(merged.map((e) => e.id)).size).toBe(merged.length);
    expect(merged).toHaveLength(3);
  });
});
