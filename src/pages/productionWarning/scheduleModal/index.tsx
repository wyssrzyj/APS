/*
 * @Author: lyj
 * @Date: 2022-06-21 13:18:16
 * @LastEditTime: 2022-06-30 14:33:47
 * @Description:
 * @LastEditors: lyj
 */
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import React from 'react'

import { productionWarning } from '@/recoil/apis'

import { tableColumns } from './conifgs'
import MultistageTable from './multistageTable'

const WarningModal = (props) => {
  const { current, setSaveData } = props
  const { getAssignmentList } = productionWarning

  const [data, setData] = useState([])
  useEffect(() => {
    getProductionWarning()
  }, [])
  const getProductionWarning = async () => {
    // current.externalProduceOrderId
    const res = await getAssignmentList({
      externalProduceOrderId: current.externalProduceOrderId
    })
    if (res.code === 200) {
      setData(res.data)
    }
  }

  const onChang = (e) => {
    setSaveData(e)
  }
  return (
    <div>
      <Table columns={tableColumns} dataSource={data} />
      <MultistageTable current={current} onChang={onChang} />
    </div>
  )
}

export default WarningModal
