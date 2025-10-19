import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host-app',
      remotes: {
        productsApp: 'http://localhost:5001/assets/remoteEntry.js',
        cartApp: 'http://localhost:5002/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});
