/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-04-20 14:54:47
 * @LastEditors: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @LastEditTime: 2022-05-06 09:02:09
 * @FilePath: \jack-aps\src\components\searchBar\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  }, 500)

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
