/*
 * @Author: lyj
 * @Date: 2022-08-02 09:19:45
 * @LastEditTime: 2022-08-02 14:00:48
 * @Description:
 * @LastEditors: lyj
 */
import {
  CloseCircleOutlined,
  DownOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { Button, Popover, Tabs } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { layout } from '@/recoil'

import styles from './index.module.less'

const TopLabel = () => {
  const { TabPane } = Tabs
  const location = useLocation()
  const url = location.pathname

  const navigate = useNavigate()

  const defaultPanes = [
    {
      title: ``,
      content: ``,
      key: '/home',
      closable: false
    }
  ]

  const [value, setValue] = useRecoilState(layout.layoutData)
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key)
  const [panes, setPanes] = useState<any>([])
  const newTabIndex = useRef(0)

  //全局数据
  useEffect(() => {
    setPanes([...defaultPanes, ...value])
  }, [value])

  useEffect(() => {
    if (url !== '/') {
      setActiveKey(url)
    }
  }, [url])

  const onChange = (key: string) => {
    setActiveKey(key)
    navigate(key, {
      replace: true
    })
  }

  const remove = (targetKey: string) => {
    const targetIndex = panes.findIndex((pane) => pane.key === targetKey)
    const newPanes = panes.filter((pane) => pane.key !== targetKey)
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ]
      setActiveKey(key)
    }
    if (newPanes.length === 1) {
      navigate('/home', {
        replace: true
      })
    }
    setPanes(newPanes)
  }

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'add') {
    } else {
      remove(targetKey)
    }
  }

  const close = (type) => {
    if (type === 'whole') {
      setValue([])
      setActiveKey('/home')
      navigate('/home', {
        replace: true
      })
    }
    if (type === 'other') {
      const filterData = value.filter((item) => item.key === url)
      setValue(filterData)
    }
  }

  const content = (
    <div className={styles.topPopover}>
      <div onClick={() => close('whole')} className={styles.iconClose}>
        <CloseCircleOutlined className={styles.iconCloseLeft} />
        关闭全部标签
      </div>

      <div onClick={() => close('other')} className={styles.iconClose}>
        <CloseCircleOutlined className={styles.iconCloseLeft} />
        关闭其他标签
      </div>
    </div>
  )
  return (
    <>
      <div className={styles.topTabs}>
        <div className={styles.tabsContainer}>
          <Tabs
            size="small"
            hideAdd
            tabBarGutter={0}
            onChange={onChange}
            activeKey={activeKey}
            type="editable-card"
            onEdit={onEdit}
          >
            {panes.map((pane, index) => {
              if (index === 0) {
                return (
                  <TabPane
                    style={{ color: 'red' }}
                    tab={<HomeOutlined />}
                    key={'/home'}
                    closable={pane.closable}
                  ></TabPane>
                )
              } else {
                return (
                  <TabPane
                    style={{ color: 'red' }}
                    tab={pane.title}
                    key={pane.key}
                  ></TabPane>
                )
              }
            })}
          </Tabs>
        </div>

        <div className={styles.tabsRight}>
          <Popover
            placement="bottomRight"
            style={{ width: '100px' }}
            content={content}
            trigger="hover"
          >
            <DownOutlined />
          </Popover>
        </div>
      </div>
    </>
  )
}

export default TopLabel
