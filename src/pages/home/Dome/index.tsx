import { Button, Dropdown, Menu } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import Gantt from './Gantt/index'
function DHX() {
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
  const [newData, setNewData] = useState<any>([]) //新数据

  const [record, setRecord] = useState<any>() //更新的是谁
  const [brother, setBrother] = useState<any>() //行
  const [first, setFirst] = useState<any>() //首

  const [messages, setMessages] = useState<any>([
    { message: 'link create: 1648541366992  ( source: 1, target: 2 )' }
  ])
  useEffect(() => {
    api()
  }, [])
  const api = () => {
    const list: any = {
      /**
       * links
       *source
       * target
       * type 1头0尾巴
       *   parent: 1 属于谁
       */

      data: [
        //给父节点设置一个单独的状态 用于判断不可移动
        {
          id: 1,
          text: '裁剪车间——裁剪班组', //名称
          // start_date: '2020-04-07', //日期
          // duration: 6, //天数
          // progress: 1, //控制完成百分比 范围0-1
          color: 'red' //控制颜色
        },
        {
          id: '1|0',
          text: '-生产单号1',
          // start_date: '2020-04-07',
          // duration: 2,
          progress: 0.6,
          parent: 1,
          color: '', //控制颜色
          render: 'split', //添加同一行
          parentID: 1
        },
        {
          id: '1|1',
          text: '卢英杰的子1',
          start_date: '2020-04-6 ', //开始时间
          end_date: '2020-04-7 ', //结束时间
          duration: 1,
          progress: 0.6,
          parent: '1|0',
          color: 'red', //控制颜色
          parentID: 1
        },
        {
          id: '1|2',
          text: '卢英杰的子2',
          start_date: '2020-04-10',
          duration: 2,
          progress: 0.6,
          parent: '1|0',
          parentID: 1
        },
        {
          id: '1|3',
          text: '卢英杰号的子3',
          start_date: '2020-04-12',
          duration: 2,
          progress: 0.6,
          parent: '1|0',
          parentID: 1
        },
        {
          id: '1|4',
          text: '路飞二号的子4',
          start_date: '2020-04-15',
          duration: 2,
          progress: 0.6,
          parent: '1|0',
          parentID: 1
        }
        //分割
        // {
        //   id: 3,
        //   text: '-生产单号2',
        //   start_date: '2020-04-10',
        //   duration: 3,
        //   progress: 0.6,
        //   parent: 1,
        //   parentID: 1
        // },
        // {
        //   id: 4,
        //   text: '路飞四号',
        //   start_date: '2020-04-12',
        //   duration: 3,
        //   parent: 1,
        //   parentID: 1,
        //   progress: 0.6
        // }
      ],
      /**
       * id 唯一
       * { id: 1, source: 2, target: 13, type: 0 },
       * 2的尾部连接13
       */

      links: [
        { id: 1, source: 1, target: 2, type: 0 },
        { id: 3, source: 2, target: 3, type: 0 },
        {
          source: '1|1',
          target: '1|2',
          type: '0',
          id: 1648692673517,
          nativeeditor_status: 'inserted'
        }
      ]
    }

    //获取数据中行的值~~
    if (!isEmpty(list.data)) {
      const arrDome = list.data.filter((item: any) => item.render !== undefined)
      setBrother(arrDome)
    }

    setData(list)
  }

  const judgeBrother = (v: any, e: any, sum: any) => {
    //v  当前行的值
    //e 更新的是谁
    //sum 老数据
    const subscript = v.findIndex((item: any) => item.id === e.parent)
    if (subscript !== -1) {
      const brothers = sum.data.filter((item: any) => item.parent === e.parent)
      console.log('当前行的所有兄弟', brothers)
      if (
        moment(brothers[0].end_date).valueOf() >
        moment(brothers[1].start_date).valueOf()
      ) {
        //超过的时候 2的首减去1的尾
        const exceed =
          moment(brothers[1].start_date).valueOf() -
          moment(brothers[0].end_date).valueOf()
        console.log(Math.abs(exceed))
        //增加
        const increase =
          moment(brothers[1].start_date).valueOf() + Math.abs(exceed)
        brothers[1].start_date = moment(increase).format('YYYY-MM-DD ')
        console.log('超过')
        replaceData(brothers, sum)
      }
    }
  }

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

  useEffect(() => {
    if (!isEmpty(data.data)) {
      if (!isEmpty(record)) {
        const sum = cloneDeep(data)
        // 测试
        judgeBrother(brother, record, sum)

        // const subscript = sum.data.findIndex(
        //   (item: any) => item.idx === record.idx
        // )
        // sum.data.splice(subscript, 1, record) //替换数据

        // setNewData(sum)
      }
    }
  }, [data, record])
  // useEffect(() => {
  //   if (!isEmpty(newData)) {
  //     console.log('处理后的数据', newData)
  //   }
  // }, [newData])
  // useEffect(() => {
  //   console.log('老数据', data)
  // }, [data])
  const addMessage = (message: any) => {
    const maxLogLength = 5
    const newMessage = { message }
    const messagesDome = [newMessage, ...messages]
    if (messagesDome.length > maxLogLength) {
      messagesDome.length = maxLogLength
    }
    setMessages(messagesDome)
  }
  //划过事件
  const logDataUpdate = (type: any, action: any, item: any, id: any) => {
    // const oldData = cloneDeep(data.data)
    // if (!isEmpty(oldData)) {
    //   console.log('老数据', oldData)
    //   console.log('item', item)
    // }
    // api()
  }
  const choose = (type: any) => {
    setCurrentZoom(type)
  }

  // 更新
  const updateList = (e: any) => {
    setRecord(e)
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
  return (
    <div>
      <div>
        <div>
          <Dropdown overlay={menu} placement="topRight" arrow>
            <Button>缩放</Button>
          </Dropdown>
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
