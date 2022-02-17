import './style.less'

import { CheckOutlined } from '@ant-design/icons'
import { Button, Empty, message, Tabs, Tree } from 'antd'
import { isArray, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { roleState } from '@/recoil'
import { roleApis } from '@/recoil/apis'

const { TabPane } = Tabs

const PersonnelTable = () => {
  const { allPermissions, rolePermissions, allotPermissions } = roleApis
  const currentRoleId = useRecoilValue(roleState.currentRoleId)

  const [allData, setAllData] = useState<any>([])
  const [treeData, setTreeData] = useState<any>([])
  const [checkedKeys, setCheckedKeys] = useState<any>([])
  const [currentKeys, setCurrentKeys] = useState<any>([])
  const [activeTab, setActiveTab] = useState(undefined)
  let keyArray: any[] = []

  const onCheck: any = (checkedKey: React.Key[], info: any) => {
    console.log('onCheck', checkedKey, info)
    let newCheckedKeys = checkedKeys
    if (!isEmpty(newCheckedKeys)) {
      newCheckedKeys.find((item: any) => item.id === activeTab).children = [
        ...checkedKey
      ]
    } else {
      newCheckedKeys = [{ id: activeTab, children: [...checkedKey] }]
    }
    setCheckedKeys([...newCheckedKeys])
    setCurrentKeys([...checkedKey])
  }

  const getAllPermissions = () => {
    allPermissions({ appCode: 'wms' }).then((response: any) => {
      const { success, data } = response
      if (success) {
        const { children } = data
        setAllData(children)
        const newData = children[0] || {}
        if (newData.children) {
          setActiveTab(newData.id)
          transformTreeData(newData.children)
        }
      }
    })
  }
  const dealTreeData = (data: any) => {
    data.forEach((item: any) => {
      item.title = item.name
      item.key = item.id
      if (Array.isArray(item.children) && item.children.length > 0) {
        dealTreeData(item.children)
      }
    })
    return data
  }
  const checkData = (data: any) => {
    data.forEach((item: any) => {
      if (Array.isArray(item.children) && item.children.length > 0) {
        checkData(item.children)
      } else {
        keyArray.push(item.id)
      }
    })
  }
  const transformTreeData = (values: any) => {
    const newValue = dealTreeData(values)
    setTreeData([...newValue])
  }

  const onTabChange = (activeKey: any) => {
    setActiveTab(activeKey)
    const current = allData.find((item: any) => item.id === activeKey) || {}
    transformTreeData(current.children)
    const newKeys = checkedKeys.find(
      (item: any) => item.id === activeKey
    ).children
    setCurrentKeys([...newKeys])
  }

  const getRolePermissions = (currentRoleId: any) => {
    rolePermissions(currentRoleId).then((response: any) => {
      const { data, success } = response
      if (success) {
        const { children = [] } = data
        if (isArray(children) && !isEmpty(children)) {
          const newDate: any = children.map((item: any) => {
            keyArray = []
            checkData(item.children)
            return {
              id: item.id,
              children: keyArray
            }
          })
          setCheckedKeys([...newDate])
          const newKeys = newDate.find(
            (item: any) => item.id === activeTab
          ).children
          setCurrentKeys([...newKeys])
        } else {
          setCurrentKeys([])
        }
      }
    })
  }

  const savePermissions = () => {
    if (currentRoleId) {
      const newPermIds = checkedKeys
        .map((item: any) => item.children)
        .reduce((prev: any, cur: any) => {
          return [...prev, ...cur]
        }, [])
      allotPermissions({
        id: currentRoleId,
        permIds: newPermIds
      }).then((response: any) => {
        const { success, msg } = response
        message[success ? 'success' : 'error'](msg)
        success && getRolePermissions(currentRoleId)
      })
    } else {
      message.warning('请先在左侧的角色列表中选择要添加权限的角色')
    }
  }
  useEffect(() => {
    currentRoleId && getRolePermissions(currentRoleId)
  }, [currentRoleId])

  useEffect(() => {
    getAllPermissions()
  }, [])

  return (
    <div className="personnel-table">
      <div className="table-operation">
        <span className="operation">菜单分配</span>
        <Button
          type="primary"
          icon={<CheckOutlined />}
          onClick={savePermissions}
        >
          保存
        </Button>
      </div>

      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        onChange={onTabChange}
      >
        {allData.map((item: any) => (
          <TabPane tab={item.name} key={item.id}>
            {!isEmpty(treeData) ? (
              <Tree
                checkable
                defaultExpandAll={true}
                showIcon={false}
                checkedKeys={currentKeys}
                showLine={{ showLeafIcon: false }}
                onCheck={onCheck}
                treeData={treeData}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default PersonnelTable
