/*
 * @Author: lyj
 * @Date: 2022-08-01 14:36:12
 * @LastEditTime: 2022-08-01 16:15:58
 * @Description:
 * @LastEditors: lyj
 */
import { Breadcrumb } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './index.module.less'
import { menus } from './menuConfigs'
const CurrentLocation = () => {
  const location = useLocation()
  const [list, setList] = useState([])
  const navigate = useNavigate()

  // 获取子项的所有数据
  const getChildrenS = (data) => {
    const urlContainer = []

    if (!isEmpty(data.children)) {
      data.children.forEach((v) => {
        urlContainer.push(v.url)
        if (!isEmpty(v.children)) {
          getChildrenS(v.children)
        }
      })
    }
    return urlContainer
  }
  //获取当前项的
  const getLabel = (name) => {
    const cloneMenus = cloneDeep(menus)

    cloneMenus.forEach((item) => {
      if (getChildrenS(item).includes(name) === true) {
        const childrenTitle = item.children.filter((v) => v.url === name)[0]
          .label
        console.log(childrenTitle)

        setList([item.label, childrenTitle])
      }
    })
  }

  useEffect(() => {
    const url = location.pathname
    if (url !== '/') {
      getLabel(url)
    }
  }, [location, menus])
  const jump = () => {
    navigate('/home', {
      replace: true
    })
  }

  return (
    <div className={styles.breadcrumbContainer}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <span className={styles.jump} onClick={jump}>
            主页
          </span>
        </Breadcrumb.Item>
        {list.map((item) => (
          <Breadcrumb.Item key={item}>
            <span>{item}</span>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  )
}

export default CurrentLocation
