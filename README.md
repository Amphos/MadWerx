# MadWerx — Portfolio (Static Site)

This repository reproduces the structure and idea of the Kenobi companies page, adapted to MadWerx with a dark, cold blue‑white theme, a cosmic‑resonance background, and password‑gated “Read more” links.

## What’s inside
- `index.html` — single‑page portfolio.
- `styles.css` — modern dark UI with glass cards and hover reveals.
- `script.js` — cosmic background, hover/touch UX, password gate.
- `assets/` — place your logo files here:
  - `logo-madwerx.png`
  - `logo-carbon.png`
  - `logo-maglev.png`
  - `logo-monetization.png`
  - `logo-atomic-resonance.png`
  - `logo-graphene.png`
  - `logo-dynamic-resonance.png`
  - `logo-eco-offgrid.png`

> If logos aren’t present, the page still renders, but images will 404 until added.

## Run locally
Just open `index.html` in a browser, or serve the folder with any static server.

## Behavior
- **Hover reveal**: each company card shows descriptive text and a “Read more” link on hover (or tap on mobile).
- **Password gate**: clicking “Read more” opens a modal. Enter password `integrity` to be forwarded to `https://www.nanoresonance.org` (temporary target for all companies).
- **Cosmic background**: a lightweight animated particle field suggests resonance lines.

## Customize
- Colors: tweak CSS variables at the top of `styles.css`.
- Cards: adjust copy directly in `index.html` or generate from JSON.
- Password: change the `PASSWORD` constant in `script.js`.

## Deploy
Any static host works (GitHub Pages, Netlify, Vercel).

## License
MIT
