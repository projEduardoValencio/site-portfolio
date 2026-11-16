/** Custom cursor: a dot that follows the pointer and a label bubble that eases behind it. */
import { $, finePointer } from '../lib/env.js';

export function initCursor() {
  if (!finePointer) return;
  const dot = $('.cursor');
  const follower = $('.cursor-wrap-label');
  const label = $('.cursor__label');
  let mx = innerWidth / 2, my = innerHeight / 2;
  let fx = mx, fy = my;
  let raf = 0;

  const frame = () => {
    fx += (mx - fx) * 0.2;
    fy += (my - fy) * 0.2;
    dot.style.transform = `translate(${mx}px,${my}px)`;
    follower.style.transform = `translate(${fx}px,${fy}px)`;
    raf = Math.hypot(mx - fx, my - fy) > 0.1 ? requestAnimationFrame(frame) : 0; // idle when settled
  };
  frame();

  addEventListener('pointermove', (event) => {
    mx = event.clientX;
    my = event.clientY;
    raf ||= requestAnimationFrame(frame);
  }, { passive: true });

  document.addEventListener('pointerover', ({ target }) => {
    dot.classList.toggle('is-hover', !!target.closest('[data-hover],a,button'));
    const labelled = target.closest('[data-cursor]');
    dot.classList.toggle('is-label', !!labelled);
    if (labelled) label.textContent = labelled.dataset.cursor;
  });
}
