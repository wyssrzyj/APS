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

function index(props: { FormData: any }) {
  const { FormData } = props
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm() //第二步.
  const { validateFields } = form

  const handleSubmit = debounce(async () => {
    const values = await validateFields()
    FormData && FormData(values)
  }, 500)

  //第5步 这个方法 会根据type的值来 return 返回不同的值
  const getValueFromEvent = (event: any, type = 'text') => {
    // 可根据需要 通过 setFieldsValue 设置联动效果
    setTimeout(async () => {
      await handleSubmit()
    })
    // ****根据不同的返回不同的数据
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
      <Form
        form={form} //第一步
      >
        <Row>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="production"
              label="生产单号"
              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
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
              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
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
              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
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
              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
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
              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
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
              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
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

export default index
