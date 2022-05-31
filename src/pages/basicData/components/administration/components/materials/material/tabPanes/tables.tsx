import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import Bottom from './bottom'
import Box from './box'
import styles from './index.module.less'

function Tables(props: any) {
  const { list, materialList, index } = props
  const [data, setData] = useState<any>([]) //总计数据
  const [newList, setNewList] = useState<any>([]) //存放数据用于更改
  const titl = [
    { name: '序号', width: '50px' },
    { name: '颜色名称', width: '100px' },
    { name: '色号', width: '50px' },
    { name: '尺码', width: '50px' },
    { name: '订单数量', width: '100px' },
    { name: '物料需求数量', width: '100px' },
    { name: '物料库存数量', width: '100px' },
    { name: '物料在途数量', width: '100px' },
    { name: '半成品冲销数量', width: '120px' },
    { name: '物料缺少数量', width: '100px' },
    { name: '单位', width: '50px' },
    { name: '是否充足', width: '80px' },
    { name: '齐料日期', width: '150px' }
  ]
  useEffect(() => {
    console.log('总数据', materialList[index].titls) //获取当前行的值
    console.log('下标', index)
    console.log('自数字', list)

    //假接口数据
    // const titls = [
    //   {
    //     number: '1',
    //     id: 1,
    //     colorName: '红色',
    //     colorNumber: '色号',
    //     size: '尺码',
    //     OrderQuantity: '1', //订单数量
    //     materialRequirements: '100', //物料需求数量
    //     materialInventory: '80', //物料库存数量
    //     materialTransit: '10', //物料在途数量
    //     // halfInto: '1', //半成品冲销数量
    //     // itemMissing: '0', //物料缺少数量
    //     company: '单位',
    //     adequate: false,
    //     dateCompletion: '齐套日期'
    //   },
    //   {
    //     number: '1',
    //     id: 1,
    //     colorName: '红色',
    //     colorNumber: '色号',
    //     size: '尺码',
    //     OrderQuantity: '1', //订单数量
    //     materialRequirements: '100', //物料需求数量
    //     materialInventory: '80', //物料库存数量
    //     materialTransit: '10', //物料在途数量
    //     // halfInto: '1', //半成品冲销数量
    //     // itemMissing: '0', //物料缺少数量
    //     company: '单位',
    //     adequate: false,
    //     dateCompletion: '齐套日期'
    //   }
    // ]
    setNewList(list)
  }, [list, materialList, index])

  //处理后的新数据
  const newData = (e: any[]) => {
    console.log('处理后的新数据', e)

    setNewList(e) //修改后的值重新放到useState中
    // 获取总计的数据
    if (!isEmpty(e)) {
      //订单数量
      const OrderQuantity = e.reduce((total: any, current: any) => {
        total += Number(current.OrderQuantity)
        return total
      }, 0)

      //物料需求数量
      const materialRequirements = e.reduce((total: any, current: any) => {
        total += Number(current.materialRequirements)
        return total
      }, 0)

      //物料库存数量
      const materialInventory = e.reduce((total: any, current: any) => {
        total += Number(current.materialInventory)
        return total
      }, 0)
      //物料在途数量
      const materialTransit = e.reduce((total: any, current: any) => {
        total += Number(current.materialTransit)
        return total
      }, 0)
      //半成品冲销数量
      const halfInto = e.reduce((total: any, current: any) => {
        total += Number(current.halfInto)
        return total
      }, 0)
      //物料缺少数量
      const itemMissing = e.reduce((total: any, current: any) => {
        total += Number(current.itemMissing)
        return total
      }, 0)

      const arr: any = [
        OrderQuantity,
        materialRequirements,
        materialInventory,
        materialTransit,
        halfInto,
        itemMissing
      ]
      setData(arr)
    }
  }

  return (
    <div className={styles.top}>
      <div className={styles.tops}>物料齐套检查</div>

      {/* 头部 */}
      <div className={styles.const}>
        {titl.map((item) => (
          <div
            className={styles.content}
            style={{ width: item.width }}
            key={item.name}
          >
            {item.name}
          </div>
        ))}
      </div>
      {/* 主体数据 */}
      {newList.map((item: any, index: any) => (
        // eslint-disable-next-line react/jsx-key
        <Box titls={newList} item={item} index={index} newData={newData} />
      ))}
      {/* 底部总计 */}
      <Bottom list={data} />
    </div>
  )
}

export default Tables
