import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, TimePicker } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
function WorkingHours(props) {
  const format = 'HH:mm'
  const { onChange, type, edit, time } = props
  const [data, setData] = useState<any>([])

  //新增就是空数据，编辑和查看使用接口数据
  useEffect(() => {
    const nyr = moment(Date.now()).format('YYYY-MM-DD ')
    const sf = moment(Date.now()).format('YYYY-MM-DD HH:mm')
    const sum = moment(sf).valueOf() - moment(nyr).valueOf()
    type === 1
      ? setData([
          {
            name: '1',
            startDateTime: time ? sum + time : Date.now(),
            endDateTime: time ? sum + time : Date.now()
          }
        ])
      : setData(edit.timeList)
  }, [type, edit, time])
  const onTime = (e, index) => {
    // 开始时间
    const arr =
      Number(moment(e[0]).format('x')) -
      moment(moment(e[0]).format('YYYY-MM-DD')).valueOf()
    // 结束时间
    const arrno =
      Number(moment(e[1]).format('x')) -
      moment(moment(e[1]).format('YYYY-MM-DD')).valueOf()

    data[index].startDateTime = time + arr
    data[index].endDateTime = time + arrno
  }

  useEffect(() => {
    //传递给外部
    onChange && onChange([...data])
  }, [data])
  const btn = (type: string, index: number) => {
    if (type === 'push') {
      const nyr = moment(Date.now()).format('YYYY-MM-DD ')
      const sf = moment(Date.now()).format('YYYY-MM-DD HH:mm')
      const sum = moment(sf).valueOf() - moment(nyr).valueOf()
      data.push({
        name: index + new Date().valueOf() * Math.random(),
        startDateTime: time ? sum + time : Date.now(),
        endDateTime: time ? sum + time : Date.now()
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
            <TimePicker.RangePicker
              disabled={type === 3 ? true : false}
              defaultValue={[
                moment(item.startDateTime),
                moment(item.endDateTime)
              ]}
              // defaultValue={moment('12:08:23', 'HH:mm:ss')}
              format=" HH:mm"
              onChange={(e, index) => {
                onTime(e, index)
              }}
            />

            <div className={styles.btn}>
              {index === 0 ? (
                <Button
                  disabled={type === 3 ? true : false}
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => btn('push', index)}
                />
              ) : (
                <Button
                  disabled={type === 3 ? true : false}
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
