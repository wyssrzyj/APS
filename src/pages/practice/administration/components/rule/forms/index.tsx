import { Col, Form, Input, Row, TreeSelect } from 'antd'
import { debounce } from 'lodash'
import React from 'react'

import { getChild } from '@/components/getChild/index'
const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}
const HeaderForm = (props: Record<string, any>) => {
  const { FormData, treeData, onChange } = props
  const { SHOW_PARENT } = TreeSelect
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { validateFields } = form
  const handleSubmit = debounce(async () => {
    const values = await validateFields()
    FormData && FormData(values)
  }, 500)
  const tProps = {
    allowClear: true,
    treeData,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择工作班组'
  }
  return (
    <div>
      <Form form={form} onValuesChange={onChange}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item {...layout} name="workModeName" label="模板名称">
              <Input placeholder="请输入模板名称" allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...layout} name="teams" label="工作班组">
              <TreeSelect {...tProps} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default HeaderForm
