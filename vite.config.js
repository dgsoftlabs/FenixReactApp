import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
  },
  server: {
    proxy: {
      '/Tags': 'http://localhost:80',
      '/Connections': 'http://localhost:80',
      '/Events': 'http://localhost:80',
      '/Graph': 'http://localhost:80',
      '/Server': 'http://localhost:80',
      '/Tag': 'http://localhost:80',
      '/Timer': 'http://localhost:80',
      '/User': 'http://localhost:80',
      '/Machine': 'http://localhost:80',
    }
  }
})
