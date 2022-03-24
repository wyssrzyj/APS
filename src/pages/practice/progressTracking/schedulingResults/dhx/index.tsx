import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'

import { gantt } from 'dhtmlx-gantt'
import React, { useEffect, useState } from 'react'
function DhxDome() {
  const [ganttContainer, setGanttContainer] = useState<any>()
  useEffect(() => {
    gantt.render()
    gantt.init(ganttContainer)
    // gantt.parse(props.tasks)
  }, [ganttContainer])
  useEffect(() => {
    console.log('这是啥', ganttContainer)
  }, [ganttContainer])
  return (
    <div>
      <div
        ref={(input) => {
          setGanttContainer(input)
        }}
        style={{ width: '100%', height: '500px' }}
      ></div>
    </div>
  )
}

export default DhxDome
