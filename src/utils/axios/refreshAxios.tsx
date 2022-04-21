import axios from 'axios'

import { getRefresh, getToken } from '../tool'

const rToken = ''

const refreshAxios = axios.create({
  headers: {
    authorization: getToken(),
    refresh_token: getRefresh()
  }
} as any)

// export const dealRefresh = async request => {
//   try {
//     const url = `/api/user/account/refresh-token?accessToken=${getToken()}`
//     const refresData = await refreshAxios.post(url)
//     rToken = refresData.data.data.access_token // access_token 主token
//     const expiresTime = refresData.data.data.expires_in // 过期时间
//     request.headers.authorization = rToken // 设置请求体的token
//     // 更新用户信息
//     const updateUser = JSON.parse(localStorage.getItem('currentUser'))
//     updateUser.expire = expiresTime
//     updateUser.access_token = rToken
//     localStorage.setItem('token', rToken)
//     localStorage.setItem('currentUser', JSON.stringify(updateUser))
//   } catch (err) {
//     const { response } = err
//     const { status } = response
//     if (status === 401) {
//       // 401 跳登录页
//       location.replace('/user/login')
//     }
//   }
// }

// export const dealRefresh = async (fn: () => any) => {
//   try {
//     const url = `/api/user/account/refresh-token?accessToken=${getToken()}`
//     const refresData = await refreshAxios.post(url)
//     rToken = refresData.data.data.access_token // access_token 主token
//     const expiresTime = refresData.data.data.expires_in // 过期时间
//     // request.headers.authorization = rToken // 设置请求体的token
//     // 更新用户信息
//     const updateUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
//     updateUser.expire = expiresTime
//     updateUser.access_token = rToken
//     localStorage.setItem('token', rToken)
//     localStorage.setItem('currentUser', JSON.stringify(updateUser))
//     fn && fn()
//   } catch (err) {
//     const { response } = err as any
//     const { status } = response
//     if (status === 401) {
//       // 401 跳登录页
//       location.replace('/user/login')
//     }
//   }
// }
