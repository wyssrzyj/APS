/*
 * @Author: your name
 * @Date: 2022-04-13 15:47:01
 * @LastEditTime: 2022-06-08 15:29:31
 * @LastEditors: lyj
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jack-aps\src\pages\practice\progressTracking\schedulingResults\tbale\index.tsx
 */
import { Table } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

function Edition(props) {
  const { load } = props

  const [list, setList] = useState([])
  const [data, setData] = useState<any>([])
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<any>(true)

  //   columns数据
  useEffect(() => {
    //时间
    if (!isEmpty(load)) {
      const sum = load[0].dateList
      setLoading(false)
      const columns = sum.map((item, index) => {
        return {
          key: index,
          value: item,
          name: item,
          title: item,
          dataIndex: item,
          width: 150,
          align: 'center',
          render: (_item, _e, index) => (
            <>
              {_item !== undefined ? (
                <div key={index} className={styles.histogram}>
                  {/* 内容 */}
                  <div
                    className={styles.sonx}
                    style={{ height: `${100 - _item}px` }}
                  ></div>

                  <div
                    className={styles.son}
                    style={{
                      height: `${_item < 100 ? _item : 100}px`,
                      lineHeight: `${_item < 100 ? _item : 100}px`,
                      background: _item === 100 ? ' red' : ' rgb(24, 199, 88)' //颜色控制
                    }}
                  >
                    {_item}%
                  </div>
                </div>
              ) : (
                <div key={index} className={styles.histogram}>
                  {/* 内容 */}
                  <div
                    className={styles.sonx}
                    style={{ height: `${100 - _item}px` }}
                  ></div>

                  <div
                    className={styles.son}
                    style={{
                      height: `${_item < 100 ? _item : 100}px`,
                      lineHeight: `${_item < 100 ? _item : 100}px`,
                      background: _item == 100 ? ' red' : 'rgb(250, 249, 249)' //颜色控制
                    }}
                  >
                    {0}%
                  </div>
                </div>
              )}
            </>
          )
        }
      })
      columns.unshift({
        title: '日期',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        fixed: 'left'
      })
      setList(columns)
    }
  }, [load])

  useEffect(() => {
    if (!isEmpty(load)) {
      const modification = load.map((item: any) => {
        return conversion(item)
      })
      setData(modification)
    }
  }, [load])

  const conversion = (v) => {
    const percentageList = conversionData(v.percentageList)
    return { ...v, ...percentageList }
  }
  const conversionData = (data: any[]) => {
    //data 数据
    const obj: any = {}
    data.map((e: { date: string | number; percentage: any }) => {
      //键名=建值
      obj[e.date] = e.percentage
    })
    return obj
  }

  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
  }
  return (
    <div className={styles.tops}>
      {load.length > 0 ? (
        <Table
          loading={loading}
          dataSource={data}
          rowKey={'id'}
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
      ) : (
        <div>暂无数据</div>
      )}
    </div>
  )
}

export default Edition
