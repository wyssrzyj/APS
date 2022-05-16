import { Checkbox, Form, Input, message, Modal, Select, TreeSelect } from 'antd'
import { isElement, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'

import { getChild } from '@/components/getChild/index'
import { dockingDataApis, workingModeApis } from '@/recoil/apis'

import WorkingHours from './workingHours/index'
function Popup(props: { content: any; newlyAdded: any }) {
  const { content, newlyAdded } = props
  const { isModalVisible, setIsModalVisible, type, edit, factoryData } = content
  const { SHOW_PARENT } = TreeSelect
  const [form] = Form.useForm()
  const { Option } = Select
  const { teamList } = dockingDataApis
  const { operatingModeDetails, teamId } = workingModeApis
  const [listID, setListID] = useState<any>() //工厂ID
  const [treeData, setTreeData] = useState<any>() //班组列表

  //加班班组
  useEffect(() => {
    if (listID !== undefined) {
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
  //回显
  useEffect(() => {
    if (type !== 1) {
      form.setFieldsValue(edit) //回显
      setListID(edit.factoryId)
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
  const plainOptions = [
    { label: '周一', value: 1 },
    { label: '周二', value: 2 },
    { label: '周三', value: 3 },
    { label: '周四', value: 4 },
    { label: '周五', value: 5 },
    { label: '周六', value: 6 },
    { label: '周日', value: 7 }
  ]

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const determineTime = (e) => {
    if (!isEmpty(e)) {
      //开始不能大于结束 且 不能相等
      const type = e.every((item: any) => {
        return (
          item.startDateTime < item.endDateTime &&
          item.startDateTime !== item.endDateTime
        )
      })
      if (type) {
        return true
      } else {
        message.warning('开始不能大于结束，且不能相等')
        return false
      }
    } else {
      return false
    }
  }
  const onOk = async (
    values: {
      teamIds: any[]
      weeks: any[]
      times: any
      workModes: { week: any; dayTimeList: any }[]
    },
    type: number
  ) => {
    // 合并
    const lyj: { week: any; dayTimeList: any }[] = []
    values.weeks.map((item: any, index: any) => {
      return lyj.push({ week: item, dayTimeList: values.times })
    })
    values.workModes = lyj

    if (determineTime(values.workModes[0].dayTimeList)) {
      const list = type === 1 ? values : { ...values, id: edit.id }
      //班组为false才执行
      const arr: any = await teamId({
        teamIds: values.teamIds,
        workModes: list.workModes
      })
      if (arr.success === true) {
        const res = await operatingModeDetails(list)
        if (res === true) {
          newlyAdded()
          form.resetFields()
          setIsModalVisible(false)
        }
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
    value: value,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择工作班组',
    style: {
      width: '100%'
    }
  }
  const getFactoryName = (e: any) => {
    setListID(e)
  }
  return (
    <div>
      <Modal
        width={700}
        destroyOnClose={true}
        maskClosable={false}
        title={
          type === 1
            ? '新增工作模式'
            : type === 2
            ? '编辑工作模式'
            : '查看工作模式'
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="工作模式"
            name="name"
            rules={[{ required: true, message: '请输入工作模式!' }]}
          >
            <Input
              maxLength={100}
              placeholder="请输入工作模式"
              disabled={type === 3 ? true : false}
            />
          </Form.Item>
          <Form.Item
            label="工作日"
            name="weeks"
            rules={[{ required: true, message: '请选择工作日!' }]}
          >
            <Checkbox.Group
              disabled={type === 3 ? true : false}
              options={plainOptions}
              // defaultValue={['Apple']}
            />
          </Form.Item>
          <Form.Item
            label="工作时间"
            name="times"
            rules={[{ required: true, message: '请选择工作时间!' }]}
          >
            <WorkingHours edit={edit} type={type} />
          </Form.Item>
          <Form.Item
            label="工厂名称"
            name="factoryId"
            rules={[{ required: true, message: '请选择工厂名称!' }]}
          >
            <Select
              disabled={type === 3 ? true : false}
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
            rules={[{ required: true, message: '请选择班组名称!' }]}
          >
            <TreeSelect disabled={type === 3 ? true : false} {...tProps} />
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
