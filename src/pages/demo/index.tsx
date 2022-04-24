import { Button } from 'antd'
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'

import styles from './index.module.less'

// 样式使用模块化方式引入 避免样式名称重复引起样式污染
// forwardRef((props, ref) => {

// })

// (props) => {

// }

const Child = forwardRef((props: { count: string }, ref) => {
  const [name, setName] = useState('zf')

  useImperativeHandle(ref, () => ({
    test: name,
    click: onClick
  }))

  console.log(555555)

  const onClick = () => {
    setName((n) => (n === 'zf' ? 'am' : 'zf'))
  }
  return (
    <div>
      <button onClick={onClick}>修改名字</button>
    </div>
  )
})

const Demo = () => {
  const cRef = useRef<any>()

  const [count, setCount] = useState<number>(0)

  const changeCount = () => {
    setCount((num: number) => num + 1)
    if (cRef.current && cRef.current.click) {
      cRef.current.click()
    }
    setTimeout(() => {
      console.log(cRef)
    })
  }

  const cCount = useMemo(() => {
    return count + 'child'
  }, [count])

  return (
    <div>
      <div className={styles.demo}>demo</div>

      <Button onClick={changeCount}>加一</Button>
      <div>current count is: {count}</div>

      <Child count={cCount} ref={cRef}></Child>
    </div>
  )
}

export default Demo
