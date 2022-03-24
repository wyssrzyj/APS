import { Form, Modal, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'

import Forms from './forms/index'
import styles from './index.module.less'
import Outgoing from './outgoing/index'
import Tables from './tables/index'

function Popup(props: { content: any }) {
  const { content } = props
  const {
    isModalVisible,
    setIsModalVisible,
    types,
    getDetailsId,
    externalProduceOrderId
  } = content

  const { workingProcedure } = practice

  const { TabPane } = Tabs
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const [list, setList] = useState<any>()
  const [formData, setFormData] = useState<any>()
  const defaultPageSize = 10
  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize,
    productId: getDetailsId
  })

  useEffect(() => {
    // setlist(data)
    // getFormData(data[0].id) //初始化获取第一条数据

    if (getDetailsId !== undefined) {
      setParams({ ...params, productId: getDetailsId })
    }
  }, [getDetailsId])

  useEffect(() => {
    if (params.productId !== undefined) {
      getDetails(params)
    }
  }, [params])
  const getDetails = async (params: any) => {
    const res: any = await workingProcedure(params)

    setList(res.records)
    getFormData(res.records[0]) //初始化获取第一条数据
  }

  useEffect(() => {
    form.resetFields()
  }, [])

  const getFormData = (value) => {
    console.log('form的数据', value)
    setFormData(value)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <Modal
        width={1000}
        // title={type ? '新增加班' : '编辑加班'}
        visible={isModalVisible}
        onOk={handleOk}
        okText="保存"
        onCancel={handleCancel}
        // footer={[<Button onClick={equipmentHandleCancel}>取消</Button>]}
        centered={true}
      >
        <Tabs type="card">
          <TabPane tab="工艺路线" key="1">
            <Tables list={list} getFormData={getFormData} types={types} />
            <div className={styles.forms}>
              <Forms formData={formData} types={types}></Forms>
            </div>
          </TabPane>
          <TabPane tab="外发管理" key="2">
            <Outgoing
              types={types}
              externalProduceOrderId={externalProduceOrderId}
            />
          </TabPane>
        </Tabs>
        ,
      </Modal>
    </div>
  )
}

export default Popup
