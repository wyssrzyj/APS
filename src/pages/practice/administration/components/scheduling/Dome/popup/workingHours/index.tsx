/* eslint-disable use-isnan */
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Log } from '@antv/scale'
import { Button, DatePicker, TimePicker } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
function WorkingHours(props: { onChange?: (params?: any) => void }) {
  const format = 'HH:mm'
  const { onChange } = props
  const type = 1
  const [data, setData] = useState<any>([])
  useEffect(() => {
    if (type === 1) {
      setData([{ name: '1', startDateTime: undefined, endDateTime: undefined }])
    }
  }, [type])
  //获取时分秒
  const times = (e) => {
    const allDay = moment(e).format('YYYY-MM-DD HH:mm')
    return allDay.substring(10)
  }

  const start = (index: string | number, e: moment.MomentInput) => {
    data[index].startDateTime = moment(e).valueOf()
    setData([...data])
  }
  const end = (index: string | number, e: moment.MomentInput) => {
    data[index].endDateTime = moment(e).valueOf()
    setData([...data])
  }

  useEffect(() => {
    if (!isEmpty(data)) {
      const cloneData = cloneDeep(data)

      //传递给外部
      const initial = cloneData.every((item: any) => {
        return (
          item.startDateTime !== undefined && item.endDateTime !== undefined
        )
      })
      const remove = cloneData.every((item: any) => {
        return !isNaN(item.startDateTime) && !isNaN(item.endDateTime)
      })
      //全部不为空的时候才进行传递
      if (initial === true && remove === true) {
        if (!isEmpty(cloneData)) {
          cloneData.map((item: any) => {
            item.startDateTime = times(item.startDateTime)
            item.endDateTime = times(item.endDateTime)
          })
        }

        onChange && onChange([...cloneData])
      } else {
        if (cloneData[0].startDateTime !== undefined) {
          onChange && onChange(null)
        }
      }
    }
  }, [data])

  const executionMethod = (type: string, index: number) => {
    if (type === 'push') {
      data.push({
        name: index + new Date().valueOf() * Math.random(),
        startDateTime: undefined,
        endDateTime: undefined
      })
      setData([...data])
    } else {
      data.splice(index, 1)
      setData([...data])
    }
  }
  return (
    <div>
      {!isEmpty(data) ? (
        <>
          {/* <>{console.log('我执行了鸡翅', data)}</> */}
          <>
            {data.map((item, index) => (
              // eslint-disable-next-line react/jsx-key
              <div className={styles.timePicker} key={index}>
                <TimePicker
                  key={index + 1}
                  defaultValue={
                    item.startDateTime === undefined
                      ? null
                      : moment(item.startDateTime)
                  }
                  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                  format={format}
                  onChange={(e) => {
                    start(index, e)
                  }}
                />
                ~
                <TimePicker
                  key={index + 2}
                  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                  defaultValue={
                    item.startDateTime === undefined
                      ? null
                      : moment(item.endDateTime)
                  }
                  format={format}
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
          </>
        </>
      ) : null}
    </div>
  )
}

export default WorkingHours
