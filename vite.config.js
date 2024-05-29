import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  server: {
    proxy: {
      '/api': {
        secure: false,
        changeOrigin: true,
        target: 'http://localhost:8082/',
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        loaderOptions: {
          css: {
            modules: {
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
        },
      },

      //scss: {
      //  additionalData: `@import "${path.resolve(__dirname, 'src/styles/_variables.scss')}";`
      //},
    },
  },
});