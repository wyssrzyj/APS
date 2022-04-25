import React, { useEffect, useState } from 'react'

import { Title } from '@/components'

import Forms from './forms'
import Gantt from './Gantt/index'
import GattChart from './ganttChart/index'
import styles from './index.module.less'
import Load from './load/index'

const SchedulingResults = () => {
  const [currentZoom, setCurrentZoom] = useState<any>('Days') //缩放的状态  Days
  const [subjectData, setSubjectData] = useState<any>({ data: [], links: [] }) //甘特图主体数据
  const [restDate, setRestDate] = useState<any>() //单个班组的不可用日期

  useEffect(() => {
    const data = [
      {
        //父亲
        id: 1,
        type: true, //判断是否可以移动
        text: '裁剪车间—裁剪班组', //名称
        // duration: 6, //天数
        // progress: 1, //控制完成百分比 范围0-1
        color: 'red' //控制颜色
      },
      {
        //儿子
        id: 11,
        text: '-生产单号10086',
        // start_date: '2020-04-07',
        // duration: 2,
        progress: 0.6,
        parent: 1,
        color: '', //控制颜色
        render: 'split' //添加同一行
      },
      {
        //孙子
        id: 111,
        text: '卢英杰的子1',
        start_date: '2020-04-6 ', //开始时间
        end_date: '2020-04-7 ', //结束时间
        duration: 1,
        progress: 0.6,
        parent: 11,
        color: 'red' //控制颜色
      },
      {
        id: 112,
        text: '卢英杰的子2',
        start_date: '2020-04-10',
        duration: 2,
        progress: 0.6,
        parent: 11
      },
      {
        id: 113,
        text: '卢英杰号的子3',
        start_date: '2020-04-12',
        duration: 2,
        progress: 0.6,
        parent: 11
      }
    ]

    const links = [
      { id: 1, source: 1, target: 2, type: 0 },
      { id: 3, source: 2, target: 3, type: 0 }
    ]
    setSubjectData({
      data,
      links
    })
  }, [])
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
  const leftData = async (e: any) => {
    console.log(e)
  }
  // 更新
  const updateList = (e: any) => {
    console.log(e)
  }
  const rightData = (e: any) => {
    console.log('右键', e)
  }
  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'资源甘特图'} />
      </div>
      <Forms FormData={FormData} treeData={treeData}></Forms>
      <div id="c1"></div>

      <div className={styles.ganttContent}>
        <Gantt
          name={'test'}
          leftData={leftData}
          rightData={rightData}
          tasks={subjectData}
          zoom={currentZoom}
          updateList={updateList}
          restDate={restDate}
        />
      </div>

      {/* <GattChart /> */}
    </div>
  )
}

export default SchedulingResults
