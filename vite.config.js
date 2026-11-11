import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const previewPort = parseInt(process.env.PORT || env.PORT || '5000', 10)
  const devPort = parseInt(process.env.DEV_PORT || env.DEV_PORT || '5173', 10)

  return {
    base: './',
    plugins: [react()],
    server: {
      port: devPort,
      host: '0.0.0.0',
      allowedHosts: true
    },
    preview: {
      port: previewPort,
      host: '0.0.0.0',
      allowedHosts: true
    }
  }
})
