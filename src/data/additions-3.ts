/**
 * Third tranche, from the coverage sweep.
 *
 * `.work/coverage.ts` ranks every handbook section by how much of its own distinctive
 * vocabulary the deck mentions at all. After the demography and religion gaps were filled,
 * the thinnest remaining against their own size were:
 *
 *   · 4.2 Arts and culture — 17,000 characters, and the composers were almost entirely absent
 *   · 4.7 Sport — the venues, the Paralympic origin, and most of the named sportspeople
 *   · 5.4 Fundamental principles — the protected characteristics, and the domestic-abuse help
 *   · 3.2 Britain since 1945 — Attlee, Beveridge and the building of the welfare state
 *
 * Every fact is grepped against `.work/handbook.txt` before it is written, and carries the
 * section it came from. Dates that the handbook gives in a person's dash-range (Purcell
 * 1659–95) are used only where the handbook itself makes something of them; a lifespan is not
 * an examinable date and padding options with them would be inventing difficulty.
 *
 * Option sets are length-balanced and, where numeric, evenly spread — the deck measures both
 * the longest-option tell and the middle-value tell, and a careless addition moves them.
 */

import type { Fact } from '@/domain/deck/types';

const ARTS = 'Handbook 3rd ed., ch.4 “Arts and culture”';
const SPORT = 'Handbook 3rd ed., ch.4 “Sport”';
const PRIN = 'Handbook 3rd ed., ch.5 “Fundamental principles”';
const P1945 = 'Handbook 3rd ed., ch.3 “Britain since 1945”';

export const ADDITIONS_3: readonly Fact[] = [
  // ==========================================================================
  // 4.2 Arts and culture — the composers
  // ==========================================================================
  {
    id: 'f542', tag: 'Music', chapter: 4, verify: false, source: ARTS,
    question: 'Which composer was the organist at Westminster Abbey?',
    answer: 'Henry Purcell',
    explanation: {
      lead: 'Purcell was the organist at Westminster Abbey.',
      versus: 'Purcell is the earliest composer the handbook names and the only one given a job rather than a work. Handel is the one who came from abroad; Elgar the one played at the Proms.',
      why: 'He wrote church music, operas and other pieces, and developed a British style distinct from the rest of Europe — which is why the handbook puts him first.',
    },
    forms: [
      { question: 'Which composer was the organist at Westminster Abbey?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Henry Purcell', distractors: ['George Frederick Handel', 'Sir Edward Elgar', 'Gustav Holst'] } },
      { question: 'Who developed a British musical style distinct from that elsewhere in Europe?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Henry Purcell', distractors: ['Sir William Walton', 'Ralph Vaughan Williams', 'Benjamin Britten'] } },
      { question: 'Which of these is Purcell remembered for?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Being organist at Westminster Abbey', distractors: ['Writing the Water Music for King George I', 'Composing The Planets suite', 'Writing the Pomp and Circumstance Marches'] } },
    ],
  },
  {
    id: 'f543', tag: 'Music', chapter: 4, verify: false, source: ARTS,
    question: 'Which German-born composer settled in Britain and became a British citizen?',
    answer: 'George Frederick Handel',
    explanation: {
      lead: 'Handel was born in Germany, spent many years in the UK, and became a British citizen in 1727.',
      versus: 'Handel is the immigrant; Purcell, Elgar, Holst, Vaughan Williams, Walton and Britten are all British-born. If a question turns on someone arriving from abroad, it is Handel.',
      why: 'He wrote the Water Music for King George I and Music for the Royal Fireworks for his son George II — royal commissions are the thread that runs through everything the handbook says about him.',
      cluster: [
        { label: 'Water Music', detail: 'written for King George I' },
        { label: 'Music for the Royal Fireworks', detail: 'written for his son, George II' },
        { label: 'Messiah', detail: 'an oratorio, sung regularly by choirs and often at Easter' },
      ],
    },
    forms: [
      { question: 'Which German-born composer settled in Britain and became a British citizen?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'George Frederick Handel', distractors: ['Henry Purcell', 'Sir Edward Elgar', 'Sir William Walton'] } },
      { question: 'Who wrote the Water Music and Music for the Royal Fireworks?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'George Frederick Handel', distractors: ['Gustav Holst', 'Ralph Vaughan Williams', 'Benjamin Britten'] } },
      { question: 'Which work by Handel is an oratorio often sung at Easter?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Messiah', distractors: ['The Planets', 'Peter Grimes', 'Land of Hope and Glory'] } },
    ],
  },
  {
    id: 'f544', tag: 'Music', chapter: 4, verify: false, source: ARTS,
    question: 'Which composer wrote The Planets?',
    answer: 'Gustav Holst',
    explanation: {
      lead: 'Holst wrote The Planets, a suite of pieces themed around the planets of the solar system.',
      versus: 'Holst is the one with a single famous suite; Elgar the one with the marches. Both get played at big national occasions, which is why they blur.',
      why: 'He adapted Jupiter, part of that suite, as the tune for the hymn "I vow to thee my country" — so one piece of music has two lives, and the handbook mentions both.',
    },
    forms: [
      { question: 'Which composer wrote The Planets?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Gustav Holst', distractors: ['Sir Edward Elgar', 'Sir William Walton', 'Ralph Vaughan Williams'] } },
      { question: 'The tune of the hymn "I vow to thee my country" is adapted from which work?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Jupiter, from The Planets', distractors: ['Land of Hope and Glory', 'The Water Music', 'Music for the Royal Fireworks'] } },
      { question: 'What is The Planets?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'A suite of pieces themed around the planets', distractors: ['An oratorio sung by choirs at Easter', 'A set of marches for a coronation', 'An opera about a fisherman'] } },
    ],
  },
  {
    id: 'f545', tag: 'Music', chapter: 4, verify: false, source: ARTS,
    question: 'Whose march is usually played at the Last Night of the Proms?',
    answer: 'Sir Edward Elgar',
    explanation: {
      lead: 'Elgar wrote the Pomp and Circumstance Marches, and March No 1 — Land of Hope and Glory — is usually played at the Last Night of the Proms.',
      versus: 'Land of Hope and Glory is Elgar; "I vow to thee my country" is Holst. Both are patriotic, both are sung at national moments, and they are the pair most often swapped.',
      why: 'The Proms are held at the Royal Albert Hall, which is where the handbook puts the Last Night — the piece, the composer and the venue travel together.',
    },
    forms: [
      { question: 'Whose march is usually played at the Last Night of the Proms?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Sir Edward Elgar', distractors: ['Gustav Holst', 'Henry Purcell', 'Sir William Walton'] } },
      { question: 'Land of Hope and Glory comes from which set of works?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Pomp and Circumstance Marches', distractors: ['The Planets suite', 'The Water Music', 'Music for the Royal Fireworks'] } },
      { question: 'At which venue is the Last Night of the Proms held?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Royal Albert Hall', distractors: ['Westminster Abbey', 'The O2 in Greenwich', 'Wembley Stadium'] } },
    ],
  },
  {
    id: 'f546', tag: 'Music', chapter: 4, verify: false, source: ARTS,
    question: 'Which composer was strongly influenced by traditional English folk music?',
    answer: 'Ralph Vaughan Williams',
    explanation: {
      lead: 'Vaughan Williams wrote for orchestras and choirs and was strongly influenced by traditional English folk music.',
      versus: 'Folk music is the detail that belongs to him alone. Walton is the one who wrote for coronations and for film.',
      why: 'The handbook uses him to make a point it makes nowhere else in the section: that British classical music drew on what ordinary people already sang.',
    },
    forms: [
      { question: 'Which composer was strongly influenced by traditional English folk music?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Ralph Vaughan Williams', distractors: ['Sir William Walton', 'Gustav Holst', 'Henry Purcell'] } },
      { question: 'Ralph Vaughan Williams wrote music mainly for what?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Orchestras and choirs', distractors: ['Solo piano and organ', 'Military and marching bands', 'Opera and ballet only'] } },
      { question: 'Which of these describes Vaughan Williams rather than another composer?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Drew strongly on traditional English folk music', distractors: ['Wrote marches for two coronations', 'Became a British citizen in 1727', 'Was organist at Westminster Abbey'] } },
    ],
  },
  {
    id: 'f547', tag: 'Music', chapter: 4, verify: false, source: ARTS,
    question: 'Which composer wrote marches for the coronations of George VI and Elizabeth II?',
    answer: 'Sir William Walton',
    explanation: {
      lead: 'Walton wrote the coronation marches for King George VI and Queen Elizabeth II.',
      versus: 'Two coronations is the fact that fixes him. Elgar also wrote marches, but his are the Proms; Walton’s are the crownings.',
      why: 'His range is the point the handbook makes: film scores at one end and opera at the other, which is why "wrote a wide range" is the phrase attached to him.',
    },
    forms: [
      { question: 'Which composer wrote marches for the coronations of George VI and Elizabeth II?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Sir William Walton', distractors: ['Sir Edward Elgar', 'Ralph Vaughan Williams', 'Gustav Holst'] } },
      { question: 'Which composer wrote everything from film scores to opera?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Sir William Walton', distractors: ['Henry Purcell', 'George Frederick Handel', 'Gustav Holst'] } },
      { question: 'How many coronations did Walton write marches for?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Two', distractors: ['One', 'Three', 'Four'] } },
    ],
  },

  // ==========================================================================
  // 4.7 Sport
  // ==========================================================================
  {
    id: 'f548', tag: 'Sport', chapter: 4, verify: false, source: SPORT,
    question: 'Who founded the games that became the Paralympics, and where?',
    answer: 'Dr Ludwig Guttman, at Stoke Mandeville hospital',
    explanation: {
      lead: 'Dr Ludwig Guttman, a German refugee, founded them at Stoke Mandeville hospital in Buckinghamshire.',
      versus: 'Guttman is a doctor, not an athlete — the only person in this section who is neither a competitor nor a venue. If a question is about the origin of the Paralympics rather than a medal, it is him.',
      why: 'He developed new methods of treating spinal injuries and encouraged his patients to take part in exercise and sport. The games came out of the treatment, which is why a hospital rather than a stadium is the answer.',
    },
    forms: [
      { question: 'Who founded the games that became the Paralympics?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Dr Ludwig Guttman', distractors: ['Sir Roger Bannister', 'Baroness Tanni Grey-Thompson', 'Sir Ludwig Mond'] } },
      { question: 'At which hospital did the games that became the Paralympics begin?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Stoke Mandeville', distractors: ['Great Ormond Street', 'St Thomas’', 'Guy’s'] } },
      { question: 'What was Dr Guttman’s medical speciality?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Treating spinal injuries', distractors: ['Treating heart disease', 'Treating burns', 'Treating tuberculosis'] } },
    ],
  },
  {
    id: 'f549', tag: 'Sport', chapter: 4, verify: false, source: SPORT,
    question: 'Who was the first man in the world to run a mile in under four minutes?',
    answer: 'Sir Roger Bannister, in 1954',
    explanation: {
      lead: 'Sir Roger Bannister ran the first sub-four-minute mile in 1954.',
      versus: 'Bannister is a first in the WORLD, not just in Britain. Several others in this section are the first Briton to do something — Wiggins the Tour de France, Farah the 10,000 metres — and that distinction is what the questions turn on.',
      why: 'The barrier is what made it famous: four minutes was thought beyond a human being until it was not.',
    },
    forms: [
      { question: 'Who was the first man in the world to run a mile in under four minutes?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Sir Roger Bannister', distractors: ['Sir Mo Farah', 'Sir Chris Hoy', 'Sir Jackie Stewart'] } },
      { question: 'In which year was the first sub-four-minute mile run?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1954', distractors: ['1934', '1944', '1964'] } },
      { question: 'Which of these was a world first rather than a British first?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Running a mile in under four minutes', distractors: ['Winning the Tour de France', 'Winning Olympic gold in the 10,000 metres', 'Winning a Grand Slam singles title since 1936'] } },
    ],
  },
  {
    id: 'f550', tag: 'Sport', chapter: 4, verify: false, source: SPORT,
    question: 'Who captained the English football team that won the World Cup in 1966?',
    answer: 'Bobby Moore',
    explanation: {
      lead: 'Bobby Moore captained the England team that won the World Cup in 1966.',
      versus: 'Moore is football, Botham is cricket. Both captained England, and both are in the same list, which is the confusion to hold apart.',
      why: '1966 is the only World Cup England has won, so the year and the man are a single fact rather than two.',
    },
    forms: [
      { question: 'Who captained the English football team that won the World Cup in 1966?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Bobby Moore', distractors: ['Sir Ian Botham', 'Sir Roger Bannister', 'Sir Jackie Stewart'] } },
      { question: 'In which year did England win the football World Cup?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1966', distractors: ['1956', '1962', '1970'] } },
      { question: 'Which sport did Bobby Moore play?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Football', distractors: ['Cricket', 'Rugby', 'Motor racing'] } },
    ],
  },
  {
    id: 'f551', tag: 'Sport', chapter: 4, verify: false, source: SPORT,
    question: 'Which Scottish driver won the Formula 1 world championship three times?',
    answer: 'Sir Jackie Stewart',
    explanation: {
      lead: 'Sir Jackie Stewart, a Scot, won the Formula 1 world championship three times.',
      versus: 'Stewart and Sir Chris Hoy are the two Scots in this list — one on four wheels, one on two. Hoy is the cyclist and the Olympian; Stewart is the driver and the world champion.',
      why: 'Three championships is the figure to hold; the handbook gives no other number for him.',
    },
    forms: [
      { question: 'Which Scottish driver won the Formula 1 world championship three times?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Sir Jackie Stewart', distractors: ['Sir Chris Hoy', 'Sir Bradley Wiggins', 'Bobby Moore'] } },
      { question: 'How many Formula 1 world championships did Sir Jackie Stewart win?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Three', distractors: ['One', 'Five', 'Seven'] } },
      { question: 'Which of these Scots is the racing driver rather than the cyclist?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Sir Jackie Stewart', distractors: ['Sir Chris Hoy', 'Sir Bradley Wiggins', 'Sir Mo Farah'] } },
    ],
  },
  {
    id: 'f552', tag: 'Sport', chapter: 4, verify: false, source: SPORT,
    question: 'Who was the first Briton to win the Tour de France?',
    answer: 'Sir Bradley Wiggins, in 2012',
    explanation: {
      lead: 'Sir Bradley Wiggins became the first Briton to win the Tour de France, in 2012.',
      versus: 'Wiggins and Hoy are both cyclists with Olympic gold. Wiggins is the road racer and the Tour; Hoy is the track rider with six golds.',
      why: '2012 does double duty for him — the Tour and a home Olympics in the same summer, which is why that year attaches to so many names in this section.',
    },
    forms: [
      { question: 'Who was the first Briton to win the Tour de France?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Sir Bradley Wiggins', distractors: ['Sir Chris Hoy', 'Sir Mo Farah', 'David Weir'] } },
      { question: 'In which year did a Briton first win the Tour de France?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '2012', distractors: ['2004', '2008', '2016'] } },
      { question: 'Which sport is Sir Bradley Wiggins associated with?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Cycling', distractors: ['Rowing', 'Athletics', 'Sailing'] } },
    ],
  },
  {
    id: 'f553', tag: 'Sport', chapter: 4, verify: false, source: SPORT,
    question: 'Which British distance runner was born in Somalia and won Olympic gold at 5,000 and 10,000 metres?',
    answer: 'Sir Mo Farah',
    explanation: {
      lead: 'Sir Mo Farah, born in Somalia, won Olympic gold in the 5,000 and 10,000 metres.',
      versus: 'Farah is the first BRITON to win Olympic gold at 10,000 metres — a British first. Bannister’s sub-four-minute mile was a world first. Both are running; only one is a world record of any kind.',
      why: 'He is also the clearest example of the point the handbook keeps making about modern Britain: born abroad, and one of its best-known athletes.',
    },
    forms: [
      { question: 'Which British distance runner was born in Somalia?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Sir Mo Farah', distractors: ['Sir Roger Bannister', 'David Weir', 'Sir Chris Hoy'] } },
      { question: 'At which two distances did Sir Mo Farah win Olympic gold?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '5,000 and 10,000 metres', distractors: ['800 and 1,500 metres', '1,500 and 5,000 metres', '10,000 metres and the marathon'] } },
      { question: 'Sir Mo Farah was the first Briton to win Olympic gold in which event?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The 10,000 metres', distractors: ['The 5,000 metres', 'The marathon', 'The 1,500 metres'] } },
    ],
  },

  // ==========================================================================
  // 5.4 Fundamental principles
  // ==========================================================================
  {
    id: 'f554', tag: 'Rights', chapter: 5, verify: false, source: PRIN,
    question: 'Which Act brought the European Convention on Human Rights into UK law?',
    answer: 'The Human Rights Act 1998',
    explanation: {
      lead: 'The Human Rights Act 1998 incorporated the European Convention on Human Rights into UK law.',
      versus: 'Two Acts sit next to each other and get swapped: the Human Rights Act 1998 covers rights such as freedom of expression; the Equality Act 2010 covers discrimination. Rights against the state, versus fair treatment by anyone.',
      why: 'British diplomats and lawyers helped draft the Convention itself, which is why the handbook treats it as something the UK joined rather than something imposed on it.',
    },
    forms: [
      { question: 'Which Act brought the European Convention on Human Rights into UK law?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Human Rights Act 1998', distractors: ['The Equality Act 2010', 'The Bill of Rights 1689', 'The Habeas Corpus Act 1679'] } },
      { question: 'In which year was the Human Rights Act passed?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '1998', distractors: ['1988', '2008', '2010'] } },
      { question: 'Which of these does the Human Rights Act cover, rather than the Equality Act?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The prohibition of torture', distractors: ['Discrimination because of disability', 'Discrimination because of pregnancy', 'Discrimination because of marital status'] } },
    ],
  },
  {
    id: 'f555', tag: 'Rights', chapter: 5, verify: false, source: PRIN,
    question: 'What should someone facing domestic violence in an emergency do first?',
    answer: 'Call the police on 999',
    explanation: {
      lead: 'In an emergency, call the police on 999.',
      versus: 'Two numbers, two situations. 999 is the emergency; the 24-hour National Domestic Violence Freephone Helpline is the one to call at any time when it is not.',
      why: 'The handbook also lists the practical routes: a solicitor or Citizens Advice to explain the options, and refuges and shelters for a safe place to stay. Numbers for these are in the front of the Yellow Pages.',
    },
    forms: [
      { question: 'What should someone facing domestic violence in an emergency do first?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Call the police on 999', distractors: ['Call a solicitor', 'Contact Citizens Advice', 'Go to a refuge'] } },
      { question: 'Which number does the handbook give for the emergency services?', mcqOnly: false,
        answers: { kind: 'fixed', correct: '999', distractors: ['111', '101', '112'] } },
      { question: 'Where does the handbook say helpline numbers can be found?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The front of the Yellow Pages', distractors: ['The back of the phone book', 'The local library', 'The Post Office'] } },
    ],
  },

  // ==========================================================================
  // 3.2 Britain since 1945
  // ==========================================================================
  {
    id: 'f556', tag: 'Post-war', chapter: 3, verify: false, source: P1945,
    question: 'Who led the Labour government elected in 1945?',
    answer: 'Clement Attlee',
    explanation: {
      lead: 'Clement Attlee led the Labour government elected in 1945.',
      versus: 'Attlee had been Churchill’s deputy in the wartime government, then beat him at the election that followed. Churchill is the war; Attlee is what came after it.',
      why: 'His government nationalised the railways, coal mines and gas, water and electricity supplies, and created the National Health Service — the welfare state, built in one term.',
    },
    forms: [
      { question: 'Who led the Labour government elected in 1945?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Clement Attlee', distractors: ['Winston Churchill', 'William Beveridge', 'Harold Wilson'] } },
      { question: 'Whose deputy had Clement Attlee been during the war?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Winston Churchill', distractors: ['William Beveridge', 'Neville Chamberlain', 'David Lloyd George'] } },
      { question: 'Which of these did the Attlee government create?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The National Health Service', distractors: ['The Bank of England', 'The Church of England', 'The Bill of Rights'] } },
    ],
  },
  {
    id: 'f557', tag: 'Post-war', chapter: 3, verify: false, source: P1945,
    question: 'Whose 1942 report set out the ideas behind the welfare state?',
    answer: 'William Beveridge',
    explanation: {
      lead: 'William Beveridge’s report of 1942 set out the ideas that became the modern welfare state.',
      versus: 'Beveridge wrote the plan; Attlee built it. The report is 1942, in the middle of the war; the government that acted on it was elected in 1945.',
      why: 'He was a Liberal, not Labour, and the report was commissioned during a wartime coalition — which is why the welfare state is not the property of one party.',
    },
    forms: [
      { question: 'Whose 1942 report set out the ideas behind the welfare state?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'William Beveridge', distractors: ['Clement Attlee', 'R A Butler', 'Winston Churchill'] } },
      { question: 'Which wartime report became the basis of the welfare state?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'The Beveridge Report', distractors: ['The Butler Report', 'The Attlee Report', 'The Churchill Report'] } },
      { question: 'Which came first?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'The Beveridge Report, then the Labour government', distractors: ['The Labour government, then the Beveridge Report', 'The NHS, then the Beveridge Report', 'The Education Act, then the Beveridge Report'] } },
    ],
  },
  {
    id: 'f558', tag: 'Post-war', chapter: 3, verify: false, source: P1945,
    question: 'Who wrote Under Milk Wood?',
    answer: 'Dylan Thomas',
    explanation: {
      lead: 'Dylan Thomas, the Welsh poet, wrote Under Milk Wood.',
      versus: 'Thomas is Welsh; Robert Burns is Scottish. Both are national poets in the handbook and both are in the same part of the chapter.',
      why: 'His other famous work is "Do not go gentle into that good night", and the handbook names both — one a play for voices, one a poem.',
    },
    forms: [
      { question: 'Who wrote Under Milk Wood?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Dylan Thomas', distractors: ['Robert Burns', 'Rudyard Kipling', 'William Wordsworth'] } },
      { question: 'Which nationality was the poet Dylan Thomas?', mcqOnly: false,
        answers: { kind: 'fixed', correct: 'Welsh', distractors: ['Scottish', 'Irish', 'English'] } },
      { question: 'Which work is by Dylan Thomas?', mcqOnly: true,
        answers: { kind: 'fixed', correct: 'Do not go gentle into that good night', distractors: ['Auld Lang Syne', 'The Planets', 'Land of Hope and Glory'] } },
    ],
  },
];
