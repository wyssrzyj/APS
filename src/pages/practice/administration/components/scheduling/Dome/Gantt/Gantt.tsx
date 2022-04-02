import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'

import { gantt } from 'dhtmlx-gantt'
import React, { useEffect, useState } from 'react'

function Gantt(props: any) {
  const { zoom, tasks, onDataUpdated, updateList, rightData, leftData } = props

  const chartDom = document.getElementById('main') //获取id

  // 参数设置
  const initZoom = () => {
    gantt.i18n.setLocale('cn') //设置中文
    // gantt.config.readonly = true//只读
    gantt.config.autoscroll = true //如果线超出屏幕可以x滚动
    gantt.config.order_branch = false // 左侧可以拖动
    gantt.config.sort = true //左侧点击表头排序
    // gantt.config.drag_move = true //是否可以移动
    gantt.config.drag_progress = false //拖放进度
    gantt.config.drag_resize = false //控制大小
    // gantt.config.show_links = false //控制两端的线是否可以拖动
    gantt.config.details_on_dblclick = false //双击出弹窗
    // 周六周末不可拖动
    // gantt.config.work_time = true
    // gantt.config.correct_work_time = true
    //表头
    gantt.config.columns = [
      { name: 'text', label: '名称', tree: true, width: '180' },
      { name: 'start_date', label: '时间', align: 'center' }
      // { name: 'duration', label: 'Duration', align: 'center' }
      // { name: 'add', label: '' },
    ]

    //单击事件
    gantt.attachEvent('onTaskSelected', function (id: any) {
      leftData && leftData(id)
    })
    //单击右键
    gantt.attachEvent('onContextMenu', function (id: any) {
      rightData && rightData(id)
    })

    // //触发灯箱
    // gantt.attachEvent('onLightbox', function (id) {
    //   console.log('触发灯箱', id)
    // })
    // //灯箱取消
    // gantt.attachEvent('onBeforeDataRender', function (id) {
    //   console.log('灯箱取消', id)
    // })

    // 时间处理
    gantt.ext.zoom.init({
      levels: [
        {
          name: 'Hours',
          scale_height: 60,
          min_column_width: 30,
          scales: [
            { unit: 'day', step: 1, format: '%d %M  ' },
            { unit: 'hour', step: 1, format: '%H' }
          ]
        },
        {
          name: 'Days',
          scale_height: 60,
          min_column_width: 70,
          scales: [{ unit: 'day', step: 1, format: ' %M%d' }]
        },
        {
          name: 'Months',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'month', step: 1, format: '%F' },
            { unit: 'week', step: 1, format: '#%W' }
          ]
        }
      ]
    })

    // 可以通过此控制 是否可以拖动
    gantt.attachEvent(
      'onBeforeTaskDrag',
      function (id: any, mode: any, e: any) {
        const task = gantt.getTask(id)
        if (task.type === true) {
          return false
        } else {
          return true
        }
      }
    )

    //缩放----
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
          scales: [{ unit: 'day', step: 1, format: ' %M %d' }]
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
    //缩放----结束
    //测试---------------------
    // gantt.config.fit_tasks = false

    // 测试----------------------------------
    gantt.attachEvent('onEmptyClick', function (e: any) {
      console.log('我点击了空白')
    })

    // gantt.event('divId', 'click', function (event) {
    //   console.log(event)
    // })

    // gantt.attachEvent('onAjaxError', function (request) {
    //   console.log(request)
    //   // do something
    //   return true
    // })

    // gantt.addTask(
    //   {
    //     id: 7,
    //     text: 'Task #5',
    //     start_date: '02-09-2013',
    //     duration: 28
    //   },
    //   'pr_2'
    // )

    // gantt.getTask(11)

    //更新的值 **误删**
    // const dp = gantt.createDataProcessor({
    //   task: {
    //     create: function (data: any) {
    //       console.log('新增任务----------------------', data)
    //     },
    //     click: function (data: any) {
    //       console.log('点击----------------------', data)
    //     },
    //     update: function (data: any, id: any) {
    //       // console.log('更新任务----------------------', data)
    //       // updateList && updateList(data)
    //     },
    //     delete: function (id: any) {
    //       console.log('删除任务----------------------', id)
    //     }
    //   },
    //   link: {
    //     create: function (data: any) {
    //       //线的操作
    //       console.log('link.create----------------------', data)
    //     },
    //     update: function (_data: any) {
    //       console.log('link.update----------------------')
    //     },
    //     delete: function () {
    //       console.log('link.delete----------------------')
    //     }
    //   }
    // })
  }

  const setZoom = (value: any) => {
    if (!gantt.$initialized) {
      initZoom()
    }
    //缩放
    gantt.ext.zoom.setLevel(value)
  }
  useEffect(() => {
    setZoom(zoom)
  }, [zoom])
  useEffect(() => {
    if (tasks) {
      componentDidMount(tasks)
    }
  }, [tasks])

  const initGanttDataProcessor = () => {
    gantt.createDataProcessor((type: any, action: any, item: any, id: any) => {
      return new Promise<void>((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(type, action, item, id)
        }
        return resolve()
      })
    })
  }
  const componentDidMount = (list: any) => {
    gantt.config.date_format = '%Y-%m-%d %H:%i'
    gantt.init(chartDom) //根据 id
    initGanttDataProcessor()
    gantt.parse(list) //渲染数据
  }
  return <div id="main" style={{ width: '100%', height: '100%' }}></div>
}

export default Gantt
