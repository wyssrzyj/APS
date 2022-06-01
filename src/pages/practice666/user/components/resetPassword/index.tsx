import { Form, Input, message, Modal } from 'antd'

import { useStores } from '@/utils/mobx'

const ResetPassword = (props: {
  visible: any
  handleOk: any
  handleCancel: any
  userId: any
}) => {
  const { visible, handleOk, handleCancel, userId } = props
  const { userStore } = useStores()
  const { moreOperation } = userStore
  const [form] = Form.useForm()
  const { validateFields } = form

  const handleModalOk = () => {
    validateFields().then((values = {}) => {
      moreOperation({
        ...values,
        userId
      }).then((response: { success: any; msg: any }) => {
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
