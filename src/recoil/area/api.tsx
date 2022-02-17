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

    if (res.code === 200) {
      message.success('操作成功')
    }
  } catch (e) {
    console.log(e)
  }
}

export const getAreaEquipment = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/api/dmp/lms-area/find-by-area`,
      params
    )

    return res.data || []
  } catch (e) {
    console.log(e)
  }
}

export const moveEquipment = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/api/dmp/lms-area/correlation-device`,
      params
    )
    if (res.data) {
      message.success('操作成功')
    }

    return res.data
  } catch (e) {
    console.log(e)
    message.error('操作失败')
  }
}

export const delEquipment = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/api/dmp/lms-area/delete-device`,
      params
    )
    if (res.data) {
      message.success('操作成功')
    }

    return res.data
  } catch (e) {
    console.log(e)
    message.error('操作失败')
  }
}

export const getUnbindEquipment = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/api/dmp/lms-area/get-device-exits-area`,
      params
    )

    if (res) {
      return res.data || []
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
