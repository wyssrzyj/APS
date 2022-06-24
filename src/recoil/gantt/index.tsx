/*
 * @Author: lyj
 * @Date: 2022-03-02 15:41:46
 * @LastEditTime: 2022-06-24 11:04:35
 * @Description:
 * @LastEditors: lyj
 */

import { atom, selector } from 'recoil'

const ganttId = atom({
  key: 'ganttId', //id，必须唯一
  default: { id: '' } //初始值
})
const saveAlgorithm = atom({
  key: 'saveAlgorithm', // unique ID (with respect to other atoms/selectors)
  default: [{ name: '666' }] // default value (aka initial value)
})

// 对比保存
//暴露出去
export default {
  ganttId,
  saveAlgorithm
}
