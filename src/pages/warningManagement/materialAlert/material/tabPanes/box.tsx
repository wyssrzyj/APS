import { DatePicker, InputNumber } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { Icon } from '@/components'

import styles from './index.module.less'
function Box(props: { item: any; index: any; titls: any; newData: any }) {
  const { item, index, titls, newData } = props
  index + 1
  //item 当前行数据
  //index 当前的下标
  //titls 接口的总数据
  const [sum, setSum] = useState(0)
  const [times, setTimes] = useState<any>()
  const onChange = (e: any) => {
    setSum(e)
  }
  useEffect(() => {
    // 处理数据
    item.halfInto = sum //修改数据
    item.dateCompletion = times //齐套日期

    const lack =
      Number(item.materialRequirements) -
      Number(item.materialInventory) -
      Number(item.materialTransit) -
      Number(item.halfInto)
    item.itemMissing = lack //物料缺少数量

    // 方法1  虽然可以成功 但是顺序不行
    // 过滤出当前项 把未更改了和新的数据合并
    // const data = titls.filter((v) => v.id != item.id)
    // data.push(item)
    // console.log(data)

    // 方法2
    // 找当前的数据的下标 ，找到下标后替换
    titls.splice(index, 1, item) //splice 是从1开始的，但是index是从0开始
    newData && newData(titls)
  }, [sum, times])

  const setTime = (e: moment.MomentInput) => {
    setTimes(moment(e).valueOf())
  }
  return (
    <div key={item.name} className={styles.box_top}>
      <div>
        <div className={styles.short}>{index}</div>
        <div className={styles.box_content}>{item.colorName}</div>
        <div className={styles.short}>{item.colorNumber}</div>
        <div className={styles.short}>{item.size}</div>
        <div className={styles.box_content}>{item.OrderQuantity}</div>
        <div className={styles.box_content}>{item.materialRequirements}</div>
        <div className={styles.box_content}>{item.materialInventory}</div>
        <div className={styles.box_content}>{item.materialTransit}</div>
        <div className={styles.input}>
          <InputNumber min={0} defaultValue={0} onChange={onChange} />
        </div>
        <div className={styles.box_content}>
          {item.itemMissing > 0 ? item.itemMissing : '0'}
        </div>
        <div className={styles.short}>{item.company}</div>
        {/* 图 */}
        <div className={styles.adequate}>
          {item.itemMissing > 0 ? '错' : '对'}
        </div>
        <div className={styles.datePicker}>
          {item.itemMissing > 0 ? <DatePicker onChange={setTime} /> : null}
        </div>
      </div>
    </div>
  )
}

export default Box
