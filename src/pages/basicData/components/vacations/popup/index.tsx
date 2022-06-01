import { Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'

import { getChild } from '@/components/getChild'
import { holidaySeasonApis } from '@/recoil/apis'

import WorkingHours from './workingHours/index'
function Popup(props: any) {
  const { content, newlyAdded } = props
  const { isModalVisible, setIsModalVisible, type, edit } = content
  const { holidayAddition } = holidaySeasonApis
  const [initialValues, setInitialValues] = useState({})
  const [form] = Form.useForm()
  //回显
  useEffect(() => {
    if (type !== 1) {
      setInitialValues(edit)
    }
    if (type === 1) {
      form.resetFields()
    }
  }, [edit, type])
  useEffect(() => {
    if (initialValues) {
      form.resetFields() //重置form中的数据
    }
  }, [initialValues])

  useEffect(() => {
    form.resetFields()
  }, [])

  const layout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 13
    }
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false)
  }

  const onOk = async (
    values: {
      teamIds: any[]
      date: moment.MomentInput
      createTime: moment.MomentInput
    },
    type: number
  ) => {
    const list = type === 1 ? values : { ...values, id: edit.id }

    const res = await holidayAddition(list)
    if (res === true) {
      newlyAdded()
      form.resetFields()
      setIsModalVisible(false)
    }
  }
  const onFinish = (values: any) => {
    if (type === 1) {
      onOk(values, 1)
    }
    if (type === 2) {
      onOk(values, 2)
    }
  }
  return (
    <div>
      <Modal
        width={700}
        title={
          type === 1 ? '新增节假日' : type === 2 ? '编辑节假日' : '查看节假日'
        }
        visible={isModalVisible}
        destroyOnClose={true}
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
      >
        <Form
          form={form}
          name="basic"
          {...layout}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={initialValues}
        >
          <Form.Item
            label="节假日"
            name="name"
            rules={[{ required: true, message: '请输入节假日!' }]}
          >
            <Input
              disabled={type === 3 ? true : false}
              maxLength={100}
              placeholder="请输入节假日"
            />
          </Form.Item>
          <Form.Item
            label="节假日时间"
            name="holidayList"
            rules={[{ required: true, message: '请选择节假日时间!' }]}
          >
            <WorkingHours type={type} edit={edit} />
          </Form.Item>

          <Form.Item label="备注" name="remark">
            <Input
              disabled={type === 3 ? true : false}
              maxLength={100}
              placeholder="请输入备注"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Popup
