/*
 * @Author: lyj
 * @Date: 2022-06-23 13:16:34
 * @LastEditTime: 2022-07-04 18:10:04
 * @Description:
 * @LastEditors: lyj
 */
import moment from 'moment'
import { ReactNode } from 'react'

const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'

const map = new Map()
map.set(1, '待计划')
map.set(2, '已计划')
map.set(3, '生产中')
map.set(4, '生产完成')

export const easySearch = [
  {
    label: '生产单号',
    field: 'externalProduceOrderNum',
    type: 'input',
    allowClear: true,
    placeholder: '请输入生产单号'
  }
]

export const tableColumns: any = [
  {
    title: '生产单号',
    align: 'center',
    key: 'externalProduceOrderNum',
    dataIndex: 'externalProduceOrderNum'
  },
  {
    title: '款图',
    align: 'center',
    key: 'img',
    dataIndex: 'img'
  },
  {
    title: '工厂名称',
    key: 'factoryName',
    align: 'center',
    width: 100,
    dataIndex: 'factoryName'
  },
  {
    title: '产品名称',
    key: 'productName',
    align: 'center',
    width: 250,
    dataIndex: 'productName'
  },
  {
    title: '产品款号',
    key: 'productNum',
    align: 'center',
    dataIndex: 'productNum',
    width: 200
  },
  {
    title: '客户款号',
    key: 'productClientNum',
    align: 'center',
    dataIndex: 'productClientNum'
  },
  {
    title: '生产单总量',
    key: 'orderSum',
    align: 'center',
    dataIndex: 'orderSum',
    width: 100
  },
  {
    title: '计划完成日期',
    key: 'planEndDate',
    align: 'center',
    dataIndex: 'planEndDate',
    width: 170,
    render: (v: any) => (v ? moment(v).format('YYYY-MM-DD') : null)
  },
  {
    title: '承诺交期',
    align: 'center',
    key: 'committedDeliveryDate',
    dataIndex: 'committedDeliveryDate',
    width: 100,
    render: (v: any) => (v ? moment(v).format('YYYY-MM-DD') : null)
  },

  {
    title: '剩余工期',
    align: 'center',
    key: 'remainingDuration',
    dataIndex: 'remainingDuration',
    width: 100
  },
  {
    title: '外发情况',
    key: 'outsourceType',
    align: 'center',
    dataIndex: 'outsourceType',
    render: (v: any) => (v === 1 ? '工序外发' : v === 2 ? '整单外发' : null)
  },

  {
    title: '延期情况',
    key: 'delayType',
    align: 'center',
    dataIndex: 'delayType',
    render: (v: any) => (v === 0 ? '未延期' : v === 1 ? '已延期' : null)
  },
  {
    title: '生产单状态',
    key: 'status',
    align: 'center',
    dataIndex: 'status',
    render: (v: any) => map.get(v)
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'address',
    fixed: 'right'
  }
]
