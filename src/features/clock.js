/**
 * Hero clock showing the visitor's own local time. The browser's Intl API
 * already knows the visitor's time zone, so no network request (or IP
 * geolocation service) is needed.
 */
import { $ } from '../lib/env.js';

export function initClock() {
  const root = $('#clock');
  if (!root) return;
  const place = $('[data-clock-place]', root);
  const time = $('[data-clock-time]', root);

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });
  if (timeZone) place.textContent = timeZone.split('/').pop().replaceAll('_', ' ');

  let timer;
  const tick = () => {
    time.textContent = formatter.format(new Date());
    timer = setTimeout(tick, 1000 - (Date.now() % 1000)); // stay aligned to the second
  };
  document.addEventListener('visibilitychange', () => {
    clearTimeout(timer);
    if (!document.hidden) tick();
  });
  tick();
}
