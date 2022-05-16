/*
 * @Author: zjr
 * @Date: 2022-04-07 11:22:20
 * @LastEditTime: 2022-05-16 09:48:27
 * @Description:
 * @LastEditors: zjr
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'

export const logout = async () => {
  try {
    const res: ResponseProps = await axios.post('/aps/sys/user/logout')
    if (res.code === 200) {
      localStorage.removeItem('token')
      localStorage.removeItem('systemUuid')
      localStorage.removeItem('currentUser')
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
      localStorage.removeItem('token')
      // localStorage.removeItem('refresh')
      localStorage.removeItem('currentUser')
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
    console.log('🚀 ~ file: loginStore.tsx ~ line 97 ~ LoginStore ~ res', res)

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
