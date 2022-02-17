import { Input } from 'antd'
import { debounce, isFunction } from 'lodash'
import React, { useState } from 'react'

const debounceFunc = debounce((func) => {
  isFunction(func) && func()
}, 1000)

const SearchInput = (props: any) => {
  const { placeholder, onChange, onPressEnter, ...otherProps } = props
  const [selfValue, setSelfValue] = useState<string | undefined>(undefined)
  const onChangeSearch = (e: any) => {
    e.persist()
    setSelfValue(e.target.value)
    debounceFunc(() => {
      isFunction(onChange) && onChange(e.target.value)
      // isFunction(onPressEnter) && onPressEnter(e.target.value)
    })
  }
  return (
    <Input
      placeholder={placeholder || '请输入搜索关键字'}
      value={selfValue}
      onChange={onChangeSearch}
      onPressEnter={onPressEnter}
      {...otherProps}
    />
  )
}

export default SearchInput
