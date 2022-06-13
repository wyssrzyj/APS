import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'

import { gantt } from 'dhtmlx-gantt'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'

const Gantt = (props: any) => {
  const { zoom, tasks, updateList, leftData, restDate, name, select, update } =
    props
  const chartDom = document.getElementById(name) //获取id

  const [rest, setRest] = useState<any>([]) //单个班组的休息日期
  const [iframeType, setIframeType] = useState<any>(false) //单个班组的休息日期

  const locationRef = useRef({ x: 0, y: 0 })
  const treeSelection = useRef({ select: '' })
  useEffect(() => {
    if (update !== undefined) {
      if (update.type === '1' || update.type === '2') {
        setIframeType(true)
      } else {
        setIframeType(false)
      }
    } else {
      setIframeType(false)
    }
  }, [update])

  useEffect(() => {
    if (!isEmpty(restDate)) {
      setRest(restDate)
    }
  }, [restDate])

  useEffect(() => {
    setZoom(zoom, iframeType)
  }, [zoom, iframeType])

  useEffect(() => {
    if (!isEmpty(tasks.data)) {
      //获取滚动的距离
      const newLeft = locationRef.current.x || 0
      const newTop = locationRef.current.y || 0
      const selectRef = treeSelection.current.select || 0

      gantt.attachEvent('onGanttScroll', function (left, top) {
        locationRef.current = { x: left, y: top }
      })
      ganttShow(tasks) //渲染数据   勿动
      gantt.scrollTo(newLeft, newTop) //定位
      //选中项
      if (select !== undefined) {
        gantt.selectTask(selectRef)
      }
    } else {
      ganttShow({ data: [], links: [] })
    }
  }, [tasks])

  useEffect(() => {
    if (select !== null) {
      treeSelection.current.select = select
    }
  }, [select])
  // 静态方法
  const setZoom = (value: any, iframeType: any) => {
    if (!gantt.$initialized) {
      gantt.config.readonly = iframeType //只读
      initZoom()
    }
    //缩放-不可修该 勿动
    gantt.ext.zoom.setLevel(value)
  }
  // **需用和动态数据交互的方法
  useEffect(() => {
    if (!gantt.$initialized) {
      color()
    }

    //缩放-不可修该 勿动
    gantt.ext.zoom.setLevel(zoom)
  }, [rest, zoom])

  // 主要参数设置
  const initZoom = () => {
    gantt.i18n.setLocale('cn') //设置中文
    // gantt.config.readonly = iframeType.current.select //只读
    gantt.config.autoscroll = true //如果线超出屏幕可以x滚动
    gantt.config.order_branch = false // 左侧可以拖动
    gantt.config.sort = false //左侧点击表头排序
    gantt.config.drag_move = true //是否可以移动
    gantt.config.drag_progress = false //拖放进度
    gantt.config.drag_resize = false //控制大小
    // gantt.config.show_links = false //控制两端的线是否可以拖动
    gantt.config.details_on_dblclick = false //双击出弹窗
    gantt.config.show_errors = false //发生异常时，允许弹出警告到UI界面

    // 指定日期不可拖动

    //表头
    gantt.config.columns = [
      { name: 'text', label: '名称', tree: true, width: '250' },
      { name: 'start_date', label: '时间', align: 'center' }
      // { name: 'duration', label: 'Duration', align: 'center' }
      // { name: 'add', label: '' },
    ]
    //单击事件
    gantt.attachEvent('onTaskSelected', function (id: any) {
      //折叠所有任务：
      // gantt.eachTask(function (task) {
      //   task.$open = true
      // })
      // gantt.render()
      // gantt.render()
      leftData && leftData(id)
    })
    //单击右键
    gantt.attachEvent('onContextMenu', function (id: any) {
      // rightData && rightData(id)
    })
    // //拖拽时
    // gantt.attachEvent('onTaskDrag', function (id: any, v: any, item: any) {
    //   drag(item)
    // })

    //点击了空白
    // gantt.attachEvent('onEmptyClick', function (e: any) {
    //   console.log(e)
    // })

    // 可以通过此控制 是否可以拖动 当前的状态=1不可拖动
    gantt.attachEvent(
      'onBeforeTaskDrag',
      function (id: any, mode: any, e: any) {
        const task = gantt.getTask(id)
        if (task.type === '1') {
          return false
        } else {
          return true
        }
      }
    )
    //  日期控制
    const zoomConfig = {
      levels: [
        {
          name: 'Hours', //时
          scale_height: 60,
          min_column_width: 30,
          scales: [
            { unit: 'day', step: 1, format: '%M %d ' },
            { unit: 'hour', step: 1, format: '%H' }
          ]
        },
        {
          name: 'Days', //日
          scale_height: 50,
          min_column_width: 100,
          scales: [
            { unit: 'day', step: 1, format: ' %M %d ' }, //月日
            { unit: 'day', step: 1, format: '  %l' } //星期
          ]
        },
        {
          name: 'Quarter', //月
          height: 100,
          min_column_width: 90,
          scales: [{ unit: 'month', step: 1, format: '%M' }]
        },
        {
          name: 'Year', //年
          scale_height: 50,
          min_column_width: 30,
          scales: [{ unit: 'year', step: 1, format: '%Y' }]
        }
      ]
    }
    gantt.ext.zoom.init(zoomConfig)

    // 更新的值 **误删**
    const dp = gantt.createDataProcessor({
      task: {
        // create: function (data: any) {
        //   console.log('新增任务----------------------', data)
        // },
        // click: function (data: any) {
        //   console.log('点击----------------------', data)
        // },
        update: function (data: any, id: any) {
          // console.log('更新任务----------------------', data)
          updateList && updateList(data)
        }
        // delete: function (id: any) {
        //   console.log('删除任务----------------------', id)
        // }
      },
      link: {
        create: function (data: any) {
          //线的操作
          console.log('link.create----------------------', data)
        },
        update: function (_data: any) {
          // console.log('link.update----------------------')
        },
        delete: function () {
          // console.log('link.delete----------------------')
        }
      }
    })
  }

  //  颜色 top名字的设置
  const color = () => {
    // 控制颜色
    if (!isEmpty(rest)) {
      // 控制颜色 头
      gantt.templates.scale_cell_class = function (date: moment.MomentInput) {
        const time = moment(date).format('YYYY-MM-DD')
        if (rest.includes(time)) {
          undefined
          return 'weekend'
        }
      }

      // 控制颜色 主体
      // gantt.templates.task_cell_class = function (
      gantt.templates.timeline_cell_class = function (
        item: any,
        date: moment.MomentInput
      ) {
        const time = moment(date).format('YYYY-MM-DD')
        if (rest.includes(time)) {
          undefined
          return 'weekend'
        }
      }

      //  日期控制
      const zoomConfig = {
        levels: [
          {
            name: 'Hours', //时
            scale_height: 60,
            min_column_width: 30,
            scales: [
              { unit: 'day', step: 1, format: '%M %d ' },
              { unit: 'hour', step: 1, format: '%H' }
            ]
          },
          {
            name: 'Days', //日
            scale_height: 27,
            min_column_width: 100,
            // scales: [{ unit: 'day', step: 1, format: ' %M %d' }]
            scales: [
              {
                unit: 'day',
                step: 1,
                format: function (date: moment.MomentInput) {
                  const time = moment(date).format('YYYY-MM-DD')
                  if (rest.includes(time)) {
                    return '该日期不可用'
                  } else {
                    return moment(date).format('MM月DD')
                  }
                }
              }
            ]
          },
          {
            name: 'Quarter', //月
            height: 100,
            min_column_width: 90,
            scales: [{ unit: 'month', step: 1, format: '%M' }]
          },
          {
            name: 'Year', //年
            scale_height: 50,
            min_column_width: 30,
            scales: [{ unit: 'year', step: 1, format: '%Y' }]
          }
        ]
      }

      // gantt.attachEvent('onBeforeTaskDrag', function (id, mode, e) {
      //   console.log(id)
      //   console.log(mode)
      //   console.log(e)
      //   //any custom logic here
      //   return true
      // })
      gantt.ext.zoom.init(zoomConfig)
    }
  }

  const initGanttDataProcessor = () => {
    gantt.createDataProcessor((type: any, action: any, item: any, id: any) => {
      return new Promise<void>((resolve, reject) => {
        // if (onDataUpdated) {
        //   onDataUpdated(type, action, item, id)
        // }
        return resolve()
      })
    })
  }
  const ganttShow = async (list: any) => {
    gantt.clearAll() //缓存问题 先清楚后添加
    gantt.config.date_format = '%Y-%m-%d %H:%i'
    gantt.init(chartDom) //根据 id
    initGanttDataProcessor()
    gantt.parse(list) //渲染数据
  }
  // "main"
  return <div id={name} style={{ width: '100%', height: '100%' }}></div>
}

export default Gantt
