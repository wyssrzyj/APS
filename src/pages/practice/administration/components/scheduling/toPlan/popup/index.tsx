import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select
} from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { commonState, dockingData } from '@/recoil'
import { dockingDataApis, practice } from '@/recoil/apis'
function Popup(props: { content: any }) {
  const { content } = props
  const {
    editWindow,
    setEditWindow,
    editWindowList,
    editSubmission,
    formData
  } = content
  const { Option } = Select
  const { workshopList, teamList } = dockingDataApis
  const [form] = Form.useForm()
  const [list, setList] = useState<any>()
  const [type, setType] = useState<any>()

  const [factoryName, setFactoryName] = useState<any>([])
  const [teamName, setTeamName] = useState<any>([])
  useEffect(() => {
    if (formData) {
      dataAcquisition(formData)
    }
  }, [formData])
  const dataAcquisition = async (e: any) => {
    const res = await workshopList({ factoryId: e })
    if (res) {
      res.map((item: { name: any; shopName: any }) => {
        item.name = item.shopName
      })
      setFactoryName(res)
    }

    const team = await teamList({ factoryId: e })
    if (team) {
      team.map((item: { name: any; teamName: any }) => {
        item.name = item.teamName
      })
      setTeamName(team)
    }
  }
  useEffect(() => {
    if (!isEmpty(editWindowList)) {
      setList(editWindowList)
    }
  }, [editWindowList])
  useEffect(() => {
    if (!isEmpty(list)) {
      list.planEndTime = moment(list.planEndTime)
      list.planStartTime = moment(list.planStartTime)
      list.remaining = list.productionAmount - list.completedAmount
      setType(list.isLocked)
      form.setFieldsValue(list)
    }
  }, [list])

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 18
    }
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    form.resetFields()
    setEditWindow(false)
  }

  const onFinish = async (values: any) => {
    values.planEndTime = moment(values.planEndTime).valueOf()
    values.planStartTime = moment(values.planStartTime).valueOf()
    values.isLocked = type === false ? 0 : 1
    // const res = await editingTasks({ ...values, id: list.id })
    form.resetFields()
    editSubmission()
  }
  //所属工段
  const section = [
    { name: '前段', id: 1 },
    { name: '后段', id: 2 },
    { name: 'ul设计', id: 3 },
    { name: '产品经理', id: 4 }
  ]
  //车间名称
  const workshop = factoryName
  //班组
  const factory = teamName

  let timeout: NodeJS.Timeout
  const onChange = (e: any) => {
    clearTimeout(timeout)
    const arr = cloneDeep(list)
    arr.completedAmount = e
    timeout = setTimeout(() => {
      console.log('完成量', arr.completedAmount)
      setList(arr)
    }, 500)
  }
  function onCheckbox(e: { target: { checked: any } }) {
    setType(e.target.checked)
  }
  return (
    <div>
      <Modal
        width={800}
        title={'编辑'}
        visible={editWindow}
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
          <Row>
            <Col span={12}>
              <Form.Item label="生产单号" name="externalProduceOrderNum">
                <Input
                  maxLength={100}
                  placeholder="请输入生产单号"
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="产品款号" name="sale">
                <Input
                  maxLength={100}
                  placeholder="请输入销售单号"
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="产品名称" name="">
                <Input
                  maxLength={100}
                  placeholder="请输入产品名称"
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="生产单总量" name="completedAmount">
                <Input
                  maxLength={100}
                  placeholder="请输入生产单"
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="所属工段" name="section">
                <Select defaultValue="请选择所属工段" disabled={true}>
                  {section.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="工厂名称" name="factoryName">
                <Input
                  maxLength={100}
                  placeholder="请输入工厂名称"
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="车间名称"
                name="shopName"
                rules={[{ required: true, message: '请输入工作班组' }]}
              >
                <Select placeholder="请选择所属工段">
                  {workshop.map((item: any) => (
                    // eslint-disable-next-line react/jsx-key
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="工作班组"
                name="factory"
                rules={[{ required: true, message: '请输入工作班组' }]}
              >
                <Select placeholder="请选择工作班组">
                  {factory.map((item: any) => (
                    // eslint-disable-next-line react/jsx-key

                    // eslint-disable-next-line react/jsx-key
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="生产量" name="productionAmount">
                <Input
                  maxLength={100}
                  placeholder="请输入生产量"
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="完成量" name="completedAmount">
                <InputNumber
                  min={0}
                  // defaultValue={3}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="计划开始时间"
                name="planStartTime"
                rules={[{ required: true, message: '请选择计划开始时间' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  // disabledDate={disabledDate}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="计划结束时间"
                name="planEndTime"
                rules={[{ required: true, message: '请选择计划结束时间' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  // disabledDate={disabledDate}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="剩余量" name="remaining">
                <Input
                  maxLength={100}
                  placeholder="请输入生产量"
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="锁定任务" name="isLocked">
                <Checkbox checked={type} onChange={onCheckbox} />
                {/* <Checkbox /> */}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default Popup
