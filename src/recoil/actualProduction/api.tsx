import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'
// 实绩列表
export const efficiencyList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-reality/list`,
      params
    )

    if (res.code === 200) {
      return res.data || []
    }
  } catch (e) {
    console.log(e)
  }
}
// 导出实绩列表
export const exportEfficiency = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-reality/export-reality`,
      params
    )
    return res
  } catch (e) {
    console.log(e)
  }
}
// 导出实绩列表
export const efficiencyDetailInfo = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/produce-assignment-reality/get`,
      params
    )
    if (res.code === 200) {
      return res.data || []
    }
  } catch (e) {
    console.log(e)
  }
}
