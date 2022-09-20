/*
 * @Author: lyj
 * @Date: 2022-06-29 17:32:33
 * @LastEditTime: 2022-08-05 10:36:17
 * @Description:
 * @LastEditors: lyj
 */
import moment from 'moment'
import { ReactNode } from 'react'

const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'

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
  //   allowClear: true,
  //   placeholder: '请选择工厂名称',
  //   options: [],
  //   width: 250
  // },
  {
    label: '生产单号',
    field: 'produceOrderNum',
    type: 'input',
    allowClear: true,
    width: 250,
    placeholder: '请输入生产单号'
  },
  {
    label: '产品名称',
    width: 250,
    field: 'productName',
    allowClear: true,
    placeholder: '请输入产品名称',
    type: 'input',
    options: []
  },
  {
    label: '产品款号',
    field: 'productNum',
    width: 250,
    allowClear: true,
    placeholder: '请输入产品款号',
    type: 'input',
    options: []
  },
  {
    label: '工厂名称',
    field: 'factoryId',
    width: 250,
    allowClear: true,
    placeholder: '请选择工厂名称',
    type: 'select',
    options: []
  },
  {
    label: '班组',
    field: 'teamId',
    width: 250,
    allowClear: true,
    placeholder: '请选择班组',
    type: 'select',
    options: []
  }
]

export const tableColumns: any = [
  {
    title: '工厂名称',
    align: 'center',
    dataIndex: 'factoryName',
    key: 'factoryName',
    width: 100,
    fixed: 'left'
  },
  {
    title: '生产单号',
    align: 'center',
    dataIndex: 'externalProduceOrderNum',
    key: 'externalProduceOrderNum',
    fixed: 'left',
    width: 100
  },
  {
    title: '款图',
    fixed: 'left',
    dataIndex: 'img',
    key: 'img',
    width: 100,
    align: 'center'
  },
  {
    title: '产品款号',
    align: 'center',
    dataIndex: 'productNum',
    fixed: 'left',
    key: 'productNum',
    width: 100
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'productName',
    fixed: 'left',
    key: 'productName',
    width: 100
  },
  {
    title: '客户款号',
    align: 'center',
    dataIndex: 'productClientNum',
    fixed: 'left',
    key: 'productClientNum',
    width: 100
  },

  {
    title: '班组',
    fixed: 'left',
    align: 'center',
    dataIndex: 'teamName',
    width: 100,
    key: 'teamName'
  }
]
