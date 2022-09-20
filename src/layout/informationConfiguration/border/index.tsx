/*
 * @Author: lyj
 * @Date: 2022-08-03 08:52:23
 * @LastEditTime: 2022-08-05 11:08:01
 * @Description:
 * @LastEditors: lyj
 */
import { Tooltip } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { layout } from '@/recoil'

import styles from './index.module.less'

const Border = () => {
  const [systemParameter, setSystemParameter] = useRecoilState(
    layout.systemParameter
  ) //全局数据

  const [parameterData, setParameterData] = useState<any>({}) //存初始的值

  //判断本地是否有 有的话就获取本地 没有就用初始的
  useEffect(() => {
    const themeSetting = cloneDeep(systemParameter)

    if (isEmpty(localStorage.getItem('themeSetting'))) {
      //存初始值
      localStorage.setItem('themeSetting', JSON.stringify(themeSetting))
      setParameterData(themeSetting)
    } else {
      const data = JSON.parse(localStorage.getItem('themeSetting'))
      setParameterData(data)
    }
  }, [])

  //更改状态
  const changeStatus = (type, current) => {
    //用全局的数据 systemParameter
    const cloneParameterData = cloneDeep(systemParameter)
    cloneParameterData[type].map((item) => {
      if (item.name === current) {
        item.type = true
      } else {
        item.type = false
      }
    })
    setParameterData(cloneParameterData)
  }

  useEffect(() => {
    localStorage.setItem('themeSetting', JSON.stringify(parameterData))
    setSystemParameter(parameterData)
  }, [parameterData])

  return (
    <>
      {/* 暗色侧边栏 */}
      <div className={styles.sideContainer}>
        {!isEmpty(parameterData.side)
          ? parameterData.side.map((item) => (
              <Tooltip key={item.styles} placement="top" title={item.name}>
                <div
                  className={styles.sideDark}
                  onClick={() => {
                    changeStatus('side', item.name)
                  }}
                >
                  <div className={item.styles}></div>

                  {item.type === true ? (
                    <div className={styles.sideSelect}></div>
                  ) : null}
                </div>
              </Tooltip>
            ))
          : null}
      </div>
      <br />
      {/* 顶部 */}
      <div className={styles.sideContainer}>
        {!isEmpty(parameterData.topColor)
          ? parameterData.topColor.map((item) => (
              <Tooltip key={item.styles} placement="top" title={item.name}>
                <div
                  className={styles.sideDark}
                  onClick={() => {
                    changeStatus('topColor', item.name)
                  }}
                >
                  <div className={item.styles}></div>
                  {item.type === true ? (
                    <div className={styles.sideSelect}></div>
                  ) : null}
                </div>
              </Tooltip>
            ))
          : null}
      </div>
    </>
  )
}

export default Border
