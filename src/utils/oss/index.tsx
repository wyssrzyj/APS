import * as OSS from 'ali-oss'

const VITE_ACCESS_KEY_ID =
  import.meta && import.meta.env
    ? import.meta.env.VITE_ACCESS_KEY_ID
    : process.env.VITE_ACCESS_KEY_ID

const VITE_ACCESS_KEY_SECRET =
  import.meta && import.meta.env
    ? import.meta.env.VITE_ACCESS_KEY_SECRET
    : process.env.VITE_ACCESS_KEY_SECRET

console.log(process.env.VITE_ACCESS_KEY_ID, 'process.env.VITE_ACCESS_KEY_ID')
console.log(
  process.env.VITE_ACCESS_KEY_SECRET,
  'process.env.VITE_ACCESS_KEY_SECRET'
)

const client = new OSS({
  accessKeyId: process.env.VITE_ACCESS_KEY_ID,
  accessKeySecret: process.env.VITE_ACCESS_KEY_SECRET,
  regoin: 'oss-cn-hangzhou',
  endpoint: 'oss-cn-hangzhou.aliyuncs.com',
  bucket: 'capacity-platform',
  timeout: 600000
} as any)

export default client
