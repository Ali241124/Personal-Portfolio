import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/contact': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
      '/api/contact': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/health': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
      '/jarvis': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    }
  }
})
