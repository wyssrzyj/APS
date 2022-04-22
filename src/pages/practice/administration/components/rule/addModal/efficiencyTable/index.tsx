import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, InputNumber, message } from 'antd'
import { cloneDeep, values } from 'lodash'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'
function EfficiencyTable(props: Record<string, any>) {
  const { onChange, value, disabled } = props

  const [data, setData] = useState<any>(value || [{ day: 0, efficiency: 0 }])

  useEffect(() => {
    onChange && onChange(cloneDeep(data))
  }, [])

  const executionMethod = (type: any, index?: number) => {
    const nData = cloneDeep(data)
    if (type === 'push') {
      nData.push({ day: 0, efficiency: 0, key: Math.random() })
      setData([...nData])
      onChange && onChange([...nData])
    } else {
      if (nData.length > 1) {
        nData.splice(index, 1)
        setData([...nData])
        onChange && onChange([...nData])
      } else {
        message.warning('至少一个')
      }
    }
  }

  const onValChange = (value: any, type: any, index: any) => {
    const nData = cloneDeep(data)
    nData[index][type] = value || 0
    setData(nData)
    onChange && onChange([...nData])
  }

  return (
    <div className={styles.container}>
      <div>
        <div>天数</div>
        <div>效率</div>
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => executionMethod('push')}
            disabled={disabled}
          />
        </div>
      </div>
      {data.map((item: any, index: any) => (
        <div key={index}>
          <div>
            <InputNumber
              style={{ width: '100%' }}
              value={item.day}
              min={0}
              precision={0}
              disabled={disabled}
              onChange={(value) => onValChange(value, 'day', index)}
            />
          </div>
          <div>
            <InputNumber
              addonAfter="%"
              value={item.efficiency}
              min={0}
              precision={0}
              disabled={disabled}
              onChange={(value) => onValChange(value, 'efficiency', index)}
            />
          </div>
          <div>
            <Button
              type="primary"
              disabled={disabled}
              icon={<MinusOutlined />}
              onClick={() => executionMethod('mov', index)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default EfficiencyTable
