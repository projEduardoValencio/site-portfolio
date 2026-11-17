/**
 * Build-time SEO pages.
 *
 * - Fills in the absolute site URL (`%SITE_URL%`) used by canonical/hreflang/OG tags and JSON-LD.
 * - Emits a fully translated Portuguese page at /pt/ from the `data-i18n` keys in index.html and
 *   src/i18n/pt.js. The language switch is a plain link between the two pages, so no translation
 *   code ships to the browser and crawlers see both languages.
 * - Emits sitemap.xml and robots.txt.
 */
import { readFileSync } from 'node:fs';
import { parse } from 'node-html-parser';
import pt from '../src/i18n/pt.js';
import { META } from '../src/i18n/ui.js';

const LOCALES = {
  en: { path: '', ogLocale: 'en_US', hreflang: 'en' },
  pt: { path: 'pt/', ogLocale: 'pt_BR', hreflang: 'pt-BR' },
};

const parseHtml = (html) => parse(html, { comment: true });

/** Fails the build when index.html and pt.js disagree on keys, or when markup would be overwritten. */
function checkTranslations(html) {
  const root = parseHtml(html);
  const en = {};
  const put = (key, value) => {
    if (key in en && en[key] !== value) throw new Error(`[seo-pages] key "${key}" has two different English values`);
    en[key] = value;
  };
  for (const el of root.querySelectorAll('[data-i18n]')) {
    if (el.querySelector('[data-i18n]')) {
      throw new Error(`[seo-pages] data-i18n="${el.getAttribute('data-i18n')}" contains another data-i18n element; the parent would overwrite it`);
    }
    put(el.getAttribute('data-i18n'), el.innerHTML);
  }
  for (const el of root.querySelectorAll('[data-i18n-attr]')) {
    const [attr, key] = el.getAttribute('data-i18n-attr').split(':');
    put(key, el.getAttribute(attr));
  }
  const missing = Object.keys(en).filter((key) => !(key in pt));
  const unused = Object.keys(pt).filter((key) => !(key in en));
  if (missing.length || unused.length) {
    throw new Error(`[seo-pages] translation keys out of sync. Missing in pt.js: [${missing}]. Unused in pt.js: [${unused}]`);
  }
}

function setMeta(root, selector, attr, value) {
  const el = root.querySelector(selector);
  if (!el) throw new Error(`[seo-pages] ${selector} not found in index.html`);
  el.setAttribute(attr, value);
}

/** Returns the page for `lang` from English source HTML (already containing the real site URL). */
function localize(html, lang, siteUrl) {
  const root = parseHtml(html);
  const { path, ogLocale } = LOCALES[lang];
  const meta = META[lang];
  const url = siteUrl + path;

  if (lang !== 'en') {
    for (const el of root.querySelectorAll('[data-i18n]')) el.innerHTML = pt[el.getAttribute('data-i18n')];
    for (const el of root.querySelectorAll('[data-i18n-attr]')) {
      const [attr, key] = el.getAttribute('data-i18n-attr').split(':');
      el.setAttribute(attr, pt[key]);
    }
    root.querySelector('html').setAttribute('lang', 'pt-BR');
    for (const link of root.querySelectorAll('.lang a')) {
      const on = link.getAttribute('hreflang') === LOCALES[lang].hreflang;
      if (on) {
        link.setAttribute('class', 'on');
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('class');
        link.removeAttribute('aria-current');
      }
    }
  }
  root.querySelector('title').set_content(meta.title.replaceAll('&', '&amp;'));
  setMeta(root, 'meta[name="description"]', 'content', meta.description);
  setMeta(root, 'meta[property="og:title"]', 'content', meta.title);
  setMeta(root, 'meta[property="og:description"]', 'content', meta.description);
  setMeta(root, 'meta[name="twitter:title"]', 'content', meta.title);
  setMeta(root, 'meta[name="twitter:description"]', 'content', meta.description);
  setMeta(root, 'meta[property="og:url"]', 'content', url);
  setMeta(root, 'meta[property="og:locale"]', 'content', ogLocale);
  setMeta(root, 'meta[property="og:locale:alternate"]', 'content', lang === 'en' ? 'pt_BR' : 'en_US');
  setMeta(root, 'link[rel="canonical"]', 'href', url);
  return root.toString();
}

/** Same page, but for a document living one directory deeper (/pt/). */
const deeper = (html) => html.replace(/(src|href)="\.\//g, '$1="../').replace(/(src|href)="assets\//g, '$1="../assets/');

export function seoPages({ siteUrl }) {
  const source = () => readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const withUrl = (html) => html.replaceAll('%SITE_URL%', siteUrl);
  let isBuild = false;

  return {
    name: 'seo-pages',
    enforce: 'post', // generateBundle must run after Vite emits index.html
    configResolved: (config) => { isBuild = config.command === 'build'; },

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const en = withUrl(html);
        const root = parseHtml(en);
        if (root.querySelector('title').text !== META.en.title || root.querySelector('meta[name="description"]').getAttribute('content') !== META.en.description) {
          throw new Error('[seo-pages] <title>/<meta description> in index.html differ from META.en in src/i18n/ui.js');
        }
        checkTranslations(html); // runs on every build and dev start
        return en;
      },
    },

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!/^\/pt\/?(index\.html)?$/.test(req.url.split('?')[0])) return next();
        const page = await server.transformIndexHtml('/', source());
        res.setHeader('Content-Type', 'text/html');
        res.end(localize(page, 'pt', siteUrl));
      });
    },

    generateBundle(_, bundle) {
      if (!isBuild) return;
      const index = bundle['index.html'];
      const english = index.source.toString();
      index.source = localize(english, 'en', siteUrl);
      this.emitFile({ type: 'asset', fileName: 'pt/index.html', source: deeper(localize(english, 'pt', siteUrl)) });

      const day = new Date().toISOString().slice(0, 10);
      const alternates = Object.values(LOCALES)
        .map(({ path, hreflang }) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${siteUrl + path}"/>`)
        .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}"/>`)
        .join('\n');
      const urls = Object.values(LOCALES)
        .map(({ path }) => `  <url>\n    <loc>${siteUrl + path}</loc>\n    <lastmod>${day}</lastmod>\n${alternates}\n  </url>`)
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n` });
    },
  };
}
