import moment from 'moment'
import { ReactNode } from 'react'

const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'

export const searchConfigs = [
  {
    label: '工厂名称',
    field: 'factoryId',
    type: 'select',
    allowClear: true,
    placeholder: '请选择工厂名称',
    options: []
  },
  {
    label: '生产单号',
    field: 'externalProduceOrderNum',
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
    field: 'productModelNo',
    allowClear: true,
    placeholder: '请输入产品款号',
    type: 'input',
    options: []
  },
  {
    label: '生产状态',
    field: 'productStatus',
    type: 'select',
    allowClear: true,
    placeholder: '请选择生产状态',
    options: []
  }
]

export const tableColumns: any = [
  {
    title: '生产单号',
    align: 'center',
    dataIndex: 'externalProduceOrderNum',
    key: 'externalProduceOrderNum',
    width: 200
  },
  {
    title: '款图',
    align: 'center',
    dataIndex: 'img',
    key: 'img',

    width: 200
  },
  {
    title: '工厂名称',
    align: 'center',
    dataIndex: 'factoryName',
    key: 'factoryName',
    width: 200
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'productName',
    key: 'productName',

    width: 250
  },
  {
    title: '产品款号',
    align: 'center',
    dataIndex: 'productNum',
    key: 'productNum',
    width: 200
  },
  {
    title: '客户款号',
    dataIndex: 'customerAccount',
    key: 'customerAccount'
  },
  {
    title: '生产单总量',
    align: 'center',
    key: 'shopName',
    dataIndex: 'shopName',
    width: 200
  },
  {
    title: '承诺交期',
    align: 'center',
    key: 'teamName',
    dataIndex: 'teamName',
    width: 200
  },

  {
    title: '剩余工期',
    align: 'center',
    key: 'productionAmount',
    dataIndex: 'productionAmount',
    width: 100
  },
  {
    title: '计划完成日期',
    align: 'center',
    dataIndex: 'planStartTime',
    key: 'planStartTime',
    width: 170,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },

  {
    title: '延期状态',
    align: 'center',
    key: 'deferredStatus',
    dataIndex: 'deferredStatus',
    width: 100
  },

  {
    title: '生产中工段',
    align: 'center',
    key: 'productionSection',
    dataIndex: 'productionSection',
    width: 100
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'operate',
    width: 200,
    fixed: 'right'
  }
]
