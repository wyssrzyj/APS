import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'

export const updateArea = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/api/dmp/lms-area/save`,
      params
    )
    if (res.code === 200) {
      message.success(res.msg)
      return res.data
    }
  } catch (e) {
    console.log(e)
  }
}

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
      return res.data || []
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
//车间列表
export const workshopList = async (props: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/mes/get-shop-manager-list`,
      props
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
//班组列表
export const teamList = async (props: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/mes/get-team-manager-list`,
      props
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

export const sectionLists = async () => {
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
//班组树
export const shiftTree = async () => {
  try {
    const res: ResponseProps = await axios.get(`/aps/mes/get-team-manager-tree`)
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
//产能列表
export const capacityList = async () => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/mes/get-capacity-efficiency-list`
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
//产能列表-id
export const capacityListID = async (props: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/mes/get-capacity-efficiency-list-by-id`,
      props
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
