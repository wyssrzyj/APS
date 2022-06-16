import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { CusDragTable } from '@/components'
import { productionSingleApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

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

  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [types, setType] = useState(false) //编辑或者查看
  const [movIsModalVisible, setMovIsModalVisible] = useState(false) //删除弹窗
  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: 10
  })

  const [getDetailsId, setGetDetailsId] = useState() //工艺需要的id
  const [externalProduceOrderId, setExternalProduceOrderId] = useState() //外发需要的id
  const [factoryData, setFactoryData] = useState<any>([]) //工厂
  const [whetherEditor, setWhetherEditor] = useState<any>()
  const [data, setData] = useState<any>([])
  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, productionList)
  useEffect(() => {
    if (!isEmpty(dataSource)) {
      const cloneDataSource = cloneDeep(dataSource)
      cloneDataSource.map((item) => {
        item.id = item.externalProduceOrderId
        item.key = item.externalProduceOrderId
      })
      setData(cloneDataSource)
    } else {
      setData([])
    }
  }, [dataSource])

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
  const refreshData = () => {
    getDataList && getDataList()
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
      width: 100,
      dataIndex: 'factoryName'
    },
    {
      title: '产品名称',
      key: 'productName',
      align: 'center',
      width: 250,
      dataIndex: 'productName'
    },
    {
      title: '产品款号',
      key: 'productNum',
      align: 'center',
      dataIndex: 'productNum',
      width: 200
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
      dataIndex: 'orderSum',
      width: 100
    },
    {
      title: '计划完成日期',
      key: 'planEndDate',
      align: 'center',
      dataIndex: 'planEndDate',
      width: 170,

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
            {_row.status === 1 ? (
              <div
                className={styles.operation}
                onClick={() => editUser(true, _row)}
              >
                <div> 工艺外发</div>
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
        <div className={styles.content}>
          <div className={styles.forms}>
            <Forms factoryData={factoryData} FormData={FormData}></Forms>
          </div>
          <CusDragTable
            storageField={'productionList'}
            columns={columns}
            dataSource={data}
            rowKey={'key'}
            scroll={{ x: 1000 }}
            loading={loading}
            onChange={tableChange}
            pagination={{
              //分页
              showSizeChanger: true,
              // showQuickJumper: true, //是否快速查找.
              pageSize: pageSize, //每页条数
              current: pageNum, //	当前页数
              total, //数据总数
              // position: ['bottomCenter'], //居中
              pageSizeOptions: ['10', '20', '50']
            }}
          />
          {isModalVisible && <Popup content={content} />}
        </div>
      </div>
      {/* <MovPopup
        type="mov"
        movIsModalVisible={movIsModalVisible}
        setMovIsModalVisible={setMovIsModalVisible}
        movApi={movApi}
      /> */}
    </div>
  )
}

export default Production
