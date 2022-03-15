import React from 'react'

import VirtuaIList from './VirtuaIList.tsx'
function stairs() {
  const data = new Array(30).fill(0)
  return (
    <div>
      <>
        <h1>虚拟列表测试</h1>
        <VirtuaIList
          width="50%"
          height={500}
          itemCount={data.length}
          itemSize={50}
          renderItem={(data) => {
            const { index, style } = data
            return (
              <div
                key={index}
                style={{
                  ...style,
                  backgroundColor: index % 2 == 0 ? 'green' : 'orange'
                }}
              >
                {index + 1}
              </div>
            )
          }}
        />
      </>
    </div>
  )
}

export default stairs
