import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';   // tu gardes la version SWC
import path from 'node:path';
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
  },

  /* ---------- PLUGINS ---------- */
  plugins: [
    react(),                       // React + SWC
    mode === 'development' &&      // Tagger seulement en dev
      componentTagger(),
  ].filter(Boolean),

  /* ---------- RÉSOLUTIONS ---------- */
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  /* ---------- CONFIG TEST (Vitest) ---------- */
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
}));
