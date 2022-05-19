/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-05-07 08:56:53
 * @LastEditors: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @LastEditTime: 2022-05-09 10:23:51
 * @FilePath: \jack-aps\src\recoil\systemParameters\api.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'
export const productionList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/check-product/list`,
      params
    )
    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res.data || []
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
//工厂列表
export const factoryList = async () => {
  try {
    const res: ResponseProps = await axios.get(`/aps/mes/get-factory-list`)
    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res || []
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
//导出齐套检查报告
export const completeInspectionReport = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/check-product/export-check-report`,
      params
    )
    if (res) {
      return res
    }
    return []
  } catch (e) {
    console.log(e)
  }
}

//导出缺料报告
export const exportShortageReport = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/check-product/export-short-report`,
      params
    )
    if (res) {
      return res
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
// 系统参数 - 历史
export const checked = async (props: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/check-product/get-history`,
      props
    )

    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res.data || []
    }
  } catch (e) {
    console.log(e)
  }
}
//保存/更新齐套检查
export const materialSaved = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/check-product/save`,
      params
    )
    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res.data || []
    }
    return []
  } catch (e) {
    console.log(e)
  }
} // 系统参数 - 显示
export const materialData = async (props: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/check-product/get-change`,
      props
    )

    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res.data || []
    }
  } catch (e) {
    console.log(e)
  }
} // 获取尺寸
export const getTheSize = async (props: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/check-product/get-size`,
      props
    )

    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res.data || []
    }
  } catch (e) {
    console.log(e)
  }
}
