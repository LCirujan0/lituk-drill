/**
 * Where the bottom edge of the app lives.
 *
 * ## Why this is a test over CSS *source* rather than over a rendered page
 *
 * The component tests run in jsdom, which does no layout at all: every box is 0x0 and
 * `getBoundingClientRect` returns zeros. So the honest options were a source assertion or no
 * check, and no check is how this bug survived. It was found by measuring a real browser at
 * 393x852 — the deepest box on every screen ended at 836 against a viewport of 852 — and
 * nothing in the suite could have said so.
 *
 * ## The invariant
 *
 * **Exactly the two elements that can be the bottom-most box carry the bottom safe-area inset,
 * and nothing sits below them.** Those two are the tab bar (every tab view) and the drill's
 * action bar (every drill view; the tab bar is hidden there). The frame — body and `.wrap` —
 * must not add bottom padding of its own, because padding on the frame is a strip of page
 * colour *below* the last bar. In dark mode against a near-black page that reads as a black
 * band, which is exactly what was reported.
 *
 * Applied to the body, the inset also could not be reclaimed by anything: it is outside every
 * element that could paint into it. Applied to the bars, the bar's own box reaches the physical
 * bottom and the inset becomes clearance for the home indicator *inside* the interface.
 *
 * This would have failed against the code it replaced on three of its four assertions, which
 * was checked by running it there first.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { describe, expect, it } from 'vitest';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = (path: string) => readFileSync(join(root, path), 'utf8');

/**
 * The declarations inside the rule whose selector is EXACTLY this one.
 *
 * Comments are stripped first, so a comment mentioning a declaration cannot satisfy a test —
 * and every rule in these three files is commented. The selector must be preceded by the start
 * of the file or the end of the previous rule, which is what keeps `body` from matching the
 * `html, body` reset immediately above it. That mis-match is not hypothetical: the first
 * version of this helper used `indexOf` and found the reset.
 */
function block(source: string, selector: string): string {
  const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, '');
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = withoutComments.match(new RegExp(`(?:^|\\})\\s*${escaped}\\s*\\{([^}]*)\\}`));
  expect(match, `no rule with the exact selector \`${selector}\``).not.toBeNull();
  return match![1];
}

const GLOBALS = 'src/app/globals.css';
const TAB_BAR = 'src/components/TabBar.module.css';
const DRILL = 'src/components/Drill.module.css';

/**
 * Both spellings, on purpose. Stylelint's `declaration-block-no-redundant-longhand-properties`
 * rewrites `padding-block-start` + `padding-block-end` into the two-value `padding-block`
 * shorthand, so a test that only knew the longhand would fail the moment the linter had its
 * way — and, worse, would pass on the body where the same shorthand is the actual defect.
 */
const BOTTOM_INSET = /padding-block(?:-end)?:[^;]*env\(safe-area-inset-bottom\)/;

describe('the bottom edge belongs to the bottom-most bar', () => {
  it('gives the tab bar the bottom safe-area inset', () => {
    expect(block(css(TAB_BAR), '.bar')).toMatch(BOTTOM_INSET);
  });

  it('gives the drill action bar the bottom safe-area inset', () => {
    // The tab bar is hidden during a drill, so this bar is the bottom-most box there. Without
    // the inset the card's Previous / Got lucky / Next row sits under the home indicator.
    expect(block(css(DRILL), '.actions')).toMatch(BOTTOM_INSET);
  });

  it('keeps the frame out of the bottom inset', () => {
    // On the body the inset is unreachable: no element can paint into it, so it is a strip of
    // page colour below the whole app.
    const body = block(css(GLOBALS), 'body');
    expect(body, 'the top inset is still needed — the notch is real').toContain(
      'env(safe-area-inset-top)',
    );
    // `BOTTOM_INSET` matches the two-value `padding-block` shorthand as well as the longhand,
    // so restoring `padding-block: env(top) env(bottom)` here fails this line.
    expect(body, 'the bottom inset belongs to the bars, not the body').not.toMatch(BOTTOM_INSET);
  });

  it('leaves no padding under the last bar', () => {
    // `.wrap` pads all four sides; this is the override that zeroes the bottom one. 16px of it
    // is what the browser measurement found under every screen.
    expect(block(css(GLOBALS), '.wrap')).toMatch(/padding-block-end:\s*0/);
  });
});
