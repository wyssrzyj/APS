import moment from 'moment'
import { ReactNode } from 'react'

const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'
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
    width: 250,
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
    label: '所属工段',
    field: 'section',
    allowClear: true,
    placeholder: '请选择所属工段',
    width: 250,
    type: 'select',
    options: []
  },
  {
    label: '计划开始时间',
    field: 'startTime',
    type: 'rangePicker',
    allowClear: true,
    placeholder: '请选择计划开始时间'
    // showTime: true
  },
  {
    label: '计划结束时间',
    field: 'endTime',
    allowClear: true,

    placeholder: '请选择计划结束时间',
    type: 'rangePicker'
    // showTime: true
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
    title: '生产单号',
    align: 'center',
    dataIndex: 'externalProduceOrderNum',
    width: 200
  },
  {
    title: '工厂名称',
    align: 'center',
    dataIndex: 'factoryName',
    width: 200
  },
  {
    title: '车间名称',
    align: 'center',
    dataIndex: 'shopName',
    width: 200
  },
  {
    title: '班组名称',
    align: 'center',
    dataIndex: 'teamName',
    width: 200
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'productName',
    width: 250
  },
  {
    title: '产品款号',
    align: 'center',
    dataIndex: 'productNum',
    width: 200
  },
  {
    title: '生产量',
    align: 'center',
    dataIndex: 'productionAmount',
    width: 100
  },
  {
    title: '工段名称',
    align: 'center',
    dataIndex: 'section',
    width: 100
  },
  {
    title: '计划开始时间',
    align: 'center',
    dataIndex: 'planStartTime',
    width: 170,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '计划结束时间',
    align: 'center',
    dataIndex: 'planEndTime',
    width: 170,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'operate',
    width: 200,
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

  // {
  //   label: '备注',
  //   name: 'remark',
  //   field: 'remark',
  //   value: '',
  //   type: 'textarea',
  //   disabled: true,
  //   placeholder: '请输入备注',
  //   allowClear: true,
  //   span: 24,
  //   layout: {
  //     labelCol: { span: '3' },
  //     wrapperCol: { span: '21' }
  //   }
  // }
]
