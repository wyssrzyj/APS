import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Table,
  Tooltip,
  Tree
} from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { cloneDeep, isElement, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import change from '@/imgs/change.png'
import { dockingDataApis, schedulingApis } from '@/recoil/apis'

// import Details from './details/index'
import styles from './index.module.less'
import ProductionAmountTree from './productionAmountTree'
const BreakUp = (props: any) => {
  const {
    setIsModalVisible,
    isModalVisible,
    workSplitList,
    breakSave,
    formData,
    empty
  } = props

  const splitTypeData = [
    { name: '颜色', id: '1' },
    { name: '尺码', id: '2' }
  ]

  const { workshopList, teamList, capacityListID } = dockingDataApis
  const { splitMethod, breakQuery, calculateCompletionTime, getSkuTree } =
    schedulingApis

  const { Option } = Select
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total] = useState<number>(0)
  const [load, setLoad] = useState<any>(true)

  const [data, setData] = useState<any>([]) //查询的数据

  const [initialTeamList, setInitialTeamList] = useState<any>([]) //处理初始班组
  const [factoryName, setFactoryName] = useState<any>([]) //车间

  const [splitType, setSplitType] = useState<any>('1') //拆分类型
  const [allSelected, setAllSelected] = useState([]) //所有选中的
  const [initial, setInitial] = useState({ name: 'initial' })

  useEffect(() => {
    if (formData !== undefined) {
      dataAcquisition(formData)
    }
  }, [formData])

  // 车间
  const dataAcquisition = async (e: any) => {
    //车间
    const res = await workshopList({ factoryId: e })
    if (res) {
      res.map((item: { name: any; shopName: any }) => {
        item.name = item.shopName
      })
      setFactoryName(res)
    }
  }
  useEffect(() => {
    if (!isEmpty(workSplitList) && workSplitList !== undefined) {
      getInterfaceData(workSplitList)
    }
  }, [workSplitList])

  //替换数据
  const updateData = (record: any, list: any) => {
    /**
     * record 修改后的单个值.
     * list 老数据
     */
    const subscript = list.findIndex((item: any) => item.ids === record.ids)
    if (subscript !== -1) {
      list.splice(subscript, 1, record)

      list.map((item, index) => {
        if (index !== subscript) {
          item.type = false
        }
      })
      setData([...list])
      setLoad(false)
    } else {
    }
  }

  const initiaTeam = (teamData, name, ids) => {
    //有值就赋值，没有就返回空，防止报错
    if (!isEmpty(teamData)) {
      teamData.map((item: { name: any; teamName: any; key: any; id: any }) => {
        item.name = item[name]
        item.key = item[ids]
      })
      return teamData
    } else {
      return []
    }
  }

  //**处理班组 效率 初始值问题
  const initialHandleChange = async (shopId, teamId, record, teamDate) => {
    const sum = teamDate
    //班组
    record.teamType = true
    const team = await teamList({
      factoryId: formData,
      shopMannagerId: shopId
    })
    record.teamList = initiaTeam(team, 'teamName', 'id')
    // 效率
    const capacity = await capacityListID({ teamId: teamId })
    record.efficiency = initiaTeam(capacity, 'templateName', 'teamId')
    //全部赋值完成在进行数据更新
    updateData(record, sum)
  }

  //*** 下拉处理***
  const handleChange = async (type: number, e: any, record: any) => {
    const sum = cloneDeep(data)
    //工作车间
    if (type === 1) {
      record.shopId = e
      record.teamId = null
      record.templateId = null

      record.teamType = true
      //班组是独立的
      const team = await teamList({ factoryId: formData, shopMannagerId: e })
      if (team) {
        team.map((item: { name: any; teamName: any; key: any; id: any }) => {
          item.name = item.teamName
          item.key = item.id
        })
        record.teamList = team
        updateData(record, sum)
      }
    }
    //工作班组
    if (type === 2) {
      record.teamId = e
      record.templateId = null

      //效率是独立的
      const capacity = await capacityListID({ teamId: e })

      if (capacity) {
        capacity.map((item: any) => {
          item.name = item.templateName
          item.key = item.templateId
        })
      }
      record.efficiency = capacity
      updateData(record, sum)
    }
    //效率模板
    if (type === 3) {
      record.templateId = e
      updateData(record, sum)
    }
  }

  const getInterfaceData = async (data: any) => {
    const arr = await getSkuTree({
      externalProduceOrderId: data.externalProduceOrderId
    })

    const res = await breakQuery({ assignmentId: data.id })

    if (!isEmpty(res)) {
      res.map(async (item: any, index) => {
        const sum = []
        if (!isEmpty(item.skuList)) {
          item.skuList.map((item) => {
            sum.push(item.id)
          })
        }
        item.selectedItem = sum //选中的
        item.type = false
        item.tree = arr
        item.isLocked = item.isLocked === 1 ? true : false
        //拆分数量
        // item.productionAmount = item.productionAmount ? 0 : 0
        item.orderSum = data.orderSum
        item.used = item.planEndTime
        item.ids = index + 1 //用于时间更改时的判断条件
        item.key = index + 1
      })
      //这个时候先不能渲染 这里的会慢一步
      //先渲染后处理
      setSplitType(res[0].skuType !== null ? res[0].skuType : '1')
      setInitialTeamList([...res])
    } else {
      //初始空数组 添加key防止报错
      // delete data.id //防止 id和父级一样.
      const res = cloneDeep(data)

      // res.children = []
      res.type = false
      res.tree = arr
      res.id = 1008611
      res.key = 2
      res.productionAmount = 0
      res.completedAmount = 0
      res.additionalTime = '0'
      setSplitType('1')
      setData([res])
      setLoad(false)
    }
  }

  //处理班组 效率 初始值问题
  useEffect(() => {
    if (!isEmpty(initialTeamList)) {
      initialTeamList.forEach((item: any) => {
        initialHandleChange(item.shopId, item.teamId, item, initialTeamList)
      })
    }
  }, [initialTeamList])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    empty && empty()
  }

  //单选的处理
  const onLock = (
    e: CheckboxChangeEvent,
    record: {
      isLocked?: any
      shopId?: any
      id?: any
      teamId?: any
      efficiency?: any
      productionAmount?: any
      startTime?: number | undefined
      eddTime?: number | undefined
    }
  ) => {
    const sum = cloneDeep(data)

    record.isLocked = e.target.checked
    updateData(record, sum)
  }

  //数字输入框的处理

  const onBreakUp = (
    e: any,
    record: {
      productionAmount: any
      completedAmount?: any
      shopId?: any
      id?: any
      teamId?: any
      efficiency?: any
      startTime?: number | undefined
      eddTime?: number | undefined
    },
    type: number
  ) => {
    const sum = cloneDeep(data)
    if (type === 1) {
      if (e === '0') {
        message.warning('请输入大于0的数')
        updateData(record, sum)
      } else {
        record.productionAmount = Number(e)
        updateData(record, sum)
      }
    }
    if (type === 2) {
      record.completedAmount = Number(e)
      updateData(record, sum)
    }
  }

  //获取结束时间
  const endTime = async (e, record) => {
    const sum = cloneDeep(data)

    if (e) {
      // c重新更改
      record.planStartTime = moment(e).valueOf()

      const assignmentId = workSplitList.id
      const capacityId = record.templateId
      const teamId = record.teamId //班组id
      const orderNum = record.productionAmount - record.completedAmount
      const startDate = moment(e).format('YYYY-MM-DD HH:mm:ss')
      const additionalTime = Number(record.additionalTime)

      //算
      const arr = await calculateCompletionTime({
        assignmentId,
        orderNum,
        startDate,
        teamId,
        additionalTime,
        capacityId
      })
      try {
        if (arr.code === 200) {
          //需要获取当前行~~~~~~
          record.planEndTime = arr.data
          record.automatic = arr.data
          updateData(record, sum)
        }
      } catch (error) {
        updateData(record, sum)
      }
    }
  }

  //时间的处理
  const time = (
    type: number,
    e: moment.MomentInput,
    record: {
      planStartTime?: any
      planEndTime?: any
      shopId?: any
      id?: any
      teamId?: any
      efficiency?: any
      productionAmount?: any
      startTime?: number | undefined
      eddTime?: number | undefined
    }
  ) => {
    const sum = cloneDeep(data)
    if (type === 1) {
      record.planStartTime = moment(e).valueOf()
      updateData(record, sum)
    }
    if (type === 2) {
      if (record.planStartTime > moment(e).valueOf()) {
        message.error('开始时间不能大于结束时间')
      } else {
        record.planEndTime = moment(e).valueOf()
        updateData(record, sum)
      }
    }
  }
  //增加
  const increase = () => {
    const arr = cloneDeep(data)
    if (arr[0].productionAmount === 0) {
      message.warning('请填写拆分数量')
    } else {
      //拆分数量的总和
      const res = arr.reduce(
        (total: any, current: { productionAmount: any }) => {
          total += current.productionAmount
          return total
        },
        0
      )
      const value = arr[0].orderSum - res

      if (value <= 0) {
        message.warning('拆分数量以到达最大值')
      } else {
        arr.push({
          key: Date.now(),
          ids: Date.now() * Math.random(),
          productionAmount: value,
          // shopId: arr[0].shopId,
          // teamId: arr[0].teamId,
          planStartTime: undefined,
          planEndTime: undefined,
          efficiency: arr[0].efficiency,
          isLocked: arr[0].isLocked,
          externalProduceOrderNum: arr[0].externalProduceOrderNum,
          productName: arr[0].productName,
          productNum: arr[0].productNum,
          type: arr[0].type,
          tree: arr[0].tree,
          completedAmount: 0
        })
        setData([...arr])
      }
    }
  }

  const reduce = (ids: any) => {
    const arr = cloneDeep(data)
    const res = arr.filter((item: { ids: any }) => item.ids !== ids)
    setData([...res])
  }

  function isRepeat(arr: any) {
    const teamIdType = arr.every((item: any) => {
      return item !== null && item !== undefined
    })

    if (teamIdType) {
      const hash: any = {}
      for (const i in arr) {
        if (hash[arr[i]]) return true
        hash[arr[i]] = true
      }
      return false
    } else {
      return false
    }
  }

  // 保存事件
  const handleOk = async () => {
    const arr = cloneDeep(data)

    const state = { timeState: false, number: false, teamType: false }

    //时间的过滤
    const Time = arr.filter(
      (item: { planStartTime: undefined; planEndTime: undefined }) =>
        item.planStartTime === undefined || item.planEndTime === undefined
    )

    if (Time.length > 0) {
      message.warning(`时间不能为空`)
    } else {
      state.timeState = true
    }

    if (state.timeState === true) {
      // 拆分数量
      const res = arr.reduce(
        (total: any, current: { productionAmount: any }) => {
          total += Math.abs(current.productionAmount)
          return total
        },
        0
      )
      const value = res - arr[0].orderSum
      if (value !== 0) {
        if (value < 0) {
          message.warning(`拆分数量总和未满足订单总量 剩余-【${value}】`)
        } else {
          message.warning(
            `拆分数量总和 超出订单总量 超出-【${Math.abs(value)}】`
          )
        }
      } else {
        state.number = true
      }

      //工作班组 不可重复
      //判断班组是否重复
      const team: any = []
      arr.map((item: { teamId: any }) => {
        team.push(item.teamId)
      })

      if (!isRepeat(team)) {
        const teamIdType = team.every((item: any) => {
          return item !== null && item !== undefined
        })

        if (teamIdType) {
          state.teamType = true
        } else {
          state.teamType = false
          message.warning(`班组不能为空`)
        }
      } else {
        state.teamType = false
        message.warning(`班组不能相同`)
      }

      if (
        state.timeState === true &&
        state.number === true &&
        state.teamType === true
      ) {
        arr.map((item: any, index: any) => {
          item.isLocked = item.isLocked === true ? 1 : 0
          if (item.automatic === undefined || item.automatic <= 0) {
            //手动 -旧值
            item.additionalTime = item.planEndTime - item.used
          } else {
            //手动 -自动
            item.additionalTime = item.planEndTime - item.automatic
          }
        })
        if (arr[0].id === 1008611) {
          arr.map((item) => {
            item.id = null
          })
        }

        const sum = await splitMethod({
          assignmentId: workSplitList.id,
          data: arr
        })

        if (sum) {
          message.success('保存成功')
          breakSave && breakSave()
          empty && empty()
        } else {
          message.error('保存失败')
        }
      }
    }
  }

  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
  }
  const onVisibleChange = (e) => {
    console.log(e)
  }

  //获取所有的选中值
  useEffect(() => {
    const sum = []
    const initialData = []
    data.forEach((item) => {
      if (!isEmpty(item.selectedItem)) {
        sum.push(item.selectedItem)
      } else {
        //初始
        if (!isEmpty(item.skuList)) {
          const ids = []
          item.skuList.forEach((v) => {
            ids.push(v.id)
          })
          initialData.push(ids)
        }
      }
    })
    //初始 先用 initial
    // 操作 用 sum

    if (initial.name === 'splitType') {
      setAllSelected([])
    } else {
      if (!isEmpty(sum.flat(Infinity))) {
        setAllSelected(sum.flat(Infinity))
      } else {
        setAllSelected(initialData.flat(Infinity))
      }
    }
  }, [data, initial])

  //切换清空 选中、所有的数据
  useEffect(() => {
    if (initial.name !== 'initial') {
      data.map((item) => {
        item.selectedItem = []
      })
      setData(data)
      setAllSelected([])
    }
  }, [splitType])

  //选中拆分数量
  const selectSplitQuantity = (e, item) => {
    if (!isEmpty(item.skuList)) {
      item.skuList.map((item) => {
        item.amount = item.productionNum
      })
    }

    onBreakUp(e, item, 1)
  }
  const displayTooltip = (item: any) => {
    item.type = true
    onBreakUp(item.productionAmount, item, 1)
  }
  // eslint-disable-next-line no-sparse-arrays
  const columns: any = [
    {
      title: '序号',
      align: 'center',
      fixed: 'left',
      width: 80,
      dataIndex: 'name',
      key: 'name',
      render: (_value: any, _row: any, index: any) => {
        return <div key={_value}>{index + 1}</div>
      }
    },
    // {
    //   title: '生产单号',
    //   align: 'center',
    //   fixed: 'left',
    //   width: 80,
    //   key: 'externalProduceOrderNum',
    //   dataIndex: 'externalProduceOrderNum'
    // },
    {
      title: '产品名称',
      align: 'center',
      // fixed: 'left',
      width: 80,
      key: 'productName',
      dataIndex: 'productName'
    },
    {
      title: '产品款号',
      align: 'center',
      // fixed: 'left',
      width: 80,
      key: 'productNum',
      dataIndex: 'productNum'
    },
    {
      title: '生产单总量',
      width: 80,
      align: 'center',
      key: 'orderSum',
      dataIndex: 'orderSum'
    },
    {
      title: '客户款号',
      align: 'center',
      // fixed: 'left'3,
      width: 80,
      key: 'productNum',
      dataIndex: 'productNum'
    },
    {
      title: '拆分类型',
      align: 'center',
      width: 160,
      key: 'splitType',
      dataIndex: 'splitType',
      render: (_value, v, index) => {
        return (
          <div>
            {index === 0 ? (
              <Select
                placeholder="请选择拆分类型"
                defaultValue={splitType}
                style={{ width: 130 }}
                onChange={(e) => {
                  setSplitType(e)
                  setInitial({ name: 'splitType' })
                }}
              >
                {splitTypeData.map((item: any) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            ) : null}
          </div>
        )
      }
    },
    {
      title: '拆分数量',
      align: 'center',
      width: 160,
      dataIndex: 'productionAmount',
      key: 'productionAmount',

      render: (_value: any, _row: any) => {
        return (
          <>
            <div className={styles.remainingDuration}>
              <InputNumber
                controls={false}
                min={0}
                // disabled={_row.createPlanStatus}
                value={_value}
                max={_row.orderSum} //最大值是生产单总量
                onBlur={(e) => onBreakUp(e.target.value, _row, 1)}
              />

              <Tooltip
                color={'#fff'}
                onVisibleChange={onVisibleChange}
                trigger={'click'}
                visible={_row.type}
                placement="topLeft"
                title={
                  <ProductionAmountTree
                    setInitial={setInitial}
                    initial={initial}
                    allSelected={allSelected}
                    split={splitType}
                    row={_row}
                    selectSplitQuantity={selectSplitQuantity}
                  />
                }
                key={_row.id}
              >
                <span
                  onClick={() => {
                    displayTooltip(_row)
                  }}
                >
                  <img src={change} alt="" className={styles.imgChange} />
                </span>
              </Tooltip>
            </div>
          </>
        )
      }
    },
    {
      title: '已完成量',
      align: 'center',
      width: 120,
      dataIndex: 'completedAmount', //
      key: 'completedAmount',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <InputNumber
              defaultValue={_value}
              max={_row.productionAmount} //最大值是拆分数量
              onBlur={(e) => onBreakUp(e.target.value, _row, 2)}
            />
          </div>
        )
      }
    },
    {
      title: '工作车间',
      width: 150,
      align: 'center',
      dataIndex: 'shopId',
      key: 'shopId',

      render: (_value: any, _row: any) => {
        return (
          <div>
            <Select
              placeholder="请选择工作车间"
              defaultValue={_value}
              style={{ width: 120 }}
              // disabled={_row.createPlanStatus}
              onChange={(e) => handleChange(1, e, _row)}
            >
              {factoryName.map((item: any) => (
                // eslint-disable-next-line react/jsx-key
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
        )
      }
    },
    ,
    {
      title: '工作班组',
      align: 'center',
      width: 150,
      key: 'teamId',
      dataIndex: 'teamId',
      render: (_value: any, _row: any) => {
        return (
          <>
            <Select
              disabled={
                // _row.createPlanStatus === false
                _row.shopId ? false : true
                // : _row.createPlanStatus
              }
              // disabled={_row.createPlanStatus}
              placeholder="请选择工作班组"
              key={_value}
              defaultValue={_value}
              style={{ width: 120 }}
              onChange={(e) => handleChange(2, e, _row)}
            >
              {!isEmpty(_row.teamList)
                ? _row.teamList.map((item: any) => (
                    // eslint-disable-next-line react/jsx-key
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))
                : null}
            </Select>
          </>
        )
      }
    },
    {
      title: '选择效率模板',
      align: 'center',
      width: 150,
      dataIndex: 'templateId',
      key: 'templateId',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <Select
              placeholder="请选择效率模板"
              key={_value}
              defaultValue={_value}
              style={{ width: 120 }}
              onChange={(e) => handleChange(3, e, _row)}
            >
              {!isEmpty(_row.efficiency)
                ? _row.efficiency.map((item: any) => (
                    // eslint-disable-next-line react/jsx-key
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))
                : null}
            </Select>
          </div>
        )
      }
    },
    {
      title: '计划开始时间',
      align: 'center',
      width: 200,
      key: 'planStartTime',
      dataIndex: 'planStartTime',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <DatePicker
              allowClear={false}
              format="YYYY-MM-DD HH:mm"
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              onChange={(e) => {
                endTime(e, _row)
              }}
              value={_value ? moment(_value) : undefined}
            />
          </div>
        )
      }
    },

    {
      title: '计划结束时间',
      align: 'center',
      width: 200,
      key: 'planEndTime',
      dataIndex: 'planEndTime',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <DatePicker
              allowClear={false}
              format="YYYY-MM-DD HH:mm"
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              // defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
              value={_value ? moment(_value) : undefined}
              onChange={(e) => {
                time(2, e, _row)
              }}
            />
          </div>
        )
      }
    },

    {
      title: '是否锁定',
      align: 'center',
      fixed: 'right',
      width: 80,
      dataIndex: 'isLocked',
      key: 'isLocked',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <Checkbox
              checked={_value}
              onChange={(e) => onLock(e, _row)}
            ></Checkbox>
          </div>
        )
      }
    },

    {
      title: (
        <div>
          <Button onClick={increase} type="primary" icon={<PlusOutlined />} />
        </div>
      ),
      align: 'center',
      dataIndex: 'address',
      key: 'address',
      width: 80,
      fixed: 'right',
      render: (_value: any, _row: any, index: number) => {
        return (
          <div className={styles.flex}>
            {data.length > 1 ? (
              <Button
                onClick={() => reduce(_row.ids)}
                type="primary"
                icon={<MinusOutlined />}
              />
            ) : null}
          </div>
        )
      }
    }
  ]
  return (
    <div className={styles.popup}>
      <Modal
        width={1500}
        visible={isModalVisible}
        onOk={handleOk}
        destroyOnClose={true}
        onCancel={handleCancel}
      >
        <div className={styles.title}>缝制任务拆分</div>
        {/* {!isEmpty(data) ? ( */}
        <Table
          className={styles.table}
          bordered
          loading={load}
          columns={columns}
          scroll={{ x: 1500, y: 500 }}
          dataSource={data}
          rowKey={'key'}
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
        {/* // ) : null} */}
      </Modal>
      {/* <Details setDetailsPopup={setDetailsPopup} detailsPopup={detailsPopup} /> */}
    </div>
  )
}

export default BreakUp
