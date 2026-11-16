# Eduardo Valencio — portfolio

Static site built with [Vite](https://vite.dev), vanilla JS, [GSAP](https://gsap.com) and [Lenis](https://lenis.darkroom.engineering).

```bash
npm install
npm run dev       # http://localhost:5173, also reachable on the LAN (0.0.0.0)
npm run build     # production build in dist/
npm run preview   # serve dist/ on port 4173
```

## Structure

```
index.html            markup, English by default
public/               favicon and images (served as-is)
src/
  main.js             boot order: wire features, play the intro, then animate the page in
  styles/             one CSS file per component; tokens.css holds colors, fonts and spacing
  features/           one module per behaviour (nav, carousel, clock, i18n, ...)
  lib/                shared helpers: env flags, gsap setup, text scramble
  data/               content that lives in code (marquee items)
  i18n/               pt.js (Portuguese strings) and ui.js (strings produced by JS)
```

## Conventions

- **Theming:** change `src/styles/tokens.css` (colors, fonts) and the Google Fonts `<link>` in `index.html`.
- **Translations:** mark an element with `data-i18n="key"` (replaces its inner HTML) or
  `data-i18n-attr="attribute:key"`, then add `key` to `src/i18n/pt.js`. The markup is the English source of truth.
  Strings created by JavaScript go in `src/i18n/ui.js`. The first visit follows the browser language; the EN/PT
  switch is remembered in `localStorage`. Features that depend on text layout listen for the `langchange` event.
- **Clock:** `features/clock.js` shows the visitor's local time and city from the browser's `Intl` time zone.
  No network request is made, so it works offline, is correct behind a VPN and sends no data to a third party.
- **Motion:** everything animated respects `prefers-reduced-motion`; custom cursor and tilt are fine-pointer only.
