import { Checkbox, DatePicker, InputNumber, message, Modal, Table } from 'antd'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { saveEfficiency } from '@/recoil/actualProduction/api'

import { editTableColumn } from '../config'
const FORMAT_DATE = 'YYYY-MM-DD HH:mm'
function EditActualProduction(props: Record<string, any>) {
  const { callback, visible, tableData } = props
  const [dataSource, setDataSource] = useState()

  useEffect(() => {
    setDataSource(tableData)
  }, [tableData])

  const onValChange = (value: any, type: any, index: any) => {
    const nData: any = cloneDeep(dataSource)
    const changeRowInfo = nData[index]
    changeRowInfo[type] = value

    if (type === 'completedAmount') {
      changeRowInfo.isFinished = Boolean(
        changeRowInfo.completedAmount >= changeRowInfo.productionAmount
      )
    }
    nData[index][type] = value
    setDataSource(nData)
  }

  const handleOk = async () => {
    const confirmData: any = cloneDeep(dataSource)
    if (
      confirmData.every((item) => item.realityStartTime && item.realityEndTime)
    ) {
      confirmData.forEach((item: any) => {
        item.realityStartTime = moment(item.realityStartTime).valueOf()
        item.realityEndTime = moment(item.realityEndTime).valueOf()
        item.isFinished = item.isFinished ? 1 : 0
      })
      const res: any = await saveEfficiency(confirmData)
      if (res.success) {
        message.success('操作成功')
        callback(false, true)
      }
    } else {
      message.warning('实际开始时间与实际结束时间必填')
    }
  }

  const disabledStartDate = (current: any, endTime: any) => {
    return current && endTime && current > endTime
  }

  const disabledEndDate = (current: any, startTime: any) => {
    return current && startTime && current < startTime
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
        item.render = (text: any, record: any, index: number) => {
          return (
            <DatePicker
              value={text}
              showTime
              format="YYYY-MM-DD HH:mm"
              disabledDate={(current) =>
                disabledStartDate(current, record.realityEndTime)
              }
              onChange={(value) =>
                onValChange(value, 'realityStartTime', index)
              }
            ></DatePicker>
          )
        }
      }
      if (item.dataIndex === 'realityEndTime') {
        item.render = (text: any, record: any, index: number) => {
          return (
            <DatePicker
              showTime
              value={text}
              format="YYYY-MM-DD HH:mm"
              disabledDate={(current) =>
                disabledEndDate(current, record.realityStartTime)
              }
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
      onOk={handleOk}
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
