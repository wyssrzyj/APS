import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import index from '../forms'
import Important from './important/index'
function VirtuaIList(props) {
  const { itemCount, apiList } = props
  //height  容器高度
  // width 容器的宽度
  // itemCount 最多展示多少个
  //itemSize 每个条目有多宽
  const width = 1000
  const height = 600
  const itemSize = 100

  const scrollBox = React.createRef() //创建真实dom

  const [start, setStart] = useState(0) //起始目录
  const [list, setList] = useState([]) //保存处理后的数据

  const end = start + Math.floor(width / itemSize) //划过了几个+总长/单个宽度 +1是防止卡顿

  //滚动事件
  const handleScroll = () => {
    const { scrollLeft } = scrollBox.current
    const starts = Math.floor(scrollLeft / itemSize)

    const f = width / itemSize //可视区域展示多少条
    const maximum = itemCount - f //展示多少-可视区域=最多
    const arr = starts > maximum ? maximum : starts //做限制
    console.log('从哪里截取', arr)

    setStart(arr)
  }

  //数据处理
  useEffect(() => {
    if (!isEmpty(apiList)) {
      apiList.map((item, index) => {
        //给数据添加下标 用于定位left位置的判断
        item.list.map((e, i) => {
          e.index = i
        })
        //*************可视范围是 10条 前渲染1条后渲染2条 一共渲染13 防止空白 2022.3.15 --21.35********
        item.test = item.list.slice(start === 0 ? start : start - 1, end + 2)
      })
      setList(apiList)
    }
  }, [start, apiList])

  return (
    //最外层
    <div
      style={{
        overflowX: 'auto',
        height,
        width
        // border: '1px solid rgb(9, 8, 8)'
        // padding: '20px'
      }}
      ref={scrollBox}
      onScroll={handleScroll}
    >
      {/* 单个数据-BOOS */}
      {!isEmpty(list)
        ? list.map((item) => (
            <Important
              key={item.id}
              itemCount={itemCount}
              itemSize={itemSize}
              data={item.test}
              start={start}
            />
          ))
        : null}
    </div>
  )
}

export default VirtuaIList
