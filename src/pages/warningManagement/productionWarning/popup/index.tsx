import {
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  TreeSelect
} from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { dockingDataApis, workOvertimeApis } from '@/recoil/apis'

import WorkingHours from './workingHours/index'
function Popup(props: { content: any; factoryId: any }) {
  const { content, factoryId } = props
  const type = 1
  const { newlyAdded, update, edit, formData } = content

  const layout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 13
    }
  }
  const { teamList } = dockingDataApis
  const { overtimeAddition, teamId, factoryList } = workOvertimeApis
  const { SHOW_PARENT } = TreeSelect
  const { RangePicker } = DatePicker
  const { Option } = Select
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()

  const [list, setList] = useState<any>() //总数据
  const [factoryData, setFactoryData] = useState<any>([]) //工厂
  const [listID, setListID] = useState<any>() //工厂ID
  const [treeData, setTreeData] = useState<any>() //班组列表
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res: any = await factoryList()
    const arr: any = res.data
    if (res.code === 200) {
      arr.map((item: { name: any; deptName: any }) => {
        item.name = item.deptName
      })
      setFactoryData(arr)
    }
  }

  //班组
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
    const arr = { factoryId: formData, teamIds: [] }
    setList(arr)
  }, [formData])

  useEffect(() => {
    if (!isEmpty(list)) {
      form.setFieldsValue(list)
    }
  }, [list])

  useEffect(() => {
    if (formData) {
      if (type === 1) {
        form.resetFields()
      }
      setListID(formData)
    }
  }, [formData, type])

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    // form.resetFields()
    update()
  }
  const times = (item: any, e: any) => {
    if (typeof e === 'number') {
      //更新的时候 变成 时间戳了 重新处理一下
      e = moment(e).format('YYYY-MM-DD HH:mm').substring(10)
    }
    const timeStamp = item.concat(e)
    return moment(timeStamp).valueOf()
  }

  //时间问题的提示
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
  // 处理接口报错时间清空问题

  const onOk = async (values: any, type: number) => {
    //时间的处理.
    if (values.date) {
      const arr = moment(values.date).format('YYYY-MM-DD')
      values.date = arr
    }
    //工作时间
    if (!isEmpty(values.timeList)) {
      values.timeList.map((item: any) => {
        item.startDateTime = times(values.date, item.startDateTime)
        item.endDateTime = times(values.date, item.endDateTime)
      })
    }
    if (values.createTime) {
      values.createTime = moment(values.createTime).valueOf()
    }

    values.waringId = factoryId
    if (determineTime(values.timeList)) {
      const list: any = type === 1 ? values : { ...values, id: edit.id }
      //班组为false才执行
      const arr: any = await teamId({
        teamIds: values.teamIds,
        timeList: list.timeList
      })
      if (arr.success === true) {
        const res = await overtimeAddition(list)
        if (res === true) {
          update()
          message.success('新增成功')
        }
      }
    }
  }

  const onFinish = async (values: any) => {
    if (type === 1) {
      onOk(values, 1)
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
  //工厂
  const getFactoryName = (e: any) => {
    list.factoryId = e
    const cloneList = cloneDeep(list)
    setListID(e)
    cloneList.teamIds = []
    setList({ ...cloneList })
  }
  return (
    <div>
      <Modal
        destroyOnClose={true}
        width={700}
        title={type === 1 ? '新增加班' : type === 2 ? '编辑加班' : '查看加班'}
        visible={newlyAdded}
        onOk={handleOk}
        maskClosable={false}
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
            <TreeSelect {...tProps} />
          </Form.Item>
          <Form.Item
            label="加班日期"
            name="date"
            rules={[{ required: true, message: '请先选择加班日期!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="工作时间"
            name="timeList"
            rules={[{ required: true, message: '请选择工作时间!' }]}
          >
            <WorkingHours />
          </Form.Item>

          <Form.Item label="备注" name="remark">
            <Input maxLength={100} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Popup
