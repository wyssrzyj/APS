import { Input, Select } from 'antd'
import { SelectValue } from 'antd/lib/select'
import { cloneDeep } from 'lodash'
import React, { ChangeEvent, useEffect, useState } from 'react'

import styles from './inputConcatSelect.module.less'

const { Option } = Select

type InputEvent = ChangeEvent<HTMLInputElement>

type Item = {
  label: string
  value: any
}

type Props = {
  value?: boolean
  onChange?: (checked: any) => void
  options?: Array<Item>
  keys?: Array<string>
}

type Data = {
  [key: string]: any
}

const InputConcatSelect = (props: Props) => {
  const { onChange, value = {}, options = [], keys = [] } = props

  const [data, setData] = useState<Data>(value)

  const valueChange = (event: InputEvent | SelectValue, type: string) => {
    // console.log(date)
    const oData = cloneDeep(data)
    if (type === 'input') {
      oData[keys[0]] = (event as InputEvent).target.value
    }

    if (type === 'select') {
      oData[keys[1]] = event
    }

    setData(oData)
  }

  useEffect(() => {
    onChange && onChange(data)
  }, [data])

  return (
    <div className={styles.concatBox}>
      <Input
        value={data[keys[0]]}
        onChange={(event) => valueChange(event, 'input')}
      ></Input>
      <Select
        className={styles.select}
        value={data[keys[1]]}
        onChange={(event) => valueChange(event, 'select')}
      >
        {options.map((item: Item) => {
          return (
            <Option value={item.value} key={item.value}>
              {item.label}
            </Option>
          )
        })}
      </Select>
    </div>
  )
}

export default InputConcatSelect
