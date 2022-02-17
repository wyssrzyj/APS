import * as OSS from 'ali-oss'

const client = new OSS({
  accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
  accessKeySecret: import.meta.env.VITE_ACCESS_KEY_SECRET,
  regoin: 'oss-cn-hangzhou',
  endpoint: 'oss-cn-hangzhou.aliyuncs.com',
  bucket: 'capacity-platform',
  timeout: 600000
} as any)

export default client
