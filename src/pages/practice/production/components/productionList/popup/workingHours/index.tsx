import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, TimePicker } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'

import styles from './index.module.less'
function WorkingHours(props: { onChange: any }) {
  const { onChange } = props
  const sum: any = [{ name: '1', start: '', end: '' }]
  const format = 'HH:mm'
  const [data, setData] = useState<any>(sum)
  const start = (index: string | number, e: moment.MomentInput) => {
    data[index].start = moment(e).valueOf()
  }
  const end = (index: string | number, e: moment.MomentInput) => {
    data[index].end = moment(e).valueOf()
    onChange([...data])
  }
  const btn = (type: string, index: number) => {
    if (type === 'push') {
      data.push({
        name: index + new Date().valueOf() * Math.random(),
        start: '',
        end: ''
      })

      setData([...data])
    } else {
      data.splice(index, 1)
      setData([...data])
    }
  }
  return (
    <div>
      {data.map(
        (_item: { name: React.Key | null | undefined }, index: number) => (
          <div className={styles.timePicker} key={_item.name}>
            <TimePicker
              format={format}
              onChange={(e) => {
                start(index, e)
              }}
            />
            ~
            <TimePicker
              format={format}
              onChange={(e) => {
                end(index, e)
              }}
            />
            <div className={styles.btn}>
              {index === 0 ? (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => btn('push', index)}
                />
              ) : (
                <Button
                  type="primary"
                  icon={<MinusOutlined />}
                  onClick={() => btn('mov', index)}
                />
              )}
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default WorkingHours
