import { Col, DatePicker, Form, Input, Row, Select } from 'antd'
import { debounce, isEmpty } from 'lodash' //防抖
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { materialSetApis } from '@/recoil/apis'

const { RangePicker } = DatePicker
const layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 10
  }
}

const HeaderForm = (props: {
  FormData: any
  factoryData: any
  type: boolean
}) => {
  const { FormData, factoryData, type } = props
  const { sectionList } = materialSetApis

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { validateFields } = form
  const { Option } = Select

  const [workshop, setWorkshop] = useState<any>()

  useEffect(() => {
    setWorkshop(factoryData)
  }, [factoryData])

  const handleSubmit = debounce(async () => {
    const values = await validateFields()
    //处理时间格式
    const timeFormat = { ...values, ...values.planEndDate }
    FormData && FormData(timeFormat)
  }, 500)

  const getValueFromEvent = (event: any, type = 'text') => {
    setTimeout(async () => {
      await handleSubmit()
    })
    if (type === 'input') {
      return event.target.value
    }
    if (type === 'picker') {
      if (event !== null) {
        event.startPlanEndDate = moment(event[0]).valueOf()
        event.endPlanEndDate = moment(event[1]).valueOf()
        return event
      } else {
        return null
      }
    }
    if (type === 'select') {
      console.log(event)

      return event
    }

    return event
  }
  const getFactoryName = (e: any) => {
    // setListID(e)
  }
  return (
    <div>
      <Form form={form}>
        <Row>
          <Col span={8}>
            <Form.Item
              {...layout}
              name="factoryId"
              label="所属工段"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'select')
              }
            >
              <Select
                disabled={type}
                allowClear={true}
                onChange={getFactoryName}
                placeholder="请选择工厂名称"
              >
                {workshop != undefined
                  ? workshop.map(
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
          </Col>
          <Col span={13}>
            <Form.Item {...layout} name="productNum" label="工段物料齐套日期">
              <Input allowClear disabled={true} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default HeaderForm
