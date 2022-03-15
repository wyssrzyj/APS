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
    { type: '周四', value: 40 },
    { type: '周五', value: 50 },
    { type: '周六', value: 60 },
    { type: '周末', value: 100 }
  ]

  const readHistogram = () => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 100
    })
    chart.data(data)
    chart.scale('value', {
      nice: false
    })
    chart.axis('type', {
      tickLine: null
    })
    //左侧%
    chart.axis('value', {
      label: {
        formatter: (val: number) => {
          return val * 1 + '%'
        }
      }
    })

    chart.tooltip({
      showMarkers: false
    })
    chart.interaction('element-active')

    chart.legend(false)
    chart
      .interval({
        background: {
          style: {
            radius: 8
          }
        }
      })
      .position('type*value')
      //控制颜色
      .color('value', (val: number) => {
        if (val > 50) {
          return '#ff4d4f'
        }
        return '#2194ff'
      })
      .label('value', {
        //顶部数字
        content: (originData: { value: string }) => {
          const val = parseFloat(originData.value)
          if (val > 0) {
            return (val * 1).toFixed(1) + '%'
          }
        },
        offset: 10
      })

    chart.render()
  }

  return (
    <div>
      <div style={{ width: '100%', height: '100px' }} id="container"></div>
    </div>
  )
}

export default Load
