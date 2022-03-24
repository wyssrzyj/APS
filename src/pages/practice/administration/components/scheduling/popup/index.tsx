import { Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
function Popup(props: { content: any }) {
  const { content } = props
  const { isModalVisible, setIsModalVisible } = content
  const { Option } = Select

  const [form] = Form.useForm()
  useEffect(() => {
    form.resetFields()
  }, [])

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
    setIsModalVisible(false)
  }

  const onFinish = (values: any) => {
    values.startTime = moment(values.startTime).valueOf()
    values.endTime = moment(values.startTime).valueOf()
    console.log('Success:', values)
    form.resetFields()
    setIsModalVisible(false)
  }
  //所属工段
  const section = [
    { name: '前段', id: 1 },
    { name: '后段', id: 2 },
    { name: 'ul设计', id: 3 },
    { name: '产品经理', id: 4 }
  ]
  //工厂名称
  const factory = [
    { name: '糯软甜甜酱', id: 1 },
    { name: '甜糯软软酱', id: 2 },
    { name: '软甜糯糯酱', id: 3 },
    { name: '糯甜软软酱', id: 4 }
  ]
  //车间名称
  const workshop = [
    { name: '老头乐制造车间', id: 1 },
    { name: '梅赛德斯塔寨村分厂', id: 2 },
    { name: '哪吒汽车制造中心', id: 3 },
    { name: '保时捷车漆原材料制造中心', id: 4 }
  ]
  // function disabledDate(current) {
  //   return current && current < moment().endOf('day')
  // }
  return (
    <div>
      <Modal
        width={800}
        title={'编辑'}
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
          <Row>
            <Col span={12}>
              <Form.Item label="生产单号" name="productionOrder">
                <Input maxLength={100} placeholder="请输入生产单号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="销售单号" name="sale">
                <Input maxLength={100} placeholder="请输入销售单号" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="产品名称" name="holiday">
                <Input maxLength={100} placeholder="请输入产品名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="生产单总量" name="productionOrderYear">
                <Input maxLength={100} placeholder="请输入生产单" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="工序名称" name="processName">
                <Input maxLength={100} placeholder="请输入工序名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="工序编号" name="operationNumber">
                <Input maxLength={100} placeholder="请输入工序编号" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="所属工段" name="section">
                <Select defaultValue="请选择所属工段">
                  {section.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="工厂名称" name="factory">
                <Select defaultValue="请选择工厂名称">
                  {factory.map((item) => (
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
              <Form.Item
                label="车间名称"
                name="workshopName"
                rules={[{ required: true, message: '请选择车间名称' }]}
              >
                <Select defaultValue="请选择车间名称">
                  {workshop.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="工作班组"
                name="workTeam"
                rules={[{ required: true, message: '请输入工作班组' }]}
              >
                <Input maxLength={100} placeholder="请输入工作班组" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="计划开始时间"
                name="startTime"
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
                name="endTime"
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
              <Form.Item
                label="生产量"
                name="yield"
                rules={[{ required: true, message: '请输入生产量' }]}
              >
                <Input maxLength={100} placeholder="请输入生产量" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default Popup
