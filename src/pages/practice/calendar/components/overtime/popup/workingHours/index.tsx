/* eslint-disable use-isnan */
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, TimePicker } from 'antd'
import { isEmpty } from 'lodash'
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

  //新增就是空数据，编辑和查看使用接口数据
  useEffect(() => {
    type === 1
      ? setData([
          { name: '1', startDateTime: undefined, endDateTime: undefined }
        ])
      : setData(edit.timeList)
  }, [type, edit])

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
      //传递给外部
      const initial = data.every((item: any) => {
        return (
          item.startDateTime !== undefined && item.endDateTime !== undefined
        )
      })
      const remove = data.every((item: any) => {
        return !isNaN(item.startDateTime) && !isNaN(item.endDateTime)
      })
      //全部不为空的时候才进行传递
      if (initial === true && remove === true) {
        onChange && onChange([...data])
      } else {
        if (data[0].startDateTime !== undefined) {
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
      {!isEmpty(data)
        ? data.map(
            (
              item: {
                startDateTime: React.Key | null | undefined
                endDateTime: moment.MomentInput
              },
              index: number
            ) => (
              <div className={styles.timePicker} key={index}>
                <TimePicker
                  defaultValue={
                    item.startDateTime === undefined
                      ? null
                      : moment(item.startDateTime)
                  }
                  disabled={type === 3 ? true : false}
                  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                  format={format}
                  onChange={(e) => {
                    start(index, e)
                  }}
                />
                ~
                <TimePicker
                  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                  defaultValue={
                    item.startDateTime === undefined
                      ? null
                      : moment(item.endDateTime)
                  }
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
          )
        : null}
    </div>
  )
}

export default WorkingHours
