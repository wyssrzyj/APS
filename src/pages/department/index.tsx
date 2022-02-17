import { Button, Popconfirm, Table } from 'antd'
import React, { useEffect, useState } from 'react'

import { departmentApis } from '@/recoil/apis'

import EditModal from './editModal'
import styles from './index.module.less'
import useTableChange from './useTableChange'

const delTexts = new Map()
delTexts.set(true, '部门或其下部门已有人员信息，请删除相关人员在来操作。')
delTexts.set(false, '删除该部门如包含下级部门将一并删除，是否继续？')

const modalTitles = new Map()
modalTitles.set(0, '编辑部门')
modalTitles.set(1, '新建部门')
modalTitles.set(2, '新建部门')

const Department = () => {
  const { getDepartmentTree, queryDepartment, delDepartment } = departmentApis

  const [delStatus, setDelStatus] = useState(true)
  const [visible, setVisible] = useState(false)
  const [modalStatus, setModalStatus] = useState(0) // 编辑框状态 0: 编辑 1: 子级 2: 同级
  const [treeData, setTreeData] = useState([])
  const [modalId, setModalId] = useState('')
  const [modalParentId, setModalParentId] = useState('')
  const [params] = useState({})
  const { tableChange, dataSource, total, pageNum, pageSize, getDataList } =
    useTableChange(params, getDepartmentTree)

  const dealTreeData = (data: any) => {
    data.forEach((item: any) => {
      item.title = item.deptName
      item.value = item.id
      if (Array.isArray(item.children) && item.children.length > 0) {
        dealTreeData(item.children)
      }
    })
    return data
  }

  useEffect(() => {
    const tree = dealTreeData(dataSource)
    setTreeData(tree)
  }, [dataSource])

  const delClick = async (data: any) => {
    const res = await queryDepartment(data.id)

    setDelStatus(res)
  }

  const showEdit = (data: any, status: React.SetStateAction<number>) => {
    setModalStatus(status)
    setVisible(true)
    setModalId(data.id)
    if (status === 1) {
      // 下级
      setModalParentId(data.id)
    }
    if (status === 2) {
      // 平级
      setModalParentId(data.parentId)
    }
  }

  const realDel = async (data: { id: any }) => {
    if (!delStatus) {
      // 真删除
      await delDepartment({ deptId: data.id })
      await getDataList()
    }
  }

  const columns = [
    {
      title: '部门层级',
      dataIndex: 'deptName'
    },
    {
      title: '级数',
      dataIndex: 'level'
    },
    {
      title: '负责人',
      dataIndex: 'principalName'
    },
    {
      title: '联系方式',
      dataIndex: 'principalMobile'
    },
    {
      title: '人数',
      dataIndex: 'personNumber'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '操作',
      dataIndex: 'h',
      render: (_: any, row: { id: any }) => {
        return (
          <div>
            <div className={styles.tabelEdit} onClick={() => showEdit(row, 0)}>
              编辑
            </div>
            <div className={styles.tabelEdit}>
              新建
              <div className={styles.moreEdit}>
                <div
                  className={styles.moreEditItem}
                  onClick={() => showEdit(row, 1)}
                >
                  新建下级部门
                </div>
                <div
                  className={styles.moreEditItem}
                  onClick={() => showEdit(row, 2)}
                >
                  新建平级部门
                </div>
              </div>
            </div>
            <Popconfirm
              title={delTexts.get(delStatus)}
              onConfirm={() => realDel(row)}
            >
              <div className={styles.tabelEdit} onClick={() => delClick(row)}>
                删除
              </div>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  const onCancel = () => {
    setVisible((f) => {
      if (f) {
        getDataList()
      }
      return !f
    })
  }

  return (
    <div className={styles.departmentBox}>
      <Button
        type="primary"
        className={styles.addDepartment}
        onClick={() => setVisible(true)}
      >
        新建部门
      </Button>
      <Table
        onChange={(pagination, filters, sorter) =>
          tableChange(pagination, filters, sorter)
        }
        pagination={{
          total: total,
          pageSize: pageSize,
          current: pageNum
        }}
        columns={columns}
        dataSource={dataSource}
        className={styles.departmentTable}
        rowKey={'id'}
      ></Table>

      {visible && (
        <EditModal
          treeData={treeData}
          key={modalId}
          visible={visible}
          title={modalTitles.get(modalStatus)}
          modalId={modalId}
          modalStatus={modalStatus}
          onCancel={onCancel}
          modalParentId={modalParentId}
        ></EditModal>
      )}
    </div>
  )
}

export default Department
