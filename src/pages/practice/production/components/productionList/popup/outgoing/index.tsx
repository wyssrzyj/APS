import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Table
} from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { productionSingleApis } from '@/recoil/apis'

import Forms from './forms'
// import Excl from '@/components/excel/Import/index'
import styles from './index.module.less'
import Popup from './Popup/index'

const Outgoing = (props: any) => {
  const {
    AllData,
    types,
    externalProduceOrderId,
    preservation,
    whetherEditor
  } = props
  const { processOutsourcing, wholeOrder } = productionSingleApis

  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const [params, setParams] = useState<any>({
    pageNum: pageNum,
    pageSize: pageSize
  })

  const [total, setTotal] = useState<number>(0)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editType, setEditType] = useState(false)
  const [outgoing, setOutgoing] = useState<any>()
  const [localData, setLocalData] = useState<any>([]) //本地数据
  const [localDataTrue, setLocalDataTrue] = useState<any>([]) //**本地数据 用于保存**
  const [list, setList] = useState<any>([]) //初始数据
  const [data, setData] = useState<any>([]) //处理后的数据
  const [factoryData, setFactoryData] = useState<any>([]) //筛选条件
  const [allData, setAllData] = useState<any>([]) //全部数据
  const [processedData, setProcessedData] = useState<any>([]) //处理后的数据

  interface Item {
    key: string
    name: string
    age: number
    address: string
  }

  const map = new Map()
  map.set('1', '裁剪')
  map.set('2', '缝制')
  map.set('3', '后整')
  map.set('4', '包装')
  map.set('5', '外发')
  map.set('6', '缝制线外组')

  const [form] = Form.useForm()

  useEffect(() => {
    setParams({ pageNum: pageNum, pageSize: pageSize })
  }, [pageNum, pageSize])

  //只保存选中的
  useEffect(() => {
    setLocalDataTrue(localData)
    // 传递出去
    preservation && preservation(localData)
  }, [localData])

  //接口
  useEffect(() => {
    if (externalProduceOrderId !== null) {
      getList(params)
    }
  }, [params, externalProduceOrderId])

  const getList = async (e) => {
    const res = await processOutsourcing({
      ...e,
      externalProduceOrderId: externalProduceOrderId
    })

    if (!isEmpty(res.records)) {
      // 添加 状态判断是否选中
      res.records.map(
        (item: { need: boolean; section: string; outTime: null }) => {
          item.need =
            item.section === '5' ? true : item.outTime !== null ? true : false
        }
      )
      setTotal(res.total)
      setList([...res.records])
    }
  }
  useEffect(() => {
    getAllData()
  }, [])
  //获取所有的数据
  const getAllData = async () => {
    const res = await processOutsourcing({
      pageNum: 1,
      pageSize: 1000,
      externalProduceOrderId: externalProduceOrderId
    })
    if (!isEmpty(res.records)) {
      // 添加 状态判断是否选中
      res.records.map(
        (item: { need: boolean; section: string; outTime: null }) => {
          item.need =
            item.section === '5' ? true : item.outTime !== null ? true : false
        }
      )
      setAllData(res.records)
    }
  }

  //  **判断接口数据中  是否有本地数据  有则替换 反之则 传递接口原始的**
  const oldAndNewFilter = (v: { idx: any }, total: any) => {
    const saveIndex = total.findIndex((item: any) => item.idx === v.idx)
    //替换
    if (saveIndex !== -1) {
      total.splice(saveIndex, 1, v)
      setData([...total])
    } else {
      setData([...total])
    }
  }
  useEffect(() => {
    if (!isEmpty(localDataTrue)) {
      localDataTrue.map((item: any) => {
        oldAndNewFilter(item, list)
      })
    } else {
      setData([...list])
    }
  }, [list, localDataTrue])

  //保存数据需要的是 全部数据中为true 的值
  //全部数据的处理 ------开始---
  const processedOldAndNewFilter = (v: { idx: any }, total: any) => {
    const saveIndex = total.findIndex((item: any) => item.idx === v.idx)
    //替换
    if (saveIndex !== -1) {
      total.splice(saveIndex, 1, v)
      setProcessedData([...total])
    } else {
      setProcessedData([...total])
    }
  }

  useEffect(() => {
    if (!isEmpty(localDataTrue)) {
      localDataTrue.map((item: any) => {
        processedOldAndNewFilter(item, allData)
      })
    } else {
      setProcessedData([...allData])
    }
    //判断接口数据中是否有本地 有替换
  }, [allData, localDataTrue])
  useEffect(() => {
    const needType = processedData.filter(
      (item: { need: boolean }) => item.need === true
    )
    AllData && AllData(needType)
  }, [processedData])
  //全部数据的处理 ------结束---

  const columns: any = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'idx',
      render: (
        _value:
          | boolean
          | React.ReactChild
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined,
        _row: any
      ) => {
        return <div className={styles.flex}>{_value}</div>
      }
    },
    {
      title: '工序名称',
      align: 'center',
      dataIndex: 'processName'
    },
    {
      title: '所属工段',
      align: 'center',
      dataIndex: 'section',
      render: (v: any) => {
        return <div>{map.get(v)}</div>
      }
    },
    {
      title: '工序耗时',
      align: 'center',
      dataIndex: 'secondPlan'
    },
    {
      title: '需要外发',
      align: 'center',
      dataIndex: 'need',
      render: (type: any, record: any, index: any) => {
        return (
          <>
            {record.section === '5' ? (
              <div className={styles.flex}>
                <Checkbox
                  disabled={types}
                  //   disabled={record.needDisabled}
                  checked={type}
                />
              </div>
            ) : (
              <div className={styles.flex}>
                <Checkbox
                  disabled={types}
                  //   disabled={record.needDisabled}
                  checked={type}
                  onChange={(e) => executionMethod(e, record)}
                />
              </div>
            )}
          </>
        )
      }
    },
    {
      title: '外发时间',
      align: 'center',
      dataIndex: 'outTime',
      editable: true,
      width: 200,
      render: (type: any, record: any, index: any) => {
        return (
          <div className={styles.flex}>
            {!record.need ? null : (
              <Input
                addonAfter="天"
                disabled={types}
                defaultValue={type}
                onChange={(e) => {
                  timeOutgoing(e, record)
                }}
                style={{ width: '50%' }}
              />
            )}
          </div>
        )
      }
    }
  ]

  //单选处理
  const executionMethod = (e: CheckboxChangeEvent, record: any) => {
    record.need = e.target.checked
    const sum = cloneDeep(data)
    const subscript = sum.findIndex((item: any) => item.idx === record.idx)
    sum.splice(subscript, 1, record)
    setData([...sum])
    localDataHandle(record)
  }

  let timer: NodeJS.Timeout
  //输入框处理
  const timeOutgoing = (e: any, record: any) => {
    record.outTime = e.target.value
    const sum = cloneDeep(data)
    const subscript = sum.findIndex((item: any) => item.idx === record.idx)
    sum.splice(subscript, 1, record)
    clearTimeout(timer)
    timer = setTimeout(() => {
      setData([...sum])
      localDataHandle(record)
    }, 500)
  }

  // *** 判断本地数组是否有 有添加反之且替换**
  const localDataHandle = (data: any) => {
    // 操作过的数据存起来且不能重复-》用于保存
    // 查看当前页的数据 是否有操作过的  有则替换
    // 存起来 提交的时候判断是否填写时间

    // 单条数据
    const cloneLocalData = cloneDeep(localData)

    const saveIndex = cloneLocalData.findIndex(
      (item: any) => item.idx === data.idx
    ) //找下表

    if (saveIndex === -1) {
      //添加
      cloneLocalData.push(data)
      setLocalData([...cloneLocalData])
    } else {
      //替换
      cloneLocalData.splice(saveIndex, 1, data) //处理后的数据
      setLocalData([...cloneLocalData])
    }
  }

  const showModal = async () => {
    const res = await wholeOrder({
      externalProduceOrderId: externalProduceOrderId
    })

    setOutgoing(res)

    setIsModalVisible(true)
  }
  const editHandle = () => {
    setEditType(true)
  }

  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
  }
  //头部form的数据
  const FormData = (e: any) => {
    setParams({ ...params, ...e })
  }
  return (
    <div className={styles.table}>
      <div className={styles.top}>生产单外发管理</div>

      <Forms factoryData={factoryData} FormData={FormData}></Forms>

      <Table
        rowKey={'idx'}
        scroll={{ y: 'calc(100vh - 500px)' }}
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          // disabled: types,
          //分页
          showSizeChanger: true,
          pageSize, //每页条数
          current: pageNum, //	当前页数
          total, //数据总数
          pageSizeOptions: ['5', '10', '20', '50'],
          onChange: onPaginationChange //获取当前页码是一个function
        }}
      />
      <div className={styles.outgoing}>
        <Button
          onClick={showModal}
          className={data.length > 0 ? styles.translate : styles.showModal}
          type="primary"
          disabled={types}
        >
          整单外发
        </Button>
        {whetherEditor === 2 ? <div className={styles.edit}>已编辑</div> : null}
      </div>
      {/* 弹窗 */}
      <Popup
        editHandle={editHandle}
        externalProduceOrderId={externalProduceOrderId}
        outgoing={outgoing}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  )
}

export default Outgoing
