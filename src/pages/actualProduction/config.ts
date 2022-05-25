import moment from 'moment'
import { number } from 'prop-types'
import { ReactNode } from 'react'

const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'
export const searchConfig = [
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
    label: '所属工段',
    field: 'section',
    type: 'select',
    allowClear: true,
    placeholder: '请选择所属工段',
    option: []
  },
  {
    label: '生产状态',
    field: 'isFinished',
    type: 'select',
    allowClear: true,
    placeholder: '请选择生产状态',
    options: [
      { label: '未完成', value: 0 },
      { label: '已完成', value: 1 }
    ]
  },
  {
    label: '延期状态',
    field: 'delay',
    type: 'select',
    allowClear: true,
    placeholder: '请选择延期状态',
    options: [
      { label: '未延期', value: 0 },
      { label: '已延期', value: 1 }
    ]
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

export const tableColumn: Array<Partial<Column>> = [
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
    title: '工段名称',
    align: 'center',
    dataIndex: 'section',
    width: 100
  },
  {
    title: '生产量',
    align: 'center',
    dataIndex: 'orderSum',
    width: 100
  },
  {
    title: '完成量',
    align: 'center',
    dataIndex: 'completedAmount',
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
    title: '实际开始时间',
    align: 'center',
    dataIndex: 'realityStartTime',
    width: 170,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '实际结束时间',
    align: 'center',
    dataIndex: 'realityEndTime',
    width: 170,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '生产状态',
    align: 'center',
    dataIndex: 'isFinished',
    width: 90,
    fixed: 'right',
    render: (text?: number) => {
      return text === 0 ? '未完成' : text === 1 ? '已完成' : '/'
    }
  },
  {
    title: '延期状态',
    align: 'center',
    dataIndex: 'delay',
    width: 90,
    fixed: 'right',
    render: (text?: number) => {
      return text === 0 ? '未延期' : text === 1 ? '已延期' : '/'
    }
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'operate',
    width: 90,
    fixed: 'right'
  }
]

export const editTableColumn: any = [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'index',
    width: 60,
    fixed: 'left',
    render: (_text: any, _record: Record<string, any>, index: number) => {
      return index + 1
    }
  },
  {
    title: '生产单号',
    align: 'center',
    dataIndex: 'externalProduceOrderNum',
    width: 200
  },
  {
    title: '产品',
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
    title: '生产单总量',
    align: 'center',
    dataIndex: 'orderSum',
    width: 110
  },
  {
    title: '生产量',
    align: 'center',
    dataIndex: 'productionAmount',
    width: 100
  },
  {
    title: '完成量',
    align: 'center',
    dataIndex: 'completedAmount',
    width: 100
  },
  {
    title: '工作车间',
    align: 'center',
    dataIndex: 'shopName',
    width: 200
  },
  {
    title: '工作班组',
    align: 'center',
    dataIndex: 'teamName',
    width: 150
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
    title: '实际开始时间',
    align: 'center',
    dataIndex: 'realityStartTime',
    width: 190
  },
  {
    title: '实际结束时间',
    align: 'center',
    dataIndex: 'realityEndTime',
    width: 190
  },
  {
    title: '工作已完成',
    align: 'center',
    dataIndex: 'isFinished',
    width: 110,
    fixed: 'right'
  }
]
