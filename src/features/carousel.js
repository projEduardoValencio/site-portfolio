/** Draggable work carousel with momentum, snap, arrows, keyboard and image parallax. */
import { $, $$ } from '../lib/env.js';

const pad = (n) => String(n).padStart(2, '0');

export function initCarousel() {
  const carousel = $('#carousel');
  const track = $('#track');
  const cards = $$('.card', track);
  const counter = $('#ccount');
  const progress = $('#cprog');

  let position = 0; // rendered offset, eases towards `target`
  let target = 0;
  let dragging = false;
  let startX = 0, startTarget = 0, lastX = 0, moved = 0, velocity = 0;
  let raf = 0;

  const maxScroll = () => Math.max(0, track.scrollWidth - carousel.clientWidth + parseFloat(getComputedStyle(carousel).paddingLeft) * 2);
  const stepSize = () => cards[0].offsetWidth + parseFloat(getComputedStyle(track).gap);
  const clamp = (value) => Math.min(0, Math.max(-maxScroll(), value));
  const currentIndex = () => Math.min(cards.length - 1, Math.round(-target / stepSize()));

  const updateCounter = () => {
    counter.textContent = `${pad(currentIndex() + 1)} / ${pad(cards.length)}`;
    progress.style.width = `${(-target / (maxScroll() || 1)) * 80 + 20}%`;
  };

  const paint = () => {
    track.style.transform = `translate3d(${position}px,0,0)`;
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const offset = (rect.left + rect.width / 2 - innerWidth / 2) / innerWidth;
      card.querySelector('img').style.transform = `scale(1.12) translateX(${offset * -6}%)`;
    }
  };

  // Frames only run while something is moving.
  const render = () => {
    position += (target - position) * (dragging ? 0.35 : 0.09);
    const settled = !dragging && Math.abs(target - position) < 0.1;
    if (settled) position = target;
    paint();
    raf = settled ? 0 : requestAnimationFrame(render);
  };
  const requestRender = () => {
    raf ||= requestAnimationFrame(render);
  };
  const moveTo = (value) => {
    target = clamp(value);
    updateCounter();
    requestRender();
  };
  const goToIndex = (index) => moveTo(-index * stepSize());

  carousel.addEventListener('pointerdown', (event) => {
    if (event.target.closest('a')) return;
    dragging = true;
    moved = 0;
    startX = lastX = event.clientX;
    startTarget = target;
    carousel.classList.add('is-drag');
    carousel.setPointerCapture(event.pointerId);
    requestRender();
  });
  carousel.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const delta = event.clientX - startX;
    moved = Math.abs(delta);
    velocity = event.clientX - lastX;
    lastX = event.clientX;
    target = startTarget + delta;
    const min = -maxScroll();
    if (target > 0) target *= 0.35; // rubber band past either edge
    if (target < min) target = min + (target - min) * 0.35;
    updateCounter();
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    carousel.classList.remove('is-drag');
    const thrown = clamp(target + velocity * 12);
    goToIndex(Math.round(-thrown / stepSize()));
  };
  carousel.addEventListener('pointerup', endDrag);
  carousel.addEventListener('pointercancel', endDrag);
  carousel.addEventListener('click', (event) => {
    if (moved > 6) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true); // a drag must not count as a click on a card link

  carousel.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    event.preventDefault();
    moveTo(target - event.deltaX);
  }, { passive: false });
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') goToIndex(currentIndex() + 1);
    else if (event.key === 'ArrowLeft') goToIndex(currentIndex() - 1);
    else return;
    event.preventDefault();
  });
  $('#next').addEventListener('click', () => goToIndex(currentIndex() + 1));
  $('#prev').addEventListener('click', () => goToIndex(currentIndex() - 1));
  addEventListener('resize', () => moveTo(target));

  paint();
  updateCounter();
}
