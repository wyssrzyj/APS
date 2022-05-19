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
  globalShiftTreeData
}
