import { Input, Table } from 'antd'
import moment from 'moment'
import { ReactNode } from 'react'

const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'

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
    label: '产品名称',
    field: 'productName',
    allowClear: true,
    placeholder: '请输入产品名称',
    type: 'input',
    options: []
  },
  {
    label: '产品款号',
    field: 'productModelNo',
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
    key: 'factoryName',
    width: 200
  },
  {
    title: '生产单号',
    align: 'center',
    dataIndex: 'externalProduceOrderNum',
    key: 'externalProduceOrderNum',
    width: 200
  },
  {
    title: '客户名称',
    dataIndex: 'customerName',
    key: 'customerName'
  },
  {
    title: '客户款号',
    dataIndex: 'customerAccount',
    key: 'customerAccount'
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
    dataIndex: 'productAccount',
    key: 'productAccount'
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
    key: 'shopName',
    dataIndex: 'shopName'
  },
  {
    title: '承诺交期',
    align: 'center',
    key: 'teamName',
    dataIndex: 'teamName'
  },
  {
    title: '面料齐料日期',
    align: 'center',
    dataIndex: 'planStartTime',
    key: 'planStartTime',
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
        dataIndex: 'cropStartDate',
        align: 'center',
        key: 'cropStartDate',
        width: 100
      },
      {
        title: '结束日期',
        dataIndex: 'cropEndDate',
        align: 'center',
        key: 'cropStartDate',
        width: 100
      },
      {
        title: '完成数量',
        dataIndex: 'completedQuantity',
        align: 'center',
        key: 'completedQuantity',
        width: 100
      },
      {
        title: '完成率',
        dataIndex: 'completionRate',
        align: 'center',
        key: 'completionRate',
        width: 100
      }
    ]
  },

  {
    title: '辅料齐料日期',
    align: 'center',
    key: 'auxiliaryMaterialDate',
    dataIndex: 'auxiliaryMaterialDate',
    width: 100
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
        dataIndex: 'StartDate',
        align: 'center',
        key: 'StartDate',
        width: 100
      },
      {
        title: '结束日期',
        dataIndex: 'EndDate',
        align: 'center',
        key: 'EndDate',
        width: 100
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
        dataIndex: 'team',
        align: 'center',
        key: 'team',
        width: 100
      },
      {
        title: '人数',
        dataIndex: 'numberPersons',
        align: 'center',
        key: 'numberPersons',
        width: 100
      },
      {
        title: '开始日期',
        dataIndex: 'sewStartDate',
        align: 'center',
        key: 'sewStartDate',
        width: 100
      },
      {
        title: '结束日期',
        dataIndex: 'sewEndDate',
        align: 'center',
        key: 'sewEndDate',
        width: 100
      },
      {
        title: '完成数量',
        dataIndex: 'sewCompletedQuantity',
        align: 'center',
        key: 'sewCompletedQuantity',
        width: 100
      },
      {
        title: '完成率',
        dataIndex: 'sewCompletionRate',
        align: 'center',
        key: 'sewCompletionRate',
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
        dataIndex: 'adjustmentStartDate',
        align: 'center',
        key: 'adjustmentStartDate',
        width: 100
      },
      {
        title: '结束日期',
        dataIndex: 'adjustmentEndDate',
        align: 'center',
        key: 'adjustmentEndDate',
        width: 100
      },
      {
        title: '完成数量',
        dataIndex: 'adjustmentQuantity',
        align: 'center',
        key: 'adjustmentQuantity',
        width: 100
      },
      {
        title: '完成率',
        dataIndex: 'adjustmentCompletionRate',
        align: 'center',
        key: 'adjustmentCompletionRate',
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
