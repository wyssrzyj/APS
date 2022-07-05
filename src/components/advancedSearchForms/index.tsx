/*
 * @Author: lyj
 * @Date: 2022-07-05 14:06:48
 * @LastEditTime: 2022-07-05 14:35:16
 * @Description:
 * @LastEditors: lyj
 */
import { Button } from 'antd'
import { useState } from 'react'

import { SearchBar } from '@/components'
import { Icon } from '@/components'

import Up from '../../imgs/Up.png'
import CustomForms from './customForms'
import styles from './index.module.less'
const AdvancedSearch = (props) => {
  const { factoryData, FormData } = props
  // easySearch 普通搜索
  const [searchStatus, setSearchStatus] = useState(false)
  return (
    <div>
      <div className={searchStatus ? styles.formDisplay : styles.formHide}>
        <>
          {searchStatus === true ? (
            <div>
              <div className={styles.forms}>
                <CustomForms
                  factoryData={factoryData}
                  FormData={FormData}
                  display="formDisplay"
                ></CustomForms>
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
            <div className={styles.forms}>
              <CustomForms
                factoryData={factoryData}
                FormData={FormData}
                display="formHide"
              ></CustomForms>
            </div>
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
