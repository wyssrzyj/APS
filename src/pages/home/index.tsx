import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { commonState } from '@/recoil'
import { commonApis } from '@/recoil/apis'

import Dome from './dome'
import styles from './index.module.less'

const Home = () => {
  //设置可读可写
  const [value, setValue] = useRecoilState(commonState.textState)
  const [name, setName] = useRecoilState(commonState.lyj)
  const executionMethod = () => {
    setName('全局的id')
  }
  return (
    // 多个样式处理方法classNames 可使用三元
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={executionMethod}>存全局的id</button>
      <div>lyj：{name}</div>
      {/* <Dome /> */}
    </div>
  )
}

export default Home
