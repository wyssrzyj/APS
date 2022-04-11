import { Button, Dropdown, Menu, message, Select, Tag } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import Gantt from './Gantt/index'
import styles from './index.module.less'
const Dhx = (props: { setHighlighted: any }) => {
  const { setHighlighted } = props
  const { Option } = Select
  /**
   * Year 年
   * Quarter 月
   * Days 日
   * Hours 时
   *
   */
  const dome = [
    //给父节点设置一个单独的状态 用于判断不可移动
    {
      id: '1',
      type: '1',
      text: '裁剪车间—裁剪班组', //名称
      startDate: null,
      endDate: null,
      progress: 0.0,
      render: null,
      parent: null,
      // start_date: '2020-04-07', //日期
      // duration: 6, //天数
      // progress: 1, //控制完成百分比 范围0-1
      color: 'red' //控制颜色
    },
    {
      id: '1008611',
      text: '车缝班组',
      // start_date: '2020-04-07',
      // duration: 2,
      progress: 0.6,
      parent: '1',
      color: '', //控制颜色
      render: 'split' //添加同一行
    },
    {
      //孙子
      id: '111',
      parentID: '1', //父id
      text: '卢英杰的子3',
      start_date: '2020-04-6', //开始时间
      end_date: '2020-04-7', //结束时间
      duration: 1,
      progress: 0.6,
      parent: '1008611',
      color: 'red' //控制颜色
    },
    {
      //孙子
      id: '112',
      parentID: '1', //父id
      text: '卢英杰的子4',
      start_date: '2020-04-2', //开始时间
      end_date: '2020-04-3', //结束时间
      duration: 1,
      progress: 0.6,
      parent: '1008611',
      color: 'red' //控制颜色
    },
    {
      id: '12',
      text: '待计划',
      type: '1',
      start_date: '2020-04-6',
      duration: 2,
      progress: 0.6
    },
    {
      id: '8848',
      text: '已计划',
      type: '1',
      start_date: '2020-04-6',
      duration: 2,
      color: 'pink',
      progress: 0.6
    }
  ]
  const sum = [
    { name: '年', id: 'Year' },
    { name: '月', id: 'Quarter' },
    { name: '日', id: 'Days' },
    { name: '时', id: 'Hours' }
  ]
  const notWorking = [
    { id: '1', time: ['2020-04-04', '2020-04-05'] }, //裁剪
    { id: '22', time: ['2020-04-07', '2020-04-08'] } //缝制
  ] //班组不可工作时间

  const [currentZoom, setCurrentZoom] = useState<any>('Days') //缩放的状态  Days
  const [subjectData, setSubjectData] = useState<any>({ data: [], links: [] }) //甘特图主体数据
  const [updateData, setUpdateData] = useState<any>() //更新的值
  const [chart, setChart] = useState<any>() //图
  const [line, setLine] = useState<any>() //线
  const [availableDate, setAvailableDate] = useState<any>() //可用暂存
  const [Test, setTest] = useState<any>() //可用暂存
  //初始拖动
  const [InitialDrag, setInitialDrag] = useState<any>([]) //初始拖动数据
  const [restDate, setRestDate] = useState<any>() //单个班组的休息日期

  useEffect(() => {
    api()
  }, [])

  const api = () => {
    /**
     * type //判断是否可以移动
     * text 名称
     * duration 天数
     * progress 控制完成百分比 范围0-1
     *  color控制颜色
     * start_date 开始时间
     * end_date 结束时间
     *
     *  render: 'split' 添加同一行 只有儿子用
     * parent ***谁是自己的父亲*** 儿子和父亲用
     */
    const sum = [
      //给父节点设置一个单独的状态 用于判断不可移动
      {
        id: '1',
        type: '1',
        text: '裁剪车间—111111', //名称
        startDate: null,
        endDate: null,
        progress: 0.0,
        render: null,
        parent: null
        // start_date: '2020-04-07', //日期
        // duration: 6, //天数
        // progress: 1, //控制完成百分比 范围0-1
        // color: 'rgb(243, 224, 78)' //控制颜色
      },
      {
        id: '1008611',
        text: '车缝班组',
        // start_date: '2020-04-07',
        // duration: 2,
        progress: 0.6,
        parent: '1',
        color: '', //控制颜色
        render: 'split' //添加同一行
      },
      {
        //孙子
        id: '111',
        // parentID: '1', //父id
        text: '卢英杰的子1',
        start_date: '2020-04-6', //开始时间
        end_date: '2020-04-7', //结束时间
        duration: 1,
        progress: 0.6,
        parent: '1008611',
        color: 'rgb(28, 160, 127)' //控制颜色
      },
      {
        //孙子
        id: '112',
        // parentID: '1', //父id
        text: '卢英杰的子2',
        start_date: '2020-04-3', //开始时间
        end_date: '2020-04-4', //结束时间
        duration: 1,
        progress: 0.6,
        parent: '1008611',
        color: '#1890ff' //控制颜色
      },
      {
        id: '12',
        text: '待计划',
        type: '1',
        start_date: '2020-04-6',
        duration: 2,
        progress: 0.6
      },
      {
        id: '8848',
        text: '已计划',
        type: '1',
        start_date: '2020-04-6',
        duration: 2,
        color: 'pink',
        progress: 0.6
      },
      {
        id: '22',
        type: '1',
        text: '裁剪车间—裁剪班组', //名称
        startDate: null,
        endDate: null,
        progress: 0.0,
        render: null,
        parent: null
        // start_date: '2020-04-07', //日期
        // duration: 6, //天数
        // progress: 1, //控制完成百分比 范围0-1
        // color: 'red' //控制颜色
      },
      {
        id: '222',
        text: '车缝班组',
        // start_date: '2020-04-07',
        // duration: 2,
        progress: 0.6,
        parent: '22',
        color: '', //控制颜色
        render: 'split' //添加同一行
      },
      {
        //孙子
        id: '2221',
        // parentID: '222', //父id
        text: '卢英杰的子1',
        start_date: '2020-04-2', //开始时间
        end_date: '2020-04-3', //结束时间
        duration: 1,
        progress: 0.6,
        parent: '222',
        color: 'red' //控制颜色
      },
      {
        //孙子
        id: '2222',
        // parentID: '222', //父id
        text: '卢英杰的子2',
        start_date: '2020-04-3', //开始时间
        end_date: '2020-04-4', //结束时间
        duration: 1,
        progress: 0.6,
        parent: '222',
        color: 'rgb(33, 114, 141)' //控制颜色
      }
    ]

    const link = [
      { id: 1, source: 111, target: 112, type: 0 },
      { id: 2, source: 111, target: 4, type: 0 }
    ]

    const list: any = {
      data: sum,
      /**
       *
       *
       * id 唯一
       * { id: 1, source: 2, target: 13, type: 0 },
       * 2的尾部连接13
       */

      links: link
    }
    setChart(sum) //图
    setLine(link) //线
    // setSubjectData(list)
  }
  useEffect(() => {
    if (chart !== undefined && line !== undefined) {
      console.log(chart)
      console.log(line)
      setSubjectData({
        data: chart,
        links: line
      })
    }
  }, [chart, line])

  // 判断改日期是否可用
  const judgeAvailableDate = (v: {
    parent: any
    start_date: string | any[]
  }) => {
    const parentId = chart.filter(
      (item: { id: any }) => item.id === v.parent
    )[0].parent
    //获取不可操作时间
    const parenTime: string[][] = []
    !isEmpty(notWorking) &&
      notWorking.map((item) => {
        if (item.id === parentId) {
          parenTime.push(item.time)
        }
      })
    const currentStart = v.start_date.slice(0, -5) //更新开始时间
    const state = moment(moment(currentStart).valueOf()).format('YYYY-MM-DD') //因为字符转不相等所以转时间戳进行比较
    const susa = parenTime.flat(Infinity)
    return susa.includes(state)
  }

  useEffect(() => {
    if (!isEmpty(chart)) {
      if (!isEmpty(updateData)) {
        //日期不可用
        if (judgeAvailableDate(updateData)) {
          //如果拖拽到了 不可用日期 直接重新获取渲染数据的接口 不需要额外的附加操作
          message.error('该日期不可用,请误重复操作', 1)
          //直接获取接口数据 dome
          // setChart([...dome])
          api()

          // const sum = cloneDeep(chart) //拷贝总数据
          // if (!isEmpty(availableDate)) {
          //   const subscript = sum.findIndex(
          //     (item: any) => item.id === availableDate.id
          //   )
          //   sum.splice(subscript, 1, availableDate)
          //   setChart([...sum])
          // } else {
          //   // 直接拖拽到不可用日期的判断
          //   InitialDrag[0].start_date = moment(
          //     InitialDrag[0].start_date
          //   ).format('YYYY-MM-DD')
          //   InitialDrag[0].end_date = moment(InitialDrag[0].end_date).format(
          //     'YYYY-MM-DD'
          //   )
          //   const subscript = sum.findIndex(
          //     (item: any) => item.id === InitialDrag[0].id
          //   )
          //   sum.splice(subscript, 1, InitialDrag[0])
          //   setChart(sum)
          // }
        } else {
          // 可用 掉接口保存
          setAvailableDate(updateData)
          setTest(updateData) //没走这里的方法
        }
      }
    }
  }, [updateData])
  useEffect(() => {
    console.log('Test', Test)
  }, [Test])

  //划过事件
  const logDataUpdate = (type: any, action: any, item: any, id: any) => {
    // console.log(item)
  }
  const choose = (type: any) => {
    setCurrentZoom(type)
  }

  // 更新
  const updateList = (e: any) => {
    setUpdateData(e)
  }
  //初始拖拽
  const drag = (e: any) => {
    if (InitialDrag.length < 1) {
      InitialDrag.push(e)
    }

    setInitialDrag([...InitialDrag])
  }
  const menu = (
    <Menu>
      {sum.map((item) => (
        <>
          <Menu.Item>
            <div onClick={() => choose(item.id)} key={item.id}>
              {item.name}
            </div>
          </Menu.Item>
        </>
      ))}
    </Menu>
  )
  const rightClick = (
    <Menu>
      <Menu.Item key="1">
        <Tag color="green">新增加班</Tag>
      </Menu.Item>
    </Menu>
  )
  function handleChange(value: any) {
    console.log(`判断是班组还是生产 ${value}`)
  }
  const rightData = (e: any) => {
    console.log('右键', e)
    // setHighlighted && setHighlighted(e)
  }
  //**点击父节点 传递 不可用时间
  const leftData = (e: any) => {
    setHighlighted && setHighlighted(e)

    console.log('点击事件执行a', e)
    const unavailable: any = notWorking.filter((item) => item.id === e)
    if (unavailable !== undefined && !isEmpty(unavailable)) {
      setRestDate(unavailable[0].time)
    }
  }

  return (
    <div>
      <div>
        <div>
          <Dropdown overlay={menu} placement="topRight" arrow>
            <Button>缩放</Button>
          </Dropdown>
          <Select
            defaultValue="1"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="1">班组甘特图</Option>
            <Option value="2">生产甘特图</Option>
          </Select>
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
                    onDataUpdated={logDataUpdate}
                    updateList={updateList}
                    drag={drag}
                    restDate={restDate}
                  />
                </div>
              </div>
            </Dropdown>
            ,
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dhx
