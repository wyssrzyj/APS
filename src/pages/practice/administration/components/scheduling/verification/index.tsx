import { Button, Modal } from 'antd'
import React from 'react'

function index(props: { schedule: any; setSchedule: any }) {
  const { schedule, setSchedule } = props

  const onCancel = () => {
    setSchedule(false)
  }
  const handleCancel = () => {
    setSchedule(false)
  }
  //头部form的数据
  const FormData = (e: any) => {
    console.log('头部form的数据', e)
  }

  return (
    <div>
      <Modal
        visible={schedule}
        centered={true}
        // footer={null}
        onCancel={onCancel}
        // maskClosable={false}
      >
        <div>生产单：00000000延期</div>
        <div> 班组A：资源冲突</div>
        <div> 产品xxx工序信息异常</div>
      </Modal>
    </div>
  )
}

export default index
