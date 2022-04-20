import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Checkbox,
  DatePicker,
  InputNumber,
  message,
  Modal,
  Select,
  Table
} from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import Item from 'antd/lib/list/Item'
import { cloneDeep, isElement } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { dockingDataApis, practice } from '@/recoil/apis'

import Details from './details/index'
import styles from './index.module.less'
const BreakUp = (props: any) => {
  const {
    setIsModalVisible,
    isModalVisible,
    workSplitList,
    breakSave,
    formData
  } = props
  const { workshopList, teamList, capacityList } = dockingDataApis

  const { splitMethod, breakQuery } = practice

  const { Option } = Select
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total] = useState<number>(0)
  const [data, setData] = useState<any>([])
  const [detailsPopup, setDetailsPopup] = useState<any>(false) //编辑详情

  const [factoryName, setFactoryName] = useState<any>([]) //车间
  const [workshopId, setWorkshopId] = useState<any>() //车间id
  const [teamName, setTeamName] = useState<any>([]) //班组
  const [capacityData, setCapacityData] = useState<any>([]) //x效率

  useEffect(() => {
    if (formData) {
      dataAcquisition(formData)
    }
  }, [formData])
  const dataAcquisition = async (e: any) => {
    const res = await workshopList({ factoryId: e })
    if (res) {
      res.map((item: { name: any; shopName: any }) => {
        item.name = item.shopName
      })
      setFactoryName(res)
    }

    const capacity = await capacityList()
    if (res) {
      capacity.map((item: { name: any; templateName: any }) => {
        item.name = item.templateName
      })
      setCapacityData(capacity)
    }
  }

  useEffect(() => {
    if (workshopId && workshopId) {
      console.log('formData', workshopId)
      teamData(formData, workshopId)
    }
  }, [workshopId, formData])
  const teamData = async (e: any, id: any) => {
    const team = await teamList({
      factoryId: e,
      shopMannagerId: id
    })
    if (team) {
      team.map((item: { name: any; teamName: any }) => {
        item.name = item.teamName
      })
      setTeamName(team)
    }
  }

  useEffect(() => {
    if (!isElement(workSplitList) && workSplitList !== undefined) {
      getInterfaceData(workSplitList)
    }
  }, [workSplitList])

  const getInterfaceData = async (data: any) => {
    console.log('生产单总量', data.orderSum)
    const theTotal = 2000
    // data.productionAmount = 100

    // data.id
    /// data.id
    const res = await breakQuery({ assignmentId: '1514764866136440833' })
    // const storage = []
    // for (let i = 0; i < 1; i++) {
    //   storage.push({
    //     id: i,
    //     key: i,
    //     ids: i,
    //     productNum: `Edward King ${i}`,
    //     productName: `Edward King ${i}`,
    //     planEndTime: 1649144899000,
    //     planStartTime: 1649058485000,
    //     completedAmount: 100, //已完成量
    //     templateId: '选择效率模板',
    //     age: 32,
    //     address: `London, Park Lane no. ${i}`,
    //     theTotal: 1000, //生产单总量
    //     productionAmount: 800,
    //     workshop: '1',
    //     team: '1',
    //     isLocked: true
    //   })
    // }
    res.map((item: any) => {
      item.isLocked = item.isLocked === 1 ? true : false
      item.ids = item.id //用于时间更改时的判断条件
    })
    res[0].theTotal = theTotal
    console.log('展示', res)
    setData(res)
    console.log('拆分数据', data.id)
  }
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const onChange = (e: { target: { checked: any } }) => {
    console.log(`checked = ${e.target.checked}`)
  }

  //替换数据
  const updateData = (
    record: {
      workshop?: any
      ids?: any
      team?: any
      efficiency?: any
      productionAmount?: any
      startTime?: number
      eddTime?: number
    },
    list: any
  ) => {
    /**
     * record 修改后的单个值.
     * list 老数据
     */
    const sum = cloneDeep(list)
    const subscript = sum.findIndex((item: any) => item.ids === record.ids)
    if (subscript !== -1) {
      sum.splice(subscript, 1, record)
      setData(sum)
    }
  }
  //单选的处理
  const onLock = (
    e: CheckboxChangeEvent,
    record: {
      isLocked?: any
      workshop?: any
      id?: any
      team?: any
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
  // 下拉处理
  const handleChange = (
    type: number,
    e: any,
    record: { workshop: any; id: any; team: any; efficiency: any }
  ) => {
    const sum = cloneDeep(data)
    //工作车间
    if (type === 1) {
      console.log('工作车间', e)
      setWorkshopId(e)

      record.workshop = e
      updateData(record, sum)
    }
    //工作班组
    if (type === 2) {
      record.team = e
      updateData(record, sum)
    }
    //效率模板
    if (type === 3) {
      record.efficiency = e
      updateData(record, sum)
    }
  }
  //数字输入框的处理
  let timeout: NodeJS.Timeout
  const onBreakUp = (
    e: any,
    record: {
      productionAmount: any
      completedAmount?: any
      workshop?: any
      id?: any
      team?: any
      efficiency?: any
      startTime?: number | undefined
      eddTime?: number | undefined
    },
    type: number
  ) => {
    const sum = cloneDeep(data)
    if (type === 1) {
      record.productionAmount = e
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        updateData(record, sum)
      }, 500)
    }
    if (type === 2) {
      record.completedAmount = e
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        updateData(record, sum)
      }, 500)
    }
  }
  //时间的处理
  const time = (
    type: number,
    e: moment.MomentInput,
    record: {
      planStartTime?: any
      planEndTime?: any
      workshop?: any
      id?: any
      team?: any
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
      record.planEndTime = moment(e).valueOf()
      updateData(record, sum)
    }
  }
  //增加
  const increase = () => {
    console.log('增加')
    const arr = cloneDeep(data)
    //拆分数量的总和
    const res = arr.reduce((total: any, current: { productionAmount: any }) => {
      total += current.productionAmount
      return total
    }, 0)
    const value = arr[0].theTotal - res
    if (value <= 0) {
      message.success('拆分数量以到达最大值')
    } else {
      arr.push({
        // key: Date.now(),
        ids: Date.now() * Math.random(),
        productionAmount: value,
        workshop: arr[0].workshop,
        team: arr[0].team,
        planStartTime: undefined,
        planEndTime: undefined,
        efficiency: arr[0].efficiency,
        isLocked: arr[0].isLocked,
        completedAmount: 0
      })
      setData([...arr])
    }
  }
  const reduce = (ids: any) => {
    const arr = cloneDeep(data)
    const res = arr.filter((item: { ids: any }) => item.ids !== ids)
    setData([...res])
  }

  // eslint-disable-next-line no-sparse-arrays
  const columns: any = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'name',
      render: (_value: any, _row: any, index: any) => {
        return <div>{index + 1}</div>
      }
    },
    {
      title: '生产单号',
      align: 'center',
      dataIndex: 'externalProduceOrderNum'
    },
    {
      title: '产品名称',
      align: 'center',
      dataIndex: 'productName'
    },
    {
      title: '产品款号',
      align: 'center',
      dataIndex: 'productNum'
    },
    {
      title: '生产单总量',
      width: 120,
      align: 'center',
      dataIndex: 'theTotal'
    },
    {
      title: '拆分数量',
      align: 'center',
      width: 120,
      dataIndex: 'productionAmount', //
      render: (_value: any, _row: any) => {
        return (
          <div>
            <InputNumber
              defaultValue={_value}
              max={_row.theTotal} //最大值是生产单总量
              onChange={(e) => onBreakUp(e, _row, 1)}
            />
          </div>
        )
      }
    },
    {
      title: '已完成量',
      align: 'center',
      width: 120,
      dataIndex: 'completedAmount', //
      render: (_value: any, _row: any) => {
        return (
          <div>
            <InputNumber
              defaultValue={_value}
              max={_row.productionAmount} //最大值是拆分数量
              onChange={(e) => onBreakUp(e, _row, 2)}
            />
          </div>
        )
      }
    },
    {
      title: '工作车间',
      width: 150,
      align: 'center',
      dataIndex: 'workshop',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <Select
              placeholder="请选择工作车间"
              defaultValue={_value}
              style={{ width: 120 }}
              onChange={(e) => handleChange(1, e, _row)}
            >
              {factoryName.map((item: any) => (
                // eslint-disable-next-line react/jsx-key
                <Option value={item.id}>{item.name}</Option>
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

      dataIndex: 'team',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <Select
              placeholder="请选择工作车间"
              defaultValue={_value}
              style={{ width: 120 }}
              onChange={(e) => handleChange(2, e, _row)}
            >
              {teamName.map((item: any) => (
                // eslint-disable-next-line react/jsx-key
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </div>
        )
      }
    },
    ,
    {
      title: '计划开始时间',
      align: 'center',
      width: 200,

      dataIndex: 'planStartTime',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <DatePicker
              allowClear={false}
              format="YYYY-MM-DD HH:mm"
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              onChange={(e) => {
                time(1, e, _row)
              }}
              defaultValue={_value ? moment(_value) : undefined}
            />
            {/* <DatePicker
              format="YYYY-MM-DD HH:mm"
              defaultValue={_value ? moment(_value) : undefined}
              onChange={(e) => {
                time(1, e, _row)
              }}
            /> */}
          </div>
        )
      }
    },
    ,
    {
      title: '计划结束时间',
      align: 'center',
      width: 200,

      dataIndex: 'planEndTime',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <DatePicker
              allowClear={false}
              format="YYYY-MM-DD HH:mm"
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              // defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
              defaultValue={_value ? moment(_value) : undefined}
              onChange={(e) => {
                time(2, e, _row)
              }}
            />
          </div>
        )
      }
    },
    {
      title: '选择效率模板',
      align: 'center',
      width: 150,

      dataIndex: 'templateId',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <Select
              placeholder="请选择效率模板"
              defaultValue={_value}
              style={{ width: 120 }}
              onChange={(e) => handleChange(3, e, _row)}
            >
              {capacityData.map((item: any) => (
                // eslint-disable-next-line react/jsx-key
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </div>
        )
      }
    },
    {
      title: '是否锁定',
      align: 'center',
      fixed: 'right',
      dataIndex: 'isLocked',
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
    // {
    //   title: '操作99999',
    //   align: 'center',
    //   fixed: 'right',
    //   dataIndex: 'lock',
    //   render: (_value: any) => {
    //     return (
    //       <div
    //         className={styles.text}
    //         onClick={() => {
    //           setDetailsPopup(true)
    //         }}
    //       >
    //         编辑详情
    //       </div>
    //     )
    //   }
    // },
    {
      title: (
        <div>
          <Button onClick={increase} type="primary" icon={<PlusOutlined />} />
        </div>
      ),
      align: 'center',
      dataIndex: 'address',
      fixed: 'right',
      render: (_value: any, _row: any, index: number) => {
        return (
          <div className={styles.flex}>
            {index !== 0 ? (
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
  // 保存事件
  const handleOk = async () => {
    const arr = cloneDeep(data)
    //时间的过滤
    const state = { timeState: false, number: false }
    console.log('总', arr)

    const Time = arr.filter(
      (item: { planStartTime: undefined; planEndTime: undefined }) =>
        item.planStartTime === undefined || item.planEndTime === undefined
    )
    console.log('时间', Time)

    if (Time.length > 0) {
      message.warning(`时间不能为空`)
    } else {
      state.timeState = true
    }
    // 拆分数量
    const res = arr.reduce((total: any, current: { productionAmount: any }) => {
      total += current.productionAmount
      return total
    }, 0)
    const value = res - arr[0].theTotal
    if (value !== 0) {
      if (value < 0) {
        message.warning(`拆分数量总和未满足订单总量 剩余-【${value}】`)
      } else {
        message.warning(`拆分数量总和 超出订单总量 超出-【${Math.abs(value)}】`)
      }
    } else {
      state.number = true
    }

    console.log('用于判断是否全部满足', state)
    if (state.timeState === true && state.number === true) {
      console.log('数据处理完毕，传给后台', arr)
      arr.map((item: any) => {
        item.isLocked = item.isLocked === true ? 1 : 0
      })
      const sum = await splitMethod({
        assignmentId: '1514764866136440833',
        data: arr
      })
      console.log('保存', sum)
      breakSave && breakSave()
    }
  }

  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
  }

  return (
    <div className={styles.popup}>
      <Modal
        width={1500}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          className={styles.table}
          bordered
          columns={columns}
          scroll={{ x: 1500, y: 500 }}
          dataSource={data}
          rowKey={'id'}
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
      </Modal>
      <Details setDetailsPopup={setDetailsPopup} detailsPopup={detailsPopup} />
    </div>
  )
}

export default BreakUp
