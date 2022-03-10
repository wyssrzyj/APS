/* eslint-disable react-hooks/rules-of-hooks */
import { Col, InputNumber, Row, Select } from 'antd'
import { isEmpty, isNil } from 'lodash'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
const DeliveryWeight = (props: { onChange: any; list: any }) => {
  const { onChange, list } = props
  const sum = [
    { delay: '', day: '3', weight: '' },
    { delay: '', day: '2', weight: '' }
  ]

  const [data, useData] = useState<any>(sum)
  const [arr, useArr] = useState<any>('1') //未延期 天 周 月

  const [delayArr, useDelayArr] = useState<any>('2') //延期

  const { Option } = Select

  useEffect(() => {
    useArr(String(list.unExpireTimeUnit))
    useDelayArr(String(list.expireTimeUnit))
    data[0].delay = list.unExpireTime
    data[0].day = String(list.unExpireTimeUnit)
    data[0].weight = list.unExpireWeight
    data[1].delay = list.expireTime
    data[1].day = String(list.expireTimeUnit)
    data[1].weight = list.expireWeight
    useData([...data])
  }, [list])
  const inpout = (e: any, index: any) => {
    data[index].delay = e
    useData([...data])
  }
  const btn = (e: any, index: any) => {
    if (index === 0) {
      useArr(String(list.unExpireTimeUnit))
    } else {
      useDelayArr(String(list.expireTimeUnit))
    }
    data[index].day = e
    useData([...data])
  }
  const weight = (e: any, index: any) => {
    data[index].weight = e
    useData([...data])
  }
  useEffect(() => {
    if (data[0].delay !== '') {
      onChange && onChange(data)
    }
  }, [data])
  return (
    <div>
      <Row className={styles.NoExtended}>
        <Col span={5}>
          未延期:　
          <InputNumber
            value={data[0].delay}
            style={{ width: 60 }}
            onChange={(e) => {
              inpout(e, 0)
            }}
          />
          　
          <Select
            value={arr}
            style={{ width: 60 }}
            onSelect={(e: any) => {
              btn(e, 0)
            }}
          >
            <Option value="1">天</Option>
            <Option value="2">周</Option>
            <Option value="3">月</Option>
          </Select>
        </Col>
        <Col span={5} className={styles.NoExtended}>
          权重:　-　
          <InputNumber
            value={data[0].weight}
            onChange={(e) => {
              weight(e, 0)
            }}
          />
        </Col>
      </Row>
      <Row className={styles.NoExtended}>
        <Col span={5}>
          已延期:　
          <InputNumber
            value={data[1].delay}
            style={{ width: 60 }}
            onChange={(e) => {
              inpout(e, 1)
            }}
          />
          　
          <Select
            value={delayArr}
            style={{ width: 60 }}
            onSelect={(e: any) => {
              btn(e, 1)
            }}
          >
            <Option value="1">天</Option>
            <Option value="2">周</Option>
            <Option value="3">月</Option>
          </Select>
        </Col>
        <Col span={5} className={styles.NoExtended}>
          权重:　+　
          <InputNumber
            value={data[1].weight}
            onChange={(e) => {
              weight(e, 1)
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default DeliveryWeight
