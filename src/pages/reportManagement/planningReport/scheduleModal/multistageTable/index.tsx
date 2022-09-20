/*
 * @Author: lyj
 * @Date: 2022-06-17 08:41:26
 * @LastEditTime: 2022-06-21 15:12:30
 * @Description:
 * @LastEditors: lyj
 */
import { Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
// plannedNumber  计划数
//  Completed quantity  完成数量

const TableDome = () => {
  const columns: any = [
    {
      title: '班组',
      align: 'center',
      dataIndex: 'materialName',
      fixed: 'left',
      width: 150,
      key: 'materialName'
    }
  ]
  const [titleData, setTitleData] = useState([])

  const [newColumns, setNewColumns] = useState([])

  useEffect(() => {
    api()
  }, [])

  const api = () => {
    const titleData = ['6.15', '6.16'] //接口数据
    //获取头
    const head = Number(
      moment(moment(titleData[0]).valueOf() - 86400000).format('MM.DD')
    )
    const tail = Number(
      moment(
        moment(titleData[titleData.length - 1]).valueOf() + 86400000
      ).format('MM.DD')
    )
    //  添加头尾
    const newTitleData = [head.toString(), ...titleData, tail.toString()]
    setTitleData(newTitleData)
  }
  //获取计划、完成数量
  const getQuantity = (title: any, row: any, type: any) => {
    const filterDate = row.data.filter((item) => item.name === title)
    if (!isEmpty(filterDate)) {
      if (type === 'plan') {
        return filterDate[0].plannedNumber
      }
      if (type === 'complete') {
        return filterDate[0].completedQuantity
      }
    } else {
      return 0
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
              width: 150,
              render: (_s, row) => (
                <>
                  <div>{getQuantity(item, row, 'plan')}</div>
                </>
              )
            },

            {
              title: '完成数量',
              dataIndex: 'age',
              align: 'center',
              key: 'age',
              width: 150,
              render: (_s, row) => (
                <>
                  <div>{getQuantity(item, row, 'complete')}</div>
                </>
              )
            }
          ]
        })
      })
      const index = columns.findIndex(
        (item: { dataIndex: string }) => item.dataIndex === 'materialName'
      )
      columns.splice(index + 1, 0, sizeList)
      setNewColumns(columns.flat(Infinity))
    }
  }, [titleData])

  const data: any = []
  for (let i = 0; i < 6; i++) {
    data.push({
      key: i,
      name: i + 2,
      material: 11,
      materialName: `班组${i + 1}`,
      age: i + 1,

      data: [
        { name: '6.15', plannedNumber: 10, completedQuantity: 20 },
        { name: '6.16', plannedNumber: 30, completedQuantity: 40 }
      ]
    })
  }

  return (
    <>
      <Table
        columns={newColumns}
        dataSource={data}
        bordered
        size="middle"
        scroll={{ x: 'calc(700px + 50%)', y: 240 }}
      />
    </>
  )
}

export default TableDome
