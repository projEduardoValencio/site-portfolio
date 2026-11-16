/** Manifesto paragraph whose words light up as it scrolls into view. */
import { ScrollTrigger } from '../lib/gsap.js';
import { $ } from '../lib/env.js';
import { LANG_EVENT } from './i18n.js';

export function initManifesto() {
  const paragraph = $('#manifesto');
  let words = [];
  let progress = 0;

  const paint = () => {
    const lit = progress * words.length;
    words.forEach((word, i) => (word.style.opacity = i < lit ? 1 : 0.14));
  };
  // Re-split on every language change: i18n replaces the paragraph's contents.
  const split = () => {
    words = paragraph.textContent.split(' ').map((text) => {
      const span = document.createElement('span');
      span.className = 'w';
      span.textContent = text;
      return span;
    });
    paragraph.replaceChildren(...words.flatMap((word, i) => (i ? [' ', word] : [word])));
    paint();
  };

  split();
  document.addEventListener(LANG_EVENT, split);
  ScrollTrigger.create({
    trigger: paragraph,
    start: 'top 80%',
    end: 'bottom 45%',
    scrub: true,
    onUpdate: (self) => {
      progress = self.progress;
      paint();
    },
  });
}
