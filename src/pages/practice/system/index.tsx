import { Button, Form, Input, Row } from 'antd'

import styles from './index.module.less'

const HeaderForm = () => {
  const [form] = Form.useForm()
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
        <Form onFinish={onFinish} form={form} labelAlign="right">
          <Row>
            <Form.Item {...layout} name="keyword1" label="默认交付用时">
              <Input placeholder="请输入用户关键字" size="small" allowClear />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              {...layout}
              name="name2"
              label="库存负荷图默认显示时间区间"
            >
              <Input placeholder="请输入订单名称" size="small" allowClear />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              {...layout}
              name="keyword3"
              label="人员负荷图默认显示时间区间"
            >
              <Input placeholder="请输入用户关键字" size="small" allowClear />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              {...layout}
              name="keyword4"
              label="订单甘特图默认显示时间区间"
            >
              <Input placeholder="请输入用户关键字" size="small" allowClear />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              {...layout}
              name="keyword5"
              label="资源甘特图默认显示时间区间"
            >
              <Input placeholder="请输入用户关键字" size="small" allowClear />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item {...layout} name="keyword6" label="交期权重">
              <Input placeholder="请输入用户关键字" size="small" allowClear />
            </Form.Item>
          </Row>

          <Row>
            <Form.Item {...layout} name="keyword8" label="延期显示颜色">
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

export default HeaderForm
