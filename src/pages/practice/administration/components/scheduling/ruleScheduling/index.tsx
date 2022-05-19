/*
 * @Author: zjr
 * @Date: 2022-04-22 17:40:18
 * @LastEditTime: 2022-05-19 08:33:50
 * @Description:
 * @LastEditors: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 */
import { getAttribute } from '@antv/g2/lib/dependents'
import { Button, Modal, Space } from 'antd'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'

import Forms from './forms/index'
import RulesTables from './tables/index'
function RuleScheduling(props: Record<string, any>) {
  const { visibleRule, onCancel, formData } = props
  const [searchParams, setSearchParams] = useState<Record<string, number>>({
    customerPriorityWeight: 1,
    orderPriorityWeight: 1,
    deliveryDatePriorityWeight: 1
  })
  const [dataSource, setDataSource] = useState<Record<string, any>>([])
  // 搜索框
  useEffect(() => {
    getTableList({ ...searchParams, factoryId: formData })
  }, [searchParams, formData])
  const valuesChange = debounce(
    (values: any, allValues: Record<string, number>) => {
      setSearchParams({ ...allValues })
    },
    200
  )
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

export default RuleScheduling
