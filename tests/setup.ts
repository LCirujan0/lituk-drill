/**
 * Test setup. Runs for every file; guards against a DOM that is not there.
 *
 * The component tests share one module-level store (`adapters/store.ts`), which is correct
 * in a browser and a hazard in a test runner: state would leak between tests and the order
 * they ran in would start to matter. Each component test resets storage explicitly.
 */

import { afterEach } from 'vitest';

afterEach(async () => {
  if (typeof window === 'undefined') return;
  const { cleanup } = await import('@testing-library/react');
  cleanup();
  window.localStorage.clear();
});
