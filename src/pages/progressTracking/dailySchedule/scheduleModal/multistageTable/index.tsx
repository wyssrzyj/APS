/*
 * @Author: lyj
 * @Date: 2022-06-17 08:41:26
 * @LastEditTime: 2022-07-01 10:30:05
 * @Description:
 * @LastEditors: lyj
 */
import { StockOutlined } from '@ant-design/icons'
import { Input, Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { productionWarning } from '@/recoil/apis'

import styles from './index.module.less'
import LineChart from './LineChart'
const TableDome = (props) => {
  const { onChang, current } = props
  const { getDailyScheduleList } = productionWarning

  const [titleData, setTitleData] = useState([])

  const [newColumns, setNewColumns] = useState([])
  const [interfaceData, setInterfaceData] = useState<any>([])
  const [list, setList] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selected, setSelected] = useState<any>()

  const columns: any = [
    {
      title: '班组111',
      align: 'center',
      dataIndex: 'teamName',
      fixed: 'left',
      width: 150,
      key: 'teamName',
      render: (_text, v) => {
        return (
          <div
            className={styles.lineChart}
            onClick={() => {
              setIsModalVisible(true)
              setSelected(v)
            }}
          >
            <div>{_text}</div>
            <div className={styles.lineChartRight}>
              <StockOutlined />
            </div>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    api()
  }, [current])

  const api = async () => {
    const res = await getDailyScheduleList({
      assignmentId: current.assignmentId
    })
    setInterfaceData(res)

    const titleData = res.planDateTimeList //接口数据
    const data = res.dailyScheduleVOS
    console.log(data)

    setList(data) //先渲染数据在渲染格式 防止拿不到数据
    setTitleData(titleData)
  }
  //获取计划、完成数量
  const getQuantity = (title: any, row: any, type: any) => {
    const filterDate = row.detailVOS.filter(
      (item) => item.planDateTimeStr === title
    )
    if (!isEmpty(filterDate)) {
      if (type === 'planAmount') {
        return filterDate[0].planAmount
      }
      if (type === 'completedAmount') {
        return filterDate[0].completedAmount
      }
    } else {
      return 0
    }
  }
  const available = (title: any, row) => {
    const filterDate = row.detailVOS.filter(
      (item) => item.planDateTimeStr === title
    )
    if (!isEmpty(filterDate)) {
      return !filterDate[0].planDateTimeType
    } else {
      return true
    }
  }

  //更新数据
  const quantity = (e, v, name, type) => {
    const current = list.filter((item) => item.id === v.id)[0] //获取当前行

    if (!isEmpty(current.detailVOS)) {
      const currentFilter = current.detailVOS.filter(
        (item) => item.planDateTimeStr === name
      )[0]

      currentFilter[type] = Number(e)

      const subscript = current.detailVOS.findIndex((item) => {
        return item.id === currentFilter.id
      })

      if (subscript !== -1) {
        current.detailVOS.splice(subscript, 1, currentFilter)
        //更新完当前行数据

        const index = list.findIndex((item) => {
          return item.id === v.id
        })
        if (index !== -1) {
          //替换当前行数据
          list.splice(index, 1, current)
          setList([...list])
        }
      }
    }
  }
  useEffect(() => {
    if (!isEmpty(titleData)) {
      const sizeList = []
      titleData.forEach((item: any, index) => {
        sizeList.push({
          title: item,
          align: 'center',
          children: [
            {
              title: '计划数量',
              dataIndex: 'name',
              align: 'center',
              key: 'name',
              width: 100,
              render: (_s, row) => (
                <>
                  <Input
                    type="number"
                    disabled={available(item, row)}
                    min={0}
                    defaultValue={getQuantity(item, row, 'planAmount')}
                    onBlur={(e) => {
                      quantity(e.target.value, row, item, 'planAmount')
                    }}
                  />
                </>
              )
            },

            {
              title: '完成数量',
              dataIndex: 'age',
              align: 'center',
              key: 'age',
              width: 100,
              render: (_s, row) => (
                <>
                  <Input
                    type="number"
                    disabled={available(item, row)}
                    min={0}
                    defaultValue={getQuantity(item, row, 'completedAmount')}
                    onBlur={(e) => {
                      quantity(e.target.value, row, item, 'completedAmount')
                    }}
                  />
                </>
              )
            }
          ]
        })
      })
      const index = columns.findIndex(
        (item: { dataIndex: string }) => item.dataIndex === 'teamName'
      )
      columns.splice(index + 1, 0, sizeList)
      setNewColumns(columns.flat(Infinity))
    }
  }, [titleData])

  useEffect(() => {
    //传递给外部

    const CloneInterfaceData = cloneDeep(interfaceData)
    CloneInterfaceData.dailyScheduleVOS = list
    onChang && onChang(CloneInterfaceData)
  }, [list, interfaceData])
  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      <Table
        scroll={{ y: 800 }}
        columns={newColumns}
        dataSource={list}
        bordered
        size="middle"
      />
      {isModalVisible && (
        <Modal
          width={1000}
          centered={true}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <LineChart selected={selected} />
        </Modal>
      )}
    </>
  )
}

export default TableDome
