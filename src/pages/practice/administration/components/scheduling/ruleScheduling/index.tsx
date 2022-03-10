import { Button, Modal } from 'antd'
import React from 'react'

import Forms from './forms/index'
import Tables from './tables/index'
function index(props: { scheduling: any; setScheduling: any }) {
  const { scheduling, setScheduling } = props

  const onCancel = () => {
    setScheduling(false)
  }
  const handleCancel = () => {
    setScheduling(false)
  }
  //头部form的数据
  const FormData = (e: any) => {
    console.log('头部form的数据', e)
  }

  return (
    <div>
      <Modal
        width={1000}
        visible={scheduling}
        centered={true}
        footer={null}
        onCancel={onCancel}
        // maskClosable={false}
      >
        <Forms FormData={FormData} />
        <Tables />
        <Button type="primary" onClick={onCancel}>
          开始排程
        </Button>
      </Modal>
    </div>
  )
}

export default index
