import { Form, Input, Select } from 'antd'
import { debounce } from 'lodash' //防抖
import React from 'react'

import styles from './index.module.less'

const { Option } = Select

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
  }

  return (
    <div className={styles.top}>
      <Form
        form={form} //第一步
      >
        <div className={styles.form}>
          <Form.Item
            name="keywordq"
            label="客户优先级 权重"
            //第4步 给每个form.Item添加getValueFromEvent事件
            //  {/* 设置如何将 event 的值转换成字段值 */}
            getValueFromEvent={(event: InputEvent) =>
              getValueFromEvent(event, 'input')
            }
          >
            <Input placeholder="请输入客户优先级" />
          </Form.Item>

          <Form.Item
            name="keywordw"
            label="订单优先级 权重"
            //第4步 给每个form.Item添加getValueFromEvent事件
            //  {/* 设置如何将 event 的值转换成字段值 */}
            getValueFromEvent={(event: InputEvent) =>
              getValueFromEvent(event, 'input')
            }
          >
            <Input placeholder="请输入订单优先级" />
          </Form.Item>
          <Form.Item
            name="keyworde"
            label="交期优先级 权重"
            //第4步 给每个form.Item添加getValueFromEvent事件
            //  {/* 设置如何将 event 的值转换成字段值 */}
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

export default index
