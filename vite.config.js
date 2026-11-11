import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = parseInt(process.env.PORT || env.PORT || '5000', 10)

  return {
    base: './',
    plugins: [react()],
    server: {
      port: port,
      host: '0.0.0.0',
      allowedHosts: true
    },
    preview: {
      port: port,
      host: '0.0.0.0',
      allowedHosts: true
    }
  }
})
