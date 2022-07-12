/*
 * @Author: zjr
 * @Date: 2022-05-12 13:03:02
 * @LastEditTime: 2022-07-12 08:58:26
 * @Description:
 * @LastEditors: lyj
 */
import { Form, Input, InputNumber, Select } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'

import { CusDragTable, SearchBar } from '@/components'
import { commonApis, productionSingleApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'
const { factoryList } = commonApis
import {
  delayTableColumns,
  durationQuery,
  inventoryTableColumns
} from '../configs'
import styles from '../index.module.less'
const { Option } = Select
const { productionDelayList, productionChangeList, listRemainingDuration } =
  productionSingleApis
const DynamicTable = (props: Record<string, any>) => {
  const { title, isDelay, type } = props
  const [facList, setFacList] = useState([])
  const [selectOptions, setSelectOptions] = useState([])
  const [form] = Form.useForm()
  const [params, setParams] = useState<Record<string, any>>({
    pageSize: 5,
    pageNum: 1
  })
  const { tableChange, dataSource } = useTableChange(
    params,
    type === 'productDelayTable'
      ? productionDelayList
      : type === 'productChangeTable'
      ? productionChangeList
      : listRemainingDuration
  )
  useEffect(() => {
    ;(async () => {
      await getFacList()
    })()
  }, [])

  useEffect(() => {
    if (!isEmpty(facList)) {
      const options = facList.map((d) => (
        <Option key={d.id}>{d.deptName}</Option>
      ))
      setSelectOptions(options)
    }
  }, [facList])

  const getFacList = async () => {
    try {
      const res: any = await factoryList()
      const { data = [] } = res
      setFacList(data)
    } catch (err) {}
  }

  const onChange = (values) => {
    const key = Object.keys(values)[0]
    const nParams = cloneDeep(params)
    nParams[key] = values[key]
    setParams(nParams)
  }

  const changeTableColumn = () => {
    return type === 'productDelayTable'
      ? delayTableColumns
      : type === 'productChangeTable'
      ? inventoryTableColumns
      : durationQuery
  }

  return (
    <div>
      <header>{title}</header>
      <Form
        form={form}
        onValuesChange={onChange}
        initialValues={params}
        layout="inline"
      >
        <Form.Item name="factoryId" label="工厂名称" className={styles.mb18}>
          <Select placeholder="请选择" style={{ width: '150px' }} allowClear>
            {selectOptions}
          </Select>
        </Form.Item>
        <Form.Item
          name="externalProduceOrderNum"
          label="生产单号"
          className={styles.mb18}
        >
          <Input
            style={{ width: '100%' }}
            placeholder="请输入生产单号"
            allowClear
          />
        </Form.Item>
        <Form.Item name="day" label="剩余">
          <InputNumber
            addonAfter="天"
            min={1}
            className={styles.durationQuery}
          />
        </Form.Item>
        {/* {type === 'durationQuery' ? (
          <Form.Item name="day" label="剩余">
            <InputNumber addonAfter="天" className={styles.durationQuery} />
          </Form.Item>
        ) : (
         
        )} */}
      </Form>
      <div className={styles.dynamicTable}>
        <CusDragTable
          scroll={{ x: 420, y: 'calc(100vh - 605px)' }}
          key={isDelay ? 'productionDelayList' : 'productionChangeList'}
          noNeedDropdown={true}
          noBtn={true}
          storageField={
            isDelay ? 'productionDelayList' : 'productionChangeList'
          }
          columns={changeTableColumn()}
          dataSource={dataSource}
          rowKey={'externalProduceOrderId'}
          onChange={tableChange}
          pagination={false}
        />
      </div>
    </div>
  )
}
export default DynamicTable
