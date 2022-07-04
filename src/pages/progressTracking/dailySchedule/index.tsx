// import './animate.css'

import { Button, message, Modal } from 'antd'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { SetStateAction, useEffect, useState } from 'react'

import { Icon } from '@/components'
import { CusDragTable, SearchBar } from '@/components'
import { dailySchedule, productionPlanApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { easySearch, searchConfigs, tableColumns } from './conifgs'
import styles from './index.module.less'
import ScheduleModal from './scheduleModal/index'

const { factoryList, getWorkshopSectionList } = productionPlanApis
const { pageList } = dailySchedule

const img =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/aps/img.jpg'

const productStatus = [
  { label: '待计划', value: 1 },
  { label: '已计划', value: 2 },
  { label: '生产中', value: 3 },
  { label: '生产完成', value: 4 }
]

function ProductionPlan() {
  tableColumns[tableColumns.length - 1].render = (
    _text: any,
    record: any,
    index: number
  ) => {
    return (
      <div key={index}>
        <Button
          type="link"
          onClick={() => {
            handleDetailInfo(record)
            setCurrent(record)
          }}
        >
          编辑
        </Button>
      </div>
    )
  }
  //剩余工期
  tableColumns[8].render = (_text: any, record: any, index: number) => {
    return <div key={index}>{_text}</div>
  }
  tableColumns[8].sorter = true
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

  const [params, setParams] = useState<any>({
    pageSize: 10,
    pageNum: 1
  })
  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [facList, setFacList] = useState([])
  const [searchStatus, setSearchStatus] = useState(false)
  const [workshopSectionList, setWorkshopSectionList] = useState([])
  const [current, setCurrent] = useState() //当前行

  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, pageList)

  useEffect(() => {
    ;(async () => {
      getFacList()
      getWorkshopSectionListInfo()
    })()
  }, [])

  useEffect(() => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[0]['options'] = facList
    nConfigs[4]['options'] = productStatus
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
    setParams(nParams)
  }

  const handleDetailInfo = async (rowInfo: any) => {
    try {
      toggleModalVisible(true)
    } catch (err) {}
  }

  const toggleModalVisible = (visible: boolean) => {
    setIsModalVisible(visible)
  }

  const TableLeft = () => {
    return <></>
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
  const handleOk = async () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div className={styles.qualification}>
      <div className={searchStatus ? styles.formDisplay : styles.formHide}>
        <>
          <div className={styles.forms}>
            <SearchBar
              configs={configs}
              params={params}
              callback={searchParamsChange}
            ></SearchBar>
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
            <SearchBar
              configs={easySearch}
              params={params}
              callback={searchParamsChange}
            ></SearchBar>
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

      <div>
        <CusDragTable
          storageField={'dailySchedule'}
          cusBarLeft={TableLeft}
          columns={tableColumns}
          dataSource={dataSource}
          rowKey={'id'}
          scroll={{ x: 2000, y: 500 }}
          onChange={getSort}
          // onChange={}
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
          title="日排程计划"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
        >
          <ScheduleModal current={current} />
        </Modal>
      ) : null}
    </div>
  )
}

export default ProductionPlan
