import { Form, Select } from 'antd'
import { debounce } from 'lodash'
import React from 'react'

const { Option } = Select

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
    if (type === 'select') {
      console.log(event)
    }
  }
  const list = [
    { name: '工厂1号', id: 1 },
    { name: '工厂2号', id: 2 },
    { name: '工厂3号', id: 3 }
  ]

  return (
    <div>
      <Form form={form}>
        <Form.Item
          name="keyword"
          label="选择工厂"
          getValueFromEvent={(event: InputEvent) =>
            getValueFromEvent(event, 'select')
          }
        >
          <Select allowClear defaultValue="请选择工厂" style={{ width: 300 }}>
            {list.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
}

export default HeaderForm
