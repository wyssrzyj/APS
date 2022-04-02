import { Button, Dropdown, Menu, Select, Tag } from 'antd'
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
          id: '1',
          type: true,
          text: '裁剪车间—裁剪班组', //名称
          // start_date: '2020-04-07', //日期
          // duration: 6, //天数
          // progress: 1, //控制完成百分比 范围0-1
          color: 'red' //控制颜色
        },
        {
          id: '1008611',
          text: '-生产单号1',
          // start_date: '2020-04-07',
          // duration: 2,
          progress: 0.6,
          parent: '1',
          color: '', //控制颜色
          render: 'split' //添加同一行
        },
        {
          id: '11',
          text: '裁剪工段1',
          start_date: '2020-04-6  ', //开始时间
          end_date: '2020-04-7 ', //结束时间
          duration: 1,
          progress: 0.6,
          parent: '1008611',
          color: 'red' //控制颜色
        },
        {
          id: '12',
          text: '裁剪工段2',
          start_date: '2020-04-10',
          duration: 2,
          progress: 0.6,
          parent: '11'
        },
        {
          id: '13',
          text: '裁剪工段3',
          start_date: '2020-04-12',
          duration: 2,
          progress: 0.6,
          parent: '11'
        },

        //分割
        {
          id: '2',
          text: '生产单2号-车缝工段',
          // start_date: '2020-04-07',
          // duration: 2,
          progress: 0.6,
          parent: '1',
          color: '', //控制颜色
          render: 'split' //添加同一行
        },
        {
          id: '21',
          text: '裁剪工段1',
          start_date: '2020-04-6  ', //开始时间
          end_date: '2020-04-7  ', //结束时间
          duration: 1,
          progress: 0.6,
          parent: '2',
          color: 'red' //控制颜色
        },
        {
          id: '22',
          text: '裁剪工段2',
          start_date: '2020-04-10',
          duration: 2,
          progress: 0.6,
          parent: '2'
        },
        {
          id: '23',
          text: '裁剪工段3',
          start_date: '2020-04-12',
          duration: 2,
          progress: 0.6,
          parent: '2'
        },
        {
          id: '150549202581',
          text: '已计划有值测试',
          start_date: '2020-04-6',
          duration: 2,
          progress: 0.6
        },
        {
          id: '150549202580',
          text: '已计划没值测试',
          start_date: '2020-04-6',
          duration: 2,
          color: 'pink',
          progress: 0.6
        }
      ],
      /**
       * id 唯一
       * { id: 1, source: 2, target: 13, type: 0 },
       * 2的尾部连接13
       */

      links: [
        { id: 1, source: 111, target: 112, type: 0 },
        { id: 2, source: 111, target: 4, type: 0 },
        {
          source: 112,
          target: 113,
          type: '0',
          id: 1648692673517
        }
      ]
    }
    setData(list)
  }

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
  const leftData = (e: any) => {
    setHighlighted && setHighlighted(e)
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
                    tasks={data}
                    zoom={currentZoom}
                    onDataUpdated={logDataUpdate}
                    updateList={updateList}
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
