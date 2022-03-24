import { Button, Col, Form, Image, Input, message, Row, TreeSelect } from 'antd'
import { isEmpty, isNil } from 'lodash'
import React, { useEffect } from 'react'

import { getChild } from '@/components/getChild'

import styles from './index.module.less'

function Forms(props: any) {
  const { formData, types } = props
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(formData)
  }, [types, formData])

  const { SHOW_PARENT } = TreeSelect
  const { TextArea } = Input
  const value = ['0-0-0']
  const treeData = [
    {
      title: '工厂',
      value: '1',
      key: '1',
      children: [
        {
          title: '工厂1',
          value: '1-1',
          key: '1-1'
        },
        {
          title: '工厂2',
          value: '1-2',
          key: '1-2'
        }
      ]
    },
    {
      title: '原料',
      value: '2',
      key: '2',
      children: [
        {
          title: '大米',
          value: '2-1',
          key: '2-1'
        },
        {
          title: '土豆',
          value: '2-2',
          key: '2-2'
        },
        {
          title: '菠萝',
          value: '2-3',
          key: '2-3'
        }
      ]
    },
    {
      title: '玩具',
      value: '3',
      key: '3',
      children: [
        {
          title: '金铲铲的冠冕',
          value: '3-1',
          key: '3-1'
        },
        {
          title: '残暴之力',
          value: '3-2',
          key: '3-2'
        },
        {
          title: '末日寒冬',
          value: '3-3',
          key: '3-3'
        }
      ]
    },
    {
      title: '蔬菜',
      value: '4',
      key: '4'
    }
  ]
  const layout = {
    labelCol: {
      span: 10
    },
    wrapperCol: {
      span: 15
    }
  }
  const executionMethod = () => {
    form.submit()
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
    if (values.workTeam) {
      values.workTeam = getChild(values.workTeam, treeData) //下拉多选的处理
    }
    // form.resetFields() //清除form中的数据
    message.success('修改成功')
  }
  const tProps = {
    treeData,
    value: value,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择工作班组',
    style: {
      width: '100%'
    }
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
          <Col span={8}>
            <Form.Item label="序号" name="idx">
              <Input maxLength={100} placeholder="请输入序号" disabled={true} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="工序名称" name="productName">
              <Input
                maxLength={100}
                placeholder="请输入工序名称"
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="工序代码"
              name="productCode"
              // rules={[{ required: true, message: '请选择工序代码!' }]}
            >
              <Input
                maxLength={100}
                placeholder="请选择工序代码"
                disabled={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="所属工段" name="section">
              <TreeSelect {...tProps} disabled={true} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="工序耗时" name="secondPlan">
              <Input
                maxLength={100}
                placeholder="请输入工序耗时"
                suffix="秒"
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="固定用时" name="reservedTime">
              <Input
                maxLength={100}
                placeholder="请输入固定用时"
                suffix="天"
                disabled={types}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="前准备" name="beforePrepareTime">
              <Input
                maxLength={100}
                placeholder="请输入时间"
                suffix="秒"
                disabled={types}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="后准备" name="afterPrepareTime">
              <Input
                maxLength={100}
                placeholder="请输入时间"
                suffix="秒"
                disabled={types}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="前工序完成量" name="beforeFinishAmount">
              <Input
                maxLength={100}
                placeholder="请输入前工序完成量"
                disabled={types}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label="前工序间隔时间" name="beforeWaitTime">
              <Input
                maxLength={100}
                placeholder="请输入时间"
                suffix="天"
                disabled={types}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="工艺说明" name="note">
              <TextArea rows={4} placeholder="请输入工艺说明" disabled={true} />
            </Form.Item>
          </Col>
        </Row>
        <Button
          className={styles.executionMethod}
          type="primary"
          disabled={types}
          onClick={executionMethod}
        >
          确认
        </Button>
      </Form>
    </div>
  )
}

export default Forms
