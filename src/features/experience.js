/** Experience accordion: one row open at a time; the first row ships open in the markup. */
import { $, $$ } from '../lib/env.js';
import posthog, { isPostHogEnabled } from '../lib/posthog.js';

export function initExperience() {
  const rows = $$('.xp__row');

  const setOpen = (row, open) => {
    row.classList.toggle('open', open);
    $('.xp__toggle', row).setAttribute('aria-expanded', open);
    $('.xp__more', row).setAttribute('aria-hidden', !open);
  };

  for (const [index, row] of rows.entries()) {
    $('.xp__toggle', row).addEventListener('click', () => {
      const open = !row.classList.contains('open');
      for (const other of rows) setOpen(other, false);
      setOpen(row, open);
      if (open && isPostHogEnabled) {
        posthog.capture('experience_detail_opened', { experience_position: index + 1 });
      }
    });
  }
}
