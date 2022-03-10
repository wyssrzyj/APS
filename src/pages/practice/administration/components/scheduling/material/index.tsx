/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, Modal, Tabs } from 'antd'
import React, { useEffect } from 'react'

// import styles from './tabPanes/'
import TabPanes from './tabPanes/index'

function Material(props: {
  materialModal: any
  setMaterialModal: any
  materialList: any
}) {
  const { materialModal, setMaterialModal, materialList } = props

  useEffect(() => {
    console.log(materialList)
  }, [materialList])
  const { TabPane } = Tabs
  const onCancel = () => {
    setMaterialModal(false)
  }
  const handleCancel = () => {
    setMaterialModal(false)
  }
  // 弹窗确认
  const handleOk = () => {
    setMaterialModal(false)
  }
  const callback = (key: any) => {}
  return (
    <div>
      <Modal
        width={1200}
        visible={materialModal}
        centered={true}
        footer={null}
        // onOk={handleOk}
        onCancel={onCancel}
      >
        <Tabs onChange={callback} type="card">
          {materialList.map(
            (item: {
              name: any | null | undefined
              id: React.Key | null | undefined
            }) => (
              <TabPane tab={item.name} key={item.id}>
                <TabPanes />
              </TabPane>
            )
          )}
        </Tabs>
        ,
        <div>
          <Button type="primary">齐套检查报告 </Button>
          <Button type="primary">缺料报告 </Button>
          <Button type="primary">确认</Button>
          <Button type="primary" ghost onClick={onCancel}>
            取消
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Material
