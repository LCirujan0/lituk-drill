/**
 * The chronology — scope line S9 (D-016).
 *
 * A static reference, not scheduled and not scored. Its value is being read end to end: a
 * timeline is a different cognitive tool from the same material broken into individually
 * scheduled cards. Knowing roughly *where in the story* something sits answers a large share
 * of history questions on its own, and that shape only comes from seeing the whole.
 *
 * ## What each era carries
 *
 * `span` and `summary` exist so an era can be understood without opening it — the collapsed
 * row is meant to be readable on its own, and expanding is for detail rather than for
 * meaning. `figures` names the people the handbook itself names, each with the one thing it
 * remembers them for; that is the discrimination the drill cards keep testing, gathered in
 * one place instead of scattered across forty of them.
 *
 * ## Sourcing
 *
 * Everything here comes from the handbook, including its own "Key Material and Facts"
 * summary. **The same hard rule as the explanations applies: no person, date or event the
 * handbook does not contain.** Where the book gives no date, none is invented — several
 * entries below say "no date given" rather than supplying one, and the sixteen facts retired
 * on 4 August 2026 are exactly what happens when that rule is not followed.
 *
 * 11 eras.
 */

export interface TimelineEvent {
  readonly year: string;
  readonly title: string;
  readonly detail: string;
  /** Worth knowing cold. Marked on screen. */
  readonly major: boolean;
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
  readonly events: readonly TimelineEvent[];
  readonly figures?: readonly Figure[];
}

export const TIMELINE: readonly Era[] = [
  {
    name: 'Before the Romans',
    span: 'to 55 BC',
    summary:
      'Prehistory, and the only era with no written record. Three ages in order — Stone, Bronze, Iron — and the sequence matters far more than the dates.',
    events: [
      { year: '10,000 years ago', title: 'Britain separates from Europe', detail: 'Rising seas cut the land bridge. Hunter-gatherers only, moving with the herds.', major: false },
      { year: '6,000 years ago', title: 'The first farmers arrive', detail: 'Stone Age. They build houses, tombs and monuments. Skara Brae in Orkney is the best-preserved prehistoric village in northern Europe.', major: false },
      { year: '4,000 years ago', title: 'The Bronze Age begins', detail: 'People learn to make bronze. They live in roundhouses and bury their dead in round barrows. Stonehenge belongs to this world.', major: false },
      { year: 'Iron Age', title: 'Hill forts, and a Celtic language', detail: 'Maiden Castle in Dorset is the most impressive. They mint the first coins made in Britain, some inscribed with the names of Iron Age kings — which is where British history begins.', major: false },
    ],
  },
  {
    name: 'Rome',
    span: '55 BC – AD 410',
    summary:
      'Two invasions. The famous name is the one that failed; the one that stuck is a century later and a different man. That confusion is the single most-tested thing in the era.',
    events: [
      { year: '55 BC', title: 'Julius Caesar invades — and fails', detail: 'Britain then stays outside the Roman Empire for nearly a hundred years.', major: true },
      { year: 'AD 43', title: 'Claudius conquers Britain', detail: 'The invasion that stuck. Some British tribes resist, but the Romans occupy almost all of Britain.', major: true },
      { year: 'no date given', title: 'Boudicca leads the Iceni against Rome', detail: 'Queen of a tribe in what is now eastern England. Still remembered — her statue stands on Westminster Bridge, near the Houses of Parliament.', major: false },
      { year: 'no date given', title: "Hadrian's Wall", detail: 'Built across the north of England to keep out the Picts, with forts along it. Housesteads and Vindolanda can still be seen; it is a UNESCO World Heritage Site.', major: false },
      { year: 'no date given', title: 'Scotland is never conquered', detail: 'Areas of what is now Scotland stay outside the Empire, which is why the wall exists at all.', major: false },
      { year: '3rd–4th centuries AD', title: 'The first Christian communities appear', detail: 'Christianity arrives in Britain for the first time. It does not survive the Anglo-Saxon invasions.', major: false },
      { year: 'AD 410', title: 'The Roman army leaves and never returns', detail: 'Recalled to defend other parts of the Empire. Four hundred years in all — they leave roads, public buildings, a structure of law, and new plants and animals.', major: true },
    ],
    figures: [
      { name: 'Julius Caesar', when: '55 BC', known: 'The invasion that failed. Britain stayed separate for nearly a century afterwards.' },
      { name: 'Emperor Claudius', when: 'AD 43', known: 'The invasion that succeeded. Almost all of Britain occupied.' },
      { name: 'Boudicca', known: 'Queen of the Iceni, who fought the Romans. Her statue is on Westminster Bridge.' },
      { name: 'Emperor Hadrian', known: 'The wall across the north, built to keep out the Picts.' },
    ],
  },
  {
    name: 'Anglo-Saxons and Vikings',
    span: 'AD 410 – 1066',
    summary:
      'Britain is invaded, converted, and invaded again. Christianity has to arrive twice, which is the part most people miss.',
    events: [
      { year: 'after AD 410', title: 'The Jutes, Angles and Saxons invade', detail: 'Tribes from northern Europe. Their languages are the basis of modern English.', major: true },
      { year: 'by AD 600', title: 'Anglo-Saxon kingdoms established', detail: 'Mainly in what is now England. Much of Wales, and Scotland, stay free of them.', major: false },
      { year: 'no date given', title: 'Christianity returns', detail: 'Missionaries come from Rome to convert the Anglo-Saxons, who had reverted to paganism. St Columba and St Augustine lead them.', major: false },
      { year: 'AD 789', title: 'The Vikings arrive', detail: 'From Denmark and Norway, first to raid and later to settle — mainly in the east and the north.', major: false },
      { year: 'no date given', title: 'Sutton Hoo', detail: 'An Anglo-Saxon king buried with treasure and armour in a ship, covered by a mound of earth. In modern Suffolk.', major: false },
    ],
    figures: [
      { name: 'Alfred the Great', known: 'United the Anglo-Saxon kingdoms of England and defeated the Vikings.' },
      { name: 'St Columba and St Augustine', known: 'Led the missionaries from Rome who converted the Anglo-Saxons.' },
    ],
  },
  {
    name: 'The hinge',
    span: '1066',
    summary:
      'One year, one battle, and the last successful foreign invasion of England. If you know one date, know this one.',
    events: [
      { year: '1066', title: 'The Battle of Hastings', detail: 'William of Normandy defeats Harold, the Saxon king of England, who is killed in the battle. William becomes King of England.', major: true },
      { year: '1066', title: 'The Bayeux Tapestry', detail: 'Commemorates the invasion, and can still be seen in France today.', major: false },
      { year: 'no date given', title: 'The Domesday Book', detail: 'A survey of England made after the conquest, listing the towns and villages and who lived in them. The handbook gives no year for it.', major: false },
    ],
    figures: [
      { name: 'William of Normandy', when: '1066', known: 'Beat Harold at Hastings. The last successful invasion of England.' },
      { name: 'Harold', when: '1066', known: 'The Saxon king who lost at Hastings, and was killed there.' },
    ],
  },
  {
    name: 'The Middle Ages — power leaks from the crown',
    span: '1066 – 1485',
    summary:
      'Constant war abroad, and at home a slow one-way transfer of power from the king towards Parliament. Magna Carta begins it; the Black Death accelerates it by killing a third of the country.',
    events: [
      { year: '1215', title: 'Magna Carta', detail: 'King John is forced to agree to it by his noblemen. It reduces the rights of the king and sets out basic rights of the people — the start of the principle that nobody is above the law.', major: true },
      { year: '1314', title: 'The Battle of Bannockburn', detail: 'Robert the Bruce, King of Scotland, defeats the English. Scotland stays unconquered.', major: false },
      { year: '1348', title: 'The Black Death', detail: 'Kills over a third of the population of England. Labour shortages follow, wages rise, people move to the towns, and a new middle class and gentry emerge from it.', major: true },
      { year: 'Middle Ages', title: 'The Hundred Years War', detail: 'A long war with France — and despite the name, it lasted 116 years. The English leave France in the 1450s.', major: false },
      { year: '1415', title: 'The Battle of Agincourt', detail: "Henry V's vastly outnumbered English army defeats the French. The most famous battle of the Hundred Years War.", major: false },
      { year: '1400', title: 'English becomes the language of government', detail: 'The preferred language of the courts and of official documents.', major: false },
      { year: '1455', title: 'The Wars of the Roses begin', detail: 'Civil war between the House of Lancaster (red rose) and the House of York (white rose), over who should be king of England.', major: true },
      { year: '1485', title: 'The Battle of Bosworth Field', detail: 'Ends the Wars of the Roses. Henry Tudor of Lancaster becomes Henry VII and marries Elizabeth of York — the two roses become the Tudor rose, red with white inside.', major: true },
    ],
    figures: [
      { name: 'King John', when: '1215', known: 'Forced by his noblemen to agree to Magna Carta.' },
      { name: 'Robert the Bruce', when: '1314', known: 'King of Scotland; beat the English at Bannockburn.' },
      { name: 'Henry V', when: '1415', known: 'Won Agincourt against a far larger French army.' },
      { name: 'Henry VII', when: '1485', known: 'Won at Bosworth Field, married Elizabeth of York, founded the House of Tudor.' },
    ],
  },
  {
    name: 'Tudors and the Reformation',
    span: '1485 – 1603',
    summary:
      'England leaves the Roman Church, and the question of who runs religion becomes the question of who runs the country. It stays that way for two hundred years.',
    events: [
      { year: '1500s', title: 'The Act for the Government of Wales', detail: 'Under Henry VII. Unites England and Wales.', major: false },
      { year: 'no date given', title: 'Henry VIII breaks with the Church of Rome', detail: 'So that he could end his first marriage. He becomes head of the Church of England — the Reformation in England, and the reason the monarch still heads that Church.', major: true },
      { year: 'no date given', title: "Elizabeth I's religious settlement", detail: 'A compromise between Catholic and Protestant, often called the "middle way".', major: false },
      { year: '1588', title: 'The Spanish Armada is defeated', detail: 'Under Elizabeth I. Sir Francis Drake is among those who help.', major: true },
      { year: "Elizabeth I's reign", title: 'English settlers reach North America', detail: 'The beginning of what becomes the Empire.', major: false },
    ],
    figures: [
      { name: 'Henry VIII', known: 'Married six times and broke with Rome. Wives in order: Catherine of Aragon, Anne Boleyn, Jane Seymour, Anne of Cleves, Catherine Howard, Catherine Parr. Wales was united with England under him.' },
      { name: 'Elizabeth I', known: 'The Armada, the "middle way" religious settlement, and the first English settlers in North America.' },
      { name: 'Sir Francis Drake', known: 'Helped defeat the Spanish Armada, and later sailed around the world.' },
      { name: 'Mary, Queen of Scots', known: 'Became Queen of Scots as an infant; fled to England and was eventually executed.' },
    ],
  },
  {
    name: 'Stuarts, civil war, revolution',
    span: '1603 – 1714',
    summary:
      'The only years without a monarch, and the settlement that ends them. Parliament wins twice — once with an army and once without one — and it is the second time that makes it permanent.',
    events: [
      { year: '1640', title: 'The English Civil War begins', detail: 'Parliament (the Roundheads) against the King (the Cavaliers). Charles I had introduced a Prayer Book that the largely Puritan Parliament would not support.', major: true },
      { year: 'no date given', title: 'Marston Moor and Naseby', detail: "The battles at which the King's army is defeated.", major: false },
      { year: 'no date given', title: 'Charles I is executed', detail: 'England becomes a republic and has no monarch for eleven years.', major: true },
      { year: '1660', title: 'The Restoration', detail: "After Cromwell's death, Charles — then King of Scotland — is invited back as Charles II.", major: true },
      { year: '1665', title: 'The Great Plague', detail: 'Followed the next year by the Great Fire of London.', major: false },
      { year: '1679', title: 'The Habeas Corpus Act', detail: 'Forbids unlawful imprisonment. Still one of the foundations of the rule of law.', major: false },
      { year: '1688', title: 'The Glorious Revolution', detail: "English Protestants, unwilling to have a Catholic king, invite Mary's husband William of Orange to proclaim himself king. He faces no resistance.", major: true },
      { year: '1689', title: 'The Bill of Rights', detail: "Confirms the rights of Parliament and the limits of the king's power. Parliament must be called regularly and elections must be free.", major: true },
      { year: '1707', title: 'The Act of Union', detail: 'Unites the kingdoms of England and Scotland and creates the Kingdom of Great Britain.', major: true },
    ],
    figures: [
      { name: 'Charles I', known: 'The Prayer Book, the Civil War, and the only English king to be executed.' },
      { name: 'Oliver Cromwell', known: 'Titled Lord Protector; led Britain through the years without a monarch.' },
      { name: 'Charles II', when: '1660', known: 'The Restoration. Invited back from Scotland after Cromwell died.' },
      { name: 'William of Orange', when: '1688', known: 'Took the throne in the Glorious Revolution, without resistance.' },
      { name: 'Sir Isaac Newton', known: 'Principia Mathematica, showing how gravity applies to the whole universe; and that white light is made of the colours of the rainbow.' },
    ],
  },
  {
    name: 'Britain forms and industrialises',
    span: '1714 – 1837',
    summary:
      'The country gets its modern shape, its first Prime Minister, and the industry that pays for the Empire. It also loses America and abolishes slavery, in that order.',
    events: [
      { year: '1721', title: 'Sir Robert Walpole becomes the first Prime Minister', detail: 'George I, a German who spoke poor English, relied heavily on his ministers. Walpole serves until 1742.', major: true },
      { year: '1700s', title: 'The Enlightenment', detail: 'New ideas about politics, philosophy and science. Adam Smith in economics and David Hume in philosophy are the Scottish thinkers named.', major: false },
      { year: 'mid-1700s to 1800s', title: 'The Industrial Revolution', detail: "Britain produces more than half the world's supply of cotton cloth, coal and iron. Machinery and steam power.", major: true },
      { year: '1776', title: 'The American colonies declare independence', detail: 'Over taxation.', major: true },
      { year: '1805', title: 'The Battle of Trafalgar', detail: "Nelson defeats the combined French and Spanish fleets, and is killed in the battle. Nelson's Column stands in Trafalgar Square.", major: true },
      { year: '1807', title: 'The slave trade is made illegal', detail: 'Illegal to trade slaves in British ships or from British ports. The Royal Navy then stops the slave ships of other countries.', major: false },
      { year: '1815', title: 'The Battle of Waterloo', detail: 'The Duke of Wellington defeats Napoleon.', major: true },
      { year: '1832', title: 'The Reform Act', detail: 'Abolishes the rotten and pocket boroughs, gives more seats to the towns and cities, and greatly increases the number of (male) voters.', major: true },
      { year: '1833', title: 'The Emancipation Act', detail: 'Abolishes slavery throughout the British Empire. Two million Indian and Chinese workers are later employed to replace the freed slaves.', major: true },
    ],
    figures: [
      { name: 'Sir Robert Walpole', when: '1721–1742', known: 'The first Prime Minister, and the longest-serving.' },
      { name: 'Admiral Horatio Nelson', when: '1805', known: "Trafalgar. Killed in the battle; Nelson's Column commemorates him." },
      { name: 'The Duke of Wellington', when: '1815', known: 'Beat Napoleon at Waterloo. Known as the Iron Duke.' },
      { name: 'William Wilberforce', known: 'The leading abolitionist. The Quakers set up the first anti-slavery groups.' },
      { name: 'Richard Arkwright', known: 'Efficient and profitable factory owner of the Industrial Revolution.' },
      { name: 'Adam Smith and David Hume', known: 'The Scottish Enlightenment — economics and philosophy.' },
    ],
  },
  {
    name: 'Empire and the Victorians',
    span: '1837 – 1901',
    summary:
      'The largest empire in the history of the world, and at home a growing middle class and a reform movement working on the conditions that industry created.',
    events: [
      { year: '1837–1901', title: 'Queen Victoria reigns', detail: 'Britain increases its power and influence abroad and the Empire becomes the largest in world history. The middle classes grow, and reformers improve conditions for the poor.', major: true },
      { year: 'no date given', title: 'The Empire at its height', detail: 'Covers a quarter of the world — India, Australia, and large parts of Africa.', major: false },
      { year: '1889–1902', title: 'The Boer War', detail: 'In South Africa. Harder and more divisive at home than expected.', major: false },
    ],
    figures: [
      { name: 'Queen Victoria', when: '1837–1901', known: 'The Victorian age, and the Empire at its largest.' },
      { name: 'Isambard Kingdom Brunel', known: 'Engineer — bridges, tunnels, railways and ships.' },
      { name: 'Florence Nightingale', known: 'Founder of modern nursing.' },
      { name: 'George and Robert Stephenson', known: 'Pioneers of the railway engine.' },
      { name: 'Sake Dean Mahomet', known: 'Opened the first curry house in Britain, and introduced shampooing.' },
      { name: 'Rudyard Kipling', known: 'Indian-born author and poet; his work reflected the idea of the Empire as a force for good.' },
    ],
  },
  {
    name: 'The twentieth century',
    span: '1901 – 2000',
    summary:
      'Two wars, the vote for women, the end of the Empire and the building of the welfare state. Nearly every question about modern Britain sits somewhere in here.',
    events: [
      { year: 'before 1914', title: 'State pension and free school meals', detail: 'Introduced before the First World War — the first pieces of what becomes the welfare state.', major: false },
      { year: '1913', title: 'Home Rule proposed for Ireland', detail: 'A self-governing Ireland with its own parliament, still part of the UK. The war postpones it.', major: false },
      { year: '1916', title: 'The Easter Rising, and the Somme', detail: 'Irish nationalists rise in Dublin. On the Somme, British forces take about 60,000 casualties on the first day alone.', major: true },
      { year: '1918', title: 'The war ends, and women get the vote', detail: 'The armistice at 11.00 am on 11 November. Women over 30 are given the vote and the right to stand for Parliament, partly in recognition of their war work.', major: true },
      { year: '1921', title: 'Ireland is partitioned', detail: 'A peace treaty splits Ireland in two, after a guerrilla war.', major: true },
      { year: '1928', title: 'Equal suffrage', detail: 'Women get the vote at 21, the same as men.', major: true },
      { year: '1929', title: 'The Great Depression', detail: 'High unemployment, worst in the heavy industries such as shipbuilding. Aviation and the motor industry grow through it.', major: false },
      { year: '1939', title: 'Britain declares war on Germany', detail: 'After the German invasion of Poland. Britain and France declare war together.', major: true },
      { year: '1940', title: 'Dunkirk and the Battle of Britain', detail: 'About 300,000 men are rescued from the beaches by volunteers in small boats. Then the aerial battle over Britain.', major: true },
      { year: '1942', title: 'The Beveridge Report', detail: 'William Beveridge sets out the ideas that become the modern welfare state.', major: true },
      { year: '1944', title: 'The Education Act', detail: 'R A Butler. Free secondary education, and a clear split between primary and secondary.', major: false },
      { year: '1945–1950', title: 'The NHS and social security', detail: 'The welfare state is built.', major: true },
      { year: '1947', title: 'Independence for nine colonies', detail: 'Including India, Pakistan and Sri Lanka. The end of the Empire begins.', major: true },
      { year: '1950s', title: 'Post-war recruitment', detail: 'Labour shortages bring workers from India, Pakistan, the West Indies and what is now Bangladesh.', major: false },
      { year: '1960s', title: 'Liberalisation', detail: 'Increased wealth, and social laws liberalised — abortion and divorce among them.', major: false },
      { year: 'late 1960s', title: 'Immigration restricted', detail: 'New laws require a strong connection to Britain through birth or ancestry. Even so, Britain admits 28,000 people of Indian origin forced to leave Uganda in the early 1970s.', major: false },
      { year: '1973', title: 'The UK joins the EEC', detail: 'What later becomes the European Union.', major: true },
      { year: '1982', title: 'The Falklands', detail: 'Argentina invades the Falkland Islands.', major: false },
      { year: '1997', title: 'Tony Blair and the Labour government', detail: 'Labour is elected and devolution follows.', major: false },
      { year: '1998', title: 'The Good Friday Agreement', detail: 'The Northern Ireland peace process. The Assembly is elected the following year.', major: true },
      { year: '1999', title: 'Devolution', detail: 'The Scottish Parliament and the Welsh Assembly meet for the first time.', major: true },
    ],
    figures: [
      { name: 'Emmeline Pankhurst', known: 'Led the suffrage movement. Chained herself to railings and went on hunger strike.' },
      { name: 'William Beveridge', when: '1942', known: 'The report that led to the modern welfare state.' },
      { name: 'R A Butler', when: '1944', known: 'The Education Act: free secondary education.' },
      { name: 'Margaret Thatcher', known: 'The first female Prime Minister, and the longest-serving of the twentieth century.' },
      { name: 'Sir Alexander Fleming', known: 'Discovered penicillin.' },
      { name: 'Sir Tim Berners-Lee', known: 'Invented the World Wide Web.' },
      { name: 'Sir Christopher Cockerell', known: 'Invented the hovercraft.' },
      { name: 'Alan Turing', known: 'Codebreaking, and the foundations of modern computing.' },
    ],
  },
  {
    name: 'Britain since 2000',
    span: '2000 –',
    summary:
      'Coalition, referendum, departure. Four Prime Ministers in the Brexit sequence, and it is the order of the dates that gets muddled rather than the events.',
    events: [
      { year: 'May 2010', title: 'The first coalition since February 1974', detail: 'No party wins an overall majority. The Conservatives and Liberal Democrats form a coalition, and David Cameron becomes Prime Minister.', major: true },
      { year: '7 May 2015', title: 'A Conservative majority', detail: 'The Conservatives win outright and David Cameron remains Prime Minister.', major: false },
      { year: '23 June 2016', title: 'The referendum', detail: 'The UK votes to leave the European Union by 51.9% to 48.1%.', major: true },
      { year: '13 July 2016', title: 'Theresa May succeeds Cameron', detail: 'David Cameron resigns after the referendum result.', major: false },
      { year: '24 July 2019', title: 'Boris Johnson succeeds May', detail: 'The third Prime Minister of the sequence.', major: false },
      { year: '31 January 2020', title: 'The UK formally leaves the EU', detail: 'Forty-seven years after joining the EEC in 1973.', major: true },
    ],
    figures: [
      { name: 'David Cameron', when: '2010–2016', known: 'The coalition, the 2015 majority, and the referendum he called and lost.' },
      { name: 'Theresa May', when: 'from 13 July 2016', known: 'Took over after the referendum result.' },
      { name: 'Boris Johnson', when: 'from 24 July 2019', known: 'Succeeded May; the UK left the EU on 31 January 2020.' },
    ],
  },
];
