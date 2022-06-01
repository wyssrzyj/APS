import { cloneDeep, isEmpty, keys } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { Title } from '@/components'
import { orderApis } from '@/recoil/apis'

import Forms from './forms'
import Gantt from './Gantt/index'
import GattChart from './ganttChart/index'
import styles from './index.module.less'
import Load from './load/index'

const SchedulingResults = () => {
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
      setChart(gunterData)
    }
    setLine([]) //线 //初始的时候传空
  }, [gunterData])

  // 合并图线
  useEffect(() => {
    if (chart !== undefined && line !== undefined) {
      setSubjectData({
        data: chart,
        links: line
      })
    }
  }, [chart, line])

  const leftData = async (e: any) => {
    setSelect(e)
  }
  // 更新
  const updateList = (e: any) => {
    console.log(e)
  }
  const rightData = (e: any) => {
    console.log('右键', e)
  }
  const FormData = (e: any) => {
    setFormData(e)
  }
  return (
    <div className={styles.qualification}>
      {/* <div>
        <Title title={'订单甘特图'} />
      </div> */}
      <Forms FormData={FormData}></Forms>
      <div id="c1"></div>

      <div className={styles.ganttContent}>
        <Gantt
          select={select}
          name={'test'}
          leftData={leftData} //左键
          rightData={rightData} //左键
          tasks={subjectData} //甘特图主体数据 { data: [], links: [] }
          zoom={currentZoom} // 缩放的状态  Days
          updateList={updateList} // 更新
          // restDate={restDate}
        />
      </div>

      {/* <GattChart /> */}
    </div>
  )
}

export default SchedulingResults
