/*
 * @Author: lyj
 * @Date: 2022-06-10 13:28:44
 * @LastEditTime: 2022-06-10 15:32:40
 * @Description:
 * @LastEditors: lyj
 */
import { cloneDeep, isEmpty, keys } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import Gantt from '@/components/gantt'
import { orderApis } from '@/recoil/apis'

import styles from './index.module.less'

function IframeDome() {
  const [currentZoom, setCurrentZoom] = useState<any>('Days') //缩放的状态  Days
  const [subjectData, setSubjectData] = useState<any>({ data: [], links: [] }) //甘特图主体数据
  // const [restDate, setRestDate] = useState<any>() //单个班组的不可用日期
  const [formData, setFormData] = useState() //form数据
  const [gunterData, setGunterData] = useState<any>([]) //图数据

  const [select, setSelect] = useState<any>() //用于展示 线和不可用时间、给树传递id判断
  const [chart, setChart] = useState<any>([]) //图
  const [line, setLine] = useState<any>([]) //线
  const { productionSingleView, getLine } = orderApis

  // 甘特图数据
  useEffect(() => {
    if (formData !== undefined) {
      getChart(formData)
    }
  }, [formData])

  const getChart = async (id: undefined) => {
    const chart: any = await productionSingleView({ factoryId: id })

    const arr = cloneDeep(chart.data)
    if (chart.code === 200) {
      dateFormat(arr)
    }
  }

  //处理Gantt时间格式
  const dateFormat = (data: any) => {
    const arr = cloneDeep(data)
    arr.map(
      (item: {
        start_date: string | null
        startDate: moment.MomentInput
        end_date: string | null
        endDate: moment.MomentInput
      }) => {
        item.start_date = item.startDate
          ? moment(item.startDate).format('YYYY-MM-DD HH:mm')
          : null
        item.end_date = item.endDate
          ? moment(item.endDate).format('YYYY-MM-DD HH:mm')
          : null
      }
    )
    setGunterData(arr) //图
  }
  // 线数据
  useEffect(() => {
    if (select !== undefined) {
      getLineData(select)
    }
  }, [select])

  const getLineData = async (id) => {
    const line: any = await getLine({ id }) //线
    if (line.code === 200) {
      setLine(line.data === null ? [] : line.data)
    }
  }

  // 设置图 线数据
  useEffect(() => {
    if (!isEmpty(gunterData)) {
      // setChart(gunterData)
      const data = [
        {
          id: 1,
          type: true, //判断是否可以移动
          text: '生产单', //名称
          // color: 'red', //控制颜色
          open: true
        },
        {
          id: 11,
          type: true, //判断是否可以移动
          text: '缝制1-盒子', //名称
          // color: 'red', //控制颜色
          open: true,
          render: 'split',
          parent: 1
          // eslint-disable-next-line jsx-a11y/alt-text
        },
        {
          id: 111,
          type: true, //判断是否可以移动
          text: '班组1正', //名称
          parent: 11,
          start_date: '2020-06-8',
          end_date: '2020-06-9'
          // color: 'red', //控制颜色
        },
        {
          id: 112,
          type: true, //判断是否可以移动
          text: '班组1反', //名称
          parent: 11,
          start_date: '2020-06-9',
          end_date: '2020-06-10',
          color: 'red' //控制颜色+
          // render: 'split'
        },
        {
          id: 22,
          type: true, //判断是否可以移动
          text: '缝制2-盒子', //名称
          // color: 'red', //控制颜色
          open: true,
          parent: 1,
          render: 'split'
        },
        {
          id: 221,
          type: true, //判断是否可以移动
          text: '缝制2正', //名称
          // color: 'red', //控制颜色
          start_date: '2020-06-8',
          end_date: '2020-06-9',
          parent: 22
        },
        {
          id: 222,
          type: true, //判断是否可以移动
          text: '缝制2反', //名称
          color: 'red', //控制颜色
          start_date: '2020-06-9',
          end_date: '2020-06-10',
          parent: 22
        }
      ]
      setChart(data)
    }
    setLine([]) //线 //初始的时候传空
  }, [gunterData])

  // 合并图线
  useEffect(() => {
    if (chart !== undefined && line !== undefined) {
      console.log({
        data: chart,
        links: line
      })

      setSubjectData({
        data: chart,
        links: line
      })
    }
  }, [chart, line])

  const updateList = (e: any) => {
    console.log(e)
  }
  const rightData = (e: any) => {
    console.log('右键', e)
  }
  const leftData = async (e: any) => {
    setSelect(e)
  }
  return (
    <div>
      <div className={styles.ganttContent}>
        <Gantt
          select={select}
          name={'test2'}
          leftData={leftData} //左键
          rightData={rightData} //左键
          tasks={subjectData} //甘特图主体数据 { data: [], links: [] }
          zoom={currentZoom} // 缩放的状态  Days
          updateList={updateList} // 更新
          // restDate={restDate}
        />
      </div>
    </div>
  )
}

export default IframeDome
