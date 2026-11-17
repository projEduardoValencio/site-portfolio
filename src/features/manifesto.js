/** Manifesto paragraph whose words light up as it scrolls into view. */
import { ScrollTrigger } from '../lib/gsap.js';
import { $ } from '../lib/env.js';

export function initManifesto() {
  const paragraph = $('#manifesto');
  let words = [];
  let progress = 0;

  const paint = () => {
    const lit = progress * words.length;
    words.forEach((word, i) => word.classList.toggle('is-lit', i < lit));
  };
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
