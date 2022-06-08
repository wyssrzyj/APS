/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-05-07 08:56:53
 * @LastEditors: lyj
 * @LastEditTime: 2022-06-02 14:42:06
 * @FilePath: \jack-aps\src\recoil\systemParameters\api.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'

export const workingModes = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/work-mode-list`,
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
export const listModesDelete = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/work-mode-delete`,
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
export const operatingModeDetails = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/work-mode-save-update`,
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

export const operatingModeDetailsData = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/work-mode-get`,
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
//工厂列表
export const factoryList = async () => {
  try {
    const res: ResponseProps = await axios.get(`/aps/mes/get-factory-list`)
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
// 系统参数 - 显示
export const systemParameter = async () => {
  try {
    const res: ResponseProps = await axios.get(`/aps/system_config/get`, {})

    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res.data || []
    }
  } catch (e) {
    console.log(e)
  }
}
