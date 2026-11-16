/** 3D tilt that follows the pointer, plus a glare position exposed as --gx/--gy. */
import { finePointer, reduceMotion } from '../lib/env.js';

/** @param {{ rotateY: number, rotateX: number, area?: HTMLElement }} options degrees at the edges; `area` is the hover target (defaults to `el`) */
export function initTilt(el, { rotateY, rotateX, area = el }) {
  if (!el || !finePointer || reduceMotion) return;

  area.addEventListener('pointermove', (event) => {
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.classList.add('is-tilt');
    el.style.transform = `rotateY(${(px - 0.5) * rotateY}deg) rotateX(${(0.5 - py) * rotateX}deg)`;
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
  });
  area.addEventListener('pointerleave', () => {
    el.classList.remove('is-tilt');
    el.style.transform = '';
  });
}
