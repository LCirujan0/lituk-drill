/**
 * Dry run for D-014. Reports how many forms can carry a generation rule, what the generated
 * options look like, and what the rank distribution becomes. Writes nothing.
 *
 * The samples matter as much as the counts: a generator that produces "About 0 years ago"
 * is worse than the tell it replaces, and only reading the output catches that.
 */

import { MIGRATED_DECK } from '@/domain/deck';
import { fixedOptions } from '@/domain/deck/types';
import { achievableRanks, deriveNumericAnswers, generateOptions } from '@/domain/deck/numeric';
import { mulberry32 } from '@/domain/scheduler/rng';

let numericLooking = 0;
let derived = 0;
const rejections = new Map<string, number>();
const samples: string[] = [];
const rankCounts = [0, 0, 0, 0];
const restricted: string[] = [];

for (const fact of MIGRATED_DECK) {
  fact.forms.forEach((form, j) => {
    const options = fixedOptions(form.answers);
    const values = options.map((o) => {
      const m = o.replace(/,/g, '').match(/-?\d+(\.\d+)?/);
      return m ? Number.parseFloat(m[0]) : null;
    });
    const allNumeric = values.every((v) => v !== null) && new Set(values).size === 4;
    if (!allNumeric) return;
    numericLooking++;

    // fixedOptions puts the correct answer first.
    const rule = deriveNumericAnswers(options, 0);
    if (!rule) {
      const templates = new Set(options.map((o) => o.replace(/-?\d[\d,]*(\.\d+)?/, '{v}')));
      rejections.set(
        templates.size !== 1 ? 'options do not share one template' : 'too few candidates',
        (rejections.get(templates.size !== 1 ? 'options do not share one template' : 'too few candidates') ?? 0) + 1,
      );
      return;
    }
    derived++;

    const ranks = achievableRanks(rule);
    if (ranks.length < 4) restricted.push(`${fact.id}[${j}] value=${rule.value} ranks=${ranks.join(',')}`);

    for (let i = 0; i < 200; i++) {
      rankCounts[generateOptions(rule, mulberry32(i * 7919 + numericLooking)).rank]++;
    }

    if (samples.length < 24 && (numericLooking % 17 === 0 || ranks.length < 4)) {
      const draws = [0, 1, 2].map((s) => generateOptions(rule, mulberry32(s * 104729 + 5)).options.join(' | '));
      samples.push(
        `${fact.id}[${j}] "${form.question.slice(0, 62)}"\n` +
          `    was: ${options.join(' | ')}\n` +
          draws.map((d) => `    now: ${d}`).join('\n'),
      );
    }
  });
}

const total = rankCounts.reduce((a, b) => a + b, 0);
console.log(`\nforms whose four options are all distinct numbers : ${numericLooking}`);
console.log(`rules derived                                     : ${derived}`);
for (const [reason, n] of rejections) console.log(`rejected — ${reason}: ${n}`);
console.log(`\nrank of the true value across ${total} generated sets (uniform would be 25% each):`);
rankCounts.forEach((c, r) => console.log(`  rank ${r} (${['smallest', '2nd', '3rd', 'largest'][r]}): ${(c / total * 100).toFixed(1)}%`));
console.log(`  middle two combined: ${((rankCounts[1] + rankCounts[2]) / total * 100).toFixed(1)}%   (was 91.4%, chance 50%)`);
console.log(`\nforms that cannot reach every rank: ${restricted.length}`);
restricted.slice(0, 8).forEach((r) => console.log(`  ${r}`));
console.log('\n--- samples ---');
samples.forEach((s) => console.log(s + '\n'));
