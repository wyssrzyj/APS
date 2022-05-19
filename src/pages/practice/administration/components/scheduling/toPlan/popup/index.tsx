import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select
} from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { dockingDataApis, schedulingApis } from '@/recoil/apis'
function Popup(props: { content: any }) {
  const { content } = props
  const {
    editWindow,
    setEditWindow,
    editWindowList,
    editSubmission,
    formData,
    factoryName
  } = content
  const { Option } = Select
  const {
    getIndividualDetails,
    factoryList,
    editingTasks,
    calculateCompletionTime
  } = schedulingApis
  const { teamList } = dockingDataApis

  const [form] = Form.useForm()
  const [list, setList] = useState<any>() //总数据
  const [type, setType] = useState<any>()
  const [largestNumber, setLargestNumber] = useState<any>(0)

  const [factoryData, setFactoryData] = useState<any>([])
  const [shopName, setShopName] = useState<any>() ///车间名称
  const [teamName, setTeamName] = useState<any>([]) ///班组
  const [endTimeData, setEndTimeData] = useState<any>() //接口算的结束时间
  const [sectionType, setSectionType] = useState<any>(true) //外发 车间、班组非必填

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
  // 选择车间 获取班组数据.
  useEffect(() => {
    workshopTeam(shopName)
  }, [shopName])
  const workshopTeam = async (e: any) => {
    const team = await teamList({ shopMannagerId: e })
    if (team) {
      team.map((item: any) => {
        item.name = item.teamName
        item.key = item.id
      })
      setTeamName(team)
    }
  }

  useEffect(() => {
    if (!isEmpty(editWindowList)) {
      //外发车间班组不是必填
      if (editWindowList.section === '5') {
        setSectionType(false)
      } else {
        setSectionType(true)
      }

      const cloneList = cloneDeep(editWindowList)

      interfaceData(cloneList.id)
    }
  }, [editWindowList])
  //获取数据
  const interfaceData = async (id: any) => {
    const arr = await getIndividualDetails({ id })

    setShopName(arr.shopId)
    //所属工段
    arr.sectionDome = map.get(arr.section)

    setList(arr)
  }
  //渲染数据
  useEffect(() => {
    if (!isEmpty(list)) {
      list.planStartTime =
        list.planStartTime === null ? null : moment(list.planStartTime)

      list.planEndTime =
        list.planEndTime === null ? null : moment(list.planEndTime)

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
  //获取名字
  const getName = (type, id) => {
    if (type === '1') {
      if (!isEmpty(factoryName)) {
        return factoryName.filter((item) => item.id === id)[0].name
      } else {
        return '防止报错页面消失'
      }
    }
    if (type === '2') {
      if (!isEmpty(teamName)) {
        return teamName.filter((item) => item.id === id)[0].name
      } else {
        return '防止报错页面消失'
      }
    }
  }

  const onFinish = async (values: any) => {
    values.planEndTime = moment(values.planEndTime).valueOf()
    values.planStartTime = moment(values.planStartTime).valueOf()

    values.isLocked = type === false ? 0 : 1
    // 当接口为0 手动减去 上次的
    //手动减去api
    if (endTimeData === undefined) {
      console.log('没有进行操作')

      values.additionalTime =
        values.planEndTime - moment(list.planEndTime).valueOf()
    } else {
      values.additionalTime = values.planEndTime - endTimeData
    }

    //外发不需要更改
    if (sectionType !== false) {
      values.shopName = getName('1', values.shopId)
      values.teamName = getName('2', values.teamId)
    }

    values.section = list.section
    //缝制不穿id
    if (values.section == '2') {
      values.id = null
    } else {
      values.id = editWindowList.id
    }
    console.log('保存的数据', values)
    if (values.planStartTime < values.planEndTime) {
      // 结束时间 手动-接口
      const res = await editingTasks(values)
      if (res) {
        form.resetFields()
        editSubmission()
        setEndTimeData(0) //接口算的结束时间清空
        message.success('保存成功')
      } else {
        message.error('保存失败')
      }
    } else {
      message.error('开始时间不能大于结束时间')
    }
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
  //获取结束时间
  const endTime = async (e) => {
    if (e) {
      const assignmentId = list.assignmentId
      const orderNum = list.productionAmount - list.completedAmount
      const startDate = moment(e).format('YYYY-MM-DD HH:mm:ss')
      const teamId = list.teamId //班组id
      const additionalTime = Number(list.additionalTime)
      const capacityId = list.templateId
      //算
      const arr = await calculateCompletionTime({
        assignmentId,
        orderNum,
        startDate,
        teamId,
        additionalTime,
        capacityId
      })
      if (arr.code === 200) {
        const cloneLis = cloneDeep(list)
        const time = moment(arr.data)
        // 用于保存
        console.log('接口算的值', moment(arr.data).valueOf())

        setEndTimeData(moment(arr.data).valueOf())
        // setEndTimeData(1653321600416)
        cloneLis.planStartTime = moment(e)
        cloneLis.planEndTime = time
        setList({ ...cloneLis })
      }
    }
  }
  //车间
  const handleChange = (value) => {
    const cloneList = cloneDeep(list)
    cloneList.shopId = value
    cloneList.teamId = null
    setTeamName([])

    setList({ ...cloneList })
    setShopName(value)
  }
  //班组
  const team = (e) => {
    const cloneList = cloneDeep(list)
    cloneList.teamId = e
    setList({ ...cloneList })
  }

  return (
    <div>
      <Modal
        // destroyOnClose={true}.
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
              <Form.Item label="所属工段" name="sectionDome">
                <Input
                  maxLength={100}
                  placeholder="请输入所属工段"
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
                name="shopId"
                rules={[{ required: sectionType, message: '请输入工作班组' }]}
              >
                <Select
                  allowClear
                  placeholder={sectionType ? '请选择所属工段' : ''}
                  onChange={handleChange}
                  disabled={!sectionType}
                >
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
                name="teamId"
                rules={[{ required: sectionType, message: '请输入工作班组' }]}
              >
                <Select
                  disabled={!sectionType}
                  allowClear
                  placeholder={sectionType ? '请选择工作班组' : ''}
                  onChange={team}
                >
                  {teamName.map((item: any) => (
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
                  format="YYYY-MM-DD HH:mm"
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  onChange={endTime}
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
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  format="YYYY-MM-DD HH:mm"
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
