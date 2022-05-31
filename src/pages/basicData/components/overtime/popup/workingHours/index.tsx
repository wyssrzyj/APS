/* eslint-disable use-isnan */
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Log } from '@antv/scale'
import { Button, DatePicker, TimePicker } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
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
  const [data, setData] = useState<any>([])
  useEffect(() => {
    if (type === 1) {
      setData([{ name: '1', startDateTime: undefined, endDateTime: undefined }])
    } else {
      setData(edit.timeList)
    }
  }, [type, edit])
  //获取时分秒
  const times = (e) => {
    const allDay = moment(e).format('YYYY-MM-DD HH:mm')
    return allDay.substring(10)
  }

  // const start = (index: string | number, e: moment.MomentInput) => {
  //   data[index].startDateTime = moment(e).valueOf()
  //   setData([...data])
  // }
  // const end = (index: string | number, e: moment.MomentInput) => {
  //   data[index].endDateTime = moment(e).valueOf()
  //   setData([...data])
  // }
  const time = (index, e) => {
    const startTime = moment(e[0]).format('YYYY-MM-DD HH:mm')
    const endTime = moment(e[1]).format('YYYY-MM-DD HH:mm')
    data[index].startDateTime = moment(startTime).valueOf()
    data[index].endDateTime = moment(endTime).valueOf()
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
          <>
            {data.map((item, index) => (
              // eslint-disable-next-line react/jsx-key
              <div className={styles.timePicker} key={index}>
                <TimePicker.RangePicker
                  defaultValue={[
                    item.startDateTime !== undefined
                      ? moment(item.startDateTime)
                      : undefined,
                    item.endDateTime !== undefined
                      ? moment(item.endDateTime)
                      : undefined
                  ]}
                  disabled={type === 3 ? true : false}
                  format={'HH:mm'}
                  onChange={(e) => {
                    time(index, e)
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
          </>
        </>
      ) : null}
    </div>
  )
}

export default WorkingHours
