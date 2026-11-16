/** Buttons that lean towards the pointer and spring back on leave. */
import { $$, finePointer, reduceMotion } from '../lib/env.js';

export function initMagnetic() {
  if (!finePointer || reduceMotion) return;
  for (const el of $$('.magnetic')) {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - rect.left - rect.width / 2) * 0.25;
      const dy = (event.clientY - rect.top - rect.height / 2) * 0.35;
      el.style.transform = `translate(${dx}px,${dy}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transition = 'transform .6s cubic-bezier(.2,1.6,.4,1)';
      el.style.transform = '';
      setTimeout(() => (el.style.transition = ''), 600);
    });
  }
}
