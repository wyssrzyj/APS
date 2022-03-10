import { Table } from 'antd'
import React, { useState } from 'react'

import styles from './index.module.less'

function Tables() {
  const originData = []
  for (let i = 0; i < 15; i++) {
    originData.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      need: false, //判断当前是否选中，
      //   needDisabled: false, //判断当前是否失效，
      outgoing: '88480',
      address: `London Park no. ${i}`
    })
  }
  const [data, setData] = useState(originData)
  const columns: any = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'name',
      render: (_value: any, _row: any, index: any) => {
        return <div className={styles.flex}>{index}</div>
      }
    },
    {
      title: '生产单',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: '产品',
      align: 'center',
      dataIndex: 'age'
    },
    {
      title: '产品款号',
      align: 'center',
      dataIndex: 'section1'
    },
    {
      title: '生产单总量',
      align: 'center',
      dataIndex: 'section2'
    },
    {
      title: '计划完成时间',
      align: 'center',
      dataIndex: 'section3'
    },
    {
      title: '权重',
      align: 'center',
      dataIndex: 'section4'
    },
    {
      title: '生产单状态',
      align: 'center',
      dataIndex: 'section5'
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'section '
    }
  ]
  return (
    <div>
      <Table
        columns={columns}
        bordered
        dataSource={data}
        // columns={mergedColumns}
        rowClassName="editable-row"
      />
    </div>
  )
}

export default Tables
