import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Input, InputNumber, Popover, Row } from 'antd'
import { isEmpty, isNil } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ColorResult, SketchPicker } from 'react-color'

import styles from './index.module.less'
function WorkingHours(props: { onChange: any; list: any }) {
  const { onChange, list } = props

  const sum: any = [{ id: '1', expireTime: 1, color: '#B8E986' }] //初始数据
  const [data, setData] = useState<any>(sum)
  // 回显
  useEffect(() => {
    if (!isEmpty(list)) {
      setData(list.expireColorConfigs)
    }
  }, [list])
  //随机颜色
  function color16() {
    //十六进制颜色随机
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    const color = '#' + r.toString(16) + g.toString(16) + b.toString(16)
    return color
  }

  const executionMethod = (type: string, index: number) => {
    if (type === 'push') {
      data.push({
        id: index + new Date().valueOf() * Math.random(),
        expireTime: 1,
        color: color16()
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
  const inputValue = (value: any, index: number) => {
    data[index].expireTime = value
    setData([...data])
  }
  useEffect(() => {
    onChange(data) //把数据传递出去
  }, [data])
  return (
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
                className={styles.inputText}
                min={0}
                style={{ width: 180 }}
                value={data[index].expireTime}
                onChange={(e) => inputValue(e, index)}
              />
              　天　
              <Popover
                content={
                  <SketchPicker
                    color={item.color}
                    onChange={(e) => {
                      setSubtitleFontColor(e, index)
                    }}
                    onChangeComplete={(e) => {
                      setSubtitleFontColor(e, index)
                    }}
                  />
                }
                trigger="click"
              >
                <div
                  className={styles.color}
                  style={{ background: `${item.color}` }}
                >
                  {item.color}
                </div>
              </Popover>
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
  )
}

export default WorkingHours
