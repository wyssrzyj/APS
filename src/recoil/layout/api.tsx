/*
 * @Author: lyj
 * @Date: 2022-03-02 15:41:46
 * @LastEditTime: 2022-07-20 08:22:25
 * @Description:
 * @LastEditors: lyj
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'

export const departmentLists = async () => {
  try {
    const res: ResponseProps = await axios.get(
      `/api/basic/department/department-tree`
    )
    const roles = res.data
    if (res.fail) {
      message.success('获取失败')
    }
    return roles
  } catch (e) {
    return e
  }
}

export const userInfoLists = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post('/api/basic/staff/list', params)
    return res
  } catch (e) {
    return e
  }
}

export const moreOperation = async (staffId: string) => {
  try {
    const res: ResponseProps = await axios.delete('/api/basic/staff/delete', {
      staffId
    })
    return res
  } catch (e) {
    return e
  }
}

export const operationUser = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post('/api/basic/staff/save', params)
    return res
  } catch (e) {
    return e
  }
}
export const newAlertMessage = async () => {
  try {
    const res: ResponseProps = await axios.post(
      '/aps/waring-order/new-waring-list'
    )
    return res
  } catch (e) {
    return e
  }
}
export const closePrompt = async (params) => {
  try {
    const res: ResponseProps = await axios.post(
      '/aps/waring-order/close-tips',
      params
    )
    return res
  } catch (e) {
    return e
  }
}
