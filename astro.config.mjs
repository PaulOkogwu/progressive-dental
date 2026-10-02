// @ts-check
import { defineConfig } from 'astro/config';

// Preview lives on GitHub Pages under /progressive-dental. For progressivedental.ca set
// SITE=https://www.progressivedental.ca BASE=/ at build time.
export default defineConfig({
  site: process.env.SITE ?? 'https://paulokogwu.github.io',
  base: process.env.BASE ?? '/progressive-dental',
  // Emit our-team.html (not our-team/index.html) so the old page addresses keep working.
  build: { format: 'file' },
  devToolbar: { enabled: false },
});
