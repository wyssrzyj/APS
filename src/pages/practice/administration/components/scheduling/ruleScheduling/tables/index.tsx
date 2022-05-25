import {
  DownOutlined,
  UpOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined
} from '@ant-design/icons'
import { Table, Tooltip } from 'antd'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import React, { useState } from 'react'

import styles from './index.module.less'

function RuleTables(props: Record<string, any>) {
  const { dataSource, changeTableOrder } = props
  const statusList = [
    { key: '待计划', value: 1 },
    { key: '待生产', value: 2 },
    { key: '生产中', value: 3 },
    { key: '生产完成', value: 4 }
  ]
  const getStatusText = (id: number | undefined | null) => {
    return statusList.filter((item) => item.value === id).length
      ? statusList.filter((item) => item.value === id)[0].key
      : ''
  }
  const changeOrder = (
    type: string,
    record: Record<string, any>,
    index: number
  ) => {
    const tableData = cloneDeep(dataSource)
    switch (type) {
      case 'downward':
        tableData[index] = tableData.splice(index + 1, 1, tableData[index])[0]
        break
      case 'upward':
        tableData[index] = tableData.splice(index - 1, 1, tableData[index])[0]
        break
      case 'placedBootom':
        tableData.push(tableData.splice(index, 1)[0])
        break
      case 'placedTop':
        tableData.unshift(tableData.splice(index, 1)[0])
        break
    }
    changeTableOrder(tableData)
  }
  const columns: any = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'name',
      render: (_value: any, _row: any, index: any) => {
        return <div className={styles.flex}>{index + 1}</div>
      }
    },
    {
      title: '生产单号',
      align: 'center',
      dataIndex: 'externalProduceOrderNum'
    },
    {
      title: '产品',
      align: 'center',
      dataIndex: 'productName'
    },
    {
      title: '产品款号',
      align: 'center',
      dataIndex: 'productNum'
    },
    {
      title: '生产单总量',
      align: 'center',
      dataIndex: 'orderSum'
    },
    {
      title: '计划完成时间',
      align: 'center',
      dataIndex: 'planEndDate',
      render: (vaule: any) => moment(vaule).format('YYYY-MM-DD')
    },
    {
      title: '权重',
      align: 'center',
      dataIndex: 'weight',
      render: (text, record) => {
        // return <Tooltip title={record.externalProduceOrderNum}>{text}</Tooltip>
        return { text }
      }
    },
    {
      title: '生产单状态',
      align: 'center',
      dataIndex: 'status',
      render: (vaule: any) => getStatusText(vaule)
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'section',
      width: 130,
      render: (text: any, record: any, index: number) => {
        return (
          <div className={styles.operateContainer}>
            {index !== 0 && (
              <span>
                <VerticalAlignTopOutlined
                  onClick={() => changeOrder('placedTop', record, index)}
                />
                <UpOutlined
                  onClick={() => changeOrder('upward', record, index)}
                />
              </span>
            )}
            {index !== dataSource.length - 1 && (
              <span>
                <DownOutlined
                  onClick={() => changeOrder('downward', record, index)}
                />
                <VerticalAlignBottomOutlined
                  onClick={() => changeOrder('placedBootom', record, index)}
                />
              </span>
            )}
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <Table
        bordered
        columns={columns}
        pagination={false}
        dataSource={dataSource}
        rowKey="externalProduceOrderId"
      />
    </div>
  )
}

export default RuleTables
