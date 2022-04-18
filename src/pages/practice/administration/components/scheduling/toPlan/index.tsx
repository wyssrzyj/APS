import { Popover, Tabs, Tag, Tree } from 'antd'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'

import BreakUp from './breakUp/index'
import styles from './index.module.less'
import Popup from './popup'
import TheEfficiency from './theEfficiency'

const { TabPane } = Tabs
function ToPlan(props: {
  remind: any
  formData: any
  gunterType: any
  updateMethod: any
  checkSchedule: any
}) {
  const { remind, formData, updateMethod, checkSchedule } = props
  // console.log('甘特图类型-树', gunterType)
  const { listProductionOrders, unlockWork, releaseFromAssignment } = practice

  const [list, setList] = useState<any>([]) //总
  const [editWindow, setEditWindow] = useState(false) //编辑窗
  const [editWindowList, setEditWindowList] = useState() //编辑窗数据
  const [treeData, setTreeData] = useState([]) //处理后的待计划
  const [WaitingTreeData, setWaitingTreeData] = useState([]) //处理后的已计划
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [efficiencyData, setEfficiencyData] = useState(false) //效率
  const [workSplitList, setWorkSplitList] = useState() //工作拆分

  const [current, setCurrent] = useState('0')
  const [keys, setKeys] = useState<any>()

  const [equal, setEqual] = useState<any>('1')
  const [currentItem, setCurrentItem] = useState<any>() //点击的值.
  const [toPlanID, setToPlanID] = useState<any>([]) //待计划的id
  const [plannedID, setPlannedID] = useState<any>([]) //已计划的id

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
    checkSchedule && checkSchedule(plannedID.concat(toPlanID))
  }, [plannedID, toPlanID])

  useEffect(() => {
    if (formData !== undefined) {
      dataAcquisition(formData)
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
    if (!isEmpty(planned)) {
      const plannedData = planned.map((item: any) => {
        return item.externalProduceOrderId
      })
      setPlannedID(planned)
    }

    //添加字段
    const sum = [fieldChanges(notPlan), fieldChanges(planned)]
    setList(sum)
    getData(sum[Number(current)], current) //初始展示
  }
  //Tabs 状态切换
  useEffect(() => {
    getData(list[Number(current)], current)
  }, [current])
  //处理数据
  const getData = (data: any, type: string) => {
    if (!isEmpty(data)) {
      data.map((i: any) => {
        i.key = i.externalProduceOrderId //用于校验排程
        !isEmpty(i.children) &&
          i.children.map((item: any) => {
            // item.disabled = true

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
  // 数据刷新
  const dataUpdate = () => {
    console.log(' 数据刷新')
    dataAcquisition(formData) //树刷新
    updateMethod() //图刷新
  }
  //编辑工作
  const theEditor = (data: any) => {
    console.log('当前编辑工作值', data)
    setEditWindowList(data)
    setEditWindow(true)
  }
  //编辑提交
  const editSubmission = () => {
    setEditWindow(false)
    dataUpdate() //数据刷新
  }
  //锁定 解锁
  const lockWork = async (type: number, id: any) => {
    console.log('锁定解锁id', id)
    const arr = await unlockWork({
      isLocked: type,
      id: id
    })
    console.log(arr)
    dataUpdate() //数据刷新
  }
  const removeDispatch = async (id: any) => {
    console.log('接触分派id', id)
    const res = await releaseFromAssignment({ idList: [id] })
    console.log('接触分派', res)
    dataUpdate() //数据刷新
  }
  //工作拆分
  const workSplit = (data: any) => {
    setWorkSplitList(data)
    setIsModalVisible(true)
  }
  //工作拆分 保存
  const breakSave = () => {
    setIsModalVisible(false)
    dataUpdate() //数据刷新
  }

  // setIsModalVisible
  //效率模板
  const efficiencyMethods = (id: any) => {
    console.log('效率模板', id)
    setEfficiencyData(true)
  }
  const content = (data: any, type: any) => {
    return (
      <div>
        {type === 1 ? (
          <div
            className={styles.card}
            onClick={() => {
              workSplit(data)
            }}
          >
            <Tag className={styles.tag} color="gold">
              任务拆分
            </Tag>
          </div>
        ) : null}
        {type === 2 ? (
          <div className={styles.card}>
            <Tag
              className={styles.tag}
              color="magenta"
              onClick={() => {
                theEditor(data)
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
                  lockWork(1, data.id)
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
                  lockWork(0, data.id)
                }}
              >
                解锁工作
              </Tag>
            </div>
            <div
              className={styles.card}
              onClick={() => {
                removeDispatch(data.id)
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
              efficiencyMethods(data.id)
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
    if (type === 2) {
      return (
        <div style={{ height: '20px' }}>
          <Popover
            placement="right"
            content={() =>
              content(
                sewingData.detailList !== null ? sewingData.detailList[0] : [],
                type
              )
            }
            trigger="hover"
          >
            {sewingData.title}
          </Popover>
        </div>
      )
    } else {
      return (
        <div style={{ height: '20px' }}>
          <Popover
            placement="right"
            content={() => content(sewingData, type)}
            trigger="hover"
          >
            {/* {sewingData.title} */}
            {sewingData.title}
          </Popover>
        </div>
      )
    }
  }
  // const obtainCorrespondingData = (sewingData: any, type: any) => {

  // }

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys)
    console.log('当前项', info.node.id)
    setCurrentItem(info.node)
    setKeys(selectedKeys)
  }

  const onCheck = (checkedKeys: any, info: any) => {
    const toPlan = treeData.map((item: any) => {
      return item.externalProduceOrderId
    })

    const sum: any[][] = []
    toPlan.map((item) => {
      sum.push(toPlanFilterID(item, checkedKeys))
    })
    setToPlanID(sum.flat(Infinity))
  }

  const toPlanFilterID = (v: any, data: any[]) => {
    return data.filter((item: any) => item === v)
  }

  const contents = { editSubmission, editWindow, setEditWindow, editWindowList }
  return (
    <div>
      {!isModalVisible ? (
        <Tabs onChange={callback} activeKey={current} type="card">
          <TabPane tab="待计划" key="0">
            {treeData !== undefined && treeData.length > 0 ? (
              <div>
                <Tree
                  // selectable={false}
                  checkable
                  // checkStrictly={true}
                  height={500}
                  selectedKeys={keys}
                  defaultExpandAll={true}
                  onSelect={onSelect}
                  onCheck={onCheck}
                  treeData={treeData}
                />
              </div>
            ) : null}
          </TabPane>
          <TabPane tab="已计划" key="1">
            {WaitingTreeData !== undefined && WaitingTreeData.length > 0 ? (
              <div>
                <Tree
                  height={200}
                  selectedKeys={keys}
                  defaultExpandAll={true}
                  // checkable
                  onSelect={onSelect}
                  onCheck={onCheck}
                  treeData={WaitingTreeData}
                />
              </div>
            ) : null}
          </TabPane>
        </Tabs>
      ) : null}
      {/* 拆分 */}
      <BreakUp
        breakSave={breakSave}
        workSplitList={workSplitList}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
      {/* 效率模板 */}
      <TheEfficiency
        dataUpdate={dataUpdate}
        setEfficiencyData={setEfficiencyData}
        efficiencyData={efficiencyData}
      />
      {/* 编辑工作 */}
      <Popup content={contents} />
    </div>
  )
}

export default ToPlan
