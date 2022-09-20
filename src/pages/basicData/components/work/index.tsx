import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Input, message, Modal, Tag } from 'antd'
import Item from 'antd/lib/list/Item'
import { cloneDeep, isEmpty } from 'lodash'
import {
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import { CusDragTable, SearchBar } from '@/components'
import { workingModeApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { searchConfigs, tableColumns } from './conifgs'
import styles from './index.module.less'
import Popup from './popup'

const Index = () => {
  const { confirm } = Modal

  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: 10
  })

  const {
    workingModes,
    factoryList,
    listModesDelete,
    teamList,
    operatingModeDetailsData
  } = workingModeApis

  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [list, setList] = useState<any[]>()

  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [type, setType] = useState(1) //编辑或者新增
  const [edit, setEdit] = useState() //编辑数据
  const [factoryData, setFactoryData] = useState<any>([]) //工厂
  const [facList, setFacList] = useState([]) // 选中的值

  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, workingModes)
  useEffect(() => {
    if (!isEmpty(dataSource)) {
      dataSource.map((item, _index) => {
        item.key = _index
      })
      setList(dataSource)
    } else {
      setList([])
    }
  }, [dataSource])

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
      setFactoryData(arr)
    }
  }
  tableColumns[tableColumns.length - 1].render = (
    value: any,
    row: { [x: string]: Key | null | undefined }
  ) => {
    return (
      <div className={styles.flex} key={row.id}>
        <div
          className={styles.operation_item}
          onClick={() => editUser(false, row)}
        >
          查看
        </div>
        <div className={styles.operation} onClick={() => editUser(true, row)}>
          编辑
        </div>
      </div>
    )
  }
  tableColumns[1].render = (
    value: any,
    row: { [x: string]: Key | null | undefined }
  ) => {
    const chars = value.split(',')
    return (
      <div>
        {!isEmpty(chars)
          ? chars.map(
              (
                item:
                  | boolean
                  | ReactChild
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined,
                index: Key | null | undefined
              ) => (
                // eslint-disable-next-line react/jsx-key
                <Tag key={index}>{item}</Tag>
              )
            )
          : null}
      </div>
    )
  }
  tableColumns[2].render = (
    value: any,
    row: { [x: string]: Key | null | undefined }
  ) => {
    const chars = value.split(',')
    return (
      <div className={styles.tags}>
        {chars.map(
          (
            item:
              | boolean
              | ReactChild
              | ReactFragment
              | ReactPortal
              | null
              | undefined,
            index: Key | null | undefined
          ) => (
            // eslint-disable-next-line react/jsx-key
            <Tag className={styles.tag} key={index}>
              {item}
            </Tag>
          )
        )}
      </div>
    )
  }
  tableColumns[4].render = (
    value: any,
    row: { [x: string]: Key | null | undefined }
  ) => {
    const chars = !isEmpty(value) ? value.split(',') : []
    return (
      <div>
        {chars.map(
          (
            item:
              | boolean
              | ReactChild
              | ReactFragment
              | ReactPortal
              | null
              | undefined,
            index: Key | null | undefined
          ) => (
            // eslint-disable-next-line react/jsx-key
            <Tag key={index}>{item}</Tag>
          )
        )}
      </div>
    )
  }

  const editUser = async (type: boolean, value: any) => {
    const arr = await operatingModeDetailsData({ id: value.id })
    setEdit(arr)
    if (type === true) {
      setType(2)
      setIsModalVisible(true)
    } else {
      setType(3)
      setIsModalVisible(true)
    }
  }
  //删除
  const start = () => {
    if (selectedRowKeys[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      showDeleteConfirm()
    }
  }
  const movApi = async () => {
    const arr = await listModesDelete({ idList: selectedRowKeys })
    if (arr === true) {
      getDataList && getDataList()
    }
  }
  const onSelectChange = (selectedRowKeys: SetStateAction<never[]>) => {
    setSelectedRowKeys(selectedRowKeys)
  }
  const rowSelection:
    | {
        selectedRowKeys: never[]
        onChange: (selectedRowKeys: SetStateAction<never[]>) => void
      }
    | any = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const executionMethod = () => {
    setIsModalVisible(true)
    setType(1)
  }
  const newlyAdded = async () => {
    getDataList && getDataList()
  }
  const TableLeft = () => {
    return (
      <>
        <Button
          className={styles.executionMethod}
          type="primary"
          onClick={() => executionMethod()}
        >
          新增
        </Button>
        <Button type="primary" danger onClick={start}>
          删除
        </Button>
      </>
    )
  }
  const showDeleteConfirm = () => {
    confirm({
      title: '确认删除选中项?',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除',
      okType: 'danger',
      centered: true,
      onOk() {
        movApi()
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  //---替换----开始-
  const searchFactoryChange = () => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[0]['options'] = facList
    setConfigs(nConfigs)
  }
  useEffect(() => {
    searchFactoryChange()
  }, [facList])

  const changeTeamConfig = async (factoryId?: string) => {
    const nConfigs: any[] = cloneDeep(configs)
    const list: any = factoryId ? await teamList({ factoryId }) : [] //班组数据
    list.forEach((item: any) => {
      item.label = item.teamName
      item.value = item.id
    })
    nConfigs[1]['options'] = list

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

  const content = { isModalVisible, setIsModalVisible, type, edit, factoryData }

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
            storageField={'work'}
            cusBarLeft={TableLeft}
            rowSelection={rowSelection}
            columns={tableColumns}
            dataSource={list}
            rowKey={'id'}
            // scroll={{ x: 2000, y: '60vh' }}
            loading={loading}
            onChange={tableChange}
            bordered={true} //边框线
            pagination={{
              //分页
              showSizeChanger: true,
              pageSize: pageSize, //每页条数
              current: pageNum, //	当前页数
              total, //数据总数
              pageSizeOptions: ['10', '20', '50']
            }}
          />
          {isModalVisible ? (
            <Popup content={content} newlyAdded={newlyAdded} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Index
