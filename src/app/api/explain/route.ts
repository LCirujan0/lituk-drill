/**
 * Explain-on-demand (C8(a), D-034).
 *
 *   GET  /api/explain  → `{ available }`, so the button can be absent rather than broken
 *   POST /api/explain  → `{ text }`, one explanation of one card just answered
 *
 * ## Why the client sends three fields and not the card
 *
 * The body is `{ factId, formIndex, chosen }`. Everything else — the question, the options,
 * the correct answer, the explanation panel, the handbook passage — is resolved **here**,
 * from the deck and from the injected passages. The browser cannot widen what is sent to the
 * provider, and the fact id it does send is used for a lookup and then dropped: it never
 * reaches the outbound prompt. That is screening condition 2 (no identifier) held by
 * construction rather than by review.
 *
 * ## The five conditions, and where each one lives
 *
 * 1. **No review history leaves.** The body has no room for any: no grades, no timestamps,
 *    no other cards. One card, resolved server-side.
 * 2. **No identifier is added.** No user id, no device id, no session id, no request id, and
 *    no fact id in the prompt — asserted over the whole deck in `explain.test.ts`.
 * 3. **Nothing generated is stored.** This route writes nothing. It does not touch `db.ts`,
 *    the event log, the scheduler or the readiness model, and the response is held in
 *    component state until the card is left. Nothing generated is ever served as an answer.
 * 4. **Provider retention and training off.** Not a code property — it is a console setting
 *    the owner checks, and `docs/LEDGER.md` carries it as the standing check it is.
 * 5. **The app works with no network and no key.** `GET` reports `available: false` when
 *    `ANTHROPIC_API_KEY` is absent, a failed `GET` is read as unavailable, and the button is
 *    not rendered in either case. Nothing else on the card depends on this route.
 *
 * `src/adapters/handbook.ts` is server-only and imported only from here.
 */

import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

import { passageFor } from '@/adapters/handbook';
import { factById } from '@/domain/deck';
import { fixedOptions } from '@/domain/deck/types';
import { buildExplainPrompt, EXPLAIN_SYSTEM, flattenExplanation } from '@/domain/explain';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const apiKey = (): string | undefined => process.env.ANTHROPIC_API_KEY;

/**
 * Adaptive thinking at low effort rather than thinking disabled. Disabling it is the cheaper
 * -looking option and carries two documented failure modes — a tool call written as plain
 * text, and `<thinking>` tags leaking into the visible answer — and the second would put raw
 * model scaffolding on a revision card. Low effort recovers most of the cost without either.
 */
const MODEL = 'claude-opus-5';

export function GET() {
  return NextResponse.json({ available: Boolean(apiKey()) });
}

export async function POST(request: Request) {
  const key = apiKey();
  if (!key) {
    return NextResponse.json({ error: 'explanations are not configured' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 });
  }

  const b = (typeof body === 'object' && body !== null ? body : {}) as Record<string, unknown>;
  const factId = b.factId;
  const formIndex = b.formIndex;
  const chosen = b.chosen;

  if (typeof factId !== 'string' || !/^f\d{1,6}$/.test(factId)) {
    return NextResponse.json({ error: 'bad factId' }, { status: 400 });
  }
  if (typeof formIndex !== 'number' || !Number.isInteger(formIndex) || formIndex < 0) {
    return NextResponse.json({ error: 'bad formIndex' }, { status: 400 });
  }
  if (typeof chosen !== 'string' || !chosen.trim() || chosen.length > 300) {
    return NextResponse.json({ error: 'bad chosen' }, { status: 400 });
  }

  const fact = factById(factId);
  if (!fact) return NextResponse.json({ error: 'unknown fact' }, { status: 404 });

  const form = fact.forms[formIndex];
  if (!form) return NextResponse.json({ error: 'unknown form' }, { status: 404 });

  // The reader's option must be one this form actually offers, or a generated numeric value
  // for it. Anything else is not a card that was on screen, and there is nothing to explain.
  const authored = fixedOptions(form.answers);
  const known = authored.includes(chosen);

  const prompt = buildExplainPrompt({
    question: form.question,
    // Presentation order is randomised per card and carries no meaning (D-021), so the
    // authored set is sent. The reader's own option is named separately and explicitly.
    options: known ? authored : [...authored, chosen],
    chosen,
    correct: form.answers.correct,
    statement: `${fact.question} — ${fact.answer}`,
    explanation: flattenExplanation(fact.explanation),
    passage: passageFor(factId),
  });

  try {
    const client = new Anthropic({ apiKey: key });
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system: EXPLAIN_SYSTEM,
      thinking: { type: 'adaptive' },
      output_config: { effort: 'low' },
      messages: [{ role: 'user', content: prompt }],
    });

    if (message.stop_reason === 'refusal') {
      return NextResponse.json({ error: 'the model declined to answer' }, { status: 502 });
    }

    const text = message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim();

    if (!text) {
      return NextResponse.json({ error: 'the model returned nothing' }, { status: 502 });
    }

    // Deliberately not cached and deliberately not persisted (condition 3).
    return NextResponse.json({ text }, { headers: { 'cache-control': 'no-store' } });
  } catch (error) {
    // The message is logged rather than returned: a provider error can quote the request,
    // and the card is on screen either way.
    console.error('explain failed', error);
    return NextResponse.json({ error: 'could not reach the explainer' }, { status: 502 });
  }
}
