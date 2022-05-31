import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

function Important(props: {
  itemCount: any
  itemSize: any
  data: any
  start: any
}) {
  const { itemCount, itemSize, data, start } = props

  // const  itemSize *
  const [list, setList] = useState(data.test)
  useEffect(() => {
    console.log('子数据', data)
    setList(data.test)
  }, [data.test])

  //data 处理后的值
  // 样式
  const itemStyle: any = { position: 'absolute', width: 100, height: 120 } //样式
  return (
    <div>
      <div
        className={styles.content}
        style={{
          position: 'relative',
          width: `${itemCount * itemSize}px`, //展示多少条*单个宽度 =总长度
          height: `120px`
        }}
      >
        {/* 班组名 */}
        <div
          className={styles.histogram_text}
          style={{
            ...itemStyle
          }}
        >
          {data.name}
        </div>
        {!isEmpty(list)
          ? list.map((item: any, index: any) => (
              <div
                key={index}
                className={styles.histogram}
                style={{
                  ...itemStyle,
                  left: itemSize * (item.index + 1) //每个都有各自的位置 +1是为了给日期腾地方
                }}
              >
                {/* 内容 */}
                <div
                  className={styles.sonx}
                  style={{ height: `${100 - item.height}px` }}
                ></div>

                <div
                  className={styles.son}
                  style={{
                    height: `${item.height}px`,
                    lineHeight: `${item.height}px`,
                    background: ' rgb(24, 199, 88)' //颜色控制
                  }}
                >
                  {item.height}%
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default Important
