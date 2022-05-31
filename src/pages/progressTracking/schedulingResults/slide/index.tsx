import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'
import { isEmpty } from 'lodash'
import React, { Component, useEffect, useState } from 'react'

import styles from './index.module.less'
const Load = (props: { item: any }) => {
  const { item } = props
  console.log('练习', item.id)

  /** 格式  [
   * {
   * name:"班组1",
   * list:[{release: 1.2, month: '1.2', tem: 100, city: '达成率'}
   *   ]
   *  }
   * ]
   * release 日期 用来排序  数字
   * month  底部的时间
   * tem 数据
   * city 状态
   */

  const [list, setList] = useState<any>([])

  useEffect(() => {
    if (!isEmpty(item.sum)) {
      setList([...item.sum])
    }
  }, [item.sum])
  useEffect(() => {
    if (!isEmpty(list)) {
      readHistogram(list)
    }
  }, [list])

  const readHistogram = (data: string) => {
    const ds = new DataSet()
    const dv = ds
      .createView('test')
      .source(data)
      .transform({
        as: ['count'],
        groupBy: ['release'],
        operations: ['count'],
        type: 'aggregate'
      })
      .transform({
        type: 'sort-by',
        fields: ['release'],
        order: 'ASC'
      })

    const chart = new Chart({
      container: `${item.id}container`,
      autoFit: true,
      height: 200
    })

    chart.data(dv.rows) //总数据

    // 头顶有数字
    // chart.interval().position('month*tem').label('tem', {
    //   // style: { fontSize: '15', lineHeight: '20' }
    // })

    chart.interval().position('month*tem').color('city') //控制颜色

    chart.option('scrollbar', {
      type: 'horizontal'
    })
    // chart.interaction('element-visible-filter')
    chart.interaction('plot-mousewheel-scroll', {
      start: [
        {
          trigger: 'plot:mousewheel',
          action: 'mousewheel-scroll:scroll',
          arg: { wheelDelta: 5 }
        }
      ]
    })
    chart.render()
  }
  return (
    <div key={item.id}>
      <div className={styles.top}>
        <div className={styles.test}>{item.name}</div>
        <div
          key={item.id}
          style={{ width: '100%' }}
          id={`${item.id}container`}
        ></div>
      </div>
    </div>
  )
}

export default Load
