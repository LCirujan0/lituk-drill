# The explanation standard

How the panel under a card is written, and why each rule is there. Every rule below either
names the evidence it rests on or is marked as a judgement. **Where the evidence is thin or
points the other way, it says so** — a standard that only cites what suits it is advocacy.

Four independent research passes fed this: the retention evidence base, mnemonic technique by
fact type, expert flashcard-authoring practice, and a deeper dig into memory palaces and
chunking specifically. Sources are named inline; the full briefs are not reproduced here.

---

## What the panel is

It appears **after** the answer, on every card, and it is re-read tens of times over months.
That makes it three things at once, in descending order of evidential support:

1. **Post-retrieval feedback.** The best-supported thing it can be. Retrieval practice with
   corrective feedback beats retrieval without it (Yang et al. 2021: g = 0.54 with feedback,
   0.37 without).
2. **An error-repair surface.** Multiple-choice testing installs the wrong options as false
   knowledge, and this scales with how many lures are read (Roediger & Marsh 2005). Feedback
   both raises correct responses and reduces lure intrusions (Butler & Roediger 2008). Since
   this deck's options leak (L-002), the panel is repairing damage the format causes.
3. **Elaboration.** The weakest of the three, and the one everyone assumes is the point.

### The finding that should temper the whole exercise

Butler, Godbole & Marsh (2013) is the study that isolates our exact question, and it is a
null for the obvious case: explanation feedback and correct-answer feedback produced
**equivalent** performance on repeated questions. Explanation only won on **new** questions.

So a richer panel does not, on the evidence, improve recall of a question asked the same way
again. What it improves is answering something you have not seen before.

**That is why this app can justify the work and a normal flashcard app cannot.** The BRIEF's
outcome measure is the proportion of facts answerable *when phrased in a way not seen before*;
every fact carries several phrasings; mocks are drawn from unseen forms (D-017). The transfer
case is not a side effect here, it is the product. Elaborate on that basis, and do not claim
"explanations aid retention" — it is the popular claim and the weakest one.

---

## The shape

Every panel uses the **same skeleton in the same order**, on all 528 cards.

```
1  ANSWER      The answer as a complete sentence, readable without the question.
2  DISCRIMINATOR  What separates it from the thing it gets confused with. Directional.
3  ANCHOR      One precise reason, comparison or link. Only if a precise one exists.
4  CLUSTER     The other examinable members of the same story, each with a distinguishing
               detail. Only where they are genuinely one story.
```

Drop lines from the bottom, never the top. **Two good lines beat five padded ones.**

Uniformity is doing real work in three directions. A structurally distinctive panel is a
*shape*, and shapes get pattern-matched (Matuschak). A returning reader who has seen a card
twenty times needs to find the one line they want and skip the rest — the expertise-reversal
effect says the support that helped a novice is a cost to the same person later (Kalyuga et
al.). And it means an off-source correction (below) always sits in the same place, so it never
becomes a cue in itself.

### Verbatim-stable

**A panel's wording never changes once written**, and it is never generated per presentation.
Spacing works through study-phase retrieval — a later showing works by retrieving the earlier
one — and for associative material, varying the surface form reduces the chance of that
(Cowan et al. 2024, PNAS: spacing benefits emerged only in the *absence* of variability). The
options rotate by design (D-014); the explanation must not.

---

## The hard rule

> **Only people, dates, events and figures that appear in the handbook may be named.**

This is not editorial fussiness, it is the correct response to a measured failure mode. A
spaced-repetition system optimises memory for whatever is put into it, faithfully, including
things that are not examinable and things that are not true. An off-source date is not merely
wasted — it is learned as reliably as the answer and then competes with it. Off-source content
is interference we authored ourselves.

It has already happened: an explanation asserted Baird demonstrated television in **1924**. The
handbook says only "in the 1920s", and 1924 appears nowhere in it.

**Enforced by `npm run deck:vocab`.** Years are ratcheted in `baseline.ts` — a four-digit year
is in the book or it is not. Capitalised names are a report, because the heuristic over-flags
(plurals and adjectives of real handbook words land in it) and a ceiling on noise is a ceiling
that gets raised. Read it; do not gate on it.

Corollaries:

- **No new numbers.** A "why" that needs a figure the handbook does not give is rewritten to a
  "why" that does not. This is the commonest way content smuggles itself in — a date added for
  narrative flow.
- **No causal claims the handbook does not make.** Explaining *why* is the panel's job, but the
  reasoning must come from the handbook's own framing, or be structural rather than factual.
- **No naming a body, person or event solely to contrast with.** See the cluster rule.

### Where the handbook and reality disagree

**The handbook wins, without hedging, on the answer line** (D-023). It says the Council of
Europe has 47 members; it has 46; the deck says 47.

Where a correction is worth carrying at all, it goes on the **last line, in the same form every
time**, framed as the source's claim rather than as truth — Nielsen's move of asking what a
*named source* claims rather than what is so. lifeintheuk.net has run this exact problem at
scale and reached the same arrangement: the official text as written, corrections held
separate and clearly labelled.

**This is a deliberate cost, recorded rather than drifted into.** A correction is a second,
competing fact attached to a card whose whole purpose is to install the first. Carry one only
where a reader who already knows better would otherwise distrust the card.

---

## By fact type

### Dates and chronology

**Chain them causally, not sequentially.** "X, which is why Y" outperforms "X, then Y" — events
on a causal chain, and with more causal connections, are better recalled (Trabasso & van den
Broek 1985). A bare timeline is the weaker construction.

**Anchor to a handful of landmarks** rather than teaching every date as an independent number.

**Do not build hooks on the digits.** No phonetic tricks, no Major system, no rhyme. There is
**no experimental evidence for date mnemonics in adults** — the recommendations that circulate
are extrapolated from vocabulary studies with children. Digit systems also need a mapping the
panel cannot teach.

### People

**One concrete thing they did, stated so the person and the act interact.** Wollen, Weber &
Lowry (1972) is the decisive study: interacting images beat the control, **non-interacting
images were worse than no image at all**, and bizarreness made no difference either way.
Interaction is the active ingredient; strangeness is not.

**Do not build phonetic hooks on names.** The keyword method exists to make a *meaningless* cue
meaningful. "Claudius" and "invasion" are both already meaningful; the literature is explicit
that items with obvious familiar links may not need a keyword at all.

### Lists and sets

**Group them, name the grouping, and say why the group coheres.** Experimenter-imposed
hierarchical organisation produced recall 2–3× better than random presentation (Bower et al.
1969) — though the effect attenuates with recognition tests, and this app is multiple choice.

**Do not use first-letter acronyms as the retrieval route.** This is the clearest "avoid" in the
research. Carlson, Zimmer & Glover (1981) is titled *First-letter mnemonics: DAM (Don't Aid
Memory)* and found no effect on immediate or delayed recall; Radović & Manzey (2019) replicated
the null. Acronyms cue *order and position*, not identity — "R" does not regenerate "the rule of
law" unless you already know it. For a learner meeting five principles for the first time, an
acronym is a sixth thing to memorise. Use one only as a completeness check on items already
learned.

**On cluster size: do not cite Miller or Cowan to justify splitting a list.** Both numbers come
from immediate-recall tasks *engineered to block* long-term memory and rehearsal — the exact
opposite of this task. Cowan's 3–5 is defined by that suppression. Applying it to a panel read
and re-read over weeks is a category error. Four countries and five principles sit below every
capacity estimate on offer and need no splitting.

What *is* defensible: keep taught groups small and give a group beyond five or six an internal
structure. That is a judgement, not a measured result, and it is labelled as one.

### Numbers and quantities

**Give a comparison that makes the size reconstructible.** This is the best-evidenced device
available and the only one validated on *recall* against a repetition control: Barrio,
Goldstein & Hofman (2016) found ~67% of responses within 10% log-error with a perspective
versus ~57% without, and a repeated-quote control landed *between* the two — so the gain is not
from more words or a second exposure.

**Quality dominates presence.** In the same study a good comparison helped substantially and a
weak one ("$7.9bn = $25 per person") helped not at all, and in a second experiment *reversed*
by five points. Test every comparison by asking whether the reader already knows the reference
magnitude.

**Reconstructible, not merely illustrated.** "650 MPs, about one per 100,000 people" lets a
reader rebuild the figure from the population they also know. "650 MPs — a big room" does not.

*Honest limit: this rests substantially on one paper, with a two-minute retention interval.*

### Distinctions that get confused

**State the rule that separates them, directionally. Never a symmetric pair-list.**

This is where the cluster idea is most valuable and most dangerous, and the two sides of the
evidence apply to different things. Juxtaposing confusable items helps when it lets a reader
*induce a discriminating rule* (Birnbaum et al. 2013; Carvalho & Goldstone: interleaving helps
when categories are highly similar). It hurts when it simply attaches a second competing
associate to a shared cue — classic A-B/A-C interference, and the L2 vocabulary literature is
largely negative on teaching semantically clustered sets together.

Caesar and Claudius share one cue: "Roman invasion of Britain". Listing "Caesar 55 BC, Claudius
AD 43" is the interference case. Saying **"Caesar raided and left; Claudius conquered and
stayed"** is the discrimination case. The distinguishing feature is what converts one into the
other.

---

## The cluster rule

The owner's own example is the specification:

> Claudius, AD 43 — the invasion that stuck.
> Caesar, 55 BC — tried twice, failed, went home.
> Hadrian's Wall, AD 122 — the northern limit; Scotland never conquered.
> Left AD 410 — recalled to defend Rome. About 400 years in all.

Four examinable facts, each with its own distinguishing detail, held as one story. Note what
makes it work rather than backfire: **every line carries a discriminator**, not just a label.

Two conditions, both required:

1. **A panel may name a second fact only if that fact has its own card in the deck.** Grouping
   is then integration over components that are separately learned, which is the one form
   practitioners sanction (Borretti's synthesis exception; Matuschak on integrative prompts
   *after* the discrete components). Mechanically checkable against 528 facts.
2. **Only to draw a contrast the reader would otherwise get wrong.** Adjacency is not enough.
   Anki's own default is to *bury* siblings so two cards from one note never appear together —
   the software treats co-presentation of related material as a defect.

### The counter-evidence, stated plainly

This is the rule most likely to be wrong, and it deserves the strongest version of the case
against it.

**Seductive details make things worse, measurably.** Rey (2012), 39 effect sizes: retention
d = −0.30, transfer d = −0.48. Sundararajan & Adesope (2020), 68 effect sizes: g = −0.33. Harp
& Mayer (1998) traced the mechanism — the reader builds their mental model around the vivid
detail. Interesting-but-inessential material is *negative*, not neutral.

**So a panel whose story is more memorable than its fact has failed.** With 528 panels and a
mandate to be engaging, that is the live risk in this project, and the mitigation is the hard
rule above plus the cluster conditions: if it is not examinable and not discriminating, it is a
seductive detail wearing a costume.

**Also true: the evidence is strongest for elaborations the learner generates.** Self-generated
beats provided in the elaborative-interrogation literature (Pressley et al. 1987), and provided
explanations are frequently the *control group*. Two things soften it here — the card poses the
question before the panel appears, so the generation step is the retrieval itself; and provided
elaboration is specifically indicated where prior knowledge is low, which is the case for a
newcomer to UK history. But it should be known rather than glossed.

---

## Techniques ruled out, with reasons

**Memory palaces / method of loci.** Not "too expensive to train" — actively contraindicated
here. Written presentation *interferes* with the visuo-spatial imagery the method needs (De
Beni, Moè & Cornoldi 1997, titled almost exactly that); a supplied pathway underperformed plain
rehearsal on screen while beating it aloud (Moè & De Beni 2005); the technique buys *order*,
which these facts do not have (Roediger 1980); and the closest study to this delivery format —
a phone app with supplied palace templates, 359 adults, three months — found **no transfer**.
The meta-analysis is also weak where it counts: 89% of young-adult studies at high risk of bias,
and once corrected for small-study effects the pooled effect is zero.

**Bizarre or absurd imagery.** Requires mixed lists and free recall; the effect is a retrieval
artefact of recalling odd and ordinary items *together* (Geraci et al. 2013). This app is
pure-list, cued-recall and repeated — every enabling condition is absent, and bizarre material
is consistently *worse* for cued recall. Build interaction, not weirdness.

**Rhyme.** Small and poorly evidenced as memory support, and it carries the rhyme-as-reason
effect: rhyming statements are judged more accurate than meaning-matched non-rhyming ones
(McGlone & Tofighbakhsh 2000). Making a claim *feel* truer without being truer is the wrong
trade in a test-preparation tool.

**Interleaving as a rationale for anything.** For word and paired-associate material, blocking
beat interleaving (Brunmair & Richter 2019, g = −0.39). The benefit is discriminative contrast
between categories with shared structure; arbitrary facts have none.

**Perceptual difficulty** — odd fonts, deliberately harder wording. Does not replicate (Xie et
al. 2018; Sans Forgetica failed outright). "Desirable difficulty" is not a licence to make the
panel effortful.

**Mnemonic hooks by default.** The keyword method was rated **low utility** by Dunlosky et al.
(2013) — real benefits, but for limited materials and short intervals, with evidence that they
can *steepen* the forgetting curve (Wang & Thomas 1995: keyword learners forgot nearly twice as
much at two days, though five reviews brought them back to parity with a good semantic
explanation). Parity, note — not superiority. Over months of review a clear explanation and a
clever hook converge, so **use a hook only where a fact is genuinely resistant, and never force
one.**

Where a hook is used it must pass the mediator test (Pyc & Rawson 2010): is it **retrievable**
at test time, and does it **decode unambiguously** to the target? A hook failing either is worse
than plain prose.

---

## The checklist

Before an explanation is committed:

- [ ] Line 1 states the answer as a complete sentence, readable without the question.
- [ ] Every year, name, body and figure appears in the handbook. `npm run deck:vocab` is clean
      of new years, and any new names have been read.
- [ ] Every named second fact has its own card, and is there to draw a contrast.
- [ ] Every contrast is directional and names the distinguishing feature.
- [ ] Any comparison for a quantity is reconstructible and uses a magnitude the reader knows.
- [ ] No line is there because it is interesting. Interesting-but-inessential measures negative.
- [ ] It makes no claim about *which options are on screen* — those are generated per
      presentation and rotate (D-014, D-021). A panel that says "the answer is one of the two
      larger figures" is wrong on the next shuffle. **Six explanations already did exactly this;
      one would have steered the reader to a wrong option.**
- [ ] It does not restate the answer and stop.
- [ ] It is the same skeleton as every other panel.

---

## What is not known

Stated so nobody later mistakes this document for measurement.

No study in any of this covers the actual case: **arbitrary facts, solo adult study, read on a
phone after answering, re-encountered on a spaced schedule over weeks.** Every meta-analysis
cited is dominated by classroom and lab work with short retention intervals, younger learners,
and conceptual or transfer outcomes. The mnemonic literature specifically shows evidence of
publication bias and high risk of bias in most included studies.

The strongest single piece of evidence bearing on this rewrite (Butler et al. 2013) is a
**null** for the plainest reading of what we are doing. The defensible bet is on
**discrimination and error-repair**, which have direct multiple-choice evidence behind them —
not on "explanation aids retention".

One measurement risk worth carrying rather than forgetting: a reader who meets fact B inside
fact A's panel may later answer B's card by recognition rather than recall. That inflates
apparent knowledge, and it is a *second* inflation channel feeding the same readiness figure
that L-002 already feeds. Logged rather than assumed away.
