/* eslint-disable react-hooks/rules-of-hooks */
import { Form, Input, Modal, TreeSelect } from 'antd'
import React, { useEffect } from 'react'

import { getChild } from '@/components/getChild'

import WorkingHours from './workingHours/index'
function index(props: { content: any }) {
  const { content } = props
  const { isModalVisible, setIsModalVisible, type } = content
  const value = ['0-0-0']
  const { SHOW_PARENT } = TreeSelect

  const [form] = Form.useForm()
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
    setIsModalVisible(false)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
    if (values.workTeam) {
      values.workTeam = getChild(values.workTeam, treeData) //下拉多选的处理
    }
    form.resetFields()
    setIsModalVisible(false)
  }
  const tProps = {
    treeData,
    value: value,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择工作班组',
    style: {
      width: '100%'
    }
  }
  return (
    <div>
      <Modal
        width={700}
        title={type ? '新增节假日' : '编辑节假日'}
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
            name="holiday"
            rules={[{ required: true, message: '请输入节假日!' }]}
          >
            <Input maxLength={100} placeholder="请输入节假日" />
          </Form.Item>
          <Form.Item
            label="工作班组"
            name="teamIds"
            rules={[{ required: true, message: '请选择工作班组!' }]}
          >
            <TreeSelect disabled={type === 3 ? true : false} {...tProps} />
          </Form.Item>

          <Form.Item label="备注" name="remarks">
            <Input maxLength={100} placeholder="请输入备注" />
          </Form.Item>

          <Form.Item
            name="workingHours"
            label="效率"
            rules={[{ required: true, message: '请选择工作时间!' }]}
          >
            <WorkingHours />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default index
