import { Button, message, Select } from 'antd'
import { cloneDeep, isError, keys } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { Title } from '@/components'
import { schedulingApis } from '@/recoil/apis'

import Dome from './Dome/index'
import Forms from './forms'
import styles from './index.module.less'
import RuleScheduling from './ruleScheduling/index'
import ToPlan from './toPlan'
import Verification from './verification/index'

function Index() {
  const { Option } = Select
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total] = useState<number>(0)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值

  const [movIsModalVisible, setMovIsModalVisible] = useState(false) //删除弹窗
  const [materialModal, setMaterialModal] = useState(false) //物料齐套检查弹窗
  const [visibleRule, setVisibleRule] = useState(false) //规则排程弹窗
  const [visibleVerify, setVisibleVerify] = useState(false) //校验排程弹窗
  const [remind, setRemind] = useState() //甘特图高亮
  const [formData, setFormData] = useState() //form数据
  const [gunterType, setGunterType] = useState('0') //班组、订单
  const [gunterData, setGunterData] = useState<any[]>([]) //甘特图数据-班组
  // const [productionData, setProductionData] = useState<any>([]) //甘特图数据-生产
  const [notWork, setNotWork] = useState<any[]>([]) //不可工作时间
  const [checkIDs, setCheckIDs] = useState<any[]>([]) //校验id
  const [promptList, setPromptList] = useState<any[]>([]) //提示数据

  const { figureData, productionView, workingDate } = schedulingApis

  const data = []
  for (let i = 0; i < 5; i++) {
    data.push({
      id: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`
    })
  }
  //头部form的数据
  const FormData = (e: any) => {
    setFormData(e)
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
     * start_date 开始时间
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
    const notAvailable = await workingDate({ type: type })
    const sum = keys(notAvailable).map((item) => {
      return { time: notAvailable[item], id: item }
    })
    setNotWork(sum)
  }
  //处理Gantt时间格式
  const dateFormat = (data: any, type: any) => {
    const arr = data.map(
      (
        item: {
          start_date: string | null
          startDate: moment.MomentInput
          end_date: string | null
          endDate: moment.MomentInput
          delete: boolean
        },
        index
      ) => {
        if (item.startDate !== null) {
          item.start_date = moment(item.startDate).format('YYYY-MM-DD HH:mm')
        } else {
          item.delete = true
        }
        if (item.endDate !== null) {
          item.end_date = moment(item.endDate).format('YYYY-MM-DD HH:mm')
        } else {
          item.delete = true
        }
        if (item.delete === true) {
          delete item.startDate
          delete item.endDate
          delete item.start_date
          delete item.end_date
        }

        return item
      }
    )
    const cloneArr = cloneDeep(arr)
    setGunterData(cloneArr) //图
  }

  //  图刷新
  const updateMethod = () => {
    getChart(formData, gunterType)
  }

  //删除
  const start = () => {
    if (selectedRowKeys[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      setMovIsModalVisible(true)
    }
  }

  const materials = () => {
    setMaterialModal(true)
  }

  const toggleRuleVisible = (visible: boolean) => {
    setVisibleRule(visible)
  }
  const toggleVerifyVisible = (visible: boolean) => {
    const arr: any[] = []
    promptList.map((item: { title: any }) => {
      arr.push(item.title)
    })
    if (visible === true && arr.length > 0) {
      message.warning(`${arr.join('、')}不可用，请取消选中`)
    }
    if (arr.length <= 0) {
      setVisibleVerify(visible)
    }
  }
  // 校验排程需要的数据=
  const checkSchedule = (plannedID: any, toPlanID: any, stateAdd: any) => {
    if (!isError(stateAdd)) {
      //可用
      const available = stateAdd.filter(
        (item: { type: boolean }) => item.type === true
      )
      //不可用
      const doNotUse = stateAdd.filter(
        (item: { type: boolean }) => item.type === false
      )
      // 提示 判断选中的中是否有不可用的
      // plannedID
      const prompt = plannedID.map((item: any) => {
        return filterPrompt(item, doNotUse)
      })
      setPromptList(prompt.flat(Infinity))

      //待计划数据
      const waiting = available
        .map((item: any) => {
          return filterList(plannedID, item)
        })
        .flat(Infinity)
      setCheckIDs(waiting.concat(toPlanID))
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
  function handleChange(value: any) {
    setGunterType(value)
  }
  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'生产单排程'} />
      </div>
      <div>
        <div className={styles.content}>
          <Forms FormData={FormData}></Forms>
          <div className={styles.scheduling}>
            <Button
              ghost
              type="primary"
              onClick={() => toggleRuleVisible(true)}
            >
              规则排程
            </Button>
            <Button
              className={styles.heckSchedule}
              type="primary"
              onClick={() => toggleVerifyVisible(true)}
            >
              校验排程
            </Button>
          </div>

          <div className={styles.team}>
            <div className={styles.leftContent}>
              <ToPlan
                checkSchedule={checkSchedule}
                updateMethod={updateMethod}
                gunterType={gunterType}
                formData={formData}
                remind={remind}
              />
            </div>
            {/* 甘特图 */}
            <div className={styles.rightContent}>
              <div className={styles.choose}>
                <Select
                  defaultValue={gunterType}
                  style={{ width: 120 }}
                  onChange={handleChange}
                >
                  <Option key={'0'} value="0">
                    班组甘特图
                  </Option>
                  <Option key={'1'} value="1">
                    生产单甘特图
                  </Option>
                </Select>
              </div>

              <Dome
                updateMethod={updateMethod}
                gunterData={gunterData}
                notWork={notWork}
                gunterType={gunterType}
                formData={formData}
                setHighlighted={setHighlighted}
              />
            </div>
          </div>

          {/* <Button type="primary" danger onClick={start}>
            删除
          </Button> */}
        </div>
      </div>

      {/* //规则排程 */}
      {visibleRule && (
        <RuleScheduling
          visibleRule={visibleRule}
          onCancel={() => toggleRuleVisible(false)}
        />
      )}
      {visibleVerify && (
        <Verification
          checkIDs={checkIDs}
          visibleVerify={visibleVerify}
          onCancel={() => toggleVerifyVisible(false)}
        />
      )}
    </div>
  )
}

export default Index
