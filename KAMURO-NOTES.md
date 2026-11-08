# Kelompok 5 — 第五組 "Kamuro" theme

Edo ukiyo-e x neon-night-street restyle. Original art, no third-party game assets.

## Run
npm install
npm run dev      # development
npm run build    # production -> dist/

## What's new
- src/kamuro.css   : the whole theme layer (loaded after index.css)
- src/fx/*         : intro, petals/embers canvas, slash cursor, heat gauge, route wipe,
                     lanterns, neon signs, ticker, wave dividers, skyline, tilt cards
- public/fonts     : self-hosted fonts (Latin + Japanese slices), no Google Fonts needed
- Content, data and routing are unchanged.

## Easter eggs
- Intro plays once per tab session (sessionStorage key `k5-intro-seen`).
- Konami code (up up down down left right left right B A) -> dragon fly-by + max heat.
- Click anywhere -> blade slash + petal burst.

## Notes
- prefers-reduced-motion turns off the heavy animations.
- If you add new kanji, run `python build_fonts.py` (needs `npm i --no-save @fontsource/{bebas-neue,cormorant-garamond,manrope,permanent-marker,yuji-boku,dela-gothic-one,shippori-mincho}`).
- README art is generated: see README.md > Regenerate the README art.

## Edo SZ font
Heading font is Edo SZ (Vic Fieger, freeware). Put `edosz.ttf` (or `edosz.woff2`) in `public/fonts/`.
Without the file, headings fall back to Bebas Neue automatically.
