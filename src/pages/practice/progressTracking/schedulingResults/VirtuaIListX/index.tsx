/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
import VirtuaIList from './VirtuaIList.tsx'
function Stairs() {
  const [itemCount, setItemCount] = useState(0)
  const [apiList, setApiList] = useState<any>([])
  const data = new Array(30).fill(0)

  const arr = [
    { date: 1, key: 1, height: 10 },
    { date: 2, key: 2, height: 20 },
    { date: 3, key: 3, height: 30 },
    { date: 4, key: 4, height: 40 },
    { date: 5, key: 5, height: 50 },
    { date: 6, key: 6, height: 60 },
    { date: 7, key: 7, height: 70 },
    { date: 8, key: 8, height: 80 },
    { date: 9, key: 9, height: 90 },
    { date: 10, key: 10, height: 100 },
    { date: 11, key: 11, height: 10 },
    { date: 12, key: 12, height: 20 },
    { date: 13, key: 13, height: 30 },
    { date: 14, key: 14, height: 40 },
    { date: 15, key: 15, height: 50 },
    { date: 16, key: 16, height: 60 },
    { date: 17, key: 17, height: 70 },
    { date: 18, key: 18, height: 80 },
    { date: 19, key: 19, height: 90 },
    { date: 20, key: 20, height: 100 },
    { date: 21, key: 21, height: 10 },
    { date: 22, key: 22, height: 20 },
    { date: 23, key: 23, height: 30 },
    { date: 24, key: 24, height: 40 },
    { date: 25, key: 25, height: 50 },
    { date: 26, key: 26, height: 60 },
    { date: 27, key: 27, height: 70 },
    { date: 28, key: 28, height: 80 },
    { date: 29, key: 29, height: 90 },
    { date: 30, key: 30, height: 100 }
  ]
  const sumDome = [
    // 假如他有3条数据
    { id: 1, name: '班组一', list: arr },
    { id: 2, name: '班组二', list: arr },
    { id: 3, name: '班组3', list: arr },
    { id: 4, name: '班组4', list: arr },
    { id: 5, name: '班组5', list: arr },
    { id: 6, name: '班组6', list: arr },
    { id: 7, name: '班组7', list: arr }
  ]
  useEffect(() => {
    //总长度
    setItemCount(arr.length)
    console.log('总长度', arr.length)

    setApiList(sumDome)
  }, [])
  //掉接口获取总长度
  return (
    <div>
      <div className={styles.flex}>
        {/* 左侧 */}
        {/* <div>
          <div className={styles.left}>
            <div className={styles.left_top}>日期</div>
            <div className={styles.left_bottom}>
              {apiList.map((item) => (
                <div className={styles.name}>{item.name}</div>
              ))}
            </div>
          </div>
        </div> */}
        {/* 内容区域 */}
        <div>
          <VirtuaIList itemCount={itemCount} apiList={apiList} />
        </div>
        {/* <div className={styles.height}>高度</div> */}
      </div>
    </div>
  )
}

export default Stairs
