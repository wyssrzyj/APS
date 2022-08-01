/*
 * @Author: lyj
 * @Date: 2022-08-01 18:00:56
 * @LastEditTime: 2022-08-01 18:01:07
 * @Description:
 * @LastEditors: lyj
 */
import { Button, Drawer } from 'antd'
import React, { useState } from 'react'

function InformationConfiguration() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <div>
      {' '}
      <>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    </div>
  )
}

export default InformationConfiguration
