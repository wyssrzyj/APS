import { Button, Dropdown, Menu, message, Select, Tag } from 'antd'
import { cloneDeep, divide, isEmpty, keys } from 'lodash'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { dockingData } from '@/recoil'
import { schedulingApis, workOvertimeApis } from '@/recoil/apis'

// import GanttS from './Gantt copy'
import Gantt from './Gantt/index'
import styles from './index.module.less'
import Popup from './popup'
const Dhx = (props: {
  gunterData: any
  notWork: any
  updateMethod: any
  setHighlighted: any
  formData: any
  gunterType: any
  refresh: any
  treeSelection: any
  time: any
}) => {
  const {
    gunterData,
    notWork,
    updateMethod,
    setHighlighted,
    formData,
    gunterType,
    refresh,
    treeSelection,
    time
  } = props
  const { getLine, calculateEndTimeAfterMove } = schedulingApis
  const { factoryList } = workOvertimeApis

  const [currentZoom, setCurrentZoom] = useState<any>('Days') //缩放的状态  Days

  const [updateData, setUpdateData] = useState<any>() //更新的值
  const [subjectData, setSubjectData] = useState<any>({ data: [], links: [] }) //甘特图主体数据
  const [chart, setChart] = useState<any>([]) //图
  const [line, setLine] = useState<any>([]) //线
  // const [linek, setLinek] = useState<any>([]) //线

  const [notWorking, setNotWorking] = useState<any>([]) //所有不可工作时间

  //初始拖动
  const [InitialDrag, setInitialDrag] = useState<any>([]) //初始拖动数据
  const [restDate, setRestDate] = useState<any>() //单个班组的不可用日期

  const [select, setSelect] = useState<any>() //用于展示 线和不可用时间、给树传递id判断
  const [getLink, setGetLink] = useState<any>() //右键获取线

  const [isModalVisible, setIsModalVisible] = useState(false) //添加加班
  const [factoryData, setFactoryData] = useState<any>([]) //工厂
  const [overtimeType, setOvertimeType] = useState<any>(false) //判断右键是否有值 有值且不展示添加加班
  const [movingDistance, setMovingDistance] = useState<any>({ x: 0, y: 0 })
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res: any = await factoryList()
    const arr: any = res.data

    if (res.code === 200) {
      arr.map((item: { name: any; deptName: any }) => {
        item.name = item.deptName
      })
      setFactoryData(arr)
    }
  }

  useEffect(() => {
    if (!isEmpty(gunterData) && !isEmpty(notWork)) {
      setChart(gunterData)
    } else {
      setChart([])
    }

    setLine([]) //线 //初始的时候传空.
    setNotWorking(notWork) //不可工作时间
  }, [gunterData, notWork, gunterType])

  useEffect(() => {
    if (chart !== undefined && line !== undefined) {
      if (!isEmpty(chart)) {
        setSubjectData({
          data: chart,
          links: line
        })
      } else {
        //没有数据展示空值
        const arr = { data: [], links: [] }
        setSubjectData({ ...arr })
      }
    }
  }, [chart, line, gunterType])

  //点击
  useEffect(() => {
    // 线
    if (!isEmpty(select)) {
      getLineData(select, gunterType)
    }

    // 获取对应的不可用时间
    // if (type === '0') {
    //点击
    if (!isEmpty(chart)) {
      const arr = chart.filter((item: { id: any }) => item.id === select)
      const teamId = !isEmpty(arr) ? arr[0].teamId : null
      if (teamId !== null) {
        const unavailable: any = notWorking.filter(
          (item: { id: any }) => item.id === teamId
        )
        if (unavailable !== undefined && !isEmpty(unavailable)) {
          setRestDate(unavailable[0].time)
        }
      } else {
        setRestDate(['2000-06-06'])
      }
    }
    // }
  }, [select, gunterType])

  //线接口
  const getLineData = async (id: string, type: string) => {
    const hasOutsource = type === '0' ? false : null
    const line: Record<string, any> = await getLine({ id, hasOutsource }) //线
    if (line.code === 200) {
      setLine(line.data || [])
    }
  }

  // 判断改日期是否可用
  const judgeAvailableDate = (v: {
    teamId: any
    parent: any
    start_date: string | any[]
  }) => {
    const parenTime: string[][] = []

    !isEmpty(notWorking) &&
      notWorking.map((item: { id: any; time: string[] }) => {
        if (item.id === v.teamId) {
          parenTime.push(item.time)
        }
      })
    //获取不可操作时间
    const currentStart = v.start_date.slice(0, -5) //更新开始时间
    const state = moment(moment(currentStart).valueOf()).format('YYYY-MM-DD') //因为字符转不相等所以转时间戳进行比较
    const susa = parenTime.flat(Infinity)
    return susa.includes(state)
  }

  //移动
  useEffect(() => {
    if (!isEmpty(chart)) {
      if (updateData) {
        // setType('1')
        //判断日期是否可用
        if (judgeAvailableDate(updateData)) {
          //提示
          const tipsID = chart.filter(
            (item: { id: any }) => item.id === updateData.parent
          )[0].parent
          if (tipsID === 0) {
            //非 同行
            const tips = chart.filter(
              (item: { id: any }) => item.id === updateData.parent
            )
            message.warning(`该日期【${tips[0].text}】不可用,请误重复操作`, 2)
            updateMethod && updateMethod()
          } else {
            // 同行
            const tips = chart.filter((item: { id: any }) => item.id === tipsID)
            message.warning(`该日期【${tips[0].text}】不可用,请误重复操作`, 2)
            updateMethod && updateMethod()
          }
        } else {
          // 可用走保存
          getEndTime(
            moment(updateData.start_date).valueOf(),
            updateData.id,
            updateData.teamId
          )
          refresh && refresh()
        }
      }
    }
  }, [updateData])

  //移动更新保存
  const getEndTime = async (
    planStartTime: number,
    detailId: any,
    teamId: any
  ) => {
    await calculateEndTimeAfterMove({
      planStartTime,
      detailId,
      teamId
    })
    message.success(`更新完成`)
  }

  const choose = (type: any) => {
    setCurrentZoom(type)
  }
  //获取x轴的距离
  const distanceX = (id) => {
    console.log('选中的id', id)
    if (!isEmpty(chart)) {
      console.log('主体数据', chart)
      const currentItem = chart.filter((item) => item.id === id)
      if (!isEmpty(currentItem)) {
        const currentStartTime = moment(currentItem[0].start_date).valueOf()
        const timeDifference = time.startDate - currentStartTime
        //获取x的位移距离
        const x = timeDifference / 1000 / 60 / 60 / 24
        return Math.abs(x * 100)
      }
    }

    console.log('时间', time)
  }

  //** 点击事件 点击父节点 传递 不可用时间
  const leftData = async (id: string) => {
    if (id !== null) {
      setSelect(id)
    }
  }
  //树选中
  useEffect(() => {
    setSelect(treeSelection)
    console.log('x轴的距离', distanceX(treeSelection))
    setMovingDistance({ x: distanceX(treeSelection), y: 0 })
  }, [treeSelection])
  0
  // 更新
  const updateList = (e: any) => {
    setUpdateData(e)
  }

  //右键
  const rightData = (e: any) => {
    if (e !== null) {
      // setGetLink(e)
      setOvertimeType(false)
    } else {
      setOvertimeType(true)
    }
  }
  const rightClick = (
    <Menu>
      <Menu.Item key="1">
        <Tag
          color="green"
          onClick={() => {
            setIsModalVisible(true)
          }}
        >
          新增加班
        </Tag>
      </Menu.Item>
    </Menu>
  )
  const dontShow = <div></div>

  // 图和树联动-判断传递的id
  useEffect(() => {
    if (!isEmpty(chart)) {
      if (!isEmpty(select)) {
        const gunter = chart.filter((item: { id: any }) => item.id === select)
        if (!isEmpty(gunter[0])) {
          //根据不同工段传递不同id 只有缝制工段才传id
          const id = gunter[0].id
          // gunter[0].section === '2' ? gunter[0].id : gunter[0].assignmentId
          setHighlighted && setHighlighted(id)
        }
      }
    }
  }, [select, chart])

  const content = {
    formData,
    updateMethod,
    isModalVisible,
    setIsModalVisible,
    factoryData
    // setEdit
  }
  return (
    <div>
      <div>
        <div className={styles.ganttContent}>
          <div>
            <Dropdown
              overlay={overtimeType ? rightClick : dontShow}
              trigger={['contextMenu']}
            >
              <div className="site-dropdown-context-menu">
                <div className="gantt-container">
                  <Gantt
                    select={select}
                    movingDistance={movingDistance}
                    name={'lyj'}
                    leftData={leftData}
                    rightData={rightData}
                    tasks={subjectData}
                    zoom={currentZoom}
                    updateList={updateList}
                    // restDate={restDate} //不可用时间
                  />
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
        <Popup content={content} />
      </div>
    </div>
  )
}

export default Dhx
