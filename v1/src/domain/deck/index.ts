/**
 * The assembled deck.
 *
 * Chapter files store facts grouped by chapter; sorting by `id` restores v0's original
 * global order, which the S6 import depends on. `deck.test.ts` asserts that
 * `DECK[i].id === factId(i)` for every i, so the contract is checked rather than trusted.
 */

import { CHAPTER_1 } from '@/data/chapter-1';
import { CHAPTER_2 } from '@/data/chapter-2';
import { CHAPTER_3 } from '@/data/chapter-3';
import { CHAPTER_4 } from '@/data/chapter-4';
import { CHAPTER_5 } from '@/data/chapter-5';
import { ADDITIONS } from '@/data/additions';
import type { MigratedFact } from './migrated';
import type { Deck, Fact } from './types';

const ALL: MigratedFact[] = [
  ...CHAPTER_1,
  ...CHAPTER_2,
  ...CHAPTER_3,
  ...CHAPTER_4,
  ...CHAPTER_5,
].sort((a, b) => a.id.localeCompare(b.id));

/**
 * Facts added after the migration (D-024) have no v0 counterpart, so they carry no
 * `v0CorrectIndex` and are kept out of `MIGRATED_DECK`. That is what keeps the round-trip
 * proof meaningful: it compares only what actually came from v0. Their ids continue from
 * f410, so the `DECK[i].id === factId(i)` contract holds across the join.
 */
const COMBINED: Fact[] = [...ALL, ...ADDITIONS].sort((a, b) => a.id.localeCompare(b.id));

export const DECK: Deck = COMBINED;

/** Only the facts migrated from v0. Used by the round-trip proof. */
export const MIGRATED_DECK: readonly MigratedFact[] = ALL;

const BY_ID = new Map<string, Fact>(COMBINED.map((f) => [f.id, f]));

export const factById = (id: string): Fact | undefined => BY_ID.get(id);

export const TOTAL_FACTS = DECK.length;
export const TOTAL_FORMS = DECK.reduce((n, f) => n + f.forms.length, 0);

export * from './types';
