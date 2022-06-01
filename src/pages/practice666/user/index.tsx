import { PlusOutlined } from '@ant-design/icons'
import { Button, Switch, Table } from 'antd'
import React, { useState } from 'react'

import { Title } from '@/components'

import { InfoTree } from './components'
import Forms from './components/forms'
import styles from './index.module.less'

function Index() {
  const rowKey = 'userId'
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total] = useState<number>(0)

  const columns: any = [
    {
      title: '真实姓名',
      dataIndex: 'realName',
      align: 'center',
      key: 'realName'
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      align: 'center',
      key: 'mobile'
    },
    {
      title: '主属部门',
      dataIndex: 'masterDepartment',
      align: 'center',
      key: 'masterDepartment',
      render: (value: any) => {
        return value
      }
    },
    {
      title: '附属部门',
      dataIndex: 'subsidiaryDepartment',
      align: 'center',
      key: 'subsidiaryDepartment',
      render: (value: any) => {
        return value
      }
    },
    {
      title: '角色',
      dataIndex: 'roleList',
      align: 'center',
      key: 'roleList',
      render: (value: any) => {
        return value
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (value: boolean | undefined) => {
        return <Switch defaultChecked={value} onChange={onChange} />
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      key: 'operation',
      render: (_value: any, row: any) => {
        return (
          <div className={styles.flex}>
            <div
              className={styles.operation_item}
              onClick={() => editUser(row)}
            >
              编辑
            </div>

            <div className={styles.operation} onClick={() => editUser(row)}>
              重置密码
            </div>
            <div
              className={styles.operation_item}
              onClick={() => editUser(row)}
            >
              删除
            </div>
          </div>
        )
      }
    }
  ]
  const list = [
    {
      realName: '卢英杰',
      mobile: '8848',
      masterDepartment: '开发部',
      subsidiaryDepartment: '预研部',
      roleList: '角色',
      status: true
    },
    {
      realName: '卢英杰',
      mobile: '8848',
      masterDepartment: '开发部',
      subsidiaryDepartment: '预研部',
      roleList: '角色',
      status: true
    },
    {
      realName: '卢英杰',
      mobile: '8848',
      masterDepartment: '开发部',
      subsidiaryDepartment: '预研部',
      roleList: '角色',
      status: true
    },
    {
      realName: '卢英杰',
      mobile: '8848',
      masterDepartment: '开发部',
      subsidiaryDepartment: '预研部',
      roleList: '角色',
      status: true
    },
    {
      realName: '卢英杰',
      mobile: '8848',
      masterDepartment: '开发部',
      subsidiaryDepartment: '预研部',
      roleList: '角色',
      status: true
    },
    {
      realName: '卢英杰',
      mobile: '8848',
      masterDepartment: '开发部',
      subsidiaryDepartment: '预研部',
      roleList: '角色',
      status: true
    },

    {
      realName: '卢英杰',
      mobile: '8848',
      masterDepartment: '开发部',
      subsidiaryDepartment: '预研部',
      roleList: '角色',
      status: true
    },
    {
      realName: '卢英杰',
      mobile: '8848',
      masterDepartment: '开发部',
      subsidiaryDepartment: '预研部',
      roleList: '角色',
      status: true
    },
    {
      realName: '卢英杰',
      mobile: '8848',
      masterDepartment: '开发部',
      subsidiaryDepartment: '预研部',
      roleList: '角色',
      status: true
    },
    {
      realName: '卢英杰',
      mobile: '8848',
      masterDepartment: '开发部',
      subsidiaryDepartment: '预研部',
      roleList: '角色',
      status: true
    },
    {
      realName: '卢英杰',
      mobile: '8848',
      masterDepartment: '开发部',
      subsidiaryDepartment: '预研部',
      roleList: '角色',
      status: true
    }
  ]
  const editUser = (_params: any) => {
    // setCurrentUser({ ...params })
    // setUserModalVisible(true)
  }
  function onChange(checked: any) {
    console.log(`switch to ${checked}`)
  }

  //form 数据
  const FormData = (value: any) => {
    console.log(value)
  }
  //table
  const onPaginationChange = (
    page: number,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
  }

  return (
    <div className={styles.qualification}>
      {/* 左侧 */}
      <div className={styles.left}>
        <Title title={'用户管理'} />
        <InfoTree />
      </div>
      {/* 右侧 */}
      <div className={styles.right}>
        {/* 头部 */}
        <div className={styles.position}>
          <Forms FormData={FormData}></Forms>
          <Button
            className={styles.btn_right}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              // setUserModalVisible(true)
              // setCurrentUser({})
            }}
          >
            新增用户
          </Button>
        </div>
        <Table
          rowKey={rowKey}
          // loading={loading}
          size="small"
          dataSource={list}
          columns={columns}
          pagination={{
            //分页
            showSizeChanger: true,
            // showQuickJumper: true, //是否快速查找
            pageSize, //每页条数
            current: pageNum, //	当前页数
            total, //数据总数
            // position: ['bottomCenter'], //居中
            pageSizeOptions: ['10', '20', '50'],
            onChange: onPaginationChange //获取当前页码是一个function
          }}
        />
      </div>
    </div>
  )
}

export default Index
