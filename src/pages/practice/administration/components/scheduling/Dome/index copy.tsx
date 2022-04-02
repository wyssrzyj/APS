import { Button, Dropdown, Menu, Select } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import Gantt from './Gantt/index'

//碰撞代码 防止后面添加这个功能
function DHX() {
  const { Option } = Select
  /**
   * Year 年
   * Quarter 月
   * Days 日
   * Hours 时
   *
   */
  const sum = [
    { name: '年', id: 'Year' },
    { name: '月', id: 'Quarter' },
    { name: '日', id: 'Days' },
    { name: '时', id: 'Hours' }
  ]
  // const currentZoom = 'Hours'
  const [currentZoom, setCurrentZoom] = useState<any>('Days') //缩放的状态
  const [data, setData] = useState<any>({ data: [], links: [] }) //初始值为空

  // const [record, setRecord] = useState<any>() //更新的是谁
  // const [brother, setBrother] = useState<any>() //行的数据

  useEffect(() => {
    api()
  }, [])
  const api = () => {
    const list: any = {
      /**
       * 图-格式
       * type //判断是否可以移动
       * text 名称
       * duration 天数
       * progress 控制完成百分比 范围0-1
       *  color控制颜色
       * start_date 开始时间
       * end_date 结束时间
       *
       *  render: 'split' 添加同一行 儿子用
       *
       * parent ***谁是自己的父亲*** 儿子和父亲用
       */

      /**线
       *
       * links
       *source
       * target
       * type 1头0尾巴
       * parent: 1 属于谁
       */

      data: [
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
      ],
      /**
       * id 线的id唯一
       * { id: 1, source: 2, target: 13, type: 0 },
       *  2的尾部连接13
       */

      links: [
        { id: 1, source: 1, target: 2, type: 0 },
        { id: 3, source: 2, target: 3, type: 0 }
      ]
    }

    //获取数据中行的值~~
    // if (!isEmpty(list.data)) {
    //   const arrDome = list.data.filter((item: any) => item.render !== undefined)
    //   setBrother(arrDome)
    // }

    setData(list)
  }

  //碰撞方法 ----开始

  // const judgeBrother = (v: any, e: any, sum: any) => {
  //   //v  当前行的值
  //   //e 更新的是谁
  //   //sum 老数据
  //   const subscript = v.findIndex((item: any) => item.id === e.parent)
  //   if (subscript !== -1) {
  //     const brothers = sum.data.filter((item: any) => item.parent === e.parent)
  //     console.log('当前行的所有兄弟', brothers)
  //     if (
  //       moment(brothers[0].end_date).valueOf() >
  //       moment(brothers[1].start_date).valueOf()
  //     ) {
  //       //超过的时候 2的首减去1的尾
  //       const exceed =
  //         moment(brothers[1].start_date).valueOf() -
  //         moment(brothers[0].end_date).valueOf()
  //       console.log(Math.abs(exceed))
  //       //增加
  //       const increase =
  //         moment(brothers[1].start_date).valueOf() + Math.abs(exceed)
  //       brothers[1].start_date = moment(increase).format('YYYY-MM-DD ')
  //       console.log('超过')
  //       // replaceData(brothers, sum)
  //     }
  //   }
  // }

  // 时间处理完毕替换方法 ---------------------开始-----------------------

  // 准备替换
  // const replaceData = (handle: any, oldData: any) => {
  //   //handle 处理的数据
  //   //oldData 旧数据
  //   if (!isEmpty(handle)) {
  //     handle.map((item: any) => {
  //       getNewData(item, oldData)
  //     })
  //   }
  // }
  // // 替换
  // const getNewData = (replacedValue: any, oldData: any) => {
  //   //替换的值 replacedValue
  //   //老数据 oldData
  //   const subscript = oldData.data.findIndex(
  //     (item: any) => item.id === replacedValue.id
  //   )
  //   oldData.data.splice(subscript, 1, replacedValue) //替换数据
  //   console.log('替换后的', oldData)
  //   //重新渲染
  //   setData(oldData)
  // }
  // 时间处理完毕替换方法 -----------------结束---------------------------

  //碰撞方法 ----结束

  // 碰撞方法

  // useEffect(() => {
  //   if (!isEmpty(data.data)) {
  //     if (!isEmpty(record)) {
  //       const sum = cloneDeep(data)

  //       judgeBrother(brother, record, sum)
  //     }
  //   }
  // }, [data, record])

  //划过事件
  const logDataUpdate = (type: any, action: any, item: any, id: any) => {
    // console.log(item)
  }
  const choose = (type: any) => {
    setCurrentZoom(type)
  }

  // 更新
  const updateList = (e: any) => {
    console.log(e)

    // setRecord(e)
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
  function handleChange(value: any) {
    console.log(`判断是班组还是生产 ${value}`)
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
        <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={currentZoom}
            onDataUpdated={logDataUpdate}
            updateList={updateList}
          />
        </div>
      </div>
    </div>
  )
}

export default DHX
