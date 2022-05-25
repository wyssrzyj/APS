import { Button } from 'antd'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import React, { SetStateAction, useCallback, useEffect, useState } from 'react'

import { CusDragTable, SearchBar, Title } from '@/components'
import { actualProductionApis, commonApis } from '@/recoil/apis'
import { changeBolbToXls } from '@/utils/tool'
import useTableChange from '@/utils/useTableChange'

import { searchConfig, tableColumn } from './config'
import EditActualProduction from './editModal'
import styles from './index.module.less'
const { factoryList, getWorkshopSectionList, teamList } = commonApis
const { efficiencyList, exportEfficiency, efficiencyDetailInfo } =
  actualProductionApis
function ActualProductionList() {
  const [columns, setColumns] = useState<any[]>()
  const [facList, setFacList] = useState([])
  const [workshopSectionList, setWorkshopSectionList] = useState([])
  const [configs, setConfigs] = useState(searchConfig)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [params, setParams] = useState<Record<string, any>>({
    pageSize: 10,
    pageNum: 1
  })
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false)
  const [rowInfo, setRowInfo] = useState([])
  const { dataSource, total, pageNum, pageSize, tableChange, getDataList } =
    useTableChange(params, efficiencyList)

  useEffect(() => {
    ;(async () => {
      await getFacList()
      await getWorkshopSectionListInfo()
    })()
  }, [])

  useEffect(() => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[0]['options'] = facList
    // nConfigs[2]['options'] = workshopSectionList
    setConfigs(nConfigs)
  }, [facList])

  useEffect(() => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[2]['options'] = workshopSectionList
    setConfigs(nConfigs)
    if (workshopSectionList && workshopSectionList.length) {
      changeTableColumn()
    }
  }, [workshopSectionList])

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

  const paramsChange = (values: Record<string, any>) => {
    setParams({ ...values })
  }

  const editInfo = async (rowInfo: Record<string, any>) => {
    const data: any = await efficiencyDetailInfo({ id: rowInfo.id })
    if (data) {
      toggleModalVisible(true)
      data.forEach((item: any) => {
        // item.completedAmount = undefined
        item.realityStartTime = item.realityStartTime
          ? moment(item.realityStartTime)
          : null
        item.realityEndTime = item.realityEndTime
          ? moment(item.realityEndTime)
          : null
        item.isFinished = item.isFinished === 1
      })
      setRowInfo(data)
    }
  }

  const toggleModalVisible = (visible: boolean) => {
    setEditModalVisible(visible)
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

  const exportFile = () => {
    exportEfficiency({ ...params }).then((res) => {
      changeBolbToXls(res, '生产实绩')
    })
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

  const changeTableColumn = () => {
    let nColumn = cloneDeep(tableColumn)
    nColumn = nColumn.map((item) => {
      if (item.dataIndex === 'section') {
        item.render = (val: string) => {
          const target: any = workshopSectionList.find(
            (i: any) => ~~i.value === ~~val
          )
          return target ? target.label : '/'
        }
      }
      if (item.dataIndex === 'operate') {
        item.render = (_text: any, record: any, index: number) => {
          return (
            <div key={index}>
              <Button type="link" onClick={() => editInfo(record)}>
                编辑
              </Button>
            </div>
          )
        }
      }
      return item
    })
    setColumns([...nColumn])
  }

  return (
    <div className={styles.outContainer}>
      {/* <Title title={'生产实绩'}></Title> */}
      <SearchBar
        configs={configs}
        params={params}
        callback={paramsChange}
      ></SearchBar>
      {columns && columns.length ? (
        <CusDragTable
          rowKey={'id'}
          storageField={'efficiencyList'}
          columns={columns}
          cusBarLeft={TableLeft}
          dataSource={dataSource}
          scroll={{ x: 1000 }}
          onChange={tableChange}
          rowSelection={rowSelection}
          pagination={{
            showSizeChanger: true,
            // showQuickJumper: true, //是否快速查找
            pageSize, //每页条数
            current: pageNum, //	当前页数
            total, //数据总数
            pageSizeOptions: ['10', '20', '50']
          }}
        ></CusDragTable>
      ) : null}

      {editModalVisible && (
        <EditActualProduction
          visible={editModalVisible}
          callback={(value: boolean, isOk?: boolean) => {
            toggleModalVisible(value)
            isOk && getDataList()
          }}
          tableData={rowInfo}
        ></EditActualProduction>
      )}
    </div>
  )
}
export default ActualProductionList
