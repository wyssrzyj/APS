/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-03-02 15:41:46
 * @LastEditors: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @LastEditTime: 2022-05-19 09:25:06
 * @FilePath: \jack-aps\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
      // '/aps': 'http://192.168.69.88:8000'
      '/aps': 'http://10.18.4.25:8000'
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
