import { Button, message, Select } from 'antd'
import { keys } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { Title } from '@/components'
import { practice } from '@/recoil/apis'

import Dome from './Dome/index'
import Forms from './forms'
import styles from './index.module.less'
import MovPopup from './movPopup'
import ProductionOrder from './productionOrder/index'
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
  const [scheduling, setScheduling] = useState(false) //规则排程弹窗
  const [schedule, setSchedule] = useState(false) //校验排程弹窗
  const [remind, setRemind] = useState() //甘特图高亮
  const [formData, setFormData] = useState() //form数据
  const [gunterType, setGunterType] = useState('0') //班组、订单
  const [gunterData, setGunterData] = useState<any>() //甘特图数据
  const [notWork, setNotWork] = useState<any>([]) //不可工作时间

  const { figureData, workingDate } = practice

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
      getChart(formData)
    }
  }, [formData])
  const getChart = async (id: undefined) => {
    const chart: any = await figureData({ factoryId: id }) //图
    if (chart.code === 200) {
      //格式处理
      chart.data.map(
        (item: {
          start_date: string | null
          startDate: moment.MomentInput
          end_date: string | null
          endDate: moment.MomentInput
        }) => {
          item.start_date = item.startDate
            ? moment(item.startDate).format('YYYY-MM-DD HH:mm')
            : null
          item.end_date = item.endDate
            ? moment(item.endDate).format('YYYY-MM-DD HH:mm')
            : null
        }
      )
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

      setGunterData(chart.data) //图
      // setLine([]) //线 //初始的时候传空
    }
    //班组不可工作时间
    const notAvailable = await workingDate({ type: gunterType })
    const sum = keys(notAvailable).map((item) => {
      return { time: notAvailable[item], id: item }
    })
    setNotWork(sum)
  }
  //  图刷新
  const updateMethod = () => {
    console.log('图刷新')
    getChart(formData)
  }

  //删除
  const start = () => {
    if (selectedRowKeys[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      setMovIsModalVisible(true)
    }
  }
  const movApi = () => {
    console.log('删除逻辑')
    console.log('选中的删除id', selectedRowKeys)
  }
  const materials = () => {
    setMaterialModal(true)
  }

  const schedulingBtn = () => {
    setScheduling(true)
  }
  //校验排程
  const scheduleBtn = () => {
    setSchedule(true)
  }
  // 校验排程需要的数据=
  const checkSchedule = (e: any) => {
    console.log('校验排程需要的数据', e)
  }

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info)
  }

  const onCheck = (checkedKeys: React.Key[], info: any) => {
    console.log('onCheck', checkedKeys, info)
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
              <Select
                defaultValue={gunterType}
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="0">班组甘特图</Option>
                <Option value="1">生产甘特图</Option>
              </Select>
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

          <Button type="primary" danger onClick={start}>
            删除
          </Button>
        </div>
      </div>
      <Button type="primary" onClick={schedulingBtn}>
        规则排程
      </Button>
      <Button type="primary" onClick={scheduleBtn}>
        校验排程
      </Button>
      {/* //规则排程 */}
      <RuleScheduling scheduling={scheduling} setScheduling={setScheduling} />
      <Verification schedule={schedule} setSchedule={setSchedule} />
      <MovPopup
        type="mov"
        movIsModalVisible={movIsModalVisible}
        setMovIsModalVisible={setMovIsModalVisible}
        movApi={movApi}
      />

      <div>测试</div>
    </div>
  )
}

export default Index
