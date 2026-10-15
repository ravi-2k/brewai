import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // In development, requests to /api are forwarded to the Express server.
    // The browser thinks it is talking to the same origin, so no CORS setup is needed.
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
