import './style.less'

import {
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Transfer
} from 'antd'
import { isArray, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { useStores } from '@/utils/mobx'
import { isAdd } from '@/utils/tool'

const { Option } = Select
const { TextArea } = Input

const UserModal = (props) => {
  const { visible, handleOk, handleCancel, current = {} } = props
  const {
    email,
    realName,
    remark,
    mobile,
    password,
    sex,
    masterDepartment = {},
    subsidiaryDepartment = [],
    roleList = [],
    status
  } = current
  const initTargetKeys = isArray(roleList)
    ? roleList.map((item) => item.id)
    : []
  const [form] = Form.useForm()
  const { validateFields } = form

  const { userStore, roleStore } = useStores()
  const { roleListTree } = roleStore
  const { departmentLists, operationUser } = userStore

  const [targetKeys, setTargetKeys] = useState([...initTargetKeys])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [roleOptions, setRoleOptions] = useState<any>([])
  const [departmentOption, setDepartmentOption] = useState<any>([])
  const initialValues = {
    email,
    realName,
    remark,
    mobile,
    password,
    sex,
    masterDepartment: masterDepartment ? masterDepartment.id : undefined,
    subsidiaryDepartment: isArray(subsidiaryDepartment)
      ? subsidiaryDepartment.map((item) => item.id)
      : undefined
  }

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys)
    console.log('direction:', direction)
    console.log('moveKeys:', moveKeys)
    setTargetKeys(nextTargetKeys)
  }
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys)
    console.log('targetSelectedKeys:', targetSelectedKeys)
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }
  // 获取全部角色
  const roleClassification = () => {
    roleListTree().then((response) => {
      const { success, data } = response
      if (success) {
        const newData = data
          .map((item) => item.roles)
          .reduce((prev, next) => {
            return [...prev, ...next]
          })
          .map((o) => ({
            key: o.id,
            title: o.name,
            description: o.remark
          }))
        setRoleOptions([...newData])
      }
    })
  }
  // 获取全部部门
  const getDepartmentTree = () => {
    departmentLists().then((data) => {
      const newArr = []
      for (let i = 0; i < data.length; i++) {
        const subArr = data[i].children
        for (let j = 0; j < subArr.length; j++) {
          newArr.push([...subArr[j].children])
        }
      }
      const departmentList = newArr.reduce((prev, next) => {
        return [...prev, ...next]
      })
      setDepartmentOption([...departmentList])
    })
  }

  const handleModalOk = () => {
    validateFields().then((values = {}) => {
      operationUser({
        ...values,
        masterDepartment: { id: values.masterDepartment },
        subsidiaryDepartment: values.subsidiaryDepartment
          ? values.subsidiaryDepartment.map((item) => ({
              id: item
            }))
          : undefined,
        roleList: isEmpty(targetKeys)
          ? undefined
          : targetKeys.map((item) => ({
              id: item
            })),
        userId: current.userId,
        status: status == 0 ? 1 : status
      }).then((response) => {
        const { success, msg } = response
        message[success ? 'success' : 'error'](msg)
        success && handleOk()
      })
    })
  }

  useEffect(() => {
    roleClassification()
    getDepartmentTree()
  }, [])

  return (
    <Modal
      title={`${isAdd(current) ? '新增' : '编辑'}用户`}
      width={600}
      visible={visible}
      onOk={handleModalOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="userForm"
        layout="vertical"
        initialValues={initialValues}
        key={isAdd(current) ? 'add' : current.userId}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="真实姓名"
              name="realName"
              rules={[{ required: true, message: '请填写真实姓名' }]}
            >
              <Input placeholder="请填写真实姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="邮箱" name="email">
              <Input placeholder="请填写邮箱" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="主属部门"
              name="masterDepartment"
              rules={[{ required: true, message: '请选择主属部门' }]}
            >
              <Select placeholder="请选择主属部门">
                {departmentOption.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.deptName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="附属部门" name="subsidiaryDepartment">
              <Select mode="multiple" placeholder="请选择附属部门">
                {departmentOption.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.deptName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="手机号"
              name="mobile"
              rules={[
                { required: true, message: '请填写手机号' },
                {
                  pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                  message: '请输入数字'
                }
              ]}
            >
              <Input placeholder="请填写手机号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="性别" name="sex">
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="0">女</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="备注" name="remark">
              <TextArea rows={3} placeholder="填写备注" />
            </Form.Item>
          </Col>
          {isAdd(current) && (
            <Col span={12}>
              <Form.Item
                label="初始密码"
                name="password"
                rules={[{ required: true, message: '请填写初始密码' }]}
              >
                <Input placeholder="请填写初始密码" />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
      <h3 className="role-title">分配角色</h3>
      <Transfer
        dataSource={roleOptions}
        titles={['未选角色', '目标角色']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={(item) => item.title}
      />
    </Modal>
  )
}

export default UserModal
