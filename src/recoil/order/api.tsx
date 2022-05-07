/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-05-07 08:56:53
 * @LastEditors: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @LastEditTime: 2022-05-07 10:38:30
 * @FilePath: \jack-aps\src\recoil\systemParameters\api.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'
//生产单视图
export const productionSingleView = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/schedule-view/get-order-view`,
      params
    )

    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res || []
    }
  } catch (e) {
    console.log(e)
  }
} // getTeamView
export const getLine = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/produce-assignment-detail/get-line`,
      params
    )

    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res || []
    }
  } catch (e) {
    console.log(e)
  }
}
