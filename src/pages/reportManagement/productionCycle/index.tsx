// import './animate.css'

import { Button, message, Modal, Popover, Tag } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { SetStateAction, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { CusDragTable, SearchBar } from '@/components'
import { actualProductionApis, productionPlanApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { searchConfigs, tableColumns } from './conifgs'
import styles from './index.module.less'
import Popup from './popup'
import ScheduleModal from './scheduleModal/index'

const {
  productList,
  exportProductList,
  productDetail,

  factoryList,
  getWorkshopSectionList,
  makeSewingPlan
} = productionPlanApis

const { efficiencyList } = actualProductionApis
const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'

const productStatus = [
  { label: '待计划', value: 1 },
  { label: '已计划', value: 2 },
  { label: '生产中', value: 3 },
  { label: '生产完成', value: 4 }
]
function ProductionPlan() {
  const location = useLocation()
  const { state }: any = location

  const [params, setParams] = useState<any>({
    pageSize: 10,
    pageNum: 1
  })
  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [data, setData] = useState<any[]>() //表头数据

  const [surfaceDataSource, setSurfaceDataSource] = useState<any[]>() //总数据
  // const [dynamicMeter, setDynamicMeter] = useState<any[]>(tableColumns)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [newlyAdded, setNewlyAdded] = useState(false) //新增

  const [rowInfo, setRowInfo] = useState() //展示弹窗

  const [facList, setFacList] = useState([])
  const [workshopSectionList, setWorkshopSectionList] = useState([])
  const [detailsPopup, setDetailsPopup] = useState<any>(false) //编辑详情
  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, efficiencyList)
  const [editData, setEditData] = useState<any>() //编辑数据
  // const [urlState, setUrlState] = useState<any>()
  useEffect(() => {
    // if()
    if (state !== null) {
      const id = state.id
      setParams({ ...params, externalProduceOrderNum: id })
    }
  }, [state])

  useEffect(() => {
    getHeaderData()
  }, [])
  //动态表头
  const getHeaderData = () => {
    const sum = [1, 2]
    const list = []
    sum.forEach((item) => {
      list.push({
        title: `${item}`,
        align: 'center',
        dataIndex: `${item}`,
        key: `${item}`,
        width: 100
      })
    })

    setData(data)
    // setDynamicMeter([...tableColumns])
  }
  //处理数据格式
  useEffect(() => {
    const list = [
      {
        factoryName: '工厂名称',
        externalProduceOrderNum: '生产单号',
        customerName: '客户名称',
        productName: '客户款号',
        customerAccount: '产品名称',
        productAccount: '产品款号',
        img: '款图',
        shopName: '订单数量',
        teamName: '承诺交期',
        planStartTime: '面料齐料日期',
        cropStartDate: '裁剪-开始日期',
        cropEndDate: '裁剪-结束日期',
        completedQuantity: '裁剪-完成数量',
        auxiliaryMaterialDate: '辅料齐料日期',
        StartDate: '绣印花染色-开始日期',
        EndDate: '绣印花染色-结束日期',
        team: '裁剪-班组',
        numberPersons: '裁剪-人数',
        sewStartDate: '裁剪-开始日期',
        sewEndDate: '裁剪-结束日期',
        sewCompletedQuantity: '裁剪-完成数量',
        sewCompletionRate: '裁剪-完成率',
        adjustmentStartDate: '后整-开始日期',
        adjustmentEndDate: '后整-结束日期',
        adjustmentQuantity: '后整-完成数量',
        adjustmentCompletionRate: '后整-完成率'
      }
    ]
    setSurfaceDataSource(list)
  }, [])

  // 动态表头
  // console.log(dynamicMeter)

  useEffect(() => {
    ;(async () => {
      getFacList()
      getWorkshopSectionListInfo()
    })()
  }, [])

  useEffect(() => {
    const nConfigs: any[] = cloneDeep(configs)
    // nConfigs[0]['options'] = facList
    // nConfigs[4]['options'] = productStatus
    setConfigs(nConfigs)
  }, [facList, workshopSectionList])

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

  const getWorkshopSectionListInfo = async () => {
    try {
      const data: any = await getWorkshopSectionList()
      data.forEach((item: any) => {
        item.label = item.dictLabel
        item.value = item.dictValue
      })
      setWorkshopSectionList(data)
    } catch (err) {}
  }

  const dealDate = (date: any[], index: number) => {
    // return date ? moment(date[index]).format(FORMAT_DATE) : null
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
    console.log('for的数据', nParams)

    setParams(nParams)
  }

  const exportFile = () => {
    exportProductList({
      ...params
    }).then((res: any) => {
      const blob = new Blob([res], { type: 'application/octet-stream' })
      const download = document.createElement('a')
      download.href = window.URL.createObjectURL(blob)
      download.download = `生产计划.xls`
      download.click()
      window.URL.revokeObjectURL(download.href)
    })
  }

  const handleDetailInfo = async (rowInfo: any) => {
    try {
      const res = await productDetail({ id: rowInfo.id })
      if (res) {
        setRowInfo(res)
        toggleModalVisible(true)
      }
    } catch (err) {}
  }

  const toggleModalVisible = (visible: boolean) => {
    setIsModalVisible(visible)
  }

  const rowSelection:
    | {
        selectedRowKeys: never[]
        onChange: (selectedRowKeys: SetStateAction<never[]>) => void
      }
    | any = {
    selectedRowKeys,
    onChange: (selectedRowKeys: SetStateAction<never[]>) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  const update = async () => {
    console.log('更新数据')

    getDataList && getDataList()
    // const arr = await productList(params)
  }

  const TableLeft = () => {
    return (
      <>
        <Button type="primary" onClick={exportFile}>
          导出
        </Button>
      </>
    )
  }
  const getSort = (_pagination, _filters, sorter) => {
    const sortType =
      sorter.order === 'ascend'
        ? { sortType: 'asc' }
        : sorter.order === 'descend'
        ? { sortType: 'desc' }
        : { sortType: '' }
    setParams({ ...params, ...sortType })
    // tableChange()
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const updateMethod = (e) => {
    console.log(e)
  }
  const content = {
    // formData,
    updateMethod,
    newlyAdded,
    setNewlyAdded
    // setEdit
  }
  return (
    <div className={styles.qualification}>
      <div>周期报表</div>
      <div className={styles.forms}>
        <SearchBar
          configs={configs}
          params={params}
          callback={searchParamsChange}
        ></SearchBar>
      </div>
      <div>
        <CusDragTable
          storageField={'productionCycle'}
          rowSelection={rowSelection}
          cusBarLeft={TableLeft}
          columns={tableColumns}
          dataSource={surfaceDataSource}
          rowKey={'key'}
          scroll={{ x: 1000 }}
          onChange={getSort}
          pagination={{
            //分页
            showSizeChanger: true,
            // showQuickJumper: true, //是否快速查找
            pageSize, //每页条数
            current: pageNum, //	当前页数
            total, //数据总数
            pageSizeOptions: ['10', '20', '50']
          }}
        />
      </div>
      {isModalVisible ? (
        <Modal
          width={1000}
          centered={true}
          title="生产预警"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <ScheduleModal />
        </Modal>
      ) : null}
      {newlyAdded ? <Popup content={content} /> : null}
    </div>
  )
}

export default ProductionPlan
