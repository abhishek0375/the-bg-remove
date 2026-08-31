import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // Exclude onnxruntime-node from pre-bundling — it is a Node-only native
      // addon and must never be processed by Vite's browser pre-bundler.
      exclude: ['onnxruntime-node'],
    },
    resolve: {
      alias: {
        // @xenova/transformers imports both onnxruntime-node and onnxruntime-web,
        // then picks the correct one at runtime. In the browser build we must
        // replace onnxruntime-node with an empty stub so Rolldown/Vite does not
        // emit an unresolvable "import from onnxruntime-node" in the browser
        // bundle. Using resolve.alias with a virtual module is the correct Vite
        // approach — it takes precedence over rollupOptions.external (which was
        // the prior broken config that emitted a live browser import instead of
        // stubbing the module out).
        'onnxruntime-node': '/src/_stubs/onnxruntime-node-stub.js',
      },
    },
    // NOTE: Do NOT add onnxruntime-node to rollupOptions.external for browser
    // builds. external() means "keep the import statement in the output",
    // which produces an unresolvable browser import. The alias above replaces
    // the import with an empty module instead, which is correct.
  },
});