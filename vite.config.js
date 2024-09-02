import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
    hmr: {
      host: 'unisc.ru',
      protocol: 'wss',
      port: 443,
    },
    proxy: {
      '/api': {
        target: 'http://us-server:7148/api',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
