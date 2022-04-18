import { getAttribute } from '@antv/g2/lib/dependents'
import { Button, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'

import Forms from './forms/index'
import RulesTables from './tables/index'
function useRuleScheduling(props: Record<string, any>) {
  const { visibleRule, onCancel } = props
  const [searchParams, setSearchParams] = useState<Record<string, number>>({
    customerPriorityWeight: 1,
    orderPriorityWeight: 1,
    deliveryDatePriorityWeight: 1
  })
  const [dataSource, setDataSource] = useState<Record<string, any>>([])
  // 搜索框
  useEffect(() => {
    getTableList({ ...searchParams, factoryId: 1481903393613139970 })
  }, [searchParams])
  const valuesChange = (values: Record<string, number>) => {
    setSearchParams({ ...values })
  }
  const getTableList = async (params: Record<string, number | string>) => {
    const data = await practice.rulesScheduling(params)
    setDataSource(data)
  }
  // 表格数据
  // useEffect(() => {
  //   console.log('dataSource', dataSource)
  // }, [dataSource])
  const changeTableOrder = (changeData: Record<string, any>) => {
    setDataSource(changeData)
  }
  // 开始排程
  const startSchedule = () => {
    console.log('dataSource', dataSource)
    onCancel()
  }
  return (
    <div>
      <Modal
        width={1000}
        visible={visibleRule}
        centered={true}
        footer={null}
        onCancel={onCancel}
        // maskClosable={false}
      >
        <Forms searchParams={searchParams} onChange={valuesChange} />
        <RulesTables
          dataSource={dataSource}
          changeTableOrder={changeTableOrder}
        />
        <footer>
          <Button type="primary" onClick={startSchedule}>
            开始排程
          </Button>
        </footer>
      </Modal>
    </div>
  )
}

export default useRuleScheduling
