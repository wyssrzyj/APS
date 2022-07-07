/*
 * @Author: lyj
 * @Date: 2022-06-23 13:16:34
 * @LastEditTime: 2022-07-07 10:51:01
 * @Description:
 * @LastEditors: lyj
 */
import moment from 'moment'
import { ReactNode } from 'react'

const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'

const map = new Map()
map.set(1, '已检查')
map.set(2, '未检查')
map.set(3, '重新检查')

const production = new Map()
production.set(1, '待计划')
production.set(2, '已计划')
production.set(3, '生产中')
production.set(4, '生产完成')

const status = new Map()
status.set(1, '待计划')
status.set(2, '已计划')
status.set(3, '生产中')
status.set(4, '生产完成')

export const easySearch = [
  {
    label: '生产单号',
    field: 'productOrderNum',
    type: 'input',
    allowClear: true,
    placeholder: '请输入生产单号'
  }
]
export const searchConfigs = [
  {
    label: '工厂名称',
    field: 'factoryId',
    type: 'select',
    width: 250,
    allowClear: true,
    placeholder: '请选择工厂名称',
    options: []
  },
  {
    label: '生产单号',
    field: 'productOrderNum',
    type: 'input',
    allowClear: true,
    placeholder: '请输入生产单号'
  },
  {
    label: '产品名称',
    field: 'productName',
    allowClear: true,
    placeholder: '请输入产品名称',
    type: 'input',
    options: []
  },
  {
    label: '产品款号',
    field: 'productNum',
    allowClear: true,
    placeholder: '请输入产品款号',
    type: 'input',
    options: []
  },
  {
    label: '生产状态',
    field: 'status',
    type: 'select',
    width: 250,
    allowClear: true,
    placeholder: '请选择生产状态',
    options: []
  },
  {
    label: '计划完成时间',
    field: 'planEndDate',
    type: 'rangePicker',
    width: 250,
    allowClear: true,
    placeholder: '请选择生产状态',
    options: []
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
    width: 100,
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
    key: 'productClientNum',
    align: 'center',
    dataIndex: 'productClientNum',
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
    title: '生产单权重',
    align: 'center',
    key: 'produceWeight',
    dataIndex: 'produceWeight',
    width: 100
  },

  {
    title: '生产单状态',
    align: 'center',
    key: 'status',
    dataIndex: 'status',
    width: 100,
    render: (v: any) => production.get(v)
  },
  {
    title: '物料齐套状态',
    align: 'center',
    key: 'checkStatus',
    dataIndex: 'checkStatus',
    width: 100,
    render: (v: any) => map.get(v)
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
    fixed: 'right',

    render: (v: any) => (v === 0 ? '未延期' : v === 1 ? '已延期' : null)
  },
  {
    title: '生产单状态',
    key: 'status',
    align: 'center',
    dataIndex: 'status',
    fixed: 'right',

    render: (v: any) => status.get(v)
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'address',
    fixed: 'right'
  }
]
