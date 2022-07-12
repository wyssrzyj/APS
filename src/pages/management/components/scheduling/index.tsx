import { Button, message, Select } from 'antd'
import { cloneDeep, isEmpty, isError, keys } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { schedulingApis } from '@/recoil/apis'

import Dome from './Dome/index'
import Forms from './forms'
import styles from './index.module.less'
import RuleScheduling from './ruleScheduling/index'
import ToPlan from './toPlan'
import Verification from './verification/index'

function Index() {
  const { Option } = Select

  const [visibleRule, setVisibleRule] = useState(false) //规则排程弹窗
  const [visibleVerify, setVisibleVerify] = useState(false) //校验排程弹窗
  const [remind, setRemind] = useState() //甘特图高亮..
  const [formData, setFormData] = useState<any>() //form数据
  const [gunterType, setGunterType] = useState('1') //班组、订单
  const [gunterData, setGunterData] = useState<any[]>([]) //甘特图数据-班组
  const [notWork, setNotWork] = useState<any[]>([]) //不可工作时间
  const [checkIDs, setCheckIDs] = useState<any[]>([]) //校验id
  const [schedulingIDs, setSchedulingIDs] = useState<any>([]) //规则排程使用的id

  const [promptList, setPromptList] = useState<any[]>([]) //提示数据
  const [time, setTime] = useState<any>({}) //最大时间 最小时间
  const [treeSelection, setTreeSelection] = useState<any>() //树选中
  const [treeUpdate, setTreeUpdate] = useState<any>() //树刷新
  const [publishType, setPublishType] = useState<any>(false) //发布清除树的搜索条件

  const { figureData, productionView, workingDate } = schedulingApis

  //头部form的数据
  const FormData = (e: any) => {
    setFormData(e)
    setCheckIDs([])
    setSchedulingIDs([])
  }

  // 甘特图数据
  useEffect(() => {
    if (formData !== undefined) {
      getChart(formData, gunterType)
    }
    /**
     * type //判断是否可以移动
     * text 名称
     * duration 天数
     * progress 控制完成百分比 范围0-1
     *  color控制颜色
     * start_date 开始时间..
     * end_date 结束时间
     *  render: 'split' 添加同一行 只有儿子用
     * parent ***谁是自己的父亲*** 儿子和父亲用
     */
  }, [formData, gunterType])

  const getChart = async (id: undefined, type: any) => {
    if (type === '0') {
      const chart: any = await figureData({ factoryId: id })
      const arr = cloneDeep(chart.data)
      if (chart.code === 200) {
        dateFormat(arr, type)
      }
    }
    if (type === '1') {
      const chart: any = await productionView({ factoryId: id })
      const arr = cloneDeep(chart.data)
      if (chart.code === 200) {
        dateFormat(arr, type)
      }
    }

    //班组不可工作时间
  }

  //Gantt时间格式
  const dateFormat = (data: any, type: any) => {
    const start = []
    const end = []

    const arr = data.map((item: any, index) => {
      if (item.startDate !== null || item.endDate !== null) {
        start.push(item.startDate)
        end.push(item.endDate)
      }

      if (item.startDate !== null) {
        item.start_date = moment(item.startDate).format('YYYY-MM-DD HH:mm')
      } else {
        if (item.parent !== null && item.isHead === null) {
          item.start_date = '2000-04-01'
        }
      }
      if (item.endDate !== null) {
        item.end_date = moment(item.endDate).format('YYYY-MM-DD HH:mm')
      } else {
        if (item.parent !== null && item.isHead === null) {
          item.end_date = '2000-04-01'
        }
      }
      return item
    })
    const time = {
      startDate: start.sort()[0],
      endDate: end.sort()[start.length - 1]
    }

    setTime(time)

    const cloneArr = cloneDeep(arr)
    setGunterData(cloneArr) //图
  }

  useEffect(() => {
    if (time.startDate !== undefined) {
      unavailableTime()
    }
  }, [time])

  //不可用时间.
  const unavailableTime = async () => {
    const notAvailable = await workingDate(time)
    const sum = keys(notAvailable).map((item) => {
      return { time: notAvailable[item], id: item }
    })
    setNotWork(sum)
  }

  // 图刷新
  const updateMethod = () => {
    getChart(formData, gunterType)
  }

  //判断任务是否分派
  const toggleRuleVisible = (visible: boolean) => {
    if (visible) {
      if (schedulingIDs.length > 0) {
        setVisibleRule(visible)
      } else {
        message.warning('请至少选择一个')
      }
    }
  }

  const validateCheckId = () => {
    let passflag = false
    const arr: any[] = []

    promptList.map((item: { externalProduceOrderNum: any }) => {
      arr.push(item.externalProduceOrderNum)
    })

    //选中里有不满足的就进行提示.  .
    if (Number(arr.length) > 0) {
      message.warning(`生产单${arr.join('、')}任务未分派`)
      passflag = false
    } else {
      if (!isEmpty(checkIDs)) {
        if (arr.length <= 0) {
          passflag = true
        }
      } else {
        message.warning(`暂无已计划数据`)
        passflag = false
      }
      return passflag
    }
  }

  const toggleVerifyVisible = (visible: boolean) => {
    if (visible) {
      if (validateCheckId()) {
        setVisibleVerify(visible)
      }
    } else {
      setVisibleVerify(visible)
    }
  }

  //获取选中项
  const selected = (ids, stateAdd) => {
    if (!isEmpty(ids)) {
      const sum = []
      ids.forEach((item) => {
        sum.push(stateAdd.filter((v) => v.externalProduceOrderId === item))
      })
      return sum.flat(Infinity)
    }

    // return ['1524211836323483650']
  }

  // 校验排程需要的数据
  const checkSchedule = (plannedID: any, toPlanID: any, stateAdd: any) => {
    if (!isError(stateAdd)) {
      //规则排程--------------
      //选中的id和已计划的id---规则排程使用的数据id
      const ruleIds = selected(plannedID, stateAdd)

      if (!isEmpty(ruleIds)) {
        const ids = []
        ruleIds.forEach((item) => {
          ids.push(item.externalProduceOrderId)
        })
        setSchedulingIDs(ids.concat(toPlanID))
      } else {
        setSchedulingIDs(toPlanID)
      }

      //判断选中里是否有不满足的
      const doNotUse = stateAdd.filter(
        (item: { type: boolean }) => item.type === false
      )

      const prompt = plannedID.map((item: any) => {
        return filterPrompt(item, doNotUse)
      })

      setPromptList(prompt.flat(Infinity))

      //可用
      const available = stateAdd.filter(
        (item: { type: boolean }) => item.type === true
      )
      //待计划数据
      const waiting = available
        .map((item: any) => {
          return filterList(plannedID, item)
        })
        .flat(Infinity)
      setCheckIDs(waiting.concat(toPlanID)) //把选中里可用的和已计划传递出去
    }
  }

  const filterList = (data: any[], v: { externalProduceOrderId: any }) => {
    return data.filter((item: any) => item === v.externalProduceOrderId)
  }

  //  提示  选中但是状态为满足
  const filterPrompt = (v: any, data: any[]) => {
    const arr = data.filter(
      (item: { externalProduceOrderId: any }) =>
        item.externalProduceOrderId === v
    )
    return arr
  }

  //甘特图左键
  const setHighlighted = (e: React.SetStateAction<undefined>) => {
    setRemind(e)
  }

  const handleChange = (value: any) => {
    setGunterType(value)
  }

  const update = () => {
    refresh()
    // setSchedulingIDs([]) //清空
  }

  // 树刷新
  const refresh = () => {
    const cloneFormData = cloneDeep(formData)
    setTreeUpdate(cloneFormData)
    setPublishType(true)
  }

  // 树选中
  const treeSelect = (e) => {
    setTreeSelection(e)
  }

  const ruleScheduling = () => {
    setVisibleRule(false)
    toggleRuleVisible(false)
    update()
    updateMethod()
    setPublishType(false)
  }

  return (
    <div className={styles.qualification}>
      <>
        <div className={styles.content}>
          <Forms FormData={FormData}></Forms>

          <div className={styles.team}>
            <div className={styles.leftContent}>
              <ToPlan
                publishType={publishType}
                treeUpdate={treeUpdate}
                treeSelect={treeSelect}
                checkSchedule={checkSchedule}
                updateMethod={updateMethod}
                gunterType={gunterType}
                formData={formData}
                remind={remind}
              />
              <div className={styles.schedule}>
                <Button
                  className={styles.rules}
                  ghost
                  type="primary"
                  onClick={() => toggleRuleVisible(true)}
                >
                  规则排程
                </Button>
                <Button
                  ghost
                  className={styles.heckSchedule}
                  type="primary"
                  onClick={() => toggleVerifyVisible(true)}
                >
                  校验排程
                </Button>
                {/* <Button
                  ghost
                  className={styles.heckSchedule}
                  type="primary"
                  // onClick={() => toggleVerifyVisible(true)}
                >
                  紧急插单
                </Button> */}
              </div>
            </div>
            {/* 甘特图 */}
            <div className={styles.rightContent}>
              <Select
                defaultValue={gunterType}
                style={{ width: 130 }}
                onChange={handleChange}
              >
                <Option key={'0'} value="0">
                  班组甘特图
                </Option>
                <Option key={'1'} value="1">
                  生产单甘特图
                </Option>
              </Select>
              <Dome
                time={time}
                treeSelection={treeSelection}
                refresh={refresh}
                updateMethod={updateMethod}
                gunterData={gunterData}
                notWork={notWork}
                gunterType={gunterType}
                formData={formData}
                setHighlighted={setHighlighted}
              />
            </div>
          </div>
        </div>
      </>

      {/* //规则排程 */}
      {visibleRule && (
        <RuleScheduling
          setVisibleRule={setVisibleRule}
          formData={formData}
          visibleRule={visibleRule}
          checkIDs={schedulingIDs}
          onCancel={() => {
            ruleScheduling()
          }}
        />
      )}
      {visibleVerify && (
        <Verification
          update={() => {
            toggleVerifyVisible(false)
            setCheckIDs([])
            update()
          }}
          setCheckIDs={setCheckIDs}
          checkIDs={checkIDs}
          visibleVerify={visibleVerify}
          onCancel={() => {
            toggleVerifyVisible(false)
            setPublishType(false)
          }}
        />
      )}
    </div>
  )
}

export default Index
