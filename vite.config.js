import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  base: '/hapvida-site/', // ← ADICIONE ESTA LINHA
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        // Isso divide o código em pedaços menores para carregar mais rápido
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-helmet'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    // Aumenta o limite do aviso para 1MB para evitar mensagens desnecessárias
    chunkSizeWarningLimit: 1000,
  },
})