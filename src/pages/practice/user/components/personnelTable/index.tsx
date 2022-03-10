import './style.less'

import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, message, Modal, Select, Table } from 'antd'
import { isArray, isEmpty, isNil } from 'lodash'
import { SetStateAction, useEffect, useState } from 'react'

import { SearchInput } from '@/components'
import { observer, useStores } from '@/utils/mobx'
import { getStatusMap, transformStatus } from '@/utils/tool'

import ResetPassword from '../resetPassword'
import UserModal from '../userModal'

const { Option } = Select

const rowKey = 'userId'

const PersonnelTable = () => {
  const { userStore } = useStores()
  const { userInfoLists, currentDepartmentId, moreOperation } = userStore
  const [userModalVisible, setUserModalVisible] = useState(false)
  const [passwordModalVisible, setPasswordModalVisible] = useState(false)
  const [pageNum, setPageNum] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [dataSource, setDataSource] = useState<any>([])
  const [status, setStatus] = useState(undefined)
  const [roleName, setRoleName] = useState<string>()
  const [realName, setRealName] = useState<string>()
  const [currentUser, setCurrentUser] = useState<any>({})
  const pageSize = 10
  const userStatus = getStatusMap()

  const moreOperationFn = (values: {
    status: any
    userId?: any
    realName?: any
  }) => {
    const { userId, realName, status } = values
    // setCurrentUser({ ...values })
    return (
      <Menu>
        <Menu.Item key="1">
          <a
            onClick={() => {
              setCurrentUser({ ...values })
              setPasswordModalVisible(true)
            }}
          >
            重置密码
          </a>
        </Menu.Item>
        {status === 1 && (
          <Menu.Item key="2">
            <a
              onClick={() => {
                operationUser(2, realName, userId)
              }}
            >
              禁止登录
            </a>
          </Menu.Item>
        )}
        {status === 2 && (
          <Menu.Item key="3">
            <a
              onClick={() => {
                operationUser(1, realName, userId)
              }}
            >
              允许登录
            </a>
          </Menu.Item>
        )}
        <Menu.Item key="4">
          <a
            onClick={() => {
              operationUser(0, realName, userId)
            }}
          >
            停用
          </a>
        </Menu.Item>
      </Menu>
    )
  }

  const columns = [
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName'
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: '主属部门',
      dataIndex: 'masterDepartment',
      key: 'masterDepartment',
      render: (value: { deptName: any }) => {
        if (value) {
          return value.deptName
        } else {
          return '--'
        }
      }
    },
    {
      title: '附属部门',
      dataIndex: 'subsidiaryDepartment',
      key: 'subsidiaryDepartment',
      render: (value: any[]) => {
        if (isArray(value)) {
          return value.map((o) => o.deptName).join('、')
        } else {
          return '--'
        }
      }
    },
    {
      title: '角色',
      dataIndex: 'roleList',
      key: 'roleList',
      render: (value: any[]) => {
        if (isArray(value) && !isEmpty(value)) {
          return value.map((o) => o.name).join('、')
        } else {
          return '--'
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (value: number) => {
        return !isNil(value) ? transformStatus(value) : '--'
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_value: any, row: { status: any }) => {
        const { status } = row
        return (
          <>
            <a className="operation-item" onClick={() => editUser(row)}>
              编辑
            </a>
            {status == 0 ? (
              <a className="operation-item" onClick={() => editUser(row)}>
                启用
              </a>
            ) : (
              <Dropdown overlay={() => moreOperationFn(row)}>
                <a className="operation-item">更多</a>
              </Dropdown>
            )}
          </>
        )
      }
    }
  ]

  const operationUser = (status: number, name: any, userId: any) => {
    const field = userStatus.find((item) => item.value == status) || {
      label: ''
    }
    Modal.confirm({
      title: `确认${field.label} ${name} 吗？`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        moreOperation({
          userId,
          status
        }).then((response: { success: any; msg: any }) => {
          const { success, msg } = response
          message[success ? 'success' : 'error'](msg)
          success && getUserInfoLists()
        })
      }
    })
  }

  const editUser = (params: any) => {
    setCurrentUser({ ...params })
    setUserModalVisible(true)
  }
  const onNameChange = (value: SetStateAction<string | undefined>) => {
    setPageNum(1)
    setRealName(value)
  }

  const onRoleChange = (value: SetStateAction<string | undefined>) => {
    setPageNum(1)
    setRoleName(value)
  }

  const onPaginationChange = (page: SetStateAction<number>) => {
    setPageNum(page)
    // setTotal(0)
  }

  const getUserInfoLists = () => {
    userInfoLists({
      pageNum,
      pageSize,
      deptId: currentDepartmentId,
      status, //角色状态
      roleName,
      realName
    })
      .then((response: { success: any; data: any }) => {
        const { success, data } = response
        if (success) {
          const { total, records } = data
          setDataSource([...records])
          setTotal(total)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleChange = (value: SetStateAction<undefined>) => {
    setPageNum(1)
    setStatus(value)
  }
  const handleOk = () => {
    setUserModalVisible(false)
    setPasswordModalVisible(false)
    getUserInfoLists()
  }

  useEffect(() => {
    getUserInfoLists()
  }, [currentDepartmentId, status, roleName, realName, pageNum])
  return (
    <div className="personnel-table">
      <div className="table-operation">
        <div className="operation">
          <div className="operation-item">
            <label>用户关键字：</label>
            <SearchInput
              placeholder="请输入加工厂名称"
              onChange={onNameChange}
            />
          </div>
          <div className="operation-item">
            <label>角色名称：</label>
            <SearchInput placeholder="请输入角色名称" onChange={onRoleChange} />
          </div>
          <div className="operation-item">
            <label>状态：</label>
            <Select
              allowClear
              placeholder="请选择状态"
              style={{ width: 174 }}
              onChange={handleChange}
            >
              {userStatus.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setUserModalVisible(true)
            setCurrentUser({})
          }}
        >
          新增用户
        </Button>
      </div>
      <Table
        rowKey={rowKey}
        loading={loading}
        size="small"
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: pageNum,
          pageSize,
          total,
          onChange: onPaginationChange
        }}
      />
      {/* 新增用户弹框 */}
      {userModalVisible && (
        <UserModal
          visible={userModalVisible}
          current={currentUser}
          handleOk={handleOk}
          handleCancel={() => setUserModalVisible(false)}
        />
      )}
      {/* 重置密码弹框 */}
      {passwordModalVisible && (
        <ResetPassword
          visible={passwordModalVisible}
          userId={currentUser.userId}
          handleOk={handleOk}
          handleCancel={() => setPasswordModalVisible(false)}
        />
      )}
    </div>
  )
}

export default observer(PersonnelTable)
