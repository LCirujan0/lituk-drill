'use client';

/**
 * Register the service worker, in production only.
 *
 * Not in development, deliberately. A service worker that caches aggressively is exactly what
 * you want on a phone in a tunnel and exactly what you do not want while editing — the classic
 * hour is spent wondering why a change is not appearing, when the answer is that it did and
 * something is serving yesterday's chunk.
 *
 * Nothing waits on this and nothing breaks without it. Registration failing means no offline
 * support, not a broken app, so it is caught and ignored rather than surfaced.
 */

import { useEffect } from 'react';

export function RegisterServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }, []);

  return null;
}
