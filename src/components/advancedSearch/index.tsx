/*
 * @Author: lyj
 * @Date: 2022-07-05 17:34:13
 * @LastEditTime: 2022-08-05 09:51:56
 * @Description:
 * @LastEditors: lyj
 */
import { Button } from 'antd'
import { useState } from 'react'

import { SearchBar } from '@/components'
import { Icon } from '@/components'

import Up from '../../imgs/Up.png'
import styles from './index.module.less'
const AdvancedSearch = (props) => {
  const { easySearch, configs, params, callback } = props
  // easySearch 普通搜索.
  const [searchStatus, setSearchStatus] = useState(false)
  return (
    <div>
      <div className={searchStatus ? styles.formDisplay : styles.formHide}>
        <>
          {searchStatus === true ? (
            <div>
              <div className={styles.forms}>
                <SearchBar
                  configs={configs}
                  params={params}
                  callback={callback}
                ></SearchBar>
              </div>
              <div
                onClick={() => {
                  setSearchStatus(!searchStatus)
                }}
                className={styles.collect}
              >
                {searchStatus === true ? (
                  <>
                    <img className={styles.imgUp} src={Up} alt="" />
                  </>
                ) : null}
              </div>
            </div>
          ) : null}
        </>
      </div>

      {searchStatus === false ? (
        <>
          <div className={styles.forms}>
            <SearchBar
              configs={easySearch}
              params={params}
              callback={callback}
            ></SearchBar>
            <div className={styles.advancedSearch}>
              <Button
                type="primary"
                ghost
                onClick={() => {
                  setSearchStatus(!searchStatus)
                }}
              >
                高级搜索
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default AdvancedSearch
