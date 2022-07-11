/*
 * @Author: lyj
 * @Date: 2022-07-11 09:18:11
 * @LastEditTime: 2022-07-11 14:22:45
 * @Description:
 * @LastEditors: lyj
 */
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, InputNumber, message, Radio, Row } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { ColorResult } from 'react-color'

import styles from './index.module.less'

function WorkingHours(props: { onChange: any; list: any }) {
  const { onChange, list } = props

  const [data, setData] = useState<any>()
  // 回显
  useEffect(() => {
    if (!isEmpty(list)) {
      if (!isEmpty(list.waringConfigs)) {
        setData(list.materialWaringAdvanceDays)
      }
    }
  }, [list])
  //随机颜色

  const getInputNumberValue = (e) => {
    setData(e.target.value)
    onChange(e.target.value)
  }
  return (
    <div className={styles.container}>
      <div className={styles.singleQuantity}>
        <Radio defaultChecked={true}> 根据开工日期</Radio>
      </div>
      <div>
        提前天{' '}
        <InputNumber
          controls={false}
          value={data}
          style={{ width: 70 }}
          min={1}
          onBlur={getInputNumberValue}
        />{' '}
        预警
      </div>
    </div>
  )
}

export default WorkingHours
