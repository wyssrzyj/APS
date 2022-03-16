import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

function Important(props) {
  const { itemCount, itemSize, data, start } = props

  // const  itemSize *
  const [list, setList] = useState(data)
  useEffect(() => {
    console.log('头部日期处理', data)
    setList(data)
  }, [data])
  // 样式
  const itemStyle = { position: 'absolute', width: 100, height: 60 } //样式
  return (
    <div>
      <div
        className={styles.content}
        style={{
          position: 'relative',
          width: `${itemCount * itemSize}px`, //展示多少条*单个宽度 =总长度
          height: `60px`
        }}
      >
        <div
          // key={index}
          className={styles.histogram}
          style={{
            ...itemStyle,
            left: 0 //每个都有各自的位置
          }}
        >
          {/* 内容 */}
          日期
        </div>
        {!isEmpty(list)
          ? list.map((item, index) => (
              <div
                key={index}
                className={styles.histogram}
                style={{
                  ...itemStyle,
                  left: itemSize * (item.index + 1) //每个都有各自的位置 +1是为了给日期腾地方
                }}
              >
                {/* 内容 */}
                {item.date}
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default Important
