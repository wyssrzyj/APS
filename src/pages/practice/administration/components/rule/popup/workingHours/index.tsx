import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, InputNumber, message } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
function WorkingHours(props: any) {
  const { onChange } = props
  const sum: any = [
    { day: '1', efficiency: '', key: 1 },
    { day: 0, efficiency: 0, key: 2 }
  ]
  const [data, setData] = useState<any>(sum)
  const processing = (e: any, index: any, type: any) => {
    console.log(e)
    console.log(index)
    console.log(type)
    if (type === 'day') {
      data[index].day = e
    }
    if (type === 'efficiency') {
      data[index].efficiency = e
    }
    setData([...data])
  }

  const executionMethod = (type: any, index: any) => {
    if (type === 'push') {
      data.push({ day: 0, efficiency: 0, key: new Date() })
      setData([...data])
    } else {
      if (data.length > 2) {
        data.splice(index, 1)
        setData([...data])
      } else {
        message.warning('至少一个')
      }
    }
  }
  useEffect(() => {
    if (data[1].day > 0) {
      onChange(data)
    }
  }, [data])
  return (
    <div className={styles.const}>
      {data.map((_item: any, index: any) => (
        <div className={styles.timePicker} key={_item.key}>
          <div className={styles.top}>
            <div className={styles.left}>
              {index === 0 ? (
                '天数'
              ) : (
                <InputNumber
                  key={_item.key}
                  onChange={(e) => processing(e, index, 'day')}
                  defaultValue={_item.day}
                />
              )}
            </div>
            <div className={styles.efficiency}>
              {index === 0 ? (
                '效率'
              ) : (
                <InputNumber
                  key={index}
                  onChange={(e) => processing(e, index, 'efficiency')}
                  addonAfter="%"
                  defaultValue={_item.efficiency}
                />
              )}
            </div>
            <div>
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
        </div>
      ))}
    </div>
  )
}

export default WorkingHours
