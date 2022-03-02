import { Button } from 'antd'
import { memo, useMemo, useState } from 'react'

import styles from './index.module.less'

// 样式使用模块化方式引入 避免样式名称重复引起样式污染

const Child = memo((props: { count: string }) => {
  const { count } = props

  console.log(555555)
  return <div>Child ------{count}</div>
})

const Demo = () => {
  const [count, setCount] = useState<number>(0)

  const changeCount = () => {
    setCount((num: number) => num + 1)
  }

  const cCount = useMemo(() => {
    return count + 'child'
  }, [count])

  return (
    <div>
      <div className={styles.demo}>demo</div>

      <Button onClick={changeCount}>加一</Button>
      <div>current count is: {count}</div>

      <Child count={cCount}></Child>
    </div>
  )
}

export default Demo
