import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8005,
    open: true,
    proxy: {
      '/aps': 'http://101.37.116.101:8000'
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        module: true,
        // 重写 less 变量，定制样式
        modifyVars: {
          '@primary-color': 'red'
        }
      }
    }
  },
  resolve: {
    alias: {
      // 路径别名设置
      '@': resolve(__dirname, 'src')
    }
  }
})
