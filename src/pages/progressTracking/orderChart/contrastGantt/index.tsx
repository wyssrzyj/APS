/*
 * @Author: lyj
 * @Date: 2022-06-20 09:14:45
 * @LastEditTime: 2022-06-20 09:41:06
 * @Description:
 * @LastEditors: lyj
 */
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

const ContrastGantt = (props) => {
  const { Option } = Select
  const { formData } = props

  const [id, setID] = useState<any>()
  useEffect(() => {
    setID(formData)
  }, [formData])

  const handleChange = (value: string) => {
    setID(value)
  }

  return (
    <>
      <div className={styles.iframeRight}>
        <Select
          defaultValue="1516640636965494785"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="1516640636965494785">APS测试</Option>
          <Option value="1481903393613139970">盛宝丽</Option>
          <Option value="Yiminghe">3</Option>
        </Select>
      </div>
      <div className={styles.iframeContainer}>
        <>
          <iframe
            frameBorder="0"
            title={'beforeUpdate'}
            className={styles.domeLeft}
            src={`/iframeDate?id=${formData}&type=1`} //对比不用刷新
          ></iframe>
        </>
        <>
          <iframe
            frameBorder="0"
            title={'afterUpdate'}
            className={styles.domeLeft}
            src={`/iframeDate?id=${id}&type=2`}
          ></iframe>
        </>
      </div>
    </>
  )
}

export default ContrastGantt
