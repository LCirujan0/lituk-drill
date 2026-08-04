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
import { EXPLANATIONS } from '@/data/explanations';
import type { Deck, Fact } from './types';

const ALL: Fact[] = [
  ...CHAPTER_1,
  ...CHAPTER_2,
  ...CHAPTER_3,
  ...CHAPTER_4,
  ...CHAPTER_5,
  ...ADDITIONS,
]
  // Explanations live in their own map so authoring them is one flat editable list rather
  // than 443 scattered edits, and so coverage is countable. Attached here, once.
  .map((fact) => (EXPLANATIONS[fact.id] ? { ...fact, explanation: EXPLANATIONS[fact.id] } : fact))
  .sort((a, b) => a.id.localeCompare(b.id));

export const DECK: Deck = ALL;

const BY_ID = new Map<string, Fact>(ALL.map((f) => [f.id, f]));

export const factById = (id: string): Fact | undefined => BY_ID.get(id);

export const TOTAL_FACTS = DECK.length;
export const TOTAL_FORMS = DECK.reduce((n, f) => n + f.forms.length, 0);

export * from './types';
