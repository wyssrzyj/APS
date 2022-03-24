import { Bar } from '@ant-design/plots'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
const Load = () => {
  const data = [
    {
      year: '1951 年',
      value: 38
    },
    {
      year: '1952 年',
      value: 52
    },
    {
      year: '1956 年',
      value: 61
    },
    {
      year: '1957 年',
      value: 145
    },
    {
      year: '1958 年',
      value: 48
    }
  ]
  const config: any = {
    data,
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: {
      position: 'top-left'
    }
  }
  return <Bar {...config} />
}

export default Load
