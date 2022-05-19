/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-05-07 08:56:53
 * @LastEditors: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @LastEditTime: 2022-05-07 10:00:35
 * @FilePath: \jack-aps\src\recoil\systemParameters\api.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'
//班组负荷图
export const teamLoadDiagram = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/schedule-view/get-load-view`,
      params
    )
    if (res) {
      return res
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
