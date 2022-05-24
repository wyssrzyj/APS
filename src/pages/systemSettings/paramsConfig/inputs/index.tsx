/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-05-19 08:38:27
 * @LastEditors: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @LastEditTime: 2022-05-19 19:56:58
 * @FilePath: \jack-aps\src\pages\systemSettings\paramsConfig\inputs\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  const [data, useData] = useState({ delay: '', day: '1' })
  //回显
  useEffect(() => {
    if (list[item.name] !== null && list[item.unit]) {
      useData({ delay: list[item.name], day: `${list[item.unit]}` })
    }
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
        <InputNumber
          style={{ width: 150 }}
          value={data.delay !== null ? data.delay : '1'}
          onChange={(e) => {
            weight(e, 0)
          }}
        />
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

        {/* <Col span={12}>
        </Col> */}
      </Row>
    </div>
  )
}

export default Inputs
