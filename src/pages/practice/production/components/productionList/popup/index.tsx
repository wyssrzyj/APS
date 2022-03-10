import { Form, Modal, Tabs } from 'antd'
import React, { useEffect } from 'react'

import Forms from './forms/index'
import styles from './index.module.less'
import Outgoing from './outgoing/index'
import Tables from './tables/index'
function Popup(props: { content: any }) {
  const { content } = props
  const { isModalVisible, setIsModalVisible } = content
  const { TabPane } = Tabs
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  useEffect(() => {
    form.resetFields()
  }, [])

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <Modal
        width={1000}
        // title={type ? '新增加班' : '编辑加班'}
        visible={isModalVisible}
        onOk={handleOk}
        okText="保存"
        onCancel={handleCancel}
        // footer={[<Button onClick={equipmentHandleCancel}>取消</Button>]}
        centered={true}
      >
        <Tabs type="card">
          <TabPane tab="工艺路线" key="1">
            <Tables />
            <div className={styles.forms}>
              <Forms></Forms>
            </div>
          </TabPane>
          <TabPane tab="外发管理" key="2">
            <Outgoing />
          </TabPane>
        </Tabs>
        ,
      </Modal>
    </div>
  )
}

export default Popup
