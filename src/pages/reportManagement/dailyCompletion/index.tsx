// import './animate.css'

import { Button, message, Modal, Popover, Tag } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { SetStateAction, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Icon } from '@/components'
import { AdvancedSearch, CusDragTable, SearchBar } from '@/components'
import noneImg from '@/imgs/noneImg.jpg'
import { dailyCompletionApis, productionPlanApis } from '@/recoil/apis'

import { easySearch, searchConfigs, tableColumns } from './conifgs'
import styles from './index.module.less'
import Popup from './popup'
import ScheduleModal from './scheduleModal/index'
const img = noneImg

const { factoryList } = productionPlanApis

const { teamDayCompletion, teamDayCompletionExport } = dailyCompletionApis

function ProductionPlan() {
  const location = useLocation()
  const { state }: any = location

  tableColumns[2].render = (v) => {
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
  const [facList, setFacList] = useState([])
  const [params, setParams] = useState<any>({
    pageSize: 10,
    pageNum: 1
  })
  const [total, setTotal] = useState<any>()

  const [configs, setConfigs] = useState<any[]>(searchConfigs)

  const [dynamicMeter, setDynamicMeter] = useState<any[]>() //表头
  const [surfaceDataSource, setSurfaceDataSource] = useState<any[]>() //总数据

  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [newlyAdded, setNewlyAdded] = useState(false) //新增

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
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[0]['options'] = facList
    setConfigs(nConfigs)
  }, [facList])

  useEffect(() => {
    getReportData()
  }, [params])

  const getReportData = async () => {
    try {
      const res = await teamDayCompletion({ ...params })
      setTotal(res.total)
      // 处理数据格式
      getHeaderData(res.dailyCompleteItemVOList, res.dayList)
    } catch (error) {}
  }

  useEffect(() => {
    if (state !== null) {
      const id = state.id
      setParams({ ...params, externalProduceOrderNum: id })
    }
  }, [state])

  const processingFormat = (header, arr) => {
    // const header = ['1', '2', '3', '4', '5', '6', '7'] //表头
    // const arr = [10, 12, 33, 54, 15] //数据
    if (!isEmpty(arr)) {
      const b = header //表头
      const sum1 = [] //数据
      arr.forEach((item, index) => {
        sum1.push({ sizeCode: b[index], quantity: arr[index] })
      })
      const conversion = (data: any[]) => {
        //data 数据
        const obj: any = {}
        data.map((e: { sizeCode: string | number; quantity: any }) => {
          //键名=建值
          obj[e.sizeCode] = e.quantity
        })
        return obj
      }
      return conversion(sum1)
    }
  }

  //动态表头格式设置
  const getHeaderData = (data, dayList) => {
    const list = []
    const header = [] //表头
    dayList.forEach((item) => {
      header.push(`${item}`)
      list.push({
        title: `${item}天`,
        align: 'center',
        dataIndex: `${item}`,
        id: `${item}`,
        key: `${item}`,
        width: 100
      })
    })
    setDynamicMeter([...tableColumns, ...list])
    // 处理数据
    if (!isEmpty(data)) {
      const sums = data.map((item, index) => {
        item.id = index
        item.key = index
        const processed = processingFormat(header, item.completeAmountList)
        return { ...item, ...processed }
      })
      setSurfaceDataSource(sums)
    } else {
      setSurfaceDataSource([])
    }
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
    setParams(nParams)
  }

  const exportFile = () => {
    teamDayCompletionExport({
      ...params
    }).then((res: any) => {
      message.success('导出成功')
      const blob = new Blob([res], { type: 'application/octet-stream' })
      const download = document.createElement('a')
      download.href = window.URL.createObjectURL(blob)
      download.download = `班组日完成.xls`
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
  const getSort = (_pagination, _filters) => {
    setParams({ ...params })
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
    updateMethod,
    newlyAdded,
    setNewlyAdded
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
        {!isEmpty(dynamicMeter) ? (
          <CusDragTable
            noNeedDropdown={true}
            storageField={'dailyCompletion'}
            rowSelection={null}
            cusBarLeft={TableLeft}
            columns={dynamicMeter}
            dataSource={surfaceDataSource}
            rowKey={'key'}
            scroll={{ x: 2000, y: '63vh' }}
            onChange={getSort}
            bordered={true} //边框线
            pagination={{
              //分页
              showSizeChanger: true,
              // showQuickJumper: true, //是否快速查找
              pageSize: params.pageSize, //每页条数
              current: params.pageNum, //	当前页数
              total, //数据总数
              pageSizeOptions: ['10', '20', '50']
            }}
          />
        ) : null}
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
