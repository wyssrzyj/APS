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
  updateSection: any
}) => {
  const { FormData, factoryData, type, updateSection } = props
  const { sectionList } = materialSetApis

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { validateFields } = form
  const { Option } = Select

  const [workshop, setWorkshop] = useState<any>()
  const [selected, setSelected] = useState<any>() //选中

  useEffect(() => {
    setWorkshop(factoryData)
  }, [factoryData])

  const handleSubmit = debounce(async () => {
    const values = await validateFields()
    //处理时间格式
    const timeFormat = { ...values }
    FormData && FormData(timeFormat)
  }, 500)

  const getValueFromEvent = (event: any, type = 'text') => {
    setTimeout(async () => {
      await handleSubmit()
    })

    if (type === 'input') {
      return event.target.value
    }

    if (type === 'select') {
      return event
    }

    return event
  }
  //切换展示
  useEffect(() => {
    if (selected !== undefined) {
      const current = workshop.filter((v) => v.id === selected.key)[0]
      form.setFieldsValue({
        productNum: moment(Number(current.value))
      })
    } else {
      form.setFieldsValue({ productNum: null })
    }
  }, [workshop, selected])

  const getFactoryName = (_e: any, item) => {
    setSelected(item)
  }

  //更新
  const materialDateBottom = (e) => {
    if (selected !== undefined) {
      const current = workshop.filter((v) => v.id === selected.key)[0]
      current.value = moment(e).valueOf()
      const subscript = workshop.findIndex(
        (item: any) => item.id === current.id
      )
      if (subscript !== -1) {
        workshop.splice(subscript, 1, current)
        setWorkshop(workshop)
        updateSection && updateSection(workshop)
      }
    }
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
                  ? workshop.map((item: any) => (
                      <Option key={item.section} value={item.section}>
                        {item.name}
                      </Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
          </Col>
          <Col span={13}>
            <Form.Item {...layout} name="productNum" label="工段物料齐套日期">
              <DatePicker
                onChange={(e) => {
                  materialDateBottom(e)
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default HeaderForm
