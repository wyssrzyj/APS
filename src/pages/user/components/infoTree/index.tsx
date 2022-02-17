import { Empty, Tree } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { userState } from '@/recoil'
import { userApis } from '@/recoil/apis'

const InfoTree = () => {
  const { departmentLists } = userApis

  const updateDepartmentId = useSetRecoilState(userState.currentDepartmentId)

  const [treeData, setTreeData] = useState<any>([])
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<any>([])

  const getDepartmentTree = () => {
    departmentLists().then((data: any) => {
      const defaultKey = `${data[0].parentId}-${data[0].id}`
      setDefaultSelectedKeys([defaultKey])
      const newData = data.map((item: any) => {
        const { deptName, id, children, parentId } = item
        return {
          title: deptName,
          key: id,
          children: children.map((o: any) => {
            return {
              title: o.deptName,
              key: `${parentId}-${id}-${o.id}`,
              children: o.children.map((j) => {
                return {
                  title: j.deptName,
                  key: `${parentId}-${id}-${o.id}-${j.id}`
                }
              })
            }
          })
        }
      })
      setTreeData([...newData])
    })
  }

  const onSelect = (selectedKeys: any) => {
    const currentKey = selectedKeys[0].split('-')
    const currentId = currentKey[currentKey.length - 1]
    updateDepartmentId(currentId)
  }

  useEffect(() => {
    getDepartmentTree()
  }, [])

  return (
    <div className="tree-container">
      {isEmpty(treeData) ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Tree
          defaultExpandAll={true}
          showLine={{ showLeafIcon: false }}
          showIcon={false}
          defaultSelectedKeys={defaultSelectedKeys}
          onSelect={onSelect}
          treeData={treeData}
        />
      )}
    </div>
  )
}
export default InfoTree
