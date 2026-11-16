/** Types out the element's `data-type` text, one character at a time. */
export function typeText(el, speed = 45) {
  const text = el.dataset.type;
  let length = 0;
  const timer = setInterval(() => {
    el.textContent = text.slice(0, ++length);
    if (length >= text.length) clearInterval(timer);
  }, speed);
}
