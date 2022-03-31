import { Col, Form, Row, TreeSelect } from 'antd'
import { debounce } from 'lodash'
import React from 'react'

import { getChild } from '@/components/getChild/index'

const { SHOW_PARENT } = TreeSelect

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 24
  }
}

const HeaderForm = (props: { FormData: any; treeData: any }) => {
  const { FormData, treeData } = props
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
    if (type === 'treeSelect') {
      return getChild(event, treeData)
    }
    return event
  }
  const tProps = {
    treeData,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择工作班组'
  }
  return (
    <div>
      <Form form={form}>
        <Row>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="teamIds"
              label="加班班组"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'treeSelect')
              }
            >
              <TreeSelect {...tProps} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default HeaderForm
