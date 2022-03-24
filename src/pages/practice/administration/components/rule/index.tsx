import { Button, message, Table } from 'antd'
import React, { useEffect, useState } from 'react'

import { Title } from '@/components'
import { practice } from '@/recoil/apis'

import Forms from './forms'
import styles from './index.module.less'
import MovPopup from './movPopup'
import Popup from './popup'
function Rule() {
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
  const [type, setType] = useState(false) //编辑或者新增
  const [movIsModalVisible, setMovIsModalVisible] = useState(false) //删除弹窗
  const [list, setlist] = useState([])
  const [edit, setEdit] = useState([]) //编辑数据
  const { holidayList, workOvertimeMov, overtimeDetails } = practice
  // eslint-disable-next-line no-sparse-arrays
  const columns: any = [
    {
      title: '模板名称',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: '工作班组',
      align: 'center',
      dataIndex: 'age'
    },
    {
      title: '初始效率',
      align: 'center',
      dataIndex: 'initial'
    },
    {
      title: '最终效率',
      align: 'center',
      dataIndex: 'final'
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remarks'
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
              onClick={() => editUser(false)}
            >
              查看
            </div>
            <div className={styles.operation} onClick={() => editUser(true)}>
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
  useEffect(() => {
    console.log('执行测试 ')
  }, [])
  const api = async (item: any) => {
    const arr = await holidayList(item)
    setlist(arr.records)
  }
  const newlyAdded = async () => {
    api(params)
  }

  //头部form的数据
  const FormData = (e: any) => {
    console.log(e)
    setParams({ ...params, ...e })
  }
  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
  }
  const editUser = (type: boolean) => {
    if (type === true) {
      setType(false)
      setIsModalVisible(true)
    } else {
      console.log('查看')
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
  const movApi = () => {
    console.log('删除逻辑')
    console.log('选中的删除id', selectedRowKeys)
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
    setType(true)
  }

  // 假数据
  const treeData = [
    {
      title: '工厂',
      value: '1',
      key: '1',
      children: [
        {
          title: '工厂1',
          value: '2',
          key: '2'
        },
        {
          title: '工厂2',
          value: '3',
          key: '3'
        }
      ]
    },
    {
      title: '原料',
      value: '2-9',
      key: '2-9',
      children: [
        {
          title: '大米',
          value: '2-1',
          key: '2-1'
        },
        {
          title: '土豆',
          value: '2-2',
          key: '2-2'
        },
        {
          title: '菠萝',
          value: '2-3',
          key: '2-3'
        }
      ]
    },
    {
      title: '玩具',
      value: '3-9',
      key: '3-9',
      children: [
        {
          title: '金铲铲的冠冕',
          value: '3-1',
          key: '3-1'
        },
        {
          title: '残暴之力',
          value: '3-2',
          key: '3-2'
        },
        {
          title: '末日寒冬',
          value: '3-3',
          key: '3-3'
        }
      ]
    },
    {
      title: '蔬菜',
      value: '4',
      key: '4'
    }
  ]
  const content = { isModalVisible, setIsModalVisible, type }
  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'规则'} />
      </div>
      <div>
        <div className={styles.content}>
          <Forms FormData={FormData} treeData={treeData}></Forms>

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
          <Popup content={content} />
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

export default Rule
