import { Button, Dropdown, Menu, message, Select, Tag } from 'antd'
import { cloneDeep, isEmpty, keys } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'

import Gantt from './Gantt/index'
import styles from './index.module.less'
import Popup from './popup'
const Dhx = (props: {
  setHighlighted: any
  formData: any
  gunterType: any
}) => {
  const { setHighlighted, formData, gunterType } = props
  // console.log('甘特图类型', gunterType)

  const { figureData, getLine, calculateEndTimeAfterMove, workingDate } =
    practice

  const [currentZoom, setCurrentZoom] = useState<any>('Days') //缩放的状态  Days
  const [subjectData, setSubjectData] = useState<any>({ data: [], links: [] }) //甘特图主体数据
  const [updateData, setUpdateData] = useState<any>() //更新的值
  const [chart, setChart] = useState<any>() //图
  const [line, setLine] = useState<any>() //线
  const [notWorking, setNotWorking] = useState<any>([]) //不可工作时间

  //初始拖动
  const [InitialDrag, setInitialDrag] = useState<any>([]) //初始拖动数据
  const [restDate, setRestDate] = useState<any>() //单个班组的不可用日期

  const [select, setSelect] = useState<any>([]) //用于展示 线和不可用时间、给树传递id判断
  const [type, setType] = useState<any>() //判断是点击还是移动
  const [isModalVisible, setIsModalVisible] = useState(false) //添加加班

  useEffect(() => {
    if (formData !== undefined) {
      getChart(formData)
    }
  }, [formData])

  const getChart = async (id: undefined) => {
    const chart: any = await figureData({ factoryId: id }) //图
    console.log('图', chart)

    if (chart.code === 200) {
      //格式处理
      chart.data.map(
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
      /**
       * type //判断是否可以移动
       * text 名称
       * duration 天数
       * progress 控制完成百分比 范围0-1
       *  color控制颜色
       * start_date 开始时间
       * end_date 结束时间
       *  render: 'split' 添加同一行 只有儿子用
       * parent ***谁是自己的父亲*** 儿子和父亲用
       */

      setChart(chart.data) //图
      setLine([]) //线 //初始的时候传空
    }
    //班组不可工作时间

    const notAvailable = await workingDate({ type: gunterType })
    const sum = keys(notAvailable).map((item) => {
      return { time: notAvailable[item], id: item }
    })
    setNotWorking(sum)
  }
  useEffect(() => {
    if (chart !== undefined && line !== undefined) {
      setSubjectData({
        data: chart,
        links: line
      })
    }
  }, [chart, line])

  useEffect(() => {
    // 线
    getLineData()

    // 获取对应的不可用时间
    if (type === '0') {
      //点击
      if (!isEmpty(chart)) {
        const teamId = chart.filter(
          (item: { id: any }) => item.id === select
        )[0].teamId
        if (teamId !== null) {
          const unavailable: any = notWorking.filter(
            (item: { id: any }) => item.id === teamId
          )
          if (unavailable !== undefined && !isEmpty(unavailable)) {
            console.log('不可用时间测试...', unavailable[0].time)

            setRestDate(unavailable[0].time)
          }
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
    // console.log('测试线Dome~~~~~', select)
    // if (select === '1') {
    //   setLine([{ id: 1, source: 1, target: 3, type: 0 }])
    // }
    // if (select === '3') {
    //   setLine([{ id: 1, source: 3, target: 4, type: 0 }])
    // }
  }, [select, type])

  const getLineData = async () => {
    const line: any = await getLine({ id: '1508975275202707458' }) //线
    if (line.code === 200) {
      setLine(line.data)
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
            getChart(formData)
          } else {
            // 同行
            const tips = chart.filter((item: { id: any }) => item.id === tipsID)
            message.error(`该日期【${tips[0].text}】不可用,请误重复操作`, 2)
            getChart(formData)
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
    getChart(formData)
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
          console.log('图数据', id)
          setHighlighted && setHighlighted(id)
        }
      }
    }
  }, [select, chart])
  const content = { isModalVisible, setIsModalVisible }

  return (
    <div>
      <div>
        <div>
          {/* <Dropdown overlay={menu} placement="topRight" arrow>
            <Button>缩放</Button>
          </Dropdown> */}
        </div>
        <div className={styles.ganttContent}>
          <div>
            <Dropdown overlay={rightClick} trigger={['contextMenu']}>
              <div className="site-dropdown-context-menu">
                <div className="gantt-container">
                  <Gantt
                    leftData={leftData}
                    rightData={rightData}
                    tasks={subjectData}
                    zoom={currentZoom}
                    // onDataUpdated={logDataUpdate}
                    updateList={updateList}
                    // drag={drag}
                    restDate={restDate}
                  />
                </div>
              </div>
            </Dropdown>
            ,
          </div>
        </div>
        <Popup content={content} />
      </div>
    </div>
  )
}

export default Dhx
