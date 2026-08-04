/**
 * Prove sync works end to end against a running deployment.
 *
 * Not part of the test suite — CI has no database and should not have one. This is the
 * deliberate manual step the BRIEF's migration rule asks for: run it after a schema change
 * or a deploy that touches sync.
 *
 *   npx tsx scripts/db-check.mts https://lituk-drill.vercel.app
 *
 * It writes two probe rows with fixed ids, so running it repeatedly is harmless and is in
 * fact the point — the second run proves the push is idempotent, which is the property the
 * whole merge design rests on.
 */

const base = process.argv[2] ?? 'http://localhost:3000';
const url = `${base.replace(/\/$/, '')}/api/events`;

const probe = [
  { id: 'probe-a', factId: 'f000', formIndex: 0, grade: 4, mode: 'scheduled', at: 1_700_000_000_000 },
  { id: 'probe-b', factId: 'f001', formIndex: 1, grade: 0, mode: 'practice', at: 1_700_000_001_000 },
];

const post = async (events: unknown[]) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ events }),
  });
  return { status: res.status, body: await res.json() };
};

console.log(`checking ${url}\n`);

const first = await post(probe);
console.log('push 2 events     :', first.status, JSON.stringify(first.body));

const second = await post(probe);
console.log('push the same again:', second.status, JSON.stringify(second.body));
console.log('                    ^ inserted must be 0, or a repeated push duplicates rows\n');

const res = await fetch(url, { cache: 'no-store' });
const pulled = (await res.json()) as { events: unknown[]; count: number };
console.log('pull              :', res.status, `${pulled.count} events on the server`);

const malformed = await post([{ id: 'bad', factId: 'NOT-A-FACT', formIndex: -1, grade: 9, mode: 'x', at: 0 }]);
console.log('push a malformed  :', malformed.status, JSON.stringify(malformed.body));
console.log('                    ^ rejected must be 1, inserted 0\n');

const ok =
  first.status === 200 &&
  (second.body as { inserted: number }).inserted === 0 &&
  (malformed.body as { rejected: number }).rejected === 1;

console.log(ok ? 'SYNC OK' : 'SYNC NOT OK — see above');
process.exit(ok ? 0 : 1);
