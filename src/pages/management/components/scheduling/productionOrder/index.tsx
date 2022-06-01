/* eslint-disable react/jsx-key */
import { Checkbox } from 'antd'
import React from 'react'

import styles from './index.module.less'
const index = (props: any) => {
  const { list } = props
  return (
    <div className={styles.top}>
      {list.map((item: any) => (
        <div className={styles.content}>
          <div key={item.id} className={styles.subject}>
            生产单号：{item.name}
          </div>
          <Checkbox />
        </div>
      ))}
    </div>
  )
}

export default index
