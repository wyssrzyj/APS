import { Table } from 'antd'
import React, { useState } from 'react'

import styles from './index.module.less'

function Tables() {
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [total] = useState<number>(0)
  const columns: any = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'name',
      render: (
        _value: any,
        _row: any,
        index:
          | boolean
          | React.ReactChild
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined
      ) => {
        return <div className={styles.flex}>{index}</div>
      }
    },
    {
      title: '工序名称',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: '工序代码',
      align: 'center',
      dataIndex: 'age'
    },
    {
      title: '所属工段',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '工序耗时',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'address',
      render: (_value: any, _row: any) => {
        return (
          <div className={styles.flex}>
            <div className={styles.operation_item} onClick={() => editUser()}>
              编辑
            </div>
          </div>
        )
      }
    }
  ]
  const data = []
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`
    })
  }

  const editUser = () => {
    console.log('编辑')
  }
  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
  }
  return (
    <div className={styles.table}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={'id'}
        pagination={{
          size: 'small',
          //分页
          showSizeChanger: true,
          // showQuickJumper: true, //是否快速查找
          pageSize, //每页条数
          current: pageNum, //	当前页数
          total, //数据总数
          // position: ['bottomCenter'], //居中
          pageSizeOptions: ['5', '10', '20', '50'],
          onChange: onPaginationChange //获取当前页码是一个function
        }}
      />
    </div>
  )
}

export default Tables
