import { Col, DatePicker, Form, Input, Row, Select } from 'antd'
import { debounce } from 'lodash' //防抖
import moment from 'moment'
import React, { useState } from 'react'
const { RangePicker } = DatePicker
const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 15
  }
}

const HeaderForm = (props: { FormData: any; factoryData: any }) => {
  const { FormData, factoryData } = props
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { validateFields } = form
  const { Option } = Select
  const [listID, setListID] = useState<any>() //工厂ID

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
    if (type === 'picker') {
      //ceshi
      console.log(event)

      if (event !== null) {
        event.startPlanEndDate = moment(event[0]).valueOf()
        event.endPlanEndDate = moment(event[1]).valueOf()
        return event
      } else {
        return null
      }
    }

    return event
  }
  const getFactoryName = (e: any) => {
    setListID(e)
  }
  return (
    <div>
      <Form form={form}>
        <Row>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="factoryId"
              label="工厂名称"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'select')
              }
            >
              <Select
                allowClear={true}
                onChange={getFactoryName}
                placeholder="请选择工厂名称"
              >
                {factoryData != undefined
                  ? factoryData.map(
                      (item: {
                        id: React.Key | null | undefined
                        name:
                          | boolean
                          | React.ReactChild
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined
                      }) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      )
                    )
                  : null}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="productOrderNum"
              label="生产单号"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'input')
              }
            >
              <Input placeholder="请输入生产单号" allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="productName"
              label="产品名称"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'input')
              }
            >
              <Input placeholder="请输入产品名称" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="productNum"
              label="产品款号"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'input')
              }
            >
              <Input placeholder="请输入产品款号" allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="productClientNum"
              label="客户款号"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'input')
              }
            >
              <Input placeholder="请输入客户款号" allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="planEndDate"
              label="计划完成日期"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'picker')
              }
            >
              <RangePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default HeaderForm
