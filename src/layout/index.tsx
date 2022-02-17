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
    '/user/login',
    '/user/register',
    '/user/reset'
    // '/control-panel'
  ]
  const headerFlag = noUseHeaders.some((item) => pathname.includes(item))

  const setAreaData = useSetRecoilState(areaState.areaInfo)

  useEffect(() => {
    ;(async () => {
      const res: any = await areaApis.getArea()
      setAreaData(res)
    })()
  }, [])

  return (
    <div className={styles.container}>
      {!headerFlag && <Header />}
      <div className={styles.body}>
        {!headerFlag && <Menu />}
        <div className={classNames(styles.content)}>{props.children}</div>
      </div>
    </div>
  )
}

export default Layout
