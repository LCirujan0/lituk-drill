'use client';

/**
 * Is the explainer there at all?
 *
 * Screening condition 5 is that the app works with no network and no key, and that the button
 * is **absent rather than broken**. The key is a server secret, so the client cannot read it
 * — it asks once, on mount, and treats every unhappy answer the same way: unavailable.
 *
 * A rejected fetch is the offline case and the no-server case, and it is also what
 * `tests/setup.ts` produces deliberately, so component tests get no button without having to
 * stub anything. That is the right default: a card must never depend on this having resolved.
 */

import { useEffect, useState } from 'react';

export function useExplainAvailable(): boolean {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let live = true;
    fetch('/api/explain')
      .then((r) => (r.ok ? r.json() : { available: false }))
      .then((body: { available?: unknown }) => {
        if (live) setAvailable(body?.available === true);
      })
      .catch(() => {
        // Offline, no server, or the stubbed fetch in tests. All mean the same thing.
      });
    return () => {
      live = false;
    };
  }, []);

  return available;
}
