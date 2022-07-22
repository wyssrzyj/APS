/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-05-07 08:56:53
 * @LastEditors: lyj
 * @LastEditTime: 2022-07-22 09:56:35
 * @FilePath: \jack-aps\src\recoil\systemParameters\api.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'

//生产周期报表
export const periodicReportList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/report/list-producePeriod`,
      params
    )
    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res.data || []
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
//生产周期计划报表

export const planningReport = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/report/list-plan-producePeriod`,
      params
    )
    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res.data || []
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
//生产周期报表
export const periodicReportListExport = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/report/export-producePeriod`,
      params
    )
    if (res.code !== 200) {
    }
    if (res) {
      return res || []
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
