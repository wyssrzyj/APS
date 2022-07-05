/*
 * @Author: lyj
 * @Date: 2022-06-30 14:51:35
 * @LastEditTime: 2022-06-30 15:35:37
 * @Description:
 * @LastEditors: lyj
 */
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
const LineChart = () => {
  const [data, setData] = useState([])

  const findMaxMin = (data) => {
    let maxValue = 0
    let minValue = 50000
    let maxObj = null
    let minObj = null
    for (const d of data) {
      if (d.Close > maxValue) {
        maxValue = d.Close
        maxObj = d
      }
      if (d.Close < minValue) {
        minValue = d.Close
        minObj = d
      }
    }
    return { max: maxObj, min: minObj }
  }
  useEffect(() => {
    console.log(moment(1656574230784).format('MM.DD.YYYY'))

    //11.27.2021
    const sum = [
      { Date: '01.10.2016', Close: 666 },
      { Date: '02.10.2016', Close: 333 },
      { Date: '03.10.2016', Close: 999 }
    ]
    setData(sum)
  }, [])
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
        Close: {
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

      chart.line().position('Date*Close')
      // annotation
      const { min, max } = findMaxMin(data)
      chart.annotation().dataMarker({
        top: true,
        position: [max.Date, max.Close],
        text: {
          content: '完成量' + max.Close
        },
        line: {
          length: 30
        }
      })
      chart.annotation().dataMarker({
        top: true,
        position: [min.Date, min.Close],
        text: {
          content: '完成量' + min.Close
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
