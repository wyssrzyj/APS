import { message } from 'antd'

import axios from '@/utils/axios'

import { ResponseProps } from '../types'
const dealData = (data = []) => {
  data.forEach((item: any) => {
    item.title = item.name
    item.label = item.name
    item.value = item.id
    item.key = item.id
    if (Array.isArray(item.children)) {
      item.children = dealData(item.children)
    }
  })

  return data
}

export const getArea = async () => {
  try {
    const res: ResponseProps = (await axios.get(`/api/dmp/lms-area/tree`)) || {}

    if (res.code === 200) {
      res.data = res.data || []
      return dealData(res.data)
    }
  } catch (e) {
    console.log(e)
  }
}

export const delArea = async (id: any) => {
  try {
    const res: ResponseProps =
      (await axios.delete(`/api/dmp/lms-area/delete`, {
        id
      })) || {}
    if (res.code !== 200) {
      message.error(res.msg)
    }

    if (res.code === 200) {
      message.success('操作成功')
    }
  } catch (e) {
    console.log(e)
  }
}

export const workingModes = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/work-mode-list`,
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

export const operatingModeDetails = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/work-mode-save-update`,
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
export const listSorkingModesDelete = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/work-mode-delete`,
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

export const operatingModeDetailsData = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/work-mode-get`,
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
//加班时间列表-显示
export const overtimedisplay = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/extra-work-list`,
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
// 加班时间详情 - 新增或者更新
export const overtimeAddition = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/extra-work-save-update`,
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
// 断当前班组是否有重复的排班,请传班组id
export const teamId = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/time-overlap`,
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
// 加班时间列表-删除
export const workOvertimeMov = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/extra-work-delete`,
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
// 加班时间详情-显示
export const overtimeDetails = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/extra-work-get`,
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
// 节假日列表 - 显示
export const holidayList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/holiday-list`,
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
// 节假日详情-新增或者更新
export const holidayAddition = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/holiday-save-update`,
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
// 节假日详情-显示
export const holidayID = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/holiday-get`,
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
// 节假日列表-删除
export const holidayListMov = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/work-calendar/holiday-delete`,
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
// 系统参数 - 显示
export const systemParameter = async () => {
  try {
    const res: ResponseProps = (await axios.get(`/aps/system_config/get`)) || {}

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
// 系统参数-保存
export const systemParameters = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/system_config/save-update`,
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
