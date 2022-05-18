/* eslint-disable prefer-const */
import { DatePicker, Input, InputNumber, Space, Table } from 'antd'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { memo, useEffect, useState } from 'react'

import { Icon } from '@/components'

import styles from './index.module.less'
const FormTable = (props: any) => {
  const {
    tableData,
    materialList,
    index,
    sizeList,
    saveData,
    select,
    recheckData
  } = props
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([])
  const [notData, setNotData] = useState<any>([]) //接口数据
  const [list, setList] = useState<any>([]) //格式
  const [data, setData] = useState<any>([]) //table 数据  防止为空
  const [loading, setLoading] = useState<any>(true) //加载
  const [renderData, setRenderData] = useState<any>()

  const [cloneData, setCloneData] = useState<any>([]) //修改存取来
  useEffect(() => {
    saveData && saveData(data)
    //给后台传递的数据
  }, [data])

  //已检查且已计划 才不可用
  const whetherAvailable = (e) => {
    if ((e.checkStatus === 1 && e.status === 2) || e.name === '已检查') {
      return true
    } else {
      return false
    }
  }
  useEffect(() => {
    if (!isEmpty(sizeList)) {
      const columns: any = [
        {
          title: '物料代码',
          dataIndex: 'materialCode',
          width: 150,
          align: 'center',
          fixed: 'left',
          key: 'material'
        },
        {
          title: '物料名称',
          width: 100,
          dataIndex: 'materialName',
          fixed: 'left',

          align: 'center',
          key: 'materialName'
        },
        {
          title: '物料颜色代码',
          dataIndex: 'skuCode',
          width: 100,
          align: 'center',
          key: 'materialColCode'
        },
        {
          title: '颜色',
          dataIndex: 'proColName',
          width: 100,
          align: 'center',
          key: 'proColName'
        },
        {
          title: '物料需求数量',
          width: 100,
          dataIndex: 'requireQuantity',
          align: 'center',
          key: 'requireQuantity'
        },
        {
          title: '单位',
          width: 100,
          dataIndex: 'unit',
          align: 'center',
          key: 'unit'
        },
        {
          title: '物料库存数量',
          width: 100,
          dataIndex: 'availableStockQtyTotal',
          align: 'center',
          key: 'availableStockQtyTotal'
        },
        {
          title: '已出库数量',
          width: 100,
          dataIndex: 'deliveredQty',
          align: 'center',
          key: 'deliveredQty'
        },
        {
          title: '冲销数量',
          dataIndex: 'counteractNum',
          align: 'center',
          fixed: 'right',
          width: 150,
          key: 'counteractNum',
          render: (_item: any, v: any) =>
            isEmpty(v.children) ? (
              <>
                <Input
                  type="number"
                  disabled={whetherAvailable(select)}
                  min={0}
                  defaultValue={_item}
                  onBlur={(e) => {
                    quantity(e.target.value, v)
                  }}
                />
              </>
            ) : (
              _item
            )
        },
        {
          title: '物料缺少数量',
          dataIndex: 'shortOfProductNum',
          align: 'center',
          fixed: 'right',
          width: 70,
          key: 'shortOfProductNum'
        },
        {
          title: '是否充足',
          dataIndex: 'enoughFlag',
          width: 70,
          align: 'center',
          key: 'enoughFlag',
          fixed: 'right',
          render: (_item: any) => (
            <Space size="middle">
              {_item === 1 ? (
                <Icon type="jack-icon-test" className={styles.previous} />
              ) : (
                <Icon type="jack-cuowu" className={styles.previous} />
              )}
            </Space>
          )
        },
        {
          title: '齐料日期',
          dataIndex: 'prepareTime',
          fixed: 'right',
          align: 'center',
          width: 150,
          key: 'prepareTime',
          render: (_item: any, v: any) => (
            <Space size="middle">
              {isEmpty(v.children) ? (
                !v.enoughFlag ? (
                  <>
                    <DatePicker
                      disabled={whetherAvailable(select)}
                      allowClear={false}
                      defaultValue={_item ? moment(Number(_item)) : undefined}
                      onChange={(e) => {
                        onChange(e, v)
                      }}
                    />
                  </>
                ) : null
              ) : null}
            </Space>
          )
        }
      ]
      columns.map((item: { align: string }) => {
        item.align = 'center'
      })
      const index = columns.findIndex(
        (item: { dataIndex: string }) => item.dataIndex === 'proColName'
      )
      columns.splice(index + 1, 0, sizeList)
      // setType(true)
      setRenderData(columns.flat(Infinity))
    }
  }, [sizeList])

  //渲染最终数据
  useEffect(() => {
    setList(renderData) //先渲染结构 后渲染数据 ，不然输入框不能操作
    //数据量过多数据空白问题

    //重新检查 走 缓存数据
    if (select !== undefined) {
      if (select.name === '重新检查') {
        if (!isEmpty(cloneData)) {
          setData(cloneData)
          recheckData && recheckData(cloneData)
        } else {
          setData(notData)
        }
      } else {
        setData(notData)
      }
    }
  }, [renderData, notData, cloneData, select])

  //处理建值对
  const conversion = (data: any[]) => {
    //data 数据
    const obj: any = {}
    data.map((e: { sizeCode: string | number; qtyFinal: any }) => {
      //键名=建值
      obj[e.sizeCode] = e.qtyFinal
    })
    return obj
  }

  const sizeAssignment = (e) => {
    if (!isEmpty(e)) {
      return { ...conversion(e.produceCheckSizeVOList), ...e }
    }
  }
  //处理子项
  const subitemProcessing = (e) => {
    if (!isEmpty(e)) {
      const arr = e.map((v: any) => {
        v.id = v.skuCode
        v.key = v.id

        v.deliveredQty = v.deliveredQty === null ? 0 : v.deliveredQty //测试~~~已出库数量暂无 设置0
        v.availableStockQtyTotal =
          v.availableStockQtyTotal === null ? 0 : v.availableStockQtyTotal //测试~~~物料库存数量暂无 设置0
        // v.counteractNum = 0
        //物料缺少数量 计算
        v.shortOfProductNum =
          v.requireQuantity -
            v.availableStockQtyTotal -
            v.deliveredQty -
            v.counteractNum -
            v.deliveredQty >
          0
            ? v.requireQuantity -
              v.availableStockQtyTotal -
              v.deliveredQty -
              v.counteractNum -
              v.deliveredQty
            : 0

        v.enoughFlag = v.shortOfProductNum > 0 ? 0 : 1
        v = sizeAssignment(v) //获取尺码数量
        return v
      })
      return arr
    } else {
      return []
    }
  }

  useEffect(() => {
    // 调取接口口添加 key和 counteractNum -半成品冲销数量的字段
    if (!isEmpty(tableData)) {
      tableData.map((item: any) => {
        item.deliveredQty = item.deliveredQty === null ? 0 : item.deliveredQty //测试~~~已出库数量暂无 设置0
        item.id = item.materialCode //id是 materialCode
        // item.key = `${item.materialCode}8848` //添加 key
        item.key = item.materialCode //添加 key

        // item.counteractNum = 0 //添加初始 冲销数量
        item.children = subitemProcessing(item.children) //处理子项
        item.shortOfProductNum = total(item.children, 'shortOfProductNum') //物料缺少数量-头
        item.enoughFlag = item.shortOfProductNum > 0 ? 0 : 1 //物料缺少数量-头
      })
      setNotData([...tableData])
    }
  }, [tableData])

  //计算总值
  const total = (count: any[], field: string) => {
    //count 数组
    //field 需要计算的字段
    const res = count.reduce((total: any, current: any) => {
      total += current[field]
      return total
    }, 0)
    return res
  }

  const onChange = (e: any, currentValue: any) => {
    processingData(data, moment(e).valueOf(), currentValue, 'time')
  }

  // let timeout: NodeJS.Timeout

  const quantity = (e: any, currentValue: any) => {
    processingData(data, e, currentValue, 'number')
  }
  //**处理数据**
  const processingData = (
    current: any[],
    e: any,
    currentValue: any,
    type: any
  ) => {
    if (!isEmpty(current)) {
      current.map((item: any) => {
        if (item.key === currentValue.materialCode) {
          if (!isEmpty(item.children)) {
            item.children.map((v: any) => {
              // 先赋值
              if (v.id === currentValue.id) {
                if (type === 'number') {
                  v.counteractNum = Number(e)
                  //物料缺少数量-子
                  v.shortOfProductNum =
                    v.requireQuantity -
                      v.availableStockQtyTotal -
                      v.counteractNum -
                      v.deliveredQty >
                    0
                      ? v.requireQuantity -
                        v.availableStockQtyTotal -
                        v.counteractNum -
                        v.deliveredQty
                      : 0

                  v.enoughFlag = v.shortOfProductNum > 0 ? 0 : 1
                }
                if (type === 'time') {
                  v.prepareTime = e
                }
              }
              // 在累加
              item.counteractNum = total(item.children, 'counteractNum') //顶部数据
              item.shortOfProductNum = total(item.children, 'shortOfProductNum') //物料缺少数量-头
              item.enoughFlag = item.shortOfProductNum > 0 ? 0 : 1 //物料缺少数量-头
            })
          }
        }
      })
      setData([...current])
      setCloneData([...current])
    }
  }

  const onExpandedRowsChange = (e: any) => {
    setExpandedRowKeys(e)
  }
  useEffect(() => {
    if (!isEmpty(data)) {
      setLoading(false)
    }
  }, [data])
  const show = (e, v) => {
    //e 是接口数据
    //v 重新数据
    if (select !== undefined) {
      if (select.name === '重新检查') {
        if (v.length >= 1) {
          return v
        } else {
          return e
        }
      } else {
        return e
      }
    }
  }

  function TreeData() {
    return (
      <>
        <Table
          columns={list}
          loading={loading}
          dataSource={data}
          scroll={{ x: 1500, y: 300 }}
          pagination={false}
          defaultExpandAllRows={true}
        />
      </>
    )
  }
  return (
    <div>
      <TreeData />
    </div>
  )
}

export default FormTable
