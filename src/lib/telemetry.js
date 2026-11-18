/**
 * Single entry point for analytics. `track()` fans each event out to Umami and PostHog.
 *
 * Everything is a no-op unless this is a production build served from one of VITE_TELEMETRY_DOMAINS and
 * the visitor has not enabled Do Not Track. Nothing is loaded until `startTelemetry()` (after the intro).
 * No event may carry personal data: only short categorical or numeric properties.
 */
import { loadPostHog } from './posthog.js';
import { loadUmami } from './umami.js';

const DOMAINS = (import.meta.env.VITE_TELEMETRY_DOMAINS ?? '').split(',').map((d) => d.trim()).filter(Boolean);
const enabled = import.meta.env.PROD && DOMAINS.includes(location.hostname) && navigator.doNotTrack !== '1';

const MAX_QUEUE = 50; // events fired while the scripts are still loading
const queue = [];
const senders = [];
let started = false;
let ready = false;

function send(name, props) {
  for (const sender of senders) {
    try {
      sender(name, props);
    } catch {} // a broken analytics script must never break the site
  }
}

export function track(name, props) {
  if (!enabled) return;
  if (ready) send(name, props);
  else if (queue.length < MAX_QUEUE) queue.push([name, props]);
}

export function startTelemetry() {
  if (!enabled || started) return;
  started = true;
  Promise.allSettled([loadUmami(DOMAINS), loadPostHog()]).then((results) => {
    for (const result of results) if (result.status === 'fulfilled' && result.value) senders.push(result.value);
    ready = true;
    for (const [name, props] of queue.splice(0)) send(name, props);
  });
}
