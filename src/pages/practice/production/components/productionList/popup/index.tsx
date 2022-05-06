import { Form, message, Modal, Tabs } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'

import Forms from './forms/index'
import styles from './index.module.less'
import Outgoing from './outgoing/index'
import Tables from './tables/index'
const map = new Map()
map.set('1', '裁剪')
map.set('2', '缝制')
map.set('3', '后整')
map.set('4', '包装')
map.set('5', '外发')
map.set('6', '缝制线外组')

function Popup(props: { content: any }) {
  const { content } = props
  const {
    isModalVisible,
    setGetDetailsId,
    setIsModalVisible,
    types,
    getDetailsId,
    externalProduceOrderId
  } = content

  const { workingProcedure, popupPreservation } = practice

  const { TabPane } = Tabs
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()

  const [usedList, setUsedList] = useState<any>([]) //老数据
  const [list, setList] = useState<any>([]) //新数据
  const [data, setData] = useState<any>() //form的单个数据
  const [caseIds, setCaseIds] = useState<any>([]) //存放id
  const defaultPageSize = 10
  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize,
    externalProduceOrderId: getDetailsId
  })

  const [localData, setLocalData] = useState<any>([]) //工艺数据
  const [outgoing, setOutgoing] = useState<any>([]) //外发数据

  // useEffect(() => {
  //   if (!isEmpty(list)) {
  //     list.map((item) => {
  //       item.section = map.get(item.section)
  //     })
  //     console.log('处理后的数据', list)
  //   }
  // }, [list])
  useEffect(() => {
    if (getDetailsId !== undefined && getDetailsId !== null) {
      // console.log('是否法神改变', getDetailsId)
      setParams({ ...params, externalProduceOrderId: getDetailsId })
    }
  }, [getDetailsId])

  useEffect(() => {
    if (params.externalProduceOrderId !== undefined) {
      getDetails(params)
    }
  }, [params])

  const getDetails = async (params: any) => {
    const res: any = await workingProcedure(params)
    res.records.map((item) => {
      item.section = map.get(item.section)
    })
    setUsedList(res.records)
  }

  //判断本地是否有值 有的就重新处理
  useEffect(() => {
    if (!isEmpty(localData)) {
      localData.map((item: any) => {
        oldAndNewFilter(item, usedList)
      })
    } else {
      setList(usedList)
      getFormData(usedList[0])
    }
  }, [usedList, localData])

  //  **判断接口数据中  是否有本地数据  有则替换**
  const oldAndNewFilter = (v: any, total: any) => {
    const saveIndex = total.findIndex((item: any) => item.idx === v.idx)
    if (saveIndex !== -1) {
      total.splice(saveIndex, 1, v)
      setList([...total])
    }
  }

  //把数据传递给底部from
  const getFormData = (value: any) => {
    setCaseIds([...caseIds])

    setData(value)
  }
  //**底部form返回的数据
  const FormData = (e: any) => {
    localDataHandle(e)
  }
  // *** 判断本地数组是否有 有添加反之且替换**
  const localDataHandle = (data: any) => {
    // 单条数据
    const saveIndex = localData.findIndex((item: any) => item.idx === data.idx) //找下表
    if (saveIndex === -1) {
      setLocalData([...localData, data])
    } else {
      localData.splice(saveIndex, 1, data) //处理后的数据
      setLocalData([...localData])
    }
  }

  const handleOk = async () => {
    if (!types) {
      const arr = await popupPreservation({
        productId: getDetailsId,
        externalProduceOrderId: externalProduceOrderId,
        outsourceProcessDTOList: outgoing,
        processDTOList: localData
      })
      if (arr) {
        message.success('保存成功')
        handleCancel()
      }
    } else {
      handleCancel()
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setGetDetailsId(null)
  }
  const preservation = (e: any) => {
    setOutgoing(e)
  }

  const paging = (e: any, v: any) => {
    setParams({ pageNum: e, pageSize: v, productId: getDetailsId })
  }

  return (
    <div>
      <Modal
        width={1000}
        destroyOnClose={true}
        visible={isModalVisible}
        maskClosable={false}
        onOk={handleOk}
        okText={types ? '确认' : '保存'}
        onCancel={handleCancel}
        centered={true}
      >
        <Tabs type="card">
          <TabPane tab="工艺路线" key="1">
            <Tables
              list={list}
              getFormData={getFormData}
              types={types}
              paging={paging}
            />
            <div className={styles.forms}>
              <Forms FormData={FormData} data={data} types={types}></Forms>
            </div>
          </TabPane>
          <TabPane tab="外发管理" key="2">
            <Outgoing
              types={types}
              preservation={preservation}
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
