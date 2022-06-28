/*
 * @Author: lyj
 * @Date: 2022-06-20 10:26:25
 * @LastEditTime: 2022-06-28 17:01:06
 * @Description:
 * @LastEditors: lyj
 */
import { Button, Popover } from 'antd'
import React, { useEffect, useState } from 'react'

import { Icon } from '@/components' //路径
import { userApis } from '@/recoil/apis'

import styles from './index.module.less'
const EarlyWarning = () => {
  const { newAlertMessage } = userApis
  const warning = () => {
    console.log(456)
    location.replace('/orderChart')
  }
  useEffect(() => {
    newNews()
  }, [])
  const newNews = async () => {
    const res = await newAlertMessage()
    console.log('🚀 ~ file: earlyWarning.tsx ~ line 26 ~ newNews ~ res', res)
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

export default EarlyWarning
