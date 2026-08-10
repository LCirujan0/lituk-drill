/**
 * Bands — the second way into the deck, above the 87 tags and beside the 5 chapters.
 *
 * ## Why this exists
 *
 * "History" is 220 facts. Drilling it means drilling all of it, so there is no way to work the
 * Tudors on a day when the Tudors are the problem. Every fact already carries a `tag` and there
 * are 87 of them — but 87 rows is a picker, not a study aid. Nobody decides between 87 things.
 *
 * A band is a group of tags, about a dozen of them, each big enough to be a session and small
 * enough to be a decision.
 *
 * ## Both axes stay drillable, and that is the whole shape of this file
 *
 * The owner's requirement, 10 August 2026: *"ideally chapters can be expanded into multiple
 * bands, but I can still practise either chapters or bands and measure progress for each."* So a
 * chapter is not replaced by its bands. Every fact belongs to exactly one chapter **and** exactly
 * one band, and **both partitions satisfy R-12 independently** — New + Mastered + Mistakes is
 * every fact in the chapter, and every fact in the band, always.
 *
 * The two cuts are not nested and are not meant to be. Bands follow the material; chapters follow
 * the handbook's own structure, which is how sourcing is cited. Five tags already span chapters
 * (`Media` is in 3, 4 and 5; `Devolution`, `Europe`, `Currency` and `Education` each span two), so
 * a band can and does draw from more than one chapter. That is a feature of banding by topic and
 * the reason a band is not a sub-chapter.
 *
 * ## Keyed by tag, deliberately
 *
 * The mapping is tag → band, never fact → band. Tags are the handbook's own grouping and already
 * carry the editorial judgement; re-tagging the deck to make prettier bands is content work
 * wearing a UI costume (BRIEF C4, rabbit holes). It also means a fact added by the C6 sweep joins
 * a band the moment it is given a tag — and if it is given a *new* tag, `bands.test.ts` fails
 * rather than the fact silently vanishing from every band.
 *
 * ## The ceiling is a test, not a hope
 *
 * No band exceeds `BAND_CEILING` facts. C6 is about to add up to ~170 facts (D-035) and bands
 * drift silently — a band that grows to 80 stops being a session without anything going red. Two
 * bands sit within a couple of facts of the ceiling today, so the sweep will have to split a band
 * rather than quietly overfill one. That is the intended cost.
 */

import type { Deck, Fact } from './types';

/** The band ids, in the order they are shown. Roughly chronological, then thematic. */
export const BAND_IDS = [
  'values',
  'early',
  'tudors',
  'empire',
  'wars',
  'modern',
  'sport',
  'arts',
  'everyday',
  'government',
  'law',
  'world',
] as const;

export type BandId = (typeof BAND_IDS)[number];

export const BAND_NAMES: Record<BandId, string> = {
  values: 'Values and the UK',
  early: 'Early Britain, to 1485',
  tudors: 'Tudors and Stuarts',
  empire: 'Empire and industry',
  wars: 'War and aftermath',
  modern: 'Modern Britain, 1945–',
  sport: 'Sport and leisure',
  arts: 'Arts and culture',
  everyday: 'Everyday life',
  government: 'Government and elections',
  law: 'The law and your rights',
  world: 'Britain today and the wider world',
};

/**
 * The largest a band may be. Above this it stops being a session you can decide to sit down to.
 *
 * 55 is the BRIEF's figure and it is asserted rather than aimed at. The bands run 30–54 today
 * against a deck of 530.
 */
export const BAND_CEILING = 55;

/**
 * Every tag, and the one band it belongs to.
 *
 * Grouped by band in source order so the cut can be read and argued with, which is the point of
 * writing it as data rather than deriving it from a chapter number. The test asserts this covers
 * exactly the tags the deck uses — a tag here that no fact carries is as much a defect as a fact
 * whose tag is missing, because both mean this table and the deck have drifted apart.
 */
export const TAG_BAND: Readonly<Record<string, BandId>> = {
  // Values and the UK — chapters 1 and 2 entire. The identity material: what the UK is, what it
  // stands for, and the symbols and saints that go with it.
  Values: 'values',
  Freedoms: 'values',
  Citizenship: 'values',
  Ceremony: 'values',
  'Patron saints': 'values',
  'Union Flag': 'values',
  'National flags': 'values',
  Capitals: 'values',
  Languages: 'values',
  'UK definition': 'values',
  'Great Britain': 'values',
  'British Isles': 'values',
  'Crown dependencies': 'values',
  'Overseas territories': 'values',
  Population: 'values',

  // Early Britain, to 1485.
  Prehistory: 'early',
  Romans: 'early',
  'Anglo-Saxons': 'early',
  Vikings: 'early',
  'Norman Conquest': 'early',
  'Middle Ages': 'early',

  // Tudors and Stuarts, 1485–1714 — the religious settlement and the constitutional quarrel that
  // followed it, ending at the Union.
  Tudors: 'tudors',
  Reformation: 'tudors',
  'Civil War': 'tudors',
  Restoration: 'tudors',
  'Glorious Revolution': 'tudors',
  Stuarts: 'tudors',
  Union: 'tudors',

  // Empire and industry, 1714–1901.
  Empire: 'empire',
  'Industrial Revolution': 'empire',
  Victorians: 'empire',
  Inventors: 'empire',
  'Napoleonic Wars': 'empire',
  Jacobites: 'empire',
  Enlightenment: 'empire',
  Slavery: 'empire',
  // Carried by two retired facts only (f105 Newton, f148 Darwin), so it adds nothing to the
  // band's count today. Mapped rather than left out because the sweep may well reuse the tag,
  // and a tag that appears only on retirements is the one nobody thinks to map.
  Science: 'empire',

  // War and aftermath, 1914–1945. Suffrage sits here rather than with the Victorians because the
  // handbook's own account of it runs through the First World War.
  WWI: 'wars',
  Interwar: 'wars',
  WWII: 'wars',
  Suffrage: 'wars',

  // Modern Britain, 1945– . The post-war settlement and what came out of it.
  'Post-war': 'modern',
  'Welfare State': 'modern',
  'Modern Britain': 'modern',
  Immigration: 'modern',
  Ireland: 'modern',
  'Northern Ireland': 'modern',
  Politics: 'modern',
  Education: 'modern',

  // Sport and leisure.
  Sport: 'sport',
  Leisure: 'sport',
  Pubs: 'sport',
  'National parks': 'sport',

  // Arts and culture — the made things. Media is here rather than with government because the
  // facts are about broadcasters and newspapers as culture, not as institutions.
  Music: 'arts',
  Cinema: 'arts',
  Literature: 'arts',
  Comedy: 'arts',
  Theatre: 'arts',
  Art: 'arts',
  Design: 'arts',
  Media: 'arts',

  // Everyday life — the lived year and the built environment.
  Religion: 'everyday',
  Festivals: 'everyday',
  Traditions: 'everyday',
  Currency: 'everyday',
  Landmarks: 'everyday',
  Architecture: 'everyday',
  Food: 'everyday',

  // Government and elections — how the country is run. Devolution is here rather than in Modern
  // Britain because the drillable facts are the powers of the three administrations, not the
  // history of getting them.
  Elections: 'government',
  Parliament: 'government',
  Government: 'government',
  Monarchy: 'government',
  Devolution: 'government',
  'Local government': 'government',
  Constitution: 'government',
  'Civil service': 'government',

  // The law and your rights — what the state may do to you and what you must do.
  Courts: 'law',
  Law: 'law',
  Rights: 'law',
  Police: 'law',
  Driving: 'law',
  Tax: 'law',

  // Britain today and the wider world — the country as it is now and its place outside itself.
  'The UK today': 'world',
  Demographics: 'world',
  Community: 'world',
  Environment: 'world',
  International: 'world',
  Europe: 'world',
};

/**
 * The band a fact belongs to, or `null` if its tag is unmapped.
 *
 * Null rather than a throw or a fallback band. A fallback would hide the drift this is meant to
 * expose, and a throw would take the whole app down over a data problem the test catches on the
 * way in. `bands.test.ts` asserts this is never null over the live deck.
 */
export const bandOf = (fact: Fact): BandId | null => TAG_BAND[fact.tag] ?? null;

/** Facts in a band, in deck order. */
export const bandFacts = (deck: Deck, band: BandId): Fact[] =>
  deck.filter((f) => bandOf(f) === band);
