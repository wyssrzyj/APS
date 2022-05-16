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

  const { workingProcedure, popupPreservation, processOutsourcing } =
    productionSingleApis

  const { TabPane } = Tabs
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const defaultPageSize = 5
  const [total, setTotal] = useState() //存放总数
  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize,
    externalProduceOrderId: getDetailsId
  })

  const [usedList, setUsedList] = useState([]) //老数据
  const [allList, setAllList] = useState<any>([]) //全部-工艺数据

  const [localData, setLocalData] = useState<any>([]) //工艺数据-修改保存
  const [list, setList] = useState([]) //修改后-数据-展示
  const [allSaveList, setAllSaveList] = useState<any>([]) //全部-工艺数据-保存

  const [allData, setAllData] = useState<any>([]) //外发全部数据-初始
  const [processedData, setProcessedData] = useState<any>([]) //外发全部数据-修改

  const [data, setData] = useState() //form的单个数据
  const [caseIds, setCaseIds] = useState([]) //存放id

  // const [outgoing, setOutgoing] = useState<any>([]) //外发数据

  useEffect(() => {
    if (getDetailsId !== undefined && getDetailsId !== null) {
      const sum = {
        pageNum: 1,
        pageSize: defaultPageSize,
        externalProduceOrderId: getDetailsId
      }
      const all = {
        pageNum: 1,
        pageSize: 1000,
        externalProduceOrderId: getDetailsId
      }
      getDetails('1', sum)
      getDetails('2', all)
      getAllData() //外发全部数据
    }
  }, [getDetailsId])
  const getAllData = async () => {
    const res = await processOutsourcing({
      pageNum: 1,
      pageSize: 1000,
      externalProduceOrderId: externalProduceOrderId
    })
    if (!isEmpty(res.records)) {
      // 添加 状态判断是否选中
      res.records.map(
        (item: { need: boolean; section: string; outTime: null }) => {
          item.need =
            item.section === '5' ? true : item.outTime !== null ? true : false
        }
      )
      setAllData(res.records)
      setProcessedData(res.records)
    }
  }

  useEffect(() => {
    if (params.externalProduceOrderId !== undefined) {
      getDetails('1', params)
    }
  }, [params])
  //子项的分页数据
  const pagingData = (e, v) => {
    setParams({ externalProduceOrderId: getDetailsId, pageNum: e, pageSize: v })
  }

  const getDetails = async (type, params: any) => {
    const res: any = await workingProcedure(params)
    res.records.map((item) => {
      item.section = map.get(item.section)
    })
    if (type === '1') {
      setUsedList(res.records)
      setTotal(res.total)
    }
    if (type === '2') {
      setAllList(res.records)
      setTotal(res.total)
    }
  }

  //判断本地是否有值 有的就重新处理
  useEffect(() => {
    // 替换 数据
    if (!isEmpty(localData)) {
      localData.forEach((item: any) => {
        oldAndNewFilter('1', item, usedList)
        oldAndNewFilter('2', item, allList)
      })
    } else {
      setList(usedList)
      setAllSaveList(allList)
    }
  }, [allList, usedList, localData])

  //  **判断接口数据中  是否有本地数据  有则替换**
  const oldAndNewFilter = (type, v: any, total: any) => {
    const saveIndex = total.findIndex((item: any) => item.idx === v.idx)
    if (saveIndex !== -1) {
      total.splice(saveIndex, 1, v)
      if (type === '1') {
        setList([...total])
      }
      if (type === '2') {
        setAllSaveList([...total])
      }
    } else {
      setList(total)
      setAllSaveList(total)
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
  // *** 存放修改后的数据**.
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
      // 判断外发管理的外发时间是否为空.

      //全部数据不为空才=true
      if (!isEmpty(processedData)) {
        const processed = processedData.filter((item) => item.need === true)
        const outTimeType = processed.every((item: any) => {
          return item.outTime !== null && item.outTime !== ''
        })

        if (outTimeType) {
          //保存的时候工艺和外发 都需要传全部数据
          const arr = await popupPreservation({
            productId: getDetailsId,
            externalProduceOrderId: externalProduceOrderId,
            outsourceProcessDTOList: processed, //外发全部为true且时间不为空的数据
            processDTOList: allSaveList //工艺全部数据
          })

          if (arr) {
            message.success('保存成功')
            refreshData && refreshData()
            handleCancel()
          }
        } else {
          message.error('外发管理的外发时间不能为空')
        }
      }
    } else {
      handleCancel()
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)

    setGetDetailsId(null)
  }

  //外发全部数据
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
              allData={allData}
              whetherEditor={whetherEditor}
              types={types}
              AllData={AllData}
              // preservation={preservation}
              externalProduceOrderId={externalProduceOrderId}
            />
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
}

export default Popup
