import { defineConfig } from 'vite';
import { seoPages } from './vite/seo-pages.js';

// Public address of the site, with trailing slash. Override with SITE_URL when a custom domain is set up.
const siteUrl = process.env.SITE_URL ?? 'https://www.eduardovalencio.com.br/';

export default defineConfig({
  base: './', // relative URLs: works at the domain root and under github.io/<repo>/
  plugins: [seoPages({ siteUrl })],
  // host 0.0.0.0: reachable from other devices on the network
  server: { host: '0.0.0.0', port: 5173 },
  preview: { host: '0.0.0.0', port: 4173 },
});
