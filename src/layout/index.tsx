/*
 * @Author: zjr
 * @Date: 2022-04-07 11:22:20
 * @LastEditTime: 2022-05-23 17:43:39
 * @Description:
 * @LastEditors: zjr
 */
import { Layout } from 'antd'
import classNames from 'classnames'
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { areaState } from '@/recoil'
import { areaApis } from '@/recoil/apis'

import Header from './header'
import styles from './index.module.less'
import Menu from './menu'
const { Sider, Content } = Layout
interface LayoutProps {
  children?: ReactElement<ReactNode>
  [key: string]: any
}

const MyLayout = (props: LayoutProps) => {
  const location = useLocation()
  const { pathname } = location
  const noUseHeaders = [
    '/login',
    '/register',
    '/reset'
    // '/control-panel'
  ]

  const contentRef = useRef<HTMLElement>(null)

  const headerFlag = noUseHeaders.some((item) => pathname.includes(item))
  const setAreaData = useSetRecoilState(areaState.areaInfo)
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }
  useEffect(() => {
    ;(async () => {
      // const res: any = await areaApis.getArea()
      // setAreaData(res)
    })()
  }, [collapsed])

  return (
    // <Layout className={styles.container}>
    <Layout>
      {/*  */}
      {!headerFlag && <Header />}
      <Layout>
        {!headerFlag && (
          <Sider
            theme="light"
            width={200}
            style={{
              minHeight: 'calc(100vh - 50px)'
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
          >
            <Menu />
          </Sider>
        )}
        <Content
          className={headerFlag ? styles.fullHeight : styles.outBoxContainer}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MyLayout
