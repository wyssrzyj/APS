import { Form, Input, Row, Select } from 'antd'
import { debounce } from 'lodash' //防抖
import React from 'react'
const { Option } = Select

const layout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 16
  }
}
const system = [
  {
    value: '1',
    label: '通过'
  },
  {
    value: '0',
    label: '不通过'
  }
]

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
    return event
  }

  return (
    <div>
      <Form
        form={form} //第一步
      >
        <Row>
          <Form.Item
            {...layout}
            name="keyword"
            label="用户关键字"
            //第4步 给每个form.Item添加getValueFromEvent事件
            //  {/* 设置如何将 event 的值转换成字段值 */}
            getValueFromEvent={(event: InputEvent) =>
              getValueFromEvent(event, 'input')
            }
          >
            <Input placeholder="请输入用户关键字" size="small" allowClear />
          </Form.Item>

          <Form.Item
            {...layout}
            name="name"
            label="分类名称"
            //第4步 给每个form.Item添加getValueFromEvent事件
            //  {/* 设置如何将 event 的值转换成字段值 */}
            getValueFromEvent={(event: InputEvent) =>
              getValueFromEvent(event, 'input')
            }
          >
            <Input placeholder="请输入订单名称" size="small" allowClear />
          </Form.Item>

          <Form.Item
            {...layout}
            label="状态"
            name="status"
            getValueFromEvent={(event: InputEvent) => getValueFromEvent(event)}
          >
            <Select placeholder="请选择状态" allowClear style={{ width: 220 }}>
              {system.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Row>
      </Form>
    </div>
  )
}

export default index
