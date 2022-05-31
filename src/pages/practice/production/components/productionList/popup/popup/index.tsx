/*
 * @Author: lyj
 * @Date: 2022-05-30 09:06:43
 * @LastEditTime: 2022-05-30 10:26:42
 * @Description:
 * @LastEditors: lyj
 */
import { Form, Input, Modal } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { productionSingleApis } from '@/recoil/apis'

import Forms from './forms/index'
import styles from './index.module.less'
import Tables from './tables/index'

const map = new Map()
map.set('1', '裁剪')
map.set('2', '缝制')
map.set('3', '后整')
map.set('4', '包装')
map.set('5', '外发')
map.set('6', '缝制线外组')

function Popup(props: any) {
  const {
    operation,
    setOperation,
    types,
    getDetailsId,
    externalProduceOrderId
  } = props
  const { workingProcedure, popupPreservation, processOutsourcing } =
    productionSingleApis
  const [total, setTotal] = useState() //存放总数.
  const defaultPageSize = 5
  const [caseIds, setCaseIds] = useState([]) //存放id

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

  const handleOk = () => {
    //走单独的保存的接口
    console.log(allSaveList)

    // setOperation(false)
  }

  const handleCancel = () => {
    setOperation(false)
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
  return (
    <div>
      <Modal
        width={1000}
        title={'编辑工序'}
        visible={operation}
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
      >
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
      </Modal>
    </div>
  )
}

export default Popup
