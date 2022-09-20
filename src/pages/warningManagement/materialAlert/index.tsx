import { Button } from 'antd'
import { cloneDeep, map } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { AdvancedSearch, CusDragTable } from '@/components'
import noneImg from '@/imgs/noneImg.jpg'
import { dockingData } from '@/recoil'
import { productionWarning } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { easySearch, searchConfigs, tableColumns } from './conifgs'
import styles from './index.module.less'
import Material from './material'
const img = noneImg

const productStatus = [
  { label: '预警', value: '1' },
  { label: '延期', value: '2' }
]
const handleList = [
  { label: '未处理', value: '0' },
  { label: '已处理', value: '1' }
]
const Index = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { state }: any = location

  const search = useRecoilValue(dockingData.searchConfigs)

  const map = new Map()
  search.forEach((item) => {
    map.set(item.value, item.name)
  })
  console.log(map.get('1'))

  const [params, setParams] = useState<any>({
    pageSize: 10,
    pageNum: 1,
    waringType: '2'
  })
  const { earlyWarningList, factoryList } = productionWarning
  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [facList, setFacList] = useState([])

  const [materialModal, setMaterialModal] = useState(false) //物料齐套检查弹窗
  const [materialList, setMaterialList] = useState<any>([]) //物料齐套数据.

  useEffect(() => {
    if (state !== null) {
      const id = state.id
      setParams({ ...params, externalProduceOrderNum: id })
    }
  }, [state])
  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, earlyWarningList)

  const jump = (id) => {
    navigate('/scheduling', {
      replace: true,
      state: { id: id }
    })
  }
  tableColumns[tableColumns.length - 1].render = (
    _text: any,
    record: any,
    index: number
  ) => {
    return (
      <div key={index} className={styles.operation}>
        <Button
          onClick={() => {
            jump(record.externalProduceOrderNum)
          }}
          type="link"
        >
          修改排程
        </Button>
        <Button
          onClick={() => {
            setMaterialModal(true)
            setMaterialList([record])
          }}
          type="link"
        >
          物料冲销
        </Button>
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
  tableColumns[9].render = (_text: any, record: any, index: number) => {
    return <div key={index}>{_text}</div>
  }
  tableColumns[9].sorter = true
  tableColumns[11].render = (v: any) => {
    return <div>{map.get(String(v))}</div>
  }
  //工厂名称
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const res: any = await factoryList()
    const arr: any = res.data
    if (res.code === 200) {
      arr.map((item: any) => {
        item.label = item.deptName
        item.value = item.id
      })
      setFacList(arr)
    }
  }
  useEffect(() => {
    searchFactoryChange()
  }, [facList])
  const searchFactoryChange = () => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[0]['options'] = facList
    nConfigs[4].options = productStatus
    nConfigs[5].options = handleList
    setConfigs(nConfigs)
  }

  const changeTeamConfig = async (factoryId?: string) => {
    const nConfigs: any[] = cloneDeep(configs)
    setConfigs(nConfigs)
  }

  const paramsChange = (values: Record<string, any>) => {
    const oldParams = cloneDeep(params)
    if (oldParams.factoryId !== values.factoryId) {
      values.teamId = undefined
      changeTeamConfig(values.factoryId)
    }
    setParams({ ...values })
  }
  //刷新列表

  const refreshList = () => {
    getDataList && getDataList()
  }
  const update = () => {
    getDataList && getDataList()
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
    setParams(nParams)
  }
  return (
    <div className={styles.qualification}>
      <AdvancedSearch
        easySearch={easySearch} //普通搜索
        configs={configs} //高级搜索
        params={params}
        callback={searchParamsChange}
      />
      <div className={styles.content}>
        {/* <div className={styles.forms}>
          <SearchBar
            configs={configs}
            params={params}
            callback={paramsChange}
          ></SearchBar>
        </div> */}

        <CusDragTable
          storageField={'materialAlert'}
          columns={tableColumns}
          dataSource={dataSource}
          rowKey={'id'}
          scroll={{ x: 2000, y: '62vh' }}
          loading={loading}
          onChange={getSort}
          bordered={true} //边框线
          pagination={{
            showSizeChanger: true,
            pageSize: pageSize,
            current: pageNum,
            total, //数据总数
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

export default Index
