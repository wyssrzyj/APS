import { Form, Select } from 'antd'
import { debounce } from 'lodash' //防抖
import React from 'react'

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
    if (type === 'select') {
      console.log(event)

      // return event.target.value
    }
  }
  const list = [
    { name: '工厂1号', id: 1 },
    { name: '工厂2号', id: 2 },
    { name: '工厂3号', id: 3 }
  ]

  return (
    <div>
      <Form
        form={form} //第一步
      >
        <Form.Item
          name="keyword"
          label="选择工厂"
          //第4步 给每个form.Item添加getValueFromEvent事件
          //  {/* 设置如何将 event 的值转换成字段值 */}
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

export default index
