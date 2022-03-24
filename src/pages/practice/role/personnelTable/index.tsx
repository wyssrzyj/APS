import { Tabs, Tree } from 'antd'
import React, { useState } from 'react'

import styles from './index.module.less'
const { TabPane } = Tabs
function PersonnelTable() {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([
    '0-0-0',
    '0-0-1'
  ])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0'])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)

  const list = [
    {
      name: '入库管理',
      data: '入库管理'
    },
    {
      name: '出库管理',
      data: '出库管理'
    },
    {
      name: '库内作业',
      data: '库内作业'
    },
    {
      name: '库存管理',
      data: '库存管理'
    },
    {
      name: '报表',
      data: '报表'
    },
    {
      name: '仓库管理',
      data: '仓库管理'
    },
    {
      name: '基础配置',
      data: '基础配置'
    },
    {
      name: '系统管理',
      data: '系统管理'
    },
    {
      name: 'API权限',
      data: 'API权限'
    }
  ]

  const treeData = [
    {
      title: '入库预约',
      key: '0-0',
      children: [
        {
          title: '新增预约单',
          key: '0-0-0'
        },
        {
          title: '一键审核',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' }
          ]
        },
        {
          title: '取消',
          key: '0-0-2'
        }
      ]
    },
    {
      title: '收货单',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' }
      ]
    },
    {
      title: '上架单',
      key: '0-2'
    }
  ]
  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue)
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue)
  }

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info)
    setSelectedKeys(selectedKeysValue)
  }
  return (
    <div className={styles.top}>
      菜单分配
      <div>
        <Tabs defaultActiveKey="1" type="card" size={'small'}>
          {list.map((item) => (
            <TabPane tab={item.name} key={item.name}>
              <Tree
                showLine={{ showLeafIcon: false }} //去掉小书本
                showIcon={false}
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={treeData}
              />
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default PersonnelTable
