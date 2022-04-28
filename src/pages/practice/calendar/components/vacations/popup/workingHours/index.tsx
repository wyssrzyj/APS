/*
 * @Author: your name
 * @Date: 2022-03-10 15:20:21
 * @LastEditTime: 2022-04-28 16:27:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jack-aps\src\pages\practice\calendar\components\vacations\popup\workingHours\index.tsx
 */
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
function WorkingHours(props: any) {
  const { onChange, type, edit } = props

  const [data, setData] = useState<any>([])
  const end = (index: string | number, e: moment.MomentInput) => {
    data[index] = moment(e).format('YYYY-MM-DD')
    setData([...data])
  }
  useEffect(() => {
    type === 1
      ? setData([moment(new Date()).format('YYYY-MM-DD')])
      : setData(edit.holidayList)
  }, [])
  useEffect(() => {
    onChange([...data])
    console.log('传递给外部的数据', data)
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
      {data.map((_item: any, index: number) => (
        <div className={styles.timePicker} key={index}>
          <DatePicker
            key={index}
            allowClear={false}
            defaultValue={moment(_item)}
            disabled={type === 3 ? true : false}
            onChange={(e) => {
              end(index, e)
            }}
          />

          <div className={styles.executionMethod} key={_item.name}>
            {index === 0 ? (
              <Button
                key={index + 1}
                disabled={type === 3 ? true : false}
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => executionMethod('push', index)}
              />
            ) : (
              <Button
                key={index + 2}
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
