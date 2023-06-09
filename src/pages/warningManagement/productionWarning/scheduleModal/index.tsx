/*
 * @Author: lyj
 * @Date: 2022-06-21 13:18:16
 * @LastEditTime: 2022-07-20 16:46:06
 * @Description:
 * @LastEditors: lyj
 */
import { Button, message, Modal, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { dockingData } from '@/recoil'
import { dailySchedule, productionWarning } from '@/recoil/apis'

import { tableColumns } from './conifgs'
import MultistageTable from './multistageTable'

const WarningModal = (props) => {
  const { current } = props

  const search = useRecoilValue(dockingData.searchConfigs)
  const map = new Map()
  search.forEach((item) => {
    map.set(item.value, item.name)
  })
  const { getAssignmentList } = productionWarning
  const { updateDailyScheduleList } = dailySchedule
  tableColumns[tableColumns.length - 1].render = (
    _text: any,
    record: any,
    index: number
  ) => {
    return (
      <div key={index}>
        <Button
          type="link"
          onClick={() => {
            setIsModalVisible(true)
            setSubitemData(record)
          }}
        >
          编辑
        </Button>
      </div>
    )
  }
  tableColumns[1].render = (v) => {
    return <div>{map.get(v)}</div>
  }

  const [data, setData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [subitemData, setSubitemData] = useState()
  const [saveData, setSaveData] = useState<any>([]) //保存数据

  useEffect(() => {
    getProductionWarning()
  }, [])

  const getProductionWarning = async () => {
    const res = await getAssignmentList({
      externalProduceOrderId: current.externalProduceOrderId
    })

    if (res.code === 200) {
      setData(res.data)
    }
  }

  const onChang = (e) => {
    setSaveData(e)
  }

  const handleOk = async () => {
    const res = await updateDailyScheduleList({
      ...saveData
    })

    if (res.code === 200) {
      message.success('保存成功')
      setIsModalVisible(false)
    }
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div>
      <Table scroll={{ y: 800 }} columns={tableColumns} dataSource={data} />
      {isModalVisible && (
        <Modal
          maskClosable={false}
          width={1000}
          centered={true}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <MultistageTable current={subitemData} onChang={onChang} />
        </Modal>
      )}
    </div>
  )
}

export default WarningModal
