/**
 * The panel under every card, in the fixed skeleton of `docs/EXPLANATIONS.md`:
 * lead, then versus, then why, then cluster, then note. Fields drop from the bottom.
 *
 * Written against the handbook and folded in by `.work/apply-rewrites.ts`, which refuses any
 * entry naming a year that is neither in the handbook nor in the fact's own answer — the
 * check runs on the way IN rather than after a thousand cards have been drilled on it.
 * Edit freely; `deck.test.ts` and `npm run deck:vocab` are what keep it honest.
 */

import type { Explanation } from '@/domain/deck/types';

export const EXPLANATIONS: Readonly<Record<string, Explanation>> = {
  f000: {
    lead: "Britain became permanently separated from the continent by the Channel about 10,000 years ago.",
    versus: "Separation is 10,000 years ago; the first farmers are 6,000. The earlier the event, the larger the figure, and the separation is the earlier one.",
    why: "For much of the Stone Age a land bridge joined Britain to the continent, and people came and went following the herds of deer and horses they hunted. The Channel is what ended that.",
  },
  f001: {
    lead: "The first people to live in Britain were hunter-gatherers, in what we call the Stone Age.",
    versus: "Hunter-gatherers came and went, following the herds of deer and horses they hunted. The farmers who arrived about 6,000 years ago stayed and built houses, tombs and monuments. Moving with the food is the hunter-gatherer; staying with it is the farmer.",
  },
  f002: {
    lead: "The first farmers arrived in Britain about 6,000 years ago.",
    versus: "Farming is 6,000 years ago; the separation from the continent is 10,000. Farming is the later event, so it takes the smaller figure.",
    why: "They are the first people in Britain to leave permanent structures behind: houses, tombs and monuments. The handbook says their ancestors probably came from south-east Europe.",
  },
  f003: {
    lead: "Skara Brae is on Orkney, off the north coast of Scotland.",
    versus: "Skara Brae is the only one of the handbook's prehistoric sites that is in Scotland. Stonehenge and Maiden Castle are both in English counties.",
    cluster: [
      { label: "Skara Brae, Orkney", detail: "a village people lived in; the best-preserved prehistoric one in northern Europe" },
      { label: "Stonehenge, Wiltshire", detail: "a monument, probably a gathering place for seasonal ceremonies" },
      { label: "Maiden Castle, Dorset", detail: "an Iron Age hill fort; a settlement built to be defended" },
    ],
  },
  f004: {
    lead: "Skara Brae is the best-preserved prehistoric village in northern Europe.",
    versus: "The claim is best preserved, not oldest, and in northern Europe, not in the world. It is also a village: Maiden Castle is a fort and Stonehenge a monument.",
    why: "Preservation is the whole point of it. Because so much survived, it has helped archaeologists understand how people lived near the end of the Stone Age.",
  },
  f005: {
    lead: "Stonehenge stands in what is now the English county of Wiltshire.",
    versus: "Wiltshire is Stonehenge; Dorset is Maiden Castle. If the site is a monument it is Wiltshire; if it is a hill fort it is Dorset.",
    why: "The handbook says Stonehenge was probably a special gathering place for seasonal ceremonies. It is a place people came to, not one they lived in or defended.",
  },
  f006: {
    lead: "Stonehenge is usually assigned to the Bronze Age.",
    versus: "Maiden Castle is the Iron Age site, and it is a hill fort. The Iron Age follows the Bronze Age, and its mark is defended settlements rather than monuments.",
    why: "The prehistoric periods are named for what people could make: Stone, then Bronze from around 4,000 years ago, then Iron.",
    note: "CHECK THIS ONE. The handbook lists Stonehenge among the monuments built by the first farmers about 6,000 years ago, and then calls the surrounding examples \"other Stone Age sites\" — which reads as Stone Age, not Bronze Age. Confirm against your own copy before drilling this.",
  },
  f007: {
    lead: "People in Britain learned to make bronze around 4,000 years ago, which is what the Bronze Age is named for.",
    versus: "Bronze is 4,000 years ago; farming is 6,000. Bronze is the later event, so it takes the smaller figure.",
    cluster: [
      { label: "About 10,000 years ago", detail: "the Channel cuts Britain off from the continent for good" },
      { label: "About 6,000 years ago", detail: "the first farmers arrive and start building houses, tombs and monuments" },
      { label: "About 4,000 years ago", detail: "people learn to make bronze; roundhouses, round barrows and metalwork in bronze and gold" },
    ],
  },
  f008: {
    lead: "The Iron Age hill fort of Maiden Castle stands in the English county of Dorset.",
    versus: "Dorset is Maiden Castle; Wiltshire is Stonehenge. A fort means Iron Age and Dorset; a monument means the older site and Wiltshire.",
    why: "Iron Age people still lived in roundhouses but grouped them into larger settlements and sometimes defended them. A hill fort is what a defended settlement looks like.",
  },
  f009: {
    lead: "The language spoken in Iron Age Britain was part of the Celtic language family.",
    versus: "Celtic comes before the Romans. The languages of the Jutes, Angles and Saxons, who arrived after the Romans left, are the basis of modern-day English. Different family, several centuries later.",
    why: "Related languages are still spoken today in parts of Wales, Scotland and Ireland. The parts of Britain that stayed free of Anglo-Saxon rule were the west, including much of what is now Wales, and Scotland.",
  },
  f010: {
    lead: "Julius Caesar led a Roman invasion of Britain in 55 BC, and it did not succeed.",
    versus: "Caesar is always the failure and Claudius always the success. If a question says unsuccessful, or names Caesar, the answer is 55 BC; if it says successful, or names Claudius, it is AD 43.",
    why: "Nearly a hundred years passed between the two, and Britain stayed outside the Roman Empire for all of it â which is why the gap is worth holding rather than the two dates on their own.",
  },
  f011: {
    lead: "The Romans invaded successfully in AD 43, under the Emperor Claudius.",
    versus: "The other Roman invasion, Caesar’s in 55 BC, failed. Successful and Claudius both mean AD 43; unsuccessful and Caesar both mean 55 BC.",
    why: "This time there was resistance from some of the British tribes, but the Romans occupied almost all of Britain â which is what makes it the invasion that stuck.",
    cluster: [
      { label: "Caesar, 55 BC", detail: "invaded and failed; Britain then stayed separate from the Empire for nearly a hundred years" },
      { label: "Claudius, AD 43", detail: "led the army that occupied almost all of Britain â the one that stuck" },
      { label: "Boudicca, queen of the Iceni", detail: "the tribal leader who fought back; her statue stands on Westminster Bridge" },
      { label: "Hadrian’s wall", detail: "built in the north to keep the Picts out â Scotland was never conquered" },
      { label: "AD 410", detail: "the army left to defend the rest of the Empire and never returned. Four hundred years in all" },
    ],
  },
  f012: {
    lead: "Claudius was the emperor who led the successful invasion, in AD 43.",
    versus: "Hadrian is the other emperor in this section, and he is the wall rather than the invasion. Claudius came in; Hadrian drew the line at the top.",
    why: "Pairing each emperor with what he is remembered for is enough to answer every question here: Claudius the conquest, Hadrian the northern limit.",
  },
  f013: {
    lead: "Boudicca was queen of the Iceni, in what is now eastern England.",
    versus: "The Iceni are the tribe she led. The Picts are the people Hadrian’s wall was built to keep out, in the north â two different peoples at two different ends of the story.",
    why: "She is still remembered, and there is a statue of her on Westminster Bridge in London, near the Houses of Parliament â which is the detail the handbook chooses to give her.",
  },
  f014: {
    lead: "The statue of Boudicca stands on Westminster Bridge in London, near the Houses of Parliament.",
    why: "The handbook fixes the spot by what stands beside it, and the bridge carries the same name as the place: Westminster.",
  },
  f015: {
    lead: "The Emperor Hadrian built a wall in the north of England, with a number of forts included in it.",
    versus: "Hadrian built the wall; Claudius led the invasion. If a question names a wall, it is Hadrian.",
    why: "Parts of it can still be seen, including the forts of Housesteads and Vindolanda, and it is a UNESCO World Heritage Site.",
    note: "The handbook gives no date for the wall. Any year offered for it is not from the book.",
  },
  f016: {
    lead: "The wall was built to keep out the Picts, the ancestors of the Scottish people.",
    versus: "The Picts are north of the wall. The Iceni are Boudicca’s tribe, in what is now eastern England â the resistance inside the occupied part, not the people outside it.",
    why: "The wall and the Picts are the same fact from two directions: areas of what is now Scotland were never conquered, so a line had to be drawn.",
  },
  f017: {
    lead: "Areas of what is now Scotland were never conquered by the Romans.",
    versus: "Almost all of the rest of Britain was occupied after AD 43. Scotland is the exception, and the wall is the evidence of it.",
    why: "This is why Hadrian built a wall in the north of England and why the Picts matter â the three facts are one story, and knowing any one of them recovers the others.",
  },
  f018: {
    lead: "The Roman army left Britain in AD 410 and never returned.",
    versus: "AD 43 is the arrival, AD 410 the departure. Both are AD and both begin with a four, which is exactly why they get swapped â the longer number is the later one.",
    why: "They left to defend other parts of the Roman Empire, not because they were driven out. Britain was then invaded by the Jutes, the Angles and the Saxons.",
  },
  f019: {
    lead: "The Romans remained in Britain for four hundred years.",
    versus: "The figure is the span, not either end of it: AD 43 in, AD 410 out. Subtracting the two gives the same answer, which is the check to make if the number will not come.",
    why: "In that time they built roads and public buildings, created a structure of law, and introduced new plants and animals â and the first Christian communities began to appear.",
  },
  f020: {
    lead: "After the Romans left, Britain was invaded by tribes from northern Europe: the Jutes, the Angles and the Saxons.",
    versus: "These are the Anglo-Saxons, arriving after AD 410. The Vikings are the later invaders, from Denmark and Norway, first raiding in AD 789.",
    why: "The languages they spoke are the basis of modern-day English, which is why the handbook names them at all.",
  },
  f021: {
    lead: "By about AD 600, Anglo-Saxon kingdoms were established in Britain.",
    versus: "AD 410 is the Romans leaving; AD 600 is the kingdoms that replaced them being established. Battles were fought against the invaders in between.",
    why: "These kingdoms were mainly in what is now England. Parts of the west of Britain, including much of what is now Wales, and Scotland, remained free of Anglo-Saxon rule.",
  },
  f022: {
    lead: "Sutton Hoo, the Anglo-Saxon burial site, is in modern Suffolk.",
    why: "One of the Anglo-Saxon kings was buried there with treasure and armour, all placed in a ship which was then covered by a mound of earth.",
  },
  f024: {
    lead: "St Augustine became the first Archbishop of Canterbury.",
    versus: "Rome and the south mean Augustine; Ireland and the north mean Columba.",
    cluster: [
      { label: "St Augustine", detail: "led missionaries from Rome, spread Christianity in the south, became the first Archbishop of Canterbury" },
      { label: "St Columba", detail: "came from Ireland, founded a monastery on Iona, spread the religion in the north" },
      { label: "St Patrick", detail: "the other famous missionary from Ireland; he became the patron saint of Ireland" },
    ],
  },
  f025: {
    lead: "St Columba founded a monastery on the island of Iona, off the coast of what is now Scotland.",
    versus: "Columba came from Ireland and preached in the north; Augustine led missionaries from Rome and preached in the south. North and Ireland mean Iona.",
  },
  f026: {
    lead: "The Vikings first visited Britain in AD 789, raiding coastal towns and taking away goods and slaves.",
    versus: "AD 600 is the Anglo-Saxon kingdoms already established; AD 789 is the Vikings arriving to raid them.",
    why: "They came first to raid, then began to stay and form their own communities in the east of England and Scotland. That is the run-up to a Danish king holding the throne.",
  },
  f027: {
    lead: "The Vikings came from Denmark and Norway.",
    versus: "Denmark and Norway are the Vikings. The Jutes, Angles and Saxons came earlier from northern Europe; William came later from Normandy, in what is now northern France. Three invasions, three origins.",
    why: "Denmark is the one to hold, because the short break in Anglo-Saxon rule that follows is a run of Danish kings, beginning with Cnut.",
  },
  f028: {
    lead: "The Anglo-Saxon kingdoms in England united under King Alfred the Great, who defeated the Vikings.",
    versus: "Alfred defeated the Vikings and united the English kingdoms; Cnut was the Danish king who later ruled England. Alfred beat them, Cnut was one of them.",
    why: "Defeat did not mean removal. Many of the Viking invaders stayed anyway, especially in the east and north of England, in an area known as the Danelaw, and mixed with local communities.",
  },
  f030: {
    lead: "The people of the north united under one king, Kenneth MacAlpin, against the threat of Viking attack.",
    versus: "Alfred the Great is the kingdoms in England uniting; Kenneth MacAlpin is the people in the north uniting. Same Viking pressure, two countries.",
    why: "The term Scotland began to be used to describe that country after this, so the unification is where the name starts.",
  },
  f031: {
    lead: "Cnut, also called Canute, was the first Danish king to rule England.",
    versus: "Anglo-Saxon kings ruled what is now England throughout, except for a short period of Danish kings, and Cnut was the first of those. Alfred is the Anglo-Saxon who beat the Vikings; Cnut is the Viking side taking the throne.",
    why: "He completes the arc the handbook sets out: raiding in AD 789, then staying and forming communities, then ruling.",
  },
  f032: {
    lead: "The Battle of Hastings was fought in 1066.",
    versus: "1066 is Hastings and 1215 is Magna Carta. Hastings changed who ruled England; Magna Carta changed what the ruler could do.",
    why: "It was the last successful foreign invasion of England, and the handbook dates the Middle Ages from it: 1066 to about 1485.",
  },
  f033: {
    lead: "William, the Duke of Normandy, defeated the English at the Battle of Hastings.",
    versus: "William is the Norman who won and became king; Harold is the Saxon king of England who was killed. Duke of Normandy names the winner.",
    why: "Normandy is in what is now northern France. William became king of England, and it is this that makes him William the Conqueror.",
  },
  f034: {
    lead: "Harold, the Saxon king of England, was killed at the Battle of Hastings.",
    versus: "Harold is the English king who died; William, Duke of Normandy, is the invader who won. If the question asks who was killed, it is Harold.",
    why: "His death is the end of Anglo-Saxon rule in England, and the Norman Conquest is the last successful foreign invasion the handbook records.",
  },
  f035: {
    lead: "The Battle of Hastings is commemorated in a great piece of embroidery known as the Bayeux Tapestry.",
    versus: "The Bayeux Tapestry records the battle; the Domesday Book records the land, town by town and village by village. Both come out of the Norman Conquest, one an embroidery and one a survey.",
    why: "It still exists and can be seen in France today, which is the detail the handbook adds.",
  },
  f037: {
    lead: "Magna Carta was agreed in 1215.",
    versus: "1215 is Magna Carta and 1066 is Hastings. Hastings settled who ruled England; Magna Carta limited what he could do with it.",
    why: "The handbook says there were few formal limits to the king's power until 1215, so the date marks where the limits start.",
  },
  f038: {
    lead: "King John was forced by his noblemen to agree to Magna Carta.",
    versus: "John is Magna Carta; Edward I is the Statute of Rhuddlan. John was forced into an agreement by his own noblemen at home; Edward I imposed a statute on Wales.",
    why: "He was forced into it rather than offering it, which is how the charter came to establish that even the king was subject to the law.",
  },
  f040: {
    lead: "Magna Carta means the Great Charter.",
    why: "What it did matches the name. It was a charter of rights: it protected the rights of the nobility and restricted the king's power to collect taxes or to make or change laws.",
  },
  f041: {
    lead: "By 1200, the English ruled an area of Ireland around Dublin known as the Pale.",
    why: "The Pale was only a part of Ireland. Some important lords elsewhere accepted the authority of the English king, but the Pale is the ground the English actually ruled.",
  },
  f042: {
    lead: "The Statute of Rhuddlan, which annexed Wales to the Crown of England, was passed in 1284.",
    versus: "1284 is Wales annexed; 1314 is Bannockburn, where Scotland was not. In Wales the English kings established their rule, in Scotland they were less successful.",
    why: "Huge castles, including Conwy and Caernarvon, were built to hold the power the statute claimed. English laws and the English language were introduced.",
  },
  f043: {
    lead: "King Edward I of England introduced the Statute of Rhuddlan.",
    versus: "Edward I is Wales and a statute; Robert the Bruce is Scotland and a battle. Edward I appears where the English kings succeeded.",
    why: "The handbook sets the two side by side: in Wales the English were able to establish their rule, and in Scotland the English kings were less successful.",
  },
  f044: {
    lead: "The Scots defeated the English at the Battle of Bannockburn in 1314.",
    versus: "1314 is Bannockburn and Scotland; 1284 is the Statute of Rhuddlan and Wales. Wales was annexed, Scotland was not.",
    why: "The handbook gives the consequence in the same sentence: after Bannockburn, Scotland remained unconquered by the English.",
  },
  f045: {
    lead: "Robert the Bruce led the Scottish victory over the English at the Battle of Bannockburn.",
    versus: "Robert the Bruce is Scotland against the English; Kenneth MacAlpin is Scotland against the Vikings, centuries earlier. Bruce defends a country that already has its name.",
    why: "Scotland remained unconquered by the English after it, which is what the handbook says the victory bought.",
  },
  f047: {
    lead: "The Hundred Years War actually lasted 116 years.",
    versus: "The Hundred Years War is the long war with France; the Wars of the Roses is the civil war at home. Only the war abroad has the misleading name.",
    why: "The name is the trap. The figure to hold is 116, sixteen more than the name offers.",
  },
  f048: {
    lead: "The Battle of Agincourt was fought in 1415.",
    versus: "1415 is Agincourt, in France; 1314 is Bannockburn, in Scotland. Agincourt the English won, Bannockburn they lost.",
    why: "It is one of the most famous battles of the Hundred Years War, and the detail to keep is the odds: King Henry V's vastly outnumbered English army defeated the French.",
  },
  f049: {
    lead: "King Henry V won the Battle of Agincourt, where his vastly outnumbered English army defeated the French.",
    why: "Shakespeare's Henry V is the same king. The handbook lists 'Once more unto the breach', from that play, among the lines still often quoted today.",
  },
  f050: {
    lead: "A disease, probably a form of plague, reached Britain in 1348 and became known as the Black Death.",
    versus: "The Black Death is 1348; the Great Plague that struck London is 1665. Both are plagues, and they are three centuries apart.",
    why: "It sits between Bannockburn in 1314 and Agincourt in 1415, so it belongs to the later Middle Ages rather than the early ones.",
  },
  f051: {
    lead: "About one third of the population of England died in the Black Death, and a similar proportion in Scotland and Wales.",
    why: "A smaller population meant less need to grow cereal crops and a shortage of labour, so peasants began to demand higher wages. That is how the handbook explains the rise of the gentry, the move from the countryside into the towns, and the growth of a strong middle class.",
  },
  f052: {
    lead: "The Wars of the Roses began in 1455, a civil war over who should be king of England.",
    versus: "1455 is where the fighting starts and 1485 is where it ends, at Bosworth Field. A question about the beginning takes 1455; one about the ending, or about the first Tudor king, takes 1485.",
    why: "It was fought between the supporters of two families, the House of Lancaster and the House of York, and it ran for thirty years.",
  },
  f053: {
    lead: "The emblem of the House of Lancaster was a red rose.",
    versus: "Lancaster is the side that won: Henry Tudor led Lancaster and took the crown at Bosworth. The winning colour is red, the losing colour white.",
    why: "The Tudor symbol that followed was a red rose with a white rose inside it, so red is the one on the outside.",
  },
  f054: {
    lead: "The emblem of the House of York was a white rose.",
    versus: "York is the side that lost: Richard III of York was killed at Bosworth and Henry Tudor of Lancaster became king. The losing colour is white, the winning colour red.",
    why: "The Tudor symbol that followed was a red rose with a white rose inside it, so white is the one enclosed.",
  },
  f055: {
    lead: "The Battle of Bosworth Field was fought in 1485 and ended the Wars of the Roses.",
    versus: "1455 begins the wars and 1485 ends them. Bosworth is always the ending, never the start.",
    why: "The handbook also puts the end of the Middle Ages at about 1485, so the battle closes the wars and the period together.",
    cluster: [
      { label: "1455", detail: "the wars begin, between the supporters of Lancaster and York, over who should be king of England" },
      { label: "Richard III", detail: "the York king killed in the battle" },
      { label: "Henry VII", detail: "Henry Tudor of Lancaster, who took the crown and became the first king of the House of Tudor" },
      { label: "Elizabeth of York", detail: "Richard's niece, whom Henry married to unite the two families" },
    ],
  },
  f056: {
    lead: "King Richard III, of the House of York, was killed at the Battle of Bosworth Field.",
    versus: "Richard III is the king who died at Bosworth; Henry VII is the man who won it. Asked who was killed, it is the York king; asked who became king, it is the Lancaster one.",
    why: "Henry then married Richard's niece, Elizabeth of York, which is how the two families were united.",
  },
  f057: {
    lead: "Henry Tudor, leader of the House of Lancaster, became King Henry VII after Bosworth Field.",
    versus: "Henry VII is the first Tudor and the man who won at Bosworth. Henry VIII is his son, the one with six wives and the break from Rome.",
    why: "He set about securing his position by strengthening central administration and reducing the power of the nobles, and his son continued that policy of centralising power.",
  },
  f058: {
    lead: "Henry VII married Elizabeth of York, King Richard's niece, and so united the two families.",
    versus: "Elizabeth of York is Henry VII's wife. Elizabeth I is Henry VIII's daughter and a queen in her own right, two generations later.",
    why: "The Tudor symbol records the marriage: a red rose with a white rose inside it, as a sign that the Houses of York and Lancaster were now allies.",
  },
  f060: {
    lead: "The Scottish Parliament had three Houses, called Estates: the lords, the commons and the clergy.",
    versus: "The English Parliament of the same period had two Houses, the Lords and the Commons. The third Scottish Estate is the clergy, and that is the whole difference.",
  },
  f062: {
    lead: "Henry VIII married six times.",
    why: "The first was Catherine of Aragon, and the divorce the Pope would not grant him is what led to the Church of England. Between them the six marriages produced one son and two daughters who survived, and all three came to the throne in turn.",
    cluster: [
      { label: "Anne Boleyn, the second", detail: "English, and the mother of Elizabeth; accused of taking lovers and executed at the Tower of London" },
      { label: "Jane Seymour, the third", detail: "gave Henry the son he wanted, Edward, and died shortly after the birth" },
      { label: "Anne of Cleves, the fourth", detail: "a German princess, married for political reasons and divorced soon after" },
      { label: "Catherine Howard, the fifth", detail: "a cousin of Anne Boleyn, accused of the same thing and also executed" },
      { label: "Catherine Parr, the sixth", detail: "a widow who married Henry late in his life, survived him and married again" },
    ],
  },
  f063: {
    lead: "Henry VIII's first wife was Catherine of Aragon, a Spanish princess.",
    versus: "Anne Boleyn is the second wife and the better known one. A Spanish princess, the first marriage, or the divorce the Pope refused all point to Catherine of Aragon.",
    why: "They had a number of children but only Mary survived. When Catherine was too old to give him another child he decided to divorce her, and the Pope's refusal is what produced the Church of England.",
  },
  f064: {
    lead: "Mary I was the daughter of Catherine of Aragon, Henry VIII's first wife.",
    versus: "Mary's mother is the first wife, the one the Pope would not let Henry divorce. Elizabeth's mother is the second wife, the one he broke with Rome in order to marry.",
    why: "The religion follows the mother in both cases: Mary was a devout Catholic and Elizabeth a Protestant.",
  },
  f065: {
    lead: "Elizabeth I was the daughter of Anne Boleyn, Henry VIII's second wife.",
    versus: "Anne Boleyn gives Elizabeth; Catherine of Aragon gives Mary. Anne is the wife the break from Rome was for, and her daughter reigned as a Protestant.",
    why: "Anne was English, was unpopular in the country, and was accused of taking lovers and executed at the Tower of London.",
  },
  f066: {
    lead: "Jane Seymour gave birth to Henry VIII's son Edward, and died shortly after.",
    versus: "Jane is the wife who produced a son; Catherine of Aragon and Anne Boleyn each produced a daughter. She is also the one who died, rather than being divorced or executed.",
    why: "Henry married her after Anne Boleyn's execution, so she is the third wife and follows directly on from the second.",
  },
  f067: {
    lead: "Anne of Cleves was a German princess.",
    versus: "Catherine of Aragon is the Spanish princess; Anne of Cleves is the German one.",
    why: "Henry married her for political reasons and divorced her soon after.",
  },
  f068: {
    lead: "Catherine Howard, a cousin of Anne Boleyn, was accused of taking lovers and executed.",
    versus: "Two wives were executed, and on the same accusation. Anne Boleyn is the second wife and Elizabeth's mother; Catherine Howard is the fifth and her cousin. A cousin in the question means Howard.",
  },
  f069: {
    lead: "Catherine Parr was the wife who outlived Henry VIII.",
    versus: "Three of the six were called Catherine: Aragon the first, Howard the fifth, Parr the sixth. Parr is the one who survived him.",
    why: "She was a widow who married Henry late in his life, survived him, married again and died soon after.",
  },
  f072: {
    lead: "Henry VIII established the Church of England, with himself rather than the Pope at its head.",
    versus: "The Church of Scotland is the other national church and a separate story: there the break came from Parliament in 1560, and unlike the Church of England it was never a state Church.",
    why: "In the new Church the king, not the Pope, held the power to appoint bishops and to order how people should worship.",
  },
  f075: {
    lead: "Edward VI became king at the age of nine.",
    versus: "Fifteen is the age he died at, not the age he came to the throne.",
    why: "The handbook says he died at 15 after ruling for just over six years, so nine is what is left when you take one from the other.",
  },
  f076: {
    lead: "The Book of Common Prayer was written during the reign of Edward VI, for use in the Church of England.",
    versus: "The King James Bible is the other English-language book in this story, and it belongs to James I. A prayer book means Edward; a Bible translation means James.",
    why: "Edward VI was strongly Protestant, and a version of the book is still used in some churches today.",
  },
  f077: {
    lead: "Mary I is remembered as 'Bloody Mary', because she persecuted Protestants.",
    versus: "Mary I is Henry VIII's daughter and queen of England. Mary, Queen of Scots is her Scottish contemporary and Elizabeth I's cousin, the one kept prisoner and executed.",
    why: "She was a devout Catholic between two Protestant monarchs, her half-brother Edward VI before her and her half-sister Elizabeth I after, so the official religion changed with each of the three.",
  },
  f079: {
    lead: "Elizabeth I's reign ended in 1603, when she died.",
    versus: "1603 joined the crowns but not the countries. The Act of Union in 1707 is what created the Kingdom of Great Britain.",
    why: "She never married and had no children of her own, so her heir was her cousin James VI of Scotland.",
  },
  f080: {
    lead: "Elizabeth I's religious compromise is known as the 'middle way'.",
    versus: "Mary I had tried to restore Catholicism by persecuting Protestants. Elizabeth instead regulated what was done in public and left private belief alone.",
    why: "Everyone had to attend their local church and there were laws about services and prayers, but she did not ask about people's real beliefs. That balance between Catholics and the more extreme Protestants is how she avoided serious religious conflict within England.",
  },
  f081: {
    lead: "The Spanish Armada was defeated in 1588.",
    versus: "The Armada belongs late in Elizabeth I's reign; her accession is the event at the start of it. The two years differ by a single digit, so the thing to fix is which end of the reign the question is asking about.",
    why: "The fleet had been sent by Spain to conquer England and restore Catholicism, and the handbook dates Elizabeth's popularity from this victory rather than from her accession.",
  },
  f082: {
    lead: "William Shakespeare was born in 1564.",
    versus: "1564 is his birth and 1616 his death. The handbook gives the two together, so either one checks the other.",
    why: "He was born in Stratford-upon-Avon, and his life runs from early in Elizabeth I's reign, which ended in 1603, into James I's.",
  },
  f083: {
    lead: "In 1560 the Scottish Parliament abolished the authority of the Pope in Scotland.",
    versus: "In England the break came from the king, who wanted a marriage undone. In Scotland it came from Parliament, which was predominantly Protestant.",
    why: "Roman Catholic religious services became illegal, and the Protestant Church of Scotland set up then was never a state Church, unlike the Church of England.",
  },
  f084: {
    lead: "The Church of Scotland adopted a Presbyterian form of government, without bishops.",
    versus: "The Church of England kept bishops and is a state Church with the monarch at its head. The Church of Scotland is governed by ministers and elders, and was never a state Church.",
    why: "Charles I later tried to impose a revised English Prayer Book on the Presbyterian Church in Scotland, and the unrest that followed is where the road to the Civil War begins.",
  },
  f085: {
    lead: "Mary Stuart became Queen of Scots when she was a week old, on her father's death.",
    versus: "Edward VI is the other child monarch in this part of the story, and he was nine. A week means Mary; nine means Edward.",
    why: "Much of her childhood was spent in France, and she was at the centre of a power struggle between different groups when she returned to Scotland.",
  },
  f087: {
    lead: "James VI of Scotland became King of England in 1603, on the death of Elizabeth I.",
    versus: "1603 joined the crowns; it did not join the countries. Scotland remained a separate country until the Act of Union in 1707 created the Kingdom of Great Britain.",
    why: "Elizabeth never married and had no children of her own, so her heir was her cousin. He was also the son of Mary, Queen of Scots, who had given him her Scottish throne.",
  },
  f088: {
    lead: "In England, James VI of Scotland took the title James I.",
    versus: "Same man, two numbers: James VI in Scotland and James I in England, because the two countries counted their kings separately.",
    why: "He became King James I of England, Wales and Ireland, but Scotland remained a separate country.",
  },
  f089: {
    lead: "The plot to kill the king with a bomb in the Houses of Parliament was in 1605.",
    versus: "1603 is when James I came to the throne, and 1605 is the plot against him, two years into the reign.",
    why: "Bonfire Night on 5 November is the yearly reminder of it: a group of Catholics led by Guy Fawkes failed in their plan to kill the Protestant king.",
  },
  f090: {
    lead: "Guy Fawkes is the plotter whose name survived. He led the group of Catholics who failed in their plan to kill the Protestant king with a bomb in the Houses of Parliament, in 1605.",
    why: "It was a group, not one man acting alone, but the handbook's own framing puts Fawkes at the head of it, so his is the name that carries the whole plot.",
    cluster: [
      { label: "The plot, 1605", detail: "the year the group failed; it falls in James I's reign" },
      { label: "Bonfire Night, 5 November", detail: "the fireworks every year are the anniversary of that failure" },
    ],
  },
  f092: {
    lead: "Civil war between King Charles I and Parliament began in 1642.",
    versus: "1642 is the war starting, 1649 is Charles I's execution and 1660 is the monarchy coming back. This is the first of the three.",
    why: "The cause is a chain rather than a date. Charles I believed in the Divine Right of Kings and found ways to rule for 11 years without Parliament; trouble in Scotland forced him to recall it in 1640 for money; when Parliament demanded control of the army he entered the Commons to arrest five of its leaders. War could not then be avoided.",
    cluster: [
      { label: "Cavaliers", detail: "those who supported the king" },
      { label: "Roundheads", detail: "those who supported Parliament, many of them Puritans" },
      { label: "1649", detail: "Parliament had clearly won by 1646 and held Charles prisoner; he was executed three years later" },
      { label: "1660", detail: "the monarchy restored under Charles II, after 11 years of republic" },
    ],
  },
  f093: {
    lead: "The supporters of King Charles I were known as the Cavaliers.",
    versus: "Roundheads is the other half of the pair and it belongs to Parliament, whose members were largely Puritans. Nothing religious attaches to the Cavaliers: they are the king's supporters and nothing more.",
    why: "The country split into the two when the war began in 1642, so the nicknames and the date are one fact.",
  },
  f094: {
    lead: "The supporters of Parliament were known as the Roundheads.",
    versus: "Cavaliers is the other half of the pair and it belongs to the king. Roundheads go with Parliament.",
    why: "Parliament is the Puritan side. Many of its members were Puritans, Protestants who wanted strict and simple doctrine and worship and disliked Charles I's reforms of the Church of England, which is the religious quarrel sitting under the constitutional one.",
  },
  f095: {
    lead: "Charles I was executed in 1649.",
    versus: "1642 is the war starting; 1649 is the end of it for Charles I. Parliament had already won by 1646.",
    why: "He did not die in the fighting. Parliament had clearly won by 1646 and the parliamentary army held him prisoner; he was executed three years later because he was still unwilling to reach any agreement with Parliament.",
    cluster: [
      { label: "The Commonwealth", detail: "the republic declared straight after; England no longer had a monarch" },
      { label: "Lord Protector", detail: "the title Cromwell was given as leader of that republic; he ruled until his death in 1658" },
      { label: "1660", detail: "the monarchy restored under Charles II, after 11 years without one" },
    ],
  },
  f096: {
    lead: "After the execution of Charles I, England declared itself a republic called the Commonwealth.",
    versus: "The modern Commonwealth in the government chapter is a different thing under the same word: a group of member countries headed by the monarch. This one is a republic with no monarch at all.",
    why: "It is the only period in British history when the country had no monarch, and it lasted 11 years.",
    cluster: [
      { label: "1649", detail: "Charles I executed; the republic is declared immediately after" },
      { label: "Lord Protector", detail: "the title Cromwell was given, deliberately not king" },
      { label: "1660", detail: "Parliament invites Charles II back and the republic ends" },
    ],
  },
  f097: {
    lead: "Oliver Cromwell was given the title of Lord Protector.",
    versus: "The title is deliberately not king. England was a republic with no monarch, and the Lord Protector led it.",
    why: "He ruled until his death in 1658. His son Richard became Lord Protector in his place but could control neither the army nor the government, and people began to talk about the need for a king.",
  },
  f098: {
    lead: "The Battle of Worcester was fought in 1651.",
    versus: "1649 is Charles I's execution; 1651 is the defeat of his son's army. Same family, two years apart.",
    why: "The Scots had not agreed to the execution of Charles I and declared his son king instead. Cromwell beat the Scottish army he led into England, and Charles II escaped from Worcester and eventually fled to Europe, which is the man Parliament invites back in 1660.",
    note: "The handbook names the Battle of Worcester but gives no year for it.",
  },
  f099: {
    lead: "The monarchy was restored in 1660, when Parliament invited Charles II to come back.",
    versus: "1649 ends the monarchy and 1660 brings it back, with 11 years of republic in between.",
    why: "He returned on Parliament's invitation, from exile in the Netherlands, rather than by force. That is why he understood he could not always do as he wished and would sometimes need to reach agreement with Parliament.",
    cluster: [
      { label: "1649", detail: "Charles I executed; the monarchy ends" },
      { label: "The Commonwealth", detail: "the republic in between, with no monarch" },
      { label: "1665", detail: "the plague in London, five years into his reign" },
      { label: "The Habeas Corpus Act, 1679", detail: "passed in his reign; no one may be held prisoner unlawfully" },
    ],
  },
  f100: {
    lead: "The Great Plague struck London in 1665.",
    versus: "The plague is 1665 and the fire is the following year. Plague first, then fire.",
    why: "Thousands of people died, especially in the poorer areas, and it fell in Charles II's reign.",
    cluster: [
      { label: "1660", detail: "Charles II restored; the plague comes five years into his reign" },
      { label: "The fire", detail: "the following year, destroying much of the city including St Paul's Cathedral" },
      { label: "Sir Christopher Wren", detail: "designed the new St Paul's that replaced the one the fire destroyed" },
    ],
  },
  f101: {
    lead: "The Great Fire of London was in 1666.",
    versus: "The plague is 1665 and the fire is the year after. Plague first, then fire.",
    why: "It destroyed much of the city, including many churches and St Paul's Cathedral, which is the whole reason there was a new St Paul's for Sir Christopher Wren to design.",
    note: "The handbook does not print the year. It dates the plague to 1665 and says the fire came the following year.",
  },
  f102: {
    lead: "The rebuilt St Paul's Cathedral was designed by Sir Christopher Wren.",
    versus: "Inigo Jones is the other 17th-century architect here, and he is the classical one: the Queen's House at Greenwich and the Banqueting House in Whitehall. Wren came later in the century and the ornate European styles.",
    why: "The commission exists because of the fire. It destroyed the old cathedral, and London was rebuilt with a new St Paul's.",
  },
  f103: {
    lead: "The Habeas Corpus Act became law in 1679.",
    versus: "1679 is the Habeas Corpus Act and 1689 is the Bill of Rights. The earlier one is about prisoners; the later one is about Parliament.",
    why: "It belongs to Charles II's reign, before the Glorious Revolution, and it remains relevant today.",
    cluster: [
      { label: "Magna Carta, 1215", detail: "the first of the three; King John forced by his noblemen to accept limits on his power" },
      { label: "The Habeas Corpus Act, 1679", detail: "no one may be held prisoner unlawfully; every prisoner has a right to a court hearing" },
      { label: "The Bill of Rights, 1689", detail: "confirmed the rights of Parliament and the limits of the king's power" },
    ],
  },
  f104: {
    lead: "The Habeas Corpus Act guaranteed that no one could be held prisoner unlawfully.",
    versus: "The Bill of Rights is the one about taxes and Parliament. Habeas corpus is about the prisoner, not the purse.",
    why: "The name is the protection. Habeas corpus is Latin for 'you must present the person in court', so the state cannot simply hold someone: every prisoner has a right to a court hearing.",
  },
  f106: {
    lead: "The two main groups in Parliament in the later Stuart period were known as the Whigs and the Tories.",
    versus: "Roundheads and Cavaliers are the civil war sides, decades earlier and outside Parliament. Whigs and Tories are groups inside Parliament, and they are the beginning of party politics.",
    why: "They appeared because the settlement after the Glorious Revolution left the monarch needing ministers who could ensure a majority in the House of Commons and the House of Lords. The modern Conservative Party is still sometimes called the Tories.",
  },
  f107: {
    lead: "The Glorious Revolution was in 1688.",
    versus: "1688 is the event; 1689 is the Bill of Rights that wrote the settlement down. Revolution first, law the year after.",
    why: "It is called Glorious because there was no fighting in England and because it guaranteed the power of Parliament, ending the threat of a monarch ruling alone as he or she wished.",
    cluster: [
      { label: "William of Orange", detail: "the Protestant ruler of the Netherlands, asked to invade; he met no resistance" },
      { label: "James II", detail: "the Catholic king who fled to France rather than fight" },
      { label: "The Bill of Rights, 1689", detail: "the settlement written down the following year" },
      { label: "The Battle of the Boyne, 1690", detail: "James II's attempt to regain the throne through Ireland, and its defeat" },
    ],
  },
  f108: {
    lead: "William of Orange, the Protestant ruler of the Netherlands, was invited to take the English throne in 1688.",
    versus: "James II is the king who left and William of Orange is the one who came in. Both belong to the same year, so hold the direction: James out to France, William in from the Netherlands.",
    why: "He was already inside the family, married to Mary, James II's elder daughter and his own cousin, and he ruled jointly with her rather than alone.",
  },
  f109: {
    lead: "James II was the king who fled to France during the Glorious Revolution.",
    versus: "Charles II was his brother, and the direction is opposite. Charles II came back from exile in 1660; James II went into exile in 1688.",
    why: "When William reached England there was no resistance, so James left rather than fight. France then backed his attempt to regain the throne through Ireland, which is why the Battle of the Boyne follows in 1690.",
  },
  f110: {
    lead: "The Battle of the Boyne was fought in Ireland in 1690.",
    versus: "1688 is the revolution in England, where there was no fighting. 1690 is the fighting, and it is in Ireland.",
    why: "It is the revolution finishing itself off. James II invaded Ireland with the help of a French army to regain the throne, William defeated him there, and the anniversary in July is still a public holiday in Northern Ireland.",
  },
  f111: {
    lead: "The Bill of Rights was passed in 1689.",
    versus: "1679 is the Habeas Corpus Act and 1689 is the Bill of Rights. The earlier one protects the prisoner; the later one confirms the rights of Parliament and the limits of the king's power.",
    why: "It came the year after the revolution and wrote the settlement down: no raising taxes or administering justice without Parliament's agreement, funding for the army and navy renewed every year, and a monarch who must be a Protestant.",
    cluster: [
      { label: "1688", detail: "the Glorious Revolution itself; the Bill of Rights follows it" },
      { label: "The Habeas Corpus Act, 1679", detail: "the earlier Act, and the one about prisoners rather than Parliament" },
      { label: "Whigs and Tories", detail: "the groupings that appear because the monarch now needs a majority in Parliament" },
    ],
  },
  f112: {
    lead: "The Act of Union that joined England and Scotland was agreed in 1707.",
    versus: "1603 joined the crowns, when James VI of Scotland also became King of England and Scotland remained a separate country. 1707 joined the parliaments.",
    why: "Succession, not conquest. Queen Anne had no surviving children, and that created uncertainty over who would inherit in Scotland as well as in England, Wales and Ireland.",
    cluster: [
      { label: "1603", detail: "the crowns joined under one king; the countries stayed separate" },
      { label: "The Kingdom of Great Britain", detail: "the state 1707 created; nothing is 'United' yet" },
      { label: "What Scotland kept", detail: "its own legal and education systems and its Presbyterian Church" },
      { label: "1801", detail: "Ireland added, creating the United Kingdom of Great Britain and Ireland" },
    ],
  },
  f113: {
    lead: "The 1707 Act of Union created the Kingdom of Great Britain.",
    versus: "Nothing is 'United' yet. That word arrives in 1801, when Ireland is added and the state becomes the United Kingdom of Great Britain and Ireland.",
    why: "Scotland was no longer an independent country but kept its own legal and education systems and its Presbyterian Church, so the union was of parliaments rather than of everything.",
  },
  f114: {
    lead: "Supporters of the exiled Stuart claim to the throne became known as Jacobites.",
    versus: "Cavaliers were the king's side in the civil war, two generations earlier. Jacobites are the people who went on believing James II was the rightful king after he had already been driven out.",
    why: "Support was strongest in Scotland. Some joined James in exile in France and others were secret supporters, which is why the risings that follow begin there.",
    cluster: [
      { label: "James II", detail: "the king they held to be rightful, driven out in 1688" },
      { label: "1745", detail: "Bonnie Prince Charlie lands in Scotland, backed by highland clansmen" },
      { label: "Charles Edward Stuart", detail: "his real name, and James II's grandson" },
      { label: "1746", detail: "Culloden, where George II's army beat him and the rising ended" },
    ],
  },
  f115: {
    lead: "Bonnie Prince Charlie landed in Scotland to lead a rising in 1745.",
    versus: "1745 is the landing and the early successes; 1746 is Culloden and the end of it. Landing first, defeat the year after.",
    why: "It is the same Stuart claim two generations on. He was the grandson of James II, the throne he wanted belonged to George II, and he was supported by clansmen from the Scottish highlands.",
  },
  f116: {
    lead: "Bonnie Prince Charlie's real name was Charles Edward Stuart.",
    versus: "James II is the king driven out in 1688; Charles Edward Stuart is his grandson, who tried to take the throne back in 1745. Same surname, two generations apart.",
    why: "The surname is the whole basis of the claim. After Culloden he escaped back to Europe rather than dying in Scotland.",
  },
  f117: {
    lead: "The Battle of Culloden was fought in 1746.",
    versus: "1745 is the landing; 1746 is the defeat. The rising lasted a year.",
    why: "What followed matters more than the battle. The clans lost a lot of their power and influence: chieftains became landlords if they had the favour of the English king, and clansmen became tenants who had to pay for the land they used.",
  },
  f118: {
    lead: "Sir Robert Walpole became Britain's first Prime Minister in 1721.",
    versus: "He was Prime Minister from 1721 to 1742. The question asks when he became Prime Minister, so it wants the earlier of the two years.",
    why: "The office grew out of George I's reliance on his ministers. Parliament chose him in 1714 as Queen Anne's nearest Protestant relative; he did not speak very good English, and the most important minister in Parliament became known as the Prime Minister.",
  },
  f119: {
    lead: "Adam Smith was the Scottish economist of the Enlightenment, and his ideas about economics are still referred to today.",
    versus: "David Hume is the other Scottish thinker in this section. Smith is economics; Hume is human nature and philosophy.",
    why: "The handbook's point is that many of the great thinkers of the Enlightenment were Scottish, and it gives three: Smith on economics, Hume on human nature and James Watt on steam power.",
    note: "The handbook names Adam Smith as the economist but does not name any of his books.",
  },
  f120: {
    lead: "David Hume is the Scottish thinker of the Enlightenment remembered as a philosopher; his ideas about human nature continue to influence philosophers.",
    versus: "Adam Smith is the other one, and he is the economist. If the question says economics, it is Smith; if it says human nature or philosophy, it is Hume.",
    why: "The handbook's point is that many of the great thinkers of the Enlightenment were Scottish, and it names three.",
    cluster: [
      { label: "Adam Smith", detail: "economics, still referred to today" },
      { label: "James Watt", detail: "steam power, which helped the progress of the Industrial Revolution" },
    ],
  },
  f121: {
    lead: "James Watt was the Scottish engineer whose work on steam power helped the progress of the Industrial Revolution.",
    versus: "Smith and Hume are the ideas; Watt is the machine. He is the Enlightenment figure who leads straight into the Industrial Revolution.",
    why: "Steam power is one of the two developments the handbook says made the Industrial Revolution possible. The other is the development of machinery.",
  },
  f122: {
    lead: "Richard Arkwright improved the carding machine and is particularly remembered for the efficient and profitable way he ran his factories.",
    versus: "James Watt is steam power; Arkwright is the factory. Arkwright did later use the steam engine to power machinery, but the machine he improved was the carding machine.",
    why: "Carding is the process of preparing fibres for spinning into yarn and fabric, so the machine and the factories are one business: textiles.",
  },
  f123: {
    lead: "The Great Western Railway was built by Isambard Kingdom Brunel.",
    versus: "George and Robert Stephenson, father and son, pioneered the railway engine. Brunel built the line. The engine is Stephenson; the railway, and the bridges, tunnels and ships, are Brunel.",
    why: "The Great Western Railway was the first major railway built in Britain, running from Paddington Station in London to the south west of England, the West Midlands and Wales.",
  },
  f124: {
    lead: "Britain was the first country in the world to industrialise on a large scale.",
    why: "It happened because of the development of machinery and the use of steam power. Coal and other raw materials were needed to power the new factories, and many people moved from the countryside into the mining and manufacturing industries.",
    cluster: [
      { label: "The 18th and 19th centuries", detail: "when the Industrial Revolution took place in Britain" },
      { label: "Agriculture", detail: "the biggest source of employment before it; manufacturing overtook it" },
      { label: "Machinery and steam power", detail: "the two developments that made it possible" },
      { label: "Canals", detail: "built to link the factories to the towns, cities and ports" },
    ],
  },
  f126: {
    lead: "The 13 American colonies declared their independence in 1776.",
    versus: "1776 is the declaration; 1783 is Britain recognising it. The colonies claimed independence first and were granted it seven years later.",
    why: "The cause was tax. The British government wanted to tax the colonies, the colonists saw this as an attack on their freedom, and they said there should be no taxation without representation.",
  },
  f127: {
    lead: "Britain recognised the American colonies' independence in 1783.",
    versus: "1776 is when the colonies declared independence; 1783 is when Britain accepted it. If the question says Britain recognised or accepted, it wants the later year.",
    why: "Seven years of fighting sit between the two. The colonists eventually defeated the British army, and Britain conceded only then.",
  },
  f128: {
    lead: "The Act of Union with Ireland took effect in 1801, creating the United Kingdom of Great Britain and Ireland.",
    versus: "1707 is the other Act of Union, joining England and Scotland as the Kingdom of Great Britain. 1801 is the one that adds Ireland and puts 'United Kingdom' in the name.",
    why: "The Act itself was passed in 1800 and took effect the following year, so both numbers appear in the handbook and only the later one is the answer.",
    cluster: [
      { label: "1707", detail: "England and Scotland join; the state created is the Kingdom of Great Britain" },
      { label: "1801", detail: "Ireland joins; the state becomes the United Kingdom of Great Britain and Ireland" },
      { label: "St Patrick's cross", detail: "the diagonal red cross on white; the union of 1801 is why the flag combines the crosses of England, Scotland and Ireland" },
      { label: "1922", detail: "the union comes apart; Ireland becomes two countries and the six northern counties stay in the UK" },
    ],
  },
  f129: {
    lead: "The Battle of Trafalgar was fought in 1805, and the British fleet won it.",
    versus: "Trafalgar is the sea battle and Waterloo the land one, ten years apart. Navy and Nelson mean 1805; army and Wellington mean 1815.",
    why: "Britain's navy fought combined French and Spanish fleets at Trafalgar. Winning it did not end the war — the fighting ran another ten years.",
    cluster: [
      { label: "Trafalgar, 1805", detail: "at sea, against the combined French and Spanish fleets" },
      { label: "Admiral Nelson", detail: "commanded the British fleet at Trafalgar and was killed in the battle; Nelson's Column in Trafalgar Square is his monument" },
      { label: "HMS Victory", detail: "Nelson's ship, and the one part of Trafalgar still there — it can be visited in Portsmouth" },
      { label: "Waterloo, 1815", detail: "on land, and the battle where the French Wars ended" },
      { label: "The Duke of Wellington", detail: "defeated Napoleon at Waterloo; known as the Iron Duke and later Prime Minister" },
    ],
  },
  f130: {
    lead: "Admiral Nelson was in charge of the British fleet at Trafalgar and was killed in the battle.",
    versus: "Nelson is the sea and Wellington the land. Nelson won his battle and died in it; Wellington won his and lived to become Prime Minister.",
    why: "Nelson's Column in Trafalgar Square, London, is the monument to him, so the man, the battle and the square carry one name between them.",
  },
  f131: {
    lead: "HMS Victory was Nelson's ship at the Battle of Trafalgar.",
    why: "The handbook names it because it survives: HMS Victory can be visited in Portsmouth.",
  },
  f132: {
    lead: "The Battle of Waterloo was fought in 1815, and it ended the French Wars.",
    versus: "Waterloo is the land battle and the later date; Trafalgar is at sea in 1805. Anything naming Wellington, or Napoleon's defeat, is 1815.",
    why: "Trafalgar did not finish the war. Ten more years of fighting followed, and Waterloo is where it stopped.",
  },
  f133: {
    lead: "The Duke of Wellington defeated the Emperor Napoleon at the Battle of Waterloo.",
    versus: "Wellington is the army, Nelson the navy. Wellington survived his battle; Nelson was killed in his.",
    why: "Wellington was known as the Iron Duke and later became Prime Minister, so the nickname, the general and the politician are one man.",
  },
  f134: {
    lead: "In 1807 it became illegal to trade slaves in British ships or from British ports.",
    versus: "1807 bans the trade; 1833 abolishes slavery itself throughout the Empire. The traffic goes twenty-six years before the institution.",
    why: "What 1807 reached was British ships and British ports — the carrying trade — which is why it left ownership across the Empire untouched.",
  },
  f135: {
    lead: "Slavery was abolished throughout the British Empire in 1833, by the Emancipation Act.",
    versus: "1807 stopped the trade in British ships and ports; 1833 ended slavery itself. The later date is the larger change.",
    why: "The handbook follows it straight on: after 1833, 2 million Indian and Chinese workers were employed to replace the freed slaves, so the plantations carried on.",
  },
  f136: {
    lead: "William Wilberforce, an evangelical Christian and a Member of Parliament, led the campaign against the slave trade.",
    why: "His part was turning public opinion against the trade rather than winning one vote, which is why his name attaches to both 1807 and 1833 rather than to either alone.",
  },
  f137: {
    lead: "The Reform Act was passed in 1832, greatly increasing the number of people with the right to vote.",
    versus: "A second Reform Act followed in 1867. 1832 is the one that abolished the pocket and rotten boroughs and moved seats to the towns and cities; 1867 created more urban seats and lowered the property bar further.",
    why: "It shifted political power permanently from the countryside to the towns, but voting still depended on owning property, so the working class remained shut out.",
  },
  f138: {
    lead: "The corrupt seats abolished by the 1832 Reform Act were called rotten boroughs.",
    why: "A rotten borough was a constituency with hardly any voters left in it, so the name describes what had happened to the seat rather than to the man who held it.",
  },
  f139: {
    lead: "Queen Victoria came to the throne in 1837, at the age of 18.",
    versus: "1837 opens the reign and 1901 closes it. Accession at 18; death after almost 64 years on the throne.",
    why: "The Victorian Age takes its name and its dates from her reign, so 1837 is the start of a period rather than the date of one event.",
    cluster: [
      { label: "1837", detail: "Victoria becomes queen at 18; the Victorian Age begins" },
      { label: "1851", detail: "the Great Exhibition in Hyde Park, with British industry at its height" },
      { label: "1853-1856", detail: "the Crimean War, Britain fighting with Turkey and France against Russia" },
      { label: "1899-1902", detail: "the Boer War in South Africa, still being fought when she died" },
      { label: "1901", detail: "Victoria dies after almost 64 years, and the age ends with her" },
    ],
  },
  f140: {
    lead: "Queen Victoria died in 1901, after a reign of almost 64 years.",
    versus: "1837 is the accession, 1901 the death. Subtract one from the other and you get the figure the handbook gives for the reign.",
    why: "The Boer War was still being fought when she died, so the end of the reign sits inside a war that ran on to 1902.",
    note: "The handbook says that at its date of writing, 2013, this was the longest reign of any British monarch.",
  },
  f141: {
    lead: "The British Empire had an estimated population of more than 400 million people.",
    why: "The UK's own population in 1901 was 40 million, so only about one person in ten under British rule lived in these islands.",
  },
  f142: {
    lead: "The Great Exhibition was held in London in 1851, in Hyde Park.",
    versus: "1837 is Victoria's accession. 1851 is well into her reign, and it is the industrial showpiece rather than the start of the age.",
    why: "It was staged in the Crystal Palace, a huge building of steel and glass. Countries from all over the world showed their goods, but most of the objects were made in Britain.",
  },
  f143: {
    lead: "The Crimean War was fought from 1853 to 1856, with Britain, Turkey and France against Russia.",
    versus: "The other Victorian war is the Boer War, 1899 to 1902. Crimea is early in the reign and against Russia; the Boer War is at the end of it and in South Africa.",
    why: "It was the first war extensively covered by the media, through news stories and photographs, which is how conditions in the hospitals became known at home.",
  },
  f144: {
    lead: "Florence Nightingale went to Turkey in 1854, to work in the military hospitals of the Crimean War.",
    versus: "1854 is the war and 1860 the school. The hospitals came first; the training school followed six years later.",
    why: "Many soldiers were dying of illnesses caught in the hospitals rather than of their wounds. She and her fellow nurses improved conditions and reduced the mortality rate.",
  },
  f145: {
    lead: "Florence Nightingale established her training school for nurses in 1860, at St Thomas' Hospital in London.",
    versus: "1854 is Turkey and the war; 1860 is the school in London. The war supplied the evidence, the school made it permanent.",
    why: "It was the first school of its kind and still exists, which is why she is regarded as the founder of modern nursing rather than simply a famous nurse.",
  },
  f146: {
    lead: "The Boer War was fought from 1899 to 1902.",
    versus: "The Crimean War, 1853 to 1856, is the other one and comes early in Victoria's reign. The Boer War closes it — Victoria died in 1901 with the fighting still going on.",
    why: "It went on for over three years, and many more died of disease than in the fighting, which is where public doubt about the Empire begins.",
  },
  f147: {
    lead: "The Boer War was fought in South Africa.",
    why: "The Boers were settlers from the Netherlands, so naming the opponent places the country.",
  },
  f149: {
    lead: "The First World War began in 1914 and ran to 1918.",
    why: "The handbook dates the chain of events from the assassination of Archduke Franz Ferdinand on 28 June 1914, so the trigger and the outbreak share a year.",
    cluster: [
      { label: "28 June 1914", detail: "Archduke Franz Ferdinand of Austria is assassinated; the trigger, not the cause" },
      { label: "July 1916", detail: "the British attack on the Somme opens" },
      { label: "About 60,000", detail: "British casualties on the first day of the Somme alone, out of more than 2 million for the whole war" },
      { label: "11 November 1918", detail: "the war ends at 11.00 am, with victory for Britain and its allies" },
    ],
  },
  f150: {
    lead: "The assassination of Archduke Franz Ferdinand of Austria helped to trigger the First World War.",
    versus: "The handbook separates trigger from cause. The assassination set off the chain of events; nationalism, militarism, imperialism and the division of Europe into two camps are what made a war out of it.",
    why: "He was assassinated on 28 June 1914, so the killing and the outbreak fall in the same year.",
  },
  f151: {
    lead: "The Battle of the Somme was fought in 1916.",
    why: "It was a British attack, launched in July, and it sits halfway between the outbreak in 1914 and the end in 1918.",
  },
  f152: {
    lead: "About 60,000 British casualties were suffered on the first day of the Battle of the Somme.",
    versus: "Casualties means killed and wounded together, not killed. That is why the figure sounds impossible and is so often misremembered as a death toll.",
    why: "The handbook gives more than 2 million British casualties for the whole war. About 60,000 of them fell on a single day.",
  },
  f153: {
    lead: "The First World War ended on 11 November 1918, with victory for Britain and its allies.",
    versus: "28 June 1914 is the other date in this story, and it is the assassination that started the war. 11 November 1918 is the end of it.",
    why: "Remembrance Day falls on this date every year, and the two-minute silence at 11.00 am is set to the moment the fighting stopped.",
  },
  f154: {
    lead: "The fighting stopped at 11.00 am on 11 November 1918.",
    why: "The eleventh hour of the eleventh day of the eleventh month, which is also why the two-minute silence on Remembrance Day is held at that hour rather than any other.",
  },
  f155: {
    lead: "The Easter Rising against the British took place in Dublin in 1916.",
    versus: "1916 is the rising, which failed. 1922 is when Ireland became two countries. The rebellion comes first and the settlement six years later.",
    why: "Home Rule had been promised and then postponed for the war, and Irish Nationalists would not wait, which is why the rising falls in the middle of the First World War. Its leaders were executed under military law and a guerrilla war followed.",
    cluster: [
      { label: "1916", detail: "the Easter Rising in Dublin; it failed, and its leaders were executed under military law" },
      { label: "1922", detail: "Ireland becomes two countries; the six mainly Protestant northern counties remain in the UK as Northern Ireland" },
      { label: "1949", detail: "the rest of Ireland, which had governed itself since 1922, becomes a republic" },
    ],
  },
  f156: {
    lead: "The Irish Free State was formed in 1922, when Ireland became two countries.",
    versus: "1922 is the division and self-government; 1949 is the republic. Self-rule first, republic a generation later.",
    why: "The six counties in the north, which were mainly Protestant, remained part of the UK under the name Northern Ireland; the rest became the Irish Free State with its own government.",
  },
  f157: {
    lead: "Ireland became a republic in 1949.",
    versus: "1922 is when Ireland split and the south gained its own government; 1949 is when it went further and became a republic. Twenty-seven years apart.",
  },
  f158: {
    lead: "Some women in Britain first won the right to vote in 1918.",
    versus: "1918 is the partial franchise, for women over 30. 1928 is the equal one, at 21 and on the same terms as men.",
    why: "It was given partly in recognition of the contribution women made to the war effort during the First World War, which is why it arrives in the year the war ended.",
    cluster: [
      { label: "1918", detail: "women over 30 get the vote, and the right to stand for Parliament with it" },
      { label: "1928", detail: "the vote at 21, the same as men; the age gap closes ten years later" },
      { label: "Emmeline Pankhurst", detail: "founded the Women's Franchise League and led the militant suffragettes; she died in 1928, shortly after the equal franchise went through" },
    ],
  },
  f159: {
    lead: "The vote in 1918 went to women over the age of 30.",
    versus: "1928 is the change that removes the age bar, bringing it down to 21. 1918 is the one that stops at 30.",
    why: "The same change gave women the right to stand for Parliament, so the right to be elected arrived with the right to vote.",
  },
  f160: {
    lead: "Women gained the vote on the same terms as men in 1928.",
    versus: "1918 gave it to women over 30 only. 1928 brought the age down to 21, level with men — ten years later.",
    why: "Emmeline Pankhurst died in 1928, shortly after the change went through, so her death and the equal franchise share a year.",
  },
  f161: {
    lead: "From 1928 women could vote at 21, the same age as men.",
    versus: "30 is the 1918 age and 21 the 1928 one. The number comes down, and 21 is what 'the same terms as men' meant at the time.",
    note: "The handbook's 21 is the age set in 1928, not the modern voting age.",
  },
  f162: {
    lead: "Emmeline Pankhurst founded the Women's Franchise League and led the militant suffragettes.",
    versus: "The Women's Franchise League came first, in 1889, and fought for the vote in local elections for married women. The militancy belongs to the Women's Social and Political Union, founded in 1903 — the first group whose members were called suffragettes.",
    why: "Militant here means civil disobedience: chaining themselves to railings, smashing windows, arson, and hunger strikes in prison.",
  },
  f164: {
    lead: "Alexander Fleming discovered penicillin in 1928.",
    versus: "Discovery is not development. 1928 is when Fleming found it; other scientists turned it into a usable drug, and it only reached mass production in the 1940s.",
    why: "He was researching influenza at the time, not looking for an antibiotic, which is why the find is credited to him rather than the drug.",
  },
  f165: {
    lead: "Germany invaded Poland on 1 September 1939, and that invasion is what started the Second World War.",
    versus: "The invasion is Germany’s act; the declaration of war two days later is Britain and France’s answer to it. Germany moved on the 1st, Britain answered on the 3rd.",
    why: "Hitler had already occupied Austria and invaded Czechoslovakia, and the British government had been trying to avoid another war. Poland is the point at which Britain and France stopped trying, and declared war in order to stop his aggression.",
    note: "The handbook gives the year, 1939, but no day for the invasion or for the declaration.",
  },
  f166: {
    lead: "Britain declared war on Germany on 3 September 1939, two days after the invasion of Poland.",
    versus: "1 September is Germany invading Poland; 3 September is Britain responding. The earlier date is the act, the later one the reply — Britain entered this war, it did not begin it.",
    why: "France declared war at the same time and for the same stated reason: to stop Hitler’s aggression, after the British government’s attempts to avoid another war had failed.",
    note: "The handbook gives the year, 1939, but no day for the invasion or for the declaration.",
  },
  f167: {
    lead: "Winston Churchill became Prime Minister in May 1940 and was Britain’s war leader.",
    versus: "He arrived during the war rather than at the start of it. Britain declared war in 1939; German forces were already advancing through France when he took over in 1940.",
    why: "He refused to surrender to the Nazis and was an inspirational leader in a time of great hardship. He then lost the General Election in 1945, to Labour under Clement Attlee.",
  },
  f168: {
    lead: "The evacuation from Dunkirk took place in 1940.",
    versus: "Dunkirk is the army leaving France; D-Day in 1944 is the army coming back. One is a retreat that saved the men, the other the landing that began the liberation — four years and opposite directions apart.",
    why: "1940 is the year to anchor in this section. Churchill became Prime Minister, the army came off the beaches at Dunkirk, and the Battle of Britain was fought in the summer. Three answers out of one year.",
  },
  f169: {
    lead: "More than 300,000 men were rescued from the beaches around Dunkirk, by the Navy with help from civilian volunteers in small pleasure and fishing boats.",
    why: "Many lives and a lot of equipment were lost, but the army was not, which is why the handbook counts the evacuation a success: Britain was better able to continue the fight against the Germans.",
  },
  f170: {
    lead: "The Battle of Britain was fought in the summer of 1940, in the air over Britain.",
    versus: "The Battle of Britain is the daylight air battle Britain won; the Blitz is the night bombing of British cities that carried on despite that victory.",
    why: "Hitler wanted to invade Britain, but Germany needed to control the air before sending in troops. The air battle therefore had to be won first, and the British won it.",
  },
  f171: {
    lead: "The German bombing of British cities at night was called the Blitz.",
    versus: "The Battle of Britain is the aerial battle Britain won; the Blitz is what the German air force was able to continue doing despite that defeat. Fighter planes by day, bombers by night.",
    why: "Coventry was almost totally destroyed and a great deal of damage was done in other cities, especially in the East End of London.",
  },
  f172: {
    lead: "The D-Day landings took place on 6 June 1944, when allied forces landed in Normandy.",
    versus: "6 June 1944 is the landing; May 1945 is Germany’s defeat. D-Day opens the last phase of the war in Europe, it does not close it.",
    why: "The Allies could only attack in Western Europe once they had won significant victories in North Africa and Italy, and once German losses in the Soviet Union and American support had tipped the balance.",
  },
  f173: {
    lead: "The D-Day landings took place in Normandy, in northern France.",
    versus: "Dunkirk in 1940 is where the army left France; Normandy in 1944 is where it came back. Both are beaches in France, four years and opposite directions apart.",
    why: "Following victory on the beaches of Normandy, the allied forces pressed on through France and eventually into Germany.",
  },
  f174: {
    lead: "The war in Europe ended on 8 May 1945, known as VE Day.",
    versus: "Europe and Japan end at different times. Germany was comprehensively defeated in May 1945; the war against Japan ran on until August.",
    why: "That gap is why a question about the end of the Second World War has to be read for which theatre it means. May is the answer for Europe, August for the war as a whole.",
    note: "The handbook says the Allies comprehensively defeated Germany in May 1945. It gives no day and does not use the term VE Day.",
  },
  f175: {
    lead: "Atomic bombs were dropped on the Japanese cities of Hiroshima and Nagasaki, ending the war against Japan in August 1945.",
    versus: "The bombs were dropped by the United States, not by Britain. Britain’s part in the handbook’s account is the science, not the weapon.",
    why: "Scientists led by Ernest Rutherford, working at Manchester and then Cambridge University, were the first to split the atom and took part in the Manhattan Project. This is three months after Germany’s defeat in May 1945 — the war in Europe was already over.",
  },
  f176: {
    lead: "The Beveridge Report was published in 1942, and it provided the basis of the modern welfare state.",
    versus: "Beveridge wrote the report; Bevan built the National Health Service out of it. Report 1942, NHS 1948 — the plan comes six years before the service.",
    why: "It was commissioned by the wartime government in 1941, so the whole thing was written and published while the war was still being fought.",
  },
  f177: {
    lead: "Clement Attlee became Prime Minister after the Labour Party won the 1945 election, and stayed until 1951.",
    versus: "Attlee led the government; Bevan was the Minister for Health who established the National Health Service inside it. One is the Prime Minister, the other a minister under him.",
    why: "He had been Winston Churchill’s Deputy Prime Minister in the wartime coalition, so the change of direction came from a man already sitting in government. Churchill won the war and then lost the election.",
  },
  f178: {
    lead: "The National Health Service was created in 1948, guaranteeing a minimum standard of health care for all, free at the point of use.",
    versus: "1942 is the Beveridge Report that argued for it; 1948 is the service itself. The plan and the delivery sit six years apart.",
    why: "It was one of a run of changes by the same 1945 Labour government, which also took the railways, coal mines and gas, water and electricity supplies into public ownership.",
  },
  f179: {
    lead: "Aneurin (Nye) Bevan, the Minister for Health, led the establishment of the National Health Service in 1948.",
    versus: "Bevan built the service; Beveridge wrote the 1942 report that argued for one. Bevan was a minister inside the government, Beveridge an economist outside it.",
    cluster: [
      { label: "Beveridge, 1942", detail: "the economist whose report set out the plan for a welfare state" },
      { label: "Attlee, 1945", detail: "the Labour leader who won the election and became Prime Minister" },
      { label: "Bevan, 1948", detail: "the Minister for Health who established the National Health Service" },
    ],
  },
  f180: {
    lead: "The UK joined the new North Atlantic Treaty Organization, NATO, in 1949.",
    why: "NATO is a group of European and North American countries that have agreed to help each other if they come under attack. It was set up to resist the perceived threat of invasion by the Soviet Union and its allies.",
    note: "The handbook gives no year for NATO. It says only that the UK developed its own atomic bomb and joined the new alliance.",
  },
  f181: {
    lead: "In 1947 independence was granted to nine countries, including India, Pakistan and Ceylon — now Sri Lanka.",
    versus: "1947 is the first nine, not the end of the empire. Other colonies in Africa, the Caribbean and the Pacific achieved independence over the next 20 years.",
    why: "The UK had won the war but was exhausted economically, and self-government for former colonies was part of the change that followed.",
  },
  f182: {
    lead: "Commonwealth citizens were given the right to come to Britain in 1948.",
    versus: "1948 is the invitation; the recruitment came later. Centres set up in the West Indies and agents sent to India and Pakistan belong to the 1950s, when the shortage of labour had still not gone away.",
    why: "Rebuilding Britain after the Second World War was a huge task and there were labour shortages, so workers were encouraged to come. The National Health Service was created in the same year.",
    note: "The handbook does not name an Act. It says that in 1948 people from the West Indies were invited to come and work.",
  },
  f183: {
    lead: "After the war, Britain recruited workers especially from the West Indies.",
    versus: "Workers from Ireland and other parts of Europe were encouraged first, for the reconstruction. The West Indies invitation is 1948, and the organised recruitment ran through the 1950s.",
    why: "Britain went out to find workers rather than simply receiving them: centres were set up in the West Indies to recruit people to drive buses, and firms sent agents to India and Pakistan. The movement ran for about 25 years.",
  },
  f184: {
    lead: "In 1972 Britain admitted 28,000 people of Indian origin who had been forced to leave Uganda.",
    versus: "This runs against the trend around it. Numbers arriving had been falling because new laws required a strong connection to Britain through birth or ancestry; these arrivals were admitted anyway.",
    note: "The handbook says only that this happened during the early 1970s. It gives the figure of 28,000 but no year.",
  },
  f185: {
    lead: "The Troubles in Northern Ireland broke out in 1969, at the end of the 1960s.",
    versus: "The disagreement is much older than the violence. Ireland was divided in 1922 and the argument ran from then; 1969 is when it became a terror campaign.",
    why: "Some 3,000 people lost their lives in the decades after 1969, and the Northern Ireland Parliament was abolished in 1972, shortly after the violence broke out.",
  },
  f186: {
    lead: "The Northern Ireland Parliament was suspended in 1972 and Northern Ireland was directly ruled by the UK government.",
    versus: "1969 is when the Troubles broke out; 1972 is when the parliament went. The violence came first and the suspension followed shortly after it.",
    why: "That parliament had been established in 1922, when Ireland was divided, so 1972 ends fifty years of Northern Ireland governing itself.",
  },
  f187: {
    lead: "The Good Friday Agreement was signed in 1998.",
    versus: "1998 is the agreement; 1999 is the Northern Ireland Assembly it made possible being elected. The agreement comes first, the assembly the year after.",
    why: "The Blair government, elected in 1997, was able to build on a peace process already under way, which is why the agreement lands a year after the election rather than with it.",
    cluster: [
      { label: "1922", detail: "Ireland divided, and a Northern Ireland Parliament established for the six counties in the north" },
      { label: "1969", detail: "the Troubles broke out; some 3,000 people died in the decades that followed" },
      { label: "1972", detail: "that parliament suspended and Northern Ireland ruled directly from London" },
      { label: "1998", detail: "the Good Friday Agreement, also called the Belfast Agreement" },
    ],
  },
  f188: {
    lead: "The UK joined the European Economic Community in 1973.",
    versus: "1957 is the founding, and it is not Britain’s. West Germany, France, Belgium, Italy, Luxembourg and the Netherlands formed the EEC that year; at first the UK did not wish to join.",
    why: "Six countries set it up without Britain, and Britain came in sixteen years later — which is the whole distinction between the two dates.",
  },
  f189: {
    lead: "Margaret Thatcher became Prime Minister in 1979, following the Conservative victory in that year’s General Election.",
    versus: "1975 is when she was elected Leader of the Conservative Party, and so became Leader of the Opposition. Party leader in 1975, Prime Minister in 1979 — leading the party is not the same as leading the country.",
    why: "She remained in office until 1990, which makes her the longest-serving Prime Minister of the 20th century. The two years bracket eleven of them.",
  },
  f190: {
    lead: "Margaret Thatcher was the first woman Prime Minister of the UK.",
    versus: "The handbook gives her a second distinction as well: longest-serving Prime Minister of the 20th century, in office from 1979 to 1990. The first is a fact about her arrival, the second about how long she stayed.",
  },
  f191: {
    lead: "In 1982 Argentina invaded the Falkland Islands, a British overseas territory in the South Atlantic. A naval taskforce was sent from the UK and military action recovered them.",
    why: "It falls in the middle of Margaret Thatcher’s years in office, which ran from 1979 to 1990: comfortably after she arrived, well before she left.",
  },
  f192: {
    lead: "Tony Blair became Prime Minister in 1997, when the Labour Party he led was elected.",
    versus: "1979 to 1997 is the Conservative stretch this ends; 1997 to 2010 is Labour’s. Either end of the eighteen years gives you the other.",
    why: "The Blair government introduced a Scottish Parliament and a Welsh Assembly, and built on the Northern Ireland peace process, resulting in the Good Friday Agreement in 1998. Most of what follows in this part of the chapter starts here.",
  },
  f193: {
    lead: "The Scottish Parliament and the Welsh Assembly first met in 1999.",
    versus: "1997 is the election that made devolution possible; 1999 is when the bodies actually sat. The decision and the first meeting are two years apart.",
    why: "1999 is also the year hereditary peers lost the automatic right to attend the House of Lords, which makes it a useful year to hold on to.",
  },
  f194: {
    lead: "The television was developed by the Scotsman John Logie Baird.",
    versus: "Baird is television; Watson-Watt is radar. Both were Scots and both sit in the same list of British inventions, so pair each name with its invention rather than with its country.",
    why: "In 1932 he made the first television broadcast, between London and Glasgow.",
    note: "The handbook says only that Baird developed television in the 1920s. It gives no year for a first demonstration; 1932, for the first broadcast, is the only date it attaches to him.",
  },
  f195: {
    lead: "Radar was developed by the Scotsman Sir Robert Watson-Watt, and the first successful radar test took place in 1935.",
    versus: "Watson-Watt is radar; Whittle is the jet engine. Both are British and both belong to the 1930s, and the handbook gives radar a year while the jet engine gets only a decade.",
    why: "He proposed that enemy aircraft could be detected by radio waves — the whole idea in one sentence, and it was tested four years before the war it would be used in.",
  },
  f196: {
    lead: "The jet engine was developed in Britain by Sir Frank Whittle.",
    versus: "Whittle made the engine; Watson-Watt made radar, the way to see aircraft coming. Both are British and both belong to the 1930s.",
    why: "Whittle was a British Royal Air Force engineer officer, which is why aircraft were his problem to solve in the first place.",
    note: "The handbook says the jet engine was developed in the 1930s. It gives no year.",
  },
  f197: {
    lead: "The structure of the DNA molecule was discovered in 1953.",
    versus: "1928 is Alexander Fleming and penicillin; 1953 is DNA. Fleming found a drug, this work found a structure.",
    why: "It was done at British universities in London and Cambridge, and Francis Crick, one of those awarded the Nobel Prize for it, was British — which is why a discovery shared with others is in a British handbook at all.",
  },
  f198: {
    lead: "Dolly the sheep, the first mammal to be successfully cloned, was created in 1996 by a team led by two British scientists.",
    why: "The handbook points forward from it rather than back: the work led to research into using cloning to preserve endangered species and for medical purposes.",
  },
  f199: {
    lead: "The World Wide Web was invented by Sir Tim Berners-Lee, who is British.",
    why: "Information was successfully transferred via the web for the first time on 25 December 1990.",
    cluster: [
      { label: "Baird — television", detail: "a Scotsman; his first broadcast, in 1932, ran between London and Glasgow" },
      { label: "Watson-Watt — radar", detail: "a Scotsman; he proposed detecting aircraft by radio waves, first tested in 1935" },
      { label: "Whittle — the jet engine", detail: "a Royal Air Force engineer officer, working in the 1930s" },
      { label: "Berners-Lee — the World Wide Web", detail: "information first transferred over it on 25 December 1990" },
    ],
  },
  f200: {
    lead: "The World Wide Web became available to the wider world in 1990.",
    versus: "1990 is the web working; 1996 is Dolly the sheep. Two late-century British firsts six years apart, and only one of them is Berners-Lee’s.",
    why: "The handbook pins this one to a day: information was successfully transferred via the web for the first time on 25 December 1990.",
  },
  f201: {
    lead: "The handbook sets out five fundamental principles of British life.",
    cluster: [
      { label: "Democracy", detail: "the whole adult population gets a say, by voting directly or by choosing representatives" },
      { label: "The rule of law", detail: "everyone must obey the law, those in power included" },
      { label: "Individual liberty", detail: "people make their own choices, within the law" },
      { label: "Tolerance of those with different faiths and beliefs", detail: "accepting the people, not agreeing with the beliefs" },
      { label: "Participation in community life", detail: "the one that asks residents to take part in the place they live" },
    ],
  },
  f202: {
    lead: "Democracy is the principle that the government is chosen by the people through elections.",
    versus: "Democracy is about who chooses the government; the rule of law is about who has to obey it once chosen.",
    why: "The handbook defines a democracy as a system of government where the whole adult population gets a say — either by voting directly, or by choosing representatives to decide on their behalf.",
  },
  f203: {
    lead: "The rule of law is the principle that everyone, including those in power, must obey the law.",
    versus: "Individual liberty is about what the law leaves you free to do; the rule of law is about who the law binds — and it binds everyone.",
    why: "The handbook traces these rights to Magna Carta, agreed in 1215, which established the idea that even the king was subject to the law.",
  },
  f204: {
    lead: "Individual liberty is the principle that people are free to make their own choices, within the law.",
    versus: "Individual liberty is one of the five principles. Freedom of speech and freedom of belief are among the freedoms the UK offers in return — the handbook says those freedoms follow from the principles rather than being one of them.",
  },
  f205: {
    lead: "Tolerance of those with different faiths and beliefs is the principle that covers accepting people who hold religious beliefs other than your own.",
    versus: "Tolerance is a principle you are asked to hold; freedom from unfair discrimination is a freedom the UK offers you in return.",
    why: "The handbook states it flatly in the same passage: there is no place in British society for extremism or intolerance.",
  },
  f206: {
    lead: "Participation in community life is the principle that asks residents to get involved in their local area.",
    why: "It is the principle behind the handbook's last section, 'Your role in the community' — jury service, school governors, volunteering.",
  },
  f207: {
    lead: "Freedom of belief and religion is the freedom that allows you to practise any religion, or none at all.",
    versus: "Tolerance of those with different faiths and beliefs is the principle; freedom of belief and religion is the freedom that follows from it. The principle is what you are asked to show, the freedom is what you are given.",
    why: "The handbook lists five things the UK offers in return: freedom of belief and religion, freedom of speech, freedom from unfair discrimination, a right to a fair trial, and a right to join in the election of a government.",
  },
  f208: {
    lead: "Freedom from unfair discrimination is the freedom that protects you from being treated worse because of race, sex or religion.",
    versus: "Freedom of belief and religion lets you hold a religion; freedom from unfair discrimination stops other people treating you worse for holding it.",
  },
  f209: {
    lead: "Anyone accused of a crime in the UK has a right to a fair trial.",
    versus: "Of the five things the UK offers, three are worded as freedoms — belief and religion, speech, and from unfair discrimination. Two are worded as rights: a fair trial, and joining in the election of a government.",
  },
  f210: {
    lead: "Someone seeking citizenship must demonstrate ability in English and knowledge of life in the UK.",
    why: "The two are tested separately: the English requirement by evidence of speaking and listening at B1, the knowledge requirement by the Life in the UK test.",
  },
  f211: {
    lead: "The exam testing knowledge of British life is called the Life in the UK test.",
    versus: "The test and the book are separate things. The book is Life in the United Kingdom: a guide for new residents; the test's questions are drawn from all parts of it.",
  },
  f212: {
    lead: "An applicant's English speaking and listening must reach level B1 of the Common European Framework of Reference.",
    why: "The handbook says B1 is equivalent to ESOL Entry Level 3 — the same level the handbook itself is written to be readable at.",
  },
  f213: {
    lead: "Applicants under 18, and those aged 65 and over, are normally excused the English language and knowledge of life in the UK requirements.",
  },
  f214: {
    lead: "A successful applicant must attend a citizenship ceremony before becoming a British citizen.",
    why: "The ceremony is where the two declarations are made: new citizens swear or affirm loyalty to the King, and give the pledge to uphold the UK's values.",
  },
  f215: {
    lead: "A citizenship ceremony is normally organised by the local authority.",
  },
  f216: {
    lead: "A citizenship ceremony is normally held within three months of the decision on the application.",
  },
  f217: {
    lead: "At the ceremony a new citizen makes two declarations: an oath of allegiance and a pledge.",
    versus: "The oath is loyalty to the King. The pledge is loyalty to the United Kingdom — respecting its rights and freedoms, upholding its democratic values and observing its laws.",
  },
  f218: {
    lead: "Someone who prefers not to swear by God makes an affirmation of allegiance instead.",
    versus: "The oath opens by swearing 'by Almighty God'; the affirmation opens by declaring and affirming. What follows is word for word the same in both.",
  },
  f219: {
    lead: "A certificate of British citizenship is presented to the new citizen at the ceremony.",
  },
  f220: {
    lead: "The full official name of the UK is the United Kingdom of Great Britain and Northern Ireland.",
    why: "The name is the structure. 'Great Britain' covers England, Scotland and Wales; Northern Ireland has to be named separately because that term does not reach it.",
    cluster: [
      { label: "The United Kingdom", detail: "the state itself — England, Scotland, Wales and Northern Ireland" },
      { label: "Great Britain", detail: "England, Scotland and Wales only; the one term that leaves Northern Ireland out" },
      { label: "The Crown dependencies", detail: "the Channel Islands and the Isle of Man — own governments, closely linked to the UK, not part of it" },
      { label: "The British overseas territories", detail: "in other parts of the world, such as St Helena and the Falkland Islands; linked to the UK, not part of it" },
    ],
  },
  f221: {
    lead: "The UK is made up of England, Scotland, Wales and Northern Ireland.",
    versus: "All four are in the UK. Only the first three are in Great Britain — Northern Ireland is the one that term leaves out.",
  },
  f222: {
    lead: "Great Britain is made up of England, Scotland and Wales.",
    versus: "Great Britain is three countries; the United Kingdom is those three plus Northern Ireland. Adding Northern Ireland is what turns one term into the other.",
    why: "The Kingdom of Great Britain was the state created by the Act of Union of 1707, before Ireland was joined on — so the term covers exactly the countries that were in it then.",
  },
  f223: {
    lead: "Northern Ireland is the part of the UK not included in the term 'Great Britain'.",
    versus: "Northern Ireland is in the United Kingdom but not in Great Britain. If a statement is meant to cover all four countries, the word for it is the UK.",
  },
  f224: {
    lead: "Besides the UK, the British Isles takes in the Channel Islands and the Isle of Man.",
    why: "The handbook describes both as islands closely linked with the UK but not part of it: they have their own governments and are the Crown dependencies.",
  },
  f225: {
    lead: "No — the Republic of Ireland is not part of the UK. The handbook says the rest of Ireland is an independent country.",
    versus: "Northern Ireland is in the UK; the rest of Ireland is not.",
    why: "It is not a Crown dependency either. The Channel Islands and the Isle of Man are linked to the UK without being part of it; the rest of Ireland is neither.",
  },
  f226: {
    lead: "The Crown dependencies are the Isle of Man and the Channel Islands.",
    versus: "The Crown dependencies are the islands close to the UK with their own governments. The British overseas territories are in other parts of the world — the handbook names St Helena and the Falkland Islands.",
  },
  f227: {
    lead: "No — the Crown dependencies are not part of the UK.",
    versus: "Having your own government does not settle it. Scotland, Wales and Northern Ireland have parliaments or assemblies of their own and are still in the UK; the Crown dependencies have their own governments and are not.",
  },
  f229: {
    lead: "No — the British overseas territories are linked to the UK but are not part of it.",
    versus: "The Crown dependencies and the overseas territories are both linked to the UK without being part of it. The dependencies are the Channel Islands and the Isle of Man; the territories are in other parts of the world.",
  },
  f230: {
    lead: "The Falkland Islands are a British overseas territory.",
    versus: "The Isle of Man and the Channel Islands are also linked to the UK, but they are the Crown dependencies, close by. The overseas territories are the ones in other parts of the world.",
    why: "The handbook names two of them: St Helena and the Falkland Islands.",
  },
  f231: {
    lead: "The capital city of Scotland is Edinburgh.",
    versus: "Glasgow, Dundee and Aberdeen are the other Scottish cities the handbook lists — cities, but not the capital.",
    why: "The Scottish Parliament sits in Edinburgh, in the parliament building at Holyrood.",
  },
  f232: {
    lead: "The capital city of Wales is Cardiff.",
    versus: "Swansea and Newport are the other Welsh cities the handbook lists. Cardiff is the one with the Senedd in it.",
    why: "The elected members of the Welsh Assembly meet in the Senedd, in Cardiff Bay.",
  },
  f233: {
    lead: "The capital city of Northern Ireland is Belfast.",
    versus: "Belfast is the only Northern Irish city the handbook's list of UK cities gives.",
    why: "The MLAs of the Northern Ireland Assembly meet at Stormont, in Belfast.",
  },
  f234: {
    lead: "The Union Flag is popularly known as the Union Jack.",
    versus: "'Union Flag' is the official name the handbook uses; 'Union Jack' is the everyday one. Both name the same flag, so a question may use either.",
  },
  f235: {
    lead: "The Union Flag combines three crosses.",
    why: "One cross each for England, Scotland and Ireland. Wales contributes none, which is why the count is three rather than four.",
    cluster: [
      { label: "The cross of St George, England", detail: "a red cross upright on a white ground" },
      { label: "The cross of St Andrew, Scotland", detail: "a white cross laid diagonally on a blue ground — the only coloured ground of the three" },
      { label: "The cross of St Patrick, Ireland", detail: "a red cross on white like St George's, but laid diagonally" },
      { label: "No Welsh emblem", detail: "Wales was already united with England when the first Union Flag was created in 1606, from the flags of Scotland and England" },
    ],
  },
  f236: {
    lead: "St George's cross is a red upright cross on a white ground.",
    versus: "St Patrick's cross uses the same two colours, red on white, but lies diagonally. Upright means St George; diagonal red means St Patrick.",
    why: "St George is the patron saint of England, so this is the England cross in the flag.",
  },
  f237: {
    lead: "St Andrew's cross is a white diagonal cross on a blue ground.",
    versus: "It is the only one of the three on a coloured ground; the other two sit on white. Blue means Scotland.",
    why: "St Andrew is the patron saint of Scotland, so this is the Scotland cross in the flag.",
  },
  f238: {
    lead: "St Patrick's cross, for Ireland, is a diagonal red cross on a white ground.",
    versus: "St Andrew's is the other diagonal cross, and its colours run the other way: white on blue. Diagonal and red on white means St Patrick.",
    why: "It joined the flag when Ireland became unified with England, Scotland and Wales in 1801, the union the new version of the Union Flag was made to mark.",
    cluster: [
      { label: "St George, England", detail: "the only upright cross of the three: red on a white ground" },
      { label: "St Andrew, Scotland", detail: "diagonal, white on a blue ground" },
      { label: "St Patrick, Ireland", detail: "diagonal, red on a white ground" },
      { label: "Wales", detail: "no cross on the Union Flag at all; its dragon flies on a separate Welsh flag" },
    ],
  },
  f239: {
    lead: "The Union Flag carries no Welsh emblem because Wales was already united with England when the flag was first created.",
    versus: "Ireland is the opposite case: it was still a separate country then, so its cross had to be added later, in 1801. Wales was too early to need representing; Ireland was late enough to need adding.",
    why: "The first Union Flag was made in 1606 from the flags of Scotland and England alone. The Statute of Rhuddlan had annexed Wales to the Crown of England in 1284, more than three hundred years before.",
  },
  f240: {
    lead: "The flag of Wales shows a red dragon.",
    versus: "The other three countries appear on the Union Flag through their patron saints' crosses. Wales is the one represented by a dragon, on a flag of its own.",
    why: "Wales has a separate flag precisely because it is absent from the Union Flag: when the first Union Flag was created in 1606 from the flags of Scotland and England, Wales was already united with England.",
  },
  f241: {
    lead: "St George is the patron saint of England.",
    versus: "His is the only upright cross on the Union Flag, red on a white ground. The two diagonals belong to St Andrew and St Patrick.",
    why: "St George's Day, 23 April, is no longer a public holiday in England, although parades and small festivals are still held.",
    cluster: [
      { label: "St David, Wales, 1 March", detail: "the earliest of the four in the year; celebrated, but not a public holiday" },
      { label: "St Patrick, Northern Ireland, 17 March", detail: "an official holiday there" },
      { label: "St George, England, 23 April", detail: "the only one of the four in April; not an official holiday" },
      { label: "St Andrew, Scotland, 30 November", detail: "the last of the four; an official holiday, though not all businesses close" },
    ],
  },
  f242: {
    lead: "St Andrew is the patron saint of Scotland.",
    versus: "His cross is the diagonal white one on a blue ground. St Patrick's is the other diagonal, red on white, so the colours are what separate them.",
    why: "St Andrew's Day, 30 November, is one of only two patron saints' days that are official holidays. St Patrick's Day in Northern Ireland is the other.",
  },
  f243: {
    lead: "St David is the patron saint of Wales.",
    versus: "Wales is the one country of the four with no cross on the Union Flag, so St David is the saint with no place on it.",
    why: "St David's Day, 1 March, is the earliest of the four saints' days in the year, and is no longer a public holiday in Wales.",
  },
  f244: {
    lead: "St Patrick is the patron saint of Northern Ireland.",
    versus: "St Patrick's cross, the red diagonal on white, stands for Ireland on the Union Flag; St Andrew's, the white diagonal on blue, stands for Scotland. Red diagonal means Patrick.",
    why: "The handbook meets him twice: here as a patron saint, and in the history chapter as one of the missionaries from Ireland who spread Christianity in the north.",
  },
  f245: {
    lead: "St David's Day, the national day of Wales, is on 1 March.",
    versus: "The other March date is 17 March, St Patrick's Day. David's is the 1st, and the first of the four saints' days in the year.",
    why: "It is not an official holiday: only Scotland and Northern Ireland have their patron saint's day as one.",
  },
  f246: {
    lead: "St Patrick's Day, the national day of Northern Ireland, is on 17 March.",
    versus: "The other March date is 1 March, St David's Day for Wales. Patrick's is the later of the two.",
    why: "It is one of only two patron saints' days that are official holidays, the other being St Andrew's Day in Scotland.",
  },
  f247: {
    lead: "St George's Day, the national day of England, is on 23 April.",
    versus: "England's is the only one of the four in April. Both March dates belong elsewhere: the 1st to Wales, the 17th to Northern Ireland.",
    why: "It is no longer a public holiday in England, although parades and small festivals are still held all over the country.",
  },
  f248: {
    lead: "St Andrew's Day, the national day of Scotland, is on 30 November.",
    versus: "It is the last of the four in the year and the only one outside March and April.",
    why: "It is an official holiday in Scotland, although not all businesses and offices close.",
  },
  f249: {
    lead: "The patron saint's day is an official holiday only in Scotland and Northern Ireland.",
    versus: "In England and Wales the saints' days are no longer public holidays, although they are still celebrated with parades and small festivals.",
    why: "Even in Scotland the holiday is partial: not all businesses and offices close.",
  },
  f250: {
    lead: "Gaelic is spoken in some parts of the Highlands and Islands of Scotland.",
    versus: "In Northern Ireland the language some people speak is Irish Gaelic, and in Wales it is Welsh. Scottish Gaelic belongs to the Highlands and Islands.",
    why: "The handbook treats Gaelic as a different language from English rather than an accent or dialect of it, and says the same of Welsh.",
  },
  f251: {
    lead: "Ulster Scots is the language variety used by some people in Northern Ireland alongside Irish.",
    versus: "Scottish Gaelic belongs to the Highlands and Islands of Scotland, not to Northern Ireland.",
  },
  f253: {
    lead: "The population of the UK was an estimated 67.6 million in 2022, the most recent figure the handbook gives.",
    why: "The handbook's table sets the scale: 40 million in 1901, 50 million by 1951, 67.6 million by 2022. Growth has been faster in recent years, and the handbook puts that down to migration into the UK and longer life expectancy.",
  },
  f254: {
    lead: "A census, a count of the whole population, is taken in the UK every 10 years.",
  },
  f255: {
    lead: "About 84% of the UK population lives in England.",
    why: "The four shares complete each other: England 84%, Scotland just over 8%, Wales around 5%, Northern Ireland less than 3%. England's share is more than five times the other three put together.",
  },
  f256: {
    lead: "An ageing population means people are living longer, so there are more elderly people.",
    versus: "It is about length of life, not about birth rates or migration. The handbook puts it down to improved living standards and better health care.",
    why: "There are now a record number of people aged 85 and over, and the handbook's concern is the cost: pensions and health care have to be paid for.",
  },
  f257: {
    lead: "The Church of England is the officially established Church in England.",
    versus: "England is the only part of the UK with a constitutional link between Church and state. Scotland's national Church, the Church of Scotland, is not a state Church, and there is no established Church in Wales or Northern Ireland.",
    why: "It is a Protestant Church and has existed since the Reformation in the 1530s. It is called the Anglican Church in other countries, and the Episcopal Church in Scotland and the United States.",
    cluster: [
      { label: "The monarch", detail: "head of the Church of England, and the one with the right to select the Archbishop" },
      { label: "The Archbishop of Canterbury", detail: "its spiritual leader, which is not the same as its head" },
    ],
  },
  f259: {
    lead: "The Archbishop of Canterbury is the most senior clergyman in the Church of England, its spiritual leader.",
    versus: "The monarch is the head of the Church of England; the Archbishop is its spiritual leader. Head is the constitutional role, spiritual leader the clerical one.",
    why: "The monarch has the right to select the Archbishop, but the choice is usually made by the Prime Minister and a committee appointed by the Church.",
  },
  f260: {
    lead: "The Church of Scotland is a Presbyterian Church.",
    versus: "Presbyterian means governed by ministers and elders. The Church of England is led through its bishops and the Archbishop of Canterbury; ministers and elders means Scotland.",
    why: "Its chairperson, the Moderator of the General Assembly, is appointed for one year only and often speaks on behalf of the Church.",
  },
  f261: {
    lead: "Christmas Day, 25 December, and Boxing Day, the day after it, are both public holidays.",
    versus: "Christmas Eve, 24 December, is when many Christians go to church, but the handbook does not list it as a public holiday.",
  },
  f262: {
    lead: "Advent, the season of preparation before Christmas, lasts four weeks.",
    versus: "Lent is the other season of preparation and is counted in days: the 40 days before Easter. Weeks before Christmas, days before Easter.",
  },
  f263: {
    lead: "Lent is the 40 days before Easter.",
    versus: "Advent is the other season of preparation and is counted in weeks: four weeks before Christmas. Days before Easter, weeks before Christmas.",
    why: "It is a time to reflect and prepare for Easter, and traditionally a time to fast. Lent begins on Ash Wednesday, and the day before is Shrove Tuesday or Pancake Day, when eggs, fat and milk were used up before the fasting started.",
  },
  f264: {
    lead: "Good Friday and Easter Monday are the two public holidays at Easter.",
    versus: "Easter Sunday is not among them. Good Friday marks the death of Jesus Christ and Easter Sunday his rising from the dead, so the holidays fall around that day rather than on it.",
    why: "Easter takes place in March or April, so both dates move each year.",
  },
  f265: {
    lead: "Diwali is celebrated by Hindus and Sikhs.",
    versus: "The other religious festivals in this section belong to one faith each: Hanukkah to Jews, the two Eids to Muslims, Vaisakhi to Sikhs. Diwali is the one shared between two.",
    why: "It normally falls in October or November and lasts five days. Often called the Festival of Lights, it celebrates the victory of good over evil and the gaining of knowledge.",
  },
  f266: {
    lead: "Hanukkah, which remembers the Jews' struggle for religious freedom, is celebrated for eight days.",
    versus: "Diwali is the other festival of lights here and runs five days, in October or November. Hanukkah is in November or December.",
    why: "A candle is lit on each of the eight days on a stand of eight candles called a menorah, recalling oil that should have lasted one day and lasted eight.",
  },
  f267: {
    lead: "Eid al-Fitr celebrates the end of Ramadan, the month during which Muslims have fasted.",
    versus: "Eid ul Adha is the other Eid, and it remembers Ibrahim's willingness to sacrifice his son. Fitr closes the fast; Adha recalls Ibrahim.",
    why: "Muslims thank Allah for giving them the strength to complete the fast, and attend special services and meals. The date changes every year.",
  },
  f268: {
    lead: "Eid ul Adha remembers that the prophet Ibrahim was willing to sacrifice his son when God ordered him to.",
    versus: "Eid al-Fitr is the other Eid and marks the end of Ramadan's month of fasting. Adha recalls Ibrahim; Fitr closes the fast.",
    why: "It reminds Muslims of their own commitment to God. Many sacrifice an animal to eat during the festival, which in Britain has to be done in a slaughterhouse.",
  },
  f269: {
    lead: "Vaisakhi, also spelled Baisakhi, is celebrated on 14 April each year.",
    versus: "Eid al-Fitr is the festival whose date changes every year. Vaisakhi falls on the same date annually.",
    why: "It is a Sikh festival celebrating the founding of the Sikh community known as the Khalsa, marked with parades, dancing and singing.",
  },
  f270: {
    lead: "In Scotland, New Year's Eve, 31 December, is called Hogmanay.",
    why: "Scotland keeps New Year longer than the rest of the UK: 2 January is a public holiday there as well, and for some Scottish people Hogmanay is a bigger holiday than Christmas.",
  },
  f271: {
    lead: "April Fool's Day is 1 April, and jokes are traditionally played on each other only until midday.",
    why: "Television and newspapers often run stories that are April Fool jokes, which is the form the day usually takes in public.",
  },
  f272: {
    lead: "Mothering Sunday, also called Mother's Day, is the Sunday three weeks before Easter.",
    versus: "Father's Day is fixed to the calendar, the third Sunday in June. Mothering Sunday moves with Easter; Father's Day does not.",
    why: "Because it is tied to Easter, which falls in March or April, its date changes every year.",
  },
  f273: {
    lead: "Father's Day in the UK is the third Sunday in June.",
    versus: "Mothering Sunday is the one tied to Easter, the Sunday three weeks before it, so its date moves each year. Father's Day stays in June.",
  },
  f274: {
    lead: "Halloween is on 31 October.",
    versus: "Bonfire Night is the other autumn date, 5 November, five days later, and it marks a failed plot rather than the turn of the season.",
    why: "It is an ancient festival with roots in the pagan festival marking the beginning of winter, which is why the handbook keeps it apart from the Christian festivals.",
  },
  f275: {
    lead: "Bonfire Night is on 5 November, when people in Great Britain set off fireworks at home and in special displays.",
    versus: "Remembrance Day is the other November date, on the 11th, and commemorates those who died fighting for the UK and its allies. The 5th marks a failed plot; the 11th marks the dead.",
    why: "The origin was an event in 1605, when a group of Catholics led by Guy Fawkes failed in their plan to kill the Protestant king with a bomb in the Houses of Parliament.",
  },
  f276: {
    lead: "Remembrance Day is 11 November. It commemorates those who died fighting for the UK and its allies.",
    versus: "Bonfire Night is the other November date: 5 November, fireworks for the failed plot led by Guy Fawkes. Remembrance Day is the later one, with poppies and a silence.",
    why: "It began as a commemoration of the First World War dead, and that war ended on 11 November 1918. At 11.00 am there is a two-minute silence and wreaths are laid at the Cenotaph in Whitehall, London.",
  },
  f277: {
    lead: "Sir Roger Bannister was the first man in the world to run a mile in under four minutes, in 1954.",
    versus: "Two firsts sit close together here. Bannister was first in the world; Sir Bradley Wiggins was first Briton, for the Tour de France in 2012.",
  },
  f278: {
    lead: "Sir Jackie Stewart is the Scottish former racing driver who won the Formula 1 world championship three times.",
    versus: "The other Scot among the handbook’s sportspeople is Sir Chris Hoy, and he is a cyclist with six Olympic golds. Stewart is the driver, and his number is three championships.",
    why: "The handbook reduces most of its sportspeople to a nationality and a number, and those are the two things to hold here: Scottish, three.",
  },
  f279: {
    lead: "Bobby Moore captained the English football team that won the World Cup in 1966.",
    why: "That tournament was hosted in the UK and remains England’s only international tournament victory, which is why 1966 is the one year attached to English football.",
  },
  f280: {
    lead: "Jayne Torvill and Christopher Dean won gold medals for ice dancing at the Olympic Games in 1984.",
    why: "The Olympic gold is half of it. They also won four consecutive world championships, and the handbook names them only as a pair.",
  },
  f281: {
    lead: "Sir Steve Redgrave won gold medals in rowing at five consecutive Olympic Games.",
    versus: "Sir Chris Hoy is the other serial gold winner, and he is a cyclist with six golds and a silver. Redgrave is the rower, and his number is five Games in a row.",
    why: "Consecutive is the load-bearing word: five separate Olympic Games, not five medals at one. The handbook calls him one of Britain’s greatest Olympians.",
  },
  f282: {
    lead: "Dame Kelly Holmes won the 800 metres and the 1500 metres at the 2004 Olympic Games.",
    versus: "Jessica Ennis is the other athletics gold to hold apart: one event, the heptathlon, in 2012. Holmes is two running titles at a single Games, in 2004.",
    why: "Two golds for running at one Olympic Games is what fixes 2004 to her name. She has also held a number of British and European records.",
  },
  f283: {
    lead: "Sir Chris Hoy won his six Olympic gold medals as a cyclist.",
    versus: "Sir Steve Redgrave is the rower, with gold at five consecutive Games. Hoy is the Scottish cyclist, with six golds and one silver, and 11 world championship titles.",
    cluster: [
      { label: "Sir Chris Hoy, cycling", detail: "six Olympic golds and one silver, and 11 world championship titles" },
      { label: "Sir Steve Redgrave, rowing", detail: "gold at five consecutive Olympic Games" },
      { label: "Bradley Wiggins, cycling", detail: "the first Briton to win the Tour de France, in 2012" },
      { label: "Dame Kelly Holmes, running", detail: "two gold medals at a single Games, in 2004" },
      { label: "Jessica Ennis, heptathlon", detail: "the 2012 gold, over seven track and field events" },
    ],
  },
  f284: {
    lead: "Sir Bradley Wiggins became the first Briton to win the Tour de France, in 2012.",
    versus: "Sir Roger Bannister is the other first in this section, and his was a world first: the four-minute mile in 1954. Wiggins was first Briton, not first outright.",
    why: "2012 is the year that holds him twice over. He has won seven Olympic medals, including golds at the 2004, 2008 and 2012 Games.",
    note: "The handbook says Wiggins was the first Briton to win the Tour de France, not the first person to win it.",
  },
  f285: {
    lead: "Jessica Ennis won the 2012 Olympic gold medal in the heptathlon.",
    why: "The heptathlon includes seven different track and field events, and hepta is seven, so the name carries the count.",
  },
  f286: {
    lead: "The Olympic Games have been hosted here on three occasions: 1908, 1948 and 2012.",
    why: "2012 is the one with detail attached: the main Olympic site was in Stratford, East London, and the British team finished third in the medal table.",
  },
  f287: {
    lead: "The Paralympic movement began at Stoke Mandeville hospital in Buckinghamshire.",
    why: "It started as treatment rather than as sport. Dr Sir Ludwig Guttman, a German refugee, developed new methods for people with spinal injuries and encouraged patients to take part in exercise and sport.",
  },
  f288: {
    lead: "The Ashes is contested by England and Australia, and was first played in 1882.",
    why: "It is a series of Test matches and the handbook calls it cricket’s most famous competition. Only ever two countries play for it.",
  },
  f289: {
    lead: "The Six Nations Championship is played by England, Scotland, Wales, Ireland, France and Italy.",
    why: "Ireland fields one team for the whole island, because Northern Ireland plays with the Irish Republic. So the UK supplies three sides rather than four, and France and Italy make six.",
  },
  f290: {
    lead: "Wimbledon is the oldest tennis tournament in the world and the only Grand Slam event played on grass.",
    why: "It is held at the All England Lawn Tennis and Croquet Club, and lawn is the surface: the grass is in the club’s own name.",
  },
  f291: {
    lead: "The modern game of golf can be traced back to 15th century Scotland.",
    why: "St Andrews in Scotland is known as the home of golf, which is the same fact from the other direction.",
  },
  f292: {
    lead: "The Grand National is run at Aintree, near Liverpool.",
    versus: "Royal Ascot is the other famous meeting, and it is in Berkshire and attended by the Royal Family. Aintree is the Liverpool course, and the Grand National is its race.",
    why: "The handbook names a second Grand National as well, the Scottish Grand National, run at Ayr. Aintree is the one without a country in the race name.",
  },
  f293: {
    lead: "Royal Ascot is held in Berkshire.",
    versus: "Aintree, near Liverpool, is the Grand National course. Ascot is the Berkshire meeting, and the royal connection is what marks it out.",
    why: "It is a five-day race meeting attended by members of the Royal Family, which is where the Royal in the name comes from.",
  },
  f294: {
    lead: "The Proms is organised by the BBC, and the venue the handbook names is the Royal Albert Hall in London.",
    why: "It is an eight-week summer season of orchestral classical music, organised by the British Broadcasting Corporation since 1927, and the Last Night is broadcast on television. The season uses various venues, of which the Royal Albert Hall is the one named.",
  },
  f295: {
    lead: "George Frederick Handel was the German-born composer who became a British citizen in 1727 and wrote Messiah.",
    versus: "Sir Edward Elgar and Benjamin Britten are the other two composers to keep apart from him, and both are British-born. Handel is the one who arrived from elsewhere and took citizenship.",
    why: "Messiah is an oratorio, sung regularly by choirs and often at Easter. He wrote the Water Music for King George I and Music for the Royal Fireworks for his son, George II.",
  },
  f296: {
    lead: "Sir Edward Elgar wrote the Pomp and Circumstance Marches.",
    why: "March No 1 is Land of Hope and Glory, usually played at the Last Night of the Proms at the Royal Albert Hall, so the composer, the march and the concert are one fact rather than three.",
    cluster: [
      { label: "George Frederick Handel", detail: "German-born, became a British citizen in 1727, and wrote Messiah" },
      { label: "Sir Edward Elgar", detail: "born in Worcester; the Pomp and Circumstance Marches, played at the Last Night of the Proms" },
      { label: "Benjamin Britten", detail: "the operas, including Peter Grimes, and the Aldeburgh festival in Suffolk" },
    ],
  },
  f297: {
    lead: "Benjamin Britten wrote the opera Peter Grimes and founded the Aldeburgh festival in Suffolk.",
    versus: "Elgar is the marches and the Last Night of the Proms. Britten is the operas and the Suffolk festival.",
    why: "He is best known for his operas, which include Peter Grimes and Billy Budd. He also wrote A Young Person’s Guide to the Orchestra, which introduces the listener to the sections of an orchestra.",
  },
  f298: {
    lead: "The Mercury Music Prize is awarded each year for the best album from the UK and Ireland.",
    versus: "The Brit Awards are the other music event, and they give awards in a range of categories, such as best British group and best British solo artist. The Mercury is one prize for one album.",
    why: "It is awarded each September, and the eligible field crosses into Ireland rather than stopping at the UK border.",
  },
  f299: {
    lead: "The Brit Awards are organised by the British Phonographic Industry.",
    versus: "The Mercury Music Prize is a single prize for the best album of the year. The Brit Awards give prizes in a range of categories, such as best British group and best British solo artist.",
  },
  f300: {
    lead: "The Fringe is held in Edinburgh.",
    why: "The Edinburgh Festival is a series of different arts and cultural festivals held every summer, and the Fringe is the biggest and best known of them: mainly theatre and comedy, and often experimental work.",
  },
  f301: {
    lead: "The Laurence Olivier Awards honour British theatre each year.",
    why: "They are named after the British actor Sir Laurence Olivier, later Lord Olivier, who was best known for his roles in Shakespeare plays. They are held at different venues in London.",
    cluster: [
      { label: "The Laurence Olivier Awards, theatre", detail: "categories including best director, best actor and best actress" },
      { label: "The British Academy Film Awards, film", detail: "hosted by BAFTA; the British equivalent of the Oscars" },
      { label: "The Brit Awards, music", detail: "a range of categories, such as best British group and best British solo artist" },
      { label: "The Mercury Music Prize, music", detail: "one prize each September, for the best album from the UK and Ireland" },
      { label: "The Turner Prize, art", detail: "established in 1984; four works shortlisted a year and shown at Tate Britain" },
    ],
  },
  f302: {
    lead: "In pantomime a man plays the Dame and a woman plays the principal boy.",
    why: "The Dame is the character the handbook names, and it defines her as a woman played by a man. Both leading parts are deliberately cast against sex, so the reversed version is simply wrong.",
  },
  f303: {
    lead: "Andrew Lloyd Webber wrote the music for Cats, Evita and The Phantom of the Opera.",
    why: "The handbook names four of his shows and splits them: Jesus Christ Superstar and Evita were written in collaboration with the lyricist Tim Rice, while Cats and The Phantom of the Opera are his alone.",
  },
  f304: {
    lead: "Joseph Turner was an influential landscape painter in a modern style, and is considered the artist who raised the profile of landscape painting.",
    versus: "Henry Moore is the sculptor among the handbook’s notable British artists. Turner is the landscape painter, and the prize named after him is for contemporary art.",
    why: "The Turner Prize carries his name, so the painter and the prize recover each other.",
  },
  f305: {
    lead: "Henry Moore was an English sculptor, best known for his large bronze abstract sculptures.",
    versus: "Joseph Turner is the landscape painter. Moore is the sculptor, and the only one among the artists the handbook names.",
  },
  f306: {
    lead: "The Turner Prize was established in 1984.",
    versus: "The Booker Prize for Fiction has been awarded since 1968, the Turner Prize since 1984. Books first, art after.",
    why: "It celebrates contemporary art and was named after Joseph Turner. Four works are shortlisted every year and shown at Tate Britain before the winner is announced.",
  },
  f307: {
    lead: "Sir Edwin Lutyens designed the Cenotaph in Whitehall.",
    versus: "Sir Christopher Wren is the 17th-century architect, and his building is the new St Paul’s Cathedral. Lutyens is the 20th-century one, and his work is memorials.",
    why: "After the First World War he was responsible for many war memorials throughout the world, and the Cenotaph is the site of the annual Remembrance Day service, which ties him to 11 November.",
  },
  f308: {
    lead: "Thomas Chippendale designed furniture in the 18th century.",
    versus: "He is the earliest of the three designers the handbook lists, and chronology sorts them: Chippendale’s furniture in the 18th century, then Clarice Cliff’s Art Deco ceramics, then Sir Terence Conran’s 20th-century interiors.",
  },
  f309: {
    lead: "Mary Quant is the British fashion designer associated with the 1960s miniskirt.",
    versus: "Alexander McQueen and Vivienne Westwood are the other two fashion designers the handbook names. Quant is the one attached to the 1960s and the miniskirt.",
  },
  f310: {
    lead: "The Booker Prize for Fiction has been awarded since 1968.",
    versus: "The Turner Prize was established in 1984. Books in 1968, art in 1984, so the literary prize is the older of the two.",
    why: "The eligible field is wider than Britain: it is awarded for the best fiction novel written by an author from the Commonwealth, Ireland or Zimbabwe.",
  },
  f311: {
    lead: "Jane Austen wrote Pride and Prejudice.",
    why: "The handbook names two of her books, Pride and Prejudice and Sense and Sensibility, and says her novels are concerned with marriage and family relationships.",
  },
  f312: {
    lead: "Charles Dickens wrote Oliver Twist and Great Expectations.",
    why: "The handbook remembers him for characters who passed into everyday speech: a Scrooge is a mean person, a Micawber is always hopeful.",
  },
  f313: {
    lead: "Sir Arthur Conan Doyle wrote the stories about Sherlock Holmes.",
    why: "He was a Scottish doctor as well as a writer, and the handbook calls Holmes one of the first fictional detectives — so a later crime writer is never the answer here.",
  },
  f314: {
    lead: "Geoffrey Chaucer wrote The Canterbury Tales, in the years leading up to 1400.",
    why: "It is a set of poems in English about a group of people going to Canterbury on a pilgrimage, telling each other stories on the journey — written just as English was becoming the preferred language of the royal court and Parliament.",
  },
  f316: {
    lead: "Sir Alfred Hitchcock is the British director who left for Hollywood, and he remained an important film director until his death in 1980.",
    versus: "Sir David Lean is the other British director the handbook singles out, but he comes later and succeeded in the UK and internationally at the same time. Hitchcock is the one who left.",
    why: "He belongs to the 1930s, when British studios flourished; the handbook's list of famous British films credits him with The 39 Steps, from 1935.",
  },
  f317: {
    lead: "Ian Fleming wrote the James Bond novels, and the first film was Dr No, in 1962.",
    why: "James Bond and Harry Potter are the two highest-grossing film franchises, and the handbook's point is that both were produced in the UK.",
    note: "The handbook names Ian Fleming as the writer whose books introduced James Bond, but gives no first film and no date for one. Dr No and 1962 come from outside the book.",
  },
  f318: {
    lead: "Monty Python's Flying Circus introduced a new type of progressive comedy in 1969.",
    why: "The handbook runs its television comedy in date order, so the decade alone usually identifies the show.",
    cluster: [
      { label: "That Was The Week That Was, the 1960s", detail: "satire, earlier in the same decade" },
      { label: "Monty Python's Flying Circus, 1969", detail: "not satire but a new, progressive kind of comedy" },
      { label: "Spitting Image, the 1980s and 1990s", detail: "satire again, two decades later" },
    ],
  },
  f319: {
    lead: "Punch, first published in the 1840s, is the most famous of the satirical magazines that began in the 19th century.",
    versus: "Private Eye carries the same tradition today, so it is wrong whenever a question names the 1840s.",
    why: "The magazines did not invent the form. Political cartoons attacking prominent politicians, and sometimes the monarch, were already popular in the 18th century.",
  },
  f320: {
    lead: "The Chelsea Flower Show is the annual event that showcases garden design from Britain and around the world.",
    versus: "The famous gardens — Kew, Sissinghurst, Bodnant and the rest — are places you visit. Chelsea is an event held once a year.",
    why: "The handbook puts it at the end of a line of British garden design that runs from Capability Brown to Gertrude Jekyll.",
  },
  f321: {
    lead: "All dogs in public places must wear a collar showing the name and address of the owner.",
    versus: "The requirement is identification, not restraint. The handbook asks for a collar carrying the owner's details, not a muzzle, a lead or a licence.",
    why: "Every duty in the passage sits with the owner: keeping the dog under control, and cleaning up after it in a public place.",
  },
  f322: {
    lead: "The National Trust was founded in 1895 by three volunteers.",
    versus: "The National Trust covers England, Wales and Northern Ireland. The National Trust for Scotland is a separate charity doing the same work.",
    why: "It is still run by volunteers — the handbook says there are now more than 61,000 of them.",
  },
  f323: {
    lead: "Haggis is the traditional food of Scotland: a sheep's stomach stuffed with offal, suet, onions and oatmeal.",
    versus: "Black pudding is real but is not a dish in its own right here — the handbook lists it as one of the things fried in the Ulster fry.",
    why: "The traditional foods are given one per country, so haggis is Scotland's and the Ulster fry is Northern Ireland's.",
  },
  f324: {
    lead: "The Ulster fry is the traditional food of Northern Ireland: a fried meal of bacon, eggs, sausage, black pudding, white pudding, tomatoes, mushrooms, soda bread and potato bread.",
    versus: "Haggis is the Scottish entry in the same set, and it is one stuffed dish rather than a fried plateful.",
    why: "The breads are what mark it out — soda bread and potato bread are fried alongside everything else.",
  },
  f325: {
    lead: "Big Ben is the nickname for the great bell of the clock at the Houses of Parliament in London.",
    versus: "The bell is Big Ben; the tower is the Elizabeth Tower. The handbook notes that many people call the clock Big Ben as well, but the name belongs to the bell.",
  },
  f326: {
    lead: "The clock tower at the Houses of Parliament was named the Elizabeth Tower in 2012.",
    versus: "The tower is the Elizabeth Tower; Big Ben is the great bell of the clock inside it.",
    why: "It was named in honour of Queen Elizabeth II's Diamond Jubilee — sixty years as queen, counted from 1952 — which is what fixes the year.",
  },
  f327: {
    lead: "The Eden Project is in Cornwall, in the south west of England.",
    why: "Its biomes are like giant greenhouses and house plants from all over the world. It is also a charity, running environmental and social projects internationally.",
  },
  f328: {
    lead: "The Giant's Causeway is on the north-east coast of Northern Ireland.",
    why: "It is a land formation of columns made from volcanic lava, formed about 50 million years ago.",
    note: "The handbook says only that there are many legends about how the Causeway was formed. It tells none of them.",
  },
  f329: {
    lead: "Snowdon is the highest mountain in Wales, and it stands in Snowdonia.",
    why: "Snowdonia is a national park in North Wales and Snowdon is its best-known landmark, so the mountain and the park are a single entry in the handbook rather than two facts.",
  },
  f330: {
    lead: "The Lake District is England's largest national park, and its biggest stretch of water is Windermere.",
    versus: "Windermere is the biggest stretch of water in the Lake District; Loch Lomond is the largest expanse of fresh water in mainland Britain. The Lake District claim is limited to England.",
    why: "The handbook counts 15 national parks, in England, Wales and Scotland — so a question phrased about the UK as a whole is asking something else.",
  },
  f331: {
    lead: "The UK is a constitutional monarchy.",
    versus: "Constitutional, not absolute: the king or queen does not rule the country but appoints the government, which the people have chosen in a democratic election.",
    why: "The handbook dates the arrangement to the laws passed after the Glorious Revolution. From then the monarch remained very important but could no longer insist on particular policies if Parliament did not agree.",
  },
  f332: {
    lead: "The British constitution is not written down in any single document, which is why it is described as unwritten.",
    versus: "No single Act is the constitution — not Magna Carta and not the Bill of Rights. A constitution is the whole set of principles, institutions, laws and conventions by which a country is governed.",
    why: "The handbook's reason is that the UK, unlike America or France, has never had a revolution that led permanently to a totally new system of government, so its institutions developed over hundreds of years instead.",
  },
  f333: {
    lead: "The monarch stays politically neutral.",
    versus: "The monarch appoints the government but does not choose it and never leads it. The invitation to become Prime Minister goes to the leader of the party with the largest number of MPs.",
    why: "In regular meetings with the Prime Minister the monarch may advise, warn and encourage, but decisions on government policy are made by the Prime Minister and the cabinet.",
  },
  f334: {
    lead: "The monarch opens the new parliamentary session each year with a speech summarising the government's policies for the year ahead.",
    versus: "The role is ceremonial. The monarch does not vote on bills and does not choose the Speaker — MPs elect the Speaker themselves, in a secret ballot.",
    why: "The policies in the speech are the government's, not the monarch's: the handbook is explicit that decisions on government policy are made by the Prime Minister and the cabinet.",
  },
  f335: {
    lead: "There are 650 Members of Parliament in the House of Commons.",
    why: "Each MP represents one parliamentary constituency, so the number of MPs and the number of constituencies are the same figure.",
    note: "The handbook gives no number of MPs. It says only that the UK is divided into constituencies and that each one elects a single MP.",
  },
  f336: {
    lead: "The area that a single MP represents is called a parliamentary constituency.",
    why: "The handbook describes it as a small area of the country, and puts representing everyone in that constituency first among an MP's duties — everyone, not only those who voted for them.",
  },
  f337: {
    lead: "A general election must be held at least every five years.",
    why: "The handbook traces the rule to the Bill of Rights of 1689: a new Parliament had to be elected at least every three years, which later became seven, and is now five.",
  },
  f338: {
    lead: "Since 1958 the Prime Minister has had the power to nominate peers for their own lifetime, called life peers.",
    versus: "1958 created a way into the Lords; 1999 took one away, when hereditary peers lost their automatic right to attend. The change that added peers came first.",
    why: "Life peers are appointed by the monarch on the advice of the Prime Minister, and have usually had an important career in politics, business, law or another profession.",
  },
  f339: {
    lead: "Since 1999, hereditary peers have lost the automatic right to attend the House of Lords.",
    versus: "1999 removed a right; 1958 created one, when the Prime Minister gained the power to nominate life peers.",
    why: "They did not disappear altogether — they now elect a few of their number to represent them in the Lords.",
  },
  f340: {
    lead: "No. The House of Commons has powers to overrule the House of Lords, so the Lords cannot permanently stop a law the Commons is determined to pass.",
    versus: "The Lords check laws passed by the Commons and can suggest amendments or propose new laws. Checking and amending, not vetoing.",
    why: "The handbook adds that the overruling powers are not used often, and that the Commons is the more important of the two chambers because its members are democratically elected.",
  },
  f341: {
    lead: "Debates in the House of Commons are chaired by the Speaker, the chief Officer of the House.",
    versus: "The Speaker is neutral and does not represent a political party, even though he or she is still an MP with a constituency and constituents' problems to deal with.",
    why: "The job is keeping order: making sure the rules are followed, making sure the opposition gets a guaranteed amount of time to debate issues it chooses, and representing Parliament on ceremonial occasions.",
  },
  f342: {
    lead: "The Speaker is chosen by other MPs, in a secret ballot.",
    why: "It goes with the neutrality: the Speaker does not represent a political party, and is elected by fellow MPs rather than appointed by anyone.",
  },
  f343: {
    lead: "Party whips organise their party's business in Parliament and make sure its members vote with the party.",
  },
  f344: {
    lead: "The Chancellor of the Exchequer is the Cabinet minister responsible for the economy.",
    why: "The Prime Minister appoints about 20 senior MPs to take charge of departments, and these three are the posts the handbook names by title.",
    cluster: [
      { label: "Chancellor of the Exchequer", detail: "the economy" },
      { label: "Home Secretary", detail: "crime, policing and immigration" },
      { label: "Foreign Secretary", detail: "relationships with foreign countries" },
    ],
  },
  f345: {
    lead: "The Home Secretary is the Cabinet minister responsible for crime, policing and immigration.",
    versus: "Home means inside the country. Anything to do with other countries belongs to the Foreign Secretary; anything to do with money belongs to the Chancellor of the Exchequer.",
  },
  f346: {
    lead: "The Foreign Secretary is the Cabinet minister responsible for managing relationships with foreign countries.",
    versus: "Foreign means outside the country. Crime, policing and immigration are the Home Secretary's; the economy is the Chancellor of the Exchequer's.",
  },
  f347: {
    lead: "Senior opposition MPs appointed to shadow government ministers are called shadow ministers, and together they form the shadow cabinet.",
    versus: "The cabinet makes the decisions about government policy. The shadow cabinet puts forward alternatives to them.",
    why: "The leader of the opposition appoints them, and their role is to challenge the government and offer those alternative policies.",
  },
  f348: {
    lead: "Organisations that try to influence government policy without seeking office are called pressure and lobby groups.",
    versus: "A political party puts up candidates and tries to win seats. A pressure group only tries to change what the government does.",
    why: "The handbook treats them as playing an important role in politics and gives three examples: the CBI for British business, Greenpeace for the environment and Liberty for human rights.",
  },
  f349: {
    lead: "Civil servants must be politically neutral, whichever party is in power.",
    versus: "They are not political appointees. Civil servants apply for the job through an ordinary application process, like any other job in the UK, and are chosen on merit — not selected by whichever party has won.",
    why: "Political neutrality sits inside impartiality, one of the four core values of the civil service: integrity, honesty, objectivity and impartiality.",
  },
  f350: {
    lead: "Local councils are funded from two sources: grants from central government and council tax.",
    why: "One source is national and one is local, which is why councils are only ever partly independent of Westminster.",
    note: "The handbook's own words are that local authorities \"are funded by money from central government and by local taxes\". It does not use the term \"council tax\".",
  },
  f351: {
    lead: "London has 33 boroughs.",
    note: "The handbook does not use the word \"borough\". It says London has 33 local authorities — the same 33, under the name the book uses.",
  },
  f352: {
    lead: "The devolved administrations first received their powers in 1999.",
    versus: "1997 is when devolution started as a policy and powers began to be transferred. 1999 is when the bodies themselves first sat. A question about the Scottish Parliament or the Welsh Assembly meeting is 1999.",
    why: "One year covers all three bodies, so this is a single date to hold rather than three separate ones.",
    cluster: [
      { label: "Scottish Parliament, 129 MSPs", detail: "sits in Edinburgh and can legislate on everything not reserved to Westminster" },
      { label: "Welsh Assembly, 60 members", detail: "fewer legislative powers than Scotland, but considerable control over public services" },
      { label: "Northern Ireland Assembly, 90 MLAs", detail: "elected in 1999 as well, but suspended more than once since" },
      { label: "Reserved to Westminster", detail: "defence, foreign affairs, immigration, taxation and social security never devolved at all" },
    ],
  },
  f353: {
    lead: "There are 129 members of the Scottish Parliament, or MSPs, elected by a form of proportional representation.",
    versus: "Scotland's is the largest of the three devolved bodies and the one with the widest powers — it can pass laws on anything not specifically reserved to the UK Parliament. Wales began with the smallest body and the fewest legislative powers.",
    why: "So the three sizes run in the same order as the powers: Scotland largest, Northern Ireland next, Wales smallest.",
  },
  f354: {
    lead: "The Welsh body began with 60 members.",
    versus: "It is the smallest of the three devolved bodies, and the handbook says Wales was given fewer legislative powers than Scotland, though considerable control over public services. Scotland's parliament is the largest of the three.",
    why: "Its members are elected every four years, by the same form of proportional representation used in Scotland and Northern Ireland.",
    note: "The handbook calls it the National Assembly for Wales, or the Welsh Assembly, and its members Assembly Members (AMs). It is now the Welsh Parliament.",
  },
  f355: {
    lead: "The Northern Ireland Assembly has 90 elected members, known as MLAs.",
    versus: "MLA stands for member of the Legislative Assembly — Northern Ireland's own title. Scotland has MSPs and Wales has Assembly Members, so the initials tell you which body is being asked about.",
    why: "Ministerial offices are shared out among the main parties under a power-sharing agreement, and MLAs are elected by a form of proportional representation.",
  },
  f356: {
    lead: "The Good Friday Agreement, signed in 1998, paved the way for the Northern Ireland Assembly.",
    versus: "The agreement is 1998; the Assembly it led to was elected in 1999. If the question names the agreement, it is 1998.",
    why: "The handbook uses both names for it — the Belfast Agreement or the Good Friday Agreement — and it set up the power-sharing arrangement that distributes ministerial offices among the main parties.",
  },
  f357: {
    lead: "Defence is reserved to the UK Parliament and is not devolved.",
    versus: "The reserved list is the country as a whole: defence, foreign affairs, immigration, taxation and social security. Everything on the other side is a public service delivered inside one part of the UK — education is the handbook's own example of a devolved one.",
    why: "So the test is whether the subject faces outward from the UK or is a service delivered within it.",
  },
  f358: {
    lead: "Members of the devolved legislatures are elected by a form of proportional representation.",
    versus: "The House of Commons uses first past the post, where the candidate with the most votes in a constituency wins. Proportional representation allocates seats to each party in proportion to the votes it won. Devolved body means proportional; Commons means first past the post.",
    why: "All three devolved bodies use it — Scotland, Wales and Northern Ireland — so one rule covers every one of them.",
  },
  f359: {
    lead: "The official published report of debates in Parliament is called Hansard.",
    why: "Proceedings are broadcast on television as well as published in Hansard, and the written reports can be found in large libraries and on the Parliament website.",
  },
  f360: {
    lead: "You must be at least 18 to vote in a UK general election.",
    versus: "18 is also the minimum age to stand for election as an MP, so both sides of an election carry the same age bar.",
    why: "The voting age of 18 was set in 1969. Before that it was 21.",
  },
  f361: {
    lead: "The list of everyone entitled to vote is the electoral register.",
    versus: "Being entitled to vote is not enough on its own — you cannot vote in a parliamentary or local election unless your name is actually on the register, and you put it there through your local council's electoral registration office.",
    why: "The same register is used to pick juries: people on it are selected at random for jury service.",
  },
  f362: {
    lead: "British, Irish and qualifying Commonwealth citizens resident in the UK may vote in every type of UK election.",
    versus: "Citizens of other EU states resident in the UK may vote in all elections except General Elections. That single exception is the whole distinction; residence in the UK is required either way.",
    why: "The handbook's own wording is adult citizens of the UK, and citizens of the Commonwealth and the Irish Republic who are resident in the UK.",
  },
  f363: {
    lead: "MPs are elected to the House of Commons by first past the post.",
    versus: "The devolved legislatures use a form of proportional representation instead. Commons means first past the post; Scottish Parliament, Welsh Assembly or Northern Ireland Assembly means proportional.",
    why: "First past the post means the candidate with the most votes in a constituency wins, with no majority required. The government is usually formed by the party that wins the most constituencies; if no party wins a majority, two parties may join to form a coalition.",
  },
  f364: {
    lead: "When a Commons seat falls vacant mid-term, a by-election is held in that constituency.",
    versus: "A by-election fills one seat in one constituency. A General Election fills every seat and is held at least every five years. If an MP dies or resigns, it is a by-election.",
    why: "Only that one constituency votes — everywhere else keeps the MP it has already elected.",
  },
  f365: {
    lead: "On election day the polling station is open from 7am until 10pm.",
    why: "Fifteen hours, spanning both ends of a working day — early enough to vote before it and late enough to vote after it.",
  },
  f366: {
    lead: "You must be at least 18 to stand for election as an MP.",
    versus: "The same 18 as the voting age, so one number covers both voting and standing.",
    why: "The handbook adds that anyone aged 18 or over can stand, but is unlikely to win without the nomination of one of the major political parties.",
  },
  f367: {
    lead: "Serving police officers may not stand for election as an MP.",
    versus: "Most citizens aged 18 or over can stand for public office. The bar falls on jobs that require political neutrality and on people disqualified by a conviction — ordinary occupations are not affected.",
    why: "The handbook's own list of exceptions is members of the armed forces, civil servants, and people found guilty of certain criminal offences.",
    note: "The police are not among the exceptions the handbook lists.",
  },
  f368: {
    lead: "The Commonwealth has 56 member states.",
    why: "Most were once part of the British Empire, though a few countries that were not have joined as well. Membership is voluntary, and the Commonwealth has no power over its members beyond suspending them.",
    note: "The handbook is inconsistent here: its prose gives a lower figure than its own list of member states. The deck follows the list.",
  },
  f369: {
    lead: "The monarch is the head of the Commonwealth.",
    versus: "The role is ceremonial and separate from being head of state. The monarch is head of state of the UK; head of the Commonwealth is a different position, over an association that has no power over its members.",
    why: "The Commonwealth is held together by shared values rather than authority — democracy, good government and the rule of law.",
  },
  f370: {
    lead: "The UN Security Council has five permanent members, and the UK is one of them.",
    versus: "Fifteen is the whole membership of the Security Council; five is the permanent part of it. If the question says permanent, the answer is five.",
    why: "The nesting is what makes the figures stick: more than 190 countries in the UN, 15 of them on the Security Council, 5 of those permanent.",
  },
  f371: {
    lead: "NATO is a group of European and North American countries that have agreed to help each other if they come under attack.",
    versus: "Mutual defence is the whole of it. NATO is not a trade body, an aid body or a human rights body — human rights in Europe belong to the Council of Europe.",
    why: "It also aims to maintain peace between its own members, not only to defend them against an outside attack.",
  },
  f372: {
    lead: "The Council of Europe has 47 member countries, including the UK.",
    versus: "It is separate from the EU and always has been. The Council of Europe has no power to make laws — it draws up conventions and charters. The EU makes law, and has 27 member states.",
    why: "47 against 27 is the quickest way to keep the two apart: the Council of Europe is much the larger body and covers far more of Europe than the EU does.",
    note: "The handbook says 47. The Council of Europe has fewer members today, but the handbook's figure is the one the exam marks against.",
  },
  f373: {
    lead: "The Council of Europe is responsible for the European Convention on Human Rights.",
    versus: "The Convention belongs to the Council of Europe, not to the EU. If a question attaches human rights to the European Union, that is the wrong body.",
    why: "The Human Rights Act 1998 brought the Convention into UK law, which is why UK courts apply it — the government, public bodies and the courts must all follow its principles.",
  },
  f374: {
    lead: "Civil law deals with disputes between individuals or groups, such as debt.",
    versus: "Criminal law relates to crimes, which are investigated by the police or another authority such as a council and punished by the courts. Civil law settles a dispute; criminal law punishes an offence. Nobody is prosecuted in a civil case.",
    why: "The handbook's civil examples are housing, consumer rights, employment and debt — all disagreements about money, work or property between two parties.",
  },
  f375: {
    lead: "PCC stands for Police and Crime Commissioner, in England and Wales.",
    why: "PCCs are directly elected. They set local police priorities and the local policing budget, and they appoint the Chief Constable.",
  },
  f376: {
    lead: "The first Police and Crime Commissioners were elected in November 2012.",
    versus: "November, not May. Ordinary local council elections are held in May every year, which is what makes this one easy to misdate.",
    why: "The public elects the commissioner, and the commissioner appoints the Chief Constable — an elected office placed over a police force that is otherwise independent of government.",
  },
  f377: {
    lead: "Most minor criminal cases in England, Wales and Northern Ireland are dealt with in a magistrates' court.",
    versus: "Minor means the magistrates' court; serious means the Crown Court, with a judge and a jury. In Scotland the same split runs between the Justice of the Peace Court and the Sheriff Court.",
    why: "So two things decide the court: how serious the offence is, and whether you are in Scotland — which has its own name for each level.",
    cluster: [
      { label: "Magistrates' Court", detail: "minor criminal cases in England, Wales and Northern Ireland" },
      { label: "Justice of the Peace Court", detail: "the Scottish equivalent, taking minor criminal offences" },
      { label: "Crown Court", detail: "serious offences in England, Wales and NI, before a judge and a jury" },
      { label: "Sheriff Court", detail: "serious cases in Scotland, before a sheriff, with or without a jury" },
      { label: "Youth Court", detail: "defendants aged 10 to 17 in England, Wales and NI; the public may not attend" },
    ],
  },
  f378: {
    lead: "In Scotland, minor criminal offences go to a Justice of the Peace Court.",
    versus: "It is the Scottish equivalent of the magistrates' court, so it takes the minor cases. Scotland's serious cases go to the Sheriff Court instead.",
    why: "Magistrates and Justices of the Peace are the same kind of person under two names: members of the local community, usually unpaid, and not required to hold legal qualifications.",
  },
  f379: {
    lead: "A case is normally heard by three magistrates sitting together.",
    why: "They are members of the local community without legal qualifications, so they sit as a bench and are supported by a legal adviser rather than deciding alone.",
    note: "The handbook gives the number three only for Youth Courts, where up to three specially trained magistrates hear the case. It states no number for an ordinary hearing.",
  },
  f380: {
    lead: "Magistrates and Justices of the Peace usually work unpaid, and do not need legal qualifications.",
    versus: "That covers England, Wales and Scotland. Northern Ireland is the exception: cases there are heard by a District Judge or Deputy District Judge, who is legally qualified and paid.",
    why: "They are members of the local community who receive training and are supported by a legal adviser, and they decide both the verdict and, where there is a conviction, the sentence.",
  },
  f381: {
    lead: "Serious criminal offences in England, Wales and Northern Ireland are tried in the Crown Court, before a judge and a jury.",
    versus: "Serious means the Crown Court; minor means the magistrates' court. In Scotland the equivalent is the Sheriff Court, and the very gravest Scottish cases, such as murder, go to a High Court.",
    why: "The jury decides guilty or not guilty on the evidence it has heard; the judge decides the penalty if there is a conviction.",
  },
  f382: {
    lead: "A jury in England, Wales and Northern Ireland has 12 members.",
    versus: "Scotland is the exception, with 15. The border is what to hold rather than the two numbers on their own: England, Wales and Northern Ireland go together, and Scotland stands apart.",
    why: "Jurors are chosen at random from the local electoral register, and anyone on it aged 18 to 70 can be called.",
  },
  f383: {
    lead: "A jury in Scotland has 15 members.",
    versus: "Scotland has 15; England, Wales and Northern Ireland have 12. Scotland is the odd one out in almost every court question, because it has its own legal system throughout.",
    why: "Jurors are chosen at random from the local electoral register, the same way in both systems — only the number differs.",
  },
  f384: {
    lead: "In Scotland, serious cases are heard in a Sheriff Court, before a sheriff or a sheriff with a jury.",
    versus: "The Sheriff Court is Scotland's equivalent of the Crown Court. Minor Scottish cases go to the Justice of the Peace Court, and the most serious, such as murder, go to a High Court.",
    why: "A sheriff here is the judge, not a police officer, and can sit either alone or with a jury.",
  },
  f385: {
    lead: "County Courts deal with civil disputes in England, Wales and Northern Ireland — money owed, personal injury, family matters, breaches of contract and divorce.",
    versus: "Civil disputes go to a County Court; criminal charges go to a magistrates’ court or the Crown Court. Ask whether someone is being sued or being prosecuted.",
    cluster: [
      { label: "Sheriff Court, Scotland", detail: "takes most of the disputes a County Court would hear; Scotland has no County Courts" },
      { label: "The small claims procedure", detail: "the County Court’s informal route for minor disputes, run without a lawyer" },
    ],
  },
  f386: {
    lead: "The small claims procedure in England and Wales is used for claims of less than £10,000.",
    versus: "Scotland and Northern Ireland cap the same procedure at £5,000, exactly half. England and Wales is the larger of the two figures.",
    why: "The procedure is informal by design: a hearing before a judge in an ordinary room, both sides sitting round a table, so a minor dispute need not cost time and money on a lawyer.",
  },
  f387: {
    lead: "In Scotland and Northern Ireland the small claims procedure is used for claims of less than £5,000.",
    versus: "England and Wales allow twice as much, £10,000. Scotland and Northern Ireland share the lower figure.",
    why: "Northern Ireland sits with Scotland here, which is unusual — on magistrates’ courts, Crown Courts and Youth Courts it sits with England and Wales.",
  },
  f388: {
    lead: "In England, Wales and Northern Ireland a defendant aged 10 to 17 is normally tried in a Youth Court.",
    versus: "The range stops at 17, not 18, and starts at 10, not 12. An 18-year-old is outside the Youth Court entirely.",
    why: "It is the magistrates’ bench in a different setting — up to three specially trained magistrates, or a District Judge — rather than a separate kind of trial.",
    cluster: [
      { label: "The most serious cases", detail: "go to the Crown Court even for a 10- to 17-year-old" },
      { label: "Members of the public", detail: "are not admitted, and the young person cannot be named or photographed in the media" },
    ],
  },
  f389: {
    lead: "Members of the public are not allowed in Youth Courts.",
    versus: "Serious adult cases are heard in open court before a jury. The Youth Court is the closed exception, and the closure is not at the judge’s discretion.",
    why: "The same protection covers the press: the name or photographs of the accused young person cannot be published in newspapers or used by the media.",
  },
  f390: {
    lead: "The Equality Act 2010 brought UK discrimination law together into a single statute.",
    versus: "The Human Rights Act 1998 is the other statute in this part of the book, and it does a different job: it brought the European Convention on Human Rights into UK law.",
    why: "It is the legal form of one of the freedoms the UK offers in return — freedom from unfair discrimination.",
    note: "The handbook does not name the Equality Act. It says only that UK laws protect people from unfair treatment because of age, disability, sex, pregnancy and maternity, race, religion or belief, sexuality or marital status.",
  },
  f391: {
    lead: "Female genital mutilation has been illegal in the UK since 1985.",
    versus: "This is the ban on the practice itself, carried out here. Taking a girl or woman abroad for FGM is a second, separate offence with a later date.",
    note: "The handbook says FGM is illegal in the UK and that practising it or taking a girl or woman abroad for it is a criminal offence. It gives no year for either.",
  },
  f392: {
    lead: "Taking a girl or woman abroad from the UK for female genital mutilation has been a criminal offence since 2003.",
    versus: "The earlier date is the ban on the practice inside the UK. This is the separate offence that follows the girl out of the country, so it is the later of the two.",
    note: "The handbook names both offences — practising FGM, and taking a girl or woman abroad for it — but gives no year for either.",
  },
  f393: {
    lead: "Forced Marriage Protection Orders were introduced in 2008 for England, Wales and Northern Ireland.",
    versus: "2007 is the Act that created them, the Forced Marriage (Civil Protection) Act. 2008 is when the orders themselves became available, and that is what the question asks for.",
    why: "An order can be obtained either to stop a person being forced into a marriage or to protect someone already in one, and breaching it carries up to two years in prison for contempt of court.",
  },
  f394: {
    lead: "Similar Forced Marriage Protection Orders were introduced in Scotland in November 2011.",
    versus: "2008 covers England, Wales and Northern Ireland. Scotland is the later date and the only part of the UK with a year of its own here.",
    why: "The orders do the same job in both places: they can be obtained to stop a marriage being forced, or to protect a person already in a forced marriage.",
  },
  f395: {
    lead: "HM Revenue & Customs (HMRC) is the government department that collects taxes.",
    versus: "The Department for Work and Pensions is the other department in this section, and it collects nothing: it is the one you telephone to arrange a National Insurance number.",
    why: "HMRC receives income tax taken at source from employees through Pay As You Earn, and the self-assessment returns of people who are self-employed.",
  },
  f396: {
    lead: "Self-employed people pay their own tax through self-assessment, which includes completing a tax return.",
    versus: "Employees are on Pay As You Earn: the employer takes the right amount of income tax out of their pay and sends it to HMRC, so there is nothing for them to declare.",
    why: "The same logic applies to National Insurance: an employee has it deducted by the employer, while self-employed people pay their Contributions themselves.",
    note: "The handbook adds that other people may also be sent a tax return, so the self-employed are the usual case rather than the only one.",
  },
  f397: {
    lead: "A self-assessment tax return filed online must reach HMRC by 31 January.",
    why: "Self-assessment is the system used by people who are self-employed, and completing a tax return is the part of it that carries a date.",
    note: "The handbook explains self-assessment but gives no filing deadline of its own.",
  },
  f398: {
    lead: "All young people in the UK are sent a National Insurance number just before their 16th birthday.",
    versus: "It is not evidence of status. A National Insurance number does not on its own prove to an employer that you have the right to work in the UK.",
    why: "It is a unique personal account number, there to make sure the National Insurance Contributions and tax you pay are recorded against your name — so it has to exist before the first wages do.",
  },
  f399: {
    lead: "You must be at least 17 years old to drive a car or a motor cycle in the UK.",
    versus: "16 is the moped age. A motor cycle goes with the car at 17, not with the moped at 16 — that is the swap the question tests.",
    why: "Age alone is not enough: you also need a provisional licence, then a theory test (multiple choice plus hazard perception) and a practical driving test.",
  },
  f400: {
    lead: "You need to be at least 16 years old to ride a moped in the UK.",
    versus: "17 covers both a car and a motor cycle. The moped is the only vehicle here with a lower age.",
    why: "17 is not the top of the scale either — large vehicles carry other age requirements and special tests of their own.",
  },
  f401: {
    lead: "Drivers can use their driving licence until they are 70 years old.",
    why: "The rule has two halves and 70 is the join: one licence up to 70, then a renewal every three years after it.",
  },
  f402: {
    lead: "After the age of 70 a driving licence is valid for three years at a time.",
    versus: "70 is the age at which the short renewals begin; three years is how long each one then lasts. The two numbers answer different halves of the same rule.",
    why: "A licence renewed at 70 runs to 73, then 76, then 79 — the interval never lengthens again.",
  },
  f403: {
    lead: "A car more than three years old must be taken for an MOT test every year.",
    versus: "This is the car’s age, not the driver’s. The other numbers nearby — 16, 17 and 70 — are all ages of people.",
    why: "It is one of three things a resident’s vehicle must have, alongside annual road tax with the disc displayed and valid motor insurance; driving without insurance is a serious criminal offence.",
  },
  f404: {
    lead: "In Northern Ireland a car must have its first MOT test at four years old.",
    versus: "The rest of the UK starts the annual test once the car is more than three years old. Northern Ireland is the one that waits a year longer.",
    note: "The handbook gives only the three-year rule and does not mention a separate age for Northern Ireland.",
  },
  f405: {
    lead: "A licence issued abroad may be used in the UK for up to 12 months, after which you must get a full UK licence.",
    versus: "There are two rules, not one. A licence from the EU, Iceland, Liechtenstein or Norway can be used for as long as the licence itself stays valid; 12 months is the limit for everywhere else.",
  },
  f406: {
    lead: "Anyone on the electoral register aged 18 to 70 can be asked to do jury service.",
    versus: "The lower bound is the voting age, 18, because the pool is the electoral register — being able to vote and being liable for jury service are the same qualification.",
    why: "Everyone summoned must do it unless they are not eligible, for example because of a criminal conviction, or give a good reason to be excused, such as ill health.",
  },
  f407: {
    lead: "People are randomly selected for jury service from the electoral register.",
    why: "The register does two jobs from one entry: it gives you the right to vote and it puts you in the pool for a jury, so registering matters even to someone who never intends to vote.",
  },
  f408: {
    lead: "School governors must be aged 18 or over at the date of their election or appointment.",
    versus: "There is no upper age limit at all, so 18 is the only bound. Jury service is the one with a ceiling, at 70.",
    why: "Governors are people from the local community who want to contribute to children’s education; in Scotland the same people are members of the school board.",
  },
  f409: {
    lead: "Volunteering is working for good causes without payment.",
    versus: "Payment is what separates it from a job. Jury service is not volunteering either — that is a duty you are summoned to, not something you offer.",
    why: "It is the everyday form of the fifth fundamental principle of British life, participation in community life.",
  },
  f410: {
    lead: "The European Economic Community was set up by six western European countries who signed the Treaty of Rome on 25 March 1957.",
    versus: "The EEC is the EU’s original name, not a different organisation — the treaty that founded one founded the other.",
    why: "1957 anchors the whole European sequence: the six signed without the UK, which decided against joining, became a member in 1973 and left in 2020.",
  },
  f411: {
    lead: "Six western European countries originally set up the European Economic Community: Belgium, France, Germany, Italy, Luxembourg and the Netherlands.",
    versus: "The UK was not one of them. It originally decided not to join this group and became a member in 1973, so it is the standard wrong answer in founding-member questions.",
    why: "Six is the founding count and 27 is the count now, with the UK in between: joined 1973, left 2020.",
  },
  f412: {
    lead: "The UK left the EU at 23:00 GMT on 31 January 2020.",
    versus: "The Brexit vote came first and the departure followed it. The handbook gives a clock time and a date only for the departure.",
    why: "1973 and 2020 are the two ends of the UK’s membership: it did not join at the founding in 1957, became a member in 1973, and left on this date.",
  },
  f413: {
    lead: "There are now 27 EU member states.",
    versus: "The Council of Europe is a separate body with 47 member countries and no power to make laws. 27 is the EU; 47 is the Council of Europe.",
    why: "27 is the count after the UK left, and the handbook lists all 27 by name.",
  },
  f414: {
    lead: "European laws are called directives, regulations or framework decisions.",
    versus: "Acts of Parliament are the UK’s own laws, made in the monarch’s name. These three are the EU’s forms, not Westminster’s.",
    why: "The handbook adds that with effect from 2024 no general principle of EU law is part of UK law, so this is vocabulary about how the EU legislates rather than about what binds the UK now.",
  },
  f415: {
    lead: "There are 15 members on the UN Security Council.",
    versus: "Five of those 15 are permanent members, and the UK is one of them. 15 is the whole council; 5 is the permanent core inside it.",
    why: "The Security Council is the part of the UN that recommends action when there are international crises and threats to peace.",
  },
  f416: {
    lead: "The United Nations has more than 190 countries as members.",
    versus: "The Security Council is the small body inside it, with 15 members. More than 190 is the whole organisation.",
    why: "That is close to every country there is, which follows from what it was for: set up after the Second World War to prevent war and promote international peace and security.",
  },
  f417: {
    lead: "The monarch is the head of state of the UK.",
    versus: "The Prime Minister leads the government. The monarch does not rule, but appoints the government the people have already chosen at an election.",
    why: "That split is what a constitutional monarchy is, and it is why the monarch can also be head of state for many Commonwealth countries without governing any of them.",
  },
  f418: {
    lead: "The monarch invites the leader of the party with the largest number of MPs to become Prime Minister.",
    versus: "Where no single party has a majority, the invitation goes instead to the leader of a coalition of more than one party. Largest party first; coalition only when no one has enough.",
    why: "Nobody votes for a Prime Minister directly: voters in each constituency elect an MP, and the party with the majority of MPs forms the government.",
  },
  f419: {
    lead: "In regular meetings with the Prime Minister the monarch can advise, warn and encourage.",
    versus: "All three verbs stop short of deciding. Decisions on government policies are made by the Prime Minister and cabinet, so any verb that would let the monarch overrule them is not on the list.",
    why: "It is the same limit as the rest of the role: the monarch appoints the government but does not rule the country.",
  },
  f420: {
    lead: "At the opening of the new parliamentary session each year the monarch makes a speech summarising the government’s policies for the year ahead.",
    versus: "The policies in the speech are the government’s, not the monarch’s. The monarch reads them out; the Prime Minister and cabinet decided them.",
    why: "It pairs with the other formality of the same kind: all Acts of Parliament are made in the monarch’s name, while Parliament decides what they say.",
  },
  f421: {
    lead: "Queen Elizabeth II came to the throne in 1952, on the death of her father.",
    versus: "The handbook dates the reign from her father’s death, not from a coronation ceremony — so the year asked for is the year she succeeded him.",
    why: "In 2012 she celebrated her Diamond Jubilee, sixty years as queen. Counting sixty years back from 2012 lands on 1952.",
  },
  f422: {
    lead: "King Charles III became the reigning monarch in 2022, on the death of his mother, Queen Elizabeth II.",
    versus: "Charles is the monarch; his elder son William is the heir apparent. Prince of Wales is the title that goes with being the heir, not with being king.",
    why: "The handbook sets out the order after him: William, Prince of Wales, then William’s three children in order of birth — George, Charlotte and Louis.",
  },
  f423: {
    lead: "The monarch receives foreign ambassadors and high commissioners, entertains visiting heads of state, and makes state visits overseas.",
    versus: "This is representing the UK, not governing it. The visits support diplomatic and economic relationships; decisions on government policy are made by the Prime Minister and cabinet.",
    why: "The handbook pairs the role with stability and continuity: governments and Prime Ministers change regularly, and the monarch continues as head of state.",
    cluster: [
      { label: "Head of state", detail: "the constitutional role — the monarch does not rule, but appoints the government the people have chosen in an election" },
      { label: "Appointing the Prime Minister", detail: "invites the leader of the party with the largest number of MPs, or the leader of a coalition" },
      { label: "Opening Parliament", detail: "the ceremonial role — a speech each year summarising the government’s policies for the year ahead" },
    ],
  },
  f424: {
    lead: "Civil servants are accountable to ministers.",
    versus: "Accountable to ministers, but not chosen by them: civil servants are appointed on merit through an application process and are not political appointees.",
    why: "Their job is to support the government in developing and implementing its policies and to deliver public services, so they answer to the ministers who set those policies.",
  },
  f425: {
    lead: "The core values of the civil service are integrity, honesty, objectivity and impartiality.",
    versus: "Impartiality is the value that carries political neutrality inside it. Loyalty — to a party, a minister or the government of the day — is not one of the four.",
    why: "Two of the four are about telling the truth, integrity and honesty; two are about taking no side, objectivity and impartiality.",
  },
  f426: {
    lead: "Towns, cities and rural areas in the UK are governed by democratically elected councils, often called local authorities.",
    versus: "Council and local authority are two names for the same body, and the handbook uses both — so neither is more correct than the other.",
    why: "Some areas have both district and county councils, which have different functions, but most large towns and cities have a single local authority.",
    cluster: [
      { label: "London", detail: "33 local authorities, with the Greater London Authority and the Mayor of London coordinating policies across the capital" },
      { label: "Elections", detail: "for most local authorities, councillors are elected in May every year" },
      { label: "Mayors", detail: "usually appointed by the council as its ceremonial leader; in some towns elected instead, as effective leader of the administration" },
      { label: "Funding", detail: "money from central government and local taxes, for the range of services they provide" },
    ],
  },
  f427: {
    lead: "For most local authorities, local elections for councillors are held in May every year.",
    versus: "Local elections come round on a yearly cycle; a general election only has to be held at least every five years. Fixed month against maximum interval.",
  },
  f428: {
    lead: "London has 33 local authorities.",
    versus: "33 is London’s figure alone. Everywhere else, most large towns and cities have a single local authority.",
    why: "London is the only place the handbook gives a tier above the councils: the Greater London Authority and the Mayor of London coordinate policies across the capital.",
  },
  f429: {
    lead: "A mayor appointed by a local authority is the ceremonial leader of the council.",
    versus: "Appointed means ceremonial; elected means in charge. In some towns a mayor is elected to be the effective leader of the administration.",
  },
  f430: {
    lead: "Criminal law relates to crimes, which are usually investigated by the police or another authority such as a council, and which are punished by the courts.",
    versus: "Criminal law punishes; civil law settles. If someone is being punished, it is criminal. If two sides are in dispute with each other, it is civil.",
    why: "The part that gets missed is that investigation is not only the police — the handbook adds another authority such as a council.",
  },
  f431: {
    lead: "Civil law is used to settle disputes between individuals or groups.",
    versus: "Civil law settles disputes; criminal law punishes crimes. Nobody is prosecuted or sentenced under civil law.",
    why: "The handbook’s four examples are all arguments about money or obligation: housing, consumer rights, employment and debt.",
    cluster: [
      { label: "County Courts", detail: "a wide range of civil disputes — money owed, personal injury, family matters, breach of contract, divorce" },
      { label: "The Sheriff Court", detail: "where most of those same civil matters are dealt with in Scotland" },
      { label: "Small claims", detail: "the informal procedure for minor disputes: under £10,000 in England and Wales, £5,000 in Scotland and Northern Ireland" },
    ],
  },
  f432: {
    lead: "The Industrial Revolution was the rapid development of industry in Britain in the 18th and 19th centuries.",
    versus: "The Enlightenment is the 18th century on its own; the Industrial Revolution runs across the 18th and the 19th. The two overlap but do not cover the same span.",
    why: "It begins in the 18th century because that is the boundary the handbook draws: before the 18th century, agriculture was the biggest source of employment.",
    cluster: [
      { label: "Before it", detail: "agriculture was the biggest source of employment, with cottage industries making cloth and lace at home" },
      { label: "What made it possible", detail: "the development of machinery and the use of steam power, which mechanised farming and manufacturing alike" },
      { label: "What it ran on", detail: "coal and other raw materials to power the new factories, so people moved from the countryside into mining and manufacturing" },
      { label: "The Bessemer process", detail: "mass production of steel, which led on to shipbuilding and the railways" },
      { label: "Canals", detail: "built to link factories to towns, cities and ports, particularly in the new industrial areas of the middle and north of England" },
    ],
  },
  f433: {
    lead: "Before the 18th century, agriculture was the biggest source of employment in Britain.",
    versus: "Agriculture is the answer for before; manufacturing jobs became the main source of employment after industrialisation. The century in the question decides which.",
    why: "Alongside the farming there were many cottage industries, where people worked from home to produce goods such as cloth and lace.",
  },
  f434: {
    lead: "The Industrial Revolution happened because of the development of machinery and the use of steam power.",
    versus: "Machinery and steam are what made it possible; coal and other raw materials are what powered the new factories. The handbook asks for the two separately.",
    why: "Both agriculture and the manufacturing of goods became mechanised, which made things more efficient and increased production.",
  },
  f435: {
    lead: "The Bessemer process allowed the mass production of steel.",
    versus: "Bessemer is steel, James Watt is steam power, and Richard Arkwright is textiles and the well-run factory. Each name goes with one thing only.",
    why: "Steel in quantity is why it earns a line at all: it led to the development of the shipbuilding industry and the railways.",
  },
  f436: {
    lead: "Canals were built to transport raw materials and manufactured goods between factories and towns.",
    versus: "Canals are the transport link the handbook attaches to the Industrial Revolution itself. The major expansion of the railways comes later, in the Victorian period.",
    why: "They linked the factories to towns and cities and to the ports, particularly in the new industrial areas in the middle and north of England.",
  },
  f437: {
    lead: "Richard Arkwright improved the original carding machine, and is particularly remembered for the efficient and profitable way that he ran his factories.",
    versus: "He is remembered for the factory rather than for an invention: the carding machine is one he improved, and the running of the mills is what made his name.",
    why: "Carding is the process of preparing fibres for spinning into yarn and fabric — the textile trade he moved into when the wigs he had made as a barber became less popular.",
  },
  f438: {
    lead: "Adam Smith developed ideas about economics which are still referred to today.",
    versus: "Adam Smith is the economist; Robert Adam is the Scottish architect. Adam is Smith’s first name and the architect’s surname, which is the whole of the trap.",
    cluster: [
      { label: "Adam Smith", detail: "economics — ideas still referred to today" },
      { label: "David Hume", detail: "human nature — his ideas continue to influence philosophers" },
      { label: "James Watt", detail: "steam power — the scientific work that helped the progress of the Industrial Revolution" },
      { label: "The principle behind them", detail: "everyone should have the right to their own political and religious beliefs, and the state should not try to dictate to them" },
    ],
  },
  f439: {
    lead: "Inigo Jones designed the Queen’s House at Greenwich and the Banqueting House in Whitehall, in the 17th century.",
    versus: "Jones and Sir Christopher Wren share the 17th century and get swapped. Jones took his inspiration from classical architecture; Wren developed a British version of the ornate styles popular in Europe, as at the new St Paul’s Cathedral.",
    why: "The handbook puts Jones first in the century and Wren later in it, so classical comes before ornate.",
  },
  f440: {
    lead: "Robert Adam was the Scottish architect who influenced the development of architecture in the UK, Europe and America in the 18th century.",
    versus: "Adam belongs to the 18th century and to simpler designs; Inigo Jones to the 17th and to classical inspiration. Simpler is the word that marks the later man.",
    cluster: [
      { label: "Dumfries House, Scotland", detail: "one of the great houses where he designed the inside decoration as well as the building itself" },
      { label: "The Royal Crescent, Bath", detail: "built by architects his ideas influenced, rather than by him — the reach beyond his own commissions" },
    ],
  },
  f441: {
    lead: "In the 19th century the medieval gothic style became popular again.",
    versus: "These are 19th-century buildings in a medieval style, not medieval buildings. The style is revived; the stone is Victorian.",
    cluster: [
      { label: "The Middle Ages", detail: "the original: great cathedrals at Durham, Lincoln, Canterbury and Salisbury, and the White Tower as a Norman keep" },
      { label: "The 17th century", detail: "Inigo Jones takes from classical architecture; Sir Christopher Wren later builds the new St Paul’s Cathedral" },
      { label: "The 18th century", detail: "simpler designs, with the Scottish architect Robert Adam influential in the UK, Europe and America" },
      { label: "The 19th century", detail: "gothic again, for the public buildings of expanding cities — the Houses of Parliament, St Pancras Station, and town halls in cities such as Manchester and Sheffield" },
    ],
  },
  f442: {
    lead: "Durham, Lincoln, Canterbury and Salisbury are the cathedrals the handbook names as examples of great medieval church building.",
    versus: "The cathedrals are the churches of the Middle Ages; the White Tower in the Tower of London is the castle of the same period, a Norman keep built on the orders of William the Conqueror.",
  },
  f443: {
    lead: "Films were first shown publicly in the UK in 1896, and screenings very quickly became popular.",
    why: "From the beginning, film makers here became famous for clever special effects, and the handbook says this continues to be an area of British expertise — which is why animation turns up again later in the same section.",
  },
  f444: {
    lead: "Sir Charles (Charlie) Chaplin became famous in silent films for his tramp character.",
    versus: "Chaplin is the actor who made a career in Hollywood; Sir Alfred Hitchcock is the director who left for it. Both crossed the Atlantic, one in front of the camera and one behind it.",
    why: "He is the handbook’s example of a pattern rather than a one-off: from the early days of the cinema, British actors have worked in both the UK and the USA.",
  },
  f445: {
    lead: "Nick Park has won four Oscars for his animated films.",
    why: "Three of the four are for films featuring Wallace and Gromit, so the pair accounts for all but one — which is where three and four get swapped.",
  },
  f446: {
    lead: "Ealing Studios has a claim to being the oldest continuously working film studio facility in the world.",
    why: "The word carrying the claim is continuously: the boast is about never having stopped, not about having been first, and the handbook words it as a claim rather than a fact.",
  },
  f447: {
    lead: "The annual British Academy Film Awards, hosted by BAFTA, are the British equivalent of the Oscars.",
    why: "BAFTA stands for the British Academy of Film and Television Arts, so the body covers television as well — which is why the acronym carries a word the film awards do not.",
    cluster: [
      { label: "The British Academy Film Awards", detail: "film — the British equivalent of the Oscars" },
      { label: "The Laurence Olivier Awards", detail: "theatre — held annually at venues in London, named after the actor" },
      { label: "The Mercury Music Prize", detail: "music — the best album from the UK and Ireland, awarded each September" },
      { label: "The Brit Awards", detail: "music as well, but by category: best British group, best British solo artist" },
      { label: "The Man Booker Prize for Fiction", detail: "books — the best fiction novel by an author from the Commonwealth, Ireland or Zimbabwe" },
    ],
  },
  f448: {
    lead: "The two highest-grossing film franchises of all time, Harry Potter and James Bond, were both produced in the UK.",
    why: "The handbook uses them to make a point about where films are made rather than who owns them: many of the films now produced in the UK are made by foreign companies, using British expertise.",
    note: "The handbook states this ranking as of its own edition. The examinable answer is the book’s, whatever the box office has done since.",
  },
  f449: {
    lead: "Sir David Lean directed both Brief Encounter, in 1945, and Lawrence of Arabia, in 1962.",
    versus: "Lean is named with Ridley Scott as a director who found great success both in the UK and internationally. Sir Alfred Hitchcock belongs earlier, to the British studios of the 1930s, and then to Hollywood.",
    why: "Both films sit on the handbook’s list of famous British films, and Lean is the only director on that list with two entries.",
  },
  f450: {
    lead: "Music hall was a form of variety theatre, and comedians were a popular feature of it.",
    versus: "The handbook’s phrase is a form of variety theatre — theatre rather than concert or opera, and variety rather than a single play.",
    why: "It was very common until television became the leading form of entertainment in the UK, and some who had performed in the music halls in the 1940s and 1950s, such as Morecambe and Wise, became stars of television instead.",
  },
  f451: {
    lead: "Spitting Image was the satirical television programme of the 1980s and 1990s.",
    versus: "That Was The Week That Was is the 1960s satire; Spitting Image is the 1980s and 1990s one. The decade in the question settles it on its own.",
    why: "Monty Python’s Flying Circus, in 1969, falls between the two and is not satire — the handbook calls it a new type of progressive comedy.",
  },
  f452: {
    lead: "Medieval kings and rich nobles had jesters, who told jokes and made fun of people in the Court.",
    why: "The handbook puts them first in an unbroken line, to argue that comedy, satire and the ability to laugh at ourselves are an important part of the UK character.",
    cluster: [
      { label: "Jesters", detail: "at the courts of medieval kings and rich nobles — the earliest point in the line" },
      { label: "Shakespeare’s comic characters", detail: "later, the comedy moves inside the plays" },
      { label: "Political cartoons, 18th century", detail: "attacking prominent politicians, and sometimes the monarch or other members of the Royal Family" },
      { label: "Satirical magazines, 19th century", detail: "Punch, first published in the 1840s, was the most famous of them" },
      { label: "Music hall, then television", detail: "comedians were a feature of the halls until television became the leading form of entertainment" },
    ],
  },
  f453: {
    lead: "An allotment is a piece of land people rent in order to grow fruit and vegetables.",
    versus: "An allotment is additional land, rented separately — not the garden that comes with a house, and not a public park.",
  },
  f454: {
    lead: "Lancelot ‘Capability’ Brown designed the grounds around country houses in the 18th century so that the landscape appeared to be natural, with grass, trees and lakes.",
    versus: "Brown’s grounds are grass, trees and lakes made to look untouched. Gertrude Jekyll, later, designed colourful gardens around the houses Edwin Lutyens built. Green and open against planted and colourful.",
    why: "The nickname came from his own habit of saying that a place had ‘capabilities’.",
  },
  f455: {
    lead: "Vaccinations and medical treatment for animals are available from veterinary surgeons, known as vets.",
    versus: "Vets give the treatment; the charities named alongside them help with paying for it, for people who cannot afford a vet. Treatment and cost are answered by different bodies.",
    why: "The handbook’s other rule for pet owners is the legal one: it is against the law to treat a pet cruelly or to neglect it.",
  },
  f456: {
    lead: "Bodnant Garden is in Wales.",
    why: "The famous gardens are given as a set across the four parts of the UK, so each name has to be pinned to a country. Scotland’s two are both castles.",
    cluster: [
      { label: "England", detail: "Kew Gardens, Sissinghurst and Hidcote" },
      { label: "Scotland", detail: "Crathes Castle and Inveraray Castle" },
      { label: "Wales", detail: "Bodnant Garden" },
      { label: "Northern Ireland", detail: "Mount Stewart" },
    ],
  },
  f457: {
    lead: "Free secondary education in England and Wales was introduced by the Education Act 1944.",
    versus: "This is the wartime reform, passed while the fighting was still going on. The health service and the social security system came after the war.",
    why: "It is usually called ‘the Butler Act’, after R A Butler, who had been responsible for education since 1941 and oversaw it through.",
    cluster: [
      { label: "Beveridge Report, 1942", detail: "a report setting out ideas; it built nothing by itself" },
      { label: "Education Act, 1944", detail: "the one thing actually delivered during the war — free secondary education in England and Wales" },
      { label: "Attlee’s Labour government, 1945", detail: "elected promising to introduce the welfare state the report had outlined" },
      { label: "National Health Service, 1948", detail: "led by Aneurin Bevan as Minister for Health, guaranteeing care free at the point of use" },
    ],
  },
  f458: {
    lead: "R A Butler, a Conservative, gave his name to the Education Act 1944, often called ‘the Butler Act’.",
    versus: "Butler is the schools name. Beveridge wrote the report; Bevan built the health service. If the question is about education, it is Butler.",
    why: "He had been responsible for education since 1941, so the job came three years before the Act that carries his name.",
  },
  f459: {
    lead: "The 1944 Education Act enforced the division between primary and secondary schools.",
    versus: "It covered England and Wales only. Scotland kept its own education system at the 1707 Act of Union and was never part of this.",
    why: "The handbook says the education system has changed significantly since, but that one division still remains in most areas of Britain.",
  },
  f460: {
    lead: "After the Act of Union of 1707, Scotland kept its own legal system, its own education system and its Presbyterian Church.",
    versus: "What it lost was being an independent country. The institutions that ran daily life stayed; the separate state did not.",
    why: "The same separation is still visible: the Scottish Parliament legislates on civil and criminal law and on education, and Scottish school governors sit on a school board.",
  },
  f461: {
    lead: "Free school meals were first introduced before the First World War.",
    versus: "The 1940s brought the health service and social security. Free school meals, old-age pensions and help for the unemployed came three decades earlier.",
    why: "The handbook groups them with tighter town planning, laws to improve safety at work and the first salary for MPs, in a period it describes as one of optimism and social progress.",
  },
  f462: {
    lead: "Ignorance is the ‘Giant Evil’ that stood for the lack of education.",
    versus: "The handbook’s word is Ignorance. Not illiteracy, which is narrower — this one stands for the lack of education as a whole.",
    why: "There are five in all: Want, Disease, Ignorance, Squalor and Idleness. The handbook says the report provided the basis of the modern welfare state.",
  },
  f463: {
    lead: "The Welsh language is taught in schools and universities.",
    versus: "Welsh is a completely different language from English, not a dialect of it. Gaelic and Irish Gaelic are described as spoken in particular places; only Welsh is described as taught.",
    why: "Its official standing matches: in the National Assembly for Wales members may speak Welsh or English, and all of the Assembly’s publications appear in both languages.",
  },
  f464: {
    lead: "On average, girls leave school with better qualifications than boys.",
    versus: "Three figures sit on the same line and they are not the same size: women are about half the workforce, but more women than men study at university, and girls do better than boys at school.",
  },
  f465: {
    lead: "School governors and school boards have three key roles: setting the strategic direction of the school, ensuring accountability, and monitoring and evaluating school performance.",
    versus: "All three are oversight. None of them is teaching, marking or deciding the curriculum.",
    why: "They are people from the local community who want to contribute to children’s education, and the handbook gives raising school standards as the point of the three roles.",
  },
  f466: {
    lead: "In Scotland, school governors are called members of the school board.",
    versus: "Scotland is the exception. Elsewhere the handbook says governors; the school board is the Scottish name for the same job with the same three roles.",
    why: "It fits the wider pattern: Scotland kept its own education system at the 1707 Act of Union, and education is run by the devolved administrations today.",
  },
  f467: {
    lead: "In England, parents and other community groups can apply to open a free school in their local area.",
    versus: "England only. The handbook offers this in no other part of the UK.",
    why: "It points readers to the Department for Education for more about it.",
  },
  f468: {
    lead: "Education is one of the public services run by the devolved administrations rather than by the UK government.",
    versus: "The reserved list is fixed and short: defence, foreign affairs, immigration, taxation and social security stay under central UK government control. Other public services, such as education, do not.",
    why: "Education appears in all three devolved lists — education and training is one of the Welsh Assembly’s 20 areas, and both the Scottish Parliament and the Northern Ireland Assembly legislate on it.",
  },
  f469: {
    lead: "Nine countries were granted independence in 1947.",
    versus: "Three of the nine are named — India, Pakistan and Ceylon — and it is the three that stick. The number asked for is nine.",
    why: "1947 is the only year in this story with a figure attached; the other colonies, in Africa, the Caribbean and the Pacific, followed over the next 20 years.",
  },
  f470: {
    lead: "Ceylon, which became independent in 1947, is now Sri Lanka.",
    versus: "It is the one of the 1947 three that changed its name. India and Pakistan kept theirs, which is why this is the one that gets forgotten.",
    why: "All three were among nine countries granted independence in that single year.",
  },
  f471: {
    lead: "Colonies in Africa, the Caribbean and the Pacific achieved independence over the 20 years after 1947.",
    versus: "1947 is the year with a number attached — nine countries, including India, Pakistan and Ceylon. Everything after it is a period rather than a date.",
    why: "This is the wave Harold Macmillan’s ‘wind of change’ speech was about, given during the Conservative government of 1951 to 1964.",
  },
  f472: {
    lead: "Harold Macmillan was the Prime Minister famous for the ‘wind of change’ speech.",
    versus: "Attlee’s government granted the nine independences of 1947. Macmillan spoke about the wave that came after, during the Conservative years from 1951 to 1964.",
    why: "The handbook puts the speech in the same paragraph as the 1950s: economic recovery after the war and increasing prosperity for working people, at the same time as the Empire was being let go.",
  },
  f473: {
    lead: "Harold Macmillan’s ‘wind of change’ speech was about decolonisation and independence for the countries of the Empire.",
    versus: "It is about the Empire, not about Britain at home. Nationalising the railways and the coal mines, founding the NHS and developing the atomic bomb all belong to the previous government’s paragraph.",
    why: "He gave it during the Conservative years from 1951 to 1964, after nine countries had already become independent in 1947.",
  },
  f474: {
    lead: "During the Victorian period the British Empire grew to cover all of India, Australia and large parts of Africa.",
    versus: "Watch which word is qualified: all of India, but only large parts of Africa. A wrong version swaps the two round.",
    why: "It became the largest empire the world has ever seen, with an estimated population of more than 400 million people.",
  },
  f475: {
    lead: "At its greatest extent the British Empire was the largest empire the world has ever seen.",
    versus: "The comparison is against every empire in history, not merely against the rival empires of Britain’s own day.",
    why: "The figure the handbook gives with it is an estimated population of more than 400 million people.",
  },
  f476: {
    lead: "The British Empire continued to grow until the 1920s.",
    versus: "Arguing about the Empire and expanding it ran side by side. There was already discussion in the late 19th century about its future, and the Boer War of 1899 to 1902 made that discussion more urgent — yet the territory kept growing for two more decades.",
    why: "Queen Victoria died in 1901, so the Empire was still growing well after the Victorian period had ended.",
  },
  f477: {
    lead: "Between 1853 and 1913, as many as 13 million British citizens left the country to settle overseas.",
    versus: "People were arriving over the same years — around 120,000 Russian and Polish Jews came to Britain between 1870 and 1914. The outflow is counted in millions, the inflow in hundreds of thousands.",
    why: "The UK’s population was about 40 million in 1901, so the departures over those sixty years came to roughly one person for every three living in Britain.",
  },
  f478: {
    lead: "The East India Company, originally set up to trade, gained control of large parts of India.",
    versus: "This belongs to the Industrial Revolution rather than the Victorian expansion — the same passage has Captain James Cook mapping the coast of Australia and Britain gaining control over Canada.",
  },
  f479: {
    lead: "By the second half of the 20th century the British Empire had, for the most part, become the Commonwealth.",
    versus: "The handbook’s word for the change is ‘orderly’: countries were granted their independence. It describes no collapse and no defeat.",
    why: "Most Commonwealth member states were once part of the British Empire, although a few countries which were not have also joined.",
  },
  f480: {
    lead: "The Commonwealth is based on the core values of democracy, good government and the rule of law.",
    versus: "These are values, not obligations. The Commonwealth has no power over its members; the single thing it can do is suspend a membership.",
    why: "Two of the three — democracy and the rule of law — are also on the handbook’s list of the fundamental principles of British life.",
  },
  f481: {
    lead: "There are 15 national parks in England, Wales and Scotland.",
    versus: "The count covers three countries, not four. Northern Ireland is not in it.",
    why: "They are areas of protected countryside that everyone can visit, and where people live, work and look after the landscape — not fenced-off wilderness.",
  },
  f482: {
    lead: "Using recycled materials to make new products uses less energy and means we do not need to extract more raw materials from the earth.",
    versus: "Recycling is the energy-and-raw-materials one. Shopping locally is about the distance goods travel; walking and public transport are about pollution.",
    why: "There is a third saving in the same sentence: less rubbish is created, so the amount going into landfill is reduced.",
  },
  f483: {
    lead: "Buying products locally reduces your carbon footprint because the goods you buy will not have had to travel as far.",
    versus: "The advice has two halves and only one of them is environmental: it helps businesses and farmers in your area, and it cuts the distance goods travel. The carbon footprint is the second half.",
  },
  f484: {
    lead: "Walking and using public transport create less pollution than using a car.",
    versus: "Pollution is the mechanism here. It is the only one of the environmental suggestions that has nothing to do with rubbish or raw materials.",
    why: "It pairs with shopping locally: both are about distance travelled — you in one case, your shopping in the other.",
  },
  f485: {
    lead: "Looking after the area in which you live and the environment is a responsibility expected of residents, not something the UK offers in return.",
    versus: "Everything on the resident’s side is something you do; everything on the UK’s side is something you receive. Looking after your area is something you do.",
    why: "Five and five. Expected of you: respect and obey the law, respect the rights of others, treat others with fairness, look after yourself and your family, look after the area in which you live and the environment. Offered in return: freedom of belief and religion, freedom of speech, freedom from unfair discrimination, a right to a fair trial, a right to join in the election of a government.",
  },
  f486: {
    lead: "Participating in a litter pick-up in the local area is the volunteering example given for helping improve the environment.",
    versus: "Wrong answers are usually real examples from the same list attached to the wrong cause: animals go with a rescue shelter, the homeless with a homelessness shelter, health with an information desk in a hospital, and mentoring with someone just out of prison.",
  },
  f487: {
    lead: "The National Trust and Friends of the Earth are the two organisations named as environmental charities.",
    versus: "Friends of the Earth is on the charity list; Greenpeace is on the pressure-group list. Both campaign on the environment, but only one is called a charity here.",
    why: "Every other charity the handbook names belongs to a different cause: Age UK for older people, the NSPCC for children, Crisis and Shelter for the homeless, Cancer Research UK for medical research, the PDSA for animals.",
  },
  f488: {
    lead: "Greenpeace is named as a pressure group campaigning on the environment.",
    versus: "Greenpeace is a pressure group; Friends of the Earth is a charity. Pressure and lobby groups exist to influence government policy, and that is what puts Greenpeace in the other list.",
    why: "The handbook gives one example per cause: the CBI for the views of British business, Liberty for human rights, Greenpeace for the environment.",
  },
  f489: {
    lead: "Loch Lomond, in Loch Lomond and the Trossachs National Park, is the largest expanse of fresh water in mainland Britain.",
    versus: "Windermere is the biggest stretch of water in the Lake District, England’s largest national park. Loch Lomond holds the wider title, across mainland Britain.",
    why: "The park is in the west of Scotland; the other parks the handbook describes are the Lake District in England and Snowdonia in North Wales.",
  },
  f490: {
    lead: "A free press means that what is written in newspapers is free from government control.",
    versus: "Newspapers may take sides; radio and television may not. By law, broadcast coverage of the political parties must be balanced, with equal time for rival viewpoints.",
    why: "The handbook says outright that some newspaper owners and editors hold strong political opinions and run campaigns to try to influence government policy and public opinion.",
  },
  f491: {
    lead: "From 1695, newspapers were allowed to operate without a government licence.",
    versus: "It sits after the Glorious Revolution, in the same passage as the Bill of Rights of 1689 and the start of party politics between the Whigs and the Tories.",
    why: "From that point increasing numbers of newspapers began to be published.",
  },
  f492: {
    lead: "By law, radio and television coverage of the political parties must be balanced, and equal time has to be given to rival viewpoints.",
    versus: "The duty falls on broadcasters alone. What is written in newspapers is free from government control, and a paper may campaign for one side as hard as it likes.",
  },
  f493: {
    lead: "Everyone in the UK with a TV, computer or other medium that can be used for watching TV must have a television licence.",
    versus: "What triggers the licence is the equipment — any device that can be used to watch TV, not only a television set. What the licence then covers is the home: one licence covers all of the equipment in one home.",
    why: "There is one exception, and it is the one questions reach for: where people rent different rooms in a shared house and each has a separate tenancy agreement, those people must each buy a separate licence.",
  },
  f494: {
    lead: "Watching TV without a television licence brings a fine of up to £1,000.",
    why: "The figure is a ceiling rather than a set penalty — the handbook says a fine of up to £1,000.",
  },
  f495: {
    lead: "People over 75 can apply for a free television licence.",
    versus: "Two concessions sit side by side and only one of them is free. Age gives the whole licence away: over 75, nothing to pay. Blindness gives half of it: a 50% discount, not a free licence.",
    note: "The handbook gives the free licence to anyone over 75, and that is what the test marks. The concession has been narrowed since the book was written.",
  },
  f496: {
    lead: "The money from television licences is used to pay for the British Broadcasting Corporation (BBC).",
    versus: "Other UK channels are funded primarily through advertisements and subscriptions, so the licence fee pays for the BBC and nothing else.",
    why: "BBC radio comes out of the same money — there is no separate radio licence — while other radio stations are funded through advertisements, exactly as other television channels are.",
  },
  f497: {
    lead: "The BBC is the largest broadcaster in the world, and a British public service broadcaster providing television and radio programmes.",
    why: "The handbook makes a second, stranger claim about it in the same breath: it is the only wholly state-funded media organisation that is independent of government.",
  },
  f498: {
    lead: "The currency of the UK is the pound sterling, and its symbol is £.",
    versus: "Northern Ireland and Scotland print their own banknotes, but that is a question about notes, not about currency. The currency is the pound sterling throughout the UK.",
  },
  f499: {
    lead: "There are 100 pence in a pound.",
    why: "It is what fixes where the coins change over: the run of pence stops at 50p, and 100p is the £1 coin.",
  },
  f500: {
    lead: "The UK coins are 1p, 2p, 5p, 10p, 20p, 50p, £1 and £2 — eight in all.",
    why: "The values climb in the same three steps at each scale: one, two, five. So 1p, 2p, 5p; then 10p, 20p, 50p; then £1 and £2, where it stops.",
  },
  f501: {
    lead: "The UK banknotes are £5, £10, £20 and £50 — four notes against eight coins.",
    versus: "The £1 is a coin, not a note, which is why the notes begin at £5. The handbook lists nothing above £50.",
  },
  f502: {
    lead: "Northern Ireland and Scotland have their own banknotes.",
    versus: "Wales is the easiest to add by mistake. It has its own language and its own capital city, but no banknotes of its own — the handbook names only Northern Ireland and Scotland.",
  },
  f503: {
    lead: "Banknotes issued in Scotland and Northern Ireland are valid everywhere in the UK.",
    versus: "Valid is not the same as accepted, and the handbook says both in consecutive sentences. This is the first half: the notes are proper currency the length of the country. The second half is that shops and businesses still do not have to take them.",
  },
  f504: {
    lead: "Shops and businesses do not have to accept banknotes issued in Scotland and Northern Ireland.",
    versus: "This is the half of the rule people drop. The notes are valid everywhere in the UK; being valid does not oblige anyone to take them, so a business can refuse one without breaking anything.",
  },
  f505: {
    lead: "The UK did not adopt the euro: it kept the pound sterling.",
    versus: "Membership and currency are separate questions, and the handbook answers both in one sentence — a full member of the European Union, and not a user of the euro.",
    why: "The sentence sits immediately after joining the European Economic Community in 1973, which is why the two get run together: the membership changed, the money did not.",
  },
  f506: {
    lead: "The first coins to be minted in Britain were made by the people of the Iron Age.",
    why: "Some were inscribed with the names of Iron Age kings, and the handbook treats that writing as the point where British history begins.",
    cluster: [
      { label: "Stone Age", detail: "the first farmers, and Skara Brae on Orkney — the best preserved prehistoric village in northern Europe" },
      { label: "Bronze Age", detail: "accomplished metalworkers: tools, ornaments and weapons in bronze and gold, and round barrow tombs" },
      { label: "Iron Age", detail: "iron tools and weapons, hill forts such as Maiden Castle in Dorset, the Celtic language family — and the coins" },
    ],
  },
  f507: {
    lead: "To buy alcohol in a pub or night club you must be 18 or over.",
    versus: "18 is the age for buying at all. 16 is the age at which someone may drink wine or beer with a meal, if they are with someone over 18 — a different act in a different setting.",
    why: "Being too young to buy is not the same as being barred: people under 18 may be allowed in some pubs with an adult.",
  },
  f508: {
    lead: "At 16, a person can drink wine or beer with a meal, as long as they are with someone over 18.",
    versus: "Three conditions travel together and dropping any one of them makes the answer wrong: 16 or over, with a meal, and accompanied by someone over 18. Buying at the bar still needs 18.",
    why: "The setting is part of the rule — a hotel or restaurant, including the eating areas in pubs.",
  },
  f509: {
    lead: "‘Pub’ is short for public house.",
    why: "The handbook adds two things about the same place: most communities have a ‘local’ that is a natural focal point for social activities, and pub quizzes are popular.",
  },
  f510: {
    lead: "Pool and darts are the traditional pub games.",
    versus: "The quiz comes from the same passage but is not one of the games. Pub quizzes are described as popular; pool and darts are named as the games.",
  },
  f511: {
    lead: "Pubs are usually open during the day from 11.00 am, and from 12 noon on Sundays.",
    versus: "Sunday is the later of the two starts, and it is the difference a question usually turns on: 11.00 am on an ordinary day, an hour later on a Sunday.",
    why: "Night clubs with dancing and music usually open and close later than pubs.",
  },
  f512: {
    lead: "The licensee decides the hours that a pub or night club is open.",
    why: "Nothing fixes the hours nationally, which is why two pubs can keep different times and why a night club can run later than the pub next door.",
  },
  f513: {
    lead: "Buying alcohol for someone under 18 is a criminal offence, just as selling it to them is.",
    versus: "The offence is not committed only at the till. Selling to an under-18 and buying on their behalf are both crimes; the one exception the handbook allows is a person of 16 or over drinking alcohol with a meal in a hotel or restaurant.",
  },
  f514: {
    lead: "An alcohol-free zone is a place where you cannot drink alcohol in public.",
    versus: "The police power is wider than the zones. Inside a zone you can be fined or arrested for drinking; separately from that, the police can confiscate alcohol or move young people on from public places.",
    why: "The zones are local rather than national — some places have them and some do not — so whether drinking in the street is an offence depends on where you are standing.",
  },
  f515: {
    lead: "In 1929 the world entered the Great Depression.",
    versus: "The two inter-war decades pull opposite ways and 1929 is the hinge. The 1920s are the years when many people’s living conditions got better; the depression belongs to the 1930s.",
    why: "Its effects were felt differently in different parts of the UK — some parts suffered mass unemployment, not all of them.",
  },
  f516: {
    lead: "Shipbuilding is the traditional heavy industry named as badly affected by the depression of the 1930s.",
    versus: "The decade splits in two. Traditional heavy industry such as shipbuilding was badly affected; the new industries — automobile and aviation — developed in the same years.",
  },
  f517: {
    lead: "The automobile and aviation industries are the new industries that developed in the UK during the 1930s.",
    versus: "These are the growing side of the decade. Shipbuilding and the other traditional heavy industries are the declining side, in the same country at the same time.",
    why: "The consumer end of the same shift is in the next sentence: car ownership doubled from 1 million to 2 million between 1930 and 1939.",
  },
  f518: {
    lead: "Car ownership in the UK doubled between 1930 and 1939, from 1 million to 2 million.",
    why: "Prices generally fell during the decade, so those in work had more money to spend — which is the handbook’s evidence that the 1930s were not uniformly grim.",
  },
  f519: {
    lead: "In the 1920s many people’s living conditions got better, with improvements in public housing and new homes built in many towns and cities.",
    versus: "The improvement comes before the crash rather than after it. The 1920s are the better years; the world entered the Great Depression in 1929, and the hardship belongs to the 1930s.",
  },
  f520: {
    lead: "Graham Greene and Evelyn Waugh are the novelists named as prominent writers of the 1930s.",
    why: "The handbook calls the decade a time of cultural blossoming and puts that in the same paragraph as the depression — the flowering and the hardship are the same years.",
  },
  f521: {
    lead: "John Maynard Keynes was the economist who published influential new theories of economics in the inter-war years.",
    versus: "Beveridge is the other economist in this part of the book, so the field does not separate them — the work does. Keynes published new theories of economics between the wars; Beveridge’s 1942 report set out a plan for social security.",
  },
  f522: {
    lead: "The BBC began the world’s first regular television service in 1936.",
    versus: "Two BBC dates sit in one sentence and radio is the earlier of them. Radio broadcasts started in 1922; television in 1936, and it is the television service the handbook calls a world first.",
  },
  f523: {
    lead: "In the late 1970s many people began to argue that the trade unions were too powerful and that their activities were harming the UK.",
    versus: "The argument comes first and the law comes after: the legal controls on union powers were imposed by the Conservative government from 1979.",
    why: "The handbook sets it in a failing economy — the post-war boom had ended, prices of goods and raw materials were rising sharply, the exchange rate was unstable, and many industries and services were affected by strikes.",
  },
  f524: {
    lead: "The Conservative government led by Margaret Thatcher from 1979 to 1990 imposed legal controls on trade union powers.",
    versus: "Shipbuilding and coal mining are the industries named as declining in this period — the same traditional heavy industries hit in the 1930s. Investments, insurance and other financial services went the other way, growing in the City of London.",
    why: "It is one of three changes in the same passage: privatisation of the nationalised industries, legal controls on the unions, and deregulation.",
  },
  f525: {
    lead: "Housing law is the area of civil law that covers disputes between landlords and tenants.",
    why: "The two examples given are repairs and eviction — the property itself and the right to stay in it.",
    cluster: [
      { label: "Housing law", detail: "landlord against tenant, over repairs and eviction" },
      { label: "Consumer rights", detail: "a dispute about faulty goods or services" },
      { label: "Employment law", detail: "disputes over wages, unfair dismissal, and discrimination in the workplace" },
      { label: "Debt", detail: "being taken to court for money owed to someone" },
    ],
  },
  f526: {
    lead: "A case of unfair dismissal is brought under employment law, which is a branch of civil law.",
    versus: "Discrimination falls on both sides of the criminal and civil line. Discrimination in the workplace is an employment matter, settled as a dispute between the two sides; causing harassment, alarm or distress to someone because of their religion or ethnic origin is a criminal offence.",
    why: "Employment law’s examples are all about the job itself: disputes over wages, unfair dismissal, and discrimination at work.",
  },
  f527: {
    lead: "Anyone who does not pay enough National Insurance Contributions will not be able to receive certain contributory benefits, such as Jobseeker’s Allowance or a full state retirement pension.",
    versus: "How the contributions are paid depends on how you work: an employee has them deducted from their pay by the employer, while a self-employed person pays them directly.",
    why: "The word carrying the rule is ‘contributory’ — these are the benefits you have to have paid in for, which is why a gap in the record only shows itself years later.",
  },
  f528: {
    lead: "Post-war immigration means nearly 10% of the population has a parent or grandparent born outside the UK.",
    versus: "This is about parents and grandparents, not about people born abroad themselves — the figure counts the second and third generation, which is why it is larger than a foreign-born count would be.",
    why: "The handbook uses it to make one point: the UK today is a more diverse society than it was a hundred years ago, in both ethnic and religious terms.",
  },
  f529: {
    lead: "Wales is around 5% of the UK population.",
    versus: "The four shares are worth holding as one set, because the distractors are always each other: England 84%, Scotland just over 8%, Wales around 5%, Northern Ireland less than 3%.",
    why: "They sum to 100, so any three give you the fourth — which is the check to make when a number will not come.",
    cluster: [
      { label: "England, 84%", detail: "more or less consistently, and by far the largest" },
      { label: "Scotland, just over 8%", detail: "the second largest, and roughly half again on Wales" },
      { label: "Wales, around 5%", detail: "the third" },
      { label: "Northern Ireland, under 3%", detail: "the smallest, and the only one the handbook words as \"less than\"" },
    ],
  },
  f530: {
    lead: "Scotland is just over 8% of the UK population.",
    versus: "Scotland is the larger of the two smaller mainland nations — just over 8% against Wales’s 5%. If a question offers both, Scotland is always the bigger number.",
    why: "The handbook words each share differently and the wording is a hint: England \"more or less consistently\" 84%, Scotland \"just over\" 8%, Wales \"around\" 5%, Northern Ireland \"less than\" 3%.",
  },
  f531: {
    lead: "Northern Ireland is less than 3% of the UK population — the smallest of the four.",
    versus: "It is the only share the handbook words as \"less than\" rather than \"around\" or \"just over\", which is a usable tell if the wording is offered back to you.",
    why: "It is also the only one of the four not on the island of Great Britain, so the smallest population and the separate geography go together.",
  },
  f532: {
    lead: "The handbook credits two things: migration into the UK, and longer life expectancy.",
    versus: "It does not say birth rate. Anything about families having more children is a distractor, however plausible it sounds.",
    why: "The same two causes drive the ageing-population section that follows, which is why the handbook puts them together: people arriving, and people living longer.",
  },
  f533: {
    lead: "Improved living standards and better health care are the two reasons the handbook gives.",
    versus: "Migration and life expectancy explain population GROWTH; living standards and health care explain the AGEING population. Two questions, two pairs, and they are easy to swap.",
    why: "The consequence the handbook draws is financial: a record number of people aged 85 and over, and an impact on the cost of pensions and health care.",
  },
  f534: {
    lead: "In the 2011 census, 59% of people identified themselves as Christian.",
    versus: "Christian and \"no religion\" are the only two large figures, 59% against 25%. Every named faith after that is in low single figures, so the shape is two big numbers and a tail rather than a spread.",
    why: "The handbook opens the section by calling the UK historically a Christian country, and this is the evidence it offers. Just under three in five is the thing to hold: a majority, but not an overwhelming one.",
  },
  f535: {
    lead: "In the 2011 census, 4.8% identified themselves as Muslim.",
    versus: "Muslim is the only named minority faith above 2%, and the only one given to one decimal place. A figure with a decimal, under five, is this one.",
    why: "The handbook pairs every proportion with a building - mosques, Hindu temples, synagogues, gurdwaras, Buddhist temples - so the list of faiths and the list of places of worship are the same list twice.",
    cluster: [
      { label: "Muslim, 4.8%", detail: "the largest named minority faith, roughly three times the Hindu figure" },
      { label: "Hindu, 1.5%", detail: "second, and about double the Sikh figure" },
      { label: "Sikh, 0.8%", detail: "third, and the last still above half a per cent" },
      { label: "Jewish and Buddhist, both under 0.5%", detail: "the only two grouped together rather than listed separately" },
    ],
  },
  f536: {
    lead: "A quarter of people - 25% - said they had no religion.",
    versus: "This is the second-largest figure in the section and it dwarfs every named minority faith: 25% against 4.8% for the largest of them. People reliably guess it far too low.",
    why: "The handbook puts it immediately after saying everyone has the legal right to choose their religion, or not to practise one. The number is there to show the right is actually used.",
    cluster: [
      { label: "Christian, 59%", detail: "the majority, but under three in five" },
      { label: "No religion, 25%", detail: "a quarter, and larger than every named minority faith put together" },
      { label: "Muslim, 4.8%", detail: "the largest named minority faith" },
    ],
  },
  f537: {
    lead: "Jewish and Buddhist are the two the handbook groups together, both at less than 0.5%.",
    versus: "They are the only pair given a shared figure. Sikh sits just above them at 1%, on its own.",
    why: "The section pairs every faith with its buildings, and both of these have theirs named: synagogues and Buddhist temples.",
  },
  f538: {
    lead: "Sikhs worship in gurdwaras and Jews in synagogues.",
    versus: "The full list pairs one building to each faith, so the trap is swapping two of them rather than not knowing any: mosques for Muslims, temples for Hindus and for Buddhists, gurdwaras for Sikhs, synagogues for Jews.",
    why: "The handbook uses the buildings to make its point that the UK is religiously diverse in practice and not only on a survey form.",
  },
  f539: {
    lead: "In the 2011 census, 1.5% identified themselves as Hindu.",
    versus: "Hindu sits between Muslim above and Sikh below - 4.8%, 1.5%, 0.8% - and each is roughly half the one before it. Halving twice from the Muslim figure gets you both of the others.",
    why: "Hindus and Sikhs both celebrate Diwali, which is why the two faiths keep appearing together elsewhere in the chapter and why their figures are worth learning as a pair.",
  },
  f540: {
    lead: "In the 2011 census, 0.8% identified themselves as Sikh.",
    versus: "Sikh is the smallest faith the census still gives a number to. Below it, Jewish and Buddhist are grouped together as under 0.5% rather than counted separately.",
    why: "Sikhs worship in gurdwaras, and Vaisakhi in April is the festival the handbook names for them - so the faith, the building and the festival travel together.",
  },
  f541: {
    lead: "The 2021 census put the UK population at about 67 million.",
    versus: "The census is taken every ten years, so 2021 is the most recent one and the figure to quote. Anything offered for a year that is not a census year is a distractor.",
    why: "The growth table runs 8 million in 1801, 40 million in 1901 and 50 million in 1951, so the population has risen by roughly ten million every twenty years since the war.",
    cluster: [
      { label: "1801, 8 million", detail: "the first census, and the start of the industrial rise" },
      { label: "1901, 40 million", detail: "five times the 1801 figure in a single century" },
      { label: "1951, 50 million", detail: "post-war, and the last round number before the modern curve" },
      { label: "2021, about 67 million", detail: "the most recent census, and the figure to quote" },
    ],
  },
  f542: {
    lead: "Purcell was the organist at Westminster Abbey.",
    versus: "Purcell is the earliest composer the handbook names and the only one given a job rather than a work. Handel is the one who came from abroad; Elgar the one played at the Proms.",
    why: "He wrote church music, operas and other pieces, and developed a British style distinct from the rest of Europe — which is why the handbook puts him first.",
  },
  f543: {
    lead: "Handel was born in Germany, spent many years in the UK, and became a British citizen in 1727.",
    versus: "Handel is the immigrant; Purcell, Elgar, Holst, Vaughan Williams, Walton and Britten are all British-born. If a question turns on someone arriving from abroad, it is Handel.",
    why: "He wrote the Water Music for King George I and Music for the Royal Fireworks for his son George II — royal commissions are the thread that runs through everything the handbook says about him.",
    cluster: [
      { label: "Water Music", detail: "written for King George I" },
      { label: "Music for the Royal Fireworks", detail: "written for his son, George II" },
      { label: "Messiah", detail: "an oratorio, sung regularly by choirs and often at Easter" },
    ],
  },
  f544: {
    lead: "Holst wrote The Planets, a suite of pieces themed around the planets of the solar system.",
    versus: "Holst is the one with a single famous suite; Elgar the one with the marches. Both get played at big national occasions, which is why they blur.",
    why: "He adapted Jupiter, part of that suite, as the tune for the hymn \"I vow to thee my country\" — so one piece of music has two lives, and the handbook mentions both.",
  },
  f545: {
    lead: "Elgar wrote the Pomp and Circumstance Marches, and March No 1 — Land of Hope and Glory — is usually played at the Last Night of the Proms.",
    versus: "Land of Hope and Glory is Elgar; \"I vow to thee my country\" is Holst. Both are patriotic, both are sung at national moments, and they are the pair most often swapped.",
    why: "The Proms are held at the Royal Albert Hall, which is where the handbook puts the Last Night — the piece, the composer and the venue travel together.",
  },
  f546: {
    lead: "Vaughan Williams wrote for orchestras and choirs and was strongly influenced by traditional English folk music.",
    versus: "Folk music is the detail that belongs to him alone. Walton is the one who wrote for coronations and for film.",
    why: "The handbook uses him to make a point it makes nowhere else in the section: that British classical music drew on what ordinary people already sang.",
  },
  f547: {
    lead: "Walton wrote the coronation marches for King George VI and Queen Elizabeth II.",
    versus: "Two coronations is the fact that fixes him. Elgar also wrote marches, but his are the Proms; Walton’s are the crownings.",
    why: "His range is the point the handbook makes: film scores at one end and opera at the other, which is why \"wrote a wide range\" is the phrase attached to him.",
  },
  f548: {
    lead: "Dr Ludwig Guttman, a German refugee, founded them at Stoke Mandeville hospital in Buckinghamshire.",
    versus: "Guttman is a doctor, not an athlete — the only person in this section who is neither a competitor nor a venue. If a question is about the origin of the Paralympics rather than a medal, it is him.",
    why: "He developed new methods of treating spinal injuries and encouraged his patients to take part in exercise and sport. The games came out of the treatment, which is why a hospital rather than a stadium is the answer.",
  },
  f549: {
    lead: "Sir Roger Bannister ran the first sub-four-minute mile in 1954.",
    versus: "Bannister is a first in the WORLD, not just in Britain. Several others in this section are the first Briton to do something — Wiggins the Tour de France, Farah the 10,000 metres — and that distinction is what the questions turn on.",
    why: "The barrier is what made it famous: four minutes was thought beyond a human being until it was not.",
  },
  f550: {
    lead: "Bobby Moore captained the England team that won the World Cup in 1966.",
    versus: "Moore is football, Botham is cricket. Both captained England, and both are in the same list, which is the confusion to hold apart.",
    why: "1966 is the only World Cup England has won, so the year and the man are a single fact rather than two.",
  },
  f551: {
    lead: "Sir Jackie Stewart, a Scot, won the Formula 1 world championship three times.",
    versus: "Stewart and Sir Chris Hoy are the two Scots in this list — one on four wheels, one on two. Hoy is the cyclist and the Olympian; Stewart is the driver and the world champion.",
    why: "Three championships is the figure to hold; the handbook gives no other number for him.",
  },
  f552: {
    lead: "Sir Bradley Wiggins became the first Briton to win the Tour de France, in 2012.",
    versus: "Wiggins and Hoy are both cyclists with Olympic gold. Wiggins is the road racer and the Tour; Hoy is the track rider with six golds.",
    why: "2012 does double duty for him — the Tour and a home Olympics in the same summer, which is why that year attaches to so many names in this section.",
  },
  f553: {
    lead: "Sir Mo Farah, born in Somalia, won Olympic gold in the 5,000 and 10,000 metres.",
    versus: "Farah is the first BRITON to win Olympic gold at 10,000 metres — a British first. Bannister’s sub-four-minute mile was a world first. Both are running; only one is a world record of any kind.",
    why: "He is also the clearest example of the point the handbook keeps making about modern Britain: born abroad, and one of its best-known athletes.",
  },
  f554: {
    lead: "The Human Rights Act 1998 incorporated the European Convention on Human Rights into UK law.",
    versus: "Two Acts sit next to each other and get swapped: the Human Rights Act 1998 covers rights such as freedom of expression; the Equality Act 2010 covers discrimination. Rights against the state, versus fair treatment by anyone.",
    why: "British diplomats and lawyers helped draft the Convention itself, which is why the handbook treats it as something the UK joined rather than something imposed on it.",
  },
  f555: {
    lead: "In an emergency, call the police on 999.",
    versus: "Two numbers, two situations. 999 is the emergency; the 24-hour National Domestic Violence Freephone Helpline is the one to call at any time when it is not.",
    why: "The handbook also lists the practical routes: a solicitor or Citizens Advice to explain the options, and refuges and shelters for a safe place to stay. Numbers for these are in the front of the Yellow Pages.",
  },
  f556: {
    lead: "Clement Attlee led the Labour government elected in 1945.",
    versus: "Attlee had been Churchill’s deputy in the wartime government, then beat him at the election that followed. Churchill is the war; Attlee is what came after it.",
    why: "His government nationalised the railways, coal mines and gas, water and electricity supplies, and created the National Health Service — the welfare state, built in one term.",
  },
  f557: {
    lead: "William Beveridge’s report of 1942 set out the ideas that became the modern welfare state.",
    versus: "Beveridge wrote the plan; Attlee built it. The report is 1942, in the middle of the war; the government that acted on it was elected in 1945.",
    why: "He was a Liberal, not Labour, and the report was commissioned during a wartime coalition — which is why the welfare state is not the property of one party.",
  },
  f558: {
    lead: "Dylan Thomas, the Welsh poet, wrote Under Milk Wood.",
    versus: "Thomas is Welsh; Robert Burns is Scottish. Both are national poets in the handbook and both are in the same part of the chapter.",
    why: "His other famous work is \"Do not go gentle into that good night\", and the handbook names both — one a play for voices, one a poem.",
  },
};
