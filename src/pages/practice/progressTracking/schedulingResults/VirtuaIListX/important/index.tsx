import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

function Important(props) {
  const { itemCount, itemSize, data, start } = props

  // const  itemSize *
  const [list, setList] = useState(data)
  const [sum, setstart] = useState(start) //当前第几个
  useEffect(() => {
    console.log('子数据', data)
    setList(data)
  }, [data])

  //data 处理后的值
  // 样式
  const itemStyle = { position: 'absolute', width: 100, height: 100 } //样式
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
        {!isEmpty(list)
          ? list.map((item, index) => (
              <div
                key={index}
                style={{
                  ...itemStyle,
                  left: itemSize * item.index, //每个都有各自的位置
                  backgroundColor: item.index % 2 == 0 ? 'pink' : 'red'
                }}
              >
                {/* {console.log('距离', index + start)}
                {console.log('距离', start)}
                {console.log('距离', index)} */}
                {item.name}
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default Important
