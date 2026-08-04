/**
 * Importing v0's accumulated schedule — S6.
 *
 * v0 stores derived scheduler state under `localStorage['lituk.v2']` and keeps no event
 * history, so there is nothing to replay. That is a genuine seam: imported facts arrive
 * with a schedule but no reviewable past, so anything that reasons over history — the
 * mistakes drill, the readiness model — treats them as evidence-light until they are
 * reviewed again in v1.
 *
 * This module only READS v0's key. It never writes to it. v0 stays deployed and in daily
 * use, and a corrupted v0 store would take the fallback with it (R-1, D-022).
 *
 * v1 runs on a different origin from v0, so in normal use this finds nothing — browser
 * storage is per-origin. It works when both are served from the same origin, and exists so
 * that switching over never silently starts from zero.
 */

import { importV0State, type V0SavedState } from '@/domain/scheduler/events';
import { factId } from '@/domain/deck/types';
import type { FactState } from '@/domain/scheduler/types';

export const V0_KEY = 'lituk.v2';

export interface V0ImportResult {
  readonly found: boolean;
  readonly states: Map<string, FactState>;
  /** Facts in the v0 store that no longer exist in the deck; skipped rather than guessed at. */
  readonly skipped: number;
}

export function readV0Progress(
  formCounts: ReadonlyMap<string, number>,
  storage?: Storage,
): V0ImportResult {
  const backing = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  const empty: V0ImportResult = { found: false, states: new Map(), skipped: 0 };
  if (!backing) return empty;

  let raw: string | null = null;
  try {
    raw = backing.getItem(V0_KEY);
  } catch {
    return empty;
  }
  if (!raw) return empty;

  let saved: V0SavedState;
  try {
    saved = JSON.parse(raw) as V0SavedState;
  } catch {
    return empty;
  }
  if (!saved || typeof saved !== 'object' || typeof saved.f !== 'object') return empty;

  const states = importV0State(saved, factId, formCounts);
  const offered = Object.keys(saved.f ?? {}).length;

  return { found: states.size > 0, states, skipped: Math.max(0, offered - states.size) };
}
