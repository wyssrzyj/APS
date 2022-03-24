import { Table } from 'antd'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

function Edition() {
  const arr: any = [
    { date: 1.1, key: 1, height: 10 },
    { date: 2, key: 2, height: 20 },
    { date: 3, key: 3, height: 30 },
    { date: 4, key: 4, height: 40 },
    { date: 5, key: 5, height: 50 },
    { date: 6, key: 6, height: 60 },
    { date: 7, key: 7, height: 70 },
    { date: 8, key: 8, height: 80 },
    { date: 9, key: 9, height: 90 },
    { date: 10, key: 10, height: 100 },
    { date: 11, key: 11, height: 10 },
    { date: 12, key: 12, height: 20 },
    { date: 13, key: 13, height: 30 },
    { date: 14, key: 14, height: 40 },
    { date: 15, key: 15, height: 50 },
    { date: 16, key: 16, height: 60 },
    { date: 17, key: 17, height: 70 },
    { date: 18, key: 18, height: 80 },
    { date: 19, key: 19, height: 90 },
    { date: 20, key: 20, height: 100 },
    { date: 21, key: 21, height: 10 },
    { date: 22, key: 22, height: 20 },
    { date: 23, key: 23, height: 30 },
    { date: 24, key: 24, height: 40 },
    { date: 25, key: 25, height: 50 },
    { date: 26, key: 26, height: 60 },
    { date: 27, key: 27, height: 70 },
    { date: 28, key: 28, height: 80 },
    { date: 29, key: 29, height: 90 },
    { date: 30, key: 30, height: 100 }
  ]
  const sumDome = [
    // 假如他有3条数据
    { id: 1, name: '班组一', list: arr },
    { id: 2, name: '班组二', list: arr },
    { id: 2, name: '班组二', list: arr },
    { id: 2, name: '班组二', list: arr },
    { id: 2, name: '班组三', list: arr }
  ]

  const [list, setList] = useState([])
  const [data, setData] = useState<any>([])
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)

  //   处理数据
  useEffect(() => {
    arr.map(
      (
        item: {
          title: any
          date: any
          name: any
          dataIndex: string
          key: any
          width: number
          align: string
          render: (_item: any, _e: any, index: any) => JSX.Element
          height: any
        },
        index: any
      ) => {
        item.title = item.date
        item.name = item.date
        item.dataIndex = `data${index}`
        item.key = item.date
        item.width = 150
        item.align = 'center'
        item.render = (_item, _e, index) => (
          <div key={index} className={styles.histogram}>
            {/* 内容 */}
            <div
              className={styles.sonx}
              style={{ height: `${100 - item.height}px` }}
            ></div>

            <div
              className={styles.son}
              style={{
                height: `${item.height}px`,
                lineHeight: `${item.height}px`,
                background: item.height === 100 ? ' red' : ' rgb(24, 199, 88)' //颜色控制
              }}
            >
              {item.height}%
            </div>
          </div>
        )
      }
    )
    arr.unshift({
      title: '日期',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      fixed: 'left'
    })
    console.log('处理后的', arr)

    setList(arr)
  }, [])
  useEffect(() => {
    sumDome.map((item: any) => {
      item.key = item.id
    })
    setData(sumDome)
  }, [])
  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
  }
  return (
    <div className={styles.tops}>
      <Table
        dataSource={data}
        bordered
        scroll={{ x: 1000, y: 500 }}
        columns={list}
        pagination={{
          current: pageNum,
          pageSize,
          total,
          showSizeChanger: true,
          onChange: onPaginationChange
        }}
      />
    </div>
  )
}

export default Edition
