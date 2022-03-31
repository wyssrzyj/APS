import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'

import { gantt } from 'dhtmlx-gantt'
import moment from 'moment'
import React, { Component, useEffect, useState } from 'react'

function Gantt(props: any) {
  const { zoom, tasks, onDataUpdated, updateList } = props
  const [list, setList] = useState([])

  const chartDom = document.getElementById('main') //获取id

  // 参数设置
  const initZoom = () => {
    gantt.i18n.setLocale('cn') //设置中文
    // gantt.config.readonly = true//只读
    gantt.config.order_branch = true // 左侧可以拖动
    gantt.config.sort = true //左侧点击表头排序
    // gantt.config.drag_move = true //是否可以移动
    // gantt.config.drag_progress = false //拖放进度
    gantt.config.drag_resize = true //控制大小
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
          scales: [
            // { unit: 'week', step: 1, format: '#%W' },
            { unit: 'day', step: 1, format: ' %M%d' }
          ]
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
        // console.log('onBeforeTaskDrag', id, mode, e, task)
        // console.log('task', task)

        if (task.id === 1) {
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
    gantt.config.fit_tasks = false
    // 双击task时，弹出lightbox弹出框
    gantt.attachEvent('onEmptyClick', function (e: any) {
      console.log('我点击了空白')
    })

    const dp = gantt.createDataProcessor({
      task: {
        create: function (data: any) {
          console.log('新增任务----------------------', data)
        },
        update: function (data: any, id: any) {
          // console.log('更新任务----------------------', data)
          updateList && updateList(data)
        },
        delete: function (id: any) {
          console.log('删除任务----------------------', id)
        }
      },
      link: {
        create: function (data) {
          //线的操作
          console.log('link.create----------------------', data)
        },
        update: function (data, id) {
          console.log('link.update----------------------')
        },
        delete: function (id) {
          console.log('link.delete----------------------')
        }
      }
    })

    //测试结束---------------------
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
      setList(tasks)
    }
  }, [tasks])

  const initGanttDataProcessor = () => {
    gantt.createDataProcessor((type: any, action: any, item: any, id: any) => {
      return new Promise<void>((resolve, reject) => {
        if (onDataUpdated) {
          // console.log(item)

          // console.log(
          //   '开始',
          //   moment(gantt.getTask('1|0').start_date).format(
          //     'YYYY-MM-DD HH:mm:ss'
          //   )
          // )
          // console.log(
          //   '结束',
          //   moment(gantt.getTask('1|0').end_date).format('YYYY-MM-DD HH:mm:ss')
          // )

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
    console.log('渲染数据', list)

    gantt.parse(list) //渲染数据
  }
  return <div id="main" style={{ width: '100%', height: '100%' }}></div>
}

export default Gantt
