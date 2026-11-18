/** What visitors look at and click: sections seen, time per section, scroll depth, navigation and outbound links. */
import { $$ } from '../lib/env.js';
import { track } from '../lib/telemetry.js';

const MIN_SECONDS = 2; // shorter stays are noise
const SCROLL_MARKS = [25, 50, 75, 100];
const NAV_AREAS = { '.nav': 'nav', '#menu': 'menu', '#dock': 'dock' };

/**
 * A section counts as "being read" while it crosses a thin band at the middle of the screen, so tall
 * sections work on small screens and only one section is active at a time.
 */
function trackSections() {
  const viewed = new Set();
  const active = new Set();
  const dwellMs = new Map();
  let shown = document.visibilityState === 'visible';
  let last = performance.now();

  const tick = () => {
    const now = performance.now();
    if (shown) for (const name of active) dwellMs.set(name, (dwellMs.get(name) ?? 0) + now - last);
    last = now;
  };

  const flush = () => {
    tick();
    for (const [section, ms] of dwellMs) {
      const seconds = Math.round(ms / 1000);
      if (seconds < MIN_SECONDS) continue;
      track('section_time', { section, seconds });
      dwellMs.delete(section);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    tick();
    for (const { target, isIntersecting } of entries) {
      const section = target.dataset.section;
      if (!isIntersecting) {
        active.delete(section);
        continue;
      }
      active.add(section);
      if (!viewed.has(section)) {
        viewed.add(section);
        track('section_viewed', { section });
      }
    }
  }, { rootMargin: '-45% 0px -45% 0px' });
  for (const section of $$('[data-section]')) observer.observe(section);

  document.addEventListener('visibilitychange', () => {
    tick();
    shown = document.visibilityState === 'visible';
    if (!shown) flush();
  });
  addEventListener('pagehide', flush);
}

function trackScrollDepth() {
  const pending = [...SCROLL_MARKS];
  const onScroll = () => {
    const percent = ((scrollY + innerHeight) / document.documentElement.scrollHeight) * 100;
    while (pending.length && percent >= pending[0] - 1) track('scroll_depth', { percent: pending.shift() });
    if (!pending.length) removeEventListener('scroll', onScroll);
  };
  addEventListener('scroll', onScroll, { passive: true });
}

/** In-page navigation and links to other sites. Contact links have their own event and never reach here. */
function trackClicks() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || link.dataset.contact) return;

    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      const area = Object.entries(NAV_AREAS).find(([selector]) => link.closest(selector))?.[1];
      if (area) track('nav_clicked', { target: href, area });
    } else if (link.protocol.startsWith('http') && link.origin !== location.origin) {
      track('outbound_click', { destination: link.hostname + link.pathname });
    }
  });
}

export function initEngagement() {
  trackSections();
  trackScrollDepth();
  trackClicks();
}
