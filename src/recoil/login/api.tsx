import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'

export const logout = async () => {
  try {
    const res: ResponseProps = await axios.post('/api/user/account/logout')
    if (res.code === 200) {
      localStorage.setItem('token', '')
      localStorage.setItem('refresh', '')
      localStorage.setItem('currentUser', JSON.stringify({}))
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
      localStorage.setItem('token', '')
      localStorage.setItem('refresh', '')
      localStorage.setItem('currentUser', JSON.stringify({}))
      return true
    }
  }
}

export const login = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      '/api/user/account/login',
      params
    )
    const { data = {} } = res
    if (data) {
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('refresh', data.refresh_token)
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
