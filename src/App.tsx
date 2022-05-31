/*
 * @Author: zjr
 * @Date: 2022-05-30 15:59:04
 * @LastEditTime: 2022-05-30 16:42:33
 * @Description:
 * @LastEditors: zjr
 */
import './css/reset.css'
import 'antd/dist/antd.min.css'
import 'moment/dist/locale/zh-cn'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import Layout from './layout'
import { Loading } from './pages/loading'
import RouteList from './route'
const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      {/* Recoil包裹器 */}
      <RecoilRoot>
        {/* 页面loading状态设置 配合路由动态懒加载 */}
        <Suspense fallback={<Loading></Loading>}>
          <Router>
            <Layout>
              <RouteList />
            </Layout>
          </Router>
        </Suspense>
      </RecoilRoot>
    </ConfigProvider>
  )
}

export default App
