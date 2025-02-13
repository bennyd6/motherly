import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['your-current-hostname.com', 'localhost', '6915-103-160-26-14.ngrok-free.app'],
  },
})
