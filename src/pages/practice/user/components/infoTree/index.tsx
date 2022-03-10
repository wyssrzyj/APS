import { Tree } from 'antd'
import { isEmpty } from 'lodash'
import { Key, useEffect, useState } from 'react'

import { useStores } from '@/utils/mobx'

const InfoTree = () => {
  const { userStore } = useStores()
  const { departmentLists, updateDepartmentId } = userStore
  const [treeData, setTreeData] = useState<any>([])
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<any>([])

  const getDepartmentTree = () => {
    departmentLists().then((data: any[]) => {
      const defaultKey = `${data[0].parentId}-${data[0].id}`
      setDefaultSelectedKeys([defaultKey])
      // updateDepartmentId(data[0].id)
      const newData = data.map((item) => {
        const { deptName, id, children, parentId } = item
        return {
          title: deptName,
          key: `${parentId}-${''}`,
          children: children.map(
            (o: { deptName: any; id: any; children: any[] }) => {
              return {
                title: o.deptName,
                key: `${parentId}-${id}-${o.id}`,
                children: o.children.map((j: { deptName: any; id: any }) => {
                  return {
                    title: j.deptName,
                    key: `${parentId}-${id}-${o.id}-${j.id}`
                  }
                })
              }
            }
          )
        }
      })
      setTreeData([...newData])
    })
  }

  const onSelect: ((selectedKeys: Key[]) => void) | undefined = (
    selectedKeys: Key[]
  ) => {
    const currentKey = `${selectedKeys[0]}`.split('-')
    const currentId = currentKey[currentKey.length - 1]
    updateDepartmentId(currentId)
  }

  useEffect(() => {
    getDepartmentTree()
  }, [])

  return (
    <div className="tree-container">
      {!isEmpty(treeData) && (
        <Tree
          defaultExpandAll={true}
          showLine={{ showLeafIcon: false }}
          showIcon={false}
          defaultSelectedKeys={defaultSelectedKeys}
          // defaultExpandedKeys={['0-0-0']}
          onSelect={onSelect}
          treeData={treeData}
        />
      )}
    </div>
  )
}
export default InfoTree
