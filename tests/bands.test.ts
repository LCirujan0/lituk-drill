/**
 * The bands, and the two properties that will rot first.
 *
 * Bands are a second partition of the deck laid over the 87 tags, so the deck can be drilled by
 * topic as well as by the handbook's own chapters (C4). Every fact belongs to exactly one chapter
 * **and** exactly one band, and both cuts have to satisfy R-12 independently.
 *
 * ## Why these assertions and not others
 *
 * The band table is data, and data drifts silently against a deck that is still growing. Two
 * specific failures are in view and neither has a symptom on screen:
 *
 *   1. **A new tag with no band.** C6 (D-035) adds up to ~170 facts. A fact whose tag is missing
 *      from `TAG_BAND` simply never appears in any band — no error, no blank row, just a fact
 *      that can never be drilled by band and is silently absent from every band denominator.
 *   2. **A band that quietly outgrows a session.** The point of a band is that it is a thing you
 *      can decide to sit down to. Two bands are within two facts of the ceiling today, so the
 *      sweep will hit this — and the intended response is to split a band, which is a decision,
 *      not to raise the number here.
 *
 * The reverse of (1) is asserted too: a tag in the table that no fact carries. That is the same
 * drift seen from the other side — a tag renamed in the deck leaves a dead row here and takes its
 * facts out of every band, and only the deck-side check would notice.
 */

import { describe, expect, it } from 'vitest';

import { ACTIVE, DECK, TOTAL_FACTS } from '@/domain/deck';
import {
  BAND_CEILING,
  BAND_IDS,
  BAND_NAMES,
  TAG_BAND,
  bandFacts,
  bandOf,
} from '@/domain/deck/bands';

describe('every tag has exactly one band', () => {
  it('maps every tag the deck actually uses', () => {
    const unmapped = [...new Set(ACTIVE.filter((f) => bandOf(f) === null).map((f) => f.tag))];
    expect(unmapped, `tags with no band in TAG_BAND: ${unmapped.join(', ')}`).toEqual([]);
  });

  it('maps every tag on a RETIRED fact too', () => {
    // Retired facts are never served, so this is not about drilling them. It is about the table
    // and the deck describing the same vocabulary: a tag that exists only on retirements is a
    // tag the sweep may well reuse, and finding out then is finding out late.
    const unmapped = [...new Set(DECK.filter((f) => bandOf(f) === null).map((f) => f.tag))];
    expect(unmapped, `tags with no band in TAG_BAND: ${unmapped.join(', ')}`).toEqual([]);
  });

  it('has no band entry for a tag no fact carries', () => {
    const used = new Set(DECK.map((f) => f.tag));
    const dead = Object.keys(TAG_BAND).filter((tag) => !used.has(tag));
    expect(dead, `tags in TAG_BAND that no fact carries: ${dead.join(', ')}`).toEqual([]);
  });

  it('names every band it declares, and declares every band it names', () => {
    expect(Object.keys(BAND_NAMES).sort()).toEqual([...BAND_IDS].sort());
    expect(new Set(Object.values(TAG_BAND))).toEqual(new Set(BAND_IDS));
  });
});

describe('the bands partition the deck', () => {
  it('covers every drilled fact exactly once', () => {
    const seen = new Set<string>();
    let total = 0;

    for (const band of BAND_IDS) {
      for (const fact of bandFacts(ACTIVE, band)) {
        expect(seen.has(fact.id), `${fact.id} is in more than one band`).toBe(false);
        seen.add(fact.id);
        total++;
      }
    }

    expect(total).toBe(TOTAL_FACTS);
    expect(seen).toEqual(new Set(ACTIVE.map((f) => f.id)));
  });

  it('is a different cut from the chapters, not a finer one', () => {
    // If every band sat inside one chapter this would be a sub-chapter level, which C4 rejects
    // as a third navigation tier — and five tags genuinely span chapters (`Media` spans three).
    // Asserted so the claim in `bands.ts` stays true rather than merely having been true.
    const spanning = BAND_IDS.filter(
      (band) => new Set(bandFacts(ACTIVE, band).map((f) => f.chapter)).size > 1,
    );
    expect(spanning.length).toBeGreaterThan(0);
  });
});

describe('no band is too big to be a session', () => {
  it.each(BAND_IDS)('%s is at most BAND_CEILING facts', (band) => {
    const n = bandFacts(ACTIVE, band).length;
    expect(
      n,
      `${BAND_NAMES[band]} holds ${n} facts, over the ${BAND_CEILING} ceiling. ` +
        'C6 adds facts; the fix is to split a band, not to raise the ceiling.',
    ).toBeLessThanOrEqual(BAND_CEILING);
  });

  it('has about a dozen of them, each worth opening', () => {
    // The whole point of banding is that 87 tags is a picker rather than a study aid. A dozen
    // bands of 30-odd facts is the shape that was asked for; twenty bands of eight is not.
    expect(BAND_IDS.length).toBeGreaterThanOrEqual(10);
    expect(BAND_IDS.length).toBeLessThanOrEqual(14);
    for (const band of BAND_IDS) {
      expect(bandFacts(ACTIVE, band).length, BAND_NAMES[band]).toBeGreaterThanOrEqual(20);
    }
  });
});
