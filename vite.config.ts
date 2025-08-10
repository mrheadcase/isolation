import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/isolation/',
  optimizeDeps: {
    exclude: ['@vitejs/plugin-legacy']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    target: 'esnext',
    rollupOptions: {
      external: ['@vitejs/plugin-legacy']
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
