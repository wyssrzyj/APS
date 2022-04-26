import { Col, Row } from 'antd'
import { cloneDeep, debounce } from 'lodash'
import React, { useEffect, useMemo, useRef } from 'react'

import { FormNode } from '@/components'

import styles from './index.module.less'

const SearchBar = (props: Record<string, any>) => {
  const { params, callback, configs } = props

  const paramsRef = useRef<any>(params)

  useEffect(() => {
    paramsRef.current = { ...params }
  }, [params])

  const valuesChange = debounce((value, field) => {
    const nParams = cloneDeep(paramsRef.current)
    nParams[field] = value
    callback && callback(nParams)
  }, 200)

  const Search = useMemo(() => {
    return configs.map((item: any, idx: number) => {
      return (
        <Col key={idx} span={8}>
          <div
            key={idx}
            className={styles.searchItem}
            style={{ width: item.width }}
          >
            <span className={styles.searchLabel}>{item.label}</span>
            <div className={styles.searchValue}>
              <FormNode
                key={params[item.field]}
                {...item}
                onChange={(value) => valuesChange(value, item.field)}
                value={paramsRef.current[item.field]}
              ></FormNode>
            </div>
          </div>
        </Col>
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
