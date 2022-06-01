import { Chart } from '@antv/g2'
import React, { Component, useEffect, useState } from 'react'
const Load = () => {
  useEffect(() => {
    readHistogram()
  }, [])
  const data = [
    { type: '周一', value: 10 },
    { type: '周二', value: 20 },
    { type: '周三', value: 30 },
    { type: '周四', value: 100 },
    { type: '周五', value: 50 },
    { type: '周六', value: 60 }
  ]
  const arr = new Map()
  arr.set(1, 1)
  arr.set(true, '111')
  console.log(arr.get(true))

  const readHistogram = () => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 100
      // padding: [50, 20, 50, 20]
    })
    chart.data(data)
    chart.scale('value', {
      alias: '销售额(万)'
    })

    chart.axis('type', {
      tickLine: {
        alignTick: false
      }
    })
    chart.axis('value', false)
    //调整颜色
    chart.legend(false)

    chart.tooltip({
      showMarkers: false
    })
    chart
      .interval()
      .position('type*value')
      .color('value', (val: number) => {
        if (val > 50) {
          return '#ff4d4f'
        }
        return '#2194ff'
      })
    chart.interaction('element-active')

    // 添加文本标注
    data.forEach((item) => {
      chart.annotation().text({
        position: [item.type, item.value],
        content: (item.value * 1).toFixed(0) + '%',
        style: {
          textAlign: 'center',
          fontSize: '15',
          zIndex: ' 99 !important'
        },
        //控制文字的高度
        offsetY:
          item.value > 10
            ? item.value > 30
              ? item.value > 70
                ? 50
                : 30
              : 10
            : 2
      })
    })
    chart.render()
  }

  return (
    <div>
      <div style={{ width: '100%' }} id="container"></div>
    </div>
  )
}

export default Load
