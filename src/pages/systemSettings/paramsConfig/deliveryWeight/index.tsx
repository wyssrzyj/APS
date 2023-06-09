/* eslint-disable react-hooks/rules-of-hooks */
import { Col, InputNumber, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
const DeliveryWeight = (props: { onChange: any; list: any }) => {
  const { onChange, list } = props
  const sum = [
    { delay: '', day: '1', weight: '' },
    { delay: '', day: '2', weight: '' },
    { delay: '', day: '2', weight: '' }
  ]

  const [data, useData] = useState<any>(sum)
  const [arr, useArr] = useState<any>('1') //未延期 天 周 月

  const [delayArr, useDelayArr] = useState<any>('2') //延期

  const { Option } = Select

  useEffect(() => {
    if (list.unExpireTimeUnit !== undefined) {
      useArr(String(list.unExpireTimeUnit))
      data[0].day = String(list.unExpireTimeUnit)
    }
    useDelayArr(String(list.expireTimeUnit))
    data[0].delay = list.unExpireTime
    data[0].weight = list.unExpireWeight

    data[1].delay = list.earlyWaringTime
    data[1].day = String(list.earlyWaringTimeUnit)
    data[1].weight = list.earlyWaringWeight

    data[2].delay = list.expireTime
    data[2].day = String(list.expireTimeUnit)
    data[2].weight = list.expireWeight
    useData([...data])
  }, [list])

  const inpout = (e: any, index: any) => {
    data[index].delay = e
    useData([...data])
  }
  const executionMethod = (e: any, index: any) => {
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
    <div className={styles.NoExtended}>
      <Row className={styles.firstRow}>
        <Col span={13} className={styles.container}>
          <div className={styles.innerContainer}>
            <span className={styles.labelText}>未延期:</span>
            <InputNumber
              controls={false}
              value={data[0].delay}
              style={{ width: 70 }}
              onChange={(e) => {
                inpout(e, 0)
              }}
            />
          </div>
          <Select
            // value={arr !== undefined ? arr : '1'}
            value={data[0].day}
            style={{ width: 60 }}
            onSelect={(e: any) => {
              executionMethod(e, 0)
            }}
          >
            <Option value="1">天</Option>
            <Option value="2">周</Option>
            <Option value="3">月</Option>
          </Select>
        </Col>
        <Col span={10}>
          权重:
          <span className={styles.operationIcon}>-</span>
          <InputNumber
            controls={false}
            value={data[0].weight}
            onChange={(e) => {
              weight(e, 0)
            }}
          />
        </Col>
      </Row>
      <Row className={styles.firstRow}>
        <Col span={13} className={styles.container}>
          <div className={styles.innerContainer}>
            <span className={styles.labelText}>预警期:</span>
            <InputNumber
              controls={false}
              value={data[1].delay}
              style={{ width: 70 }}
              onChange={(e) => {
                inpout(e, 1)
              }}
            />
          </div>
          <Select
            value={data[1].day}
            // value={arr !== undefined ? arr : '1'}
            style={{ width: 60 }}
            onSelect={(e: any) => {
              executionMethod(e, 1)
            }}
          >
            <Option value="1">天</Option>
            <Option value="2">周</Option>
            <Option value="3">月</Option>
          </Select>
        </Col>
        <Col span={10}>
          权重:
          <span className={styles.operationIcon}>+</span>
          <InputNumber
            controls={false}
            value={data[1].weight}
            onChange={(e) => {
              weight(e, 1)
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={13} className={styles.container}>
          <div className={styles.innerContainer}>
            <span className={styles.labelText}> 已延期:</span>
            <InputNumber
              controls={false}
              value={data[2].delay}
              style={{ width: 70 }}
              onChange={(e) => {
                inpout(e, 2)
              }}
            />
          </div>
          <Select
            value={data[2].day}
            // value={delayArr !== undefined ? delayArr : '1'}
            style={{ width: 60 }}
            onSelect={(e: any) => {
              executionMethod(e, 2)
            }}
          >
            <Option value="1">天</Option>
            <Option value="2">周</Option>
            <Option value="3">月</Option>
          </Select>
        </Col>
        <Col span={10}>
          权重:
          <span className={styles.operationIcon}>+</span>
          <InputNumber
            controls={false}
            value={data[2].weight}
            onChange={(e) => {
              weight(e, 2)
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default DeliveryWeight
