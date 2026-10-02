// Builds the Progressive Dental logo as pure SVG paths (no fonts needed where it's used).
// Usage: node scripts/make-logo.mjs [script-face] [out.svg]
import opentype from 'opentype.js';
import fs from 'node:fs';

const face = process.argv[2] || 'great-vibes';
const out = process.argv[3] || 'src/assets/brand/logo.svg';
const load = (p) => { const b = fs.readFileSync(p); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.length)); };
const script = load(`node_modules/@fontsource/${face}/files/${face}-latin-400-normal.woff`);
const sans = load('node_modules/@fontsource/geist/files/geist-latin-300-normal.woff');

// Lay out glyph by glyph: opentype.js's shaping emits NaN for some script-font lookups.
function textPath(font, str, x, y, size) {
  const path = new opentype.Path(), scale = size / font.unitsPerEm;
  let prev = null;
  for (const ch of str) {
    const g = font.charToGlyph(ch);
    if (prev) x += font.getKerningValue(prev, g) * scale;
    path.extend(g.getPath(x, y, size));
    x += g.advanceWidth * scale; prev = g;
  }
  return path;
}
const n = (v) => (Math.round(v * 10) / 10).toString();
const toD = (path) => path.commands.map((c) =>
  c.type === 'Z' ? 'Z' : c.type === 'Q' ? `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`
  : c.type === 'C' ? `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}` : `${c.type}${n(c.x)} ${n(c.y)}`).join('');
const NAVY = '#1F2A7A', GREY = '#8C929B';
const word = textPath(script, 'Progressive', 0, 120, 140);
const wb = word.getBoundingBox();
const tagSize = 30;
const tag = textPath(sans, 'dental studio inc.', 0, 0, tagSize);
const tb = tag.getBoundingBox();
// place tagline under the right half of the wordmark
const tx = wb.x2 - (tb.x2 - tb.x1) - 6, ty = 168;
const tagP = textPath(sans, 'dental studio inc.', tx, ty, tagSize);
// tooth outline above the end of the wordmark
const toothX = wb.x2 - 46, toothY = wb.y1 - 26, s = 1.0;
const t = (x, y) => `${(toothX + x * s).toFixed(1)},${(toothY + y * s).toFixed(1)}`;
const tooth = `M${t(20,30)} C${t(20,12)} ${t(34,6)} ${t(44,12)} C${t(48,14)} ${t(52,14)} ${t(56,12)} C${t(66,6)} ${t(80,12)} ${t(80,30)} C${t(80,46)} ${t(74,56)} ${t(72,72)} C${t(70,86)} ${t(66,92)} ${t(62,92)} C${t(57,92)} ${t(56,80)} ${t(54,70)} C${t(53,64)} ${t(47,64)} ${t(46,70)} C${t(44,80)} ${t(43,92)} ${t(38,92)} C${t(34,92)} ${t(30,86)} ${t(28,72)} C${t(26,56)} ${t(20,46)} ${t(20,30)}Z`;
const ruleY = ty + 10;
const x1 = Math.min(wb.x1, 0) - 4, y1 = Math.min(wb.y1, toothY) - 4;
const x2 = Math.max(wb.x2, toothX + 80 * s, tx + tb.x2) + 6, y2 = Math.max(wb.y2, ruleY) + 6;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x1.toFixed(0)} ${y1.toFixed(0)} ${(x2 - x1).toFixed(0)} ${(y2 - y1).toFixed(0)}" role="img" aria-label="Progressive Dental Studio Inc.">
<path d="${tooth}" fill="none" stroke="var(--logo-tooth, ${GREY})" stroke-width="3.2" stroke-linejoin="round"/>
<path d="M${(wb.x1 + 40).toFixed(0)} ${ruleY} H${(tx - 10).toFixed(0)}" stroke="var(--logo-rule, ${GREY})" stroke-width="1.5"/>
<path d="${toD(word)}" fill="var(--logo-ink, ${NAVY})"/>
<path d="${toD(tagP)}" fill="var(--logo-tag, ${NAVY})" opacity=".85"/>
</svg>
`;
fs.mkdirSync(out.split('/').slice(0, -1).join('/') || '.', { recursive: true });
fs.writeFileSync(out, svg);
console.log(out, Math.round(x2 - x1), 'x', Math.round(y2 - y1));
