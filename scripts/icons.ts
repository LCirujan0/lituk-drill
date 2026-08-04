/**
 * Rasterise `public/icon.svg` into the Home Screen icon set.
 *
 *   npm run icons
 *
 * The PNGs are committed, so nothing in CI or on a deploy runs this — it is a one-off tool
 * for when the artwork changes.
 *
 * iOS does not scale one icon well and does not read SVG for `apple-touch-icon`, so the sizes
 * are produced explicitly. 180 is the iPhone Home Screen; the rest cover iPad and older
 * devices, and 192/512 are what the web manifest wants.
 *
 * **Text is drawn as paths, not as a `<text>` element.** librsvg — which is what does the
 * rendering here — resolves fonts against the host system, so a `<text>` icon renders
 * differently on this machine, on CI and on a colleague's, and the failure is silent: you get
 * an icon, just the wrong one. Paths render identically everywhere.
 */

import { readFileSync, writeFileSync } from 'node:fs';

import sharp from 'sharp';

const SOURCE = 'public/icon.svg';
const svg = readFileSync(SOURCE);

const sizes: readonly [string, number][] = [
  ['public/apple-touch-icon.png', 180],
  ['public/apple-touch-icon-167.png', 167],
  ['public/apple-touch-icon-152.png', 152],
  ['public/apple-touch-icon-120.png', 120],
  ['public/icon-192.png', 192],
  ['public/icon-512.png', 512],
  ['public/favicon-32.png', 32],
];

// Wrapped rather than top-level await: this file is a `.ts` script and tsx compiles it to
// CommonJS, where top-level await is a hard error.
async function main() {
  for (const [path, size] of sizes) {
    const png = await sharp(svg, { density: 512 })
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toBuffer();
    writeFileSync(path, png);
    console.log(`${path.padEnd(34)} ${size}×${size}  ${(png.length / 1024).toFixed(1)} kB`);
  }
}

void main();
