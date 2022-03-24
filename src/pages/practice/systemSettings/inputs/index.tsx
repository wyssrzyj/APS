/* eslint-disable react-hooks/rules-of-hooks */
import {
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Popover,
  Row,
  Select
} from 'antd'
import React, { useEffect, useState } from 'react'
const Inputs = (props: { onChange: any; list: any; item: any }) => {
  const { onChange, list, item } = props
  const [arr, useArr] = useState<any>('1')
  const [data, useData] = useState({ delay: '', day: arr })
  //回显
  useEffect(() => {
    if (list) {
      useData({ delay: list[item.name], day: `${list[item.unit]}` })
      // useArr(`${list[item.unit]}`)
      console.log('测试111', list)
      console.log('测试', list[item.unit])
    }
    console.log('测试222', list)
  }, [list])
  const { Option } = Select

  const weight = (e: any, index: any) => {
    data.delay = e
    useData({ ...data })
  }

  const executionMethod = (e: any, index: any) => {
    data.day = e
    useArr(e)
    useData({ ...data })
  }
  //传递出去
  useEffect(() => {
    onChange(data)
  }, [data])

  return (
    <div>
      <Row>
        <Col span={4}>
          <InputNumber
            style={{ width: 140 }}
            value={data.delay}
            onChange={(e) => {
              weight(e, 0)
            }}
          />
        </Col>

        <Col span={12}>
          <Select
            value={arr}
            style={{ width: 60 }}
            onChange={(e: any) => {
              executionMethod(e, 0)
            }}
          >
            <Option value="1">天</Option>
            <Option value="2">周</Option>
            <Option value="3">月</Option>
          </Select>
        </Col>
      </Row>
    </div>
  )
}

export default Inputs
