/** "Copy email" button with a toast confirmation. */
import { $ } from '../lib/env.js';
import { t } from './i18n.js';

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

export function initContact() {
  const button = $('#copy');
  const toast = $('#toast');
  let timer;

  button.addEventListener('click', async () => {
    const email = button.dataset.copy;
    toast.textContent = (await copyText(email)) ? t('emailCopied') : email;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 2200);
  });
}
