/*
 * @Author: zjr
 * @Date: 2022-05-12 13:03:02
 * @LastEditTime: 2022-06-20 08:49:14
 * @Description:
 * @LastEditors: lyj
 */
import { Form, Input, Select } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'

import { CusDragTable, SearchBar } from '@/components'
import { commonApis, productionSingleApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'
const { factoryList } = commonApis
import { delayTableColumns, inventoryTableColumns } from '../configs'
import styles from '../index.module.less'
const { Option } = Select
const { productionDelayList, productionChangeList } = productionSingleApis
const DynamicTable = (props: Record<string, any>) => {
  const { title, isDelay } = props
  const [facList, setFacList] = useState([])
  const [selectOptions, setSelectOptions] = useState([])
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
    console.log(typeof values[key])
    nParams[key] = values[key]

    setParams(nParams)
  }

  const changeTableColumn = () => {
    return isDelay ? delayTableColumns : inventoryTableColumns
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
        <Form.Item name="day" label="最近">
          <Select
            placeholder="请选择"
            style={{ width: '100px' }}
            allowClear
            className={styles.mb18}
          >
            <Option value={7}>7天</Option>
            <Option value={14}>14天</Option>
            <Option value={30}>30天</Option>
          </Select>
        </Form.Item>
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
