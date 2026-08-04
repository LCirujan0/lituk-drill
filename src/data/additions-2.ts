/**
 * Second tranche of added facts, from a coverage sweep of the handbook.
 *
 * ## How the gaps were found
 *
 * Mechanically rather than by instinct. `.work/coverage.ts` splits the handbook into its own
 * numbered sections, pulls the vocabulary distinctive to each one, and asks how much of it the
 * deck's 528 facts mention at all. That gives a ranked list of places to LOOK — it is a crude
 * proxy and is treated as one — and the thinnest sections against their own size were
 * demography and religion (4.8, 4.6), international institutions (5.7), and the modern
 * political narrative (3.2).
 *
 * Ids continue from f527, so the event log's handle on every existing fact is untouched (R-4).
 *
 * ## The religion figures are the 2026 edition's, not the PDF's
 *
 * These were written from the PDF first, reporting the 2009 Citizenship Survey - 70%
 * Christian, 21% no religion - and flagged as contested, because the owner had supplied
 * different numbers.
 *
 * **He then settled it: his 2026 edition is the authority, and it uses the 2011 census.** He
 * also confirmed the two texts are otherwise identical apart from the handful of deltas he
 * has listed, so the PDF stays usable as the reference for everything else. Recorded as
 * D-031, which narrows D-023 rather than reversing it: the handbook still wins over
 * present-day reality; it is now clear WHICH handbook.
 *
 * The `verify` flags came off with the doubt.
 */

import type { Fact } from '@/domain/deck/types';

const CH4 = 'Handbook 3rd ed., ch.4 “The UK today”';
const CH4_REL = 'Handbook 3rd ed., ch.4 “Religion”';

export const ADDITIONS_2: readonly Fact[] = [
  // ==========================================================================
  // 4.8 The UK today — demography. The section is 5,400 characters and the deck
  // held three facts against it.
  // ==========================================================================
  {
    id: 'f528', tag: 'The UK today', chapter: 4, verify: false, source: CH4,
    question: 'Roughly what proportion of the UK population has a parent or grandparent born outside the UK?',
    answer: 'Nearly 10%',
    explanation: {
      lead: 'Post-war immigration means nearly 10% of the population has a parent or grandparent born outside the UK.',
      versus: 'This is about parents and grandparents, not about people born abroad themselves — the figure counts the second and third generation, which is why it is larger than a foreign-born count would be.',
      why: 'The handbook uses it to make one point: the UK today is a more diverse society than it was a hundred years ago, in both ethnic and religious terms.',
    },
    forms: [
      { question: 'Roughly what proportion of the UK population has a parent or grandparent born outside the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Nearly 10%', distractors: ['Nearly 25%', 'Nearly 40%', 'Nearly 55%'] } },
      { question: 'The handbook attributes the UK’s modern diversity to post-war immigration. What share of people have a parent or grandparent born abroad?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'About one in ten', distractors: ['About one in twenty', 'About one in five', 'About one in three'] } },
      { question: 'Which of these does the handbook say about the UK today?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Nearly 10% of people have a parent or grandparent born outside the UK', distractors: ['Nearly 10% of people were themselves born outside the UK', 'Nearly 10% of people hold a second passport', 'Nearly 10% of people speak no English at home'] } },
    ],
  },
  {
    id: 'f529', tag: 'The UK today', chapter: 4, verify: false, source: CH4,
    question: 'What share of the UK population lives in Wales?',
    answer: 'Around 5%',
    explanation: {
      lead: 'Wales is around 5% of the UK population.',
      versus: 'The four shares are worth holding as one set, because the distractors are always each other: England 84%, Scotland just over 8%, Wales around 5%, Northern Ireland less than 3%.',
      why: 'They sum to 100, so any three give you the fourth — which is the check to make when a number will not come.',
      cluster: [
        { label: 'England, 84%', detail: 'more or less consistently, and by far the largest' },
        { label: 'Scotland, just over 8%', detail: 'the second largest, and roughly half again on Wales' },
        { label: 'Wales, around 5%', detail: 'the third' },
        { label: 'Northern Ireland, under 3%', detail: 'the smallest, and the only one the handbook words as "less than"' },
      ],
    },
    forms: [
      { question: 'What share of the UK population lives in Wales?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Around 5%', distractors: ['Around 3%', 'Around 8%', 'Around 12%'] } },
      { question: 'Which part of the UK holds around 5% of its population?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Wales', distractors: ['Scotland', 'Northern Ireland', 'England'] } },
      { question: 'Which of these is the handbook’s figure for the Welsh share of the UK population?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Around five per cent', distractors: ['Just over eight per cent', 'Less than three per cent', 'More or less eighty-four per cent'] } },
    ],
  },
  {
    id: 'f530', tag: 'The UK today', chapter: 4, verify: false, source: CH4,
    question: 'What share of the UK population lives in Scotland?',
    answer: 'Just over 8%',
    explanation: {
      lead: 'Scotland is just over 8% of the UK population.',
      versus: 'Scotland is the larger of the two smaller mainland nations — just over 8% against Wales’s 5%. If a question offers both, Scotland is always the bigger number.',
      why: 'The handbook words each share differently and the wording is a hint: England "more or less consistently" 84%, Scotland "just over" 8%, Wales "around" 5%, Northern Ireland "less than" 3%.',
    },
    forms: [
      { question: 'What share of the UK population lives in Scotland?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Just over 8%', distractors: ['Just over 3%', 'Just over 15%', 'Just over 22%'] } },
      { question: 'Which part of the UK holds just over 8% of its population?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Scotland', distractors: ['Wales', 'Northern Ireland', 'England'] } },
      { question: 'Which of these correctly pairs a nation with its share of the UK population?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Scotland, just over eight per cent', distractors: ['Scotland, around five per cent', 'Wales, just over eight per cent', 'Northern Ireland, around five per cent'] } },
    ],
  },
  {
    id: 'f531', tag: 'The UK today', chapter: 4, verify: false, source: CH4,
    question: 'What share of the UK population lives in Northern Ireland?',
    answer: 'Less than 3%',
    explanation: {
      lead: 'Northern Ireland is less than 3% of the UK population — the smallest of the four.',
      versus: 'It is the only share the handbook words as "less than" rather than "around" or "just over", which is a usable tell if the wording is offered back to you.',
      why: 'It is also the only one of the four not on the island of Great Britain, so the smallest population and the separate geography go together.',
    },
    forms: [
      { question: 'How does the handbook describe Northern Ireland’s share of the UK population?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Less than 3%', distractors: ['Around 5%', 'Just over 8%', 'More or less 84%'] } },
      { question: 'Which part of the UK has the smallest share of its population?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Northern Ireland', distractors: ['Wales', 'Scotland', 'England'] } },
      { question: 'The handbook gives four population shares. Which is Northern Ireland’s?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Less than 3%', distractors: ['Around 5%', 'Just over 8%', 'More or less 84%'] } },
    ],
  },
  {
    id: 'f532', tag: 'The UK today', chapter: 4, verify: false, source: CH4,
    question: 'What two things does the handbook credit for population growth in the UK?',
    answer: 'Migration into the UK and longer life expectancy',
    explanation: {
      lead: 'The handbook credits two things: migration into the UK, and longer life expectancy.',
      versus: 'It does not say birth rate. Anything about families having more children is a distractor, however plausible it sounds.',
      why: 'The same two causes drive the ageing-population section that follows, which is why the handbook puts them together: people arriving, and people living longer.',
    },
    forms: [
      { question: 'What two things does the handbook credit for population growth in the UK?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Migration into the UK and longer life expectancy', distractors: ['A rising birth rate and earlier marriage', 'Longer life expectancy and a rising birth rate', 'Migration into the UK and a rising birth rate'] } },
      { question: 'Population growth has been faster in recent years. What does the handbook say has played a part?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Migration into the UK and longer life expectancy', distractors: ['Fewer people leaving the UK to live abroad', 'Larger families and improved housing supply', 'A rising birth rate and better maternity care'] } },
      { question: 'Which of these is NOT a reason the handbook gives for UK population growth?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'A rising birth rate', distractors: ['Migration into the UK', 'Longer life expectancy', 'Better health care and living standards'] } },
    ],
  },
  {
    id: 'f533', tag: 'The UK today', chapter: 4, verify: false, source: CH4,
    question: 'Why does the handbook say people in the UK are living longer than ever before?',
    answer: 'Improved living standards and better health care',
    explanation: {
      lead: 'Improved living standards and better health care are the two reasons the handbook gives.',
      versus: 'Migration and life expectancy explain population GROWTH; living standards and health care explain the AGEING population. Two questions, two pairs, and they are easy to swap.',
      why: 'The consequence the handbook draws is financial: a record number of people aged 85 and over, and an impact on the cost of pensions and health care.',
    },
    forms: [
      { question: 'Why does the handbook say people in the UK are living longer than ever before?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Improved living standards and better health care', distractors: ['Lower rates of migration into the country', 'A rising birth rate and larger families', 'More people working past retirement age'] } },
      { question: 'The UK has a record number of people aged 85 and over. What does the handbook say this affects?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The cost of pensions and health care', distractors: ['The cost of schools and childcare', 'The number of people who can vote', 'The cost of housing for first-time buyers'] } },
      { question: 'The UK has a record number of people aged over what?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '85', distractors: ['65', '75', '95'] } },
    ],
  },

  // ==========================================================================
  // 4.6 Religion. The proportions were missing from the deck entirely.
  //
  // FLAGGED. The handbook text here reports the 2009 Citizenship Survey; the owner
  // supplied 2011 census figures, which are materially different. D-023 says the
  // handbook wins, so these carry the handbook's numbers — and `verify` is set so
  // the card says "check the book" until the edition question is settled (L-025).
  // ==========================================================================
  {
    id: 'f534', tag: 'Religion', chapter: 4, verify: false, source: CH4_REL,
    question: 'In the 2011 census, what proportion of people identified themselves as Christian?',
    answer: '59%',
    explanation: {
      lead: 'In the 2011 census, 59% of people identified themselves as Christian.',
      versus: 'Christian and "no religion" are the only two large figures, 59% against 25%. Every named faith after that is in low single figures, so the shape is two big numbers and a tail rather than a spread.',
      why: 'The handbook opens the section by calling the UK historically a Christian country, and this is the evidence it offers. Just under three in five is the thing to hold: a majority, but not an overwhelming one.',
    },
    forms: [
      { question: 'In the 2011 census, what proportion of people identified themselves as Christian?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '59%', distractors: ['49%', '69%', '79%'] } },
      { question: 'Which group did 59% of people put themselves in at the 2011 census?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Christian', distractors: ['No religion', 'Muslim', 'Another religion'] } },
      { question: 'Which of these is closest to the census figure for Christians in the UK?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Just under three in five', distractors: ['Just under two in five', 'Just under four in five', 'Just under nine in ten'] } },
    ],
  },
  {
    id: 'f535', tag: 'Religion', chapter: 4, verify: false, source: CH4_REL,
    question: 'In the 2011 census, what proportion identified themselves as Muslim?',
    answer: '4.8%',
    explanation: {
      lead: 'In the 2011 census, 4.8% identified themselves as Muslim.',
      versus: 'Muslim is the only named minority faith above 2%, and the only one given to one decimal place. A figure with a decimal, under five, is this one.',
      why: 'The handbook pairs every proportion with a building - mosques, Hindu temples, synagogues, gurdwaras, Buddhist temples - so the list of faiths and the list of places of worship are the same list twice.',
      cluster: [
        { label: 'Muslim, 4.8%', detail: 'the largest named minority faith, roughly three times the Hindu figure' },
        { label: 'Hindu, 1.5%', detail: 'second, and about double the Sikh figure' },
        { label: 'Sikh, 0.8%', detail: 'third, and the last still above half a per cent' },
        { label: 'Jewish and Buddhist, both under 0.5%', detail: 'the only two grouped together rather than listed separately' },
      ],
    },
    forms: [
      { question: 'In the 2011 census, what proportion identified themselves as Muslim?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '4.8%', distractors: ['2.8%', '6.8%', '8.8%'] } },
      { question: 'Which is the largest of the named non-Christian faiths in the census figures?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Muslim', distractors: ['Hindu', 'Sikh', 'Buddhist'] } },
      { question: 'Which of these puts the census figures in order, largest group first?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Christian, no religion, Muslim, Hindu', distractors: ['Christian, Muslim, no religion, Hindu', 'No religion, Christian, Muslim, Hindu', 'Christian, no religion, Hindu, Muslim'] } },
    ],
  },
  {
    id: 'f536', tag: 'Religion', chapter: 4, verify: false, source: CH4_REL,
    question: 'In the 2011 census, what proportion said they had no religion?',
    answer: '25%',
    explanation: {
      lead: 'A quarter of people - 25% - said they had no religion.',
      versus: 'This is the second-largest figure in the section and it dwarfs every named minority faith: 25% against 4.8% for the largest of them. People reliably guess it far too low.',
      why: 'The handbook puts it immediately after saying everyone has the legal right to choose their religion, or not to practise one. The number is there to show the right is actually used.',
      cluster: [
        { label: 'Christian, 59%', detail: 'the majority, but under three in five' },
        { label: 'No religion, 25%', detail: 'a quarter, and larger than every named minority faith put together' },
        { label: 'Muslim, 4.8%', detail: 'the largest named minority faith' },
      ],
    },
    forms: [
      { question: 'In the 2011 census, what proportion said they had no religion?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '25%', distractors: ['15%', '35%', '45%'] } },
      { question: 'A quarter of people gave which answer about religion at the 2011 census?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'No religion', distractors: ['Christian', 'Muslim', 'Another religion'] } },
      { question: 'Which of these is the larger group, according to the census?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'People with no religion, at a quarter', distractors: ['Muslims, at a quarter', 'Hindus, at a tenth', 'Sikhs, at a tenth'] } },
    ],
  },
  {
    id: 'f537', tag: 'Religion', chapter: 4, verify: false, source: CH4_REL,
    question: 'Which two faiths does the handbook group together as both under 0.5% of the population?',
    answer: 'Jewish and Buddhist',
    explanation: {
      lead: 'Jewish and Buddhist are the two the handbook groups together, both at less than 0.5%.',
      versus: 'They are the only pair given a shared figure. Sikh sits just above them at 1%, on its own.',
      why: 'The section pairs every faith with its buildings, and both of these have theirs named: synagogues and Buddhist temples.',
    },
    forms: [
      { question: 'Which two faiths does the handbook group together as both under 0.5% of the population?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Jewish and Buddhist', distractors: ['Hindu and Sikh', 'Sikh and Buddhist', 'Jewish and Hindu'] } },
      { question: 'The handbook gives one shared figure for two faiths. Which two?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Jewish and Buddhist', distractors: ['Muslim and Hindu', 'Hindu and Buddhist', 'Sikh and Jewish'] } },
      { question: 'Which of these faiths is given its own figure rather than being grouped?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Sikh, at 1%', distractors: ['Jewish, at 1%', 'Buddhist, at 1%', 'Jewish and Buddhist together, at 1%'] } },
    ],
  },
  {
    id: 'f538', tag: 'Religion', chapter: 4, verify: false, source: CH4_REL,
    question: 'Which places of worship does the handbook name for Sikhs and for Jews?',
    answer: 'Gurdwaras for Sikhs and synagogues for Jews',
    explanation: {
      lead: 'Sikhs worship in gurdwaras and Jews in synagogues.',
      versus: 'The full list pairs one building to each faith, so the trap is swapping two of them rather than not knowing any: mosques for Muslims, temples for Hindus and for Buddhists, gurdwaras for Sikhs, synagogues for Jews.',
      why: 'The handbook uses the buildings to make its point that the UK is religiously diverse in practice and not only on a survey form.',
    },
    forms: [
      { question: 'Which places of worship does the handbook name for Sikhs and for Jews?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Gurdwaras for Sikhs and synagogues for Jews', distractors: ['Synagogues for Sikhs and gurdwaras for Jews', 'Temples for Sikhs and mosques for Jews', 'Gurdwaras for Sikhs and temples for Jews'] } },
      { question: 'What is a Sikh place of worship called?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'A gurdwara', distractors: ['A synagogue', 'A mosque', 'A temple'] } },
      { question: 'Which of these pairings does the handbook NOT make?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Sikhs and synagogues', distractors: ['Muslims and mosques', 'Hindus and temples', 'Jews and synagogues'] } },
    ],
  },
  {
    id: 'f539', tag: 'Religion', chapter: 4, verify: false, source: CH4_REL,
    question: 'In the 2011 census, what proportion identified themselves as Hindu?',
    answer: '1.5%',
    explanation: {
      lead: 'In the 2011 census, 1.5% identified themselves as Hindu.',
      versus: 'Hindu sits between Muslim above and Sikh below - 4.8%, 1.5%, 0.8% - and each is roughly half the one before it. Halving twice from the Muslim figure gets you both of the others.',
      why: 'Hindus and Sikhs both celebrate Diwali, which is why the two faiths keep appearing together elsewhere in the chapter and why their figures are worth learning as a pair.',
    },
    forms: [
      { question: 'Which faith did 1.5% of people identify with in the 2011 census?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Hindu', distractors: ['Sikh', 'Jewish', 'Buddhist'] } },
      { question: 'Which faith sits between Muslim and Sikh in the census figures?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Hindu', distractors: ['Jewish', 'Buddhist', 'Christian'] } },
      { question: 'Which of these lists the three named minority faiths from largest to smallest?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Muslim, Hindu, Sikh', distractors: ['Hindu, Muslim, Sikh', 'Sikh, Hindu, Muslim', 'Muslim, Sikh, Hindu'] } },
    ],
  },
  {
    id: 'f540', tag: 'Religion', chapter: 4, verify: false, source: CH4_REL,
    question: 'In the 2011 census, what proportion identified themselves as Sikh?',
    answer: '0.8%',
    explanation: {
      lead: 'In the 2011 census, 0.8% identified themselves as Sikh.',
      versus: 'Sikh is the smallest faith the census still gives a number to. Below it, Jewish and Buddhist are grouped together as under 0.5% rather than counted separately.',
      why: 'Sikhs worship in gurdwaras, and Vaisakhi in April is the festival the handbook names for them - so the faith, the building and the festival travel together.',
    },
    forms: [
      { question: 'Which faith did 0.8% of people identify with in the 2011 census?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Sikh', distractors: ['Hindu', 'Jewish', 'Buddhist'] } },
      { question: 'Which is the smallest faith given its own figure in the census, rather than being grouped?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Sikh', distractors: ['Hindu', 'Jewish', 'Buddhist'] } },
      { question: 'Which faiths does the census group together rather than counting separately?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Jewish and Buddhist, both under 0.5%', distractors: ['Sikh and Buddhist, both under 0.5%', 'Hindu and Sikh, both under 1%', 'Jewish and Sikh, both under 0.5%'] } },
    ],
  },
  {
    id: 'f541', tag: 'The UK today', chapter: 4, verify: false, source: CH4,
    question: 'What was the population of the UK at the 2021 census?',
    answer: 'About 67 million',
    explanation: {
      lead: 'The 2021 census put the UK population at about 67 million.',
      versus: 'The census is taken every ten years, so 2021 is the most recent one and the figure to quote. Anything offered for a year that is not a census year is a distractor.',
      why: 'The growth table runs 8 million in 1801, 40 million in 1901 and 50 million in 1951, so the population has risen by roughly ten million every twenty years since the war.',
      cluster: [
        { label: '1801, 8 million', detail: 'the first census, and the start of the industrial rise' },
        { label: '1901, 40 million', detail: 'five times the 1801 figure in a single century' },
        { label: '1951, 50 million', detail: 'post-war, and the last round number before the modern curve' },
        { label: '2021, about 67 million', detail: 'the most recent census, and the figure to quote' },
      ],
    },
    forms: [
      { question: 'What was the population of the UK at the 2021 census?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'About 67 million', distractors: ['About 57 million', 'About 62 million', 'About 72 million'] } },
      { question: 'Roughly how many people live in the UK, according to the most recent census?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'About 67 million', distractors: ['About 47 million', 'About 55 million', 'About 80 million'] } },
      { question: 'Which of these best describes the UK population today?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Between sixty-five and seventy million', distractors: ['Between fifty and fifty-five million', 'Between fifty-five and sixty million', 'Between seventy-five and eighty million'] } },
    ],
  },
];
