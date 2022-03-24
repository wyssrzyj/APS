import { Button, Col, Form, Image, Input, Row, TreeSelect } from 'antd'
import React, { useEffect } from 'react'

import styles from './index.module.less'

function TabPanes(props: any) {
  const { list } = props
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { SHOW_PARENT } = TreeSelect
  const { TextArea } = Input
  useEffect(() => {
    // const arr = {
    //   serial: '1',
    //   process: '2',
    //   processTime: '3',
    //   remarks: '4',
    //   front: '5',
    //   totalProduction: '6'
    // }
    form.setFieldsValue(list)
  }, [list])

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
  const tProps = {
    treeData,
    value: value,

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
          <Col span={12}>
            <Form.Item label="生产单号" name="serial">
              <Input
                maxLength={100}
                placeholder="请输入生产单号"
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="销售单号" name="process">
              <Input
                maxLength={100}
                placeholder="请输入销售单号"
                disabled={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="产品名称" name="processTime">
              <Input
                maxLength={100}
                placeholder="请输入产品名称"
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="生产单总量" name="totalProduction">
              <Input
                maxLength={100}
                placeholder="请输入生产单总量"
                disabled={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="客户款号" name="remarks">
              <Input
                maxLength={100}
                placeholder="请输入客户款号"
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="产品款号" name="front">
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
