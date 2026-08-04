# Life in the UK — drill app

**410 facts. 1,228 question forms.** Flashcards, multiple-choice quiz, and a chronology. Works on an iPhone, costs nothing, remembers your progress.

**Two files.** `index.html` and `facts.js`. That's the whole thing — no build step, no dependencies, no framework.

---

## The one design decision that matters

Each fact is asked **about three different ways**. Same fact, different question shape, different distractors — a direct question, a reversed one, a cloze, a "which of these was *not*", a scenario.

But **the fact is the scheduling unit, not the question.** There is one SM-2 schedule per fact. Each time a fact comes round, the app serves whichever of its forms you've proven least, and never the same one twice running.

This is the difference between knowing the material and knowing the quiz. If three phrasings were three independent cards you'd get triple the reviews for no extra learning, and you could end up fluent in one phrasing while failing another — which is exactly what happens to people who grind the practice sites and then fail the real thing.

The green dots on every card show how many of that fact's forms you've got right.

---

## Getting it onto your phone

The app stores progress in browser storage, which only works properly from a real web address. So it needs to be online — two minutes, no cost.

### The easy way

1. Go to **vercel.com/new**
2. Drag the whole `lituk` folder onto the page
3. Vercel gives you a URL like `lituk-something.vercel.app`
4. Open that on your iPhone, tap Share → **Add to Home Screen**

It now behaves like an app — full screen, no address bar, works offline once loaded.

### The command-line way

```powershell
npm i -g vercel
cd "C:\Users\jlope\Documents\Claude\Projects\Passport Application\02-koll\lituk"
vercel
```

Accept the defaults. `vercel --prod` afterwards promotes it to the main URL.

**Why not just open the file?** Safari treats files opened from your phone's storage as having no origin, so it won't reliably keep your progress. You'd lose your scheduling every time you closed the tab. Hence the deploy.

---

## The four tabs

**Cards** — recall practice. Question, reveal, grade yourself honestly. Where the learning happens. Negatively-framed forms ("which was *not*…") are excluded here — they only make sense with options on screen — so they appear in Quiz only.

**Quiz** — four-option multiple choice, the real exam format. Feeds the same schedule, so work done here counts.

**Timeline** — the chronology. Ten eras, twelve dates worth knowing cold in orange. Read this first.

**Progress** — how much is solid, how many *forms* you've proven, what's due over the next five days, your problem facts, and the two load dials.

---

## How the scheduling works

**SM-2**, the algorithm behind Anki, with five deliberate additions.

**The core.** Every fact carries an ease factor starting at 2.5. Recall it and the gap grows — 1 day, then 6, then multiplied by ease each time, out to months. Hard grows it by only 1.2×. Easy adds 0.15 to the multiplier. You only ever see a fact just before you'd have forgotten it.

**1. The breadth gate.** A fact **cannot go past 6 days** until you've answered it correctly on a *second* phrasing, and **cannot go past 30 days** until every phrasing is proven. This is the lock that stops you banking a long interval on one memorised sentence. It's the reason the deck is built this way at all.

**2. Lapses reset the fact, not just the form.** Miss any phrasing and the whole fact resets, ease drops 0.2, and that form's credit is cleared so it has to be re-earned. Knowing two of three ways isn't knowing it.

**3. Relearning is spaced, not instant.** A missed fact comes back **later in the same session — after about three other facts** — not immediately. Re-answering something still echoing in your short-term memory teaches nothing; a short gap forces actual retrieval.

**4. Post-lapse resume.** When a lapsed fact re-graduates it doesn't start from scratch. It resumes at **35% of the interval it had before the lapse**. You slipped on something you half-knew; the schedule shouldn't pretend you've never seen it.

**5. Leech taper and fuzz.** Three lapses or more and every future interval is permanently cut by 40%, so stubborn facts keep surfacing. And every interval gets ±5% jitter, so a heavy study day doesn't come back as a single 200-card spike three weeks later.

**Grade honestly.** Good means you knew it. Marking Good when you nearly got there is the one way to break this.

### What the load actually looks like

Simulated over 60 days at 40 new facts/day with a 72% first-time recall rate: peaks around 170 reviews on day 8–10, drops below 40/day by day 20, and settles under 15/day by week six. At the default 20/day it's roughly half that. All 410 facts reach "proven every way" inside two months.

---

## The deck

| Chapter | Facts |
|---|---|
| A long and illustrious history | **201** |
| The UK government, the law and your role | 79 |
| A modern, thriving society | 77 |
| What is the UK? | 34 |
| The values and principles of the UK | 19 |
| **Total** | **410** |

Weighted to history deliberately — roughly 45% of the marks and by far the hardest to retain. Across 82 topic tags. 1,228 question forms in total (three per fact, bar two).

**12 facts are marked "check the book"** in amber. These may have shifted since the handbook was written in 2013 — population figures, seat counts, small-claims limits, the number of EU states, the monarch. **The examinable answer is always the book's, even where it's now out of date.** Check those twelve against your copy and correct them in `facts.js` if they differ. Everything else is stable historical and civic fact.

---

## Suggested use

**Now to 28 August, in Spain.** Read the Timeline tab a few times. Do the ten-era drill — cover the screen, say them aloud in under two minutes. Once a day. Start Cards at 20 new per day if you feel like it; no pressure.

**1–7 September.** Cards daily. Read Chapters 1, 2, 4 and 5 of the book alongside.

**8–18 September.** Cards every morning, Quiz in the evening. Take the free mock exams at lifeintheuktestweb.co.uk to calibrate — but never let a crowd-sourced answer there override the book or the official app.

**Week of 22 September.** Reviews only, no new facts. Drop the new-facts slider to its minimum.

**Friday 25 September.** Life in the UK 10:00, Hammersmith. Trinity 15:00, Fulham Palace Road.

---

## Editing

`facts.js` is a plain array:

```js
FACTS[i] = [tag, chapter, verifyFlag, canonicalQuestion, canonicalAnswer, forms]
form     = [question, ["o0","o1","o2","o3"], correctIndex, mcqOnly]
```

`correctIndex` is 0-based. `chapter` is 1–5. `verifyFlag` is 1 for the amber facts. `mcqOnly` is 1 for forms that don't work as recall cards (negative framings, "which of these is correct"). Add or remove forms freely — the app reads however many are there, and the breadth gate adjusts to the count. Redeploy to publish changes.

Progress is stored under the key `lituk.v2`. The old 410-card version used `lituk.v1`, so upgrading starts you fresh — deliberately, since the scheduling unit changed.

---

*Questions written from scratch to test factual knowledge. Facts aren't copyrightable and nothing here reproduces the handbook's text. The handbook remains the only examinable source — this is a drilling tool, not a substitute for reading it.*
