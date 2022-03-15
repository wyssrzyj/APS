import React, { useEffect, useState } from 'react'

import { Title } from '@/components'

import Custom from './custom/index'
import Dhx from './dhx/index'
import Dome from './dome/index'
import Forms from './forms'
import GattChart from './ganttChart/index'
import styles from './index.module.less'
import Load from './load/index'
import Slide from './slide/index'
import VirtuaIList from './VirtuaIList'
import VirtuaIListX from './VirtuaIListX'
const SchedulingResults = () => {
  const [sum, setSum] = useState(1)
  // 假数据
  const treeData = [
    {
      title: '工厂',
      value: 1,
      key: 1,
      children: [
        {
          title: '工厂1',
          value: 2,
          key: 2
        },
        {
          title: '工厂2',
          value: 3,
          key: 3
        }
      ]
    },
    {
      title: '原料',
      value: '2-9',
      key: '2-9',
      children: [
        {
          title: '大米',
          value: '2-1',
          key: '2-1'
        },
        {
          title: '土豆',
          value: '2-2',
          key: '2-2'
        },
        {
          title: '菠萝',
          value: '2-3',
          key: '2-3'
        }
      ]
    },
    {
      title: '玩具',
      value: '3-9',
      key: '3-9',
      children: [
        {
          title: '金铲铲的冠冕',
          value: '3-1',
          key: '3-1'
        },
        {
          title: '残暴之力',
          value: '3-2',
          key: '3-2'
        },
        {
          title: '末日寒冬',
          value: '3-3',
          key: '3-3'
        }
      ]
    },
    {
      title: '蔬菜',
      value: '4',
      key: '4'
    }
  ]
  useEffect(() => {
    console.log(sum)
  }, [sum])
  const btn = () => {
    setSum((f) => f + 1)
  }
  const falseData = [
    { release: 0, month: '0', tem: 100, city: '完成' },
    { release: 1.3, month: '1.3', tem: 22, city: '未完成' },
    { release: 1.4, month: '1.4', tem: 33, city: '未完成' },
    { release: 1.5, month: '1.5', tem: 44, city: '未完成' },
    { release: 1.6, month: '1.6', tem: 55, city: '未完成' },
    { release: 1.7, month: '1.7', tem: 66.2, city: '未完成' },
    { release: 1.8, month: '1.8', tem: 77, city: '未完成' },
    { release: 1.9, month: '1.9', tem: 88, city: '未完成' },
    { release: 2.0, month: '1.10', tem: 99, city: '未完成' },
    { release: 2.1, month: '1.11', tem: 10, city: '未完成' },
    { release: 2.2, month: '1.12', tem: 80, city: '未完成' },
    { release: 2.3, month: '1.13', tem: 90, city: '未完成' },
    { release: 2.5, month: '1.14', tem: 91, city: '未完成' },
    { release: 2.6, month: '1.15', tem: 92, city: '未完成' },
    { release: 2.7, month: '1.16', tem: 23, city: '未完成' },
    { release: 2.8, month: '1.17', tem: 94, city: '未完成' },
    { release: 2.9, month: '1.18', tem: 65, city: '未完成' },
    { release: 3.0, month: '1.19', tem: 96, city: '未完成' },
    { release: 3.1, month: '1.20', tem: 77, city: '未完成' },
    { release: 3.2, month: '1.21', tem: 98, city: '未完成' },
    { release: 3.3, month: '1.22', tem: 69, city: '未完成' }
  ]
  const list = [
    { id: 1, name: '班组1', sum: falseData },
    {
      id: 2,
      name: '班组2',
      sum: [
        { release: 1.2, month: '1.2', tem: 100, city: '达成率' },
        { release: 1.3, month: '1.3', tem: 22, city: '未完成' },
        { release: 1.4, month: '1.4', tem: 33, city: '未完成' },
        { release: 1.5, month: '1.5', tem: 44, city: '未完成' },
        { release: 1.6, month: '1.6', tem: 55, city: '未完成' },
        { release: 1.7, month: '1.7', tem: 66.2, city: '未完成' },
        { release: 1.8, month: '1.8', tem: 77, city: '未完成' },
        { release: 1.9, month: '1.9', tem: 88, city: '未完成' },
        { release: 2.0, month: '1.10', tem: 99, city: '未完成' },
        { release: 2.1, month: '1.11', tem: 10, city: '未完成' },
        { release: 2.2, month: '1.12', tem: 80, city: '未完成' },
        { release: 2.3, month: '1.13', tem: 90, city: '未完成' },
        { release: 2.5, month: '1.14', tem: 91, city: '未完成' }
      ]
    },
    { id: 3, name: '班组3', sum: falseData },
    { id: 4, name: '班组4', sum: falseData }
  ]

  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'资源负荷图'} />
      </div>
      {/* <button onClick={btn}>单机</button> */}
      <Forms FormData={FormData} treeData={treeData}></Forms>
      <div id="c1"></div>
      {/* 图 */}

      {/* 第4版-滚动直方图 */}

      {/* <div className={styles.todoContent}>
        {list.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <Slide key={item.id} item={item} />
        ))}
      </div> */}

      {/* 第5版-滚动直方图 */}
      {/* DHX */}
      {/* <Dhx /> */}
      {/* 第6版 -手写 */}
      {/* <Custom /> */}
      {/* 虚拟列表Y */}
      <VirtuaIList />
      {/* 虚拟列表X */}
      <VirtuaIListX />
    </div>
  )
}

export default SchedulingResults
