# Alonge Olamide Samson | Portfolio

React + Vite + Tailwind single-page portfolio.

## Run locally
    npm install
    npm run dev          # http://localhost:5173
    npm run build        # outputs ./dist

## Deploy on Vercel
Import the repo in Vercel. It detects Vite automatically (build command `npm run build`, output directory `dist`).

## Things to edit
- Content lives in `src/App.tsx` (the data blocks near the top: experiments, alsoBuilt, publications, methods, log).
- Replace `public/resume.pdf` with your latest CV, keeping the same file name.
- Projects without links (Kinyarwanda platform, IGA Hifadhi) have empty `links: []`. Add repo or demo links there when ready.
- The plots on the Credit risk, Kinyarwanda and IGA cards (`public/ph/plot-*.svg`) are decorative template graphics. Swap in real figures when you have them.

Components from React Bits, shadcn/ui and Phosphor Icons; their licences are in `licenses/`.
