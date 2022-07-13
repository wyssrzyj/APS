import { Button, Dropdown, Menu, message, Space, Table } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { AdvancedSearch, CusDragTable } from '@/components'
import noneImg from '@/imgs/noneImg.jpg'
import { materialSetApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { easySearch, searchConfigs, tableColumns } from './conifgs'
import styles from './index.module.less'
import Material from './material'
const img = noneImg

const productStatus = [
  { label: '待计划', value: 1 },
  { label: '已计划', value: 2 },
  { label: '生产中', value: 3 },
  { label: '生产完成', value: 4 }
]
const Materials = () => {
  const {
    productionList,
    completeInspectionReport,
    exportShortageReport,
    factoryList
  } = materialSetApis

  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: 10
  })
  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [facList, setFacList] = useState([])

  const [selected, setSelected] = useState([]) //选中的id
  const [selectedData, setSelectedData] = useState([]) //记录以获取的所有数据
  const [materialModal, setMaterialModal] = useState(false) //物料齐套检查弹窗
  const [materialList, setMaterialList] = useState<any>() //物料齐套数据.
  const [list, setList] = useState<any>()

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
    const nConfigs: any[] = cloneDeep(configs)
    // nConfigs[0]['options'] = facList
    nConfigs[4]['options'] = productStatus
    setConfigs(nConfigs)
  }, [facList])
  //款图
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

  const update = () => {
    getDataList && getDataList()
    setSelected([])
    setSelectedData([])
  }

  useEffect(() => {
    formApi(dataSource)
  }, [dataSource])

  const formApi = async (v: any) => {
    if (!isEmpty(v)) {
      v.map(
        (item: {
          id: any
          externalProduceOrderId: any
          key: any
          name: any
          externalProduceOrderNum: any
        }) => {
          item.id = item.externalProduceOrderId
          item.key = item.externalProduceOrderId
          item.name = `生产单：${item.externalProduceOrderNum}`
        }
      )
      setList(v)
    } else {
      setList([])
    }
  }

  //获取选中的数据
  const selectedList = (v: any[], data: any[]) => {
    /**
     * v 选中的值
     * data 总数据
     */
    //过滤出对应的
    const selectedForm = (v: any, data: any[]) => {
      if (!isEmpty(data)) {
        const processData = data.filter((item: { id: any }) => item.id === v)
        return processData
      }
    }

    const dataList: (any[] | undefined)[] = []
    v.map((item: any) => {
      const sum = selectedForm(item, data)
      dataList.push(sum)
    })
    return dataList.flat(Infinity)
  }

  // 选中的状态
  const materials = async (type: string | boolean) => {
    if (selected[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      //获取选中的数据
      const selectedValue = selectedList(selected, selectedData)

      //判断选中的状态是否一样
      const stateConsistent = selectedValue.every(
        (item) => item.checkStatus === selectedValue[0].checkStatus
      )

      if (stateConsistent === true) {
        if (type === '1') {
          //生产中和生产完成不需要重新查看.
          const banView = selectedValue.every(
            (item) => item.status !== 3 && item.status !== 4
          )
          if (banView) {
            if (selectedValue[0].checkStatus !== 3) {
              setMaterialModal(true)
              setMaterialList(selectedValue)
            }

            //重新检查
            if (selectedValue[0].checkStatus === 3) {
              //重新检查只能选择一个
              if (selectedValue.length === 1) {
                const checked = {
                  ...selectedValue[0],
                  id: '1314520',
                  review: true, //重新检查判断条件
                  type: 1,
                  name: '已检查'
                }
                const unchecked = {
                  ...selectedValue[0],
                  type: 2,
                  review: true, //重新检查判断条件
                  name: '重新检查'
                }
                const sum = [checked, unchecked]
                setMaterialList(sum)
                //只有物料齐套才会展示弹窗
                if (type === '1') {
                  setMaterialModal(true)
                }
              } else {
                message.warning('重新检查只能选择一个')
              }
            }
          } else {
            message.warning('生产中、生产完成不需要检查')
          }
        }

        if (type !== '1') {
          const allCheckStatus = selectedValue.every((item: any) => {
            return item.checkStatus === 1
          })
          if (allCheckStatus) {
            if (type === '2') {
              start('2')
            }
            if (type === '3') {
              start('3')
            }
          } else {
            message.warning('只有已检查才能导出报告')
          }
        }
      } else {
        message.warning('物料齐套状态不一致')
      }
    }
  }

  //勾选
  const onSelectChange = (selectedRowKeys: any) => {
    //后面有数据的时候 根据id获取所有数据中对应的 然后给from
    const cloneSelected = cloneDeep(selected)

    if (!isEmpty(selectedRowKeys)) {
      selectedRowKeys.map((item) => {
        if (cloneSelected.includes(item) === false) {
          //添加
          cloneSelected.push(item)
          setSelected(cloneSelected)
        } else {
          //减少
          setSelected(selectedRowKeys)
        }
      })
    } else {
      setSelected([])
    }
  }

  const rowSelection: any = {
    selectedRowKeys: selected,
    onChange: onSelectChange
  }

  useEffect(() => {
    //获取所有的接口数据 且不能重复添加
    if (!isEmpty(list)) {
      const cloneSelected = cloneDeep(selectedData)
      list.map((item) => {
        if (cloneSelected.findIndex((v) => v.id === item.id) === -1) {
          cloneSelected.push(item)
        }
      })
      setSelectedData(cloneSelected)
    }
  }, [list])

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

  const elsxTable = (res: any, title: string) => {
    const blob = new Blob([res], { type: 'application/octet-stream' })
    const download = document.createElement('a')
    download.href = window.URL.createObjectURL(blob)
    download.download = `${title}.xls`
    download.click()
    window.URL.revokeObjectURL(download.href)
  }

  //导出报告
  const start = async (type: any) => {
    if (type === '2') {
      const res = await completeInspectionReport({ idList: selected })
      elsxTable(res, '齐套检查报告')
    }
    if (type === '3') {
      const res = await exportShortageReport({ idList: selected })
      elsxTable(res, '缺料报告')
    }
  }

  //刷新列表
  const refreshList = () => {
    getDataList && getDataList()
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <div
          onClick={() => {
            materials('2')
          }}
        >
          齐套检查报告
        </div>
      </Menu.Item>
      <Menu.Item>
        <div
          onClick={() => {
            materials('3')
          }}
        >
          缺料报告
        </div>
      </Menu.Item>
    </Menu>
  )

  const TableLeft = () => {
    return (
      <>
        <Button
          className={styles.executionMethod}
          type="primary"
          onClick={() => {
            materials('1')
          }}
        >
          物料齐套检查
        </Button>
        <Space wrap>
          <Dropdown arrow overlay={menu} placement="topLeft">
            <Button type="primary">导出报告</Button>
          </Dropdown>
        </Space>
      </>
    )
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
          storageField={'materials'}
          cusBarLeft={TableLeft}
          rowSelection={rowSelection}
          columns={tableColumns}
          dataSource={list}
          bordered={true} //边框线
          rowKey={'id'}
          scroll={{ x: 2000, y: '60vh' }}
          loading={loading}
          onChange={tableChange}
          pagination={{
            //分页
            showSizeChanger: true,
            pageSize: pageSize,
            current: pageNum,
            total,
            pageSizeOptions: ['10', '20', '50']
          }}
        />
      </div>

      {/* 物料齐套检查弹窗 */}
      {materialModal && (
        <Material
          refreshList={refreshList}
          update={update}
          materialList={materialList}
          materialModal={materialModal}
          setMaterialModal={setMaterialModal}
        />
      )}
    </div>
  )
}

export default Materials
