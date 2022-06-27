/*
 * @Author: lyj
 * @Date: 2022-06-20 10:26:25
 * @LastEditTime: 2022-06-20 14:30:26
 * @Description:
 * @LastEditors: lyj
 */
import { Button, Checkbox, Modal } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { Icon } from '@/components' //路径

import styles from './index.module.less'
const HomePage = (props) => {
  const { newestHomePage } = props
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [homePage, setHomePage] = useState<any>({})
  useEffect(() => {
    if (localStorage.getItem('homePage')) {
      setHomePage(JSON.parse(localStorage.getItem('homePage')))
    }
  }, [])
  //更新
  const update = (e, index, type) => {
    homePage[type][index].type = e.target.checked
    setHomePage(homePage)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    localStorage.setItem('homePage', JSON.stringify(homePage))
    newestHomePage && newestHomePage(homePage)
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <div className={styles.earlyWarning}>
        <Icon type="jack-set" className={styles.previous} onClick={showModal} />
      </div>
      <Modal
        centered={true}
        title="首页配置"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          首页上半部分显示:
          <div className={styles.configureContainer}>
            {!isEmpty(homePage.upper)
              ? homePage.upper.map((item, index) => (
                  <div key={index} className={styles.containerUpper}>
                    <Checkbox
                      onChange={(e) => update(e, index, 'upper')}
                      defaultChecked={item.type}
                      className={styles.upper}
                    />
                    <span>{item.name}</span>
                  </div>
                ))
              : null}
          </div>
        </div>
        <br />
        <div>
          首页下半部分显示：
          <div className={styles.configureContainer}>
            {!isEmpty(homePage.lower)
              ? homePage.lower.map((item, index) => (
                  <div key={index} className={styles.containerUpper}>
                    <Checkbox
                      onChange={(e) => update(e, index, 'lower')}
                      defaultChecked={item.type}
                      className={styles.upper}
                    />
                    <span>{item.name}</span>
                  </div>
                ))
              : null}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default HomePage
