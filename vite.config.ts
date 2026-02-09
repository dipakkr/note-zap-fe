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
    // Chunk size warning threshold
    chunkSizeWarningLimit: 200,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // Firebase in its own chunk (loaded only when auth is needed)
            if (id.includes("firebase")) {
              return "firebase";
            }
            // React core - MUST keep react, react-dom, and scheduler together
            // to avoid initialization order issues with React 19
            // Also include sonner which directly depends on React internals
            if (
              id.includes("react-dom") ||
              id.includes("scheduler") ||
              id.includes("/react/") ||
              id.includes("sonner")
            ) {
              return "react-vendor";
            }
            if (id.includes("react-router")) {
              return "react-router";
            }
            // Tanstack query - can be lazy loaded
            if (id.includes("@tanstack")) {
              return "tanstack";
            }
            // Radix UI - split by component usage
            if (id.includes("@radix-ui")) {
              return "radix-ui";
            }
            // Lucide icons - only import what's used
            if (id.includes("lucide-react")) {
              return "icons";
            }
            // Date utilities
            if (id.includes("date-fns")) {
              return "date-utils";
            }
            // Other smaller vendors
            return "vendor";
          }
        },
      },
    },
  },
})
