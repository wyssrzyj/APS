import { Popover, Tabs, Tag, Tree } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import BreakUp from './breakUp/index'
import styles from './index.module.less'
const { TabPane } = Tabs
function ToPlan(props: { remind: any }) {
  const { remind } = props
  const [list, setList] = useState<any>([]) //总

  const [treeData, setTreeData] = useState([]) //处理后的待计划
  const [WaitingTreeData, setWaitingTreeData] = useState([]) //处理后的已计划
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [current, setCurrent] = useState('0')
  const [keys, setKeys] = useState<any>()

  const [equal, setEqual] = useState<any>('1')
  const callback = (key: any) => {
    console.log('callback', key)
    setCurrent(key)
    // setType(false)
  }

  const getCurrentTabs = (data: any[], i: any) => {
    // 待计划
    const stayData = data[0]
    const waitDor: any[] = []
    stayData.map((item: { children: any }) => {
      if (!isEmpty(item.children)) {
        waitDor.push(item.children)
      }
    })
    const waitDorList = stayData.concat(waitDor.flat(Infinity))
    const waitIndex = waitDorList.findIndex(
      (item: { id: any }) => item.id === i
    )
    if (waitIndex !== -1) {
      setCurrent('0')
    }
    // 已计划
    const complete = data[1]
    const completeChildren: any[] = []
    complete.map((item: { children: any }) => {
      if (!isEmpty(item.children)) {
        completeChildren.push(item.children)
      }
    })
    const completeList = complete.concat(completeChildren.flat(Infinity))
    const completeIndex = completeList.findIndex(
      (item: { id: any }) => item.id === i
    )
    if (completeIndex !== -1) {
      setCurrent('1')
    }
  }
  useEffect(() => {
    if (!isEmpty(list)) {
      //这次和上次不一样才执行
      if (equal !== remind) {
        getCurrentTabs(list, remind)
      }
    }
    setEqual(remind)
    setKeys([remind])
  }, [list, remind])

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
          trigger="hover"
        >
          {sewingData.title}
        </Popover>
      </div>
    )
  }
  useEffect(() => {
    const waitPlanned = [
      {
        title: '生产单待计划',
        id: '1',
        children: [
          {
            title: '裁剪工段',
            id: '11'
          },
          {
            title: '车缝工段',
            id: '12'
          }
        ]
      },
      {
        title: '车缝工段',
        id: '2',
        children: [
          {
            title: '裁剪工段2',
            id: '21'
          },
          {
            title: '车缝工段2',
            id: '22'
          }
        ]
      }
    ]
    const planned = [
      {
        title: '生产单已计划',
        id: '2',
        children: [
          {
            title: '裁剪工段已计划',
            id: '21'
          },
          {
            title: '车缝工段已计划',
            id: '22'
          }
        ]
      },
      {
        title: '车缝工段',
        id: ' 3',
        children: [
          {
            title: '裁剪工段2',
            id: '31'
          },
          {
            title: '车缝工段2',
            id: '8848'
          }
        ]
      }
    ]
    const sum = [waitPlanned, planned]
    setList(sum)

    getData(sum[Number(current)], current)
  }, [current])

  const getData = (data: any, type: string) => {
    //处理数据
    if (!isEmpty(data)) {
      data.map((item: any) => {
        item.key = item.id
        item.type = item.title === '车缝工段' ? 1 : 0 //用于判断
        item.popover = false
        item.title = item.type === 1 ? sewing(item, 1) : sewing(item, 2)
        //子项添加key
        if (!isEmpty(item.children)) {
          item.children.map((singled: any) => {
            singled.key = singled.id
          })
        }
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
      if (type === '0') {
        setTreeData(data)
      } else {
        setWaitingTreeData(data)
      }
    }
  }
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys)
    setKeys(selectedKeys)
  }

  const onCheck = (checkedKeys: any, info: any) => {
    console.log('onCheck', checkedKeys, info)
  }
  return (
    <div>
      {!isModalVisible ? (
        <Tabs onChange={callback} activeKey={current} type="card">
          <TabPane tab="待计划" key="0">
            {treeData !== undefined && treeData.length > 0 ? (
              <Tree
                selectedKeys={keys}
                defaultExpandAll={true}
                // checkable
                onSelect={onSelect}
                onCheck={onCheck}
                treeData={treeData}
              />
            ) : null}
          </TabPane>
          <TabPane tab="已计划" key="1">
            {WaitingTreeData !== undefined && WaitingTreeData.length > 0 ? (
              <Tree
                selectedKeys={keys}
                defaultExpandAll={true}
                // checkable
                onSelect={onSelect}
                onCheck={onCheck}
                treeData={WaitingTreeData}
              />
            ) : null}
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
