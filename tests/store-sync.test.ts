// @vitest-environment jsdom

/**
 * Sync as the app actually runs it.
 *
 * `sync.test.ts` proves the merge algebra against an injected transport. This file proves
 * the wiring: the store really calls it, really writes what comes back to `localStorage`,
 * and — the part that is easy to get wrong — really does not destroy a grade that arrives
 * while a round is in flight.
 *
 * That last one is the whole reason this file exists. The obvious implementation captures
 * the log at the start of a round and writes the round's own merge back at the end. Answer a
 * card while the round is in the air and that write silently deletes it: last-write-wins
 * data loss, reintroduced from the inside, in the one design D-002 chose specifically to
 * make it impossible. It has no error and no symptom, which is why it needs a test rather
 * than a reading.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { EVENTS_KEY, newEventId } from '@/adapters/local-store';
import { appendEvent, getSnapshot, reloadFromStorage, subscribe, sync } from '@/adapters/store';
import { compareEvents, type ReviewEvent } from '@/domain/scheduler/events';

let seq = 0;
const ev = (factId = 'f001', formIndex = 0): ReviewEvent => ({
  id: `e-${seq++}`,
  factId,
  formIndex,
  grade: 4,
  mode: 'scheduled',
  at: 1_700_000_000_000 + seq * 1000,
});

/**
 * A server behind `fetch`, with a gate.
 *
 * The gate is what makes the mid-flight cases testable at all: hold it, and a round stops
 * inside its own network call for exactly as long as the test needs to do something behind
 * its back.
 */
function fakeServer(initial: readonly ReviewEvent[] = []) {
  const rows = new Map(initial.map((e) => [e.id, e]));
  let started = 0;
  let posts = 0;
  let gate: { promise: Promise<void>; open: () => void } | null = null;

  const reply = (body: unknown) =>
    ({ ok: true, status: 200, json: async () => body }) as unknown as Response;

  vi.stubGlobal('fetch', async (_url: unknown, init?: RequestInit): Promise<Response> => {
    started++;
    if (gate) await gate.promise;

    if (init?.method === 'POST') {
      posts++;
      const body = JSON.parse(String(init.body)) as { events: ReviewEvent[] };
      let inserted = 0;
      for (const e of body.events) {
        if (!rows.has(e.id)) {
          rows.set(e.id, e);
          inserted++;
        }
      }
      return reply({ inserted });
    }

    return reply({ events: [...rows.values()].sort(compareEvents) });
  });

  return {
    rows,
    get started() {
      return started;
    },
    get posts() {
      return posts;
    },
    hold() {
      let open!: () => void;
      const promise = new Promise<void>((resolve) => {
        open = resolve;
      });
      gate = { promise, open };
    },
    release() {
      const held = gate;
      gate = null;
      held?.open();
    },
  };
}

/** Let anything already queued as a microtask run. */
const settle = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const stored = (): ReviewEvent[] => JSON.parse(window.localStorage.getItem(EVENTS_KEY) ?? '[]');

beforeEach(() => {
  window.localStorage.clear();
  reloadFromStorage();
});

afterEach(() => {
  vi.stubGlobal('fetch', () => Promise.reject(new Error('network disabled in tests')));
});

describe('a round brings both logs together', () => {
  it('pulls the other device work down and writes it to storage', async () => {
    const remote = [ev('f001'), ev('f002')];
    const server = fakeServer(remote);

    await sync();

    expect(getSnapshot().sync).toBe('ok');
    expect(getSnapshot().syncedAt).toBeGreaterThan(0);
    expect(getSnapshot().events).toHaveLength(2);
    // In the snapshot is not enough — a reload has to find them too.
    expect(stored().map((e) => e.id).sort()).toEqual(remote.map((e) => e.id).sort());
    expect(server.rows.size).toBe(2);
  });

  it('pushes local work up', async () => {
    const mine = ev('f003');
    window.localStorage.setItem(EVENTS_KEY, JSON.stringify([mine]));
    reloadFromStorage();
    const server = fakeServer();

    await sync();

    expect(server.rows.has(mine.id)).toBe(true);
    expect(getSnapshot().events).toHaveLength(1);
  });

  it('is a union, not a winner — neither side loses anything', async () => {
    const mine = ev('f001');
    const theirs = ev('f002');
    window.localStorage.setItem(EVENTS_KEY, JSON.stringify([mine]));
    reloadFromStorage();
    const server = fakeServer([theirs]);

    await sync();

    expect(stored().map((e) => e.id).sort()).toEqual([mine.id, theirs.id].sort());
    expect(server.rows.size).toBe(2);
  });
});

describe('a grade recorded mid-sync is never lost — regression', () => {
  it('keeps a review that lands while a round is in the air', async () => {
    // The server has something we do not, so the round WILL write back — which is the only
    // condition under which the losing version of this code loses anything.
    const theirs = ev('f002');
    const server = fakeServer([theirs]);

    server.hold();
    const round = sync();
    await settle(); // the round is now parked inside its own GET

    const mine = ev('f001');
    appendEvent(mine); // the card answered while it was in the air

    server.release();
    await round;

    // Both, in memory and on disk. Writing the round's own view of the log over the top
    // would have deleted `mine` with no error and no symptom.
    expect(getSnapshot().events.map((e) => e.id).sort()).toEqual([mine.id, theirs.id].sort());
    expect(stored().map((e) => e.id).sort()).toEqual([mine.id, theirs.id].sort());
  });

  it('still gets that review to the server', async () => {
    // The last grade of a session is the case that matters: it fires a sync while the
    // previous round is running, so it is dropped — and without a trailing round nothing
    // else ever happens. Put the phone down, open the laptop, and the final card is missing.
    const server = fakeServer([ev('f002')]);

    server.hold();
    const round = sync();
    await settle();

    const mine = ev('f001');
    appendEvent(mine);

    server.release();
    await round;

    expect(server.rows.has(mine.id)).toBe(true);
  });
});

describe('rounds never overlap', () => {
  it('drops a concurrent call rather than running two at once', async () => {
    const server = fakeServer();

    server.hold();
    const first = sync();
    const second = sync();
    await settle();

    // One network call in flight, not two.
    expect(server.started).toBe(1);

    server.release();
    await Promise.all([first, second]);
  });
});

describe('a failed sync costs nothing', () => {
  it('leaves the local log alone and says what happened', async () => {
    const mine = ev('f001');
    window.localStorage.setItem(EVENTS_KEY, JSON.stringify([mine]));
    reloadFromStorage();
    vi.stubGlobal('fetch', () => Promise.reject(new Error('network down')));

    await sync();

    expect(getSnapshot().sync).toBe('error');
    expect(getSnapshot().syncedAt).toBeNull();
    expect(stored()).toHaveLength(1);
    expect(getSnapshot().events[0].id).toBe(mine.id);
  });

  it('reports offline without reaching for the network at all', async () => {
    const server = fakeServer();
    const original = Object.getOwnPropertyDescriptor(window.navigator, 'onLine');
    Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });

    await sync();

    expect(getSnapshot().sync).toBe('offline');
    expect(server.started).toBe(0);

    if (original) Object.defineProperty(window.navigator, 'onLine', original);
    else Reflect.deleteProperty(window.navigator, 'onLine');
  });
});

describe('the store syncs without being asked', () => {
  it('starts a round as soon as anything subscribes', async () => {
    const theirs = ev('f004');
    fakeServer([theirs]);

    const unsubscribe = subscribe(() => {});
    await vi.waitFor(() => expect(getSnapshot().events).toHaveLength(1));
    unsubscribe();

    expect(getSnapshot().events[0].id).toBe(theirs.id);
  });

  it('starts a round when the tab becomes visible again', async () => {
    const server = fakeServer();
    const unsubscribe = subscribe(() => {});
    await vi.waitFor(() => expect(getSnapshot().sync).toBe('ok'));
    const before = server.started;

    document.dispatchEvent(new Event('visibilitychange'));
    await vi.waitFor(() => expect(server.started).toBeGreaterThan(before));

    unsubscribe();
  });

  it('starts a round after a grade', async () => {
    const server = fakeServer();
    const mine: ReviewEvent = { ...ev('f005'), id: newEventId() };

    appendEvent(mine);
    await vi.waitFor(() => expect(server.rows.has(mine.id)).toBe(true));
  });
});
