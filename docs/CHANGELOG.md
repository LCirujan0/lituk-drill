# CHANGELOG

An entry for every working day that has commits.

## 2026-08-11 (night) — the simulation reads the daily target instead of restating it

**The 60-day run was hard-coded at 40 new facts a day.** `DAILY_TARGET` moved 30 → 50 on 10 August
(D-035), and the published curve — peak 187 on day 9 — quietly stopped describing the app while
every assertion in the file kept passing. HANDOFF had been carrying a note saying the numbers were
stale, which is a documentation patch over a test that had stopped measuring the product.

**Reading the constant is the fix**, so the next move takes the curve with it and the numbers are
re-measured by the suite rather than by someone remembering to.

**Re-run at 50: peak 242 on day 10**, means 161 / 112 / 56 / 43 across days 0–9, 10–19, 20–41,
42–59, 4,751 reviews, 559/559 started, 551 proven on every phrasing, 469 mature. **The queue
drains every single day**, which is asserted — so 50/day is sustainable on this deck rather than
merely survivable.

Against the 40/day run: the peak is up about 30% and lands a day later, and the first fortnight is
the whole of the cost — days 20 onward are comparable. That is the trade D-035 accepted, now
measured rather than predicted, and it is the number C6 has to be judged against.

## 2026-08-11 (night) — the DPIA screening re-run, and a disclosure only the owner can accept

**D-034's own terms require this before any C8 code**, and it is the kind of prerequisite that
gets skipped because the answer looks obvious. The original screening concludes UK GDPR does not
engage *because nothing leaves the device and nothing identifies anyone*. C8(a) breaks the first
half of that sentence, so the conclusion was re-derived rather than assumed.

**It comes out the same way, and not for the same reasons.** The domestic-purposes exemption
survives the change untouched — processing by a natural person in a purely personal activity, sole
data subject and sole controller, no second data subject at any point. No DPIA arises, and none of
the ICO's high-risk criteria are met.

**But the honest version has a second half.** In isolation the request is a citizenship-test
question and a wrong answer, with nothing to single anyone out by. At the provider it arrives with
an API key belonging to an identifiable account holder — so the provider holds a pairing this app
never had. And the content discloses, by inference, that the account holder is studying the Life
in the UK test, which almost always means applying for settlement or citizenship. **That is the
one subject D-007 closed a one-way door on.** D-007 governs storage and this is disclosure, so it
is not a breach of that decision; it lands on the fenced topic all the same, and filing it under
"no personal data" would be true and misleading at once. **Raised as L-040, and it is not mine to
close** — `risk-accepted` is the owner's alone.

**Five conditions, and the screening is void if any stops holding:** no review history leaves; no
identifier is added; nothing generated is stored into the deck, the schedule or the readiness
model; provider training and retention are turned off where the account offers it, and checked
rather than assumed; and the app works with no network and no key.

**R-8 is narrowed rather than quietly ignored**, which is the entire reason a rule change needs a
decision first. It read "no personal data, ever" *and no third party*, flatly. One third party is
now permitted — a model API, for explanation only, under those five conditions. Any other third
party, or any condition failing, still needs its own entry.

**One thing the screening did not cover and the build would have hit on day one.** D-034 says the
model must be given *the handbook passage* and told the handbook wins. The handbook lives in
`.work/`, gitignored, Crown copyright — and a server route needs it at runtime, which means
shipping it. That is a licensing decision, not an implementation detail, and it is not one to make
in passing. The alternative needing no new permission: ground the model on **the deck's own answer
and explanation panel**, which is our text, and tell it that answer is authoritative. That keeps
"the handbook wins" in substance, which is the part that matters — the Council of Europe has 46
members, the book says 47, the deck says 47, and an explainer that "corrects" that is worse than
no explainer.

The data inventory gains its row. Code for C8(a) is unblocked; the disclosure and the
grounding choice are not.

## 2026-08-11 (evening) — the referred answers become a list he can finish

**24 answers, written up as `docs/REFERRED-ANSWERS.md`.** They were sitting in a `.work` JSON file
that is gitignored, which meant the one item genuinely blocked on the owner was the one item he
could not see.

**Nothing was changed, and the sheet says why in its first paragraph.** A referral is not a
finding. The audit agents were never told the D-031 delta list exists (L-037), so a crude
word-presence pass rated `f391` **strong retire** — a fact the owner personally confirmed against
his 2026 edition, where the extracted PDF is known-wrong. It is marked **DO NOT RETIRE** in the
table. The evidence column is a grep against the proxy, not against the book that is the
authority, so "0 hits" is strong evidence and not proof.

**Three of the 28 were already retired** on 10 August and are marked as such — a review list that
still asks about retired facts is a list that does not get finished, which is L-027's lesson.

**The counts in HANDOFF were wrong and are corrected rather than carried.** That line has read 40
and then 33; the file holds 28, of which 24 are live, and neither earlier figure is reproducible
from it.

## 2026-08-11 (evening) — L-036 upheld, and the same defect found under a second name

**L-036 re-derived independently and upheld.** The row asks for this in unusually strong terms:
the calendar-date exclusion was written while the numeric ratchet was failing, and fixing it is
what turned the build green — *"a measurement change that unblocks its author's own commit
deserves the most scrutiny available."* So it was re-derived from the definition in a standalone
script importing nothing from `analysis.ts`, because re-running the author's own code proves
nothing about the author's own judgement.

**Three questions, all answered in the change's favour.**

1. **Over-exclusion?** No. All 22 excluded sets were read individually and every one is genuinely
   four `<day> <Month>` strings. Nothing legitimate was removed.
2. **Would a looser rule read differently?** Yes, and worse. A rule matching a month name
   anywhere wrongly catches `f399[2]` — *"You may drive a car from the age of 17"* — because
   **May** is a month. The narrow leading-`<day> <Month>` test is the better rule, not merely an
   adequate one.
3. **Did the exclusion do the work that turned the build green?** On the on-screen figure,
   partly — the excluded sets are middle-ranked at 63.6% against roughly 50% for generated forms.
   That is the honest reason and it is legitimate: a day number is not a magnitude, so those
   forms could never carry the tell. Note the opposite sign on the **stored** figure, which the
   exclusion moves 86.35% → 87.66% — it makes that number *worse*, which is not how a
   self-serving change behaves.

The row's count is one high: 22 excluded and 381 kept, against 23 and 382. The live report agrees
with 381. **L-036 → `verified-fixed`**, by a session that did not make the change.

**The probe for other unit mismatches is what earned the re-derivation.** Clock times have
exactly the same defect and the exclusion never covered them: "1 pm" reads as **1** and ranks
*below* "11 am", two hours earlier. `f154[1]` offered `11 am | 9 am | 10 am | 1 pm` and was
recorded as **not** a middle value, while a reader sees the answer third of four — the metric
understating itself, which is the flattering direction.

**And this session had made it worse a few hours earlier.** The L-033 fix replaced `f511[0]`'s
"12 noon" with "2.00 pm", creating a third instance and moving the headline 52.4% → 52.1%. That
0.3 points was entirely artefact. Declining to tighten the ceiling on it was the right call for
the wrong reason.

**Asserted, not excluded — that distinction is the whole finding.** Excluding these forms would
shrink the denominator again, which is the move L-036 is under review for. The options were fixed
instead: all three sets now sit in one half of the day, so the parsed rank and the perceived rank
are the same number, the forms stay measured, and **the headline returned to 52.4%**. The record
was already "not middle" and is now true rather than lucky. `mixedMeridiemNumericSets` asserts
zero and was run against broken code first. Raised as L-039.

## 2026-08-11 (later still) — the deferred list named two, the class had thirty-seven

**Applying two `mcqOnly` items from `.work/apply-deferred.json` turned up a class of 37.** The
file holds 15 entries; `mcqOnly` was the right treatment for two of them (`f206[2]`, `f355[2]`).
Sweeping for the construction rather than fixing the two instances found **37 forms whose stem
cannot resolve without options on screen while being served as free recall** — a dangling
referent every time: "which of these", "which statement", "which set is correct".

**This is not cosmetic.** In recall mode the reader sees the stem alone, reveals, and self-grades.
*"Which of these took place in 1215?"* with nothing on screen is graded on whatever came to mind.
Recall is the **only** evidence D-013's recall readiness figure accepts, so 37 forms were queued
to feed noise into the one number designed to be clean — and it would have arrived silently the
day S4 was built. Fixing the two named instances would have closed them and left the class, which
is the L-034 mistake.

**30 flipped at no cost.** Every one of those facts keeps at least two recall forms, so
`factsWithNoRecallForm` and `factsBelowRecallBreadth` both held — no ceiling moved.

**Seven deliberately not flipped, and this is the substance of the entry.** Flipping them buys a
clean measurement by destroying the material it measures: f357 and f367 would be left with **no
recall form at all**, and five more drop to one, taking `factsBelowRecallBreadth` from 6 to 10 and
requiring its ceiling to be raised for the change to pass. **Raising a ceiling so your own commit
goes green is precisely the move L-036 exists to flag.** They want a recall-usable form appended
first, which is authoring work and belongs in the pass that adds forms.

**The exact set is asserted, not a count** — seven would pass if one were fixed and a new one
introduced the same day, which is the failure a bare number always has. Run against broken code
first: un-flipping f037[2] fails it.

**A defect in the deferred file itself, worth recording.** Its note on `f206[2]` says *"schedule
keying is by Fact.id and form position, not question text, so rewording in place is safe."* That
is true about crashes and false about the thing that matters: `ok[formIndex]` is keyed by
position, so rewording form N keeps credit earned on a sentence that no longer exists. The BRIEF's
C1 no-go says so in those words. Nothing here was reworded in place.

**Nine entries in that file need the owner and were not applied** — see the note below.

## 2026-08-11 (later) — eleven of the twelve were not defects

**The twelve self-contradicting forms were read, and the count was close to backwards.** L-033
assumed most were the deck teaching its own negation. Eleven are correct design; one was real.

**The real one: `f511[0]`.** It offered **"12 noon"** as a wrong answer to *"From what time do
pubs usually open during the day?"* The handbook's sentence is *"usually open during the day from
11.00 am (12 noon on Sundays)"* — the stem does not exclude Sunday, so a reader who had learned
the parenthesis met their own knowledge marked wrong. Fixed by replacing the **distractor**, not
the stem: breadth credit is keyed by form position, so rewording in place keeps credit earned on
a sentence that no longer exists.

**The other eleven split two ways.** Nine are two forms asking genuinely different questions —
William is the heir apparent and not the 2022 monarch; 1922 is the BBC's radio year and 1936 its
television one — where the flagged distractor is exactly the discrimination the fact exists to
teach. Two are **negative stems**: *"which of these is NOT a UK coin?"* has true statements as its
distractors by construction, so every one of them will be some other form's correct answer. The
check reads strings and is structurally blind to the inversion.

**Ratcheting at eleven was rejected, and that is the substance of this change.** A ceiling of
eleven would let the twelfth real defect arrive as a count of twelve reading "no regression" —
hidden inside the noise it was ratcheted against. So the eleven are declared one by one with
their reasons in `src/domain/deck/contradictions.ts`, following the `divergences.ts` pattern
D-023 established for the same shape of problem, and the build now **asserts zero in both
directions**: nothing undeclared, and no declaration for a contradiction the deck no longer
produces. The second half is what stops the list rotting into a suppression file.

Auto-exempting negative stems was the tempting two-line version and was rejected: it would
silently excuse a future NOT-form carrying a genuine defect, and nobody would look again.

**Both assertions were run against broken code before being trusted** — reinstating "12 noon"
fires the first, a declaration for a contradiction that does not exist fires the second.

**A side effect, recorded rather than claimed:** the on-screen numeric tell moved 52.4% → 52.1%,
because that form's answer stopped being a middle value. The ceiling was **not** tightened to
match. This is the metric L-036 is under review for, and tightening it here would be precisely
the move L-036 exists to flag.

> **Corrected the same day.** That 0.3 points was **entirely an artefact I introduced.** The
> replacement distractor was "2.00 pm", which the metric's parser reads as **2** — so the answer
> "11.00 am" ranked largest of four and stopped counting as a middle value, while a reader sees
> 9, 10, 11, 2pm and the answer sits third. Found by the independent L-036 re-derivation an hour
> later, fixed by moving the distractor to "8.00 am", and **the headline returned to 52.4%**.
> Declining to tighten the ceiling was the right call for the wrong reason. Raised as L-039.

## 2026-08-11 — twelve bands, and a bar that says which kind of progress (C4/C5)

**Twelve bands over the 87 tags, and both cuts stay drillable.** "History" is 220 facts, so
drilling it means drilling all of it; 87 tags is a picker rather than a study aid. A band is a
group of tags — twelve of them, 30–54 facts each, mean 44. The owner's requirement was explicit:
a chapter is *not* replaced by its bands, so **every fact belongs to exactly one chapter and
exactly one band, and both partitions satisfy R-12 independently**. Five tags span chapters
(`Media` spans three), which is why a band is not a sub-chapter and why the mapping is keyed by
tag rather than derived from a chapter number.

**The BRIEF's first cut did not survive re-derivation.** It summed to 533 only because it assigned
`Devolution` and `Europe` to two bands each — a table that double-assigns a tag partitions
nothing. The shipped cut sums to 530 exactly and is now the one in the BRIEF, with the draft's
error recorded rather than tidied away.

**`Science` was found by the test on its first run.** The tag is carried only by two retired facts
(f105 Newton, f148 Darwin), so it contributes nothing to any count — and it would have been
missed entirely by a check that looked only at `ACTIVE`. A tag that exists only on retirements is
exactly the one nobody thinks to map when the sweep reuses it, so `bands.test.ts` asserts the
table and the deck share one vocabulary in **both** directions: no tag without a band, and no band
entry for a tag no fact carries.

**Every row now shows three numbers, not one.** A chapter half mastered and a chapter half
attempted-and-failing used to draw the same bar. Mastered and mistakes are painted over the
untouched track, so the three shares sum to the whole bar with no rounding gap at the join, and
the same partition feeds both cuts through one tally function — two functions that happen to
agree is what made the home screen incoherent in the first place (D-032).

**Colour is not the only carrier, and that needed measuring rather than asserting.** Green against
red is **1.43:1**, the worst pair on the screen and a straight WCAG 1.4.11 failure. A
surface-coloured rule now separates the segments (5.19:1 dark, 3.27:1 light) and also carries the
mastered/untouched edge, which measured 2.92:1 in light; the mistakes segment is hatched as well
as coloured; and each row's accessible name spells out all three figures as words. The cut
toggle's unselected label was `--c-text-muted` on `--c-fill` — **3.12:1, which is L-034 exactly**
— and was moved to `--c-text-soft` before it shipped rather than added to the pile.

**Measured at 402×874, and the one miss is recorded rather than restated.** The BRIEF wanted
twelve rows to fit. They fit only by taking each below `--target-min`, which trades an
accessibility rule for a navigation one — so the rows keep their 44px and **8 of 12 are fully
visible, with the last four behind a scroll inside a frame that still does not scroll**. Five
chapter rows are unchanged at 85px with no slack, which is what keeps D-033's black band closed.

**Both new test groups were run against broken code before being trusted** — a band queue that
ignored its band, and a row that used the deck as its denominator. Eight assertions failed; all
eight are the ones that matter. 281 → 309 tests.

**Two bands sit within two facts of the 55 ceiling**, so the C6 sweep will hit that test rather
than silently overfilling a band. The intended response is to split a band, not to raise the
number.

## 2026-08-10 (later) — the roadmap gets its answers, and a near-miss on two facts

Ten questions answered, so the roadmap stops being conditional. **50 facts a day, up from 30**
(D-035), because a ~700-fact deck at 30/day needs 24 days just to show every fact once. The
60-day simulation was run at 40 and its numbers are now stale in the wrong direction — flagged in
HANDOFF rather than quietly left.

**The AI layer is (a) only** (D-034 accepted): explain why the option you picked is wrong, given
the handbook passage. Free-form testing was named and rejected by the owner, not merely left
unbuilt. Two things must happen before it ships — the DPIA screening is re-run, because its
conclusion rests on nothing leaving the device, and the model is told **the handbook wins**. The
book says the Council of Europe has 47 members; it has 46; the deck says 47. An explainer that
"corrects" that is worse than no explainer.

**Mocks are both kinds** (D-036): 20 fixed tests meant to be retaken, plus custom ones drawn from
unseen forms. The distinction is load-bearing — a retaken fixed test is contaminated by
definition, so fixed scores may be trended and **may never calibrate readiness**.

**And the near-miss.** The audit referred 36 answers to the owner. He said remove. An independent
word-presence check found exactly two whose answers share no distinctive word with the handbook —
`f098` (1651) and `f391` (1985) — which reads as an open-and-shut retire. **Both are facts the
owner personally confirmed against his own 2026 edition**, recorded in L-031 as settled D-031
deltas where the extracted proxy text is known to be wrong. Retiring them would have deleted two
correct facts *because the proxy disagrees with the authority* — R3 running exactly backwards.

The audit agents were never told the D-031 delta list exists. Logged as **L-037**, and the
tripwire it wants is that the settled-deltas list should be data in the deck rather than prose in
a ledger row.

**So three facts were retired, not 36**: f215, f216 and f219, the citizenship-ceremony trio, each
re-grepped by hand first. The handbook gives no ceremony deadline ("months" appears once, about
driving licences), never says who organises one, and describes nothing being handed over
("certificate" appears twice, for test centres and an MOT). Two of the three carried no `source`
field at all. Deck **533 → 530**. The other 33 are a review list, not an action.

## 2026-08-10 — the other four chapters, and one instruction worth 0.5 of a percentage point

313 facts, 32 agents, every proposal adversarially refuted. **194 upheld, 104 rejected, 131
applied** through the same five-gate guard — which earned its place: it caught two replacements
that were **accidentally true** (one tried to introduce "Spitting Image" as a wrong answer to a
fact that marks it right) and one naming a year the handbook does not contain.

  identical option sets   63 -> 28
  repeated distractors   575 -> 505
  longest option       29.9% -> 28.0%   past its 0.30 target, ceiling now 0.285
  on-screen numeric    52.5% -> 52.4%   IMPROVED, where wave one worsened it

**That last line is the finding.** Wave one pushed the numeric tell the wrong way; wave two pulled
it back. The deck did not change character between them — the prompt did. Wave two was told two
things wave one was not: do not bracket the true value when writing numeric distractors, and keep
one shared template across all four options or the form loses its generation rule. Wave one did
both by reflex, which is precisely how L-002 came to exist in the first place. An agent writing
"plausible wrong numbers" will put some above and some below the answer unless told not to, and
that single habit is the 91.4% middle-value rate this project was founded on.

**40 answers now sit with the owner** under D-031, up from 12. Three are the same class as the
four retired this morning: f215 (a ceremony deadline), f216 (the local authority) and f219 (a
certificate of citizenship) all key answers that appear nowhere in the 232KB of handbook — and
f216 and f219 carry no `source` field at all, unlike every neighbour.

**31 question-level defects are deferred**, not dropped. Breadth credit is keyed by form position,
so rewording a stem in place silently transfers credit earned on a sentence that no longer exists.
Each needs an appended replacement or an `mcqOnly` flag, which is its own pass.

**Still open: the 12 self-contradicting forms.** Not one was fixed by either wave — the audit
proposed changes elsewhere. They remain the highest-value content defect in the deck.

## 2026-08-10 — five new asks go on the roadmap, and two of them need a decision first

The owner asked for five things at the end of the session. None were built; all are specced.

**C4, drillable bands.** The ask was "break History into smaller categories, none over 50". The
deck turned out to already carry a `tag` on every fact — **87 of them, and not one over 50**. His
correction landed immediately: *"87 tags is way too much — maybe expand from the current 5 to 10 or
so."* Right, and the reason is that a section exists to be *chosen*, and nobody chooses between 87
things. So: keep the tags as data, add about a dozen bands of 30–55 facts above them. A first cut
summing to 533 exactly is in the BRIEF.

**C5, the three-way progress bar.** % mastered / % mistakes / % new per row. The partition already
exists and is already asserted under R-12, so this is rendering rather than logic.

**C7, mock tests.** Mostly already decided — D-017, accepted 4 August, specifies 24 questions drawn
from *unseen* forms with each spent form recorded. The ask for **20 fixed pre-built tests**
conflicts with that: 480 forms nailed down in advance, any of which may already have been drilled
twenty times, which measures memory of the form rather than knowledge of the fact — the exact
circularity D-017 exists to prevent. And **R-7 forbids presenting a mock score as readiness** while
L-002 and L-003 are `fixed-unverified` rather than `verified-fixed`. Recorded and shown as a score:
fine. Called a probability of passing: not yet.

**C6, the full extraction sweep — D-035 accepted.** Every name, date and location in the handbook
is potentially examinable, and the argument for it is his and is good: a fact the book asserts and
the deck never asks is a question that can appear on the exam and has never been drilled. It amends
the non-goal D-024 had already narrowed. Every gate stays. The unresolved part is not content but
**scheduling**: 533 facts at 30 new a day already exceeds what the appetite has room for, so
doubling the deck without raising daily volume means every fact is seen half as often — and the
breadth gate needs two proven phrasings before an interval can grow. More facts can therefore make
readiness *worse* while making coverage better.

**C8, an AI layer — D-034 proposed, and blocked.** It crosses three things written as absolutes:
the BRIEF's LLM non-goal, R-8 (no personal data, no third party — the DPIA screening concluded UK
GDPR does not engage *because* nothing leaves the device), and R3. On the last: this project has
already measured a model inventing seven years against an explicit instruction not to (L-029),
caught only by a check that ran on the way in. A generated card is the most efficient way ever
devised to drill a wrong fact to permanence. None of that is a refusal — it is the price list, and
scope is the owner's. But "a useful AI learning layer" is at least four features with four
different risk profiles, and it cannot be specified until one is picked.

## 2026-08-10 — chapter 3's options audited, and the numeric tell turns out to rank days of the month

**220 facts, 660 forms, 2,640 options, read one at a time against the handbook.** Twenty agents
audited, and every proposed change went to a second agent briefed to *refute* it. That pass
killed **68 of 191** — a third — on grounds like "the replacement risks accidental truth", "the
fix does not do what it claims" and "the auditor's own confidence is low and it should be". One
refuter corrected its own auditor's arithmetic; another spotted that a fix was a stem edit and
had to go through the append path rather than land in place.

**87 distractors rewritten.** The best catches were the ones no mechanical check could reach:
`AD 122` and `AD 597` were still circulating as distractors on live cards **after the two facts
that asserted them were retired that same morning** for being unanswerable. And f141 offered
"More than 250 million" as a wrong answer to a question whose answer is "More than 400 million" —
which is *also* more than 250 million, so the card marked a true statement false.

What moved: **longest-option tell 30.9% → 29.9%, reaching its target**, so its ceiling comes down
0.315 → 0.30 in the same commit and **L-003 closes**. Identical option sets within a fact
90 → 63. Repeated distractors 614 → 575. Twelve answers the audit believes are wrong went to the
owner rather than landing, under D-031.

**Then the numeric ratchet went red, and chasing it found a worse problem than the one it was
guarding.** `readNumber` takes the first integer in an option, so "8 May 1945" reads as **8** —
the day of the month. A form offering `8 May | 15 August | 11 November | 6 June` was being ranked
8/15/11/6 and scored as "the correct answer is a middle value". Twenty-three of the deck's 405
measured numeric forms were calendar dates, and they were the biggest block in the residual that
this metric exists to track — **the metric that gates R-7 and the entire readiness model**.

Excluding them takes the deck from **0.5305 to 0.5249** on 382 forms instead of 405. Both numbers
are recorded, because this fix was found while the ratchet was blocking a commit and fixing it is
what turned the build green. That is the highest-scrutiny move available and it is logged as
L-036 `fixed-unverified`, needing someone who did not make it to re-derive it. On the corrected
definition the pre-audit deck also measured 0.5249, so **the audit is neutral on this metric, not
an improvement** — said plainly rather than left to be inferred from a green tick.

Along the way, two smaller things the ratchet surfaced: an agent's fix broke f141's shared
`More than {v} million` template and so silently cost the form its generation rule, dropping it
into the as-written set; and f011 mixed `AD {v}` with `{v} BC`, which cannot share a template at
all. One form losing its rule was enough to move the deck-wide figure.

## 2026-08-10 — four questions the handbook cannot answer, and a ratchet that measured the wrong deck

**Four facts retired, on the owner's instruction, without further adjudication.** Each had been
sitting as an open question addressed to him, and each had the same answer available: the source
this deck is checked against cannot settle it, so it is not examinable.

- **f213** — the KoLL age exemption. A Home Office rule, absent from the handbook entirely
  (L-016). It was the last amber fact and the only unresolved verify flag in the deck.
- **f006** — Stonehenge's age. The handbook lists it among monuments built by the first farmers
  and then calls the neighbouring examples "other Stone Age sites", while the fact answered
  Bronze Age (L-028). The book never assigns it an age outright, so neither answer was safe.
- **f015** — Hadrian's Wall, "AD 122". No year in the handbook, and all three phrasings turned
  on the date (L-023, L-031).
- **f194** — Baird's television, "1924". The book says "the 1920s"; 1924 was embedded in the
  canonical stem itself (L-031) — the exact defect the vocabulary check was written for, hiding
  in the question where a check that only reads explanations could never see it.

Deck **537 → 533 facts**, 1,609 → 1,597 forms, 22 → 26 retired ids. Retired, not deleted: ids are
the handle the review-event log points at (R-4).

*Honest cost, recorded rather than glossed:* retiring f194 leaves **Baird with no card of his
own**. He now appears only as a distractor in f196 and f199. That is a coverage regression against
S10 and it is logged as one, to be closed by a phrasing that does not turn on a year.

**Then the ratchets turned out to be measuring a deck nobody drills.** `analyseDeck` was being
passed `DECK` — all 559 ids, retired included — by both the report and the tests. A retired fact
is never served, and facts get retired for being *bad*, so the retired set was flattering every
figure it entered. Re-pointed at `ACTIVE`: longest-option tell **0.3124 → 0.3092**, on-screen
numeric tell **0.5277 → 0.5249**. Small, and in the direction that says the old numbers were
wrong. The id-space contracts — contiguity, uniqueness, orphaned explanations — stay on `DECK`,
because those are properties of the id space and not of the study material.

**And one ratchet had no ratchet.** `longestOptionCorrectRate` sat at a ceiling of **0.39** while
the deck measured **0.312** — eight points of slack, enough for two hundred forms to regress
without ever failing a build. Tightened to **0.315**. Found by reading the report against the
baseline, which is not a check; the lesson is that a ratchet needs its own gap monitored, or it
silently stops being one. Also tightened: `effectiveNumericMiddleRankRate` 0.53 → 0.527,
`restrictedRankForms` 1 → **0** (L-012's £3,000 form can now reach every rank, so this becomes an
assertion), and `unresolvedVerifyFlags` 1 → **0**, which clears launch-gate item 2.

**A probe run while scoping found the defect class the next piece of work exists for.** The deck
has statistical checks over option *shape* and none whatever over option *content*. Two
measurements, neither previously taken: **12 forms offer as a wrong answer something another form
of the same fact marks correct** (f454 has Gertrude Jekyll both ways; f511 treats "12 noon" as
wrong), and **618 distractor strings repeat across forms of one fact**, so the same wrong answers
come round again and again — R2's memorisable surface sitting inside the mechanism built to
prevent it. Logged as L-033.

## 2026-08-05 — the card loses its chrome, and the black band turns out to be 360px (D-033)

**I had been measuring the wrong screen.** Every layout claim in this repo says "fits 393×852";
the owner uses an **iPhone 16 Pro, 402×874**. Re-measured at his size, an unanswered card's
content ended at **445** while the action bar sat pinned at **817** — **360px** of page colour
between them, near-black in dark mode. The safe-area fix earlier today was 16px of a 360px
problem, and it is why he could still see the band after it shipped.

The action bar is pinned by decision, so the slack has to go somewhere. It now goes **above** the
options rather than below them: the bottom of the screen is options-then-actions on every card,
and the breathing room sits under the question where it reads as spacing. Gap between the options
and the action bar: **12px**, from 360.

Above the question there is now a cross and nothing else. Gone: the section title, the "N to go"
counter, the chapter and tag chips, and the phrasings-proven dots — which should not have
survived D-032 at all, being a phrasing count rendered as a progress bar, exactly what R-12
forbids. The mode toggle moved to Settings on the Progress tab; recall is the harder mode and the
only evidence a recall readiness figure may accept (D-013), so it keeps a home rather than going
out with the chrome.

**"Correct." / "Not quite." is no longer printed.** The option turns green or red and the others
dim, which says it faster and costs no height. The sentence stays in the accessibility tree as a
visually-hidden live region: WCAG 1.4.1 is that colour must not be the *only* carrier, and
deleting it outright would have been an accessibility regression dressed up as tidying.
"Recorded as a miss." stays visible, because nothing about the colours says a right answer has
just been downgraded. The "check the book" flag moved below the answer, where it is a caveat
about the answer rather than a label on the card.

**What it bought, measured at 402×874:** seven of eight consecutive answered cards now fit with
**no scrolling at all**, where the header and chips previously pushed most of them over. The
eighth, a long cluster, needs 203px of scroll and the action bar stays pinned throughout.

## 2026-08-05 — every number in the app is a count of facts (D-032)

The owner's correction, and it is the whole change: *"the several phrasings per fact are a hidden
mechanism, not a measure of knowledge."*

The home screen was carrying four numbers built on four different rules. The headline required
**every phrasing** of a fact proven, so it read 0 after weeks of correct answers. "New" counted
unseen **phrasings** — 1,575 of them, on a deck of 537 facts. Mastered counted facts on a
last-three-attempts window. Mistakes counted facts on a three-distinct-phrasings rule. Every one
was internally correct; together they were meaningless, and no test could say so, because nothing
asserted any relationship *between* them.

Five definitions now, all per fact, the first three partitioning the deck exactly:

- **New** — never answered.
- **Mastered** — answered, no wrong answer in its last three attempts. One correct answer is
  enough; it stays until you miss it.
- **Mistakes** — a wrong answer inside its last three attempts.
- **Random** — any fact at all.
- **Due today** — unchanged, thirty facts a day.

The headline is Mastered over the deck. Chapter rows carry `mastered/total` as a number as well
as a bar, because a 3% bar is indistinguishable from an empty one and 3% is where every chapter
starts. The progress screen leads with the same partition and has lost "facts known every way"
and "phrasings proven" entirely; its problem-facts list says where each fact stands today instead
of "2/3 phrasings proven". Rotation is untouched — every reappearance still wears the phrasing
seen least — and it is now completely invisible, which is what it was always for.

**The partition holds by construction.** One function walks the deck once and gives each fact
exactly one standing; every count, both screens and the chapter bars are projections of that
walk. Three functions that happen to agree is what was there before.

Measured on the owner's own log after the change: **10/537 mastered · 2%**, New **503**, Mistakes
**24**, Mastered **10** — and 503 + 24 + 10 = 537, the deck exactly. It read "0 of 543 known" and
"New 1,575" before.

**Two losses, written down rather than found later.** The mistakes rule gives up its
distinct-phrasing guarantee: three correct answers can now clear a fact even if they repeat one
phrasing, where before three *different* phrasings were required. And the scheduler's breadth gate
(R-6) still measures phrasings, so a fact can be Mastered on screen while the scheduler holds it
at six days because it has only been asked one way. Both are in D-032 in full.

**Both halves of the bug were reintroduced deliberately and watched to fail** — the phrasing
count into `sectionCounts`, and the old distinct-phrasings clearing rule into `mistakesFrom`. The
first takes down 11 assertions including "keeps every coverage figure inside the fact total"; the
second takes down "never puts a fact in both Mastered and Mistakes" on all six seeds. Added as
RULES R-12.

## 2026-08-05 — the bottom edge belongs to the bar

The dead strip along the bottom was measured rather than guessed, on all four screens at
393×852: the deepest box ended at **836** against a viewport of **852** every time — drill tab,
progress, chronology, and a drill card with the tab bar hidden. Those 16px were `.wrap`'s own
`padding: var(--space-4)`, exactly as suspected. `env(safe-area-inset-bottom)` resolves to
**0px** in a browser, so it contributes nothing there and around **34px** on the phone: the band
the owner sees is those two added together, roughly 50px of `--c-page` (#0d0d0d in dark, hence
"black") below the last thing on screen.

The fix is a change of ownership rather than a deletion. `.wrap` loses its bottom padding
outright, and the **bottom inset moves off the body onto the two elements that can be the
bottom-most box** — the tab bar on every tab, the card's action bar on every drill. On the body
the inset is unreachable: no element can paint into it, so it is always a strip below the app.
On the bars it is clearance *inside* the interface, which is the ordinary iOS pattern.

Measured after: the bottom bar's box ends at **852** on every screen, no page scroll anywhere.
With a 34px inset simulated on the same declaration, the bar's box still reaches 852 while its
buttons stop at 818 — clear of the home indicator — and every one is still 44px.

**A regression test that reads CSS source**, which needs justifying. jsdom does no layout, so
`getBoundingClientRect` returns zeros and a rendered assertion would prove nothing; this bug was
found in a real browser and nothing in the suite could have said so. `tests/layout.test.ts`
instead holds the invariant that produced the fix — *exactly the two bottom-most bars carry the
bottom inset, and the frame carries no bottom padding* — and it was run against the old CSS
first, where all four of its assertions fail.

## 2026-08-05 — six facts retired, because the year is not in the book

f073 (1536, Wales united with England), f074 (1541, King of Ireland), f078 (1558, Elizabeth I
becomes queen), f086 (1587, Mary Queen of Scots executed), f091 (1611, the King James Bible)
and f163 (1926, the General Strike). The owner checked all six against his 2026 printed
edition and none of the years is in it. Each was then grepped against the PDF proxy as well:
**zero hits for every one of the six years.** The handbook covers all six events — Wales
united under Henry VIII, Henry VIII taking the title King of Ireland, Elizabeth I at length,
Mary eventually executed, the King James Bible in its own box — and dates none of them. The
General Strike is not there at all.

Retired, not deleted. Ids are the handle the review log points at and they are contiguous by
contract (R-4), so a deletion would renumber every fact after it and silently re-point every
past event at the wrong question. `retired?: string` carries the reason and drops the fact out
of `ACTIVE` while it keeps its place in `DECK`. Their explanations went with them.

Deck 543 → **537** drilled, 1,627 → **1,609** phrasings, 16 → **22** retired.

**The part worth keeping is how they survived.** All six carried
`source: 'corroborated against the handbook text'` from the mechanical pass over the 399
inherited facts. That pass matched on topic, not on the answer — the handbook talks about the
King James Bible, so the fact corroborated, and the fact's answer is a year the book never
gives. The vocabulary check could not catch it either: it reads explanations, and it
deliberately exempts a year the fact's own answer already asserts (D-031, because where the
answer IS a year the owner has confirmed it). That exemption is sound only when the answer has
actually been checked. Recorded as L-031, with the two facts the same probe still flags.

## 2026-08-04 — tabs, a pinned action bar, and the copy cut back

The owner's note: *"I'm the only user, so explanations are unnecessary most of the time."*
Everything on the drill tab that explained what a section does has gone. Those captions were
read once and then cost a line of screen for ever. A section title that needs a caption is a
naming problem, not a case for a caption.

**A tab bar, so Progress and the chronology stop being detours.** They were behind a Back
button, which made every visit a round trip through the home screen and made the home screen
carry two links it did not need. They are tabs now, and their Back buttons are gone with the
journey they belonged to. The bar is **hidden while a card is on screen** — a stray tap there
costs you your place mid-question, and the bottom of that screen belongs to the card.

**One action bar, pinned to the bottom of the card.** Previous, Got lucky and Next sit on a
single row in the same place on every card, so acting never means scrolling past an
explanation to find a button. That is the point of bounding the panel rather than shortening
it: read it if you want, ignore it if you do not, and the buttons are where they always were.

Two small consequences worth naming. The exit is a **cross** rather than a back arrow, because
the left chevron now means "the previous card" and one glyph cannot mean two things on one
screen. And the interval preview moved to *before* grading — it is a decision aid, so showing
it after the decision was backwards.

**Mastered is a new section, and it is the only one that can take the headline down.**
Everything else on that screen only ever rises. "Known every way" is a claim that decays
silently, and nothing was ever retesting it. Mastered drills exactly those facts, as practice
(D-003), so a success changes nothing and a miss lapses the fact and drops it out of the
count. That is what makes the number worth reading.

**Progress and the chronology now scroll inside the frame.** They hold 1,100px and 5,000px of
content and there is no honest way to fit those in 852px — but they were being *clipped*
rather than scrolled, which is worse, because clipped content is simply unreachable. The page
itself still never moves.

Measured at 393x852: zero page overflow anywhere, zero frame clipping on any screen, the two
reference tabs scrolling internally by 5,050px and 1,136px, and no touch target under 44px
except the Quiz/Recall toggle at 32px — which is above WCAG 2.2 AA's 24px minimum and is a
segmented control rather than a primary action.

## 2026-08-04 — the explanation standard, and a check that reads the handbook

Two pieces that exist to make the explanation rewrite honest before any of it is written.

### `npm run deck:vocab` — does an explanation name anything the book does not?

The defect this is for already happened: an explanation asserted Baird demonstrated television
in **1924**, and 1924 appears nowhere in the handbook. It was caught by someone thinking to
look, which is not a mechanism.

It matters more than it sounds. A drill app installs whatever is put in front of it, faithfully,
including things that are not examinable and things that are not true. An off-source date is not
merely wasted — it is learned as reliably as the answer and then competes with it.

The handbook is Crown copyright and never committed, so a check that only runs on the one machine
holding the PDF is not a check. The vocabulary is committed as **195 years in the clear and about
7,000 one-way hashes**: exact membership testing, no readable text, and the copyright question
does not arise rather than being argued about.

Two tiers, because the first version drowned. A capitalised word absent from the handbook *in any
case* is worth reading — Wessex, Runnymede, Norseman, Jacobus, Puritan. One that is merely
capitalised here and lowercase there is ordinary prose. That split took the report from 239 flags
to 116 and made it usable.

Years are ratcheted; names are a report. A year is in the book or it is not. Names over-flag —
plurals and adjectives of real handbook words land in them — and a ceiling on noise is a ceiling
that gets raised, which is how a ratchet stops meaning anything.

**The first run found something worse than what it was built for.** Seven flagged facts, each then
grepped against the handbook by hand rather than taken on the report's word. Three are explanations
teaching off-source material. **Four are answers the handbook does not contain**: the start of the
Hundred Years War (the book gives no start year, only that it lasted 116 years), the expulsion of
the Jews in 1290 (no expulsion is mentioned at all), and both FGM dates (the book gives none).
Logged as L-023.

### `docs/EXPLANATIONS.md` — the authoring standard

Written from four independent research passes: the retention evidence base, mnemonic technique by
fact type, how expert practitioners actually write spaced-repetition material, and a deeper dig
into memory palaces and chunking. It is written to be argued with, and several of its rules are
there because the evidence went **against** the intuition:

- **The strongest study on our exact question is a null.** Butler, Godbole & Marsh (2013): explanation
  feedback and plain correct-answer feedback performed *equivalently* on repeated questions.
  Explanation only won on **new** ones. So the warrant for this work is not "explanations aid
  retention" — it is that this app's whole outcome measure is answering phrasings not seen before.
- **Interesting-but-inessential detail measures negative**, around d = −0.3 to −0.5 across two
  meta-analyses. A panel whose story is more memorable than its fact has failed.
- **Memory palaces are contraindicated, not merely expensive.** Written presentation interferes with
  the imagery the method needs; the closest study to this format found no transfer.
- **First-letter acronyms have a prominent null** — one paper is titled *DAM (Don't Aid Memory)*.
  They cue order, not identity, which is exactly backwards for someone meeting five principles for
  the first time.
- **Do not cite Miller or Cowan to justify splitting a list.** Both numbers come from tasks
  engineered to *block* long-term memory; applying them to a panel re-read over weeks is a category
  error. Four countries and five principles need no splitting.
- **A cluster only helps if every line carries a discriminator.** "Caesar 55 BC, Claudius AD 43" is
  the interference case. "Caesar raided and left; Claudius conquered and stayed" is the
  discrimination case. That distinction is the difference between the technique working and
  backfiring, and it is why the owner's own worked example is the specification.

Logged L-024 while writing it: teaching a cluster is a second way to inflate the readiness number,
since a fact met inside another card's panel can later be answered by recognition. Same class as
L-002, different door. Bounded by the standard's cluster conditions, not removed.

## 2026-08-04 — stepping back through a session

**Reported: "Back returns to Home, so once I press Next the card is gone."** The only control
that moved you on destroyed the card, and Back left the drill entirely. Which made the
explanation close to unreadable in practice — one glance at it, while still thinking about the
question, and then it was gone for good.

The drill screen now keeps the cards it has served and pages through them: **‹ Previous** and
**Next ›**, with the position through the session between them. A card being re-read shows the
question, the option that was pressed, the correct answer and the explanation, and nothing
else — no grading, no second event, and the mode toggle is replaced by a label saying which
mode it was answered in.

Three things this had to get right, each with a test that was run against the broken version
first:

- **The option order is reproduced, not recorded.** Each served card keeps the nonce that
  seeded its shuffle, so the four options come back in the order they were in. Storing the
  order itself would have been a second copy of the same thing, free to drift — the mistake
  D-021 already named once. Reusing the live nonce instead fails exactly one test.
- **Coming back to the live card must not re-deal it.** Forward off the last past card returns
  to the card that is still sitting there, unanswered or answered as it was left. Nothing in
  the pager consults the review log and nothing calls `nextItem`, so R-11 holds: stepping back
  cannot change what is on screen now or what comes next. Making forward deal a card instead
  fails two tests.
- **Re-reading records nothing.** A past card's controls arrive already disabled. There is a
  `readOnly` guard in `commit` as well, and it is worth being precise about it: removing it
  fails no test, because the disabled controls are what actually does the work. It stays as a
  second lock, described as one rather than as the mechanism.

Running a section dry no longer locks the session away either — the empty state offers a way
back over what was answered getting there.

Verified in a real browser at 393×852 as well as in the suite: stepping back returned the same
question with the same four options in the same order, the explanation on screen, every option
inert; forward returned to the live card, unchanged and still answerable.

204 tests across 9 files, up from 198.

## 2026-08-04 — sync switched on (D-030)

The two devices now share one history. D-027 had shipped the schema, the endpoint, the merge
and nine tests, and deliberately called none of it; this wires it up. Sync runs on subscribe,
on the tab becoming visible, and after every grade, with a **Sync now** button and a status
line on the home screen for when the question is "did it actually go across?".

Nothing above `store.ts` changed. Every screen was already a projection of one snapshot, so a
pull updates all of them by emitting once — which is the payoff for building the log first and
the interface on top of it.

**Wiring it up found two hazards that nine passing merge tests said nothing about**, because
neither is in the merge:

- **A grade answered mid-round was deleted.** Capture the log at the start of a round, write
  the round's own merge back at the end, and anything recorded in between is gone — the log it
  merged never contained it. That is last-write-wins data loss, in the architecture chosen
  specifically to make it impossible, arriving from the inside where the merge algebra cannot
  see it. No error, no symptom. The write-back now merges against the log as it stands when
  the round *finishes*.
- **The last grade of a session never reached the server.** Dropping a sync request that
  arrives while a round is running is right — two rounds must never race — but dropping it and
  doing nothing else strands it. Put the phone down, open the laptop, and the final card is
  missing. A dropped call is now a trailing round.

Both were run against the broken code before being trusted: reverting the first fails two
tests, reverting the second fails exactly one, and each fails the one that names it.

**R-11 gets its second way in, and two tests to say so.** Until today the review log only
changed because the reader answered something. It can now change while they sit looking at a
card. The card, its phrasing and its option order are held in component state and none is
derived from the log, so the property holds — but by construction rather than by luck. Proved
by letting something that moves *only* when a sync succeeds reach the card's presentation: the
two new tests fail and the other twenty-six do not, which is what makes them worth having.

Verified live against the deployment as well as in the suite — `db-check` reports
`inserted: 0` on a repeated push and `rejected: 1` for a malformed probe.

**Also, from reading rather than from any check: four numbered ids were spent without an entry
ever being written** — D-026, D-029, L-019, L-020. D-029 in particular is a deliberate
amendment to a BRIEF non-goal that exists only as a changelog paragraph. Logged as L-022 with
the tripwire it should have had.

198 tests across 9 files, up from 185.

## 2026-08-04 — "Got lucky"

A correct multiple-choice answer can mean two very different things, and the app had no way
to tell them apart. One in four is chance. Left alone, a fact you guessed is treated as
proved and pushed out to a long interval — so the schedule quietly fills with material you
never knew, and the readiness number counts it as known.

After a correct answer the card now offers **"Got lucky — I guessed"**, which records a
second event as a miss. The fact lapses, lands in the mistakes drill, and has to be earned
back on three phrasings like any other miss.

Deliberately quieter than Next, and only shown after a correct answer — there is nothing to
downgrade about a wrong one. It can only be pressed once. This is the one piece of evidence
the app cannot gather for itself, so it has to be cheap to give and impossible to give by
accident.

## 2026-08-04 — deck to 528 facts (D-029)

**443 → 528 facts, 1,327 → 1,582 forms.** 85 added across topics measured thin against the
handbook: pubs and licensing, money and banknotes, and the environment had **zero facts
between them**; education, the Empire and decolonisation, media, film and the interwar years
were covered at a fraction of the space the book gives them. Every new fact carries a source
citation and an explanation.

The method for choosing what to add is worth stating, since "more facts" is a BRIEF non-goal:
measure how much of the handbook a topic occupies against how many facts we hold on it. That
ratio is the best available proxy for what gets asked, so the expansion follows the book's own
weighting rather than anyone's instinct.

**Six defects caught before merge, each verified independently rather than taken on trust:**

- `fH14` duplicated `fF04` — both the TV licence and separate tenancy agreements.
- `CH1` was referenced but never defined: a compile error, not a style point.
- Four forms marked recall-usable were bare "which of these" stems, unanswerable without
  options on screen.
- Two forms carried dangling references — "in this period", "that government" — with no
  anchor once the card is seen alone.
- One distractor was arguably correct: Monty Python (1969) offered against a stem asking for
  1960s satire.
- One explanation asserted Baird demonstrated television in **1924**. The handbook says only
  "in the 1920s" and 1924 appears nowhere in it — confirmed by searching the source.

**The first fix for the four bad stems was itself wrong.** Flagging them `mcqOnly` removed the
defect and cost each fact a recall-usable form, pushing four facts below the breadth gate — a
straight trade of one defect for another, caught by the ratchet. Rewriting the stems as real
questions fixed both.

## 2026-08-04 — facts as the metric, and sync built but not switched on

**D-028: the headline counts facts, not questions.** Was "phrasings proven, X of 1,327"; now
"facts known every way, out of 443". The owner's correction and he is right — the phrasings
are how the app checks you know a fact rather than a sentence, so counting out of 1,327
measures the apparatus instead of the material. A fact still only counts once every one of
its phrasings has been answered correctly, so nothing has been made easier.

**D-027: sync is built and deliberately not wired in.** The owner opened the app on his phone
and found none of his desktop progress, because sync had never been built — the database was
provisioned in the morning and nothing was ever written against it. That status sat in a
HANDOFF list rather than being said plainly, so "keep sync" read as done.

Built this session: schema, endpoint, client merge, nine tests covering the cases that
actually break sync — both devices offline at once, a push that fails after the pull
succeeded, the same events pushed twice. Then shipped **unwired**, at the owner's request, so
the randomisation work was not held up behind it. Turning it on is three lines in `store.ts`.

The merge is a set union over immutable event ids, so there is no "winner" and nothing to
reconcile. The failure it exists to avoid is the common one: uploading a serialised state and
letting the newer timestamp win, which silently discards whichever device synced second.

## 2026-08-04 — every card now explains itself

**443/443.** The remaining 269 explanations written by 12 parallel agents against the
handbook text, then a quality pass over all of them, then merged deterministically.

**The review pass earned its place.** It found six explanations making false claims about
the deck's own options — telling the reader which half of an answer to check, based on
distractors that were not the distractors actually there. The worst was f277 (Bannister):

> "The name is rarely the thing distractors change; they move the year instead, so fix 1954."

Three of that fact's distractors keep 1954 and change the name — *Redgrave, in 1954*,
*Chataway, in 1954*, *Pirie, in 1954*. Following that advice picks a wrong option. An
explanation that confidently misdirects is worse than no explanation, and all six were
plausible enough to survive a casual read. Verified three of the six against the deck data
independently before applying the corrections rather than trusting the report.

**A test was written and then deleted.** A check for "opens by repeating the answer verbatim"
flagged 26 entries, and every one inspected was good — *"A constituency is a place, not a
group of supporters"*, *"First past the post means whoever gets the most votes in a
constituency wins it, even without a majority"*. For a definitional fact, naming the term and
then defining it is the correct construction. Setting the threshold to 26 would have encoded
today's count and asserted nothing, so the check went and the reasoning stayed in its place.

**Now a build gate:** every fact must have an explanation. Adding one without fails the
build, rather than quietly leaving a card that answers into silence.

## 2026-08-04 — the options moved under your finger

**L-021, High.** Reported from real use: clicking an answer re-shuffled the four options as
the click landed, so a correct answer could be marked wrong.

The shuffle seed included `remaining` — a per-section count derived from the review-event
log. Answering appended an event, the count moved, the memo recomputed, and the options
re-ordered. `chosen` then indexed the old arrangement while `correctIndex` came from the new
one. The *recorded grade* was right throughout, because the click handler closed over the
pre-answer arrangement, so no schedule was corrupted — but the screen lied, which for a
learning tool is the worse half.

Fixed with a `cardNonce` that advances only when a card is dealt. Nothing log-derived may
seed presentation.

**Two things about how this was found and fixed are worth keeping:**

- **The first regression test passed against broken code.** It opened a *chapter* drill — the
  one section whose count does not move when you answer. Written before the fix and run
  before the fix, as it should be, and it still said the code was fine. The test now
  enumerates the sections rather than sampling one.
- **The revert check was also wrong the first time.** Reverting only the seed string left the
  dependency array pointing at the nonce, so the memo never recomputed and the "broken" build
  passed. Reverting properly failed all three.

**Postmortem filed** (LEDGER) — same bug class twice, which the BRIEF pre-declares as a
trigger. The class is now RULES R-11: nothing derived from the review log may drive what is
on screen mid-card. The first fix held the *card* still and treated the symptom; the option
shuffle was seeded from a live count three lines away and looked solved.

## 2026-08-04 — explanations, second batch

**174 of 443 facts now carry context** (was 53). Chapters 1 and 2 complete, chapter 5 at
60/101, chapter 3's narrative spine — prehistory through the Middle Ages — at 61/208.

The history explanations lean on sequence and cause rather than dates, because that is what
actually makes the chapter answerable: knowing roughly where in the story something sits
answers most questions even when the specific date has gone. Where two facts explain each
other, both say so — Wales having no emblem on the Union Flag and the Statute of Rhuddlan in
1284 are the same fact seen twice, and each explanation points at the other.

Coverage is now reported per chapter by `npm run deck:report`, so the remaining work is
visible rather than something to remember.

## 2026-08-04 — component tests

**17 component tests, closing the gap that let the card-advance bug through.** The domain had
120 tests and the interface had hand smoke-checks; the bug that shipped explanations
unreadable was invisible to every one of them.

- The first block is that regression, written the way it should have existed first: the card
  must stay on screen once answered, must show a verdict, and must advance only on Next.
- **Verified the regression test actually catches it.** Temporarily reverting the fix fails 8
  tests including the specific one. A regression test that has never failed is not yet known
  to be a regression test.
- Also covered: explanations hidden before answering and shown after, one event written per
  answer and none on Next, correct answers recorded as Good and wrong as Again, first contact
  always `scheduled`, a missed fact appearing in the mistakes count, recall mode's
  reveal-then-grade flow, navigation to progress and the chronology, empty states, and
  survival across a remount.
- jsdom is opted into per file with a docblock rather than configured by glob, so the 60-day
  simulation does not pay for a DOM it never touches.

## 2026-08-04 — explanations, and a bug found by using the app

**Per-fact context, shown after you answer.** The owner asked for a paragraph on each card so
that drilling teaches understanding rather than answers. A date you can place in a story
survives far longer than one you have memorised, and most exam questions are answerable from
context even when the specific fact has gone.

- Explanations live in `src/data/explanations.ts` as a flat id→text map rather than a field
  on each fact: authoring is one editable list instead of 443 scattered edits, coverage is
  countable, and the deck files stay unchurned while it fills in. Attached to the deck once,
  at assembly.
- **53 of 443 written** — all of chapters 1 and 2. The rest is authoring work in progress.
- Tests assert every authored explanation attaches to a real fact (a typo in an id would
  silently write something nobody ever sees), and that none merely restates its answer.

**A real bug, found by opening the app rather than by reading it.** Grading swapped the card
instantly, because the current card was derived straight from the event log and the log
changed on every grade. You never saw whether you were right, and the explanation flashed past
unread — the feature would have shipped defeating its own purpose.

The card is now held in state and stays put until you press Next, in both quiz and recall
mode. Feedback you cannot read is not feedback.

## 2026-08-04 — collapsed to one version

The owner asked why there were two. There was no longer a reason, and the honest answer is
that the machinery outlived its premise by several hours without anyone noticing.

**D-025.** `index.html`, `facts.js` and the old README deleted; v1 moved to the repository
root; `lituk-drill.vercel.app` now serves it. Deleted with them: the round-trip test,
`divergences.ts`, `migrated.ts`, the migration script and its guard, the `v0 is untouched`
CI job, the `v0CorrectIndex` field on all 1,228 original forms, and `maxAnswerPositionRate`.
Roughly 900 lines of scaffolding, plus a field repeated 1,228 times.

**Kept: `source` on every corrected or confirmed fact.** That was the load-bearing part —
the record of *why* the deck says £5,000 where the printed book says £3,000 — and it stands
without anything to compare against.

**The failure worth naming** is not that the premise was wrong; it came from the handover
and was reasonable to accept. It is that the structure built on it was not dismantled when
D-022 falsified it, hours earlier. That decision corrected the premise and then explicitly
*preserved* the apparatus. Sunk structure is harder to spot than a sunk cost, because it
keeps passing its own tests. It took the owner asking.

R-1 retired, R-4 rewritten around what ids are actually for, S6 retired.

## 2026-08-04 — the app becomes usable

**Interface and local persistence.** v1 can now be drilled: home screen, the five sections,
the card, progress, and the chronology (S9, ported from v0).

- **One external store, read through `useSyncExternalStore`.** Not state loaded inside an
  effect — browser storage is external mutable state, and an effect that copies it into
  component state is a cache that can go stale. The deciding reason is what comes next: when
  the Postgres adapter lands, a sync pull merges remote events into this store and calls
  `emit()`, and every screen updates because every screen is already a projection of that
  snapshot. Nothing above the adapter has to learn that sync exists.
- **Which sections write to the schedule.** First contact with a phrasing is always
  `scheduled`, whichever section it happened in — D-003 discounts self-directed successes
  because the card was chosen and had just been seen, and neither is true the first time a
  phrasing appears. After that the section decides: due and new are scheduled; mistakes and
  chapter drills are practice.
- **A quiz answer grades binary** — right is Good, wrong is Again. There is no honest way to
  ask "how hard was that?" of a multiple-choice answer.
- React's linter caught two things worth fixing rather than suppressing: `setState` inside an
  effect to reset a card (now a `key` on the component, so a new card *remounts* and an
  answer can never be on screen before its question), and `Date.now()` during render (now
  captured in the store and refreshed on `visibilitychange`, so a phone left overnight does
  not keep yesterday's due list).
- The token lint caught two raw values on the way through — a `1ms` and a `44px` — which is
  the check doing exactly what it was installed for.

**Smoke-checked by hand** in a 375×812 viewport, not assumed: answered one question right and
one wrong, and confirmed the event log, the counts and every screen agreed. Two events
produced 1 phrasing proven, 1 fact in mistakes, 1 due today, a 1-day streak and the missed
fact at the top of the problem list. No console errors.

**Weakest part of this commit:** there are no UI tests. The domain has 122; the interface has
a hand smoke-check. Recorded in HANDOFF rather than left implied.

## 2026-08-04 — deck expansion

**D-024: 33 facts added to fill measured coverage gaps.** Deck 410 → **443** facts, 1,228 → **1,327**
forms. Amends the BRIEF's non-goal ("more facts is not [good] — 410 is the material"), which was
written assuming the 410 covered the handbook; measuring showed otherwise. Added: the EU and
international institutions, the modern constitutional monarchy, the civil service, local government,
the civil/criminal law distinction, the Industrial Revolution, and architecture. Every one carries a
handbook `source`.

- **The additions were length-balanced deliberately**, and it worked: the deck-wide longest-option tell
  fell from **40.7% to 38.8%**, so expansion improved a measured property rather than diluting it.
  Ceiling tightened to match. On-screen numeric tell holds at 52.8%, and no form now fails to reach
  every rank.
- **My first draft was rejected by the deck's own checks, twice over (L-018).** The gap probe searched
  canonical questions and answers but not form text, so it reported *zero* EU facts when f188 already
  covers the UK joining the EEC. Two drafted facts duplicated f188 and f331 and were caught by the
  duplicate-canonical-question and shared-form checks on the first run, not by review. A probe over a
  subset of the data reads exactly like a probe over all of it.
- **Then it rejected my option sets.** 30 of the new as-written forms had the correct answer as the
  uniquely longest option — the exact tell the file's own header warns about. Fixed by extending one
  distractor per form rather than by moving the ceiling.
- **The stored numeric-bracketing ratchet was retired as a gate**, and this one is worth recording
  because it inverts an earlier position. `buildCandidates` derives its step from the spread of the
  authored distractors, so distractors that bracket the true value are what give the candidate pool
  depth on both sides — the thing that makes uniform rank achievable. Driving that number down would
  now *degrade* generation while improving nothing a reader sees. It stays in `deck:report` as a
  diagnostic; `effectiveNumericMiddleRankRate` is the gate.

93 tests green.

## 2026-08-04 — deck corrections

**The owner supplied a full 3rd-edition handbook text**, which changed the sourcing rule and closed
most of a launch-gate blocker.

- **D-023.** The supplied edition is *maintained, not frozen*: it carries the Brexit update (UK left
  23:00 GMT 31 January 2020; 27 member states) while keeping other original figures. v0's README rule —
  "the examinable answer is always the book's, even where it's now out of date" — no longer describes a
  single artifact. Owner's decision: the maintained edition wins, one rule, no exceptions.
- **L-005: 11 of 12 amber facts resolved.** Eight confirmed correct (B1 CEFR, 84% in England, Wiggins,
  Olympics 1908/1948/2012, 60 Welsh AMs, 90 MLAs, Council of Europe 47, small claims £10,000 E&W).
- **L-015: three were wrong.** Small claims for Scotland and NI was **£3,000**, should be **£5,000** —
  a plainly wrong answer that spaced repetition would have drilled to permanence, which is R3's whole
  argument. Commonwealth 54 → 56. UK population 62m → 67.6m.
- **Divergence is now declared, not tolerated.** Correcting content breaks the round-trip proof against
  v0's `facts.js`. Rather than weaken that test, `divergences.ts` lists every deliberate difference with
  a reason and a source; the build fails on anything that differs and is not declared, on any stale
  declaration, and on any diverged fact missing a citation. The migration script refuses to run while
  divergences exist — re-running it would restore every original answer *and the round-trip test would
  then pass*, a failure indistinguishable from success.
- **The ratchet caught a metric that had quietly stopped measuring reality.** `longestOptionCorrectRate`
  was counting stored option text for forms that carry a generation rule and are never presented as
  written — the same flaw `effectiveNumericMiddleRankRate` exists to correct. Now restricted to
  as-written forms; denominator 749 → 734, rate 0.4032 → 0.4074, ceiling **re-derived rather than
  loosened**, with both figures recorded in `baseline.ts`.
- **L-017 logged:** measured coverage gaps. Zero facts on the EU despite a full handbook section; the
  modern monarchy, Industrial Revolution, local government, civil vs criminal law and the civil service
  are all thin. Filling them conflicts with BRIEF §What-v1-must-do and needs a superseding decision.

92 tests green.

## 2026-08-04 — later

**Infrastructure landed, and immediately produced a finding.** Vercel project created from the GitHub
import, Neon Postgres linked (`DATABASE_URL` and friends on Production and Preview).

- **L-014, High — the BRIEF rested on a premise that was never true.** §B stated that a working v0 was
  "already deployed and in daily use" and "carries him to 25 September on its own". Taken verbatim from
  the kickoff input and never checked. There was no deployment and no accumulated schedule; the owner
  had been using commercial apps. The neutralised deadline, the 6-week appetite, the instruction to
  ignore the exam date, and scope line S6 were all resting on it. Corrected in the BRIEF by D-022, with
  a drift-check tripwire so §B's premise is treated as a claim to verify rather than a given.
- **L-013 raised as High, then resolved by inverting it.** The Vercel project's Root Directory is `.`,
  so `lituk-drill.vercel.app` serves the repo-root `index.html` — v0. Flagged as dangerous on the
  assumption that a *real* v0 already held the owner's schedule, which would have made this a second
  copy at a new origin with empty storage. With no real one, it is not a collision: **it is the missing
  deployment.** Verified live — `index.html` 28,439 bytes, `facts.js` 232,747 bytes, both exact matches
  for the local files. Kept as-is; v1 will get its own project (D-022). Stable by construction, since
  R-1 and the `v0 is untouched` CI job forbid changing the files it serves.
  - Along the way, tried to fix it in git with a `vercel.json` pointing the build at `v1/`. The deploy
    failed with "No Next.js version detected… check your Root Directory setting" — Vercel stating
    plainly that this is not something `vercel.json` can override. File removed rather than left
    misleading.
- D-012 recorded Vercel Postgres; what was provisioned is Neon, which is the same thing — Vercel's
  Postgres offering is a Neon integration. No amendment needed.

**S7 built — generated numeric distractors (D-014), closing L-002.**

- Rules are **derived at load time from the authored options, never stored** (D-021). Decided during
  the build: storing them would have created a second copy free to drift, and would have shrunk the
  round-trip proof so it no longer covered converted forms. Net effect — this feature is a zero-line
  diff in `src/data`.
- Scale is inferred from the spread of each form's own hand-written distractors, then snapped to the
  granularity the author worked at. Guessing the step produces absurd options, and absurd options are
  their own tell.
- **Caught a self-inflicted regression in the dry run before it shipped.** The first version derived
  the step from distractor spread alone. For AD 43 against 61, 122 and 410 that gives a step of 122,
  nothing survives below zero, and the true value becomes the smallest option on screen *every time* —
  a narrower tell than the one being removed, wearing the disguise of a fix. 13 forms were affected.
  Capping the step so three candidates still fit below the value took it to one.
- **Result: the on-screen middle-value rate is 52.7%, down from 91.4%, against a chance floor of 50%.**
  Rank distribution 25.0 / 25.0 / 24.9 / 25.1 over 8,000 draws. 317 of 373 all-numeric forms carry a
  rule; the 56 that cannot are the entire residual (L-011).
- Added `effectiveNumericMiddleRankRate` — the stored-options measure would have kept reporting 91%
  for forms no reader meets, and would have reported an *improvement* if a form merely became
  underivable. Both numbers are now in `deck:report`, labelled.
- Presentation order is randomised for non-generated forms too, removing v0's 29.6% position skew.
- L-012 logged: `f387[2]` (£3,000 small-claims limit) still cannot place its answer at every rank.

**Ledger:** L-002 → `fixed-unverified`. Not closed here — the fixer never closes their own finding, and
`verified-fixed` needs a fresh session re-running the original measurement.

## 2026-08-04

**Phase 0 — interrogation and the BRIEF.**

- Read v0 in full (`README.md`, `index.html`, `facts.js`) read-only. v0 untouched throughout.
- Pre-flight tooling check: process kit skills, `auditor` agent, Node 24.16, git 2.54, `gh` (authed
  as LCirujan0), Vercel CLI (authed) all present. GitHub plan had to be asked — the token lacks
  `read:user`.
- **Measured the deck before asking anything.** Found R1: the correct answer is a middle value in
  91.4% of 373 all-numeric forms against 50% by chance, and the longest option in 40.2% of 749 forms
  against 25%. Answer position was clean. Also found six facts with a single recall-usable form, the
  f193/f352 duplicate, and the f205/f206 ambiguous stem.
- Pre-mortem run properly: Claude's 12 items written and sealed to
  `docs/premortem-claude-sealed.md` *before* the owner was asked, so independence is checkable from
  the timestamp. Owner's three merged in. His "not enough questions" caught what Claude missed — a
  fixed bank of 1,228 forms is the same failure the project was founded to prevent, and it bites
  hardest on leeches, which are drilled most. Six risks survived into BRIEF §Risks.
- Wrote `docs/BRIEF.md` and opened `docs/DECISIONS.md` early (D-001…D-009), because four architecture
  decisions were settled and the BRIEF firewall forbids technology in it.

**Phase 1 — ten questions, then build.**

- D-010…D-020 logged. Two answers changed the project's shape: no sign-in at all (so the system now
  holds **zero personal data**, and §E collapses), and Vercel Postgres over Supabase.
- Readiness redefined as **two** numbers, recall and exam-format, partly superseding D-004 — the real
  exam is multiple choice, so free recall alone would systematically understate.

**Milestone 1 — deck pipeline, scheduler, simulation (D-019).**

- Scaffolded Next.js 16.3 / React 19.2 in `v1/`, no Tailwind, `src/` layout.
- Migrated 410 facts / 1,228 forms from v0's positional arrays into typed per-chapter modules.
  **Verified by round-trip** — the emitted deck is reconstructed into v0's exact positional shape and
  compared against `facts.js`, rather than reviewed by eye.
- Deck analysis as pure functions plus a defect ratchet (`baseline.ts`) so CI is green on a deck that
  genuinely has known defects, while none of them can worsen.
- Ported the scheduler as pure functions: SM-2 with all five of v0's additions, seeded deterministic
  RNG, queue building, append-only event log with commutative merge and replay, and the v0 state
  import for S6.
- **Deliberate divergence from v0 (L-001):** v0 fuzzed *after* capping, so a 30-day interval could
  reach 32 and the breadth gate was ~5% leakier than its README claimed. v1 fuzzes first and caps
  second, making `interval <= cap` a real invariant.
- 60-day simulation in CI with per-review invariant assertions. Peak 187 on day 9, 410/410 facts
  started, 397 proven on every phrasing, queue drains every day, zero invariant violations.
- **Fixed a defect in the simulation harness (L-010)** found by investigating why the tail did not
  settle: the learner model keyed recall probability off `state.ok[form]`, which a lapse resets — so
  every lapse silently returned the modelled learner to never-seen, and `pickForm` then preferentially
  served that form. ~1,200 phantom lapses on a correct scheduler. Exposure is now tracked separately.
- Design tokens (reference + semantic) extracted from v0's palette, with
  `stylelint-declaration-strict-value` failing the build on raw values **on the same day** — it caught
  a raw `1ms` immediately, which is the point.
- CI: typecheck, eslint, token lint, tests, build, gitleaks, and a job that fails on any change to v0.
  Same gate in `.githooks/pre-push`. Actions pinned to commit SHAs, workflow permissions read-only.

**Repo live.** [LCirujan0/lituk-drill](https://github.com/LCirujan0/lituk-drill), public per D-005.
All three CI checks green on the first push; the pre-push hook fired and ran the full gate before the
push left the machine. `main` protected — required status checks, linear history, no force pushes, no
deletions, no review required. Consequence worth stating: **direct pushes to `main` are now rejected**,
so work lands via PRs. That is the trade D-005 bought and it is the right one under D-006's full
autonomy — a local hook can be bypassed with `--no-verify`, a required check cannot.

**Deferred, deliberately:** generated numeric distractors (D-014, closes L-002) · the readiness model ·
practice mode · mocks · the timeline screen · any real UI · database provisioning. All of milestone 2+.

**Discovered:** v0's `pickForm` serves the least-proven phrasing first, which interacts with the
fact-level lapse in a way worth remembering — after a lapse clears one phrasing's credit, that
phrasing is what gets served next. Correct by design (drill the weakness), and the reason L-010 was so
costly.
