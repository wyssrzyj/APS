/*
 * @Author: lyj
 * @Date: 2022-08-02 14:30:25
 * @LastEditTime: 2022-08-03 14:43:44
 * @Description:
 * @LastEditors: lyj
 */
import 'antd/dist/antd.variable.min.css'

import { Col, ConfigProvider, Row } from 'antd'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'
import { useRecoilState } from 'recoil'

import { layout } from '@/recoil'

const ThemeColor: React.FC = () => {
  const [systemParameter, setSystemParameter] = useRecoilState<any>(
    layout.systemParameter
  )
  const [color, setColor] = useState({
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a'
  })

  // 当前选中的颜色存到全局中
  const preservation = (item) => {
    const coneSystemParameter = cloneDeep(systemParameter)
    coneSystemParameter.topColor[2].color = item.primaryColor
    coneSystemParameter.mergedNextColor = item

    setSystemParameter(coneSystemParameter)
    //保存本地
    localStorage.setItem('themeSetting', JSON.stringify(coneSystemParameter))
  }
  const onColorChange = (nextColor: Partial<typeof color>) => {
    const mergedNextColor = {
      ...color,
      ...nextColor
    }
    preservation(mergedNextColor)

    setColor(mergedNextColor)
    ConfigProvider.config({
      theme: mergedNextColor
    })
  }

  return (
    <Row gutter={16} wrap={false}>
      <Col flex="none">
        <SketchPicker
          presetColors={[
            '#000',
            '#ff4d4f',
            '#faad14',
            '#52c41a',
            '#1890ff',
            '#25b864',
            '#ff6f00',
            'pink'
          ]}
          color={color.primaryColor}
          onChange={({ hex }) => {
            onColorChange({
              primaryColor: hex
            })
          }}
        />
      </Col>
    </Row>
  )
}

export default ThemeColor
