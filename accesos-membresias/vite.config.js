// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/sistema-control-piscina-gimasio/', // 👈 Clave para que GitHub Pages encuentre los assets
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/edpointsPHP',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})