/*
 * @Author: lyj
 * @Date: 2022-06-23 13:16:34
 * @LastEditTime: 2022-07-08 09:17:27
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
    title: '承诺交期',
    key: 'committedDeliveryDate',
    align: 'center',
    dataIndex: 'committedDeliveryDate',
    width: 100,
    render: (v: any) => (v ? moment(v).format('YYYY-MM-DD') : null)
  },
  {
    title: '剩余工期',
    key: 'remainingDuration',
    align: 'center',
    dataIndex: 'remainingDuration',
    width: 100
  },
  {
    title: '成产单权重',
    key: 'produceWeight',
    align: 'center',
    dataIndex: 'produceWeight',
    width: 100
  },
  {
    title: '物料齐套状态',
    align: 'center',
    dataIndex: 'checkStatus',
    fixed: 'right',
    render: (v: any) => map.get(v)
  }
]
