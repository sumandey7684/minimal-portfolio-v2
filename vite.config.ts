import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { writePrerenderedHtml } from './scripts/write-seo-html';

function seoPrerender(): Plugin {
  return {
    name: 'seo-prerender',
    apply: 'build',
    closeBundle() {
      writePrerenderedHtml(path.resolve(__dirname, 'dist'));
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoPrerender()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
