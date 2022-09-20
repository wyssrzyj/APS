import { Table } from 'antd'
import React, { useState } from 'react'

import { Title } from '@/components'

import styles from './index.module.less'
function Department() {
  const [checkStrictly] = useState(false)

  const columns: any = [
    {
      title: '部门层级',
      dataIndex: 'name',
      align: 'center',

      key: 'name'
    },
    {
      title: '级数',
      dataIndex: 'series',
      align: 'center',

      key: 'series'
    },
    {
      title: '负责人',
      dataIndex: 'charge',
      align: 'center',
      key: 'charge'
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      align: 'center',
      key: 'contact'
    },
    {
      title: '人数',
      dataIndex: 'people',
      align: 'center',
      key: 'people'
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      align: 'center',
      key: 'remarks'
    },
    {
      title: '操作',
      dataIndex: 'address',
      align: 'center',
      key: 'address',
      render: (_value: any) => {
        return (
          <div className={styles.flex}>
            <div className={styles.operation_item} onClick={() => editUser()}>
              编辑
            </div>

            <div className={styles.operation} onClick={() => editUser()}>
              新建
            </div>
            <div className={styles.operation_item} onClick={() => editUser()}>
              删除
            </div>
          </div>
        )
      }
    }
  ]
  const data = [
    {
      key: 1,
      name: '部门测试',
      series: 60,
      charge: '葫芦娃',
      contact: '10086',
      people: '人数',
      remarks: '备注',
      children: [
        {
          key: 11,
          name: '部门测试',
          series: 60,
          charge: '葫芦娃',
          contact: '10086',
          people: '人数',
          remarks: '备注'
        },
        {
          key: 12,
          name: '部门测试',
          series: 60,
          charge: '葫芦娃',
          contact: '10086',
          people: '人数',
          remarks: '备注',
          children: [
            {
              key: 121,
              name: '部门测试',
              series: 60,
              charge: '葫芦娃',
              contact: '10086',
              people: '人数',
              remarks: '备注'
            }
          ]
        }
      ]
    },
    {
      key: 2,
      name: '部门测试2',
      series: 32,
      charge: '葫芦娃',
      contact: '1008611',
      people: '人数',
      remarks: '备注'
    }
  ]

  const editUser = () => {
    console.log(8848)
  }
  const rowSelection = {}

  return (
    <div className={styles.qualification}>
      <>
        <Title title={'部门管理'} />
        <Table
          columns={columns}
          rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={data}
        />
      </>
    </div>
  )
}

export default Department
