import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  base: '/isolation/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    target: 'es2015'
  },
  server: {
    port: 3000,
    open: true
  }
})
