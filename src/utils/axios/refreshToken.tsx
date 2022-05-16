/*
 * @Author: zjr
 * @Date: 2022-04-07 11:22:20
 * @LastEditTime: 2022-05-13 18:10:33
 * @Description:
 * @LastEditors: zjr
 */
import axios, { Method } from 'axios'

import { getRefresh, getToken } from '../tool'
import { ResponseProps } from './types'

axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

const refreshToken = async () => {
  const instanceParams = {
    method: 'POST' as Method,
    url: `/api/user/account/refresh-token?accessToken=${getToken()}`,
    withCredentials: true,
    headers: {
      common: {
        Authorization: getToken(),
        refresh_token: getRefresh()
      }
    }
  }

  try {
    const responseData: ResponseProps = await axios(instanceParams as any)
    if (responseData.code === 200) {
      return responseData
    } else {
      return Promise.reject(responseData)
    }
  } catch (error) {
    console.log(error)
  }
}

export default refreshToken
