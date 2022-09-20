/*
 * @Author: lyj
 * @Date: 2022-06-30 14:51:35
 * @LastEditTime: 2022-07-01 10:28:29
 * @Description:
 * @LastEditors: lyj
 */
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
const LineChart = (props) => {
  const { selected } = props

  const [data, setData] = useState([])

  const timeFormat = (time, type) => {
    if (type === 'Date') {
      const day = time.slice(3, 5)
      const month = time.slice(0, 2)
      return `${day}.${month}.${moment(new Date()).format('YYYY')}`
    }
    if (type === 'value') {
      return moment(`${moment(new Date()).format('YYYY')}-${time}`).valueOf()
    }
  }

  useEffect(() => {
    if (!isEmpty(selected.detailVOS)) {
      const newData = []
      selected.detailVOS.forEach((item) => {
        newData.push({
          quantity: item.completedAmount,
          Date: timeFormat(item.planDateTimeStr, 'Date'),
          value: timeFormat(item.planDateTimeStr, 'value')
        })
      })

      if (!isEmpty(newData)) {
        newData.sort((a, b) => {
          return a.value - b.value
        })
        setData(newData)
      }
    }
  }, [selected])

  const findMaxMin = (data) => {
    let maxValue = 0
    let minValue = 50000
    let maxObj = null
    let minObj = null
    for (const d of data) {
      if (d.quantity >= maxValue) {
        maxValue = d.quantity
        maxObj = d
      }
      if (d.quantity < minValue) {
        minValue = d.quantity
        minObj = d
      }
    }
    return { max: maxObj, min: minObj }
  }

  useEffect(() => {
    if (!isEmpty(data)) {
      const chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 500
      })
      chart.data(data)
      chart.scale({
        Date: {
          tickCount: 10
        },
        quantity: {
          nice: true
        }
      })
      chart.axis('Date', {
        label: {
          formatter: (text) => {
            const dataStrings = text.split('.')
            return dataStrings[2] + '-' + dataStrings[1] + '-' + dataStrings[0]
          }
        }
      })

      chart.line().position('Date*quantity')
      // annotation
      const { min, max } = findMaxMin(data)

      chart.annotation().dataMarker({
        top: true,

        position: [max.Date, max.quantity],
        text: {
          content: '完成量' + max.quantity
        },
        line: {
          length: 30
        }
      })
      chart.annotation().dataMarker({
        top: true,
        position: [min.Date, min.quantity],
        text: {
          content: '完成量' + min.quantity
        },
        line: {
          length: 50
        }
      })
      chart.render()
    }
  }, [data])

  return (
    <div>
      <div id="container"></div>
    </div>
  )
}

export default LineChart
