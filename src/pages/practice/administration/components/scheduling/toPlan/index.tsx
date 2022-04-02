import { Popover, Tabs, Tag, Tree } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import BreakUp from './breakUp/index'
import styles from './index.module.less'
const { TabPane } = Tabs
function ToPlan() {
  const [treeData, setTreeData] = useState() //处理后的总数据 -树
  const [isModalVisible, setIsModalVisible] = useState(false)
  // const [visible, setVisible] = useState(false)//处理麻烦 先把流程走通

  const callback = (key: any) => {
    console.log(key)
  }

  //编辑工作
  const theEditor = (id: any) => {
    console.log(id)
  }
  //工作拆分
  const workSplit = (id: any) => {
    console.log(id)
    setIsModalVisible(true)
  }
  //效率模板
  const efficiency = (id: any) => {
    console.log(id)
  }
  const content = (id: any, type: any) => {
    return (
      <div>
        {type === 1 ? (
          <div
            className={styles.card}
            onClick={() => {
              workSplit(id)
            }}
          >
            <Tag color="gold"> 任务拆分</Tag>
          </div>
        ) : null}
        {type === 2 ? (
          <div
            className={styles.card}
            onClick={() => {
              theEditor(id)
            }}
          >
            <Tag color="magenta"> 编辑工作</Tag>
          </div>
        ) : null}

        {type !== 3 ? (
          <>
            <div
              className={styles.card}
              onClick={() => {
                theEditor(id)
              }}
            >
              <Tag color="purple"> 锁定工作</Tag>
            </div>
            <div
              className={styles.card}
              onClick={() => {
                theEditor(id)
              }}
            >
              <Tag color="volcano"> 解锁工作</Tag>
            </div>
            <div
              className={styles.card}
              onClick={() => {
                theEditor(id)
              }}
            >
              <Tag color="blue"> 解除分派</Tag>
            </div>
          </>
        ) : null}
        {/* 子项处理 */}
        {type === 3 ? (
          <div
            className={styles.card}
            onClick={() => {
              efficiency(id)
            }}
          >
            <Tag color="geekblue">效率模板</Tag>
          </div>
        ) : null}
      </div>
    )
  }
  const sewing = (sewingData: any, type: any) => {
    return (
      <div style={{ height: '20px' }}>
        <Popover
          placement="right"
          // visible={sewingData.popover}
          // onVisibleChange={(e) => handleVisibleChange(e, sewingData, old)}
          // content={<a onClick={hide}>Close</a>}
          content={() => content(sewingData.id, type)}
          trigger="click"
        >
          {sewingData.title}
        </Popover>
      </div>
    )
  }
  useEffect(() => {
    const sum = [
      {
        title: '生产单1号',
        id: 1,
        children: [
          {
            title: '裁剪工段',
            id: 11
          },
          {
            title: '车缝工段',
            key: 12
          }
        ]
      },
      {
        title: '车缝工段',
        id: 2,
        children: [
          {
            title: '裁剪工段2',
            id: 21
          },
          {
            title: '车缝工段2',
            key: 22
          }
        ]
      }
    ]

    getData(sum)
  }, [])
  const getData = (data: any) => {
    //处理数据
    if (!isEmpty(data)) {
      data.map((item: any) => {
        item.key = item.id

        item.type = item.title === '车缝工段' ? 1 : 0 //用于判断
        item.popover = false
        item.title = item.type === 1 ? sewing(item, 1) : sewing(item, 2)
        //子项处理
        if (item.type === 1) {
          if (!isEmpty(item.children)) {
            item.children.map((singled: any) => {
              item.popover = false
              singled.title = sewing(singled, 3)
            })
          }
        }
      })

      console.log('处理后的', data)
      setTreeData(data)
    }
  }

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    // console.log('selected', selectedKeys, info)
  }

  const onCheck = (checkedKeys: any, info: any) => {
    console.log('onCheck', checkedKeys, info)
  }

  return (
    <div>
      {!isModalVisible ? (
        <Tabs onChange={callback} type="card">
          <TabPane tab="待计划" key="1">
            <Tree
              // checkable
              onSelect={onSelect}
              onCheck={onCheck}
              treeData={treeData}
            />
          </TabPane>
          <TabPane tab="已计划" key="2">
            <Tree
              // checkable
              onSelect={onSelect}
              onCheck={onCheck}
              treeData={treeData}
            />
          </TabPane>
        </Tabs>
      ) : null}

      {/* 拆分 */}
      <BreakUp
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
    </div>
  )
}

export default ToPlan
