/*
 * @Author: lyj
 * @Date: 2022-04-13 15:47:01
 * @LastEditTime: 2022-07-20 15:06:23
 * @Description:
 * @LastEditors: lyj
 */
import { Button, Col, Form, Image, Input, Row, TreeSelect } from 'antd'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { dockingData } from '@/recoil'

import styles from './index.module.less'

function TabPanes(props: any) {
  const { list } = props
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { SHOW_PARENT } = TreeSelect
  const { TextArea } = Input
  const searchConfigs = useRecoilValue(dockingData.searchConfigs)

  useEffect(() => {
    form.setFieldsValue(list)
  }, [list])
  const layout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 24
    }
  }
  const executionMethod = () => {
    form.submit()
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
    form.resetFields() //清除form中的数据
  }

  return (
    <div className={styles.relative}>
      <Form
        form={form}
        name="basic"
        {...layout}
        // initialValues={}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row>
          <Col span={12}>
            <Form.Item label="生产单号" name="externalProduceOrderNum">
              <Input
                maxLength={100}
                placeholder="请输入生产单号"
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="产品名称" name="productName">
              <Input
                maxLength={100}
                placeholder="请输入产品名称"
                disabled={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="生产单总量" name="orderSum">
              <Input
                maxLength={100}
                placeholder="请输入生产单总量"
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="产品款号" name="productNum">
              <Input
                maxLength={100}
                placeholder="请输入产品款号"
                disabled={true}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default TabPanes
