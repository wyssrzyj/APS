/*
 * @Author: lyj
 * @Date: 2022-08-02 14:30:25
 * @LastEditTime: 2022-08-02 15:37:49
 * @Description:
 * @LastEditors: lyj
 */
import 'antd/dist/antd.variable.min.css'

import { Col, ConfigProvider, Row } from 'antd'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import { useRecoilState } from 'recoil'

import { layout } from '@/recoil'

const ThemeColor: React.FC = () => {
  const [themeColor, setThemeColor] = useRecoilState(layout.layoutColor)
  const [color, setColor] = useState({
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a'
  })

  const onColorChange = (nextColor: Partial<typeof color>) => {
    const mergedNextColor = {
      ...color,
      ...nextColor
    }
    setThemeColor(mergedNextColor.primaryColor)
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
