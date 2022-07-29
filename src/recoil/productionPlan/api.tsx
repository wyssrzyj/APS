/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-05-07 08:56:53
 * @LastEditors: lyj
 * @LastEditTime: 2022-07-28 15:43:06
 * @FilePath: \jack-aps\src\recoil\systemParameters\api.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'

// 生产计划列表
export const productList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail-pulished/page-detail-pulished`,
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
//取sku
export const getSKU = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/mes/get-produce-sku-list`,
      params
    )
    if (res) {
      return res.data
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
// 获取生产单sku
export const getProductionOrderSKU = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/produce-assignment/get-sku`,
      params
    )
    if (res) {
      return res.data
    }
    return []
  } catch (e) {
    console.log(e)
  }
}

//新增或更新缝制计划
export const updateSewingPlan = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail-pulished/add-sewing-task`,
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

// 生成车间任务

export const generateWorkshopTask = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment/create-mes-task`,
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

//缝制计划详情
export const detailsSewing = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/produce-assignment-detail-pulished/sewing-task-info`,
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
// 导出生产计划
export const exportProductList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail-pulished/export-produce-assignment-info`,
      params
    )
    return res
  } catch (e) {
    return e
  }
}
// 生产计划详情
export const productDetail = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/produce-assignment-detail-pulished/get`,
      params
    )
    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res.data || null
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
} // 工段
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

//检查是否生成过缝制计划
export const makeSewingPlan = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail-pulished/is_sewing_task`,
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
