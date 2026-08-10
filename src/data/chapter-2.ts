// The deck. Originally generated from the first version of this app, then corrected and
// extended by hand. Edit freely — `source` records where each answer came from, and the
// structural and statistical checks in deck.test.ts are what keep it honest.

import type { Fact } from '@/domain/deck/types';

export const CHAPTER_2: readonly Fact[] = [
  {
    id: "f220",
    tag: "UK definition",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "What is the full official name of the UK?",
    answer: "The United Kingdom of Great Britain and Northern Ireland",
    forms: [
    {
      question: "What is the full official name of the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The United Kingdom of Great Britain and Northern Ireland",
        distractors: ["The United Kingdom of England, Scotland, Wales and Ireland", "The United Kingdom of Britain and the Northern Isles", "The United Kingdom of Great Britain and the British Isles"],
      },
    },
    {
      question: "What is the official name of the country?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The United Kingdom of Great Britain and Northern Ireland",
        distractors: ["The Commonwealth of Great Britain and Ireland", "The Union of Great Britain and the Irish Republic", "The United Kingdom of Great Britain and Ireland"],
      },
    },
    {
      question: "Which title correctly names the state made up of England, Scotland, Wales and Northern Ireland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The United Kingdom of Great Britain and Northern Ireland",
        distractors: ["The British Union of the Four Nations", "The Kingdom of Britain and Ulster", "Great Britain and the Northern Provinces"],
      },
    },
    ],
  },
  {
    id: "f221",
    tag: "UK definition",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Which four countries make up the UK?",
    answer: "England, Scotland, Wales and Northern Ireland",
    forms: [
    {
      question: "Which four countries make up the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "England, Scotland, Wales and Northern Ireland",
        distractors: ["England, Scotland, Wales and the Isle of Man", "England, Scotland, Ireland and the Channel Islands", "England, Cornwall, Scotland and Northern Ireland"],
      },
    },
    {
      question: "Which four nations make up the United Kingdom?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "England, Scotland, Wales and Northern Ireland",
        distractors: ["England, Scotland, Wales and the Channel Islands", "England, Scotland, Wales and Ireland", "England, Wales, Ireland and the Isle of Man"],
      },
    },
    {
      question: "A form asks you to name the countries of the UK. Which answer is right?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "England, Scotland, Wales, Northern Ireland",
        distractors: ["England, Scotland, Jersey and Wales", "England, Wales, Scotland and Cornwall", "Britain, Ireland, Wales and Scotland"],
      },
    },
    ],
  },
  {
    id: "f222",
    tag: "Great Britain",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Which three countries make up Great Britain?",
    answer: "England, Scotland and Wales",
    forms: [
    {
      question: "Which three countries make up Great Britain?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "England, Scotland and Wales",
        distractors: ["Scotland, Wales and Northern Ireland", "England, Scotland and Northern Ireland", "England, Wales and Northern Ireland"],
      },
    },
    {
      question: "Which country is NOT part of Great Britain?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Northern Ireland",
        distractors: ["England", "Scotland", "Wales"],
      },
    },
    {
      question: "Which statement about Great Britain is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "It is made up of England, Scotland and Wales",
        distractors: ["It is made up of England and Wales only", "It includes Northern Ireland but not Wales", "It is simply another name for the United Kingdom"],
      },
    },
    ],
  },
  {
    id: "f223",
    tag: "Great Britain",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Which part of the UK is not included in the term 'Great Britain'?",
    answer: "Northern Ireland",
    forms: [
    {
      question: "Which part of the UK is not included in the term 'Great Britain'?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Northern Ireland",
        distractors: ["Wales", "The Isle of Man", "Scotland"],
      },
    },
    {
      question: "Which of these is NOT part of Great Britain?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Northern Ireland",
        distractors: ["Scotland", "Wales", "England"],
      },
    },
    {
      question: "Which statement is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Great Britain means England, Scotland and Wales",
        distractors: ["Great Britain means the whole United Kingdom", "Great Britain means England and Wales only", "Great Britain includes Northern Ireland"],
      },
    },
    ],
  },
  {
    id: "f224",
    tag: "British Isles",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Besides the UK, which places are counted as part of the British Isles?",
    answer: "The Channel Islands and the Isle of Man",
    forms: [
    {
      question: "Besides the UK, which places are counted as part of the British Isles?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Channel Islands and the Isle of Man",
        distractors: ["The Isle of Man and the Isle of Wight", "The Falkland Islands and Gibraltar", "The Channel Islands and the Scilly Isles"],
      },
    },
    {
      question: "Which places are closely linked to the UK but are not actually part of it?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "The Channel Islands and the Isle of Man",
        distractors: ["The Isle of Wight and Anglesey", "The Orkney and Shetland Islands", "The Scilly Isles and Lundy"],
      },
    },
    {
      question: "Which of these are Crown dependencies rather than parts of the United Kingdom?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Channel Islands and the Isle of Man",
        distractors: ["Northern Ireland and Wales", "The Outer Hebrides and Skye", "Gibraltar and the Falkland Islands"],
      },
    },
    ],
  },
  {
    id: "f225",
    tag: "British Isles",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Is the Republic of Ireland part of the UK?",
    answer: "No, it is an independent country",
    forms: [
    {
      question: "Is the Republic of Ireland part of the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No, it is an independent country",
        distractors: ["Yes, as a fifth country", "Yes, but only Ulster", "No, but it is a Crown dependency"],
      },
    },
    {
      question: "Is the Republic of Ireland part of the United Kingdom?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No, it is an independent country",
        distractors: ["Yes, but only for defence matters", "No, it is a crown dependency", "Yes, it is one of the UK nations"],
      },
    },
    {
      question: "Which statement about the Republic of Ireland is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "It is an independent country",
        distractors: ["It is a British overseas territory", "It forms part of Great Britain", "It is governed from Westminster"],
      },
    },
    ],
  },
  {
    id: "f226",
    tag: "Crown dependencies",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Which two territories are the Crown dependencies?",
    answer: "The Isle of Man and the Channel Islands",
    forms: [
    {
      question: "Which two territories are the Crown dependencies?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Isle of Man and the Channel Islands",
        distractors: ["The Isle of Man and the Orkney Islands", "Gibraltar and the Channel Islands", "The Isle of Wight and the Scilly Isles"],
      },
    },
    {
      question: "Which of these is a Crown dependency?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "The Isle of Man",
        distractors: ["The Isle of Wight", "Gibraltar", "Orkney"],
      },
    },
    {
      question: "The Channel Islands and the Isle of Man are together known as what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Crown dependencies",
        distractors: ["Overseas territories", "Devolved nations", "The home counties"],
      },
    },
    ],
  },
  {
    id: "f227",
    tag: "Crown dependencies",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Are the Crown dependencies part of the UK?",
    answer: "No",
    forms: [
    {
      question: "Are the Crown dependencies part of the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No",
        distractors: ["Only the Channel Islands are", "Yes", "Only the Isle of Man is"],
      },
    },
    {
      question: "Which statement about the Crown dependencies is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "They are not part of the UK",
        distractors: ["They are part of the UK", "They are governed directly from Westminster", "They joined the UK in 1973"],
      },
    },
    {
      question: "Someone asks whether the Crown dependencies form part of the UK. What is the correct answer?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No",
        distractors: ["Yes", "Yes, since 1973", "Only in part"],
      },
    },
    ],
  },
  {
    id: "f228",
    retired: 'The Channel Islands are named as Crown dependencies, but Jersey and Guernsey are never named individually. Confirmed by the owner, 4 Aug 2026.',
    tag: "Crown dependencies",
    chapter: 2,
    verify: false,
    question: "Name two of the Channel Islands.",
    answer: "Jersey and Guernsey",
    forms: [
    {
      question: "Name two of the Channel Islands.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Jersey and Guernsey",
        distractors: ["Anglesey and Arran", "Guernsey and Orkney", "Jersey and Man"],
      },
    },
    {
      question: "The Channel Islands are made up of which two Bailiwicks?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Jersey and Guernsey",
        distractors: ["Lewis and Harris", "Man and Anglesey", "Sark and Herm"],
      },
    },
    {
      question: "Which pair of islands lying off the French coast form the Channel Islands' governing units?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Jersey and Guernsey",
        distractors: ["Arran and Bute", "Orkney and Shetland", "Wight and Portland"],
      },
    },
    ],
  },
  {
    id: "f229",
    tag: "Overseas territories",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Are the British overseas territories part of the UK?",
    answer: "No, they are linked to it",
    forms: [
    {
      question: "Are the British overseas territories part of the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No, they are linked to it",
        distractors: ["Yes, they are Crown dependencies", "Yes, they are UK counties", "No, they are fully independent"],
      },
    },
    {
      question: "Are the British overseas territories part of the UK itself?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No, but they are linked to it",
        distractors: ["No, they are wholly foreign states", "Yes, they are UK regions", "Yes, they are UK counties"],
      },
    },
    {
      question: "The Falkland Islands and St Helena stand in which relationship to the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "They are linked to the UK but not part of it",
        distractors: ["They are independent Commonwealth states", "They form part of the UK itself", "They are Crown dependencies with their own governments"],
      },
    },
    ],
  },
  {
    id: "f230",
    tag: "Overseas territories",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Which of these is a British overseas territory?",
    answer: "The Falkland Islands",
    forms: [
    {
      question: "Which of these is a British overseas territory?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Falkland Islands",
        distractors: ["The Channel Islands", "The Republic of Ireland", "The Isle of Man"],
      },
    },
    {
      question: "The Falkland Islands are best described as what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A British overseas territory",
        distractors: ["A part of the United Kingdom", "A Crown dependency", "An independent republic"],
      },
    },
    {
      question: "Which of these places is linked to the UK as an overseas territory?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Falkland Islands",
        distractors: ["The Isle of Man", "Jersey", "Guernsey"],
      },
    },
    ],
  },
  {
    id: "f231",
    tag: "Capitals",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "What is the capital city of Scotland?",
    answer: "Edinburgh",
    forms: [
    {
      question: "What is the capital city of Scotland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Edinburgh",
        distractors: ["Aberdeen", "Dundee", "Glasgow"],
      },
    },
    {
      question: "Edinburgh is the capital city of which country of the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Scotland",
        distractors: ["Wales", "Northern Ireland", "England"],
      },
    },
    {
      question: "You are asked to name Scotland's capital. Which do you choose?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Edinburgh",
        distractors: ["Inverness", "Stirling", "Perth"],
      },
    },
    ],
  },
  {
    id: "f232",
    tag: "Capitals",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "What is the capital city of Wales?",
    answer: "Cardiff",
    forms: [
    {
      question: "What is the capital city of Wales?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Cardiff",
        distractors: ["Bangor", "Swansea", "Newport"],
      },
    },
    {
      question: "Which city is the capital of Wales?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Cardiff",
        distractors: ["Newport", "Bangor", "Swansea"],
      },
    },
    {
      question: "The Senedd, the Welsh Parliament, sits in which city?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Cardiff",
        distractors: ["Wrexham", "Aberystwyth", "St Davids"],
      },
    },
    ],
  },
  {
    id: "f233",
    tag: "Capitals",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "What is the capital city of Northern Ireland?",
    answer: "Belfast",
    forms: [
    {
      question: "What is the capital city of Northern Ireland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Belfast",
        distractors: ["Londonderry", "Dublin", "Armagh"],
      },
    },
    {
      question: "What is the capital city of Northern Ireland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Belfast",
        distractors: ["Armagh", "Londonderry", "Lisburn"],
      },
    },
    {
      question: "Stormont, the home of the Northern Ireland Assembly, stands in which city?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Belfast",
        distractors: ["Bangor", "Enniskillen", "Newry"],
      },
    },
    ],
  },
  {
    id: "f234",
    tag: "Union Flag",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "By what popular name is the Union Flag usually known?",
    answer: "The Union Jack",
    forms: [
    {
      question: "By what popular name is the Union Flag usually known?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Union Jack",
        distractors: ["The King's Colours", "The British Standard", "The Royal Ensign"],
      },
    },
    {
      question: "The Union Jack is the popular name for which flag?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Union Flag",
        distractors: ["The Royal Standard", "The White Ensign", "The Cross of St George"],
      },
    },
    {
      question: "What is the Union Flag commonly called?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Union Jack",
        distractors: ["The King's Colours", "The Royal Ensign", "The British Standard"],
      },
    },
    ],
  },
  {
    id: "f235",
    tag: "Union Flag",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "How many crosses are combined in the Union Flag?",
    answer: "Three",
    forms: [
    {
      question: "How many crosses are combined in the Union Flag?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Three",
        distractors: ["Two", "Five", "Four"],
      },
    },
    {
      question: "The Union Flag combines ___ crosses.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "three",
        distractors: ["four", "five", "six"],
      },
    },
    {
      question: "Which statement about the Union Flag is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "It combines three crosses",
        distractors: ["It combines four crosses", "It combines two crosses", "It combines five crosses"],
      },
    },
    ],
  },
  {
    id: "f236",
    tag: "Union Flag",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "What does St George's cross look like?",
    answer: "A red upright cross on a white ground",
    forms: [
    {
      question: "What does St George's cross look like?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A red upright cross on a white ground",
        distractors: ["A white upright cross on a red ground", "A white diagonal cross on a blue ground", "A red diagonal cross on a white ground"],
      },
    },
    {
      question: "The cross of St George, which stands for England, looks like what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A red upright cross on a white ground",
        distractors: ["A red diagonal cross on white", "A white upright cross on red", "A white diagonal cross on blue"],
      },
    },
    {
      question: "Which element of the Union Flag represents England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A red upright cross on a white ground",
        distractors: ["A red diagonal cross on a white ground", "A white upright cross on a blue ground", "A white diagonal cross on a blue ground"],
      },
    },
    ],
  },
  {
    id: "f237",
    tag: "Union Flag",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "What does St Andrew's cross look like?",
    answer: "A white diagonal cross on a blue ground",
    forms: [
    {
      question: "What does St Andrew's cross look like?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A white diagonal cross on a blue ground",
        distractors: ["A red diagonal cross on a blue ground", "A blue diagonal cross on a white ground", "A white upright cross on a blue ground"],
      },
    },
    {
      question: "The cross of St Andrew on the Union Flag takes which form?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A white diagonal cross on blue",
        distractors: ["A white upright cross on red", "A red upright cross on white", "A red diagonal cross on white"],
      },
    },
    {
      question: "Which description matches the Scottish element of the Union Flag?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A white diagonal cross on blue",
        distractors: ["A blue diagonal cross on white", "A red dragon on green and white", "A white upright cross on blue"],
      },
    },
    ],
  },
  {
    id: "f238",
    tag: "Union Flag",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "What does St Patrick's cross look like?",
    answer: "A red diagonal cross on a white ground",
    forms: [
    {
      question: "What does St Patrick's cross look like?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A red diagonal cross on a white ground",
        distractors: ["A green diagonal cross on a white ground", "A red upright cross on a white ground", "A white diagonal cross on a red ground"],
      },
    },
    {
      question: "A red diagonal cross on a white ground is the cross of which saint?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "St Patrick",
        distractors: ["St George", "St Andrew", "St David"],
      },
    },
    {
      question: "On the Union Flag, St Patrick's cross appears as ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "a red diagonal cross on a white ground",
        distractors: ["a green diagonal cross on a white ground", "a red upright cross on a white ground", "a red diagonal cross on a blue ground"],
      },
    },
    ],
  },
  {
    id: "f239",
    tag: "Union Flag",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Why does the Union Flag include no Welsh emblem?",
    answer: "Wales was already joined to England when the flag was created",
    forms: [
    {
      question: "Why does the Union Flag include no Welsh emblem?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Wales was already joined to England when the flag was created",
        distractors: ["Wales joined the United Kingdom long after the flag was fixed", "Wales chose to keep its own red dragon flag separately", "Wales has no saint's cross of its own to add"],
      },
    },
    {
      question: "Which explanation for the absence of a Welsh emblem on the Union Flag is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Wales was already joined to England when the flag was created",
        distractors: ["Wales refused to join the union", "The Welsh emblem was later removed", "Wales became part of the UK only in the 1900s"],
      },
    },
    {
      question: "The Union Flag carries no Welsh emblem because Wales ___ when the flag was created.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "was already joined to England",
        distractors: ["kept its own separate parliament", "was ruled from Scotland", "had not yet chosen a saint"],
      },
    },
    ],
  },
  {
    id: "f240",
    tag: "National flags",
    chapter: 2,
    verify: false,
    question: "What emblem appears on the flag of Wales?",
    answer: "A red dragon",
    forms: [
    {
      question: "What emblem appears on the flag of Wales?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A red dragon",
        distractors: ["A white rose", "A blue saltire", "A golden harp"],
      },
    },
    {
      question: "What appears on the flag of Wales?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A red dragon",
        distractors: ["A gold lion", "A white horse", "A black raven"],
      },
    },
    {
      question: "The Welsh flag shows which figure on a green and white background?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A red dragon",
        distractors: ["A golden leek", "A blue griffin", "A silver eagle"],
      },
    },
    ],
  },
  {
    id: "f241",
    tag: "Patron saints",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Who is the patron saint of England?",
    answer: "St George",
    forms: [
    {
      question: "Who is the patron saint of England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "St George",
        distractors: ["St Andrew", "St Patrick", "St David"],
      },
    },
    {
      question: "A red cross on a white ground is the flag of which patron saint?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "St George",
        distractors: ["St Columba", "St Edmund", "St Alban"],
      },
    },
    ],
  },
  {
    id: "f242",
    tag: "Patron saints",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Who is the patron saint of Scotland?",
    answer: "St Andrew",
    forms: [
    {
      question: "Who is the patron saint of Scotland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "St Andrew",
        distractors: ["St George", "St Patrick", "St David"],
      },
    },
    {
      question: "St Andrew is the patron saint of which country?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Scotland",
        distractors: ["Wales", "Ireland", "England"],
      },
    },
    {
      question: "Scotland's patron saint is ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "St Andrew",
        distractors: ["St David", "St George", "St Patrick"],
      },
    },
    ],
  },
  {
    id: "f243",
    tag: "Patron saints",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Who is the patron saint of Wales?",
    answer: "St David",
    forms: [
    {
      question: "Who is the patron saint of Wales?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "St David",
        distractors: ["St George", "St Andrew", "St Patrick"],
      },
    },
    {
      question: "St David is the patron saint of which country?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Wales",
        distractors: ["Scotland", "Ireland", "England"],
      },
    },
    {
      question: "The patron saint of Wales is ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "St David",
        distractors: ["St Andrew", "St Patrick", "St George"],
      },
    },
    ],
  },
  {
    id: "f244",
    tag: "Patron saints",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "Who is the patron saint of Northern Ireland?",
    answer: "St Patrick",
    forms: [
    {
      question: "Who is the patron saint of Northern Ireland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "St Patrick",
        distractors: ["St Andrew", "St David", "St George"],
      },
    },
    {
      question: "The national day marked on 17 March honours which saint?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "St Patrick",
        distractors: ["St Augustine", "St Columba", "St Brigid"],
      },
    },
    ],
  },
  {
    id: "f245",
    tag: "Patron saints",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "On what date is St David's Day?",
    answer: "1 March",
    forms: [
    {
      question: "On what date is St David's Day?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1 March",
        distractors: ["23 April", "17 March", "30 November"],
      },
    },
    {
      question: "St David's Day is celebrated on which date?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1 March",
        distractors: ["30 November", "17 March", "23 April"],
      },
    },
    {
      question: "A Welsh community is booking its national day celebration. Which date should it choose?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1 March",
        distractors: ["1 May", "3 March", "31 March"],
      },
    },
    ],
  },
  {
    id: "f246",
    tag: "Patron saints",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "On what date is St Patrick's Day?",
    answer: "17 March",
    forms: [
    {
      question: "On what date is St Patrick's Day?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "17 March",
        distractors: ["23 April", "30 November", "1 March"],
      },
    },
    {
      question: "Which saint's day falls on 17 March?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "St Patrick's Day",
        distractors: ["St David's Day", "St George's Day", "St Andrew's Day"],
      },
    },
    {
      question: "St Patrick's Day is celebrated each year on ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "17 March",
        distractors: ["1 March", "23 April", "30 November"],
      },
    },
    ],
  },
  {
    id: "f247",
    tag: "Patron saints",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "On what date is St George's Day?",
    answer: "23 April",
    forms: [
    {
      question: "On what date is St George's Day?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "23 April",
        distractors: ["30 November", "1 March", "17 March"],
      },
    },
    {
      question: "Which saint's day falls on 23 April?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "St George's Day",
        distractors: ["St Andrew's Day", "St David's Day", "St Patrick's Day"],
      },
    },
    {
      question: "St George's Day is celebrated on ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "23 April",
        distractors: ["23 March", "13 April", "3 April"],
      },
    },
    ],
  },
  {
    id: "f248",
    tag: "Patron saints",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "On what date is St Andrew's Day?",
    answer: "30 November",
    forms: [
    {
      question: "On what date is St Andrew's Day?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "30 November",
        distractors: ["23 April", "17 March", "1 March"],
      },
    },
    {
      question: "St Andrew's Day, celebrated in Scotland, falls on which date?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "30 November",
        distractors: ["23 April", "11 November", "1 March"],
      },
    },
    {
      question: "Which date marks the national saint's day of Scotland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "30 November",
        distractors: ["31 October", "25 January", "31 December"],
      },
    },
    ],
  },
  {
    id: "f249",
    tag: "Patron saints",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "In which two parts of the UK is the patron saint's day an official holiday?",
    answer: "Scotland and Northern Ireland",
    forms: [
    {
      question: "In which two parts of the UK is the patron saint's day an official holiday?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Scotland and Northern Ireland",
        distractors: ["England and Northern Ireland", "Wales and Scotland", "England and Wales"],
      },
    },
    {
      question: "In which parts of the UK is the patron saint's day an official public holiday?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Scotland and Northern Ireland",
        distractors: ["England and Wales", "England and Scotland", "Wales and Northern Ireland"],
      },
    },
    {
      question: "Saints' days are not public holidays everywhere in the UK. Where do they count as official holidays?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "In Scotland and Northern Ireland",
        distractors: ["In England only", "In Wales and Scotland", "In England and Northern Ireland"],
      },
    },
    ],
  },
  {
    id: "f250",
    tag: "Languages",
    chapter: 2,
    verify: false,
    source: 'Handbook 3rd ed., ch.2 — corroborated against the handbook text',
    question: "In which part of Scotland is Gaelic mainly spoken?",
    answer: "The Highlands and Islands",
    forms: [
    {
      question: "In which part of Scotland is Gaelic mainly spoken?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Highlands and Islands",
        distractors: ["The Central Belt", "The east coast", "The Borders"],
      },
    },
    {
      question: "Gaelic is mainly spoken in which part of Scotland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Highlands and Islands",
        distractors: ["The Borders", "The Central Belt", "The area around Edinburgh"],
      },
    },
    {
      question: "In the Highlands and Islands of Scotland, which language is spoken as well as English?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Gaelic",
        distractors: ["Welsh", "Cornish", "Ulster Scots"],
      },
    },
    ],
  },
  {
    id: "f251",
    tag: "Languages",
    chapter: 2,
    verify: false,
    question: "Which language variety, other than Irish, is used by some in Northern Ireland?",
    answer: "Ulster Scots",
    forms: [
    {
      question: "Which language variety, other than Irish, is used by some in Northern Ireland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Ulster Scots",
        distractors: ["Norman French", "Old Norse", "Ulster Gaelic"],
      },
    },
    {
      question: "Besides Irish, some people in Northern Ireland use ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Ulster Scots",
        distractors: ["Manx", "Cornish", "Scottish Gaelic"],
      },
    },
    {
      question: "In Northern Ireland you hear a language variety other than Irish. Which is it?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Ulster Scots",
        distractors: ["Norman French", "Ulster Gaelic", "Old Norse"],
      },
    },
    ],
  },
  {
    id: "f252",
    retired: 'Cornwall is mentioned once; the Cornish language is not. Confirmed by the owner, 4 Aug 2026.',
    tag: "Languages",
    chapter: 2,
    verify: false,
    question: "Which Celtic language is associated with Cornwall?",
    answer: "Cornish",
    forms: [
    {
      question: "Which Celtic language is associated with Cornwall?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Cornish",
        distractors: ["Welsh", "Manx", "Gaelic"],
      },
    },
    {
      question: "Which language is spoken by some people in Cornwall?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Cornish",
        distractors: ["Breton", "Gaelic", "Manx"],
      },
    },
    {
      question: "Besides Welsh and Gaelic, which language has been revived in one part of Britain?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Cornish",
        distractors: ["Latin", "Flemish", "Norn"],
      },
    },
    ],
  },
  {
    id: "f253",
    tag: "Population",
    chapter: 2,
    verify: false,
    question: "Roughly what is the current population of the UK?",
    answer: "About 67.6 million",
    source: "Handbook 3rd ed., ch.4 “The UK today” — population growth table",
    forms: [
    {
      question: "Roughly what is the current population of the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "About 67.6 million",
        distractors: ["About 57.6 million", "About 47.6 million", "About 77.6 million"],
      },
    },
    {
      question: "By the 2022 estimate, roughly how many people lived in the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "About 67.6 million",
        distractors: ["About 62.6 million", "About 72.6 million", "About 57.6 million"],
      },
    },
    {
      question: "Which figure comes closest to the total population of the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Around 67.6 million",
        distractors: ["Around 100 million", "Around 85 million", "Around 40 million"],
      },
    },
    ],
  },
];
