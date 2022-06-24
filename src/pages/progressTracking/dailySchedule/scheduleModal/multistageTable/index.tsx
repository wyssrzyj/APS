/*
 * @Author: lyj
 * @Date: 2022-06-17 08:41:26
 * @LastEditTime: 2022-06-23 15:31:57
 * @Description:
 * @LastEditors: lyj
 */
import { Input, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
const TableDome = (props) => {
  const { onChang } = props
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
  const [list, setList] = useState([])

  useEffect(() => {
    api()
  }, [])

  const api = () => {
    const titleData = ['6.15', '6.16'] //接口数据
    //plannedNumber 计划数量
    //completedQuantity 完成数量
    const data: any = [
      {
        id: 2,
        key: 2,
        name: 2,
        material: 21,
        materialName: `班组2`,
        age: 0 + 2,
        data: [
          {
            name: '6.15',
            plannedNumber: 30,
            completedQuantity: 40,
            type: true
          },
          {
            name: '6.16',
            plannedNumber: 30,
            completedQuantity: 40,
            type: false
          }
        ]
      },
      {
        id: 3,
        key: 3,
        name: 3,
        material: 3,
        materialName: `班组3`,
        age: 0 + 3,
        data: [
          {
            name: '6.15',
            plannedNumber: 33,
            completedQuantity: 44,
            type: true
          },
          {
            name: '6.16',
            plannedNumber: 33,
            completedQuantity: 44,
            type: false
          }
        ]
      }
    ]
    setTitleData(titleData)
    setList(data)
  }
  //获取计划、完成数量
  const getQuantity = (title: any, row: any, type: any) => {
    const filterDate = row.data.filter((item) => item.name === title)
    // if()
    if (!isEmpty(filterDate)) {
      if (type === 'plannedNumber') {
        return filterDate[0].plannedNumber
      }
      if (type === 'completedQuantity') {
        return filterDate[0].completedQuantity
      }
    } else {
      return 0
    }
  }
  const available = (title: any, row) => {
    const filterDate = row.data.filter((item) => item.name === title)
    return !filterDate[0].type
  }

  //更新数据
  const quantity = (e, v, index, type) => {
    //没有进行深拷贝 待会重新处理一下 不然会有隐患
    const current = list.filter((item) => item.id === v.id)[0]
    current.data[index][type] = Number(e)
    const subscript = list.findIndex((item) => {
      return item.id === current.id
    })
    if (subscript !== -1) {
      list.splice(subscript, 1, current)
      setList([...list])
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
                    defaultValue={getQuantity(item, row, 'plannedNumber')}
                    onBlur={(e) => {
                      quantity(e.target.value, row, index, 'plannedNumber')
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
                    defaultValue={getQuantity(item, row, 'completedQuantity')}
                    onBlur={(e) => {
                      quantity(e.target.value, row, index, 'completedQuantity')
                    }}
                  />
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

  useEffect(() => {
    //传递给外部
    onChang && onChang(list)
  }, [list])

  return (
    <>
      <Table
        columns={newColumns}
        dataSource={list}
        bordered
        size="middle"
        scroll={{ x: 'calc(700px + 50%)', y: 240 }}
      />
    </>
  )
}

export default TableDome
