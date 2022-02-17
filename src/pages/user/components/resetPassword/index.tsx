import { Form, Input, message, Modal } from 'antd'
import React from 'react'

import { userApis } from '@/recoil/apis'

const ResetPassword = (props: any) => {
  const { visible, handleOk, handleCancel, userId } = props

  const { moreOperation } = userApis

  const [form] = Form.useForm()
  const { validateFields } = form

  const handleModalOk = () => {
    validateFields().then((values = {}) => {
      moreOperation({
        ...values,
        userId
      }).then((response: any) => {
        const { success, msg } = response
        message[success ? 'success' : 'error'](msg)
        success && handleOk()
      })
    })
  }

  return (
    <Modal
      title={`重置密码`}
      visible={visible}
      onOk={handleModalOk}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Form form={form} name="resetPassword">
        <Form.Item
          label="新密码"
          name="password"
          rules={[{ required: true, message: '请填写新密码' }]}
        >
          <Input placeholder="请填写新密码" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ResetPassword
