/**
 * EN/PT switch. English is the markup default; elements opt in with
 * `data-i18n="key"` (inner HTML) or `data-i18n-attr="attribute:key"`, and the
 * Portuguese strings live in i18n/pt.js. Other modules react to LANG_EVENT.
 */
import pt from '../i18n/pt.js';
import { UI, META } from '../i18n/ui.js';
import { $, $$ } from '../lib/env.js';

export const LANG_EVENT = 'langchange';
const STORAGE_KEY = 'ev-lang';
const DICTIONARIES = { pt };

let lang = 'en';
const bindings = [];

export const getLang = () => lang;
export const t = (key) => UI[lang][key];

export function initI18n() {
  for (const el of $$('[data-i18n]')) {
    bindings.push({ el, key: el.dataset.i18n, en: el.innerHTML });
  }
  for (const el of $$('[data-i18n-attr]')) {
    const [attr, key] = el.dataset.i18nAttr.split(':');
    bindings.push({ el, attr, key, en: el.getAttribute(attr) });
  }
  for (const button of $$('.lang button')) {
    button.addEventListener('click', () => setLang(button.dataset.l, { persist: true }));
  }
  const initial = detectLang();
  if (initial !== 'en') setLang(initial);
}

function detectLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored in UI) return stored;
  } catch {}
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function setLang(next, { persist = false } = {}) {
  lang = next in UI ? next : 'en';
  const dictionary = DICTIONARIES[lang] ?? {};

  for (const { el, attr, key, en } of bindings) {
    const value = dictionary[key] ?? en;
    if (attr) el.setAttribute(attr, value);
    else el.innerHTML = value;
  }

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.title = META[lang].title;
  $('meta[name="description"]')?.setAttribute('content', META[lang].description);
  for (const button of $$('.lang button')) {
    const on = button.dataset.l === lang;
    button.classList.toggle('on', on);
    button.setAttribute('aria-pressed', on);
  }

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }
  document.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: { lang } }));
}
