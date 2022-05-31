import { Form, Input, Row } from 'antd'
import { debounce } from 'lodash'
import React from 'react'

const layout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 16
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
    return event
  }

  return (
    <div>
      <Form form={form}>
        <Row>
          <Form.Item
            {...layout}
            name="name"
            label="节假日名称"
            getValueFromEvent={(event: InputEvent) =>
              getValueFromEvent(event, 'input')
            }
          >
            <Input placeholder="请输入节假日名称" allowClear />
          </Form.Item>
        </Row>
      </Form>
    </div>
  )
}

export default HeaderForm
