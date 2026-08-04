import { neon } from '@neondatabase/serverless';

import type { ReviewEvent } from '@/domain/scheduler/events';

/**
 * The Postgres side of cross-device sync.
 *
 * Server-only. Nothing here is imported by a client component — the connection string must
 * never reach the browser bundle.
 *
 * THE TABLE IS APPEND-ONLY AND THE PRIMARY KEY IS THE EVENT ID. That one choice does most
 * of the work: pushing the same event twice is a no-op, two devices that both recorded a
 * review cannot collide, and a merge is a set union rather than a decision about who wins.
 * There is no "last write" and so no last-write-wins data loss — the failure mode D-002 was
 * written to avoid.
 *
 * ONE SHARED STORE, NO PAIRING (D-027). There is no owner column and no authentication: the
 * app has exactly one history and every visitor sees it. That was the owner's explicit
 * choice over a pairing code. The consequence is that the endpoint is public — anyone who
 * finds it can read which citizenship facts were answered wrongly, and can append junk.
 * Append-only semantics and the client keeping its own authoritative copy make that
 * recoverable rather than destructive.
 */

/**
 * Read lazily, not at module scope. Captured at import time it would be undefined whenever
 * something loads this before the environment is populated — which is exactly what happened
 * the first time this ran from a script.
 */
const connectionString = (): string | undefined =>
  process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

export const databaseConfigured = (): boolean => Boolean(connectionString());

function sql() {
  const url = connectionString();
  if (!url) throw new Error('DATABASE_URL is not set');
  return neon(url);
}

/**
 * Idempotent and additive, per the BRIEF's migration rule. Safe to run on every deploy and
 * safe to run twice; it never drops or rewrites anything.
 */
export async function migrate(): Promise<void> {
  const q = sql();
  await q`
    CREATE TABLE IF NOT EXISTS review_events (
      id          TEXT PRIMARY KEY,
      fact_id     TEXT        NOT NULL,
      form_index  INTEGER     NOT NULL,
      grade       INTEGER     NOT NULL,
      mode        TEXT        NOT NULL,
      at          BIGINT      NOT NULL,
      received_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  // Pulls are ordered by client time; the index keeps that cheap as the log grows.
  await q`CREATE INDEX IF NOT EXISTS review_events_at_idx ON review_events (at)`;
}

export async function fetchAll(): Promise<ReviewEvent[]> {
  const rows = (await sql()`
    SELECT id, fact_id, form_index, grade, mode, at
    FROM review_events
    ORDER BY at ASC, id ASC
  `) as Record<string, unknown>[];

  return rows.map((r) => ({
    id: String(r.id),
    factId: String(r.fact_id),
    formIndex: Number(r.form_index),
    grade: Number(r.grade) as ReviewEvent['grade'],
    mode: String(r.mode) as ReviewEvent['mode'],
    at: Number(r.at),
  }));
}

/**
 * Insert events, ignoring any already present.
 *
 * `ON CONFLICT DO NOTHING` on the event id is what makes a push safe to repeat and safe to
 * race: the same review sent twice, or sent by two devices at once, lands once.
 */
export async function insertMany(events: readonly ReviewEvent[]): Promise<number> {
  if (!events.length) return 0;
  const q = sql();

  // Chunked so a large first sync does not build one enormous statement.
  const CHUNK = 500;
  let inserted = 0;

  for (let i = 0; i < events.length; i += CHUNK) {
    const batch = events.slice(i, i + CHUNK);
    const rows = (await q`
      INSERT INTO review_events (id, fact_id, form_index, grade, mode, at)
      SELECT * FROM UNNEST(
        ${batch.map((e) => e.id)}::text[],
        ${batch.map((e) => e.factId)}::text[],
        ${batch.map((e) => e.formIndex)}::int[],
        ${batch.map((e) => e.grade)}::int[],
        ${batch.map((e) => e.mode)}::text[],
        ${batch.map((e) => String(e.at))}::bigint[]
      )
      ON CONFLICT (id) DO NOTHING
      RETURNING id
    `) as unknown[];
    inserted += rows.length;
  }

  return inserted;
}

export async function countAll(): Promise<number> {
  const rows = (await sql()`SELECT count(*)::int AS n FROM review_events`) as { n: number }[];
  return rows[0]?.n ?? 0;
}
