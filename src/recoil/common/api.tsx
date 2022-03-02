import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'
import { Params } from './types'

// 将类型定义放到types文件中
// 通过@/utils/axios 获取axios实例 并调用 get、post、put、delete操作获取后台接口数据
// 接口返回内容包括 { data, msg, success, code } 等内容

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
