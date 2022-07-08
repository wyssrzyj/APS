// import './animate.css'

import { Button, message, Modal, Popover, Tag } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { SetStateAction, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Icon } from '@/components'
import { AdvancedSearch, CusDragTable, SearchBar } from '@/components'
import noneImg from '@/imgs/noneImg.jpg'
import { periodicReport, productionPlanApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { easySearch, searchConfigs, tableColumns } from './conifgs'
import styles from './index.module.less'
import Popup from './popup'
import ScheduleModal from './scheduleModal/index'

const img = noneImg
const { factoryList } = productionPlanApis
const { periodicReportList, periodicReportListExport } = periodicReport

const ProductionPlan = () => {
  const location = useLocation()
  const { state }: any = location
  const [searchStatus, setSearchStatus] = useState(false)
  const [params, setParams] = useState<any>({
    pageSize: 10,
    pageNum: 1
  })
  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [data, setData] = useState<any[]>() //表头数据
  const [list, setList] = useState<any[]>() //表头数据

  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [newlyAdded, setNewlyAdded] = useState(false) //新增

  const [facList, setFacList] = useState([])
  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, periodicReportList)
  useEffect(() => {
    if (!isEmpty(dataSource)) {
      dataSource.map((item, index) => {
        item.id = index
        item.key = index
      })
      setList(dataSource)
    } else {
      setList([])
    }
  }, [dataSource])

  tableColumns[5].render = (v) => {
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

  useEffect(() => {
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
  }
  useEffect(() => {
    ;(async () => {
      getFacList()
    })()
  }, [])

  useEffect(() => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[0].options = facList
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

  const exportFile = () => {
    periodicReportListExport({
      ...params
    }).then((res: any) => {
      message.success('导出成功')
      const blob = new Blob([res], { type: 'application/octet-stream' })
      const download = document.createElement('a')
      download.href = window.URL.createObjectURL(blob)
      download.download = `生产周期报表.xls`
      download.click()
      window.URL.revokeObjectURL(download.href)
    })
  }

  const rowSelection:
    | {
        selectedRowKeys: never[]
        onChange: (selectedRowKeys: SetStateAction<never[]>) => void
      }
    | any = {
    selectedRowKeys,
    onChange: (selectedRowKeys: SetStateAction<never[]>) => {
      console.log(selectedRowKeys)
      setSelectedRowKeys(selectedRowKeys)
    }
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
      <AdvancedSearch
        easySearch={easySearch} //普通搜索
        configs={configs} //高级搜索
        params={params}
        callback={searchParamsChange}
      />

      <div>
        <CusDragTable
          storageField={'productionCycle'}
          rowSelection={null}
          cusBarLeft={TableLeft}
          columns={tableColumns}
          dataSource={list}
          rowKey={'key'}
          scroll={{ x: 2000, y: '62vh' }}
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
          <ScheduleModal />
        </Modal>
      ) : null}
      {newlyAdded ? <Popup content={content} /> : null}
    </div>
  )
}

export default ProductionPlan
