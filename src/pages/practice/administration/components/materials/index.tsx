import { Button, Dropdown, Menu, message, Space, Table } from 'antd'
import { isEmpty } from 'lodash'
import { any } from 'prop-types'
import { SetStateAction, useEffect, useState } from 'react'

import { Title } from '@/components'
import { practice } from '@/recoil/apis'

import Forms from './forms'
import styles from './index.module.less'
import Material from './material'
import MovPopup from './movPopup'
import Popup from './popup'

function Materials() {
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total] = useState<number>(0)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [type, setType] = useState(false) //编辑或者新增
  const [movIsModalVisible, setMovIsModalVisible] = useState<boolean>(false) //删除弹窗
  const [materialModal, setMaterialModal] = useState(false) //物料齐套检查弹窗
  const [materialList, setMaterialList] = useState<any>() //物料齐套数据
  const [list, setList] = useState<any>() //物料齐套数据

  const { materialData } = practice

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
      title: '生产单权重',
      align: 'center',
      dataIndex: 'address'
    },
    {
      title: '物料齐套状态',
      align: 'center',
      dataIndex: 'address'
    }
  ]
  //获取列表数据
  useEffect(() => {
    formApi()
  }, [])
  const formApi = () => {
    const data = [
      {
        id: 5,

        name: `商品 1号`,
        age: 32,
        serial: '1',
        process: '8848',
        processTime: '3',
        remarks: '4',
        front: '5',
        totalProduction: '6'
      },
      {
        id: 6,
        name: `商品 2号`,
        age: 32,
        serial: '222222',
        process: '8848',
        processTime: '3',
        remarks: '4',
        front: '5',
        totalProduction: '6'
      }
    ]

    setList(data)
  }

  //头部form的数据
  const FormData = (e: any) => {
    console.log(e)
  }
  const onPaginationChange = (
    page: SetStateAction<number>,
    pageSize: SetStateAction<number>
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
  const start = (type: any) => {
    if (selectedRowKeys[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      if (type === 1) {
        console.log('选中的删除id-齐套检查报告', selectedRowKeys)
        const res: any = []
        // 导出elsx表格
        const blob = new Blob([res], { type: 'application/octet-stream' })
        const download = document.createElement('a')
        download.href = window.URL.createObjectURL(blob)
        download.download = `齐套检查报告.xls`
        download.click()
        window.URL.revokeObjectURL(download.href)
      } else {
        console.log('选中的删除id', selectedRowKeys)
      }
    }
  }
  //选中的值
  const movApi = () => {
    console.log('删除逻辑')
    console.log('选中的删除id', selectedRowKeys)
  }
  const onSelectChange = (selectedRowKeys: SetStateAction<never[]>) => {
    //后面有数据的时候 根据id获取所有数据中对应的 然后给from

    setSelectedRowKeys(selectedRowKeys)
  }
  const rowSelection: any = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const executionMethod = () => {
    setIsModalVisible(true)
    setType(true)
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <div
          onClick={() => {
            start(1)
          }}
        >
          齐套检查报告
        </div>
      </Menu.Item>
      <Menu.Item>
        <div
          onClick={() => {
            start(2)
          }}
        >
          缺料报告
        </div>
      </Menu.Item>
    </Menu>
  )
  // 获取选中的from数据
  const selectedForm = (v: never, data: any[]) => {
    if (!isEmpty(data)) {
      const processData = data.filter((item: { id: any }) => item.id === v)
      return processData
    }
  }
  const materials = async () => {
    if (selectedRowKeys[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      console.log('选中的删除id-物料齐套检查', selectedRowKeys)
      //获取选中的数据
      const dataList: (any[] | undefined)[] = []
      selectedRowKeys.map((item) => {
        const sum = selectedForm(item, list)
        dataList.push(sum)
      })

      setMaterialList(dataList.flat(Infinity))
      setMaterialModal(true)
    }
  }
  const content = { isModalVisible, setIsModalVisible, type }

  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'物料齐套检查'} />
      </div>
      <div>
        <div className={styles.content}>
          <Forms FormData={FormData}></Forms>
          <Button
            className={styles.executionMethod}
            type="primary"
            onClick={materials}
            // onClick={executionMethod}
          >
            物料齐套检查
          </Button>
          <Space wrap>
            <Dropdown arrow overlay={menu} placement="topLeft">
              <Button type="primary">导出报告</Button>
            </Dropdown>
          </Space>
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
      {/* 物料齐套检查弹窗 */}
      <Material
        materialList={materialList}
        materialModal={materialModal}
        setMaterialModal={setMaterialModal}
      />
      <MovPopup
        type="mov"
        movIsModalVisible={movIsModalVisible}
        setMovIsModalVisible={setMovIsModalVisible}
        movApi={movApi}
      />
    </div>
  )
}

export default Materials
