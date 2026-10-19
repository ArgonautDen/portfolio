import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'

// Хостинг Рег.ру — голый nginx без rewrite на index.html, поэтому прямая ссылка
// на /projects/<slug> давала 404. Кладём копию index.html в папку каждого проекта;
// слаги берём из Projects.jsx, чтобы новый проект подхватывался сам.
const spaRouteFallback = () => ({
  name: 'spa-route-fallback',
  apply: 'build',
  closeBundle() {
    const source = readFileSync('src/components/Projects.jsx', 'utf8');
    const slugs = [...source.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
    for (const slug of slugs) {
      const dir = join('dist', 'projects', slug);
      mkdirSync(dir, { recursive: true });
      copyFileSync(join('dist', 'index.html'), join(dir, 'index.html'));
    }
  },
});

export default defineConfig({
  plugins: [react(), spaRouteFallback()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three'],
          'vendor-lottie': ['lottie-react', 'lottie-web'],
        }
      }
    }
  }
})
