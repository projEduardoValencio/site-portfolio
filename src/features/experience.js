/** Experience rows reveal their detail on hover; click / Enter / Space toggles it for touch and keyboard. */
import { $$ } from '../lib/env.js';

export function initExperience() {
  for (const row of $$('.xp__row')) {
    row.tabIndex = 0;
    row.setAttribute('role', 'button');
    row.setAttribute('aria-expanded', 'false');

    const toggle = () => row.setAttribute('aria-expanded', row.classList.toggle('open'));
    row.addEventListener('click', toggle);
    row.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      toggle();
    });
  }
}
