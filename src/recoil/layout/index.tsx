/*
 * @Author: lyj
 * @Date: 2022-08-02 10:55:41
 * @LastEditTime: 2022-08-05 11:07:38
 * @Description:
 * @LastEditors: lyj
 */
import { atom } from 'recoil'

import styles from './index.module.less'

const layoutData = atom({
  key: 'layoutData',
  default: []
})
const layoutColor = atom({
  key: 'layoutColor',
  default: '#1890ff'
})
//主体设置-初始
const systemParameter = atom({
  key: 'systemParameter',
  default: {
    side: [
      {
        name: '暗色侧边栏',
        styles: styles.sideBlack,
        type: true
      },
      {
        name: '亮色侧边栏',
        styles: styles.sideWhite,
        type: false
      }
    ],
    topColor: [
      {
        name: '暗色顶栏',
        styles: styles.topColorBlack,
        type: true,
        color: '#001529'
      },
      {
        name: '亮色顶栏',
        styles: styles.topColorWhite,
        type: false,
        color: '#fff'
      },
      {
        name: '系统颜色顶栏',
        styles: styles.topColorSystem,
        type: false,
        color: '#4395ff'
      }
    ]
  }
})
//布局样式
const layoutSettings = atom({
  key: 'layoutSettings',
  default: []
})

export default { layoutColor, layoutData, systemParameter, layoutSettings }
