import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'
import { Params } from './types'

// 将类型定义放到types文件中
// 通过@/utils/axios 获取axios实例 并调用 get、post、put、delete操作获取后台接口数据
// 接口返回内容包括 { data, msg, success, code } 等内容

export const getInfo = async (params: Params) => {
  try {
    const res: ResponseProps = await axios.get(`/api/user`, params)
    console.log('🚀 ~ file: api.tsx ~ line 15 ~ getInfo ~ res', res)
    if (res && res.code === 200) {
      message.success(res.msg)
      return res.data
    }
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
// 工段列表
export const getWorkshopSectionList = async () => {
  try {
    const res: ResponseProps = await axios.get(`/aps/mes/get-section-list`)
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
