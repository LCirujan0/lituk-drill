/**
 * The chronology — scope line S9 (D-016), restructured under C3.
 *
 * A static reference, not scheduled and not scored. Its value is being read end to end: a
 * timeline is a different cognitive tool from the same material broken into individually
 * scheduled cards. Knowing roughly *where in the story* something sits answers a large share
 * of history questions on its own, and that shape only comes from seeing the whole.
 *
 * ## Three levels, because two were not enough
 *
 * `Era → Section → Event`. The era is the arc; the section is a named group inside it that
 * opens on its own. At 318 events a flat list per era is unusable — reaching one part of the
 * twentieth century would mean taking all of it — and the collapsed view is the one that
 * teaches the sequence, so it has to stay short.
 *
 * `figures` names the people the handbook itself names, each with the one thing it remembers
 * them for; that is the discrimination the drill cards keep testing, gathered in one place
 * instead of scattered across forty of them. They render as cards rather than as timeline
 * rows, because the handbook usually gives them no date and what matters is the act.
 *
 * ## Sourcing
 *
 * Everything here comes from the handbook, including its own "Key Material and Facts" summary.
 * **The same hard rule as the explanations applies: no person, date or event the handbook does
 * not contain.** Where the book gives no date, none is invented — entries below say
 * "no date given" rather than supplying one.
 *
 * This file was generated ONCE, on 10 August 2026, and is hand-edited from here — the gate is
 * `tests/timeline.test.ts`, not the generator. Every era was harvested from the handbook text with
 * its supporting sentence quoted, adversarially re-checked by a second pass whose brief was to
 * refute it, repaired against those findings, and finally run through the vocabulary year
 * check — which had never in this project's life been pointed at the chronology. It found
 * "2019" for Boris Johnson succeeding May, a year appearing nowhere in the handbook, sitting
 * in the one file nothing had ever scanned. The evidence quotes are discarded at this step;
 * the handbook is Crown copyright and is never committed.
 *
 * 11 eras · 40 sections · 318 events · 117 people.
 */

export interface TimelineEvent {
  readonly year: string;
  readonly title: string;
  readonly detail: string;
  /** Worth knowing cold. Marked on screen. */
  readonly major: boolean;
}

/** A named group inside an era. Opens on its own, so an era can be read in parts. */
export interface Section {
  readonly name: string;
  /** Why these belong together. Shown under the heading, so the grouping justifies itself. */
  readonly why: string;
  readonly events: readonly TimelineEvent[];
}

/** Someone the handbook names, and the one thing it remembers them for. */
export interface Figure {
  readonly name: string;
  /** Only where the handbook gives them. Often it does not. */
  readonly when?: string;
  readonly known: string;
}

export interface Era {
  readonly name: string;
  /** Readable in the collapsed row, so the shape of the story shows without opening anything. */
  readonly span: string;
  readonly summary: string;
  readonly sections: readonly Section[];
  readonly figures?: readonly Figure[];
}

export const TIMELINE: readonly Era[] = [
  {
    name: "Before the Romans",
    span: "Stone Age - Iron Age",
    summary:
      "Three ages named for their materials, with only three dates between them: the Stone Age of the hunter-gatherers and then the first farmers, the Bronze Age from around 4,000 years ago, and an undated Iron Age. It ends with the first coins minted in Britain, which the handbook calls the beginnings of British history.",
    sections: [
      {
        name: "The Stone Age",
        why: "Two different kinds of people, both inside one age: the hunter-gatherers who came and went across the land bridge, and the first farmers who arrived about 6,000 years ago and built houses, tombs and monuments. Stonehenge and Skara Brae belong here, among the Stone Age sites — that is the point most easily lost.",
        events: [
          { year: "no date given", title: "The first people in Britain are hunter-gatherers", detail: "For much of the Stone Age a land bridge connected Britain to the continent. People came and went across it, following the herds of deer and horses which they hunted.", major: false },
          { year: "about 10,000 years ago", title: "Britain is permanently separated from the continent", detail: "Britain becomes permanently separated from the continent by the Channel. The land bridge is gone.", major: true },
          { year: "about 6,000 years ago", title: "The first farmers arrive", detail: "Their ancestors probably came from south-east Europe. They built houses, tombs and monuments on the land.", major: true },
          { year: "no date given", title: "Stonehenge", detail: "One of the monuments built by the first farmers. It still stands in what is now the English county of Wiltshire, and was probably a special gathering place for seasonal ceremonies. The handbook places it among the Stone Age sites.", major: false },
          { year: "no date given", title: "Skara Brae", detail: "On Orkney, off the north coast of Scotland. The best preserved prehistoric village in northern Europe; it has helped archaeologists understand more about how people lived near the end of the Stone Age.", major: false },
        ],
      },
      {
        name: "The Bronze Age",
        why: "One age, one material. Around 4,000 years ago people learned to make bronze, and what the handbook gives about them is three things: where they lived, how they buried their dead, and what they made.",
        events: [
          { year: "around 4,000 years ago", title: "People learn to make bronze", detail: "The handbook calls this period the Bronze Age. It follows the Stone Age and is itself followed by the Iron Age.", major: true },
          { year: "no date given", title: "Roundhouses and round barrows", detail: "People lived in roundhouses and buried their dead in tombs called round barrows. Roundhouses carry on into the Iron Age — the handbook says people still lived in them then.", major: false },
          { year: "no date given", title: "Accomplished metalworkers", detail: "The people of the Bronze Age were accomplished metalworkers, making many beautiful objects in bronze and gold — tools, ornaments and weapons.", major: false },
        ],
      },
      {
        name: "The Iron Age",
        why: "The last stretch before the Romans, and the one the handbook gives no date for at all — it is placed only as following the Bronze Age. It ends with the first coins minted in Britain, which the handbook says marks the beginnings of British history.",
        events: [
          { year: "no date given", title: "The Iron Age follows the Bronze Age", detail: "People learned how to make weapons and tools out of iron. The handbook gives no year for the change — only that it came after the Bronze Age.", major: false },
          { year: "no date given", title: "Hill forts, and Maiden Castle", detail: "People still lived in roundhouses, grouped together into larger settlements and sometimes defended sites called hill forts. A very impressive hill fort can still be seen today at Maiden Castle, in the English county of Dorset.", major: false },
          { year: "no date given", title: "Farmers, craft workers or warriors", detail: "What most Iron Age people were. The handbook calls their culture and economy sophisticated.", major: false },
          { year: "no date given", title: "The language was part of the Celtic language family", detail: "Similar languages were spoken across Europe in the Iron Age, and related languages are still spoken today in some parts of Wales, Scotland and Ireland.", major: false },
          { year: "no date given", title: "The first coins minted in Britain", detail: "The Iron Age people made them, some inscribed with the names of Iron Age kings. The handbook says this marks the beginnings of British history.", major: true },
        ],
      },
    ],
  },
  {
    name: "Rome",
    span: "55 BC – AD 410",
    summary:
      "Two invasions: Julius Caesar's in 55 BC fails, and Britain stays separate from the Roman Empire for nearly 100 years; the Emperor Claudius's in AD 43 succeeds, and the Romans occupy almost all of Britain — never the areas that are now Scotland, whose Picts Hadrian's wall in the north of England was built to keep out. Roman rule runs from 43 to 410 AD, about 400 years, ending when the army leaves to defend other parts of the empire and never returns.",
    sections: [
      {
        name: "The two invasions",
        why: "Caesar's invasion and Claudius's are the pair that gets confused — one unsuccessful in 55 BC, one successful in AD 43 — so they belong side by side rather than scattered. Boudicca sits with them because the handbook puts her resistance in the same breath as the conquest.",
        events: [
          { year: "55 BC", title: "Julius Caesar invades — and fails", detail: "A Roman invasion of Britain led by Julius Caesar, and it is unsuccessful. Britain then remains separate from the Roman Empire for nearly 100 years.", major: true },
          { year: "AD 43", title: "The Emperor Claudius leads a new invasion", detail: "A new invasion, this time led by the Emperor Claudius at the head of the Roman army. Some British tribes resist, but the Romans succeed in occupying almost all of Britain.", major: true },
          { year: "no date given", title: "Boudicca fights the Romans", detail: "Boudicca, the queen of the Iceni in what is now eastern England, is one of the tribal leaders who fought against the Romans. She is still remembered today, and there is a statue of her on Westminster Bridge in London, near the Houses of Parliament.", major: false },
        ],
      },
      {
        name: "The frontier Rome never crossed",
        why: "Everything here follows from the one place the conquest stopped — the wall, its forts and its purpose only make sense once you know what was never taken.",
        events: [
          { year: "no date given", title: "Rome never conquers what is now Scotland", detail: "Almost all of Britain is occupied, but areas of what is now Scotland are never conquered by the Romans.", major: false },
          { year: "no date given", title: "The Emperor Hadrian builds a wall in the north of England", detail: "Built on the orders of the Roman Emperor Hadrian to keep out the Picts — the ancestors of the Scottish people, who lived in what is now Scotland — with a number of forts included in it.", major: true },
          { year: "no date given", title: "Housesteads and Vindolanda can still be seen", detail: "Parts of Hadrian's Wall survive, including the forts of Housesteads and Vindolanda. It is a popular area for walkers and is a UNESCO World Heritage Site.", major: false },
        ],
      },
      {
        name: "Four hundred years, and the leaving",
        why: "These are the claims about the whole occupation rather than about a single year — how long it lasted, what it put into Britain, and how it ended.",
        events: [
          { year: "43-410 AD", title: "The Romans rule Britain for about 400 years", detail: "The Romans ruled Britain from 43 to 410 AD — approximately 400 years. They remained in Britain for 400 years.", major: false },
          { year: "no date given", title: "Roads, public buildings, a structure of law, new plants and animals", detail: "What the Romans put into Britain across those 400 years: they built roads and public buildings, created a structure of law, and introduced new plants and animals.", major: false },
          { year: "3rd and 4th centuries AD", title: "The first Christian communities appear", detail: "The first Christian communities begin to appear in Britain during the 3rd and 4th centuries AD.", major: false },
          { year: "AD 410", title: "The Roman army leaves and never returns", detail: "The Roman army leaves Britain to defend other parts of the Roman Empire, and never returns. Britain is then invaded again by tribes from northern Europe: the Jutes, the Angles and the Saxons.", major: true },
        ],
      },
    ],
    figures: [
      { name: "Julius Caesar", when: "55 BC", known: "Led the Roman invasion that was unsuccessful — after it, Britain remained separate from the Roman Empire for nearly 100 years." },
      { name: "Emperor Claudius", when: "AD 43", known: "Led the Roman army in a new invasion: some British tribes resisted, but the Romans were successful in occupying almost all of Britain." },
      { name: "Boudicca", known: "Queen of the Iceni in what is now eastern England, and one of the tribal leaders who fought against the Romans. Her statue stands on Westminster Bridge in London, near the Houses of Parliament." },
      { name: "Emperor Hadrian", known: "Roman Emperor on whose orders the wall was built in the north of England, with a number of forts included in it, to keep out the Picts — the ancestors of the Scottish people." },
    ],
  },
  {
    name: "Anglo-Saxons and Vikings",
    span: "AD 410 - 1066",
    summary:
      "The Roman army leaves in AD 410, Britain is invaded by the Jutes, Angles and Saxons, and by about AD 600 their kingdoms are established in Britain, mainly in what is now England, with much of Wales and Scotland free of their rule. During this period missionaries preach Christianity — from Ireland in the north, from Rome in the south — and from AD 789 the Vikings raid and then settle, until the Anglo-Saxon kingdoms in England unite under Alfred the Great and the north unites under Kenneth MacAlpin.",
    sections: [
      {
        name: "Invasion and the English kingdoms",
        why: "Everything that follows the Romans leaving — who invaded, when their kingdoms were established, where Anglo-Saxon rule did not reach, and the two things this era leaves behind in the deck: the languages behind modern English, and a king's ship burial.",
        events: [
          { year: "AD 410", title: "The Roman army leaves; the Jutes, Angles and Saxons invade", detail: "The Roman army left Britain in AD 410 to defend other parts of the Roman Empire and never returned. Britain was again invaded by tribes from northern Europe: the Jutes, the Angles and the Saxons. The languages they spoke are the basis of modern-day English.", major: true },
          { year: "by about AD 600", title: "Anglo-Saxon kingdoms are established", detail: "Battles were fought against these invaders but, by about AD 600, Anglo-Saxon kingdoms were established in Britain. These kingdoms were mainly in what is now England.", major: true },
          { year: "no date given", title: "Wales and Scotland stay outside Anglo-Saxon rule", detail: "Parts of the west of Britain, including much of what is now Wales, and Scotland, remained free of Anglo-Saxon rule.", major: false },
          { year: "no date given", title: "Sutton Hoo", detail: "The burial place of one of the kings was at Sutton Hoo in modern Suffolk. This king was buried with treasure and armour, all placed in a ship which was then covered by a mound of earth.", major: false },
          { year: "no date given", title: "Beowulf", detail: "The Anglo-Saxon poem Beowulf tells of its hero's battles against monsters and is still translated into modern English.", major: false },
        ],
      },
      {
        name: "Christianity arrives for the second time",
        why: "The conversion runs on its own track, with its own geography: missionaries from Ireland spread the religion in the north, and St Augustine's missionaries from Rome spread it in the south.",
        events: [
          { year: "no date given", title: "The Anglo-Saxons arrive as non-Christians", detail: "The Anglo-Saxons were not Christians when they first came to Britain, but during this period missionaries came to Britain to preach about Christianity.", major: false },
          { year: "no date given", title: "Missionaries from Ireland spread the religion in the north", detail: "The most famous of these were St Patrick, who would become the patron saint of Ireland, and St Columba, who founded a monastery on the island of Iona, off the coast of what is now Scotland.", major: false },
          { year: "no date given", title: "St Augustine leads missionaries from Rome, and becomes the first Archbishop of Canterbury", detail: "St Augustine led missionaries from Rome, who spread Christianity in the south. He became the first Archbishop of Canterbury. Ireland's missionaries went to the north; Rome's went to the south.", major: true },
        ],
      },
      {
        name: "The Vikings, Alfred, and the naming of Scotland",
        why: "The Vikings raid, then settle: the Danelaw and a short period of Danish kings. England unites under Alfred, and in the north the threat of Viking attack encourages unity under Kenneth MacAlpin, after which the term Scotland begins to be used.",
        events: [
          { year: "AD 789", title: "The Vikings first visit Britain", detail: "The Vikings came from Denmark and Norway. They first visited Britain in AD 789 to raid coastal towns and take away goods and slaves.", major: true },
          { year: "no date given", title: "They begin to settle", detail: "Then they began to stay and form their own communities in the east of England and Scotland.", major: false },
          { year: "no date given", title: "Alfred the Great unites the kingdoms and defeats the Vikings", detail: "The Anglo-Saxon kingdoms in England united under King Alfred the Great, who defeated the Vikings.", major: true },
          { year: "no date given", title: "The Danelaw", detail: "Many of the Viking invaders stayed in Britain, especially in the east and north of England, in an area known as the Danelaw. Many place names there, such as Grimsby and Scunthorpe, come from the Viking languages.", major: false },
          { year: "no date given", title: "The settlers mix in, and some convert", detail: "The Viking settlers mixed with local communities and some converted to Christianity.", major: false },
          { year: "no date given", title: "Cnut, the first of the Danish kings", detail: "Anglo-Saxon kings continued to rule what is now England, except for a short period when there were Danish kings. The first of these was Cnut, also called Canute.", major: false },
          { year: "no date given", title: "Kenneth MacAlpin unites the north, and Scotland gets its name", detail: "In the north, the threat of attack by Vikings had encouraged the people to unite under one king, Kenneth MacAlpin. The term Scotland began to be used to describe that country.", major: false },
        ],
      },
    ],
    figures: [
      { name: "Alfred the Great", when: "no date given", known: "The Anglo-Saxon kingdoms in England united under him, and he defeated the Vikings." },
      { name: "St Augustine", when: "no date given", known: "Led missionaries from Rome, who spread Christianity in the south. He became the first Archbishop of Canterbury." },
      { name: "St Columba", when: "no date given", known: "Founded a monastery on the island of Iona, off the coast of what is now Scotland; one of the two most famous of the missionaries from Ireland who spread the religion in the north. Note that the handbook's own Key Facts summary contradicts its body text and lists him with St Augustine as leading missionaries from Rome." },
      { name: "St Patrick", when: "no date given", known: "One of the two most famous of the missionaries from Ireland who spread the religion in the north; he would become the patron saint of Ireland." },
      { name: "Cnut (also called Canute)", when: "no date given", known: "The first of the Danish kings who ruled during the short period that interrupted Anglo-Saxon rule of what is now England." },
      { name: "Kenneth MacAlpin", when: "no date given", known: "The one king the people of the north united under, encouraged by the threat of attack by Vikings; the term Scotland then began to be used to describe that country." },
    ],
  },
  {
    name: "The hinge",
    span: "1066",
    summary:
      "One year that the handbook treats as a boundary. William, Duke of Normandy, defeats Harold at the Battle of Hastings and becomes king of England — the last successful foreign invasion of England. What the Normans install afterwards (the Domesday Book, feudalism, Norman French) and the period the conquest opens, the Middle Ages, run from here.",
    sections: [
      {
        name: "1066 — the battle and the crown",
        why: "One year carries the whole era: who fought, who died, who took the throne, and the embroidery that commemorates it.",
        events: [
          { year: "1066", title: "The Battle of Hastings", detail: "An invasion led by William, the Duke of Normandy (in what is now northern France), defeated Harold, the Saxon king of England, at the Battle of Hastings. Harold was killed in the battle.", major: true },
          { year: "1066", title: "William the Conqueror takes the English crown", detail: "William became king of England and is known as William the Conqueror.", major: false },
          { year: "1066", title: "The last successful foreign invasion of England", detail: "The Norman Conquest was the last successful foreign invasion of England, and it led to many changes in government and social structures in England.", major: true },
          { year: "no date given", title: "The Bayeux Tapestry", detail: "The battle is commemorated in a great piece of embroidery, known as the Bayeux Tapestry, which can still be seen in France today.", major: false },
        ],
      },
      {
        name: "How far the Normans actually got",
        why: "The conquest was of England. Wales was conquered and then territory gradually won back; Scotland was never invaded at all.",
        events: [
          { year: "no date given", title: "Wales: conquered, then won back", detail: "Initially the Normans also conquered Wales, but the Welsh gradually won territory back.", major: false },
          { year: "no date given", title: "Scotland: border fighting, but no invasion", detail: "The Scots and the Normans fought on the border between England and Scotland. The Normans took over some land on the border but did not invade Scotland.", major: false },
        ],
      },
      {
        name: "What the conquest installed",
        why: "The things the Normans left behind that the handbook still points at — a survey, a system of landholding, a language and a building — plus the period 1066 opens.",
        events: [
          { year: "no date given", title: "The Domesday Book", detail: "William sent people all over England to draw up lists of all the towns and villages. The people who lived there, who owned the land and what animals they owned were also listed. This was called the Domesday Book. It still exists today and gives a picture of society in England just after the Norman Conquest.", major: true },
          { year: "no date given", title: "Feudalism — land in return for war", detail: "The Normans used a system of land ownership known as feudalism. The king gave land to his lords in return for help in war, and landowners had to send certain numbers of men to serve in the army. Some peasants had their own land but most were serfs: they had a small area of their lord's land where they could grow food, and in return they had to work for their lord and could not move away.", major: false },
          { year: "no date given", title: "Feudalism in southern Scotland; clans in the north and in Ireland", detail: "The same system developed in southern Scotland. In the north of Scotland and Ireland, land was owned by members of the 'clans' (prominent families).", major: false },
          { year: "no date given", title: "Two languages combine into English", detail: "After the Norman Conquest the king and his noblemen had spoken Norman French and the peasants had continued to speak Anglo-Saxon. Gradually these two languages combined to become one English language. 'Park' and 'beauty' are based on Norman French words; 'apple', 'cow' and 'summer' on Anglo-Saxon words. There are often words with very similar meanings, one from French and one from Anglo-Saxon — 'demand' (French) and 'ask' (Anglo-Saxon).", major: false },
          { year: "no date given", title: "The Tower of London and the White Tower", detail: "The Tower of London was first built by William the Conqueror after he became king in 1066. The White Tower in the Tower of London is an example of a Norman castle keep, built on the orders of William the Conqueror. Tours are given by the Yeoman Warders, also known as Beefeaters, and the Crown Jewels can be seen there.", major: false },
          { year: "1066–1485", title: "The Middle Ages begin at the Norman Conquest", detail: "The period after the Norman Conquest up until about 1485 is called the Middle Ages (or the medieval period). It was a time of almost constant war.", major: false },
        ],
      },
    ],
    figures: [
      { name: "William, Duke of Normandy — William the Conqueror", when: "1066", known: "The Duke of Normandy, in what is now northern France. He defeated Harold at the Battle of Hastings, became king of England, and is known as William the Conqueror. He sent people all over England to draw up the lists that became the Domesday Book, and the Tower of London was first built by him after he became king." },
      { name: "Harold", when: "1066", known: "The Saxon king of England, defeated by William at the Battle of Hastings and killed in the battle." },
    ],
  },
  {
    name: "The Middle Ages — power leaks from the crown",
    span: "1066 - 1485",
    summary:
      "The period after the Norman Conquest up until about 1485, and a time of almost constant war: Wales annexed, Scotland left unconquered, a long war with France that ends with the English leaving in the 1450s. At home Magna Carta, the beginnings of Parliament and the Black Death all cut into what the king and his lords could take for granted, and the era closes in civil war between York and Lancaster.",
    sections: [
      {
        name: "Almost constant war",
        why: "The handbook opens the era by saying it was a time of almost constant war and then works outwards — the Welsh, the Scots and the Irish first, then the Crusades and France — so these are the wars against other peoples, kept apart from the civil war that closes the era.",
        events: [
          { year: "1066–1485", title: "What the Middle Ages are", detail: "The period after the Norman Conquest up until about 1485, also called the medieval period. The handbook's own one-line summary: constant war, including the Crusades and the Hundred Years War.", major: false },
          { year: "by 1200", title: "The English rule the Pale in Ireland", detail: "Ireland was an independent country at the beginning of the Middle Ages. The English first went as troops to help the Irish king and remained to build their own settlements; by 1200 they ruled an area of Ireland known as the Pale, around Dublin, and some important lords in other parts of Ireland accepted the authority of the English king.", major: false },
          { year: "1284", title: "The Statute of Rhuddlan annexes Wales", detail: "King Edward I of England introduces the Statute of Rhuddlan, which annexes Wales to the Crown of England. Huge castles, including Conwy and Caernarvon, were built to maintain this power.", major: true },
          { year: "1314", title: "The Battle of Bannockburn", detail: "The Scottish, led by Robert the Bruce, defeat the English and Scotland remains unconquered by the English. The discriminating pair: in Wales the English were able to establish their rule, in Scotland the English kings were less successful.", major: true },
          { year: "no date given", title: "The Crusades", detail: "Many knights took part in the Crusades, in which European Christians fought for control of the Holy Land. One of the two wars the handbook's era summary names.", major: false },
          { year: "no date given", title: "The Hundred Years War", detail: "A long war with France — and despite the name it actually lasted 116 years. The handbook gives no start or end year for it.", major: true },
          { year: "1415", title: "The Battle of Agincourt", detail: "King Henry V's vastly outnumbered English army defeats the French. One of the most famous battles of the Hundred Years War.", major: true },
          { year: "by the middle of the 15th century", title: "The last Welsh rebellions are defeated", detail: "English rule in Wales is settled: English laws and the English language are introduced.", major: false },
          { year: "the 1450s", title: "The English leave France", detail: "Agincourt was won in 1415 and France was left in the 1450s — the winning battle and the losing war are the pair that gets muddled.", major: false },
        ],
      },
      {
        name: "Land, plague and the limits of the king",
        why: "The handbook's two chapters on who actually held power — how land was owned, what the plague did to that arrangement, and the first written limits on the king — which together are the transfer of power the era is named for.",
        events: [
          { year: "no date given", title: "Feudalism", detail: "The Normans' system of land ownership. The king gave land to his lords in return for help in war, and landowners had to send certain numbers of men to serve in the army. Some peasants had their own land but most were serfs: they had a small area of their lord's land to grow food, had to work for their lord in return, and could not move away.", major: false },
          { year: "no date given", title: "Where feudalism did not reach — the clans", detail: "The same system developed in southern Scotland. In the north of Scotland and Ireland, land was owned by members of the 'clans' — prominent families.", major: false },
          { year: "1215", title: "Magna Carta", detail: "There were few formal limits to the king's power until this year. King John is forced by his noblemen to agree to a number of demands; the result is a charter of rights called the Magna Carta, which means the Great Charter. It established the idea that even the king was subject to the law, protected the rights of the nobility and restricted the king's power to collect taxes or to make or change laws; in future the king would need to involve his noblemen in decisions.", major: true },
          { year: "1348", title: "The Black Death", detail: "A disease, probably a form of plague, comes to Britain. One third of the population of England died and a similar proportion in Scotland and Wales — one of the worst disasters ever to strike Britain.", major: true },
          { year: "no date given", title: "What the Black Death changed", detail: "Following it, the smaller population meant there was less need to grow cereal crops. There were labour shortages and peasants began to demand higher wages. New social classes appeared, including owners of large areas of land — later called the gentry — and people left the countryside to live in the towns, where growing wealth led to the development of a strong middle class.", major: false },
          { year: "no date given", title: "The Black Death shrinks the Pale", detail: "In Ireland the Black Death killed many in the Pale and, for a time, the area controlled by the English became smaller.", major: false },
          { year: "no date given", title: "Parliament begins in the king's council", detail: "Its origins can be traced to the king's council of advisers, which included important noblemen and the leaders of the Church. In England, parliaments were called for the king to consult his nobles, particularly when the king needed to raise money.", major: false },
          { year: "no date given", title: "Two Houses are established", detail: "The numbers attending Parliament increased and two separate parts, known as Houses, were established. The nobility, great landowners and bishops sat in the House of Lords; knights, usually smaller landowners, and wealthy people from towns and cities were elected to sit in the House of Commons. Only a small part of the population was able to join in electing the members of the Commons.", major: false },
          { year: "no date given", title: "Scotland's Parliament had three Estates", detail: "A similar Parliament developed in Scotland, but with three Houses called Estates: the lords, the commons and the clergy. Two Houses in England, three Estates in Scotland.", major: false },
          { year: "no date given", title: "Common law in England, codified law in Scotland", detail: "The principle that judges are independent of the government began to be established. In England judges developed 'common law' by a process of precedence — following previous decisions — and tradition; in Scotland the legal system developed slightly differently and laws were 'codified', that is, written down.", major: false },
        ],
      },
      {
        name: "A distinct identity",
        why: "The handbook's own heading for the stretch where the two languages left by the Conquest combine into English and the country acquires the books, buildings and trade of what the handbook calls a national culture and identity.",
        events: [
          { year: "no date given", title: "Norman French and Anglo-Saxon combine into English", detail: "After the Norman Conquest the king and his noblemen had spoken Norman French and the peasants had continued to speak Anglo-Saxon; gradually these two languages combined to become one English language. 'Park' and 'beauty' are based on Norman French; 'apple', 'cow' and 'summer' on Anglo-Saxon. There are often words with very similar meanings, one from each — 'demand' (French) and 'ask' (Anglo-Saxon).", major: false },
          { year: "by 1400", title: "English becomes the language of government", detail: "In England official documents were being written in English, and English had become the preferred language of the royal court and Parliament.", major: false },
          { year: "the years leading up to 1400", title: "Chaucer writes The Canterbury Tales", detail: "Geoffrey Chaucer wrote a series of poems in English about a group of people going to Canterbury on a pilgrimage, who decided to tell each other stories on the journey.", major: false },
          { year: "no date given", title: "William Caxton prints the first books in England", detail: "The Canterbury Tales was one of the first books to be printed by William Caxton, the first person in England to print books using a printing press. The handbook gives no year for it.", major: false },
          { year: "no date given", title: "Sir Gawain and the Green Knight", detail: "The second poem the handbook names as surviving from the Middle Ages, about one of the knights at the court of King Arthur. Chaucer's Canterbury Tales is the other.", major: false },
          { year: "no date given", title: "The Scots language, and John Barbour", detail: "In Scotland many people continued to speak Gaelic, and the Scots language also developed. A number of poets began to write in Scots — John Barbour wrote The Bruce, about the Battle of Bannockburn.", major: false },
          { year: "no date given", title: "Castles and cathedrals", detail: "Castles were built in many places in Britain and Ireland, partly for defence; today many are in ruins, although some, such as Windsor and Edinburgh, are still in use. Great cathedrals were built too — Durham, Lincoln, Canterbury and Salisbury — and several had windows of stained glass telling stories about the Bible and Christian saints. The glass in York Minster is a famous example.", major: false },
          { year: "no date given", title: "Medieval art was religious", detail: "Most art had a religious theme, particularly wall paintings in churches and illustrations in religious books. Much of this was lost after the Protestant Reformation.", major: false },
          { year: "no date given", title: "England as a trading nation — wool, and skilled incomers", detail: "England was an important trading nation and English wool became a very important export. People came to England from abroad to trade and also to work; many had special skills, such as weavers from France, engineers from Germany, glass manufacturers from Italy and canal builders from Holland.", major: false },
        ],
      },
      {
        name: "The Wars of the Roses",
        why: "The handbook gives this its own heading and its own 'check that you understand' bullet — the Wars of the Roses and the founding of the House of Tudor — so it belongs apart from the wars fought against other peoples.",
        events: [
          { year: "1455", title: "The Wars of the Roses begin", detail: "A civil war is begun to decide who should be king of England, fought between the supporters of two families: the House of Lancaster, whose symbol was a red rose, and the House of York, whose symbol was a white rose.", major: true },
          { year: "1485", title: "The Battle of Bosworth Field", detail: "The war ends. King Richard III of the House of York is killed in the battle, and Henry Tudor, the leader of the House of Lancaster, becomes King Henry VII — the first king of the House of Tudor.", major: true },
          { year: "no date given", title: "The Tudor rose", detail: "Henry then married King Richard's niece, Elizabeth of York, and united the two families. The symbol of the House of Tudor was a red rose with a white rose inside it — the way round that gets confused — as a sign that the Houses of York and Lancaster were now allies.", major: false },
        ],
      },
    ],
    figures: [
      { name: "King John", when: "1215", known: "Forced by his noblemen to agree to the demands that became Magna Carta. There were few formal limits to the king's power until 1215." },
      { name: "King Edward I of England", when: "1284", known: "Introduced the Statute of Rhuddlan, which annexed Wales to the Crown of England. Huge castles, including Conwy and Caernarvon, were built to maintain this power." },
      { name: "Robert the Bruce", when: "1314", known: "Led the Scottish to defeat the English at the Battle of Bannockburn, after which Scotland remained unconquered by the English." },
      { name: "King Henry V", when: "1415", known: "His vastly outnumbered English army defeated the French at the Battle of Agincourt." },
      { name: "Geoffrey Chaucer", when: "the years leading up to 1400", known: "Wrote The Canterbury Tales in English — poems about a group of people going to Canterbury on a pilgrimage, telling each other stories on the journey." },
      { name: "William Caxton", known: "The first person in England to print books using a printing press; The Canterbury Tales was one of the first books he printed." },
      { name: "John Barbour", known: "Wrote The Bruce, about the Battle of Bannockburn — the handbook's example of a poet writing in the Scots language." },
      { name: "King Richard III", when: "1485", known: "Of the House of York; killed at the Battle of Bosworth Field, which ended the Wars of the Roses." },
      { name: "Henry Tudor, King Henry VII", when: "1485", known: "Leader of the House of Lancaster; became King Henry VII after the Battle of Bosworth Field, and was the first king of the House of Tudor." },
      { name: "Elizabeth of York", known: "King Richard III's niece; Henry VII married her and united the two families." },
    ],
  },
  {
    name: "Tudors and the Reformation",
    span: "1485 - 1603",
    summary:
      "Henry VII wins at Bosworth and founds the House of Tudor; his son Henry VIII marries six times and breaks with the Church of Rome to get his divorce. Henry's three children then swing the country strongly Protestant, devoutly Catholic and Protestant again, and when Elizabeth I dies in 1603 without children her throne passes to the king of Scots.",
    sections: [
      {
        name: "The break with Rome",
        why: "The two kings who built Tudor power, and the divorce that took England out of the Roman Church — the religious split the rest of the chapter turns on.",
        events: [
          { year: "1485", title: "Henry VII founds the House of Tudor", detail: "Richard III of York was killed at Bosworth Field and Henry Tudor of Lancaster became king, marrying Richard's niece Elizabeth of York to unite the two families. As king he strengthened central administration, reduced the power of the nobles, and built up the monarchy's financial reserves. His son Henry VIII continued the policy of centralising power.", major: false },
          { year: "no date given", title: "Henry VIII breaks with the Church of Rome", detail: "He needed the Pope's approval to divorce his first wife. The Pope refused, so Henry established the Church of England — in which the king, not the Pope, appoints bishops and orders how people worship. The handbook gives no year for it.", major: true },
          { year: "no date given", title: "The six wives, in order", detail: "Catherine of Aragon, a Spanish princess, divorced — her surviving child was Mary. Anne Boleyn, English, executed at the Tower of London — her daughter was Elizabeth. Jane Seymour gave him the son he wanted, Edward, and died shortly after the birth. Anne of Cleves, a German princess, married for political reasons and divorced soon after. Catherine Howard, Anne Boleyn's cousin, also executed. Catherine Parr, a widow, survived him.", major: true },
          { year: "16th century", title: "The Reformation across Europe", detail: "A movement against the authority of the Pope and the ideas and practices of the Roman Catholic Church, happening at the same time as Henry's break. Protestants formed their own churches, read the Bible in their own languages instead of Latin, did not pray to saints or at shrines, and held that a person's own relationship with God mattered more than submitting to the authority of the Church. Protestant ideas gradually gained strength in England, Wales and Scotland during the 16th century.", major: false },
          { year: "1530s", title: "The Church of England dates from here", detail: "The handbook's only date for the English Reformation. The Church of England is a Protestant Church, the official Church of the state in England, and has existed since the Reformation in the 1530s. The monarch is the head of the Church of England.", major: false },
          { year: "1500s", title: "The Act for the Government of Wales", detail: "Unites England and Wales. The Welsh sent representatives to the House of Commons and the Welsh legal system was reformed. The chapter puts it in Henry VIII's reign; the handbook's own summary list attributes it to Henry VII.", major: true },
          { year: "no date given", title: "What the Reformation did to British art", detail: "Medieval art in Britain was mostly religious — wall paintings in churches, illustrations in religious books. Much of it was lost after the Protestant Reformation, and wealthy families began to collect other paintings and sculptures instead. Many painters working in Britain in the 16th and 17th centuries came from abroad, Hans Holbein among them.", major: false },
        ],
      },
      {
        name: "Three children, three religions",
        why: "Henry VIII's son and two daughters each took the country a different way, and it is the order — strongly Protestant, devoutly Catholic, Protestant again — that gets muddled rather than the people.",
        events: [
          { year: "no date given", title: "Edward VI — strongly Protestant", detail: "Henry VIII's son by Jane Seymour, and his successor. During his reign the Book of Common Prayer was written for use in the Church of England, and a version is still used in some churches today. He died at the age of 15, after ruling just over six years.", major: false },
          { year: "no date given", title: "Mary — 'Bloody Mary'", detail: "Edward's half-sister and Catherine of Aragon's daughter. A devout Catholic who persecuted Protestants, which is how she got the name. She also died after a short reign, and the next monarch was her half-sister Elizabeth.", major: false },
          { year: "no date given", title: "Elizabeth I re-establishes the Church of England", detail: "Mary's half-sister, daughter of Henry VIII and Anne Boleyn, and a Protestant. She made the Church of England the official Church again: everyone had to attend their local church and there were laws about services and prayers, but she did not ask about people's real beliefs. By finding a balance between the views of Catholics and the more extreme Protestants she avoided any serious religious conflict within England.", major: true },
        ],
      },
      {
        name: "Elizabeth's England",
        why: "Everything the reign is remembered for apart from religion — the invasion that failed, the first ships and settlers, the drama, and a Parliament she could manage where James I and Charles I could not.",
        events: [
          { year: "1588", title: "The Spanish Armada is defeated", detail: "A large fleet sent by Spain to conquer England and restore Catholicism. Its defeat made Elizabeth one of the most popular monarchs in English history.", major: true },
          { year: "1500s", title: "The Elizabethan period", detail: "Known for growing patriotism — a feeling of pride in being English — expanded trade, and rich poetry and drama. That trio is how the handbook labels the era.", major: false },
          { year: "no date given", title: "Drake and the Golden Hind", detail: "Sir Francis Drake was one of the commanders in the defeat of the Armada and one of the founders of England's naval tradition. His ship, the Golden Hind, was one of the first to sail right around ('circumnavigate') the world. English explorers were seeking new trade routes and trying to expand British trade into the Spanish colonies in the Americas.", major: false },
          { year: "no date given", title: "English settlers first colonise the eastern coast of America", detail: "In Elizabeth I's time, English settlers first began to colonise the eastern coast of America. The colonisation greatly increased in the next century, particularly by people who disagreed with the religious views of the next two kings. The handbook gives no year for it.", major: false },
          { year: "1564–1616", title: "William Shakespeare", detail: "Born in Stratford-upon-Avon; a playwright and actor. A Midsummer Night's Dream, Hamlet, Macbeth and Romeo and Juliet are his most famous plays. He dramatised events from the past but did not focus solely on kings and queens — he was one of the first to portray ordinary Englishmen and women — and he invented many words still common today. The Globe Theatre in London is a modern copy of the theatres his plays were first performed in.", major: true },
          { year: "no date given", title: "Elizabeth manages Parliament", detail: "She was very skilled at it, balancing her wishes and views against those of the House of Lords and those of the House of Commons, which was increasingly Protestant in its views. James I and his son Charles I were less skilled politically.", major: false },
        ],
      },
      {
        name: "Scotland and Ireland",
        why: "The other two kingdoms took the Reformation differently — Scotland Protestant by act of its own Parliament, Ireland almost entirely Catholic and held down by force — and the Scottish thread ends with its king inheriting England in 1603.",
        events: [
          { year: "1560", title: "The Scottish Parliament abolishes the authority of the Pope", detail: "The predominantly Protestant Scottish Parliament made Roman Catholic religious services illegal. A Protestant Church of Scotland was established but, unlike in England, this was not a state Church.", major: true },
          { year: "no date given", title: "Mary, Queen of Scots", detail: "Mary Stuart was a Catholic and only a week old when her father died and she became queen. Much of her childhood was spent in France. When her husband was murdered she was suspected of involvement and fled to England, giving her throne to her Protestant son James VI. Elizabeth — her cousin — suspected her of wanting to take over the English throne and kept her a prisoner for 20 years. She was eventually executed, accused of plotting against Elizabeth. The handbook gives no year for the execution.", major: false },
          { year: "no date given", title: "Henry VIII takes the title 'King of Ireland'", detail: "Ireland was an almost completely Catholic country. Henry VII and Henry VIII extended English control outside the Pale and established English authority over the whole country. English laws were introduced and local leaders were expected to follow the instructions of the Lord Lieutenants in Dublin. Ireland had the same monarch as England and Wales from Henry VIII on, but remained a separate country.", major: false },
          { year: "no date given", title: "Irish rebellion, and the Ulster plantations", detail: "English attempts to impose Protestantism, alongside efforts to introduce the English system of laws about the inheritance of land, led to rebellion from the Irish chieftains and much brutal fighting. During the reigns of Elizabeth I and James I the English government encouraged Scottish and English Protestants to settle in Ulster, the northern province of Ireland, taking over the land from Catholic landholders. These settlements were known as plantations.", major: false },
          { year: "1603", title: "Elizabeth dies and the Scottish king inherits England", detail: "She never married and so had no children of her own to inherit her throne. Her heir was her cousin James VI of Scotland, who became King James I of England, Wales and Ireland — but Scotland remained a separate country, and the kingdoms are not united until the Act of Union of 1707.", major: true },
        ],
      },
    ],
    figures: [
      { name: "Henry VII", when: "1485", known: "Won Bosworth, married Elizabeth of York and founded the House of Tudor; then reduced the nobles' power, strengthened central administration and built up the crown's financial reserves." },
      { name: "Richard III", when: "1485", known: "The York king killed at Bosworth Field, which ended the Wars of the Roses and put the Tudors on the throne." },
      { name: "Henry VIII", known: "Married six times and broke away from the Church of Rome so he could get a divorce; in the new Church of England the king, not the Pope, appoints bishops and orders how people worship. Wives in order: Catherine of Aragon, Anne Boleyn, Jane Seymour, Anne of Cleves, Catherine Howard, Catherine Parr. Wales was united with England under his rule, and he took the title 'King of Ireland'." },
      { name: "Edward VI", known: "Henry VIII's strongly Protestant son, in whose reign the Book of Common Prayer was written for the Church of England. Died at 15, after ruling just over six years." },
      { name: "Mary I ('Bloody Mary')", known: "The devout Catholic queen who persecuted Protestants — which is where the nickname comes from. Catherine of Aragon's daughter, and Edward's half-sister." },
      { name: "Elizabeth I", when: "died 1603", known: "Re-established the Church of England as the official Church and found a balance between Catholics and the more extreme Protestants, avoiding serious religious conflict; the Armada was defeated under her in 1588." },
      { name: "Mary, Queen of Scots (Mary Stuart)", known: "Catholic queen of Scotland from a week old; fled to England after her husband's murder, was kept prisoner by her cousin Elizabeth for 20 years, and was executed, accused of plotting against her." },
      { name: "Sir Francis Drake", known: "A commander in the defeat of the Spanish Armada and a founder of England's naval tradition; his ship the Golden Hind was one of the first to sail right around the world." },
      { name: "William Shakespeare", when: "1564–1616", known: "Playwright and actor from Stratford-upon-Avon — Hamlet, Macbeth, Romeo and Juliet, A Midsummer Night's Dream — who was one of the first to portray ordinary Englishmen and women rather than focusing solely on kings and queens, and who invented many English words still common today. He also wrote sonnets, poems which must be 14 lines long." },
      { name: "James VI of Scotland", when: "from 1603", known: "Mary, Queen of Scots' Protestant son, who inherited Elizabeth's throne in 1603 and became King James I of England, Wales and Ireland while Scotland remained a separate country." },
    ],
  },
  {
    name: "Stuarts, civil war, revolution",
    span: "1603 - 1714",
    summary:
      "A Scottish king inherits England, and the belief that a king need not answer to Parliament ends in civil war, the execution of Charles I, and the only period in England's history without a monarch. The monarchy comes back, but the Glorious Revolution and the Bill of Rights permanently change the balance of power, and the Act of Union creates the Kingdom of Great Britain.",
    sections: [
      {
        name: "James I and the Divine Right",
        why: "Everything before a shot is fired: the Scottish king who inherits England, and the doctrine he and his son used to justify ruling without Parliament — the quarrel that runs into the war that follows.",
        events: [
          { year: "1603", title: "Elizabeth I dies and James VI of Scotland becomes James I", detail: "Elizabeth I never married and so had no children of her own to inherit her throne. When she died her heir was her cousin James VI of Scotland. He became King James I of England, Wales and Ireland — but Scotland remained a separate country.", major: true },
          { year: "1605", title: "Guy Fawkes and the plan to kill the Protestant king", detail: "A group of Catholics led by Guy Fawkes failed in their plan to kill the king with a bomb in the Houses of Parliament. It is the origin of Bonfire Night on 5 November. The handbook never uses the name \"Gunpowder Plot\" — it tells the story only under Bonfire Night.", major: true },
          { year: "1606", title: "The first Union Flag", detail: "Created from the flags of Scotland and England. The Welsh dragon does not appear on it because Wales was already united with England by then. Not to be confused with the later version, the symbol of the union with Ireland after the Act of Union of 1800.", major: false },
          { year: "no date given", title: "The King James Bible", detail: "One achievement of King James' reign was a new translation of the Bible into English, known as the 'King James Version' or the 'Authorised Version'. It was not the first English Bible but continues to be used in many Protestant churches today.", major: false },
          { year: "no date given", title: "The plantations in Ulster", detail: "During the reigns of Elizabeth I and James I the English government encouraged Scottish and English Protestants to settle in Ulster, the northern province of Ireland, taking over the land from Catholic landholders. These settlements were known as plantations; James later organised similar plantations in several other parts of Ireland.", major: false },
          { year: "no date given", title: "The Divine Right of Kings", detail: "James I and his son Charles I both believed the king was directly appointed by God to rule, and that he should be able to act without having to seek approval from Parliament. Elizabeth I had been very skilled at managing Parliament; they were less skilled politically.", major: false },
          { year: "no date given", title: "Charles I rules for eleven years without Parliament", detail: "When he could not get Parliament to agree with his religious and foreign policies, he tried to rule without Parliament at all. For 11 years he found ways to raise money without Parliament's approval, until trouble in Scotland meant he had to recall it. A different eleven years from the republic's.", major: false },
          { year: "no date given", title: "The revised Prayer Book and the Scottish army", detail: "Charles I wanted the worship of the Church of England to include more ceremony and introduced a revised Prayer Book. He tried to impose it on the Presbyterian Church in Scotland and this led to serious unrest. A Scottish army was formed, and Charles could not find the money he needed for his own army without the help of Parliament.", major: false },
          { year: "1640", title: "Parliament recalled — and the summary's date for the start of the Civil War", detail: "Charles recalled Parliament to ask it for funds. Many in Parliament were Puritans, a group of Protestants who advocated strict and simple religious doctrine and worship and disliked his reforms of the Church of England. Parliament refused the money even after the Scottish army invaded England. The handbook's key-facts summary dates the beginning of the English Civil War to 1640.", major: true },
        ],
      },
      {
        name: "Civil war and the only republic",
        why: "The fighting, the execution, and the single stretch in England's history with no monarch at all — the eleven years the handbook itself flags as the only one.",
        events: [
          { year: "1641", title: "Rebellion in Ireland, and Parliament demands the army", detail: "Another rebellion began in Ireland because the Roman Catholics there were afraid of the growing power of the Puritans. Parliament took the opportunity to demand control of the English army — a change that would have transferred substantial power from the king to Parliament.", major: false },
          { year: "no date given", title: "Charles I tries to arrest five MPs", detail: "He entered the House of Commons and tried to arrest five parliamentary leaders, but they had been warned and were not there. No monarch has set foot in the Commons since.", major: false },
          { year: "1642", title: "The fighting begins — Cavaliers against Roundheads", detail: "Civil war between the king and Parliament could not now be avoided and began in 1642. The country split into those who supported the king (the Cavaliers) and those who supported Parliament (the Roundheads). The handbook gives two dates for this war: its key-facts summary says 1640, its narrative says the fighting began in 1642.", major: true },
          { year: "no date given", title: "Marston Moor and Naseby", detail: "The two battles at which the king's army was defeated. The handbook names both and dates neither.", major: false },
          { year: "1646", title: "Parliament has won, and the king is a prisoner", detail: "By 1646 it was clear that Parliament had won the war. Charles was held prisoner by the parliamentary army, still unwilling to reach any agreement with it.", major: false },
          { year: "1649", title: "Charles I is executed and England becomes a republic", detail: "Still unwilling to reach any agreement with Parliament, he was executed in 1649. England declared itself a republic, called the Commonwealth. It no longer had a monarch.", major: true },
          { year: "no date given", title: "Cromwell in Ireland", detail: "One of the army's generals, Oliver Cromwell, was sent to Ireland, where the revolt that had begun in 1641 still continued and where there was still a Royalist army. He was successful in establishing the authority of the English Parliament but did this with such violence that even today he remains a controversial figure in Ireland.", major: false },
          { year: "no date given", title: "Dunbar and Worcester — the future Charles II defeated", detail: "The Scots had not agreed to the execution of Charles I and declared his son Charles II king; he was crowned king of Scotland and led a Scottish army into England. Cromwell defeated it at the Battles of Dunbar and Worcester. Charles II escaped from Worcester, famously hiding in an oak tree on one occasion, and eventually fled to Europe. Parliament now controlled Scotland as well as England and Wales.", major: false },
          { year: "1658", title: "Cromwell dies; Richard Cromwell cannot hold it together", detail: "After his campaign in Ireland and victory over Charles II at Worcester, Cromwell was recognised as leader of the new republic and given the title of Lord Protector, ruling until his death in 1658. His son Richard became Lord Protector in his place but was not able to control the army or the government.", major: false },
          { year: "no date given", title: "Eleven years as a republic", detail: "The handbook calls this the only period in history when England was a republic. Although Britain had been a republic for 11 years, without Oliver Cromwell there was no clear leader or system of government. Many people wanted stability, and began to talk about the need for a king.", major: true },
        ],
      },
      {
        name: "The Restoration",
        why: "Charles II back on the throne, and the four things the handbook places in the Restoration section: plague, fire, habeas corpus and the Royal Society.",
        events: [
          { year: "May 1660", title: "The Restoration", detail: "Parliament invited Charles II to come back from exile in the Netherlands, and he was crowned King Charles II of England, Wales, Scotland and Ireland. He made it clear he had 'no wish to go on his travels again', and understood he would sometimes need to reach agreement with Parliament. The Church of England again became the established official Church; both Roman Catholics and Puritans were kept out of power.", major: true },
          { year: "1665", title: "The Great Plague", detail: "During Charles II's reign there was a major outbreak of plague in London. Thousands of people died, especially in poorer areas.", major: true },
          { year: "no date given", title: "A great fire destroys much of London", detail: "The following year after the plague, a great fire destroyed much of the city, including many churches and St Paul's Cathedral. London was rebuilt with a new St Paul's, designed by the famous architect Sir Christopher Wren. Samuel Pepys wrote about these events in a diary which was later published and is still read today. The handbook never prints a year for the fire — only 'the following year' after 1665.", major: false },
          { year: "1679", title: "The Habeas Corpus Act", detail: "Habeas corpus is Latin for 'you must present the person in court'. The Act guaranteed that no one could be held prisoner unlawfully, and every prisoner has a right to a court hearing. It remains relevant today, and is one of the roots of British rights alongside Magna Carta and the Bill of Rights of 1689.", major: true },
          { year: "no date given", title: "The Royal Society is formed", detail: "Charles II was interested in science, and during his reign the Royal Society was formed to promote 'natural knowledge'. It is the oldest surviving scientific society in the world. Among its early members were Sir Edmund Halley and Sir Isaac Newton.", major: false },
          { year: "1685", title: "Charles II dies and his Catholic brother becomes James II", detail: "Charles II had no legitimate children. His brother James, a Roman Catholic, became King James II in England, Wales and Ireland and King James VII of Scotland. He favoured Roman Catholics and allowed them to be army officers, which an Act of Parliament had forbidden; he did not seek to reach agreements with Parliament, and arrested some of the bishops of the Church of England.", major: false },
          { year: "no date given", title: "A son is born to James II", detail: "His heirs were his two daughters, both firmly Protestant, and people thought this meant there would soon be a Protestant monarch again. Then James's wife had a son. Suddenly it seemed likely that the next monarch would not be a Protestant after all.", major: false },
        ],
      },
      {
        name: "The Glorious Revolution and the settlement",
        why: "Parliament wins again, this time with no fighting in England — and the laws, party politics and unions that made the change permanent.",
        events: [
          { year: "1688", title: "The Glorious Revolution", detail: "James II's elder daughter Mary was married to her cousin William of Orange, the Protestant ruler of the Netherlands. Important Protestants in England asked William to invade and proclaim himself king; when he reached England there was no resistance, and James fled to France. William ruled jointly with Mary, as William III in England, Wales and Ireland and William II of Scotland. Called 'Glorious' because there was no fighting in England and because it guaranteed the power of Parliament.", major: true },
          { year: "1689", title: "The Bill of Rights", detail: "At the coronation of William and Mary a Declaration of Rights was read, confirming that the king could no longer raise taxes or administer justice without agreement from Parliament. The Bill of Rights confirmed the rights of Parliament and the limits of the king's power. Parliament took control of who could be monarch and declared that the king or queen must be a Protestant; a new Parliament had to be elected at least every three years (later seven, now five); and every year the monarch had to ask Parliament to renew funding for the army and the navy.", major: true },
          { year: "1690", title: "The Battle of the Boyne", detail: "James II wanted to regain the throne and invaded Ireland with the help of a French army. William defeated him at the Battle of the Boyne in Ireland, re-conquered Ireland, and James fled back to France. Many restrictions were then placed on the Roman Catholic Church in Ireland and Irish Catholics were unable to take part in the government. Still celebrated by some in Northern Ireland today — the anniversary in July is a public holiday there.", major: true },
          { year: "no date given", title: "Killiecrankie and Glencoe", detail: "An attempt at an armed rebellion in Scotland in support of James was quickly defeated at Killiecrankie. All Scottish clans were then required formally to accept William as king by taking an oath; the MacDonalds of Glencoe were late in taking it and were all killed. The memory of this massacre meant some Scots distrusted the new government.", major: false },
          { year: "no date given", title: "The Jacobites", detail: "Some continued to believe that James was the rightful king, particularly in Scotland. Some joined him in exile in France; others were secret supporters. James' supporters became known as Jacobites.", major: false },
          { year: "no date given", title: "Constitutional monarchy, and the beginning of party politics", detail: "The laws passed after the Glorious Revolution are the beginning of what is called 'constitutional monarchy': the monarch remained very important but was no longer able to insist on particular policies or actions if Parliament did not agree. To govern effectively the monarch needed ministers who could ensure a majority of votes in the Commons and the Lords. There were two main groups in Parliament, the Whigs and the Tories — this was the beginning of party politics, and the modern Conservative Party is still sometimes referred to as the Tories.", major: false },
          { year: "no date given", title: "Not yet a democracy — pocket and rotten boroughs", detail: "This was not a democracy in the modern sense. The number of people who could vote was still very small: only men who owned property of a certain value, and no women at all. Some constituencies were controlled by a single wealthy family and were called 'pocket boroughs'; others had hardly any voters and were called 'rotten boroughs'. Both were abolished by the Reform Act of 1832.", major: false },
          { year: "1695", title: "Newspapers freed from government licence", detail: "From 1695 newspapers were allowed to operate without a government licence, and increasing numbers began to be published — an important time for the development of a free press.", major: false },
          { year: "1656", title: "The first Jews since the Middle Ages settle in London", detail: "This was a time when many people left Britain and Ireland to settle in new colonies in America and elsewhere, but others came to live in Britain. The first Jews to come to Britain since the Middle Ages settled in London in 1656.", major: false },
          { year: "1680–1720", title: "The Huguenots arrive from France", detail: "Many refugees called Huguenots came from France. They were Protestants and had been persecuted for their religion. Many were educated and skilled and worked as scientists, in banking, or in weaving or other crafts.", major: false },
          { year: "1707", title: "The Act of Union creates Great Britain", detail: "William and Mary's successor, Queen Anne, had no surviving children, which created uncertainty over the succession. The Act of Union, known as the Treaty of Union in Scotland, was therefore agreed, creating the Kingdom of Great Britain. Although Scotland was no longer an independent country, it kept its own legal and education systems and Presbyterian Church.", major: true },
          { year: "1714", title: "Queen Anne dies and Parliament picks a German king", detail: "Parliament chose a German, George I, to be the next king, because he was Anne's nearest Protestant relative. An attempt by Scottish Jacobites to put James II's son on the throne instead was quickly defeated.", major: false },
        ],
      },
    ],
    figures: [
      { name: "James VI and I", when: "from 1603", known: "Inherited England from Elizabeth I as her cousin — James VI of Scotland and James I of England, Wales and Ireland, with Scotland still a separate country. The King James Bible was an achievement of his reign. The Ulster plantations were encouraged during his reign and Elizabeth I's, and he later organised similar plantations elsewhere in Ireland." },
      { name: "Guy Fawkes", when: "1605", known: "Led the group of Catholics who failed in their plan to kill the Protestant king with a bomb in the Houses of Parliament. Bonfire Night, 5 November, has its origin in that event." },
      { name: "Charles I", when: "executed 1649", known: "Believed in the Divine Right of Kings, tried to impose a revised Prayer Book on the Presbyterian Church in Scotland, entered the Commons to try to arrest five parliamentary leaders — and was executed in 1649." },
      { name: "Oliver Cromwell", when: "died 1658", known: "Parliamentary general sent to Ireland, where his violence still makes him a controversial figure there; defeated Charles II's Scottish army at the Battles of Dunbar and Worcester; given the title of Lord Protector and led Britain while it was without a monarch, ruling until his death." },
      { name: "Richard Cromwell", known: "Became Lord Protector when his father died, but was not able to control the army or the government." },
      { name: "Charles II", when: "crowned 1660, died 1685", known: "Crowned king of Scotland, beaten at Worcester, hid in an oak tree and fled to Europe — then invited back from exile in the Netherlands in May 1660 with 'no wish to go on his travels again'. The Royal Society was formed during his reign." },
      { name: "Sir Christopher Wren", when: "later in the 17th century", known: "The famous architect who designed the new St Paul's Cathedral when London was rebuilt after the great fire, and helped develop a British version of the ornate styles popular in Europe." },
      { name: "Samuel Pepys", known: "Wrote about the plague and the great fire in a diary which was later published and is still read today." },
      { name: "Sir Edmund Halley", known: "An early member of the Royal Society, who successfully predicted the return of the comet now called Halley's Comet." },
      { name: "Sir Isaac Newton", when: "1643–1727", known: "Born in Lincolnshire, eastern England; first became interested in science when he studied at Cambridge University. His most famous published work, Philosophiae Naturalis Principia Mathematica, showed how gravity applied to the whole universe. He also discovered that white light is made up of the colours of the rainbow." },
      { name: "Inigo Jones", when: "17th century", known: "Took inspiration from classical architecture to design the Queen's House at Greenwich and the Banqueting House in Whitehall in London." },
      { name: "James II (James VII of Scotland)", when: "from 1685", known: "The Roman Catholic king who allowed Catholics to be army officers, which an Act of Parliament had forbidden, and arrested some Church of England bishops; fled to France in 1688 and was defeated at the Battle of the Boyne trying to regain the throne." },
      { name: "William of Orange (William III)", when: "1688", known: "Protestant ruler of the Netherlands, asked by important English Protestants to invade and proclaim himself king; met no resistance, and defeated James II at the Battle of the Boyne in 1690. William III in England, Wales and Ireland, William II of Scotland." },
      { name: "Mary", known: "James II's elder daughter, firmly Protestant, married to her cousin William of Orange; William ruled jointly with her, and the Declaration of Rights was read at their coronation." },
      { name: "Queen Anne", when: "died 1714", known: "William and Mary's successor. She had no surviving children, which created uncertainty over the succession, and the Act of Union was therefore agreed in 1707. On her death Parliament chose George I as her nearest Protestant relative." },
    ],
  },
  {
    name: "Britain forms and industrialises",
    span: "1714 - 1840s",
    summary:
      "Parliament chooses a German king, and its most important minister becomes known as the Prime Minister; a Stuart attempt on the throne is defeated at Culloden, and after the Act of Union of 1800 Ireland joins to create the United Kingdom. In the same span Britain is the first country to industrialise on a large scale, loses the American colonies, defeats Napoleon, and bans first the slave trade (1807) and then slavery itself (1833).",
    sections: [
      {
        name: "Crown, Parliament and the shape of the kingdom",
        why: "Every item settles who governs Britain, on what terms, and over what territory — Parliament's choice of George I, the Stuart attempt of 1745, the Union that added Ireland, and who was allowed to vote.",
        events: [
          { year: "1714", title: "Queen Anne dies and Parliament chooses the next king", detail: "Parliament picks a German, George I, because he is Anne's nearest Protestant relative. An attempt by Scottish Jacobites to put James II's son on the throne instead is quickly defeated.", major: true },
          { year: "1721", title: "Sir Robert Walpole becomes the first Prime Minister", detail: "George I did not speak very good English and this increased his need to rely on his ministers. The most important minister in Parliament became known as the Prime Minister. The first man to be called this was Walpole, who held it from 1721 to 1742.", major: true },
          { year: "1745", title: "Bonnie Prince Charlie lands in Scotland", detail: "Charles Edward Stuart, grandson of James II, is supported by clansmen from the Scottish highlands and raises an army, in another attempt to put a Stuart king back on the throne in place of George I's son, George II. He initially has some successes.", major: false },
          { year: "1746", title: "The Battle of Culloden", detail: "Charles is defeated by George II's army at the Battle of Culloden. Charles escapes back to Europe.", major: true },
          { year: "no date given", title: "The clans lose a lot of their power and influence", detail: "After Culloden, chieftains became landlords if they had the favour of the English king, and clansmen became tenants who had to pay for the land they used.", major: false },
          { year: "early 19th century", title: "The Highland Clearances", detail: "Many Scottish landlords destroyed individual small farms — known as 'crofts' — to make space for large flocks of sheep and cattle. Evictions became very common in the early 19th century, and many Scottish people left for North America.", major: false },
          { year: "1801", title: "Ireland joins the Union and the United Kingdom is created", detail: "Ireland had had the same monarch as England and Wales since Henry VIII but had remained a separate country. In 1801, after the Act of Union of 1800, Ireland became unified with England, Scotland and Wales, creating the United Kingdom of Great Britain and Ireland. Two dates, one event: the Act is 1800, the union is 1801. Not to be confused with the Act of Union of 1707, which united England and Scotland as the Kingdom of Great Britain.", major: true },
          { year: "no date given", title: "The Union Flag", detail: "Three crosses: St George for England, a red cross on a white ground; St Andrew for Scotland, a diagonal white cross on a blue ground; St Patrick for Ireland, a diagonal red cross on a white ground. No Welsh dragon — when the first Union Flag was created in 1606 from the flags of Scotland and England, the Principality of Wales was already united with England.", major: false },
          { year: "at the turn of the 19th century", title: "Britain is not a democracy as we know it today", detail: "There were elections to select members of Parliament (MPs), but only a small group of people could vote: men who were over 21 years of age and who owned a certain amount of property.", major: false },
          { year: "1832", title: "The Reform Act", detail: "Greatly increased the number of people with the right to vote, abolished the old pocket boroughs (constituencies controlled by a single wealthy family) and rotten boroughs (constituencies with hardly any voters), and gave more parliamentary seats to the towns and cities. There was a permanent shift of political power from the countryside to the towns, but voting was still based on ownership of property, which meant members of the working class were still unable to vote.", major: true },
          { year: "1830s and 1840s", title: "The Chartists", detail: "They wanted six changes: for every man to have the vote; elections every year; for all regions to be equal in the electoral system; secret ballots; for any man to be able to stand as an MP; for MPs to be paid. At the time the campaign was generally seen as a failure, but by 1918 most of these reforms had been adopted.", major: false },
        ],
      },
      {
        name: "The Enlightenment and the Industrial Revolution",
        why: "The handbook joins them causally — scientific discoveries, such as James Watt's work on steam power, helped the progress of the Industrial Revolution. It dates the Enlightenment to the 18th century and the Industrial Revolution across the 18th and 19th, from mid-1700s to 1800s.",
        events: [
          { year: "1700s", title: "The Enlightenment", detail: "New ideas about politics, philosophy and science. Many of the great thinkers of the Enlightenment were Scottish. One of its most important principles: everyone should have the right to their own political and religious beliefs, and the state should not try to dictate to them.", major: false },
          { year: "before the 18th century", title: "What industry replaced", detail: "Agriculture was the biggest source of employment in Britain. There were many cottage industries, where people worked from home to produce goods such as cloth and lace.", major: false },
          { year: "mid-1700s to 1800s", title: "The Industrial Revolution", detail: "The rapid development of industry in Britain in the 18th and 19th centuries. Britain was the first country to industrialise on a large scale; it happened because of the development of machinery and the use of steam power. Britain produced over half of the world's supplies of cotton cloth, coal and iron. Many people moved from the countryside and started working in the mining and manufacturing industries.", major: true },
          { year: "no date given", title: "The Bessemer process", detail: "The mass production of steel, which led to the development of the shipbuilding industry and the railways. Manufacturing jobs became the main source of employment in Britain.", major: false },
          { year: "no date given", title: "Canals", detail: "Built to link the factories to towns and cities and to the ports, particularly in the new industrial areas in the middle and north of England.", major: false },
          { year: "no date given", title: "Working conditions were very poor", detail: "There were no laws to protect employees, who were often forced to work long hours in dangerous situations. Children also worked and were treated in the same way as adults; sometimes they were treated even more harshly.", major: false },
        ],
      },
      {
        name: "Empire, trade and the people it moved",
        why: "Colonies, the goods they sent home, the slave trade that in part sustained the commercial expansion and prosperity, and the migrations in both directions — the handbook presents these as one commercial story, and the abolition dates only make sense against it.",
        events: [
          { year: "no date given", title: "Colonisation overseas increases", detail: "Captain James Cook mapped the coast of Australia and a few colonies were established there. Britain gained control over Canada; the East India Company, originally set up to trade, gained control of large parts of India; and colonies began to be established in southern Africa.", major: false },
          { year: "no date given", title: "What Britain imported", detail: "Sugar and tobacco came from North America and the West Indies; textiles, tea and spices came from India and the area that is today called Indonesia. Trading and settlements overseas sometimes brought Britain into conflict with other countries, particularly France, which was expanding and trading in a similar way in many of the same areas of the world.", major: false },
          { year: "by the 18th century", title: "The slave trade", detail: "Slavery was illegal within Britain itself, yet by the 18th century it was a fully established overseas industry, dominated by Britain and the American colonies. Slaves came primarily from West Africa and, travelling on British ships in horrible conditions, were taken to America and the Caribbean to work on tobacco and sugar plantations.", major: false },
          { year: "late 1700s", title: "The Quakers set up the first anti-slavery groups", detail: "The first formal anti-slavery groups in Britain, and they petitioned Parliament to ban the practice. William Wilberforce, an evangelical Christian and a member of Parliament, along with other abolitionists, succeeded in turning public opinion against the slave trade.", major: false },
          { year: "1807", title: "The slave trade is made illegal", detail: "It became illegal to trade slaves in British ships or from British ports. The Royal Navy stopped slave ships from other countries, freed the slaves and punished the slave traders. This bans the trade, not slavery itself.", major: true },
          { year: "1833", title: "The Emancipation Act", detail: "Abolished slavery throughout the British Empire — twenty-six years after the trade was banned.", major: true },
          { year: "after 1833", title: "Two million replacement workers", detail: "2 million Indian and Chinese workers were employed to replace the freed slaves. They worked on sugar plantations in the Caribbean, in mines in South Africa, on railways in East Africa and in the army in Kenya.", major: false },
          { year: "between 1680 and 1720", title: "The Huguenots arrive", detail: "Many refugees called Huguenots came from France. They were Protestants and had been persecuted for their religion. Many were educated and skilled and worked as scientists, in banking, or in weaving or other crafts.", major: false },
        ],
      },
      {
        name: "The wars with America and France",
        why: "Two conflicts that close the era — one that lost Britain thirteen colonies, one that ended with Napoleon beaten — and it is their dates, and which service won which battle, that get swapped.",
        events: [
          { year: "by the 1760s", title: "The American colonies before the break", detail: "There were substantial British colonies in North America, wealthy and largely in control of their own affairs. Many of the colonist families had originally gone there in order to have religious freedom; they were well educated and interested in ideas of liberty.", major: false },
          { year: "no date given", title: "'No taxation without representation'", detail: "The British government wanted to tax the colonies. The colonists saw this as an attack on their freedom and said there should be 'no taxation without representation' in the British Parliament. Parliament tried to compromise by repealing some of the taxes, but relationships continued to worsen and fighting broke out between the colonists and the British forces.", major: false },
          { year: "1776", title: "13 American colonies declare independence", detail: "They stated that people had a right to establish their own governments. The quarrel was over taxation.", major: true },
          { year: "1783", title: "Britain recognises American independence", detail: "The colonists eventually defeated the British army and Britain recognised the colonies' independence. Declared in 1776, conceded in 1783.", major: false },
          { year: "1789", title: "Revolution in France, and war on Britain", detail: "There was a revolution in France and the new French government soon declared war on Britain. Napoleon, who became Emperor of France, continued the war. During the 18th century Britain had already fought a number of wars with France.", major: false },
          { year: "1805", title: "The Battle of Trafalgar", detail: "Britain's navy fought against combined French and Spanish fleets and won. Admiral Nelson was in charge of the British fleet and was killed in the battle. Nelson's Column in Trafalgar Square, London, is a monument to him; his ship, HMS Victory, can be visited in Portsmouth.", major: true },
          { year: "1815", title: "The Battle of Waterloo ends the French Wars", detail: "The French Wars ended with the defeat of the Emperor Napoleon by the Duke of Wellington. Trafalgar was the navy in 1805; Waterloo was the army in 1815.", major: true },
        ],
      },
    ],
    figures: [
      { name: "George I", when: "1714", known: "The German whom Parliament chose as Queen Anne's nearest Protestant relative. He did not speak very good English, which increased his need to rely on his ministers, and the most important minister in Parliament became known as the Prime Minister." },
      { name: "Sir Robert Walpole", when: "1721–1742", known: "The first man to be called Prime Minister." },
      { name: "George II", when: "1746", known: "George I's son, whose army defeated Bonnie Prince Charlie at Culloden." },
      { name: "Charles Edward Stuart (Bonnie Prince Charlie)", when: "1745–1746", known: "Grandson of James II. Landed in Scotland, raised an army of Highland clansmen, was defeated at Culloden and escaped back to Europe." },
      { name: "Robert Burns", when: "1759–96", known: "Scottish poet known in Scotland as 'The Bard'. Wrote in the Scots language, English with some Scottish words, and standard English. His best-known work is probably Auld Lang Syne, sung at New Year; he also revised a lot of traditional folk songs." },
      { name: "Adam Smith", known: "Scottish Enlightenment thinker who developed ideas about economics which are still referred to today." },
      { name: "David Hume", known: "Scottish Enlightenment thinker whose ideas about human nature continue to influence philosophers." },
      { name: "James Watt", known: "His work on steam power helped the progress of the Industrial Revolution." },
      { name: "Richard Arkwright", when: "1732–92", known: "Trained and worked as a barber making wigs, then moved into textiles: improved the original carding machine and developed horse-driven spinning mills. Particularly remembered for the efficient and profitable way that he ran his factories." },
      { name: "Captain James Cook", known: "Mapped the coast of Australia, where a few colonies were then established." },
      { name: "Sake Dean Mahomet", when: "1759–1851", known: "In 1810 opened the Hindoostane Coffee House in George Street, London — the first curry house to open in Britain. He and his wife also introduced 'shampooing', the Indian art of head massage, to Britain." },
      { name: "William Wilberforce", known: "An evangelical Christian and member of Parliament who, along with other abolitionists, succeeded in turning public opinion against the slave trade. The Quakers had set up the first formal anti-slavery groups." },
      { name: "Admiral Nelson", when: "1805", known: "Commanded the British fleet at Trafalgar and was killed in the battle. His ship HMS Victory can be visited in Portsmouth." },
      { name: "The Duke of Wellington", when: "1815", known: "Defeated the Emperor Napoleon at Waterloo. Known as the Iron Duke, and later became Prime Minister." },
      { name: "Napoleon", known: "Became Emperor of France and continued the war on Britain; defeated by the Duke of Wellington at Waterloo." },
    ],
  },
  {
    name: "Empire and the Victorians",
    span: "1837–1901",
    summary:
      "Victoria's reign of almost 64 years, in which the Empire grew to be the largest the world has ever seen and British industry led the world. Britain fought two wars abroad — the Crimean and the Boer — while at home famine emptied Ireland and the vote widened without yet reaching the majority of men or any women.",
    sections: [
      {
        name: "Victoria, the Empire, and the argument about it",
        why: "The reign itself and the Empire it presided over — including the late-century discussion about the Empire's future direction and the war that made that discussion more urgent. Everything here is about Britain looking outward.",
        events: [
          { year: "1837", title: "Victoria becomes queen at 18", detail: "She reigns until 1901, almost 64 years. At the handbook's date of writing (2013) this is the longest reign of any British monarch.", major: true },
          { year: "1837–1901", title: "What the Victorian Age was", detail: "Her reign is known as the Victorian Age. It was a time when Britain increased in power and influence abroad. Within the UK, the middle classes became increasingly significant and a number of reformers led moves to improve conditions of life for the poor.", major: false },
          { year: "no date given", title: "The largest empire the world has ever seen", detail: "During the Victorian period the British Empire grew to cover all of India, Australia and large parts of Africa. It became the largest empire the world has ever seen, with an estimated population of more than 400 million people.", major: true },
          { year: "1853–1913", title: "Thirteen million leave Britain", detail: "Many people were encouraged to leave the UK to settle overseas. Between 1853 and 1913, as many as 13 million British citizens left the country.", major: false },
          { year: "1870–1914", title: "Around 120,000 Russian and Polish Jews arrive", detail: "Around 120,000 Russian and Polish Jews came to Britain to escape persecution. Many settled in London's East End and in Manchester and Leeds. People from the Empire, including India and Africa, also came to Britain to live, work and study.", major: false },
          { year: "late 19th century", title: "Discussion about the Empire's future direction", detail: "Supporters of expansion believed the Empire benefited Britain through increased trade and commerce. Others thought it had become over-expanded and that the frequent conflicts in many parts of the Empire, such as India's north-west frontier or southern Africa, were a drain on resources. The Empire continued to grow until the 1920s. The great majority of British people believed in the Empire as a force for good in the world.", major: false },
          { year: "1899–1902", title: "The Boer War", detail: "The Boer War made the discussions about the future of the Empire more urgent. The British went to war in South Africa with settlers from the Netherlands called the Boers. The Boers fought fiercely and the war went on for over three years. Many died in the fighting and many more from disease. There was some public sympathy for the Boers and people began to question whether the Empire could continue.", major: true },
        ],
      },
      {
        name: "Free trade, industry and the engineers",
        why: "The economic engine of the age — what Britain let in, what it made, and the men who built the network that moved it. Grouped so that free trade, factory hours, the railways and the exhibition that displayed the result are learned together.",
        events: [
          { year: "1846", title: "The Corn Laws are repealed", detail: "The Corn Laws had prevented the import of cheap grain. The handbook gives their repeal as its example of the government's policies of free trade, abolishing a number of taxes on imported goods. The reforms helped the development of British industry, because raw materials could now be imported more cheaply.", major: false },
          { year: "1847", title: "The ten-hour day for women and children", detail: "The number of hours that women and children could work was limited by law to 10 hours per day. Working conditions in factories gradually became better and better housing began to be built for workers.", major: false },
          { year: "just before Victoria came to the throne", title: "The Stephensons pioneer the railway engine", detail: "George and Robert Stephenson, father and son, pioneered the railway engine, and a major expansion of the railways took place in the Victorian period. Railways were built throughout the Empire. There were also great advances in other areas, such as the building of bridges by engineers such as Isambard Kingdom Brunel.", major: false },
          { year: "19th century", title: "British industry leads the world", detail: "The UK produced more than half of the world's iron, coal and cotton cloth. The UK also became a centre for financial services, including insurance and banking.", major: false },
          { year: "1851", title: "The Great Exhibition", detail: "It opened in Hyde Park in the Crystal Palace, a huge building made of steel and glass. Exhibits ranged from huge machines to handmade goods. Countries from all over the world showed their goods but most of the objects were made in Britain.", major: true },
        ],
      },
      {
        name: "The Crimean War",
        why: "One war, and the two things the handbook hangs on it — the Victoria Cross and Florence Nightingale. Kept separate because the sides are easily confused: Britain, Turkey and France were allies against Russia.",
        events: [
          { year: "1853–1856", title: "Britain, Turkey and France fight Russia", detail: "Britain fought with Turkey and France against Russia in the Crimean War. The alliance is the point: Turkey and France were on Britain's side, and Russia was the enemy.", major: true },
          { year: "1853–1856", title: "The first war extensively covered by the media", detail: "It was covered through news stories and photographs. The conditions were very poor and many soldiers died from illnesses they caught in the hospitals, rather than from war wounds.", major: false },
          { year: "during the Crimean War", title: "Queen Victoria introduces the Victoria Cross", detail: "The medal honours acts of valour by soldiers. The handbook gives no separate year for it — only that Victoria introduced it during this war.", major: false },
          { year: "1854", title: "Nightingale goes to Turkey", detail: "She went to Turkey and worked in military hospitals, treating soldiers who were fighting in the Crimean War. She and her fellow nurses improved the conditions in the hospital and reduced the mortality rate.", major: false },
          { year: "1860", title: "The Nightingale Training School opens", detail: "She established the Nightingale Training School for nurses at St Thomas' Hospital in London. The school was the first of its kind and still exists today, as do many of the practices that Florence used.", major: false },
        ],
      },
      {
        name: "Ireland, and the right to vote",
        why: "The two domestic pressures the Victorians answered only partly. Both fall due in the next era — Home Rule promised in 1913, a peace treaty in 1921 and Ireland becoming two countries in 1922; votes for women over 30 in 1918 — so learning them here is what makes the twentieth century's opening make sense.",
        events: [
          { year: "middle of the century", title: "The potato crop fails and Ireland suffers a famine", detail: "Two-thirds of Ireland's population still depended on farming to make their living, often on very small plots of land, and many depended on potatoes as a large part of their diet. A million people died from disease and starvation. Another million and a half left Ireland — some emigrated to the United States and others came to England.", major: true },
          { year: "1861", title: "Large Irish populations in the British cities", detail: "By 1861 there were large populations of Irish people in cities such as Liverpool, London, Manchester and Glasgow.", major: false },
          { year: "19th century", title: "Fenians want independence, Parnell wants Home Rule", detail: "The Irish Nationalist movement had grown strongly through the 19th century. Some, such as the Fenians, favoured complete independence. Others, such as Charles Stuart Parnell, advocated 'Home Rule', in which Ireland would remain in the UK but have its own parliament. That is the whole distinction — Fenians out, Parnell in but self-governing.", major: false },
          { year: "1830s and 1840s", title: "The Chartists and their six demands", detail: "A movement began to demand the vote for the working classes and other people without property. Campaigners, called the Chartists, presented petitions to Parliament. They wanted six changes: for every man to have the vote; elections every year; for all regions to be equal in the electoral system; secret ballots; for any man to be able to stand as an MP; for MPs to be paid. At the time, the campaign was generally seen as a failure. However, by 1918 most of these reforms had been adopted.", major: true },
          { year: "1867", title: "The Reform Act of 1867", detail: "It created many more urban seats in Parliament and reduced the amount of property that people needed to have before they could vote. However, the majority of men still did not have the right to vote and no women could vote. The discriminator against 1832: 1832 abolished the old pocket and rotten boroughs, 1867 cut the property qualification.", major: true },
          { year: "1870 and 1882", title: "Married women get to keep their own earnings and property", detail: "Until 1870, when a woman got married, her earnings, property and money automatically belonged to her husband. Acts of Parliament in 1870 and 1882 gave wives the right to keep their own earnings and property.", major: false },
          { year: "1889", title: "Pankhurst sets up the Women's Franchise League", detail: "It fought to get the vote in local elections for married women. The WSPU comes later, in 1903 — it was the first group whose members were called 'suffragettes'.", major: false },
          { year: "late 19th and early 20th centuries", title: "The women's suffrage movement forms", detail: "An increasing number of women campaigned and demonstrated for greater rights and, in particular, the right to vote. They formed the women's suffrage movement and became known as 'suffragettes'.", major: false },
        ],
      },
    ],
    figures: [
      { name: "Queen Victoria", when: "1837–1901", known: "Became queen of the UK at the age of 18 and reigned almost 64 years — at the handbook's 2013 date of writing, the longest reign of any British monarch. She introduced the Victoria Cross medal during the Crimean War." },
      { name: "Isambard Kingdom Brunel", when: "1806–59", known: "Originally from Portsmouth, England. An engineer who built tunnels, bridges, railway lines and ships. He was responsible for constructing the Great Western Railway, which was the first major railway built in Britain, running from Paddington Station in London to the south west of England, the West Midlands and Wales. Many of his bridges are still in use today." },
      { name: "George and Robert Stephenson", known: "Father and son who pioneered the railway engine, just before Victoria came to the throne. The discriminator against Brunel: the Stephensons pioneered the engine, Brunel built tunnels, bridges, railway lines and ships." },
      { name: "Florence Nightingale", when: "1820–1910", known: "Born in Italy to English parents; trained as a nurse in Germany at the age of 31. In 1854 she went to Turkey and worked in military hospitals treating soldiers fighting in the Crimean War, reducing the mortality rate. In 1860 she established the Nightingale Training School at St Thomas' Hospital in London, the first of its kind. She is often regarded as the founder of modern nursing." },
      { name: "Charles Stuart Parnell", known: "Advocated 'Home Rule' for Ireland — Ireland would remain in the UK but have its own parliament. The Fenians, by contrast, favoured complete independence. (The handbook prints 'Stuart', not the conventional 'Stewart'.)" },
      { name: "Rudyard Kipling", when: "1865–1936", known: "Born in India in 1865 and later lived in India, the UK and the USA. His poems and novels reflected the idea that the British Empire was a force for good. Awarded the Nobel Prize in Literature in 1907. His books include the Just So Stories and The Jungle Book; his poem If has often been voted among the UK's favourite poems." },
    ],
  },
  {
    name: "The twentieth century",
    span: "The early 1900s - 1999",
    summary:
      "Britain enters the century a global 'superpower' and leaves it post-imperial and devolved: two world wars, the partition of Ireland, the vote extended from women over 30 to everyone over 18, the welfare state and the NHS, the end of the Empire, and a run of British inventions from penicillin to the World Wide Web.",
    sections: [
      {
        name: "The First World War and the partition of Ireland",
        why: "One continuous story: the war postpones Home Rule, and out of the same decade come both the vote for women and a divided Ireland. Separating them is what makes 1913 / 1916 / 1918 / 1921 / 1922 stop blurring.",
        events: [
          { year: "early 20th century", title: "Britain a global superpower", detail: "An expansive Empire, a well-admired navy, thriving industry and strong political institutions. The handbook calls it a time of optimism and progress, cut short when war broke out between several European nations.", major: false },
          { year: "before the First World War", title: "Social progress before the war", detail: "Financial help for the unemployed, old-age pensions and free school meals. Laws to improve safety in the workplace; town planning rules tightened to prevent the further development of slums; better support for mothers and their children after divorce or separation. Local government became more democratic and a salary for MPs was introduced for the first time, making it easier for more people to take part in public life.", major: false },
          { year: "1903", title: "The Women's Social and Political Union is founded", detail: "Emmeline Pankhurst helps found it - the first group whose members were called 'suffragettes'. They used civil disobedience: chained themselves to railings, smashed windows and committed arson, and many went on hunger strike.", major: false },
          { year: "1913", title: "Home Rule promised for Ireland", detail: "A self-governing Ireland with its own parliament, still part of the UK. A Home Rule Bill was introduced in Parliament and the Protestants in the north opposed it, threatening to resist by force. The outbreak of the First World War led the British government to postpone any changes in Ireland.", major: false },
          { year: "28 June 1914", title: "Archduke Franz Ferdinand of Austria is assassinated", detail: "The trigger, not the cause. Other factors set the conditions for war: a growing sense of nationalism in many European states, increasing militarism, imperialism, and the division of the major European powers into two camps.", major: true },
          { year: "1914-18", title: "Who was on which side", detail: "Britain was part of the Allied Powers, which included France, Russia, Japan, Belgium and Serbia, and later Greece, Italy, Romania and the United States. The Allies fought against the Central Powers - mainly Germany, the Austro-Hungarian Empire, the Ottoman Empire and later Bulgaria.", major: false },
          { year: "1914-18", title: "The whole Empire fights", detail: "More than a million Indians fought on behalf of Britain and around 40,000 were killed. Men from the West Indies, Africa, Australia, New Zealand and Canada also fought with the British. There were more than 2 million British casualties.", major: false },
          { year: "July 1916", title: "The Somme", detail: "The British attack on the Somme resulted in about 60,000 British casualties on the first day alone.", major: true },
          { year: "1916", title: "The Easter Rising", detail: "Irish nationalists were not willing to wait for Home Rule, and rose against the British in Dublin. The leaders of the uprising were executed under military law. A guerrilla war against the British army and the police in Ireland followed.", major: true },
          { year: "11 November 1918", title: "The war ends at 11.00 am", detail: "Victory for Britain and its allies. Remembrance Day, 11 November, still commemorates it: people wear poppies, there is a two-minute silence at 11.00 am, and wreaths are laid at the Cenotaph in Whitehall, London.", major: true },
          { year: "1918", title: "Women over 30 get the vote", detail: "And the right to stand for Parliament, partly in recognition of the contribution women made to the war effort during the First World War. By 1918 most of the six reforms the Chartists had campaigned for in the 1830s and 1840s had also been adopted.", major: true },
          { year: "1921", title: "A peace treaty is signed", detail: "Signed after the guerrilla war against the British army and the police in Ireland. The treaty splits Ireland in two.", major: true },
          { year: "1922", title: "Ireland becomes two countries", detail: "The six counties in the north which were mainly Protestant remained part of the UK under the name Northern Ireland; the rest of Ireland became the Irish Free State, with its own government. A Northern Ireland Parliament was established in 1922, when Ireland was divided.", major: true },
          { year: "1949", title: "The Irish Free State becomes a republic", detail: "The Irish Free State, which had its own government, became a republic in 1949.", major: false },
          { year: "no date given", title: "Disagreement over the split, and 'the Troubles'", detail: "There were people in both parts of Ireland who disagreed with the split and still wanted Ireland to be one independent country. Years of disagreement led to a terror campaign in Northern Ireland and elsewhere. The conflict between those wishing for full Irish independence and those wishing to remain loyal to the British government is often referred to as 'the Troubles'.", major: false },
        ],
      },
      {
        name: "Between the wars",
        why: "The twenty years from the armistice to the invasion of Poland: the Empire stops growing and the Depression bites, and this is the window the handbook dates radar, the jet engine, television and penicillin to - all before the war, not during it.",
        events: [
          { year: "the 1920s", title: "The Empire stops growing", detail: "The British Empire continued to grow until the 1920s. As different parts of the Empire developed, they won greater freedom and autonomy from Britain.", major: false },
          { year: "the 1920s", title: "Living conditions improve", detail: "Many people's living conditions got better: there were improvements in public housing and new homes were built in many towns and cities.", major: false },
          { year: "1922", title: "The BBC starts radio broadcasts", detail: "", major: false },
          { year: "1928", title: "Equal suffrage - the vote at 21", detail: "Women were given the right to vote at the age of 21, the same as men, shortly before Emmeline Pankhurst's death in 1928. The UK has had a fully democratic voting system since 1928.", major: true },
          { year: "1928", title: "Fleming discovers penicillin", detail: "He was researching influenza when he discovered penicillin. It was then further developed into a usable drug by the scientists Howard Florey and Ernst Chain, and by the 1940s it was in mass production.", major: true },
          { year: "1929", title: "The Great Depression", detail: "The world entered the 'Great Depression' and some parts of the UK suffered mass unemployment. Traditional heavy industries such as shipbuilding were badly affected, but new industries - including the automobile and aviation industries - developed. As prices generally fell, those in work had more money to spend.", major: true },
          { year: "1930-1939", title: "Car ownership doubles", detail: "From 1 million to 2 million. In addition, many new houses were built.", major: false },
          { year: "the 1930s", title: "Cultural blossoming", detail: "Writers such as Graham Greene and Evelyn Waugh were prominent, and the economist John Maynard Keynes published influential new theories of economics.", major: false },
          { year: "the 1930s", title: "The Turing machine", detail: "A theoretical mathematical device invented by Alan Turing, a British mathematician. The theory was influential in the development of computer science and the modern-day computer.", major: false },
          { year: "the 1930s", title: "The jet engine", detail: "Developed in Britain by Sir Frank Whittle, a British Royal Air Force engineer officer.", major: false },
          { year: "1932", title: "The first television broadcast", detail: "John Logie Baird, a Scotsman, made it between London and Glasgow. He had developed the television in the 1920s.", major: false },
          { year: "1935", title: "The first successful radar test", detail: "Radar was developed by Scotsman Sir Robert Watson-Watt, who proposed that enemy aircraft could be detected by radio waves.", major: false },
          { year: "1936", title: "The world's first regular television service", detail: "Begun by the BBC.", major: false },
        ],
      },
      {
        name: "The Second World War",
        why: "The handbook tells this as one unbroken run from Hitler taking power to the atom bombs, and it is the densest sequence of dates in the book - including the two 1940 events and the two 1945 endings that are most often swapped.",
        events: [
          { year: "1933", title: "Hitler comes to power in Germany", detail: "He believed the conditions imposed on Germany by the Allies after the First World War were unfair, and he also wanted to conquer more land for the German people. He set about renegotiating treaties, building up arms and testing Germany's military strength in nearby countries. The British government tried to avoid another war.", major: false },
          { year: "1939", title: "Britain and France declare war", detail: "When Hitler invaded Poland in 1939, Britain and France declared war in order to stop his aggression.", major: true },
          { year: "no date given", title: "Axis and Allies", detail: "The war was initially fought between the Axis powers - fascist Germany and Italy and the Empire of Japan - and the Allies. The main countries on the allied side were the UK, France, Poland, Australia, New Zealand, Canada and the Union of South Africa.", major: false },
          { year: "no date given", title: "What Hitler took before and after Poland", detail: "Having occupied Austria and invaded Czechoslovakia, Hitler followed his invasion of Poland by taking control of Belgium and the Netherlands.", major: false },
          { year: "May 1940", title: "Churchill becomes Prime Minister", detail: "German forces defeated allied troops and advanced through France. At this time of national crisis, Winston Churchill became Prime Minister and Britain's war leader. He refused to surrender to the Nazis.", major: true },
          { year: "1940", title: "Dunkirk", detail: "As France fell, the British decided to evacuate British and French soldiers from France in a huge naval operation. Many civilian volunteers in small pleasure and fishing boats helped the Navy to rescue more than 300,000 men from the beaches around Dunkirk. The evacuation gave rise to the phrase 'the Dunkirk spirit'.", major: true },
          { year: "end of June 1940 to June 1941", title: "Britain stands almost alone", detail: "From the end of June 1940 until the German invasion of the Soviet Union in June 1941, Britain and the Empire stood almost alone against Nazi Germany.", major: false },
          { year: "summer 1940", title: "The Battle of Britain", detail: "Hitler wanted to invade Britain, but before sending in troops Germany needed to control the air. The Germans waged an air campaign, but the British resisted with their fighter planes and eventually won the crucial aerial battle. The most important planes used by the Royal Air Force were the Spitfire and the Hurricane, which were designed and built in Britain.", major: true },
          { year: "no date given", title: "The Blitz", detail: "Despite that crucial victory, the German air force was able to continue bombing London and other British cities at night-time. Coventry was almost totally destroyed and a great deal of damage was done in other cities, especially in the East End of London. The phrase 'the Blitz spirit' is still used today to describe Britons pulling together in the face of adversity.", major: false },
          { year: "no date given", title: "Singapore and Burma", detail: "In Singapore the Japanese defeated the British and then occupied Burma, threatening India.", major: false },
          { year: "December 1941", title: "Pearl Harbour brings in the United States", detail: "The United States entered the war when the Japanese bombed its naval base at Pearl Harbour.", major: false },
          { year: "1941", title: "Hitler attacks the Soviet Union", detail: "Hitler attempted the largest invasion in history by attacking the Soviet Union. It was a fierce conflict, with huge losses on both sides. German forces were ultimately repelled by the Soviets, and the damage they sustained proved to be a pivotal point in the war.", major: false },
          { year: "1942", title: "The Beveridge Report", detail: "Commissioned by the wartime government in 1941 and published in 1942 as Social Insurance and Allied Services. It recommended that the government should find ways of fighting the five 'Giant Evils' of Want, Disease, Ignorance, Squalor and Idleness, and provided the basis of the modern welfare state.", major: true },
          { year: "1944", title: "The Education Act", detail: "R A Butler oversaw the Education Act 1944, often called 'The Butler Act', which introduced free secondary education in England and Wales. The division between primary and secondary schools that it enforced still remains in most areas of Britain.", major: false },
          { year: "6 June 1944", title: "D-Day", detail: "Allied forces landed in Normandy. Following victory on the beaches of Normandy, the allied forces pressed on through France and eventually into Germany.", major: true },
          { year: "May 1945", title: "Germany is defeated", detail: "The Allies comprehensively defeated Germany in May 1945.", major: false },
          { year: "August 1945", title: "The war against Japan ends", detail: "The United States dropped its newly developed atom bombs on the Japanese cities of Hiroshima and Nagasaki. Scientists led by Ernest Rutherford, working at Manchester and then Cambridge University, were the first to 'split the atom' and took part in the Manhattan Project in the United States, which developed the atomic bomb.", major: true },
        ],
      },
      {
        name: "Britain since 1945",
        why: "The handbook gives this its own section and it supplies most of the modern-Britain questions - the welfare state, the end of the Empire, immigration, Europe, devolution, and the run of inventions from DNA to the World Wide Web.",
        events: [
          { year: "1945", title: "Labour wins and Attlee becomes Prime Minister", detail: "Although the UK had won the war, the country was exhausted economically and the people wanted change. The new Prime Minister was Clement Attlee, who promised to introduce the welfare state outlined in the Beveridge Report. Churchill lost the 1945 General Election and returned as Prime Minister in 1951.", major: true },
          { year: "1947", title: "Independence for nine countries", detail: "Independence was granted to nine countries, including India, Pakistan and Ceylon (now Sri Lanka). Other colonies in Africa, the Caribbean and the Pacific achieved independence over the next 20 years.", major: true },
          { year: "1948", title: "The National Health Service", detail: "Aneurin (Nye) Bevan, the Minister for Health, led the establishment of the NHS, which guaranteed a minimum standard of health care for all, free at the point of use.", major: true },
          { year: "1945-1950", title: "The welfare state is built", detail: "A national system of benefits was introduced to provide 'social security', so that the population would be protected from the 'cradle to the grave'. The government took into public ownership (nationalised) the railways, coal mines and gas, water and electricity supplies.", major: false },
          { year: "1948", title: "People from the West Indies are invited to come and work", detail: "Rebuilding Britain after the Second World War was a huge task. There were labour shortages and the British government encouraged workers from Ireland and other parts of Europe to come to the UK and help with the reconstruction. In 1948, people from the West Indies were also invited to come and work.", major: false },
          { year: "no date given", title: "The atomic bomb and NATO", detail: "The UK developed its own atomic bomb and joined the new North Atlantic Treaty Organization (NATO), an alliance of nations set up to resist the perceived threat of invasion by the Soviet Union and its allies.", major: false },
          { year: "1950", title: "The UK signs the European Convention on Human Rights", detail: "British diplomats and lawyers had an important role in drafting the Convention, and the UK was one of the first countries to sign it in 1950. The Convention belongs to the Council of Europe, which is separate from the EU.", major: false },
          { year: "1951-1964", title: "A Conservative government, and the 'wind of change'", detail: "The 1950s were a period of economic recovery after the war and increasing prosperity for working people. The Prime Minister of the day, Harold Macmillan, was famous for his 'wind of change' speech about decolonisation and independence for the countries of the Empire.", major: false },
          { year: "1950s", title: "Recruiting workers from overseas", detail: "Centres were set up in the West Indies to recruit people to drive buses. Textile and engineering firms from the north of England and the Midlands sent agents to India and Pakistan to find workers. For about 25 years, people from the West Indies, India, Pakistan and (later) Bangladesh travelled to work and settle in Britain.", major: false },
          { year: "1952", title: "Queen Elizabeth II comes to the throne", detail: "On her father's death in 1952. In 2012 she celebrated her Diamond Jubilee - 60 years as queen.", major: true },
          { year: "1953", title: "The structure of DNA is discovered", detail: "Through work at British universities in London and Cambridge. The discovery contributed to many scientific advances, particularly in medicine and fighting crime. Francis Crick, one of those awarded the Nobel Prize for the discovery, was British.", major: false },
          { year: "1950s", title: "The hovercraft", detail: "Invented by Sir Christopher Cockerell, a British inventor.", major: false },
          { year: "1957", title: "The EEC is set up without Britain", detail: "Six western European countries - Belgium, France, Germany (given elsewhere in the book as West Germany), Italy, Luxembourg and the Netherlands - signed the Treaty of Rome on 25 March 1957. At first the UK did not wish to join the EEC.", major: false },
          { year: "1958", title: "Life peers", detail: "Since 1958 the Prime Minister has had the power to nominate peers just for their own lifetime. Until 1958, all peers were hereditary, senior judges, or bishops of the Church of England.", major: false },
          { year: "1960s", title: "The Swinging Sixties", detail: "Growth in British fashion, cinema and popular music - The Beatles and The Rolling Stones were two well-known groups. People started to become better off and many bought cars and other consumer goods. New styles of architecture, including high-rise buildings and the use of concrete and steel, became common.", major: false },
          { year: "1960s", title: "Social laws are liberalised", detail: "For example in relation to divorce, and to abortion in England, Wales and Scotland. It was quite common at the time for employers to ask women to leave their jobs when they got married, but Parliament passed new laws giving women the right to equal pay and made it illegal for employers to discriminate against women because of their gender.", major: true },
          { year: "1967", title: "The first cashpoint", detail: "James Goodfellow invented the cash-dispensing ATM, or 'cashpoint', in the 1960s. The first of these was put into use by Barclays Bank in Enfield, north London, in 1967.", major: false },
          { year: "late 1960s", title: "Immigration is restricted", detail: "The number of people migrating from the West Indies, India, Pakistan and what is now Bangladesh fell in the late 1960s because the government passed new laws to restrict immigration. Immigrants were required to have a strong connection to Britain through birth or ancestry. Even so, during the early 1970s Britain admitted 28,000 people of Indian origin who had been forced to leave Uganda.", major: false },
          { year: "1969", title: "The voting age is reduced to 18", detail: "For men and women. The present voting age of 18 was set in 1969.", major: true },
          { year: "1969", title: "The Troubles break out", detail: "Some 3,000 people lost their lives in the decades after 1969 in the violence in Northern Ireland.", major: true },
          { year: "1969", title: "Concorde first flies", detail: "Britain and France developed Concorde, the world's only supersonic passenger aircraft. It first flew in 1969, began carrying passengers in 1976, and was retired from service in 2003.", major: false },
          { year: "1972", title: "Direct rule in Northern Ireland", detail: "The Northern Ireland Parliament, established in 1922, was suspended and Northern Ireland was directly ruled by the UK government.", major: false },
          { year: "1973", title: "The UK joins the EEC", detail: "At first the UK did not wish to join the EEC but it eventually did so in 1973. The UK later left the EU after the Brexit vote; Brexit officially took place at 23:00 GMT on 31 January 2020.", major: true },
          { year: "late 1970s", title: "The post-war boom ends", detail: "Prices of goods and raw materials began to rise sharply and the exchange rate between the pound and other currencies was unstable. This caused problems with the 'balance of payments': imports of goods were valued at more than the price paid for exports. Many industries and services were affected by strikes, and people began to argue that the unions were too powerful.", major: false },
          { year: "1978", title: "The world's first 'test-tube baby'", detail: "Born in Oldham, Lancashire. IVF therapy for the treatment of infertility was pioneered in Britain by the physiologist Sir Robert Edwards and the gynaecologist Patrick Steptoe.", major: false },
          { year: "1979", title: "Margaret Thatcher becomes the first woman Prime Minister", detail: "Following the Conservative victory in the General Election in 1979. She was the longest-serving Prime Minister of the 20th century, remaining in office until 1990. Her government privatised the nationalised industries and imposed legal controls on trade union powers; deregulation saw a great increase in the role of the City of London, while traditional industries such as shipbuilding and coal mining declined.", major: true },
          { year: "1982", title: "The Falklands", detail: "Argentina invaded the Falkland Islands, a British overseas territory in the South Atlantic. A naval taskforce was sent from the UK and military action led to the recovery of the islands.", major: false },
          { year: "1990", title: "Kuwait, and the 1990s coalitions", detail: "Throughout the 1990s Britain played a leading role in coalition forces involved in the liberation of Kuwait, following the Iraqi invasion in 1990, and in the conflict in the Former Republic of Yugoslavia.", major: false },
          { year: "25 December 1990", title: "The first transfer of information over the World Wide Web", detail: "Its inventor, Sir Tim Berners-Lee, is British.", major: false },
          { year: "no date given", title: "John Major follows Thatcher", detail: "John Major was Prime Minister after Mrs Thatcher, and helped establish the Northern Ireland peace process, which the Blair government was later able to build on.", major: false },
          { year: "1996", title: "Dolly the sheep", detail: "Two British scientists, Sir Ian Wilmot and Keith Campbell, led a team which was the first to succeed in cloning a mammal.", major: false },
          { year: "1997", title: "Tony Blair and the Labour government", detail: "In 1997 the Labour Party led by Tony Blair was elected. Since 1997, some powers have been devolved from central government to give people in Wales, Scotland and Northern Ireland more control over matters that directly affect them.", major: false },
          { year: "1998", title: "The Good Friday Agreement", detail: "Also called the Belfast Agreement. The Blair government built on the Northern Ireland peace process, resulting in the Good Friday Agreement signed in 1998. There is a power-sharing agreement which distributes ministerial offices amongst the main parties.", major: true },
          { year: "1998", title: "The Human Rights Act", detail: "The Human Rights Act 1998 incorporated the European Convention on Human Rights into UK law. The government, public bodies and the courts must follow the principles of the Convention.", major: false },
          { year: "1999", title: "Devolution - Scotland and Wales", detail: "The Blair government introduced a Scottish Parliament and a Welsh Assembly. The Scottish Parliament, formed in 1999, has substantial powers to legislate. The Welsh Assembly was given fewer legislative powers but considerable control over public services.", major: true },
          { year: "1999", title: "The Northern Ireland Assembly is elected", detail: "Elected in 1999 but suspended in 2002. It was not reinstated until 2007.", major: false },
          { year: "1999", title: "Hereditary peers lose their automatic seats", detail: "Since 1999, hereditary peers have lost the automatic right to attend the House of Lords. They now elect a few of their number to represent them.", major: false },
          { year: "no date given", title: "Four more 20th-century British inventions", detail: "The radio telescope Sir Bernard Lovell built at Jodrell Bank in Cheshire, for many years the biggest in the world; insulin, co-discovered by the Scottish physician John MacLeod; the MRI scanner, co-invented by Sir Peter Mansfield; and the Harrier jump jet, an aircraft capable of taking off vertically, designed and developed in the UK.", major: false },
          { year: "second half of the 20th century", title: "From Empire to Commonwealth", detail: "For the most part an orderly transition, with countries being granted their independence. Most Commonwealth member states were once part of the British Empire. Membership is voluntary and the Commonwealth has no power over its members, although it can suspend membership.", major: false },
        ],
      },
    ],
    figures: [
      { name: "Emmeline Pankhurst", when: "1903", known: "Helped found the Women's Social and Political Union in 1903, the first group whose members were called 'suffragettes' - they chained themselves to railings, smashed windows and committed arson, and she went on hunger strike." },
      { name: "Winston Churchill", when: "Prime Minister from May 1940; again from 1951", known: "Became Prime Minister in May 1940 as German forces advanced through France, and refused to surrender to the Nazis. He lost the General Election in 1945 but returned as Prime Minister in 1951, and in 2002 was voted the greatest Briton of all time by the public." },
      { name: "Clement Attlee", when: "1945-1951", known: "Winston Churchill's Deputy Prime Minister in the wartime coalition government; became Prime Minister after the Labour Party won the 1945 election and served until 1951. His government nationalised major industries such as coal and steel, created the National Health Service and implemented many of Beveridge's plans." },
      { name: "Aneurin (Nye) Bevan", when: "1948", known: "As Minister for Health he led the establishment of the National Health Service in 1948, which guaranteed a minimum standard of health care for all, free at the point of use." },
      { name: "William Beveridge", when: "1942", known: "His 1942 report Social Insurance and Allied Services, commissioned by the wartime government in 1941, recommended fighting five 'Giant Evils' - Want, Disease, Ignorance, Squalor and Idleness - and provided the basis of the modern welfare state. Attlee's government implemented many of Beveridge's plans." },
      { name: "R A Butler", when: "1944", known: "Oversaw the Education Act 1944, 'The Butler Act', which introduced free secondary education in England and Wales; the primary/secondary division it enforced still remains in most areas of Britain." },
      { name: "Harold Macmillan", when: "the 1950s", known: "Prime Minister of the day during the 1950s recovery, famous for his 'wind of change' speech about decolonisation and independence for the countries of the Empire." },
      { name: "Queen Elizabeth II", when: "from 1952", known: "Reigned from her father's death in 1952, and in 2012 celebrated her Diamond Jubilee - 60 years as queen." },
      { name: "Margaret Thatcher", when: "1979-1990", known: "The first woman Prime Minister of the UK and the longest-serving Prime Minister of the 20th century. Her government privatised the nationalised industries and imposed legal controls on trade union powers, and she worked closely with United States President Ronald Reagan." },
      { name: "John Major", known: "Prime Minister after Mrs Thatcher; he helped establish the Northern Ireland peace process, which the Blair government was later able to build on." },
      { name: "Tony Blair", when: "from 1997", known: "Led Labour to election victory in 1997 and introduced a Scottish Parliament and a Welsh Assembly; his government built on the Northern Ireland peace process, resulting in the Good Friday Agreement signed in 1998." },
      { name: "Sir Alexander Fleming", when: "1928", known: "Discovered penicillin in 1928 while researching influenza. Howard Florey and Ernst Chain developed it into a usable drug, and Fleming won the Nobel Prize in Medicine in 1945." },
      { name: "Ernest Rutherford", known: "Led the scientists, working at Manchester and then Cambridge University, who were the first to 'split the atom'; they took part in the Manhattan Project in the United States, which developed the atomic bomb." },
      { name: "Alan Turing", when: "the 1930s", known: "A British mathematician who invented the Turing machine in the 1930s, a theoretical mathematical device whose theory was influential in the development of computer science and the modern-day computer. (The handbook says nothing about codebreaking.)" },
      { name: "John Logie Baird", when: "1932", known: "Scotsman who developed the television in the 1920s and made the first television broadcast, between London and Glasgow, in 1932." },
      { name: "Sir Robert Watson-Watt", when: "1935", known: "Scotsman who developed radar, proposing that enemy aircraft could be detected by radio waves; the first successful radar test took place in 1935." },
      { name: "Sir Bernard Lovell", known: "Working with radar led him to make new discoveries in astronomy; the radio telescope he built at Jodrell Bank in Cheshire was for many years the biggest in the world and continues to operate today." },
      { name: "Sir Frank Whittle", when: "the 1930s", known: "A British Royal Air Force engineer officer who developed the jet engine in Britain in the 1930s." },
      { name: "John MacLeod", known: "Scottish physician and researcher, co-discoverer of insulin, used to treat diabetes." },
      { name: "Francis Crick", when: "1953", known: "The British scientist among those awarded the Nobel Prize for the discovery of the structure of the DNA molecule in 1953, through work at British universities in London and Cambridge." },
      { name: "Sir Christopher Cockerell", when: "the 1950s", known: "A British inventor who invented the hovercraft in the 1950s." },
      { name: "James Goodfellow", when: "1967", known: "Invented the cash-dispensing ATM, or 'cashpoint', in the 1960s; the first was put into use by Barclays Bank in Enfield, north London, in 1967." },
      { name: "Sir Robert Edwards and Patrick Steptoe", when: "1978", known: "The physiologist and the gynaecologist who pioneered IVF therapy in Britain; the world's first 'test-tube baby' was born in Oldham, Lancashire, in 1978." },
      { name: "Sir Ian Wilmot and Keith Campbell", when: "1996", known: "Two British scientists who in 1996 led the team which was the first to succeed in cloning a mammal, Dolly the sheep." },
      { name: "Sir Peter Mansfield", known: "A British scientist, co-inventor of the MRI scanner, which enables doctors and researchers to obtain exact and non-invasive images of human internal organs." },
      { name: "Sir Tim Berners-Lee", when: "25 December 1990", known: "The British inventor of the World Wide Web; information was successfully transferred via the web for the first time on 25 December 1990." },
      { name: "Dylan Thomas", known: "Welsh poet and writer who often read and performed his work in public, including for the BBC. Best known for the radio play Under Milk Wood and the poem Do Not Go Gentle into That Good Night, written for his dying father." },
      { name: "Roald Dahl", known: "Born in Wales to Norwegian parents; served in the Royal Air Force during the Second World War. Best-known works include Charlie and the Chocolate Factory and George's Marvellous Medicine." },
      { name: "Mary Peters", when: "1972", known: "Won an Olympic gold medal in the pentathlon in 1972, then raised money for local athletics and continues to promote sport and tourism in Northern Ireland." },
    ],
  },
  {
    name: "Britain since 2000",
    span: "2000 - 2024",
    summary:
      "The handbook tells this era as a chain of governments — Labour to 2010, the coalition of 2010-2015, the Conservative government of 2015-2024, Labour again from 2024 — with Afghanistan and Iraq, the 2016 EU referendum and the COVID-19 pandemic running through it. Alongside that: devolution and policing powers moving nation by nation, a new king from 2022, and the 2012 London Olympics carrying most of the era's sporting names.",
    sections: [
      {
        name: "Governments, the forces abroad, and the way out of Europe",
        why: "The spine of the era as the handbook tells it — an unbroken chain of who governed, with the overseas conflicts and the EU question running through the whole of it. The handbook dates the government periods, plus Brown's 2007 takeover and Cameron's arrival in May 2010, but dates no handover at all inside 2015-2024, which is exactly what gets muddled.",
        events: [
          { year: "Since 2000", title: "British forces join the fight against international terrorism", detail: "Operations in Afghanistan and Iraq, against international terrorism and against the proliferation of weapons of mass destruction. Throughout the 1990s Britain had played a leading role in coalition forces in the liberation of Kuwait, following the Iraqi invasion in 1990, and in the conflict in the Former Republic of Yugoslavia.", major: false },
          { year: "2007", title: "Gordon Brown takes over as Prime Minister", detail: "Inside the Labour government the handbook heads '1997-2010'. The Blair government, elected in 1997, introduced a Scottish Parliament and a Welsh Assembly, and in Northern Ireland was able to build on the peace process, resulting in the Good Friday Agreement signed in 1998.", major: false },
          { year: "2009", title: "British combat troops leave Iraq", detail: "The handbook then places the UK in Afghanistan, as part of the United Nations mandated 50-nation International Security Assistance Force (ISAF) coalition and at the invitation of the Afghan government.", major: false },
          { year: "May 2010", title: "No overall majority — the first since February 1974", detail: "For the first time in the UK since February 1974, no political party won an overall majority in the General Election. The Conservative and Liberal Democrat parties formed a coalition and the leader of the Conservative Party, David Cameron, became Prime Minister. The handbook heads the coalition 'from 2010 to 2015'.", major: true },
          { year: "end of 2014", title: "The Afghans are to have full security responsibility by the end of 2014", detail: "The handbook states this as a plan in progress, not as a completed event: international forces are gradually handing over responsibility for security to the Afghans, who will have full security responsibility in all provinces by the end of 2014.", major: false },
          { year: "2015 to 2024", title: "The Conservative government, 2015 to 2024", detail: "The handbook says it saw multiple prime ministers, 'including' David Cameron, Theresa May, Boris Johnson, Liz Truss and Rishi Sunak — the list is introduced as non-exhaustive, and no number is given. Only the order is given; the handbook dates no single handover between them.", major: true },
          { year: "2016", title: "The EU membership referendum", detail: "The Brexit vote. The handbook gives the year alone — no day, and no result figures — and lists it with the leadership changes and the pandemic as the significant events of this period.", major: true },
          { year: "no date given", title: "The COVID-19 pandemic", detail: "Named as one of the significant events of the Conservative government of 2015-2024, alongside the 2016 referendum and the leadership changes. The handbook attaches no year to it.", major: false },
          { year: "31 January 2020", title: "Brexit takes effect at 23:00 GMT", detail: "The UK originally decided not to join this group but became a member in 1973. It left the EU after the Brexit vote. The handbook then gives the count of EU member states now: 27.", major: true },
          { year: "2024", title: "EU law ceases to be part of UK law", detail: "With effect from 2024, no general principle of EU law is part of UK law. European laws themselves are called directives, regulations or framework decisions.", major: false },
          { year: "4 July 2024", title: "Rishi Sunak calls the general election", detail: "Called despite reshuffling his cabinet and local election losses. The Conservative Party's popularity declined during this time, while Labour, the Liberal Democrats and the Greens made substantial gains.", major: false },
          { year: "2024", title: "Labour wins, and Keir Starmer forms the government", detail: "The Labour party, led by Keir Starmer, won the majority in the 2024 general election and formed the government. The handbook's two headings sit side by side: 'Conservative Government from 2015 to 2024' and 'Labour Government from 2024'.", major: true },
        ],
      },
      {
        name: "Devolution, policing and protection",
        why: "Every item here moves the power to make or to enforce a rule — into a devolved assembly, into a directly elected commissioner, or into a new kind of court order — and each is dated separately, so the nations do not change in step.",
        events: [
          { year: "2002", title: "The Northern Ireland Assembly is suspended", detail: "The handbook's sequence: the Good Friday Agreement signed in 1998, the Northern Ireland Assembly elected in 1999, suspended in 2002. The UK government has the power to suspend all devolved assemblies and has used it several times in Northern Ireland when local political leaders found it difficult to work together.", major: false },
          { year: "2007", title: "The Northern Ireland Assembly is reinstated", detail: "It was not reinstated until 2007, and the Assembly has been running successfully since 2007. Most paramilitary groups in Northern Ireland have decommissioned their arms and are inactive.", major: false },
          { year: "2008", title: "Forced Marriage Protection Orders introduced", detail: "For England, Wales and Northern Ireland — under the Forced Marriage (Civil Protection) Act 2007, so the Act is 2007 and the orders 2008. A potential victim, or someone acting for them, can apply. Breaching one is contempt of court, punishable by up to two years in jail.", major: false },
          { year: "2011", title: "Wales can legislate without Westminster's agreement", detail: "Since 2011 the National Assembly for Wales has been able to pass laws in its 20 devolved areas — including education and training, health and social services, economic development and housing — without the agreement of the UK Parliament. The Scottish Parliament was formed in 1999.", major: false },
          { year: "November 2011", title: "Scotland gets its own Protection Orders", detail: "Similar Forced Marriage Protection Orders were introduced in Scotland in November 2011. The 2008 orders had covered England, Wales and Northern Ireland.", major: false },
          { year: "November 2012", title: "The public elects Police and Crime Commissioners", detail: "In England and Wales. Directly elected individuals responsible for the delivery of an efficient and effective police force reflecting the needs of their local communities. PCCs set local police priorities and the local policing budget, and appoint the Chief Constable.", major: false },
          { year: "April 2021", title: "The National Lottery minimum age: 16 to 18", detail: "The handbook: people under 18 are not allowed to participate in the National Lottery, the minimum age rising from 16 to 18 from April 2021. Separately, and with no date given, you have to be 18 to go into betting shops or gambling clubs.", major: false },
        ],
      },
      {
        name: "The crown, and the country counted",
        why: "The two things the handbook reports for this era as periodic readings rather than as events — who sits on the throne, and what the country's own table and survey say about its size and its beliefs.",
        events: [
          { year: "2005", title: "Population just under 60 million", detail: "The handbook's population table. Population growth has been faster in more recent years; migration into the UK and longer life expectancy have played a part in it.", major: false },
          { year: "2009", title: "The Citizenship Survey on religion", detail: "70% identified as Christian; Muslim 4%, Hindu 2%, Sikh 1%, Jewish and Buddhist both less than 0.5%, another religion 2%. In the Citizenship Survey, 21% of people said they had no religion.", major: false },
          { year: "2010", title: "Population just over 62 million", detail: "England more or less consistently makes up 84% of the total population, Wales around 5%, Scotland just over 8% and Northern Ireland less than 3%.", major: false },
          { year: "2012", title: "The Diamond Jubilee", detail: "Sixty years as queen; Elizabeth II had reigned since her father's death in 1952. The clock tower at the Houses of Parliament is named 'Elizabeth Tower' in honour of the Diamond Jubilee.", major: false },
          { year: "8 September 2022", title: "Queen Elizabeth II dies; Charles III becomes king", detail: "Her eldest son takes the throne and has been the sovereign since 2022. His heir apparent is his elder son William, Prince of Wales — the title for the heir apparent — then William's three children in order of birth: George, Charlotte, Louis.", major: true },
          { year: "2022", title: "Population estimated 67.6 million", detail: "The last row of the handbook's population table. Earlier rows on the same table include 1801's 8 million and 1951's 50 million.", major: false },
          { year: "2023", title: "Prince Edward becomes Duke of Edinburgh", detail: "Given the title on his 59th birthday by his eldest brother, King Charles III, who formerly held it.", major: false },
        ],
      },
      {
        name: "The country at play, and the landmarks of the decade",
        why: "The era's dated events outside Westminster — one home Olympics carrying most of the era's sporting names, three public votes (greatest Briton, best-loved novel, favourite view), a supersonic aircraft retired, and the only film on the handbook's list dated after 2000; 2003 and 2012 each carry more than one answer, which is where they get confused.",
        events: [
          { year: "2000", title: "Mary Peters is made a Dame of the British Empire", detail: "In recognition of her work. The handbook's account before it: Olympic gold in the pentathlon in 1972, then raising money for local athletics, team manager for the women's British Olympic team, and continuing to promote sport and tourism in Northern Ireland.", major: false },
          { year: "2002", title: "Churchill voted the greatest Briton of all time", detail: "By the public. He remains a much-admired figure, and made many famous speeches including lines you may still hear.", major: false },
          { year: "2003", title: "Concorde is retired from service", detail: "The world's only supersonic passenger aircraft, developed by Britain and France. It first flew in 1969 and began carrying passengers in 1976.", major: false },
          { year: "2003", title: "The Lord of the Rings voted the country's best-loved novel", detail: "JRR Tolkien's. The same year Concorde was retired — 2003 has more than one answer.", major: false },
          { year: "2003", title: "Touching the Void", detail: "Directed by Kevin MacDonald. The only film on the handbook's list of famous British films dated after 2000; the list runs from The 39 Steps (1935) to this one.", major: false },
          { year: "2004", title: "Two golds on the track, and a solo circumnavigation", detail: "Kelly Holmes won two gold medals for running at the 2004 Olympic Games; Ellen MacArthur became the fastest person to sail around the world singlehanded.", major: false },
          { year: "2007", title: "Wastwater voted Britain's favourite view", detail: "By television viewers. It is in the Lake District, England's largest national park, whose biggest stretch of water is Windermere — the two are easily swapped.", major: false },
          { year: "2008", title: "Ellie Simmonds wins Paralympic swimming gold", detail: "Gold medals for swimming at the 2008 Paralympic Games, as the youngest member of the British team at those Games. She won again at the 2012 Paralympic Games.", major: false },
          { year: "2012", title: "London hosts the Olympic and Paralympic Games", detail: "The UK has hosted the Olympic Games on three occasions: 1908, 1948 and 2012. The main site for 2012 was Stratford, East London, and the British team finished third in the medal table. The Paralympic Games for 2012 were also hosted in London; the Paralympics have their origin in the work of Dr Sir Ludwig Guttman, a German refugee, at Stoke Mandeville hospital in Buckinghamshire.", major: true },
          { year: "2012", title: "Wiggins, Farah and Ennis", detail: "Bradley Wiggins became the first Briton to win the Tour de France; Mo Farah won gold at 5,000 and 10,000 metres and is the first Briton to win the Olympic gold medal in the 10,000 metres; Jessica Ennis won gold in the heptathlon, which includes seven different track and field events.", major: false },
          { year: "2012", title: "Andy Murray wins the US Open", detail: "The men's singles — the first British man to win a singles title in a Grand Slam tournament since 1936. In the same year he won Olympic gold and silver medals and was runner-up in the men's singles at Wimbledon.", major: false },
        ],
      },
    ],
    figures: [
      { name: "Gordon Brown", when: "2007", known: "Took over as Prime Minister in 2007, inside the Labour government the handbook heads 1997-2010." },
      { name: "David Cameron", when: "from May 2010", known: "Leader of the Conservative Party who became Prime Minister when the Conservatives and Liberal Democrats formed the coalition after the May 2010 election. Named first in the handbook's list of the Conservative government's prime ministers." },
      { name: "Theresa May", known: "Named second in the handbook's list of the Conservative government's prime ministers — after Cameron, before Johnson. That position in the order is all the handbook says of her." },
      { name: "Boris Johnson", known: "Named third in the handbook's list of the Conservative government's prime ministers — after May, before Truss." },
      { name: "Liz Truss", known: "Named fourth in the handbook's list of the Conservative government's prime ministers — after Johnson, before Sunak." },
      { name: "Rishi Sunak", when: "4 July 2024", known: "Named last in the handbook's list of the Conservative government's prime ministers, and the one who called the general election for 4 July 2024 despite cabinet reshuffles and local election losses." },
      { name: "Keir Starmer", when: "2024", known: "Led Labour to the majority in the 2024 general election and formed the government." },
      { name: "Queen Elizabeth II", when: "died 8 September 2022", known: "Reigned since her father's death in 1952; celebrated her Diamond Jubilee — 60 years as queen — in 2012, and died on 8 September 2022. She was married to Prince Philip." },
      { name: "King Charles III", when: "since 2022", known: "Elizabeth II's eldest son and the current ruling monarch; sovereign since 2022. He gave the Duke of Edinburgh title, which he formerly held, to his brother Edward in 2023." },
      { name: "William, Prince of Wales", known: "Heir apparent as Charles III's elder son — Prince of Wales is the title for the heir apparent to the throne. His three children follow in order of birth: Prince George, Princess Charlotte, Prince Louis." },
      { name: "Prince Edward", when: "2023", known: "Became Duke of Edinburgh in 2023, on his 59th birthday, by his eldest brother King Charles III." },
      { name: "Dame Mary Peters", when: "2000", known: "Made a Dame of the British Empire in 2000 in recognition of her work — raising money for local athletics, managing the women's British Olympic team, and promoting sport and tourism in Northern Ireland — after winning Olympic gold in the pentathlon in 1972." },
      { name: "Dame Kelly Holmes", when: "2004", known: "Won two gold medals for running at the 2004 Olympic Games. She has held a number of British and European records." },
      { name: "Dame Ellen MacArthur", when: "2004", known: "Yachtswoman who in 2004 became the fastest person to sail around the world singlehanded." },
      { name: "Bradley Wiggins", when: "2012", known: "Cyclist; in 2012 the first Briton to win the Tour de France. He has won seven Olympic medals, including golds at the 2004, 2008 and 2012 Games." },
      { name: "Mo Farah", when: "2012", known: "British distance runner, born in Somalia; won 2012 Olympic golds at 5,000 and 10,000 metres, and is the first Briton to win the Olympic gold medal in the 10,000 metres." },
      { name: "Jessica Ennis", when: "2012", known: "Won the 2012 Olympic gold medal in the heptathlon, which includes seven different track and field events." },
      { name: "Andy Murray", when: "2012", known: "Scottish tennis player; won the 2012 US Open men's singles, the first British man to win a Grand Slam singles title since 1936. In the same year: Olympic gold and silver, and Wimbledon runner-up." },
      { name: "Ellie Simmonds", when: "2008 and 2012", known: "Paralympian with gold medals for swimming at the 2008 and 2012 Paralympic Games, and a number of world records; the youngest member of the British team at the 2008 Games." },
      { name: "Kevin MacDonald", when: "2003", known: "Directed Touching the Void (2003), the only film on the handbook's list of famous British films dated after 2000." },
    ],
  },
];
