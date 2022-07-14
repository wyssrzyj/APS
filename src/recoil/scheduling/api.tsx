/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-05-07 08:56:53
 * @LastEditors: lyj
 * @LastEditTime: 2022-07-14 13:42:16
 * @FilePath: \jack-aps\src\recoil\systemParameters\api.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'
//班组  getTeamView
export const figureData = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/produce-assignment/get-team-view`,
      params
    )

    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res || []
    }
  } catch (e) {
    console.log(e)
  }
} //甘特图
export const productionView = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/produce-assignment/get-order-view`,
      params
    )

    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res || []
    }
  } catch (e) {
    console.log(e)
  }
}
//获取单个明细
export const getIndividualDetails = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/produce-assignment-detail/get-detail-by-id`,
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
//编辑任务
export const editingTasks = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail/update`,
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

//获取甘特图不可工作日期
export const workingDate = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment/get-team-non-work-tiem`,
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

// getTeamView
export const getLine = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/produce-assignment-detail/get-line`,
      params
    )

    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res || []
    }
  } catch (e) {
    console.log(e)
  }
}

//移动后计算结束时间
export const calculateEndTimeAfterMove = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment/update-detail-time`,
      params
    )
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
// 校验排程
export const checkSchedule = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail/check-schedule`,
      params
    )
    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res.data || {}
    }
    return {}
  } catch (e) {
    message.warning('数据获取失败，请稍后重试')
    console.log(e)
  }
}
//待计划、已计划、全部生产单列表
export const listProductionOrders = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment/list`,
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

//锁定工作/解锁工作
export const unlockWork = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail/change-locked-status`,
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
//解除分派任务
export const releaseFromAssignment = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail/cancel-assignment`,
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
//获取单个明细
export const forDetail = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      ` /aps/produce-assignment-detail/get-detail-by-id`,
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
//拆分查询
export const breakQuery = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/produce-assignment/get-detail-by-assignment`,
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
} // 车缝工段拆分保存
export const splitMethod = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail/split-assignment`,
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
//保存明细
export const saveDetails = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail/save-detail`,
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
//计算完成时间
export const calculateCompletionTime = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail/finish-time`,
      params
    )
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

//保存发布生产单和历史记录
export const releaseSchedule = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail/save-detail-pulished`,
      params
    )
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
//产能列表-id
export const capacityListID = async (props: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/mes/get-capacity-efficiency-list-by-id`,
      props
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
// 工段拆分查询
export const getSkuTree = async (props: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/produce-assignment/get-sku-tree`,
      props
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
