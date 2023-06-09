/*
 * @Author: lyj
 * @Date: 2022-06-23 10:34:18
 * @LastEditTime: 2022-07-05 13:14:34
 * @Description:
 * @LastEditors: lyj
 */
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Input, InputNumber, Popover, Row, Select } from 'antd'
import { isEmpty, isNil } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ColorResult, SketchPicker } from 'react-color'

import styles from './index.module.less'
const { Option } = Select

function WorkingHours(props: { onChange: any; list: any }) {
  const { onChange, list } = props

  const sum: any = [{ id: '1', expireTime: 1, color: '#B8E986' }] //初始数据
  const [data, setData] = useState<any>(sum)
  // 回显
  useEffect(() => {
    if (!isEmpty(list)) {
      setData([{ id: '1', expireTime: 1, color: list.waringColor }])
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
              　
              <Popover
                content={
                  <SketchPicker
                    color={item.color !== null ? item.color : 'red'}
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
                  className={styles.colors}
                  style={{ background: `${item.color}` }}
                ></div>
              </Popover>
            </Row>
          </div>
        )
      )}
    </div>
  )
}

export default WorkingHours
