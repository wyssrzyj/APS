import { Form, InputNumber } from 'antd'
import React, { useEffect, useRef } from 'react'

import styles from './index.module.less'

const useHeaderForm = (props: Record<string, any>) => {
  const { searchParams, onChange } = props
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  return (
    <div className={styles.top}>
      <Form form={form} onValuesChange={onChange} initialValues={searchParams}>
        <div className={styles.formContainer}>
          <Form.Item name="customerPriorityWeight" label="客户优先级权重">
            <InputNumber
              style={{ width: '100%' }}
              placeholder="请输入客户优先级权重"
            />
          </Form.Item>
          <Form.Item name="orderPriorityWeight" label="订单优先级权重">
            <InputNumber
              style={{ width: '100%' }}
              placeholder="请输入订单优先级权重"
            />
          </Form.Item>
          <Form.Item name="deliveryDatePriorityWeight" label="交期优先级权重">
            <InputNumber
              style={{ width: '100%' }}
              placeholder="请输入交期优先级权重"
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default useHeaderForm
