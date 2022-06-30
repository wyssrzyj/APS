/*
 * @Author: lyj
 * @Date: 2022-06-29 17:32:33
 * @LastEditTime: 2022-06-29 17:59:32
 * @Description:
 * @LastEditors: lyj
 */
import moment from 'moment'
import { ReactNode } from 'react'

const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'

export const searchConfigs = [
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
    title: '款图',
    align: 'center',
    dataIndex: 'img',
    key: 'img',
    width: 200
  },
  {
    title: '产品款号',
    align: 'center',
    dataIndex: 'productNum',
    key: 'productNum',
    width: 200
  },
  {
    title: '产品名称',
    align: 'center',
    dataIndex: 'productName',
    key: 'productName',
    width: 250
  },

  {
    title: '班组',
    dataIndex: 'customerAccount',
    key: 'customerAccount'
  }
]
