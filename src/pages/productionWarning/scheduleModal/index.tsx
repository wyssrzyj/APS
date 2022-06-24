/*
 * @Author: lyj
 * @Date: 2022-06-21 13:18:16
 * @LastEditTime: 2022-06-24 15:56:27
 * @Description:
 * @LastEditors: lyj
 */
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import React from 'react'

import { tableColumns } from './conifgs'
import MultistageTable from './multistageTable'

const index = () => {
  const onChang = (e) => {
    console.log('处理后的数据-用于保存', e)
  }
  const data: any[] = [
    {
      serial: '1',
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    }
  ]
  return (
    <div>
      <Table columns={tableColumns} dataSource={data} />
      <MultistageTable onChang={onChang} />
    </div>
  )
}

export default index
