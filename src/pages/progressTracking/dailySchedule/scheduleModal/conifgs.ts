import moment from 'moment'
import { ReactNode } from 'react'

const FORMAT_DATE = 'YYYY-MM-DD HH:mm'

export const tableColumns: any = [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'sn',
    width: 100
  },
  {
    title: '所属工段',
    align: 'center',
    dataIndex: 'section',
    width: 100
  },
  {
    title: '总计划量',
    align: 'center',
    dataIndex: 'orderSum',
    width: 100
  },
  {
    title: '已完成量',
    align: 'center',
    dataIndex: 'planedAmount',
    width: 100
  },
  {
    title: '前工段计划完成日',
    align: 'center',
    dataIndex: 'preSectionPlanFinishTime',
    width: 100,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '前工段实际完成日',
    align: 'center',
    dataIndex: 'preSectionRealityFinishTime',
    width: 100,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '工段物料齐套日',
    align: 'center',
    dataIndex: 'sectionMaterialCompletenessTime',
    width: 100,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '计划开始时间',
    align: 'center',
    dataIndex: 'planStartTime',
    width: 100,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '计划完成时间',
    align: 'center',
    dataIndex: 'planEndTime',
    width: 100,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '操作',
    align: 'center',
    width: 100
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
  layout: any
}
export const formItemConfig: Array<Partial<viewFormConfig>> = [
  {
    label: '生产单号',
    name: 'externalProduceOrderNum',
    field: 'externalProduceOrderNum',
    value: '',
    type: 'input',
    disabled: true,
    required: true,
    placeholder: '请输入模板名称',
    allowClear: true,
    span: 12
  },
  {
    label: '工厂名称',
    name: 'factoryName',
    field: 'factoryName',
    value: '',
    required: true,
    placeholder: '请选择工厂名称',
    type: 'input',
    disabled: true,
    span: 12
    // options: []
  },

  {
    label: '产品名称',
    name: 'productName',
    field: 'productName',
    value: '',
    type: 'input',
    disabled: true,
    placeholder: '请输入产品名称',
    allowClear: true,
    span: 12
  },
  {
    label: '产品款号',
    name: 'productNum',
    field: 'productNum',
    value: '',
    type: 'input',
    disabled: true,
    placeholder: '请输入产品款号',
    allowClear: true,
    span: 12
  },
  {
    label: '生产量',
    name: 'productionAmount',
    field: 'productionAmount',
    value: '',
    type: 'input',
    disabled: true,
    placeholder: '请输入生产量',
    allowClear: true,
    span: 12
  },
  {
    label: '工段名称',
    name: 'section',
    field: 'section',
    value: '',
    type: 'input',
    disabled: true,
    placeholder: '请输入工段名称',
    allowClear: true,
    span: 12
  },
  {
    label: '车间名称',
    name: 'shopName',
    field: 'shopName',
    value: '',
    type: 'input',
    disabled: true,
    // options: [],
    required: true,
    placeholder: '请选择车间名称',
    span: 12
  },
  {
    label: '班组名称',
    name: 'teamName',
    field: 'teamName',
    value: '',
    type: 'input',
    disabled: true,
    // options: [],
    required: true,
    placeholder: '请选择班组名称',
    span: 12
  },
  {
    label: '计划开始时间',
    name: 'planStartTime',
    field: 'planStartTime',
    value: '',
    type: 'datePicker',
    disabled: true,
    placeholder: '请选择计划开始时间',
    allowClear: true,
    span: 12
  },
  {
    label: '计划结束时间',
    name: 'planEndTime',
    field: 'planEndTime',
    value: '',
    type: 'datePicker',
    disabled: true,
    placeholder: '请选择计划结束时间',
    allowClear: true,
    span: 12
  }
]
