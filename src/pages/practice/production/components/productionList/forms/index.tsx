import { Col, DatePicker, Form, Input, Row } from 'antd'
import { debounce } from 'lodash' //防抖
import moment from 'moment'
import React from 'react'
const { RangePicker } = DatePicker
const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 15
  }
}

const HeaderForm = (props: { FormData: any }) => {
  const { FormData } = props
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { validateFields } = form

  const handleSubmit = debounce(async () => {
    const values = await validateFields()
    FormData && FormData(values)
  }, 500)

  const getValueFromEvent = (event: any, type = 'text') => {
    setTimeout(async () => {
      await handleSubmit()
    })
    if (type === 'input') {
      return event.target.value
    }
    if (type === 'picker') {
      event.startTime = moment(event[0]).format('x')
      event.endTime = moment(event[1]).format('x')
      return event
    }
    return event
  }

  return (
    <div>
      <Form form={form}>
        <Row>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="production"
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
              name="sales"
              label="销售单号"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'input')
              }
            >
              <Input placeholder="请输入销售单号" allowClear />
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
              name="number"
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
              name="customer"
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
              name="completionTime"
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
