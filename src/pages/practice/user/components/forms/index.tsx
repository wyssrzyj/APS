import { Form, Input, Row, Select } from 'antd'
import { debounce } from 'lodash' //防抖
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

const HeaderForm = (props: { FormData: any }) => {
  const { FormData } = props
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
    return event
  }

  return (
    <div>
      <Form form={form}>
        <Row>
          <Form.Item
            {...layout}
            name="keyword"
            label="用户关键字"
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

export default HeaderForm
