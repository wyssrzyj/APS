/*
 * @Author: zjr
 * @Date: 2022-05-12 13:03:02
 * @LastEditTime: 2022-05-20 09:01:42
 * @Description:
 * @LastEditors: zjr
 */
import { Form, Input, Select } from 'antd'
import { cloneDeep } from 'lodash'
import { useState } from 'react'

import { CusDragTable, SearchBar } from '@/components'
import { productionSingleApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { delayTableColumns, inventoryTableColumns } from '../configs'
import styles from '../index.module.less'
const { Option } = Select
const { productionDelayList, productionChangeList } = productionSingleApis

const DynamicTable = (props: Record<string, any>) => {
  const { title, isDelay } = props
  const [form] = Form.useForm()
  const [params, setParams] = useState<Record<string, any>>({
    pageSize: 5,
    pageNum: 1,
    day: 7
  })

  const { tableChange, dataSource } = useTableChange(
    params,
    isDelay ? productionDelayList : productionChangeList
  )

  const onChange = (values) => {
    const key = Object.keys(values)[0]
    const nParams = cloneDeep(params)
    console.log(typeof values[key])
    nParams[key] = values[key]

    setParams(nParams)
  }

  const changeTableColumn = () => {
    return isDelay ? delayTableColumns : inventoryTableColumns
  }

  return (
    <div className={styles.dynamicTable}>
      <header>{title}</header>
      <Form
        form={form}
        onValuesChange={onChange}
        initialValues={params}
        layout="inline"
      >
        <Form.Item name="externalProduceOrderNum" label="生产单号">
          <Input
            style={{ width: '100%' }}
            placeholder="请输入生产单号"
            allowClear
          />
        </Form.Item>
        <Form.Item name="day" label="最近">
          <Select placeholder="请选择" style={{ width: '100px' }} allowClear>
            <Option value={7}>7天</Option>
            <Option value={14}>14天</Option>
            <Option value={30}>30天</Option>
          </Select>
        </Form.Item>
      </Form>
      <CusDragTable
        scroll={{ y: 500 }}
        key={isDelay ? 'productionDelayList' : 'productionChangeList'}
        noNeedDropdown={true}
        storageField={isDelay ? 'productionDelayList' : 'productionChangeList'}
        columns={changeTableColumn()}
        dataSource={dataSource}
        rowKey={'externalProduceOrderId'}
        onChange={tableChange}
        pagination={false}
      />
    </div>
  )
}
export default DynamicTable
