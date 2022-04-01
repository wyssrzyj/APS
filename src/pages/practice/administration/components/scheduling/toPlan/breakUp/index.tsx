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
import { cloneDeep } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import Details from './details/index'
import styles from './index.module.less'
const BreakUp = (props: any) => {
  const { setIsModalVisible, isModalVisible } = props

  const { Option } = Select
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total] = useState<number>(0)
  const [data, setData] = useState<any>([])
  const [detailsPopup, setDetailsPopup] = useState<any>(false) //编辑详情

  useEffect(() => {
    getInterfaceData()
  }, [])

  const getInterfaceData = () => {
    const storage = []
    for (let i = 0; i < 1; i++) {
      storage.push({
        id: i,
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
        production: 1000,
        breakUp: 800,
        workshop: '1',
        team: '1',
        efficiency: '1'
      })
    }
    setData(storage)
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
      id?: any
      team?: any
      efficiency?: any
      breakUp?: any
      startTime?: number
      eddTime?: number
    },
    list: any
  ) => {
    /**
     * record 修改后的单个值
     * list 老数据
     */
    const sum = cloneDeep(list)
    const subscript = sum.findIndex((item: any) => item.id === record.id)
    if (subscript !== -1) {
      sum.splice(subscript, 1, record)
      setData(sum)
    }
  }
  //单选的处理
  const onLock = (
    e: CheckboxChangeEvent,
    record: {
      lock?: any
      workshop?: any
      id?: any
      team?: any
      efficiency?: any
      breakUp?: any
      startTime?: number | undefined
      eddTime?: number | undefined
    }
  ) => {
    const sum = cloneDeep(data)
    record.lock = e.target.checked
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
  const onBreakUp = (e: any, record: { breakUp: any; id: any }) => {
    const sum = cloneDeep(data)
    record.breakUp = e
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      updateData(record, sum)
    }, 500)
  }
  //时间的处理
  const time = (
    type: number,
    e: moment.MomentInput,
    record: { startTime: number; eddTime: number }
  ) => {
    const sum = cloneDeep(data)
    if (type === 1) {
      record.startTime = moment(e).valueOf()
      updateData(record, sum)
    }
    if (type === 2) {
      record.eddTime = moment(e).valueOf()
      updateData(record, sum)
    }
  }
  //增加
  const increase = () => {
    console.log('增加')
    const arr = cloneDeep(data)
    //拆分数量的总和
    const res = arr.reduce((total: any, current: { breakUp: any }) => {
      total += current.breakUp
      return total
    }, 0)
    const value = arr[0].production - res
    if (value === 0) {
      message.success('拆分数量以到达最大值')
    } else {
      arr.push({
        key: new Date(),
        breakUp: value,
        workshop: arr[0].workshop,
        team: arr[0].team,
        startTime: arr[0].startTime,
        eddTime: arr[0].eddTime,
        efficiency: arr[0].efficiency
      })
      setData([...arr])
    }
  }
  const reduce = (id: any) => {
    const arr = cloneDeep(data)
    const res = arr.filter((item: { id: any }) => item.id !== id)
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
      dataIndex: 'age'
    },
    {
      title: '产品',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '产品款号',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '生产单总量',
      align: 'center',
      dataIndex: 'production'
    },
    {
      title: '拆分数量',
      align: 'center',
      width: 150,
      dataIndex: 'breakUp', //
      render: (_value: any, _row: any) => {
        return (
          <div>
            <InputNumber
              defaultValue={_value}
              max={_row.production} //最大值是生产单总量
              onChange={(e) => onBreakUp(e, _row)}
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
            {_value ? (
              <Select
                defaultValue={_value}
                style={{ width: 120 }}
                onChange={(e) => handleChange(1, e, _row)}
              >
                <Option value="1">工作车间1</Option>
                <Option value="2">工作车间2</Option>
                <Option value="3">工作车间3</Option>
              </Select>
            ) : null}
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
            {_value ? (
              <Select
                defaultValue={_value}
                style={{ width: 120 }}
                onChange={(e) => handleChange(2, e, _row)}
              >
                <Option value="1">工作班组1</Option>
                <Option value="2">工作班组2</Option>
                <Option value="3">工作班组3</Option>
              </Select>
            ) : null}
          </div>
        )
      }
    },
    ,
    {
      title: '计划开始时间',
      align: 'center',
      width: 200,

      dataIndex: 'startTime',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <DatePicker
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

      dataIndex: 'eddTime',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <DatePicker
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

      dataIndex: 'efficiency',
      render: (_value: any, _row: any) => {
        return (
          <div>
            {_value ? (
              <Select
                defaultValue={_value}
                style={{ width: 120 }}
                onChange={(e) => handleChange(3, e, _row)}
              >
                <Option value="1">效率模板1</Option>
                <Option value="2">效率模板2</Option>
                <Option value="3">效率模板3</Option>
              </Select>
            ) : null}
          </div>
        )
      }
    },
    {
      title: '是否锁定',
      align: 'center',
      fixed: 'right',
      dataIndex: 'lock',
      render: (_value: any, _row: any) => {
        return (
          <div>
            <Checkbox onChange={(e) => onLock(e, _row)}></Checkbox>
          </div>
        )
      }
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      dataIndex: 'lock',
      render: (_value: any) => {
        return (
          <div
            className={styles.text}
            onClick={() => {
              setDetailsPopup(true)
            }}
          >
            编辑详情
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
      fixed: 'right',
      render: (_value: any, _row: any, index: number) => {
        return (
          <div className={styles.flex}>
            {index !== 0 ? (
              <Button
                onClick={() => reduce(_row.id)}
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
  const handleOk = () => {
    const arr = cloneDeep(data)
    //时间的过滤
    const state = { timeState: false, number: false }
    const Time = arr.filter(
      (item: { startTime: undefined; eddTime: undefined }) =>
        item.startTime === undefined || item.eddTime === undefined
    )
    if (Time.length > 0) {
      message.warning(`时间不能为空`)
    } else {
      state.timeState = true
    }
    // 拆分数量

    const res = arr.reduce((total: any, current: { breakUp: any }) => {
      total += current.breakUp
      return total
    }, 0)
    const value = arr[0].production - res
    if (value !== 0) {
      message.warning(`拆分数量未满足订单总量 剩余-【${value}】`)
    } else {
      state.number = true
    }

    console.log('用于判断是否全部满足', state)
    if (state.timeState === true && state.number === true) {
      console.log()

      console.log('数据处理完毕，传给后台')
      console.log(arr)

      //   setIsModalVisible(false)
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
      </Modal>
      <Details setDetailsPopup={setDetailsPopup} detailsPopup={detailsPopup} />
    </div>
  )
}

export default BreakUp
