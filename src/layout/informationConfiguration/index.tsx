/*
 * @Author: lyj
 * @Date: 2022-08-01 18:00:56
 * @LastEditTime: 2022-08-03 08:52:40
 * @Description:
 * @LastEditors: lyj
 */
import { SettingOutlined } from '@ant-design/icons'
import { Divider, Drawer } from 'antd'
import { useState } from 'react'

import Border from './border'
import styles from './index.module.less'
import ThemeColor from './themeColor'

function InformationConfiguration() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <div className={styles.drawerContainer}>
      <SettingOutlined
        style={{ color: '#f6f6f6' }}
        className={styles.drawer}
        onClick={showDrawer}
      />
      <Drawer
        title="主题设置"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Border />

        <p>颜色设置</p>
        <ThemeColor />
        <Divider />

        <p>布局设置</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}

export default InformationConfiguration
