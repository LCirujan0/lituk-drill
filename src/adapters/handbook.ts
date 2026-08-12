/**
 * The handbook passages, injected at deploy time.
 *
 * **Server-only. Never import this from a client component**, for the same reason as
 * `db.ts`: the passages are Crown copyright and this repository is public (D-005). Owning
 * the PDF and studying from it is personal use; committing its text to a world-readable repo
 * is redistribution, which personal use does not cover. So `.work/handbook.txt` stays
 * gitignored and the passages the route needs arrive as an environment variable instead.
 *
 * `HANDBOOK_PASSAGES` is a JSON object keyed by fact id:
 *
 *     {"f284": "Sir Bradley Wiggins became the first Briton to win …", "f296": "…"}
 *
 * **Absent is a supported state, not a failure.** With no variable set, every lookup returns
 * `undefined` and the explainer grounds on the deck's own answer and explanation panel, which
 * is our text and says the same thing (the deck records 47 Council of Europe members because
 * the book does). That keeps "the handbook wins" true in substance and means a deploy that
 * forgets the variable degrades to a thinner explainer rather than to an ungrounded one —
 * which is the failure D-034 names as fatal.
 */

let cache: Record<string, string> | null | undefined;

/** Parsed once. A malformed variable is treated as absent rather than crashing the route. */
function passages(): Record<string, string> | null {
  if (cache !== undefined) return cache;

  const raw = process.env.HANDBOOK_PASSAGES;
  if (!raw) return (cache = null);

  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return (cache = null);
    }
    const out: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === 'string' && value.trim()) out[key] = value.trim();
    }
    return (cache = out);
  } catch {
    return (cache = null);
  }
}

export const handbookConfigured = (): boolean => passages() !== null;

export const passageFor = (factId: string): string | undefined => passages()?.[factId];

/** Tests only: the variable is read once and memoised, so a test that sets it must clear it. */
export const resetHandbookCache = (): void => {
  cache = undefined;
};
