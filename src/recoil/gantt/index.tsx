/*
 * @Author: lyj
 * @Date: 2022-03-02 15:41:46
 * @LastEditTime: 2022-06-10 15:39:20
 * @Description:
 * @LastEditors: lyj
 */

import { atom, selector } from 'recoil'

const ganttId = atom({
  key: 'ganttId', //id，必须唯一
  default: { id: '' } //初始值
})
//暴露出去
export default {
  ganttId
}
