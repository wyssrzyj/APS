/*
 * @Author: lyj
 * @Date: 2022-08-03 08:52:23
 * @LastEditTime: 2022-08-03 09:57:13
 * @Description:
 * @LastEditors: lyj
 */
import { Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
const Border = () => {
  const [parameterData, setParameterData] = useState({})
  //判断本地是否有 有的话就获取本地 没有就用初始的
  useEffect(() => {
    const themeSetting = {
      side: [
        {
          name: '暗色侧边栏',
          styles: styles.sideBlack,
          type: false
        },
        {
          name: '亮色侧边栏',
          styles: styles.sideWhite,
          type: true
        }
      ],
      topColor: [
        {
          name: '暗色顶栏',
          styles: styles.topColorBlack,
          type: false
        },
        {
          name: '亮色顶栏',
          styles: styles.topColorWhite,
          type: false
        },
        {
          name: '系统顶栏',
          styles: styles.topColorSystem,
          type: true
        }
      ]
    }
    if (localStorage.getItem('themeSetting') === null) {
      //存初始值
      console.log('准备存值')

      localStorage.setItem('themeSetting', JSON.stringify(themeSetting))
      setParameterData(themeSetting)
    } else {
      console.log('有值', localStorage.getItem('themeSetting'))
      const data = JSON.parse(localStorage.getItem('themeSetting'))
      setParameterData(data)
    }
    //
  }, [])
  const side = [
    {
      name: '暗色侧边栏',
      styles: styles.sideBlack,
      type: false
    },
    {
      name: '亮色侧边栏',
      styles: styles.sideWhite,
      type: true
    }
  ]
  const topColor = [
    {
      name: '暗色顶栏',
      styles: styles.topColorBlack,
      type: false
    },
    {
      name: '亮色顶栏',
      styles: styles.topColorWhite,
      type: false
    },
    {
      name: '系统顶栏',
      styles: styles.topColorSystem,
      type: true
    }
  ]
  useEffect(() => {
    console.log('值~~~~~~~', parameterData)
  }, [parameterData])
  return (
    <>
      {/* 暗色侧边栏 */}
      <div className={styles.sideContainer}>
        {side.map((item) => (
          <Tooltip key={item.styles} placement="top" title={item.name}>
            <div className={styles.sideDark}>
              <div className={item.styles}></div>

              {item.type === true ? (
                <div className={styles.sideSelect}></div>
              ) : null}
            </div>
          </Tooltip>
        ))}
      </div>
      <br />
      {/* 顶部 */}
      <div className={styles.sideContainer}>
        {topColor.map((item) => (
          <Tooltip key={item.styles} placement="top" title={item.name}>
            <div className={styles.sideDark}>
              <div className={item.styles}></div>
              {item.type === true ? (
                <div className={styles.sideSelect}></div>
              ) : null}
            </div>
          </Tooltip>
        ))}
      </div>
    </>
  )
}

export default Border
