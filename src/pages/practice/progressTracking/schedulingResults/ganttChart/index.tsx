import React from 'react'
import { Chart } from 'react-google-charts'

function daysToMilliseconds(days: number) {
  return days * 24 * 60 * 60 * 1000
}

const columns = [
  { type: 'string', label: 'Task ID' },
  { type: 'string', label: 'Task Name' },
  { type: 'date', label: 'Start Date' },
  { type: 'date', label: 'End Date' },
  { type: 'number', label: 'Duration' },
  { type: 'number', label: 'Percent Complete' },
  { type: 'string', label: 'Dependencies' }
]

const rows = [
  [
    'Research',
    '小糯糯',
    new Date(2015, 0, 1),
    new Date(2015, 0, 5),
    null,
    30,
    null
  ],
  [
    'Write',
    '小睿睿',
    null,
    new Date(2015, 0, 9),
    daysToMilliseconds(3),
    25,
    'Research,Outline'
  ],
  [
    'Cite',
    '小梦梦',
    null,
    new Date(2015, 0, 7),
    daysToMilliseconds(1),
    20,
    'Research'
  ],
  [
    'Complete',
    '小若兰',
    null,
    new Date(2015, 0, 10),
    daysToMilliseconds(1),
    0,
    'Cite,Write'
  ],
  [
    'Outline',
    '小薇薇',
    null,
    new Date(2015, 0, 6),
    daysToMilliseconds(1),
    100,
    'Research'
  ]
]

const data = [columns, ...rows]
const GanttChart = () => {
  return (
    <div>
      <Chart chartType="Gantt" width="100%" height="50%" data={data} />
    </div>
  )
}

export default GanttChart
