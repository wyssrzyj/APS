import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
function WorkingHours(props: { onChange: any; type: any; edit: any }) {
  const { onChange, type, edit } = props

  const [data, setData] = useState<any>([])
  const end = (index: string | number, e: moment.MomentInput) => {
    data[index] = moment(index).format('YYYY-MM-DD')
  }
  useEffect(() => {
    type === 1
      ? setData([moment(new Date()).format('YYYY-MM-DD')])
      : setData(edit.holidayList)
  }, [])
  useEffect(() => {
    onChange([...data])
  }, [data])
  const executionMethod = (type: string, index: number) => {
    if (type === 'push') {
      data.push(moment(new Date()).format('YYYY-MM-DD'))
      setData([...data])
    } else {
      data.splice(index, 1)
      setData([...data])
    }
  }
  return (
    <div>
      {data.map((_item, index: number) => (
        <div className={styles.timePicker} key={_item.name}>
          <DatePicker
            defaultValue={moment(_item)}
            disabled={type === 3 ? true : false}
            onChange={(e) => {
              end(index, e)
            }}
          />

          <div className={styles.executionMethod}>
            {index === 0 ? (
              <Button
                disabled={type === 3 ? true : false}
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => executionMethod('push', index)}
              />
            ) : (
              <Button
                disabled={type === 3 ? true : false}
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
