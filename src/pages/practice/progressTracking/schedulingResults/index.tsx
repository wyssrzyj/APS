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
import Tbale from './tbale'
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
  const executionMethod = () => {
    setSum((f) => f + 1)
  }

  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'班组负荷图'} />
      </div>
      {/* <button onClick={executionMethod}>单机</button> */}
      <Forms FormData={FormData} treeData={treeData}></Forms>
      <div id="c1"></div>
      <Tbale />
    </div>
  )
}

export default SchedulingResults
