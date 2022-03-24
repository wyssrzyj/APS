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
  const [list, setList] = useState<any>() //总数据
  const [data, setData] = useState<any>() //form的单个数据
  const [caseIds, setCaseIds] = useState<any>([]) //存放id
  const defaultPageSize = 10
  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize,
    productId: getDetailsId
  })
  useEffect(() => {
    console.log('测试存放id', caseIds)
  }, [caseIds])
  useEffect(() => {
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

  const getFormData = (value: any) => {
    const first = caseIds.indexOf(value.idx)
    //防止添加重复
    if (first === -1) {
      caseIds.push(value.idx)
    }
    setCaseIds([...caseIds])
    setData(value)
  }
  //过滤数据
  const filterData = (id: any, data: any) => {
    const treated = data.filter((item: any) => item.idx === id)
    return treated
  }
  // 处理数据
  const handle = (ids: any, data: any) => {
    const arr = ids.map((item: any) => {
      return filterData(item, data)
    })
    console.log('后台要的数据', arr.flat(Infinity))
  }

  const handleOk = () => {
    //工艺路线的保存逻辑处理
    handle(caseIds, list)
    // setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  //**底部form返回的数据
  const FormData = (e: any) => {
    console.log('当前数据', e.idx)

    const subscript = list.findIndex((item: any) => item.idx === e.idx)
    list.splice(subscript, 1, e) //处理后的数据
    setList([...list])
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
              <Forms
                FormData={FormData}
                list={list}
                data={data}
                types={types}
              ></Forms>
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
