import { Button, Form, Input, Row } from 'antd'
import React from 'react'

import styles from './index.module.less'

function System() {
  const [form] = Form.useForm() //第二步.
  const layout = {
    labelCol: {
      span: 24
    },
    wrapperCol: {
      span: 24
    }
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  return (
    <div className={styles.qualification}>
      <div className={styles.top}>
        <Form
          onFinish={onFinish}
          form={form} //第一步
          labelAlign="right"
        >
          <Row>
            <Form.Item
              {...layout}
              name="keyword1"
              label="默认交付用时"

              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
            >
              <Input placeholder="请输入用户关键字" size="small" allowClear />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              {...layout}
              name="name2"
              label="库存负荷图默认显示时间区间"
              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
            >
              <Input placeholder="请输入订单名称" size="small" allowClear />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              {...layout}
              name="keyword3"
              label="人员负荷图默认显示时间区间"

              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
            >
              <Input placeholder="请输入用户关键字" size="small" allowClear />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              {...layout}
              name="keyword4"
              label="订单甘特图默认显示时间区间"

              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
            >
              <Input placeholder="请输入用户关键字" size="small" allowClear />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              {...layout}
              name="keyword5"
              label="资源甘特图默认显示时间区间"

              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
            >
              <Input placeholder="请输入用户关键字" size="small" allowClear />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              {...layout}
              name="keyword6"
              label="交期权重"

              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
            >
              <Input placeholder="请输入用户关键字" size="small" allowClear />
            </Form.Item>
          </Row>

          <Row>
            <Form.Item
              {...layout}
              name="keyword8"
              label="延期显示颜色"

              //第4步 给每个form.Item添加getValueFromEvent事件
              //  {/* 设置如何将 event 的值转换成字段值 */}
            >
              <Input placeholder="请输入用户关键字" size="small" allowClear />
            </Form.Item>
          </Row>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default System
