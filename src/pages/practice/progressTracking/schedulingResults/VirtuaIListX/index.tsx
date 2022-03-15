import React, { useEffect, useState } from 'react'

import VirtuaIList from './VirtuaIList.tsx'
function Stairs() {
  const [itemCount, setItemCount] = useState(0)
  const [apiList, setApiList] = useState<any>([])
  const data = new Array(30).fill(0)

  const arr = [
    { name: 1, key: 1, height: 10 },
    { name: 2, key: 2, height: 20 },
    { name: 3, key: 3, height: 30 },
    { name: 4, key: 4, height: 40 },
    { name: 5, key: 5, height: 50 },
    { name: 6, key: 6, height: 60 },
    { name: 7, key: 7, height: 70 },
    { name: 8, key: 8, height: 80 },
    { name: 9, key: 9, height: 90 },
    { name: 10, key: 10, height: 100 },
    { name: 11, key: 11, height: 10 },
    { name: 12, key: 12, height: 20 },
    { name: 13, key: 13, height: 30 },
    { name: 14, key: 14, height: 40 },
    { name: 15, key: 15, height: 50 },
    { name: 16, key: 16, height: 60 },
    { name: 17, key: 17, height: 70 },
    { name: 18, key: 18, height: 80 },
    { name: 19, key: 19, height: 90 },
    { name: 20, key: 20, height: 100 },
    { name: 21, key: 21, height: 10 },
    { name: 22, key: 22, height: 20 },
    { name: 23, key: 23, height: 30 },
    { name: 24, key: 24, height: 40 },
    { name: 25, key: 25, height: 50 },
    { name: 26, key: 26, height: 60 },
    { name: 27, key: 27, height: 70 },
    { name: 28, key: 28, height: 80 },
    { name: 29, key: 29, height: 90 },
    { name: 30, key: 30, height: 100 }
  ]
  const sumDome = [
    // 假如他有3条数据
    { id: 1, name: '班组一', list: arr },
    { id: 2, name: '班组二', list: arr },
    { id: 3, name: '班组三', list: arr }
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
      <>
        <h1>虚拟列表测试X</h1>
        <VirtuaIList itemCount={itemCount} apiList={apiList} />
      </>
    </div>
  )
}

export default Stairs
