/*
 * @Author: lyj
 * @Date: 2022-08-02 10:55:41
 * @LastEditTime: 2022-08-02 15:34:43
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

export default { layoutColor, layoutData }
