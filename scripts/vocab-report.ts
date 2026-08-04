/**
 * Print every explanation that names something the handbook does not.
 *
 *   npm run deck:vocab
 *
 * A report, not a gate — the name half over-flags by design and wants a human. The year half
 * is ratcheted in `deck.test.ts`, because a four-digit year is either in the book or it is
 * not, and the one defect this whole check exists for was a year.
 */

import { DECK } from '../src/domain/deck';
import { vocabularyReport, vocabularyTotals } from '../src/domain/deck/vocabulary';

const findings = vocabularyReport(DECK);
const totals = vocabularyTotals(findings);

const withYears = findings.filter((f) => f.years.length);
const namesOnly = findings.filter((f) => !f.years.length && f.names.length);
const prose = findings.reduce((n, f) => n + f.prose.length, 0);

console.log(`\n${DECK.length} facts · ${totals.facts} explanations flagged`);
console.log(`  years not in the handbook: ${totals.years}  (across ${withYears.length} facts)`);
console.log(`  names not in the handbook: ${totals.names}  (in any case — read every one)`);
console.log(`  capitalised prose:          ${prose}  (lowercase form is in the book; ignore)\n`);

if (withYears.length) {
  console.log('YEARS — each of these is a real finding until shown otherwise\n');
  for (const f of withYears) {
    console.log(`  ${f.factId}  ${f.years.join(', ')}${f.names.length ? `   [also: ${f.names.join(', ')}]` : ''}`);
  }
  console.log();
}

if (namesOnly.length) {
  console.log('NAMES — nowhere in the handbook in any case. Plurals and adjectives of real\n' +
              'handbook words land here too ("Romans" for "Roman"), so read before acting.\n');
  for (const f of namesOnly) {
    console.log(`  ${f.factId}  ${f.names.join(', ')}`);
  }
  console.log();
}

if (!findings.length) console.log('Nothing flagged.\n');
