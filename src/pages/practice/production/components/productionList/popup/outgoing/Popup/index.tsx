import { DatePicker, Form, Input, message, Modal, Radio } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'
const Popup = (props: any) => {
  const {
    isModalVisible,
    setIsModalVisible,
    externalProduceOrderId,
    outgoing,
    editHandle
  } = props
  const { outboundSave } = practice
  const [value, setValue] = useState<any>(1)
  const onChange = (e: any) => {
    setValue(e.target.value)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  useEffect(() => {
    if (outgoing !== undefined) {
      outgoing.allPresentTime = moment(outgoing.allPresentTime)
      form.setFieldsValue(outgoing)
    }
  }, [outgoing])

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = async (values: any) => {
    values.externalProduceOrderId = externalProduceOrderId
    values.allPresentTime = `${moment(values.allPresentTime).valueOf()}`
    await outboundSave(values)
    editHandle && editHandle()
    setIsModalVisible(false)
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
          <Form.Item label="外发物料" name="outProductFlag">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="最早物料齐套时间" name="allPresentTime">
            <DatePicker />
          </Form.Item>
          <Form.Item label="外发用时" name="outTime">
            <Input placeholder="请输入外发用时" suffix="天" />
          </Form.Item>

          <Form.Item label="回厂加工用时" name="inTime">
            <Input placeholder="请输入回厂加工用时" suffix="天" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Popup
