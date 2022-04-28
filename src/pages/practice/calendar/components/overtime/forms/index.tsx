import { Col, Form, Row, Select, TreeSelect } from 'antd'
import { debounce, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { getChild } from '@/components/getChild/index'
import { dockingDataApis, practice } from '@/recoil/apis'

const HeaderForm = (props: { FormData: any; factoryData: any }) => {
  const { FormData, factoryData } = props
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { validateFields } = form
  const { teamList } = dockingDataApis
  const { factoryList } = practice
  const { SHOW_PARENT } = TreeSelect
  const { Option } = Select

  const layout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 24
    }
  }

  const [listID, setListID] = useState<any>() //工厂ID
  const [treeData, setTreeData] = useState<any>() //班组列表

  //加班班组
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

  const getFactoryName = (e: any) => {
    setListID(e)
  }

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
      // return getChild(event, treeData)
    }
    return event
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
  return (
    <div>
      <Form form={form}>
        <Row>
          <Col span={6}>
            <Form.Item
              {...layout}
              label="工厂名称"
              name="factoryId"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'treeSelect')
              }
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
          </Col>

          <Col span={6}>
            <Form.Item
              {...layout}
              name="teamId"
              label="班组名称"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'treeSelect')
              }
            >
              <TreeSelect {...tProps} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default HeaderForm
