import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, message, Modal, Table, Tag } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { Title } from '@/components'
import { holidaySeasonApis } from '@/recoil/apis'

import Forms from './forms'
import styles from './index.module.less'
import MovPopup from './movPopup'
import Popup from './popup'
function Vacations() {
  const { confirm } = Modal

  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total] = useState<number>(0)
  const defaultCurrent = 1
  const defaultPageSize = 10

  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [type, setType] = useState(1) //编辑或者新增
  const [movIsModalVisible, setMovIsModalVisible] = useState(false) //删除弹窗
  const [list, setlist] = useState([])
  const [edit, setEdit] = useState([]) //编辑数据

  const { holidayList, holidayID, holidayListMov } = holidaySeasonApis
  // eslint-disable-next-line no-sparse-arrays
  const columns: any = [
    {
      title: '节假日名称',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: '节假日期',
      align: 'center',
      dataIndex: 'holidays',
      render: (value: string, row: any) => {
        const chars = value.split(',')
        return (
          <div className={styles.flexs}>
            {chars.map(
              (
                item:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined,
                index: any | null | undefined
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
      title: '创建人',
      align: 'center',
      dataIndex: 'createBy',
      render: (value: string, row: any) => {
        return (
          <div>
            <Tag key={value}>{value}</Tag>
          </div>
        )
      }
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createTime',
      render: (value: string, row: any) => {
        return (
          <div>
            <Tag key={value}>{moment(value).format('YYYY-MM-DD HH:ss')}</Tag>
          </div>
        )
      }
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark'
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'address',
      render: (_value: any, _row: any) => {
        return (
          <div className={styles.flex}>
            <div
              className={styles.operation_item}
              onClick={() => editUser(false, _row)}
            >
              查看
            </div>
            <div
              className={styles.operation}
              onClick={() => editUser(true, _row)}
            >
              编辑
            </div>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    api(params)
  }, [params])
  const api = async (item: any) => {
    const arr = await holidayList(item)
    setlist(arr.records)
  }

  const newlyAdded = async () => {
    api(params)
  }
  //头部form的数据
  const FormData = (e: any) => {
    setParams({ ...params, ...e })
  }
  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
  }
  const editUser = async (type: boolean, value: any) => {
    const arr = await holidayID({ id: value.id })
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
    const arr = await holidayListMov({ idList: selectedRowKeys })
    newlyAdded()
  }
  const onSelectChange = (selectedRowKeys: React.SetStateAction<never[]>) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const rowSelection:
    | {
        selectedRowKeys: never[]
        onChange: (selectedRowKeys: React.SetStateAction<never[]>) => void
      }
    | any = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const executionMethod = () => {
    setIsModalVisible(true)
    setType(1)
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
  const content = { isModalVisible, setIsModalVisible, type, edit }
  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'节假日'} />
      </div>
      <div>
        <div className={styles.content}>
          <Forms FormData={FormData}></Forms>

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

export default Vacations
