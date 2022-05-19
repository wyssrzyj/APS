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
      if (!isEmpty(chart)) {
        setSubjectData({
          data: chart,
          links: line
        })
      }

      // const dataqq = [
      //   {
      //     //父亲
      //     id: 1,
      //     type: true, //判断是否可以移动
      //     text: '裁剪车间—裁剪班组', //名称
      //     // duration: 6, //天数
      //     // progress: 1, //控制完成百分比 范围0-1
      //     color: '#ff4d4f', //控制颜色
      //     open: true
      //   },
      //   {
      //     //儿子
      //     id: 11,
      //     text: '生产单1',
      //     // start_date: '2020-04-07',
      //     // duration: 2,
      //     progress: 0.6,
      //     // parent: 1,
      //     color: '', //控制颜色
      //     render: 'split', //添加同一行
      //     open: true
      //   },
      //   {
      //     //孙子
      //     id: 111,
      //     text: '卢英杰的子1',
      //     start_date: '2020-04-6', //开始时间
      //     end_date: '2020-04-7 ', //结束时间
      //     duration: 1,
      //     progress: 0.6,
      //     parent: 11,
      //     color: '#52c41a', //控制颜色
      //     open: true
      //   },

      //   {
      //     //儿子
      //     id: 22,
      //     text: '生产单2',
      //     progress: 0.6,
      //     parent: 1,
      //     color: '', //控制颜色
      //     render: 'split', //添加同一行
      //     open: true
      //   },
      //   {
      //     //孙子
      //     id: 222,
      //     text: '订2',
      //     start_date: '2020-04-8', //开始时间
      //     end_date: '2020-04-9', //结束时间
      //     duration: 1,
      //     progress: 0.6,
      //     parent: 22,
      //     color: '#52c41a', //控制颜色
      //     open: true
      //   }
      // ]

      // const linksqq = [
      //   { id: 1, source: 111, target: 112, type: 0 },
      //   { id: 3, source: 2, target: 3, type: 0 }
      // ]
      // // 假数据
      // setSubjectData({
      //   data: dataqq,
      //   links: linksqq
      // })
    }
  }, [chart, line, gunterType])

  //点击
  useEffect(() => {
    // 线
    if (!isEmpty(select)) {
      getLineData(select)
    }

    // 获取对应的不可用时间
    // if (type === '0') {
    //点击
    if (!isEmpty(chart)) {
      const teamId = chart.filter((item: { id: any }) => item.id === select)[0]
        .teamId

      if (teamId !== null) {
        const unavailable: any = notWorking.filter(
          (item: { id: any }) => item.id === teamId
        )
        if (unavailable !== undefined && !isEmpty(unavailable)) {
          // console.log('点击不可用时间', unavailable[0].time)
          setRestDate(unavailable[0].time)
        }
      } else {
        // console.log('暂无')
        setRestDate(['2000-06-06'])
      }
    }
    // }

    // if (type === '1') {
    //   //移动
    //   const unavailable: any = notWorking.filter(
    //     (item: { id: any }) => item.id === select
    //   )
    //   if (unavailable !== undefined && !isEmpty(unavailable)) {
    //     setRestDate(unavailable[0].time)
    //   } else {
    //     console.log('空~~~~~~~~~~')
    //   }
    // }
  }, [select])

  //线接口
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
  //** 点击事件 点击父节点 传递 不可用时间
  const leftData = async (e: any) => {
    if (e !== null) {
      setSelect(e)
    }
  }

  // 更新
  const updateList = (e: any) => {
    setUpdateData(e)
  }

  //右键
  const rightData = (e: any) => {
    // if (e !== null) {
    //   // setGetLink(e)
    //   setOvertimeType(false)
    // } else {
    //   setOvertimeType(true)
    // }
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
            <Dropdown
              overlay={overtimeType ? rightClick : dontShow}
              trigger={['contextMenu']}
            >
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
