/**
 * The assembled deck.
 *
 * Chapter files store facts grouped by chapter; sorting by `id` gives one stable order.
 * `additions.ts` holds facts written after the original import — the split is only how the
 * content is organised for editing, and nothing downstream distinguishes them.
 */

import { CHAPTER_1 } from '@/data/chapter-1';
import { CHAPTER_2 } from '@/data/chapter-2';
import { CHAPTER_3 } from '@/data/chapter-3';
import { CHAPTER_4 } from '@/data/chapter-4';
import { CHAPTER_5 } from '@/data/chapter-5';
import { ADDITIONS } from '@/data/additions';
import { ADDITIONS_2 } from '@/data/additions-2';
import { ADDITIONS_3 } from '@/data/additions-3';
import { EXPLANATIONS } from '@/data/explanations';
import type { Deck, Fact } from './types';

const ALL: Fact[] = [
  ...CHAPTER_1,
  ...CHAPTER_2,
  ...CHAPTER_3,
  ...CHAPTER_4,
  ...CHAPTER_5,
  ...ADDITIONS,
  ...ADDITIONS_2,
  ...ADDITIONS_3,
]
  // Explanations live in their own map so authoring them is one flat editable list rather
  // than 443 scattered edits, and so coverage is countable. Attached here, once.
  .map((fact) => (EXPLANATIONS[fact.id] ? { ...fact, explanation: EXPLANATIONS[fact.id] } : fact))
  .sort((a, b) => a.id.localeCompare(b.id));

/**
 * Every fact ever written, retired ones included.
 *
 * This is the id space, not the study material. It exists so that `DECK[i].id === factId(i)`
 * keeps holding (R-4) and every historical review event keeps pointing at the question it was
 * actually answering. Nothing that decides what to serve should read it.
 */
export const DECK: Deck = ALL;

/**
 * What is actually drilled: everything not retired.
 *
 * Sixteen facts asked for answers the handbook does not contain — Darwin, Orwell, Wessex,
 * Runnymede, the date of the Domesday Book — each confirmed by the owner against his own copy
 * before it was pulled. A fact the book cannot answer is not examinable, so drilling it is
 * time spent learning something the test will never ask.
 */
export const ACTIVE: Deck = ALL.filter((f) => !f.retired);

export const RETIRED: Deck = ALL.filter((f) => f.retired);

const BY_ID = new Map<string, Fact>(ALL.map((f) => [f.id, f]));

export const factById = (id: string): Fact | undefined => BY_ID.get(id);

/** What the reader is trying to learn. Retired facts are not part of it. */
export const TOTAL_FACTS = ACTIVE.length;
export const TOTAL_FORMS = ACTIVE.reduce((n, f) => n + f.forms.length, 0);

/** The id space, for the contiguity contract. Never a denominator on a screen. */
export const ALL_FACTS = DECK.length;

export * from './types';
