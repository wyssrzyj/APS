import { DatePicker, Form, Modal, Radio } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'

const Popup = (props: { isModalVisible: any; setIsModalVisible: any }) => {
  const { isModalVisible, setIsModalVisible } = props
  const [value, setValue] = useState(1)
  const onChange = (e: any) => {
    setValue(e.target.value)
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()

  const handleOk = () => {
    form.submit()
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
    console.log(moment(values.startTime).valueOf())
    console.log(moment(values.endTime).valueOf())
  }
  return (
    <div>
      <Modal
        title="整单外发"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="外发物料" name="startTime1">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="最早物料齐套时间" name="startTime2">
            <DatePicker />
          </Form.Item>
          <Form.Item label="外发用时" name="startTime3">
            <DatePicker />
          </Form.Item>

          <Form.Item label="回厂加工用时" name="endTime4">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Popup
