#!/usr/bin/env bash
# Build and publish the preview to the gh-pages branch (GitHub Pages serves it).
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
touch dist/.nojekyll   # keep the _astro/ folder (Jekyll would drop it)
cd dist
git init -q -b gh-pages
git add -A
git commit -qm "Preview build $(date '+%Y-%m-%d %H:%M')"
git push -f -q "$(git -C .. remote get-url origin)" gh-pages
rm -rf .git
echo "Deployed: https://paulokogwu.github.io/progressive-dental/"
