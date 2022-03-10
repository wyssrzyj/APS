import {
  // PlusCircleOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Button, Tree } from 'antd'
import React from 'react'

import { Title } from '@/components'

import styles from './index.module.less'
import PersonnelTable from './personnelTable'
function index() {
  const editRole = () => {
    console.log(123)
  }
  const handleDeleteRole = () => {
    console.log(456)
  }
  const addNewRole = () => {
    console.log('新增')
  }
  const treeData = [
    {
      title: (
        <div className={styles.tree_list}>
          <div className="tree-list-left tree-list-disable">名字</div>
          <div className={styles.tree_right}>
            <EditOutlined className="tree-icon" onClick={() => editRole()} />
            <MinusCircleOutlined
              className="tree-icon"
              onClick={() => handleDeleteRole()}
            />
          </div>
        </div>
      ),
      key: 1
    },
    {
      title: (
        <div className={styles.tree_list}>
          <div className="tree-list-left tree-list-disable">名字1</div>
          <div className={styles.tree_right}>
            <EditOutlined className="tree-icon" onClick={() => editRole()} />
            <MinusCircleOutlined
              className="tree-icon"
              onClick={() => handleDeleteRole()}
            />
          </div>
        </div>
      ),
      key: 2
    }
  ]
  return (
    <div className={styles.qualification}>
      {/* 左侧 */}
      <div className={styles.left}>
        <Title title={'角色管理'} />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: 20 }}
          onClick={addNewRole}
        >
          新建角色
        </Button>
        <Tree
          showLine={{ showLeafIcon: false }}
          showIcon={false}
          defaultExpandAll={true}
          // onSelect={onSelect}
          treeData={treeData}
        />
      </div>
      {/* 右侧 */}
      <div className={styles.right}>
        <PersonnelTable />
      </div>
    </div>
  )
}

export default index
