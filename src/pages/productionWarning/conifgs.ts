import moment from 'moment'
import { ReactNode } from 'react'

const FORMAT_DATE = 'YYYY-MM-DD '

export const easySearch = [
  {
    label: '生产单号',
    field: 'externalProduceOrderNum',
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
    allowClear: true,
    placeholder: '请选择工厂名称',
    width: 250,
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
    field: 'productNum',
    allowClear: true,
    placeholder: '请输入产品款号',
    type: 'input',
    options: []
  },
  {
    label: '预警状态',
    field: 'abnormalStatus',
    type: 'select',
    allowClear: true,
    placeholder: '请选择预警状态',
    options: [],
    width: 250
  },
  {
    label: '已处理',
    field: 'disposeStatus',
    type: 'select',
    allowClear: true,
    placeholder: '请选择生产状态',
    options: [],
    width: 250
  }
]

export const tableColumns: any = [
  {
    title: '生产单号',
    align: 'center',
    dataIndex: 'externalProduceOrderNum',
    key: 'externalProduceOrderNum',
    width: 100
  },
  {
    title: '款图',
    align: 'center',
    dataIndex: 'img',
    key: 'img',

    width: 100
  },
  {
    title: '工厂名称',
    align: 'center',
    dataIndex: 'factoryName',
    key: 'factoryName',
    width: 80
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'productName',
    key: 'productName',

    width: 80
  },
  {
    title: '产品款号',
    align: 'center',
    dataIndex: 'productNum',
    key: 'productNum',
    width: 80
  },
  {
    title: '客户款号',
    dataIndex: 'productClientNum',
    key: 'productClientNum',
    width: 80
  },
  {
    title: '生产单总量',
    align: 'center',
    key: 'orderSum',
    dataIndex: 'orderSum',
    width: 80
  },
  {
    title: '承诺交期',
    align: 'center',
    key: 'orderDelivery',
    dataIndex: 'orderDelivery',
    width: 80
  },

  {
    title: '剩余工期',
    align: 'center',
    key: 'remainingDuration',
    dataIndex: 'remainingDuration',
    width: 80
  },
  {
    title: '计划完成日期',
    align: 'center',
    dataIndex: 'planEndDate',
    key: 'planEndDate',
    width: 170,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },

  {
    title: '预警状态',
    align: 'center',
    key: 'abnormalStatus',
    dataIndex: 'abnormalStatus',
    width: 100,
    render: (v) => (v === '1' ? '预警' : '延期')
  },

  {
    title: '生产中工段',
    align: 'center',
    key: 'currentSection',
    dataIndex: 'currentSection',
    width: 80
  },
  {
    title: '已处理',
    align: 'center',
    key: 'disposeStatus',
    dataIndex: 'disposeStatus',
    width: 80,
    render: (v) => (v === '0' ? '未处理' : '已处理')
  },

  {
    title: '操作',
    align: 'center',
    dataIndex: 'operate',
    width: 100,
    fixed: 'right'
  }
]
