import { TreeSelect } from 'antd'
import { ReactNode } from 'react'
const { SHOW_PARENT } = TreeSelect

export const searchConfigs = [
  {
    label: '模板名称',
    field: 'templateName',
    type: 'input',
    allowClear: true,
    placeholder: '请输入模板名称'
  },
  {
    label: '工厂名称',
    field: 'factoryId',
    type: 'select',
    allowClear: true,
    placeholder: '请选择工厂名称',
    options: []
  },
  {
    label: '工作班组',
    field: 'teamId',
    allowClear: true,
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
    title: '模板名称',
    align: 'center',
    dataIndex: 'templateName',
    width: 150
  },
  {
    title: '工作班组',
    align: 'center',
    dataIndex: 'teamName',
    width: 150
  },
  {
    title: '初始效率',
    align: 'center',
    dataIndex: 'startEfficiency',
    width: 150
  },
  {
    title: '最终效率',
    align: 'center',
    dataIndex: 'finallyEfficiency',
    width: 200
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
    width: 200
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'operate',
    fixed: 'right',
    width: 200
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
