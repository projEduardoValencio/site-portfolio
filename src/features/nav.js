/** Floating nav: scroll state, active-link indicator, fullscreen menu and mobile dock. */
import { $, $$ } from '../lib/env.js';
import { scramble } from '../lib/scramble.js';
import { lockScroll, unlockScroll } from './smooth-scroll.js';
import { LANG_EVENT, t } from './i18n.js';

export function initNav() {
  const nav = $('.nav');
  const dock = $('#dock');
  const burger = $('#burger');
  const menu = $('#menu');
  const indicator = $('#navInd');
  const contact = $('#contato');
  const links = $$('.nav__links a');
  let active = null;

  const moveIndicator = (link) => {
    indicator.style.opacity = link ? 1 : 0;
    if (!link) return;
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
  };

  for (const link of links) {
    link.addEventListener('pointerenter', () => {
      moveIndicator(link);
      scramble(link, { duration: 400 });
    });
  }
  $('.nav__links').addEventListener('pointerleave', () => moveIndicator(active));

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', scrollY > 40);
    dock.classList.toggle('show', scrollY > innerHeight * 0.8 && contact.getBoundingClientRect().top > innerHeight * 0.9);

    // scroll spy: the section crossing 40% of the viewport owns the highlight
    const probe = innerHeight * 0.4;
    const current = links.find((link) => {
      const rect = $(link.getAttribute('href'))?.getBoundingClientRect();
      return rect && rect.top <= probe && rect.bottom > probe;
    }) ?? null;
    if (current !== active) {
      for (const link of links) link.classList.toggle('active', link === current);
      active = current;
      moveIndicator(current);
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => moveIndicator(active));

  const isMenuOpen = () => document.body.classList.contains('menu-open');
  const syncBurgerLabel = () => burger.setAttribute('aria-label', t(isMenuOpen() ? 'menuClose' : 'menuOpen'));
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    syncBurgerLabel();
    if (open) lockScroll();
    else unlockScroll();
  };

  burger.addEventListener('click', () => setMenu(!isMenuOpen()));
  for (const link of $$('a[href^="#"]', menu)) link.addEventListener('click', () => setMenu(false));
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen()) setMenu(false);
  });

  document.addEventListener(LANG_EVENT, () => {
    syncBurgerLabel();
    requestAnimationFrame(() => moveIndicator(active)); // link widths change with the language
  });
  syncBurgerLabel();
}
