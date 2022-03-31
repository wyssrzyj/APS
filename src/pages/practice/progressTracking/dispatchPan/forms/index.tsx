import { Col, DatePicker, Form, Input, Row, Select } from 'antd'
import { debounce } from 'lodash'
import moment from 'moment'
import React from 'react'
const { RangePicker } = DatePicker
const { Option } = Select

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
  const [form] = Form.useForm() //第二步.
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
  const list = [
    { name: '工厂1号', id: 1 },
    { name: '工厂2号', id: 2 },
    { name: '工厂3号', id: 3 }
  ]
  const data = [
    { name: '工厂12号', id: 1 },
    { name: '工厂222号', id: 2 },
    { name: '工厂32号', id: 3 }
  ]
  return (
    <div>
      <Form form={form}>
        <Row>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="production"
              label="工厂名称"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'input')
              }
            >
              <Select
                allowClear
                defaultValue="请选择工厂"
                style={{ width: 300 }}
              >
                {list.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="sales"
              label="工序名称"
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
              label="生产单号"
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
              label="所属工段"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'input')
              }
            >
              <Select
                allowClear
                defaultValue="请选择工厂"
                style={{ width: 300 }}
              >
                {data.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="completionTime1"
              label="计划开始日期"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'picker')
              }
            >
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="completionTime"
              label="计划结束日期"
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
