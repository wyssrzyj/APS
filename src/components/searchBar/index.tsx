/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-04-20 14:54:47
 * @LastEditors: zjr
 * @LastEditTime: 2022-05-26 10:39:30
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

  const paramsValues = useMemo(() => {
    return { ...params }
  }, [params])

  const valuesChange = debounce((value, field) => {
    const nParams = cloneDeep(paramsValues)
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
                value={paramsValues[item.field]}
              ></FormNode>
            </div>
          </div>
        </Col>
      )
    })
  }, [configs, paramsValues])

  return (
    <div className={styles.searchBar} id={'searchBar'}>
      {Search}
    </div>
  )
}

export default SearchBar
