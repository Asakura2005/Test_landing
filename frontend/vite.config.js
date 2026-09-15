import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    target: 'es2022',
    sourcemap: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('xlsx')) return 'vendor-xlsx'
            if (id.includes('framer-motion')) return 'vendor-framer'
            if (id.includes('@supabase')) return 'vendor-supabase'
            if (id.includes('posthog-js')) return 'vendor-posthog'
            if (id.includes('lucide-react')) return 'vendor-lucide'
            if (id.includes('react') || id.includes('scheduler')) return 'vendor-react'
            return 'vendor-libs'
          }
          if (id.includes('VietnamSpecialtyMap') || id.includes('mapPaths')) {
            return 'chunk-vietnam-map'
          }
          if (id.includes('i18nData') || id.includes('translations')) {
            return 'chunk-i18n'
          }
        }
      }
    }
  }
})
