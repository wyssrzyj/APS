/* eslint-disable prefer-const */
import { DatePicker, InputNumber, Space, Switch, Table } from 'antd'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { memo, useEffect, useState } from 'react'

import { Icon } from '@/components'

import styles from './index.module.less'
const FormTable = (props: any) => {
  const { tableData, materialList, index, dataProcessing, sizeList, saveData } =
    props
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([])
  const [data, setData] = useState<any>(tableData) //table 数据  防止为空
  const [list, setList] = useState<any>([]) //table处理后的格式

  useEffect(() => {
    saveData && saveData(data)
  }, [data])

  useEffect(() => {
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
        // dataIndex: 'proColName',
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
        title: '半成品冲销数量',
        dataIndex: 'counteractNum',
        align: 'center',
        fixed: 'right',
        width: 150,
        key: 'counteractNum',
        render: (_item: any, v: any) =>
          isEmpty(v.children) ? (
            <InputNumber
              // key={v.unit}
              min={0}
              defaultValue={_item}
              onChange={(e) => {
                quantity(e, v)
              }}
            />
          ) : (
            _item
          )
      },
      {
        title: '物料缺少数量',
        dataIndex: 'shortOfProductNum',
        align: 'center',
        fixed: 'right',
        width: 150,
        key: 'shortOfProductNum'
      },
      {
        title: '是否充足',
        dataIndex: 'enoughFlag',
        width: 150,

        align: 'center',
        key: 'enoughFlag',
        fixed: 'right',
        render: (_item: any) => (
          <Space size="middle">
            {_item ? (
              <Icon type="jack-icon-test" className={styles.previous} />
            ) : (
              <Icon type="jack-cuowu" className={styles.previous} />
            )}
          </Space>
        )
      },
      {
        title: '齐套日期',
        dataIndex: 'prepareTime',
        fixed: 'right',
        align: 'center',
        width: 150,
        key: 'prepareTime',
        render: (_item: any, v: any) => (
          <Space size="middle">
            {isEmpty(v.children) ? (
              !v.enoughFlag ? (
                <DatePicker
                  allowClear={false}
                  defaultValue={_item ? moment(_item) : undefined}
                  onChange={(e) => {
                    onChange(e, v)
                  }}
                />
              ) : (
                <Icon type="jack-icon-test" className={styles.previous} />
              )
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

    if (sizeList !== undefined) {
      columns.splice(index + 1, 0, sizeList)
      setList(columns.flat(Infinity))
    }
  }, [sizeList])

  useEffect(() => {
    // 调取接口口添加 key和 counteractNum -半成品冲销数量的字段
    !isEmpty(tableData) &&
      tableData.map((item: any) => {
        item.deliveredQty = item.deliveredQty === null ? 0 : item.deliveredQty //测试~~~已出库数量暂无 设置0
        item.id = item.materialCode //id是 materialCode
        item.key = item.id //添加 key
        item.counteractNum = 0 //添加初始 冲销数量
        if (!isEmpty(item.children)) {
          item.children.map((v: any) => {
            v.deliveredQty = v.deliveredQty === null ? 0 : v.deliveredQty //测试~~~已出库数量暂无 设置0
            v.counteractNum = 0
            v.id = v.materialCode + v.materialColCode
            v.key = v.id
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

            v.enoughFlag = v.shortOfProductNum > 0 ? false : true
          })
        }
        item.shortOfProductNum = total(item.children, 'shortOfProductNum') //物料缺少数量-头
        item.enoughFlag = item.shortOfProductNum > 0 ? false : true //物料缺少数量-头
      })
    setData([...tableData])
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

  let timeout: NodeJS.Timeout

  const quantity = (e: any, currentValue: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      processingData(data, e, currentValue, 'number')
    }, 500)
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

                  v.enoughFlag = v.shortOfProductNum > 0 ? false : true
                }
                if (type === 'time') {
                  v.prepareTime = e
                }
              }
              // 在累加
              item.counteractNum = total(item.children, 'counteractNum') //顶部数据
              item.shortOfProductNum = total(item.children, 'shortOfProductNum') //物料缺少数量-头
              item.enoughFlag = item.shortOfProductNum > 0 ? false : true //物料缺少数量-头
            })
          }
        }
      })
      setData([...current])
      //
    }
  }
  useEffect(() => {
    //判断子项是否全部满足
    function checkAdult(data: any) {
      return data.enoughFlag === true
    }
    // 给当前页的数据添加 一个状态 用于判断当前页是否全部打钩
    materialList[index].satisfy = data.every(checkAdult)
    dataProcessing(materialList) //暴露出去
  }, [data])
  const onExpandedRowsChange = (e: any) => {
    setExpandedRowKeys(e)
  }
  function TreeData() {
    return (
      <>
        <Table
          expandedRowKeys={expandedRowKeys}
          onExpandedRowsChange={onExpandedRowsChange}
          columns={list}
          dataSource={data}
          scroll={{ x: 1500, y: 300 }}
          // scroll={{ x: 1200, y: 'calc(100vh - 400px)' }}
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
