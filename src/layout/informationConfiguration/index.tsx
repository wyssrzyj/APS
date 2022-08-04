/*
 * @Author: lyj
 * @Date: 2022-08-01 18:00:56
 * @LastEditTime: 2022-08-04 14:56:16
 * @Description:
 * @LastEditors: lyj
 */
import { SettingOutlined } from '@ant-design/icons'
import { Divider, Drawer } from 'antd'
import { useEffect, useState } from 'react'

import Border from './border'
import styles from './index.module.less'
import LayoutSettings from './layoutSettings'
import ThemeColor from './themeColor'

function InformationConfiguration(props) {
  const { backgroundColor } = props
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
        style={{ color: backgroundColor === '#fff' ? '#000' : '#fff' }}
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
        <LayoutSettings />
      </Drawer>
    </div>
  )
}

export default InformationConfiguration
