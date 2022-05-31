import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'

import styles from './index.module.less'
function WorkingHours(props: any) {
  const { onChange } = props
  const sum: any = [{ name: '1', holiday: '' }]
  const [data, setData] = useState<any>(sum)

  const end = (index: any, e: any) => {
    data[index].holiday = moment(e).valueOf()
    onChange([...data])
  }
  const executionMethod = (type: any, index: any) => {
    if (type === 'push') {
      data.push({
        name: index + new Date().valueOf() * Math.random(),
        holiday: ''
      })
      setData([...data])
    } else {
      data.splice(index, 1)
      setData([...data])
    }
  }
  return (
    <div>
      {data.map((_item: any, index: any) => (
        <div className={styles.timePicker} key={_item.name}>
          <DatePicker
            onChange={(e) => {
              end(index, e)
            }}
          />

          <div className={styles.executionMethod}>
            {index === 0 ? (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => executionMethod('push', index)}
              />
            ) : (
              <Button
                type="primary"
                icon={<MinusOutlined />}
                onClick={() => executionMethod('mov', index)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default WorkingHours
