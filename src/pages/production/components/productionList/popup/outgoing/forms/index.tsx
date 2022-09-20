import { Col, Form, Input, Row, Select, TreeSelect } from 'antd'
import { cloneDeep, debounce, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { getChild } from '@/components/getChild/index'
import { dockingData } from '@/recoil'
import { dockingDataApis } from '@/recoil/apis'

const HeaderForm = (props: { FormData: any }) => {
  const { FormData } = props
  const { sectionLists } = dockingDataApis
  const { Option } = Select
  const searchConfigs = useRecoilValue(dockingData.searchConfigs)

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    }
  }

  const { SHOW_PARENT } = TreeSelect

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { validateFields } = form
  const [list, setList] = useState<any>({}) //总数据

  useEffect(() => {
    if (!isEmpty(list)) {
      form.setFieldsValue(list)
    }
  }, [list])

  const handleSubmit = debounce(async () => {
    const values = await validateFields()
    FormData && FormData(values)
  }, 500)

  const getValueFromEvent = (event: any, type = 'text') => {
    setTimeout(async () => {
      await handleSubmit()
    })
    if (type === 'input') {
      return event.target.value
    }
    if (type === 'treeSelect') {
      return event
    }
    if (type === 'select') {
      return event
    }
  }

  return (
    <div>
      <Form form={form}>
        <Row>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="processName"
              label="工序名称"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'input')
              }
            >
              <Input placeholder="请输入工序名称" allowClear />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              {...layout}
              name="section"
              label="所属工段"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'treeSelect')
              }
            >
              <Select placeholder="请选择所属工段" allowClear>
                {searchConfigs.map((item: any) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default HeaderForm
