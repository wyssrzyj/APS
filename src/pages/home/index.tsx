import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { commonState } from '@/recoil'
import { commonApis } from '@/recoil/apis'

import styles from './index.module.less'

const Home = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('zf')

  const [factoryName] = useRecoilState(commonState.factoryName)
  const allArea = useRecoilValue(commonState.allArea)
  console.log('🚀 ~ file: index.tsx ~ line 14 ~ Home ~ allArea', allArea)
  console.log(
    '🚀 ~ file: index.tsx ~ line 13 ~ Home ~ factoryName',
    factoryName
  )

  useEffect(() => {
    ;(async () => {
      await commonApis.getInfo({})
    })()

    setTimeout(() => {
      setCount((n) => ++n)
      setName((n) => (n === 'zf' ? 'am' : 'zf'))
    })
  }, [])

  return (
    // 多个样式处理方法classNames 可使用三元
    <div>
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        count is: {count}
      </button>

      <Button>按钮</Button>

      <div className={styles.nameText}>{name}</div>
    </div>
  )
}

export default Home
