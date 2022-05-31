import { Button, Form, Input, message, Modal, Table, Tabs, Tag } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { productionSingleApis } from '@/recoil/apis'

import styles from './index.module.less'
import Outgoing from './outgoing/index'
import Popup from './popup'

const map = new Map()
map.set('1', '裁剪')
map.set('2', '缝制')
map.set('3', '后整')
map.set('4', '包装')
map.set('5', '外发')
map.set('6', '缝制线外组')

function ProductionOrder(props: { content: any }) {
  const { content } = props
  const {
    isModalVisible,
    setGetDetailsId,
    setIsModalVisible,
    types,
    getDetailsId,
    externalProduceOrderId,
    whetherEditor,
    refreshData
  } = content

  const { workingProcedure, popupPreservation, processOutsourcing } =
    productionSingleApis

  const { TabPane } = Tabs
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const defaultPageSize = 10
  const [total, setTotal] = useState() //存放总数.
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: 10
  })

  const [list, setList] = useState<any>([]) //工艺数据

  const [allSaveList, setAllSaveList] = useState<any>([]) //全部-工艺数据-保存

  const [allData, setAllData] = useState<any>([]) //外发全部数据-初始
  const [processedData, setProcessedData] = useState<any>([]) //外发全部数据-修改
  const [operation, setOperation] = useState(false)
  const [workingProcedureId, setWorkingProcedureId] = useState()

  useEffect(() => {
    if (getDetailsId !== undefined && getDetailsId !== null) {
      getAllData() //外发全部数据
    }
  }, [getDetailsId])
  useEffect(() => {
    getProcessRoute(params)
  }, [params])
  const getProcessRoute = (v) => {
    console.log('接口数据', v)
    const domeList = [
      {
        id: 1,
        section: '裁剪',
        consuming: 1,
        operationDetails: ['铺布1', '打包2', '裁剪3', '铺布', '打包', '裁剪']
      },
      {
        id: 2,
        section: '缝制',
        consuming: 2,
        operationDetails: ['铺布', '打包', '裁剪']
      }
    ]
    setList(domeList)
    setAllSaveList(domeList)
  }

  const columns: any = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'idx',
      width: 100,
      render: (_value, _row, index) => {
        return <div>{index + 1}</div>
      }
    },
    {
      title: '所属工段',
      dataIndex: 'section',
      align: 'center',
      width: 150,
      render: (v: any) => {
        // return <div>{map.get(v)}</div>
        return <div>{v}</div>
      }
    },
    {
      title: '固定耗时（单位：天）',
      dataIndex: 'consuming',
      align: 'center',
      width: 200,
      render: (_item, v) => {
        return (
          <>
            <Input
              disabled={types ? true : false}
              type="number"
              // disabled={whetherAvailable(select)}
              min={0}
              defaultValue={_item}
              onBlur={(e) => {
                quantity(e.target.value, v)
              }}
            />
          </>
        )
      }
    },
    {
      title: '工序明细',
      align: 'center',
      dataIndex: 'operationDetails',
      render: (_item) => {
        return (
          <>
            {!isEmpty(_item) ? (
              <div className={styles.todoContent}>
                {_item.map((item) => (
                  <Tag
                    className={styles.operationTag}
                    key={item}
                    color="#108ee9"
                  >
                    {item}
                  </Tag>
                ))}
              </div>
            ) : null}
          </>
        )
      }
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'address',
      width: 100,
      render: (_value: any, _row: any) => {
        return (
          <div className={styles.flex}>
            <div
              className={styles.operation_item}
              // onClick={() => getFormData(_row)}
              onClick={() => getFormData(externalProduceOrderId)}
            >
              {types ? '查看' : '编辑工序'}
            </div>
          </div>
        )
      }
    }
  ]
  const quantity = (e, v) => {
    v.consuming = e
    updateData(v, allSaveList)
  }
  const updateData = (record, list) => {
    const sum = cloneDeep(list)
    const subscript = sum.findIndex((item: any) => item.id === record.id)
    if (subscript !== -1) {
      sum.splice(subscript, 1, record)
      console.log(sum)
      setAllSaveList(sum)
    }
  }
  const getAllData = async () => {
    const res = await processOutsourcing({
      pageNum: 1,
      pageSize: 1000,
      externalProduceOrderId: externalProduceOrderId
    })
    if (!isEmpty(res.records)) {
      // 添加 状态判断是否选中
      res.records.map(
        (item: { need: boolean; section: string; outTime: null }) => {
          item.need =
            item.section === '5' ? true : item.outTime !== null ? true : false
        }
      )
      setAllData(res.records)
      setProcessedData(res.records)
    }
  }

  const handleOk = async () => {
    if (!types) {
      // 判断外发管理的外发时间是否为空.

      //全部数据不为空才=true
      if (!isEmpty(processedData)) {
        const processed = processedData.filter((item) => item.need === true)
        const outTimeType = processed.every((item: any) => {
          return item.outTime !== null && item.outTime !== ''
        })

        if (outTimeType) {
          //保存的时候工艺和外发 都需要传全部数据.
          const arr = await popupPreservation({
            productId: getDetailsId,
            externalProduceOrderId: externalProduceOrderId,
            outsourceProcessDTOList: processed, //外发全部为true且时间不为空的数据
            processDTOList: allSaveList //工艺全部数据
          })

          if (arr) {
            message.success('保存成功')
            refreshData && refreshData()
            handleCancel()
          }
        } else {
          message.error('外发管理的外发时间不能为空')
        }
      } else {
        //外发数据为空
        const arr = await popupPreservation({
          productId: getDetailsId,
          externalProduceOrderId: externalProduceOrderId,
          outsourceProcessDTOList: [], //外发全部为true且时间不为空的数据
          processDTOList: allSaveList //工艺全部数据.
        })
        if (arr) {
          message.success('保存成功')
          refreshData && refreshData()
          handleCancel()
        }
      }
    } else {
      handleCancel()
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    refreshData && refreshData()
    setGetDetailsId(null)
  }

  //外发全部数据
  const AllData = (e: any) => {
    setProcessedData(e)
  }

  const getFormData = (value: any) => {
    setWorkingProcedureId(value)
    setOperation(true)
  }
  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
  }
  return (
    <div className={styles.mainBody}>
      <Modal
        width={1000}
        footer={
          types === true ? null : (
            <>
              <Button onClick={handleCancel}>取消</Button>

              <Button type="primary" onClick={handleOk}>
                保存
              </Button>
            </>
          )
        }
        destroyOnClose={true}
        visible={isModalVisible}
        maskClosable={false}
        onOk={handleOk}
        // okText={types ? '确认' : '保存'}
        onCancel={handleCancel}
        centered={true}
      >
        <Tabs type="card">
          <TabPane tab="工艺路线" key="1">
            <Table
              columns={columns}
              dataSource={list || []}
              rowKey={'id'}
              pagination={null}
              // pagination={{
              //   // disabled: types,
              //   //分页
              //   showSizeChanger: true,
              //   pageSize, //每页条数
              //   current: pageNum, //	当前页数
              //   total, //数据总数
              //   pageSizeOptions: ['5', '10', '20', '50'],
              //   onChange: onPaginationChange //获取当前页码是一个function
              // }}
            />
          </TabPane>

          <TabPane tab="外发管理" key="2">
            <Outgoing
              allData={allData}
              whetherEditor={whetherEditor}
              types={types}
              AllData={AllData}
              // preservation={preservation}
              externalProduceOrderId={externalProduceOrderId}
            />
          </TabPane>
        </Tabs>
        {operation && (
          <Popup
            externalProduceOrderId={workingProcedureId}
            getDetailsId={getDetailsId}
            types={types}
            operation={operation}
            setOperation={setOperation}
          />
        )}
      </Modal>
    </div>
  )
}

export default ProductionOrder
