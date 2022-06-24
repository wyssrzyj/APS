/*
 * @Author: lyj
 * @Date: 2022-06-20 09:14:45
 * @LastEditTime: 2022-06-24 13:33:18
 * @Description:
 * @LastEditors: lyj
 */
import { Select } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

const ContrastGantt = (props) => {
  const { Option } = Select
  const { formData, checkIDs, getIframe } = props

  const [data, setData] = useState<any>()
  const [id, setID] = useState<any>()
  const [type, setType] = useState<any>('2')
  useEffect(() => {
    if (!isEmpty(checkIDs)) {
      console.log('checkIDs', checkIDs)
      setID(checkIDs)
    }
  }, [checkIDs])
  useEffect(() => {
    if (!isEmpty(data)) {
      getIframe && getIframe(data)
    }
  }, [data])

  const handleChange = (value: string) => {
    setType(value)
  }
  //获取子项的数据
  window.addEventListener('message', function (e) {
    setData(e.data)
  })

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
            id="lyj"
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
