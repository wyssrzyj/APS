import { Button } from 'antd'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CusDragTable, SearchBar } from '@/components'
import noneImg from '@/imgs/noneImg.jpg'
import { workingModeApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { searchConfigs, tableColumns } from './conifgs'
import styles from './index.module.less'

const img = noneImg
const Index = () => {
  const navigate = useNavigate()

  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: 10
  })

  const { workingModes, factoryList } = workingModeApis
  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [facList, setFacList] = useState([])

  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, workingModes)

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
            jump(record.id)
          }}
          type="link"
        >
          修改排程
        </Button>
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

  return (
    <div className={styles.qualification}>
      <div>
        <div className={styles.content}>
          <div className={styles.forms}>
            <SearchBar
              configs={configs}
              params={params}
              callback={paramsChange}
            ></SearchBar>
          </div>

          <CusDragTable
            storageField={'materialAlert'}
            columns={tableColumns}
            dataSource={dataSource}
            rowKey={'id'}
            scroll={{ x: 2000, y: '62vh' }}
            loading={loading}
            onChange={tableChange}
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
      </div>
    </div>
  )
}

export default Index
