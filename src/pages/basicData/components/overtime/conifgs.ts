import { TreeSelect } from 'antd'
import { ReactNode } from 'react'
const { SHOW_PARENT } = TreeSelect

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
    label: '工作班组',
    field: 'teamId',
    allowClear: true,
    width: 250,
    placeholder: '请选择工作班组',
    type: 'select',
    options: []
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
export const tableColumns: Array<Partial<Column>> = [
  {
    title: '工厂名称',
    align: 'center',
    dataIndex: 'factoryName'
  },
  {
    title: '班组名称',
    align: 'center',
    dataIndex: 'teamName'
  },
  {
    title: '加班日期',
    align: 'center',
    dataIndex: 'date'
  },
  {
    title: '工作时间',
    align: 'center',
    dataIndex: 'times'
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark'
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'address'
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
