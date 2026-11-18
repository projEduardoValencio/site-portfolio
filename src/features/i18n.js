/**
 * Language handling. English (/) and Portuguese (/pt/) are separate prerendered pages (see
 * vite/seo-pages.js); the EN/PT switch is a plain link between them. This module only remembers the
 * visitor's choice and sends first-time English-root visitors whose browser is Portuguese to /pt/.
 */
import { UI } from '../i18n/ui.js';
import { $$ } from '../lib/env.js';
import { track } from '../lib/telemetry.js';

const STORAGE_KEY = 'ev-lang';

const lang = document.documentElement.lang.startsWith('pt') ? 'pt' : 'en';

/** Text produced by JavaScript, in the language of the page. */
export const t = (key) => UI[lang][key];

function storedLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored in UI ? stored : null;
  } catch {
    return null;
  }
}

/**
 * On the English root only: honour the stored choice, else the browser language. A direct /pt/ link
 * always stays Portuguese. Returns true when it navigated away (the caller should stop booting).
 */
export function redirectToPreferredLanguage() {
  if (lang !== 'en') return false;
  const preferred = storedLang() ?? (navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en');
  if (preferred === 'en') return false;
  location.replace(`./pt/${location.search}${location.hash}`);
  return true;
}

export function initI18n() {
  for (const link of $$('.lang a')) {
    link.addEventListener('click', () => {
      const selectedLanguage = link.getAttribute('hreflang').startsWith('pt') ? 'pt' : 'en';
      try {
        localStorage.setItem(STORAGE_KEY, selectedLanguage);
      } catch {}
      track('language_selected', { selected_language: selectedLanguage });
    });
  }
}
