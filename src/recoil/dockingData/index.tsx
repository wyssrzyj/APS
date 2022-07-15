/*
 * @Author: lyj
 * @Date: 2022-05-19 08:38:27
 * @LastEditTime: 2022-07-15 15:43:27
 * @Description:
 * @LastEditors: lyj
 */
import { atom, selector } from 'recoil'

//工厂列表
const globalFactoryData = atom({
  key: 'globalFactoryData',
  default: []
})
//车间列表
const globalWorkshopList = atom({
  key: 'globalWorkshopList',
  default: []
})
//班组列表
const globalTeamList = atom({
  key: 'globalTeamList',
  default: []
})
//班组树
const globalShiftTreeData = atom({
  key: 'globalShiftTreeData',
  default: []
})
const searchConfigs = atom({
  key: 'searchConfigs',
  default: [
    { name: '裁剪工段', value: '1', id: '1' },
    { name: '缝制工段', value: '2', id: '2' },
    { name: '后整工段', value: '3', id: '3' },
    { name: '包装工段', value: '4', id: '4' },
    { name: '外发工段', value: '5', id: '5' },
    { name: '缝制线外组', value: '6', id: '6' }
    // { name: '回厂加工', value: '20', id: '20' }
  ]
})

// // 同步设置数据
// const setGlobalFactoryData = selector({
//   key: 'setGlobalFactoryData',
//   get: ({ get }) => {
//     const text = get(globalFactoryData)
//     return text
//   }
// })

export default {
  globalFactoryData,
  globalWorkshopList,
  globalTeamList,
  globalShiftTreeData,
  searchConfigs
}
