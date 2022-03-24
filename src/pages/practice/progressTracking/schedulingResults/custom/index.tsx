/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

const Custom = () => {
  const scrollBox: any = React.createRef() //创建真实dom
  const data = []

  for (let i = 0; i <= 30; i++) {
    data.push({
      key: i,
      name: `1. ${i}`,
      age: 32,
      height: i * 3,
      address: `London, Park Lane no. ${i}`
    })
  }
  const sum = data.length * 100

  const width = 1000
  const itemSize = 100
  const itemCount = data.length
  /**
   * width={1000} //总长度
   * itemSize={100}//单个长度
   * itemCount 最多展示多少个
   */
  const [start, setStart] = useState(0) //起始目录

  let end = start + Math.floor(width / itemSize) + 1 //一共渲染11条数据
  end = end > itemCount ? itemCount : end //如果结束的索引已经越界了，到结束为止 ,
  useEffect(() => {
    console.log(end)
  }, [end])

  //滚动事件
  const handleScroll = () => {
    const { scrollLeft } = scrollBox.current
    const start = Math.floor(scrollLeft / itemSize)
    setStart(start)
  }
  return (
    <div>
      {/* 假数据10天测试 */}

      {/* x轴 */}
      <div
        className={styles.contentX}
        style={{ width: `${width}px` }}
        ref={scrollBox}
        onScroll={handleScroll}
      >
        {/* 头部日期 */}
        <div className={styles.topFlex} style={{ width: `${sum}px` }}>
          {data.map((item) => (
            <div
              key={item.key}
              className={styles.top}
              style={{ width: `${itemSize}px` }}
            >
              {item.name}
            </div>
          ))}
        </div>
        {/*柱状图 */}
        <div className={styles.topFlex} style={{ width: `${sum}px` }}>
          {data.map((item) => (
            //单个数据
            <div
              key={item.key}
              className={styles.histogram}
              style={{ width: `${itemSize}px` }}
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
                  lineHeight: `${item.height}px`
                }}
              >
                {item.height}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Custom
