/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-03-10 15:20:21
 * @LastEditors: lyj
 * @LastEditTime: 2022-06-20 09:01:25
 * @FilePath: \jack-aps\src\pages\practice\production\components\productionList\popup\tables\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
function Tables(props: any) {
  const { getFormData, list, pagingData, total, types } = props
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)

  const columns: any = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'order',
      render: (_value: any, _row: any) => {
        return <div>{_value + 1}</div>
      }
    },
    {
      title: '工序名称',
      align: 'center',
      dataIndex: 'processName'
    },
    {
      title: '工序代码',
      align: 'center',
      dataIndex: 'processCode'
    },
    {
      title: '所属工段',
      align: 'center',
      dataIndex: 'section',
      render: (v: any) => {
        return <div>{v}</div>
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
              className={styles.operation_item}
              onClick={() => getFormData(_row)}
            >
              {types ? '查看' : '编辑'}
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
    // pagingData && pagingData(page, pageSize)
  }
  return (
    <div className={styles.table}>
      <Table
        columns={columns}
        dataSource={list || []}
        rowKey={'idx'}
        pagination={{
          // disabled: types,
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
