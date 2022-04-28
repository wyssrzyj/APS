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
// 工序外发 - 显示
export const processOutsourcing = async (params: any) => {
  try {
    const res: ResponseProps =
      (await axios.get(`/aps/outsource/out-process-get`, params)) || {}

    if (res.code === 200) {
      return res.data
    }
  } catch (e) {
    console.log(e)
  }
}

// 整单外发-显示
export const wholeOrder = async (params: any) => {
  try {
    const res: ResponseProps =
      (await axios.get(`/aps/outsource/get`, params)) || {}

    if (res.code === 200) {
      return res.data
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
//工序和外发-保存
export const popupPreservation = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/outsource/out-and-process-save`,
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
//整单外发-保存或者更新
export const outboundSave = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/outsource/save-update`,
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
    const res: ResponseProps = await axios.get(`/aps/system_config/get`, {})

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

// 系统参数 - 显示
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
// 获取尺寸
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

// 生产单-列表
export const productionList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/product-order/list`,
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

// 工序-列表
export const workingProcedure = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(`/aps/process/list`, params)
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
}
//生产  getTeamView
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
    const res: ResponseProps = await axios.get(
      `/aps/produce-assignment/get-non-work-time`,
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
// 生产单规则排程
export const rulesScheduling = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/product-order/product-order-rule-schedule`,
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
      return res.data || []
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
// 发布排程
export const releaseSchedule = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail/check-schedule`,
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
// 效率模板
export const efficiencyList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/capacity-efficiency-manage/list-fuzzy-by-page`,
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
// 单条效率信息
export const efficiencyInfo = async (params: any) => {
  try {
    const res: ResponseProps = await axios.get(
      `/aps/capacity-efficiency-manage/get`,
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
// 更新或新增产能效率
export const updateEfficiencyInfo = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/capacity-efficiency-manage/save-or-update`,
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
// 更新或新增产能效率
export const deleteEfficiencyInfo = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/capacity-efficiency-manage/delete`,
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

// 班组信息
export const teamList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/mes/get-team-manager-list`,
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
// 生产计划列表
export const productList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail-pulished/page-detail-pulished`,
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
// 导出生产计划
export const exportProductList = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail-pulished/export-produce-assignment-info`,
      params
    )
    return res
  } catch (e) {
    return e
  }
}
// 生产计划详情
export const productDetail = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/produce-assignment-detail-pulished/get`,
      params
    )
    if (res.code !== 200) {
      message.error(res.msg)
    }
    if (res) {
      return res.data || null
    }
    return []
  } catch (e) {
    console.log(e)
  }
}
// 工段
export const getWorkshopSectionList = async () => {
  try {
    const res: ResponseProps = await axios.get(`/aps/mes/get-section-list`)
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
//生产单-列表
export const materialListApi = async (params: any) => {
  try {
    const res: ResponseProps = await axios.post(
      `/aps/product-order/list`,
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
}
// 车缝工段拆分保存
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
