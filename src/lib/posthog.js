import posthog from 'posthog-js';

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST;

export const isPostHogEnabled = Boolean(posthogKey && posthogHost);

if (!isPostHogEnabled) {
  if (import.meta.env.DEV) {
    const missingVariable = posthogKey ? 'VITE_POSTHOG_HOST' : 'VITE_POSTHOG_KEY';
    throw new Error(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
    );
  }
} else {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: '2026-08-30',
    capture_exceptions: true,
    logs: {
      serviceName: 'eduardovalencio-site',
      environment: import.meta.env.MODE,
    },
  });
}

export const posthogLog = {
  info(message, attributes) {
    if (isPostHogEnabled) posthog.logger.info(message, attributes);
  },
};

export default posthog;
