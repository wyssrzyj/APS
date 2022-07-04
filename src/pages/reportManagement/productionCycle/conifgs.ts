import { Input, Table } from 'antd'
import moment from 'moment'
import { ReactNode } from 'react'

const FORMAT_DATE = 'YYYY-MM-DD'

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
  }
]

export const tableColumns: any = [
  {
    title: '工厂名称',
    align: 'center',
    dataIndex: 'factoryName',
    key: 'factoryName'
  },
  {
    title: '生产单号',
    align: 'center',
    dataIndex: 'externalProduceOrderNum',
    key: 'externalProduceOrderNum'
  },
  {
    title: '客户款号',
    dataIndex: 'productClientNum',
    key: 'productClientNum'
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'productName',
    key: 'productName'
  },
  {
    title: '产品款号',
    align: 'center',
    dataIndex: 'productNum',
    key: 'productNum'
  },
  {
    title: '款图',
    align: 'center',
    dataIndex: 'img',
    key: 'img',
    width: 200
  },

  {
    title: '订单数量',
    align: 'center',
    key: 'orderSum',
    dataIndex: 'orderSum'
  },
  {
    title: '承诺交期',
    align: 'center',
    key: 'committedDeliveryDate',
    dataIndex: 'committedDeliveryDate',
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },
  {
    title: '面料齐料日期',
    align: 'center',
    dataIndex: 'fabricPrepareTime',
    key: 'fabricPrepareTime',
    width: 170,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },

  {
    title: '裁剪',
    align: 'center',
    key: 'crop',
    dataIndex: 'crop',
    width: 100,
    children: [
      {
        title: '开始日期',
        dataIndex: 'tailoringStartDate',
        align: 'center',
        key: 'tailoringStartDate',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '结束日期',
        dataIndex: 'tailoringEndDate',
        align: 'center',
        key: 'tailoringEndDate',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '完成数量',
        dataIndex: 'tailoringCompletedAmount',
        align: 'center',
        key: 'tailoringCompletedAmount',
        width: 100
      },
      {
        title: '完成率',
        dataIndex: 'tailoringCompletedRate',
        align: 'center',
        key: 'tailoringCompletedRate',
        width: 100
      }
    ]
  },

  {
    title: '辅料齐料日期',
    align: 'center',
    key: 'accessoryPrepareTime',
    dataIndex: 'accessoryPrepareTime',
    width: 100,
    render: (date: moment.MomentInput) =>
      date ? moment(date).format(FORMAT_DATE) : null
  },

  {
    title: '绣印花染色',
    align: 'center',
    key: 'productionSection',
    dataIndex: 'productionSection',
    width: 100,
    children: [
      {
        title: '开始日期',
        dataIndex: 'outsourceStartDate',
        align: 'center',
        key: 'outsourceStartDate',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '结束日期',
        dataIndex: 'outsourceEndDate',
        align: 'center',
        key: 'outsourceEndDate',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      }
    ]
  },
  {
    title: '缝制',
    align: 'center',
    key: 'sew',
    dataIndex: 'sew',
    width: 100,
    children: [
      {
        title: '班组',
        dataIndex: 'sewingTeam',
        align: 'center',
        key: 'sewingTeam',
        width: 100
      },
      {
        title: '人数',
        dataIndex: 'sewingWorkernum',
        align: 'center',
        key: 'sewingWorkernum',
        width: 100
      },
      {
        title: '开始日期',
        dataIndex: 'sewingStartDate',
        align: 'center',
        key: 'sewingStartDate',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '结束日期',
        dataIndex: 'sewingEndDate',
        align: 'center',
        key: 'sewingEndDate',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '完成数量',
        dataIndex: 'sewingCompletedAmount',
        align: 'center',
        key: 'sewingCompletedAmount',
        width: 100
      },
      {
        title: '完成率',
        dataIndex: 'sewingCompletedRate',
        align: 'center',
        key: 'sewingCompletedRate',
        width: 100
      }
    ]
  },
  {
    title: '后整',
    align: 'center',
    key: 'adjustment',
    dataIndex: 'adjustment',
    width: 100,
    children: [
      {
        title: '开始日期',
        dataIndex: 'trimStartDate',
        align: 'center',
        key: 'trimStartDate',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '结束日期',
        dataIndex: 'trimEndDate',
        align: 'center',
        key: 'trimEndDate',
        width: 100,
        render: (date: moment.MomentInput) =>
          date ? moment(date).format(FORMAT_DATE) : null
      },
      {
        title: '完成数量',
        dataIndex: 'trimCompletedAmount',
        align: 'center',
        key: 'trimCompletedAmount',
        width: 100
      },
      {
        title: '完成率',
        dataIndex: 'trimCompletedRate',
        align: 'center',
        key: 'trimCompletedRate',
        width: 100
      }
    ]
  }
  // {
  //   title: '操作',
  //   align: 'center',
  //   dataIndex: 'operate',
  //   width: 200,
  //   fixed: 'right'
  // }
]
