import { Col, Form, Modal } from 'antd'
import { useEffect } from 'react'

import { CustomModal } from '@/components'
import FormNode from '@/components/FormNode'

import { formItemConfig } from '../conifgs'
const FormItem = Form.Item
function Popup(props: Record<string, any>) {
  const { isModalVisible, modalInfo, onCancel } = props

  const callback = () => {
    console.log(callback, 'callback')
  }

  return (
    <CustomModal
      width={800}
      visible={isModalVisible}
      title={'查看生产计划'}
      callback={callback}
      configs={formItemConfig}
      cancel={() => onCancel(false)}
      footer={false}
    ></CustomModal>
  )
}

export default Popup
