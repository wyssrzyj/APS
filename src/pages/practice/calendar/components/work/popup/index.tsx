import { Checkbox, Form, Input, message, Modal, TreeSelect } from 'antd'
import { useEffect } from 'react'

import { getChild } from '@/components/getChild/index'
import { practice } from '@/recoil/apis'

import WorkingHours from './workingHours/index'
function Popup(props: { content: any; newlyAdded: any }) {
  const { content, newlyAdded } = props
  const { isModalVisible, setIsModalVisible, type, treeData, edit } = content
  const { SHOW_PARENT } = TreeSelect
  const [form] = Form.useForm()

  const { operatingModeDetails, teamId } = practice
  //回显
  useEffect(() => {
    if (type !== 1) {
      form.setFieldsValue(edit) //回显
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
  const onOk = async (
    values: {
      teamIds: any[]
      weeks: any[]
      times: any
      workModes: { week: any; dayTimeList: any }[]
    },
    type: number
  ) => {
    //编辑
    values.teamIds = getChild(values.teamIds, treeData) //下拉多选的处理
    // 合并
    const lyj: { week: any; dayTimeList: any }[] = []
    values.weeks.map((item: any, index: any) => {
      return lyj.push({ week: item, dayTimeList: values.times })
    })
    values.workModes = lyj
    const list = type === 1 ? values : { ...values, id: edit.id }
    //班组为false才执行
    const arr: any = await teamId({ idList: values.teamIds })

    if (arr.success === true) {
      const res = await operatingModeDetails(list)
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
            <WorkingHours edit={edit} type={type} onChange={undefined} />
          </Form.Item>
          <Form.Item
            label="工作班组"
            name="teamIds"
            rules={[{ required: true, message: '请选择工作班组!' }]}
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
