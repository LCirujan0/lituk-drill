/**
 * The sync endpoint.
 *
 *   GET  /api/events  → every event on the server
 *   POST /api/events  → push events; returns how many were new
 *
 * The whole protocol is "send everything, receive everything, union the two". That is
 * viable because the log is small — a full run of the deck is a few thousand rows — and
 * because the event id is the primary key, so a union is exact and repeating a push costs
 * nothing. Cursors and deltas would be a meaningful complication for no gain at this size;
 * if the log ever passes ~50k events this is the thing to revisit.
 *
 * Unauthenticated by decision (D-027). No pairing, one shared history. Validation here is
 * therefore about keeping the table well-formed rather than about trust: a malformed body
 * must not be able to write nonsense that later breaks a replay.
 */

import { NextResponse } from 'next/server';

import { countAll, databaseConfigured, fetchAll, insertMany, migrate } from '@/adapters/db';
import type { ReviewEvent } from '@/domain/scheduler/events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** Reject anything that would not survive a replay. */
function parseEvent(value: unknown): ReviewEvent | null {
  if (typeof value !== 'object' || value === null) return null;
  const e = value as Record<string, unknown>;

  const id = e.id;
  const factId = e.factId;
  const formIndex = e.formIndex;
  const grade = e.grade;
  const mode = e.mode;
  const at = e.at;

  if (typeof id !== 'string' || id.length === 0 || id.length > 100) return null;
  if (typeof factId !== 'string' || !/^f\d{1,6}$/.test(factId)) return null;
  if (typeof formIndex !== 'number' || !Number.isInteger(formIndex) || formIndex < 0 || formIndex > 20) return null;
  if (grade !== 0 && grade !== 3 && grade !== 4 && grade !== 5) return null;
  if (mode !== 'scheduled' && mode !== 'practice' && mode !== 'mock') return null;
  if (typeof at !== 'number' || !Number.isFinite(at) || at <= 0) return null;

  return { id, factId, formIndex, grade, mode, at };
}

/** Created lazily on first use, so a fresh database needs no separate deploy step. */
let ready: Promise<void> | null = null;
const ensureSchema = () => (ready ??= migrate());

export async function GET() {
  if (!databaseConfigured()) {
    return NextResponse.json({ error: 'sync is not configured' }, { status: 503 });
  }
  try {
    await ensureSchema();
    const events = await fetchAll();
    return NextResponse.json({ events, count: events.length });
  } catch (error) {
    ready = null; // a failed migration must not be cached as done
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!databaseConfigured()) {
    return NextResponse.json({ error: 'sync is not configured' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 });
  }

  const raw = Array.isArray(body) ? body : (body as { events?: unknown })?.events;
  if (!Array.isArray(raw)) {
    return NextResponse.json({ error: 'expected an array of events' }, { status: 400 });
  }
  if (raw.length > 20_000) {
    return NextResponse.json({ error: 'too many events in one push' }, { status: 413 });
  }

  const events: ReviewEvent[] = [];
  for (const value of raw) {
    const parsed = parseEvent(value);
    // Skip malformed entries rather than rejecting the batch: one bad row from an old
    // client should not stop a device syncing months of good history.
    if (parsed) events.push(parsed);
  }

  try {
    await ensureSchema();
    const inserted = await insertMany(events);
    return NextResponse.json({
      accepted: events.length,
      rejected: raw.length - events.length,
      inserted,
      total: await countAll(),
    });
  } catch (error) {
    ready = null;
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
