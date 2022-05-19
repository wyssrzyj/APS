/*
 * @Author: zjr
 * @Date: 2022-04-07 11:22:20
 * @LastEditTime: 2022-05-11 13:31:04
 * @Description:
 * @LastEditors: zjr
 */
import classNames from 'classnames'
import { ReactElement, ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { areaState } from '@/recoil'
import { areaApis } from '@/recoil/apis'

import Header from './header'
import styles from './index.module.less'
import Menu from './menu'

interface LayoutProps {
  children?: ReactElement<ReactNode>
  [key: string]: any
}

const Layout = (props: LayoutProps) => {
  const location = useLocation()
  const { pathname } = location
  const noUseHeaders = [
    '/login',
    '/register',
    '/reset'
    // '/control-panel'
  ]
  const headerFlag = noUseHeaders.some((item) => pathname.includes(item))
  const setAreaData = useSetRecoilState(areaState.areaInfo)
  useEffect(() => {
    ;(async () => {
      // const res: any = await areaApis.getArea()
      // setAreaData(res)
    })()
  }, [])

  return (
    <div className={styles.container}>
      {/*  */}
      {!headerFlag && <Header />}
      <div className={headerFlag ? styles.fullHeight : styles.body}>
        {!headerFlag && <Menu />}
        <div className={classNames(styles.content)}>{props.children}</div>
      </div>
    </div>
  )
}

export default Layout
