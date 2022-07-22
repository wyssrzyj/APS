/*
 * @Author: zjr
 * @Date: 2022-06-01 15:20:19
 * @LastEditTime: 2022-06-30 10:40:54
 * @Description:
 * @LastEditors: lyj
 */
import { Col, Row } from 'antd'
import { cloneDeep, debounce } from 'lodash'
import React, { useEffect, useMemo, useRef } from 'react'

import { FormNode } from '@/components'

import styles from './index.module.less'

const SearchBar = (props: Record<string, any>) => {
  const { params, callback, configs } = props

  const sliceIntoChunks = (arr, chunkSize) => {
    const res = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize)
      res.push(chunk)
    }
    return res
  }

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
    return sliceIntoChunks(configs, 3).map((v, indexS) => (
      <Row key={indexS}>
        {v.map((item: Record<string, any>, idx: number) => {
          const keys = [
            'type',
            'options',
            'field',
            'placeholder',
            'allowClear',
            'filterOption',
            'showSearch',
            'onSearch',
            'treeData',
            'width'
          ]
          const obj: any = {}

          keys.forEach((i) => (obj[i] = item[i]))

          return (
            <Col span={8} key={idx}>
              <div key={idx} className={styles.searchItem}>
                <div className={styles.searchLabel}>{item.label}</div>
                <div className={styles.searchValue}>
                  <FormNode
                    {...obj}
                    onChange={(value) => valuesChange(value, item.field)}
                    value={params[item.field]}
                  ></FormNode>
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
    ))
  }, [configs, params])

  return (
    <div className={styles.searchBar} id={'searchBar'}>
      {Search}
    </div>
  )
}

export default SearchBar
