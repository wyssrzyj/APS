import { Button, Dropdown, Menu, message, Select, Tag } from 'antd'
import { cloneDeep, divide, isEmpty, keys } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
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
}) => {
  const {
    gunterData,
    notWork,
    updateMethod,
    setHighlighted,
    formData,
    gunterType
  } = props
  const { getLine, calculateEndTimeAfterMove } = schedulingApis
  const { factoryList } = workOvertimeApis

  const [currentZoom, setCurrentZoom] = useState<any>('Days') //缩放的状态  Days

  const [updateData, setUpdateData] = useState<any>() //更新的值
  const [subjectData, setSubjectData] = useState<any>({ data: [], links: [] }) //甘特图主体数据
  const [chart, setChart] = useState<any>([]) //图
  const [line, setLine] = useState<any>([]) //线

  const [notWorking, setNotWorking] = useState<any>([]) //所有不可工作时间

  //初始拖动
  const [InitialDrag, setInitialDrag] = useState<any>([]) //初始拖动数据
  const [restDate, setRestDate] = useState<any>() //单个班组的不可用日期

  const [select, setSelect] = useState<any>([]) //用于展示 线和不可用时间、给树传递id判断
  const [type, setType] = useState<any>() //判断是点击还是移动
  const [isModalVisible, setIsModalVisible] = useState(false) //添加加班
  const [factoryData, setFactoryData] = useState<any>([]) //工厂

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
    }
    setLine([]) //线 //初始的时候传空
    setNotWorking(notWork) //不可工作时间
  }, [gunterData, notWork, gunterType])

  useEffect(() => {
    if (chart !== undefined && line !== undefined) {
      setSubjectData({
        data: chart,
        links: line
      })
      console.log('合并树', {
        data: chart,
        links: line
      })
    }
  }, [chart, line, gunterType])

  useEffect(() => {
    // 线
    if (!isEmpty(select)) {
      getLineData(select)
    }

    // 获取对应的不可用时间
    if (type === '0') {
      //点击
      if (!isEmpty(chart)) {
        console.log('chart', chart)
        console.log('select', select)

        const teamId = chart.filter(
          (item: { id: any }) => item.id === select
        )[0].teamId

        if (teamId !== null) {
          const unavailable: any = notWorking.filter(
            (item: { id: any }) => item.id === teamId
          )
          if (unavailable !== undefined && !isEmpty(unavailable)) {
            setRestDate(unavailable[0].time)
          }
        } else {
          console.log('置空')
          setRestDate(['2000-06-06'])
        }
      }
    }

    if (type === '1') {
      //移动
      const unavailable: any = notWorking.filter(
        (item: { id: any }) => item.id === select
      )
      if (unavailable !== undefined && !isEmpty(unavailable)) {
        setRestDate(unavailable[0].time)
      }
    }
  }, [select, type])

  const getLineData = async (id: any) => {
    const line: any = await getLine({ id }) //线
    if (line.code === 200) {
      setLine(line.data === null ? [] : line.data)
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

  useEffect(() => {
    if (!isEmpty(chart)) {
      if (!isEmpty(updateData)) {
        // 移动
        setType('1')
        setSelect(updateData.teamId)
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
            message.error(`该日期【${tips[0].text}】不可用,请误重复操作`, 2)
            updateMethod && updateMethod()
          } else {
            // 同行
            const tips = chart.filter((item: { id: any }) => item.id === tipsID)
            message.error(`该日期【${tips[0].text}】不可用,请误重复操作`, 2)
            updateMethod && updateMethod()
          }
        } else {
          getEndTime(
            moment(updateData.start_date).valueOf(),
            updateData.id,
            updateData.teamId
          )
        }
      }
    }
  }, [updateData])

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
    updateMethod && updateMethod()
  }
  const choose = (type: any) => {
    setCurrentZoom(type)
  }
  // 更新
  const updateList = (e: any) => {
    setUpdateData(e)
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

  const rightData = (e: any) => {
    console.log('右键', e)
  }
  //** 点击事件 点击父节点 传递 不可用时间
  const leftData = async (e: any) => {
    setSelect(e)
    setType('0')
  }
  // 图和树联动-判断传递的id
  useEffect(() => {
    if (!isEmpty(chart)) {
      if (!isEmpty(select)) {
        const gunter = chart.filter((item: { id: any }) => item.id === select)

        if (!isEmpty(gunter[0])) {
          const id =
            gunter[0].section === '2' ? gunter[0].id : gunter[0].assignmentId
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
            <Dropdown overlay={rightClick} trigger={['contextMenu']}>
              <div className="site-dropdown-context-menu">
                <div className="gantt-container">
                  <Gantt
                    name={'test'}
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
