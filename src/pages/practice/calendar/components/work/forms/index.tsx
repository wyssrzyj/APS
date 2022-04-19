import { Col, Form, Input, Row, Select, TreeSelect } from 'antd'
import { debounce, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { getChild } from '@/components/getChild/index'
import { dockingDataApis, practice } from '@/recoil/apis'

const HeaderForm = (props: { FormData: any }) => {
  const { FormData } = props

  const { operatingModeDetails, teamId, factoryList } = practice
  const { teamList } = dockingDataApis
  const { Option } = Select

  const layout = {
    labelCol: {
      span: 7
    },
    wrapperCol: {
      span: 24
    }
  }

  const { SHOW_PARENT } = TreeSelect

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { validateFields } = form
  const [list, setList] = useState<any>([]) //工厂
  const [listID, setListID] = useState<any>() //工厂ID
  const [treeData, setTreeData] = useState<any>() //班组列表

  //工厂名称
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
      setList(arr)
    }
  }
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
  const tProps = {
    treeData,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择工作班组',
    style: {
      width: '100%'
    }
  }
  const getFactoryName = (e: any) => {
    setListID(e)
  }
  return (
    <div>
      <Form form={form}>
        <Row>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="workModeNames"
              label="工作模式"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'select')
              }
            >
              <Select onChange={getFactoryName} placeholder="请选择工厂名称">
                {list.map(
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
          <Col span={6}>
            <Form.Item
              {...layout}
              name="workModeName"
              label="工作模式"
              getValueFromEvent={(event: InputEvent) =>
                getValueFromEvent(event, 'input')
              }
            >
              <Input placeholder="请输入工作模式" allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="teams"
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
