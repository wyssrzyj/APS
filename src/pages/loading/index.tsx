import React from 'react'

import styles from './index.module.less'

const LOADING =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210730/a1c35459662045c986e0298759f70f70.gif'

export const Loading = () => {
  return (
    <div className={styles.loadingBox}>
      <img className={styles.loadingImg} src={LOADING} alt="" />
    </div>
  )
}
