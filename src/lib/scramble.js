/** Text "decode" effect: random glyphs that resolve left to right. */
const GLYPHS = '!<>-_/[]{}=+*^?#01ABCDEF';
const running = new WeakMap();

/**
 * Scrambles `el` into `text` (defaults to its current text). Calling again
 * while an effect is running restarts it towards the same final text.
 */
export function scramble(el, { text, duration = 600 } = {}) {
  const previous = running.get(el);
  if (previous) cancelAnimationFrame(previous.raf);
  const final = text ?? previous?.text ?? el.textContent;
  const state = { text: final, raf: 0 };
  running.set(el, state);

  const start = performance.now();
  const frame = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const done = Math.floor(progress * final.length);
    el.textContent =
      final.slice(0, done) + final.slice(done).replace(/\S/g, () => GLYPHS[Math.random() * GLYPHS.length | 0]);
    if (progress < 1) state.raf = requestAnimationFrame(frame);
    else running.delete(el);
  };
  state.raf = requestAnimationFrame(frame);
}
