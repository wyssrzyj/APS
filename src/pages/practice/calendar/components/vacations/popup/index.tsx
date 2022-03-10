import { Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'

import { getChild } from '@/components/getChild'
import { practice } from '@/recoil/apis'

import WorkingHours from './workingHours/index'
function Popup(props) {
  const { content, newlyAdded } = props
  const { isModalVisible, setIsModalVisible, type, edit } = content
  const { holidayAddition } = practice
  const [form] = Form.useForm()
  //回显
  useEffect(() => {
    if (type !== 1) {
      // endDate
      form.setFieldsValue(edit) //回显
    }
    if (type === 1) {
      form.resetFields()
    }
  }, [edit, type])

  useEffect(() => {
    form.resetFields()
  }, [])

  const treeData = [
    {
      title: '工厂',
      value: '1',
      key: '1',
      children: [
        {
          title: '工厂1',
          value: '1-1',
          key: '1-1'
        },
        {
          title: '工厂2',
          value: '1-2',
          key: '1-2'
        }
      ]
    },
    {
      title: '原料',
      value: '2',
      key: '2',
      children: [
        {
          title: '大米',
          value: '2-1',
          key: '2-1'
        },
        {
          title: '土豆',
          value: '2-2',
          key: '2-2'
        },
        {
          title: '菠萝',
          value: '2-3',
          key: '2-3'
        }
      ]
    },
    {
      title: '玩具',
      value: '3',
      key: '3',
      children: [
        {
          title: '金铲铲的冠冕',
          value: '3-1',
          key: '3-1'
        },
        {
          title: '残暴之力',
          value: '3-2',
          key: '3-2'
        },
        {
          title: '末日寒冬',
          value: '3-3',
          key: '3-3'
        }
      ]
    },
    {
      title: '蔬菜',
      value: '4',
      key: '4'
    }
  ]
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
            label="工作时间"
            name="holidayList"
            rules={[{ required: true, message: '请选择工作时间!' }]}
          >
            <WorkingHours type={type} onChange={undefined} edit={edit} />
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
