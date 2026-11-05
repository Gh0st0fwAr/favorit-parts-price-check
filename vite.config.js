import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  // GitHub Pages: https://<user>.github.io/favorit-parts-price-check/
  base: command === 'build' ? '/favorit-parts-price-check/' : '/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    proxy: {
      '/hs/hsprice': {
        target: 'https://api.favorit-parts.ru',
        changeOrigin: true,
        secure: true,
      },
    },
  },
}))
