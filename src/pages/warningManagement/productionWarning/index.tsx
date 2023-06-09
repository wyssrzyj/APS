// import './animate.css'

import { Button, message, Modal, Popover, Tag } from 'antd'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { SetStateAction, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { Icon } from '@/components'
import { AdvancedSearch, CusDragTable, SearchBar } from '@/components'
import noneImg from '@/imgs/noneImg.jpg'
import { dockingData } from '@/recoil'
import { productionWarning } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { easySearch, searchConfigs, tableColumns } from './conifgs'
import styles from './index.module.less'
import Popup from './popup'
import ScheduleModal from './scheduleModal/index'

const { earlyWarningList, factoryList, updateDailyScheduleList } =
  productionWarning

const img = noneImg
const productStatus = [
  { label: '预警', value: '1' },
  { label: '延期', value: '2' }
]
const handleList = [
  { label: '未处理', value: '0' },
  { label: '已处理', value: '1' }
]

const ProductionPlan = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { state }: any = location

  const search = useRecoilValue(dockingData.searchConfigs)
  const map = new Map()
  search.forEach((item) => {
    map.set(item.value, item.name)
  })

  const [params, setParams] = useState<any>({
    pageSize: 10,
    pageNum: 1,
    waringType: '1'
  })
  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [newlyAdded, setNewlyAdded] = useState(false) //新增
  const [facList, setFacList] = useState([])
  const [current, setCurrent] = useState<any>() //当前行
  const [factoryId, setFactoryId] = useState<any>('')

  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, earlyWarningList)

  useEffect(() => {
    if (state !== null) {
      const id = state.id
      setParams({ ...params, externalProduceOrderNum: id })
    }
  }, [state])

  const handle = (record) => {
    return (
      <>
        <div className={styles.operation}>
          <div className={styles.operationTop}>
            <Tag
              color="green"
              onClick={() => {
                setNewlyAdded(true)
                setFactoryId(record.id)
              }}
            >
              添加加班
            </Tag>
            {record.extraType ? (
              <Icon type="jack-icon-test" className={styles.previous} />
            ) : null}
          </div>

          <div>
            <Tag
              className={styles.modifySchedule}
              color="gold"
              onClick={() => {
                setIsModalVisible(true)
                setCurrent(record)
              }}
            >
              修改日排程
            </Tag>
            {record.dailyType ? (
              <Icon type="jack-icon-test" className={styles.previous} />
            ) : null}
          </div>
          {/* <Tag color="blue">修改交期</Tag>  后续版本开发 */}
        </div>
      </>
    )
  }
  tableColumns[tableColumns.length - 1].render = (
    _text: any,
    record: any,
    index: number
  ) => {
    return (
      <div key={index} className={styles.operation}>
        <Popover placement="rightTop" content={handle(record)}>
          <Button type="link">处理</Button>
        </Popover>
      </div>
    )
  }
  tableColumns[1].render = (v) => {
    return (
      <div key={v}>
        <img
          className={styles.tableColumnsImg}
          src={v !== null ? v : img}
          alt=""
        />
      </div>
    )
  }

  //剩余工期
  tableColumns[8].render = (_text: any, record: any, index: number) => {
    return <div key={index}>{_text}</div>
  }
  tableColumns[8].sorter = true
  tableColumns[11].render = (v: any) => {
    // return <div>{map.get(v)}</div>
    return <div>{map.get(v)}</div>
  }

  useEffect(() => {
    ;(async () => {
      getFacList()
    })()
  }, [])

  useEffect(() => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[0].options = facList
    nConfigs[4].options = productStatus
    nConfigs[5].options = handleList
    setConfigs(nConfigs)
  }, [facList])

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

  const handleOk = async () => {
    // current 当前行
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const updateMethod = (e) => {
    console.log(e)
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

  const TableLeft = () => {
    return <></>
  }
  const update = () => {
    setNewlyAdded(false)
    getDataList()
    // setParams({ ...params })
  }
  const popupContent = {
    updateMethod,
    newlyAdded,
    update
    // setEdit
  }
  return (
    <div className={styles.qualification}>
      <AdvancedSearch
        easySearch={easySearch} //普通搜索
        configs={configs} //高级搜索
        params={params}
        callback={searchParamsChange}
      />
      <div>
        <CusDragTable
          storageField={'productionWarning'}
          cusBarLeft={TableLeft}
          columns={tableColumns}
          dataSource={dataSource}
          rowKey={'id'}
          scroll={{ x: 2000, y: '63vh' }}
          onChange={getSort}
          bordered={true} //边框线
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
          <ScheduleModal current={current} />
        </Modal>
      ) : null}

      {newlyAdded ? (
        <Popup content={popupContent} factoryId={factoryId} />
      ) : null}
    </div>
  )
}

export default ProductionPlan
