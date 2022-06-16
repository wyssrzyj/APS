/*
 * @Author: zjr
 * @Date: 2022-04-07 11:22:20
 * @LastEditTime: 2022-06-16 15:21:49
 * @Description:
 * @LastEditors: lyj
 */
import { message } from 'antd'

import axios from '@/utils/axios'
import { clearLocalStorage } from '@/utils/tool'

import { ResponseProps } from '../types'
export const logout = async () => {
  try {
    const res: ResponseProps = await axios.post('/aps/sys/user/logout')
    if (res.code === 200) {
      clearLocalStorage()
    }
    if (res && res.code !== 200) {
      message.error(res.msg)
    } else {
      message.success('退出成功')
    }

    return res.success
  } catch (e: any) {
    console.log(e) // message.error('')
    if (e.code === 40101 || e.code === 401) {
      message.success('退出成功')
      clearLocalStorage()
      return true
    }
  }
}

export const login = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post('/aps/sys/user/login', params)
    const { data = {} } = res

    if (data) {
      localStorage.setItem('token', JSON.stringify(data.token))
      // localStorage.setItem('refresh', data.refresh_token)
      localStorage.setItem('currentUser', JSON.stringify(data))
    }
    if (res.code !== 200) {
      message.error(res.msg)
    }
    return res
  } catch (e) {
    console.log(e)
  }
}

export const resetPwd = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/api/user/forget-password`,
      params
    )
    if (res.code === 200) {
      message.success(res.msg)
    }
    if (res.code !== 200) {
      message.error(res.msg)
    }
    return res.data
  } catch (e) {
    console.log(e)
  }
}

// 用户ID登录
export const signID = async (params: any) => {
  const res: ResponseProps = await axios.post(
    '/aps/sys/user/login-by-id',
    params
  )
  const { data = {} } = res
  if (data) {
    localStorage.setItem('token', JSON.stringify(data.token))
    localStorage.setItem('currentUser', JSON.stringify(data))
  }
  if (res.code !== 200) {
    message.error(res.msg)
  }
  return res
}
