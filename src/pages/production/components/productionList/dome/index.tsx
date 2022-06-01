/* eslint-disable @typescript-eslint/no-this-alias */
import React from 'react'

function Dame() {
  /**
   * @desc 函数防抖
   * @param func 函数
   * @param wait 延迟执行毫秒数
   */
  let timeout: any
  function debounce(func: any, wait: any) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func()
    }, wait)
  }
  const axjx = () => {
    console.log(123)
  }
  const implement = () => {
    debounce(axjx, 2000)
  }

  return (
    <div>
      <button onClick={implement}> 防抖测试</button>
    </div>
  )
}

export default Dame
