import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://embed.typeform.com;
        style-src 'self' 'unsafe-inline';
        frame-src https://form.typeform.com;
      `.replace(/\s+/g, ' ').trim()
    }
  },
  build: {
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'framer-motion',
        'lucide-react',
        'react-hot-toast',
        '@react-spring/web',
        'react-router-dom',
        'react-use-measure',
        '@mojs/core',
        'firebase',
        'axios'
      ],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion', '@react-spring/web', '@mojs/core'],
          'ui-vendor': ['lucide-react', 'react-hot-toast']
        }
      }
    },
    sourcemap: true,
    chunkSizeWarningLimit: 1000
  }
});