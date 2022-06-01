// import './animate.css'

import { Button, message, Table } from 'antd'
import { cloneDeep } from 'lodash'
import moment, { Moment } from 'moment'
import React, { SetStateAction, useCallback, useEffect, useState } from 'react'

import { CusDragTable, CustomModal, SearchBar, Title } from '@/components'
import { productionPlanApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { formItemConfig, searchConfigs, tableColumns } from './conifgs'
import Details from './details/index'
import styles from './index.module.less'

const {
  productList,
  exportProductList,
  productDetail,
  factoryList,
  getWorkshopSectionList,
  makeSewingPlan
} = productionPlanApis

const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss'
const map = new Map()
map.set(-1, '生成缝制计划')
map.set(0, '编辑缝制计划')
map.set(1, '查看缝制计划')
map.set(2, '查看缝制计划')

function ProductionPlan() {
  tableColumns[tableColumns.length - 1].render = (
    _text: any,
    record: any,
    index: number
  ) => {
    return (
      <div key={index}>
        <Button type="link" onClick={() => handleDetailInfo(record)}>
          查看
        </Button>

        {record.section === '缝制' ? (
          <Button type="link" onClick={() => showSewing(record)}>
            {map.get(record.auditStatus)}
          </Button>
        ) : null}
      </div>
    )
  }

  const [params, setParams] = useState({
    pageSize: 10,
    pageNum: 1
  })
  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [rowInfo, setRowInfo] = useState() //展示弹窗
  const [facList, setFacList] = useState([])
  const [workshopSectionList, setWorkshopSectionList] = useState([])
  const [detailsPopup, setDetailsPopup] = useState<any>(false) //编辑详情
  const [editData, setEditData] = useState<any>() //编辑数据

  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, productList)

  useEffect(() => {
    ;(async () => {
      getFacList()
      getWorkshopSectionListInfo()
    })()
  }, [])

  useEffect(() => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[0]['options'] = facList
    nConfigs[2]['options'] = workshopSectionList
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
  const showSewing = async (v: any) => {
    //只有 -1才走这个接口
    if (v.auditStatus === -1) {
      const res = await makeSewingPlan({
        produceOrderNum: v.externalProduceOrderNum,
        teamManagerId: v.teamId
      })
      if (res.data) {
        message.warning(' 已生成过缝制计划')
      } else {
        setEditData({ ...v })
        setDetailsPopup(true)
      }
    } else {
      setEditData({ ...v })
      setDetailsPopup(true)
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

  return (
    <div className={styles.qualification}>
      <div>{/* <Title title={'生产计划'} /> */}</div>
      <div>
        <SearchBar
          configs={configs}
          params={params}
          callback={searchParamsChange}
        ></SearchBar>
        <div>
          <CusDragTable
            storageField={'productionPlan'}
            rowSelection={rowSelection}
            cusBarLeft={TableLeft}
            columns={tableColumns}
            dataSource={dataSource}
            rowKey={'id'}
            scroll={{ x: 1000 }}
            onChange={tableChange}
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
      </div>
      {isModalVisible ? (
        <CustomModal
          width={800}
          visible={isModalVisible}
          title={'查看生产计划'}
          configs={formItemConfig}
          cancel={() => toggleModalVisible(false)}
          footer={false}
          initialValues={rowInfo}
        ></CustomModal>
      ) : null}

      {/* 缝制任务 */}
      {detailsPopup && (
        <Details
          update={update}
          editData={editData}
          setDetailsPopup={setDetailsPopup}
          detailsPopup={detailsPopup}
        />
      )}
    </div>
  )
}

export default ProductionPlan