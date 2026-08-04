/**
 * Every deliberate difference between the v1 deck and v0's `facts.js`, declared.
 *
 * The round-trip test proves the migration lost nothing by reconstructing v0's exact
 * positional shape and comparing it to the original file. That proof stands in for human
 * review of 1,228 forms — and the moment a single fact is corrected, it starts failing.
 *
 * The wrong answer is to weaken the test. The right one is to make divergence *explicit*:
 * a fact that differs from v0 must appear here, with a reason and a source. Anything that
 * differs and is not listed fails the build. So the guarantee survives intact — no content
 * can change by accident — while deliberate correction stays possible and, more usefully,
 * stays legible. Six months from now this file answers "why does the deck say £5,000 when
 * the printed book says £3,000" without anyone having to remember.
 *
 * R3 is the reason this care is warranted. A wrong fact here is drilled to permanence and
 * has no stack trace; the cost of getting one wrong is far higher than the cost of this file.
 */

export interface Divergence {
  readonly factId: string;
  /** What changed, in a sentence. */
  readonly change: string;
  /** Where the new answer came from. Goes into the fact's `source` field too. */
  readonly source: string;
  /** ISO date the change was made. */
  readonly date: string;
}

/**
 * Sourced against the 3rd-edition handbook text (Britizen PDF edition, Crown copyright),
 * which the owner supplied and which is maintained rather than frozen at 2013 — it carries
 * the Brexit update while keeping some original figures. Per his decision of 4 August 2026,
 * **where the maintained guide differs from the printed 2013 book, the guide wins.**
 */
export const DIVERGENCES_FROM_V0: readonly Divergence[] = [
  // ---- corrections: the deck was wrong -------------------------------------------
  {
    factId: 'f387',
    change:
      'Small claims limit for Scotland and Northern Ireland corrected from £3,000 to £5,000. ' +
      'The handbook states the procedure is used for claims under £10,000 in England and Wales ' +
      'and £5,000 in Scotland and Northern Ireland. £3,000 was the original 2013 figure.',
    source: 'Handbook 3rd ed., ch.5 “Respecting the law” — the small claims procedure',
    date: '2026-08-04',
  },
  {
    factId: 'f368',
    change:
      'Commonwealth membership corrected from 54 to 56. The source states 54 in prose and 56 ' +
      'above its member list; the list is the maintained part and includes Gabon and Togo, which ' +
      'joined in 2022, so 56 is the current figure and 54 is stale text.',
    source: 'Handbook 3rd ed., ch.5 “The UK and international institutions” — Commonwealth member list',
    date: '2026-08-04',
  },
  {
    factId: 'f253',
    change:
      'UK population updated from about 62 million to about 67.6 million. The handbook’s ' +
      'population table gives “just over 62 million” for 2010 and “estimated 67.6 million” for ' +
      '2022. The form asking specifically about 2010 keeps 62 million, which remains correct.',
    source: 'Handbook 3rd ed., ch.4 “The UK today” — population growth table',
    date: '2026-08-04',
  },

  // ---- resolutions: the deck was right; the amber flag is cleared and sourced ------
  { factId: 'f212', change: 'Verified: B1 CEFR confirmed. Amber flag cleared.', source: 'Handbook 3rd ed., ch.1 — taking the Life in the UK test', date: '2026-08-04' },
  { factId: 'f255', change: 'Verified: 84% of the UK population lives in England. Amber flag cleared.', source: 'Handbook 3rd ed., ch.4 “The UK today” — population distribution', date: '2026-08-04' },
  { factId: 'f284', change: 'Verified: Bradley Wiggins, first Briton to win the Tour de France, 2012. Amber flag cleared.', source: 'Handbook 3rd ed., ch.4 “Sport”', date: '2026-08-04' },
  { factId: 'f286', change: 'Verified: London hosted the Olympic Games in 1908, 1948 and 2012. Amber flag cleared.', source: 'Handbook 3rd ed., ch.4 “Sport”', date: '2026-08-04' },
  { factId: 'f354', change: 'Verified: the National Assembly for Wales has 60 Assembly Members. Amber flag cleared.', source: 'Handbook 3rd ed., ch.5 “The government” — the Welsh government', date: '2026-08-04' },
  { factId: 'f355', change: 'Verified: the Northern Ireland Assembly has 90 MLAs. Amber flag cleared.', source: 'Handbook 3rd ed., ch.5 “The government” — the Northern Ireland Assembly', date: '2026-08-04' },
  { factId: 'f372', change: 'Verified: the Council of Europe has 47 member countries. Amber flag cleared. Note the real figure has been 46 since 2022; the handbook says 47 and the handbook is what is examined.', source: 'Handbook 3rd ed., ch.5 “The UK and international institutions” — the Council of Europe', date: '2026-08-04' },
  { factId: 'f386', change: 'Verified: small claims in England and Wales are for claims under £10,000. Amber flag cleared.', source: 'Handbook 3rd ed., ch.5 “Respecting the law” — the small claims procedure', date: '2026-08-04' },
];

export const divergedFactIds = (): ReadonlySet<string> =>
  new Set(DIVERGENCES_FROM_V0.map((d) => d.factId));

export const divergenceFor = (factId: string): Divergence | undefined =>
  DIVERGENCES_FROM_V0.find((d) => d.factId === factId);
