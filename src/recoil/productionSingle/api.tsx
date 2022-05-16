/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-05-07 08:56:53
 * @LastEditors: zjr
 * @LastEditTime: 2022-05-13 18:34:24
 * @FilePath: \jack-aps\src\recoil\systemParameters\api.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'
// 生产单-列表
export const productionList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/product-order/list`,
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
// 工序外发 - 显示
export const processOutsourcing = async (params: any) => {
  try {
    const res: ResponseProps =
      (await axios.get(`/aps/outsource/out-process-get`, params)) || {}

    if (res.code === 200) {
      return res.data
    }
  } catch (e) {
    console.log(e)
  }
}
// 整单外发-显示
export const wholeOrder = async (params: any) => {
  try {
    const res: ResponseProps =
      (await axios.get(`/aps/outsource/get`, params)) || {}

    if (res.code === 200) {
      return res.data
    }
  } catch (e) {
    console.log(e)
  }
}
//整单外发-保存或者更新
export const outboundSave = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/outsource/save-update`,
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
//工序和外发-保存
export const popupPreservation = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/outsource/out-and-process-save`,
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
// 工序-列表
export const workingProcedure = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(`/aps/process/list`, params)
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
// 生产单-列表
export const productionDelayList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/product-order/list-delay`,
      params
    )
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
// 生产单-列表
export const productionChangeList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/product-order/list-change`,
      params
    )
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
