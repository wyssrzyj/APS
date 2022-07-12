/*
 * @Author: zjr
 * @Date: 2022-04-22 17:40:18
 * @LastEditTime: 2022-07-12 09:01:46
 * @Description:
 * @LastEditors: lyj
 */
import { getAttribute } from '@antv/g2/lib/dependents'
import { Button, message, Modal, Space } from 'antd'
import { debounce, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { practice } from '@/recoil/apis'

import ContrastGantt from './contrastGantt'
import Forms from './forms/index'
import RulesTables from './tables/index'
function RuleScheduling(props: Record<string, any>) {
  const { setVisibleRule, visibleRule, onCancel, checkIDs, formData } = props
  const [data, setData] = useState<any>([]) //保存数据

  const [searchParams, setSearchParams] = useState<Record<string, number>>({
    customerPriorityWeight: 1,
    orderPriorityWeight: 1,
    deliveryDatePriorityWeight: 1
  })
  const [dataSource, setDataSource] = useState<Record<string, any>>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { saveAlgorithm } = practice

  // 搜索框3
  useEffect(() => {
    getTableList({ ...searchParams, produceOrderIdList: checkIDs })
  }, [checkIDs, searchParams])
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

  const changeTableOrder = (changeData: Record<string, any>) => {
    setDataSource(changeData)
  }
  // 开始排程
  const startSchedule = () => {
    // message.success(`保存完成..`)
    setIsModalVisible(true)
    // onCancel()
  }

  const handleOk = async (async) => {
    const res = await saveAlgorithm({ ganttViewList: data.data })
    if (res.code === 200) {
      message.success('保存成功')
      setIsModalVisible(false)
      onCancel()
    }
  }
  const getIframe = (e) => {
    setData(e)
  }
  return (
    <div>
      <Modal
        width={1000}
        visible={visibleRule}
        centered={true}
        footer={null}
        onCancel={() => {
          setVisibleRule(false)
        }}
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
        <Modal
          width={2000}
          centered={true}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => {
            setVisibleRule(false)
          }}
          okButtonProps={{ disabled: !isEmpty(data.data) ? false : true }}
        >
          <ContrastGantt
            getIframe={getIframe}
            checkIDs={checkIDs}
            formData={formData}
          />
        </Modal>
      </Modal>
    </div>
  )
}

export default RuleScheduling
