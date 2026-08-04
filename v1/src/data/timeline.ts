/**
 * The chronology — scope line S9, ported verbatim from v0 (D-016).
 *
 * A static reference, not scheduled and not scored. v0's README calls it the thing to read
 * first, and its value is being read end to end: a timeline is a different cognitive tool
 * from the same material broken into individually-scheduled cards.
 *
 * `major` marks the dates v0 highlighted as worth knowing cold. Ported as-is: v0's README
 * says twelve, the data marks nineteen. The data wins, and the discrepancy is v0's.
 *
 * 10 eras, 59 events.
 */

export interface TimelineEvent {
  readonly year: string;
  readonly title: string;
  readonly detail: string;
  readonly major: boolean;
}

export interface Era {
  readonly name: string;
  readonly events: readonly TimelineEvent[];
}

export const TIMELINE: readonly Era[] = [
  {
    name: "Before the Romans",
    events: [
      { year: "10,000 BC", title: "Britain separates from Europe", detail: "Rising seas cut the land bridge. Hunter-gatherers only.", major: false },
      { year: "4000 BC", title: "First farmers arrive", detail: "Stone Age. Skara Brae in Orkney is from this world.", major: false },
      { year: "2500 BC", title: "Bronze Age begins", detail: "Stonehenge. Round barrows. Metalworking.", major: false },
      { year: "800 BC", title: "Iron Age", detail: "Hill forts like Maiden Castle. The language is Celtic.", major: false },
    ],
  },
  {
    name: "Rome",
    events: [
      { year: "55 BC", title: "Julius Caesar invades — and fails", detail: "Twice. He does not stay.", major: true },
      { year: "AD 43", title: "Claudius conquers Britain", detail: "This is the one that sticks. 400 years of occupation begin.", major: true },
      { year: "AD 60", title: "Boudicca revolts", detail: "Queen of the Iceni. Defeated, but remembered.", major: false },
      { year: "AD 122", title: "Hadrian's Wall begun", detail: "Marks the northern limit. Scotland is never conquered.", major: false },
      { year: "AD 410", title: "The Romans leave", detail: "Called home to defend Rome itself.", major: true },
    ],
  },
  {
    name: "Anglo-Saxons and Vikings",
    events: [
      { year: "AD 450+", title: "Angles, Saxons and Jutes arrive", detail: "From northern Europe. England takes its name from the Angles.", major: false },
      { year: "AD 597", title: "St Augustine arrives", detail: "Christianity spreads. He becomes first Archbishop of Canterbury.", major: false },
      { year: "AD 789", title: "First Viking raids", detail: "From Denmark and Norway.", major: false },
      { year: "AD 878", title: "Alfred the Great defeats the Vikings", detail: "King of Wessex. The Danelaw divides the country.", major: false },
    ],
  },
  {
    name: "The hinge",
    events: [
      { year: "1066", title: "Battle of Hastings", detail: "William of Normandy defeats Harold. The single most examined date.", major: true },
      { year: "1086", title: "Domesday Book", detail: "A survey of who owns what.", major: false },
    ],
  },
  {
    name: "Middle Ages — power leaks from the crown",
    events: [
      { year: "1215", title: "Magna Carta", detail: "King John forced to sign at Runnymede. The Great Charter.", major: true },
      { year: "1284", title: "Statute of Rhuddlan", detail: "Wales annexed by Edward I.", major: false },
      { year: "1314", title: "Bannockburn", detail: "Robert the Bruce defeats the English.", major: false },
      { year: "1337", title: "Hundred Years War begins", detail: "Lasts 116 years.", major: false },
      { year: "1348", title: "The Black Death", detail: "Kills about a third of the population.", major: false },
      { year: "1415", title: "Agincourt", detail: "Henry V wins against the odds.", major: false },
      { year: "1455", title: "Wars of the Roses begin", detail: "Lancaster (red rose) against York (white rose).", major: false },
      { year: "1485", title: "Bosworth Field", detail: "Richard III killed. Henry Tudor becomes Henry VII.", major: true },
    ],
  },
  {
    name: "Tudors and the Reformation",
    events: [
      { year: "1509", title: "Henry VIII becomes king", detail: "Six wives follow.", major: false },
      { year: "1534", title: "Break with Rome", detail: "To remarry, not from theology. Church of England created.", major: true },
      { year: "1558", title: "Elizabeth I becomes queen", detail: "Her religious compromise is the \"middle way\".", major: false },
      { year: "1588", title: "The Spanish Armada defeated", detail: "", major: true },
      { year: "1603", title: "Elizabeth dies childless", detail: "James VI of Scotland becomes James I of England.", major: false },
    ],
  },
  {
    name: "Stuarts, civil war, revolution",
    events: [
      { year: "1605", title: "The Gunpowder Plot", detail: "Guy Fawkes caught. Remembered every 5 November.", major: false },
      { year: "1642", title: "Civil War begins", detail: "Cavaliers for the King, Roundheads for Parliament.", major: false },
      { year: "1649", title: "Charles I executed", detail: "Cromwell rules as Lord Protector.", major: true },
      { year: "1660", title: "The Restoration", detail: "Charles II returns.", major: false },
      { year: "1665-66", title: "Plague, then the Great Fire", detail: "Wren rebuilds St Paul's.", major: false },
      { year: "1688", title: "The Glorious Revolution", detail: "William of Orange invited. Parliament outranks the monarch.", major: false },
      { year: "1689", title: "Bill of Rights", detail: "", major: false },
    ],
  },
  {
    name: "Britain forms and industrialises",
    events: [
      { year: "1707", title: "Act of Union with Scotland", detail: "Creates the Kingdom of Great Britain.", major: true },
      { year: "1721", title: "Robert Walpole, first Prime Minister", detail: "", major: false },
      { year: "1746", title: "Culloden", detail: "The last Jacobite rising crushed.", major: false },
      { year: "1776", title: "American independence declared", detail: "Accepted by Britain in 1783.", major: false },
      { year: "1801", title: "Act of Union with Ireland", detail: "Creates the United Kingdom.", major: false },
      { year: "1805", title: "Trafalgar", detail: "At sea. Nelson wins and dies.", major: true },
      { year: "1807", title: "Slave trade abolished", detail: "Slavery itself abolished across the Empire in 1833.", major: false },
      { year: "1815", title: "Waterloo", detail: "On land. Wellington defeats Napoleon.", major: true },
      { year: "1832", title: "The Reform Act", detail: "Rotten boroughs abolished, franchise widened.", major: false },
    ],
  },
  {
    name: "Empire and the Victorians",
    events: [
      { year: "1837", title: "Victoria comes to the throne", detail: "Reigns until 1901.", major: false },
      { year: "1851", title: "The Great Exhibition", detail: "", major: false },
      { year: "1853-56", title: "Crimean War", detail: "Florence Nightingale goes to Turkey in 1854.", major: false },
      { year: "1899-1902", title: "The Boer War", detail: "In South Africa.", major: false },
    ],
  },
  {
    name: "The twentieth century",
    events: [
      { year: "1914-18", title: "First World War", detail: "The Somme, 1916. Ends 11am, 11 November 1918.", major: true },
      { year: "1918", title: "Some women get the vote", detail: "Over 30, with a property qualification.", major: true },
      { year: "1928", title: "Equal suffrage", detail: "All women at 21, same as men.", major: true },
      { year: "1928", title: "Fleming discovers penicillin", detail: "", major: false },
      { year: "1939-45", title: "Second World War", detail: "Dunkirk and the Battle of Britain both 1940. D-Day 6 June 1944.", major: true },
      { year: "1948", title: "The NHS is founded", detail: "Following the Beveridge Report of 1942.", major: true },
      { year: "1949", title: "NATO founded", detail: "", major: false },
      { year: "1973", title: "UK joins the EEC", detail: "", major: false },
      { year: "1979", title: "Thatcher becomes PM", detail: "Britain's first woman Prime Minister.", major: false },
      { year: "1998", title: "Good Friday Agreement", detail: "", major: true },
      { year: "1999", title: "Devolution", detail: "Scottish Parliament, Welsh Assembly, NI Assembly all first sit.", major: true },
    ],
  },
];
