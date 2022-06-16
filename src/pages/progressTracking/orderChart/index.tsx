/*
 * @Author: lyj
 * @Date: 2022-06-01 17:37:07
 * @LastEditTime: 2022-06-16 15:21:57
 * @Description:
 * @LastEditors: lyj
 */
/* eslint-disable jsx-a11y/iframe-has-title */

import { Button, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Forms from './forms'
import styles from './index.module.less'
const SchedulingResults = () => {
  const location = useLocation()
  const { search } = location

  const [formData, setFormData] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const FormData = (e: any) => {
    setFormData(e)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div className={styles.qualification}>
      <Forms FormData={FormData}></Forms>
      <div id="c1"></div>
      <Button type="primary" onClick={showModal}>
        对比测试
      </Button>
      <Modal
        width={2000}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.iframeContainer}>
          <iframe
            frameBorder="0"
            title={'beforeUpdate'}
            className={styles.domeLeft}
            src={`/iframeDate?id=${formData}&type=1`}
          ></iframe>
          <iframe
            frameBorder="0"
            title={'afterUpdate'}
            className={styles.domeLeft}
            src={`/iframeDate?id=${formData}&type=2`}
          ></iframe>
        </div>
      </Modal>
      <div className={styles.ganttContent}>
        <iframe
          className={styles.dome}
          frameBorder="0"
          title={'orderChart'}
          src={`/iframeDate?id=${formData}&type=orderChart`}
        ></iframe>
      </div>
    </div>
  )
}

export default SchedulingResults
