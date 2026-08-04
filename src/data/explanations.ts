/**
 * A short paragraph of context for each fact, shown on the card **after** you answer.
 *
 * The point is to make drilling teach understanding rather than just answers. A date you
 * can place in a story survives far longer than a date you have memorised, and most exam
 * questions are answerable from context even when the specific fact has gone. So these say
 * *why* the answer is what it is, or what it connects to — they do not restate it.
 *
 * Kept as a separate map rather than a field on each fact, for three reasons: authoring is
 * a flat editable list instead of 443 scattered edits, coverage is countable at a glance,
 * and the deck files stay unchurned while this fills in.
 *
 * Coverage is partial and growing. A fact without an entry simply shows nothing extra —
 * which is why this is a map rather than a required field.
 */

export const EXPLANATIONS: Readonly<Record<string, string>> = {
  // ======================================================================
  // Chapter 1 — the values and principles of the UK
  // ======================================================================
  f201: 'These five are the backbone of the whole first chapter, and questions often ask you to spot which of four things is NOT one of them. Learn them as a set — democracy, the rule of law, individual liberty, tolerance, and participation — rather than one at a time.',
  f202: 'Democracy here means specifically that power comes from elections rather than from force or inheritance. It is worth contrasting with the monarchy: the King is head of state but does not rule, precisely because the government is the elected part.',
  f203: 'The phrase that matters is "including those in power". Plenty of countries have laws; the rule of law means no one is above them — not the Prime Minister, not the police, not the King. Magna Carta in 1215 is where the handbook traces this idea from.',
  f204: 'The qualifier "within the law" is doing the work. This is not freedom to do anything, but freedom from being told what to think, believe or say by the state — which is why it sits next to freedom of religion in the list of freedoms.',
  f205: 'Note it is tolerance of people who *hold* different beliefs, not agreement with the beliefs themselves. The handbook pairs this with Britain being one of the world\'s most diverse societies — the principle exists because the diversity does.',
  f206: 'This is the only one of the five that asks something *of* you rather than protecting you. It connects directly to the last chapter of the book — jury service, volunteering, school governors, voting — which is why those topics come up so often.',
  f207: '"Or none at all" is the part people miss. The freedom protects atheists and the non-religious exactly as much as it protects believers, which is what distinguishes it from a state that simply tolerates several official religions.',
  f208: 'The listed grounds — race, sex, religion and others — are what UK equality law actually enumerates. If a question describes someone treated worse for one of those reasons, this is the freedom being tested.',
  f209: 'A fair trial is a right, not a privilege, and it does not depend on citizenship: it applies to anyone accused in the UK. This is the rule of law made concrete — the state has to prove its case in front of an independent court.',
  f210: 'Two requirements, and questions like to test that you know there are two. Language ability and knowledge of British life are assessed separately: one by an English qualification, the other by this test.',
  f211: 'Worth knowing the name formally, because the handbook distinguishes the *test* from the *book*. The book is "Life in the United Kingdom: A Guide for New Residents"; the test is drawn from it.',
  f212: 'B1 is the Common European Framework level for an independent user — able to handle everyday conversation, not fluency. It is equivalent to ESOL Entry Level 3, which is the phrasing the handbook uses.',
  f213: 'The exemption is at both ends of life, not one. Under 18s are excused because they are not applying in their own right; those 65 and over because the requirement was judged unreasonable at that age.',
  f214: 'The ceremony is a legal requirement, not a formality — you are not a citizen until you attend. That is why the next few facts are about who runs it, when, and what you say there.',
  f215: 'Local authorities run the ceremonies because citizenship is deliberately framed as joining a *community*, not just acquiring a document. It is the same reasoning behind "participation in community life" being one of the five principles.',
  f216: 'Three months is the window, and questions sometimes offer six or twelve as distractors. The clock starts at the decision on your application, not at your application date.',
  f217: 'Two separate declarations. The oath is loyalty to the monarch; the pledge is loyalty to the UK — its rights, freedoms and laws. Knowing there are two, and that they are different things, is usually enough.',
  f218: 'An affirmation is legally identical to an oath; it simply removes the reference to God. This exists because freedom of belief includes the freedom to have none — the principle and the practice line up.',
  f219: 'The certificate is the proof of citizenship, and it is handed over at the ceremony rather than posted. It is what you would later use to apply for a British passport.',

  // ======================================================================
  // Chapter 2 — what is the UK?
  // ======================================================================
  f220: 'The full name tells you the structure: "Great Britain" plus "Northern Ireland". Almost every geography question in this chapter is answerable from that one sentence if you understand what each part covers.',
  f221: 'Four countries, one state. This is the distinction the chapter keeps testing — the UK is a single sovereign country made up of four constituent countries, which is unusual and is why it needs explaining.',
  f222: 'Great Britain is the *island* plus its associated islands, so it is the three countries that sit on it. Northern Ireland is on a different island, which is the whole reason the term excludes it.',
  f223: 'This trips people up constantly. Northern Ireland is in the United Kingdom but not in Great Britain — geography, not politics. If a question offers "Great Britain" as an answer about all four countries, it is wrong.',
  f224: 'The British Isles is a *geographical* term, wider than the UK: it takes in the Crown dependencies too. Note the pattern — British Isles is geography, United Kingdom is a state, Great Britain is an island.',
  f225: 'The Republic of Ireland is a fully independent country and has been since 1922. It shares the island with Northern Ireland but nothing constitutional — this is the single most important thing to keep straight in this chapter.',
  f226: 'Crown dependencies have their own governments and their own laws. They are linked to the Crown, not governed by Westminster, which is exactly what "dependency" is meant to convey.',
  f227: 'A flat no, and it follows from the previous fact: if they had their own parliaments and were part of the UK, they would be devolved administrations instead. They are not.',
  f228: 'Jersey and Guernsey are the two largest and the two the handbook names. Both sit off the coast of France, which is a useful hook for remembering they are not part of the UK.',
  f229: 'Overseas territories are linked to the UK but are not part of it, and are a separate category from the Crown dependencies. Gibraltar, Bermuda and the Falklands are the ones most likely to appear.',
  f230: 'The Falklands are the example the handbook uses. If a question lists somewhere far from Britain that is nonetheless British, it is almost certainly an overseas territory rather than part of the UK.',
  f231: 'Edinburgh, not Glasgow — Glasgow is the larger city, which is exactly why it makes such a tempting wrong answer. The Scottish Parliament sits at Holyrood in Edinburgh.',
  f232: 'Cardiff is both the capital and the seat of the Welsh government. Worth pairing with the fact that the Senedd has 60 members, since both come up in the devolution questions later.',
  f233: 'Belfast is where the Northern Ireland Assembly sits, at Stormont. The four capitals — London, Edinburgh, Cardiff, Belfast — are worth learning as a set with their devolved bodies.',
  f234: '"Union Jack" is the everyday name; "Union Flag" is the formal one. Both are accepted in ordinary use, and a question may use either, so recognise them as the same thing.',
  f235: 'Three crosses, for England, Scotland and Ireland. Once you know it is three rather than four, the follow-up question — why no Welsh emblem — almost answers itself.',
  f236: 'St George\'s cross is the simplest: upright, red on white. It is the one you see on its own at England football matches, which makes it the easiest of the three to place.',
  f237: 'St Andrew\'s is the diagonal white cross on blue — the Scottish saltire. Blue background is the giveaway; it is the only one of the three with a coloured field.',
  f238: 'St Patrick\'s cross is diagonal like St Andrew\'s but red on white. The two diagonals are the pair people confuse, so fix the colours: Scotland white-on-blue, Ireland red-on-white.',
  f239: 'Because Wales had already been annexed to England by the Statute of Rhuddlan in 1284, long before the flag was assembled. Wales was not treated as a separate kingdom to represent — which is why the red dragon flies on its own flag instead.',
  f240: 'The red dragon is one of the oldest national flags still in use, and it exists precisely because Wales is absent from the Union Flag. The two facts explain each other.',
  f241: 'Each of the four countries has its own patron saint and its own day. Learn them as four pairs rather than eight separate facts — the saint and the date always come up together.',
  f242: 'St Andrew was one of the apostles, and his diagonal cross is the origin of the Scottish saltire. The flag and the saint are the same fact seen from two directions.',
  f243: 'St David is the only one of the four who was actually from the country he is patron of. That makes him easy to remember, and 1 March is the earliest of the four dates.',
  f244: 'St Patrick is patron of the whole island of Ireland, not just Northern Ireland — which is why his day is celebrated on both sides of the border and around the world.',
  f245: '1 March, and it is the first of the four in the calendar. The order through the year runs David, Patrick, George, Andrew — March, March, April, November.',
  f246: '17 March. Along with St Andrew\'s Day it is an official holiday, which is a detail the handbook draws attention to and questions like to test.',
  f247: '23 April, and notably *not* a public holiday in England — which is the point of the question about which patron saints\' days are official holidays.',
  f248: '30 November, the last of the four. It is an official holiday in Scotland, pairing with St Patrick\'s Day in Northern Ireland.',
  f249: 'Only two of the four. England and Wales do not get a holiday for their patron saints, which surprises people and is exactly why it is asked.',
  f250: 'Gaelic survives mainly in the Highlands and Islands — the parts of Scotland furthest from English influence. It is a Celtic language, related to Irish rather than to English.',
  f251: 'Ulster Scots sits alongside Irish Gaelic in Northern Ireland. The question usually asks you to name the *other* one, so knowing there are two is half the answer.',
  f252: 'Cornish is Celtic, closer to Welsh and Breton than to English. Its inclusion makes the point that Britain\'s Celtic languages were never confined to Scotland, Wales and Ireland.',
  f253: 'The handbook\'s population table is worth glancing at as a shape rather than a list: about 40 million in 1901, 50 million by 1951, and roughly 67 million now. England holds 84% of it.',
};

/** How many facts currently carry an explanation. Used by `deck:report`. */
export const EXPLANATION_COUNT = Object.keys(EXPLANATIONS).length;
