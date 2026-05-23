import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // allow access from other devices on the LAN for testing on the touchscreen
    port: 5173
  },
  build: {
    outDir: 'dist',
    // Increase chunk size warning threshold since the d3 library and country data
    // legitimately push the main bundle past the default 500kb warning.
    chunkSizeWarningLimit: 1500
  }
});
