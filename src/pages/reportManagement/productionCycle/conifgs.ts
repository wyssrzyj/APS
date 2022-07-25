import { Input, Table } from 'antd'
import moment from 'moment'
import { ReactNode } from 'react'

const FORMAT_DATE = 'YYYY-MM-DD'

export const easySearch = [
  {
    label: '客户款号',
    field: 'productClientNum',
    type: 'input',
    allowClear: true,
    placeholder: '请输入客户款号'
  },
  {
    label: '生产单号',
    field: 'produceOrderNum',
    type: 'input',
    allowClear: true,
    placeholder: '请输入生产单号'
  }
]

export const searchConfigs = [
  {
    label: '客户款号',
    field: 'productClientNum',
    type: 'input',
    allowClear: true,
    placeholder: '请输入客户款号'
  },
  // {
  //   label: '工厂名称',
  //   field: 'factoryId',
  //   type: 'select',
  //   width: 250,
  //   allowClear: true,
  //   placeholder: '请选择工厂名称',
  //   options: []
  // },
  {
    label: '生产单号',
    field: 'produceOrderNum',
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
    label: '计划完成时间',
    field: 'planEndDate',
    type: 'rangePicker',
    width: 250,
    allowClear: true,
    placeholder: '请选择生产状态',
    options: []
  }
]

export const tableColumns: any = [
  {
    title: '工厂名称',
    align: 'center',
    dataIndex: 'factoryName',
    fixed: 'left',
    width: 100
  },
  {
    title: '生产单号',
    align: 'center',
    dataIndex: 'externalProduceOrderNum',
    fixed: 'left',

    width: 100
  },
  {
    title: '客户款号',
    dataIndex: 'productClientNum',
    fixed: 'left',
    align: 'center',
    width: 100
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'productName',
    fixed: 'left',
    width: 100
  },
  {
    title: '产品款号',
    align: 'center',
    dataIndex: 'productNum',
    fixed: 'left',
    width: 100
  },
  {
    title: '款图',
    align: 'center',
    fixed: 'left',
    dataIndex: 'img',
    width: 100
  },

  {
    title: '订单数量',
    align: 'center',
    fixed: 'left',
    dataIndex: 'orderSum',
    width: 100
  },
  {
    title: '承诺交期',
    fixed: 'left',
    align: 'center',
    dataIndex: 'committedDeliveryDate',
    width: 100,

    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '面料齐料日期',
    align: 'center',
    dataIndex: 'fabricPrepareTime',
    width: 100,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '辅料齐料日期',
    align: 'center',
    dataIndex: 'accessoryPrepareTime',
    width: 100,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },

  {
    title: '裁剪',
    align: 'center',
    dataIndex: 'crop',
    width: 100,
    children: [
      {
        title: '开始日期',
        dataIndex: 'tailoringStartDate',
        align: 'center',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '结束日期',
        dataIndex: 'tailoringEndDate',
        align: 'center',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '完成数量',
        dataIndex: 'tailoringCompletedAmount',
        align: 'center',
        width: 100,
        render: (date) => (date === 0 ? '' : date)
      },
      {
        title: '完成率',
        dataIndex: 'tailoringCompletedRate',
        align: 'center',
        width: 100,
        render: (date) => (date > 0 ? `${Number(date)}%` : '')
      }
    ]
  },

  {
    title: '绣印花染色',
    align: 'center',
    dataIndex: 'productionSection',
    width: 100,
    children: [
      {
        title: '开始日期',
        dataIndex: 'outsourceStartDate',
        align: 'center',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '结束日期',
        dataIndex: 'outsourceEndDate',
        align: 'center',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      }
    ]
  },
  {
    title: '缝制',
    align: 'center',
    dataIndex: 'sew',
    width: 100,
    children: [
      {
        title: '班组',
        dataIndex: 'sewingTeam',
        align: 'center',
        width: 100
      },
      {
        title: '人数',
        dataIndex: 'sewingWorkernum',
        align: 'center',
        width: 100
      },
      {
        title: '开始日期',
        dataIndex: 'sewingStartDate',
        align: 'center',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '结束日期',
        dataIndex: 'sewingEndDate',
        align: 'center',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '完成数量',
        dataIndex: 'sewingCompletedAmount',
        align: 'center',
        width: 100,
        render: (date) => (date === 0 ? '' : date)
      },
      {
        title: '完成率',
        dataIndex: 'sewingCompletedRate',
        align: 'center',
        width: 100,
        render: (date) => (date > 0 ? `${Number(date)}%` : '')
      }
    ]
  },
  {
    title: '后整',
    align: 'center',
    dataIndex: 'adjustment',
    width: 100,
    children: [
      {
        title: '开始日期',
        dataIndex: 'trimStartDate',
        align: 'center',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '结束日期',
        dataIndex: 'trimEndDate',
        align: 'center',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '完成数量',
        dataIndex: 'trimCompletedAmount',
        align: 'center',
        width: 100,
        render: (date) => (date === 0 ? '' : date)
      },
      {
        title: '完成率',
        dataIndex: 'trimCompletedRate',
        align: 'center',
        width: 100,
        render: (date) => (date > 0 ? `${Number(date)}%` : '')
      }
    ]
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
    width: 200,
    fixed: 'right'
  }
]
