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
  // 根据不同环境使用env内容
  const VITE_ACCESS_KEY_ID =
    import.meta.env && import.meta.env.VITE_ACCESS_KEY_ID
      ? import.meta.env.VITE_ACCESS_KEY_ID
      : process.env.VITE_ACCESS_KEY_ID

  console.log(VITE_ACCESS_KEY_ID, 'VITE_ACCESS_KEY_ID')
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
