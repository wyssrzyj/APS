import { Button, Form, message, Modal, Tabs } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { productionSingleApis } from '@/recoil/apis'

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
    externalProduceOrderId,
    whetherEditor,
    refreshData
  } = content

  const { workingProcedure, popupPreservation } = productionSingleApis

  const { TabPane } = Tabs
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()

  const [usedList, setUsedList] = useState([]) //老数据
  const [list, setList] = useState([]) //新数据
  const [data, setData] = useState() //form的单个数据
  const [caseIds, setCaseIds] = useState([]) //存放id
  const [total, setTotal] = useState() //存放总数

  const defaultPageSize = 5
  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize,
    externalProduceOrderId: getDetailsId
  })

  const [localData, setLocalData] = useState<any>([]) //工艺数据
  const [outgoing, setOutgoing] = useState<any>([]) //外发数据
  const [processedData, setProcessedData] = useState<any>([]) //外发全部数据

  useEffect(() => {
    if (getDetailsId !== undefined && getDetailsId !== null) {
      getDetails({
        pageNum: 1,
        pageSize: defaultPageSize,
        externalProduceOrderId: getDetailsId
      })
    }
  }, [getDetailsId])

  useEffect(() => {
    if (params.externalProduceOrderId !== undefined) {
      getDetails(params)
    }
  }, [params])
  //子项的分页数据
  const pagingData = (e, v) => {
    setParams({ externalProduceOrderId: getDetailsId, pageNum: e, pageSize: v })
  }

  const getDetails = async (params: any) => {
    const res: any = await workingProcedure(params)
    res.records.map((item) => {
      item.section = map.get(item.section)
    })

    setUsedList(res.records)
    setTotal(res.total)
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
  // *** 判断本地数组是否有 有添加反之且替换**.
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
      // 判断外发管理的外发时间是否为空
      let outgoingJudge = false
      if (!isEmpty(outgoing)) {
        const outTimeType = outgoing.every((item: any) => {
          return item.outTime !== null && item.outTime !== ''
        })
        outgoingJudge = outTimeType
      } else {
        outgoingJudge = true
      }

      //全部数据不为空才=true
      let allData = false
      if (!isEmpty(processedData)) {
        const outTimeType = processedData.every((item: any) => {
          return item.outTime !== null && item.outTime !== ''
        })
        allData = outTimeType
      } else {
        allData = true
      }

      if (outgoingJudge && allData) {
        const arr = await popupPreservation({
          productId: getDetailsId,
          externalProduceOrderId: externalProduceOrderId,
          outsourceProcessDTOList: processedData,
          processDTOList: localData
        })

        if (arr) {
          message.success('保存成功')
          refreshData && refreshData()
          handleCancel()
        }
      } else {
        message.error('外发管理的外发时间不能为空')
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
  //全部数据
  const AllData = (e: any) => {
    setProcessedData(e)
  }
  return (
    <div className={styles.mainBody}>
      <Modal
        width={1000}
        footer={
          types === true ? null : (
            <>
              <Button onClick={handleCancel}>取消</Button>

              <Button type="primary" onClick={handleOk}>
                保存
              </Button>
            </>
          )
        }
        destroyOnClose={true}
        visible={isModalVisible}
        maskClosable={false}
        onOk={handleOk}
        // okText={types ? '确认' : '保存'}
        onCancel={handleCancel}
        centered={true}
      >
        <Tabs type="card">
          <TabPane tab="工艺路线" key="1">
            <Tables
              total={total}
              pagingData={pagingData}
              list={list}
              getFormData={getFormData}
              types={types}
            />
            <div className={styles.forms}>
              <Forms FormData={FormData} data={data} types={types}></Forms>
            </div>
          </TabPane>
          <TabPane tab="外发管理" key="2">
            <Outgoing
              whetherEditor={whetherEditor}
              types={types}
              AllData={AllData}
              preservation={preservation}
              externalProduceOrderId={externalProduceOrderId}
            />
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
}

export default Popup
