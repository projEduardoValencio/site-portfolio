import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // relative URLs: works at the domain root and under github.io/<repo>/
  // host 0.0.0.0: reachable from other devices on the network
  server: { host: '0.0.0.0', port: 5173 },
  preview: { host: '0.0.0.0', port: 4173 },
});
