import { Button } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { AdvancedSearch, CusDragTable } from '@/components'
import noneImg from '@/imgs/noneImg.jpg'
import { productionPlanApis, productionSingleApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { easySearch, searchConfigs, tableColumns } from './conifgs'
import styles from './index.module.less'
import Popup from './popup'

const img = noneImg

const map = new Map()
map.set(1, '待计划')
map.set(2, '已计划')
map.set(3, '生产中')
map.set(4, '生产完成')

const productStatus = [
  { label: '待计划', value: 1 },
  { label: '已计划', value: 2 },
  { label: '生产中', value: 3 },
  { label: '生产完成', value: 4 }
]

const Production = () => {
  const { productionList } = productionSingleApis
  const { factoryList } = productionPlanApis

  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [facList, setFacList] = useState([])

  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [types, setType] = useState(false) //编辑或者查看
  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: 10
  })

  const [getDetailsId, setGetDetailsId] = useState() //工艺需要的id
  const [externalProduceOrderId, setExternalProduceOrderId] = useState() //外发需要的id
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
    ;(async () => {
      getFacList()
    })()
  }, [])

  const getFacList = async () => {
    try {
      const res: any = await factoryList()
      const { data = [] } = res
      data.forEach((item: any) => {
        item.label = item.deptName
        item.value = item.id
      })
      setFacList(data)
    } catch (err) {}
  }

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
  tableColumns[9].render = (_text: any, record: any, index: number) => {
    return <div key={index}>{_text}</div>
  }
  tableColumns[9].sorter = true

  useEffect(() => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[0]['options'] = facList
    nConfigs[4]['options'] = productStatus
    setConfigs(nConfigs)
  }, [facList])

  const refreshData = () => {
    getDataList && getDataList()
  }

  // eslint-disable-next-line no-sparse-arrays

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

  const getSort = (_pagination, _filters, sorter) => {
    if (sorter.order !== undefined) {
      const sortType = sorter.order === 'ascend' ? 'asc' : 'desc'
      setParams({
        ...params,
        sortField: 'orderDelivery',
        sortType: sortType
      })
    }

    tableChange && tableChange(_pagination, _filters, sorter)
  }

  const dealDate = (date: any[], index: number) => {
    return date ? moment(date[index]).valueOf() : null
  }

  const searchParamsChange = (values: Record<string, any>) => {
    const nParams: any = cloneDeep(params)

    Reflect.ownKeys(values).forEach((key: any) => {
      if (['endTime', 'startTime'].includes(key)) {
        if (key === 'startTime') {
          nParams.startPlanStartTime = dealDate(values.startTime, 0)
          nParams.endPlanStartTime = dealDate(values.startTime, 1)
        }
        if (key === 'endTime') {
          nParams.startPlanEndTime = dealDate(values.endTime, 0)
          nParams.endPlanEndTime = dealDate(values.endTime, 1)
        }
      } else {
        nParams[key] = values[key]
      }
    })

    if (nParams.planEndDate !== undefined && nParams.planEndDate !== null) {
      console.log(nParams.planEndDate)
      nParams.startPlanEndDate = moment(nParams.planEndDate[0]).valueOf()
      nParams.endPlanEndDate = moment(nParams.planEndDate[1]).valueOf()
    } else {
      nParams.startPlanEndDate = null
      nParams.endPlanEndDate = null
    }
    setParams(nParams)
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
      <div className={styles.content}>
        <AdvancedSearch
          easySearch={easySearch} //普通搜索
          configs={configs} //高级搜索
          params={params}
          callback={searchParamsChange}
        />

        <CusDragTable
          storageField={'productionList'}
          columns={tableColumns}
          dataSource={data}
          rowKey={'key'}
          scroll={{ x: 2000, y: '63vh' }}
          loading={loading}
          onChange={getSort}
          bordered={true} //边框线
          pagination={{
            showSizeChanger: true,
            pageSize: pageSize, //每页条数
            current: pageNum, //	当前页数
            total, //数据总数
            pageSizeOptions: ['10', '20', '50']
          }}
        />
        {isModalVisible && <Popup content={content} />}
      </div>
    </div>
  )
}

export default Production
