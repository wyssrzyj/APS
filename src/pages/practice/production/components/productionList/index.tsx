import { Table } from 'antd'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { Title } from '@/components'
import { productionSingleApis } from '@/recoil/apis'

import Dome from './dome'
import Forms from './forms'
import styles from './index.module.less'
import MovPopup from './movPopup'
import Popup from './popup'

function Production() {
  const { productionList, factoryList } = productionSingleApis
  const map = new Map()
  map.set(1, '待计划')
  map.set(2, '已计划')
  map.set(3, '生产中')
  map.set(4, '生产完成')

  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [types, setType] = useState(false) //编辑或者查看
  const [movIsModalVisible, setMovIsModalVisible] = useState(false) //删除弹窗
  const [loading, setLoading] = useState(true) //删除弹窗
  const defaultPageSize = 10
  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize
  })

  const [getDetailsId, setGetDetailsId] = useState() //工艺需要的id
  const [externalProduceOrderId, setExternalProduceOrderId] = useState() //外发需要的id
  const [list, setList] = useState([])
  const [factoryData, setFactoryData] = useState<any>([]) //工厂
  const [whetherEditor, setWhetherEditor] = useState<any>([])

  //工厂名称
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res: any = await factoryList()
    const arr: any = res.data

    if (res.code === 200) {
      arr.map((item: { name: any; deptName: any }) => {
        item.name = item.deptName
      })
      setFactoryData(arr)
    }
  }

  useEffect(() => {
    api(params)
  }, [params])

  const refreshData = () => {
    api(params)
  }

  const api = async (item: any) => {
    //计划完成日期
    if (item.planEndDate) {
    } else {
      item.endPlanEndDate = null
      item.startPlanEndDate = null
    }

    const arr: any = await productionList(item)
    if (!isEmpty(arr.records)) {
      setTotal(arr.total)
      setLoading(false)
      arr.records.map((item: any) => {
        item.id = `${item.productId + Math.random()}` //后端没有成成id 这里自己做处理 防止key值重复
      })
      const arrData = arr.records
      setList([...arrData])
    } else {
      setList([])
    }
  }

  // eslint-disable-next-line no-sparse-arrays
  const columns: any = [
    {
      title: '生产单号',
      align: 'center',
      key: 'externalProduceOrderNum',
      dataIndex: 'externalProduceOrderNum'
    },
    // {
    //   title: '销售单号',
    //   key: 'orderNum',
    //   align: 'center',
    //   dataIndex: 'orderNum'
    // },
    {
      title: '接单工厂',
      key: 'factoryName',
      align: 'center',
      dataIndex: 'factoryName'
    },
    {
      title: '产品名称',
      key: 'productName',
      align: 'center',
      dataIndex: 'productName'
    },
    {
      title: '产品款号',
      key: 'productNum',
      align: 'center',
      dataIndex: 'productNum'
    },
    {
      title: '客户款号',
      key: 'productClientNum',
      align: 'center',
      dataIndex: 'productClientNum'
    },
    {
      title: '生产单总量',
      key: 'orderSum',
      align: 'center',
      dataIndex: 'orderSum'
    },
    {
      title: '计划完成日期',
      key: 'planEndDate',
      align: 'center',
      dataIndex: 'planEndDate',
      render: (v: any) => {
        return <div>{moment(v).format('YYYY-MM-DD')}</div>
      }
    },
    {
      title: '外发情况',
      key: 'outsourceType',
      align: 'center',
      dataIndex: 'outsourceType',
      render: (v: any) => {
        return <div>{v === 1 ? '工序外发' : v === 2 ? '整单外发' : null}</div>
      }
    },
    ,
    {
      title: '延期情况',
      key: 'delayType',
      align: 'center',
      dataIndex: 'delayType',
      render: (v: any) => {
        return <div>{v === 1 ? '正常' : v === 2 ? '已延期' : null}</div>
      }
    },
    ,
    {
      title: '生产单状态',
      key: 'status',
      align: 'center',
      dataIndex: 'status',
      render: (v: any) => {
        return <div>{map.get(v)}</div>
      }
    },
    ,
    {
      title: '操作',
      align: 'center',
      dataIndex: 'address',
      render: (_value: any, _row: any) => {
        return (
          <div className={styles.flex}>
            <div
              className={styles.operation_item}
              onClick={() => editUser(false, _row)}
            >
              查看
            </div>
            {_row.status !== 2 ? (
              <div
                className={styles.operation}
                onClick={() => editUser(true, _row)}
              >
                <div> 工艺</div>
                <div> 外发</div>
              </div>
            ) : null}
          </div>
        )
      }
    }
  ]

  //头部form的数据
  const FormData = (e: any) => {
    if (e.factoryId !== undefined) {
      setParams({ pageNum: 1, pageSize, ...e })
    } else {
      setParams({ pageNum, pageSize, ...e })
    }
  }
  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
    setParams({ ...params, pageNum: page, pageSize: pageSize })
  }
  const editUser = (type: boolean, row: any) => {
    setWhetherEditor(row.outsourceType)

    setGetDetailsId(row.externalProduceOrderId)
    setExternalProduceOrderId(row.externalProduceOrderId)
    if (type === true) {
      setType(false)
      setIsModalVisible(true)
    } else {
      setType(true)
      setIsModalVisible(true)
    }
  }

  const movApi = () => {
    console.log('删除逻辑')
  }
  const content = {
    whetherEditor,
    setGetDetailsId,
    isModalVisible,
    setIsModalVisible,
    refreshData,
    types,
    getDetailsId,
    externalProduceOrderId
  }
  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'生产单列表'} />
      </div>
      <div></div>
      <div>
        <div className={styles.content}>
          <Forms factoryData={factoryData} FormData={FormData}></Forms>
          <Table
            className={styles.table}
            columns={columns}
            dataSource={list}
            loading={loading}
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
          <Popup content={content} />
        </div>
      </div>
      <MovPopup
        type="mov"
        movIsModalVisible={movIsModalVisible}
        setMovIsModalVisible={setMovIsModalVisible}
        movApi={movApi}
      />
    </div>
  )
}

export default Production
