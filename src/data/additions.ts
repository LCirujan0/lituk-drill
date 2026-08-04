/**
 * Facts added after the v0 migration, filling measured coverage gaps (L-017, D-024).
 *
 * These have no v0 counterpart, so they are typed as plain `Fact` rather than `MigratedFact`
 * and are exempt from the round-trip proof by construction — there is nothing to round-trip
 * to. Ids continue from f410 so the `DECK[i].id === factId(i)` contract still holds.
 *
 * Every fact carries a `source` naming the handbook section it came from. Written from the
 * facts, not from the text: no handbook wording is reproduced here, which is the same basis
 * the original 410 were written on.
 *
 * Option sets are deliberately length-balanced. The correct answer being the longest option
 * is a measured tell in this deck (40.7% against 25% by chance) and adding forty facts that
 * make it worse would trade one gap for another.
 */

import type { Fact } from '@/domain/deck/types';

const CH5 = 'Handbook 3rd ed., ch.5 “The UK government, the law and your role”';
const CH4 = 'Handbook 3rd ed., ch.4 “A modern, thriving society”';
const CH3 = 'Handbook 3rd ed., ch.3 “A long and illustrious history”';

export const ADDITIONS: readonly Fact[] = [
  // ==========================================================================
  // The European Union and international institutions.
  // One fact existed before (f188, the UK joining the EEC in 1973). An earlier gap
  // analysis reported zero, because it searched only canonical questions and answers
  // rather than form text — corrected here and in L-017.
  // ==========================================================================
  {
    id: 'f410', tag: 'Europe', chapter: 5, verify: false, source: CH5,
    question: 'Which treaty established the European Economic Community, and when was it signed?',
    answer: 'The Treaty of Rome, signed on 25 March 1957',
    forms: [
      { question: 'Which treaty established the European Economic Community?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Treaty of Rome', distractors: ['The Treaty of Paris', 'The Treaty of Lisbon', 'The Treaty of Vienna'] } },
      { question: 'The Treaty of Rome, which created the EEC, was signed in which year?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1957', distractors: ['1947', '1967', '1977'] } },
      { question: 'Six western European countries signed a founding treaty in March 1957. Which one?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Treaty of Rome', distractors: ['The Treaty of Berlin', 'The Treaty of Madrid', 'The Treaty of Geneva'] } },
    ],
  },
  {
    id: 'f411', tag: 'Europe', chapter: 5, verify: false, source: CH5,
    question: 'How many countries originally set up the European Economic Community?',
    answer: 'Six',
    forms: [
      { question: 'How many countries originally set up the European Economic Community?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Six', distractors: ['Four', 'Nine', 'Twelve'] } },
      { question: 'The EEC was founded by a group of western European states. How many were there?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Six', distractors: ['Three', 'Eight', 'Ten'] } },
      { question: 'Which of these was NOT one of the six founding members of the EEC?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The United Kingdom', distractors: ['France', 'Italy and the Netherlands', 'Belgium and Luxembourg'] } },
    ],
  },
  {
    id: 'f412', tag: 'Europe', chapter: 5, verify: false, source: CH5,
    question: 'On what date did the UK formally leave the European Union?',
    answer: '31 January 2020',
    forms: [
      { question: 'On what date did the UK formally leave the European Union?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '31 January 2020', distractors: ['23 June 2016', '29 March 2019', '31 December 2020'] } },
      { question: 'Brexit officially took effect at 23:00 GMT on which date?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '31 January 2020', distractors: ['31 January 2019', '30 June 2020', '1 January 2021'] } },
      { question: 'Which statement about the UK and the EU is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The UK left the EU on 31 January 2020', distractors: ['The UK has never joined the EU', 'The UK still holds full EU membership', 'The UK left the EU in June 2016'] } },
    ],
  },
  {
    id: 'f413', tag: 'Europe', chapter: 5, verify: false, source: CH5,
    question: 'How many member states does the European Union now have?',
    answer: '27',
    forms: [
      { question: 'How many member states does the European Union now have?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '27', distractors: ['24', '30', '33'] } },
      { question: 'Following the UK’s departure, the EU is made up of how many countries?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '27', distractors: ['21', '25', '31'] } },
      { question: 'Which figure gives the current number of EU member states?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '27', distractors: ['17', '37', '47'] } },
    ],
  },
  {
    id: 'f414', tag: 'Europe', chapter: 5, verify: false, source: CH5,
    question: 'What are laws made by the European Union called?',
    answer: 'Directives, regulations or framework decisions',
    forms: [
      { question: 'What are laws made by the European Union called?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Directives, regulations or framework decisions', distractors: ['Statutes, charters or parliamentary writs', 'Acts, standing orders or local bylaws', 'Conventions, treaties or protocols'] } },
      { question: 'European law takes several named forms. Which set is correct?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Directives, regulations and framework decisions', distractors: ['Bills, statutes and tabled amendments', 'Charters, royal warrants and decrees', 'Motions, resolutions and formal rulings'] } },
      { question: 'Which of these is a form of European law?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'A directive', distractors: ['A local bylaw', 'A royal warrant', 'A parliamentary writ'] } },
    ],
  },
  {
    id: 'f415', tag: 'International', chapter: 5, verify: false, source: CH5,
    question: 'How many members sit on the United Nations Security Council?',
    answer: '15',
    forms: [
      { question: 'How many members sit on the United Nations Security Council?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '15', distractors: ['12', '18', '21'] } },
      { question: 'The body that recommends action in international crises has how many members?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '15', distractors: ['5', '10', '25'] } },
      { question: 'Which number describes the total membership of the UN Security Council?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '15', distractors: ['9', '20', '30'] } },
    ],
  },
  {
    id: 'f416', tag: 'International', chapter: 5, verify: false, source: CH5,
    question: 'Roughly how many countries are members of the United Nations?',
    answer: 'More than 190',
    forms: [
      { question: 'Roughly how many countries are members of the United Nations?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'More than 190', distractors: ['More than 120', 'More than 250', 'More than 320'] } },
      { question: 'The United Nations has a membership of approximately what size?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Over 190 countries', distractors: ['Over 90 countries', 'Over 290 countries', 'Over 390 countries'] } },
      { question: 'Which figure is closest to the number of UN member countries?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'About 190', distractors: ['About 60', 'About 110', 'About 240'] } },
    ],
  },

  // ==========================================================================
  // The modern constitutional monarchy — 2 facts before
  // ==========================================================================
  {
    id: 'f417', tag: 'Monarchy', chapter: 5, verify: false, source: CH5,
    question: 'Who is the head of state of the UK?',
    answer: 'The monarch',
    forms: [
      { question: 'Who is the head of state of the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The monarch', distractors: ['The Prime Minister', 'The Speaker', 'The Lord Chancellor'] } },
      { question: 'Which role does the King hold in relation to the United Kingdom?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Head of state', distractors: ['Head of government', 'Head of the judiciary', 'Head of the civil service'] } },
      { question: 'The monarch is also head of state for many countries in which association?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Commonwealth', distractors: ['The European Union', 'The United Nations', 'The Council of Europe'] } },
    ],
  },
  {
    id: 'f418', tag: 'Monarchy', chapter: 5, verify: false, source: CH5,
    question: 'Whom does the monarch invite to become Prime Minister?',
    answer: 'The leader of the party with the largest number of MPs',
    forms: [
      { question: 'Whom does the monarch invite to become Prime Minister?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The leader of the party with the most MPs', distractors: ['The leader of the largest party in the Lords', 'The longest-serving member of the cabinet', 'The MP with the largest personal majority'] } },
      { question: 'After a general election, who forms the government?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The leader of the party with the most MPs', distractors: ['The leader chosen by the outgoing government', 'The candidate with the most individual votes', 'The Speaker of the House of Commons'] } },
      { question: 'Where no party has a majority, whom may the monarch invite to be Prime Minister?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The leader of a coalition of parties', distractors: ['The leader of the smallest party in the Commons', 'The most senior serving civil servant', 'The previous Prime Minister'] } },
    ],
  },
  {
    id: 'f419', tag: 'Monarchy', chapter: 5, verify: false, source: CH5,
    question: 'What may the monarch do in regular meetings with the Prime Minister?',
    answer: 'Advise, warn and encourage',
    forms: [
      { question: 'What may the monarch do in regular meetings with the Prime Minister?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Advise, warn and encourage', distractors: ['Direct, instruct and command', 'Approve, reject and amend', 'Appoint, dismiss and replace'] } },
      { question: 'The monarch meets the Prime Minister regularly. What is the limit of that role?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'To advise, warn and encourage only', distractors: ['To set the government’s priorities', 'To veto proposed legislation', 'To choose cabinet ministers'] } },
      { question: 'Who actually decides government policy?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Prime Minister and cabinet', distractors: ['The monarch and the Privy Council', 'The House of Lords', 'The civil service'] } },
    ],
  },
  {
    id: 'f420', tag: 'Monarchy', chapter: 5, verify: false, source: CH5,
    question: 'What ceremonial duty does the monarch perform at the start of each parliamentary session?',
    answer: 'Opens Parliament and makes a speech setting out the government’s policies',
    forms: [
      { question: 'What does the monarch do at the opening of each new parliamentary session?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Makes a speech setting out government policy', distractors: ['Appoints the Speaker of the House of Commons', 'Presents the annual Budget to Parliament', 'Swears in newly elected MPs'] } },
      { question: 'The speech made by the monarch at the opening of Parliament summarises what?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The government’s policies for the year ahead', distractors: ['The monarch’s own views on the year ahead', 'The results of the previous general election', 'The judgments of the Supreme Court'] } },
      { question: 'In whose name are all Acts of Parliament made?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The monarch’s', distractors: ['The Prime Minister’s', 'Parliament’s alone', 'The Lord Chancellor’s'] } },
    ],
  },
  {
    id: 'f421', tag: 'Monarchy', chapter: 5, verify: false, source: CH5,
    question: 'In which year did Queen Elizabeth II come to the throne?',
    answer: '1952',
    forms: [
      { question: 'In which year did Queen Elizabeth II come to the throne?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1952', distractors: ['1936', '1944', '1960'] } },
      { question: 'Queen Elizabeth II became queen on the death of her father in which year?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1952', distractors: ['1942', '1948', '1956'] } },
      { question: 'Her Diamond Jubilee in 2012 marked sixty years since which event?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'She came to the throne in 1952', distractors: ['Her marriage to Prince Philip', 'The end of the Second World War', 'Her formal coronation ceremony'] } },
    ],
  },
  {
    id: 'f422', tag: 'Monarchy', chapter: 5, verify: false, source: CH5,
    question: 'Who became the reigning monarch in 2022?',
    answer: 'King Charles III',
    forms: [
      { question: 'Who became the reigning monarch in 2022?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'King Charles III', distractors: ['William, Prince of Wales', 'Prince Edward of Wessex', 'Prince Philip'] } },
      { question: 'On the death of Queen Elizabeth II, who succeeded her?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Her eldest son, Charles', distractors: ['Her grandson, William of Wales', 'Her younger son, Edward', 'Her sister’s eldest son'] } },
      { question: 'Who is the heir apparent to the throne?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'William, Prince of Wales', distractors: ['Prince George, his eldest son', 'Prince Edward, Duke of Edinburgh', 'Princess Charlotte'] } },
    ],
  },
  {
    id: 'f423', tag: 'Monarchy', chapter: 5, verify: false, source: CH5,
    question: 'What does the monarch do to support the UK’s relations with other countries?',
    answer: 'Receives foreign ambassadors, entertains visiting heads of state and makes state visits overseas',
    forms: [
      { question: 'How does the monarch represent the UK abroad?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'By making state visits and receiving ambassadors', distractors: ['By negotiating trade agreements in person', 'By appointing the UK’s ambassadors overseas', 'By leading UK delegations to the United Nations'] } },
      { question: 'Whom does the monarch receive as part of the diplomatic role?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Foreign ambassadors and high commissioners', distractors: ['Foreign heads of the judiciary and senior judges', 'Overseas political party leaders', 'International trade delegates'] } },
      { question: 'What does the monarch provide that changing governments cannot?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Stability and continuity as head of state', distractors: ['Day-to-day direction of government policy', 'Oversight of the courts and the judiciary', 'Control of the armed forces'] } },
    ],
  },

  // ==========================================================================
  // The civil service — 1 fact before
  // ==========================================================================
  {
    id: 'f424', tag: 'Civil service', chapter: 5, verify: false, source: CH5,
    question: 'To whom are civil servants accountable?',
    answer: 'Ministers',
    forms: [
      { question: 'To whom are civil servants accountable?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Ministers', distractors: ['Judges', 'Councillors', 'Voters'] } },
      { question: 'Civil servants support the government in developing policy. Who are they answerable to?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Government ministers', distractors: ['The monarch directly', 'The House of Lords', 'Their local authority'] } },
      { question: 'How are civil servants appointed?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'On merit, through an application process', distractors: ['By direct appointment from ministers', 'By election within their own departments', 'By nomination from party leaders'] } },
    ],
  },
  {
    id: 'f425', tag: 'Civil service', chapter: 5, verify: false, source: CH5,
    question: 'What are the core values of the civil service?',
    answer: 'Integrity, honesty, objectivity and impartiality',
    forms: [
      { question: 'What are the core values of the civil service?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Integrity, honesty, objectivity and impartiality', distractors: ['Loyalty, discretion, seniority and public service', 'Efficiency, economy, ambition and party loyalty', 'Obedience, secrecy, tradition and duty'] } },
      { question: 'Impartiality is one civil service value. What does it include?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Being politically neutral', distractors: ['Being appointed by ministers', 'Being independent of Parliament', 'Being anonymous to the public'] } },
      { question: 'Which of these is NOT a core value of the civil service?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Political loyalty', distractors: ['Integrity in public life', 'Objectivity when advising', 'Honesty'] } },
    ],
  },

  // ==========================================================================
  // Local government — 1 fact before
  // ==========================================================================
  {
    id: 'f426', tag: 'Local government', chapter: 5, verify: false, source: CH5,
    question: 'What are the democratically elected bodies that govern towns, cities and rural areas called?',
    answer: 'Councils, often called local authorities',
    forms: [
      { question: 'What are the elected bodies governing towns and cities usually called?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Local authorities', distractors: ['Regional assemblies', 'County executives', 'Civic boards'] } },
      { question: 'Some areas have two tiers of council. Which pair is correct?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'District and county councils', distractors: ['Parish and regional councils', 'Borough and national councils', 'Ward and provincial councils'] } },
      { question: 'Most large towns and cities are governed by how many local authorities?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'A single authority', distractors: ['Two separate authorities', 'Three separate authorities', 'Four separate authorities'] } },
    ],
  },
  {
    id: 'f427', tag: 'Local government', chapter: 5, verify: false, source: CH5,
    question: 'In which month are local council elections normally held?',
    answer: 'May',
    forms: [
      { question: 'In which month are local council elections normally held?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'May', distractors: ['March', 'September', 'November'] } },
      { question: 'For most local authorities, councillors are elected in which month each year?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'May', distractors: ['January', 'June', 'October'] } },
      { question: 'Which statement about local elections is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'They are usually held in May every year', distractors: ['They are held once every seven years', 'They are held in November of each year', 'They are held only when called'] } },
    ],
  },
  {
    id: 'f428', tag: 'Local government', chapter: 5, verify: false, source: CH5,
    question: 'How many local authorities does London have?',
    answer: '33',
    forms: [
      { question: 'How many local authorities does London have?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '33', distractors: ['25', '41', '49'] } },
      { question: 'Policies across the capital are coordinated by the Mayor of London and which body?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Greater London Authority', distractors: ['The London Assembly and Trust', 'The Corporation of the City of London', 'The Metropolitan Board'] } },
      { question: 'Which figure gives the number of local authorities in London?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '33', distractors: ['13', '23', '43'] } },
    ],
  },
  {
    id: 'f429', tag: 'Local government', chapter: 5, verify: false, source: CH5,
    question: 'What is the usual role of a mayor appointed by a local authority?',
    answer: 'Ceremonial leader of the council',
    forms: [
      { question: 'What is the usual role of a mayor appointed by a local authority?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Ceremonial leader of the council', distractors: ['Chief legal officer of the area', 'Senior officer of the local police', 'Head of the local court service'] } },
      { question: 'In some towns the mayor is elected rather than appointed. What does that mayor become?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The effective leader of the administration', distractors: ['The presiding judge of the district court', 'The chief officer of the local constabulary', 'The chair of the county assembly'] } },
      { question: 'Which of these describes an appointed council mayor?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'A ceremonial figurehead', distractors: ['An elected member of Parliament', 'A senior civil servant', 'A judicial appointment'] } },
    ],
  },

  // ==========================================================================
  // Civil and criminal law — 1 fact before
  // ==========================================================================
  {
    id: 'f430', tag: 'Law', chapter: 5, verify: false, source: CH5,
    question: 'What does criminal law relate to?',
    answer: 'Crimes, usually investigated by the police and punished by the courts',
    forms: [
      { question: 'What does criminal law relate to?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Crimes investigated by the police and punished by courts', distractors: ['Disputes between neighbours over property boundaries', 'Agreements between businesses and their clients', 'Claims for compensation after a road accident'] } },
      { question: 'Who usually investigates a criminal matter?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The police or another authority such as a council', distractors: ['The county court, acting on a written request', 'A solicitor acting on behalf of the victim', 'The local authority ombudsman'] } },
      { question: 'Which of these is an example of criminal law?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Carrying a weapon', distractors: ['Failing to repay a debt', 'Disputing a employment contract', 'Arguing over a property boundary'] } },
    ],
  },
  {
    id: 'f431', tag: 'Law', chapter: 5, verify: false, source: CH5,
    question: 'What is civil law used for?',
    answer: 'Settling disputes between individuals or groups',
    forms: [
      { question: 'What is civil law used for?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Settling disputes between individuals or groups', distractors: ['Punishing serious offences against the state', 'Prosecuting crimes uncovered by the police', 'Enforcing sentences handed down by judges'] } },
      { question: 'Which court hears small civil claims in Scotland?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Sheriff Court', distractors: ['The County Court', 'The Crown Court', 'The Magistrates’ Court'] } },
      { question: 'Which statement correctly distinguishes the two branches of law?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Criminal law punishes crimes; civil law settles disputes', distractors: ['Criminal law settles disputes; civil law punishes crimes', 'Both are used only to punish criminal offences', 'Both are used only to settle private disputes'] } },
    ],
  },

  // ==========================================================================
  // The Industrial Revolution — 4 facts before, all filed under Inventors
  // ==========================================================================
  {
    id: 'f432', tag: 'Industrial Revolution', chapter: 3, verify: false, source: CH3,
    question: 'During which centuries did the Industrial Revolution take place in Britain?',
    answer: 'The 18th and 19th centuries',
    forms: [
      { question: 'During which centuries did the Industrial Revolution take place in Britain?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The 18th and 19th centuries', distractors: ['The 16th and 17th centuries', 'The 17th and 18th centuries', 'The 19th and 20th centuries'] } },
      { question: 'The rapid development of industry in Britain happened in which period?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The 18th and 19th centuries', distractors: ['The 15th and 16th centuries', 'The 20th and 21st centuries', 'The 14th and 15th centuries'] } },
      { question: 'Which country was the first to industrialise on a large scale?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Britain', distractors: ['Germany', 'France', 'The United States'] } },
    ],
  },
  {
    id: 'f433', tag: 'Industrial Revolution', chapter: 3, verify: false, source: CH3,
    question: 'What was the biggest source of employment in Britain before the 18th century?',
    answer: 'Agriculture',
    forms: [
      { question: 'What was the biggest source of employment in Britain before the 18th century?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Agriculture', distractors: ['Shipbuilding', 'Coal mining', 'Textile factories'] } },
      { question: 'Before industrialisation, people often worked from home producing cloth and lace. What were these called?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Cottage industries', distractors: ['Guild workshops', 'Manor trades', 'Village manufactories'] } },
      { question: 'After industrialisation, what became the main source of employment in Britain?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Manufacturing jobs', distractors: ['Agricultural and farming work', 'Domestic service in large houses', 'Merchant shipping'] } },
    ],
  },
  {
    id: 'f434', tag: 'Industrial Revolution', chapter: 3, verify: false, source: CH3,
    question: 'What two developments made the Industrial Revolution possible?',
    answer: 'The development of machinery and the use of steam power',
    forms: [
      { question: 'What two developments made the Industrial Revolution possible?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Machinery and the use of steam power', distractors: ['Electricity and the internal combustion engine', 'Printing and improved road surfaces', 'Gas lighting and the telegraph system'] } },
      { question: 'What was needed to power the new factories?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Coal and other raw materials', distractors: ['Oil and natural gas supplies', 'Water wheels and windmills', 'Imported timber and charcoal'] } },
      { question: 'Where did many people move from in order to work in mining and manufacturing?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The countryside', distractors: ['Overseas colonies', 'Coastal fishing ports', 'Scotland and Wales only'] } },
    ],
  },
  {
    id: 'f435', tag: 'Industrial Revolution', chapter: 3, verify: false, source: CH3,
    question: 'Which process allowed the mass production of steel?',
    answer: 'The Bessemer process',
    forms: [
      { question: 'Which process allowed the mass production of steel?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Bessemer process', distractors: ['The Arkwright process', 'The Faraday process', 'The Watt process'] } },
      { question: 'The Bessemer process led to the growth of which two industries?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Shipbuilding and the railways', distractors: ['Textile weaving and coal mining', 'Pottery and glassmaking trades', 'Farming and food processing'] } },
      { question: 'Which development is associated with the mass production of steel?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The Bessemer process', distractors: ['The spinning jenny', 'The steam locomotive', 'The power loom'] } },
    ],
  },
  {
    id: 'f436', tag: 'Industrial Revolution', chapter: 3, verify: false, source: CH3,
    question: 'What was built to transport raw materials and manufactured goods between factories and towns?',
    answer: 'Canals',
    forms: [
      { question: 'What was built to link factories to towns and cities during the Industrial Revolution?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Canals', distractors: ['Motorways', 'Tramways', 'Aqueducts'] } },
      { question: 'Better transport links were needed for industry. Which came first?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Canals', distractors: ['Airports', 'Underground railways', 'Suspension bridges'] } },
      { question: 'Which of these was a transport development of the Industrial Revolution?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The building of canals', distractors: ['The building of motorways', 'The opening of airports', 'The laying of pipelines'] } },
    ],
  },
  {
    id: 'f437', tag: 'Industrial Revolution', chapter: 3, verify: false, source: CH3,
    question: 'Which industrialist improved the carding machine and is remembered for running factories efficiently?',
    answer: 'Richard Arkwright',
    forms: [
      { question: 'Which industrialist improved the carding machine?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Richard Arkwright', distractors: ['Isambard Brunel', 'George Stephenson', 'Henry Bessemer'] } },
      { question: 'Richard Arkwright originally trained and worked in which trade?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'As a barber and wigmaker', distractors: ['As a blacksmith and farrier', 'As a carpenter and joiner', 'As a weaver and dyer'] } },
      { question: 'What is carding?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Preparing fibres for spinning into yarn', distractors: ['Weaving spun yarn into finished cloth', 'Dyeing finished fabric by hand', 'Cutting cloth to a paper pattern'] } },
    ],
  },
  {
    id: 'f438', tag: 'Enlightenment', chapter: 3, verify: false, source: CH3,
    question: 'Which Scottish thinker developed ideas about economics still referred to today?',
    answer: 'Adam Smith',
    forms: [
      { question: 'Which Scottish thinker developed ideas about economics still referred to today?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Adam Smith', distractors: ['David Hume', 'James Watt', 'Robert Adam'] } },
      { question: 'Adam Smith is remembered for developing ideas in which field?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Economics', distractors: ['Astronomy', 'Medicine', 'Engineering'] } },
      { question: 'What was one of the most important principles of the Enlightenment?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Everyone should have the right to their own political and religious beliefs', distractors: ['The state should direct religious observance for all', 'Only landowners should hold political views', 'Science should replace religious belief entirely'] } },
    ],
  },

  // ==========================================================================
  // Architecture — 2 facts before
  // ==========================================================================
  {
    id: 'f439', tag: 'Architecture', chapter: 4, verify: false, source: CH4,
    question: 'Which 17th-century architect designed the Queen’s House at Greenwich and the Banqueting House in Whitehall?',
    answer: 'Inigo Jones',
    forms: [
      { question: 'Who designed the Queen’s House at Greenwich and the Banqueting House in Whitehall?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Inigo Jones', distractors: ['Robert Adam', 'Edwin Lutyens', 'Christopher Wren'] } },
      { question: 'Inigo Jones took his inspiration from which style of architecture?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Classical architecture', distractors: ['Gothic revival architecture', 'Norman military architecture', 'Baroque architecture'] } },
      { question: 'In which century did Inigo Jones work?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The 17th century', distractors: ['The 15th century', 'The 18th century', 'The 19th century'] } },
    ],
  },
  {
    id: 'f440', tag: 'Architecture', chapter: 4, verify: false, source: CH4,
    question: 'Which Scottish architect influenced architecture in the UK, Europe and America in the 18th century?',
    answer: 'Robert Adam',
    forms: [
      { question: 'Which Scottish architect influenced 18th-century architecture in the UK, Europe and America?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Robert Adam', distractors: ['Inigo Jones', 'Christopher Wren', 'Edwin Lutyens'] } },
      { question: 'Robert Adam’s ideas influenced architects in which city, where the Royal Crescent was built?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Bath', distractors: ['York', 'Oxford', 'Bristol'] } },
      { question: 'What was distinctive about Robert Adam’s approach to his buildings?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'He designed the interior decoration as well', distractors: ['He worked only in locally quarried stone', 'He built exclusively for the crown', 'He refused all classical influence'] } },
    ],
  },
  {
    id: 'f441', tag: 'Architecture', chapter: 4, verify: false, source: CH4,
    question: 'Which architectural style became popular again in the 19th century?',
    answer: 'The medieval gothic style',
    forms: [
      { question: 'Which architectural style became popular again in the 19th century?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The medieval gothic style', distractors: ['The classical Roman style', 'The Norman military style', 'The modernist concrete style'] } },
      { question: 'The Houses of Parliament and St Pancras Station were built in which style?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Gothic', distractors: ['Classical', 'Baroque', 'Palladian'] } },
      { question: 'Which of these was built during the 19th-century gothic revival?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'St Pancras Station', distractors: ['The Banqueting House', 'The White Tower', 'The Royal Crescent'] } },
    ],
  },
  {
    id: 'f442', tag: 'Architecture', chapter: 4, verify: false, source: CH4,
    question: 'Which cathedral cities are named as examples of great medieval church building?',
    answer: 'Durham, Lincoln, Canterbury and Salisbury',
    forms: [
      { question: 'Which set of cathedral cities is named as an example of medieval church building?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Durham, Lincoln, Canterbury and Salisbury', distractors: ['Bath, Bristol, Exeter and Truro', 'York, Ripon, Chester and Carlisle', 'Norwich, Ely, Peterborough and Wells cathedrals'] } },
      { question: 'The White Tower in the Tower of London is an example of what?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'A Norman castle keep', distractors: ['A Tudor gatehouse and lodge', 'A Saxon coastal watchtower', 'A Georgian folly'] } },
      { question: 'On whose orders was the White Tower built?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'William the Conqueror', distractors: ['Henry VIII', 'Richard the Lionheart', 'Edward the Confessor'] } },
    ],
  },
];
