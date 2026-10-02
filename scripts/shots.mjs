// Full-page captures of every page at desktop and phone width into .impeccable/review/.
import { chromium } from 'playwright';
const base = process.env.URL ?? 'http://localhost:4321/progressive-dental/';
const pages = ['', 'our-successes.html', 'products--services.html', 'our-team.html', 'our-new-offices.html', 'contact-us.html'];
const browser = await chromium.launch();
for (const [label, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    // load lazy content and settle reveals
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('in')); });
    await page.waitForTimeout(1200);
    const name = (p.replace('.html', '') || 'index');
    await page.screenshot({ path: `.impeccable/review/${label}-${name}.png`, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (overflow > 0) console.log(`OVERFLOW ${label} ${name}: ${overflow}px`);
  }
  await ctx.close();
}
await browser.close();
console.log('done');
