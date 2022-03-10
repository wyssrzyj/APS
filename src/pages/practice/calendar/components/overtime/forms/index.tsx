import { Col, Form, Row, TreeSelect } from 'antd'
import { debounce } from 'lodash' //防抖
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

function index(props: { FormData: any; treeData: any }) {
  const { FormData, treeData } = props
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
      <Form
        form={form} //第一步
      >
        <Row>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="teamIds"
              label="加班班组"
              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
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

export default index
