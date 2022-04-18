import { TreeSelect } from 'antd'
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
    label: '工作班组',
    field: 'teamId',
    type: 'tree',
    treeData: [],
    showCheckedStrategy: SHOW_PARENT,
    allowClear: true,
    treeDefaultExpandAll: true,
    placeholder: '请选择工作班组'
  }
]
