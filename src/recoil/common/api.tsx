import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'

type Params = {
  [key: string]: any
}

export const getInfo = async (params: Params) => {
  try {
    const res: ResponseProps = await axios.get(`/api/user`, params)
    console.log('🚀 ~ file: api.tsx ~ line 15 ~ getInfo ~ res', res)
    if (res && res.code === 200) {
      message.success(res.msg)
      return res.data
    }
  } catch (e) {
    console.log(e)
  }
}
