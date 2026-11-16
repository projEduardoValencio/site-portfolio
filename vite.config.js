import { defineConfig } from 'vite';

// host 0.0.0.0: reachable from other devices on the network
export default defineConfig({
  server: { host: '0.0.0.0', port: 5173 },
  preview: { host: '0.0.0.0', port: 4173 },
});
