/*
 * @Author: lyj
 * @Date: 2022-08-02 10:55:41
 * @LastEditTime: 2022-08-04 09:56:29
 * @Description:
 * @LastEditors: lyj
 */
import { atom } from 'recoil'

const layoutData = atom({
  key: 'layoutData',
  default: []
})
const layoutColor = atom({
  key: 'layoutColor',
  default: '#1890ff'
})
//主体设置
const systemParameter = atom({
  key: 'systemParameter',
  default: {}
})
//布局样式
const layoutSettings = atom({
  key: 'layoutSettings',
  default: []
})

export default { layoutColor, layoutData, systemParameter, layoutSettings }
