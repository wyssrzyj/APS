import { Button, message, Table, Tag } from 'antd'
import { isEmpty } from 'lodash'
import {
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Title } from '@/components'
import { workingModeApis } from '@/recoil/apis'
import { practices } from '@/recoil/index'

import Forms from './forms'
import styles from './index.module.less'
import MovPopup from './movPopup'
import Popup from './popup'
const Index = () => {
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const defaultCurrent = 1
  const defaultPageSize = 10

  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize
  })

  const {
    workingModes,
    factoryList,
    listSorkingModesDelete,
    operatingModeDetailsData
  } = workingModeApis

  const [total] = useState<number>(0)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [type, setType] = useState(1) //编辑或者新增
  const [list, setlist] = useState([])
  const [edit, setEdit] = useState() //编辑数据
  const [movIsModalVisible, setMovIsModalVisible] = useState(false) //删除弹窗
  const [factoryData, setFactoryData] = useState<any>([]) //工厂

  //. const value = useRecoilValue(practices.lyj)
  useEffect(() => {
    api(params)
  }, [params])
  const api = async (item: any) => {
    const arr = await workingModes(item)
    setlist(arr.records)
  }

  //工厂名称
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const res: any = await factoryList()
    const arr: any = res.data
    if (res.code === 200) {
      arr.map((item: { name: any; deptName: any }) => {
        item.name = item.deptName
      })
      setFactoryData(arr)
    }
  }
  // eslint-disable-next-line no-sparse-arrays
  const columns: any = [
    {
      title: '工厂名称',
      align: 'center',
      dataIndex: 'factoryName'
    },
    {
      title: '工作模式',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: '工作日',
      align: 'center',
      dataIndex: 'weeks',
      render: (value: any, row: { [x: string]: Key | null | undefined }) => {
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
    },
    {
      title: '工作时间',
      align: 'center',
      dataIndex: 'times',
      render: (value: any, row: { [x: string]: Key | null | undefined }) => {
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
    },
    {
      title: '工作班组',
      align: 'center',
      dataIndex: 'teams',
      render: (value: any, row: { [x: string]: Key | null | undefined }) => {
        const chars = value !== null ? value.split(',') : []
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
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark'
    },
    ,
    {
      title: '操作',
      align: 'center',
      // width: 150,
      dataIndex: 'address',
      render: (_value: any, row: any) => {
        return (
          <div className={styles.flex}>
            <div
              className={styles.operation_item}
              onClick={() => editUser(false, row)}
            >
              查看
            </div>
            <div
              className={styles.operation}
              onClick={() => editUser(true, row)}
            >
              编辑
            </div>
          </div>
        )
      }
    }
  ]

  //头部form的数据
  const FormData = (e: any) => {
    console.log(e)
    if (e.factoryId !== undefined) {
      setParams({ pageNum: 1, pageSize, ...e })
    } else {
      setParams({ pageNum, pageSize, ...e })
    }
  }
  const onPaginationChange = (
    page: SetStateAction<number>,
    pageSize: SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
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
      setMovIsModalVisible(true)
    }
  }
  const movApi = async () => {
    const arr = await listSorkingModesDelete({ idList: selectedRowKeys })
    if (arr === true) {
      api(params)
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
    api(params)
  }
  const content = { isModalVisible, setIsModalVisible, type, edit, factoryData }
  return (
    <div className={styles.qualification}>
      <div>{/* <Title title={'工作模式'} /> */}</div>
      <div>
        <div className={styles.content}>
          <Forms factoryData={factoryData} FormData={FormData}></Forms>
          <Button
            className={styles.executionMethod}
            type="primary"
            onClick={executionMethod}
          >
            新增
          </Button>
          <Button type="primary" danger onClick={start}>
            删除
          </Button>
          <Table
            className={styles.table}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={list}
            rowKey={'id'}
            pagination={{
              //分页
              showSizeChanger: true,
              // showQuickJumper: true, //是否快速查找
              pageSize, //每页条数
              current: pageNum, //	当前页数
              total, //数据总数
              // position: ['bottomCenter'], //居中
              pageSizeOptions: ['10', '20', '50'],
              onChange: onPaginationChange //获取当前页码是一个function
            }}
          />
          <Popup content={content} newlyAdded={newlyAdded} />
        </div>
      </div>
      <MovPopup
        type="mov"
        movIsModalVisible={movIsModalVisible}
        setMovIsModalVisible={setMovIsModalVisible}
        movApi={movApi}
      />
    </div>
  )
}

export default Index
