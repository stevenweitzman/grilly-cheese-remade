import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // CSS code splitting - inline small CSS to reduce network chains
    cssCodeSplit: false,
    // Ensure proper chunking for pre-rendering and performance
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            if (id.includes('@tanstack')) {
              return 'tanstack';
            }
            return 'vendor';
          }
          
          // Split routes by category for better lazy loading
          if (id.includes('/pages/blog/')) {
            return 'blog';
          }
          if (id.includes('/pages/locations/')) {
            return 'locations';
          }
          if (id.includes('/pages/services/') || id.includes('/pages/events/')) {
            return 'services';
          }
        }
      }
    }
  }
}));
