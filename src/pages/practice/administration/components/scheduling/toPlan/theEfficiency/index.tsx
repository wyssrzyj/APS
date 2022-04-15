import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Checkbox,
  DatePicker,
  InputNumber,
  message,
  Modal,
  Select,
  Table
} from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import Details from './details/index'
import styles from './index.module.less'
const BreakUp = (props: any) => {
  const { setEfficiencyData, efficiencyData } = props

  const { Option } = Select
  const [data, setData] = useState<any>([])
  const [detailsPopup, setDetailsPopup] = useState<any>(false) //编辑详情

  // 保存事件
  const handleOk = () => {
    setEfficiencyData(false)
  }
  const handleCancel = () => {
    setEfficiencyData(false)
  }

  return (
    <div className={styles.popup}>
      <Modal
        width={300}
        visible={efficiencyData}
        centered={true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.selectLeft}>
          <Select
            defaultValue={'请选择效率模板'}
            // onChange={(e) => handleChange(3, e, _row)}
          >
            <Option value="1">效率模板1</Option>
            <Option value="2">效率模板2</Option>
            <Option value="3">效率模板3</Option>
          </Select>
        </div>
      </Modal>
    </div>
  )
}

export default BreakUp
