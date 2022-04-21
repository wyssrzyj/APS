import { cloneDeep, debounce } from 'lodash'
import React, { useEffect, useMemo, useRef } from 'react'

import { FormNode } from '@/components'

import styles from './index.module.less'

const SearchBar = (props: Record<string, any>) => {
  const { params, callback, configs } = props

  const paramsRef = useRef(params)

  useEffect(() => {
    paramsRef.current = { ...params }
  }, [params])

  const valuesChange = debounce((value, field) => {
    const nParams = cloneDeep(paramsRef.current)
    nParams[field] = value
    callback && callback(nParams)
  }, 200)

  const Search = useMemo(() => {
    return configs.map((item: Record<string, any>, idx: number) => {
      const keys = [
        'type',
        'options',
        'field',
        'placeholder',
        'allowClear',
        'filterOption',
        'showSearch',
        'onSearch',
        'treeData'
      ]
      const obj: any = {}

      keys.forEach((i) => (obj[i] = item[i]))
      return (
        <div key={idx} className={styles.searchItem}>
          <span className={styles.searchLabel}>{item.label}</span>
          <div className={styles.searchValue}>
            <FormNode
              key={params[item.field]}
              {...obj}
              onChange={(value) => valuesChange(value, item.field)}
              value={params[item.field]}
            ></FormNode>
          </div>
        </div>
      )
    })
  }, [configs])

  return (
    <div className={styles.searchBar} id={'searchBar'}>
      {Search}
    </div>
  )
}

export default SearchBar
