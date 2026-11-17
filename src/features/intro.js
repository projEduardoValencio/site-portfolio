/** Preloader sequence (once per browser session). Resolves when the page behind it can start animating in. */
import { gsap } from '../lib/gsap.js';
import { $, $$, reduceMotion } from '../lib/env.js';
import { scramble } from '../lib/scramble.js';

const SEEN_KEY = 'ev-intro-seen';
const hasPlayed = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};
const markPlayed = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {}
};

export function playIntro() {
  const loader = $('#loader');
  if (reduceMotion || hasPlayed()) {
    loader.remove();
    return Promise.resolve();
  }

  markPlayed();
  return new Promise((resolve) => {
    const count = $('#count');
    const bar = $('#lbar');
    const progress = { value: 0 };
    const timeline = gsap.timeline({ onComplete: () => loader.remove() });
    timeline.timeScale(innerWidth < 820 ? 1.3 : 1);

    timeline.call(() => scramble($('#lname'), { text: 'Eduardo Valencio', duration: 1400 }), null, 0);
    timeline.to(progress, {
      value: 100,
      duration: 2.6,
      ease: 'power2.inOut',
      onUpdate() {
        count.textContent = String(Math.round(progress.value)).padStart(3, '0');
        bar.style.width = `${progress.value}%`;
      },
    }, 0);
    $$('#llog > div').forEach((line, i) => {
      timeline.to(line, { opacity: 1, y: 0, duration: 0.35, ease: 'expo.out' }, 0.15 + i * 0.5);
    });
    timeline.to('#llog, .loader__name, .loader__top', { opacity: 0, duration: 0.3 }, 2.75);
    timeline.to(loader, { yPercent: -100, duration: 1.05, ease: 'expo.inOut' }, 2.9);
    timeline.add(resolve, 3.2); // the page starts while the loader is still sliding away
  });
}
