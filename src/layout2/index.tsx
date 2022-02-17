import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

import styles from './index.module.less'

type LayoutProps = {
  children: ReactElement
}

const Layout = (props: LayoutProps) => {
  const location = useLocation()
  console.log('🚀 ~ file: index.tsx ~ line 12 ~ Layout ~ location', location)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>left</div>
        <div>center</div>
        <div>right</div>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  )
}

export default Layout
