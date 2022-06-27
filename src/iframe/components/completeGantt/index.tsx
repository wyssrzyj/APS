/*
 * @Author: lyj
 * @Date: 2022-06-10 13:28:44
 * @LastEditTime: 2022-06-24 13:28:42
 * @Description:
 * @LastEditors: lyj
 */
import { cloneDeep, isEmpty, keys } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import Gantt from '@/components/gantt'
import { gantt } from '@/recoil'
import { orderApis } from '@/recoil/apis'
import { practice } from '@/recoil/apis'

import styles from './index.module.less'

function IframeDome() {
  const location = useLocation()
  const [value, setValue] = useRecoilState(gantt.saveAlgorithm)
  const [currentZoom, setCurrentZoom] = useState<any>('Days') //缩放的状态  Days
  const [subjectData, setSubjectData] = useState<any>({ data: [], links: [] }) //甘特图主体数据
  const [gunterData, setGunterData] = useState<any>([]) //图数据

  const [select, setSelect] = useState<any>() //用于展示 线和不可用时间、给树传递id判断
  const [chart, setChart] = useState<any>([]) //图
  const [line, setLine] = useState<any>([]) //线
  const [iframeType, setIframeType] = useState<any>() //iframe类型
  const {
    productionSingleView,
    resourceMap,
    getLine,
    comparisonChart,
    productionView
  } = orderApis

  function parse(search) {
    if (typeof search !== 'string') {
      throw new Error('parse(): 传入参数类型不正确')
    }
    if (search.indexOf('?') > -1) {
      const queryArr = search.slice(search.indexOf('?') + 1).split('&')
      const obj = {}
      for (const item of queryArr) {
        const key = item.split('=')[0]
        const value = item.split('=')[1]
        obj[key] = decodeURIComponent(value)
      }
      return obj
    }
  }
  useEffect(() => {
    const locationId: any = parse(location.search)
    getChart(locationId)
    setIframeType(locationId)
  }, [location])

  // 获取api数据
  const getGanttData = async (type: any, id: any) => {
    // 普通
    if (type === '1') {
      const res = await productionView({ factoryId: id })
      return res
    }

    //班组
    if (type === 'resourcedMap') {
      const res = await resourceMap({ factoryId: id })
      return res
    }
    //生产
    if (type === 'orderChart') {
      const res = await productionSingleView({ factoryId: id })
      return res
    }

    //对比图
    if (type === '2') {
      console.log('对比图 2')
      const newID = id.split(',')
      const res = await comparisonChart({ idList: newID })

      parent.postMessage({ data: res.data }, '*') //传递给父级

      setValue(res.data)

      return res
    }
    //对比图
    if (type === '3') {
      console.log(' 对比图 3')

      const newID = id.split(',')
      const res = await comparisonChart({ idList: newID })
      return res
    }
    //对比图
    if (type === '4') {
      console.log(' 对比图4')
      const newID = id.split(',')
      const res = await comparisonChart({ idList: newID })
      return res
    }
  }

  // 甘特图数据
  const getChart = async (v) => {
    const id = v.id
    console.log('🚀 ~ file: index.tsx ~ line 82 ~ getChart ~ v.id', v.id)
    const type = v.type
    const chart: any = await getGanttData(type, id)
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

  const updateList = (e: any) => {
    // console.log(e)
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
          update={iframeType}
          name={'iframe'}
          leftData={leftData} //左键
          rightData={rightData} //左键
          tasks={subjectData} //甘特图主体数据 { data: [], links: [] }
          zoom={currentZoom} // 缩放的状态  Days
          updateList={updateList} // 更新
        />
      </div>
    </div>
  )
}

export default IframeDome
