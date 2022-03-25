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

import { practice } from '@/recoil/apis'

// import Excl from '@/components/excel/Import/index'
import styles from './index.module.less'
import Popup from './Popup/index'

const Outgoing = (props: any) => {
  const { types, externalProduceOrderId, preservation } = props
  const { processOutsourcing, wholeOrder } = practice

  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: 10
  })
  const [total] = useState<number>(0)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editType, setEditType] = useState(false)
  const [outgoing, setOutgoing] = useState<any>()
  const [localData, setLocalData] = useState<any>([]) //本地数据
  const [localDataTrue, setLocalDataTrue] = useState<any>([]) //**本地数据-值为true 用于保存**

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
  const [list, setList] = useState<any>([])
  const [data, setData] = useState<any>([])
  useEffect(() => {
    setParams({ pageNum: pageNum, pageSize: pageSize })
  }, [pageNum, pageSize])

  useEffect(() => {
    const needType = localData.filter(
      (item: { need: boolean }) => item.need === true
    )
    setLocalDataTrue(needType)
  }, [localData])

  //接口
  useEffect(() => {
    if (externalProduceOrderId !== null) {
      getList()
    }
  }, [params, externalProduceOrderId, pageNum, pageSize])

  const getList = async () => {
    const res = await processOutsourcing({
      ...params,
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

      setList(res.records)
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
  //传递给父级
  useEffect(() => {
    preservation && preservation(localDataTrue)
  }, [localDataTrue])

  //  **判断接口数据中  是否有本地数据  有则替换**
  const oldAndNewFilter = (v: { idx: any }, total: any) => {
    const saveIndex = total.findIndex((item: any) => item.idx === v.idx)
    if (saveIndex !== -1) {
      total.splice(saveIndex, 1, v)
      setData([...total]) //处理后的数据
    } //处理后的数据
  }

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
      dataIndex: 'productName'
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
          <div className={styles.flex}>
            <Checkbox
              disabled={types}
              //   disabled={record.needDisabled}
              checked={type}
              onChange={(e) => executionMethod(e, record)}
            />
          </div>
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
    // 单条数据
    const saveIndex = localData.findIndex((item: any) => item.idx === data.idx) //找下表
    if (saveIndex === -1) {
      setLocalData([...localData, data])
    } else {
      localData.splice(saveIndex, 1, data) //处理后的数据
      setLocalData([...localData])
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
  return (
    <div className={styles.table}>
      <div className={styles.top}>生产单外发管理</div>

      <Table
        rowKey={'idx'}
        scroll={{ y: 'calc(100vh - 500px)' }}
        bordered
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          disabled: types,
          showSizeChanger: true,
          pageSize, //每页条数
          current: pageNum, //	当前页数
          total, //数据总数
          pageSizeOptions: ['10', '20', '50'],
          onChange: onPaginationChange //获取当前页码是一个function
        }}
      />
      <div>
        <Button
          onClick={showModal}
          className={styles.showModal}
          type="primary"
          disabled={types}
        >
          整单外发
        </Button>
        {editType === true ? <div className={styles.edit}>已编辑</div> : null}
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
