import { DatePicker, Input } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { Icon } from '@/components'

import styles from './index.module.less'
const Bottom = (props: { list: any }) => {
  const { list } = props
  return (
    <div className={styles.box_top}>
      <div>
        <div className={styles.short}>总计</div>
        <div className={styles.box_content}></div>
        <div className={styles.short}></div>
        <div className={styles.short}></div>
        <div className={styles.box_content}>{list[0]}</div>
        <div className={styles.box_content}>{list[1]}</div>
        <div className={styles.box_content}>{list[2]}</div>
        <div className={styles.box_content}>{list[3]}</div>
        <div className={styles.input}>{list[4] ? list[4] : '0'}</div>
        <div className={styles.box_content}>{list[5] > 0 ? list[5] : '0'}</div>
        <div className={styles.short}></div>
        {/* 图 */}
        <div className={styles.adequate}></div>
        <div className={styles.datePicker}></div>
      </div>
    </div>
  )
}

export default Bottom
