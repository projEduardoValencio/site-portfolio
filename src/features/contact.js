/** Contact links (email, WhatsApp) and the "copy email" button with a toast confirmation. */
import { $, $$ } from '../lib/env.js';
import { email, mailtoUrl, whatsappUrl } from '../data/contact.js';
import { t } from './i18n.js';
import { track } from '../lib/telemetry.js';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // The Clipboard API needs a secure context; plain-http LAN testing falls back to execCommand.
    const area = document.createElement('textarea');
    area.value = text;
    area.style.cssText = 'position:fixed;opacity:0';
    document.body.append(area);
    area.select();
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      area.remove();
    }
  }
}

/** Contact links ship with a harmless placeholder href; the real mailto/WhatsApp URL is set on first interaction. */
const RESOLVERS = {
  email: () => mailtoUrl('Proposta'),
  whatsapp: (link) => whatsappUrl(link.dataset.text),
};

function armContactLinks() {
  for (const link of $$('a[data-contact]')) link.href = RESOLVERS[link.dataset.contact](link);
}

export function initContact() {
  for (const type of ['pointerover', 'pointerdown', 'focusin', 'click']) {
    document.addEventListener(type, (event) => {
      const link = event.target.closest('[data-contact]');
      if (!link) return;
      armContactLinks();
      if (type === 'click') track('contact_link_opened', { contact_method: link.dataset.contact });
    }, { capture: true, passive: true });
  }

  const button = $('#copy');
  const toast = $('#toast');
  let timer;

  button.addEventListener('click', async () => {
    const address = email();
    const copied = await copyText(address);
    toast.textContent = copied ? t('emailCopied') : address;
    track('email_copied', { copy_succeeded: copied });
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 2200);
  });
}
