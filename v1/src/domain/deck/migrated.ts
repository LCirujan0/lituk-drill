/**
 * The shape the generated chapter files are written in.
 *
 * Identical to `Fact` except that every form also carries `v0CorrectIndex` — the
 * position the correct option occupied in v0's four-element option array. Nothing at
 * runtime may read it. It exists so `deck.test.ts` can reconstruct v0's exact
 * positional representation and prove the migration lost nothing.
 *
 * When a form's answers become a generation rule (D-014), it loses `v0CorrectIndex`
 * along with its fixed options, and the round-trip proof stops covering it. That is
 * expected and is the moment the statistical baseline takes over as the guarantee.
 */

import type { Chapter, FixedAnswers } from './types';

export interface MigratedForm {
  question: string;
  mcqOnly: boolean;
  answers: FixedAnswers;
  v0CorrectIndex: number;
}

export interface MigratedFact {
  id: string;
  tag: string;
  chapter: Chapter;
  verify: boolean;
  source?: string;
  question: string;
  answer: string;
  forms: MigratedForm[];
}
