import React, { useEffect, useState } from 'react'

function VirtuaIList(props: any) {
  const { height, width, itemCount, itemSize, renderItem } = props

  const scrollBox: any = React.createRef() //创建真实dom
  // const  scrollBox=useRef()//创建真实dom
  //height  容器高度
  // width 容器的宽度
  // itemCount 最多展示多少个
  //itemSize 每个条目有多高
  const [start, setStart] = useState(0) //起始目录
  let end = start + Math.floor(height / itemSize) + 1 //一共渲染11条数据

  end = end > itemCount ? itemCount : end //如果结束的索引已经越界了，到结束为止 ,

  const viwibleList = new Array(end - start)
    .fill(0)
    .map((item, index) => ({ index: start + index }))
  const itemStyle = { position: 'absolute', left: 0, width: '100%', height: 50 } //样式

  //滚动事件
  const handleScroll = () => {
    const { scrollTop } = scrollBox.current
    const start = Math.floor(scrollTop / itemSize)
    setStart(start)
  }
  useEffect(() => {
    console.log('新数组', viwibleList)
  }, [viwibleList])

  return (
    // <div  ref={scrollBox} onScroll={handleScroll}>
    <div
      style={{ overflow: 'auto', willChange: 'transform', height, width }}
      ref={scrollBox}
      onScroll={handleScroll}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `${itemCount * itemSize}px`
        }}
      >
        {viwibleList.map(({ index }) =>
          renderItem({ index, style: { ...itemStyle, top: itemSize * index } })
        )}
      </div>
    </div>
  )
}

export default VirtuaIList
