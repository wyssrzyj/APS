/*
 * @Author: lyj
 * @Date: 2022-06-17 08:41:26
 * @LastEditTime: 2022-06-30 14:33:54
 * @Description:
 * @LastEditors: lyj
 */
import { Input, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { productionWarning } from '@/recoil/apis'

import styles from './index.module.less'
const TableDome = (props) => {
  const { onChang, current } = props
  const { getDailyScheduleList } = productionWarning

  const columns: any = [
    {
      title: '班组',
      align: 'center',
      dataIndex: 'teamName',
      fixed: 'left',
      width: 150,
      key: 'teamName'
    }
  ]
  const [titleData, setTitleData] = useState([])

  const [newColumns, setNewColumns] = useState([])
  const [list, setList] = useState([])

  useEffect(() => {
    api()
  }, [])

  const api = async () => {
    // current.externalProduceOrderId
    const res = await getDailyScheduleList({ assignmentId: 1 })
    // const titleData = res.planDateTimeList //接口数据
    const titleData = res.planDateTimeList //接口数据
    const data = res.dailyScheduleVOS

    //planAmount 计划数量
    //completedAmount 完成数量
    // const data: any = [
    //   {
    //     id: 2,
    //     key: 2,
    //     name: 2,
    //     material: 21,
    //     teamName: `班组2`,
    //     age: 0 + 2,
    //     detailVOS: [
    //       {
    //         name: '6.15',
    //         planAmount: 30,
    //         completedAmount: 40,
    //         type: true
    //       },
    //       {
    //         name: '6.16',
    //         planAmount: 30,
    //         completedAmount: 40,
    //         type: false
    //       }
    //     ]
    //   }
    // ]
    setList(data) //先渲染数据在渲染格式 防止拿不到数据
    setTitleData(titleData)
  }
  //获取计划、完成数量
  const getQuantity = (title: any, row: any, type: any) => {
    const filterDate = row.detailVOS.filter((item) => item.name === title)
    // if()
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
    const filterDate = row.detailVOS.filter((item) => item.name === title)
    return !filterDate[0].type
  }

  //更新数据
  const quantity = (e, v, index, type) => {
    //没有进行深拷贝 待会重新处理一下 不然会有隐患
    const current = list.filter((item) => item.id === v.id)[0]
    current.detailVOS[index][type] = Number(e)
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
                    // disabled={available(item, row)}
                    min={0}
                    defaultValue={getQuantity(item, row, 'planAmount')}
                    onBlur={(e) => {
                      quantity(e.target.value, row, index, 'planAmount')
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
                    // disabled={available(item, row)}
                    min={0}
                    defaultValue={getQuantity(item, row, 'completedAmount')}
                    onBlur={(e) => {
                      quantity(e.target.value, row, index, 'completedAmount')
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
