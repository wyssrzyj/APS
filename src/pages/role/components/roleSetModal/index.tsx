import { Form, Input, InputNumber, Modal } from 'antd'
import React from 'react'

import { isAdd } from '@/utils/tool'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const RoleSetModal = (props: any) => {
  const { visible, handleOk, handleCancel, current = {} } = props

  const [form] = Form.useForm()
  const { validateFields } = form

  const initialValues = {
    name: current.name,
    groupOrder: current.groupOrder
  }

  const handleConfirm = () => {
    validateFields().then((values) => {
      handleOk({ ...values, id: current.id })
    })
  }

  return (
    <Modal
      title={`${isAdd(current) ? '新增' : '编辑'}角色组`}
      visible={visible}
      onOk={handleConfirm}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Form
        {...layout}
        form={form}
        name="roleSetForm"
        key={isAdd(current) ? null : current.id}
        initialValues={initialValues}
      >
        <Form.Item
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '请填写角色名称' }]}
        >
          <Input placeholder="角色组名称" />
        </Form.Item>
        <Form.Item
          label="排列序号"
          name="groupOrder"
          rules={[{ required: true, message: '请选择排列序号' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default RoleSetModal
