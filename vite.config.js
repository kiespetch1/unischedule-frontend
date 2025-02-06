import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: 'https://unisc.ru',
        changeOrigin: true,
        secure: false,
      },
      'identity/api': {
        target: 'http://identity',
        changeOrigin: true,
        secure: false,
      },
      'schedule/api': {
        target: 'http://schedule',
        changeOrigin: true,
        secure: false,
      }
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
