/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, message, Modal, Tabs } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
import TabPanes from './tabPanes/index'

function Material(props: {
  materialModal: any
  setMaterialModal: any
  materialList: any
}) {
  const { materialModal, setMaterialModal, materialList } = props
  const [list, setList] = useState<any>() //处理后的数据

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

  const dataReset = (e) => {
    console.log('暴露的值', e)

    setList(e)
  }
  const confirm = () => {
    if (!isEmpty(list)) {
      const hangInTheAir = list.filter((item) => item.satisfy !== true) //长度为空才能关闭
      const sum: any = []
      hangInTheAir.map((item) => {
        sum.push(item.name)
      })
      message.warning(sum.join('、'))
    }
  }

  const callback = (key: any) => {}
  return (
    <div>
      <Modal
        width={1300}
        visible={materialModal}
        centered={true}
        footer={null}
        onCancel={onCancel}
      >
        <Tabs onChange={callback} type="card">
          {materialList &&
            materialList.map((item, index) => (
              <TabPane tab={item.name} key={item.id}>
                <TabPanes
                  index={index}
                  materialList={materialList}
                  dataReset={dataReset}
                />
              </TabPane>
            ))}
        </Tabs>
        ,
        <div className={styles.bottom}>
          <Button type="primary" onClick={confirm}>
            确认
          </Button>
          <Button type="primary" ghost onClick={onCancel}>
            取消
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Material
