/**
 * Rebuild the handbook vocabulary that `domain/deck/vocabulary.ts` checks explanations against.
 *
 *   npm run deck:vocab:build
 *
 * Reads `.work/handbook.txt` — gitignored, Crown copyright, never committed — and writes a
 * committed file containing two hundred years in the clear and about two thousand one-way
 * hashes. No handbook text survives the trip, which is the point: the check has to run in CI,
 * where the PDF is not and never will be.
 *
 * To recreate the input:
 *   curl -o .work/handbook.pdf https://storage.googleapis.com/britizen-public/static/study-guide/document.pdf
 *   then extract with pdf-parse (poppler is not installed on this machine).
 *
 * ## The camel-case step is not cosmetic
 *
 * The PDF's Commonwealth member table extracts as run-together tokens —
 * `GhanaMaldivesCanadaNew` and friends. Without splitting them, `Ghana` and `Maldives` are
 * absent from the vocabulary and every explanation naming a Commonwealth country gets flagged.
 * Checked before and after: five country names went from missing to present.
 */

import { readFileSync, writeFileSync } from 'node:fs';

import { normalise, tokenHash } from '../src/domain/deck/vocabulary';

const SOURCE = '.work/handbook.txt';
const TARGET = 'src/data/handbook-vocabulary.ts';

let raw: string;
try {
  raw = readFileSync(SOURCE, 'utf8');
} catch {
  console.error(
    `Cannot read ${SOURCE}.\n` +
      'It is gitignored on purpose — Crown copyright. Download the PDF and extract it first;\n' +
      'the header of this script has the URL and the method.',
  );
  process.exit(1);
}

const text = normalise(raw);

/**
 * Bounded by DIGITS, not by word boundaries, and the difference is eleven years.
 *
 * `\b` sits between a word character and a non-word character. A year followed by a letter has
 * no boundary after it, so `\b` never fires — and the handbook is full of exactly that:
 *
 *   `1920s`  `1830s`  `1700s`  `1960s`   nine decade forms, the `s` glued to the digits
 *   `2005Just under 60 million`          the population table, extracted with no column gap
 *
 * Both were invisible. `1920` in particular is the Baird case this whole check exists for —
 * the handbook says television was demonstrated "in the 1920s", so an explanation writing that
 * was flagged for inventing a year the book contains.
 *
 * L-030 raised the population-table half and was closed `verified-fixed`, but the fix is not in
 * this file: both sides were still `\b` on 10 August 2026, and the decade forms were never in
 * the finding at all. Re-derived here, and the ratchet is that `deck:vocab` must be re-run and
 * this file regenerated together — the scanner in `vocabulary.ts` uses the same rule.
 */
const years = [...new Set(text.match(/(?<!\d)(?:1\d{3}|20\d{2})(?!\d)/g) ?? [])].sort();

/**
 * Years written the ancient way — `AD 43`, `55 BC`.
 *
 * Added after the four-digit check missed one. `AD 122` for the start of Hadrian's Wall is
 * not in the handbook — the book says only that Hadrian built a wall — and three digits slid
 * straight past a rule written for four. The handbook uses exactly five era years in total,
 * so this set is small and the check on it is near-exact.
 */
const eras = [
  ...new Set([
    ...(text.match(/\bAD\s?\d{1,4}\b/g) ?? []).map((m) => m.replace(/\s+/g, ' ').toUpperCase()),
    ...(text.match(/\b\d{1,4}\s?BC\b/g) ?? []).map((m) => m.replace(/\s+/g, ' ').toUpperCase()),
  ]),
].sort();

const tokens = new Set<string>();
for (const token of text.match(/\b[A-Z][A-Za-z']*\b/g) ?? []) {
  tokens.add(token.replace(/'s$/i, '').replace(/'$/, ''));
  // Recover the run-together table entries. `GhanaMaldivesCanada` yields all three.
  const parts = token.match(/[A-Z][a-z]+/g) ?? [];
  if (parts.length > 1) for (const part of parts) tokens.add(part);
}

const hashes = [...new Set([...tokens].filter((t) => t.length > 1).map(tokenHash))].sort();

/**
 * Every word form, lowercased — the second tier.
 *
 * Without it the report drowns: "Roughly", "Three", "Note", "Keep" and every other word that
 * starts a sentence in an explanation gets flagged, because the handbook happens never to
 * start a sentence with them. Those are ordinary prose, not names. A token whose lowercase
 * form is somewhere in the book is demoted to a soft flag; a token absent in *any* case is
 * the one worth reading, and is where an invented name would land.
 */
const words = [
  ...new Set(
    (text.match(/\b[A-Za-z']{2,}\b/g) ?? []).map((w) => w.toLowerCase().replace(/'s$/, '')),
  ),
];
const wordHashes = [...new Set(words.map(tokenHash))].sort();

const file = `/**
 * GENERATED — do not edit. Rebuild with \`npm run deck:vocab:build\`.
 *
 * The handbook's vocabulary, in the only form that can be committed: four-digit years as
 * themselves, and every capitalised word form as a one-way hash. See
 * \`domain/deck/vocabulary.ts\` for why, and for what the check does with them.
 *
 * Derived from a ${text.length.toLocaleString('en-GB')}-character extract of the 3rd-edition
 * handbook. ${years.length} years, ${eras.length} era years, ${hashes.length} capitalised forms,
 * ${wordHashes.length} word forms.
 */

export const HANDBOOK_YEARS: readonly string[] = [
${years.map((y) => `  '${y}',`).join('\n')}
];

/** Ancient-era years, normalised to a single space and upper case. */
export const HANDBOOK_ERA_YEARS: readonly string[] = [
${eras.map((y) => `  '${y}',`).join('\n')}
];

/** Capitalised exactly like this somewhere in the handbook. */
export const HANDBOOK_NAME_HASHES: readonly string[] = [
${hashes.map((h) => `  '${h}',`).join('\n')}
];

/** Present in the handbook in some case. A capitalised token in here is ordinary prose. */
export const HANDBOOK_WORD_HASHES: readonly string[] = [
${wordHashes.map((h) => `  '${h}',`).join('\n')}
];
`;

writeFileSync(TARGET, file, 'utf8');
console.log(
  `${TARGET}: ${years.length} years, ${eras.length} era years, ${hashes.length} capitalised forms, ${wordHashes.length} word forms`,
);
console.log(`years span ${years[0]}–${years[years.length - 1]}`);
