import {
  EditOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Button, Empty, message, Modal, Tree } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { roleState } from '@/recoil'
import { roleApis } from '@/recoil/apis'

import RoleModal from '../roleModal'

const { confirm } = Modal

const InfoTree = () => {
  const updateRoleId = useSetRecoilState(roleState.currentRoleId)
  const { roleListTree, operateRole, deleteRole } = roleApis

  const [roleModalVisible, setRoleModalVisible] = useState<boolean>(false)
  const [currentRole, setCurrentRole] = useState<any>({})
  const [treeData, setTreeData] = useState<any>([])

  const editRole = (params: any) => {
    setCurrentRole({ ...params })
    setRoleModalVisible(true)
  }

  const getRoleListTree = () => {
    roleListTree({ pageNum: 1, pageSize: 100 }).then((response: any) => {
      const { success, data } = response
      if (success) {
        const { records } = data
        const newData = records.map((item: any) => {
          const { name, id } = item
          return {
            title: (
              <div className="tree-list">
                <div className="tree-list-left tree-list-disable">{name}</div>
                <div>
                  <EditOutlined
                    className="tree-icon"
                    onClick={() => editRole(item)}
                  />
                  <MinusCircleOutlined
                    className="tree-icon"
                    onClick={() => handleDeleteRole(id, name)}
                  />
                </div>
              </div>
            ),
            key: id
          }
        })
        setTreeData([...newData])
      }
    })
  }

  const handleRole = (params: any) => {
    operateRole({
      ...params
    }).then((response: any) => {
      const { success, msg } = response
      if (success) {
        message.success(msg)
        getRoleListTree()
        setTimeout(() => {
          setRoleModalVisible(false)
        }, 500)
      } else {
        message.error(msg)
      }
    })
  }

  const handleDeleteRole = (id: string, name: string) => {
    confirm({
      title: `确认删除${name}吗?`,
      icon: <ExclamationCircleOutlined />,
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        deleteRole(id).then((response: any) => {
          const { success, msg } = response
          message[success ? 'success' : 'error'](msg)
          success && getRoleListTree()
        })
      }
    })
  }

  const onSelect = (selectedKeys: any[]) => {
    const currentId = selectedKeys[0] || ''
    updateRoleId(currentId)
  }

  const addNewRole = () => {
    setRoleModalVisible(true)
    setCurrentRole({})
  }

  useEffect(() => {
    getRoleListTree()
  }, [])

  return (
    <div className="tree-container">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 20 }}
        onClick={addNewRole}
      >
        新增角色
      </Button>
      {isEmpty(treeData) ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Tree
          showLine={{ showLeafIcon: false }}
          showIcon={false}
          defaultExpandAll={true}
          onSelect={onSelect}
          treeData={treeData}
        />
      )}
      {roleModalVisible && (
        <RoleModal
          visible={roleModalVisible}
          current={currentRole}
          handleOk={handleRole}
          handleCancel={() => setRoleModalVisible(false)}
        />
      )}
    </div>
  )
}
export default InfoTree
