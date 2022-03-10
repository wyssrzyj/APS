import { Button, message, Table } from 'antd'
import React, { SetStateAction, useState } from 'react'

import { Title } from '@/components'

import Forms from './forms'
import styles from './index.module.less'
import Popup from './popup'

function DispatchPan() {
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total] = useState<number>(0)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗

  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
  }

  const btn = () => {
    setIsModalVisible(true)
  }
  //删除
  const start = () => {
    if (selectedRowKeys[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      // setMovIsModalVisible(true)
    }
  }
  const data = []
  for (let i = 0; i < 5; i++) {
    data.push({
      id: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`
    })
  }
  // eslint-disable-next-line no-sparse-arrays
  const columns: any = [
    {
      title: '工厂名称',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: '销售单号',
      align: 'center',
      dataIndex: 'age'
    },
    {
      title: '生产单号',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '产品名称',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '产品数量',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '工序名称',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '所属工段',
      align: 'center',
      dataIndex: 'address'
    },
    ,
    {
      title: '工作班组',
      align: 'center',
      dataIndex: 'address'
    },
    ,
    {
      title: '计划开始时间',
      align: 'center',
      dataIndex: 'address'
    },
    ,
    {
      title: '计划结束时间',
      align: 'center',
      dataIndex: 'address'
    },

    ,
    {
      title: '操作',
      align: 'center',
      dataIndex: 'address',
      render: (_value: any, _row: any) => {
        return (
          <div className={styles.flex}>
            <div className={styles.operation_item} onClick={btn}>
              查看
            </div>
          </div>
        )
      }
    }
  ]

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
  const content = { isModalVisible, setIsModalVisible }
  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'派工计划'} />
      </div>
      <div>
        <Forms FormData={FormData}></Forms>

        <Button type="primary" onClick={start}>
          导出
        </Button>
        <Table
          className={styles.table}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
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
      </div>
      <Popup content={content} />
    </div>
  )
}

export default DispatchPan
