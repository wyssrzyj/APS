import { Switch } from 'antd'
import { ReactNode } from 'react'
export const searchConfig = [
  {
    label: '工厂名称',
    field: 'factoryId',
    type: 'select',
    allowClear: true,
    placeholder: '请选择工厂名称',
    options: []
  }
]
type Column = {
  title: string
  align: 'center' | 'left' | 'right'
  dataIndex: string
  width: number | string
  fixed: 'left' | 'right'
  render: ReactNode
}
export const tableColumn: Array<Partial<Column>> = [
  {
    title: '工厂名称',
    align: 'center',
    dataIndex: 'factoryId',
    width: '25%'
  },
  {
    title: '登录账号',
    align: 'center',
    dataIndex: 'loginAccount',
    width: '25%'
  },
  {
    title: '用户名称',
    align: 'center',
    dataIndex: 'username',
    width: '13%'
  },
  {
    title: '启用',
    align: 'center',
    dataIndex: 'status',
    width: '13%'
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'operate',
    fixed: 'right'
  }
]

type viewFormConfig = {
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
}

export const modalFormConfig: Array<Partial<viewFormConfig>> = [
  {
    label: '工厂名称',
    name: 'factoryId',
    field: 'factoryId',
    value: '',
    type: 'select',
    required: true,
    placeholder: '请选择工厂名称',
    options: []
  },
  {
    label: '登录账号',
    name: 'loginAccount',
    field: 'loginAccount',
    value: '',
    type: 'input',
    required: true,
    placeholder: '请输入登录账号',
    allowClear: true
  },
  {
    label: '用户名称',
    name: 'username',
    field: 'username',
    value: '',
    type: 'input',
    required: true,
    placeholder: '请输入用户密码'
  },
  // {
  //   label: '用户密码',
  //   name: 'password',
  //   field: 'password',
  //   value: '',
  //   type: 'passwordInput',
  //   required: true,
  //   placeholder: '请输入用户密码'
  // },
  {
    label: '初始密码',
    name: 'password',
    field: 'password',
    value: '',
    type: 'input',
    disabled: true,
    placeholder: '请输入初始密码'
  },
  {
    label: '启用',
    name: 'status',
    field: 'status',
    value: '',
    type: 'switch'
  }
]

export const resetModalConfig: Array<Partial<viewFormConfig>> = [
  {
    label: '系统密码',
    name: 'password',
    field: 'password',
    value: '',
    type: 'input',
    required: true,
    placeholder: '请输入系统密码'
  }
]
