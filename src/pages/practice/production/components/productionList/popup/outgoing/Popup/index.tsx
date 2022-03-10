import { DatePicker, Form, Modal } from 'antd'
import moment from 'moment'
import React from 'react'

function index(props: { isModalVisible: any; setIsModalVisible: any }) {
  const { isModalVisible, setIsModalVisible } = props

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
          <Form.Item label="计划开始时间" name="startTime">
            <DatePicker />
          </Form.Item>

          <Form.Item label="计划结束时间" name="endTime">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default index
