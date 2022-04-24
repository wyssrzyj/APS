import { Modal } from 'antd'
import React, { useMemo, useRef } from 'react'

import CustomForm from '../customForm'

const CustomModal = (props: Record<string, any>) => {
  const {
    width = 500,
    visible,
    cancel,
    title,
    callback,
    configs,
    initialValues,
    layout,
    className,
    onChange,
    ...others
  } = props
  const formRef: any = useRef()

  const onCancel = () => {
    cancel && cancel()
  }

  const submit = async () => {
    const {
      current: { validateFields }
    } = formRef

    try {
      if (validateFields) {
        const values = await validateFields()
        callback && (await callback(values))
        cancel && cancel()
      }
    } catch (err) {
      console.log(err, 'error')
    }
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={submit}
      width={width}
      centered
      maskClosable={false}
      className={className}
      {...others}
    >
      <CustomForm
        configs={configs}
        ref={formRef}
        initialValues={initialValues}
        layout={layout}
        onChange={onChange}
      ></CustomForm>
    </Modal>
  )
}

export default CustomModal
