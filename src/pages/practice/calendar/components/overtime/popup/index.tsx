import { DatePicker, Form, Input, Modal, Select, TreeSelect } from 'antd'
import { isElement, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { dockingDataApis, practice } from '@/recoil/apis'

import WorkingHours from './workingHours/index'
function Popup(props: { content: any; newlyAdded: any }) {
  const { content, newlyAdded } = props
  const { isModalVisible, setIsModalVisible, type, edit, factoryData } = content
  const { teamList } = dockingDataApis
  const { overtimeAddition, teamId, factoryList } = practice
  const { SHOW_PARENT } = TreeSelect
  const { RangePicker } = DatePicker
  const { Option } = Select
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const [time, settime] = useState<any>()
  const [listID, setListID] = useState<any>() //工厂ID
  const [treeData, setTreeData] = useState<any>() //班组列表

  //加班班组
  useEffect(() => {
    if (!isEmpty(listID)) {
      dataDictionary(listID)
    }
  }, [listID])
  const dataDictionary = async (e: any) => {
    const teamData = await teamList({ factoryId: e }) //班组列表
    teamData.map(
      (item: { title: any; teamName: any; value: any; id: any; key: any }) => {
        item.title = item.teamName
        item.value = item.id
        item.key = item.id
      }
    )
    setTreeData(teamData)
  }

  useEffect(() => {
    if (type !== 1) {
      // endDate
      edit.date = moment(edit.timeList[0].endDate)
      form.setFieldsValue(edit) //回显.
    }
    if (type === 1) {
      form.resetFields()
    }
  }, [edit, type])

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

    //时间的处理
    if (values.date) {
      const arr = moment(values.date).format('YYYY-MM-DD')
      values.date = moment(arr).valueOf()
    }
    if (values.createTime) {
      values.createTime = moment(values.createTime).valueOf()
    }
    const list = type === 1 ? values : { ...values, id: edit.id }
    //班组为false才执行
    const arr: any = await teamId({ idList: values.teamIds })

    if (arr.success === true) {
      console.log('/班组为false才执行', list)

      const res = await overtimeAddition(list)
      if (res === true) {
        newlyAdded()
        form.resetFields()
        setIsModalVisible(false)
      }
    }
  }
  const onFinish = async (values: any) => {
    if (type === 1) {
      onOk(values, 1)
    }
    if (type === 2) {
      onOk(values, 2)
    }
  }
  const tProps = {
    treeData,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请先选择工厂名称',
    style: {
      width: '100%'
    }
  }
  const onChange = (e: moment.MomentInput) => {
    const arr = moment(e).format('YYYY-MM-DD')
    console.log(moment(arr).valueOf())
    settime(moment(arr).valueOf())
  }
  const getFactoryName = (e: any) => {
    setListID(e)
  }
  return (
    <div>
      <Modal
        width={700}
        title={type === 1 ? '新增加班' : type === 2 ? '编辑加班' : '查看加班'}
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
            label="工厂名称"
            name="factoryId"
            rules={[{ required: true, message: '请选择工厂名称!' }]}
          >
            <Select
              onChange={getFactoryName}
              placeholder="请选择工厂名称"
              allowClear
            >
              {factoryData !== undefined
                ? factoryData.map(
                    (item: {
                      id: React.Key | null | undefined
                      name:
                        | boolean
                        | React.ReactChild
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined
                    }) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  )
                : null}
            </Select>
          </Form.Item>
          <Form.Item
            label="班组名称"
            name="teamIds"
            rules={[{ required: true, message: '请先选择班组名称!' }]}
          >
            <TreeSelect {...tProps} disabled={type === 3 ? true : false} />
          </Form.Item>
          <Form.Item
            label="加班日期"
            name="date"
            rules={[{ required: true, message: '请先选择加班日期!' }]}
          >
            <DatePicker
              onChange={onChange}
              disabled={type === 3 ? true : false}
            />
          </Form.Item>
          <Form.Item
            label="工作时间"
            name="timeList"
            rules={[{ required: true, message: '请选择工作时间!' }]}
          >
            <WorkingHours time={time} edit={edit} type={type} />
          </Form.Item>

          <Form.Item label="备注" name="remark">
            <Input
              disabled={type === 3 ? true : false}
              maxLength={100}
              placeholder="请输入备注"
            />
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
