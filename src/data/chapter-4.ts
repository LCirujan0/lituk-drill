// The deck. Originally generated from the first version of this app, then corrected and
// extended by hand. Edit freely — `source` records where each answer came from, and the
// structural and statistical checks in deck.test.ts are what keep it honest.

import type { Fact } from '@/domain/deck/types';

export const CHAPTER_4: readonly Fact[] = [
  {
    id: "f254",
    tag: "Demographics",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "How often is a census taken in the UK?",
    answer: "Every 10 years",
    forms: [
    {
      question: "How often is a census taken in the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Every 10 years",
        distractors: ["Every 5 years", "Every 15 years", "Every 20 years"],
      },
    },
    {
      question: "A census of the UK population is carried out once every ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "10 years",
        distractors: ["5 years", "15 years", "20 years"],
      },
    },
    {
      question: "Which statement about the UK census is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "It is taken every 10 years",
        distractors: ["It is taken every year", "It is taken every 5 years", "It is taken only when Parliament votes for one"],
      },
    },
    ],
  },
  {
    id: "f255",
    tag: "Demographics",
    chapter: 4,
    verify: false,
    question: "What percentage of the UK population lives in England?",
    answer: "84%",
    source: "Handbook 3rd ed., ch.4 “The UK today” — population distribution",
    forms: [
    {
      question: "What percentage of the UK population lives in England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "84%",
        distractors: ["69%", "76%", "91%"],
      },
    },
    {
      question: "Complete the sentence: about ___ of the UK population lives in England.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "84%",
        distractors: ["59%", "69%", "95%"],
      },
    },
    {
      question: "In a quiz you are asked what share of UK residents live in England. Which is right?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "84%",
        distractors: ["74%", "64%", "54%"],
      },
    },
    ],
  },
  {
    id: "f256",
    tag: "Demographics",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "What is meant by saying the UK has an ageing population?",
    answer: "People are living longer, so there are more elderly people",
    forms: [
    {
      question: "What is meant by saying the UK has an ageing population?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "People are living longer, so there are more elderly people",
        distractors: ["Fewer migrants are arriving each year", "The birth rate is rising sharply, so there are many more children", "More young people are moving to cities"],
      },
    },
    {
      question: "Which statement about the UK's population is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "People are living longer, so there are more elderly people",
        distractors: ["Deaths now outnumber births every year", "The population has fallen since the 1970s", "Most people in the UK now live in rural areas rather than towns"],
      },
    },
    {
      question: "Why must the UK plan for more pensions and care services in future?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "People are living longer, so there are more elderly people",
        distractors: ["Birth rates have risen sharply since 2000", "Most workers now retire before the age of 55", "More people are moving into the biggest cities"],
      },
    },
    ],
  },
  {
    id: "f257",
    tag: "Religion",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which church is the officially established church in England?",
    answer: "The Church of England",
    forms: [
    {
      question: "Which church is the officially established church in England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Church of England",
        distractors: ["The Methodist Church", "The Roman Catholic Church", "The Baptist Union"],
      },
    },
    {
      question: "Which is the established Church in England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Church of England",
        distractors: ["The Roman Catholic Church", "The Methodist Church", "The Church of Scotland"],
      },
    },
    {
      question: "The monarch acts as head of which church?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Church of England",
        distractors: ["The Baptist Union", "The Free Church of Wales", "The Presbyterian Church"],
      },
    },
    ],
  },
  {
    id: "f258",
    retired: 'The handbook says the monarch is HEAD of the Church of England. "Supreme Governor" does not appear. Confirmed by the owner, 4 Aug 2026.',
    tag: "Religion",
    chapter: 4,
    verify: false,
    question: "Who holds the title of Supreme Governor of the Church of England?",
    answer: "The reigning monarch",
    forms: [
    {
      question: "Who holds the title of Supreme Governor of the Church of England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The reigning monarch",
        distractors: ["The Prime Minister", "The Lord Chancellor", "The Speaker of the Commons"],
      },
    },
    {
      question: "The reigning monarch holds which title in the Church of England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Supreme Governor",
        distractors: ["Archbishop of Canterbury", "Lord Chancellor", "Primate of All England"],
      },
    },
    {
      question: "Who is the Supreme Governor of the Church of England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The reigning monarch",
        distractors: ["The Prime Minister", "The Archbishop of York", "The Speaker of the Commons"],
      },
    },
    ],
  },
  {
    id: "f259",
    tag: "Religion",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Who is the most senior clergyman in the Church of England?",
    answer: "The Archbishop of Canterbury",
    forms: [
    {
      question: "Who is the most senior clergyman in the Church of England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Archbishop of Canterbury",
        distractors: ["The Archbishop of York", "The Bishop of London", "The Dean of Westminster"],
      },
    },
    {
      question: "The Archbishop of Canterbury holds which position?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Most senior clergyman in the Church of England",
        distractors: ["Head of the Roman Catholic Church in England", "Head of the Church of Scotland", "Speaker of the House of Lords"],
      },
    },
    {
      question: "The most senior clergyman in the Church of England is the ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Archbishop of Canterbury",
        distractors: ["Bishop of London", "Archbishop of York", "Dean of Westminster"],
      },
    },
    ],
  },
  {
    id: "f260",
    tag: "Religion",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "What form of church government does the Church of Scotland have?",
    answer: "Presbyterian",
    forms: [
    {
      question: "What form of church government does the Church of Scotland have?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Presbyterian",
        distractors: ["Episcopal", "Congregational", "Papal"],
      },
    },
    {
      question: "The Church of Scotland, the national church there, follows which form of church government?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Presbyterian",
        distractors: ["Anglican", "Catholic", "Methodist"],
      },
    },
    {
      question: "Which word describes the Church of Scotland, whose Moderator is chosen each year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Presbyterian",
        distractors: ["Episcopal", "Baptist", "Quaker"],
      },
    },
    ],
  },
  {
    id: "f261",
    tag: "Festivals",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which two days over Christmas are bank holidays across the UK?",
    answer: "Christmas Day and Boxing Day",
    forms: [
    {
      question: "Which two days over Christmas are bank holidays across the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Christmas Day and Boxing Day",
        distractors: ["Christmas Eve and Christmas Day", "Boxing Day and New Year's Eve", "Christmas Eve and Boxing Day"],
      },
    },
    {
      question: "Which two December days are public holidays across the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Christmas Day and Boxing Day",
        distractors: ["Christmas Eve and Christmas Day", "Christmas Eve and New Year's Eve", "Boxing Day and New Year's Eve"],
      },
    },
    {
      question: "Shops and offices close on 25 and 26 December. What are those two days called?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Christmas Day and Boxing Day",
        distractors: ["Advent Sunday and Christmas Day", "Christmas Day and Twelfth Night", "Christmas Eve and Boxing Day"],
      },
    },
    ],
  },
  {
    id: "f262",
    tag: "Festivals",
    chapter: 4,
    verify: false,
    question: "How long is the season of Advent before Christmas?",
    answer: "Four weeks",
    forms: [
    {
      question: "How long is the season of Advent before Christmas?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Four weeks",
        distractors: ["Two weeks", "Six weeks", "Twelve days"],
      },
    },
    {
      question: "Which four-week season leads up to Christmas?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Advent",
        distractors: ["Lent", "Whitsun", "Epiphany"],
      },
    },
    {
      question: "Advent begins ___ before Christmas.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "four weeks",
        distractors: ["two weeks", "six weeks", "twelve days"],
      },
    },
    ],
  },
  {
    id: "f263",
    tag: "Festivals",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "How many days does the Christian season of Lent last?",
    answer: "40 days",
    forms: [
    {
      question: "How many days does the Christian season of Lent last?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "40 days",
        distractors: ["30 days", "50 days", "12 days"],
      },
    },
    {
      question: "Which season of the Christian calendar lasts 40 days?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Lent",
        distractors: ["Advent", "Epiphany", "Pentecost"],
      },
    },
    {
      question: "Lent lasts for how many days?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "40",
        distractors: ["7", "21", "60"],
      },
    },
    ],
  },
  {
    id: "f264",
    tag: "Festivals",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which two days at Easter are public holidays in England, Wales and NI?",
    answer: "Good Friday and Easter Monday",
    forms: [
    {
      question: "Which two days at Easter are public holidays in England, Wales and NI?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Good Friday and Easter Monday",
        distractors: ["Easter Sunday and Easter Monday", "Maundy Thursday and Good Friday", "Good Friday and Easter Sunday"],
      },
    },
    {
      question: "Which two days around Easter are public holidays?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Good Friday and Easter Monday",
        distractors: ["Easter Sunday and Easter Monday", "Palm Sunday and Good Friday", "Maundy Thursday and Easter Sunday"],
      },
    },
    {
      question: "Banks and many businesses close on which bank holidays at Easter time?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Good Friday and Easter Monday",
        distractors: ["Ascension Day and Whit Sunday", "Shrove Tuesday and Ash Wednesday", "Easter Saturday and Easter Sunday"],
      },
    },
    ],
  },
  {
    id: "f265",
    tag: "Festivals",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which two faith communities celebrate Diwali?",
    answer: "Hindus and Sikhs",
    forms: [
    {
      question: "Which two faith communities celebrate Diwali?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Hindus and Sikhs",
        distractors: ["Muslims and Sikhs", "Buddhists and Hindus", "Jews and Hindus"],
      },
    },
    {
      question: "Diwali, the festival of lights, is celebrated mainly by which groups?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Hindus and Sikhs",
        distractors: ["Buddhists and Jains", "Muslims and Jews", "Christians and Hindus"],
      },
    },
    {
      question: "Which communities in Britain mark a festival of lights each autumn?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sikh and Hindu communities",
        distractors: ["Buddhist and Christian communities", "Jewish and Muslim communities", "Jain and Baha'i communities"],
      },
    },
    ],
  },
  {
    id: "f266",
    tag: "Festivals",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "How many days does the Jewish festival of Hanukkah last?",
    answer: "Eight days",
    forms: [
    {
      question: "How many days does the Jewish festival of Hanukkah last?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Eight days",
        distractors: ["Five days", "Ten days", "Three days"],
      },
    },
    {
      question: "How long does the festival of Hanukkah last?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Eight days",
        distractors: ["Three days", "Seven days", "Ten days"],
      },
    },
    {
      question: "A colleague asks how many days Hanukkah is celebrated for. What do you say?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Eight",
        distractors: ["Four", "Twelve", "Six"],
      },
    },
    ],
  },
  {
    id: "f267",
    tag: "Festivals",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which Muslim festival marks the end of Ramadan?",
    answer: "Eid al-Fitr",
    forms: [
    {
      question: "Which Muslim festival marks the end of Ramadan?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Eid al-Fitr",
        distractors: ["Eid ul Adha", "Ashura", "Mawlid"],
      },
    },
    {
      question: "Eid al-Fitr marks the end of what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Ramadan",
        distractors: ["Diwali", "Lent", "Hanukkah"],
      },
    },
    {
      question: "Muslims mark the end of the month of Ramadan with ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Eid al-Fitr",
        distractors: ["Eid ul Adha", "Hanukkah", "Vaisakhi"],
      },
    },
    ],
  },
  {
    id: "f268",
    tag: "Festivals",
    chapter: 4,
    verify: false,
    question: "What does Eid ul Adha commemorate?",
    answer: "Ibrahim's willingness to sacrifice his son for God",
    forms: [
    {
      question: "What does Eid ul Adha commemorate?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Ibrahim's willingness to sacrifice his son for God",
        distractors: ["The revelation of the Quran to Muhammad", "The migration of Muhammad to Medina", "The end of the month of fasting"],
      },
    },
    {
      question: "What does the festival of Eid ul Adha remember?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Ibrahim's willingness to sacrifice his son for God",
        distractors: ["The end of Ramadan, when Muslims have fasted for a whole month", "The journey of the Prophet to Medina", "The revealing of the Qur'an to the Prophet"],
      },
    },
    {
      question: "Muslims mark Eid ul Adha each year in memory of which event?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Ibrahim's willingness to sacrifice his son for God",
        distractors: ["The birth of the Prophet Muhammad", "The first pilgrimage that Muslims made to the city of Mecca", "The night of power during Ramadan"],
      },
    },
    ],
  },
  {
    id: "f269",
    tag: "Festivals",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "On what date is the Sikh festival of Vaisakhi normally celebrated?",
    answer: "14 April",
    forms: [
    {
      question: "On what date is the Sikh festival of Vaisakhi normally celebrated?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "14 April",
        distractors: ["1 April", "14 March", "24 April"],
      },
    },
    {
      question: "Vaisakhi is celebrated on which date each year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "14 April",
        distractors: ["14 May", "21 March", "1 April"],
      },
    },
    {
      question: "The Sikh new year festival falls on which day?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "14 April",
        distractors: ["30 March", "4 April", "24 April"],
      },
    },
    ],
  },
  {
    id: "f270",
    tag: "Traditions",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "What is the Scottish name for New Year's Eve celebrations?",
    answer: "Hogmanay",
    forms: [
    {
      question: "What is the Scottish name for New Year's Eve celebrations?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Hogmanay",
        distractors: ["Ceilidh", "Beltane", "Up Helly Aa"],
      },
    },
    {
      question: "Hogmanay is the Scottish celebration of which occasion?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "New Year's Eve",
        distractors: ["Midsummer", "The harvest", "Christmas Eve"],
      },
    },
    {
      question: "In Scotland, New Year's Eve celebrations are known as ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Hogmanay",
        distractors: ["St Andrew's Day", "Auld Lang Syne", "Up Helly Aa"],
      },
    },
    ],
  },
  {
    id: "f271",
    tag: "Traditions",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Until what time of day are April Fool's jokes traditionally allowed?",
    answer: "Midday",
    forms: [
    {
      question: "Until what time of day are April Fool's jokes traditionally allowed?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Midday",
        distractors: ["Sunset", "Midnight", "3pm"],
      },
    },
    {
      question: "Which statement about April Fool's Day is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Jokes are traditionally allowed only until midday",
        distractors: ["Jokes are traditionally allowed all day and night", "Jokes are traditionally allowed only after midday", "Jokes are traditionally allowed all week"],
      },
    },
    {
      question: "A friend plays a trick at 3pm on 1 April. By tradition this is too late, as jokes should stop at ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "midday",
        distractors: ["11am", "1pm", "2pm"],
      },
    },
    ],
  },
  {
    id: "f272",
    tag: "Traditions",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "When does Mothering Sunday fall?",
    answer: "The Sunday three weeks before Easter",
    forms: [
    {
      question: "When does Mothering Sunday fall?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Sunday three weeks before Easter",
        distractors: ["The second Sunday in May", "The Sunday after Easter", "The first Sunday in March"],
      },
    },
    {
      question: "When does Mothering Sunday fall?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Sunday three weeks before Easter",
        distractors: ["The Sunday four weeks before Easter", "The first Sunday in May", "The Sunday after Easter Sunday"],
      },
    },
    {
      question: "Cards and flowers are given to mothers in the UK on which day?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Sunday three weeks before Easter",
        distractors: ["Easter Sunday itself", "The first Sunday of Lent", "The second Sunday in June"],
      },
    },
    ],
  },
  {
    id: "f273",
    tag: "Traditions",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "When is Father's Day in the UK?",
    answer: "The third Sunday in June",
    forms: [
    {
      question: "When is Father's Day in the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The third Sunday in June",
        distractors: ["The first Sunday in June", "The third Sunday in July", "The second Sunday in May"],
      },
    },
    {
      question: "When does Father's Day fall in the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The third Sunday in June",
        distractors: ["The second Sunday in May", "The last Sunday in June", "The first Sunday in June"],
      },
    },
    {
      question: "A family wants to book a restaurant table for Father's Day. Which date should they aim for?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The third Sunday of June",
        distractors: ["The third Sunday of May", "The second Sunday of June", "The first Sunday of July"],
      },
    },
    ],
  },
  {
    id: "f274",
    tag: "Traditions",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "On what date is Halloween?",
    answer: "31 October",
    forms: [
    {
      question: "On what date is Halloween?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "31 October",
        distractors: ["1 November", "30 October", "5 November"],
      },
    },
    {
      question: "Halloween falls on which date?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "31 October",
        distractors: ["11 November", "1 November", "30 November"],
      },
    },
    {
      question: "Which of these is celebrated on 31 October?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Halloween",
        distractors: ["Bonfire Night", "All Saints' Day", "Hogmanay"],
      },
    },
    ],
  },
  {
    id: "f275",
    tag: "Traditions",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "On what date is Bonfire Night?",
    answer: "5 November",
    forms: [
    {
      question: "On what date is Bonfire Night?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "5 November",
        distractors: ["11 November", "31 October", "1 November"],
      },
    },
    {
      question: "Bonfire Night is celebrated each year on ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "5 November",
        distractors: ["1 November", "11 November", "30 November"],
      },
    },
    {
      question: "Which occasion is celebrated in Britain on 5 November?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Bonfire Night",
        distractors: ["Remembrance Day", "Halloween", "All Saints' Day"],
      },
    },
    ],
  },
  {
    id: "f276",
    tag: "Traditions",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "On what date is Remembrance Day?",
    answer: "11 November",
    forms: [
    {
      question: "On what date is Remembrance Day?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "11 November",
        distractors: ["5 November", "1 November", "11 December"],
      },
    },
    {
      question: "Remembrance Day, when poppies are worn, is marked on which date?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "11 November",
        distractors: ["21 November", "5 November", "1 November"],
      },
    },
    {
      question: "A two-minute silence is held at eleven in the morning on which date each year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "11 November",
        distractors: ["26 December", "31 October", "25 December"],
      },
    },
    ],
  },
  {
    id: "f277",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Who was the first person to run a mile in under four minutes?",
    answer: "Sir Roger Bannister, in 1954",
    forms: [
    {
      question: "Who was the first person to run a mile in under four minutes?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Roger Bannister, in 1954",
        distractors: ["Sir Steve Redgrave, in 1954", "Sir Roger Bannister, in 1964", "Sir Chris Chataway, in 1954"],
      },
    },
    {
      question: "Who first ran a mile in under four minutes, and in which year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Roger Bannister, in 1954",
        distractors: ["Sir Gordon Pirie, in 1954", "Sir Chris Chataway, in 1955", "Sir Roger Bannister, in 1962"],
      },
    },
    {
      question: "The four-minute mile barrier was broken by which athlete, and when?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Roger Bannister, in 1954",
        distractors: ["Steve Cram, in 1985", "Sebastian Coe, in 1979", "Derek Ibbotson, in 1957"],
      },
    },
    ],
  },
  {
    id: "f278",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which Scottish driver won three Formula 1 world championships?",
    answer: "Sir Jackie Stewart",
    forms: [
    {
      question: "Which Scottish driver won three Formula 1 world championships?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Jackie Stewart",
        distractors: ["Damon Hill", "Jenson Button", "Nigel Mansell"],
      },
    },
    {
      question: "The Scottish driver Sir Jackie Stewart won ___ Formula 1 world championships.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "three",
        distractors: ["four", "five", "six"],
      },
    },
    {
      question: "Which of these statements is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Sir Jackie Stewart won three Formula 1 world championships",
        distractors: ["Damon Hill won three Formula 1 world championships", "Jenson Button won three Formula 1 world championships", "Sir Jackie Stewart won five Formula 1 world championships"],
      },
    },
    ],
  },
  {
    id: "f279",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Who captained the England football team that won the 1966 World Cup?",
    answer: "Bobby Moore",
    forms: [
    {
      question: "Who captained the England football team that won the 1966 World Cup?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Bobby Moore",
        distractors: ["Bobby Charlton", "Geoff Hurst", "Alf Ramsey"],
      },
    },
    {
      question: "Bobby Moore is remembered for what in 1966?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Captaining England's World Cup-winning team",
        distractors: ["Managing England's World Cup-winning team", "Scoring a hat-trick in the final", "Saving a penalty in the final"],
      },
    },
    {
      question: "England's captain when they won the 1966 World Cup was ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Bobby Moore",
        distractors: ["Alf Ramsey", "Geoff Hurst", "Gordon Banks"],
      },
    },
    ],
  },
  {
    id: "f280",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which British ice dancers won Olympic gold in 1984 with their Bolero routine?",
    answer: "Jayne Torvill and Christopher Dean",
    forms: [
    {
      question: "Which British ice dancers won Olympic gold in 1984 with their Bolero routine?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Jayne Torvill and Christopher Dean",
        distractors: ["Robin Cousins and Karen Barber", "John Curry and Jayne Torvill", "Nicky Slater and Karen Barber"],
      },
    },
    {
      question: "Which pair won Olympic gold for Britain in ice dancing in 1984?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Jayne Torvill and Christopher Dean",
        distractors: ["Kelly Holmes and Denise Lewis", "Andy Murray and Jamie Murray", "Sebastian Coe and Steve Ovett"],
      },
    },
    {
      question: "Britain's most celebrated ice dancers, who earned perfect marks at the Winter Olympics, were who?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Jayne Torvill and Christopher Dean",
        distractors: ["Sue Barker and Ann Jones", "Chris Hoy and Victoria Pendleton", "Roger Bannister and Chris Chataway"],
      },
    },
    ],
  },
  {
    id: "f281",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which British rower won gold at five consecutive Olympic Games?",
    answer: "Sir Steve Redgrave",
    forms: [
    {
      question: "Which British rower won gold at five consecutive Olympic Games?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Steve Redgrave",
        distractors: ["Sir Matthew Pinsent", "Sir Chris Hoy", "James Cracknell"],
      },
    },
    {
      question: "Which British rower took gold at five consecutive Olympic Games?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Steve Redgrave",
        distractors: ["Sir Bradley Wiggins", "Sir Matthew Pinsent", "Sir Chris Hoy"],
      },
    },
    {
      question: "Five Olympic gold medals at five different Games were won by which British sportsman?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Steve Redgrave",
        distractors: ["Daley Thompson", "Sir Mo Farah", "Sir Ben Ainslie"],
      },
    },
    ],
  },
  {
    id: "f282",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which two track titles did Dame Kelly Holmes win at the 2004 Olympics?",
    answer: "800 metres and 1500 metres",
    forms: [
    {
      question: "Which two track titles did Dame Kelly Holmes win at the 2004 Olympics?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "800 metres and 1500 metres",
        distractors: ["1500 metres and 5000 metres", "400 metres and 800 metres", "5000 metres and 10000 metres"],
      },
    },
    {
      question: "At the 2004 Olympics, which athlete won two track titles for Britain?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Dame Kelly Holmes",
        distractors: ["Dame Jessica Ennis-Hill", "Dame Mary Peters", "Baroness Grey-Thompson"],
      },
    },
    {
      question: "Dame Kelly Holmes won her two 2004 Olympic titles at which distances?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "800 metres and 1500 metres",
        distractors: ["400 metres and 800 metres", "1500 metres and 3000 metres", "200 metres and 400 metres"],
      },
    },
    ],
  },
  {
    id: "f283",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "In which sport did Sir Chris Hoy win his six Olympic gold medals?",
    answer: "Cycling",
    forms: [
    {
      question: "In which sport did Sir Chris Hoy win his six Olympic gold medals?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Cycling",
        distractors: ["Rowing", "Sailing", "Swimming"],
      },
    },
    {
      question: "Which statement about Sir Chris Hoy is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "He won six Olympic gold medals in cycling",
        distractors: ["He won six Olympic gold medals in rowing", "He won six Olympic gold medals in sailing", "He won six Olympic gold medals in swimming"],
      },
    },
    {
      question: "Sir Chris Hoy won his six Olympic gold medals as a ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "cyclist",
        distractors: ["rower", "sailor", "swimmer"],
      },
    },
    ],
  },
  {
    id: "f284",
    tag: "Sport",
    chapter: 4,
    verify: false,
    question: "Which athlete became the first Briton to win the Tour de France, in 2012?",
    answer: "Sir Bradley Wiggins",
    source: "Handbook 3rd ed., ch.4 “Sport”",
    forms: [
    {
      question: "Which athlete became the first Briton to win the Tour de France, in 2012?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Bradley Wiggins",
        distractors: ["Sir Chris Hoy", "Mark Cavendish", "David Weir"],
      },
    },
    {
      question: "Who became the first British cyclist to win the Tour de France?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Bradley Wiggins",
        distractors: ["Sir Steve Redgrave", "Sir Mo Farah", "Sir Chris Hoy"],
      },
    },
    {
      question: "In 2012 a British rider won cycling's most famous race for the first time. Who was he?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Bradley Wiggins",
        distractors: ["Sir Roger Bannister", "Sir Ben Ainslie", "Sir Jackie Stewart"],
      },
    },
    ],
  },
  {
    id: "f285",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which event did Jessica Ennis win gold in at the 2012 Olympics?",
    answer: "The heptathlon",
    forms: [
    {
      question: "Which event did Jessica Ennis win gold in at the 2012 Olympics?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The heptathlon",
        distractors: ["The pentathlon", "The long jump", "The 400 metres hurdles"],
      },
    },
    {
      question: "Dame Jessica Ennis-Hill competed in which athletics event?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The heptathlon",
        distractors: ["The decathlon", "The triathlon", "The pentathlon"],
      },
    },
    {
      question: "Which Olympic event combines seven separate disciplines for women athletes?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The heptathlon",
        distractors: ["The modern pentathlon", "The octathlon", "The combined relay"],
      },
    },
    ],
  },
  {
    id: "f286",
    tag: "Sport",
    chapter: 4,
    verify: false,
    question: "In which three years has London hosted the Olympic Games?",
    answer: "1908, 1948 and 2012",
    source: "Handbook 3rd ed., ch.4 “Sport”",
    forms: [
    {
      question: "In which three years has London hosted the Olympic Games?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1908, 1948 and 2012",
        distractors: ["1900, 1936 and 2012", "1908, 1956 and 2012", "1912, 1948 and 2008"],
      },
    },
    {
      question: "In which of these years did London NOT host the Olympic Games?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "1936",
        distractors: ["1908", "1948", "2012"],
      },
    },
    {
      question: "A visitor asks how many times London has hosted the Olympic Games. What do you say?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Three times: in 1908, 1948 and 2012",
        distractors: ["Twice: in 1948 and 2012", "Once: in 2012 only", "Four times: in 1908, 1936, 1948 and 2012"],
      },
    },
    ],
  },
  {
    id: "f287",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Where did the Paralympic movement begin?",
    answer: "Stoke Mandeville Hospital in Buckinghamshire",
    forms: [
    {
      question: "Where did the Paralympic movement begin?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Stoke Mandeville Hospital in Buckinghamshire",
        distractors: ["Guy's Hospital in London", "The Royal Infirmary in Edinburgh", "Addenbrooke's Hospital in Cambridge"],
      },
    },
    {
      question: "Stoke Mandeville Hospital in Buckinghamshire is known as the birthplace of what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Paralympic movement",
        distractors: ["The Commonwealth Games", "The National Health Service", "The Olympic torch relay"],
      },
    },
    {
      question: "The Paralympic movement began at a hospital in which county?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Buckinghamshire",
        distractors: ["Berkshire", "Bedfordshire", "Hertfordshire"],
      },
    },
    ],
  },
  {
    id: "f288",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which two countries compete for the Ashes, and when was it first played?",
    answer: "England and Australia, 1882",
    forms: [
    {
      question: "Which two countries compete for the Ashes, and when was it first played?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "England and Australia, first played in 1882",
        distractors: ["England and India, first played in 1882", "England and Australia, first played in 1932", "England and South Africa, first played in 1882"],
      },
    },
    {
      question: "The Ashes cricket series began with a match between which sides, and in which year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "England and Australia, 1882",
        distractors: ["England and South Africa, 1875", "Australia and India, 1890", "England and India, 1902"],
      },
    },
    {
      question: "The Ashes trophy dates from a Test match involving which two countries and which year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "England and Australia, 1882",
        distractors: ["Australia and India, 1884", "England and New Zealand, 1890", "England and Wales, 1878"],
      },
    },
    ],
  },
  {
    id: "f289",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which six teams take part in the rugby union Six Nations?",
    answer: "England, Scotland, Wales, Ireland, France and Italy",
    forms: [
    {
      question: "Which six teams take part in the rugby union Six Nations?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "England, Scotland, Wales, Ireland, France and Italy",
        distractors: ["England, Scotland, Wales, Ireland, France and Spain", "England, Scotland, Wales, Ireland, Italy and Argentina", "England, Scotland, Wales, Ireland, France and Georgia"],
      },
    },
    {
      question: "Which teams compete in the Six Nations rugby championship?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "England, Scotland, Wales, Ireland, France and Italy",
        distractors: ["England, Wales, Ireland, France, Italy and Portugal", "England, Scotland, Wales, France, Italy and Germany", "England, Scotland, Wales, Ireland, Spain and Italy"],
      },
    },
    {
      question: "A rugby fan lists the Six Nations sides. Which list is right?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Wales, England, Scotland, Ireland, France, Italy",
        distractors: ["Wales, England, Ireland, France, Italy, Argentina", "Wales, England, Scotland, Ireland, France, Belgium", "England, Scotland, Ireland, France, Italy, Romania"],
      },
    },
    ],
  },
  {
    id: "f290",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "What is distinctive about Wimbledon among the tennis Grand Slams?",
    answer: "It is the oldest and the only one played on grass",
    forms: [
    {
      question: "What is distinctive about Wimbledon among the tennis Grand Slams?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "It is the oldest and the only one played on grass",
        distractors: ["It is the oldest and the only one played on clay", "It is the newest and the only one played indoors", "It is the only one that awards equal prize money"],
      },
    },
    {
      question: "Which tennis tournament is the oldest Grand Slam and the only one played on grass?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Wimbledon",
        distractors: ["The US Open", "The French Open", "The Australian Open"],
      },
    },
    {
      question: "Which statement about Wimbledon is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "It is the oldest Grand Slam and the only one played on grass",
        distractors: ["It is the newest Grand Slam and the only one played on clay", "It is the only Grand Slam played indoors", "It is the oldest Grand Slam and the only one played on hard courts"],
      },
    },
    ],
  },
  {
    id: "f291",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "In which country did golf originate, and in which century?",
    answer: "Scotland, in the 15th century",
    forms: [
    {
      question: "In which country did golf originate, and in which century?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Scotland, in the 15th century",
        distractors: ["England, in the 15th century", "Scotland, in the 18th century", "Ireland, in the 16th century"],
      },
    },
    {
      question: "Golf is thought to have begun in Scotland in the ___ century.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "15th",
        distractors: ["16th", "17th", "18th"],
      },
    },
    {
      question: "Which statement about the origins of golf is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "It began in Scotland in the 15th century",
        distractors: ["It began in England in the 15th century", "It began in Ireland in the 16th century", "It began in Scotland in the 18th century"],
      },
    },
    ],
  },
  {
    id: "f292",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "At which racecourse is the Grand National run?",
    answer: "Aintree, near Liverpool",
    forms: [
    {
      question: "At which racecourse is the Grand National run?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Aintree, near Liverpool",
        distractors: ["Epsom, in Surrey", "Cheltenham, in Gloucestershire", "Ayr, in south-west Scotland"],
      },
    },
    {
      question: "The Grand National horse race is run at which course?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Aintree, near Liverpool",
        distractors: ["Ascot, near Windsor", "Epsom, near London", "Cheltenham, in Gloucestershire"],
      },
    },
    {
      question: "Where does Britain's best-known steeplechase take place each spring?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Aintree, near Liverpool",
        distractors: ["Doncaster, in Yorkshire", "Newmarket, in Suffolk", "Goodwood, in Sussex"],
      },
    },
    ],
  },
  {
    id: "f293",
    tag: "Sport",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "In which county is Royal Ascot held?",
    answer: "Berkshire",
    forms: [
    {
      question: "In which county is Royal Ascot held?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Berkshire",
        distractors: ["Surrey", "Suffolk", "Hampshire"],
      },
    },
    {
      question: "Royal Ascot, the famous horse race meeting, is held in which county?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Berkshire",
        distractors: ["Kent", "Oxfordshire", "Hertfordshire"],
      },
    },
    {
      question: "In which county would you attend the five-day race meeting traditionally attended by the Royal Family?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Berkshire",
        distractors: ["Buckinghamshire", "Sussex", "Yorkshire"],
      },
    },
    ],
  },
  {
    id: "f294",
    tag: "Music",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which organisation runs the Proms, and where are the concerts held?",
    answer: "The BBC, at the Royal Albert Hall",
    forms: [
    {
      question: "Which organisation runs the Proms, and where are the concerts held?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The BBC, at the Royal Albert Hall",
        distractors: ["The BBC, at the Royal Opera House", "The Arts Council, at the Royal Albert Hall", "The London Symphony Orchestra, at the Barbican"],
      },
    },
    {
      question: "In which building are the BBC's annual Proms concerts held?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Royal Albert Hall",
        distractors: ["The Royal Opera House", "The Barbican", "The Royal Festival Hall"],
      },
    },
    {
      question: "Which organisation is responsible for running the Proms?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The BBC",
        distractors: ["The Arts Council", "The National Trust", "The London Symphony Orchestra"],
      },
    },
    ],
  },
  {
    id: "f295",
    tag: "Music",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which German-born composer became British in 1727 and wrote Messiah?",
    answer: "George Frederick Handel",
    forms: [
    {
      question: "Which German-born composer became British in 1727 and wrote Messiah?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "George Frederick Handel",
        distractors: ["Johann Christian Bach", "Joseph Haydn", "Felix Mendelssohn"],
      },
    },
    {
      question: "Who composed Messiah?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "George Frederick Handel",
        distractors: ["Henry Purcell", "Edward Elgar", "Benjamin Britten"],
      },
    },
    {
      question: "The German-born composer of Messiah became a British citizen in ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1727",
        distractors: ["1695", "1707", "1714"],
      },
    },
    ],
  },
  {
    id: "f296",
    tag: "Music",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Who wrote the Pomp and Circumstance Marches?",
    answer: "Sir Edward Elgar",
    forms: [
    {
      question: "Who wrote the Pomp and Circumstance Marches?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Edward Elgar",
        distractors: ["Sir William Walton", "Sir Arthur Sullivan", "Sir Hubert Parry"],
      },
    },
    {
      question: "Which composer wrote the Pomp and Circumstance Marches played at the Last Night of the Proms?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Edward Elgar",
        distractors: ["Henry Purcell", "Benjamin Britten", "Gustav Holst"],
      },
    },
    {
      question: "Land of Hope and Glory was written by which English composer?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Edward Elgar",
        distractors: ["George Frideric Handel", "Ralph Vaughan Williams", "Sir Andrew Lloyd Webber"],
      },
    },
    ],
  },
  {
    id: "f297",
    tag: "Music",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Who wrote the opera Peter Grimes and founded the Aldeburgh festival?",
    answer: "Benjamin Britten",
    forms: [
    {
      question: "Who wrote the opera Peter Grimes and founded the Aldeburgh festival?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Benjamin Britten",
        distractors: ["Sir William Walton", "Ralph Vaughan Williams", "George Frederick Handel"],
      },
    },
    {
      question: "Which composer wrote 'A Young Person's Guide to the Orchestra'?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Benjamin Britten",
        distractors: ["Ralph Vaughan Williams", "Gustav Holst", "Edward Elgar"],
      },
    },
    {
      question: "The Aldeburgh music festival in Suffolk was founded by which composer?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Benjamin Britten",
        distractors: ["William Walton", "Henry Purcell", "Frederick Delius"],
      },
    },
    ],
  },
  {
    id: "f298",
    tag: "Music",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "What does the Mercury Music Prize reward?",
    answer: "The best album from the UK and Ireland each year",
    forms: [
    {
      question: "What does the Mercury Music Prize reward?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The best album from the UK and Ireland each year",
        distractors: ["The best single by a British solo artist", "The best live performance of the year", "The best classical recording of the year"],
      },
    },
    {
      question: "The Mercury Music Prize is awarded each year for what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The best album from the UK and Ireland",
        distractors: ["The best British film", "The best new British band", "The best song of the year"],
      },
    },
    {
      question: "Which prize is given annually to the best album from the UK and Ireland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Mercury Music Prize",
        distractors: ["The Turner Prize", "The Brit Award for best group", "The Booker Prize"],
      },
    },
    ],
  },
  {
    id: "f299",
    tag: "Music",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which industry body organises the Brit Awards?",
    answer: "The British Phonographic Industry",
    forms: [
    {
      question: "Which industry body organises the Brit Awards?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The British Phonographic Industry",
        distractors: ["The British Academy of Film and Television Arts", "The Society of London Theatre", "The Royal Academy of Music"],
      },
    },
    {
      question: "The British Phonographic Industry organises which awards?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Brit Awards",
        distractors: ["The BAFTAs", "The Turner Prize", "The Laurence Olivier Awards"],
      },
    },
    {
      question: "The Brit Awards are organised by ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "the British Phonographic Industry",
        distractors: ["the British Broadcasting Corporation", "the British Academy of Film and Television Arts", "the Royal Academy of Music"],
      },
    },
    ],
  },
  {
    id: "f300",
    tag: "Theatre",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "In which city is the Fringe, the world's largest arts festival, held?",
    answer: "Edinburgh",
    forms: [
    {
      question: "In which city is the Fringe, the world's largest arts festival, held?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Edinburgh",
        distractors: ["Glasgow", "Manchester", "Cardiff"],
      },
    },
    {
      question: "In which city does the Fringe, the world's largest arts festival, take place?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Edinburgh",
        distractors: ["London", "Belfast", "Cardiff"],
      },
    },
    {
      question: "Comedy and theatre performers gather every August for a festival held in which city?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Edinburgh",
        distractors: ["Brighton", "Belfast", "Bath"],
      },
    },
    ],
  },
  {
    id: "f301",
    tag: "Theatre",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which awards honour the best of British theatre each year?",
    answer: "The Laurence Olivier Awards",
    forms: [
    {
      question: "Which awards honour the best of British theatre each year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Laurence Olivier Awards",
        distractors: ["The Turner Prize", "The BAFTA Awards", "The Mercury Awards"],
      },
    },
    {
      question: "Which awards honour outstanding achievement in British theatre?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Laurence Olivier Awards",
        distractors: ["The British Academy Film Awards", "The Mercury Music Prize", "The Man Booker Prize for Fiction"],
      },
    },
    {
      question: "A West End producer hopes to win the leading annual prize for stage work. Which is it?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Laurence Olivier Awards",
        distractors: ["The Man Booker Prize", "The Brit Awards", "The British Academy Film Awards"],
      },
    },
    ],
  },
  {
    id: "f302",
    tag: "Theatre",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "In pantomime, who traditionally plays the Dame and the principal boy?",
    answer: "A man plays the Dame and a woman plays the principal boy",
    forms: [
    {
      question: "In pantomime, who traditionally plays the Dame and the principal boy?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A man plays the Dame and a woman plays the principal boy",
        distractors: ["A woman plays the Dame and a man plays the principal boy", "Children play both roles", "Both roles are played by men"],
      },
    },
    {
      question: "In traditional pantomime, the principal boy is usually played by ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "a woman",
        distractors: ["a young child", "an older man", "a puppet"],
      },
    },
    {
      question: "Which statement about traditional pantomime is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "The Dame is played by a man and the principal boy by a woman",
        distractors: ["Both leading roles are played by women", "The Dame is played by a woman", "The principal boy is played by a man"],
      },
    },
    ],
  },
  {
    id: "f303",
    tag: "Theatre",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which British composer wrote Cats, Evita and The Phantom of the Opera?",
    answer: "Andrew Lloyd Webber",
    forms: [
    {
      question: "Which British composer wrote Cats, Evita and The Phantom of the Opera?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Andrew Lloyd Webber",
        distractors: ["Tim Rice", "Noel Coward", "Lionel Bart"],
      },
    },
    {
      question: "Cats, Evita and The Phantom of the Opera are musicals written by whom?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Andrew Lloyd Webber",
        distractors: ["Tim Rice", "Gilbert and Sullivan", "Sir Edward Elgar"],
      },
    },
    {
      question: "Which of these musicals was NOT written by Andrew Lloyd Webber?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Oliver!",
        distractors: ["Cats", "Evita", "The Phantom of the Opera"],
      },
    },
    ],
  },
  {
    id: "f304",
    tag: "Art",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which British landscape painter, who died in 1851, pioneered watercolour and light?",
    answer: "Joseph Turner",
    forms: [
    {
      question: "Which British landscape painter, who died in 1851, pioneered watercolour and light?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Joseph Turner",
        distractors: ["John Constable", "William Hogarth", "Lucian Freud"],
      },
    },
    {
      question: "The Turner Prize for contemporary art is named after which painter?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Joseph Turner",
        distractors: ["Henry Moore", "Lucian Freud", "David Hockney"],
      },
    },
    {
      question: "Which 19th-century artist's stormy seascapes helped shape modern British painting?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Joseph Turner",
        distractors: ["Sir John Lavery", "William Hogarth", "Sir Joshua Reynolds"],
      },
    },
    ],
  },
  {
    id: "f305",
    tag: "Art",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which British sculptor is known for large abstract bronze figures?",
    answer: "Henry Moore",
    forms: [
    {
      question: "Which British sculptor is known for large abstract bronze figures?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Henry Moore",
        distractors: ["David Hockney", "Lucian Freud", "John Petts"],
      },
    },
    {
      question: "Which British artist is best known for large bronze sculptures of the human figure?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Henry Moore",
        distractors: ["John Constable", "Lucian Freud", "David Hockney"],
      },
    },
    {
      question: "Big abstract bronze figures, often displayed in public parks, are the work of which sculptor?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Henry Moore",
        distractors: ["Antony Gormley", "Anish Kapoor", "Barbara Hepworth"],
      },
    },
    ],
  },
  {
    id: "f306",
    tag: "Art",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "In which year was the Turner Prize established?",
    answer: "1984",
    forms: [
    {
      question: "In which year was the Turner Prize established?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1984",
        distractors: ["1968", "1974", "1978"],
      },
    },
    {
      question: "The Turner Prize was established in which year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1984",
        distractors: ["1974", "1994", "2004"],
      },
    },
    {
      question: "Which art prize dates from 1984?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Turner Prize",
        distractors: ["The Mercury Music Prize", "The Booker Prize", "The Royal Academy Prize"],
      },
    },
    ],
  },
  {
    id: "f307",
    tag: "Architecture",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which architect designed the Cenotaph in Whitehall?",
    answer: "Sir Edwin Lutyens",
    forms: [
    {
      question: "Which architect designed the Cenotaph in Whitehall?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Edwin Lutyens",
        distractors: ["Sir Christopher Wren", "Sir Norman Foster", "Robert Adam"],
      },
    },
    {
      question: "Sir Edwin Lutyens designed which memorial in Whitehall?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Cenotaph",
        distractors: ["The Menin Gate", "The Albert Memorial", "Nelson's Column"],
      },
    },
    {
      question: "The Cenotaph in Whitehall was designed by ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Edwin Lutyens",
        distractors: ["Inigo Jones", "Lord (Richard) Rogers", "Dame Zaha Hadid"],
      },
    },
    ],
  },
  {
    id: "f308",
    tag: "Design",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which 18th-century designer is famous for his furniture?",
    answer: "Thomas Chippendale",
    forms: [
    {
      question: "Which 18th-century designer is famous for his furniture?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Thomas Chippendale",
        distractors: ["Josiah Wedgwood", "Sir Terence Conran", "Clarice Cliff"],
      },
    },
    {
      question: "Who designed furniture so admired that a whole style now carries his name?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Thomas Chippendale",
        distractors: ["Robert Adam", "Clarice Cliff", "Charles Rennie Mackintosh"],
      },
    },
    {
      question: "Chairs and cabinets in the best-known 18th-century English style are named after which designer?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Thomas Chippendale",
        distractors: ["William Morris", "Thomas Gainsborough", "Josiah Wedgwood"],
      },
    },
    ],
  },
  {
    id: "f309",
    tag: "Design",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which British fashion designer is most associated with the 1960s miniskirt?",
    answer: "Mary Quant",
    forms: [
    {
      question: "Which British fashion designer is most associated with the 1960s miniskirt?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Mary Quant",
        distractors: ["Vivienne Westwood", "Alexander McQueen", "Stella McCartney"],
      },
    },
    {
      question: "Which designer is associated with the miniskirt in 1960s Britain?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Mary Quant",
        distractors: ["Laura Ashley", "Vivienne Westwood", "Alexander McQueen"],
      },
    },
    {
      question: "Sixties London fashion, including hot pants and the mini, is linked with which name?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Mary Quant",
        distractors: ["Ossie Clark", "Barbara Hulanicki", "Zandra Rhodes"],
      },
    },
    ],
  },
  {
    id: "f310",
    tag: "Literature",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "In which year was the Booker Prize for Fiction first established?",
    answer: "1968",
    forms: [
    {
      question: "In which year was the Booker Prize for Fiction first established?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1968",
        distractors: ["1948", "1978", "1988"],
      },
    },
    {
      question: "Which literary prize was first established in 1968?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Booker Prize for Fiction",
        distractors: ["The Turner Prize", "The Mercury Prize", "The Nobel Prize for Literature"],
      },
    },
    {
      question: "The Booker Prize for Fiction was set up in the year ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1968",
        distractors: ["1928", "1948", "1958"],
      },
    },
    ],
  },
  {
    id: "f311",
    tag: "Literature",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Who wrote Pride and Prejudice?",
    answer: "Jane Austen",
    forms: [
    {
      question: "Who wrote Pride and Prejudice?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Jane Austen",
        distractors: ["Charlotte Bronte", "George Eliot", "Elizabeth Gaskell"],
      },
    },
    {
      question: "Jane Austen is the author of which novel?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Pride and Prejudice",
        distractors: ["Oliver Twist", "Treasure Island", "Far from the Madding Crowd"],
      },
    },
    {
      question: "Pride and Prejudice was written by ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Jane Austen",
        distractors: ["Charlotte Bronte", "Mary Shelley", "George Eliot"],
      },
    },
    ],
  },
  {
    id: "f312",
    tag: "Literature",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Who wrote Oliver Twist?",
    answer: "Charles Dickens",
    forms: [
    {
      question: "Who wrote Oliver Twist?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Charles Dickens",
        distractors: ["Thomas Hardy", "Anthony Trollope", "William Thackeray"],
      },
    },
    {
      question: "Which author wrote Oliver Twist and Great Expectations?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Charles Dickens",
        distractors: ["Jane Austen", "Robert Louis Stevenson", "Thomas Hardy"],
      },
    },
    {
      question: "Whose novels, first published in instalments, described poverty in Victorian England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Charles Dickens",
        distractors: ["Sir Arthur Conan Doyle", "William Golding", "Graham Greene"],
      },
    },
    ],
  },
  {
    id: "f313",
    tag: "Literature",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Who created the detective Sherlock Holmes?",
    answer: "Sir Arthur Conan Doyle",
    forms: [
    {
      question: "Who created the detective Sherlock Holmes?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Arthur Conan Doyle",
        distractors: ["Agatha Christie", "Wilkie Collins", "G K Chesterton"],
      },
    },
    {
      question: "Who created the detective Sherlock Holmes?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Arthur Conan Doyle",
        distractors: ["Charles Dickens", "Wilkie Collins", "Agatha Christie"],
      },
    },
    {
      question: "The stories set at 221B Baker Street were written by whom?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Arthur Conan Doyle",
        distractors: ["Agatha Christie", "Robert Louis Stevenson", "Graham Greene"],
      },
    },
    ],
  },
  {
    id: "f314",
    tag: "Literature",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Who wrote The Canterbury Tales?",
    answer: "Geoffrey Chaucer",
    forms: [
    {
      question: "Who wrote The Canterbury Tales?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Geoffrey Chaucer",
        distractors: ["John Milton", "William Langland", "Thomas Malory"],
      },
    },
    {
      question: "The Canterbury Tales was written by whom?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Geoffrey Chaucer",
        distractors: ["John Milton", "William Wordsworth", "William Blake"],
      },
    },
    {
      question: "Geoffrey Chaucer is the author of which work?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Canterbury Tales",
        distractors: ["Paradise Lost", "Beowulf", "Sir Gawain and the Green Knight"],
      },
    },
    ],
  },
  {
    id: "f315",
    retired: 'Neither George Orwell nor Nineteen Eighty-Four appears in the handbook. Confirmed by the owner, 4 Aug 2026.',
    tag: "Literature",
    chapter: 4,
    verify: false,
    question: "In which novel does Big Brother appear, and who wrote it?",
    answer: "Nineteen Eighty-Four, by George Orwell",
    forms: [
    {
      question: "In which novel does Big Brother appear, and who wrote it?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Nineteen Eighty-Four, by George Orwell",
        distractors: ["Brave New World, by Aldous Huxley", "Animal Farm, by George Orwell", "A Clockwork Orange, by Anthony Burgess"],
      },
    },
    {
      question: "The character Big Brother comes from which novel?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Nineteen Eighty-Four",
        distractors: ["Brave New World", "Animal Farm", "A Clockwork Orange"],
      },
    },
    {
      question: "George Orwell created the character Big Brother in his novel ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Nineteen Eighty-Four",
        distractors: ["Animal Farm", "Brave New World", "A Clockwork Orange"],
      },
    },
    ],
  },
  {
    id: "f316",
    tag: "Cinema",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which British director left for Hollywood and remained an important film director until his death in 1980?",
    answer: "Sir Alfred Hitchcock",
    forms: [
    {
      question: "Which British director left for Hollywood and remained an important film director until his death in 1980?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Alfred Hitchcock",
        distractors: ["Sir Carol Reed", "Sir David Lean", "Sir Alexander Korda"],
      },
    },
    {
      question: "Which British director made The 39 Steps?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Alfred Hitchcock",
        distractors: ["Sir David Lean", "Ridley Scott", "Ken Russell"],
      },
    },
    {
      question: "The film-maker known as the master of suspense, who later worked in Hollywood, was who?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Sir Alfred Hitchcock",
        distractors: ["Nick Park", "Nicolas Roeg", "Sir Alexander Korda"],
      },
    },
    ],
  },
  {
    id: "f317",
    tag: "Cinema",
    chapter: 4,
    verify: false,
    question: "Who wrote the James Bond novels, and what was the first film?",
    answer: "Ian Fleming, with Dr No in 1962",
    forms: [
    {
      question: "Who wrote the James Bond novels, and what was the first film?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Ian Fleming, with Dr No in 1962",
        distractors: ["Ian Fleming, with Goldfinger in 1962", "John le Carre, with Dr No in 1962", "Ian Fleming, with Dr No in 1972"],
      },
    },
    {
      question: "The first James Bond film came from a novel by which writer, and under which title?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Ian Fleming, with Dr No in 1962",
        distractors: ["Ian Fleming, with Goldfinger in 1962", "Ian Fleming, with Dr No in 1970", "John le Carre, with Dr No in 1962"],
      },
    },
    {
      question: "Which author's work launched the Bond film series, and with which story?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Ian Fleming, with Dr No in 1962",
        distractors: ["Ian Fleming, with Dr No in 1959", "Agatha Christie, with Dr No in 1962", "Ian Fleming, with Goldfinger in 1962"],
      },
    },
    ],
  },
  {
    id: "f318",
    tag: "Comedy",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which television series became famous for surreal sketch comedy from 1969?",
    answer: "Monty Python's Flying Circus",
    forms: [
    {
      question: "Which television series became famous for surreal sketch comedy from 1969?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Monty Python's Flying Circus",
        distractors: ["That Was The Week That Was", "Spitting Image", "Coronation Street"],
      },
    },
    {
      question: "The surreal sketch comedy series Monty Python's Flying Circus first appeared on television in ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1969",
        distractors: ["1975", "1979", "1984"],
      },
    },
    {
      question: "From 1969 onwards, which programme became famous for its surreal sketch comedy?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Monty Python's Flying Circus",
        distractors: ["Spitting Image", "Fawlty Towers", "The Goon Show"],
      },
    },
    ],
  },
  {
    id: "f319",
    tag: "Comedy",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which satirical magazine, launched in the 1840s, popularised the cartoon?",
    answer: "Punch",
    forms: [
    {
      question: "Which satirical magazine, launched in the 1840s, popularised the cartoon?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Punch",
        distractors: ["Private Eye", "The Spectator", "The Illustrated London News"],
      },
    },
    {
      question: "Which magazine, first published in the 1840s, made the cartoon popular?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Punch",
        distractors: ["Private Eye", "The Tatler", "The Strand Magazine"],
      },
    },
    {
      question: "Which statement about Punch is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "It was a satirical magazine of the 1840s that popularised the cartoon",
        distractors: ["It was a daily newspaper founded in the 1600s", "It was a radio comedy show of the 1940s", "It was a Victorian sporting journal"],
      },
    },
    ],
  },
  {
    id: "f320",
    tag: "Leisure",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which annual flower show is the best known gardening event in the UK?",
    answer: "The Chelsea Flower Show",
    forms: [
    {
      question: "Which annual flower show is the best known gardening event in the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Chelsea Flower Show",
        distractors: ["The Hampton Court Show", "Britain in Bloom", "The Kew Garden Festival"],
      },
    },
    {
      question: "Which annual event in London shows off gardens and new plants?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Chelsea Flower Show",
        distractors: ["The Great Exhibition", "The Notting Hill Carnival", "The Proms"],
      },
    },
    {
      question: "Gardeners compete for medals every May at which show?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Chelsea Flower Show",
        distractors: ["The Kew Garden Festival", "The Hampton Court Regatta", "The Royal Highland Show"],
      },
    },
    ],
  },
  {
    id: "f321",
    tag: "Leisure",
    chapter: 4,
    verify: false,
    question: "What must a dog wear in a public place in the UK?",
    answer: "A collar showing the owner's name and address",
    forms: [
    {
      question: "What must a dog wear in a public place in the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A collar showing the owner's name and address",
        distractors: ["A muzzle at all times", "A microchip tag only", "A licence disc issued by the council"],
      },
    },
    {
      question: "What must a dog wear when it is in a public place?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A collar with the owner's name and address",
        distractors: ["A council-issued licence tag", "A muzzle at all times in public", "A lead of at least two metres"],
      },
    },
    {
      question: "You take your dog for a walk in the park. Which legal requirement applies?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "It must wear a collar naming its owner",
        distractors: ["It must be kept on a lead at all times", "It must be insured against causing injury", "It must have its microchip number on show"],
      },
    },
    ],
  },
  {
    id: "f322",
    tag: "Leisure",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "In which year was the National Trust founded, and by how many people?",
    answer: "1895, by three volunteers",
    forms: [
    {
      question: "In which year was the National Trust founded, and by how many people?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1895, by three volunteers",
        distractors: ["1895, by ten volunteers", "1945, by three volunteers", "1875, by three volunteers"],
      },
    },
    {
      question: "How many volunteers founded the National Trust in 1895?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Three",
        distractors: ["Five", "Ten", "Twelve"],
      },
    },
    {
      question: "The National Trust was founded by three volunteers in which year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1895",
        distractors: ["1845", "1875", "1925"],
      },
    },
    ],
  },
  {
    id: "f323",
    tag: "Food",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which traditional dish is made from sheep's offal, suet, onions and oatmeal?",
    answer: "Haggis, from Scotland",
    forms: [
    {
      question: "Which traditional dish is made from sheep's offal, suet, onions and oatmeal?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Haggis, from Scotland",
        distractors: ["Ulster fry, from Northern Ireland", "Welsh cakes, from Wales", "Black pudding, from England"],
      },
    },
    {
      question: "Haggis is a traditional dish from which part of the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Scotland",
        distractors: ["Wales", "Northern Ireland", "England"],
      },
    },
    {
      question: "A menu offers a dish of sheep's offal, suet, onions and oatmeal. What is it?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Haggis",
        distractors: ["White pudding", "Fish and chips", "Roast beef with Yorkshire puddings"],
      },
    },
    ],
  },
  {
    id: "f324",
    tag: "Food",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which fried breakfast dish is a traditional food of Northern Ireland?",
    answer: "The Ulster fry",
    forms: [
    {
      question: "Which fried breakfast dish is a traditional food of Northern Ireland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Ulster fry",
        distractors: ["The full English", "Bubble and squeak", "Laverbread"],
      },
    },
    {
      question: "Which cooked breakfast dish comes from Northern Ireland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Ulster fry",
        distractors: ["Fish and chips", "Haggis, neeps and tatties", "Welsh cakes"],
      },
    },
    {
      question: "Soda bread and potato bread are fried together in which traditional dish?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Ulster fry",
        distractors: ["Bara brith", "The Sunday roast", "The Cornish pasty"],
      },
    },
    ],
  },
  {
    id: "f325",
    tag: "Landmarks",
    chapter: 4,
    verify: false,
    question: "What does the name Big Ben actually refer to?",
    answer: "The great bell of the clock at the Houses of Parliament",
    forms: [
    {
      question: "What does the name Big Ben actually refer to?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The great bell of the clock at the Houses of Parliament",
        distractors: ["The clock tower itself", "The clock face", "The Palace of Westminster as a whole"],
      },
    },
    {
      question: "What is Big Ben, strictly speaking?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The great bell of the Parliament clock",
        distractors: ["The Elizabeth Tower", "The largest of the clock's four faces", "The bell tower of Westminster Abbey"],
      },
    },
    {
      question: "Which statement about Big Ben is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "It is the great bell inside the clock tower",
        distractors: ["It is the nickname of the Speaker's office", "It is the largest clock face in Britain", "It is the official name of the tower"],
      },
    },
    ],
  },
  {
    id: "f326",
    tag: "Landmarks",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "What was the clock tower at the Houses of Parliament renamed in 2012?",
    answer: "The Elizabeth Tower",
    forms: [
    {
      question: "What was the clock tower at the Houses of Parliament renamed in 2012?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Elizabeth Tower",
        distractors: ["The Victoria Tower", "The Jubilee Tower", "The Westminster Tower"],
      },
    },
    {
      question: "In which year was the clock tower at the Houses of Parliament renamed the Elizabeth Tower?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "2012",
        distractors: ["2002", "1997", "2016"],
      },
    },
    {
      question: "A visitor points at the clock tower at the Houses of Parliament. What has it been called since 2012?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Elizabeth Tower",
        distractors: ["St Stephen's Tower", "The Queen's Tower", "The Victoria Tower"],
      },
    },
    ],
  },
  {
    id: "f327",
    tag: "Landmarks",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "In which county is the Eden Project?",
    answer: "Cornwall",
    forms: [
    {
      question: "In which county is the Eden Project?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Cornwall",
        distractors: ["Devon", "Somerset", "Dorset"],
      },
    },
    {
      question: "The Eden Project can be found in which part of England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Cornwall",
        distractors: ["Cumbria", "Kent", "Norfolk"],
      },
    },
    {
      question: "You plan a trip to the Eden Project. Which county will you travel to?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Cornwall",
        distractors: ["Devon", "Wiltshire", "Gloucestershire"],
      },
    },
    ],
  },
  {
    id: "f328",
    tag: "Landmarks",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "In which part of the UK is the Giant's Causeway?",
    answer: "The north-east coast of Northern Ireland",
    forms: [
    {
      question: "In which part of the UK is the Giant's Causeway?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The north-east coast of Northern Ireland",
        distractors: ["The west coast of Scotland", "The north coast of Wales", "The south-west coast of England"],
      },
    },
    {
      question: "Where is the Giant's Causeway?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "On the north-east coast of Northern Ireland",
        distractors: ["On the coast of the Isle of Man", "On the north-west coast of England", "On the east coast of Scotland"],
      },
    },
    {
      question: "Columns of rock left by an ancient eruption, tied to a legendary giant, are found where?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "On the north-east coast of Northern Ireland",
        distractors: ["On the south-west coast of England, in Cornwall", "On the west coast of Scotland, near Loch Lomond", "On the north-west coast of the Republic of Ireland"],
      },
    },
    ],
  },
  {
    id: "f329",
    tag: "Landmarks",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "What is the highest mountain in Wales, and in which national park?",
    answer: "Snowdon, in Snowdonia",
    forms: [
    {
      question: "What is the highest mountain in Wales, and in which national park?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Snowdon, in Snowdonia",
        distractors: ["Cadair Idris, in Snowdonia", "Snowdon, in the Brecon Beacons", "Pen y Fan, in Snowdonia"],
      },
    },
    {
      question: "What is the highest mountain in Wales, and where does it stand?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Snowdon, in Snowdonia",
        distractors: ["Cader Idris, in mid Wales", "Ben Nevis, in the Highlands", "Scafell Pike, in Cumbria"],
      },
    },
    {
      question: "A walker plans to climb the tallest peak in Wales. Which mountain, and in which area?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Snowdon, in Snowdonia",
        distractors: ["Slieve Donard, in the Mournes", "Pen y Fan, in the Brecon Beacons", "Tryfan, in the Glyderau range"],
      },
    },
    ],
  },
  {
    id: "f330",
    tag: "Landmarks",
    chapter: 4,
    verify: false,
    source: 'Handbook 3rd ed., ch.4 — corroborated against the handbook text',
    question: "Which is the largest national park in England, and its biggest lake?",
    answer: "The Lake District, with Windermere",
    forms: [
    {
      question: "Which is the largest national park in England, and its biggest lake?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Lake District, with Windermere",
        distractors: ["The Peak District, with Windermere", "The Lake District, with Derwentwater", "The Yorkshire Dales, with Malham Tarn"],
      },
    },
    {
      question: "Which is the largest national park in England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Lake District",
        distractors: ["The Peak District", "The Yorkshire Dales", "Dartmoor"],
      },
    },
    {
      question: "What is the biggest lake in the Lake District?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Windermere",
        distractors: ["Derwentwater", "Ullswater", "Coniston Water"],
      },
    },
    ],
  },
];
