import { Button, Dropdown, Menu, message, Space, Table } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { CusDragTable } from '@/components'
import { materialSetApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import Forms from './forms'
import styles from './index.module.less'
import Material from './material'

const map = new Map()
map.set(1, '已检查')
map.set(2, '未检查')
map.set(3, '重新检查')

const production = new Map()
production.set(1, '待计划')
production.set(2, '已计划')
production.set(3, '生产中')
production.set(4, '生产完成')
function Materials() {
  const {
    productionList,
    completeInspectionReport,
    exportShortageReport,
    factoryList
  } = materialSetApis

  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: 10
  })
  const [selected, setSelected] = useState([]) //选中的id
  const [selectedData, setSelectedData] = useState([]) //记录以获取的所有数据
  const [type, setType] = useState(false) //编辑或者新增
  const [movIsModalVisible, setMovIsModalVisible] = useState<boolean>(false) //删除弹窗
  const [materialModal, setMaterialModal] = useState(false) //物料齐套检查弹窗
  const [materialList, setMaterialList] = useState<any>() //物料齐套数据.
  // const [queryData, setQueryData] = useState<any>({})
  const [factoryData, setFactoryData] = useState<any>([]) //工厂
  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, productionList)
  const [list, setList] = useState<any>()

  const columns: any = [
    {
      title: '生产单号',
      align: 'center',
      dataIndex: 'externalProduceOrderNum'
    },

    {
      title: '工厂名称',
      align: 'center',
      dataIndex: 'factoryName',
      width: 200
    },
    {
      title: '产品名称',
      align: 'center',
      dataIndex: 'productName',
      width: 250
    },
    {
      title: '产品款号',
      align: 'center',
      dataIndex: 'productNum',
      width: 200
    },
    {
      title: '客户款号',
      align: 'center',
      dataIndex: 'productClientNum'
    },
    {
      title: '生产单总量',
      align: 'center',
      dataIndex: 'orderSum'
    },
    {
      title: '计划完成日期',
      align: 'center',
      dataIndex: ' planEndDate',
      render: (v: any) => {
        return moment(v).format('YYYY-MM-DD')
      }
    },
    {
      title: '生产单权重',
      align: 'center',
      dataIndex: 'produceWeight'
    },
    {
      title: '生产单状态',
      key: 'status',
      align: 'center',
      dataIndex: 'status',
      render: (v: any) => {
        return <div>{production.get(v)}</div>
      }
    },
    {
      title: '物料齐套状态',
      align: 'center',
      dataIndex: 'checkStatus', //生产单状态（1、已检查 2 未检查 3 重新检查）
      render: (v: any) => {
        return map.get(v)
      }
    }
  ]
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

  const update = () => {
    getDataList && getDataList()
    setSelected([])
    setSelectedData([])
  }
  useEffect(() => {
    formApi(dataSource)
  }, [dataSource])
  const formApi = async (v: any) => {
    if (!isEmpty(v)) {
      v.map(
        (item: {
          id: any
          externalProduceOrderId: any
          key: any
          name: any
          externalProduceOrderNum: any
        }) => {
          item.id = item.externalProduceOrderId
          item.key = item.externalProduceOrderId
          item.name = `生产单：${item.externalProduceOrderNum}`
        }
      )
      setList(v)
    } else {
      setList([])
    }
  }

  //头部form的数据
  const FormData = (e: any) => {
    // setQueryData(e)
    setParams({ pageNum: 1, pageSize: 10, ...e })
    console.log({ pageNum: 1, pageSize: 10, ...e })

    setSelected([])
  }
  //获取选中的数据
  const selectedList = (v: any[], data: any[]) => {
    /**
     * v 选中的值
     * data 总数据
     */
    //过滤出对应的
    const selectedForm = (v: any, data: any[]) => {
      if (!isEmpty(data)) {
        const processData = data.filter((item: { id: any }) => item.id === v)
        return processData
      }
    }

    const dataList: (any[] | undefined)[] = []
    v.map((item: any) => {
      const sum = selectedForm(item, data)
      dataList.push(sum)
    })
    return dataList.flat(Infinity)
  }

  // 选中的状态
  const materials = async (type: string | boolean) => {
    if (selected[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      //获取选中的数据
      const selectedValue = selectedList(selected, selectedData)

      //判断选中的状态是否一样
      const stateConsistent = selectedValue.every(
        (item) => item.checkStatus === selectedValue[0].checkStatus
      )

      if (stateConsistent === true) {
        if (type === '1') {
          //生产中和生产完成不需要重新查看.
          const banView = selectedValue.every(
            (item) => item.status !== 3 && item.status !== 4
          )
          if (banView) {
            if (selectedValue[0].checkStatus !== 3) {
              setMaterialModal(true)
              setMaterialList(selectedValue)
            }

            //重新检查
            if (selectedValue[0].checkStatus === 3) {
              //重新检查只能选择一个
              if (selectedValue.length === 1) {
                const checked = {
                  ...selectedValue[0],
                  id: '1314520',
                  review: true, //重新检查判断条件
                  type: 1,
                  name: '已检查'
                }
                const unchecked = {
                  ...selectedValue[0],
                  type: 2,
                  review: true, //重新检查判断条件
                  name: '重新检查'
                }
                const sum = [checked, unchecked]
                setMaterialList(sum)
                //只有物料齐套才会展示弹窗
                if (type === '1') {
                  setMaterialModal(true)
                }
              } else {
                message.warning('重新检查只能选择一个')
              }
            }
          } else {
            message.warning('生产中、生产完成不需要检查')
          }
        }

        if (type !== '1') {
          const allCheckStatus = selectedValue.every((item: any) => {
            return item.checkStatus === 1
          })
          if (allCheckStatus) {
            if (type === '2') {
              start('2')
            }
            if (type === '3') {
              start('3')
            }
          } else {
            message.warning('只有已检查才能导出报告')
          }
        }
      } else {
        message.warning('物料齐套状态不一致')
      }
    }
  }
  //导出报告
  const start = async (type: any) => {
    // 导出elsx表格
    if (type === '2') {
      const res = await completeInspectionReport({ idList: selected })
      elsxTable(res, '齐套检查报告')
    }
    if (type === '3') {
      const res = await exportShortageReport({ idList: selected })
      elsxTable(res, '缺料报告')
    }
  }

  // 当前页面打勾，切换页面选择新数据打勾，回到之前的页面，勾的数据不见了
  //勾选
  const onSelectChange = (selectedRowKeys: any) => {
    //后面有数据的时候 根据id获取所有数据中对应的 然后给from
    const cloneSelected = cloneDeep(selected)

    if (!isEmpty(selectedRowKeys)) {
      selectedRowKeys.map((item) => {
        if (cloneSelected.includes(item) === false) {
          //添加
          cloneSelected.push(item)
          setSelected(cloneSelected)
        } else {
          //减少
          setSelected(selectedRowKeys)
        }
      })
    } else {
      setSelected([])
    }
  }

  const rowSelection: any = {
    selectedRowKeys: selected,
    onChange: onSelectChange
  }

  useEffect(() => {
    //获取所有的接口数据 且不能重复添加
    if (!isEmpty(list)) {
      const cloneSelected = cloneDeep(selectedData)
      list.map((item) => {
        if (cloneSelected.findIndex((v) => v.id === item.id) === -1) {
          cloneSelected.push(item)
        }
      })
      setSelectedData(cloneSelected)
    }
  }, [list])

  const elsxTable = (res: any, title: string) => {
    const blob = new Blob([res], { type: 'application/octet-stream' })
    const download = document.createElement('a')
    download.href = window.URL.createObjectURL(blob)
    download.download = `${title}.xls`
    download.click()
    window.URL.revokeObjectURL(download.href)
  }
  //刷新列表
  const refreshList = () => {
    getDataList && getDataList()
    // setSelected([])//是否清空勾选
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <div
          onClick={() => {
            materials('2')
          }}
        >
          齐套检查报告
        </div>
      </Menu.Item>
      <Menu.Item>
        <div
          onClick={() => {
            materials('3')
          }}
        >
          缺料报告
        </div>
      </Menu.Item>
    </Menu>
  )
  const TableLeft = () => {
    return (
      <>
        <Button
          className={styles.executionMethod}
          type="primary"
          onClick={() => {
            materials('1')
          }}
        >
          物料齐套检查
        </Button>
        <Space wrap>
          <Dropdown arrow overlay={menu} placement="topLeft">
            <Button type="primary">导出报告</Button>
          </Dropdown>
        </Space>
      </>
    )
  }
  return (
    <div className={styles.qualification}>
      <div>{/* <Title title={'物料齐套检查'} /> */}</div>
      <div>
        <div className={styles.content}>
          <div className={styles.forms}>
            <Forms factoryData={factoryData} FormData={FormData}></Forms>
          </div>

          <CusDragTable
            storageField={'materials'}
            cusBarLeft={TableLeft}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={list}
            rowKey={'id'}
            scroll={{ x: 1000 }}
            loading={loading}
            onChange={tableChange}
            pagination={{
              //分页
              showSizeChanger: true,
              // showQuickJumper: true, //是否快速查找
              pageSize: pageSize, //每页条数
              current: pageNum, //	当前页数
              total, //数据总数
              // position: ['bottomCenter'], //居中
              pageSizeOptions: ['10', '20', '50']
            }}
          />
        </div>
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

export default Materials
