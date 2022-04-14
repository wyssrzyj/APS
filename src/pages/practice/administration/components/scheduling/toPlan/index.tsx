import { Popover, Tabs, Tag, Tree } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'

import BreakUp from './breakUp/index'
import styles from './index.module.less'
import Popup from './popup'

const { TabPane } = Tabs
function ToPlan(props: { remind: any; formData: any }) {
  const { remind, formData } = props
  const { listProductionOrders, unlockWork, releaseFromAssignment } = practice

  const [list, setList] = useState<any>([]) //总
  const [editWindow, setEditWindow] = useState(false) //编辑窗
  const [treeData, setTreeData] = useState([]) //处理后的待计划
  const [WaitingTreeData, setWaitingTreeData] = useState([]) //处理后的已计划
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [current, setCurrent] = useState('0')
  const [keys, setKeys] = useState<any>()

  const [equal, setEqual] = useState<any>('1')
  const [currentItem, setCurrentItem] = useState<any>() //点击的值

  const map = new Map()
  map.set('1', '裁剪工段')
  map.set('2', '缝制工段')
  map.set('3', '后整工段')
  map.set('4', '包装工段')
  map.set('5', '外发工段')
  map.set('6', '缝制线外组')
  const callback = (key: any) => {
    setCurrent(key)
  }

  useEffect(() => {
    if (formData !== undefined) {
      dataAcquisition(formData)
      console.log('树的formData', formData)
    }
  }, [formData])
  //字段更改
  const fieldChanges = (
    data: {
      title: string
      externalProduceOrderNum: any
      productionAmount: any
      children: any
      assignmentVOList: any
    }[]
  ) => {
    !isEmpty(data) &&
      data.map(
        (item: {
          title: string
          externalProduceOrderNum: any
          productionAmount: any
          children: any
          assignmentVOList: any
        }) => {
          item.title = `${item.externalProduceOrderNum}(${item.productionAmount})件`
          item.children = item.assignmentVOList
          !isEmpty(item.children) &&
            item.children.map((v: any) => {
              v.title = map.get(v.section)
              //待会进行修改
              v.children = v.section === '2' ? v.detailList : null
              !isEmpty(v.children) &&
                v.children.map((s: any) => {
                  s.title = s.teamName
                  //待会进行修改
                })
            })
        }
      )
    return data
  }
  const dataAcquisition = async (id: any) => {
    //已计划假数据
    // 0未计划  1已计划
    const notPlan = await listProductionOrders({
      factoryId: id,
      isPlanned: 0
    })
    const planned = await listProductionOrders({
      factoryId: id,
      isPlanned: 1
    })
    //添加字段
    const sum = [fieldChanges(notPlan), fieldChanges(planned)]
    setList(sum)
    getData(sum[Number(current)], current) //初始展示
  }
  //Tabs 状态切换
  useEffect(() => {
    getData(list[Number(current)], current)
  }, [current])
  const getData = (data: any, type: string) => {
    //处理数据
    if (!isEmpty(data)) {
      data.map((i: { children: any[] }) => {
        !isEmpty(i.children) &&
          i.children.map((item: any) => {
            // data.map((item: any) => {
            item.key = item.id
            item.type = item.title === '缝制工段' ? 1 : 0 //用于判断
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
            // })
          })
      })

      if (type === '0') {
        setTreeData(data)
      } else {
        setWaitingTreeData(data)
      }
    }
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
    console.log('当前id值', id)
  }
  //锁定 解锁
  const lockWork = async (type: number, id: any) => {
    const arr = await unlockWork({
      isLocked: type,
      id: id
    })
    console.log(arr)
  }
  const removeDispatch = async (id: any) => {
    const res = await releaseFromAssignment({ id: id })
    console.log('接触分派', res)
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
            <Tag className={styles.tag} color="gold">
              任务拆分
            </Tag>
          </div>
        ) : null}
        {type === 2 ? (
          <div
            className={styles.card}
            onClick={() => {
              theEditor(id)
            }}
          >
            <Tag
              className={styles.tag}
              color="magenta"
              onClick={() => {
                setEditWindow(true)
              }}
            >
              {' '}
              编辑工作
            </Tag>
          </div>
        ) : null}

        {type !== 3 && type !== 1 ? (
          <>
            <div className={styles.card}>
              <Tag
                className={styles.tag}
                color="purple"
                onClick={() => {
                  theEditor(id)
                  console.log('锁定工作')
                  lockWork(1, id)
                }}
              >
                锁定工作
              </Tag>
            </div>
            <div className={styles.card}>
              <Tag
                className={styles.tag}
                color="volcano"
                onClick={() => {
                  theEditor(id)
                  console.log('解锁工作')
                  lockWork(0, id)
                }}
              >
                解锁工作
              </Tag>
            </div>
            <div
              className={styles.card}
              onClick={() => {
                theEditor(id)
                removeDispatch(id)
              }}
            >
              <Tag className={styles.tag} color="blue">
                {' '}
                解除分派
              </Tag>
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
            <Tag className={styles.tag} color="geekblue">
              效率模板
            </Tag>
          </div>
        ) : null}
      </div>
    )
  }
  const sewing = (sewingData: any, type: any) => {
    //1是缝制
    //2的时候
    return (
      <div style={{ height: '20px' }}>
        <Popover
          placement="right"
          content={() => {
            if (type === 2) {
              console.log('子id', sewingData.detailList)
              if (sewingData.detailList !== null) {
                content(sewingData.detailList[0].id, type)
              }
            } else {
              console.log('非4个', type)
              content(sewingData.id, type)
            }
          }}
          trigger="hover"
        >
          {sewingData.title}
        </Popover>
      </div>
    )
  }

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys)
    console.log('当前项', info.node.id)
    setCurrentItem(info.node)
    setKeys(selectedKeys)
  }

  const onCheck = (checkedKeys: any, info: any) => {
    console.log('onCheck', checkedKeys, info)
  }

  const contents = { editWindow, setEditWindow }
  // const contentx = { isModalVisible, setIsModalVisible, type, treeData, edit }
  return (
    <div>
      {!isModalVisible ? (
        <Tabs onChange={callback} activeKey={current} type="card">
          <TabPane tab="待计划" key="0">
            {treeData !== undefined && treeData.length > 0 ? (
              <Tree
                height={500}
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
                height={200}
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
      {/* 编辑工作 */}
      <Popup content={contents} />
    </div>
  )
}

export default ToPlan
