import { Chart } from '@antv/g2'
import React, { Component, useEffect, useState } from 'react'
const Load = () => {
  useEffect(() => {
    readHistogram()
  }, [])
  // const data = [
  //   { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
  //   { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
  //   { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
  //   { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
  //   { name: 'London', 月份: 'May', 月均降雨量: 47 },
  //   { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
  //   { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
  //   { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
  //   { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
  //   { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
  //   { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
  //   { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
  //   { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
  //   { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
  //   { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
  //   { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 }
  // ]
  const data = [
    { genre: '周一', sold: 100 },
    { genre: '周二', sold: 15 },
    { genre: '周三', sold: 20 },
    { genre: '周四', sold: 50 },
    { genre: '周五', sold: 50 },
    { genre: '周六', sold: 20 },
    { genre: '周七', sold: 10 }
  ]
  const readHistogram = () => {
    // Step 1: 创建 Chart 对象
    const chart = new Chart({
      container: 'c1', // 指定图表容器 ID
      width: 1000, // 指定图表宽度
      height: 300 // 指定图表高度
    })
    // Step 2: 载入数据源
    chart.data(data)
    // Step 3: 创建图形语法，绘制柱状图
    chart.interval().position('genre*sold')

    // Step 4: 渲染图表
    chart.render()
  }

  return (
    <div>
      <div style={{ width: '100%', height: '500px' }} id="container"></div>
    </div>
  )
}

export default Load
