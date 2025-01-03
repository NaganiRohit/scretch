import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Replace with your backend server's URL
        changeOrigin: true,             // Ensures the origin of the host header matches the target
        secure: false,                  // Use this if your backend server uses HTTPS
      },
    },
  },
});
