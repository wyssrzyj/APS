import moment from 'moment'
import { ReactNode } from 'react'
const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'
/*
 * @Author: zjr
 * @Date: 2022-05-12 15:11:00
 * @LastEditTime: 2022-05-13 18:37:07
 * @Description:
 * @LastEditors: zjr
 */
type Column = {
  title: string
  align: 'center' | 'left' | 'right'
  dataIndex: string
  width: number
  fixed: 'left' | 'right'
  render: ReactNode
}
export const delayTableColumns = [
  {
    title: '生产单号',
    align: 'center',
    dataIndex: 'externalProduceOrderNum'
    // width: 150
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'productName'
    // width: 150
  },
  {
    title: '生产总量',
    align: 'center',
    dataIndex: 'orderSum'
    // width: 150
  },
  {
    title: '延期天数',
    align: 'center',
    dataIndex: 'delayDays'
    // width: 200
  }
]
export const inventoryTableColumns = [
  {
    title: '生产单号',
    align: 'center',
    dataIndex: 'externalProduceOrderNum'
    // width: 150
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'productName'
    // width: 150
  },
  {
    title: '生产总量',
    align: 'center',
    dataIndex: 'orderSum'
    // width: 150
  },
  {
    title: '变化日期',
    align: 'center',
    dataIndex: 'updateTime',
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
    // width: 200
  }
]
