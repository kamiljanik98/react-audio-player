import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'], // Specify the browser targets for legacy support
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // Include polyfills for older browsers if needed
    }),
  ],
  build: {
    sourcemap: true,  // Enable source maps to improve debugging and coverage analysis
    rollupOptions: {
      output: {
        // Optionally, configure further output splitting or file naming
        manualChunks: {
          // Customize chunks if necessary, for example, split libraries into separate files
          vendor: ['react', 'react-dom', 'react-icons', 'react-howler']
        },
      },
    },
  },
});
