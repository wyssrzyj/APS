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
  return (
    <ConfigProvider locale={zhCN}>
      <RecoilRoot>
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
