import { Col, Form, Input, Row, TreeSelect } from 'antd'
import { debounce } from 'lodash' //防抖

import { getChild } from '@/components/getChild/index'
const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 24
  }
}

const HeaderForm = (props: { FormData: any; treeData: any }) => {
  const { FormData, treeData } = props
  const { SHOW_PARENT } = TreeSelect

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
  }
  const tProps = {
    treeData,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择工厂'
  }
  return (
    <div>
      <Form form={form}>
        <Row>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="teams"
              label="选择工厂"
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
