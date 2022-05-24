import moment from 'moment'
import { ReactNode } from 'react'
const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'
/*
 * @Author: zjr
 * @Date: 2022-05-12 15:11:00
 * @LastEditTime: 2022-05-23 17:24:57
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
    dataIndex: 'externalProduceOrderNum',
    width: 200
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'productName',
    width: 250
  },
  {
    title: '生产总量',
    align: 'center',
    dataIndex: 'orderSum',
    width: 110
  },
  {
    title: '延期天数',
    align: 'center',
    dataIndex: 'delayDays',
    width: 100
  }
]
export const inventoryTableColumns = [
  {
    title: '生产单号',
    align: 'center',
    dataIndex: 'externalProduceOrderNum',
    width: 200
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'productName',
    width: 250
  },
  {
    title: '生产总量',
    align: 'center',
    dataIndex: 'orderSum',
    width: 110
  },
  {
    title: '变化日期',
    align: 'center',
    dataIndex: 'updateTime',
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null,
    width: 170
  }
]
