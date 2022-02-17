import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'

export const getDepartmentTree = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/api/basic/department/department-tree`,
      params
    )
    if (res.fail) {
      message.success('获取失败')
    }
    return res.data
  } catch (e) {
    return e
  }
}

export const queryDepartment = async (deptId: any) => {
  try {
    const res: ResponseProps = await axios.delete(
      `/api/basic/department/delete`,
      { deptId }
    )
    if (res.code !== 200) {
      message.success('获取失败')
    }
    return res.data
  } catch (e) {
    return e
  }
}

export const delDepartment = async (params: any) => {
  try {
    const res: ResponseProps = await axios.delete(
      `/api/admin/sys-department/manage-department-delete`,
      params
    )
    if (res.code !== 200) {
      message.success('获取失败')
    }
    return res.data
  } catch (e) {
    return e
  }
}

export const editDepartment = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/api/basic/department/save`,
      params
    )
    if (res.code !== 200) {
      message.error(res.msg)
    }
    return res.data
  } catch (e) {
    return e
  }
}

export const getUsers = async () => {
  try {
    const res: ResponseProps = await axios.post(`/api/basic/staff/list`)
    if (res.code !== 200) {
      message.success('获取失败')
    }
    return res.data
  } catch (e) {
    return e
  }
}

export const getDepartmentDetail = async (id: any) => {
  try {
    const res: ResponseProps = await axios.get(`/api/basic/department/get`, {
      id
    })
    if (res.fail) {
      message.success('获取失败')
    }
    return res.data
  } catch (e) {
    return e
  }
}
