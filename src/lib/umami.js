/** Umami Cloud: cookieless page views plus custom events. The script is injected on demand. */
const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;

/** Resolves to a `(name, props) => void` sender, or null when Umami is not configured. */
export function loadUmami(domains) {
  if (!websiteId) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://cloud.umami.is/script.js';
    script.dataset.websiteId = websiteId;
    script.dataset.domains = domains.join(',');
    script.dataset.doNotTrack = 'true';
    script.onload = () => resolve((name, props) => window.umami?.track(name, props));
    script.onerror = () => reject(new Error('Umami failed to load'));
    document.head.append(script);
  });
}
