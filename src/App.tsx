import './css/reset.css'
import 'antd/dist/antd.min.css'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import Layout from './layout'
import { Loading } from './pages/loading'
import RouteList from './route'

const App = () => {
  console.log(process.env.VITE_ACCESS_KEY_ID, 'app.VITE_ACCESS_KEY_ID')
  console.log(process.env.VITE_ACCESS_KEY_SECRET, 'app.VITE_ACCESS_KEY_SECRET')
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
