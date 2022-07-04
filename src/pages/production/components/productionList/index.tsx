import { Button } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { CusDragTable } from '@/components'
import { Icon } from '@/components'
import { productionSingleApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { easySearch, tableColumns } from './conifgs'
import Forms from './forms'
import styles from './index.module.less'
import MovPopup from './movPopup'
import Popup from './popup'

function Production() {
  const { productionList, factoryList } = productionSingleApis

  const img =
    'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/aps/img.jpg'

  const map = new Map()
  map.set(1, '待计划')
  map.set(2, '已计划')
  map.set(3, '生产中')
  map.set(4, '生产完成')

  const [searchStatus, setSearchStatus] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [types, setType] = useState(false) //编辑或者查看
  const [formData, setFormData] = useState({})
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

  //操作
  tableColumns[tableColumns.length - 1].render = (_value: any, _row: any) => {
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
  tableColumns[1].render = (v) => {
    return (
      <div key={v} className={styles.tableColumnsImg}>
        <img
          className={styles.tableColumnsImg}
          src={v !== null ? v : img}
          alt=""
        />
      </div>
    )
  }
  //剩余工期
  tableColumns[9].render = (_text: any, record: any, index: number) => {
    return <div key={index}>{_text}</div>
  }
  tableColumns[9].sorter = true

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

  //头部form的数据
  const FormData = (e: any) => {
    if (e.factoryId !== undefined) {
      setFormData(e)
      setParams({ pageNum: 1, pageSize, ...e })
    } else {
      setFormData(e)
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

  const getSort = (_pagination, _filters, sorter) => {
    if (sorter.order !== undefined) {
      const sortType = sorter.order === 'ascend' ? 'asc' : 'desc'
      setParams({
        ...formData,
        sortField: 'orderDelivery',
        sortType: sortType
      })
    }

    tableChange && tableChange(_pagination, _filters, sorter)
  }
  return (
    <div className={styles.qualification}>
      <div className={styles.content}>
        <div className={searchStatus ? styles.formDisplay : styles.formHide}>
          <>
            <div className={styles.forms}>
              <Forms
                factoryData={factoryData}
                FormData={FormData}
                display="formDisplay"
              ></Forms>
            </div>
            <div
              onClick={() => {
                setSearchStatus(!searchStatus)
              }}
              className={styles.collect}
            >
              {searchStatus === true ? (
                <Icon type="jack-Icon_up" className={styles.previous} />
              ) : null}
            </div>
          </>
        </div>

        {searchStatus === false ? (
          <>
            <div className={styles.forms}>
              <div className={styles.forms}>
                <Forms
                  factoryData={factoryData}
                  FormData={FormData}
                  display="formHide"
                ></Forms>
              </div>
              <div className={styles.advancedSearch}>
                <Button
                  type="primary"
                  ghost
                  onClick={() => {
                    setSearchStatus(!searchStatus)
                  }}
                >
                  高级搜索
                </Button>
              </div>
            </div>
          </>
        ) : null}

        <CusDragTable
          storageField={'productionList'}
          columns={tableColumns}
          dataSource={data}
          rowKey={'key'}
          scroll={{ x: 1000 }}
          loading={loading}
          onChange={getSort}
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
  )
}

export default Production
