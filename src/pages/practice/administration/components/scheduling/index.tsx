import { Button, message, Tree } from 'antd'
import React, { useEffect, useState } from 'react'

import { Title } from '@/components'

import Dome from './Dome/index'
import Forms from './forms'
import styles from './index.module.less'
import MovPopup from './movPopup'
import Popup from './popup'
import ProductionOrder from './productionOrder/index'
import RuleScheduling from './ruleScheduling/index'
import ToPlan from './toPlan'
import Verification from './verification/index'

function Index() {
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total] = useState<number>(0)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗

  const [movIsModalVisible, setMovIsModalVisible] = useState(false) //删除弹窗
  const [materialModal, setMaterialModal] = useState(false) //物料齐套检查弹窗
  const [scheduling, setScheduling] = useState(false) //规则排程弹窗
  const [schedule, setSchedule] = useState(false) //校验排程弹窗
  const [remind, setRemind] = useState() //甘特图高亮
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
    console.log(e)
  }

  const editUser = (type: boolean) => {
    if (type === true) {
      setIsModalVisible(true)
    } else {
      console.log('查看')
    }
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

  const executionMethod = () => {
    setIsModalVisible(true)
  }
  const schedulingBtn = () => {
    setScheduling(true)
  }
  const scheduleBtn = () => {
    setSchedule(true)
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

  const content = { isModalVisible, setIsModalVisible }
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
              <ToPlan remind={remind} />
            </div>
            {/* 甘特图 */}
            <div className={styles.rightContent}>
              <Dome setHighlighted={setHighlighted} />
            </div>
          </div>

          <Button type="primary" onClick={executionMethod}>
            编辑
          </Button>

          <Button type="primary" danger onClick={start}>
            删除
          </Button>
          <Popup content={content} />
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
