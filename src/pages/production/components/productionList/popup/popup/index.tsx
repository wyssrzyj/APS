/*
 * @Author: lyj
 * @Date: 2022-05-30 09:06:43
 * @LastEditTime: 2022-07-11 16:59:54
 * @Description:
 * @LastEditors: lyj
 */
import { Button, message, Modal } from 'antd'
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
  const { operation, setOperation, types, getDetailsId, externalProduceOrder } =
    props
  const { workingProcedure, processSave, processOutsourcing } =
    productionSingleApis
  const [total, setTotal] = useState() //存放总数.
  const defaultPageSize = 5
  const [caseIds, setCaseIds] = useState([]) //存放id

  const [usedList, setUsedList] = useState([]) //老数据
  const [allList, setAllList] = useState<any>([]) //全部-工艺数据

  const [localData, setLocalData] = useState<any>([]) //工艺数据-修改保存
  const [list, setList] = useState([]) //修改后-数据-展示
  const [allSaveList, setAllSaveList] = useState<any>([]) //全部-工艺数据-保存

  const [data, setData] = useState() //form的单个数据

  useEffect(() => {
    if (getDetailsId !== undefined && getDetailsId !== null) {
      const sum = {
        pageNum: 1,
        pageSize: defaultPageSize,
        externalProduceOrderId: externalProduceOrder.externalProduceOrderId,
        section: externalProduceOrder.section,
        sectionSn: externalProduceOrder.sectionSn
      }
      const all = {
        pageNum: 1,
        pageSize: 1000,
        externalProduceOrderId: externalProduceOrder.externalProduceOrderId,
        section: externalProduceOrder.section,
        sectionSn: externalProduceOrder.sectionSn
      }
      getDetails('1', sum)
      getDetails('2', all)
      // getAllData() //外发全部数据
    }
  }, [externalProduceOrder])
  //外发

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
      if (!isEmpty(res.records)) {
        const data = res.records
        data.map((item, index) => (item.order = index))
        setTotal(data)
      }
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
    //走单独的保存的接口
    const res = await processSave({
      externalProduceOrderId: externalProduceOrder.externalProduceOrderId,
      processDTOList: allSaveList,
      section: externalProduceOrder.section
    })
    if (res) setOperation(false)
    message.success('保存成功')
  }

  const handleCancel = () => {
    setOperation(false)
  }
  //子项的分页数据
  const pagingData = (e, v) => {
    const sum = {
      pageNum: e,
      pageSize: v,
      externalProduceOrderId: externalProduceOrder.externalProduceOrderId,
      section: externalProduceOrder.section
    }
    getDetails('1', sum)
  }
  return (
    <div>
      <Modal
        width={1000}
        title={'编辑工序'}
        visible={operation}
        maskClosable={false}
        onCancel={handleCancel}
        centered={true}
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
      >
        <Tables
          total={total}
          pagingData={pagingData}
          list={allList}
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
