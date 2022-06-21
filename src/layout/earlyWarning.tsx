/*
 * @Author: lyj
 * @Date: 2022-06-20 10:26:25
 * @LastEditTime: 2022-06-20 13:14:40
 * @Description:
 * @LastEditors: lyj
 */
import { Button, Popover } from 'antd'
import React from 'react'

import { Icon } from '@/components' //路径

import styles from './index.module.less'
function earlyWarning() {
  const warning = () => {
    console.log(456)
    location.replace('/orderChart')
  }
  const arr = (
    <>
      <div onClick={warning} className={styles.pointer}>
        <div>xxx生产单进入预警范围</div>
        <div>xxx生产单已延期</div>
      </div>
    </>
  )
  return (
    <div>
      <div className={styles.earlyWarning}>
        <Popover placement="top" content={arr} trigger="hover">
          <Icon type="jack-left-copy" className={styles.previous} />
          <div className={styles.remind}></div>
        </Popover>
      </div>
    </div>
  )
}

export default earlyWarning
