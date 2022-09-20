/*
 * @Author: zjr
 * @Date: 2022-04-07 11:22:20
 * @LastEditTime: 2022-08-08 10:54:01
 * @Description:
 * @LastEditors: lyj
 */

import { ConfigProvider, Layout } from 'antd'
import { divide, isEmpty } from 'lodash'
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useRecoilState } from 'recoil'

import { layout } from '@/recoil'

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

  const systemParameter = useRecoilValue<any>(layout.systemParameter) //全局数据

  const headerFlag = noUseHeaders.some((item) => pathname.includes(item))
  const [collapsed, setCollapsed] = useState(false)
  const [iframeType, setIframeType] = useState(true)
  const [themeColor, setThemeColor] = useState<any>() //主题颜色

  const [layoutSettings, setLayoutSettings] = useRecoilState(
    layout.layoutSettings
  )

  const [layoutType, setLayoutType] = useState('left')
  //获取布局状态
  const getSelectedItems = (data) => {
    if (!isEmpty(data)) {
      const current = data.filter((item) => item.type === true)
      if (current[0].name === '左侧菜单布局') {
        setLayoutType('left')
      }
      if (current[0].name === '顶部菜单布局') {
        setLayoutType('top')
      }
    }
  }
  useEffect(() => {
    getSelectedItems(layoutSettings)
  }, [layoutSettings])
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('layoutSettings'))
    getSelectedItems(data)
  }, [])

  //主题颜色
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('themeSetting'))
    if (data !== null) {
      ConfigProvider.config({
        theme: data.mergedNextColor
      })
    }
    if (data !== null) {
      const current = data.side.filter((item) => item.type === true)
      if (current[0].name === '亮色侧边栏') {
        setThemeColor('light')
      } else {
        setThemeColor('dark')
      }
    } else {
      setThemeColor('light')
    }
  }, [])

  useEffect(() => {
    // 主题
    if (systemParameter !== null) {
      if (!isEmpty(systemParameter.side)) {
        const current = systemParameter.side.filter(
          (item) => item.type === true
        )
        if (current[0].name === '亮色侧边栏') {
          setThemeColor('light')
        } else {
          setThemeColor('dark')
        }
      }
    }
  }, [systemParameter])

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
              <Header
                layoutType={layoutType}
                setCollapsed={setCollapsed}
                collapsed={collapsed}
              />
            </>
          )}
          {/* 侧边布局... */}
          <Layout>
            {!headerFlag &&
              (layoutType === 'left' ? (
                <Sider
                  theme="light"
                  width={200}
                  style={{
                    minHeight: 'calc(100vh - 50px)',
                    background: themeColor === 'light' ? '#fff' : '#001529'
                  }}
                  // collapsible
                  collapsed={collapsed}
                >
                  <Menu themeColor={themeColor} layoutType={layoutType} />
                </Sider>
              ) : null)}
            <Layout>
              {/* 标签 */}
              {headerFlag ? null : <TopLabel />}

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
