/*
 * @Author: lyj
 * @Date: 2022-08-02 10:55:41
 * @LastEditTime: 2022-08-03 17:33:46
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
const systemParameter = atom({
  key: 'systemParameter',
  default: {}
})
const layoutSettings = atom({
  key: 'layoutSettings',
  default: []
})

export default { layoutColor, layoutData, systemParameter, layoutSettings }
