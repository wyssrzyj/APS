/*
 * @Author: lyj
 * @Date: 2022-08-03 16:55:24
 * @LastEditTime: 2022-08-03 17:39:07
 * @Description:
 * @LastEditors: lyj
 */
import { Tooltip } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { layout } from '@/recoil'

import styles from './index.module.less'

function LayoutSettings() {
  const [parameterData, setParameterData] = useState<any>({}) //存初始的值

  const [layoutSettings, setLayoutSettings] = useRecoilState(
    layout.layoutSettings
  ) //全局数据
  useEffect(() => {
    const themeSetting = [
      {
        name: '左侧菜单布局',
        styles: styles.sideBlack,
        type: true
      },
      {
        name: '顶部菜单布局',
        styles: styles.topColorBlack,
        type: false
      }
    ]
    if (isEmpty(localStorage.getItem('layoutSettings'))) {
      //存初始值
      localStorage.setItem('layoutSettings', JSON.stringify(themeSetting))
      setParameterData(themeSetting)
      setLayoutSettings(themeSetting)
    } else {
      const data = JSON.parse(localStorage.getItem('layoutSettings'))
      setParameterData(data)
      setLayoutSettings(data)
    }
  }, [])

  const changeStatus = (current) => {
    //用全局的数据 systemParameter
    const cloneParameterData = cloneDeep(parameterData)
    cloneParameterData.map((item) => {
      if (item.name === current) {
        item.type = true
      } else {
        item.type = false
      }
    })
    setParameterData(cloneParameterData)
  }
  useEffect(() => {
    localStorage.setItem('layoutSettings', JSON.stringify(parameterData))
  }, [parameterData])
  return (
    <div className={styles.layout}>
      {!isEmpty(parameterData)
        ? parameterData.map((item) => (
            <Tooltip key={item.styles} placement="top" title={item.name}>
              {item.name === '左侧菜单布局' ? (
                <div
                  className={styles.sideDark}
                  onClick={() => {
                    changeStatus(item.name)
                  }}
                >
                  <div className={item.styles}></div>
                  {item.type === true ? (
                    <div className={styles.sideSelect}></div>
                  ) : null}
                </div>
              ) : null}
              {item.name === '顶部菜单布局' ? (
                <div
                  className={styles.sideDark}
                  onClick={() => {
                    changeStatus(item.name)
                  }}
                >
                  <div className={item.styles}></div>
                  {item.type === true ? (
                    <div className={styles.sideSelect}></div>
                  ) : null}
                </div>
              ) : null}
            </Tooltip>
          ))
        : null}
    </div>
  )
}

export default LayoutSettings
