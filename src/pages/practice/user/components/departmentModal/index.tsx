import './style.less'

import { Form, Input, Modal, Select } from 'antd'
import { get } from 'lodash'
import React, { useRef } from 'react'

const { Option } = Select

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}
const opreationMap = { add: '新增', edit: '编辑', modify: '修改' }

const DepartmentModal = (props: any) => {
  const refForm: any = useRef(null)
  const { visible, handleOk, handleCancel, type } = props
  const handleModalOk = () => {
    refForm.current.validateFields().then((values: any) => {
      handleOk()
      console.log(values)
    })
  }
  return (
    <Modal
      title={`${get(opreationMap, type)}部门`}
      visible={visible}
      onOk={handleModalOk}
      onCancel={handleCancel}
    >
      <Form {...layout} ref={refForm} name="departmentForm">
        {type !== 'modify' && (
          <Form.Item
            label="上级部门"
            name="department"
            rules={[{ required: true, message: '请选择上级部门！' }]}
          >
            <Select placeholder="请选择上级部门">
              <Option value="jack">开发部</Option>
              <Option value="lucy">运维部</Option>
            </Select>
          </Form.Item>
        )}

        <Form.Item
          label="部门名称"
          name="name"
          rules={[{ required: true, message: '请填写部门名称!' }]}
        >
          <Input placeholder="请填写部门名称" />
        </Form.Item>
        {type === 'modify' && (
          <Form.Item
            label="角色名称"
            name="user"
            rules={[{ required: true, message: '请填写角色名称!' }]}
          >
            <Input placeholder="请填写角色名称" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

export default DepartmentModal
