import { Button, Dropdown, Menu, message, Space, Table } from 'antd'
import { SetStateAction, useState } from 'react'

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

  // const { systemParameters } = practice

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
  const start = (type) => {
    if (selectedRowKeys[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      if (type === 1) {
        console.log('选中的删除id-齐套检查报告', selectedRowKeys)
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

  const materials = () => {
    if (selectedRowKeys[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      console.log('选中的删除id-物料齐套检查', selectedRowKeys)
      // 假数据测试流程
      // form
      const forms = {
        serial: '1',
        process: '28848',
        processTime: '3',
        remarks: '4',
        front: '5',
        totalProduction: '6'
      }
      // table 数据
      const analogData = [
        {
          id: '197',
          material: '001',
          materialName: '牛仔服',
          size: '',
          color: '',
          issuedQuantity: 30,
          S: 100,
          M: 100,
          L: 100,
          blue: 200,
          address: 100,
          company: '米',
          stock: 10,
          onTheWay: 20,
          children: [
            {
              fatherID: '197', //父id
              id: '22',
              S: 30,
              M: 30,
              L: 30,
              material: '001',
              materialName: '牛仔服',
              issuedQuantity: 10,
              size: 'C001',
              color: '红色',
              blue: 50,
              company: '米',
              stock: 5,
              onTheWay: 10,
              address: 50
            },
            {
              fatherID: '197', //父id
              id: '33',
              material: '001',
              materialName: '牛仔服',
              issuedQuantity: 10,

              size: 'C002',
              color: '蓝色',
              S: 30,
              M: 30,
              L: 30,
              blue: 30,
              company: '米',
              stock: 3,
              onTheWay: 5,

              address: 30
            },
            {
              fatherID: '197', //父id
              id: '44',
              S: 40,
              M: 40,
              L: 40,
              material: '001',
              materialName: '牛仔服',
              issuedQuantity: 10,

              size: 'C003',
              color: '绿色',
              blue: 20,
              company: '米',
              stock: 2,
              onTheWay: 5,
              address: 20
            }
          ]
        },
        {
          id: '272',
          material: '001',
          materialName: '牛仔服',
          issuedQuantity: 30,

          size: '',
          color: '',
          S: 100,
          M: 100,
          L: 100,
          blue: 200,
          address: 100,
          company: '米',
          stock: 10,
          onTheWay: 20,
          children: [
            {
              fatherID: '272', //父id
              id: '222',
              S: 30,
              M: 30,
              L: 30,
              material: '001',
              materialName: '牛仔服',
              issuedQuantity: 10,

              size: 'C001',
              color: '红色',
              blue: 50,
              company: '米',
              stock: 5,
              onTheWay: 10,
              address: 50
            },
            {
              fatherID: '272', //父id
              id: '333',
              material: '001',
              materialName: '牛仔服',
              issuedQuantity: 10,

              size: 'C002',
              color: '蓝色',
              S: 30,
              M: 30,
              L: 30,
              blue: 30,
              company: '米',
              stock: 3,
              onTheWay: 5,

              address: 30
            },
            {
              fatherID: '272', //父id
              id: '444',
              S: 40,
              M: 40,
              L: 40,
              material: '001',
              materialName: '牛仔服',
              issuedQuantity: 10,

              size: 'C003',
              color: '绿色',
              blue: 20,
              company: '米',
              stock: 2,
              onTheWay: 5,
              address: 20
            }
          ]
        }
      ]
      const res = [
        { name: '账号1', id: 1, form: forms, tableData: analogData },
        { name: '账号2', id: 2, form: forms, tableData: analogData }
      ]
      setMaterialList(res)

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
            <Dropdown
              overlay={menu}
              placement="topLeft"
              arrow={{ pointAtCenter: true }}
            >
              <Button type="primary">导出报告</Button>
            </Dropdown>
          </Space>
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
