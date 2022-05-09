/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-03-10 15:20:21
 * @LastEditors: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @LastEditTime: 2022-05-09 09:37:07
 * @FilePath: \jack-aps\src\pages\practice\production\components\productionList\popup\tables\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Table } from 'antd'
import React, { useState } from 'react'

import styles from './index.module.less'
function Tables(props: any) {
  const { getFormData, list, paging, types } = props

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
        // return <div>{map.get(v)}</div>
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
              // className={
              //   !types ? styles.operation_item : styles.operation_itemNo
              // }
              className={styles.operation_item}
              // onClick={() => (!types ? getFormData(_row) : null)}
              onClick={() => getFormData(_row)}
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
          // disabled: types,
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
