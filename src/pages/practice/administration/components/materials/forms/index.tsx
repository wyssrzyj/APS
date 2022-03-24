/* eslint-disable react-hooks/rules-of-hooks */
import { Form, Input, Row } from 'antd'
import { debounce } from 'lodash' //防抖
import React from 'react'

const layout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 16
  }
}

function index(props: { FormData: any }) {
  const { FormData } = props
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
            label="生产单号"
            //第4步 给每个form.Item添加getValueFromEvent事件
            //  {/* 设置如何将 event 的值转换成字段值 */}
            getValueFromEvent={(event: InputEvent) =>
              getValueFromEvent(event, 'input')
            }
          >
            <Input placeholder="请输入生产单号" allowClear />
          </Form.Item>
          <Form.Item
            {...layout}
            name="keyword"
            label="销售单号"
            //第4步 给每个form.Item添加getValueFromEvent事件
            //  {/* 设置如何将 event 的值转换成字段值 */}
            getValueFromEvent={(event: InputEvent) =>
              getValueFromEvent(event, 'input')
            }
          >
            <Input placeholder="请输入销售单号" allowClear />
          </Form.Item>
        </Row>
      </Form>
    </div>
  )
}

export default index
