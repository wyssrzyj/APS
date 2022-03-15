import { Table } from 'antd'
import React, { useState } from 'react'

import { Title } from '@/components'

import Forms from './forms'
import styles from './index.module.less'
import MovPopup from './movPopup'
import Popup from './popup'
function Production() {
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total] = useState<number>(0)
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [type, setType] = useState(false) //编辑或者新增
  const [movIsModalVisible, setMovIsModalVisible] = useState(false) //删除弹窗

  // eslint-disable-next-line no-sparse-arrays
  const columns: any = [
    {
      title: '生产单号',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: '销售单号',
      align: 'center',
      dataIndex: 'age'
    },
    {
      title: '接单工厂',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '产品名称',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '产品款号',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '客户款号',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '生产单总量',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '计划完成日期',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '外发情况',
      align: 'center',
      dataIndex: 'address'
    },
    ,
    {
      title: '延期情况',
      align: 'center',
      dataIndex: 'address'
    },
    ,
    {
      title: '生产单状态',
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
            <div
              className={styles.operation_item}
              onClick={() => editUser(false)}
            >
              查看详情
            </div>
            <div className={styles.operation} onClick={() => editUser(true)}>
              <div> 工艺</div>
              <div> 外发</div>
            </div>
          </div>
        )
      }
    }
  ]
  const data = []
  for (let i = 0; i < 5; i++) {
    data.push({
      id: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`
    })
  }
  //头部form的数据
  const FormData = (e: any) => {
    console.log(e)
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

  const movApi = () => {
    console.log('删除逻辑')
  }
  const content = { isModalVisible, setIsModalVisible, type }
  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'生产单列表'} />
      </div>
      <div>
        <div className={styles.content}>
          <Forms FormData={FormData}></Forms>
          <Table
            className={styles.table}
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

export default Production
