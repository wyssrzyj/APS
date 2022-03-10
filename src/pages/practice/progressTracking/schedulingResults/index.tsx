import React from 'react'

import { Title } from '@/components'

import Forms from './forms'
import styles from './index.module.less'
const SchedulingResults = () => {
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

  // const data = [
  //   {
  //     year: '1951 年',
  //     sales: 38
  //   },
  //   {
  //     year: '1952 年',
  //     sales: 52
  //   },
  //   {
  //     year: '1956 年',
  //     sales: 61
  //   },
  //   {
  //     year: '1957 年',
  //     sales: 145
  //   },
  //   {
  //     year: '1958 年',
  //     sales: 48
  //   },
  //   {
  //     year: '1959 年',
  //     sales: 38
  //   },
  //   {
  //     year: '1960 年',
  //     sales: 38
  //   },
  //   {
  //     year: '1962 年',
  //     sales: 38
  //   }
  // ]
  // const chart = new G2.Chart({
  //   container: 'mountNode',
  //   forceFit: true,
  //   height: window.innerHeight
  // })
  // chart.source(data)
  // chart.scale('sales', {
  //   tickInterval: 20
  // })
  // chart.interval().position('year*sales')
  // chart.render()
  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'生产单排程'} />
      </div>
      <Forms FormData={FormData} treeData={treeData}></Forms>
      负荷图
      {/* <div id="mountNode"></div> */}
    </div>
  )
}

export default SchedulingResults
