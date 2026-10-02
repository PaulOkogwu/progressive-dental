# Progressive Dental Studio website

Redesign of progressivedental.ca for Progressive Dental Studio Inc. (Kitchener, ON). Built by Next Era Web Dev.

- Astro static site, same 6 pages and page addresses as the old site (`build.format: 'file'`).
- Preview: https://paulokogwu.github.io/progressive-dental/ (GitHub Pages, deployed automatically on every push to `main` by `.github/workflows/deploy.yml`).
- Contact info and hours: `src/data/site.ts`. Services copy: `src/data/services.ts`.
- 3Shape demo: `src/scripts/crown.ts` (three.js, procedural crown, labelled "Illustrative demo").
- Logo: `src/assets/brand/logo.svg`, rebuilt with `node scripts/make-logo.mjs`. Replace with the client's original file when we get it.

## Contact form (Web3Forms)
The form posts to Web3Forms with the key in `PUBLIC_WEB3FORMS_KEY`.
- Local: put `PUBLIC_WEB3FORMS_KEY=...` in `.env`.
- Preview: `gh variable set PUBLIC_WEB3FORMS_KEY --body <key>`, then push or re-run the deploy workflow.
- Launch: create a key for lab@progressivedental.ca at web3forms.com and swap it in.

## Launch on progressivedental.ca
Build with `SITE=https://www.progressivedental.ca BASE=/ npm run build` and upload `dist/`.

## Commands
`npm run dev` · `npm run build` · `node scripts/shots.mjs` (desktop + phone screenshots of every page)
