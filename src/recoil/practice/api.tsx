import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'
const dealData = (data = []) => {
  data.forEach((item: any) => {
    item.title = item.name
    item.label = item.name
    item.value = item.id
    item.key = item.id
    if (Array.isArray(item.children)) {
      item.children = dealData(item.children)
    }
  })

  return data
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
export const getArea = async () => {
  try {
    const res: ResponseProps = (await axios.get(`/api/dmp/lms-area/tree`)) || {}

    if (res.code === 200) {
      res.data = res.data || []
      return dealData(res.data)
    }
  } catch (e) {
    console.log(e)
  }
}

export const delArea = async (id: any) => {
  try {
    const res: ResponseProps =
      (await axios.delete(`/api/dmp/lms-area/delete`, {
        id
      })) || {}
    if (res.code !== 200) {
      message.error(res.msg)
    }

    if (res.code === 200) {
      message.success('操作成功')
    }
  } catch (e) {
    console.log(e)
  }
}

// 生产单规则排程
export const rulesScheduling = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/product-order/product-order-rule-schedule`,
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

// 发布排程
export const releaseSchedule = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail/check-schedule`,
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

//导出缺料报告
export const detailsSewingPlan = async (params: any) => {
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

// getTeamView
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
