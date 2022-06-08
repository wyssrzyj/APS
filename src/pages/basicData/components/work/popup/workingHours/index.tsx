/* eslint-disable use-isnan */
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, TimePicker } from 'antd'
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
      : setData(edit.times)
  }, [type, edit])

  const time = (index, e) => {
    const startTime = moment(e[0]).format('YYYY-MM-DD HH:mm')
    const endTime = moment(e[1]).format('YYYY-MM-DD HH:mm')
    data[index].startDateTime = moment(startTime).valueOf()
    data[index].endDateTime = moment(endTime).valueOf()
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
      {data.map(
        (
          item: {
            startDateTime: React.Key | null | undefined
            endDateTime: moment.MomentInput
          },
          index: number
        ) => (
          <div key={index} className={styles.timePicker}>
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
        )
      )}
    </div>
  )
}

export default WorkingHours
