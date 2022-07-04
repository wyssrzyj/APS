/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-05-25 10:09:18
 * @LastEditors: lyj
 * @LastEditTime: 2022-07-04 17:52:07
 * @FilePath: \jack-aps\src\pages\practice\administration\components\scheduling\toPlan\forms\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Col, DatePicker, Form, Input, Row, Select } from 'antd'
import { debounce } from 'lodash' //防抖
import moment from 'moment'
import React, { useEffect, useState } from 'react'
const { RangePicker } = DatePicker
const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 15
  }
}

const HeaderForm = (props: any) => {
  const { FormData, formData, productName } = props

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { validateFields } = form
  const { Option } = Select

  useEffect(() => {
    if (productName !== undefined) {
      form.setFieldsValue({ productName: productName })
    }
  }, [productName])

  const getCurrentUser = () => {
    // 本地没有就返回 第一条
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser) {
      if (currentUser.user.factoryId !== null) {
        return currentUser.user.factoryId
      } else {
        return '1516640636965494785'
      }
    } else {
      return '1516640636965494785'
    }
  }

  useEffect(() => {
    //初始不进行清空 ，操作后才会清空
    if (formData !== getCurrentUser() && formData !== undefined) {
      form.setFieldsValue({ productName: '' })
    }
  }, [formData])

  const handleSubmit = debounce(async () => {
    const values = await validateFields()
    //处理时间格式
    const timeFormat = { ...values, ...values.planEndDate }
    FormData && FormData(timeFormat)
  }, 500)

  const getValueFromEvent = (event: any, type = 'text') => {
    setTimeout(async () => {
      await handleSubmit()
    })
    if (type === 'input') {
      return event.target.value
    }
    return event
  }

  return (
    <div>
      <Form form={form}>
        <Row>
          <Col span={24}>
            <Form.Item
              {...layout}
              name="productName"
              label="订单号"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'input')
              }
            >
              <Input placeholder="请输入订单号" allowClear />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default HeaderForm
