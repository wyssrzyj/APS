import axios from 'axios'

import { getRefresh, getToken } from '../tool'
// 参数过滤函数
type O = {
  [key: string]: any
}

const toType = (obj: any) => {
  return ({} as any).toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

export const filterNull = (o: O) => {
  for (const k in o) {
    if (o[k] === null || o[k] === undefined) {
      delete o[k]
    }
    o[k] = toType(o[k]) === 'string' ? o[k].trim() : o[k]
    o[k] = ['object', 'array'].includes(toType(o[k])) ? filterNull(o[k]) : o[k]
  }
  return o
}

// 是否正在刷新的标记
export let isRefreshing = false
//重试队列
export let requests: any[] = []

// 发布订阅  执行请求池中的接口
export function onAccessTokenFetched() {
  requests.forEach((callback: any) => {
    callback && callback()
  })
  requests = []
}
// 发布订阅  将未完成的接口放入请求池
export function addSubscriber(callback: any) {
  requests.push(callback)
}

export let rToken = ''

// refresh axios
export const refreshAxios = axios.create({
  // headers: {
  //   authorization: getToken(),
  //   refresh_token: getRefresh()
  // }
})

refreshAxios.interceptors.request.use(
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

// 刷新token的处理
export const dealRefresh = async () => {
  isRefreshing = true

  const url = `/api/user/account/refresh-token?accessToken=${getToken()}`

  refreshAxios
    .post(url)
    .then((refresData) => {
      rToken = refresData.data.data.access_token // access_token 主token
      const expiresTime = refresData.data.data.expires_in // 过期时间
      // request.headers.authorization = rToken // 设置请求体的token
      // 更新用户信息
      const updateUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      updateUser.expire = expiresTime
      updateUser.access_token = rToken
      localStorage.setItem('token', rToken)
      localStorage.setItem('currentUser', JSON.stringify(updateUser))
      onAccessTokenFetched()
      isRefreshing = false
    })
    .catch((err) => {
      const { response } = err
      const { data } = response
      const { code } = data
      console.log(code, 'code')
      if (+code === 401) {
        // 401 跳登录页
        const { pathname } = location
        pathname !== '/user/login' && location.replace('/user/login')
      }
    })
}
