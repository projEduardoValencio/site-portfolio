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
- **Translations:** English is the markup; mark an element with `data-i18n="key"` (replaces its inner HTML) or
  `data-i18n-attr="attribute:key"` and add `key` to `src/i18n/pt.js`. At build time `vite/seo-pages.js` generates a
  fully translated page at `/pt/` (the build fails if keys are out of sync or a `data-i18n` element contains another).
  The EN/PT switch is a plain link between `/` and `/pt/`; `features/i18n.js` only remembers the choice and sends
  first-time visitors with a Portuguese browser to `/pt/`. Text produced by JavaScript lives in `src/i18n/ui.js`.
- **Clock:** `features/clock.js` shows the visitor's local time and city from the browser's `Intl` time zone.
  No network request is made, so it works offline, is correct behind a VPN and sends no data to a third party.
- **Motion:** everything animated respects `prefers-reduced-motion`; custom cursor and tilt are fine-pointer only.

## SEO

Handled at build time by `vite/seo-pages.js` plus the `<head>` of `index.html`:

- title, description, canonical, `hreflang` (en, pt-BR, x-default), Open Graph / Twitter cards, JSON-LD (`ProfilePage`, `WebSite`, `Person`);
- `sitemap.xml` and `robots.txt` are generated; `public/` holds `og-image.png`, icons, `site.webmanifest` and `404.html`;
- the site URL is `SITE_URL` (default `https://www.eduardovalencio.com.br/` in `vite.config.js`); change it if the domain changes, e.g. `SITE_URL=https://example.com/ npm run build`;
- `<title>`/description in `index.html` must match `META.en` in `src/i18n/ui.js` (checked by the build).

After deploying: add the site to [Google Search Console](https://search.google.com/search-console) and Bing Webmaster Tools,
submit `sitemap.xml`, request indexing for `/` and `/pt/`, and run the Rich Results Test on both URLs.

## Contact details

The email address and WhatsApp number are not in the HTML. `src/data/contact.js` keeps them (base64) and
`features/contact.js` sets the real `mailto:`/`wa.me` links on the first hover/focus/touch of a contact link.
This only stops scrapers that read markup; to stop publishing the real address, put a forwarding alias on the
domain (e.g. `contato@eduardovalencio.com.br`, free with Cloudflare Email Routing or ImprovMX) and replace `EMAIL`.

## Telemetry

Anonymous, cookieless analytics with [Umami Cloud](https://umami.is) (page views, events) and
[PostHog](https://posthog.com) (events, exceptions; `persistence: 'memory'`, no autocapture, no session recording).
`lib/telemetry.js` is the only entry point (`track(name, props)`); `features/engagement.js` records sections seen,
time per section, scroll depth, in-page navigation and outbound links. Events never carry personal data.

It is **off** unless the build is a production build served from a host listed in `VITE_TELEMETRY_DOMAINS`, and it
honours Do Not Track. Variables (see `.env.example`; in CI they are repository *secrets*, wired in `deploy.yml`):
`VITE_TELEMETRY_DOMAINS`, `VITE_UMAMI_WEBSITE_ID`, `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`.
To turn it off, empty `VITE_TELEMETRY_DOMAINS`. Plan and tasks: `spec/telemetry/`.
