import { Form, Input, Select } from 'antd'
import { debounce } from 'lodash'
import React from 'react'

import styles from './index.module.less'

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
    if (type === 'input') {
      return event.target.value
    }
  }

  return (
    <div className={styles.top}>
      <Form form={form}>
        <div className={styles.formContainer}>
          <Form.Item
            name="keywordq"
            label="客户优先级 权重"
            getValueFromEvent={(event: InputEvent) =>
              getValueFromEvent(event, 'input')
            }
          >
            <Input placeholder="请输入客户优先级" />
          </Form.Item>

          <Form.Item
            name="keywordw"
            label="订单优先级 权重"
            getValueFromEvent={(event: InputEvent) =>
              getValueFromEvent(event, 'input')
            }
          >
            <Input placeholder="请输入订单优先级" />
          </Form.Item>
          <Form.Item
            name="keyworde"
            label="交期优先级 权重"
            getValueFromEvent={(event: InputEvent) =>
              getValueFromEvent(event, 'input')
            }
          >
            <Input placeholder="请输入交期优先级" />
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default HeaderForm
