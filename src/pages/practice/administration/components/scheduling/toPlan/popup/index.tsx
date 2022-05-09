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
import { dockingDataApis, schedulingApis } from '@/recoil/apis'
function Popup(props: { content: any }) {
  const { content } = props
  const {
    editWindow,
    setEditWindow,
    editWindowList,
    editSubmission,
    formData,
    factoryName,
    teamName
  } = content
  const { Option } = Select
  const { getIndividualDetails, factoryList, editingTasks } = schedulingApis
  const [form] = Form.useForm()
  const [list, setList] = useState<any>()
  const [type, setType] = useState<any>()
  const [largestNumber, setLargestNumber] = useState<any>(0)

  const [factoryData, setFactoryData] = useState<any>([])

  const map = new Map()
  map.set('1', '裁剪工段')
  map.set('2', '缝制工段')
  map.set('3', '后整工段')
  map.set('4', '包装工段')
  map.set('5', '外发工段')
  map.set('6', '缝制线外组')
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 18
    }
  }

  //工厂数据
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

  useEffect(() => {
    console.log('是否更新')

    if (!isEmpty(editWindowList)) {
      interfaceData(editWindowList.id)
      setList(editWindowList)
    }
  }, [editWindowList])
  const interfaceData = async (id: any) => {
    const arr = await getIndividualDetails({ id })
    setList(arr)
  }
  useEffect(() => {
    if (!isEmpty(list)) {
      list.planStartTime =
        list.planStartTime === null ? null : moment(list.planStartTime)

      list.planEndTime =
        list.planEndTime === null ? null : moment(list.planEndTime)

      list.section = map.get(list.section)
      list.factoryName = formData
      setLargestNumber(list.productionAmount)

      list.remaining = list.productionAmount - list.completedAmount
      setType(list.isLocked)
      form.setFieldsValue(list)
    }
  }, [list])

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
    values.id = editWindowList.id
    delete values.section
    const res = await editingTasks(values)
    form.resetFields()
    editSubmission()
  }
  let timeout: NodeJS.Timeout
  const onChange = (e: any) => {
    clearTimeout(timeout)
    const arr = cloneDeep(list)
    arr.completedAmount = e
    timeout = setTimeout(() => {
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
              <Form.Item label="产品款号" name="productNum">
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
              <Form.Item label="产品名称" name="productName">
                <Input
                  maxLength={100}
                  placeholder="请输入产品名称"
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="生产单总量" name="orderSum">
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
                <Input
                  maxLength={100}
                  placeholder="请输入销售单号"
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="工厂名称" name="factoryName">
                <Select
                  allowClear
                  disabled={true}
                  // defaultValue={theDefault.deptName}
                  // onChange={handleChange}
                >
                  {factoryData.map(
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
                  )}
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
                  max={largestNumber}
                  // defaultValue={3}
                  onChange={onChange}
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
                  {factoryName.map((item: any) => (
                    // eslint-disable-next-line react/jsx-key
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="班组名称"
                name="teamName"
                rules={[{ required: true, message: '请输入工作班组' }]}
              >
                <Select placeholder="请选择工作班组">
                  {teamName.map((item: any) => (
                    // eslint-disable-next-line react/jsx-key
                    // eslint-disable-next-line react/jsx-key
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
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
                  // disabledDate={disabledDate}.
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
                  // disabledDate={disabledDate}.
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
