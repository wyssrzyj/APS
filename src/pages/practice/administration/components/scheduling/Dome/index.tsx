import { Button, Dropdown, Menu, Select } from 'antd'
import React, { useEffect, useState } from 'react'

import Gantt from './Gantt/index'
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
  const [currentZoom, setCurrentZoom] = useState<any>('Days') //缩放的状态
  const [data, setData] = useState<any>({ data: [], links: [] }) //初始值为空
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
          type: true,
          text: '裁剪车间—裁剪班组', //名称
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
    setData(list)
  }

  //划过事件
  const logDataUpdate = (type: any, action: any, item: any, id: any) => {
    console.log(item)
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
