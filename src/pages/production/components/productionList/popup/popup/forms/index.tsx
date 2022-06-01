import { Col, Form, Input, InputNumber, message, Row, TreeSelect } from 'antd'
import { debounce } from 'lodash' //防抖
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { getChild } from '@/components/getChild'

import styles from './index.module.less'

function Forms(props: { FormData: any; data: any; types: any }) {
  const { FormData, data, types } = props
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { validateFields } = form
  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue(data)
    }
  }, [types, data])
  const { TextArea } = Input
  const layout = {
    labelCol: {
      span: 10
    },
    wrapperCol: {
      span: 15
    }
  }
  const layout1 = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 20
    }
  }

  const handleSubmit = debounce(async () => {
    const values = await validateFields()
    FormData &&
      FormData({ ...values, externalProcessId: data.externalProcessId })
  }, 500)

  const getValueFromEvent = (event: any, type = 'text') => {
    // 可根据需要 通过 setFieldsValue 设置联动效果
    setTimeout(async () => {
      await handleSubmit()
    })
    // ****根据不同的返回不同的数据
    if (type === 'input') {
      return event
    }
    return event
  }

  return (
    <div className={styles.relative}>
      <div className={styles.relativeColor}>
        <Form
          form={form}
          name="basic"
          {...layout}
          // onFinish={onFinish}
          autoComplete="off"
        >
          <Row>
            <Col span={8}>
              <Form.Item label="序号" name="idx">
                <Input placeholder="请输入序号" disabled={true} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="工序名称" name="processName">
                <Input placeholder="请输入工序名称" disabled={true} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="工序代码" name="processCode">
                <Input placeholder="请选择工序代码" disabled={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="所属工段" name="section">
                <Input placeholder="请选择所属工段" disabled={true} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="工序耗时" name="secondPlan">
                <InputNumber addonAfter="S" disabled={true} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="固定用时"
                name="reservedTime"
                getValueFromEvent={(event: InputEvent) =>
                  getValueFromEvent(event, 'input')
                }
              >
                <InputNumber addonAfter="天" disabled={types} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                label="前准备"
                name="beforePrepareTime"
                getValueFromEvent={(event: InputEvent) =>
                  getValueFromEvent(event, 'input')
                }
              >
                <InputNumber addonAfter="S" disabled={types} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="后准备"
                name="afterPrepareTime"
                getValueFromEvent={(event: InputEvent) =>
                  getValueFromEvent(event, 'input')
                }
              >
                <InputNumber addonAfter="S" disabled={types} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="前工段完成量"
                name="beforeFinishAmount"
                getValueFromEvent={(event: InputEvent) =>
                  getValueFromEvent(event, 'input')
                }
              >
                <InputNumber addonAfter="" disabled={types} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                label="前工段间隔时间"
                name="beforeWaitTime"
                getValueFromEvent={(event: InputEvent) =>
                  getValueFromEvent(event, 'input')
                }
              >
                <InputNumber addonAfter="天" disabled={types} />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="工艺说明" name="note" {...layout1}>
                <TextArea
                  rows={4}
                  placeholder="请输入工艺说明"
                  disabled={true}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default Forms
