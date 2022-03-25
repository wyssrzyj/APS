import { Table } from 'antd'
import React, { useState } from 'react'

import styles from './index.module.less'
function Tables(props: any) {
  const { getFormData, list, paging, types } = props

  const map = new Map()
  map.set('1', '裁剪')
  map.set('2', '缝制')
  map.set('3', '后整')
  map.set('4', '包装')
  map.set('5', '外发')
  map.set('6', '缝制线外组')

  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [total] = useState<number>(0)
  const columns: any = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'idx'
    },
    {
      title: '工序名称',
      align: 'center',
      dataIndex: 'productName'
    },
    {
      title: '工序代码',
      align: 'center',
      dataIndex: 'productCode'
    },
    {
      title: '所属工段',
      align: 'center',
      dataIndex: 'section',
      render: (v: any) => {
        return <div>{map.get(v)}</div>
      }
    },
    {
      title: '工序耗时',
      align: 'center',
      dataIndex: 'secondPlan'
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'address',
      render: (_value: any, _row: any) => {
        return (
          <div className={styles.flex}>
            <div
              className={
                !types ? styles.operation_item : styles.operation_itemNo
              }
              onClick={() => (!types ? getFormData(_row) : null)}
            >
              编辑
            </div>
          </div>
        )
      }
    }
  ]
  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
    paging && paging(page, pageSize)
  }
  return (
    <div className={styles.table}>
      <Table
        columns={columns}
        dataSource={list || []}
        rowKey={'idx'}
        pagination={{
          disabled: types,
          size: 'small',
          //分页
          showSizeChanger: true,
          pageSize, //每页条数
          current: pageNum, //	当前页数
          total, //数据总数
          pageSizeOptions: ['5', '10', '20', '50'],
          onChange: onPaginationChange //获取当前页码是一个function
        }}
      />
    </div>
  )
}

export default Tables
