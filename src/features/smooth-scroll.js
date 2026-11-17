/** Lenis smooth scrolling, wired to GSAP's ticker, plus in-page anchor links. */
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '../lib/gsap.js';
import { $, $$, reduceMotion } from '../lib/env.js';

let lenis = null;

export function initSmoothScroll() {
  if (!reduceMotion) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop(); // locked until the preloader finishes
  }

  for (const link of $$('a[href^="#"]:not([data-contact])')) {
    link.addEventListener('click', (event) => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      // Deferred so a menu link can close the menu (restarting Lenis) first.
      setTimeout(() => scrollToElement(target), 0);
    });
  }
}

function scrollToElement(target) {
  if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: -10 });
  else target.scrollIntoView({ behavior: 'smooth' });
}

export function lockScroll() {
  if (lenis) lenis.stop();
  else document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
  if (lenis) lenis.start();
  else document.body.style.overflow = '';
}
