/** Scroll-driven animations: reveals, counters, parallax and the light/dark zone switch. */
import { gsap, ScrollTrigger } from '../lib/gsap.js';
import { $$ } from '../lib/env.js';

export function initScrollEffects() {
  for (const el of $$('.rv')) {
    gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  }

  for (const el of $$('[data-count]')) {
    const counter = { value: 0 };
    gsap.to(counter, {
      value: +el.dataset.count,
      duration: 1.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => (el.textContent = Math.round(counter.value)),
    });
  }

  ScrollTrigger.create({
    trigger: '#lightzone',
    start: 'top 55%',
    end: 'bottom 45%',
    toggleClass: { targets: document.body, className: 'is-light' },
  });

  gsap.to('.hero__title', {
    yPercent: -18,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.fromTo('#pimg', { yPercent: -8 }, {
    yPercent: 4,
    ease: 'none',
    scrollTrigger: { trigger: '.portrait', start: 'top bottom', end: 'bottom top', scrub: true },
  });
  gsap.from('.contact__big .line>span', {
    yPercent: 110,
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.08,
    scrollTrigger: { trigger: '.contact__big', start: 'top 85%' },
  });
  gsap.from('.card', {
    x: 120,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.08,
    scrollTrigger: { trigger: '#carousel', start: 'top 85%' },
  });
}
