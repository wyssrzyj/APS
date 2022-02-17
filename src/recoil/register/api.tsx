import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'
import { RegisterParams } from './types'

export const sendVerifyCode = async (mobile: string | number) => {
  try {
    const res: ResponseProps = await axios.get(`/api/sms/send-code/${mobile}`)
    return res
  } catch (err: any) {
    const { response } = err
    const { code } = response
    console.log('🚀', code)
  }
}

export const checkUser = async (queryParam: any, queryType: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/api/user/getUserByMobilePhone/${queryParam}/${queryType}`
    )

    return res.data
  } catch (e) {
    console.log(e)
  }
}

export const register = async (params: RegisterParams) => {
  try {
    const res: ResponseProps = await axios.post(
      `/api/user/account/register`,
      params
    )
    if (res.code === 200) {
      message.success('注册成功~')
    }
    return res
  } catch (e) {
    console.log(e, '------')
    // message.error()
  }
}
