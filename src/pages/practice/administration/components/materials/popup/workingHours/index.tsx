import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker } from 'antd'
import moment from 'moment'
import { Moment } from 'moment'
import { Key, useState } from 'react'

import styles from './index.module.less'
function WorkingHours(props: { onChange: any }) {
  const { onChange } = props
  const sum: any = [{ name: '1', holiday: '' }]
  const [data, setData] = useState<any>(sum)

  const end = (index: string | number, e: Moment | null) => {
    data[index].holiday = moment(e).valueOf()
    onChange([...data])
  }
  const btn = (type: string, index: number) => {
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
      {data.map((_item: { name: Key | null | undefined }, index: number) => (
        <div className={styles.timePicker} key={_item.name}>
          <DatePicker
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
      ))}
    </div>
  )
}

export default WorkingHours
