import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, InputNumber, message, Radio, Row } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { ColorResult } from 'react-color'

import styles from './index.module.less'

function WorkingHours(props: { onChange: any; list: any }) {
  const { onChange, list } = props

  const sum: any = [{ id: '1', front: 1, after: 2, advance: 1 }] //初始数据
  const [data, setData] = useState<any>(sum)
  // 回显
  useEffect(() => {
    if (!isEmpty(list)) {
      if (!isEmpty(list.expireColorConfigs)) {
        setData(list.expireColorConfigs)
      }
    }
  }, [list])
  //随机颜色

  const executionMethod = (type: string, index: number) => {
    if (type === 'push') {
      data.push({
        id: index + new Date().valueOf() * Math.random(),
        front: data[data.length - 1].after + 1,
        after: data[data.length - 1].after + 2,
        advance: data[data.length - 1].advance + 1
      })
      setData([...data])
    } else {
      data.splice(index, 1)
      setData([...data])
    }
  }
  // 修改字幕字体颜色
  const setSubtitleFontColor = (e: ColorResult, index: number) => {
    data[index].color = e.hex
    setData([...data])
  }
  // 修改数字输入框
  const inputValue = (value: any, index: number, type: string) => {
    if (type === 'front') {
      if (value < data[index].after) {
        data[index][type] = value
        setData([...data])
      } else {
        message.error('第一个不能大于第二个')
      }
    }
    if (type === 'after') {
      if (value > data[index].front) {
        data[index][type] = value
        setData([...data])
      } else {
        message.error('第二个必须大于第一个')
      }
    }
    if (type === 'advance') {
      data[index][type] = value
      setData([...data])
    }
  }
  useEffect(() => {
    onChange(data) //把数据传递出去
  }, [data])
  return (
    <div className={styles.container}>
      <div className={styles.singleQuantity}>
        <Radio defaultChecked={true}> 根据单量</Radio>
      </div>
      <div>
        {data.map(
          (
            item: {
              expireTime: React.Key | null | undefined
              color: any
              id: any
            },
            index: number
          ) => (
            <div className={styles.timePicker} key={index}>
              <Row className={styles.NoExtended}>
                <InputNumber
                  controls={false}
                  className={styles.inputText}
                  min={1}
                  style={{ width: 50 }}
                  value={data[index].front}
                  onChange={(e) => inputValue(e, index, 'front')}
                />
                (件)~
                <InputNumber
                  controls={false}
                  className={styles.inputText}
                  min={1}
                  style={{ width: 50 }}
                  value={data[index].after}
                  onChange={(e) => inputValue(e, index, 'after')}
                />
                (件) 　
                <div>
                  提前
                  <InputNumber
                    controls={false}
                    className={styles.inputText}
                    min={1}
                    style={{ width: 50 }}
                    value={data[index].advance}
                    onChange={(e) => inputValue(e, index, 'advance')}
                  />
                  天预警
                </div>
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
              </Row>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default WorkingHours
