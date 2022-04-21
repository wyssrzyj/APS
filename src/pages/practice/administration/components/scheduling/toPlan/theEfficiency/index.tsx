import { Modal, Select, Table } from 'antd'
import { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'

import styles from './index.module.less'
const BreakUp = (props: any) => {
  const {
    setEfficiencyData,
    efficiencyData,
    dataUpdate,
    capacityData,
    efficiencyID,
    templateId
  } = props
  const { saveDetails, forDetail } = practice

  const { Option } = Select
  const [data, setData] = useState<any>()
  useEffect(() => {
    if (templateId !== undefined) {
      setData(templateId)
    }
  }, [templateId])
  // 保存事件
  const handleOk = async () => {
    const arr = await saveDetails({ id: efficiencyID, templateId: data })
    dataUpdate && dataUpdate()
    setEfficiencyData(false)
  }
  const handleCancel = () => {
    setEfficiencyData(false)
  }
  const handleChange = (e: string) => {
    setData(e)
  }

  return (
    <div className={styles.popup}>
      {templateId ? (
        <Modal
          destroyOnClose={true}
          width={300}
          visible={efficiencyData}
          centered={true}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className={styles.selectLeft}>
            <div>效率模板:　</div>
            <div>
              <Select
                // placeholder={'请选择效率模板'}
                defaultValue={templateId}
                onChange={(e) => handleChange(e)}
              >
                {capacityData.map((item: any) => (
                  // eslint-disable-next-line react/jsx-key
                  // eslint-disable-next-line react/jsx-key
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

export default BreakUp
