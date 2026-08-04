// The deck. Originally generated from the first version of this app, then corrected and
// extended by hand. Edit freely — `source` records where each answer came from, and the
// structural and statistical checks in deck.test.ts are what keep it honest.

import type { Fact } from '@/domain/deck/types';

export const CHAPTER_5: readonly Fact[] = [
  {
    id: "f331",
    tag: "Constitution",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What kind of monarchy does the UK have?",
    answer: "A constitutional monarchy",
    forms: [
    {
      question: "What kind of monarchy does the UK have?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A constitutional monarchy",
        distractors: ["An elective monarchy", "A federal monarchy", "An absolute monarchy"],
      },
    },
    {
      question: "The UK is best described as a ___ monarchy.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "constitutional",
        distractors: ["absolute", "elective", "federal"],
      },
    },
    {
      question: "Which statement about the UK system of government is correct?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The UK is a constitutional monarchy",
        distractors: ["The UK is an absolute monarchy", "The UK is an elective monarchy", "The UK is a federal monarchy"],
      },
    },
    ],
  },
  {
    id: "f332",
    tag: "Constitution",
    chapter: 5,
    verify: false,
    question: "Is the UK constitution set out in one single written document?",
    answer: "No, it is unwritten",
    forms: [
    {
      question: "Is the UK constitution set out in one single written document?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No - it is unwritten (uncodified)",
        distractors: ["Yes - the Bill of Rights 1689", "Yes - Magna Carta", "Yes - the Constitution Act 1911"],
      },
    },
    {
      question: "Is the British constitution set out in a single written document?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No, it is unwritten",
        distractors: ["Yes, it was written in 1707", "No, the UK has no constitution", "Yes, it was written in 1215"],
      },
    },
    {
      question: "Someone asks you which single book contains the UK constitution. What is the correct response?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "It is unwritten, so no one document holds it",
        distractors: ["It is all contained in the Magna Carta", "It is all contained in the Human Rights Act", "It is all contained in the Act of Union"],
      },
    },
    ],
  },
  {
    id: "f333",
    tag: "Monarchy",
    chapter: 5,
    verify: false,
    question: "What political position must the monarch maintain?",
    answer: "Political neutrality",
    forms: [
    {
      question: "What political position must the monarch maintain?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Political neutrality",
        distractors: ["Leader of the largest party", "Head of the opposition", "Chair of the Cabinet"],
      },
    },
    {
      question: "What is expected of the monarch where politics is concerned?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Strict political neutrality",
        distractors: ["Regular votes in the Lords", "Approval of every new law", "Support for the largest party"],
      },
    },
    {
      question: "Which principle governs the monarch's relationship with the government of the day?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The monarch stays politically neutral",
        distractors: ["The monarch picks ministers freely", "The monarch may veto Acts of Parliament", "The monarch leads the party in power"],
      },
    },
    ],
  },
  {
    id: "f334",
    tag: "Monarchy",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What does the monarch do at the State Opening of Parliament?",
    answer: "Delivers a speech setting out the government's programme",
    forms: [
    {
      question: "What does the monarch do at the State Opening of Parliament?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Delivers a speech setting out the government's programme",
        distractors: ["Votes on the first bill of the session", "Appoints the Speaker of the Commons", "Approves the annual budget"],
      },
    },
    {
      question: "At which occasion does the monarch set out the government's programme in a speech?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The State Opening of Parliament",
        distractors: ["Prime Minister's Questions", "Trooping the Colour", "The Budget"],
      },
    },
    {
      question: "You are watching the State Opening of Parliament. What does the monarch do?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Delivers a speech setting out the government's programme",
        distractors: ["Votes on the first bill of the session", "Appoints the Speaker of the Commons", "Approves the annual budget"],
      },
    },
    ],
  },
  {
    id: "f335",
    tag: "Parliament",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "How many Members of Parliament sit in the House of Commons?",
    answer: "650",
    forms: [
    {
      question: "How many Members of Parliament sit in the House of Commons?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "650",
        distractors: ["629", "600", "700"],
      },
    },
    {
      question: "There are ___ Members of Parliament in the House of Commons.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "650",
        distractors: ["635", "645", "665"],
      },
    },
    {
      question: "Which statement about the House of Commons is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "It has 650 elected members",
        distractors: ["It has 500 elected members", "It has 800 elected members", "It has 1,000 elected members"],
      },
    },
    ],
  },
  {
    id: "f336",
    tag: "Parliament",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What is the area that a single MP represents called?",
    answer: "A constituency",
    forms: [
    {
      question: "What is the area that a single MP represents called?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A constituency",
        distractors: ["A borough", "A ward", "A county"],
      },
    },
    {
      question: "What is the name for the area that each MP represents?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A constituency",
        distractors: ["A borough", "A ward", "A county"],
      },
    },
    {
      question: "Each of the 650 areas that elects a single MP is known as what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A constituency",
        distractors: ["A precinct", "A district", "A division"],
      },
    },
    ],
  },
  {
    id: "f337",
    tag: "Elections",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What is the maximum interval allowed between UK general elections?",
    answer: "Five years",
    forms: [
    {
      question: "What is the maximum interval allowed between UK general elections?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Five years",
        distractors: ["Seven years", "Six years", "Four years"],
      },
    },
    {
      question: "How long may a Parliament last before a general election must be held?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Five years",
        distractors: ["Seven years", "Three years", "Four years"],
      },
    },
    {
      question: "A general election has to take place at least once in every how many years?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Five",
        distractors: ["Six", "Two", "Ten"],
      },
    },
    ],
  },
  {
    id: "f338",
    tag: "Parliament",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Since 1958, who has had the power to nominate people for life peerages?",
    answer: "The Prime Minister",
    forms: [
    {
      question: "Since 1958, who has had the power to nominate people for life peerages?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Prime Minister",
        distractors: ["The Archbishop of Canterbury", "The Lord Mayor of London", "The Speaker of the Commons"],
      },
    },
    {
      question: "Since 1958, people have been nominated for life peerages by whom?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Prime Minister",
        distractors: ["The Archbishop of Canterbury", "The Speaker of the Commons", "The Lord Chancellor"],
      },
    },
    {
      question: "The Prime Minister has been able to nominate life peers since which year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1958",
        distractors: ["1911", "1948", "1999"],
      },
    },
    ],
  },
  {
    id: "f339",
    tag: "Parliament",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "In which year did hereditary peers lose the automatic right to sit in the Lords?",
    answer: "1999",
    forms: [
    {
      question: "In which year did hereditary peers lose the automatic right to sit in the Lords?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1999",
        distractors: ["2005", "1958", "1911"],
      },
    },
    {
      question: "Hereditary peers lost the automatic right to sit in the House of Lords in ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1999",
        distractors: ["1911", "1958", "2005"],
      },
    },
    {
      question: "Which change to the House of Lords took place in 1999?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Hereditary peers lost the automatic right to sit",
        distractors: ["The Lords lost the power to delay bills", "Bishops were removed from the Lords", "Life peerages were first created"],
      },
    },
    ],
  },
  {
    id: "f340",
    tag: "Parliament",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Can the House of Lords permanently block a law the Commons is determined to pass?",
    answer: "No",
    forms: [
    {
      question: "Can the House of Lords permanently block a law the Commons is determined to pass?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No",
        distractors: ["Yes, indefinitely", "Yes, for ten years", "Yes, unless the monarch objects"],
      },
    },
    {
      question: "Can the House of Lords permanently prevent a law passed by the Commons?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No, it can only delay legislation",
        distractors: ["No, it cannot debate bills at all", "Yes, if two thirds vote against it", "Yes, but only on matters of tax"],
      },
    },
    {
      question: "The Commons passes a bill the Lords dislike. What can the Lords ultimately do?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Delay the bill but not stop it",
        distractors: ["Refer the bill to the courts", "Put the bill to a referendum", "Reject the bill for good"],
      },
    },
    ],
  },
  {
    id: "f341",
    tag: "Parliament",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Who chairs debates and keeps order in the House of Commons?",
    answer: "The Speaker",
    forms: [
    {
      question: "Who chairs debates and keeps order in the House of Commons?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Speaker",
        distractors: ["The Lord Chancellor", "The Chief Whip", "The Prime Minister"],
      },
    },
    {
      question: "Who chairs debates in the House of Commons?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Speaker",
        distractors: ["The Chief Whip", "The Prime Minister", "The Lord Chancellor"],
      },
    },
    {
      question: "MPs choose one of their number to keep order and stay impartial. What is that role called?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Speaker",
        distractors: ["The Clerk of the Commons", "The Father of the House", "The Leader of the House"],
      },
    },
    ],
  },
  {
    id: "f342",
    tag: "Parliament",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "How is the Speaker of the House of Commons chosen?",
    answer: "By a secret ballot of MPs",
    forms: [
    {
      question: "How is the Speaker of the House of Commons chosen?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "By a secret ballot of MPs",
        distractors: ["By the Prime Minister", "By appointment by the monarch", "By a public vote"],
      },
    },
    {
      question: "The Speaker of the House of Commons is chosen by ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "a secret ballot of MPs",
        distractors: ["the Prime Minister", "the monarch", "a public vote"],
      },
    },
    {
      question: "A new Speaker of the House of Commons is needed. How is the choice made?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "MPs vote in a secret ballot",
        distractors: ["The Prime Minister appoints one", "The monarch appoints one", "Voters choose one at a general election"],
      },
    },
    ],
  },
  {
    id: "f343",
    tag: "Parliament",
    chapter: 5,
    verify: false,
    question: "What is the job of party whips in Parliament?",
    answer: "To organise party business and make sure members vote with the party",
    forms: [
    {
      question: "What is the job of party whips in Parliament?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "To organise party business and make sure members vote with the party",
        distractors: ["To count votes in the polling stations", "To advise the monarch on legislation", "To represent the civil service in Parliament"],
      },
    },
    {
      question: "An MP is reminded to attend a vote and to support the party line. Whose job is this?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The whips'",
        distractors: ["The Speaker's", "The civil service's", "The Lord Chancellor's"],
      },
    },
    {
      question: "Which statement describes the role of party whips?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "They organise party business and make sure members vote with the party",
        distractors: ["They chair debates in the Commons", "They count ballots at general elections", "They advise the monarch on new laws"],
      },
    },
    ],
  },
  {
    id: "f344",
    tag: "Government",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Which Cabinet minister is responsible for the economy?",
    answer: "The Chancellor of the Exchequer",
    forms: [
    {
      question: "Which Cabinet minister is responsible for the economy?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Chancellor of the Exchequer",
        distractors: ["The Lord Chancellor", "The Foreign Secretary", "The Home Secretary"],
      },
    },
    {
      question: "Which minister is responsible for the economy?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Chancellor of the Exchequer",
        distractors: ["The Foreign Secretary", "The Lord Chancellor", "The Home Secretary"],
      },
    },
    {
      question: "Who delivers the Budget and manages the nation's finances?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Chancellor of the Exchequer",
        distractors: ["The Cabinet Secretary", "The Governor of the Bank", "The Speaker of the Commons"],
      },
    },
    ],
  },
  {
    id: "f345",
    tag: "Government",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Which Cabinet minister is responsible for crime, policing and immigration?",
    answer: "The Home Secretary",
    forms: [
    {
      question: "Which Cabinet minister is responsible for crime, policing and immigration?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Home Secretary",
        distractors: ["The Foreign Secretary", "The Defence Secretary", "The Chancellor of the Exchequer"],
      },
    },
    {
      question: "Which government minister is responsible for policing and immigration?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Home Secretary",
        distractors: ["The Chancellor of the Exchequer", "The Lord Chancellor", "The Foreign Secretary"],
      },
    },
    {
      question: "Crime, policing and immigration are the responsibility of which member of the Cabinet?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Home Secretary",
        distractors: ["The Justice Secretary", "The Defence Secretary", "The Health Secretary"],
      },
    },
    ],
  },
  {
    id: "f346",
    tag: "Government",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Which Cabinet minister manages relationships with other countries?",
    answer: "The Foreign Secretary",
    forms: [
    {
      question: "Which Cabinet minister manages relationships with other countries?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Foreign Secretary",
        distractors: ["The Home Secretary", "The Chief Secretary to the Treasury", "The Lord Chancellor"],
      },
    },
    {
      question: "Which minister is responsible for relations with other countries?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Foreign Secretary",
        distractors: ["The Home Secretary", "The Chancellor of the Exchequer", "The Defence Secretary"],
      },
    },
    {
      question: "The Foreign Secretary's main responsibility is which of these?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Managing relationships with other countries",
        distractors: ["Running the police and immigration", "Managing the economy", "Overseeing the courts"],
      },
    },
    ],
  },
  {
    id: "f347",
    tag: "Government",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What is the group of senior opposition members who mirror ministers called?",
    answer: "The shadow cabinet",
    forms: [
    {
      question: "What is the group of senior opposition members who mirror ministers called?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The shadow cabinet",
        distractors: ["The upper house", "The Privy Council", "The backbench committee"],
      },
    },
    {
      question: "Senior opposition members who shadow government ministers form the ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "shadow cabinet",
        distractors: ["Privy Council", "backbench committee", "upper house"],
      },
    },
    {
      question: "The opposition appoints a senior member to challenge each minister. What is this group called?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The shadow cabinet",
        distractors: ["The Privy Council", "The Cabinet Office", "The Whips' Office"],
      },
    },
    ],
  },
  {
    id: "f348",
    tag: "Government",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What term describes organisations that try to influence policy without seeking office?",
    answer: "Pressure groups",
    forms: [
    {
      question: "What term describes organisations that try to influence policy without seeking office?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Pressure groups (lobby groups)",
        distractors: ["Select committees", "Constituency parties", "Quangos"],
      },
    },
    {
      question: "What do we call organisations that campaign to influence government policy?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Pressure groups",
        distractors: ["Select committees", "Life peers", "Civil servants"],
      },
    },
    {
      question: "Bodies that campaign to change a planning law by lobbying MPs are known as what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Pressure groups",
        distractors: ["Quangos", "Trade union branches", "Parish councils"],
      },
    },
    ],
  },
  {
    id: "f349",
    tag: "Civil service",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What must civil servants be, regardless of which party is in power?",
    answer: "Politically neutral",
    forms: [
    {
      question: "What must civil servants be, regardless of which party is in power?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Politically neutral",
        distractors: ["Appointed by the monarch", "Members of the governing party", "Elected by the public"],
      },
    },
    {
      question: "What is required of civil servants in the way they carry out their work?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Political neutrality",
        distractors: ["Membership of the governing party", "Appointment by the monarch", "Election by local voters"],
      },
    },
    {
      question: "Which statement about the civil service is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Officials must be politically neutral",
        distractors: ["Officials sit as members of Parliament", "Officials are chosen by the Prime Minister", "Officials change with each government"],
      },
    },
    ],
  },
  {
    id: "f350",
    tag: "Local government",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What are the two main sources of funding for local councils?",
    answer: "Central government grants and council tax",
    forms: [
    {
      question: "What are the two main sources of funding for local councils?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Central government grants and council tax",
        distractors: ["Lottery funds and donations", "VAT and income tax", "National Insurance and stamp duty"],
      },
    },
    {
      question: "Local councils are funded mainly by council tax and ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "grants from central government",
        distractors: ["National Lottery money", "parking fines", "charitable donations"],
      },
    },
    {
      question: "Which pair are the two main sources of money for local councils?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Central government grants and council tax",
        distractors: ["VAT and income tax", "National Insurance and stamp duty", "Lottery funds and donations"],
      },
    },
    ],
  },
  {
    id: "f351",
    tag: "Local government",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "How many London boroughs are there?",
    answer: "33",
    forms: [
    {
      question: "How many London boroughs are there?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "33",
        distractors: ["32", "28", "40"],
      },
    },
    {
      question: "London is divided into how many boroughs?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "33",
        distractors: ["30", "31", "36"],
      },
    },
    {
      question: "You are asked how many boroughs make up London. What is your answer?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "33",
        distractors: ["23", "43", "13"],
      },
    },
    ],
  },
  {
    id: "f352",
    tag: "Devolution",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "In which year did the devolved administrations first receive their powers?",
    answer: "1999",
    forms: [
    {
      question: "In which year did the devolved administrations first receive their powers?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1999",
        distractors: ["1997", "2001", "1998"],
      },
    },
    {
      question: "The Scottish Parliament and the Welsh Assembly first met in which year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1999",
        distractors: ["2011", "1979", "2005"],
      },
    },
    {
      question: "In which year did devolution give Scotland and Wales their own elected bodies?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1999",
        distractors: ["2001", "1972", "1985"],
      },
    },
    ],
  },
  {
    id: "f353",
    tag: "Devolution",
    chapter: 5,
    verify: false,
    question: "How many Members of the Scottish Parliament are there?",
    answer: "129",
    forms: [
    {
      question: "How many Members of the Scottish Parliament are there?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "129",
        distractors: ["132", "120", "108"],
      },
    },
    {
      question: "How many members are elected to the Scottish Parliament?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "129",
        distractors: ["150", "60", "108"],
      },
    },
    {
      question: "A voter in Edinburgh helps choose one of how many MSPs in total?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "129",
        distractors: ["120", "132", "125"],
      },
    },
    ],
  },
  {
    id: "f354",
    tag: "Devolution",
    chapter: 5,
    verify: false,
    question: "How many members did the Welsh Parliament have when devolution began?",
    answer: "60",
    source: "Handbook 3rd ed., ch.5 “The government” — the Welsh government",
    forms: [
    {
      question: "How many members did the Welsh Parliament have when devolution began?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "60",
        distractors: ["55", "65", "70"],
      },
    },
    {
      question: "When devolution began, how many members did the Welsh Parliament have?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "60",
        distractors: ["50", "70", "80"],
      },
    },
    {
      question: "Which body began with 60 members when devolution started?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Welsh Parliament",
        distractors: ["The Scottish Parliament", "The Northern Ireland Assembly", "The House of Lords"],
      },
    },
    ],
  },
  {
    id: "f355",
    tag: "Devolution",
    chapter: 5,
    verify: false,
    question: "How many MLAs sit in the Northern Ireland Assembly?",
    answer: "90",
    source: "Handbook 3rd ed., ch.5 “The government” — the Northern Ireland Assembly",
    forms: [
    {
      question: "How many MLAs sit in the Northern Ireland Assembly?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "90",
        distractors: ["60", "129", "108"],
      },
    },
    {
      question: "The Northern Ireland Assembly has ___ members.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "90",
        distractors: ["60", "108", "129"],
      },
    },
    {
      question: "Which statement about the Northern Ireland Assembly is correct?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "It has 90 MLAs",
        distractors: ["It has 108 MLAs", "It has 129 MLAs", "It has 60 MLAs"],
      },
    },
    ],
  },
  {
    id: "f356",
    tag: "Devolution",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Which 1998 agreement paved the way for the Northern Ireland Assembly?",
    answer: "The Good Friday Agreement",
    forms: [
    {
      question: "Which 1998 agreement paved the way for the Northern Ireland Assembly?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Good Friday (Belfast) Agreement",
        distractors: ["The St Andrews Agreement", "The Anglo-Irish Agreement", "The Downing Street Declaration"],
      },
    },
    {
      question: "Which 1998 agreement led to the setting up of the Northern Ireland Assembly?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Good Friday Agreement",
        distractors: ["The Anglo-Irish Agreement", "The Downing Street Declaration", "The Act of Union"],
      },
    },
    {
      question: "Power-sharing government in Northern Ireland was established by which agreement?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Good Friday Agreement",
        distractors: ["The Ulster Covenant", "The Belfast Treaty of 1922", "The Sunningdale Accord"],
      },
    },
    ],
  },
  {
    id: "f357",
    tag: "Devolution",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Name a matter reserved to the UK Parliament and not devolved.",
    answer: "Defence",
    forms: [
    {
      question: "Name a matter reserved to the UK Parliament and not devolved.",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Defence",
        distractors: ["Education", "Health", "Local transport"],
      },
    },
    {
      question: "Which of these is a reserved matter, decided at Westminster rather than by the devolved bodies?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Defence",
        distractors: ["Health", "Education", "Housing"],
      },
    },
    {
      question: "On which subject can the Scottish Parliament not make laws?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Defence",
        distractors: ["Agriculture", "Policing", "Tourism"],
      },
    },
    ],
  },
  {
    id: "f358",
    tag: "Elections",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What voting system is used to elect members of the devolved legislatures?",
    answer: "A form of proportional representation",
    forms: [
    {
      question: "What voting system is used to elect members of the devolved legislatures?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A form of proportional representation",
        distractors: ["Exhaustive ballot", "Approval voting", "First past the post"],
      },
    },
    {
      question: "Members of the devolved legislatures are elected using ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "a form of proportional representation",
        distractors: ["first past the post", "an exhaustive ballot", "approval voting"],
      },
    },
    {
      question: "You are voting in an election for a devolved legislature. What kind of voting system is in use?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A form of proportional representation",
        distractors: ["First past the post", "Approval voting", "An exhaustive ballot"],
      },
    },
    ],
  },
  {
    id: "f359",
    tag: "Media",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What is the official published report of debates in Parliament called?",
    answer: "Hansard",
    forms: [
    {
      question: "What is the official published report of debates in Parliament called?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Hansard",
        distractors: ["The Journal", "The Gazette", "The Order Paper"],
      },
    },
    {
      question: "Hansard is the name given to what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The official report of parliamentary debates",
        distractors: ["The list of registered voters", "The record of court judgments", "The register of MPs' expenses"],
      },
    },
    {
      question: "You want to read exactly what was said in a Commons debate. Which published record do you use?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Hansard",
        distractors: ["The Gazette", "The Order Paper", "The Journal"],
      },
    },
    ],
  },
  {
    id: "f360",
    tag: "Elections",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What is the minimum age to vote in a UK general election?",
    answer: "18",
    forms: [
    {
      question: "What is the minimum age to vote in a UK general election?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "18",
        distractors: ["17", "21", "16"],
      },
    },
    {
      question: "At what age can a person vote in a UK general election?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "18",
        distractors: ["21", "16", "17"],
      },
    },
    {
      question: "You must be at least what age to cast a vote in a parliamentary election?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "18",
        distractors: ["22", "25", "19"],
      },
    },
    ],
  },
  {
    id: "f361",
    tag: "Elections",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What is the list of everyone entitled to vote called?",
    answer: "The electoral register",
    forms: [
    {
      question: "What is the list of everyone entitled to vote called?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The electoral register",
        distractors: ["The citizens' index", "The council roll", "The census"],
      },
    },
    {
      question: "Your name must appear on which list before you can vote?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The electoral register",
        distractors: ["The council tax list", "The census return", "The national insurance record"],
      },
    },
    {
      question: "You have just moved house and want to vote in the next election. Which list must you join?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The electoral register",
        distractors: ["The parish record book", "The local land registry", "The jury service list"],
      },
    },
    ],
  },
  {
    id: "f362",
    tag: "Elections",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Which citizens may vote in every type of UK election?",
    answer: "British, Irish and qualifying Commonwealth citizens",
    forms: [
    {
      question: "Which citizens may vote in every type of UK election?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "British, Irish and qualifying Commonwealth citizens resident in the UK",
        distractors: ["Anyone paying council tax", "All UK residents over 18", "British citizens only"],
      },
    },
    {
      question: "Who may vote in every type of UK election?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "British, Irish and qualifying Commonwealth citizens resident in the UK",
        distractors: ["Anyone who pays council tax", "All UK residents aged 18 or over", "British citizens only"],
      },
    },
    {
      question: "A qualifying Commonwealth citizen resident in the UK may do what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Vote in every type of UK election",
        distractors: ["Vote only in local elections", "Vote only in general elections", "Vote only in referendums"],
      },
    },
    ],
  },
  {
    id: "f363",
    tag: "Elections",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What voting system is used to elect MPs to the House of Commons?",
    answer: "First past the post",
    forms: [
    {
      question: "What voting system is used to elect MPs to the House of Commons?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "First past the post",
        distractors: ["Additional member system", "Single transferable vote", "Alternative vote"],
      },
    },
    {
      question: "Members of Parliament are chosen by the ___ system.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "first past the post",
        distractors: ["single transferable vote", "additional member", "alternative vote"],
      },
    },
    {
      question: "The 'first past the post' system is used to elect which representatives?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "MPs to the House of Commons",
        distractors: ["Members of the House of Lords", "Members of the Scottish Parliament", "Members of the Welsh Assembly"],
      },
    },
    ],
  },
  {
    id: "f364",
    tag: "Elections",
    chapter: 5,
    verify: false,
    question: "What is held when a Commons seat falls vacant mid-term?",
    answer: "A by-election",
    forms: [
    {
      question: "What is held when a Commons seat falls vacant mid-term?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A by-election",
        distractors: ["A referendum", "A recount", "A general election"],
      },
    },
    {
      question: "What is held when an MP resigns or dies between general elections?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A by-election",
        distractors: ["A leadership contest", "A recall vote", "A referendum"],
      },
    },
    {
      question: "A seat in the House of Commons falls vacant mid-term. Which kind of election fills it?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A by-election",
        distractors: ["A general election", "A snap election", "A local election"],
      },
    },
    ],
  },
  {
    id: "f365",
    tag: "Elections",
    chapter: 5,
    verify: false,
    question: "What are the opening hours of a polling station on election day?",
    answer: "7am to 10pm",
    forms: [
    {
      question: "What are the opening hours of a polling station on election day?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "7am to 10pm",
        distractors: ["6am to 11pm", "8am to 8pm", "9am to 9pm"],
      },
    },
    {
      question: "Polling stations on election day are open between which hours?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "7am and 10pm",
        distractors: ["9am and 9pm", "8am and 8pm", "6am and 11pm"],
      },
    },
    {
      question: "You finish work at 9pm on election day. Can you still cast your vote?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Yes, voting continues until 10pm",
        distractors: ["No, voting closes at 8pm", "No, voting closes at 6pm", "Yes, voting continues until midnight"],
      },
    },
    ],
  },
  {
    id: "f366",
    tag: "Elections",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What is the minimum age to stand for election as an MP?",
    answer: "18",
    forms: [
    {
      question: "What is the minimum age to stand for election as an MP?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "18",
        distractors: ["25", "16", "21"],
      },
    },
    {
      question: "To stand for election as an MP, a candidate must be at least ___ years old.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "18",
        distractors: ["21", "25", "16"],
      },
    },
    {
      question: "Which of these statements is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "You can stand as an MP from the age of 18",
        distractors: ["You must be 21 to stand as an MP", "You must be 25 to stand as an MP", "You must be 30 to stand as an MP"],
      },
    },
    ],
  },
  {
    id: "f367",
    tag: "Elections",
    chapter: 5,
    verify: false,
    question: "Name a group not allowed to stand for election as an MP.",
    answer: "Serving police officers",
    forms: [
    {
      question: "Name a group not allowed to stand for election as an MP.",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Serving police officers",
        distractors: ["Company directors", "Teachers", "Doctors"],
      },
    },
    {
      question: "Which of these people is barred from standing for election as an MP?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A serving police officer",
        distractors: ["A schoolteacher", "A shop owner", "A nurse"],
      },
    },
    {
      question: "Serving members of which occupation may NOT stand for election as an MP?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "The police",
        distractors: ["Journalism", "Banking", "Teaching"],
      },
    },
    ],
  },
  {
    id: "f368",
    tag: "International",
    chapter: 5,
    verify: false,
    question: "How many countries are members of the Commonwealth?",
    answer: "56",
    source: "Handbook 3rd ed., ch.5 — Commonwealth member list",
    forms: [
    {
      question: "How many countries are members of the Commonwealth?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "56",
        distractors: ["70", "46", "28"],
      },
    },
    {
      question: "How many countries are members of the Commonwealth?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "56",
        distractors: ["62", "27", "47"],
      },
    },
    {
      question: "The Commonwealth is a voluntary association of roughly how many member states?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "56",
        distractors: ["70", "28", "40"],
      },
    },
    ],
  },
  {
    id: "f369",
    tag: "International",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Who is the head of the Commonwealth?",
    answer: "The monarch",
    forms: [
    {
      question: "Who is the head of the Commonwealth?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The monarch",
        distractors: ["The Foreign Secretary", "The Secretary-General of the UN", "The UK Prime Minister"],
      },
    },
    {
      question: "Who is the ceremonial head of the Commonwealth?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The monarch",
        distractors: ["The Prime Minister", "The Secretary-General", "The Foreign Secretary"],
      },
    },
    {
      question: "The Commonwealth has no power over its members, but it does have a head. Who holds that position?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The British monarch",
        distractors: ["The UN Secretary-General", "An elected president", "A rotating chairman"],
      },
    },
    ],
  },
  {
    id: "f370",
    tag: "International",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "How many permanent members does the UN Security Council have?",
    answer: "5, including the UK",
    forms: [
    {
      question: "How many permanent members does the UN Security Council have?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "5, including the UK",
        distractors: ["10, including the UK", "15, including the UK", "3, including the UK"],
      },
    },
    {
      question: "How many countries are permanent members of the UN Security Council?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Five",
        distractors: ["Ten", "Fifteen", "Three"],
      },
    },
    {
      question: "Which statement about the UN Security Council is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "The UK is one of its five permanent members",
        distractors: ["The UK is one of its ten permanent members", "The UK is not a permanent member", "The UK holds the only permanent seat"],
      },
    },
    ],
  },
  {
    id: "f371",
    tag: "International",
    chapter: 5,
    verify: false,
    question: "What is the main purpose of NATO?",
    answer: "Mutual defence among member states",
    forms: [
    {
      question: "What is the main purpose of NATO?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Mutual defence among European and North American member states",
        distractors: ["Protecting human rights", "Coordinating development aid", "Regulating international trade"],
      },
    },
    {
      question: "NATO exists mainly to provide ___ among its member states.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "mutual defence",
        distractors: ["free trade", "development aid", "human rights protection"],
      },
    },
    {
      question: "Which statement about NATO is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "It is a group of European and North American countries that agree to defend each other",
        distractors: ["It regulates international trade", "It coordinates development aid", "It enforces human rights law"],
      },
    },
    ],
  },
  {
    id: "f372",
    tag: "International",
    chapter: 5,
    verify: false,
    question: "How many member states does the Council of Europe have?",
    answer: "47",
    source: "Handbook 3rd ed., ch.5 “The UK and international institutions” — the Council of Europe",
    forms: [
    {
      question: "How many member states does the Council of Europe have?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "47",
        distractors: ["54", "28", "27"],
      },
    },
    {
      question: "How many member countries does the Council of Europe have?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "47",
        distractors: ["60", "27", "54"],
      },
    },
    {
      question: "The body responsible for the European Convention on Human Rights has how many members?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "47",
        distractors: ["25", "31", "52"],
      },
    },
    ],
  },
  {
    id: "f373",
    tag: "International",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Which convention is the Council of Europe responsible for?",
    answer: "The European Convention on Human Rights",
    forms: [
    {
      question: "Which convention is the Council of Europe responsible for?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The European Convention on Human Rights",
        distractors: ["The Treaty of Rome", "The Schengen Agreement", "The Geneva Convention"],
      },
    },
    {
      question: "The Council of Europe is responsible for which agreement?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The European Convention on Human Rights",
        distractors: ["The Treaty of Rome", "The Schengen Agreement", "The Maastricht Treaty"],
      },
    },
    {
      question: "Which document sets out the rights that UK courts apply under the Human Rights Act?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The European Convention on Human Rights",
        distractors: ["The English Bill of Rights of 1689", "The Charter of the United Nations", "The Universal Declaration of Rights"],
      },
    },
    ],
  },
  {
    id: "f374",
    tag: "Law",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Which branch of law deals with disputes between individuals, such as debt?",
    answer: "Civil law",
    forms: [
    {
      question: "Which branch of law deals with disputes between individuals, such as debt?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Civil law",
        distractors: ["Constitutional law", "Criminal law", "Canon law"],
      },
    },
    {
      question: "A landlord takes a former tenant to court over an unpaid debt. Which branch of law applies?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Civil law",
        distractors: ["Criminal law", "Constitutional law", "Canon law"],
      },
    },
    {
      question: "Civil law is mainly concerned with what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Disputes between individuals, such as debt",
        distractors: ["Crimes such as theft", "The powers of Parliament", "The rules of the Church"],
      },
    },
    ],
  },
  {
    id: "f375",
    tag: "Police",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What does PCC stand for in policing in England and Wales?",
    answer: "Police and Crime Commissioner",
    forms: [
    {
      question: "What does PCC stand for in policing in England and Wales?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Police and Crime Commissioner",
        distractors: ["Public Custody Council", "Police Complaints Committee", "Police Conduct Commissioner"],
      },
    },
    {
      question: "In policing, the title Police and Crime Commissioner is shortened to which letters?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "PCC",
        distractors: ["PCU", "CPS", "PCS"],
      },
    },
    {
      question: "In England and Wales, PCC stands for Police and Crime ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Commissioner",
        distractors: ["Committee", "Council", "Constable"],
      },
    },
    ],
  },
  {
    id: "f376",
    tag: "Police",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "In which month and year were the first Police and Crime Commissioners elected?",
    answer: "November 2012",
    forms: [
    {
      question: "In which month and year were the first Police and Crime Commissioners elected?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "November 2012",
        distractors: ["May 2010", "May 2013", "November 2014"],
      },
    },
    {
      question: "When were the first Police and Crime Commissioners elected?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "November 2012",
        distractors: ["May 2013", "May 2015", "November 2010"],
      },
    },
    {
      question: "Voters in England and Wales first chose commissioners to oversee policing at which point?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "November 2012",
        distractors: ["June 2014", "October 2009", "May 2011"],
      },
    },
    ],
  },
  {
    id: "f377",
    tag: "Courts",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Which courts hear minor criminal cases in England, Wales and NI?",
    answer: "Magistrates' courts",
    forms: [
    {
      question: "Which courts hear minor criminal cases in England, Wales and NI?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Magistrates' courts",
        distractors: ["County Courts", "Crown Courts", "High Courts"],
      },
    },
    {
      question: "Minor criminal offences in England and Wales are dealt with in which court?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Magistrates' courts",
        distractors: ["The Crown Court", "County Courts", "The High Court"],
      },
    },
    {
      question: "You are summoned to answer a minor motoring offence in England. Which court will hear it?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The magistrates' court",
        distractors: ["The county court", "The Court of Appeal", "The Sheriff Court"],
      },
    },
    ],
  },
  {
    id: "f378",
    tag: "Courts",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What is the Scottish equivalent of a magistrates' court?",
    answer: "The Justice of the Peace Court",
    forms: [
    {
      question: "What is the Scottish equivalent of a magistrates' court?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Justice of the Peace Court",
        distractors: ["The Sheriff Court", "The High Court of Justiciary", "The Court of Session"],
      },
    },
    {
      question: "A Justice of the Peace Court in Scotland is the equivalent of which English court?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A magistrates' court",
        distractors: ["The Crown Court", "The High Court", "A county court"],
      },
    },
    {
      question: "Cases that an English magistrates' court would hear go to which court in Scotland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Justice of the Peace Court",
        distractors: ["The Sheriff Court", "The Court of Session", "The High Court of Justiciary"],
      },
    },
    ],
  },
  {
    id: "f379",
    tag: "Courts",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "How many magistrates normally hear a case together?",
    answer: "Three",
    forms: [
    {
      question: "How many magistrates normally hear a case together?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Three",
        distractors: ["One", "Twelve", "Five"],
      },
    },
    {
      question: "A case in a magistrates' court is normally heard by ___ magistrates.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "three",
        distractors: ["two", "five", "twelve"],
      },
    },
    {
      question: "You attend a magistrates' court hearing. How many magistrates normally sit together?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Three",
        distractors: ["One", "Twelve", "Five"],
      },
    },
    ],
  },
  {
    id: "f380",
    tag: "Courts",
    chapter: 5,
    verify: false,
    question: "Are magistrates and Justices of the Peace paid for their work?",
    answer: "No, they are unpaid volunteers",
    forms: [
    {
      question: "Are magistrates and Justices of the Peace paid for their work?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No - they are unpaid volunteers",
        distractors: ["Yes, a full salary", "Yes, a daily fee", "Only in Scotland"],
      },
    },
    {
      question: "Are magistrates paid for the work they do in the courts?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No, they are unpaid volunteers",
        distractors: ["Yes, a full-time salary", "Yes, a fee for each day", "No, but they receive a pension"],
      },
    },
    {
      question: "Which statement about magistrates in England and Wales is correct?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "They are unpaid volunteers from the community",
        distractors: ["They are appointed by the Prime Minister", "They always sit alone on a case", "They must be qualified lawyers"],
      },
    },
    ],
  },
  {
    id: "f381",
    tag: "Courts",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Which court tries serious criminal offences before a judge and jury in England?",
    answer: "The Crown Court",
    forms: [
    {
      question: "Which court tries serious criminal offences before a judge and jury in England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Crown Court",
        distractors: ["The County Court", "The Youth Court", "The magistrates' court"],
      },
    },
    {
      question: "Serious criminal cases in England and Wales are tried in which court?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Crown Court",
        distractors: ["A Youth Court", "A County Court", "A magistrates' court"],
      },
    },
    {
      question: "In which court would a jury in England hear a case of armed robbery?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Crown Court",
        distractors: ["The Sheriff Court", "The Court of Session", "The High Court"],
      },
    },
    ],
  },
  {
    id: "f382",
    tag: "Courts",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "How many people sit on a jury in England, Wales and Northern Ireland?",
    answer: "12",
    forms: [
    {
      question: "How many people sit on a jury in England, Wales and Northern Ireland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "12",
        distractors: ["9", "10", "15"],
      },
    },
    {
      question: "A jury in England, Wales and Northern Ireland is made up of ___ people.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "12",
        distractors: ["9", "10", "15"],
      },
    },
    {
      question: "You are called to serve on a jury in England. How many jurors will there be altogether?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "12",
        distractors: ["9", "10", "15"],
      },
    },
    ],
  },
  {
    id: "f383",
    tag: "Courts",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "How many people sit on a jury in Scotland?",
    answer: "15",
    forms: [
    {
      question: "How many people sit on a jury in Scotland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "15",
        distractors: ["10", "12", "8"],
      },
    },
    {
      question: "A jury of 15 people is used in which part of the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Scotland",
        distractors: ["England", "Wales", "Northern Ireland"],
      },
    },
    {
      question: "In Scotland, a jury is made up of how many people?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "15",
        distractors: ["9", "12", "14"],
      },
    },
    ],
  },
  {
    id: "f384",
    tag: "Courts",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Which Scottish court hears serious cases with a judge and jury?",
    answer: "The Sheriff Court",
    forms: [
    {
      question: "Which Scottish court hears serious cases with a judge and jury?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Sheriff Court",
        distractors: ["The Crown Court", "The County Court", "The Justice of the Peace Court"],
      },
    },
    {
      question: "In Scotland, which court hears serious criminal cases, sometimes with a jury?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Sheriff Court",
        distractors: ["The Magistrates' Court", "The County Court", "The Crown Court"],
      },
    },
    {
      question: "A serious offence in Scotland that is not among the very gravest would be tried where?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "The Sheriff Court",
        distractors: ["The Justice of the Peace Court", "The Court of Session", "The High Court of Justiciary"],
      },
    },
    ],
  },
  {
    id: "f385",
    tag: "Courts",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Which courts handle civil disputes such as debt in England, Wales and NI?",
    answer: "County Courts",
    forms: [
    {
      question: "Which courts handle civil disputes such as debt in England, Wales and NI?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "County Courts",
        distractors: ["Crown Courts", "Magistrates' courts", "Youth Courts"],
      },
    },
    {
      question: "Which courts deal with civil disputes such as debt or breach of contract?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "County Courts",
        distractors: ["Youth Courts", "Magistrates' courts", "Crown Courts"],
      },
    },
    {
      question: "A landlord wants to recover unpaid rent through the courts in England. Where would the claim be heard?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "In a County Court",
        distractors: ["In the Court of Appeal", "In the Crown Court", "In a magistrates' court"],
      },
    },
    ],
  },
  {
    id: "f386",
    tag: "Courts",
    chapter: 5,
    verify: false,
    question: "What is the upper value for a small claim in England and Wales?",
    answer: "£10,000",
    source: "Handbook 3rd ed., ch.5 “Respecting the law” — the small claims procedure",
    forms: [
    {
      question: "What is the upper value for a small claim in England and Wales?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "£10,000",
        distractors: ["£3,000", "£5,000", "£1,000"],
      },
    },
    {
      question: "A small claim in England and Wales can be for up to what amount?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "£10,000",
        distractors: ["£5,000", "£15,000", "£25,000"],
      },
    },
    {
      question: "Which claim would be too large for the small claims procedure in England and Wales?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A claim for £12,000",
        distractors: ["A claim for £2,000", "A claim for £8,000", "A claim for £500"],
      },
    },
    ],
  },
  {
    id: "f387",
    tag: "Courts",
    chapter: 5,
    verify: false,
    question: "What is the upper value for a small claim in Scotland and NI?",
    answer: "£5,000",
    source: "Handbook 3rd ed., ch.5 — the small claims procedure",
    forms: [
    {
      question: "What is the upper value for a small claim in Scotland and NI?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "£5,000",
        distractors: ["£10,000", "£3,000", "£500"],
      },
    },
    {
      question: "In Scotland and Northern Ireland a small claim can be for up to ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "£5,000",
        distractors: ["£500", "£3,000", "£10,000"],
      },
    },
    {
      question: "You wish to bring a small claim in Northern Ireland. What is the maximum value allowed?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "£5,000",
        distractors: ["£10,000", "£3,000", "£1,000"],
      },
    },
    ],
  },
  {
    id: "f388",
    tag: "Courts",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What age range of defendants is dealt with by the Youth Court?",
    answer: "10 to 17",
    forms: [
    {
      question: "What age range of defendants is dealt with by the Youth Court?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "10 to 17",
        distractors: ["12 to 18", "14 to 20", "8 to 16"],
      },
    },
    {
      question: "Which age group is dealt with by the Youth Court in England and Wales?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "10 to 17",
        distractors: ["14 to 20", "8 to 15", "12 to 18"],
      },
    },
    {
      question: "A young person charged with an offence appears in a Youth Court. What age range does that court cover?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "10 to 17",
        distractors: ["11 to 16", "13 to 18", "16 to 21"],
      },
    },
    ],
  },
  {
    id: "f389",
    tag: "Courts",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Is the general public allowed to attend Youth Court hearings?",
    answer: "No",
    forms: [
    {
      question: "Is the general public allowed to attend Youth Court hearings?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No",
        distractors: ["Only journalists are barred", "Yes, with the judge's consent", "Yes, always"],
      },
    },
    {
      question: "Can members of the public sit in on a Youth Court hearing?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "No, the public are not admitted",
        distractors: ["Yes, with the judge's consent", "Yes, anyone may attend", "Yes, if they are over 18"],
      },
    },
    {
      question: "Which statement about Youth Courts is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "Members of the public cannot attend",
        distractors: ["Hearings are open to all who wish to attend", "Reporters may name the young defendant", "Cases are decided by a jury of twelve"],
      },
    },
    ],
  },
  {
    id: "f390",
    tag: "Rights",
    chapter: 5,
    verify: false,
    question: "Which Act brought UK discrimination law into a single statute?",
    answer: "The Equality Act 2010",
    forms: [
    {
      question: "Which Act brought UK discrimination law into a single statute?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The Equality Act 2010",
        distractors: ["The Civil Rights Act 2006", "The Human Rights Act 1998", "The Race Relations Act 1976"],
      },
    },
    {
      question: "The Equality Act 2010 is important because it did what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Brought discrimination law together in a single Act",
        distractors: ["Created the National Health Service", "Gave women the right to vote", "Set up the devolved legislatures"],
      },
    },
    {
      question: "UK discrimination law was brought together into one statute by ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "the Equality Act 2010",
        distractors: ["the Race Relations Act 1976", "the Human Rights Act 1998", "the Civil Rights Act 2006"],
      },
    },
    ],
  },
  {
    id: "f391",
    tag: "Rights",
    chapter: 5,
    verify: false,
    question: "Since which year has female genital mutilation been illegal in the UK?",
    answer: "1985",
    forms: [
    {
      question: "Since which year has female genital mutilation been illegal in the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1985",
        distractors: ["2003", "1975", "1998"],
      },
    },
    {
      question: "Female genital mutilation has been illegal in the UK since ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "1985",
        distractors: ["1975", "1995", "2005"],
      },
    },
    {
      question: "Which statement about female genital mutilation in the UK is correct?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "It has been illegal since 1985",
        distractors: ["It has been illegal since 1965", "It has been illegal since 2010", "It has never been specifically outlawed"],
      },
    },
    ],
  },
  {
    id: "f392",
    tag: "Rights",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Since which year has it been an offence to take a girl abroad for FGM?",
    answer: "2003",
    forms: [
    {
      question: "Since which year has it been an offence to take a girl abroad for FGM?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "2003",
        distractors: ["2014", "2008", "1985"],
      },
    },
    {
      question: "Since which year has it been a crime to take a girl abroad from the UK for genital mutilation?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "2003",
        distractors: ["2008", "2014", "1985"],
      },
    },
    {
      question: "Taking a British girl overseas to undergo FGM became an offence in which year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "2003",
        distractors: ["1990", "1999", "2011"],
      },
    },
    ],
  },
  {
    id: "f393",
    tag: "Rights",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "In which year were Forced Marriage Protection Orders introduced in England?",
    answer: "2008",
    forms: [
    {
      question: "In which year were Forced Marriage Protection Orders introduced in England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "2008",
        distractors: ["2014", "2005", "2011"],
      },
    },
    {
      question: "Forced Marriage Protection Orders became available in England and Wales in which year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "2008",
        distractors: ["1998", "2014", "2004"],
      },
    },
    {
      question: "In which year were the courts given power to make orders protecting people from forced marriage?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "2008",
        distractors: ["2001", "2006", "2011"],
      },
    },
    ],
  },
  {
    id: "f394",
    tag: "Rights",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "In which year did Forced Marriage Protection Orders become available in Scotland?",
    answer: "2011",
    forms: [
    {
      question: "In which year did Forced Marriage Protection Orders become available in Scotland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "2011",
        distractors: ["2005", "2008", "2013"],
      },
    },
    {
      question: "Forced Marriage Protection Orders became available in Scotland in which year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "2011",
        distractors: ["2008", "2014", "2005"],
      },
    },
    {
      question: "Which measure has been available in Scotland since 2011?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Forced Marriage Protection Orders",
        distractors: ["Civil partnerships", "Anti-social behaviour orders", "Community payback orders"],
      },
    },
    ],
  },
  {
    id: "f395",
    tag: "Tax",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Which government department collects taxes in the UK?",
    answer: "HM Revenue and Customs",
    forms: [
    {
      question: "Which government department collects taxes in the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "HM Revenue and Customs (HMRC)",
        distractors: ["The Department for Work and Pensions", "The Office for Budget Responsibility", "The Treasury Board"],
      },
    },
    {
      question: "HM Revenue and Customs is responsible for what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Collecting taxes",
        distractors: ["Paying state pensions", "Setting interest rates", "Running the courts"],
      },
    },
    {
      question: "Which department would you deal with about paying your income tax?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "HM Revenue and Customs (HMRC)",
        distractors: ["The Treasury Board", "The Department for Work and Pensions", "The Office for Budget Responsibility"],
      },
    },
    ],
  },
  {
    id: "f396",
    tag: "Tax",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Who is usually required to complete a self-assessment tax return?",
    answer: "Self-employed people",
    forms: [
    {
      question: "Who is usually required to complete a self-assessment tax return?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Self-employed people",
        distractors: ["Students", "All employees", "Pensioners only"],
      },
    },
    {
      question: "Who normally has to complete a self-assessment tax return?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Self-employed people",
        distractors: ["Pensioners", "Full-time students", "Employees paid through PAYE"],
      },
    },
    {
      question: "You have started working for yourself as a plumber. Which group do you now fall into for tax?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Self-employed people",
        distractors: ["People exempt from income tax", "People taxed only at source", "Employees paying through PAYE"],
      },
    },
    ],
  },
  {
    id: "f397",
    tag: "Tax",
    chapter: 5,
    verify: false,
    question: "What is the deadline for filing a self-assessment tax return online?",
    answer: "31 January",
    forms: [
    {
      question: "What is the deadline for filing a self-assessment tax return online?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "31 January",
        distractors: ["5 April", "31 October", "30 June"],
      },
    },
    {
      question: "By which date must a self-assessment tax return normally be filed online?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "31 January",
        distractors: ["31 October", "30 June", "5 April"],
      },
    },
    {
      question: "You are self-employed and complete your tax return on the internet. Which deadline applies?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "31 January",
        distractors: ["6 April", "1 January", "28 February"],
      },
    },
    ],
  },
  {
    id: "f398",
    tag: "Tax",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "At what age is a National Insurance number normally issued?",
    answer: "Just before the 16th birthday",
    forms: [
    {
      question: "At what age is a National Insurance number normally issued?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Just before their 16th birthday",
        distractors: ["At birth", "At 18", "At 21"],
      },
    },
    {
      question: "A young person is approaching their 16th birthday. What are they normally issued with?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "A National Insurance number",
        distractors: ["A passport", "A driving licence", "A tax return"],
      },
    },
    {
      question: "A National Insurance number is normally issued ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "just before a person's 16th birthday",
        distractors: ["at birth", "on a person's 18th birthday", "on a person's 21st birthday"],
      },
    },
    ],
  },
  {
    id: "f399",
    tag: "Driving",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What is the minimum age to drive a car in the UK?",
    answer: "17",
    forms: [
    {
      question: "What is the minimum age to drive a car in the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "17",
        distractors: ["21", "18", "16"],
      },
    },
    {
      question: "A young person wishes to learn to drive a car. What is the minimum age in the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "17",
        distractors: ["16", "18", "19"],
      },
    },
    {
      question: "Which statement about driving in the UK is correct?",
      mcqOnly: true,
      answers: {
        kind: 'fixed',
        correct: "You may drive a car from the age of 17",
        distractors: ["You may drive a car from the age of 15", "You may drive a car from the age of 16", "You may drive a car from the age of 20"],
      },
    },
    ],
  },
  {
    id: "f400",
    tag: "Driving",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What is the minimum age to ride a moped in the UK?",
    answer: "16",
    forms: [
    {
      question: "What is the minimum age to ride a moped in the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "16",
        distractors: ["17", "15", "18"],
      },
    },
    {
      question: "At what age can you ride a moped in the UK?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "16",
        distractors: ["15", "17", "18"],
      },
    },
    {
      question: "The minimum age for riding a moped on the road is what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "16",
        distractors: ["14", "20", "21"],
      },
    },
    ],
  },
  {
    id: "f401",
    tag: "Driving",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "Up to what age is a UK driving licence normally valid before more frequent renewal?",
    answer: "70",
    forms: [
    {
      question: "Up to what age is a UK driving licence normally valid before more frequent renewal?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "70",
        distractors: ["65", "75", "80"],
      },
    },
    {
      question: "At what age must a UK driving licence be renewed?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "70",
        distractors: ["72", "65", "68"],
      },
    },
    {
      question: "A licence issued to a young driver stays valid until which birthday?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The 70th",
        distractors: ["The 80th", "The 60th", "The 75th"],
      },
    },
    ],
  },
  {
    id: "f402",
    tag: "Driving",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "After the age of 70, how often must a UK driving licence be renewed?",
    answer: "Every three years",
    forms: [
    {
      question: "After the age of 70, how often must a UK driving licence be renewed?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Every three years",
        distractors: ["Every ten years", "Every year", "Every five years"],
      },
    },
    {
      question: "Once a driver reaches the age of 70, how often must the licence be renewed?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Every three years",
        distractors: ["Every year", "Every five years", "Every ten years"],
      },
    },
    {
      question: "A driver aged 72 renews their licence. How long will the new licence last?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Three years",
        distractors: ["Ten years", "Five years", "One year"],
      },
    },
    ],
  },
  {
    id: "f403",
    tag: "Driving",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "From what age must a car in Great Britain have an annual MOT test?",
    answer: "Three years old",
    forms: [
    {
      question: "From what age must a car in Great Britain have an annual MOT test?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Three years old",
        distractors: ["Five years old", "One year old", "Four years old"],
      },
    },
    {
      question: "A car in Great Britain must have an annual MOT test once it is ___ old.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "three years",
        distractors: ["one year", "two years", "five years"],
      },
    },
    {
      question: "Your car in Great Britain has just turned three years old. What must it now have each year?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "An MOT test",
        distractors: ["A road tax refund", "A new logbook", "A driving licence check"],
      },
    },
    ],
  },
  {
    id: "f404",
    tag: "Driving",
    chapter: 5,
    verify: false,
    question: "From what age must a car in Northern Ireland have an MOT test?",
    answer: "Four years old",
    forms: [
    {
      question: "From what age must a car in Northern Ireland have an MOT test?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Four years old",
        distractors: ["Five years old", "Three years old", "Two years old"],
      },
    },
    {
      question: "In Northern Ireland, at what age must a car first have an MOT test?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Four years old",
        distractors: ["Five years old", "Ten years old", "Three years old"],
      },
    },
    {
      question: "Cars in most of the UK need an MOT at three years old. What is the rule in Northern Ireland?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Four years old",
        distractors: ["Two years old", "Six years old", "One year old"],
      },
    },
    ],
  },
  {
    id: "f405",
    tag: "Driving",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "For how long can a visitor drive in the UK on a licence issued abroad?",
    answer: "12 months",
    forms: [
    {
      question: "For how long can a visitor drive in the UK on a licence issued abroad?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "12 months",
        distractors: ["6 months", "24 months", "3 months"],
      },
    },
    {
      question: "A visitor to the UK may drive on a licence from their own country for how long?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "12 months",
        distractors: ["24 months", "6 months", "3 months"],
      },
    },
    {
      question: "How long can someone use a licence from abroad before they need a UK one?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "One year",
        distractors: ["One month", "Two years", "Five years"],
      },
    },
    ],
  },
  {
    id: "f406",
    tag: "Community",
    chapter: 5,
    verify: false,
    question: "What is the age range for people who may be called for jury service?",
    answer: "18 to 70",
    forms: [
    {
      question: "What is the age range for people who may be called for jury service?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "18 to 70",
        distractors: ["21 to 65", "18 to 65", "16 to 70"],
      },
    },
    {
      question: "People aged ___ may be called for jury service.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "18 to 70",
        distractors: ["21 to 65", "16 to 70", "18 to 65"],
      },
    },
    {
      question: "Which description correctly covers those who may be called for jury service?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Anyone aged 18 to 70",
        distractors: ["Anyone aged 16 to 70", "Anyone aged over 21", "Anyone aged 18 to 60"],
      },
    },
    ],
  },
  {
    id: "f407",
    tag: "Community",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "From which list are people randomly selected for jury service?",
    answer: "The electoral register",
    forms: [
    {
      question: "From which list are people randomly selected for jury service?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The electoral register",
        distractors: ["The tax records", "The census", "The NHS register"],
      },
    },
    {
      question: "You receive a summons for jury service. Which list were you selected from?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "The electoral register",
        distractors: ["The council tax list", "The census returns", "The passport records"],
      },
    },
    {
      question: "People are chosen at random for jury service from the ___.",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "electoral register",
        distractors: ["national insurance database", "GP patient lists", "school records"],
      },
    },
    ],
  },
  {
    id: "f408",
    tag: "Community",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What is the minimum age to become a school governor in England?",
    answer: "18",
    forms: [
    {
      question: "What is the minimum age to become a school governor in England?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "18",
        distractors: ["25", "21", "16"],
      },
    },
    {
      question: "What is the minimum age for becoming a school governor?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "18",
        distractors: ["25", "16", "21"],
      },
    },
    {
      question: "You would like to volunteer as a school governor. How old must you be?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "18",
        distractors: ["20", "23", "30"],
      },
    },
    ],
  },
  {
    id: "f409",
    tag: "Community",
    chapter: 5,
    verify: false,
    source: 'Handbook 3rd ed., ch.5 — corroborated against the handbook text',
    question: "What term describes giving time to help others without being paid?",
    answer: "Volunteering",
    forms: [
    {
      question: "What term describes giving time to help others without being paid?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Volunteering",
        distractors: ["Secondment", "National service", "Apprenticeship"],
      },
    },
    {
      question: "Giving your time to help others in the community without being paid is known as what?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Volunteering",
        distractors: ["Jury service", "Apprenticeship", "Public office"],
      },
    },
    {
      question: "Many people give free time to charities and local groups. What is this activity called?",
      mcqOnly: false,
      answers: {
        kind: 'fixed',
        correct: "Volunteering",
        distractors: ["Campaigning", "Sponsoring", "Fundraising"],
      },
    },
    ],
  },
];
