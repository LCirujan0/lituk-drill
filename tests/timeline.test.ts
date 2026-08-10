/**
 * The chronology, held to the same rule as the deck.
 *
 * This file exists because the rule was never enforced here. The vocabulary check has read
 * explanations since the day it was written and nothing else, and the cost is now on the
 * record twice: six facts asked for a year the handbook never gives and survived a whole
 * sourcing pass (L-031), and f194 carried "1924" inside its own canonical question stem until
 * 10 August because the check could not see questions either.
 *
 * The chronology was the third such blind spot and the largest — a hundred-odd entries of
 * hand-written prose, every one a place a date could be invented, none of it ever scanned. The
 * first scan found "2019" for Boris Johnson succeeding May, which appears nowhere in the
 * handbook, and three more day-level dates that the year check is structurally unable to see
 * (L-035).
 *
 * A rule enforced over one slot of the data is not enforced.
 */

import { describe, expect, it } from 'vitest';

import { TIMELINE } from '@/data/timeline';
import { scanCorpus } from '@/domain/deck/vocabulary';

/** Every authored string in the chronology, keyed by something a human can find. */
const corpus = () => {
  const entries: { id: string; text: string }[] = [];
  for (const era of TIMELINE) {
    entries.push({ id: `${era.name} · era`, text: [era.name, era.span, era.summary].join(' ') });
    for (const section of era.sections) {
      entries.push({ id: `${era.name} · §${section.name}`, text: [section.name, section.why].join(' ') });
      for (const e of section.events)
        entries.push({ id: `${era.name} · ${e.title}`, text: [e.year, e.title, e.detail].join(' ') });
    }
    for (const f of era.figures ?? [])
      entries.push({ id: `${era.name} · ${f.name}`, text: [f.name, f.when ?? '', f.known].join(' ') });
  }
  return entries;
};

describe('the chronology — sourcing', () => {
  it('names no year the handbook does not contain', () => {
    // An assertion, not a ratchet. There is no acceptable number of invented dates in a study
    // aid: a spaced-repetition system learns one as reliably as the answer, and it then
    // competes with the answer.
    const findings = scanCorpus(corpus());
    const years = [...new Set(findings.flatMap((f) => f.years))].sort();
    const where = findings.filter((f) => f.years.length).map((f) => `${f.id} -> ${f.years.join('/')}`);
    expect(years, `off-source years: ${where.join(' · ')}`).toEqual([]);
  });

  it('says so where the handbook gives no date, rather than inventing one', () => {
    // The honest answer is a feature of this file and worth asserting, because the tempting
    // fix for a missing date is always to supply a plausible one.
    const years = TIMELINE.flatMap((e) => e.sections.flatMap((s) => s.events.map((x) => x.year)));
    expect(years.filter((y) => y === 'no date given').length).toBeGreaterThan(0);
    for (const y of years) expect(y.trim().length, 'an empty year field').toBeGreaterThan(0);
  });
});

describe('the chronology — shape', () => {
  it('gives every era a span and a summary readable while collapsed', () => {
    // The collapsed view is the one that teaches the sequence, so it has to stand alone.
    for (const era of TIMELINE) {
      expect(era.span.trim().length, `${era.name} has no span`).toBeGreaterThan(0);
      expect(era.summary.trim().length, `${era.name} has no summary`).toBeGreaterThan(20);
    }
  });

  it('groups every era into named sections that each hold events', () => {
    for (const era of TIMELINE) {
      expect(era.sections.length, `${era.name} has no sections`).toBeGreaterThan(0);
      for (const s of era.sections) {
        expect(s.events.length, `${era.name} · ${s.name} is empty`).toBeGreaterThan(0);
        expect(s.why.trim().length, `${era.name} · ${s.name} does not say why it coheres`).toBeGreaterThan(10);
      }
    }
  });

  it('gives every figure the one thing the handbook remembers them for', () => {
    // `when` is optional by design — the handbook usually gives no date for a person, and a
    // figure invented one is exactly the failure this file guards. `known` is not optional.
    for (const era of TIMELINE)
      for (const f of era.figures ?? [])
        expect(f.known.trim().length, `${era.name} · ${f.name} has no 'known'`).toBeGreaterThan(10);
  });

  it('keeps the collapsed arc to about one screen and a half', () => {
    // A proxy, and it is worth saying why rather than pretending otherwise: jsdom has no
    // layout, so nothing here can measure a pixel. The real figure comes from the browser at
    // 402x874 and is recorded so the next person does not have to re-derive it.
    //
    // Measured 10 Aug 2026, collapsed: 99px per era, 1,093px of arc, 1,246px of page — 1.43
    // screens. The first measurement was 234px per era and 2,574px, THREE screens, because the
    // rewritten summaries run to two sentences; clamping the collapsed blurb to two lines is
    // what closed the gap. It is one short scroll, not one screen, and the earlier claim in
    // this file that eleven rows came to ~1,050px was an estimate that had never been checked.
    //
    // The count is the lever that matters: at 99px an era, twelve is 1,188px and twenty is
    // 1,980px, at which point the top-level view has stopped teaching the sequence at all.
    expect(TIMELINE.length).toBeLessThanOrEqual(12);
  });
});
