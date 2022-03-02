import React from 'react'

import styles from './index.module.less'

const Title = ({ title, size = 16 }: { title: string; size?: number }) => (
  <div className={styles.title} style={{ fontSize: `${size}px` }}>
    <div className={styles.titleLine}></div>
    {title}
  </div>
)

export default Title
