/*
 * @Author: lyj
 * @Date: 2022-08-01 17:15:50
 * @LastEditTime: 2022-08-02 17:20:18
 * @Description:
 * @LastEditors: lyj
 */
import { Select } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { menus } from './menuConfigs'
const TopSearch = () => {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  useEffect(() => {
    const container = []
    menus.forEach((item) => {
      if (!isEmpty(item.children)) {
        container.push(item.children)
      }
    })
    setList(container.flat(Infinity))
  }, [menus])
  const { Option } = Select
  const onChange = (value: string) => {
    navigate(value, {
      replace: true
    })
  }

  const onSearch = (value: string) => {
    console.log('search:', value)
  }
  return (
    <div>
      <Select
        allowClear
        showSearch
        style={{ width: '150px' }}
        placeholder="搜索"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {list.map((item) => (
          <Option key={item.url} value={item.url}>
            {item.label}
          </Option>
        ))}
      </Select>
    </div>
  )
}

export default TopSearch
