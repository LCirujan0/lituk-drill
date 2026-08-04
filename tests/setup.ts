/**
 * Test setup. Runs for every file; guards against a DOM that is not there.
 *
 * The component tests share one module-level store (`adapters/store.ts`), which is correct
 * in a browser and a hazard in a test runner: state would leak between tests and the order
 * they ran in would start to matter. Each component test resets storage explicitly.
 *
 * **Network is stubbed, not merely unused.** The store kicks off a sync as soon as anything
 * subscribes, which is right on a phone and wrong in a test — a real `fetch` would reach for
 * a server that is not running, and 22 tests spent twenty seconds discovering that. The stub
 * rejects immediately, which is exactly the path a device with no signal takes, so the tests
 * exercise the offline behaviour rather than avoiding it.
 *
 * A test that wants to exercise sync injects its own transport (see `sync.test.ts`); nothing
 * needs the global.
 */

import { afterEach, beforeAll, vi } from 'vitest';

beforeAll(() => {
  if (typeof window === 'undefined') return;
  vi.stubGlobal('fetch', () => Promise.reject(new Error('network disabled in tests')));
});

afterEach(async () => {
  if (typeof window === 'undefined') return;
  const { cleanup } = await import('@testing-library/react');
  cleanup();
  window.localStorage.clear();
});
