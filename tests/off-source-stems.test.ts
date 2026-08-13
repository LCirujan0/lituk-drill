/**
 * The off-source terms D-038 removed must not come back.
 *
 * Six of the seven stems named in D-038 were reworded on 13 August 2026 because they asserted
 * something the handbook does not contain. A reworded stem is a one-off fix; **the class is
 * "a stem naming a work, date or statute the book never mentions"**, and this is the tripwire
 * for the instances that were actually found.
 *
 * It is deliberately an **exact set with a reason each**, not a ratchet and not a count. A
 * count at four hides the fifth, and this project has already paid for that lesson twice.
 *
 * ## What this does NOT cover, said plainly
 *
 * It cannot catch a *new* off-source term nobody has thought of. The general check is
 * `npm run deck:vocab`, which greps explanations against the handbook's vocabulary — and it
 * reads explanations only, not stems or answers. Extending it is a standing item in HANDOFF
 * ("Extend the year check over `fact.answer` and every `answers.correct`"), and until that
 * happens this file is a list of known-bad strings rather than a rule.
 */

import { describe, expect, it } from 'vitest';

import { DECK } from '@/domain/deck';
import { fixedOptions } from '@/domain/deck/types';

/**
 * Each entry: a term absent from the handbook, and why it was removed. Verified absent
 * against `.work/handbook.txt` on 13 August 2026 by two distinct patterns each — the raw
 * extraction breaks sentences across lines, so a single sentence-scoped grep reports a false
 * absence, which happened once in the session that wrote this.
 */
const REMOVED: readonly { readonly term: RegExp; readonly why: string }[] = [
  { term: /\bPsycho\b/i, why: 'f316 — 0 hits; the handbook credits Hitchcock with The 39 Steps (1935)' },
  { term: /\bThe Birds\b/i, why: 'f316 — 0 hits' },
  { term: /moved to Hollywood in 1940|Hollywood in 1940/i, why: 'f316 — the book gives no date for the move' },
  { term: /A Christmas Carol/i, why: 'f312 — 0 hits; the book names Oliver Twist and Great Expectations' },
  { term: /Enigma Variations/i, why: 'f296 — 0 hits; the book names the Pomp and Circumstance Marches' },
  { term: /first person to win the Tour de France/i, why: 'f284 — the book says first BRITON, not first person' },
];

/** Every string a reader can ever see: stems, canonical questions, answers and options. */
function readerFacingText(): { where: string; text: string }[] {
  const out: { where: string; text: string }[] = [];
  for (const fact of DECK) {
    out.push({ where: `${fact.id}.question`, text: fact.question });
    out.push({ where: `${fact.id}.answer`, text: fact.answer });
    fact.forms.forEach((form, i) => {
      out.push({ where: `${fact.id}[${i}].question`, text: form.question });
      fixedOptions(form.answers).forEach((option, j) =>
        out.push({ where: `${fact.id}[${i}].option${j}`, text: option }),
      );
    });
  }
  return out;
}

describe('terms D-038 removed stay removed', () => {
  const surfaces = readerFacingText();

  it('covers every reader-facing string in the deck, retired facts included', () => {
    // Retired facts are included on purpose: they keep their ids and their text (R-4), and a
    // future un-retirement would otherwise reintroduce a term silently.
    expect(surfaces.length).toBeGreaterThan(6_000);
    expect(surfaces.some((s) => s.where === 'f284[0].question')).toBe(true);
  });

  for (const { term, why } of REMOVED) {
    it(`no stem, answer or option contains ${term.source} — ${why}`, () => {
      const hits = surfaces.filter((s) => term.test(s.text)).map((s) => `${s.where}: ${s.text}`);
      expect(hits).toEqual([]);
    });
  }
});

/**
 * The Equality Act — absent from the handbook, and still in the deck. **L-041.**
 *
 * This block was written expecting one survivor, the distractor on `f554[0]`. Asserting the
 * **exact set** rather than a count immediately found six, and the extra five are a bigger
 * finding than the stem this work started from:
 *
 * **`f390` is an entire fact whose answer is "The Equality Act 2010"** — three forms, drilled
 * daily — and the phrase appears **0 times** in the handbook, checked with four distinct
 * patterns over both the raw and the flattened extraction. It also carries **no `source`**,
 * which D-024 and D-035 require of every added fact. Its own explanation panel says so out
 * loud: *"The handbook does not name the Equality Act."* So it was shipped knowingly
 * off-source with the admission buried under the answer.
 *
 * **Nothing here is fixed, deliberately.** D-038 authorises rewording seven *stems*. Retiring
 * a fact, changing a fact's answer, or rewriting a distractor is none of those, and `f390`'s
 * fate is a D-031 referral — the owner's call, on the f194/f015 precedent. Recorded as L-041.
 *
 * The set is asserted in **both directions**: it fails if the Equality Act spreads, and it
 * fails just as loudly if a row disappears without this file being updated. So the finding
 * cannot be quietly resolved and cannot quietly grow.
 */
describe('the Equality Act — absent from the handbook, still in the deck (L-041)', () => {
  const SURVIVING = [
    'f182[1].option1', // a distractor: "The Equality Act", on the British Nationality Act fact
    'f390.answer', // the fact's ANSWER — the whole of L-041
    'f390[0].option0',
    'f390[1].question', // the one surviving STEM, and it is f390's, not one of D-038's seven
    'f390[2].option0',
    'f554[0].option1', // a distractor: "The Equality Act 2010"
  ];

  it('survives in exactly these places and no others', () => {
    const hits = readerFacingText()
      .filter((s) => /Equality Act/i.test(s.text))
      .map((s) => s.where);
    expect(hits.sort()).toEqual([...SURVIVING].sort());
  });

  /**
   * The narrow thing D-038 actually bought: no stem the owner authorised rewording still names
   * it. `f390[1]` is excluded by name rather than by loosening the check — it is L-041's, and
   * naming it here is what stops it being mistaken for a stem that was missed.
   */
  it('is gone from all seven D-038 stems', () => {
    const inStems = readerFacingText()
      .filter((s) => s.where.endsWith('.question') && /Equality Act/i.test(s.text))
      .map((s) => s.where);
    expect(inStems).toEqual(['f390[1].question']);
  });
});
