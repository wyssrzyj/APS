import { message } from 'antd'
import axios, { Canceler, Method } from 'axios'

import { getCurrentUser, getRefresh, getToken } from '../tool'
import {
  addSubscriber,
  dealRefresh,
  filterNull,
  isRefreshing
} from './filterNull'
import { dFn, Params } from './types'

const customAxios = axios.create({})

const CancelToken = axios.CancelToken
const cancels: Canceler[] = []

customAxios.interceptors.request.use(
  async function (request: any) {
    const aToken = getToken()
    const rToken = getRefresh()
    // 更新token
    request.headers.authorization = aToken
    request.headers.refresh_token = rToken
    return request
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截 处理token是否过期
customAxios.interceptors.response.use(
  (response) => {
    const { data, config } = response
    const { code } = data
    const { expire } = getCurrentUser()
    const flag = expire - Date.now() < 1000
    const noTokenList = ['/user/login']
    const pathFlag = !noTokenList.includes(location.pathname)

    if (pathFlag && (flag || code === 40101)) {
      if (!isRefreshing) {
        dealRefresh()
      }
      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber(() => {
          resolve(customAxios(config))
        })
      })
      return retryOriginalRequest
    }
    if (location.pathname !== '/user/login' && code === 401) {
      // token失效
      location.replace('/user/login')
    }
    return response.data
  },
  (error) => {
    const { response } = error
    const { status, data } = response
    if (
      location.pathname !== '/user/login' &&
      (status === 401 || +data.code === 401)
    ) {
      // token失效
      location.replace('/user/login')
    }
    return Promise.reject(error)
  }
)

const apiAxios = async (
  method: Method | undefined,
  url: string,
  params: Params = {},
  success?: dFn,
  failure?: dFn
) => {
  params = filterNull(params)
  const noTokenList = [
    '/api/sms/send-code',
    '/api/user/register',
    '/api/user/getUserByMobilePhone',
    '/api/user/login'
  ]
  const instanceParams = {
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    // baseURL: root,
    withCredentials: true,
    headers: {
      common: {
        // authorization: getToken(),
        // refresh_token: getRefresh()
      }
    },
    cancelToken: new CancelToken(function executor(c) {
      // executor 函数接收一个 cancel 函数作为参数
      cancels.push(c)
    })
  }

  const flag = noTokenList.some((i) => url.includes(i))
  if (flag) {
    // 不需要携带token的接口  去除 token
    // delete instanceParams.headers.common.authorization
    // delete instanceParams.headers.common.refresh_token
  }
  try {
    const responseData: any = await customAxios(instanceParams as any)
    // 接口状态码处理
    if ([200, 400].includes(responseData.code)) {
      success && success()
      return responseData
    } else {
      failure && failure()
      responseData.code !== 40101 &&
        responseData.msg &&
        message.error(responseData.msg)
      // responseData.code === 40101 && location.replace('/user/login')
      return Promise.reject(responseData)
    }
  } catch (error) {
    failure && failure()
    const { response } = error as any
    const { data } = response
    const { msg, message: tips } = data
    if (msg || tips) {
      message.error(msg || tips)
    }
  }
}

export default {
  get: function (
    url: string,
    params?: any,
    success?: () => void,
    failure?: () => void
  ) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (
    url: any,
    params?: Params | undefined,
    success?: dFn | undefined,
    failure?: dFn | undefined
  ) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (
    url: any,
    params?: Params | undefined,
    success?: dFn | undefined,
    failure?: dFn | undefined
  ) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (
    url: any,
    params?: Params | undefined,
    success?: dFn | undefined,
    failure?: dFn | undefined
  ) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  cancels // 切换路由之前 遍历cancels 执行方法 取消之前的请求
}
