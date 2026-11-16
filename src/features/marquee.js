/** Hero marquee: stack and security topics, duplicated so the loop is seamless. */
import { $ } from '../lib/env.js';
import { developmentStack, securityTopics } from '../data/stack.js';

const STAR = '<svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z"/></svg>';
const item = (label, className = '') => `<span class="marquee__item ${className}">${label}${STAR}</span>`;

export function initMarquee() {
  const items = developmentStack.flatMap((name, i) => [
    item(name),
    securityTopics[i] ? item(securityTopics[i], 'sec') : '',
  ]).join('');
  $('#marq').innerHTML = items + items;
}
