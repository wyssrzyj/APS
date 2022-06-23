/*
 * @Author: lyj
 * @Date: 2022-06-20 09:14:45
 * @LastEditTime: 2022-06-23 16:05:37
 * @Description:
 * @LastEditors: lyj
 */
import { Select } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

const ContrastGantt = (props) => {
  const { Option } = Select
  const { formData, checkIDs } = props

  const [id, setID] = useState<any>()
  const [type, setType] = useState<any>('2')
  useEffect(() => {
    if (!isEmpty(checkIDs)) {
      console.log('checkIDs', checkIDs)
      setID(checkIDs)
    }
  }, [checkIDs])

  const handleChange = (value: string) => {
    // setID(value)
    setType(value)
  }

  return (
    <>
      <div className={styles.iframeRight}>
        <Select defaultValue="2" style={{ width: 120 }} onChange={handleChange}>
          <Option value="2">算法1</Option>
          <Option value="3">算法2</Option>
          <Option value="4">算法3</Option>
        </Select>
      </div>
      <div className={styles.iframeContainer}>
        <>
          <iframe
            frameBorder="0"
            title={'beforeUpdate'}
            className={styles.domeLeft}
            src={`/iframeDate?id=${formData}&type=1&state=contrast`} //对比不用刷新
          ></iframe>
        </>
        <div className={styles.clearance}></div>
        <>
          <iframe
            frameBorder="0"
            title={'afterUpdate'}
            className={styles.domeLeft}
            src={`/iframeDate?id=${id}&type=${type}&state=contrast`}
          ></iframe>
        </>
      </div>
    </>
  )
}

export default ContrastGantt
