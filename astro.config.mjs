import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['onnxruntime-node'],
    },
    build: {
      rollupOptions: {
        external: ['onnxruntime-node'],
      },
    },
  },
});