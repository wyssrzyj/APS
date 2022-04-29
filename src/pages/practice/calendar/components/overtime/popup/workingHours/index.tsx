import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, TimePicker } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
function WorkingHours(props: {
  onChange?: (params?: any) => void
  type: any
  edit: any
}) {
  const format = 'HH:mm'
  const { onChange, type, edit } = props
  console.log('测试哦', edit)

  const [data, setData] = useState<any>([])

  //新增就是空数据，编辑和查看使用接口数据
  useEffect(() => {
    type === 1
      ? setData([
          { name: '1', startDateTime: Date.now(), endDateTime: Date.now() }
        ])
      : setData(edit.timeList)
  }, [type, edit])

  const start = (index: string | number, e: moment.MomentInput) => {
    data[index].startDateTime = moment(e).valueOf()
  }
  const end = (index: string | number, e: moment.MomentInput) => {
    data[index].endDateTime = moment(e).valueOf()
    console.log([...data])
  }

  useEffect(() => {
    //传递给外部
    onChange && onChange([...data])
  }, [data])
  const executionMethod = (type: string, index: number) => {
    if (type === 'push') {
      data.push({
        name: index + new Date().valueOf() * Math.random(),
        startDateTime: Date.now(),
        endDateTime: Date.now()
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
        (
          item: {
            startDateTime: React.Key | null | undefined
            endDateTime: moment.MomentInput
          },
          index: number
        ) => (
          <div className={styles.timePicker} key={item.startDateTime}>
            <TimePicker
              defaultValue={moment(item.endDateTime)}
              disabled={type === 3 ? true : false}
              format={format}
              onChange={(e) => {
                start(index, e)
              }}
            />
            ~
            <TimePicker
              defaultValue={moment(item.endDateTime)}
              disabled={type === 3 ? true : false}
              format={format}
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
        )
      )}
    </div>
  )
}

export default WorkingHours
