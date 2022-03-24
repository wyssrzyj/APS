/* eslint-disable prefer-const */
import { DatePicker, InputNumber, Space, Switch, Table } from 'antd'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { memo, useEffect, useState } from 'react'

import { Icon } from '@/components'

import styles from './index.module.less'
const FormTable = (props: any) => {
  const { tableData, materialList, index, dataProcessing } = props
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([])
  const [data, setData] = useState<any>([])

  useEffect(() => {
    // 调取接口口添加 key和 writeOff -半成品冲销数量的字段
    !isEmpty(tableData) &&
      tableData.map((item: any) => {
        item.key = item.id //添加 key
        item.writeOff = 0 //添加初始 冲销数量
        if (!isEmpty(item.children)) {
          item.children.map((v: any) => {
            v.writeOff = 0
            v.key = v.id

            //物料缺少数量 计算
            v.missingQuantity =
              v.address - v.stock - v.onTheWay - v.writeOff - v.issuedQuantity >
              0
                ? v.address -
                  v.stock -
                  v.onTheWay -
                  v.writeOff -
                  v.issuedQuantity
                : 0

            v.adequate = v.missingQuantity > 0 ? false : true
          })
        }
        item.missingQuantity = total(item.children, 'missingQuantity') //物料缺少数量-头
        item.adequate = item.missingQuantity > 0 ? false : true //物料缺少数量-头
      })
    setData([...tableData])
  }, [])
  const columns: any = [
    {
      title: '物料代码',
      dataIndex: 'material',
      width: 150,

      align: 'center',
      fixed: 'left',

      key: 'material'
    },
    {
      title: '物料名称',
      dataIndex: 'materialName',
      fixed: 'left',

      align: 'center',
      key: 'materialName'
    },
    {
      title: '物料颜色代码',
      dataIndex: 'size',
      align: 'center',
      key: 'size'
    },
    {
      title: '颜色',
      dataIndex: 'color',
      align: 'center',
      key: 'color'
    },
    {
      title: 'S',
      dataIndex: 'S',
      align: 'center',
      key: 'S'
    },
    {
      title: 'M',
      dataIndex: 'M',
      align: 'center',
      key: 'M'
    },
    {
      title: 'L',
      dataIndex: 'L',
      align: 'center',
      key: 'L'
    },
    {
      title: '物料需求数量',
      dataIndex: 'address',
      align: 'center',
      key: 'address'
    },
    {
      title: '单位',
      dataIndex: 'company',
      align: 'center',
      key: 'company'
    },
    {
      title: '物料库存数量',
      dataIndex: 'stock',
      align: 'center',
      key: 'stock'
    },
    {
      title: '物料在途数量',
      dataIndex: 'onTheWay',
      align: 'center',
      key: 'onTheWay'
    },
    {
      title: '已出库数量',
      dataIndex: 'issuedQuantity',
      align: 'center',
      key: 'issuedQuantity'
    },
    {
      title: '半成品冲销数量',
      dataIndex: 'writeOff',
      align: 'center',
      fixed: 'right',
      width: 150,

      key: 'writeOff',
      render: (_item: any, v: any) =>
        isEmpty(v.children) ? (
          <InputNumber
            // key={v.company}
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
      dataIndex: 'missingQuantity',
      align: 'center',
      fixed: 'right',
      key: 'missingQuantity'
    },
    {
      title: '是否充足',
      dataIndex: 'adequate',
      align: 'center',
      key: 'adequate',
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
      dataIndex: 'completion',
      fixed: 'right',
      align: 'center',
      width: 150,
      key: 'completion',
      render: (_item: any, v: any) => (
        <Space size="middle">
          {isEmpty(v.children) ? (
            !v.adequate ? (
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
    processingData(moment(e).valueOf(), currentValue, 'time')
  }

  let timeout: NodeJS.Timeout
  const quantity = (e: any, currentValue: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      processingData(e, currentValue, 'number')
    }, 500)
  }

  //**处理数据**
  const processingData = (e: any, currentValue: any, type: any) => {
    if (!isEmpty(data)) {
      data.map((item: any) => {
        if (item.key === currentValue.fatherID) {
          if (!isEmpty(item.children)) {
            item.children.map((v: any) => {
              // 先赋值
              if (v.id === currentValue.id) {
                if (type === 'number') {
                  v.writeOff = Number(e)
                  //物料缺少数量-子
                  v.missingQuantity =
                    v.address -
                      v.stock -
                      v.onTheWay -
                      v.writeOff -
                      v.issuedQuantity >
                    0
                      ? v.address -
                        v.stock -
                        v.onTheWay -
                        v.writeOff -
                        v.issuedQuantity
                      : 0

                  v.adequate = v.missingQuantity > 0 ? false : true
                }
                if (type === 'time') {
                  v.completion = e
                }
              }
              // 在累加
              item.writeOff = total(item.children, 'writeOff') //顶部数据
              item.missingQuantity = total(item.children, 'missingQuantity') //物料缺少数量-头
              item.adequate = item.missingQuantity > 0 ? false : true //物料缺少数量-头
            })
          }
        }
      })

      setData([...data])

      //
    }
  }
  useEffect(() => {
    materialList[index].tableData = data

    //判断子项是否全部满足
    const CurrentData = materialList[index].tableData
    function checkAdult(data: any) {
      return data.adequate === true
    }
    // 给当前页的数据添加 一个状态 用于判断当前页是否全部打钩
    materialList[index].satisfy = CurrentData.every(checkAdult)
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
          columns={columns}
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
