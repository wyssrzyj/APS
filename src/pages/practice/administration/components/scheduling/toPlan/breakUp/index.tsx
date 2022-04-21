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
import { cloneDeep, isElement, isEmpty } from 'lodash'
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
    formData,
    capacityData,
    teamName
  } = props
  const { workshopList, teamList } = dockingDataApis

  const { splitMethod, breakQuery } = practice

  const { Option } = Select
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total] = useState<number>(0)
  const [data, setData] = useState<any>([])
  const [detailsPopup, setDetailsPopup] = useState<any>(false) //编辑详情

  const [factoryName, setFactoryName] = useState<any>([]) //车间
  const [workshopId, setWorkshopId] = useState<any>() //车间id

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
    if (!isElement(workSplitList) && workSplitList !== undefined) {
      getInterfaceData(workSplitList)
    }
  }, [workSplitList])

  const getInterfaceData = async (data: any) => {
    // data.id
    /// data.id

    const res = await breakQuery({ assignmentId: data.id })
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
    //     orderSum: 1000, //生产单总量
    //     productionAmount: 800,
    //     shopId: '1',
    //     teamId: '1',
    //     isLocked: true
    //   })
    // }
    console.log('数据-------------------------------', res)
    if (!isEmpty(res)) {
      res.map((item: any) => {
        item.isLocked = item.isLocked === 1 ? true : false
        item.orderSum = data.orderSum
        item.ids = item.id //用于时间更改时的判断条件
        item.key = item.id //用于时间更改时的判断条件
      })
      setData(res)
    } else {
      delete data.id //防止 id和父级一样
      delete data.children
      setData([data])
    }
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
      shopId?: any
      ids?: any
      teamId?: any
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
  // 下拉处理
  const handleChange = (
    type: number,
    e: any,
    record: { shopId: any; id: any; teamId: any; templateId: any }
  ) => {
    const sum = cloneDeep(data)
    //工作车间
    if (type === 1) {
      console.log('工作车间', e)
      setWorkshopId(e)
      record.shopId = e
      updateData(record, sum)
    }
    //工作班组
    if (type === 2) {
      record.teamId = e
      updateData(record, sum)
    }
    //效率模板
    if (type === 3) {
      record.templateId = e
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
    const value = arr[0].orderSum - res
    if (value <= 0) {
      message.success('拆分数量以到达最大值')
    } else {
      arr.push({
        // key: Date.now(),
        ids: Date.now() * Math.random(),
        productionAmount: value,
        shopId: arr[0].shopId,
        teamId: arr[0].teamId,
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
      fixed: 'left',
      width: 80,
      dataIndex: 'name',
      key: 'name',
      render: (_value: any, _row: any, index: any) => {
        return <div>{index + 1}</div>
      }
    },
    {
      title: '生产单号',
      align: 'center',
      fixed: 'left',
      width: 80,
      key: 'externalProduceOrderNum',
      dataIndex: 'externalProduceOrderNum'
    },
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
      title: '拆分数量',
      align: 'center',
      width: 120,
      dataIndex: 'productionAmount', //
      key: 'productionAmount',

      render: (_value: any, _row: any) => {
        return (
          <div>
            <InputNumber
              defaultValue={_value}
              max={_row.orderSum} //最大值是生产单总量
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
      key: 'completedAmount',
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
      dataIndex: 'shopId',
      key: 'shopId',

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
      key: 'teamId',
      dataIndex: 'teamId',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <Select
              disabled={workshopId === undefined ? true : false}
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
      key: 'templateId',
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
            {console.log('单选', _value)}
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
      key: 'address',
      width: 80,
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
    const value = res - arr[0].orderSum
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
        assignmentId: workSplitList.id,
        data: arr
      })
      console.log(sum)
      if (sum) {
        breakSave && breakSave()
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
