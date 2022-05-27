/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-05-07 08:56:53
 * @LastEditors: zjr
 * @LastEditTime: 2022-05-26 14:29:50
 * @FilePath: \jack-aps\src\recoil\systemParameters\api.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'

// 效率模板
export const efficiencyList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/capacity-efficiency-manage/list-fuzzy-by-page`,
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
// 单条效率信息
export const efficiencyInfo = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/capacity-efficiency-manage/get`,
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
// 更新或新增产能效率
export const updateEfficiencyInfo = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/capacity-efficiency-manage/save-or-update`,
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
// 删除产能效率
export const deleteEfficiencyInfo = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/capacity-efficiency-manage/delete`,
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
// 导出模板
export const exportTemplate = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/capacity-efficiency-manage/export-template`,
      params
    )
    return res
  } catch (e) {
    message.error('操作失败，请稍后重试')
  }
}
