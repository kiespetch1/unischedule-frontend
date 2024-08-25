import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import fs from 'fs';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    https: {
      key: fs.readFileSync("./src/certs/localhost-key.pem"),
      cert: fs.readFileSync("./src/certs/localhost.pem"),
    },
    port: 3000,
  },

});
