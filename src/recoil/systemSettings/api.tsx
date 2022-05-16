/*
 * @Author: zjr
 * @Date: 2022-05-13 09:04:06
 * @LastEditTime: 2022-05-16 09:40:35
 * @Description:
 * @LastEditors: zjr
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'

export const userList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(`/aps/sys-user/list`, params)

    if (res.code === 200) {
      return res.data || []
    }
  } catch (e) {
    console.log(e)
  }
}

export const userInfo = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(`/aps/sys-user/get`, params)
    return res
  } catch (e) {
    console.log(e)
  }
}

export const editUserInfo = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/sys-user/revise-password`,
      params
    )
    return res
  } catch (e) {
    console.log(e)
  }
}

export const saveUserInfo = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/sys-user/save-user-info`,
      params
    )
    return res
  } catch (e) {
    console.log(e)
  }
}

export const validatePassword = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/sys-user/verify-system-password`,
      params
    )
    return res
  } catch (e) {
    console.log(e)
    message.warning('服务器错误，请稍后重试')
  }
}
export const resetPassword = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/sys-user/reset-password`,
      params
    )
    return res
  } catch (e) {
    console.log(e)
  }
}

export const deleteUserInfo = async (params: any) => {
  try {
    const res: ResponseProps = await axios.delete(
      `/aps/sys-user/delete`,
      params
    )
    return res
  } catch (e) {
    console.log(e)
  }
}
