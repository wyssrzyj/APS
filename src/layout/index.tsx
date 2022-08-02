/*
 * @Author: zjr
 * @Date: 2022-04-07 11:22:20
 * @LastEditTime: 2022-08-02 16:03:15
 * @Description:
 * @LastEditors: lyj
 */

import { Breadcrumb, Layout } from 'antd'
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { areaState } from '@/recoil'

import Header from './header'
import styles from './index.module.less'
import Menu from './menu'
import TopLabel from './topLabel'
const { Sider, Content } = Layout
interface LayoutProps {
  items?: ReactElement<ReactNode>
  [key: string]: any
}

const MyLayout = (props: LayoutProps) => {
  const location = useLocation()
  const { pathname } = location
  const noUseHeaders = [
    '/login',
    '/register',
    '/reset'
    // '/iframeDate'
    // '/control-panel'
  ]

  const contentRef = useRef<HTMLElement>(null)

  const headerFlag = noUseHeaders.some((item) => pathname.includes(item))
  const setAreaData = useSetRecoilState(areaState.areaInfo)
  const [collapsed, setCollapsed] = useState(false)
  const [iframeType, setIframeType] = useState(true)

  //甘特图
  useEffect(() => {
    if (pathname === '/iframeDate') {
      setIframeType(false)
    } else {
      setIframeType(true)
    }
  }, [pathname])
  return (
    // <Layout className={styles.container}>
    <div>
      {iframeType ? (
        <Layout>
          {!headerFlag && (
            <>
              <Header setCollapsed={setCollapsed} collapsed={collapsed} />
            </>
          )}

          <Layout>
            {!headerFlag && (
              <Sider
                theme="light"
                width={200}
                style={{
                  minHeight: 'calc(100vh - 50px)'
                }}
                // collapsible
                collapsed={collapsed}
              >
                <Menu />
              </Sider>
              // <>
              //   <Menu />
              // </>
            )}
            <Layout>
              {/* 标签 */}
              <TopLabel />
              <Content
                className={
                  headerFlag ? styles.fullHeight : styles.outBoxContainer
                }
              >
                {props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      ) : null}
    </div>
  )
}

export default MyLayout
