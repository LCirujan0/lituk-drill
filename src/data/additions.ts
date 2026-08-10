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
const CH2 = 'Handbook 3rd ed., ch.2 “What is the UK?”';
const CH1 = 'Handbook 3rd ed., ch.1 “The values and principles of the UK”';

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
        answers: { kind: 'fixed', correct: 'The United Kingdom', distractors: ['France', 'Germany', 'Italy'] } },
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
        answers: { kind: 'fixed', correct: 'More than 190', distractors: ['More than 290', 'More than 250', 'More than 320'] } },
      { question: 'The United Nations has a membership of approximately what size?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Over 190 countries', distractors: ['Over 240 countries', 'Over 290 countries', 'Over 390 countries'] } },
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
        answers: { kind: 'fixed', correct: 'Her eldest son, Charles', distractors: ['Her grandson, William of Wales', 'Her younger son, Edward', 'Her great-grandson, Prince George'] } },
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
      { question: 'Some areas have two tiers of council. Which pair is correct?', mcqOnly: true,
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
        answers: { kind: 'fixed', correct: 'The effective leader of the administration', distractors: ['The ceremonial leader of the council', 'The chief officer of the local constabulary', 'The chair of the county assembly'] } },
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
        answers: { kind: 'fixed', correct: 'Carrying a weapon', distractors: ['Failing to repay a debt', 'Disputing an employment contract', 'Arguing over a property boundary'] } },
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
        answers: { kind: 'fixed', correct: 'The Bessemer process', distractors: ['The Arkwright process', 'The Stephenson process', 'The Watt process'] } },
      { question: 'The Bessemer process led to the growth of which two industries?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Shipbuilding and the railways', distractors: ['Textile weaving and coal mining', 'Pottery and glassmaking trades', 'Farming and food processing'] } },
      { question: 'Which development is associated with the mass production of steel?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The Bessemer process', distractors: ['The spinning jenny', 'The carding machine', 'The power loom'] } },
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
        answers: { kind: 'fixed', correct: 'Richard Arkwright', distractors: ['Isambard Kingdom Brunel', 'George Stephenson', 'Henry Bessemer'] } },
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

  // ======================================================================
  // Added to fill topics measured thin against the handbook (D-029).
  // Pubs and licensing, money and banknotes, and the environment had ZERO facts
  // between them; education, empire, media, film and the interwar years were
  // covered at a fraction of the space the book gives them.
  // ======================================================================

  // ---- culture ----
{
    id: 'f443', tag: 'Cinema', chapter: 4, verify: false, source: CH4,
    question: 'In which year were films first shown publicly in the UK?',
    answer: '1896',
    explanation: { lead: 'Special effects are the thread to hold on to here: the handbook says British film makers were known for clever effects from the very beginning and remain so, which makes the animation and effects work later in the section a continuation rather than a new departure. The trap is drifting a decade either way from the turn of the century.' },
    forms: [
      { question: 'In which year were films first shown publicly in the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1896', distractors: ['1876', '1906', '1926'] } },
      { question: 'Public film screenings began in the UK during which decade?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The 1890s', distractors: ['The 1870s', 'The 1910s', 'The 1930s'] } },
      { question: 'Which statement about the earliest years of British cinema is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Film makers here became known for clever special effects', distractors: ['Films were not shown publicly until after the First World War', 'Early screenings were restricted to private members’ clubs', 'British actors of the period never worked outside Britain'] } },
    ],
  },
  {
    id: 'f444', tag: 'Cinema', chapter: 4, verify: false, source: CH4,
    question: 'Which British actor became famous in silent films for his tramp character?',
    answer: 'Sir Charles (Charlie) Chaplin',
    explanation: { lead: 'He is the handbook’s example of a pattern rather than a one-off — British actors working on both sides of the Atlantic from the earliest days of the medium, which is the same point the later list of Oscar winners makes. Silent film is the era to fix him in; every other performer named in this section belongs to the sound years.' },
    forms: [
      { question: 'Which British actor became famous in silent films for his tramp character?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Charlie Chaplin', distractors: ['David Niven', 'Sir Rex Harrison', 'Richard Burton'] } },
      { question: 'What kind of films made Charlie Chaplin famous?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Silent films', distractors: ['Wartime documentaries', 'Early sound musicals', 'Technicolor adventures'] } },
      { question: 'Charlie Chaplin was one of many British actors of his day to do what?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Make a career in Hollywood', distractors: ['Turn down all offers from American studios', 'Work only for the wartime Ministry of Information', 'Leave acting for a career in stage design'] } },
    ],
  },
  {
    id: 'f445', tag: 'Cinema', chapter: 4, verify: false, source: CH4,
    question: 'How many Oscars has the British animator Nick Park won?',
    answer: 'Four',
    explanation: { lead: 'His name is really standing in for a whole industry: he is the handbook’s single piece of evidence for its claim that Britain remains particularly strong in special effects and animation. Three of his awards are for films with the same pair of characters, which is where the two numbers get muddled together.' },
    forms: [
      { question: 'How many Oscars has the British animator Nick Park won?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Four', distractors: ['Two', 'Three', 'Seven'] } },
      { question: 'Most of Nick Park’s Oscar-winning films feature which pair of characters?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Wallace and Gromit', distractors: ['Gilbert and Sullivan', 'Morecambe and Wise', 'Laurel and Hardy'] } },
      { question: 'For which kind of film making is Nick Park known?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Animation', distractors: ['Documentary', 'Costume drama', 'Wartime newsreel'] } },
    ],
  },
  {
    id: 'f446', tag: 'Cinema', chapter: 4, verify: false, source: CH4,
    question: 'Which British film studio has a claim to being the oldest continuously working in the world?',
    answer: 'Ealing Studios',
    explanation: { lead: 'The word carrying the claim is “continuously” — other places are older as buildings, but this one has never stopped, which is a much narrower boast than simply being first. Its name is also attached to the run of British comedies from around 1950 that the handbook lists a few lines earlier, so the studio and that comedy boom are worth learning as one thing.' },
    forms: [
      { question: 'Which British film studio has a claim to being the oldest continuously working in the world?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Ealing Studios', distractors: ['Pinewood Studios', 'Shepperton Studios', 'Elstree Studios'] } },
      { question: 'What claim does the handbook make for Ealing Studios?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'It is the oldest continuously working film studio', distractors: ['It was the first British studio to make films with sound', 'It is the largest studio complex anywhere in Europe', 'It is the only studio in Britain owned by the BBC'] } },
      { question: 'Which statement about Ealing Studios is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'It has a claim to being the world’s oldest working film studio', distractors: ['It was founded by the British Broadcasting Corporation in the 1950s', 'It was built after the Second World War to make television series', 'It is the only film studio still in operation anywhere in Britain'] } },
    ],
  },
  {
    id: 'f447', tag: 'Cinema', chapter: 4, verify: false, source: CH4,
    question: 'Which annual awards are the British equivalent of the Oscars?',
    answer: 'The British Academy Film Awards, hosted by BAFTA',
    explanation: { lead: 'One body covers both film and television, which is why the acronym carries television in it even though the ceremony people mean is the film one. The prizes in this chapter are only ever confused across art forms — pin each award to its medium and the questions fall apart on their own.' },
    forms: [
      { question: 'Which annual awards are the British equivalent of the Oscars?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The British Academy Film Awards', distractors: ['The Man Booker Prize for Fiction', 'The Laurence Olivier Awards', 'The Mercury Music Prize'] } },
      { question: 'What does the abbreviation BAFTA stand for?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'British Academy of Film and Television Arts', distractors: ['British Awards for Film, Theatre and Animation', 'British Association of Film and Theatre Actors', 'Board of Arts, Film, Television and Audio'] } },
      { question: 'Which of these British awards is given for film rather than theatre, music or books?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The BAFTAs', distractors: ['The Man Booker Prize', 'The Brit Awards', 'The Oliviers'] } },
    ],
  },
  {
    id: 'f448', tag: 'Cinema', chapter: 4, verify: false, source: CH4,
    question: 'Which two film franchises are the highest-grossing of all time, and where were they produced?',
    answer: 'Harry Potter and James Bond, both produced in the UK',
    explanation: { lead: 'The claim is about where the work was done, not what the films are about — the money and the audiences are worldwide, the production is British. It sits directly beside the handbook’s point that foreign companies now make many films here using British expertise: the strength being described is in the making, not the owning.' },
    forms: [
      { question: 'Which two film franchises are the two highest-grossing of all time?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Harry Potter and James Bond', distractors: ['Wallace and Gromit and Chariots of Fire', 'The 39 Steps and The Third Man', 'Carry On and St Trinian’s'] } },
      { question: 'Where were the Harry Potter and James Bond films produced?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'In the UK', distractors: ['In the USA', 'In Canada', 'In Australia'] } },
      { question: 'Which claim does the handbook make about British film production?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The two highest-grossing franchises were produced here', distractors: ['British studios now make only low-budget documentaries', 'Foreign companies are excluded from British film studios', 'No British film has ever topped the box office abroad'] } },
    ],
  },
  {
    id: 'f449', tag: 'Cinema', chapter: 4, verify: false, source: CH4,
    question: 'Which British director made both Brief Encounter and Lawrence of Arabia?',
    answer: 'Sir David Lean',
    explanation: { lead: 'He is the handbook’s bridge between two eras — a film from the year the war ended and an epic seventeen years later, both on its list of famous British films — and he is named again with Ridley Scott as a director who succeeded at home and abroad. Sir Alexander Korda and Alfred Hitchcock belong to the 1930s studio boom before him, and that chronology is what sorts the wrong answers out.' },
    forms: [
      { question: 'Which British director made both Brief Encounter and Lawrence of Arabia?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Sir David Lean', distractors: ['Sir Alfred Hitchcock', 'Sir Alexander Korda', 'Ridley Scott'] } },
      { question: 'Lawrence of Arabia was released in which year?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1962', distractors: ['1935', '1945', '1981'] } },
      { question: 'Which director is named alongside Ridley Scott as succeeding both in the UK and internationally?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Sir David Lean', distractors: ['Sir Alexander Korda', 'Hugh Hudson', 'Carol Reed'] } },
    ],
  },
  {
    id: 'f450', tag: 'Comedy', chapter: 4, verify: false, source: CH4,
    question: 'What was music hall, where British comedians were once a popular feature?',
    answer: 'A form of variety theatre',
    explanation: { lead: 'The handbook describes a handover rather than an ending: the performers did not disappear when the halls emptied, they moved to the new medium and took their audience with them, which is why it names the double act that made exactly that jump. Variety is the word doing the work — a bill of many short turns, not a single play.' },
    forms: [
      { question: 'What was music hall, where British comedians were once a popular feature?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'A form of variety theatre', distractors: ['A type of orchestral concert', 'A season of open-air opera', 'A style of religious drama'] } },
      { question: 'What brought about the decline of the music hall in the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Television became the leading form of entertainment', distractors: ['Wartime restrictions that closed theatres across the country', 'A change in the law licensing public performances', 'The rising cost of touring by rail across Britain'] } },
      { question: 'Which comedy double act moved from the music halls to become television stars?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Morecambe and Wise', distractors: ['Gilbert and Sullivan', 'Wallace and Gromit', 'Laurel and Hardy'] } },
    ],
  },
  {
    id: 'f451', tag: 'Comedy', chapter: 4, verify: false, source: CH4,
    question: 'Which satirical television programme ran through the 1980s and 1990s?',
    answer: 'Spitting Image',
    explanation: { lead: 'The handbook gives television comedy a running order, and the decade alone is usually enough to identify the show: satire early in the sixties, a new progressive style at the close of that decade, then satire again through the eighties and nineties. The tradition is far older than television — it runs back through the satirical magazines to the political cartoons of the 1700s.' },
    forms: [
      { question: 'Which satirical television programme ran through the 1980s and 1990s?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Spitting Image', distractors: ['Monty Python’s Flying Circus', 'That Was The Week That Was', 'Coronation Street'] } },
      { question: 'In which decade was the satirical show That Was The Week That Was broadcast?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The 1960s', distractors: ['The 1940s', 'The 1980s', 'The 2000s'] } },
      { question: 'Television satire in the handbook is represented by which show from the 1960s?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'That Was The Week That Was', distractors: ['Private Eye, the satirical magazine', 'Coronation Street', 'Spitting Image'] } },
    ],
  },
  {
    id: 'f452', tag: 'Comedy', chapter: 4, verify: false, source: CH4,
    question: 'Who told jokes and made fun of people at the courts of medieval kings and nobles?',
    answer: 'Jesters',
    explanation: { lead: 'It is placed first for a reason: the handbook builds an unbroken line from mocking the powerful at court, through Shakespeare’s comic characters and the eighteenth-century political cartoon, to satirical magazines and television. The claim being made is about national character — that laughing at ourselves, and at those in charge, is both old and continuous.' },
    forms: [
      { question: 'Who told jokes and made fun of people at the courts of medieval kings and nobles?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Jesters', distractors: ['Heralds', 'Chancellors', 'Troubadours'] } },
      { question: 'The handbook traces British comedy back to which figure at the medieval court?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The jester', distractors: ['The herald', 'The chaplain', 'The chamberlain'] } },
      { question: 'Which came earliest in the history of British comedy the handbook describes?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Jesters at the courts of medieval kings', distractors: ['Political cartoons attacking politicians', 'Comedians performing in the music halls', 'Satirical magazines such as Punch'] } },
    ],
  },
  {
    id: 'f453', tag: 'Leisure', chapter: 4, verify: false, source: CH4,
    question: 'What is an allotment?',
    answer: 'A piece of land people rent to grow fruit and vegetables',
    explanation: { lead: 'The word is worth knowing on its own because it names something with no close equivalent in most countries — land rented purely for growing food, separate from wherever you live. It heads the leisure chapter because gardening is the first activity the handbook reaches for when describing how people here spend their free time.' },
    forms: [
      { question: 'What is the name for a piece of land people rent to grow fruit and vegetables?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'An allotment', distractors: ['A smallholding', 'A market garden', 'A croft'] } },
      { question: 'People who rent an allotment usually use it for what?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Growing fruit and vegetables', distractors: ['Storing unwanted household items', 'Keeping horses and ponies', 'Parking a caravan or boat'] } },
      { question: 'Which of these best describes an allotment?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Rented land for growing food', distractors: ['A garden belonging to a rented house', 'A public park run by the council', 'A shared village orchard'] } },
    ],
  },
  {
    id: 'f454', tag: 'Architecture', chapter: 4, verify: false, source: CH4,
    question: 'Which 18th-century designer laid out the grounds of country houses so that they looked natural?',
    answer: 'Lancelot ‘Capability’ Brown',
    explanation: { lead: 'The style is the point: grass, trees and lakes arranged so the grounds read as untouched countryside rather than as a design, which was a deliberate turn away from the formal geometry that came before. He and Gertrude Jekyll are the pair the handbook names, roughly a century apart and pulling opposite ways — his landscapes are green and open, hers planted and full of colour.' },
    forms: [
      { question: 'Which 18th-century designer laid out the grounds of country houses so that they looked natural?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Capability Brown', distractors: ['Thomas Gainsborough', 'Sir Edwin Lutyens', 'Gertrude Jekyll'] } },
      { question: 'How did Lancelot Brown come by the nickname ‘Capability’?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'He often said a place had ‘capabilities’', distractors: ['It was the name of his family’s estate in the north', 'He claimed he could design any garden in a single day', 'He was famed for finishing his work ahead of time'] } },
      { question: 'Which designer worked with Sir Edwin Lutyens on colourful gardens around his houses?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Gertrude Jekyll', distractors: ['Vivienne Westwood', 'Capability Brown', 'Clarice Cliff'] } },
    ],
  },
  {
    id: 'f455', tag: 'Leisure', chapter: 4, verify: false, source: CH4,
    question: 'Who provides vaccinations and medical treatment for animals in the UK?',
    answer: 'Veterinary surgeons, known as vets',
    explanation: { lead: 'Two separate duties sit behind this: the law makes cruelty and neglect an offence, and the practical burden of care falls on the owner rather than on any public service. There is no NHS for animals, which is precisely why charities exist to help with the bill — that gap is what the question is really testing.' },
    forms: [
      { question: 'Who provides vaccinations and medical treatment for animals in the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Veterinary surgeons, known as vets', distractors: ['Officers of the RSPCA’s inspectorate', 'Animal welfare officers at the council', 'Nurses at NHS walk-in centres'] } },
      { question: 'What help is available for someone who cannot afford to pay a vet?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Charities may help with the cost', distractors: ['The NHS covers treatment for pets', 'Councils fund treatment for pets', 'Vets must treat any animal free'] } },
      { question: 'Which statement about keeping a pet in the UK is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Treating a pet cruelly or neglecting it is illegal', distractors: ['Pet owners must register their animal with the local council', 'Only licensed households are permitted to keep a dog', 'Every pet must be insured before it can be treated'] } },
    ],
  },
  {
    id: 'f456', tag: 'Leisure', chapter: 4, verify: false, source: CH4,
    question: 'In which part of the UK is Bodnant Garden?',
    answer: 'Wales',
    explanation: { lead: 'The famous gardens are asked as a set spread across the four nations, in the same way the traditional foods and the patron saints are. Kew and Sissinghurst are the English ones almost anyone can name, which is exactly why questions tend to reach for the Welsh, Scottish and Northern Irish entries instead.' },
    forms: [
      { question: 'In which part of the UK is Bodnant Garden?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Wales', distractors: ['England', 'Scotland', 'Northern Ireland'] } },
      { question: 'Which of the famous gardens named by the handbook is in Northern Ireland?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Mount Stewart', distractors: ['Bodnant Garden', 'Crathes Castle', 'Kew Gardens'] } },
      { question: 'Which pair of famous gardens are both in Scotland?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Crathes and Inveraray Castles', distractors: ['Kew Gardens and Sissinghurst Castle', 'Bodnant and Mount Stewart', 'Sissinghurst and Hidcote'] } },
    ],
  },

  // ---- education ----
{
    id: 'f457', tag: 'Education', chapter: 3, verify: false, source: CH3,
    question: 'Which Act introduced free secondary education in England and Wales?',
    answer: 'The Education Act 1944',
    explanation: { lead: 'Schooling was reformed while the war was still being fought, ahead of the rest of the welfare state — the Beveridge Report came in 1942 and the health service not until 1948. The nickname this Act usually carries comes from the minister who steered it through, which is the other half of what questions ask.' },
    forms: [
      { question: 'Which Act introduced free secondary education in England and Wales?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Education Act 1944', distractors: ['The Education Act 1902', 'The Elementary Education Act 1870', 'The Human Rights Act 1998'] } },
      { question: 'The Education Act often known as the Butler Act was passed in which year?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1944', distractors: ['1942', '1948', '1951'] } },
      { question: 'Which of these was introduced by the Education Act 1944?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Free secondary education', distractors: ['Free university tuition', 'Free meals for all secondary pupils', 'A national school leaving certificate'] } },
    ],
  },
  {
    id: 'f458', tag: 'Education', chapter: 3, verify: false, source: CH3,
    question: 'Which politician gave his name to the 1944 Education Act?',
    answer: 'R A Butler',
    explanation: { lead: 'He was a Conservative serving in a wartime coalition, so the Act was never a party measure — part of why it survived the change of government in 1945 untouched. Keep him apart from Beveridge and Bevan, the other two names in this stretch of the chapter, who dealt with social security and health rather than schools.' },
    forms: [
      { question: 'Which politician gave his name to the 1944 Education Act?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'R A Butler', distractors: ['William Beveridge', 'Aneurin Bevan', 'Clement Attlee'] } },
      { question: 'R A Butler was a member of which political party?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Conservative Party', distractors: ['The Labour Party', 'The Liberal Party', 'The Social Democratic Party'] } },
      { question: 'Which description fits R A Butler?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The minister who oversaw the 1944 Education Act', distractors: ['The economist whose report shaped the welfare state', 'The Health Minister who established the NHS in 1948', 'The wartime leader of the coalition government'] } },
    ],
  },
  {
    id: 'f459', tag: 'Education', chapter: 3, verify: false, source: CH3,
    question: 'Which division of schooling did the 1944 Education Act enforce?',
    answer: 'The division between primary and secondary schools',
    explanation: { lead: 'This is one of the few pieces of 1940s legislation you can still see from the street: most children in Britain change school at the boundary it drew. The handbook is careful to add that almost everything else about the system has changed since, so the structure outlasted the Act that made it.' },
    forms: [
      { question: 'The 1944 Education Act enforced a division between which two kinds of school?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Primary and secondary schools', distractors: ['Grammar and boarding schools', 'Nursery and infant schools', 'Fee-paying and charitable schools'] } },
      { question: 'Free secondary education under the 1944 Act was introduced in which parts of the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'England and Wales', distractors: ['Scotland and Wales', 'Northern Ireland only', 'The whole of the United Kingdom'] } },
      { question: 'Which statement about the school structure set up by the 1944 Act is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'It still applies in most areas of Britain', distractors: ['It was abolished within ten years', 'It applied only while the war lasted', 'It has been replaced by a single continuous stage'] } },
    ],
  },
  {
    id: 'f460', tag: 'Union', chapter: 3, verify: false, source: CH3,
    question: 'When the Act of Union was agreed in 1707, which institutions did Scotland keep?',
    answer: 'Its own legal and education systems and its Presbyterian Church',
    explanation: { lead: 'The union removed the Scottish parliament but left Scottish civil society standing, which is why devolution three centuries later had distinct institutions ready to hand back rather than new ones to invent. It is also why schools and courts north of the border still work differently from those in England.' },
    forms: [
      { question: 'Scotland kept three things of its own after the 1707 Act of Union. Which?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Its legal and education systems and its Church', distractors: ['Its own parliament, its own currency and its army', 'Its monarchy, its coinage and its own flag', 'Its foreign policy, its taxes and its navy'] } },
      { question: 'After 1707, Scotland went on running its own system of what, alongside its own laws?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Education', distractors: ['Defence', 'Currency', 'Foreign policy'] } },
      { question: 'Which statement about Scotland after the 1707 Act of Union is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'It kept its own education system', distractors: ['It adopted the English school system', 'It lost control of its own churches', 'It kept its parliament in Edinburgh'] } },
    ],
  },
  {
    id: 'f461', tag: 'Education', chapter: 3, verify: false, source: CH3,
    question: 'When were free school meals first introduced in Britain?',
    answer: 'Before the First World War',
    explanation: { lead: 'They belong to the run of social measures the handbook lists together — old-age pensions, help for the unemployed, safer workplaces — in a period it describes as one of optimism and progress. The trap is dating anything that sounds like welfare to Attlee’s government of the 1940s, when several of the pieces had been in place for decades.' },
    forms: [
      { question: 'Free school meals and old-age pensions were first introduced at which point?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Before the First World War', distractors: ['During the Second World War', 'Just after the Second World War', 'During the 1930s Depression'] } },
      { question: 'Which measure for schoolchildren was introduced before the First World War?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Free school meals', distractors: ['The National Health Service', 'Free secondary education', 'Comprehensive schools'] } },
      { question: 'Which statement about free school meals is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'They were introduced before 1914', distractors: ['They began with the 1944 Education Act', 'They were first provided by the NHS in 1948', 'They were introduced during the 1930s'] } },
    ],
  },
  {
    id: 'f462', tag: 'Welfare State', chapter: 3, verify: false, source: CH3,
    question: 'Which of the five ‘Giant Evils’ named in the Beveridge Report stood for the lack of education?',
    answer: 'Ignorance',
    explanation: { lead: 'Beveridge gave each social problem a single blunt word, and this one is why schooling sits inside the welfare-state story rather than beside it. The five map neatly onto benefits, health, education, housing and employment, so learning the mapping gives you the list.' },
    forms: [
      { question: 'In the Beveridge Report, which of the five ‘Giant Evils’ referred to a lack of education?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Ignorance', distractors: ['Illiteracy', 'Idleness', 'Deprivation'] } },
      { question: 'How many ‘Giant Evils’ did the Beveridge Report say the government should fight?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Five', distractors: ['Three', 'Four', 'Seven'] } },
      { question: 'Which set names the ‘Giant Evils’ of the Beveridge Report?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Want, Disease, Ignorance, Squalor and Idleness', distractors: ['Poverty, Illness, Crime, Hunger and Bad Housing', 'Want, Crime, Ignorance, Disorder and Debt', 'Disease, Idleness, Poverty, Waste and Fear'] } },
    ],
  },
  {
    id: 'f463', tag: 'Education', chapter: 4, verify: false, source: CH4,
    question: 'Where in the education system is the Welsh language taught?',
    answer: 'In schools and universities',
    explanation: { lead: 'Welsh is a separate language rather than a dialect of English, which is why it has to be formally taught rather than simply picked up at home, and why Assembly business and publications run in both languages. Gaelic and Irish are the parallel cases the chapter names, but neither is described in the same terms.' },
    forms: [
      { question: 'The Welsh language is taught in which parts of the education system?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'In schools and universities', distractors: ['In primary schools only', 'In schools but not in universities', 'In secondary schools only'] } },
      { question: 'What is the relationship between Welsh and English?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Welsh is a completely different language', distractors: ['Welsh is a regional dialect of older English', 'Welsh is an older spelling of English', 'Welsh is a form of Scottish Gaelic'] } },
      { question: 'Which statement about the Welsh language is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'It is taught in schools and universities', distractors: ['It is spoken only by people over 60', 'It has no written form of its own', 'It is a dialect rather than a separate language'] } },
    ],
  },
  {
    id: 'f464', tag: 'Education', chapter: 4, verify: false, source: CH4,
    question: 'On average, who leaves school with better qualifications, girls or boys?',
    answer: 'Girls',
    explanation: { lead: 'The handbook sets this beside women making up about half the workforce and outnumbering men at university — three figures offered together as evidence that the legal equality described earlier shows up in practice. It is a claim about averages rather than individuals, and the test phrases it that way too.' },
    forms: [
      { question: 'On average, who leaves school with better qualifications in the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Girls', distractors: ['Boys', 'Neither, results are equal', 'It varies between the four nations'] } },
      { question: 'Who makes up the larger share of university students in the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Women', distractors: ['Men', 'The numbers are exactly equal', 'Men, by a large margin'] } },
      { question: 'Which statement about women in the UK today is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'More women than men study at university', distractors: ['Women make up a tenth of the workforce', 'Fewer women than men complete school', 'Most women stop working when they have children'] } },
    ],
  },
  {
    id: 'f465', tag: 'Community', chapter: 5, verify: false, source: CH5,
    question: 'What are the three key roles of school governors and school boards?',
    answer: 'Setting the strategic direction, ensuring accountability, and monitoring and evaluating school performance',
    explanation: { lead: 'Not one of the three is about teaching: a governing body steers the school and holds it to account rather than running the classroom, which is why no teaching qualification is wanted. The same pattern of oversight by lay volunteers turns up in magistrates and juries elsewhere in this chapter.' },
    forms: [
      { question: 'How many key roles do school governors and school boards have?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Three', distractors: ['Two', 'Five', 'Seven'] } },
      { question: 'Name one of the three key roles of a school governing body.', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Setting the school’s strategic direction', distractors: ['Teaching classes when staff are unavailable', 'Marking pupils’ examination papers', 'Setting the national curriculum'] } },
      { question: 'Which task is NOT one of the three key roles of school governors?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Deciding what is taught in each lesson', distractors: ['Ensuring accountability', 'Setting the strategic direction', 'Monitoring and evaluating school performance'] } },
    ],
  },
  {
    id: 'f466', tag: 'Community', chapter: 5, verify: false, source: CH5,
    question: 'What are school governors called in Scotland?',
    answer: 'Members of the school board',
    explanation: { lead: 'Scotland has run its own education system since the union of 1707, so the different name reflects a genuinely separate structure rather than a local habit. When a question offers an English term against a Scottish one, it is usually testing whether you noticed the system is not uniform across the UK.' },
    forms: [
      { question: 'In Scotland, what is the equivalent of a school governor called?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'A member of the school board', distractors: ['A parent representative', 'A school commissioner', 'A member of the education council'] } },
      { question: 'A school board, rather than a body of governors, is found in which part of the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Scotland', distractors: ['Wales', 'Northern Ireland', 'England'] } },
      { question: 'Which statement about school governors is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'In Scotland they sit on a school board', distractors: ['They must hold a teaching qualification', 'They are appointed by central government', 'The role carries an upper age limit of 70'] } },
    ],
  },
  {
    id: 'f467', tag: 'Community', chapter: 5, verify: false, source: CH5,
    question: 'In England, who can apply to open a free school?',
    answer: 'Parents and other community groups',
    explanation: { lead: 'This is the strongest form of the participation principle in the whole book — not helping to run an institution but starting one. It applies in England only, which is the detail worth carrying, and the handbook points you at the education department for the rest.' },
    forms: [
      { question: 'In England, who may apply to open a free school in their local area?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Parents and other community groups', distractors: ['Local councils and their education departments', 'Only registered charities and churches', 'Only the Department for Education'] } },
      { question: 'Applying to open a free school is possible in which part of the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'England', distractors: ['Scotland', 'Wales', 'Northern Ireland'] } },
      { question: 'Which government department deals with free schools in England?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The Department for Education', distractors: ['The Home Office', 'The Ministry of Justice', 'The Department for Work and Pensions'] } },
    ],
  },
  {
    id: 'f468', tag: 'Devolution', chapter: 5, verify: false, source: CH5,
    question: 'Which public service is run by the devolved administrations rather than by the UK government?',
    answer: 'Education',
    explanation: { lead: 'The dividing line is that what holds the state together — defence, foreign affairs, immigration, taxation and social security — stays at Westminster, while the services people use day to day were handed over. That is why schooling can differ across the four nations while the army cannot.' },
    forms: [
      { question: 'Which major public service is run by the devolved administrations rather than from Westminster?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Education', distractors: ['Defence', 'Immigration', 'Social security'] } },
      { question: 'The Welsh Assembly can make laws in 20 areas. Which is one of them?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Education and training', distractors: ['Defence and the armed forces', 'Immigration and border control', 'Foreign affairs'] } },
      { question: 'Which of these lists only matters that remain under UK government control?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Defence, foreign affairs and immigration', distractors: ['Education, health and housing', 'Education, defence and social services', 'Housing, education and economic development'] } },
    ],
  },

  // ---- empire ----
{
    id: 'f469', tag: 'Empire', chapter: 3, verify: false, source: CH3,
    question: 'How many countries were granted independence in 1947?',
    answer: 'Nine',
    explanation: { lead: 'Two years after winning a war, Britain was too exhausted to hold the empire together, and it let go of a whole batch of colonies at once rather than one at a time. India, Pakistan and Ceylon are simply the three the book names out of a much longer list.' },
    forms: [
      { question: 'How many countries were granted independence in 1947?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Nine', distractors: ['Three', 'Five', 'Twelve'] } },
      { question: 'In the year India and Pakistan became independent, how many colonies gained self-government altogether?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Nine', distractors: ['Four', 'Six', 'Fifteen'] } },
      { question: 'Which statement about the independence granted in 1947 is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Nine countries became independent, among them India and Pakistan', distractors: ['Independence was granted to two countries only, India and Ceylon', 'Just one country, India, became independent in that year', 'Nineteen countries became independent in that single year'] } },
    ],
  },
  {
    id: 'f470', tag: 'Empire', chapter: 3, verify: false, source: CH3,
    question: 'Ceylon, which became independent in 1947, is known by what name today?',
    answer: 'Sri Lanka',
    explanation: { lead: 'The book gives the colonial name first and the modern one after it, so a question can come at you from either direction. It is the third of the 1947 trio and the one people forget, because the other two kept the names they became independent under.' },
    forms: [
      { question: 'Ceylon, which became independent in 1947, is known by what name today?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Sri Lanka', distractors: ['Myanmar', 'Bangladesh', 'Malaysia'] } },
      { question: 'Which modern country was called Ceylon when Britain granted it independence?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Sri Lanka', distractors: ['Singapore', 'Mauritius', 'Seychelles'] } },
      { question: 'Which of these matches a former colonial name to its modern country correctly?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Ceylon is now Sri Lanka', distractors: ['Ceylon is now the Maldives', 'Ceylon is now Bangladesh', 'Ceylon is now Myanmar'] } },
    ],
  },
  {
    id: 'f471', tag: 'Empire', chapter: 3, verify: false, source: CH3,
    question: 'Colonies in which three regions gained independence in the twenty years after 1947?',
    answer: 'Africa, the Caribbean and the Pacific',
    explanation: { lead: 'Independence did not arrive in one wave, which is why 1947 gets a date and everything after it gets a period instead. Two of the three regions named are also where Britain went looking for workers to rebuild after the war, so this and the post-war recruitment are halves of one story.' },
    forms: [
      { question: 'Colonies in which three regions gained independence in the twenty years after 1947?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Africa, the Caribbean and the Pacific', distractors: ['Africa, the Mediterranean and the Baltic', 'South America, the Arctic and the Balkans', 'Europe, the Baltic and the Arctic'] } },
      { question: 'After India and Pakistan, the remaining colonies became independent over roughly what period?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The next 20 years', distractors: ['The next 5 years', 'The next 50 years', 'The following century'] } },
      { question: 'Which region did NOT see British colonies gain independence in the two decades after 1947?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Scandinavia', distractors: ['The Caribbean', 'The Pacific', 'Africa'] } },
    ],
  },
  {
    id: 'f472', tag: 'Empire', chapter: 3, verify: false, source: CH3,
    question: 'Which Prime Minister was famous for the ‘wind of change’ speech?',
    answer: 'Harold Macmillan',
    explanation: { lead: 'He led during the Conservative years running from 1951 to 1964, a stretch the book treats as recovery and rising prosperity at home while the empire was being dismantled abroad. Attlee’s government granted the 1947 independences; this speech belongs to the wave that followed, which is the cleanest way to keep the two Prime Ministers apart.' },
    forms: [
      { question: 'Which Prime Minister was famous for the ‘wind of change’ speech?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Harold Macmillan', distractors: ['Winston Churchill', 'Clement Attlee', 'Anthony Eden'] } },
      { question: 'A Conservative Prime Minister of the 1950s gave a celebrated speech on decolonisation. Who was he?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Harold Macmillan', distractors: ['Neville Chamberlain', 'Harold Wilson', 'Stanley Baldwin'] } },
      { question: 'The ‘wind of change’ speech is associated with which of these figures?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Harold Macmillan, Prime Minister in the 1950s', distractors: ['Clement Attlee, Prime Minister from 1945 to 1951', 'William Beveridge, author of a wartime report', 'Winston Churchill, the wartime Prime Minister'] } },
    ],
  },
  {
    id: 'f473', tag: 'Empire', chapter: 3, verify: false, source: CH3,
    question: 'What was Harold Macmillan’s ‘wind of change’ speech about?',
    answer: 'Decolonisation and independence for the countries of the Empire',
    explanation: { lead: 'The phrase is a metaphor for something nobody can stand against, and that is the whole point of it: a Prime Minister publicly accepting that the end of empire was coming rather than promising to resist it. The book sets it directly beside the prosperity of the 1950s — Britain was getting richer as it got smaller.' },
    forms: [
      { question: 'What was Harold Macmillan’s ‘wind of change’ speech about?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Decolonisation and independence for the countries of the Empire', distractors: ['The creation of the National Health Service and social security', 'The rebuilding of British industry after the Second World War', 'Britain’s decision to develop its own atomic bomb'] } },
      { question: 'A famous speech of the 1950s gave its name to the end of empire. What did it address?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Independence for the countries of the Empire', distractors: ['Nationalisation of the railways and the coal mines', 'Membership of the European Economic Community', 'The founding of the North Atlantic alliance'] } },
      { question: 'Which subject did the ‘wind of change’ speech NOT concern?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The nationalisation of the coal mines', distractors: ['Independence for the countries of the Empire', 'The process of decolonisation', 'The Empire’s future'] } },
    ],
  },
  {
    id: 'f474', tag: 'Empire', chapter: 3, verify: false, source: CH3,
    question: 'During the Victorian period, which territories did the British Empire grow to cover?',
    answer: 'All of India, Australia and large parts of Africa',
    explanation: { lead: 'Victoria’s reign of more than sixty years is when the empire reached its greatest extent, which is why the two sit in the same section of the book. Notice that Africa is qualified — large parts of it, not all — while India is not, and that asymmetry is exactly what a wrong option will flip.' },
    forms: [
      { question: 'During the Victorian period, which territories did the British Empire grow to cover?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'All of India, Australia and large parts of Africa', distractors: ['All of Brazil, Argentina and much of South America', 'All of Africa, India and large parts of Australia', 'All of China, Japan and large parts of Asia'] } },
      { question: 'At its Victorian height the empire included the whole of which South Asian country?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'India', distractors: ['Afghanistan', 'Thailand', 'Nepal'] } },
      { question: 'Which of these was part of the British Empire in the Victorian period?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Australia', distractors: ['Argentina', 'Indonesia', 'China'] } },
    ],
  },
  {
    id: 'f475', tag: 'Empire', chapter: 3, verify: false, source: CH3,
    question: 'What was the British Empire at its greatest extent?',
    answer: 'The largest empire the world has ever seen',
    explanation: { lead: 'Scale is what makes the rest of the chapter work: the trade, the migration in both directions, and the colonial troops who fought in both world wars all follow from it. The comparison being drawn is with every empire in history, not merely with the rival empires of Britain’s own day, and that is the distinction wrong options blur.' },
    forms: [
      { question: 'What was the British Empire at its greatest extent?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The largest empire the world has ever seen', distractors: ['The second-largest empire in world history', 'The shortest-lived of the great empires', 'The largest empire in Europe alone'] } },
      { question: 'Compared with every other empire in history, how large was the British Empire?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The largest there has ever been', distractors: ['About the size of the Ottoman Empire', 'Roughly the size of the Roman Empire', 'Smaller than the Spanish Empire'] } },
      { question: 'Which statement about the size of the British Empire is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'It was the largest empire the world has ever seen', distractors: ['It was the largest empire in Europe but no bigger', 'It was smaller than the Roman Empire at its height', 'It never extended beyond Asia and the Caribbean'] } },
    ],
  },
  {
    id: 'f476', tag: 'Empire', chapter: 3, verify: false, source: CH3,
    question: 'Until which decade did the British Empire continue to grow?',
    answer: 'The 1920s',
    explanation: { lead: 'This one is counter-intuitive and therefore heavily tested. Doubts about the empire were already being aired in the late 19th century and the Boer War sharpened them, yet the territory carried on expanding for another twenty-odd years — arguing about an empire and growing one are not the same timeline.' },
    forms: [
      { question: 'Until which decade did the British Empire continue to grow?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The 1920s', distractors: ['The 1860s', 'The 1950s', 'The 1970s'] } },
      { question: 'The British Empire went on expanding until roughly which decade?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The 1920s', distractors: ['The 1840s', 'The 1890s', 'The 1940s'] } },
      { question: 'Which statement about the growth of the British Empire is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'It kept growing until the 1920s, well after Victoria died', distractors: ['It was already shrinking by the middle of the 19th century', 'It stopped growing at the outbreak of the First World War', 'It stopped growing when Victoria died in 1901'] } },
    ],
  },
  {
    id: 'f477', tag: 'Empire', chapter: 3, verify: false, source: CH3,
    question: 'Between 1853 and 1913, roughly how many British citizens left the country to settle overseas?',
    answer: 'As many as 13 million',
    explanation: { lead: 'Empire moved people in both directions at once, which is the point being made by putting this beside the arrival of Russian and Polish Jews in the same passage. Britain’s own population was only around 40 million at the time, so the outflow was enormous — and it is why English is spoken across so much of the world.' },
    forms: [
      { question: 'Between 1853 and 1913, roughly how many British citizens left the country to settle overseas?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'As many as 13 million', distractors: ['As many as 30 million', 'As many as 3 million', 'As many as 130,000'] } },
      { question: 'A great wave of emigration from Britain took place between which years?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1853 to 1913', distractors: ['1801 to 1851', '1750 to 1800', '1914 to 1939'] } },
      { question: 'Which statement about British emigration in the Victorian period is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Millions left Britain to settle overseas while others arrived', distractors: ['More people arrived in Britain than left it in every single year', 'Almost nobody left Britain once the empire was established', 'Emigration was banned for most of the Victorian period'] } },
    ],
  },
  {
    id: 'f478', tag: 'Empire', chapter: 3, verify: false, source: CH3,
    question: 'Which company, originally set up to trade, gained control of large parts of India?',
    answer: 'The East India Company',
    explanation: { lead: 'This is how a great deal of the empire actually happened: commerce first, government afterwards, with no single moment of decision to conquer anything. It belongs to the same passage as Cook mapping the Australian coast and Britain taking Canada, all of it before the Victorian period rather than during it.' },
    forms: [
      { question: 'Which company, originally set up to trade, gained control of large parts of India?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The East India Company', distractors: ['The Hudson’s Bay Company', 'The Royal Africa Company', 'The South Sea Company'] } },
      { question: 'The East India Company was originally set up for what purpose?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Trade', distractors: ['Missionary work', 'Exploration', 'Defence'] } },
      { question: 'Which statement about the East India Company is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'It was set up to trade and ended up governing large parts of India', distractors: ['It was created by Parliament specifically to govern India from the outset', 'It was a branch of the British army sent out to conquer India', 'It traded only with Australia and the Pacific islands'] } },
    ],
  },
  {
    id: 'f479', tag: 'Empire', chapter: 3, verify: false, source: CH3,
    question: 'By the second half of the 20th century, what had the British Empire largely become?',
    answer: 'The Commonwealth',
    explanation: { lead: 'The word doing the work is orderly: the account here is of independence granted rather than seized, with the American colonies standing as the great earlier exception. What replaced the empire keeps much the same membership but none of the power — it cannot make a member state do anything.' },
    forms: [
      { question: 'By the second half of the 20th century, what had the British Empire largely become?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Commonwealth', distractors: ['The Atlantic alliance', 'The European Union', 'The United Nations'] } },
      { question: 'How is the change from Empire to Commonwealth generally described?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'As an orderly transition, with countries granted independence', distractors: ['As a violent collapse brought about by military defeat overseas', 'As a formal merger of the colonies into a single new state', 'As a series of wars ending in Britain’s withdrawal'] } },
      { question: 'Which of these best describes the Commonwealth’s relationship to the Empire?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Most of its members were once part of the British Empire', distractors: ['Every one of its members was once a British colony, without exception', 'Its members are the countries that defeated the Empire', 'None of its members had any connection to the Empire'] } },
    ],
  },
  {
    id: 'f480', tag: 'International', chapter: 5, verify: false, source: CH5,
    question: 'What are the core values of the Commonwealth?',
    answer: 'Democracy, good government and the rule of law',
    explanation: { lead: 'These three are what membership actually commits a country to, and they explain the single sanction available when one falls short. Remember that the association has no power over its members at all — an option offering anything binding has quietly handed it the European Union’s powers instead.' },
    forms: [
      { question: 'What are the core values of the Commonwealth?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Democracy, good government and the rule of law', distractors: ['Mutual defence, open borders and free movement', 'Monarchy, a common language and shared borders', 'Free trade, joint defence and a shared currency'] } },
      { question: 'The Commonwealth works through shared values rather than legal power. Which set of values is correct?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Democracy, good government and the rule of law', distractors: ['Military cooperation, trade tariffs and shared taxation', 'Religious tolerance, free schooling and a common army', 'Free movement, a single market and a common currency'] } },
      { question: 'What can the Commonwealth do if a member state falls short of its values?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Suspend that country’s membership', distractors: ['Expel the country and seize its assets', 'Overrule that country’s laws', 'Impose fines on that country'] } },
    ],
  },

  // ---- environment ----
// ==========================================================================
  // The environment, recycling and green spaces — 0 facts before.
  // Handbook 4.5 (national parks) and 5.8.2 (looking after the environment),
  // with the civic-responsibility framing from 1.2 and the charity and
  // pressure-group examples from 5.6 and 5.8.1.
  // ==========================================================================
  {
    id: 'f481', tag: 'National parks', chapter: 4, verify: false, source: CH4,
    question: 'How many national parks are there in England, Wales and Scotland?',
    answer: '15',
    explanation: { lead: 'The count deliberately stops at three countries, so a question phrased about the UK as a whole is testing whether you noticed which one is missing. They are not fenced-off wilderness either: people live inside them and work the land, which is the part of the definition that makes them unusual.' },
    forms: [
      { question: 'How many national parks are there in England, Wales and Scotland?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '15', distractors: ['10', '12', '20'] } },
      { question: 'Which parts of the UK hold the 15 national parks the handbook counts?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'England, Wales and Scotland', distractors: ['England and Wales only', 'Scotland and Northern Ireland only', 'All four countries of the UK'] } },
      { question: 'Which statement about national parks in the UK is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'They are protected countryside that anyone may visit', distractors: ['They are areas of countryside where nobody is allowed to live or work', 'They are closed to visitors so that wildlife is left undisturbed', 'They are owned and run directly by the UK government'] } },
    ],
  },
  {
    id: 'f482', tag: 'Environment', chapter: 5, verify: false, source: CH5,
    question: 'Why does making new products from recycled materials help the environment?',
    answer: 'It uses less energy and avoids extracting more raw materials',
    explanation: { lead: 'Three separate savings are bundled into one idea here — energy, raw materials taken out of the ground, and space in landfill. A question will pick just one of the three, so it is worth recognising all of them as the same fact rather than memorising a single sentence.' },
    forms: [
      { question: 'Why does making new products from recycled materials help the environment?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'It uses less energy and avoids extracting more raw materials', distractors: ['It removes the need for household refuse to be collected at all', 'It makes British goods cheaper than goods brought in from abroad', 'It allows old landfill sites to be reopened as building land'] } },
      { question: 'Recycling reduces the amount of rubbish sent to which kind of site?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Landfill', distractors: ['Reservoirs', 'Allotments', 'Scrapyards'] } },
      { question: 'Which of these is given as a benefit of recycling?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Less energy is used to make new products', distractors: ['Household bills are reduced by law', 'Local taxes fall for everyone in the area', 'More raw materials can be taken from the earth'] } },
    ],
  },
  {
    id: 'f483', tag: 'Environment', chapter: 5, verify: false, source: CH5,
    question: 'Why does buying products locally reduce your carbon footprint?',
    answer: 'The goods have not had to travel as far',
    explanation: { lead: 'One piece of advice with two payoffs folded into it: businesses and farmers near you get the trade, and the distance the goods travel drops. Only the second half is environmental, and it is the half the phrase “carbon footprint” attaches to.' },
    forms: [
      { question: 'Why does buying products locally reduce your carbon footprint?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The goods have not had to travel as far', distractors: ['Local shops are required by law to recycle packaging', 'Local produce is charged at a lower rate of VAT', 'Smaller shops use less electricity than large ones'] } },
      { question: 'Shopping locally is said to help which two groups in your area?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Businesses and farmers', distractors: ['Councils and housing associations', 'Schools and hospitals', 'Charities and voluntary groups'] } },
      { question: 'Which of these is suggested as a way of looking after the environment?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Buying food produced close to where you live', distractors: ['Leaving refuse bags out on the street all week', 'Replacing household appliances more often', 'Ordering goods from suppliers overseas instead'] } },
    ],
  },
  {
    id: 'f484', tag: 'Environment', chapter: 5, verify: false, source: CH5,
    question: 'How do walking and using public transport protect the environment?',
    answer: 'They create less pollution than using a car',
    explanation: { lead: 'Pollution, not waste, is the mechanism — this is the one piece of environmental advice in the section that has nothing to do with rubbish or raw materials. It pairs with shopping locally: both are really about distance travelled, one by you and one by your shopping.' },
    forms: [
      { question: 'How do walking and using public transport protect the environment?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'They create less pollution than using a car', distractors: ['They cut the amount of rubbish sent to landfill', 'They lower the price of goods in local shops', 'They reduce the raw materials taken from the earth'] } },
      { question: 'The handbook names two ways of getting about that create less pollution. Which pair?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Walking and public transport', distractors: ['Driving and taking taxis', 'Flying and driving long distances', 'Private hire cars and motorcycles'] } },
      { question: 'Compared with driving, taking the bus or the train has what effect?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'It creates less pollution', distractors: ['It creates more pollution overall', 'It has no effect on pollution at all', 'It increases the amount of household waste'] } },
    ],
  },
  {
    id: 'f485', tag: 'Values', chapter: 1, verify: false, source: CH1,
    question: 'Is looking after your local area and the environment a right the UK offers, or a responsibility expected of you?',
    answer: 'A responsibility expected of you',
    explanation: { lead: 'Chapter 1 sets out two facing lists: what you should do, and what the UK gives in return. Caring for your area sits on the first, beside obeying the law and treating others fairly, while free speech, freedom of belief and a fair trial sit on the second. The question is almost always about which side of the page an item comes from.' },
    forms: [
      { question: 'Is looking after your local area and the environment a right the UK offers, or a responsibility expected of you?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'A responsibility expected of you', distractors: ['A right the UK offers in return', 'A freedom protected by the courts', 'A legal duty enforced by fines'] } },
      { question: 'Besides obeying the law and treating others fairly, what are residents expected to do about where they live?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Look after the area in which you live', distractors: ['Join a political party of your choice', 'Attend a place of worship regularly', 'Serve in the armed forces when asked'] } },
      { question: 'Which statement matches how the handbook divides responsibilities from freedoms?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Caring for the environment is a responsibility', distractors: ['Caring for the environment is a freedom the UK offers', 'A fair trial is a responsibility of residents', 'Freedom of speech is a duty residents must fulfil'] } },
    ],
  },
  {
    id: 'f486', tag: 'Community', chapter: 5, verify: false, source: CH5,
    question: 'Which volunteering activity does the handbook give as a way of improving the environment?',
    answer: 'Taking part in a local litter pick-up',
    explanation: { lead: 'The list of volunteering examples pairs each activity with a cause — animals with a rescue shelter, the homeless with a night shelter, the environment with a litter pick-up. The wrong answers here are all genuine examples from that same list, simply attached to the wrong cause, which is exactly how the question tends to be built.' },
    forms: [
      { question: 'Which volunteering activity does the handbook give as a way of improving the environment?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Taking part in a local litter pick-up', distractors: ['Working on an information desk in a hospital', 'Caring for animals at a rescue shelter', 'Mentoring someone released from prison'] } },
      { question: 'Joining a litter pick-up in your area is an example of volunteering to do what?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Improve the environment', distractors: ['Support older people', 'Work with the homeless', 'Help at a local youth group'] } },
      { question: 'Which of these is listed as something a volunteer might actually do?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Join a litter pick-up in the local area', distractors: ['Report neighbours who fail to sort their recycling', 'Inspect a local authority’s refuse collections', 'Issue fines to people who drop litter in the street'] } },
    ],
  },
  {
    id: 'f487', tag: 'Environment', chapter: 5, verify: false, source: CH5,
    question: 'Which two organisations does the handbook name as environmental charities?',
    answer: 'The National Trust and Friends of the Earth',
    explanation: { lead: 'The National Trust turning up here is the surprise — elsewhere in the book it is the body that keeps buildings, coastline and countryside open to visitors, but in the list of charities it is filed under the environment. Every other charity the handbook names belongs to a different heading: older people, children, the homeless, medical research or animals.' },
    forms: [
      { question: 'Which two organisations does the handbook name as environmental charities?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The National Trust and Friends of the Earth', distractors: ['Cancer Research UK and the British Red Cross', 'Shelter and the People’s Dispensary for Sick Animals', 'Age UK and the NSPCC'] } },
      { question: 'Friends of the Earth is given as an example of which kind of charity?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'An environmental charity', distractors: ['A medical research charity', 'A charity working with older people', 'A charity working with animals'] } },
      { question: 'Which of these charities is named in connection with the environment?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Friends of the Earth', distractors: ['Cancer Research UK', 'The British Red Cross', 'Crisis'] } },
    ],
  },
  {
    id: 'f488', tag: 'Environment', chapter: 5, verify: false, source: CH5,
    question: 'Which organisation does the handbook name as a pressure group campaigning on the environment?',
    answer: 'Greenpeace',
    explanation: { lead: 'Pressure groups sit in a different category from charities: they exist to shift government policy rather than to carry out the work themselves. The handbook gives one example per cause — human rights to Liberty, business to the CBI — and the environmental one is routinely confused with Friends of the Earth, which belongs on the charity list instead.' },
    forms: [
      { question: 'Which organisation does the handbook name as a pressure group campaigning on the environment?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Greenpeace', distractors: ['Liberty', 'The CBI', 'The National Trust'] } },
      { question: 'Greenpeace and Liberty are given as examples of what kind of organisation?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Pressure groups', distractors: ['Political parties', 'Government departments', 'Trade unions'] } },
      { question: 'Which pairing of organisation and cause is the one the handbook gives?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Greenpeace — the environment', distractors: ['Liberty — the environment', 'The CBI — human rights', 'Greenpeace — British business'] } },
    ],
  },
  {
    id: 'f489', tag: 'National parks', chapter: 4, verify: false, source: CH4,
    question: 'Which national park contains the largest expanse of fresh water in mainland Britain?',
    answer: 'Loch Lomond and the Trossachs',
    explanation: { lead: '“Mainland” is the qualifier doing all the work. Windermere is the biggest stretch of water in the Lake District, and the two get swapped constantly — one is the largest in an English park, the other the largest in Britain. The park takes its name from the loch and the range of hills beside it.' },
    forms: [
      { question: 'Which national park contains the largest expanse of fresh water in mainland Britain?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Loch Lomond and the Trossachs', distractors: ['The Lake District', 'Snowdonia', 'The Cairngorms in eastern Scotland'] } },
      { question: 'Loch Lomond and the Trossachs National Park lies in which part of the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The west of Scotland', distractors: ['The east of Scotland', 'The north of England', 'The north-west of Wales'] } },
      { question: 'Which body of water is the largest expanse of fresh water in mainland Britain?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Loch Lomond', distractors: ['Windermere', 'Loch Ness', 'Wastwater, in the Lake District'] } },
    ],
  },

  // ---- media ----
{
    id: 'f490', tag: 'Media', chapter: 5, verify: false, source: CH5,
    question: 'What does it mean to say that the UK has a free press?',
    answer: 'What newspapers print is free from government control',
    explanation: { lead: 'The handbook dates this back to 1695, when newspapers were first allowed to publish without a government licence, so it is a three-hundred-year-old habit rather than a modern rule. The contrast to hold is with broadcasting: a paper may campaign for one party as hard as it likes, while radio and television are legally obliged to be balanced.' },
    forms: [
      { question: 'What does it mean to say that the UK has a free press?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'What newspapers print is free from government control', distractors: ['Newspapers are distributed at no cost to their readers', 'Newspaper owners are forbidden to hold political opinions', 'All newspapers must report the same agreed set of facts'] } },
      { question: 'Newspaper owners and editors in the UK are permitted to do what?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Run campaigns to influence government policy and opinion', distractors: ['Compel ministers to answer their written questions promptly', 'Publish the names of young people tried in Youth Courts', 'Decide how much airtime each political party receives'] } },
      { question: 'Which statement about newspapers in the UK is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'They are not controlled by the government', distractors: ['They must be licensed by the government every year', 'Their editors are appointed by the relevant minister', 'They are required by law to stay politically neutral'] } },
    ],
  },
  {
    id: 'f491', tag: 'Media', chapter: 3, verify: false, source: CH3,
    question: 'From which year were newspapers allowed to operate without a government licence?',
    answer: '1695',
    explanation: { lead: 'Party politics and a free press appear together in the handbook’s account of the years after the Glorious Revolution — once Parliament rather than the monarch settled matters, printed argument about what Parliament should settle became worth having. The number of titles published rose sharply from this point, which is why a date about licensing carries more weight than it looks.' },
    forms: [
      { question: 'From which year were newspapers allowed to operate without a government licence?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1695', distractors: ['1605', '1715', '1765'] } },
      { question: 'The development of a free press in Britain followed which event?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Glorious Revolution', distractors: ['The English Civil War', 'The Restoration of Charles II', 'The Act of Union with Scotland'] } },
      { question: 'What changed for newspapers in 1695?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'They no longer needed a government licence', distractors: ['They were required to register with Parliament', 'They were taxed on every copy they printed', 'They were permitted to report court proceedings'] } },
    ],
  },
  {
    id: 'f492', tag: 'Media', chapter: 5, verify: false, source: CH5,
    question: 'What does the law require of radio and television coverage of the political parties?',
    answer: 'It must be balanced, with equal time for rival viewpoints',
    explanation: { lead: 'Print and broadcast are held to opposite standards, and that contrast is the whole reason this gets asked: a newspaper may campaign openly for one side, a broadcaster may not. If an option offers newspapers among the media obliged to be balanced, it is wrong on that ground alone.' },
    forms: [
      { question: 'What does the law require of radio and television coverage of the political parties?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'It must be balanced, with equal time for rival viewpoints', distractors: ['It must be approved by the Speaker before transmission', 'It must go only to parties already represented in Parliament', 'It must avoid naming individual candidates altogether'] } },
      { question: 'Broadcasters must give equal time to rival viewpoints. Does the same duty fall on newspapers?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'No — newspapers may take sides', distractors: ['Yes, in exactly the same way', 'Only during a general election campaign', 'Only for papers with a national circulation'] } },
      { question: 'Which media must by law give balanced coverage of the political parties?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Radio and television', distractors: ['The press alone', 'Newspapers, radio and television', 'Websites and social media only'] } },
    ],
  },
  {
    id: 'f493', tag: 'Media', chapter: 4, verify: false, source: CH4,
    question: 'Who in the UK must have a television licence?',
    answer: 'Anyone with a TV, computer or other device used to watch TV',
    explanation: { lead: 'The licence follows the household rather than the equipment, which is why one covers everything under a single roof — and why lodgers on separate tenancy agreements in a shared house each need their own. Two reliefs sit alongside it: free for the over-75s, half price for blind viewers.' },
    forms: [
      { question: 'Who in the UK must have a television licence?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Anyone with a TV, computer or other device used to watch TV', distractors: ['Only households owning a television set, not a computer or tablet', 'Only people who subscribe to a paid television service', 'Anyone watching the BBC, but not other channels'] } },
      { question: 'How many television licences does a single household normally need?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'One, covering all the equipment in the home', distractors: ['One for the home and a second one for any computer', 'One for every television set in the home', 'One for each adult living in the home'] } },
      { question: 'People renting separate rooms in a shared house, each on their own tenancy agreement, need what?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'A separate licence each', distractors: ['One shared licence', 'No licence, because the property is rented', 'One licence bought by the landlord'] } },
    ],
  },
  {
    id: 'f494', tag: 'Media', chapter: 4, verify: false, source: CH4,
    question: 'What is the maximum fine for watching television without a licence?',
    answer: 'Up to £1,000',
    explanation: { lead: 'A four-figure sum, which is what makes the smaller amounts on offer so tempting — the penalty is set at many times the price of the licence itself. It falls on the person watching, not on the shop that sold the set or the channel being watched.' },
    forms: [
      { question: 'What is the maximum fine for watching television without a licence?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Up to £1,000', distractors: ['Up to £100', 'Up to £500', 'Up to £5,000'] } },
      { question: 'Someone is caught watching television without a licence. What do they face?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'A fine of up to £1,000', distractors: ['A prison sentence of up to six months', 'Confiscation of the television set', 'A fine of up to £250 and a caution'] } },
      { question: 'Which statement about the television licence is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Watching TV without one can bring a £1,000 fine', distractors: ['It is optional for anyone who never watches the BBC', 'It is collected automatically through council tax bills', 'It is enforced only against commercial premises'] } },
    ],
  },
  {
    id: 'f495', tag: 'Media', chapter: 4, verify: false, source: CH4,
    question: 'At what age can someone apply for a free television licence?',
    answer: '75',
    explanation: { lead: 'Two different reliefs sit side by side and the questions like to swap them: one is granted for age, the other for blindness, and only one of the two is a full exemption. Get the pair the wrong way round and you lose both.' },
    forms: [
      { question: 'At what age can someone apply for a free television licence?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '75', distractors: ['60', '65', '70'] } },
      { question: 'What concession on the television licence can blind people claim?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'A 50% discount', distractors: ['A free licence', 'A 25% discount', 'No concession'] } },
      { question: 'Which group can apply for a television licence at no cost at all?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'People aged over 75', distractors: ['People receiving the state pension', 'Full-time students in halls of residence', 'People registered as blind'] } },
    ],
  },
  {
    id: 'f496', tag: 'Media', chapter: 4, verify: false, source: CH4,
    question: 'What is the money from television licences used to pay for?',
    answer: 'The BBC',
    explanation: { lead: 'The odd part is that a fee attached to television also pays for radio — BBC radio stations come out of the same money, while commercial stations sell advertising just as commercial channels do. There is no separate radio licence, which is the wrong answer this fact exists to rule out.' },
    forms: [
      { question: 'What is the money from television licences used to pay for?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The BBC', distractors: ['ITV, Channel 4 and Channel 5', 'All UK television channels', 'The broadcasting regulator'] } },
      { question: 'How are UK television channels other than the BBC mainly funded?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Through advertisements and subscriptions', distractors: ['Through local council taxes and levies on sets', 'Through direct grants from the government', 'Through a share of the licence fee'] } },
      { question: 'BBC radio stations are paid for out of what?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Television licences', distractors: ['Voluntary listener donations', 'A separate radio licence', 'Advertising revenue'] } },
    ],
  },
  {
    id: 'f497', tag: 'Media', chapter: 4, verify: false, source: CH4,
    question: 'What is the BBC’s standing among broadcasters worldwide?',
    answer: 'It is the largest broadcaster in the world',
    explanation: { lead: 'It is state-funded and independent of government at the same time, which sounds contradictory and is exactly why the handbook singles it out: the money is a compulsory public fee, but no minister decides the programmes. Every other UK channel runs on advertising and subscriptions instead, so the funding question and the independence question travel together.' },
    forms: [
      { question: 'What is the BBC’s standing among broadcasters worldwide?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'It is the largest broadcaster in the world', distractors: ['It is the largest broadcaster in Europe but not worldwide', 'It is Britain’s largest broadcaster only', 'It is the only broadcaster allowed to cover Parliament'] } },
      { question: 'What is unusual about the BBC’s relationship with the state?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'It is wholly state-funded yet independent of government', distractors: ['It is state-funded and has its output directed by ministers', 'It is funded by advertising and answers to Parliament', 'It is privately owned but reports to a minister'] } },
      { question: 'Which description fits the BBC?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'A public service broadcaster', distractors: ['An independent regulator of the media', 'A private subscription channel', 'A government department'] } },
    ],
  },

  // ---- money ----
{
    id: 'f498', tag: 'Currency', chapter: 4, verify: false, source: CH4,
    question: 'What is the currency of the UK?',
    answer: 'The pound sterling',
    explanation: { lead: 'The word sterling is what separates it from the many other currencies also called a pound, which is why the handbook gives the full name rather than just “the pound”. It sits in the section on the UK today, next to the capital cities and the languages — practical facts about the country as it is now, not history.' },
    forms: [
      { question: 'What is the currency of the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The pound sterling', distractors: ['The euro', 'The Irish punt', 'The US dollar'] } },
      { question: 'Which symbol is used for the UK’s currency?', mcqOnly: true,
        answers: { kind: 'fixed', correct: '£', distractors: ['€', '$', '¥'] } },
      { question: 'Which currency does the symbol £ stand for?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The pound sterling', distractors: ['The euro', 'The Irish punt', 'The United States dollar'] } },
    ],
  },
  {
    id: 'f499', tag: 'Currency', chapter: 4, verify: false, source: CH4,
    question: 'How many pence are there in a pound?',
    answer: '100',
    explanation: { lead: 'Decimal money is more recent than it feels — before decimalisation in 1971 a pound was split into 240 pence, which is why numbers like 240 and 12 make such tempting wrong answers. The clean division into a hundred is also what makes the coins sit where they do, running 1p up to 50p and then over into pounds.' },
    forms: [
      { question: 'How many pence are there in a pound?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '100', distractors: ['10', '50', '1,000'] } },
      { question: 'A pound is divided into how many pence?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '100', distractors: ['12', '20', '240'] } },
      { question: 'Which statement about UK money is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'There are 100 pence in a pound', distractors: ['There are 50 pence in a pound', 'There are 20 pence in a pound', 'A pound is divided into 12 shillings'] } },
    ],
  },
  {
    id: 'f500', tag: 'Currency', chapter: 4, verify: false, source: CH4,
    question: 'What are the denominations of UK coins?',
    answer: '1p, 2p, 5p, 10p, 20p, 50p, £1 and £2',
    explanation: { lead: 'Eight coins, and the pattern is the way to hold them: ones, twos and fives repeating at each scale — 1p, 2p, 5p, then 10p, 20p, 50p, then £1 and £2. Anything that breaks the pattern is the wrong answer, which is how a 25p or a £5 gets slipped into an option list.' },
    forms: [
      { question: 'Which set gives the denominations of UK coins?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1p, 2p, 5p, 10p, 20p, 50p, £1 and £2', distractors: ['1p, 2p, 5p, 10p, 25p, 50p, £1 and £5', '1p, 5p, 10p, 20p, 50p, £1, £2 and £5', '2p, 5p, 10p, 20p, 50p, £1, £2 and £10'] } },
      { question: 'What is the highest-value coin used in the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '£2', distractors: ['£1', '£5', '50p'] } },
      { question: 'Which of these is NOT a UK coin?', mcqOnly: true,
        answers: { kind: 'fixed', correct: '25p', distractors: ['20p', '2p', '£2'] } },
    ],
  },
  {
    id: 'f501', tag: 'Currency', chapter: 4, verify: false, source: CH4,
    question: 'What are the denominations of UK banknotes?',
    answer: '£5, £10, £20 and £50',
    explanation: { lead: 'Four notes against eight coins, and the count is worth knowing on its own because questions sometimes ask for the number rather than the list. The £1 is the trap at the bottom end — it is a coin, so any list that opens with a £1 note is wrong — and nothing in ordinary use goes above £50.' },
    forms: [
      { question: 'Which set gives the denominations of UK banknotes?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '£5, £10, £20 and £50', distractors: ['£1, £5, £10 and £20', '£5, £10, £25 and £50', '£10, £20, £50 and £100'] } },
      { question: 'What is the highest-value banknote in general use in the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '£50', distractors: ['£20', '£100', '£500'] } },
      { question: 'Which of these is not a UK banknote?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'A £25 note', distractors: ['A £5 note', 'A £20 note', 'A £50 note'] } },
    ],
  },
  {
    id: 'f502', tag: 'Currency', chapter: 4, verify: false, source: CH4,
    question: 'Which parts of the UK issue their own banknotes?',
    answer: 'Scotland and Northern Ireland',
    explanation: { lead: 'Wales is the one people add by mistake: it has its own language and its own capital, but not its own notes. The right that Scotland and Northern Ireland kept is a commercial one held by particular banks, which is why those notes carry a bank’s own name across the top rather than the Bank of England’s.' },
    forms: [
      { question: 'Which parts of the UK have their own banknotes?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Scotland and Northern Ireland', distractors: ['Wales and Northern Ireland', 'Scotland and Wales', 'The Channel Islands and the Isle of Man'] } },
      { question: 'Wales does not issue banknotes of its own. Which two parts of the UK do?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Scotland and Northern Ireland', distractors: ['England and Scotland only', 'Northern Ireland and the Isle of Man', 'Scotland and the Channel Islands'] } },
      { question: 'Which statement about who issues banknotes in the UK is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Scotland and Northern Ireland issue their own notes', distractors: ['Each of the four parts of the UK issues its own notes', 'Only the Bank of England is permitted to issue notes', 'Wales and Scotland issue their own banknotes'] } },
    ],
  },
  {
    id: 'f503', tag: 'Currency', chapter: 4, verify: false, source: CH4,
    question: 'Where are banknotes issued in Scotland and Northern Ireland valid?',
    answer: 'Everywhere in the UK',
    explanation: { lead: 'Being valid and being accepted are two different things, and the handbook says both in consecutive sentences — this is the first half. The notes are proper currency the length of the country, even though a shopkeeper in Cornwall may never have handled one.' },
    forms: [
      { question: 'Where are banknotes issued in Scotland and Northern Ireland valid?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Everywhere in the UK', distractors: ['Only in the part that issued them', 'Only in Scotland and Northern Ireland', 'Anywhere in the UK and the Irish Republic'] } },
      { question: 'A Scottish £10 note is handed over in a shop in England. Is it valid currency?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Yes, it is valid anywhere in the UK', distractors: ['No, it is valid only in Scotland', 'No, it must be exchanged at a bank first', 'Only if the shop is part of a national chain'] } },
      { question: 'Which statement about Northern Irish banknotes is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'They are valid throughout the UK', distractors: ['They are valid only in Northern Ireland', 'They can be used only in banks and post offices', 'They must be exchanged before use in England'] } },
    ],
  },
  {
    id: 'f504', tag: 'Currency', chapter: 4, verify: false, source: CH4,
    question: 'Do shops and businesses have to accept banknotes issued in Scotland and Northern Ireland?',
    answer: 'No — they are not obliged to accept them',
    explanation: { lead: 'This is the sting in the tail, and the reason the handbook adds a second sentence at all: valid is not the same as compulsory. A business decides for itself what it will take, so a note can be turned down without anybody breaking a rule. The trap is answering the first half and stopping there.' },
    forms: [
      { question: 'Must shops and businesses accept banknotes issued in Scotland and Northern Ireland?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'No, they do not have to accept them', distractors: ['Yes, refusing them is against the law', 'Yes, but only outside England and Wales', 'Only shops with a bank account must accept them'] } },
      { question: 'A shop in London refuses a Northern Irish £20 note. What is the position?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The shop is within its rights to refuse', distractors: ['The shop is breaking the law by refusing', 'The shop must accept it if the customer insists', 'The shop must accept it but may charge a fee'] } },
      { question: 'Which statement about Scottish and Northern Irish banknotes is true?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'They are valid across the UK but shops need not take them', distractors: ['They are valid only where they were issued and nowhere else', 'They must be accepted by every business in the United Kingdom', 'They can be spent only after being exchanged at a bank'] } },
    ],
  },
  {
    id: 'f505', tag: 'Currency', chapter: 3, verify: false, source: CH3,
    question: 'Did the UK adopt the euro while it was a member of the European Union?',
    answer: 'No — it kept the pound sterling',
    explanation: { lead: 'Belonging to the EU never meant belonging to the single currency, and several member states kept their own money. The handbook makes the point in the same breath as joining the EEC in 1973, because the two are so easily run together — membership yes, currency no.' },
    forms: [
      { question: 'Did the UK adopt the euro while it was a member of the European Union?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'No, it kept the pound sterling', distractors: ['Yes, from the euro’s introduction', 'Yes, but only for government spending', 'Yes, alongside the pound in Northern Ireland'] } },
      { question: 'While the UK was a member of the EU, which currency did it use?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The pound sterling', distractors: ['The euro', 'The euro in England only', 'Both the euro and the pound'] } },
      { question: 'Which statement about the UK and European currency is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The UK has never used the euro as its currency', distractors: ['The UK adopted the euro and then abandoned it in 2020', 'The UK used the euro until the day it left the EU', 'The UK uses the euro alongside the pound sterling'] } },
    ],
  },
  {
    id: 'f506', tag: 'Prehistory', chapter: 3, verify: false, source: CH3,
    question: 'Which prehistoric people made the first coins to be minted in Britain?',
    answer: 'The people of the Iron Age',
    explanation: { lead: 'Coins imply an economy doing more than barter, which is the handbook’s reason for mentioning them: the Iron Age had a sophisticated culture, not merely hill forts. Some carried the names of kings, and that writing is why this moment is treated as the point where British history begins.' },
    forms: [
      { question: 'During which prehistoric age were the first coins minted in Britain?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Iron Age', distractors: ['The Bronze Age', 'The Stone Age', 'The age of the first farmers'] } },
      { question: 'What was inscribed on some of the first coins minted in Britain?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The names of Iron Age kings', distractors: ['The names of Roman emperors', 'Images of Stonehenge and other monuments', 'Prayers written in the Celtic language'] } },
      { question: 'Which achievement is credited to the people of the Iron Age?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Minting the first coins made in Britain', distractors: ['Building Stonehenge in what is now Wiltshire', 'Constructing the village at Skara Brae', 'Making the first bronze tools and ornaments'] } },
    ],
  },

  // ---- pubs ----
// ==========================================================================
  // Pubs, licensing and alcohol — 0 facts before.
  // Ch.4 “Leisure” covers pubs and night clubs as social institutions and gives
  // the two ages; ch.5 “Respecting the law” gives the criminal offences and the
  // alcohol-free zones. The two chapters state the 16 exception differently, so
  // the ch.4 wording (beer or wine, with someone over 18) is used throughout.
  // ==========================================================================
  {
    id: 'f507', tag: 'Pubs', chapter: 4, verify: false, source: CH4,
    question: 'What is the minimum age to buy alcohol in a pub or night club?',
    answer: '18',
    explanation: { lead: 'Two ages sit side by side in this part of the book and questions live in the gap between them — one governs buying at the bar, the other only drinking with a meal under supervision. Note too that being too young to buy does not mean being barred from the premises: some pubs admit younger people if an adult is with them.' },
    forms: [
      { question: 'What is the minimum age to buy alcohol in a pub or night club?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '18', distractors: ['16', '17', '21'] } },
      { question: 'You must have reached what age before a pub may legally serve you alcohol?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '18', distractors: ['15', '16', '20'] } },
      { question: 'Which statement about young people and pubs is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Under-18s may be allowed into some pubs if an adult is with them', distractors: ['Nobody under the age of 18 may enter a pub under any circumstances', 'Under-18s may enter a pub, but only before six in the evening', 'Under-16s may buy alcohol in a pub if a parent orders it'] } },
    ],
  },
  {
    id: 'f508', tag: 'Pubs', chapter: 4, verify: false, source: CH4,
    question: 'From what age may a young person drink beer or wine with a meal, if accompanied by someone over 18?',
    answer: '16',
    explanation: { lead: 'The exception exists because drinking with a meal, under an adult’s eye, is treated as different in kind from buying a round at the bar — which is why the setting and the company matter as much as the age. Anyone who remembers only the rule about buying gets caught by a question describing a family dinner.' },
    forms: [
      { question: 'From what age may a young person drink beer or wine with a meal, if accompanied by someone over 18?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '16', distractors: ['14', '15', '17'] } },
      { question: 'A 16-year-old may drink beer or wine with a meal only on what condition?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'They are with someone over 18', distractors: ['They have written permission from a parent', 'They are in a private members’ club', 'They drink no more than one glass'] } },
      { question: 'Where does the exception allowing 16-year-olds to drink with a meal apply?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'In a hotel or restaurant, including pub eating areas', distractors: ['At the bar of any pub, provided a meal has been ordered', 'Anywhere on licensed premises after six in the evening', 'In private homes and gardens, but nowhere else'] } },
    ],
  },
  {
    id: 'f509', tag: 'Pubs', chapter: 4, verify: false, source: CH4,
    question: 'What is the word ‘pub’ short for?',
    answer: 'Public house',
    explanation: { lead: 'The full form is the giveaway: these are houses licensed to serve the public, which is why licensing law rather than private house rules governs what happens inside. Chapter four files them under leisure alongside night clubs and the National Lottery, treating them as social institutions rather than simply places that sell drink.' },
    forms: [
      { question: 'What is the word ‘pub’ short for?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Public house', distractors: ['Publican’s house', 'Public bar room', 'People’s house'] } },
      { question: 'A community’s ‘local’ is described as what kind of place?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'A natural focal point for social activities', distractors: ['A meeting hall run and funded by the local council', 'A private club open only to its members', 'A venue licensed for live music only'] } },
      { question: 'Which of these is named as a popular pub activity?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The pub quiz', distractors: ['The village fete', 'A charity raffle', 'Live theatre'] } },
    ],
  },
  {
    id: 'f510', tag: 'Pubs', chapter: 4, verify: false, source: CH4,
    question: 'Which two games are described as traditional pub games?',
    answer: 'Pool and darts',
    explanation: { lead: 'Both need no pitch and very little space — bar games that fit inside a room, which is how they became fixtures rather than pastimes. The quiz belongs to the same list of pub sociability, so a question will sometimes mix the games and the quiz together to see whether you can separate them.' },
    forms: [
      { question: 'Which two games are described as traditional pub games?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Pool and darts', distractors: ['Snooker and dominoes', 'Cribbage and skittles', 'Bowls and shove ha’penny'] } },
      { question: 'Alongside pool, which game is traditionally played in British pubs?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Darts', distractors: ['Chess', 'Bingo', 'Snooker'] } },
      { question: 'A pub chalks up its two traditional games on a board. Which pair fits?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Pool and darts', distractors: ['Shove ha’penny and skittles', 'Dominoes and cribbage', 'Snooker and billiards'] } },
    ],
  },
  {
    id: 'f511', tag: 'Pubs', chapter: 4, verify: false, source: CH4,
    question: 'From what time do pubs usually open during the day, and what is different on Sundays?',
    answer: '11.00 am, but 12 noon on Sundays',
    explanation: { lead: 'The Sunday start is later than the rest of the week, and that difference is what a question is most likely to hinge on. These are customary hours rather than a legal ceiling — nothing fixes them nationally, which is why the next thing worth knowing is who actually sets them.' },
    forms: [
      { question: 'From what time do pubs in the UK usually open during the day?', mcqOnly: false,
        // '12 noon' was here and had to go: the handbook's own sentence is "usually open during
        // the day from 11.00 am (12 noon on Sundays)", and this stem does not exclude Sunday. A
        // reader who has learned the parenthesis met their own knowledge marked wrong. The
        // distractor changed rather than the stem — breadth credit is keyed by form position, so
        // rewording in place would keep credit earned on a sentence that no longer exists.
        answers: { kind: 'fixed', correct: '11.00 am', distractors: ['9.00 am', '10.00 am', '8.00 am'] } },
      { question: 'On Sundays, pubs usually open from what time?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '12 noon', distractors: ['10.00 am', '11.00 am', '9.00 am'] } },
      { question: 'How do night club hours usually compare with pub hours?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Night clubs usually open and close later', distractors: ['Night clubs usually open and close earlier', 'Night clubs must close at the same time as pubs', 'Night clubs may not open at all on a Sunday'] } },
    ],
  },
  {
    id: 'f512', tag: 'Pubs', chapter: 4, verify: false, source: CH4,
    question: 'Who decides the hours that a pub or night club is open?',
    answer: 'The licensee',
    explanation: { lead: 'Opening hours are not set nationally, which is why two pubs on the same street can keep different times and why clubs are free to run so much later. Watch for options offering the council or the police — both are plausible because both have real roles elsewhere in licensing and public order.' },
    forms: [
      { question: 'Who decides the hours that a pub or night club is open?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The licensee', distractors: ['The local council', 'The police', 'Parliament'] } },
      { question: 'A pub wants to change its closing time. Whose decision is that?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The licensee’s', distractors: ['The local council’s licensing board', 'The area’s Chief Constable', 'The customers’, by a vote'] } },
      { question: 'Which statement about pub and night club opening hours is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'They are set by the licensee', distractors: ['They are fixed in law across the whole UK', 'They are set each year by the local council', 'They must be the same for pubs and for clubs'] } },
    ],
  },
  {
    id: 'f513', tag: 'Law', chapter: 5, verify: false, source: CH5,
    question: 'Besides selling alcohol to someone under 18, what related act is also a criminal offence?',
    answer: 'Buying alcohol for someone under 18',
    explanation: { lead: 'Alcohol appears in chapter five as an example of criminal rather than civil law, sitting alongside carrying a weapon, selling tobacco to minors and racial harassment. The pairing is the point: the offence is not committed only at the till, which is what catches out someone buying a round for a younger friend.' },
    forms: [
      { question: 'Besides selling alcohol to an under-18, which related act is also a criminal offence?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Buying alcohol on their behalf', distractors: ['Serving them a soft drink at the bar', 'Letting them sit in the pub garden', 'Employing them to collect glasses'] } },
      { question: 'Is it against the law to buy alcohol for a person who is under 18?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Yes, it is a criminal offence', distractors: ['No, only selling to them is an offence', 'Only if they then drink it in public', 'Only if you are under 18 yourself'] } },
      { question: 'Which of these is a criminal offence in the UK?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Selling alcohol to anyone under 18', distractors: ['Selling alcohol to anyone under the age of 21', 'Drinking alcohol anywhere in a public street', 'Selling alcohol after 11.00 pm on a weekday'] } },
    ],
  },
  {
    id: 'f514', tag: 'Law', chapter: 5, verify: false, source: CH5,
    question: 'What is an alcohol-free zone?',
    answer: 'A place where you are not allowed to drink alcohol in public',
    explanation: { lead: 'These zones are local rather than national, which is the whole point of the rule: drinking in the street is not an offence everywhere, so the question turns on where you happen to be standing. The police powers described here reach further than the drinker, since young people can be moved on whether or not they are actually drinking.' },
    forms: [
      { question: 'In some places you may not drink alcohol in public. What are those places called?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Alcohol-free zones', distractors: ['Dry licensing districts', 'Controlled drinking areas', 'Public order zones'] } },
      { question: 'What can the police do about alcohol in public places?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Confiscate it and move young people on', distractors: ['Issue a licence allowing it that evening', 'Order a pub to stop serving for the night', 'Search any nearby home without a warrant'] } },
      { question: 'You are drinking in public inside an alcohol-free zone. What can happen?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'You can be fined or arrested', distractors: ['You are given a written warning only', 'Nothing, because the zones are advisory', 'You lose the right to enter any pub'] } },
    ],
  },

  // ---- work ----
// ==========================================================================
  // The inter-war period — the Great Depression and the 1930s.
  // One fact existed before (f163, the 1926 General Strike). The decade the
  // handbook gives a full section to had almost no coverage at all.
  // ==========================================================================
  {
    id: 'f515', tag: 'Interwar', chapter: 3, verify: false, source: CH3,
    question: 'In which year did the world enter the Great Depression?',
    answer: '1929',
    explanation: { lead: 'It lands at the hinge of the decade: the early 1920s were getting better for most people, and everything after this point pulls the other way. The handbook is careful to say the pain was uneven across the UK rather than universal, which is the detail the harder questions turn on.' },
    forms: [
      { question: 'In which year did the world enter the Great Depression?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1929', distractors: ['1919', '1926', '1933'] } },
      { question: 'Mass unemployment reached parts of the UK after the world entered the Great Depression in which year?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1929', distractors: ['1922', '1931', '1936'] } },
      { question: 'Which statement about the Great Depression in the UK is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Its effects were felt differently in different parts of the UK', distractors: ['Every region of the UK was affected to exactly the same degree', 'It began in the UK and then spread outwards to the rest of the world', 'The UK was left almost entirely untouched by it at the time'] } },
    ],
  },
  {
    id: 'f516', tag: 'Interwar', chapter: 3, verify: false, source: CH3,
    question: 'Which traditional heavy industry is named as badly affected by the depression of the 1930s?',
    answer: 'Shipbuilding',
    explanation: { lead: 'The whole point of the section is the split: the old industries went down while the new ones went up, in the same country in the same decade. If a question offers you an industry that was growing, it is testing whether you know which side of that divide it sat on.' },
    forms: [
      { question: 'Which traditional heavy industry was badly hit by the depression of the 1930s?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Shipbuilding', distractors: ['Car manufacturing', 'Aircraft manufacturing', 'Radio broadcasting'] } },
      { question: 'In the 1930s, which kind of industry in the UK suffered most?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Traditional heavy industry such as shipbuilding', distractors: ['The new automobile and aviation industries', 'Broadcasting, publishing and the entertainment trades', 'Housebuilding and the construction trades'] } },
      { question: 'Which pairing correctly describes UK industry in the 1930s?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Shipbuilding declined while the aviation industry grew', distractors: ['Aviation collapsed while shipbuilding expanded quickly', 'Both shipbuilding and car manufacturing grew steadily', 'Every industry in the UK contracted at much the same rate'] } },
    ],
  },
  {
    id: 'f517', tag: 'Interwar', chapter: 3, verify: false, source: CH3,
    question: 'Which two new industries developed in the UK during the 1930s?',
    answer: 'The automobile and aviation industries',
    explanation: { lead: 'These two are the counterweight to the shipyards, and they are why the decade is not simply a story of decline. They also connect forward: Whittle was working on the jet engine in these same years, and car ownership doubling is the consumer end of the same shift.' },
    forms: [
      { question: 'Which two new industries developed in the UK during the 1930s?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The automobile and aviation industries', distractors: ['The coal and shipbuilding industries', 'The textile and pottery industries', 'The railway and canal-building industries'] } },
      { question: 'While heavy industry struggled in the 1930s, which industries were growing?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Automobile and aviation', distractors: ['Coal and shipbuilding', 'Cotton and wool textiles', 'Iron founding and steel'] } },
      { question: 'Which of these industries was NOT in decline in the UK in the 1930s?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Aviation', distractors: ['Shipbuilding', 'Coal mining', 'Steel making'] } },
    ],
  },
  {
    id: 'f518', tag: 'Interwar', chapter: 3, verify: false, source: CH3,
    question: 'What happened to car ownership in the UK between 1930 and 1939?',
    answer: 'It doubled, from 1 million to 2 million',
    explanation: { lead: 'This is the handbook’s evidence that the 1930s were not uniformly grim. Prices were generally falling, so people who kept their jobs found their money went further — and what they spent it on shows up in figures like this one.' },
    forms: [
      { question: 'What happened to car ownership in the UK between 1930 and 1939?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'It doubled, from 1 million to 2 million', distractors: ['It trebled, from 1 million to 3 million', 'It stayed flat at about 1 million cars', 'It fell, from 2 million to 1 million'] } },
      { question: 'By 1939, roughly how many cars were owned in the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '2 million', distractors: ['1 million', '4 million', '500,000'] } },
      { question: 'Despite the depression, which sign of rising living standards is recorded for the 1930s?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Car ownership doubled between 1930 and 1939', distractors: ['Shipyard employment doubled during the decade', 'Coal output doubled between 1930 and 1939', 'The number of cars on the road halved'] } },
    ],
  },
  {
    id: 'f519', tag: 'Interwar', chapter: 3, verify: false, source: CH3,
    question: 'What improved for many people in the UK during the 1920s?',
    answer: 'Living conditions, including public housing and new homes in towns and cities',
    explanation: { lead: 'Housing is the concrete example the handbook reaches for, and it bookends the period: new homes in the 1920s, and more of them again in the 1930s. The trap is treating the whole inter-war stretch as one long slump — the improvement came first, the crash came in 1929.' },
    forms: [
      { question: 'What improved for many people in the UK during the 1920s?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Living conditions, including public housing', distractors: ['Wages in the traditional heavy industries', 'The number of hours worked in factories each week', 'Access to universities and higher education'] } },
      { question: 'New homes and better public housing in the 1920s were a sign of what?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Improving living conditions for many people', distractors: ['A fall in wages across the country as a whole', 'The beginning of the Great Depression', 'A sharp rise in the birth rate'] } },
      { question: 'Which statement about the UK in the 1920s is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Many people’s living conditions got better', distractors: ['Housebuilding stopped almost completely then', 'Most families were forced out of the cities', 'Public housing was abolished by Parliament'] } },
    ],
  },
  {
    id: 'f520', tag: 'Interwar', chapter: 3, verify: false, source: CH3,
    question: 'Which two novelists are named as prominent writers of the 1930s?',
    answer: 'Graham Greene and Evelyn Waugh',
    explanation: { lead: 'The handbook calls the decade a time of cultural blossoming, which is the counter-intuitive part worth holding on to: depression and creative flowering in the same years. Both men are 20th-century novelists, so any Victorian or Romantic name offered alongside them is the wrong century.' },
    forms: [
      { question: 'Which two novelists are named as prominent writers of the 1930s?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Graham Greene and Evelyn Waugh', distractors: ['Charles Dickens and Thomas Hardy', 'Jane Austen and the Brontë sisters', 'Kingsley Amis and Ian McEwan'] } },
      { question: 'The 1930s were a time of cultural blossoming in Britain. Which writer belongs to that decade?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Evelyn Waugh', distractors: ['Roald Dahl', 'William Blake', 'Emily Brontë'] } },
      { question: 'Which of these writers was prominent in Britain during the 1930s?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Graham Greene', distractors: ['Geoffrey Chaucer', 'William Wordsworth', 'Sir Walter Scott'] } },
    ],
  },
  {
    id: 'f521', tag: 'Interwar', chapter: 3, verify: false, source: CH3,
    question: 'Which economist published influential new theories of economics in the inter-war years?',
    answer: 'John Maynard Keynes',
    explanation: { lead: 'He belongs to the same paragraph as the depression for a reason: mass unemployment was the problem his theories were written to explain. Beveridge is the tempting wrong answer because he is also a social thinker of the period, but his report comes in 1942 and is about social security, not economics.' },
    forms: [
      { question: 'Which British economist published influential new economic theories between the wars?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'John Maynard Keynes', distractors: ['Sir William Beveridge', 'David Ricardo', 'Adam Smith'] } },
      { question: 'John Maynard Keynes is remembered for his work in which field?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Economics', distractors: ['Engineering', 'Astronomy', 'Medicine'] } },
      { question: 'Which pairing of name and field is correct for the inter-war years?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Keynes — new theories of economics', distractors: ['Keynes — the invention of the jet engine', 'Whittle — new theories of economics', 'Waugh — the invention of the jet engine'] } },
    ],
  },
  {
    id: 'f522', tag: 'Interwar', chapter: 3, verify: false, source: CH3,
    question: 'In which year did the BBC begin the world’s first regular television service?',
    answer: '1936',
    explanation: { lead: 'Two BBC dates sit side by side here and are easy to swap: radio came first, television more than a decade later. Baird was developing television through the 1920s and made his first broadcast between London and Glasgow in 1932, so the invention and the regular service are separate facts with separate years.' },
    forms: [
      { question: 'In which year did the BBC begin the world’s first regular television service?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1936', distractors: ['1922', '1926', '1946'] } },
      { question: 'The BBC started radio broadcasts in which year?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1922', distractors: ['1912', '1932', '1936'] } },
      { question: 'Which claim about early BBC broadcasting is correct?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Its 1936 television service was the world’s first regular one', distractors: ['Its television service opened in the same year as its radio did', 'It began television broadcasting before it began radio', 'Its radio broadcasts began after the Second World War'] } },
    ],
  },

  // ==========================================================================
  // Trade unions — the 1970s and the controls that followed.
  // ==========================================================================
  {
    id: 'f523', tag: 'Modern Britain', chapter: 3, verify: false, source: CH3,
    question: 'In the late 1970s, what did many people begin to argue about the trade unions?',
    answer: 'That they were too powerful and their activities were harming the UK',
    explanation: { lead: 'This argument is what makes the next decade legible: the legal controls imposed after 1979 were a response to it, not a policy that came out of nowhere. The same paragraph sets the scene — the post-war boom ending, prices rising sharply, and strikes across many industries and services.' },
    forms: [
      { question: 'In the late 1970s, what did many people begin to argue about the trade unions?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'That they were too powerful and were harming the UK', distractors: ['That they had become too small to negotiate properly', 'That they were too weak to protect their members', 'That they should be given a seat in the Cabinet'] } },
      { question: 'Many UK industries and services in the late 1970s were disrupted by what?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Strikes', distractors: ['Fuel rationing', 'Import quotas', 'Floods'] } },
      { question: 'Which was a feature of the UK economy in the late 1970s?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Sharply rising prices and an unstable exchange rate', distractors: ['Record low levels of industrial disputes and strikes', 'Falling prices and a very stable exchange rate', 'A large trade surplus in manufactured goods'] } },
    ],
  },
  {
    id: 'f524', tag: 'Modern Britain', chapter: 3, verify: false, source: CH3,
    question: 'What did the Conservative government after 1979 impose on trade union powers?',
    answer: 'Legal controls',
    explanation: { lead: 'Three changes travel together in this passage and questions often ask for one while offering the others: legal limits on the unions, privatisation of nationalised industries, and deregulation that grew the City of London. The industries that declined — shipbuilding and coal mining — are the same traditional heavy industries that suffered in the 1930s.' },
    forms: [
      { question: 'What did the Conservative government of 1979 to 1990 impose on trade unions?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Legal controls on their powers', distractors: ['A guaranteed seat on every company board', 'Compulsory membership for all workers', 'Public funding for their operations'] } },
      { question: 'Besides controlling union powers, what did the Conservative government of 1979 to 1990 do with the nationalised industries?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'It privatised them', distractors: ['It closed them down', 'It merged them all', 'It expanded them'] } },
      { question: 'Which industries are named as declining under the Conservative governments after 1979?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Shipbuilding and coal mining', distractors: ['Insurance and financial services', 'Investment banking and insurance', 'Aviation and car manufacturing'] } },
    ],
  },

  // ==========================================================================
  // Housing and employment as branches of civil law, and paying for benefits.
  // ==========================================================================
  {
    id: 'f525', tag: 'Law', chapter: 5, verify: false, source: CH5,
    question: 'Which area of civil law covers disputes between landlords and tenants?',
    answer: 'Housing law',
    explanation: { lead: 'Four kinds of civil law are listed together — housing, consumer rights, employment and debt — and questions usually give you a scenario and ask which one it is. Nothing here is prosecuted or punished: one side simply wants something from the other, which is what makes it civil rather than criminal.' },
    forms: [
      { question: 'Which area of civil law covers disputes between landlords and tenants?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Housing law', distractors: ['Consumer rights', 'Employment law', 'Criminal law'] } },
      { question: 'A tenant and a landlord disagree about repairs to the property. Which area of law is this?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Housing law', distractors: ['Criminal law', 'Company law', 'Debt'] } },
      { question: 'Which pair of issues does housing law deal with?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Repairs and eviction', distractors: ['Wages and unfair dismissal', 'Debt and personal bankruptcy', 'Faulty goods and services'] } },
    ],
  },
  {
    id: 'f526', tag: 'Law', chapter: 5, verify: false, source: CH5,
    question: 'Under which area of civil law would a case of unfair dismissal be brought?',
    answer: 'Employment law',
    explanation: { lead: 'Discrimination appears in two places in the handbook and they behave differently: racial harassment is a crime, while discrimination at work is a civil employment matter. Which side of the line a question sits on is usually the whole question.' },
    forms: [
      { question: 'Under which area of civil law would a case of unfair dismissal be brought?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Employment law', distractors: ['Consumer rights', 'Criminal law', 'Housing law'] } },
      { question: 'Which area of law covers disputes over wages and discrimination in the workplace?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Employment law', distractors: ['Consumer rights law', 'Debt recovery law', 'Housing law'] } },
      { question: 'Which of these is given as an example of employment law?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'A dispute over unpaid wages', distractors: ['A dispute over a faulty washing machine', 'A charge of carrying a knife in public', 'A dispute about eviction from a flat'] } },
    ],
  },
  {
    id: 'f527', tag: 'Tax', chapter: 5, verify: false, source: CH5,
    question: 'What happens if you do not pay enough National Insurance Contributions?',
    answer: 'You cannot receive certain contributory benefits, such as Jobseeker’s Allowance or a full state pension',
    explanation: { lead: 'The word doing the work is “contributory”: these are benefits you have to have paid into, which is why a gap in your record shows up years later as a reduced state pension. Part-time workers who earn too little can miss out on statutory payments such as maternity pay for the same reason.' },
    forms: [
      { question: 'What is the consequence of not paying enough National Insurance Contributions?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'You lose entitlement to certain contributory benefits', distractors: ['You must pay income tax at a much higher rate instead', 'You are required to leave paid work altogether', 'You are automatically disqualified from voting'] } },
      { question: 'Which benefit is named as one you may lose without enough National Insurance Contributions?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Jobseeker’s Allowance', distractors: ['Disability Living Allowance', 'Housing Benefit', 'Child Benefit'] } },
      { question: 'How do employees normally pay their National Insurance Contributions?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Their employer deducts them from their pay', distractors: ['They are taken from the state pension later on', 'They are collected with the council tax bill', 'They pay them yearly by self-assessment'] } },
    ],
  },
];
