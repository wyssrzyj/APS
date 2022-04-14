import { DatePicker, Form, Input, Modal, TreeSelect } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { getChild } from '@/components/getChild'
import { practice } from '@/recoil/apis'

import WorkingHours from './workingHours/index'
function Popup(props: { content: any }) {
  const { content } = props
  const { isModalVisible, setIsModalVisible } = content
  const { overtimeAddition, teamId } = practice
  const { SHOW_PARENT } = TreeSelect
  const { RangePicker } = DatePicker
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const [time, settime] = useState<any>()

  const value = ['0-0-0']

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
    //编辑
    if (values.teamIds) {
      values.teamIds = getChild(values.teamIds, treeData) //下拉多选的处理
    }
    //时间的处理
    if (values.date) {
      const arr = moment(values.date).format('YYYY-MM-DD')
      values.date = moment(arr).valueOf()
    }
    if (values.createTime) {
      values.createTime = moment(values.createTime).valueOf()
    }
    const list = type === 1 ? values : { ...values }
    //班组为false才执行
    const arr: any = await teamId({ idList: values.teamIds })

    if (arr.success === true) {
      const res = await overtimeAddition(list)

      if (res === true) {
        console.log('执行')
        form.resetFields()
        setIsModalVisible(false)
      }
    }
  }
  const onFinish = async (values: any) => {
    onOk(values, 2)
  }
  // 假数据
  const treeData = [
    {
      title: '工厂',
      value: '1',
      key: '1',
      children: [
        {
          title: '工厂1',
          value: '2',
          key: '2'
        },
        {
          title: '工厂2',
          value: '3',
          key: '3'
        }
      ]
    },
    {
      title: '原料',
      value: '29',
      key: '29',
      children: [
        {
          title: '大米',
          value: '21',
          key: '21'
        },
        {
          title: '土豆',
          value: '22',
          key: '22'
        },
        {
          title: '菠萝',
          value: '23',
          key: '23'
        }
      ]
    },
    {
      title: '玩具',
      value: '39',
      key: '39',
      children: [
        {
          title: '金铲铲的冠冕',
          value: '31',
          key: '31'
        },
        {
          title: '残暴之力',
          value: '32',
          key: '32'
        },
        {
          title: '末日寒冬',
          value: '33',
          key: '33'
        }
      ]
    },
    {
      title: '蔬菜',
      value: '4',
      key: '4'
    }
  ]
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
  const onChange = (e: moment.MomentInput) => {
    const arr = moment(e).format('YYYY-MM-DD')
    console.log(moment(arr).valueOf())
    settime(moment(arr).valueOf())
  }
  return (
    <div>
      <Modal
        width={700}
        title={'新增加班'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
      >
        <Form
          form={form}
          name="basic"
          {...layout}
          // initialValues={}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="加班班组"
            name="teamIds"
            rules={[{ required: true, message: '请选择加班班组!' }]}
          >
            <TreeSelect {...tProps} />
          </Form.Item>
          <Form.Item
            label="加班日期"
            name="date"
            rules={[{ required: true, message: '请选择加班日期!' }]}
          >
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="工作时间"
            name="timeList"
            rules={[{ required: true, message: '请选择工作时间!' }]}
          >
            <WorkingHours time={time} onChange={undefined} />
          </Form.Item>

          <Form.Item label="备注" name="remark">
            <Input maxLength={100} placeholder="请输入备注" />
          </Form.Item>
          <Form.Item label="创建人" name="createBy">
            <Input disabled={true} maxLength={100} placeholder="请输入创建人" />
          </Form.Item>
          <Form.Item label="创建时间" name="createTime">
            <Input disabled={true} maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Popup
