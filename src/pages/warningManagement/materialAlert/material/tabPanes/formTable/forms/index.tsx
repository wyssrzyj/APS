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
  data: []
}) => {
  const { FormData, factoryData, type, updateSection, data } = props
  const { sectionList } = materialSetApis

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { validateFields } = form
  const { Option } = Select

  const [workshop, setWorkshop] = useState<any>()
  const [selected, setSelected] = useState<any>() //选中
  const [timesType, setTimesType] = useState<any>(false)

  useEffect(() => {
    setWorkshop(factoryData)
    console.log(
      '🚀 ~ file: index.tsx ~ line 39 ~ useEffect ~ factoryData',
      factoryData
    )
  }, [factoryData])
  useEffect(() => {
    setTimesType(type)
  }, [type])
  useEffect(() => {
    if (!isEmpty(data)) {
      setTimesType(false)
    } else {
      setTimesType(true)
    }
  }, [data])

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
      console.log(current)

      if (current.value !== null && current.value !== undefined) {
        form.setFieldsValue({
          productNum: moment(Number(current.value))
        })
      } else {
        form.setFieldsValue({
          productNum: undefined
        })
      }
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
      current.value = e !== null ? moment(e).valueOf() : undefined
      current.allReadyTime = e !== null ? moment(e).valueOf() : undefined
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
                disabled={true}
                allowClear={true}
                onChange={getFactoryName}
                placeholder="请选择所属工段"
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
                disabled={true}
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
