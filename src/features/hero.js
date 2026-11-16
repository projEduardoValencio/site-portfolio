/** Hero entrance animation and the terminal's typed line. */
import { gsap } from '../lib/gsap.js';
import { $, reduceMotion } from '../lib/env.js';
import { typeText } from './typed.js';

export function playHeroEntrance() {
  setTimeout(() => typeText($('#typed')), 900);
  if (reduceMotion) return;

  gsap.from('.hero__title .line>span', { yPercent: 115, duration: 1.3, ease: 'expo.out', stagger: 0.1 });
  gsap.from('.hero__kicker span', { y: 20, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.2 });
  gsap.to('.hero .rv', { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 0.4 });
  gsap.from('.hero__meta > *', { y: -14, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.35 });
  gsap.from('.nav__bar', { y: -30, opacity: 0, duration: 1, ease: 'expo.out', delay: 0.3 });
}
