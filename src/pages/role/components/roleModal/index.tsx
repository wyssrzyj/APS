import { Form, Input, Modal } from 'antd'
import moment from 'moment'

import { isAdd } from '@/utils/tool'

const { TextArea } = Input

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const RoleModal = (props: any) => {
  const { visible, handleOk, handleCancel, current = {} } = props
  const [form] = Form.useForm()
  const { validateFields } = form

  const initialValues = {
    groupId: current.groupId,
    name: current.name,
    remark: current.remark
  }

  const handleConfirm = () => {
    validateFields().then((values) => {
      handleOk({ ...values, id: current.id })
    })
  }

  return (
    <Modal
      title={`${isAdd(current.id) ? '新增' : '编辑'}角色`}
      visible={visible}
      onOk={handleConfirm}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Form
        {...layout}
        form={form}
        key={isAdd(current.id) ? null : current.id}
        name="departmentForm"
        initialValues={initialValues}
      >
        <Form.Item
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '请填写角色名称!' }]}
        >
          <Input placeholder="请填写角色名称" />
        </Form.Item>
        <Form.Item
          label="角色描述"
          name="remark"
          rules={[{ required: true, message: '请填写角色描述!' }]}
        >
          <TextArea rows={4} placeholder="请填写角色描述" />
        </Form.Item>
        {!isAdd(current.id) && (
          <>
            <Form.Item label="创建人" name="people">
              <span>{current.createBy}</span>
            </Form.Item>
            <Form.Item label="创建时间" name="time">
              <span>
                {current.createTime
                  ? moment(current.createTime).format('YYYY-MM-DD HH:mm:ss')
                  : '--'}
              </span>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default RoleModal
