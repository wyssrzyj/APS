import { atom, selector } from 'recoil'

const lyj = atom({
  key: 'lyj', //id，必须唯一
  default: '空值测试全局' //初始值
})
//暴露出去
export default {
  lyj
}
