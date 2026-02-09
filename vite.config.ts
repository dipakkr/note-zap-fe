import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'bundle-stats.html',
      open: false,
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers for smaller bundle size
    target: 'es2020',
    // Enable minification
    minify: 'esbuild',
    // Chunk size warning threshold (increased to avoid noisy warnings)
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Simplified chunking - let Vite handle most dependencies automatically
        // to avoid initialization order issues with React 19
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // Only separate firebase for lazy loading (it's large and only needed for auth)
            if (id.includes("firebase")) {
              return "firebase";
            }
            // Let Vite automatically handle all other chunking
            // This avoids initialization order issues with React 19 and its dependents
          }
        },
      },
    },
  },
})
