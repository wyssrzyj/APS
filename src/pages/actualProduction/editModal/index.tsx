import { Checkbox, DatePicker, InputNumber, Modal, Table } from 'antd'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'

import { editTableColumn } from '../config'
function EditActualProduction(props: Record<string, any>) {
  const { callback, visible, tableData } = props
  const [dataSource, setDataSource] = useState()

  useEffect(() => {
    setDataSource(tableData)
  }, [tableData])

  const onValChange = (value: any, type: any, index: any) => {
    console.log('🚀 ~ file: index.tsx ~ line 15 ~ onValChange ~ value', value)
    console.log('🚀 ~ file: index.tsx ~ line 20 ~ onValChange ~ index', index)
    console.log('🚀 ~ file: index.tsx ~ line 20 ~ onValChange ~ type', type)

    const nData: any = cloneDeep(dataSource)
    const changeRowInfo = nData[index]
    changeRowInfo[type] = value

    if (type === 'completedAmount') {
      changeRowInfo.isFinished = Boolean(
        changeRowInfo.completedAmount >= changeRowInfo.productionAmount
      )
    }
    nData[index][type] = value
    // if(type === )
    setDataSource(nData)
  }

  const timePickerOptions = {
    format: 'HH:mm'
  }

  const changeTableColumn: any = () => {
    editTableColumn.map((item: any) => {
      if (item.dataIndex === 'completedAmount') {
        item.render = (text: any, _record: any, index: number) => {
          return (
            <InputNumber
              style={{ width: '100%' }}
              value={text}
              min={0}
              precision={0}
              onChange={(value) => onValChange(value, 'completedAmount', index)}
            ></InputNumber>
          )
        }
      }
      if (item.dataIndex === 'realityStartTime') {
        item.render = (text: any, _record: any, index: number) => {
          return (
            <DatePicker
              value={text}
              showTime
              onChange={(value) =>
                onValChange(value, 'realityStartTime', index)
              }
            ></DatePicker>
          )
        }
      }
      if (item.dataIndex === 'realityEndTime') {
        item.render = (text: any, _record: any, index: number) => {
          return (
            <DatePicker
              showTime
              value={text}
              onChange={(value) => onValChange(value, 'realityEndTime', index)}
            ></DatePicker>
          )
        }
      }
      if (item.dataIndex === 'isFinished') {
        item.render = (text: any, _record: any, index: number) => {
          return (
            <Checkbox
              checked={Boolean(text)}
              onChange={(e) =>
                onValChange(e.target.checked, 'isFinished', index)
              }
            ></Checkbox>
          )
        }
      }
    })
    return editTableColumn
  }
  return (
    <Modal
      title="工作实绩明细"
      visible={visible}
      width={1000}
      onCancel={() => callback(false)}
    >
      <Table
        rowKey={'id'}
        pagination={false}
        columns={changeTableColumn()}
        dataSource={dataSource}
        scroll={{ x: 800 }}
      ></Table>
    </Modal>
  )
}
export default EditActualProduction
