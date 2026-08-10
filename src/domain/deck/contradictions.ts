/**
 * Self-contradictions that are not defects, declared one by one.
 *
 * ## The problem this solves
 *
 * `selfContradictingForms` flags a distractor on one form that another form of the SAME fact
 * marks correct. That is the worst defect the deck can carry — the card asserts a true thing is
 * false and the schedule installs it — and it is why the check was written (L-033).
 *
 * Reading all twelve hits, **eleven are correct design and one was a real defect.** The check
 * cannot tell them apart, because the property it measures is a property of *strings* and the
 * distinction is a property of *questions*:
 *
 *   · Two forms of one fact often ask genuinely different things. "Who became monarch in 2022?"
 *     is Charles; "Who is the heir apparent?" is William. Offering William as a wrong answer to
 *     the first is not teaching a falsehood — it is teaching exactly the discrimination the
 *     fact exists to teach. Nine of the eleven are this.
 *   · A negative stem inverts the frame outright. "Which of these is NOT a UK coin?" has true
 *     statements as its distractors *by construction*, so every one of them will be some other
 *     form's correct answer and should be. Two of the eleven are this, and the check is
 *     structurally blind to it.
 *
 * ## Why a declaration list rather than a cleverer check, or a ratchet
 *
 * A ratchet at eleven is the option that looks cheapest and is the worst: the twelfth real
 * defect would arrive as a count of twelve against a ceiling of eleven, indistinguishable from
 * the noise it hides in, and the check's own report would read as "no regression".
 *
 * A cleverer check was considered and rejected for the reason `analysis.ts` already gives about
 * `cross-fact-collision` and `nested-option`: a check that cries wolf on good design is a check
 * that gets ignored. Auto-exempting negative stems was the tempting version — two lines, and it
 * would have cleared two of these — but it would also silently exempt a future NOT-form carrying
 * a genuine defect, and nobody would ever look again.
 *
 * So this follows the pattern `divergences.ts` used for the same shape of problem under D-023:
 * **the exception is data, it carries its reason, and the build fails in both directions.** An
 * undeclared contradiction fails. A declaration that no longer matches anything fails too —
 * which is what stops the list rotting as forms are edited, and is the half that a plain
 * allow-list would have missed.
 *
 * Each key is exactly the string `selfContradictingForms` emits, so the two cannot drift apart
 * without the stale-declaration check saying so.
 */

/** One flagged pair, and why it is not the deck teaching its own negation. */
export interface DeclaredContradiction {
  /** Exactly as `selfContradictingForms` emits it: `f422[0] "William, Prince of Wales"`. */
  readonly hit: string;
  /** Which form marks the string correct, so the claim can be checked rather than believed. */
  readonly against: string;
  readonly reason: string;
}

export const DECLARED_CONTRADICTIONS: readonly DeclaredContradiction[] = [
  {
    hit: 'f422[0] "William, Prince of Wales"',
    against: 'f422[2]',
    reason:
      'Different questions. Form 0 asks who became monarch in 2022 (Charles III); form 2 asks ' +
      'who is heir apparent (William). William is genuinely not the answer to the first, and ' +
      'offering him there is the discrimination the fact exists to teach.',
  },
  {
    hit: 'f451[0] "That Was The Week That Was"',
    against: 'f451[2]',
    reason:
      'Different decades. Form 0 asks for the satire of the 1980s and 1990s (Spitting Image); ' +
      'TW3 is a 1960s show and is wrong there. The pair is the point of the fact.',
  },
  {
    hit: 'f451[2] "Spitting Image"',
    against: 'f451[0]',
    reason: 'The same pair seen from the other side: form 2 asks for the 1960s show, and Spitting Image is not it.',
  },
  {
    hit: 'f454[0] "Gertrude Jekyll"',
    against: 'f454[2]',
    reason:
      'Different designers and different centuries. Form 0 asks for the 18th-century landscaper ' +
      '(Capability Brown); Jekyll worked with Lutyens much later and is correctly wrong there.',
  },
  {
    hit: 'f454[2] "Capability Brown"',
    against: 'f454[0]',
    reason: 'The other side of the same pair: form 2 asks who worked with Lutyens, which Brown did not.',
  },
  {
    hit: 'f473[2] "Independence for the countries of the Empire"',
    against: 'f473[1]',
    reason:
      'NEGATIVE STEM. Form 2 asks which subject the ‘wind of change’ speech did NOT concern, so ' +
      'its distractors are true statements by construction and every one of them will be some ' +
      'other form’s correct answer. The check reads strings and cannot see the inversion.',
  },
  {
    hit: 'f500[2] "£2"',
    against: 'f500[1]',
    reason:
      'NEGATIVE STEM. Form 2 asks which of these is NOT a UK coin (25p), so the £2 that form 1 ' +
      'marks correct as the highest-value coin is a true distractor by design.',
  },
  {
    hit: 'f511[1] "11.00 am"',
    against: 'f511[0]',
    reason:
      'The stem names the exception explicitly — "On Sundays, pubs usually open from what time?" ' +
      '— so 11.00 am is unambiguously wrong there. Note the mirror of this pair was NOT ' +
      'legitimate and was fixed: form 0 did not exclude Sunday, so its "12 noon" distractor was ' +
      'a true answer offered as false. Same fact, one real defect and one correct design.',
  },
  {
    hit: 'f522[0] "1922"',
    against: 'f522[1]',
    reason:
      'Radio and television are different services with different years. Form 0 asks for the ' +
      'first regular TV service (1936); 1922 is the radio year and is the best available lure.',
  },
  {
    hit: 'f522[1] "1936"',
    against: 'f522[0]',
    reason: 'The other side: form 1 asks for the radio year (1922), and 1936 is the television one.',
  },
  {
    hit: 'f556[0] "Winston Churchill"',
    against: 'f556[1]',
    reason:
      'Different questions. Form 0 asks who led the Labour government elected in 1945 (Attlee); ' +
      'form 1 asks whose deputy Attlee had been (Churchill). Churchill led the other party, ' +
      'which is precisely why he is the right wrong answer to the first.',
  },
];

const KEYS = new Set(DECLARED_CONTRADICTIONS.map((d) => d.hit));

/** Flagged pairs nobody has read and signed off. **Must be zero.** */
export const undeclared = (hits: readonly string[]): string[] =>
  hits.filter((h) => !KEYS.has(h));

/**
 * Declarations that no longer match anything the deck produces. **Must be zero.**
 *
 * This half is what makes the list a control rather than a suppression. A form edited so the
 * contradiction disappears leaves a declaration behind claiming to excuse something that is not
 * there — and the next real defect on that fact could then land under a key that reads as
 * already reviewed.
 */
export const stale = (hits: readonly string[]): string[] => {
  const seen = new Set(hits);
  return DECLARED_CONTRADICTIONS.map((d) => d.hit).filter((h) => !seen.has(h));
};
