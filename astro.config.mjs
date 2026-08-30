import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false })],
  vite: {
    optimizeDeps: {
      // Exclude the Node-only binary from browser bundle optimisation
      exclude: ['onnxruntime-node'],
    },
    build: {
      // Prevent Rollup from externalising the WASM files
      rollupOptions: {
        external: ['onnxruntime-node'],
      },
    },
  },
});
