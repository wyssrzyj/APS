import { Button, Modal } from 'antd'
import React from 'react'

import { Icon } from '@/components'

import styles from './listCard.module.less'

function index(props: {
  type: any
  movIsModalVisible: any
  setMovIsModalVisible: any
  movApi: any
}) {
  const { type, movIsModalVisible, setMovIsModalVisible, movApi } = props
  const onCancel = () => {
    setMovIsModalVisible(false)
  }
  const handleCancel = () => {
    setMovIsModalVisible(false)
  }
  // 弹窗确认
  const handleOk = () => {
    if (type === 'withdraw') {
      //   refuse(data.supplierInquiryId)
    }
    if (type === 'mov') {
      //   del()
      movApi()
    }
    setMovIsModalVisible(false)
  }

  return (
    <div>
      <Modal
        visible={movIsModalVisible}
        centered={true}
        footer={null}
        onCancel={onCancel}
        // maskClosable={false}
      >
        <div className={styles.delContent}>
          {type === 'mov' ? (
            <div className={styles.delContent}>
              <Icon type={'jack-sptg1'} className={styles.delIcon}></Icon>
              <div className={styles.delTitle}>是否删除?</div>
            </div>
          ) : null}
          {type === 'withdraw' ? (
            <div className={styles.delContent}>
              <Icon type={'jack-ts'} className={styles.delIcon}></Icon>
              <div className={styles.delTitle}>是否拒绝？</div>
            </div>
          ) : null}

          <div className={styles.modal}>
            <Button
              className={styles.cancelBtn}
              size="large"
              type="primary"
              ghost
              onClick={handleCancel}
            >
              取消
            </Button>
            <Button
              type="primary"
              className={styles.submitBtn}
              onClick={handleOk}
              size="large"
            >
              确认
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default index
