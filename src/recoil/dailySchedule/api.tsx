/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-05-07 08:56:53
 * @LastEditors: lyj
 * @LastEditTime: 2022-06-30 15:39:57
 * @FilePath: \jack-aps\src\recoil\systemParameters\api.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'

// 加班时间详情 - 新增或者更新
export const overtimeAddition = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/extra-work-save-update`,
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
export const updateDailyScheduleList = async (props) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/daily-schedule/update-daily-schedule-list`,
      props
    )
    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res || []
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
// 班组信息
export const teamList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/mes/get-team-manager-list`,
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
// 断当前班组是否有重复的排班,请传班组id
export const teamId = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/time-overlap`,
      params
    )
    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res || []
    }
    return []
  } catch (e) {
    console.log(e)
  }
}

export const pageList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/daily-schedule/page-list`,
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
