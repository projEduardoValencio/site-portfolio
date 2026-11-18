/** PostHog, loaded on demand and configured to leave nothing in the browser (no cookie, no storage). */
const key = import.meta.env.VITE_POSTHOG_KEY;
const host = import.meta.env.VITE_POSTHOG_HOST;

/** Resolves to a `(name, props) => void` sender, or null when PostHog is not configured. */
export async function loadPostHog() {
  if (!key || !host) return null;
  const { default: posthog } = await import('posthog-js');
  posthog.init(key, {
    api_host: host,
    defaults: '2026-08-30',
    persistence: 'memory', // visitor id lives only in this page view
    autocapture: false, // would record the real mailto:/wa.me href of the contact links
    disable_session_recording: true,
    disable_surveys: true,
    capture_exceptions: true,
    person_profiles: 'identified_only',
  });
  return (name, props) => posthog.capture(name, props);
}
