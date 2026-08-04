/**
 * Does an explanation name anything the handbook does not?
 *
 * The failure this exists to catch already happened once. An explanation asserted that Baird
 * demonstrated television in **1924**. The handbook says only "in the 1920s", and 1924 appears
 * nowhere in it. It was caught by someone thinking to check, which is not a mechanism.
 *
 * Why it matters more than it sounds. A drill app optimises memory for whatever is put in
 * front of it, faithfully, including things that are not on the exam and things that are not
 * true. A stray date in an explanation is not merely wasted — it is learned as well as the
 * answer, and then competes with it. So the rule is: **only people, dates and facts that
 * appear in the handbook may be named.**
 *
 * ## This is a heuristic and it over-flags on purpose
 *
 * Matching is by word form, so "Claudius's" resolves to Claudius but "Romans" will not match
 * "Roman". Ordinary prose capitalisation is mostly absorbed, because the handbook capitalises
 * the same sentence-initial words we do. What is left is a **report**, not a gate: a human
 * reads the list and decides. The one exception is four-digit years, which are close to
 * unambiguous — a year is in the book or it is not — and are therefore ratcheted.
 *
 * ## Why the names are stored as hashes
 *
 * The handbook text is Crown copyright and is never committed (`.work/` is gitignored), but a
 * check that only runs on the one machine holding the PDF is not a check. Storing one-way
 * hashes gives exact membership testing while committing no readable text at all, which
 * sidesteps the question rather than arguing about how derivative a word list is.
 *
 * A hash collision would make a token look present when it is absent — a missed flag, never a
 * false one. At roughly two thousand entries in a 32-bit space that is about one chance in two
 * million per token, which is well inside the noise of a heuristic that over-flags by design.
 *
 * Years are stored in the clear. Two hundred numbers are facts and nothing else, and being
 * able to read them is worth more than the consistency.
 *
 * Regenerate with `npm run deck:vocab:build` when the handbook changes.
 */

import {
  HANDBOOK_NAME_HASHES,
  HANDBOOK_WORD_HASHES,
  HANDBOOK_YEARS,
} from '@/data/handbook-vocabulary';
import type { Deck } from './types';

/** FNV-1a, 32-bit. Not a security boundary — see the collision note above. */
export function tokenHash(value: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

/** Curly quotes in, straight quotes out, so the two sides can be compared at all. */
export const normalise = (text: string): string =>
  text.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/–|—/g, '-');

const YEAR = /\b(?:1\d{3}|20\d{2})\b/g;
const CAPITALISED = /\b[A-Z][A-Za-z']*\b/g;

/**
 * Word forms that are capitalised in an explanation for reasons of English rather than of
 * naming anything. They are all in the handbook too, so this list changes nothing in
 * practice — it is here so that a reader of a flagged token knows it was not one of these.
 */
const GRAMMATICAL = new Set(['I', 'A']);

export interface VocabularyFlags {
  /**
   * Four-digit years the handbook does not contain. Close to no false positives — a year is
   * in the book or it is not — which is why this half is ratcheted and the other is not.
   */
  readonly years: readonly string[];
  /**
   * Capitalised word forms that appear **nowhere** in the handbook, in any case. This is
   * where an invented name lands, and the list is short enough to read.
   */
  readonly names: readonly string[];
  /**
   * Capitalised here, but present lowercase in the handbook — so almost always a word that
   * happens to start a sentence, and almost never a name. Counted, not listed.
   */
  readonly prose: readonly string[];
}

const YEAR_SET: ReadonlySet<string> = new Set(HANDBOOK_YEARS);
const NAME_SET: ReadonlySet<string> = new Set(HANDBOOK_NAME_HASHES);
const WORD_SET: ReadonlySet<string> = new Set(HANDBOOK_WORD_HASHES);

/** Strip a trailing possessive so "Claudius's" is tested as "Claudius". */
const stem = (token: string): string => token.replace(/'s$/i, '').replace(/'$/, '');

export function scanText(text: string): VocabularyFlags {
  const clean = normalise(text);

  const years = [...new Set(clean.match(YEAR) ?? [])].filter((y) => !YEAR_SET.has(y));

  const unmatched = [
    ...new Set(
      (clean.match(CAPITALISED) ?? [])
        .map(stem)
        .filter((t) => t.length > 1 && !GRAMMATICAL.has(t)),
    ),
  ].filter((t) => !NAME_SET.has(tokenHash(t)));

  const names = unmatched.filter((t) => !WORD_SET.has(tokenHash(t.toLowerCase())));
  const prose = unmatched.filter((t) => WORD_SET.has(tokenHash(t.toLowerCase())));

  return { years: years.sort(), names: names.sort(), prose: prose.sort() };
}

export interface VocabularyFinding extends VocabularyFlags {
  readonly factId: string;
}

/** Every explanation in the deck that names something the handbook does not. */
export function vocabularyReport(deck: Deck): readonly VocabularyFinding[] {
  const findings: VocabularyFinding[] = [];
  for (const fact of deck) {
    if (!fact.explanation) continue;
    const flags = scanText(explanationText(fact.explanation));
    // `prose` alone is not worth a row — that tier exists to be counted, not read.
    if (flags.years.length || flags.names.length) {
      findings.push({ factId: fact.id, ...flags });
    }
  }
  return findings;
}

/** Explanations may be one string or several lines; both scan the same way. */
export const explanationText = (explanation: string | readonly string[]): string =>
  typeof explanation === 'string' ? explanation : explanation.join(' ');

/** Totals, for the ratchet and for the top of the report. */
export function vocabularyTotals(findings: readonly VocabularyFinding[]) {
  return {
    facts: findings.length,
    years: findings.reduce((n, f) => n + f.years.length, 0),
    names: findings.reduce((n, f) => n + f.names.length, 0),
  };
}

/** Every distinct year an explanation names that the handbook does not. */
export const strayYears = (findings: readonly VocabularyFinding[]): readonly string[] =>
  [...new Set(findings.flatMap((f) => f.years))].sort();
