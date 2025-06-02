import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {

  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return {
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/assets/styles/_variables' as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: "https://swapi.dev",
        changeOrigin: true,
        secure: false, 
      },
    },
  },
}
})
