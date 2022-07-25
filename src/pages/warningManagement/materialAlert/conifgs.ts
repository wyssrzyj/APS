import { TreeSelect } from 'antd'
import { ReactNode } from 'react'
const { SHOW_PARENT } = TreeSelect
import moment from 'moment'
const FORMAT_DATE = 'YYYY-MM-DD '

export const searchConfigs = [
  {
    label: '工厂名称',
    field: 'factoryId',
    type: 'select',
    allowClear: true,
    width: 250,
    placeholder: '请选择工厂名称',
    options: []
  },
  {
    label: '生产单号',
    field: 'externalProduceOrderNum',
    allowClear: true,
    width: 250,
    type: 'input',
    options: []
  },
  {
    label: '产品款号',
    field: 'productNum',
    type: 'input',
    allowClear: true
  }
]

type Column = {
  title: string
  align: 'center' | 'left' | 'right'
  dataIndex: string
  width: number
  fixed: 'left' | 'right'
  render: ReactNode
}
export const tableColumns: any = [
  {
    title: '生产单号',
    align: 'center',
    dataIndex: 'externalProduceOrderNum',
    width: 100
  },
  {
    title: '款图',
    align: 'center',
    dataIndex: 'img',
    width: 80
  },
  {
    title: '工厂名称',
    align: 'center',
    dataIndex: 'factoryName',
    width: 80
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'productName',
    width: 80
  },
  {
    title: '产品款号',
    align: 'center',
    dataIndex: 'productNum',
    width: 80
  },
  {
    title: '客户款号',
    dataIndex: 'productClientNum',
    width: 80
  },
  {
    title: '生产单总量',
    align: 'center',
    dataIndex: 'orderSum',
    width: 80
  },
  {
    title: '计划完成日期',
    align: 'center',
    dataIndex: 'planEndDate',
    width: 80,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },

  {
    title: '承诺交期',
    align: 'center',
    dataIndex: 'orderDelivery',
    width: 80,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '剩余工期',
    align: 'center',
    dataIndex: 'remainingDuration',
    width: 80
  },
  {
    title: '生产中工段',
    align: 'center',
    dataIndex: 'currentSection',
    width: 80
  },
  {
    title: '下工段物料齐套日期',
    align: 'center',
    dataIndex: 'planEndDate',
    width: 170,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '距离下工段开工日期',
    align: 'center',
    dataIndex: 'planEndDate',
    width: 170,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'operate',
    width: 100,
    fixed: 'right'
  }
]
type AddFormConfig = {
  label: string
  name: string
  value: any
  type: string
  treeData: any
  required: boolean
  treeCheckable: boolean
  placeholder: string
  disabled: boolean
  allowClear: boolean
  options: any
}
export const formItemConfig: Array<Partial<AddFormConfig>> = [
  {
    label: '模板名称',
    name: 'templateName',
    value: '',
    type: 'input',
    required: true,
    placeholder: '请输入模板名称',
    allowClear: true
  },
  {
    label: '工厂名称',
    name: 'factoryId',
    value: '',
    required: true,
    placeholder: '请输入工厂名称',
    type: 'select',
    options: []
  },
  {
    label: '工作班组',
    name: 'teamId',
    value: '',
    type: 'select',
    options: [],
    required: true,
    placeholder: '请选择工作班组'
  },
  {
    label: '备注',
    name: 'remark',
    value: '',
    type: 'input',
    placeholder: '请输入备注',
    allowClear: true
  }
]

type exportFormConfig = {
  label: string
  name: string
  field: string
  value: any
  type: string
  treeData: any
  required: boolean
  treeCheckable: boolean
  placeholder: string
  disabled: boolean
  allowClear: boolean
  options: any
  span: number
  layout: any
  min: number
}
export const exportModalConfig: Array<Partial<exportFormConfig>> = [
  {
    label: '工厂名称',
    name: 'factoryId',
    value: '',
    required: true,
    placeholder: '请输入工厂名称',
    type: 'select',
    options: [],
    allowClear: true
  },
  {
    label: '工作班组',
    name: 'teamId',
    value: '',
    type: 'multipleSelect',
    options: [],
    required: true,
    placeholder: '请选择工作班组',
    allowClear: true,
    disabled: true
  },
  {
    label: '天数',
    name: 'days',
    value: '',
    type: 'number',
    required: true,
    placeholder: '请输入天数',
    allowClear: true,
    min: 0
  }
]
